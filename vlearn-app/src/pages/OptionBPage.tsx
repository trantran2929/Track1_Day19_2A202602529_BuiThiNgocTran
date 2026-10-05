import React, { useState } from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { LeftSyllabus } from '../components/LeftSyllabus';
import { VideoLecturePlayer } from '../components/VideoLecturePlayer';
import { CodeExerciseLab } from '../components/CodeExerciseLab';
import { NotesRightSidebar } from '../components/NotesRightSidebar';
import {
  ListChecks,
  CheckSquare,
  Square,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

interface PrerequisiteItem {
  id: string;
  title: string;
  module: string;
  checked: boolean;
  summary: string;
  plainExplanation: string;
  codeSnippet?: string;
}

export const OptionBPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedConcept, setSelectedConcept] = useState<string>('cosine');
  const [items, setItems] = useState<PrerequisiteItem[]>([
    {
      id: 'emb-basic',
      title: 'Vector Embeddings là gì?',
      module: 'Bài 2',
      checked: true,
      summary: 'Chuyển văn bản thành các chuỗi số thực để máy tính so sánh ý nghĩa.',
      plainExplanation: 'Giống như gán tọa độ cho từng câu văn trên một bản đồ ý nghĩa. Các câu cùng chủ đề sẽ nằm gần nhau.'
    },
    {
      id: 'dimension',
      title: 'Kích thước Vector (Dimension)',
      module: 'Bài 2.3',
      checked: false,
      summary: 'Số chiều đặc trưng cố định được sinh ra bởi mỗi mô hình (VD: OpenAI text-embedding-3-small là 1536 chiều).',
      plainExplanation: 'Mỗi chiều là một khía cạnh ngữ nghĩa. Dù câu chỉ có 1 từ hay 100 từ, đầu ra luôn có đúng 1536 con số.'
    },
    {
      id: 'cosine',
      title: 'Khoảng cách Cosine vs Euclidean',
      module: 'Bài 2.4',
      checked: false,
      summary: 'Cosine Similarity đo góc giữa hai vector, không phụ thuộc vào độ dài ngắn của văn bản.',
      plainExplanation: 'Hai chiếc xe cùng chỉ về hướng Bắc: dù xe A đi 1 mét hay xe B đi 10 km thì góc lệch vẫn bằng 0 (Cosine = 1).',
      codeSnippet: 'collection_metadata={"hnsw:space": "cosine"}'
    }
  ]);

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedCount = items.filter((i) => i.checked).length;
  const currentItem = items.find((i) => i.id === selectedConcept) || items[2];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-neutral-800">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Syllabus: Tabs switch between Syllabus, Prerequisites, and AI Tutor */}
        <LeftSyllabus
          defaultTab="prerequisites"
          onSelectPrerequisite={(id) => {
            setSelectedConcept(id);
            setDrawerOpen(true);
          }}
        />

        {/* Central Workspace Area: Generous full width for large video */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Video Lecture Player */}
            <VideoLecturePlayer
              isOptionA={false}
              onTriggerHelp={() => setDrawerOpen(true)}
              helpButtonLabel="Xem kiến thức nền"
            />

            {/* Code Exercise Lab */}
            <CodeExerciseLab
              onTriggerAction={() => setDrawerOpen(true)}
              triggerButtonText="Kiến thức nền"
              triggerButtonIcon={<ListChecks className="w-3.5 h-3.5" />}
            />
          </div>
        </main>

        {/* Notes Right Sidebar (Collapsed by default in Option B) */}
        <NotesRightSidebar initialOpen={false} />
      </div>

      {/* SLIDE-OUT CHECKLIST DRAWER - LIGHT THEME */}
      {drawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-neutral-200 shadow-xl flex flex-col transition-all duration-200">
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center space-x-2">
              <ListChecks className="w-4 h-4 text-brand-red" />
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                Kiến thức nền của bài này
              </h3>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded hover:bg-neutral-100 transition"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress / Readiness Meter */}
          <div className="px-5 py-2.5 bg-neutral-50/50 border-b border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
            <span>Tiến độ xem lại:</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-neutral-800 font-mono">
                {completedCount} / {items.length} phần
              </span>
              <div className="w-20 bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-red h-full transition-all duration-300"
                  style={{ width: `${(completedCount / items.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            <p className="text-neutral-600 leading-relaxed">
              Bấm vào từng mục bên dưới để đọc tóm tắt nhanh hoặc đánh dấu khi bạn đã hiểu:
            </p>

            {/* Checklist Tree Items */}
            <div className="space-y-2">
              {items.map((item) => {
                const isSelected = selectedConcept === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedConcept(item.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      isSelected
                        ? 'border-brand-red bg-red-50/40 shadow-xs'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2.5">
                        <button
                          onClick={(e) => toggleCheck(item.id, e)}
                          className="mt-0.5 text-neutral-500 hover:text-neutral-800"
                          title="Đánh dấu đã hiểu"
                        >
                          {item.checked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>
                        <div>
                          <h4
                            className={`font-semibold text-xs ${
                              isSelected ? 'text-brand-red' : 'text-neutral-900'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="text-2xs text-neutral-500 block">
                            {item.module}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-neutral-400 transition ${
                          isSelected ? 'transform rotate-90 text-brand-red' : ''
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail View of Selected Concept */}
            {currentItem && (
              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3 mt-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-neutral-900">{currentItem.title}</h4>
                  <p className="text-neutral-700 leading-relaxed">{currentItem.summary}</p>
                </div>

                <div className="p-3 bg-white rounded border border-neutral-200 space-y-1">
                  <span className="font-semibold text-neutral-900 block text-2xs uppercase tracking-wide">
                    Giải thích dễ hiểu:
                  </span>
                  <p className="text-neutral-700 leading-relaxed">{currentItem.plainExplanation}</p>
                </div>

                {currentItem.codeSnippet && (
                  <div className="p-2 bg-neutral-900 rounded font-mono text-2xs text-neutral-200 overflow-x-auto">
                    {currentItem.codeSnippet}
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-2xs text-neutral-500">
                  <span>Trích xuất từ {currentItem.module}</span>
                  <a
                    href="#xem-bai-goc"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Đang mở giáo trình "${currentItem.module}" trong tab mới.`);
                    }}
                    className="inline-flex items-center space-x-1 text-brand-red hover:underline font-medium"
                  >
                    <span>Mở bài giảng gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-end">
            <button
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-xs font-medium transition"
            >
              Tiếp tục làm bài
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
