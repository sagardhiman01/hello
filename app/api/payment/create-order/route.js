import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSettings } from '@/lib/settings';

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    const { amount, currency, receipt } = await request.json();
    
    // Fetch dynamic settings from DB
    const settings = await getSettings();
    
    if (settings.razorpay_enabled !== 'true') {
      return NextResponse.json({ error: 'Razorpay payment is currently disabled' }, { status: 400 });
    }

    if (!settings.razorpay_key_id || !settings.razorpay_key_secret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    // Initialize Razorpay with database keys
    const razorpay = new Razorpay({
      key_id: settings.razorpay_key_id,
      key_secret: settings.razorpay_key_secret,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: currency || settings.payment_currency || 'INR',
      receipt: receipt || `order_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({
      success: true,
      key: settings.razorpay_key_id, // Return public key ID for checkout UI
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Please login to proceed' }, { status: 401 });
    }
    console.error('Create Order API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
