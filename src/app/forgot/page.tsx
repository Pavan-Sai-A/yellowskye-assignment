"use client";

import { FormEvent, useEffect, useState } from "react";
import { sendPasswordResetEmail, AuthError } from "firebase/auth";
import { auth } from "@/components/fireBase";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (message && counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [message, counter]);

  const handleReset = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setMessage("");
    setError("");
    setCounter(30);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) {
      return "Sending...";
    }
    if (message) {
      return "Check Your Email";
    }
    return "Send Reset Link";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          <p className="text-gray-600 mt-2">
            We&apos;ll send you a link to reset your password
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
            {message}
            {counter > 0 ? (
              <p className="text-gray-500 mt-1">
                Resend available in {counter} seconds
              </p>
            ) : (
              <button
                onClick={() => handleReset()}
                className="text-blue-600 hover:text-blue-500 font-medium mt-2 cursor-pointer"
                type="button"
              >
                Resend Email
              </button>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={!!message}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white transition cursor-pointer ${
            loading || message
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          }`}
          disabled={loading || !!message}
        >
          {getButtonText()}
        </button>

        <div className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
