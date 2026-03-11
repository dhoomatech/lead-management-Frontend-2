"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useAppStore } from "@/app/store/useAppStore";
import { Button } from "@/app/_components/ui/Button";

export function LoginPage() {
  const [email, setEmail]     = useState("sneha@dhooma.com");
  const [password, setPassword] = useState("password123");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const showToast = useAppStore((s) => s.showToast);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="flex-1 bg-blue-600 relative overflow-hidden hidden lg:flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 px-16 max-w-lg text-white">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center font-extrabold text-lg">D</div>
            <div>
              <div className="font-bold text-lg">Dhooma Creative</div>
              <div className="text-xs opacity-70">Digital Marketing Company</div>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-5">Manage your leads smarter &amp; faster</h2>
          <p className="text-base opacity-80 leading-relaxed">Centralize all your marketing leads, track performance, and close deals with your unified CRM platform.</p>
          <div className="flex gap-2 mt-14">
            <div className="w-7 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white/40 rounded-full" />
            <div className="w-2 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-[480px] bg-white flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-[360px]">
          <h1 className="text-[26px] font-extrabold text-gray-900 mb-1.5">Welcome back 👋</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to your Dhooma Creative account</p>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {[
              { label: "Continue with Google", onClick: () => showToast("Google login coming soon"),
                icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
              { label: "Continue with Facebook", onClick: () => showToast("Facebook login coming soon"),
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={btn.onClick}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                {btn.icon} <span className="truncate">{btn.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="sneha@dhooma.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2 mb-5">
            <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <button
            onClick={handleLogin} disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[15px] font-bold transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in to Dashboard"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <span onClick={() => showToast("Contact your admin to get access")} className="text-blue-600 font-semibold cursor-pointer hover:underline">Request access</span>
          </p>
        </div>
      </div>
    </div>
  );
}
