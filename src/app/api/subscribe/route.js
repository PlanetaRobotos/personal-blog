// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        const email = body.email;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { message: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Check if the email already exists
        const { data: existingSubscription, error: checkError } = await supabase
            .from('subscriptions')
            .select('email')
            .eq('email', email)
            .maybeSingle();

        if (existingSubscription) {
            return NextResponse.json(
                { message: 'You are already subscribed!' },
                { status: 200 }
            );
        }

        // Save the email to Supabase
        const { data, error: insertError } = await supabase
            .from('subscriptions')
            .insert([
                { email, created_at: new Date().toISOString() }
            ]);

        if (insertError) {
            console.error('Error inserting subscription:', insertError);
            return NextResponse.json(
                { message: 'Database error: ' + insertError.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Subscription successful!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Failed to subscribe: ' + error.message },
            { status: 500 }
        );
    }
}