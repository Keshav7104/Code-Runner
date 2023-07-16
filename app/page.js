"use client"

import { useState } from 'react'
import Editor from "@monaco-editor/react"
import Navbar from "../Components/navbar";

function App() {

	// State variable to set users source code
	const [userCode, setUserCode] = useState(``);

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("py");

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// State variable to store user name
	const [username, setusername] = useState("")


	const options = {
		fontSize: fontSize
	}


	const compile = async (e) => {
		e.preventDefault();
		// setLoading(true)
		if (username === "") {
			window.alert("Please sign-in first")
		}
		else {
			setUserOutput('Submission Queued')
			try {
				const response = await fetch('http://compilethecode.netlify.app/api/result', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userCode, userLang, userInput })
				});
				setUserOutput('Running the code snippet')
				const data = await response.json();
				//   setLoading(false)
				setUserOutput(data.output);
			} catch (error) {
				// console.error(error);
				// window.alert("Server Er")
				//   setLoading(false)
				setUserOutput('An error occurred');
			}
		}
	};

	const submitCode = async () => {
		if(username===""){
			window.alert("Please log in first")
		}
		else{
			try {
				setUserOutput("Data queued for server")
				const response = await fetch('https://compilethecode.netlify.app/api/submit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						userCode,
						userLang,
						userOutput
					})
				});
	
				const data = await response.json();
				setUserOutput(data.message)
			} catch (error) {
				// console.error(error);
				window.alert("Server error try after sometime")
			}
		}
	};

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="max-h-screen w-full overflow-y-hidden bg-[#474747]">
			<Navbar
				userLang={userLang} setUserLang={setUserLang}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
				username={username} setusername={setusername}
			/>
			<div className="flex h-[calc(100vh_-_80px)]">
				<div className="relative flex-[60%] h-[calc(100vh_-_80px)]">
					<Editor
						options={options}
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme}
						language={userLang}
						defaultLanguage="python"
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }}
					/>
					<button className="absolute w-20 h-10 text-[22px] font-[bold] bg-blue-500 rounded transition-[0.3s] cursor-pointer border-[none] right-[18px] bottom-2.5 active:bg-blue-700" onClick={(e) => compile(e)}>
						Run
					</button>
					<button className="absolute w-20 h-10 text-[22px] font-[bold] bg-blue-500 rounded transition-[0.3s] cursor-pointer border-[none] right-[120px] bottom-2.5 active:bg-blue-700" onClick={() => submitCode()}>
						Submit
					</button>
				</div>

				<div className={`flex-[40%] h-[calc(100vh_-_80px)] flex flex-col  border-solid p-[5px] border-l-[3px] ${userTheme === "vs-dark" ? "bg-[#242424] border-l-[#fffff0]" : "bg-[#fffff0] border-l-[#242424]"}`}>
					<h4 className={`${userTheme === "vs-dark" ? "text-[#fffff0]" : " text-[#242424]"}`}>Input:</h4>
					<div className="flex-[50%]">
						<textarea className={`text-base box-border w-full h-full resize-none p-[5px] focus:outline-none ${userTheme === "vs-dark" ? "bg-[#242424] border-l-[#fffff0] text-[#fffff0]" : "bg-[#fffff0] border-l-[#242424] text-[#242424]"}`} id="code-inp" onChange=
							{(e) => setUserInput(e.target.value)}>
						</textarea>
					</div>
					<h4 className={`${userTheme === "vs-dark" ? "text-[#fffff0]" : " text-[#242424]"}`}>Output:</h4>
					<div className="flex-[50%] bg-[#242424] overflow-y-auto text-[white] relative">
						<pre className={`text-[15px] whitespace-pre-wrap text-base box-border w-full h-full resize-none p-[5px] focus:outline-none ${userTheme === "vs-dark" ? "bg-[#242424] border-l-[#fffff0]" : "bg-[#fffff0] border-l-[#242424]"} `}>{userOutput}</pre>
						<button onClick={() => { clearOutput() }}
							className=" absolute w-20 h-10 text-[22px] font-[bold] text-[white] bg-[#1f65e6] rounded transition-[0.3s] cursor-pointer border-[none] right-[18px] bottom-3.5">
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
