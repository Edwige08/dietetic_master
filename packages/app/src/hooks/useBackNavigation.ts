'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useBackNavigation(fallbackHref = '/dashboard') {
    const router = useRouter();
    return useCallback(() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
            return;
        }
        router.push(fallbackHref);
    }, [router, fallbackHref]);
}
