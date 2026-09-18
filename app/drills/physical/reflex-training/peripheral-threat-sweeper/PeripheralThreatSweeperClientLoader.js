'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./PeripheralThreatSweeperClient'), { ssr: false });
