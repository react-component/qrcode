<div align="center">
  <h1>@rc-component/qrcode</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>🔳 React 二维码组件，支持 Canvas、SVG、纠错等级和嵌入 logo。</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/qrcode"><img src="https://img.shields.io/npm/v/@rc-component/qrcode.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://npmjs.org/package/@rc-component/qrcode"><img src="https://img.shields.io/npm/dm/@rc-component/qrcode.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/qrcode/actions"><img src="https://github.com/react-component/qrcode/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://app.codecov.io/gh/react-component/qrcode"><img src="https://img.shields.io/codecov/c/github/react-component/qrcode/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/qrcode"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/qrcode" alt="Bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- `QRCodeCanvas` 和 `QRCodeSVG` 导出用于不同的渲染目标。
- 支持自定义尺寸、颜色、标题文本、边距、纠错级别和最小二维码版本。
- 通过挖掘和可选的跨域处理支持嵌入徽标图像。
- QR 属性和图像设置的 TypeScript 定义。

## 安装

```bash
npm install @rc-component/qrcode
```

## 使用

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

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### QRCodeCanvas

`QRCodeCanvas` 接受 `QRProps` 加上本机画布属性。

### QRCodeSVG

`QRCodeSVG` 接受 `QRProps` 加上本机 SVG 属性。

### QRProps

| 名称            | 类型                             | 默认值     | 说明                                                                                        |
| --------------- | -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `bgColor`       | string                           | `'#FFFFFF'` | 背景色。                                                                                           |
| `boostLevel`    | boolean                          | true        | 允许编码器在可能的情况下提高纠错级别，而无需增加 QR 版本。 |
| `fgColor`       | string                           | `'#000000'` | 前景色。                                                                                           |
| `imageSettings` | ImageSettings                    | -           | 内嵌图片配置。                                                                      |
| `includeMargin` | boolean                          | false       | 已弃用。请改用 `marginSize`。                                                              |
| `level`         | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'L'`       | 纠错等级。                                                                                         |
| `marginSize`    | number                           | 0           | 二维码模块的外边距大小。                                                                           |
| `minVersion`    | number                           | 1           | 最低 QR 码版本从 1 到 40。                                                              |
| `size`          | number                           | 128         | 渲染尺寸，单位为像素。                                                                             |
| `style`         | React.CSSProperties              | -           | 元素风格。                                                                                     |
| `title`         | string                           | -           | Accessible title.                                                                                  |
| `value`         | string \| string[]               | -           | 编码到二维码中的内容。                                                                  |

### ImageSettings

| 名称          | 类型                                         | 默认值  | 说明                                   |
| ------------- | -------------------------------------------- | -------- | --------------------------------------------- |
| `crossOrigin` | `'anonymous'` \| `'use-credentials'` \| `''` | -        | 嵌入图像的跨源行为。 |
| `excavate`    | boolean                                      | -        | 清除嵌入图像下的 QR 模块。    |
| `height`      | number                                       | -        | 图像高度（以像素为单位）。                       |
| `opacity`     | number                                       | 1        | 图像不透明度从 0 到 1。                    |
| `src`         | string                                       | -        | Image URI.                                    |
| `width`       | number                                       | -        | 图像宽度（以像素为单位）。                        |
| `x`           | number                                       | centered | 水平偏移。                                   |
| `y`           | number                                       | centered | 垂直偏移。                                   |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/qrcode 基于 [MIT](./LICENSE) 许可证发布。
