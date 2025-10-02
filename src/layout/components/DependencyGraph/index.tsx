/* eslint-disable max-len, object-curly-newline, react/jsx-max-props-per-line,
   implicit-arrow-linebreak, no-multi-spaces */
import React from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import dagre from '@dagrejs/dagre';
import 'reactflow/dist/style.css';
import { useGraphFromSheet } from '../useGraphFromSheet';

/* ───────── colour palette ───────── */

/* const palette = [
  '#00AEEF', '#F5FF66', '#FF69B4', '#FF8866', '#FFD966', '#7FDBFF', '#32CD32',
  '#8A2BE2', '#20B2AA', '#FF7034', '#4B0082', '#BA55D3', '#6A5ACD', '#DAA520',
  '#48D1CC', '#FF6347', '#4682B4',
]; */

/* const darkPalette = [
  '#007499', '#B5BF30', '#C71585', '#CC5533', '#B8860B', '#1E90FF', '#228B22',
  '#4B0082', '#008B8B', '#CC3300', '#2E004F', '#800080', '#483D8B', '#8B6914',
  '#008080', '#B22222', '#2F4F4F',
]; */

const palette = [
  '#FF0000', '#0000FF',
];
const darkPalette = [
  '#000000', '#FFFFFF',
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
  // CHANGE GENERAL STYLINGS OF GRAPH LAYOUT HERE
  g.setGraph({
    rankdir: 'TB', // top‑to‑bottom
    ranksep: 100, // vertical space between layers (default 50)
    nodesep: 100, // horizontal space between nodes (default 50)
    marginx: 20, // extra canvas padding left/right
    marginy: 20, // extra canvas padding top/bottom
  });
  g.setDefaultEdgeLabel(() => ({}));

  rawNodes.forEach((n) => {
    /* supply true size so Dagre knows how big each block is */
    g.setNode(n.id, { width: 200, height: 80 }); // or compute from text
  });

  edges.forEach((e) => g.setEdge(e.source, e.target, {}, e.id));
  dagre.layout(g);

  const positioned = rawNodes.map((n) => {
    const p = g.node(n.id) ?? { x: 0, y: 0 };
    return { ...n, position: { x: p.x, y: p.y } };
  });

  /* colour lookup */
  const colourOf = new Map<string, string>();
  let nextPalette = 0;
  let nextDarkPalette = 0;

  positioned.forEach((gen) => {
    const { generation } = gen.data;

    if (!colourOf.has(generation)) {
      if (generation === 'O.1') {
        colourOf.set(generation, palette[nextPalette % palette.length]);
        nextPalette += 1;
      } else if (generation === 'O.2') {
        colourOf.set(generation, darkPalette[nextDarkPalette % darkPalette.length]);
        nextDarkPalette += 1;
      }
    }
  });
  return { positioned, edges, colourOf };
}

/* ------------------------------------------------------------------ */
/*                              PROPS                                 */
/* ------------------------------------------------------------------ */

export interface DependencyGraphProps {
  /** Optional id so multiple graphs do not collide */
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

  /* CHANGE STYLINGS OF NODES IN GRAPH */
  // Normalise the search term
  const target = highlightId?.trim().toLowerCase() || '';

  // Decide whether *any* node matches that term
  const hasTarget =    target !== ''
    && positioned.some(
      (n) =>
        n.id.toLowerCase() === target
        || n.data.label.toLowerCase() === target,
    );

  // Build the styled nodes
  const graphNodes = positioned.map((n) => {
    const isTarget =      hasTarget
      && (
        n.id.toLowerCase() === target
        || n.data.label.toLowerCase() === target
      );

    // Background switches to grey *only* when a match exists
    const base = {
      background: hasTarget ? '#d3d3d3' : '#ffffff',
      borderRadius: 6,
      padding: 12,
      fontSize: 16,
      border: `5px solid ${colourOf.get(n.data.group)}`,
    };

    return isTarget
      ? {
        ...n,
        data: { ...n.data, label: `⭐ ${n.data.label}` },
        style: {
          ...base,
          border: '4px solid #a855f7',
          background: '#ffffff', // target node stays white
        },
      }
      : { ...n, style: base };
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
