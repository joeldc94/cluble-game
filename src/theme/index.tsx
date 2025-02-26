"use client"
import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

import { typography } from './typography';

/* import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows'; */

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const memoizedValue = useMemo(() => ({
        //palette: palette(),
        typography,
        //shadows: shadows(),
        //customShadows: customShadows(),
        //shape: { borderRadius: 8 },
    }), []);
    const theme1 = createTheme(memoizedValue);
    //theme1.components = overrides(theme1);
    const theme = createTheme(theme1, ptBR);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}