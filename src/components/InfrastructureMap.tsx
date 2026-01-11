import React, { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  Handle,
  Position,
  Node,
  NodeProps,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Server, Shield, Database, Activity, 
  Globe, Cpu, Lock, Wifi, X 
} from 'lucide-react';

// Definición de tipos para los detalles de los nodos
interface NodeDetail {
  title: string;
  subtitle: string;
  specs: string[];
  desc: string;
}

// Definición de tipos para los nodos
interface CustomNodeData {
  label: string;
  sub: string;
  icon: string; // Guardamos el nombre del icono en lugar del componente
  type: string;
}

// --- 1. DATOS DE LOS NODOS (LA INFORMACIÓN TÉCNICA) ---
const nodeDetails: Record<string, NodeDetail> = {
  core: {
    title: "NÚCLEO DE SUPERCÓMPUTO",
    subtitle: "Azure Gov + NVIDIA H100 Cluster",
    specs: [
      "Procesamiento: 5 PetaFLOPS",
      "Soberanía de Datos: Colombia/US",
      "Redundancia: Geo-Zone Redundant",
      "AI Engine: Llama-3 & GPT-4 Turbo"
    ],
    desc: "El cerebro central. Aquí residen los modelos fundacionales que procesan millones de datos por segundo bajo estándares de seguridad militar."
  },
  security: {
    title: "BÓVEDA DE CIBERSEGURIDAD",
    subtitle: "Sentinel Auth & Blockchain Ledger",
    specs: [
      "Encriptación: AES-256 GCM",
      "Auth: OAuth 2.0 + Biometría",
      "Audit Trail: Inmutable (Blockchain)",
      "Compliance: ISO 27001 / HIPAA"
    ],
    desc: "Capa de blindaje. Cada transacción, acceso a historia clínica o movimiento financiero es encriptado y firmado digitalmente antes de tocar la red."
  },
  health: {
    title: "NODO SALUD (HL7/FHIR)",
    subtitle: "Interoperabilidad Hospitalaria",
    specs: [
      "Protocolo: HL7 FHIR R4",
      "Latencia: <50ms",
      "Integración: OpenEMR / SAP",
      "Voice AI: Whisper Clinical Tuned"
    ],
    desc: "Conexión segura con hospitales. Traduce datos clínicos de sistemas legados a un formato universal para la historia clínica nacional."
  },
  gov: {
    title: "NODO GOBIERNO (CITY OS)",
    subtitle: "Gestión Territorial & Seguridad",
    specs: [
      "Video: RTSP Stream Analytics",
      "IoT: LoRaWAN Sensors",
      "Docs: OCR + NLP Legal",
      "Alertas: Tiempo Real (Websocket)"
    ],
    desc: "El sistema nervioso de la ciudad. Procesa cámaras de seguridad, trámites y sensores ambientales para la toma de decisiones."
  }
};

// Mapeo de iconos
const iconMap = {
  Cpu: Cpu,
  Shield: Shield,
  Database: Database,
  Activity: Activity,
  Globe: Globe,
  Server: Server
};

