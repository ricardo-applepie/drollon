

'use client';

import Link from "next/link";
import { useState } from "react";
import { updateGroups } from "@/app/redux/board/board";
import { useDispatch } from "react-redux";
import { postData } from "@/utils/utils";
import { useParams } from "next/navigation";
import './form.scss';

import Item from "../Item/Item";
import PopUpModal from "../popup/Popupmodal";

type Formtype = "login" |"signup"

interface FromProps {
  type: Formtype
}

export default function Form(props: FromProps) {
  const { type } = props;
  const isLogin = type === "login";

  return (
    <div className="w-full login-page-new__main">
         <div className="form-wrapper">
            <h1 className="text-center text-2xl mb-5"> {isLogin ? "Seconds to login!" : "Seconds to sign up!"} </h1>
            <form className="bg-white shadow-md rounded px-12 pt-10 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workEmail">
                  Work email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workEmail" type="email" placeholder="Enter current work email" />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex flex-col">
                <button className="bg-black text-white font-bold py-2 px-4 rounded " type="button">
                  {isLogin ? "log In" : " Sign Up"}
                </button>
                {isLogin && (
                    <Link className=" text-black inline-block mt-4 text-center align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/password-forgot">
                        Forgot Password?
                    </Link>
                )}

                </div>
                <p className="text-center text-gray-500 text-xs mt-5">
                    &copy;2024 drollon. All rights reserved.
                </p>
            </form>
         </div>
    </div>
  );
};
