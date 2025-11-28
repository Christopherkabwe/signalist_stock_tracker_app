"use client";

import { useCallback, useRef } from 'react';

/**
 * Return a debounced function that delays invocation until after `wait` ms
 * of no calls. This matches the expected usage in SearchCommand where the
 * hook returns a function that can be invoked to schedule the work.
 */
export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay = 300) {
    // In browser env setTimeout returns a numeric id; using number keeps types simple
    const timeoutRef = useRef<number | null>(null);

    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => callback(...args), delay) as unknown as number;
    }, [callback, delay]);
}
