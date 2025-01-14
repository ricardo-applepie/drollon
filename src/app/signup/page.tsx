'use client';

import Image from "next/image";
import Form from "../components/form/form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import './signUp.scss';

export default function SignUp() {
    const router = useRouter();
    const authToken = typeof window !== 'undefined' && window.localStorage.getItem("authToken");
  
    useEffect(() => {
      if(authToken) {
        router.push('/');
      } 
    }, []);
  
  return (
    <div className="w-full h-full	font-[family-name:var(--font-geist-sans)] signUp-page">
      <main className="flex flex-col h-full	">
        <div className=" mt-10">
          <Form type="signup" />
        </div>
      </main>
    </div>
  );
};