import React from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import dagre from '@dagrejs/dagre';
import { toPng } from 'html-to-image';
import 'reactflow/dist/style.css';
import { useGraphFromSheet } from '../useGraphFromSheet';

/* ───────── colour palette ───────── */

const palette = [
  '#00AEEF', // Bright Blue
  '#F5FF66', // Lime Yellow
  '#FF69B4', // Hot Pink
  '#FF8866', // Coral
  '#FFD966', // Soft Yellow
  '#7FDBFF', // Sky Blue
  '#32CD32', // Lime Green
  // Additional colors
  '#8A2BE2', // Deep Purple
  '#20B2AA', // Teal
  '#FF7034', // Burnt Orange
  '#4B0082', // Indigo
  '#BA55D3', // Medium Orchid
  '#6A5ACD', // Slate Blue
  '#DAA520', // Goldenrod
  '#48D1CC', // Medium Turquoise
  '#FF6347', // Tomato
  '#4682B4', // Steel Blue
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

function layout(nodes: any[], edges: any[]) {
  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({ rankdir: 'TB' });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((n) => g.setNode(n.id, { width: 160, height: 40 }));
  edges.forEach((e) => g.setEdge(e.source, e.target, {}, e.id));

  dagre.layout(g);

  /* map every unique group → a colour from the palette */
  const colourOf = new Map<string, string>();
  let next = 0;
  nodes.forEach(({ data: { group } }) => {
    if (!colourOf.has(group)) {
      colourOf.set(group, palette[next % palette.length]);
      next += 1;
    }
  });

  return {
    nodes: nodes.map((n) => {
      const pos = g.node(n.id) ?? { x: 0, y: 0 };
      return {
        ...n,
        position: { x: pos.x, y: pos.y },
        style: {
          background: '#f1f5f9',
          borderRadius: 6,
          padding: 4,
          border: `3px solid ${colourOf.get(n.data.group)}`,
          fontSize: 12,
        },
      };
    }),
    edges,
  };
}

/* ───────── component ───────── */

const DependencyGraph: React.FC = () => {
  const { nodes: rawNodes, edges: rawEdges } = useGraphFromSheet();

  const nodes = uniqById(rawNodes);
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = rawEdges.filter(
    (e) => nodeIds.has(e.source) && nodeIds.has(e.target),
  );

  const { nodes: laidNodes, edges: laidEdges } = layout(nodes, edges);

  const downloadPNG = () => {
    const el = document.querySelector('.react-flow__viewport') as HTMLElement;
    toPng(el).then((url) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dependency-graph.png';
      a.click();
    });
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: 520, border: '1px solid #d1d5db' }}>
        <ReactFlow nodes={laidNodes} edges={laidEdges} fitView>
          <Background />
        </ReactFlow>
      </div>

      <button type="button" className="btn-orange mt-2" onClick={downloadPNG}>
        Download PNG
      </button>
    </ReactFlowProvider>
  );
};

export default DependencyGraph;
