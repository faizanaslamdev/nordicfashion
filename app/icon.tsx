import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #2B4C7E 0%, #1E3A5F 100%)',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            background: '#5ECFB3',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
