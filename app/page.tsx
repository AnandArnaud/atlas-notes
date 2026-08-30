"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No product analytics wired in yet — the handler just logs the action.
    console.log(mode === "signup" ? "sign_up" : "log_in", { email });
    router.push("/notes");
  }

  return (
    <main style={{ maxWidth: 440, margin: "0 auto", padding: "76px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: "#0e7c66" }} />
        <strong style={{ fontSize: 18, letterSpacing: "-0.02em" }}>Atlas</strong>
      </div>

      <h1 style={{ fontSize: 29, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 10px" }}>
        A calmer home for your notes.
      </h1>
      <p style={{ color: "#8a8f88", margin: "0 0 32px", fontSize: 15 }}>
        Capture a thought, pin what matters, archive the rest. Nothing else in the way.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        style={{ marginTop: 18, background: "none", border: 0, color: "#0e7c66", cursor: "pointer", fontSize: 14 }}
      >
        {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}
      </button>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "11px 13px",
  borderRadius: 9,
  border: "1px solid #e4e4e0",
  fontSize: 15,
  background: "#fff",
};
const buttonStyle: React.CSSProperties = {
  padding: "11px 13px",
  borderRadius: 9,
  border: 0,
  background: "#0e7c66",
  color: "#fff",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};
