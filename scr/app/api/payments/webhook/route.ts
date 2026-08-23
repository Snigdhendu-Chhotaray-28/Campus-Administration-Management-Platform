import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In production, verify Stripe signature here
    if (body.type === 'payment_intent.succeeded') {
      const paymentIntent = body.data.object;
      
      await db.payment.create({
        data: {
          studentId: paymentIntent.metadata.studentId,
          amount: paymentIntent.amount / 100,
          status: 'SUCCESS',
          transactionId: paymentIntent.id,
          purpose: paymentIntent.metadata.purpose
        }
      });
      
      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}
