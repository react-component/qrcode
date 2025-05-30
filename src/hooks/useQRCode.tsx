import { QrCode, QrSegment } from '../libs/qrcodegen';
import type { ErrorCorrectionLevel, ImageSettings } from '../interface';
import { ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from '../utils';
import React from 'react';

interface Options {
  value: string;
  level: ErrorCorrectionLevel;
  minVersion: number;
  includeMargin: boolean;
  marginSize?: number;
  imageSettings?: ImageSettings;
  size: number;
}

export const useQRCode = (opt: Options) => {
  const {
    value,
    level,
    minVersion,
    includeMargin,
    marginSize,
    imageSettings,
    size,
  } = opt;

  const memoizedQrcode = React.useMemo(() => {
    const segments = QrSegment.makeSegments(value);
    return QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion);
  }, [value, level, minVersion]);

  return React.useMemo(() => {
    const cs = memoizedQrcode.getModules();
    const mg = getMarginSize(includeMargin, marginSize);
    const ncs = cs.length + mg * 2;
    const cis = getImageSettings(cs, size, mg, imageSettings);
    return {
      cells: cs,
      margin: mg,
      numCells: ncs,
      calculatedImageSettings: cis,
      qrcode: memoizedQrcode,
    };
  }, [memoizedQrcode, size, imageSettings, includeMargin, marginSize]);
};
