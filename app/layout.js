'use client';

import './../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="description" content="Free platform for FPS gaming drills and cognitive training. Improve reaction time, memory, focus and aim tracking." />
        <title>Global Drill System - FPS & Cognitive Training</title>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}