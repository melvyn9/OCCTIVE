/* eslint-disable max-len, object-curly-newline, react/jsx-max-props-per-line,
   implicit-arrow-linebreak, no-multi-spaces */
import React from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import { useGraphFromSheet } from '../useGraphFromSheet';

/* ───────── colour palette ───────── */

const palette = [
  '#00AEEF', '#F5FF66', '#FF69B4', '#FF8866', '#FFD966', '#7FDBFF', '#32CD32',
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
  g.setGraph({ rankdir: 'TB' });
  g.setDefaultEdgeLabel(() => ({}));

  rawNodes.forEach((n) => g.setNode(n.id, { width: 160, height: 40 }));
  edges.forEach((e) => g.setEdge(e.source, e.target, {}, e.id));
  dagre.layout(g);

  const positioned = rawNodes.map((n) => {
    const p = g.node(n.id) ?? { x: 0, y: 0 };
    return { ...n, position: { x: p.x, y: p.y } };
  });

  /* colour lookup */
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
  /** Optional id so multiple graphs don't collide */
  flowId?: string;
  /** Node id to highlight with a ⭐ */
  highlightId?: string;
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const DependencyGraph: React.FC<DependencyGraphProps> = ({ flowId, highlightId }) => {
  const { nodes: rawNodes, edges: rawEdges } = useGraphFromSheet();

  const nodes = uniqById(rawNodes);
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = rawEdges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  const { positioned, colourOf } = layout(nodes, edges);

  /* build styled nodes */
  const graphNodes = positioned.map((n) => {
    const base = {
      background: '#f1f5f9',
      borderRadius: 6,
      padding: 4,
      fontSize: 12,
      border: `3px solid ${colourOf.get(n.data.group)}`,
    };

    const target = highlightId?.trim().toLowerCase();
    const isTarget = !!target && (n.id.toLowerCase() === target || n.data.label.toLowerCase() === target);

    if (isTarget) {
      return {
        ...n,
        data: { ...n.data, label: `⭐ ${n.data.label}` },
        style: { ...base, border: '4px solid #a855f7' }, // purple highlight
      };
    }
    return { ...n, style: base };
  });

  const id = React.useMemo(
    () => flowId ?? `flow-${Math.random().toString(36).slice(2)}`,
    [flowId],
  );

  return (
    <ReactFlowProvider>
      <div style={{ height: 520, border: '1px solid #d1d5db' }}>
        <ReactFlow id={id} nodes={graphNodes} edges={edges} fitView>
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default DependencyGraph;
