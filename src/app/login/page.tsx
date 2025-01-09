'use client';

import Image from "next/image";
import Form from "../components/form/form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import './login.scss';

export default function Login() {
  const router = useRouter();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if(authToken) {
      router.push('/');
    } 
  }, []);

  
  return (
    <div className="w-full h-full	font-[family-name:var(--font-geist-sans)] login-page">
      <main className="flex flex-col h-full	">
        <div className=" mt-10">
          <Form type="login" />
        </div>
      </main>
    </div>
  );
}