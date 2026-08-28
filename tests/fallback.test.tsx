import { render } from '@testing-library/react';
import React from 'react';

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  isSupportPath2d: false,
}));

import { QRCodeCanvas } from '../src/QRCodeCanvas';

describe('Canvas fallback rendering', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('excavates modules behind an embedded image without Path2D', () => {
    jest
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    jest
      .spyOn(HTMLImageElement.prototype, 'naturalHeight', 'get')
      .mockReturnValue(128);
    jest
      .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
      .mockReturnValue(128);
    const fillRect = jest.spyOn(CanvasRenderingContext2D.prototype, 'fillRect');

    render(
      <QRCodeCanvas
        value="https://ant.design"
        imageSettings={{
          src: 'logo.png',
          width: 128,
          height: 128,
          x: 0,
          y: 0,
          excavate: true,
        }}
      />,
    );

    // The full-size image excavates the complete QR matrix, leaving only the
    // background fill. Individual dark modules must not be painted beneath it.
    expect(fillRect).toHaveBeenCalledTimes(1);
  });
});
