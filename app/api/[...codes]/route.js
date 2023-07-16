import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";
export async function GET(req,{params}) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  
    try {
      const database = client.db('Code-runner');
      const codes = database.collection('user-codes');
    //   const {username} = req.query;
      // console.log(params.codes[0])
      const query = { username: params.codes[0] }
      const code = await codes.find(query).toArray()
      return NextResponse.json(code)
    }catch(error){
      return NextResponse.json({error:"Internal Sever error try again after sometime"})
    }
     finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }