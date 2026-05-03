"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL || undefined,
      callbackURL: "/login",   });

    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } else {
      toast.success("Account created! Please login.");
      router.push("/login");
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
        {/* Card */}
        <div className="bg-white border border-[#DDD0BC] rounded-sm p-8 md:p-10 shadow-sm">
          {/* Logo top */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#2C2C2C] rounded-sm flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
                <rect x="13" y="2" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="2" y="13" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="13" y="13" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
              </svg>
            </div>
            <h1 className="text-[#2C2C2C] text-3xl font-bold tracking-tight">Create Account</h1>
            <p className="text-[#8C8475] text-sm mt-1">Join the TilesGallery community</p>
          </div>

          {/* Google Button */}
          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-[#DDD0BC] hover:border-[#8C8475] py-3 rounded-sm text-sm text-[#2C2C2C] hover:bg-[#EDE4D6] transition-colors mb-6 font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#DDD0BC]" />
            <span className="text-[#8C8475] text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#DDD0BC]" />
          </div>

          {/* Form */}``
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#8C8475] font-bold block mb-1.5">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-colors" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#8C8475] font-bold block mb-1.5">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange}
                placeholder="your email.com"
                className="w-full px-4 py-3 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-colors" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#8C8475] font-bold block mb-1.5">Photo URL <span className="text-stone/50 normal-case tracking-normal">(optional)</span></label>
              <input type="url" name="photoURL" value={form.photoURL} onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-colors" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#8C8475] font-bold block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} name="password" required value={form.password} onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 pr-12 bg-[#F9F6F1] border border-[#DDD0BC] focus:border-[#C4A882] focus:outline-none rounded-sm text-[#2C2C2C] text-sm transition-colors" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-4 text-[#8C8475] hover:text-[#C4A882] text-xs font-bold uppercase">
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#2C2C2C] hover:bg-[#C4A882] text-white py-3 rounded-sm text-xs uppercase tracking-widest font-bold transition-all duration-200 disabled:opacity-60 mt-2">
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-[#8C8475] text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C4A882] hover:underline font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
