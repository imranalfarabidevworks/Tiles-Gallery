"use client";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  if (isPending) return <Loader />;
  if (!session) return null;

  const user = session.user;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="text-terracotta text-xs uppercase tracking-widest font-medium">Account</span>
        <h1 className="font-heading text-charcoal text-3xl md:text-4xl font-bold mt-1">My Profile</h1>
      </div>

      <div className="bg-white border border-[#DDD0BC] rounded-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#2C2C2C] via-[#8B7355] to-[#C4622D]" />

        {/* Avatar & Name */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 mb-6">
            <div className="flex items-end gap-4">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-24 h-24 rounded-sm object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-sm bg-terracotta flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-cream text-3xl font-heading font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="pb-1">
                <h2 className="font-heading text-charcoal text-2xl font-bold">{user.name}</h2>
                <p className="text-stone text-sm">{user.email}</p>
              </div>
            </div>
            <Link href="/update-profile"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-[#2C2C2C] hover:bg-terracotta text-cream px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Update Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: user.name },
              { label: "Email Address", value: user.email },
              { label: "Account Created", value: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A" },
              { label: "Account Status", value: user.emailVerified ? "Verified ✓" : "Unverified" },
            ].map((item) => (
              <div key={item.label} className="bg-[#F5EFE6] border border-[#DDD0BC] rounded-sm p-4">
                <p className="text-xs uppercase tracking-widest text-stone font-medium mb-1">{item.label}</p>
                <p className="text-charcoal font-medium text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
