"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 引入路由 Hook

export default function LoginPage() {
  // 控制显示 Login 还是 Reset Password 界面
  const [isResetMode, setIsResetMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isResetMode) {
      // 模拟发送重置密码邮件的逻辑
      alert(`Password reset link sent to ${email}`);
      setIsResetMode(false); // 回到登录界面
    } else {
      // 模拟登录验证逻辑 (未来这里会接入 MySQL 后端验证)
      console.log("Logging in with:", email, password);
      // 登录成功后，跳转到问卷页面
      router.push('/survey');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header className="bg-[#091a40] h-24 flex items-center justify-center shadow-md">
        <img
          src="https://q.surveys.unimelb.edu.au/CP/Graphic.php?IM=IM_6PTif2kLNeUE5Bs"
          alt="The University of Melbourne"
          className="h-14"
        />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">

          <h2 className="text-2xl font-semibold text-center text-[#091a40] mb-8">
            {isResetMode ? "Reset Password" : "Farmer Portal Login"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] focus:ring-1 focus:ring-[#091a40]"
                placeholder="farmer@example.com"
              />
            </div>

            {!isResetMode && (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] focus:ring-1 focus:ring-[#091a40]"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#091a40] text-white py-2.5 rounded hover:bg-[#071433] transition-colors font-medium text-lg mt-4"
            >
              {isResetMode ? "Send Reset Link" : "Log In"}
            </button>
          </form>

          {/* Toggle between Login and Reset */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
            >
              {isResetMode ? "Back to Login" : "Forgot your password?"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}