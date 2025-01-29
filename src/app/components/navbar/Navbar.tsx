
'use client';

import Image from "next/image";
import "./navbar.scss";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

const navData = [1, 2,3,4,5];

interface NavbarProps {

}

export default function Navbar(props: NavbarProps ) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const router = useRouter();
  const authToken = typeof window !== "undefined" && window.localStorage.getItem("authToken");

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    router.push('/login');
  }

  useEffect(() => {
    if (!authToken) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex justify-between px-3 py-7 navbar">
      <div className="w-1/3 font-semibold text-2xl">
       <Link className="pl-1" href={"/"}>Drollon</Link>
      </div>
      <div> 
        <div className="flex justify-between gap-6">
          {!authToken && (
            <div>
              <span>{isLoginPage ?  "Don't have an account?" : "Already playing with Drollon?"}</span> 
              <span className="ml-4"> 
                <Link 
                  href={isLoginPage ? "/signup" : "/login"} 
                  className="bg-black text-white font-bold py-2 px-4 rounded w-full"
                >
                  {isLoginPage ? "sign up" : "login"}
                </Link> 
              </span>
            </div>
          )}
          {authToken && navData.map((nav, key) => (
            <Image
              key={`image_${key}`}
              src={key !== 2 ? "/file.svg" : "/notifications.svg"}
              alt="File icon"
              width={20}
              height={20}
            />
          ))}
          {authToken && (
            <span 
              onClick={handleLogout}
              className="cursor-pointer"
            >
              logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
