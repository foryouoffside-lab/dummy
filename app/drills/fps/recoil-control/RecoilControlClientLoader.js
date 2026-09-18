'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./RecoilControlClient'), { ssr: false });
