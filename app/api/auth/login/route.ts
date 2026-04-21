import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/db/setup";
import { query } from "@/lib/db/client";

type LoginBody = {
  email?: string;
  password?: string;
};

type AuthUserRow = {
  id: string;
  email: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    await ensureSchema();

    const result = await query<AuthUserRow>(
      `SELECT id, email
       FROM auth.users
       WHERE email = $1
         AND is_active = true
         AND password_hash = crypt($2, password_hash)
       LIMIT 1`,
      [email, password],
    );

    if (result.rowCount !== 1) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({
      ok: true,
      user: { id: result.rows[0].id, email: result.rows[0].email },
    });
    response.cookies.set("session_user_id", result.rows[0].id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
