import React, { useState } from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { LeftSyllabus } from '../components/LeftSyllabus';
import { VideoLecturePlayer } from '../components/VideoLecturePlayer';
import { CodeExerciseLab } from '../components/CodeExerciseLab';
import { NotesRightSidebar } from '../components/NotesRightSidebar';
import {
  Share2,
  X,
  Sparkles,
  BookOpen,
  ExternalLink,
  FileText,
  Video
} from 'lucide-react';
import { useAITutor } from '../context/AITutorContext';

interface GraphNode {
  id: string;
  label: string;
  module: string;
  category: 'foundation' | 'core' | 'application';
  status: 'mastered' | 'learning' | 'review';
  x: number;
  y: number;
  summary: string;
  explanation: string;
  mathFormula?: string;
  codeSnippet?: string;
  references: {
    type: 'slide' | 'video' | 'doc';
    title: string;
    detail: string;
    urlText?: string;
  }[];
}

const graphNodes: GraphNode[] = [
  {
    id: 'embeddings',
    label: 'Vector Embeddings',
    module: 'Bài 2.1',
    category: 'foundation',
    status: 'mastered',
    x: 60,
    y: 130,
    summary: 'Biến đổi văn bản thành vector số thực biểu diễn ý nghĩa ngữ nghĩa.',
    explanation: 'Thay vì so sánh từ khóa nguyên văn (keyword matching), mô hình embedding ánh xạ văn bản thành tọa độ đa chiều. Các câu cùng chủ đề sẽ có vector trỏ về cùng một hướng trong không gian.',
    mathFormula: 'v = \\text{EmbeddingModel}(text) \\in \\mathbb{R}^{d}',
    codeSnippet: 'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")',
    references: [
      { type: 'slide', title: 'Slide Chương 2 (Trang 8-12)', detail: 'Nguyên lý toán học của Vector Space Models' },
      { type: 'video', title: 'Video Bài 2.1 (7m)', detail: 'Cách embedding model tạo ra vector đặc trưng' },
      { type: 'doc', title: 'OpenAI Embedding Guide', detail: 'Tài liệu chuẩn về model text-embedding-3' }
    ]
  },
  {
    id: 'dimension',
    label: 'Vector Dimension (1536)',
    module: 'Bài 2.2',
    category: 'foundation',
    status: 'mastered',
    x: 230,
    y: 70,
    summary: 'Số chiều cố định do mô hình quy định, độc lập với độ dài câu văn.',
    explanation: 'Mỗi chiều thể hiện một thuộc tính ngữ nghĩa trừu tượng. Một từ ngắn như "AI" hay một đoạn văn 300 từ đều sinh ra đúng 1536 con số thực float32.',
    mathFormula: '\\dim(v) = 1536',
    references: [
      { type: 'slide', title: 'Slide Chương 2 (Trang 15)', detail: 'Không gian 1536 chiều và trade-off giữa tốc độ và độ chính xác' },
      { type: 'doc', title: 'OpenAI Dimension Reduction', detail: 'Tùy chọn cắt giảm chiều vector (dimension truncation)' }
    ]
  },
  {
    id: 'dotproduct',
    label: 'Dot Product & Magnitude',
    module: 'Bài 2.3',
    category: 'core',
    status: 'review',
    x: 230,
    y: 190,
    summary: 'Tích vô hướng và độ dài vector trong không gian đa chiều.',
    explanation: 'Tích vô hướng tính tổng tích các phần tử tương ứng. Độ dài vector (Magnitude) phụ thuộc vào tần số xuất hiện của các từ.',
    mathFormula: '\\mathbf{A} \\cdot \\mathbf{B} = \\sum_{i=1}^n A_i B_i = \\|\\mathbf{A}\\| \\|\\mathbf{B}\\| \\cos(\\theta)',
    references: [
      { type: 'slide', title: 'Slide Chương 2 (Trang 18)', detail: 'Đại số tuyến tính căn bản cho Kỹ sư AI' },
      { type: 'video', title: 'Video Ôn tập Đại số (5m)', detail: 'Ý nghĩa hình học của Tích vô hướng' }
    ]
  },
  {
    id: 'cosine',
    label: 'Cosine Similarity',
    module: 'Bài 2.4 (Cốt lõi)',
    category: 'core',
    status: 'learning',
    x: 410,
    y: 130,
    summary: 'Đo góc lệch giữa 2 vector, triệt tiêu ảnh hưởng của độ dài văn bản.',
    explanation: 'Cosine Similarity chỉ quan tâm đến hướng vector chỉ về đâu chứ không quan tâm độ dài của vector. Vì vậy văn bản ngắn (1 câu) và văn bản dài (10 câu) cùng chủ đề vẫn cho độ tương đồng gần bằng 1.',
    mathFormula: '\\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}',
    codeSnippet: 'collection = chroma_client.create_collection("docs", metadata={"hnsw:space": "cosine"})',
    references: [
      { type: 'slide', title: 'Slide Chương 2 (Trang 22-25)', detail: 'Tại sao RAG luôn ưu tiên Cosine Similarity hơn Euclid' },
      { type: 'video', title: 'Video Bài 2.4 (8m)', detail: 'Trực quan hóa Cosine vs Euclidean Distance' },
      { type: 'doc', title: 'ChromaDB HNSW Metric Docs', detail: 'Cấu hình hnsw:space parameter' }
    ]
  },
  {
    id: 'euclidean',
    label: 'Khoảng cách Euclid (L2)',
    module: 'Bài 2.4B (Đối chiếu)',
    category: 'core',
    status: 'review',
    x: 410,
    y: 250,
    summary: 'Khoảng cách đường thẳng hình học giữa hai tọa độ vector.',
    explanation: 'Khoảng cách Euclid bị phụ thuộc mạnh vào độ dài vector. Nếu văn bản dài chứa nhiều từ lặp lại, vector bị kéo dài ra xa gốc tọa độ khiến khoảng cách Euclid tăng cao dù cùng nội dung.',
    mathFormula: 'd(\\mathbf{A}, \\mathbf{B}) = \\sqrt{\\sum_{i=1}^n (A_i - B_i)^2}',
    references: [
      { type: 'slide', title: 'Slide Chương 2 (Trang 26)', detail: 'Sai lầm phổ biến khi dùng khoảng cách Euclid cho văn bản' }
    ]
  },
  {
    id: 'chromadb',
    label: 'ChromaDB Vector Indexing',
    module: 'Bài 4 (Đang học)',
    category: 'application',
    status: 'learning',
    x: 580,
    y: 130,
    summary: 'Lưu trữ và lập chỉ mục HNSW để truy vấn top-k láng giềng gần nhất.',
    explanation: 'ChromaDB sử dụng giải thuật HNSW (Hierarchical Navigable Small World) để tìm kiếm xấp xỉ siêu tốc trên hàng triệu vector theo metric Cosine đã cấu hình.',
    codeSnippet: 'retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})',
    references: [
      { type: 'slide', title: 'Slide Bài 4 (Trang 5-9)', detail: 'Kiến trúc Retriever trong LangChain RAG Pipeline' },
      { type: 'doc', title: 'LangChain Chroma Integration', detail: 'Tài liệu chính thức LangChain Chroma module' }
    ]
  }
];

