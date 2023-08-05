"use client"

import React,{useState} from 'react';
import Select from 'react-select';
import {signIn,getSession} from "next-auth/react"
import Link from 'next/link';

const Navbar = ({ userLang, setUserLang, userTheme,
	setUserTheme, fontSize, setFontSize ,username,setusername}) => {
	const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },
		{ value: "py", label: "Python" },
		{ value: "java", label: "Java" },
	];
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" }
	];
	// const route =useRouter()
	const [logged, setlogged] = useState(true)
	const sign= async()=>{
		const session = await getSession()
		if(!session){
			signIn()
		}
		setlogged(false)
		setusername(session.user.name)
	}
	return (
		<div className={"flex items-center h-[80px] text-center  gap-7 pl-5" + (userTheme==="vs-dark"?"text-[#fffff0] bg-[#474747]":"text-[#474747] bg-[#fffff0]")}>
			<h1 className='text-5xl font-semibold font-mono'>DevTown Compiler</h1>
			<Select options={languages} value={userLang}
				onChange={(e) => setUserLang(e.value)}
				placeholder={userLang} className='text-[#474747]' />
			<Select options={themes} value={userTheme}
				onChange={(e) => setUserTheme(e.value)}
				placeholder={userTheme} className='text-[#474747]' />
			<div>
            <label>Font Size</label>
			<input type="range" min="18" max="30"
				value={fontSize} step="2"
				onChange={(e) => { setFontSize(e.target.value) }} />
            </div>
			{logged?
			<button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
				onClick={sign}>Sign In</button>:
				<Link href={{pathname:'/profile',query:{username:username}}}>{username}</Link>}
		</div>
	)
}

export default Navbar
