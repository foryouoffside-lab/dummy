'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./InfinityPursuitClient'), { ssr: false });
