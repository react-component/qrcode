import { QRCodeCanvas } from 'rc-qrcode';
import React from 'react';

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
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
  return (
    <div id="myqrcode">
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        type="text"
        placeholder="The value of qrcode"
        style={{ width: '80%' }}
      />
      <button onClick={downloadQRCode}>Download QRCode</button>
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
