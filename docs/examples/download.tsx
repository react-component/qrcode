import { QRCodeCanvas } from '@rc-component/qrcode';
import React, { useRef } from 'react';

const downloadQRCode = (container: HTMLDivElement | null) => {
  const canvas = container?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export default () => {
  const [value, setValue] = React.useState('https://ant-design.antgroup.com/');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        type="text"
        placeholder="The value of qrcode"
        style={{ width: '80%' }}
      />
      <button onClick={() => downloadQRCode(containerRef.current)}>
        Download QRCode
      </button>
      <hr />
      <QRCodeCanvas
        value={value}
        size={200}
        imageSettings={{
          src: 'https://avatars0.githubusercontent.com/u/9441414?s=30&v=4',
          width: 30,
          height: 30,
          excavate: true,
          crossOrigin: 'anonymous',
        }}
      />
    </div>
  );
};
