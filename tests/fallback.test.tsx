import { render } from '@testing-library/react';
import React from 'react';
import { QRCodeCanvas } from '../src/QRCodeCanvas';
import { waitFakeTimer } from './_utils';

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  isSupportPath2d: false,
}));

describe('QRCodeCanvas fallback when Path2D is unsupported', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest
      .spyOn(HTMLImageElement.prototype, 'complete', 'get')
      .mockReturnValue(true);
    jest
      .spyOn(HTMLImageElement.prototype, 'naturalHeight', 'get')
      .mockReturnValue(128);
    jest
      .spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get')
      .mockReturnValue(128);
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('excavates modules behind image using cellsToDraw in fallback mode', async () => {
    const fillRectSpy = jest.spyOn(
      CanvasRenderingContext2D.prototype,
      'fillRect',
    );
    fillRectSpy.mockClear();

    const App = ({ excavate }: { excavate: boolean }) => (
      <QRCodeCanvas
        value="https://ant.design"
        size={128}
        imageSettings={{
          src: 'https://avatars.githubusercontent.com/u/10286961',
          width: 30,
          height: 30,
          excavate,
        }}
      />
    );

    const { rerender } = render(<App excavate={false} />);
    await waitFakeTimer();
    const nonExcavatedCalls = fillRectSpy.mock.calls.length;

    fillRectSpy.mockClear();
    rerender(<App excavate={true} />);
    await waitFakeTimer();
    const excavatedCalls = fillRectSpy.mock.calls.length;

    expect(excavatedCalls).toBeLessThan(nonExcavatedCalls);
  });
});
