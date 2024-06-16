import { QrCode, QrSegment } from '../libs/qrcodegen';
import type { ErrorCorrectionLevel, ImageSettings } from '../interface';
import { ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from '../utils';
import { useMemo } from 'react';

export function useQRCode({
  value,
  level,
  minVersion,
  includeMargin,
  marginSize,
  imageSettings,
  size,
}: {
  value: string;
  level: ErrorCorrectionLevel;
  minVersion: number;
  includeMargin: boolean;
  marginSize?: number;
  imageSettings?: ImageSettings;
  size: number;
}) {
  const qrcode = useMemo(() => {
    const segments = QrSegment.makeSegments(value);
    return QrCode.encodeSegments(
      segments,
      ERROR_LEVEL_MAP[level],
      minVersion,
    );
  }, [value, level, minVersion]);

  const { cells, margin, numCells, calculatedImageSettings } = useMemo(() => {
    const cs = qrcode.getModules();

    const mg = getMarginSize(includeMargin, marginSize);
    const ncs = cs.length + mg * 2;
    const cis = getImageSettings(cs, size, mg, imageSettings);
    return {
      cells: cs,
      margin: mg,
      numCells: ncs,
      calculatedImageSettings: cis,
    };
  }, [qrcode, size, imageSettings, includeMargin, marginSize]);

  return {
    qrcode,
    margin,
    cells,
    numCells,
    calculatedImageSettings,
  };
}