// --- 2. COMPONENTE DE NODO PERSONALIZADO (EL DISEÑO FUTURISTA) ---
const CyberNode: React.FC<NodeProps<CustomNodeData & { selected?: boolean }>> = ({ data, selected }) => {
  // Verificar que data exista antes de acceder a las propiedades
  if (!data) {
    console.error('node data es undefined');
    const DefaultIcon = Server; // Icono por defecto
    return (
      <div className={`
        relative px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[180px] bg-slate-900/90 backdrop-blur-md
        ${selected ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-105' : 'border-slate-700 hover:border-cyan-500/50'}
      `}>
        {/* Conectores invisibles para ReactFlow */}
        <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2 !h-2" />
        <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2" />
        
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${selected ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-cyan-400'}`}>
            <DefaultIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">N/A</p>
            <p className="text-sm font-bold text-white">N/A</p>
          </div>
        </div>
        
        {/* Indicador de estado */}
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
      </div>
    );
  }
  
  const IconComponent = iconMap[data.icon as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.error(`Icon not found: ${data.icon}`);
    // Usar un icono por defecto si no se encuentra
    const DefaultIcon = Server; // Icono por defecto
    return (
      <div className={`
        relative px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[180px] bg-slate-900/90 backdrop-blur-md
        ${selected ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-105' : 'border-slate-700 hover:border-cyan-500/50'}
      `}>
        {/* Conectores invisibles para ReactFlow */}
        <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2 !h-2" />
        <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2" />
        
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${selected ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-cyan-400'}`}>
            <DefaultIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">{data?.label || 'N/A'}</p>
            <p className="text-sm font-bold text-white">{data?.sub || 'N/A'}</p>
          </div>
        </div>
        
        {/* Indicador de estado */}
        <div className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`
      relative px-4 py-3 rounded-lg border-2 transition-all duration-300 min-w-[180px] bg-slate-900/90 backdrop-blur-md
      ${selected ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-105' : 'border-slate-700 hover:border-cyan-500/50'}
    `}>
      {/* Conectores invisibles para ReactFlow */}
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2" />
      
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${selected ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-cyan-400'}`}>
          {IconComponent && <IconComponent size={20} />}
        </div>
        <div>
          <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">{data?.label || 'N/A'}</p>
          <p className="text-sm font-bold text-white">{data?.sub || 'N/A'}</p>
        </div>
      </div>
      
      {/* Indicador de estado */}
      <div className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>
    </div>
  );
};

// --- 3. CONFIGURACIÓN INICIAL DEL DIAGRAMA ---
const initialNodes: Node<CustomNodeData>[] = [
  // Nivel 1: Core
  { id: '1', type: 'cyber', position: { x: 250, y: 0 }, data: { label: 'CORE', sub: 'Azure AI Supercluster', icon: 'Cpu', type: 'core' } },
  
  // Nivel 2: Security & Storage
  { id: '2', type: 'cyber', position: { x: 0, y: 150 }, data: { label: 'SECURITY', sub: 'Orbital Vault', icon: 'Shield', type: 'security' } },
  { id: '3', type: 'cyber', position: { x: 500, y: 150 }, data: { label: 'DATABASE', sub: 'Vector Lake', icon: 'Database', type: 'core' } },

  // Nivel 3: Edges (Servicios)
  { id: '4', type: 'cyber', position: { x: -100, y: 350 }, data: { label: 'EDGE', sub: 'Orbital Health', icon: 'Activity', type: 'health' } },
  { id: '5', type: 'cyber', position: { x: 250, y: 350 }, data: { label: 'EDGE', sub: 'Orbital Gov/City', icon: 'Globe', type: 'gov' } },
  { id: '6', type: 'cyber', position: { x: 600, y: 350 }, data: { label: 'EDGE', sub: 'Orbital Def/Space', icon: 'Server', type: 'gov' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 }, label: 'End-to-End Encrypted' },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#22c55e', strokeWidth: 2 } },
  { id: 'e2-6', source: '2', target: '6', animated: true, style: { stroke: '#22c500', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#64748b' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#64748b' } },
];

// --- 4. COMPONENTE PRINCIPAL ---
const InfrastructureMap = () => {
  const { t } = useLanguage();
  const [nodes, , onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedInfo, setSelectedInfo] = useState<NodeDetail | null>(null);

  const nodeTypes = useMemo(() => ({ cyber: CyberNode }), []);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    const info = nodeDetails[node.data.type];
    if (info) setSelectedInfo(info);
  }, []);

  return (
    <div id="tecnologia" className="w-full bg-slate-950 relative border-t border-slate-800">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{t('infrastructure.title') || 'Arquitectura de Nube Soberana'}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t('infrastructure.description') || 'Mapa interactivo de nuestra infraestructura. Haga doble clic en los nodos para ver los protocolos de seguridad y procesamiento.'}
          </p>
          <div className="mt-4 text-cyan-400 text-sm font-mono animate-pulse">
            💡 Pista: Haga doble clic en cualquier nodo para ver sus detalles técnicos
          </div>
        </div>
      </div>

      {/* EL DIAGRAMA REACT FLOW */}
      <div className="w-full h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeDoubleClick={onNodeClick}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#1e293b" gap={20} />
          <Controls className="!bg-slate-800 !border-slate-700 !fill-white" />
          <MiniMap 
            nodeColor="#06b6d4" 
            maskColor="rgba(15, 23, 42, 0.8)" 
            className="!bg-slate-900 !border-slate-800" 
          />
        </ReactFlow>
      </div>

      {/* PANEL LATERAL DE DETALLES (EL "SECTION" QUE SE ABRE) */}
      {selectedInfo && (
        <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-cyan-500/30 p-8 shadow-2xl transition-transform duration-300 z-50 overflow-y-auto">
          <button 
            onClick={() => setSelectedInfo(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>

          <div className="mt-8">
            <div className="text-cyan-400 text-xs font-mono tracking-[0.2em] mb-2 uppercase">{t('infrastructure.specs_title') || 'Especificaciones Técnicas'}</div>
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{selectedInfo.title}</h3>
            <p className="text-lg text-slate-300 mb-6 font-light">{selectedInfo.subtitle}</p>
            
            <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-6"></div>

            <div className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                  <Cpu className="w-4 h-4 text-cyan-500" />
                  {t('infrastructure.processing') || 'Capacidad de Proceso'}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {selectedInfo.desc}
                </p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                  <Lock className="w-4 h-4 text-cyan-500" />
                  {t('infrastructure.protocols') || 'Protocolos & Standards'}
                </h4>
                <ul className="space-y-2">
                  {selectedInfo.specs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-700/50">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-lg mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-xs font-bold uppercase">{t('infrastructure.connection_status') || 'Estado de Conexión'}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[98%] shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-cyan-300 mt-1 font-mono">
                  <span>UPTIME: 99.99%</span>
                  <span>LATENCY: 12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfrastructureMap;