/* eslint-disable max-len, object-curly-newline, react/jsx-max-props-per-line,
   implicit-arrow-linebreak, no-multi-spaces */

import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import { useGraphFromSheet } from '../../../useGraphFromSheet';

/* ───────── colour palette ───────── */

const palette = [
  '#FF69B4', '#F5FF66', '#00AEEF', '#FF8866', '#FFD966', '#7FDBFF', '#32CD32',
  '#8A2BE2', '#20B2AA', '#FF7034', '#4B0082', '#BA55D3', '#6A5ACD', '#DAA520',
  '#48D1CC', '#FF6347', '#4682B4',
];

/* ───────── helpers ───────── */

function uniqById(list: any[]) {
  const seen = new Set<string>();
  return list.filter((n) => {
    if (seen.has(n.id)) return false;
    seen.add(n.id);
    return true;
  });
}

function layout(rawNodes: any[], edges: any[]) {
  const g = new dagre.graphlib.Graph({ multigraph: true });

  g.setGraph({
    rankdir: 'TB',
    ranksep: 100,
    nodesep: 100,
    marginx: 20,
    marginy: 20,
  });

  g.setDefaultEdgeLabel(() => ({}));

  rawNodes.forEach((n) => {
    g.setNode(n.id, { width: 200, height: 80 });
  });

  edges.forEach((e) => g.setEdge(e.source, e.target, {}, e.id));

  dagre.layout(g);

  const positioned = rawNodes.map((n) => {
    const p = g.node(n.id) ?? { x: 0, y: 0 };
    return { ...n, position: { x: p.x, y: p.y } };
  });

  const colourOf = new Map<string, string>();
  let next = 0;

  positioned.forEach(({ data: { group } }) => {
    if (!colourOf.has(group)) {
      colourOf.set(group, palette[next % palette.length]);
      next += 1;
    }
  });

  return { positioned, edges, colourOf };
}

/* ------------------------------------------------------------------ */
/*                              PROPS                                 */
/* ------------------------------------------------------------------ */

export interface DependencyGraphProps {
  flowId?: string;
  highlightId?: string;
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*                          LEGEND COMPONENT                          */
/* ------------------------------------------------------------------ */

interface LegendProps {
  colourOf: Map<string, string>;
  topicNames: Map<string, string>;
  collapsed: boolean;
  onToggle: () => void;
}

const Legend: React.FC<LegendProps> = ({
  colourOf,
  topicNames,
  collapsed,
  onToggle,
}) => {
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 6,
  };

  const chipBase: React.CSSProperties = {
    display: 'inline-block',
    width: 18,
    height: 18,
    borderRadius: 4,
    flexShrink: 0,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 10,
      }}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-controls="dependency-legend-panel"
        style={{
          padding: '4px 10px',
          borderRadius: 999,
          border: '1px solid #d1d5db',
          background: '#ffffff',
          fontSize: 13,
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        Legend {collapsed ? '▸' : '▾'}
      </button>

      {/* Only render the panel when expanded */}
      {!collapsed && (
        <div
          id="dependency-legend-panel"
          aria-label="Legend"
          style={{
            marginTop: 8,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: '12px 14px',
            fontSize: 14,
            lineHeight: 1.4,
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            maxWidth: 260,
            maxHeight: 260,
            overflowY: 'auto',
          }}
        >
          {/* ------- Generations ------- */}
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Generations</div>

          <div style={rowStyle}>
            <span
              aria-hidden
              style={{
                ...chipBase,
                border: '3px dotted #111827',
                background: '#ffffff',
              }}
            />
            <span>O.1 Generation</span>
          </div>

          <div style={{ ...rowStyle, marginBottom: 12 }}>
            <span
              aria-hidden
              style={{
                ...chipBase,
                border: '3px solid #111827',
                background: '#ffffff',
              }}
            />
            <span>O.2 Generation</span>
          </div>

          {/* ------- Topic Groups ------- */}
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Topic Groups</div>

          {Array.from(colourOf.entries()).map(([group, color]) => (
            <div key={group} style={rowStyle}>
              <span
                aria-hidden
                style={{
                  ...chipBase,
                  background: color,
                  border: '2px solid #111827',
                }}
              />
              <span>{topicNames.get(group) ?? group}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const DependencyGraph: React.FC<DependencyGraphProps> = ({
  flowId,
  highlightId,
  isOpen,
  onClose,
}) => {
  /* Block scroll when modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ESC key closes modal */
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const { nodes: rawNodes, edges: rawEdges } = useGraphFromSheet();
  const [legendCollapsed, setLegendCollapsed] = useState(false);
  const nodes = uniqById(rawNodes);
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = rawEdges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  const { positioned, colourOf } = layout(nodes, edges);
  // Map each group (A, B, C...) to a human-friendly topic name
  const topicNames = new Map<string, string>();

  positioned.forEach((n) => {
    const { group } = n.data;
    const name = n.data.topicName || n.data.label; // fallback to label just in case
    if (group && name && !topicNames.has(group)) {
      topicNames.set(group, name);
    }
  });

  /* ------------------------- TARGET HIGHLIGHTING ------------------------- */

  const target = highlightId?.trim().toLowerCase() || '';

  const hasTarget =    target !== ''
    && positioned.some(
      (n) =>
        n.id.toLowerCase() === target
        || n.data.label.toLowerCase() === target,
    );

  const normaliseGeneration = (value: unknown): 'old' | 'new' | 'unknown' => {
    const s = (value ?? '').toString().trim().toLowerCase();
    if (s.startsWith('o.1') || s.startsWith('q.1') || s === '0.1' || s === '1') return 'old';
    if (s.startsWith('o.2') || s.startsWith('q.2') || s === '0.2' || s === '2') return 'new';
    return 'unknown';
  };

  const graphNodes = positioned.map((n) => {
    const isTarget =      hasTarget
      && (n.id.toLowerCase() === target
        || n.data.label.toLowerCase() === target);

    const genStatus = normaliseGeneration(n.data?.generation);
    const borderStyle = genStatus === 'old' ? 'dashed' : 'solid';
    const borderWidth = 5;
    const borderColor = colourOf.get(n.data.group);

    const base = {
      background: hasTarget ? '#d3d3d3' : '#ffffff',
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      border: `${borderWidth}px ${borderStyle} ${borderColor}`,
    } as React.CSSProperties;

    return isTarget
      ? {
        ...n,
        data: { ...n.data, label: `⭐ ${n.data.label}` },
        style: {
          ...base,
          border: '4px solid #a855f7',
          background: '#ffffff',
        },
      }
      : { ...n, style: base };
  });

  const id = React.useMemo(
    () => flowId ?? `flow-${Math.random().toString(36).slice(2)}`,
    [flowId],
  );

  if (!isOpen) return null;

  /* ------------------------------- RENDER ------------------------------- */

  return (
    <>
      {/* Screen overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(1px)',
          zIndex: 2000,
          animation: 'fadeIn 0.15s ease-out',
        }}
      />

      {/* Modal container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1200,
          height: '80%',
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 2001,
          animation: 'fadeIn 0.15s ease-out',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          type="button"
          style={{
            position: 'absolute',
            top: 10,
            right: 14,
            fontSize: 26,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 4000,
          }}
        >
          ✕
        </button>

        {/* Graph */}
        <ReactFlowProvider>
          <div style={{ position: 'relative', height: '100%' }}>
            <Legend
              colourOf={colourOf}
              topicNames={topicNames}
              collapsed={legendCollapsed}
              onToggle={() => setLegendCollapsed((v) => !v)}
            />
            <ReactFlow id={id} nodes={graphNodes} edges={edges} fitView>
              <Background />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DependencyGraph;
