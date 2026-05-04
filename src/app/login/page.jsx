"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // BetterAuth
    const { error } = await authClient.signIn.email({ 
      email: form.email, 
      password: form.password,
      callbackURL: "/" 
    });

    setLoading(false);
    if (error) {
      toast.error(error.message || "Invalid credentials. Please try again.");
    } else {
      toast.success("Welcome back!");
      router.push("/");
    }
  };

  const handleGoogle = async () => {
  
    await authClient.signIn.social({ 
      provider: "google", 
      callbackURL: "/" 
    });
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white border border-[#DDD0BC] rounded-sm p-8 md:p-10 shadow-sm">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#2C2C2C] rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
                <rect x="13" y="2" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="2" y="13" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="13" y="13" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">Welcome Back</h1>
            <p className="text-[#8C8475] text-sm mt-2">Sign in to your TilesGallery account</p>
          </div>

          {/* Social Login Section */}
          <button 
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-[#DDD0BC] hover:border-[#8C8475] py-3 rounded-sm text-sm text-[#2C2C2C] hover:bg-[#F9F6F1] transition-all duration-200 mb-6 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#DDD0BC]" />
            <span className="text-[#8C8475] text-[10px] uppercase tracking-[0.2em] font-bold">OR</span>
            <div className="flex-1 h-px bg-[#DDD0BC]" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-[#8C8475] font-bold block mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={form.email} 
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-all" 
              />
            </div>
            
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-[#8C8475] font-bold block mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"} 
                  name="password" 
                  required 
                  value={form.password} 
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-all" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute inset-y-0 right-4 flex items-center text-[#8C8475] hover:text-[#C4A882]"
                >
                  {showPass ? (
                    <span className="text-xs font-bold uppercase tracking-tighter">Hide</span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-tighter">Show</span>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2C2C2C] hover:bg-[#C4A882] text-[#F5EFE6] py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 disabled:opacity-50 mt-4 shadow-md"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-[#8C8475] text-xs mt-8 font-medium">
            New to TilesGallery?{" "}
            <Link href="/register" className="text-[#C4A882] hover:text-[#2C2C2C] underline underline-offset-4 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
