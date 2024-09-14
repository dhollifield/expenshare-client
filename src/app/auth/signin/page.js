"use client";
import { signIn, getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); // state for CSRF token
  const router = useRouter();

  useEffect(() => {
    // Retrieve CSRF token when the component mounts
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting credentials:", { userName, password, csrfToken });

    const result = await signIn("credentials", {
      redirect: false,
      userName,
      password,
      csrfToken,
    });

    console.log("Sign-in result:", result); // Debugging the result

    if (result?.error) {
      setError(result.error);
      console.log("Error:", result.error);
    } else {
      router.push("/events"); // Redirect to homepage or another page after sign-in
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h1>Sign In</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </div>
          {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}
          <button type="submit" style={{ width: "100%", padding: "0.75rem" }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
