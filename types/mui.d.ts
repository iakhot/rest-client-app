import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    get: Palette['primary'];
    post: Palette['primary'];
    put: Palette['primary'];
    patch: Palette['primary'];
    delete: Palette['primary'];
    head: Palette['primary'];
    options: Palette['primary'];
    retry: Palette['primary'];
  }

  interface PaletteOptions {
    get?: PaletteOptions['primary'];
    post?: PaletteOptions['primary'];
    put?: PaletteOptions['primary'];
    patch?: PaletteOptions['primary'];
    delete?: PaletteOptions['primary'];
    head?: PaletteOptions['primary'];
    options?: PaletteOptions['primary'];
    retry?: PaletteOptions['primary'];
  }
}
