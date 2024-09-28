import { NextRequest } from "next/server"

export const dynamic = 'force-static'
 
export async function GET(req : NextRequest) {

  const email = req.body
  console.log(email)
}