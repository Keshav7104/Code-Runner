"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
const Codecard = ({userLang,usercode,useroutput}) => {
    return (
        <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{userLang}</h2>
                <p className="leading-relaxed text-base">{usercode}</p>
                <p className="lg:w-1/2 w-full leading-relaxed text-red-500">OUTPUT : {useroutput}</p>
            </div>
        </div>
    )
}

const Profile = () => {
    
    const [codes, setDocuments] = useState([]);  
    const search = useSearchParams()
    const username = search.get("username")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${username}`); // Replace 'john' with the desired username or provide it dynamically

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        // console.error('Error:', error);
        window.alert("Sever Error try again after sometime")
      }
    };

    fetchData();
  }, []);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{username}</h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Run and save all your code with code-runner and acesess them anytime you want</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {codes.map((doc,index)=>(
                        <Codecard key={index} userLang={doc.userLang} usercode={doc.userCode} useroutput={doc.userOutput} />
                    ))}
                </div>
                <Link href="/" className="flex w-52 text-center h-10 mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Back to compiler</Link>
            </div>
        </section>
    )
}

export default Profile