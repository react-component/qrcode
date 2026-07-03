<div align="center">
  <h1>@rc-component/qrcode</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>🔳 React QR Code components for canvas and SVG rendering.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/qrcode"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/qrcode.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/qrcode"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/qrcode.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/qrcode/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/qrcode/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/qrcode"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/qrcode/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/qrcode"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/qrcode?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- `QRCodeCanvas` and `QRCodeSVG` exports for different rendering targets.
- Supports custom size, colors, title text, margins, error correction level, and minimum QR version.
- Supports embedded logo images with excavation and optional cross-origin handling.
- TypeScript definitions for QR props and image settings.

## Install

```bash
npm install @rc-component/qrcode
```

## Usage

```tsx | pure
import { QRCodeCanvas } from '@rc-component/qrcode';
export default () => (
  <QRCodeCanvas value="https://ant.design" size={200} title="Ant Design" />
);
```

```tsx | pure
import { QRCodeSVG } from '@rc-component/qrcode';
export default () => (
  <QRCodeSVG
    value="https://ant.design"
    size={200}
    level="H"
    imageSettings={{
      src: 'https://avatars0.githubusercontent.com/u/9441414?s=30&v=4',
      width: 30,
      height: 30,
      excavate: true,
    }}
  />
);
```

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### QRCodeCanvas

`QRCodeCanvas` accepts `QRProps` plus native canvas attributes.

### QRCodeSVG

`QRCodeSVG` accepts `QRProps` plus native SVG attributes.

### QRProps

| Name            | Type                             | Default     | Description                                                                                        |
| --------------- | -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `bgColor`       | string                           | `'#FFFFFF'` | Background color.                                                                                  |
| `boostLevel`    | boolean                          | true        | Allow the encoder to raise the error correction level when possible without increasing QR version. |
| `fgColor`       | string                           | `'#000000'` | Foreground color.                                                                                  |
| `imageSettings` | ImageSettings                    | -           | Embedded image configuration.                                                                      |
| `includeMargin` | boolean                          | false       | Deprecated. Use `marginSize` instead.                                                              |
| `level`         | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'L'`       | Error correction level.                                                                            |
| `marginSize`    | number                           | 0           | Margin size in QR modules.                                                                         |
| `minVersion`    | number                           | 1           | Minimum QR Code version from 1 to 40.                                                              |
| `size`          | number                           | 128         | Rendered size in pixels.                                                                           |
| `style`         | React.CSSProperties              | -           | Element style.                                                                                     |
| `title`         | string                           | -           | Accessible title.                                                                                  |
| `value`         | string \| string[]               | -           | Content encoded into the QR Code.                                                                  |

### ImageSettings

| Name          | Type                                         | Default  | Description                                   |
| ------------- | -------------------------------------------- | -------- | --------------------------------------------- |
| `crossOrigin` | `'anonymous'` \| `'use-credentials'` \| `''` | -        | Cross-origin behavior for the embedded image. |
| `excavate`    | boolean                                      | -        | Clear QR modules under the embedded image.    |
| `height`      | number                                       | -        | Image height in pixels.                       |
| `opacity`     | number                                       | 1        | Image opacity from 0 to 1.                    |
| `src`         | string                                       | -        | Image URI.                                    |
| `width`       | number                                       | -        | Image width in pixels.                        |
| `x`           | number                                       | centered | Horizontal offset.                            |
| `y`           | number                                       | centered | Vertical offset.                              |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/qrcode is released under the [MIT](./LICENSE) license.
