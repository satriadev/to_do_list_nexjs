"use Client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T)
{
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item) as T);
                }
            } catch (error) {
                console.error(`Error reading localStorage key "${key}"`, error);
            }
            setIsLoaded(true);
        }, [key],
    );

    useEffect(() => {
        if (isLoaded) {
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        }
    }, [key, storedValue, isLoaded]);

    return [storedValue, setStoredValue, isLoaded] as const;
}