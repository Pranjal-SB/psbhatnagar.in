import { ImageResponse } from 'next/og';
import { siteData } from '../data/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${siteData.profile.name}, ${siteData.profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#f4f1ea',
          color: '#191614',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 92, letterSpacing: -3, lineHeight: 1 }}>
          {siteData.profile.name}
        </div>
        <div style={{ fontSize: 34, marginTop: 24, color: '#6b6259' }}>
          {`${siteData.profile.role} · chennai`}
        </div>
        <div style={{ height: 6, width: 180, marginTop: 40, background: '#4b57c4' }} />
      </div>
    ),
    size,
  );
}
