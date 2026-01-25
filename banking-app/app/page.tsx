"use client";

import { useState } from "react";
import styles from "./auth.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        alert("Please fill out all fields");
        setLoading(false);
        return;
      }

      if (isLogin) {
        const stored = localStorage.getItem("user");
        if (!stored) {
          alert("No user found. Please register first.");
          setLoading(false);
          return;
        }
        const savedUser = JSON.parse(stored);
        if (savedUser.email === email && savedUser.password === password) {
          alert("Login successful!");
          window.location.href = "/dashboard";
        } else {
          alert("Invalid credentials");
          setLoading(false);
        }
      } else {
        const user = { email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registration successful!");
        setEmail("");
        setPassword("");
        setIsLogin(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLogin ? "Welcome Back" : "Join Us Today"}
          </h1>
          <p className={styles.subtitle}>
            {isLogin
              ? "Sign in to access your secure banking account"
              : "Create your account and start managing your finances"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
              {isLogin && (
                <a href="#forgot-password" className={styles.forgotLink}>
                  Forgot?
                </a>
              )}
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder={
                isLogin ? "Enter your password" : "Create a strong password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>Or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6m3-3H9"></path>
            </svg>
            Google
          </button>
          <button type="button" className={styles.socialButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className={styles.footer}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
            }}
            className={styles.link}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