export const OptionB1Page: React.FC = () => {
  const { forwardToAITutor, setActiveTab } = useAITutor();
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('cosine');

  const selectedNode = graphNodes.find((n) => n.id === selectedNodeId) || graphNodes[3];

  const handleAskAITutorAboutNode = (node: GraphNode) => {
    setShowGraphModal(false);
    setActiveTab('aitutor');
    forwardToAITutor(
      `Giải thích giúp tôi mắt xích kiến thức "${node.label}" (${node.module}). Tại sao khái niệm này lại quan trọng khi xây dựng RAG Agent?`,
      `**Giải thích chi tiết về ${node.label} (${node.module}):**\n\n${node.explanation}\n\n${
        node.mathFormula ? `**Công thức cốt lõi:**\n$$${node.mathFormula}$$\n\n` : ''
      }${
        node.codeSnippet ? `**Code thực hành mẫu:**\n\`\`\`python\n${node.codeSnippet}\n\`\`\`\n\n` : ''
      }👉 **Ý nghĩa thực chiến:** Nắm vững mắt xích này giúp bạn tránh các lỗi truy vấn sai tài liệu khi triển khai ChromaDB trong bài học hôm nay!`
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-neutral-800">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Syllabus: TAB KIẾN THỨC NỀN ĐƯỢC ẨN (hidePrereqTab = true) */}
        <LeftSyllabus defaultTab="syllabus" hidePrereqTab={true} />

        {/* Central Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-5">
            {/* CONTEXTUAL BUTTON ABOVE THE VIDEO: Open Knowledge Graph Modal */}
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 px-4 shadow-xs flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-red-50 border border-brand-red/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900">
                      Sơ đồ Mắt xích Tri thức (Knowledge Graph)
                    </h3>
                    <span className="text-[10px] bg-red-100/70 text-brand-red font-semibold px-2 py-0.5 rounded-full">
                      Cách 2B
                    </span>
                  </div>
                  <p className="text-2xs text-neutral-500 mt-0.5">
                    Khám phá mối liên hệ giữa Vector Embeddings, Kích thước 1536 chiều, và Cosine Similarity bằng sơ đồ đồ thị.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowGraphModal(true)}
                  className="px-4 py-2 bg-brand-red hover:bg-brand-redHover text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-2 transition"
                  type="button"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Mở Sơ đồ Tri thức</span>
                </button>
              </div>
            </div>

            {/* Real Video Player */}
            <VideoLecturePlayer
              isOptionA={false}
              helpButtonLabel="Xem sơ đồ tri thức"
              onTriggerHelp={() => setShowGraphModal(true)}
              videoSrc="./videos/rag-lecture.mp4"
            />

            {/* Code Exercise Lab */}
            <CodeExerciseLab
              onTriggerAction={() => setShowGraphModal(true)}
              triggerButtonText="Sơ đồ tri thức"
              triggerButtonIcon={<Share2 className="w-3.5 h-3.5" />}
            />
          </div>
        </main>

        {/* Notes Right Sidebar */}
        <NotesRightSidebar initialOpen={true} />
      </div>

      {/* ======================================================== */}
      {/* GRAPH OF KNOWLEDGE MODAL (SPLIT VIEW WITH REFERENCES)    */}
      {/* ======================================================== */}
      {showGraphModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-5xl h-[88vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-50 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    Sơ đồ Mắt xích Tri thức (Knowledge Dependency Graph)
                  </h3>
                  <p className="text-2xs text-neutral-500">
                    Bấm vào từng mắt xích để xem bản chất toán học, code mẫu và tài liệu tham khảo tương ứng.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGraphModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition"
                title="Đóng sơ đồ"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Split 2 columns (Graph Canvas on Left, References on Right) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* LEFT COLUMN: INTERACTIVE KNOWLEDGE GRAPH CANVAS */}
              <div className="flex-1 p-4 bg-neutral-100/50 flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200">
                {/* Graph Legend & Status */}
                <div className="flex items-center justify-between text-2xs mb-2 bg-white p-2 rounded-lg border border-neutral-200 shadow-2xs">
                  <span className="font-semibold text-neutral-700">Trạng thái mắt xích:</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-neutral-600">Đã nắm vững</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-brand-red" />
                      <span className="text-neutral-600">Trọng tâm bài</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-neutral-600">Cần ôn lại</span>
                    </span>
                  </div>
                </div>

                {/* SVG & Node Interactive Canvas */}
                <div className="flex-1 bg-white rounded-xl border border-neutral-200 relative overflow-hidden shadow-inner p-2">
                  <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 680 320">
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="22"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
                      </marker>
                    </defs>

                    {/* Connecting Edges */}
                    {/* Embeddings -> Dimension */}
                    <path d="M 140 130 C 180 130, 180 70, 230 70" fill="none" stroke="#d1d5db" strokeWidth="2" markerEnd="url(#arrow)" />
                    {/* Embeddings -> Dot Product */}
                    <path d="M 140 130 C 180 130, 180 190, 230 190" fill="none" stroke="#d1d5db" strokeWidth="2" markerEnd="url(#arrow)" />
                    {/* Dimension -> Cosine */}
                    <path d="M 330 70 C 370 70, 370 130, 410 130" fill="none" stroke="#d1d5db" strokeWidth="2" markerEnd="url(#arrow)" />
                    {/* Dot Product -> Cosine */}
                    <path d="M 330 190 C 370 190, 370 130, 410 130" fill="none" stroke="#d1d5db" strokeWidth="2" markerEnd="url(#arrow)" />
                    {/* Dot Product -> Euclidean */}
                    <path d="M 330 190 C 370 190, 370 250, 410 250" fill="none" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    {/* Cosine -> ChromaDB */}
                    <path d="M 500 130 L 580 130" fill="none" stroke="#c92a2a" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  </svg>

                  {/* Interactive Nodes Placed Absolutely */}
                  {graphNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 select-none shadow-xs w-36 sm:w-40 ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900 ring-2 ring-brand-red scale-105 z-20 shadow-md'
                            : node.id === 'cosine'
                            ? 'bg-red-50 text-neutral-900 border-brand-red hover:scale-102 z-10'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:scale-102 z-10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[9px] font-mono px-1 rounded ${
                              isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
                            }`}
                          >
                            {node.module}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              node.status === 'mastered'
                                ? 'bg-emerald-500'
                                : node.status === 'learning'
                                ? 'bg-brand-red animate-pulse'
                                : 'bg-amber-500'
                            }`}
                          />
                        </div>
                        <h4 className="font-bold text-xs truncate leading-tight">{node.label}</h4>
                        <p
                          className={`text-[10px] mt-1 line-clamp-1 ${
                            isSelected ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          {node.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: INFORMATION & REFERENCES ON THE SIDE OF MODAL */}
              <div className="w-full md:w-80 lg:w-96 p-4 sm:p-5 bg-white flex flex-col justify-between overflow-y-auto space-y-4">
                {/* Node Detail Section */}
                <div className="space-y-3.5">
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-brand-red bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {selectedNode.module}
                    </span>
                    <span
                      className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                        selectedNode.status === 'mastered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedNode.status === 'learning'
                          ? 'bg-red-100 text-brand-red'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {selectedNode.status === 'mastered'
                        ? 'Đã nắm vững'
                        : selectedNode.status === 'learning'
                        ? 'Trọng tâm bài giảng'
                        : 'Cần xem lại'}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 tracking-tight">
                      {selectedNode.label}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {selectedNode.explanation}
                    </p>
                  </div>

                  {/* Math Formula if present */}
                  {selectedNode.mathFormula && (
                    <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-xs">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                        Công thức toán học
                      </span>
                      <div className="font-mono text-xs text-neutral-900 bg-white p-2 rounded border border-neutral-200/80 overflow-x-auto">
                        $${selectedNode.mathFormula}$$
                      </div>
                    </div>
                  )}

                  {/* Code Snippet if present */}
                  {selectedNode.codeSnippet && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase block">
                        Cấu hình code thực chiến
                      </span>
                      <pre className="bg-neutral-900 text-neutral-200 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-normal">
                        <code>{selectedNode.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* REFERENCES SECTION ON THE SIDE */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <h4 className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Tài liệu tham khảo liên quan (References)</span>
                    </h4>

                    <div className="space-y-1.5">
                      {selectedNode.references.map((ref, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-neutral-50 border border-neutral-200/80 hover:bg-neutral-100/70 transition flex items-start space-x-2 text-2xs"
                        >
                          {ref.type === 'slide' ? (
                            <FileText className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                          ) : ref.type === 'video' ? (
                            <Video className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-neutral-900 block truncate">
                              {ref.title}
                            </span>
                            <span className="text-neutral-500 text-[11px] leading-tight block">
                              {ref.detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions inside Side Panel */}
                <div className="pt-3 border-t border-neutral-100 space-y-2">
                  <button
                    onClick={() => handleAskAITutorAboutNode(selectedNode)}
                    className="w-full py-2 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs transition"
                    type="button"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hỏi AI Tutor về mắt xích này</span>
                  </button>

                  <button
                    onClick={() => setShowGraphModal(false)}
                    className="w-full py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition text-center"
                    type="button"
                  >
                    Đóng và tiếp tục bài giảng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
