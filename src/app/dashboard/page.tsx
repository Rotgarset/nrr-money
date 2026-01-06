"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data?.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email ?? "");
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <main style={{ maxWidth: 700, margin: "60px auto", padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Logged in as: <b>{email || "…"}</b></p>

      <button onClick={logout} style={{ padding: 10, marginTop: 12 }}>
        Logout
      </button>

      <hr style={{ margin: "24px 0" }} />

      <p>Next step: here we’ll show the risk chart.</p>
    </main>
  );
}