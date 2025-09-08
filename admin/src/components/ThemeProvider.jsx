import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
    const dark = useSelector(state => state.theme.dark);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    return <>{children}</>;
}