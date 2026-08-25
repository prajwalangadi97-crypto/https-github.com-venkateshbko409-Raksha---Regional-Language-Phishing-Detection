import React, { useState } from 'react';
import {
  Network,
  Search,
  Layers,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import type { Language, ScamDnaNode } from '../types';
import { initialScamDnaNodes, initialScamDnaEdges } from '../data/karnatakaScamData';

interface ScamDnaMemoryExplorerProps {
  language: Language;
}

export const ScamDnaMemoryExplorer: React.FC<ScamDnaMemoryExplorerProps> = ({
  language,
}) => {
  const [nodes] = useState<ScamDnaNode[]>(initialScamDnaNodes);
  const [edges] = useState(initialScamDnaEdges);
  const [selectedNode, setSelectedNode] = useState<ScamDnaNode | null>(nodes[0]);
  const [searchFilter, setSearchFilter] = useState('');
  const [copied, setCopied] = useState(false);

  const displayNodes = nodes.filter(
    (n) =>
      n.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getNodeColor = (type: string, risk: string) => {
    if (type === 'SCAM_CAMPAIGN') return '#ff3b5c';
    if (risk === 'CRITICAL') return '#ff3b5c';
    if (risk === 'HIGH') return '#fbbf24';
    if (risk === 'MEDIUM') return '#38bdf8';
    return '#34d399';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <Network className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಸ್ಕ್ಯಾಮ್ DNA ಮೆಮೊರಿ ಗ್ರಾಫ್ & ಸಿಂಡಿಕೇಟ್ ನೆಟ್‌ವರ್ಕ್'
                : 'Scam DNA Memory Graph & Syndicate Network'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ಫೋನ್ ಸಂಖ್ಯೆಗಳು, ಮ್ಯೂಲ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು, UPI ಹ್ಯಾಂಡಲ್‌ಗಳು ಮತ್ತು C2 ಸರ್ವರ್‌ಗಳ ನಡುವಿನ ಸಂಘಟಿತ ಜಾಲವನ್ನು ಅನ್ವೇಷಿಸಿ.'
              : 'Interactive visualization mapping the cross-syndicate web of burner SIMs, mule accounts, phishing domains, and escrow UPIs.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={language === 'kn' ? 'IOC ಹುಡುಕಿ...' : 'Search node or IOC...'}
            className="rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none w-56"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive SVG Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-950 p-4 relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-slate-400 border border-slate-800">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>NODES: {displayNodes.length} | RELATIONSHIPS: {edges.length}</span>
          </div>

          {/* SVG Graph */}
          <svg viewBox="0 0 800 560" className="w-full h-auto max-h-[500px] select-none">
            {/* Background Cyber Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="560" fill="url(#grid)" />

            {/* Edge Lines */}
            {edges.map((edge, idx) => {
              const sourceNode = displayNodes.find((n) => n.id === edge.source);
              const targetNode = displayNodes.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isConnected =
                selectedNode &&
                (selectedNode.id === edge.source || selectedNode.id === edge.target);

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isConnected ? '#00ffcc' : 'rgba(100, 116, 139, 0.3)'}
                    strokeWidth={isConnected ? 2.5 : 1}
                    strokeDasharray={isConnected ? 'none' : '4 4'}
                  />
                  {isConnected && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 6}
                      fill="#38bdf8"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                      className="select-none"
                    >
                      {edge.relation}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {displayNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const color = getNodeColor(node.type, node.risk);
              const isCampaign = node.type === 'SCAM_CAMPAIGN';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  {/* Glow Ring */}
                  {isSelected && (
                    <circle
                      r={isCampaign ? 34 : 26}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-spin"
                    />
                  )}

                  {/* Outer Node Circle */}
                  <circle
                    r={isCampaign ? 26 : 20}
                    fill="#0f172a"
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 2}
                  />

                  {/* Icon / Core Dot */}
                  <circle r={isCampaign ? 8 : 6} fill={color} />

                  {/* Node Label */}
                  <text
                    y={isCampaign ? 38 : 32}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize={isCampaign ? "11" : "10"}
                    fontWeight={isCampaign ? "bold" : "normal"}
                    fontFamily="Inter, sans-serif"
                    className="select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Selected Node Forensic Dossier (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>{language === 'kn' ? 'ಆಯ್ಕೆಮಾಡಿದ ನೋಡ್ ವಿವರಣೆ' : 'Node Intelligence Profile'}</span>
            </h3>

            {selectedNode ? (
              <div className="space-y-3.5">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                      {selectedNode.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-red-400">
                      {selectedNode.risk} RISK
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 mt-2 font-mono break-all">
                    {selectedNode.label}
                  </div>
                  {selectedNode.details && (
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                      {selectedNode.details}
                    </p>
                  )}
                </div>

                {/* Connected Edges */}
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
                    Syndicate Linkages:
                  </div>
                  <div className="space-y-1.5">
                    {edges
                      .filter(
                        (e) =>
                          e.source === selectedNode.id || e.target === selectedNode.id
                      )
                      .map((e, idx) => {
                        const otherNodeId =
                          e.source === selectedNode.id ? e.target : e.source;
                        const otherNode = nodes.find((n) => n.id === otherNodeId);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg bg-slate-950/60 p-2 text-xs border border-slate-800"
                          >
                            <span className="text-slate-300 truncate max-w-[140px] font-mono">
                              {otherNode?.label}
                            </span>
                            <span className="text-[10px] font-bold text-cyan-400 font-mono">
                              {e.relation}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Copy Node Value */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedNode.label);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy IOC Identifier'}</span>
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-500 text-center py-8">
                Click any graph node to inspect relationships.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
