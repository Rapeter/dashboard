import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SurveyLayoutProps = {
  children: ReactNode;
};

export default async function SurveyLayout({ children }: SurveyLayoutProps) {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get("session_user_id")?.value;

  if (!sessionUserId) {
    redirect("/");
  }

  return <>{children}</>;
}
