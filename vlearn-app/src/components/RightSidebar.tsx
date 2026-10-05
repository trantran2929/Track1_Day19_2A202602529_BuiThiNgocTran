import React, { useState } from 'react';
import { Edit3, FolderGit2, X } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transcript' | 'notes' | 'resources'>('transcript');
  const [note, setNote] = useState<string>(
    'Lưu ý: text-embedding-3-small luôn có 1536 chiều. Cosine distance đo góc, không đo độ dài câu.'
  );

  return (
    <aside className="w-72 lg:w-80 flex-shrink-0 bg-white border-l border-neutral-200 flex flex-col h-full overflow-hidden select-none">
      {/* Tab Header Navigation */}
      <div className="px-3 border-b border-neutral-200 flex items-center justify-between">
        <nav className="flex space-x-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('transcript')}
            className={`py-3 px-1 border-b-2 font-semibold transition ${
              activeTab === 'transcript'
                ? 'text-brand-red border-brand-red'
                : 'text-neutral-500 border-transparent hover:text-neutral-800'
            }`}
            type="button"
          >
            Transcript
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-1 border-b-2 font-semibold transition ${
              activeTab === 'notes'
                ? 'text-brand-red border-brand-red'
                : 'text-neutral-500 border-transparent hover:text-neutral-800'
            }`}
            type="button"
          >
            Ghi chú
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3 px-1 border-b-2 font-semibold transition ${
              activeTab === 'resources'
                ? 'text-brand-red border-brand-red'
                : 'text-neutral-500 border-transparent hover:text-neutral-800'
            }`}
            type="button"
          >
            Tài liệu
          </button>
        </nav>

        <button aria-label="Đóng" className="p-1 text-neutral-400 hover:text-neutral-600 rounded" type="button">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {activeTab === 'transcript' && (
          <div className="space-y-3 text-neutral-700">
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-2xs font-mono text-neutral-500 font-semibold">[00:15]</span>
              <p className="leading-relaxed">
                Khi khởi tạo VectorStore, embedding model quy định số chiều vector mà cơ sở dữ liệu sẽ lưu trữ.
              </p>
            </div>
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-2xs font-mono text-neutral-500 font-semibold">[01:40]</span>
              <p className="leading-relaxed">
                Cosine Similarity tính góc giữa hai vector trong không gian đa chiều, giúp tìm tài liệu cùng ý nghĩa bất kể độ dài ngắn.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-neutral-600">
              <span className="flex items-center space-x-1.5 font-medium">
                <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Ghi chú của bạn</span>
              </span>
              <span className="text-2xs text-neutral-400">Đã lưu tự động</span>
            </div>
            <textarea
              rows={6}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white transition"
              placeholder="Nhập ghi chú tại đây..."
            />
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-2">
            <div className="font-semibold text-neutral-800 flex items-center space-x-1.5 pb-1">
              <FolderGit2 className="w-3.5 h-3.5 text-neutral-600" />
              <span>Tài liệu đính kèm</span>
            </div>
            <ul className="space-y-1.5 text-neutral-600">
              <li className="flex items-center justify-between p-2 rounded hover:bg-neutral-50 cursor-pointer border border-neutral-100">
                <span>ChromaDB Documentation</span>
                <span className="text-2xs text-neutral-400 font-mono">Link</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded hover:bg-neutral-50 cursor-pointer border border-neutral-100">
                <span>Vector Embeddings Cheatsheet</span>
                <span className="text-2xs text-neutral-400 font-mono">PDF</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};
