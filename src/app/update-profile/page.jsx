"use client";
import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) { router.push("/login"); return; }
    if (session) setForm({ name: session.user.name || "", image: session.user.image || "" });
  }, [session, isPending, router]);

  if (isPending) return <Loader />;
  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name: form.name, image: form.image || undefined });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/my-profile" className="inline-flex items-center gap-2 text-stone hover:text-terracotta text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Profile
      </Link>

      <div className="text-center mb-10">
        <span className="text-terracotta text-xs uppercase tracking-widest font-medium">Account Settings</span>
        <h1 className="font-heading text-charcoal text-3xl font-bold mt-1">Update Information</h1>
        <p className="text-stone text-sm mt-2">Modify your display name and profile picture.</p>
      </div>

      <div className="bg-white border border-[#DDD0BC] rounded-sm p-8">
        {/* Preview Avatar */}
        <div className="flex justify-center mb-8">
          {form.image ? (
            <img src={form.image} alt="Preview" className="w-20 h-20 rounded-sm object-cover border-2 border-clay shadow-md" onError={(e) => { e.target.style.display = "none"; }} />
          ) : (
            <div className="w-20 h-20 rounded-sm bg-terracotta flex items-center justify-center shadow-md">
              <span className="text-cream text-2xl font-heading font-bold">{form.name?.charAt(0).toUpperCase() || "?"}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-stone font-medium block mb-1.5">Display Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-[#F5EFE6] border border-[#DDD0BC] focus:border-terracotta focus:outline-none rounded-sm text-charcoal text-sm transition-colors" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-stone font-medium block mb-1.5">Profile Image URL</label>
            <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 bg-[#F5EFE6] border border-[#DDD0BC] focus:border-terracotta focus:outline-none rounded-sm text-charcoal text-sm transition-colors" />
            <p className="text-stone text-xs mt-1">Paste a direct link to your profile picture.</p>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#2C2C2C] hover:bg-terracotta text-cream py-3.5 rounded-sm text-sm uppercase tracking-widest font-medium transition-colors duration-200 disabled:opacity-60">
            {loading ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}
