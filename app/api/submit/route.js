import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const uri = "mongodb+srv://keshavbhutaani1360:TUTDY8Ee2ZFTN4Df@structures.idgxvjs.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    const database = client.db('Code-runner');
    const codes = database.collection('user-codes');
    const data = await req.json()
    const code = await codes.insertOne({...data})
    return NextResponse.json({status:201,message:"Data uploaded Succesfully",code})
  }catch(error){
    return NextResponse.json({status:500,message:"Internal Server error try again after sometime"})
  }
   finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}