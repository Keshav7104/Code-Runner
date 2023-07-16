import { writeFileSync, rm } from 'fs';
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { Readable } from "stream"
import { v4 } from "uuid"

function writeCodeToFile(language, code) {
  // Generate a unique file name
  const fileName = `${v4()}.${language}`;

  try {
    // Write the code to the file
    writeFileSync(fileName, code);
    return `${fileName}`;
  } catch (error) {
    return 'Error: ' + error.message;
  }
}

async function executeCodeFile(filePath, extension, input) {
  switch (extension) {
    case 'c':
    case 'cpp':
      return await executeCppFile(filePath, input);
    case 'py':
      return await executePythonFile(filePath, input);
    case 'java':
      return await executeJavaFile(filePath, input);
    default:
      throw new Error('Unsupported file extension');
  }
}


function executeCppFile(filePath, input) {
  return new Promise((resolve, reject) => {
    const command = `g++ ${filePath}  && a.exe`;

    const executionProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve(error.message)
      } else if (stderr) {
        resolve(stderr.trim())
      } else {
        resolve(stdout);
      }
    });

    const inputStream = Readable.from(JSON.stringify(input));
    inputStream.pipe(executionProcess.stdin);
  });
}
async function executePythonFile(filePath, input) {
  const inputStr = JSON.stringify(input);

  return new Promise((resolve) => {
    const pythonProcess = exec(`python ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        resolve(error.message)
      } else if (stderr) {
        resolve(stderr.trim())
      } else {
        resolve(stdout);
      }
    });

    const inputStream = Readable.from(inputStr);
    inputStream.pipe(pythonProcess.stdin);
  });
}


function executeJavaFile(filePath, input) {
  return new Promise((resolve, reject) => {
    const command = `java ${filePath}`;

    const executionProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve(error.message)
      } else if (stderr) {
        resolve(stderr.trim())
      } else {
        resolve(stdout);
      }
    });

    const inputStream = Readable.from(JSON.stringify(input));
    inputStream.pipe(executionProcess.stdin);
  });
}

function del(file){
  rm(file,{recursive:true},(err)=>{
    if(err){
      console.log(err);
    }
    else{
      // console.log("Output is genrated & file is deleted")
    }
  })
}


export async function POST(req) {
  const data = await req.json()
  try {
    const file = writeCodeToFile(data.userLang, data.userCode)
    const output = await executeCodeFile(file, data.userLang, data.userInput)
    del(file)
    return NextResponse.json({ status: 200, output })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, error })
  }
}