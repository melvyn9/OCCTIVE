import React from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import dagre from '@dagrejs/dagre';
import { toPng } from 'html-to-image';
import 'reactflow/dist/style.css';
import { useGraphFromSheet } from '../useGraphFromSheet';

/* ───────── helpers ──────── */

const colourFor = (status: string) => {
  switch (status) {
    case 'new': return '#a7f3d0';
    case 'old': return '#e5e7eb';
    default: return '#fce7f3'; // planned
  }
};

function uniqById(list: any[]) {
  const seen = new Set<string>();
  return list.filter((n) => {
    if (seen.has(n.id)) {
      console.warn(`⚠︎ duplicate id "${n.id}" ignored`);
      return false;
    }
    seen.add(n.id);
    return true;
  });
}

function layout(nodes: any[], edges: any[]) {
  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({ rankdir: 'TB' });
  g.setDefaultEdgeLabel(() => ({})); // avoid undefined labels

  nodes.forEach((n) => g.setNode(n.id, { width: 160, height: 40 }));
  edges.forEach((e) => {
    /* 4th param = unique key => prevents duplicate-edge crash */
    g.setEdge(e.source, e.target, {}, e.id);
  });

  dagre.layout(g);

  return {
    nodes: nodes.map((n) => {
      const pos = g.node(n.id) ?? { x: 0, y: 0 };
      return {
        ...n,
        position: { x: pos.x, y: pos.y },
        style: {
          background: colourFor(n.data.status),
          borderRadius: 6,
          padding: 4,
          border: '1px solid #94a3b8',
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

  const edges = rawEdges.filter((e) => {
    const ok = nodeIds.has(e.source) && nodeIds.has(e.target);
    if (!ok) {
      console.warn(`⚠︎ dropped edge ${e.id} — bad endpoint`);
    }
    return ok;
  });

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
