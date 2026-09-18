'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./ReactionChainClient'), { ssr: false });
