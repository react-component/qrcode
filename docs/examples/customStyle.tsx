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
        title="Ant Design"
        fgColor="green"
        bgColor="#fff"
        style={{ border: '5px solid #000', borderRadius: '10px', padding: '10px'}}
      />
    </div>
  );
};
