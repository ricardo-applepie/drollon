'use client';

import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useState } from "react";
import { postData } from "@/utils/utils";
import './form.scss';
import { setBoard } from '@/app/redux/board/board';
import { useDispatch } from 'react-redux';

type FormType = "login" | "signup";

interface FormProps {
  type: FormType;
}

export default function Form(props: FormProps) {
  const { type } = props;
  const isLogin = type === "login";
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Initial form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const endpoint = isLogin ? "/api/v1/login" : "/api/v1/signup";
    try {
        const response = await postData(endpoint, formData);
        
        if(response.token) {
          window.localStorage.setItem("authToken", response.token);
          router.push('/');
        }
        setLoading(false);

    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div className="w-full login-page-new__main">
      <div className="form-wrapper">
        <h1 className="text-center text-2xl mb-5">
          {isLogin ? "Seconds to Login!" : "Seconds to Sign Up!"}
        </h1>
        <form className="bg-white shadow-md rounded px-12 pt-10 pb-8 mb-4">
           {!isLogin && (
            <> 
                {/* First Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                {/* Username */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>   
            </>
           )}

          {/* email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Work Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            {isLogin && (
              <Link
                className="text-black inline-block mt-4 text-center align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/password-forgot"
              >
                Forgot Password?
              </Link>
            )}
          </div>
          {errorMessage && errorMessage}
          <p className="text-center text-gray-500 text-xs mt-5">
            &copy;2024 drollon. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}
