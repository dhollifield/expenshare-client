"use client";
import { signIn, getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      router.push("/dashboard/user-profile"); // Redirect to homepage or another page after sign-in
    }
  };

  return (
    <>
      <section className="bg:white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Various travel expense items"
              src="https://learn.g2.com/hubfs/businesstravelexpenseheader.jpg"
              width={1000}
              height={1000}
              ckassName="absolute inset-0 object-cover opacity-80"
            />
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w.3xl">
              <div className="relative -mt-16 block">
                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to ExpenShare
                </h1>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {error && (
                  <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                )}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Log in
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    {`Don't have an account? `}
                    <a href="/auth/signup" className="text-gray-700 underline">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
