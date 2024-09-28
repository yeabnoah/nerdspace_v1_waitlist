import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { isValidEmail } from '@/lib/utils'
import Subscriber from '@/model/Subscriber'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await connectDB()

    const existingUser = await Subscriber.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }

    const newSubscriber = await Subscriber.create({ email })

    return NextResponse.json({ message: 'Subscription successful', subscriber: newSubscriber }, { status: 201 })
  } catch (error) {
    console.error('Error in signup route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}