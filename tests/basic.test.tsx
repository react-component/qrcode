import { render } from '@testing-library/react';
import React from 'react';
import { QRCodeCanvas } from '../src/QRCodeCanvas';
import { QRCodeSVG } from '../src/QRCodeSVG';
import { waitFakeTimer } from './_utils';

const Comps = [QRCodeCanvas, QRCodeSVG];

describe('About QRCode Render', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  Comps.forEach((Comp) => {
    it(`【${Comp.displayName}】Basic Render`, async () => {
      const ref = React.createRef<HTMLCanvasElement | SVGAElement>();
      const App = () => <Comp value="https://ant.design" ref={ref as any} />;
      render(<App />);
      await waitFakeTimer();
      if (Comp === QRCodeSVG) {
        const ele: SVGAElement = ref.current as SVGAElement;
        expect(document.querySelector('svg')).toBeTruthy();
        expect(ele.getAttribute('width')).toBe('128');
        expect(ele.getAttribute('height')).toBe('128');
      } else {
        const ele: HTMLCanvasElement = ref.current as HTMLCanvasElement;
        expect(document.querySelector('canvas')).toBeTruthy();
        expect(ele.width).toBe(128);
        expect(ele.height).toBe(128);
      }
    });
    it(`【${Comp.displayName}】Render with custom size`, async () => {
      const ref = React.createRef<HTMLCanvasElement | SVGAElement>();
      const App = () => <Comp value="https://ant.design" ref={ref as any} size={200} />;
      render(<App />);
      await waitFakeTimer();
      if (Comp === QRCodeSVG) {
        const ele: SVGAElement = ref.current as SVGAElement;
        expect(document.querySelector('svg')).toBeTruthy();
        expect(ele.getAttribute('width')).toBe('200');
        expect(ele.getAttribute('height')).toBe('200');
      } else {
        const ele: HTMLCanvasElement = ref.current as HTMLCanvasElement;
        expect(document.querySelector('canvas')).toBeTruthy();
        expect(ele.width).toBe(200);
        expect(ele.height).toBe(200);
      }
    });
    it(`【${Comp.displayName}】Render with custom style`, async () => {
      const ref = React.createRef<HTMLCanvasElement | SVGAElement>();
      const App = () => <Comp value="https://ant.design" ref={ref as any} style={{ border: '2px solid #000' }} />;
      render(<App />);
      await waitFakeTimer();
      if (Comp === QRCodeSVG) {
        const ele: SVGAElement = ref.current as SVGAElement;
        expect(document.querySelector('svg')).toBeTruthy();
        expect(ele).toHaveStyle('border: 2px solid #000');
      } else {
        const ele: HTMLCanvasElement = ref.current as HTMLCanvasElement;
        expect(document.querySelector('canvas')).toBeTruthy();
        expect(ele).toHaveStyle('border: 2px solid #000');
      }
    });
    it(`【${Comp.displayName}】Render with title`, async () => {
      const ref = React.createRef<HTMLCanvasElement | SVGAElement>();
      const App = () => <Comp value="https://ant.design" ref={ref as any} title='Ant Design' />;
      render(<App />);
      await waitFakeTimer();
      if (Comp === QRCodeSVG) {
        const ele: SVGAElement = ref.current as SVGAElement;
        expect(document.querySelector('svg')).toBeTruthy();
        expect(ele.querySelector('title').innerHTML).toBe('Ant Design');
      } else {
        const ele: HTMLCanvasElement = ref.current as HTMLCanvasElement;
        expect(document.querySelector('canvas')).toBeTruthy();
        expect(ele.getAttribute('title')).toBe('Ant Design');
      }
    });
  });
});
