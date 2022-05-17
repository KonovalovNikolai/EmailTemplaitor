import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#2C2C2C',
            light: '#ECECEC',
            dark: '#828282',
            contrastText: '#fff',
        },
    }
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

export default theme;