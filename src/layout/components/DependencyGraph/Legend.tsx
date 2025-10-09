import React from 'react';

const LegendItem = ({ color = '#000', shape = 'rectangle', label }: any) => {
  const isDiamond = shape === 'diamond';
  const shapeStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    background: shape === 'rectangle' ? color : 'none',
    border: `3px solid ${color}`,
    borderRadius: shape === 'rectangle' ? 4 : 0,
    transform: isDiamond ? 'rotate(45deg)' : undefined, // rotate square into diamond
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <div style={shapeStyle} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
};

export default LegendItem;

export const Legend = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      padding: '0.5rem',
      background: '#f8f8f8',
      borderRadius: 8,
      border: '1px solid #ddd',
    }}
  >
    <LegendItem shape="rectangle" label="O.1 Generation" />
    <LegendItem shape="diamond" label="O.2 Generation" />
    <LegendItem color="#F5FF66" label="Basics of computational problem solving and programming" />
    <LegendItem color="#00AEEF" label="Setting Context" />
    <LegendItem color="#FF69B4" label="Naming and Assignment" />
    <LegendItem color="#FF8866" label="Functions" />
    <LegendItem color="#FFD966" label="Sequences and Dataframes" />
    <LegendItem color="#7FDBFF" label="Reading Documentation, Testing, and Debugging" />
  </div>
);
