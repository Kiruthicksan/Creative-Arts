import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Github } from "lucide-react";

// Google Icon Component (not my own. Found it on the internet)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Login = ({onSwitchToRegister}) => {

  const [showPassword, setShowPassword] = useState(false);

 
  

  return (
    <div>
      <div className="bg-[linear-gradient(135deg,#f3e8ff_0%,#ffffff_100%)] p-6 w-full">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1.5">
          Welcome back
        </h1>
        <p className="text-xs text-gray-500">
          Sign in to access your library and purchases
        </p>
      </div>

      <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-900">Email</label>
          <div className="flex items-center gap-2 w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-purple-600/20 focus-within:border-purple-600 transition-all group">
            <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
            <input
              type="email"
              placeholder="Enter your email"
              className="outline-none border-none text-xs w-full text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-900">Password</label>
          <div className="flex items-center gap-2 w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-purple-600/20 focus-within:border-purple-600 transition-all group">
            <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="outline-none border-none text-xs w-full text-gray-700 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded-full border-gray-300 text-purple-600 focus:ring-purple-600/20"
            />
            <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Sign In Button */}
        <button className="w-full py-2.5 px-4 bg-[#7c3bed] hover:bg-[#6d35d0] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98]">
          Sign In
        </button>

        {/* Divider */}
        <div className="relative flex items-center gap-4 py-1">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-[10px] text-gray-400 font-medium">
            or continue with
          </span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-xs font-medium text-gray-700"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all text-xs font-medium text-gray-700"
          >
            <Github className="w-4 h-4 text-gray-900" />
            <span>GitHub</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#7c3bed] font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
