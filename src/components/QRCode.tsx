
import React, { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  bgColor = "transparent",
  fgColor = "#1e88e5"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [value, size, bgColor, fgColor]);

  return <canvas ref={canvasRef} className="mx-auto" />;
};

export default QRCode;
