import { defineConfig } from 'dumi';
import path from 'path';

const basePath = process.env.GH_PAGES ? '/qrcode/' : '/';
const publicPath = basePath;

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
  base: basePath,
  publicPath,
});
