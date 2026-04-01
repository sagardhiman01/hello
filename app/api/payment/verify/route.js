import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { getSettings } from '@/lib/settings';

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    const settings = await getSettings();
    
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      shippingAddress,
      items,
      totalAmount
    } = await request.json();

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', settings.razorpay_key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Create order in SQLite database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        items: JSON.stringify(items || []),
        shippingAddress: JSON.stringify(shippingAddress || {}),
        subtotal: totalAmount,
        shippingCharge: 0,
        tax: 0,
        totalAmount: totalAmount,
        paymentMethod: 'razorpay',
        paymentResult: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          status: 'completed',
        }),
        isPaid: true,
        paidAt: new Date(),
        status: 'confirmed',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Payment verified and order placed successfully',
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Please login to proceed' }, { status: 401 });
    }
    console.error('Payment Verification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
