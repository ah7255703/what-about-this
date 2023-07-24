import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleMatchesChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        setMatches(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', handleMatchesChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleMatchesChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
