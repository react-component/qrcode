import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  alias: {
    '@rc-component/qrcode$': path.resolve('src'),
    '@rc-component/qrcode/es': path.resolve('src'),
  },
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: 'QRCode',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  outputPath: 'docs-dist',
  base: process.env.GH_PAGES ? '/qrcode/' : '/',
  publicPath: process.env.GH_PAGES ? '/qrcode/' : '/',
});
