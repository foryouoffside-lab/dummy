// app/api/verify-google/route.js
// Serves the Google verification HTML file
// Only needed if DNS verification doesn't work

import { NextResponse } from 'next/server';

export async function GET() {
  // Replace this with the actual code Google gives you
  // Google will give you a file like: googleXXXXX.html
  // The content is: google-site-verification: googleXXXXX.html
  
  const verificationCode = 'google-site-verification=YOUR_CODE_HERE';
  
  return new NextResponse(verificationCode, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}