
'use client';

import Image from "next/image";
import "./navbar.scss";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navData = [1, 2,3,4,5];

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar(props: NavbarProps ) {
  const { isLoggedIn } = props;
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  
  return (
    <div className="flex justify-between px-3 py-7 navbar">
      <div className="w-1/3 font-semibold text-2xl">
       <Link className="pl-1" href={"/"}>Drollon</Link>
      </div>
      <div> 
        <div className="flex justify-between gap-6">
          {!isLoggedIn && (
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
          {isLoggedIn && navData.map((nav, key) => (
            <Image
              key={`image_${key}`}
              src={key !== 2 ? "/file.svg" : "/notifications.svg"}
              alt="File icon"
              width={20}
              height={20}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
