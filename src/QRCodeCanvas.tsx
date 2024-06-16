import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQRCode } from './hooks/useQRCode';
import type { QRPropsCanvas } from './interface';
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_INCLUDEMARGIN,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
  SUPPORTS_PATH2D,
  excavateModules,
  generatePath,
} from './utils';

const QRCodeCanvas = React.forwardRef<HTMLCanvasElement, QRPropsCanvas>(
  function QRCodeCanvas(props, forwardedRef) {
    const {
      value,
      size = DEFAULT_SIZE,
      level = DEFAULT_LEVEL,
      bgColor = DEFAULT_BGCOLOR,
      fgColor = DEFAULT_FGCOLOR,
      includeMargin = DEFAULT_INCLUDEMARGIN,
      minVersion = DEFAULT_MINVERSION,
      marginSize,
      style,
      imageSettings,
      ...otherProps
    } = props;
    const imgSrc = imageSettings?.src;
    const _canvas = useRef<HTMLCanvasElement | null>(null);
    const _image = useRef<HTMLImageElement>(null);

    // Set the local ref (_canvas) and also the forwarded ref from outside
    const setCanvasRef = useCallback(
      (node: HTMLCanvasElement | null) => {
        _canvas.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    // We're just using this state to trigger rerenders when images load. We
    // Don't actually read the value anywhere. A smarter use of useEffect would
    // depend on this value.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isImgLoaded, setIsImageLoaded] = useState(false);

    const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
      value,
      level,
      minVersion,
      includeMargin,
      marginSize,
      imageSettings,
      size,
    });

    useEffect(() => {
      // Always update the canvas. It's cheap enough and we want to be correct
      // with the current state.
      if (_canvas.current != null) {
        const canvas = _canvas.current;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }

        let cellsToDraw = cells;
        const image = _image.current;
        const haveImageToRender =
          calculatedImageSettings != null &&
          image !== null &&
          image.complete &&
          image.naturalHeight !== 0 &&
          image.naturalWidth !== 0;

        if (haveImageToRender) {
          if (calculatedImageSettings.excavation != null) {
            cellsToDraw = excavateModules(
              cells,
              calculatedImageSettings.excavation,
            );
          }
        }

        // We're going to scale this so that the number of drawable units
        // matches the number of cells. This avoids rounding issues, but does
        // result in some potentially unwanted single pixel issues between
        // blocks, only in environments that don't support Path2D.
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.height = canvas.width = size * pixelRatio;
        const scale = (size / numCells) * pixelRatio;
        ctx.scale(scale, scale);
        // console.log('scale', scale, 'size', size, 'numCells', numCells, 'pixelRatio', pixelRatio);

        // Draw solid background, only paint dark modules.
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, numCells, numCells);

        ctx.fillStyle = fgColor;
        if (SUPPORTS_PATH2D) {
          // $FlowFixMe: Path2D c'tor doesn't support args yet.
          ctx.fill(new Path2D(generatePath(cellsToDraw, margin)));
        } else {
          cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
              if (cell) {
                ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
              }
            });
          });
        }

        if (calculatedImageSettings) {
          ctx.globalAlpha = calculatedImageSettings.opacity;
        }

        if (haveImageToRender) {
          ctx.drawImage(
            image,
            calculatedImageSettings.x + margin,
            calculatedImageSettings.y + margin,
            calculatedImageSettings.w,
            calculatedImageSettings.h,
          );
        }
      }
    });

    // Ensure we mark image loaded as false here so we trigger updating the
    // canvas in our other effect.
    useEffect(() => {
      setIsImageLoaded(false);
    }, [imgSrc]);

    const canvasStyle = { height: size, width: size, ...style };
    let img = null;
    if (imgSrc != null) {
      img = (
        <img
          src={imgSrc}
          key={imgSrc}
          style={{ display: 'none' }}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          ref={_image}
          crossOrigin={calculatedImageSettings?.crossOrigin}
        />
      );
    }
    return (
      <>
        <canvas
          style={canvasStyle}
          height={size}
          width={size}
          ref={setCanvasRef}
          role="img"
          {...otherProps}
        />
        {img}
      </>
    );
  },
);
QRCodeCanvas.displayName = 'QRCodeCanvas';

export { QRCodeCanvas };
