import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Save,
  Clock,
  Download,
  Tag,
  BookOpen
} from 'lucide-react';

interface NotesRightSidebarProps {
  initialOpen?: boolean;
}

export const NotesRightSidebar: React.FC<NotesRightSidebarProps> = ({
  initialOpen = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [noteContent, setNoteContent] = useState<string>(
`• Vector Embeddings: Biến văn bản thành 1536 tọa độ số thực (text-embedding-3-small).
• Cosine Similarity: Đo góc hướng ý nghĩa, hoàn toàn triệt tiêu ảnh hưởng của độ dài câu văn.
• ChromaDB: Luôn cấu hình metadata={"hnsw:space": "cosine"} cho bước Retrieval.`
  );
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const keyBookmarks = [
    { time: 0, label: '00:00 - Tổng quan LangChain & VectorStore' },
    { time: 10, label: '00:10 - Vector Embeddings 1536 chiều' },
    { time: 25, label: '00:25 - Bản chất Cosine vs Euclidean' },
    { time: 45, label: '00:45 - Cấu hình ChromaDB Indexing' }
  ];

  const handleSeekVideo = (seconds: number) => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = seconds;
      video.play().catch(() => {});
    }
  };

  const handleSaveNote = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(noteContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  // If collapsed, render sleek expandable side tab
  if (!isOpen) {
    return (
      <aside className="w-10 bg-white border-l border-neutral-200 flex flex-col items-center py-4 justify-between select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition flex flex-col items-center space-y-2"
          title="Mở bảng Ghi chú & Điểm nhấn"
          type="button"
        >
          <ChevronLeft className="w-4 h-4 text-brand-red" />
          <span className="[writing-mode:vertical-rl] text-2xs font-semibold text-neutral-600 tracking-wide mt-2">
            Ghi chú bài học
          </span>
        </button>
        <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse mb-2" />
      </aside>
    );
  }

  return (
    <aside className="w-72 sm:w-80 flex-shrink-0 bg-white border-l border-neutral-200 flex flex-col h-full overflow-hidden select-none transition-all duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-4 h-4 text-brand-red" />
          <h3 className="font-bold text-xs text-neutral-900">Ghi chú &amp; Điểm nhấn</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded transition"
          title="Thu gọn bảng ghi chú"
          type="button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs">
        {/* SECTION 1: GHI CHÚ CÁ NHÂN */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-800 text-2xs uppercase tracking-wide flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5 text-neutral-600" />
              <span>Ghi chép của bạn</span>
            </span>
            <div className="flex items-center space-x-1 text-2xs">
              <button
                onClick={handleCopyNote}
                className="p-1 text-neutral-500 hover:text-neutral-800 rounded transition flex items-center space-x-1"
                title="Sao chép ghi chú"
                type="button"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{isCopied ? 'Đã chép' : 'Chép'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={5}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-brand-red focus:bg-white leading-relaxed resize-none transition"
            placeholder="Gõ ghi chú bài học tại đây..."
          />

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center space-x-1 text-[10px] text-neutral-400">
              <Tag className="w-3 h-3" />
              <span>#LangChain #VectorStore #RAG</span>
            </div>
            <button
              onClick={handleSaveNote}
              className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-2xs font-medium flex items-center space-x-1 transition shadow-2xs"
              type="button"
            >
              {isSaved ? <Check className="w-3 h-3 text-emerald-400" /> : <Save className="w-3 h-3" />}
              <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: DẤU MỐC & ĐIỂM NHẤN BÀI GIẢNG (BOOKMARKS) */}
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-800 text-2xs uppercase tracking-wide flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-neutral-600" />
              <span>Dấu mốc video quan trọng</span>
            </span>
          </div>

          <div className="space-y-1.5">
            {keyBookmarks.map((bm, idx) => (
              <button
                key={idx}
                onClick={() => handleSeekVideo(bm.time)}
                className="w-full text-left p-2 rounded-lg bg-neutral-50 hover:bg-red-50/40 border border-neutral-200/80 hover:border-brand-red/60 text-2xs transition flex items-center justify-between group"
                type="button"
              >
                <span className="text-neutral-700 group-hover:text-brand-red font-medium truncate">
                  {bm.label}
                </span>
                <span className="text-neutral-400 group-hover:text-brand-red text-[10px] font-mono ml-1">
                  Nhảy tới &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: TÀI LIỆU ĐÍNH KÈM */}
        <div className="space-y-2 pt-2 border-t border-neutral-100">
          <span className="font-bold text-neutral-800 text-2xs uppercase tracking-wide flex items-center space-x-1">
            <Download className="w-3.5 h-3.5 text-neutral-600" />
            <span>Tài nguyên bài học</span>
          </span>

          <div className="space-y-1.5 text-2xs">
            <a
              href="#/option-b1"
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-between text-neutral-700 transition"
            >
              <div className="flex items-center space-x-2 truncate">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span className="truncate">Slide: Vector RAG Theory (PDF)</span>
              </div>
              <span className="text-neutral-400 text-[10px] font-mono">4.2 MB</span>
            </a>

            <a
              href="#/option-b"
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-between text-neutral-700 transition"
            >
              <div className="flex items-center space-x-2 truncate">
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span className="truncate">Source code: LangChain Chroma</span>
              </div>
              <span className="text-neutral-400 text-[10px] font-mono">.ipynb</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
