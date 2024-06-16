import type { ErrorCorrectionLevel } from 'rc-qrcode';
import { QRCodeCanvas } from 'rc-qrcode';
import React from 'react';

export default () => {
  const [value, setValue] = React.useState('https://ant-design.antgroup.com/');
  const [level, setLevel] = React.useState('L');
  return (
    <div>
      <span onChange={(e) => setLevel((e.target as HTMLInputElement).value)}>
        <input type="radio" name="level" value="L" id="L" defaultChecked />
        <label htmlFor="L">L</label>
        <input type="radio" name="level" value="M" id="M" />
        <label htmlFor="M">M</label>
        <input type="radio" name="level" value="Q" id="Q" />
        <label htmlFor="Q">Q</label>
        <input type="radio" name="level" value="H" id="H" />
        <label htmlFor="H">H</label>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        type="text"
        placeholder="The value of qrcode"
        style={{ width: '80%' }}
      />
      <hr />
      <QRCodeCanvas
        value={value}
        size={200}
        title="Ant Design"
        level={level as ErrorCorrectionLevel}
      />
    </div>
  );
};
