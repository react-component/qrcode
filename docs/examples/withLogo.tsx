import { QRCodeCanvas } from 'rc-qrcode';
import React from 'react';

export default () => {
  const [value, setValue] = React.useState('https://ant-design.antgroup.com/');
  return (
    <div>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        type="text"
        placeholder="The value of qrcode"
        style={{ width: '100%' }}
      />
      <hr />
      <QRCodeCanvas
        value={value}
        size={200}
        imageSettings={{
          src: 'https://avatars0.githubusercontent.com/u/9441414?s=30&v=4',
          width: 30,
          height: 30,
          excavate: true,
        }}
      />
    </div>
  );
};
