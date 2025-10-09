import React from 'react';
import { Handle, Position } from 'reactflow';

const shapeStyles: Record<string, React.CSSProperties> = {
  rectangle: {
    borderRadius: 6,
    width: 200,
    height: 80,
  },
  diamond: {
    width: 100,
    height: 100,
    transform: 'rotate(45deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const CustomNode = ({ data }: any) => {
  const { label, color, shape } = data;
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: `4px solid ${color}`,
    background: '#fff',
    fontSize: 16,
    color: '#111',
    padding: 12,
    ...shapeStyles[shape || 'rectangle'],
  };

  return (
    <div style={baseStyle}>
      <div style={shape === 'diamond' ? { transform: 'rotate(-45deg)' } : {}}>
        {label}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
