'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./ReactionTimeTestWrapper'), { ssr: false });
