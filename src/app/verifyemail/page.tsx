"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";
import Button from '../../components/themeBtn'


export default function VerifyEmailPage() {
//   const router = useRouter();
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Verify Email Sucessfully", response);
      setVerify(true);
      setError(false)
    } catch (error: any) {
      console.log("Verify Email Failed");
      console.log(error.response.data);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // second approach and better approach also
    // const {query} = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Button/>
      <h1 className="text-4xl">Verify Email</h1>
      <h1 className="p-2 bg-red-700 text-black mt-4">
        {token ? `${token}` : "No token found"}
      </h1>
      {verify && (
        <>
          <h1 className="p-2 bg-green-700 text-black">
            Email Verified Successfully
          </h1>
          <Link href="/login">Login</Link>
        </>
      )}
      {error && (
        <>
          <h1 className="p-2 bg-green-700 text-black">
            Error
          </h1>
        </>
      )}
    </div>
  );
}
