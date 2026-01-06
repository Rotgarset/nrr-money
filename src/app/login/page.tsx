"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link.");
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: 16 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10 }}
        />
        <button type="submit" style={{ padding: 10 }}>
          Send magic link
        </button>
      </form>
      <p>{message}</p>
    </main>
  );
}