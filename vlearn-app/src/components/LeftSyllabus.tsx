import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  CheckCircle2,
  Circle,
  ListChecks,
  Sparkles,
  BookOpen,
  CheckSquare,
  Square,
  Send,
  RotateCcw,
  Copy,
  Bot,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';
import { useAITutor } from '../context/AITutorContext';

interface LeftSyllabusProps {
  defaultTab?: 'syllabus' | 'prerequisites' | 'aitutor';
  onSelectPrerequisite?: (conceptId: string) => void;
  hidePrereqTab?: boolean;
}

export const LeftSyllabus: React.FC<LeftSyllabusProps> = ({
  defaultTab,
  onSelectPrerequisite,
  hidePrereqTab = false
}) => {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    activeLessonId,
    setActiveLessonId,
    completedLessons,
    toggleLessonCompleted,
    chatMessages,
    isTyping,
    sendMessage,
    clearChat,
    forwardToAITutor,
    prereqItems,
    togglePrereq,
    markAllPrereqs,
    activePrereqDetail,
    setActivePrereqDetail
  } = useAITutor();

  // If defaultTab passed and different from activeTab on initial mount, set it
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab, setActiveTab]);

  // Collapsible syllabus sections state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    sec0: true,
    sec1: true,
    sec2: true
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Prerequisites filter state
  const [prereqFilter, setPrereqFilter] = useState<'all' | 'todo' | 'done'>('all');

  // Chat input state
  const [inputMessage, setInputMessage] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<{ [id: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when messages change or typing changes
  useEffect(() => {
    if (activeTab === 'aitutor' && typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, activeTab]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Filtered prerequisites
  const filteredPrereqs = prereqItems.filter((item) => {
    if (prereqFilter === 'todo') return !item.checked;
    if (prereqFilter === 'done') return item.checked;
    return true;
  });

  const completedPrereqCount = prereqItems.filter((i) => i.checked).length;

  return (
    <aside className="w-72 sm:w-80 lg:w-96 flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col h-full overflow-hidden select-none transition-all duration-200">
      {/* MULTIPLE COLLAPSIBLE TAB BAR */}
      <div className="border-b border-neutral-200 bg-neutral-50 p-1.5 flex items-center justify-between text-2xs font-semibold">
        {/* Tab 1: Bài học */}
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition ${
            activeTab === 'syllabus'
              ? 'bg-white text-neutral-900 shadow-xs border border-neutral-200 font-bold'
              : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60'
          }`}
          title="Nội dung bài học"
          type="button"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="truncate">Bài học</span>
        </button>

        {/* Tab 2: Kiến thức nền (Optional) */}
        {!hidePrereqTab && (
          <button
            onClick={() => setActiveTab('prerequisites')}
            className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition ${
              activeTab === 'prerequisites'
                ? 'bg-white text-brand-red shadow-xs border border-neutral-200 font-bold'
                : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60'
            }`}
            title="Mắt xích kiến thức nền"
            type="button"
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span className="truncate">Kiến thức nền</span>
            <span className="ml-0.5 px-1 py-0.2 bg-neutral-200 text-neutral-700 rounded-full font-mono text-[10px]">
              {completedPrereqCount}/{prereqItems.length}
            </span>
          </button>
        )}

        {/* Tab 3: AI Tutor */}
        <button
          onClick={() => setActiveTab('aitutor')}
          className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition relative ${
            activeTab === 'aitutor'
              ? 'bg-white text-purple-700 shadow-xs border border-neutral-200 font-bold'
              : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60'
          }`}
          title="AI Tutor Chatbot"
          type="button"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span className="truncate">AI Tutor</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: BÀI HỌC (SYLLABUS)                                */}
      {/* ======================================================== */}
      {activeTab === 'syllabus' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable Lesson Tree */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 text-xs">
            {/* Section 0: VectorStore & Embeddings */}
            <div>
              <button
                onClick={() => toggleSection('sec0')}
                className="w-full p-2.5 bg-neutral-50/80 hover:bg-neutral-100/80 border-b border-neutral-200 flex items-center justify-between text-left transition"
                type="button"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-neutral-800 tracking-wide uppercase text-2xs">
                    0. VectorStore &amp; Embeddings
                  </span>
                </div>
                {openSections.sec0 ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              {openSections.sec0 && (
                <div className="py-1 space-y-0.5">
                  {/* Item: Slide */}
                  <div
                    onClick={() => setActiveLessonId('sec0-0')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec0-0'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <FileText className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span className="truncate text-neutral-700 text-xs">Slide: Khái niệm VectorStore</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonCompleted('sec0-0');
                      }}
                      className="p-1 text-neutral-400 hover:text-emerald-600 transition"
                      title="Đánh dấu hoàn thành"
                      type="button"
                    >
                      {completedLessons.includes('sec0-0') ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-neutral-300" />
                      )}
                    </button>
                  </div>

                  {/* Item: Video Khởi tạo */}
                  <div
                    onClick={() => setActiveLessonId('sec0-1')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec0-1'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <Play className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0" />
                      <span className="truncate text-neutral-800 text-xs">Video: Khởi tạo Indexing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xs text-neutral-400 font-mono">4m</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted('sec0-1');
                        }}
                        className="p-1 text-neutral-400 hover:text-emerald-600 transition"
                        title="Đánh dấu hoàn thành"
                        type="button"
                      >
                        {completedLessons.includes('sec0-1') ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-neutral-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 1: Thực hành Coding */}
            <div>
              <button
                onClick={() => toggleSection('sec1')}
                className="w-full p-2.5 bg-neutral-50/80 hover:bg-neutral-100/80 border-b border-neutral-200 flex items-center justify-between text-left transition"
                type="button"
              >
                <span className="font-bold text-neutral-800 tracking-wide uppercase text-2xs">
                  1. Thực hành RAG Agent
                </span>
                {openSections.sec1 ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              {openSections.sec1 && (
                <div className="py-1 space-y-0.5">
                  {/* Item 1.1 */}
                  <div
                    onClick={() => setActiveLessonId('sec1-1')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec1-1'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span className="truncate">1.1 Chuẩn bị dữ liệu tài liệu</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xs text-neutral-400">4m</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted('sec1-1');
                        }}
                        className="p-1 text-neutral-400 hover:text-emerald-600 transition"
                        title="Đánh dấu hoàn thành"
                        type="button"
                      >
                        {completedLessons.includes('sec1-1') ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-neutral-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Item 1.2: Active Lesson */}
                  <div
                    onClick={() => setActiveLessonId('sec1-2')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer border-l-2 border-brand-red transition ${
                      activeLessonId === 'sec1-2'
                        ? 'bg-red-50/60 font-medium text-neutral-900'
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Play className="w-3.5 h-3.5 text-brand-red fill-brand-red flex-shrink-0" />
                      <span className="truncate font-semibold">1.2 Cấu hình ChromaDB Indexing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xs text-brand-red font-semibold bg-red-100/70 px-1.5 py-0.5 rounded">
                        Đang học
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted('sec1-2');
                        }}
                        className="p-1 text-neutral-400 hover:text-emerald-600 transition"
                        title="Đánh dấu hoàn thành"
                        type="button"
                      >
                        {completedLessons.includes('sec1-2') ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-neutral-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Item 1.3 */}
                  <div
                    onClick={() => setActiveLessonId('sec1-3')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec1-3'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Play className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400 flex-shrink-0" />
                      <span className="truncate">1.3 Truy vấn Vector Similarity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xs text-neutral-400">5m</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted('sec1-3');
                        }}
                        className="p-1 text-neutral-400 hover:text-emerald-600 transition"
                        title="Đánh dấu hoàn thành"
                        type="button"
                      >
                        {completedLessons.includes('sec1-3') ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-neutral-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Tối ưu */}
            <div>
              <button
                onClick={() => toggleSection('sec2')}
                className="w-full p-2.5 bg-neutral-50/80 hover:bg-neutral-100/80 border-b border-neutral-200 flex items-center justify-between text-left transition"
                type="button"
              >
                <span className="font-bold text-neutral-800 tracking-wide uppercase text-2xs">
                  2. Tối ưu hóa Retriever
                </span>
                {openSections.sec2 ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>

              {openSections.sec2 && (
                <div className="py-1 space-y-0.5">
                  <div
                    onClick={() => setActiveLessonId('sec2-1')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec2-1'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Play className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400 flex-shrink-0" />
                      <span className="truncate">2.1 Tối ưu hóa Retriever</span>
                    </div>
                    <span className="text-2xs text-neutral-400">6m</span>
                  </div>

                  <div
                    onClick={() => setActiveLessonId('sec2-2')}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition ${
                      activeLessonId === 'sec2-2'
                        ? 'bg-neutral-100 border-l-2 border-neutral-900 font-medium'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                      <span className="truncate">2.2 Re-ranking với Cohere</span>
                    </div>
                    <span className="text-2xs text-neutral-400">8m</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Quick Footer Actions */}
          <div className="p-3 border-t border-neutral-200 bg-neutral-50 space-y-2">
            <button
              onClick={() => setActiveTab('aitutor')}
              className="w-full py-1.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded text-2xs font-semibold flex items-center justify-center space-x-1.5 transition"
              type="button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hỏi AI Tutor về bài học này</span>
            </button>
            <button
              onClick={() => setActiveTab('prerequisites')}
              className="w-full py-1.5 px-3 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 rounded text-2xs font-medium flex items-center justify-center space-x-1.5 transition"
              type="button"
            >
              <ListChecks className="w-3.5 h-3.5 text-brand-red" />
              <span>Kiểm tra mắt xích kiến thức nền</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: KIẾN THỨC NỀN (PREREQUISITES CHECKLIST & CARDS)   */}
      {/* ======================================================== */}
      {activeTab === 'prerequisites' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header & Filter Bar */}
          <div className="p-3 border-b border-neutral-200 bg-neutral-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-800 text-2xs uppercase tracking-wide">
                Mắt xích kiến thức liên quan
              </span>
              <span className="text-2xs font-mono text-brand-red font-semibold bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                {completedPrereqCount}/{prereqItems.length} đã hiểu
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1 text-2xs">
              <button
                onClick={() => setPrereqFilter('all')}
                className={`px-2 py-1 rounded transition ${
                  prereqFilter === 'all'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                }`}
                type="button"
              >
                Tất cả ({prereqItems.length})
              </button>
              <button
                onClick={() => setPrereqFilter('todo')}
                className={`px-2 py-1 rounded transition ${
                  prereqFilter === 'todo'
                    ? 'bg-brand-red text-white font-semibold'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                }`}
                type="button"
              >
                Cần ôn ({prereqItems.length - completedPrereqCount})
              </button>
              <button
                onClick={() => setPrereqFilter('done')}
                className={`px-2 py-1 rounded transition ${
                  prereqFilter === 'done'
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                }`}
                type="button"
              >
                Đã nắm ({completedPrereqCount})
              </button>
            </div>
          </div>

          {/* Prerequisite Items List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
            {filteredPrereqs.map((item) => {
              const isExpanded = activePrereqDetail === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border transition shadow-2xs overflow-hidden ${
                    item.checked
                      ? 'bg-neutral-50/70 border-neutral-200'
                      : 'bg-white border-neutral-200 hover:border-brand-red/60'
                  }`}
                >
                  {/* Top card row */}
                  <div
                    onClick={() => {
                      setActivePrereqDetail(isExpanded ? null : item.id);
                      if (onSelectPrerequisite) onSelectPrerequisite(item.id);
                    }}
                    className="p-2.5 cursor-pointer flex items-start justify-between space-x-2"
                  >
                    <div className="flex items-start space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePrereq(item.id);
                        }}
                        className="mt-0.5 text-neutral-500 hover:text-neutral-800 transition"
                        title={item.checked ? "Đánh dấu chưa hiểu" : "Đánh dấu đã hiểu"}
                        type="button"
                      >
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
                        )}
                      </button>
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {item.module}
                          </span>
                          <span
                            className={`font-semibold text-xs ${
                              item.checked ? 'text-neutral-500 line-through' : 'text-neutral-900'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p className="text-2xs text-neutral-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-neutral-400 mt-1">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail Accordion */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-neutral-100 bg-neutral-50/60 space-y-2 text-2xs text-neutral-700">
                      <p className="leading-relaxed bg-white p-2 rounded border border-neutral-200/80">
                        {item.explanation}
                      </p>

                      {item.codeSnippet && (
                        <div className="bg-neutral-900 text-neutral-200 p-2 rounded font-mono text-[11px] overflow-x-auto">
                          <code>{item.codeSnippet}</code>
                        </div>
                      )}

                      {/* Action buttons inside item */}
                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => {
                            forwardToAITutor(
                              `Giải thích chi tiết giúp tôi khái niệm: "${item.title}". Bản chất và ứng dụng trong RAG là gì?`,
                              `**Giải thích chi tiết về ${item.title}:**\n\n${item.explanation}\n\nTrong bài tập RAG thực tế, khái niệm này giúp bạn tối ưu hóa bước so khớp tài liệu trong VectorStore để mô hình không bị nhầm lẫn giữa tài liệu dài và ngắn!`
                            );
                          }}
                          className="flex-1 py-1 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded text-[11px] font-semibold flex items-center justify-center space-x-1 transition"
                          type="button"
                        >
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span>Hỏi AI Tutor mục này</span>
                        </button>

                        <button
                          onClick={() => togglePrereq(item.id)}
                          className={`py-1 px-2 rounded text-[11px] font-medium border transition ${
                            item.checked
                              ? 'bg-neutral-100 text-neutral-600 border-neutral-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                          type="button"
                        >
                          {item.checked ? 'Đánh dấu chưa hiểu' : 'Đã hiểu rồi'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prerequisite Footer Buttons */}
          <div className="p-3 border-t border-neutral-200 bg-neutral-50 space-y-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => markAllPrereqs(true)}
                className="flex-1 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded text-2xs font-semibold transition"
                type="button"
              >
                Đánh dấu tất cả đã hiểu
              </button>
              <button
                onClick={() => markAllPrereqs(false)}
                className="py-1.5 px-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded text-2xs font-medium border border-neutral-200 transition"
                title="Đặt lại trạng thái"
                type="button"
              >
                Đặt lại
              </button>
            </div>

            <button
              onClick={() => navigate('/option-b')}
              className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-2xs font-medium transition flex items-center justify-center space-x-1.5"
              type="button"
            >
              <span>Mở bài tập theo mắt xích</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: AI TUTOR (CHATBOX WITH USER & AGENT MESSAGES)     */}
      {/* ======================================================== */}
      {activeTab === 'aitutor' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50/40">
          {/* AI Tutor Chat Header */}
          <div className="px-3.5 py-2.5 border-b border-neutral-200 bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-neutral-900 text-xs">AI Tutor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-emerald-600 font-medium">Trực tuyến</span>
                </div>
                <span className="text-[10px] text-neutral-500 block -mt-0.5">
                  Hỗ trợ LangChain &amp; Vector RAG 24/7
                </span>
              </div>
            </div>

            {/* Clear conversation button */}
            <button
              onClick={clearChat}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition"
              title="Làm mới hội thoại"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-neutral-100/70 border-b border-neutral-200 overflow-x-auto flex items-center space-x-1.5 text-2xs scrollbar-none">
            <span className="text-neutral-400 text-[10px] uppercase font-bold flex-shrink-0">Gợi ý:</span>
            <button
              onClick={() => sendMessage('Tại sao Cosine Similarity được dùng phổ biến hơn khoảng cách Euclid trong RAG?')}
              className="whitespace-nowrap px-2 py-0.8 bg-white hover:bg-purple-50 text-neutral-700 hover:text-purple-700 rounded-full border border-neutral-200 hover:border-purple-300 text-[11px] transition shadow-2xs"
              type="button"
            >
              📐 Cosine vs Euclid
            </button>
            <button
              onClick={() => sendMessage('Cho tôi xem code mẫu cấu hình Cosine Similarity trong ChromaDB LangChain')}
              className="whitespace-nowrap px-2 py-0.8 bg-white hover:bg-purple-50 text-neutral-700 hover:text-purple-700 rounded-full border border-neutral-200 hover:border-purple-300 text-[11px] transition shadow-2xs"
              type="button"
            >
              💻 Code ChromaDB
            </button>
            <button
              onClick={() => sendMessage('Số chiều 1536 của vector embedding có ý nghĩa gì đối với văn bản ngắn?')}
              className="whitespace-nowrap px-2 py-0.8 bg-white hover:bg-purple-50 text-neutral-700 hover:text-purple-700 rounded-full border border-neutral-200 hover:border-purple-300 text-[11px] transition shadow-2xs"
              type="button"
            >
              🔢 1536 chiều là gì?
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3.5 text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender badge & time */}
                <div className="flex items-center space-x-1 text-[10px] text-neutral-400 mb-1 px-1">
                  {msg.sender === 'user' ? (
                    <>
                      <span>Bạn</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-purple-600" />
                      <span className="font-semibold text-purple-700">AI Tutor</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[92%] rounded-xl p-3 shadow-2xs leading-relaxed text-xs ${
                    msg.sender === 'user'
                      ? 'bg-neutral-900 text-white rounded-tr-xs'
                      : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-tl-xs space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-line break-words">
                    {msg.text}
                  </div>

                  {/* Actions for Agent Message */}
                  {msg.sender === 'agent' && (
                    <div className="pt-2 mt-1 border-t border-neutral-100 flex items-center justify-between text-2xs text-neutral-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-neutral-800 flex items-center space-x-1 transition"
                          type="button"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedId === msg.id ? 'Đã chép!' : 'Chép'}</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setFeedbackGiven((prev) => ({ ...prev, [msg.id]: true }))}
                          className={`flex items-center space-x-1 px-1.5 py-0.5 rounded transition ${
                            feedbackGiven[msg.id]
                              ? 'text-emerald-700 bg-emerald-50 font-medium'
                              : 'hover:text-emerald-700 hover:bg-neutral-100'
                          }`}
                          type="button"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{feedbackGiven[msg.id] ? 'Đã hiểu' : 'Hữu ích'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-1 text-[10px] text-neutral-400 px-1">
                  <Bot className="w-3 h-3 text-purple-600" />
                  <span className="font-semibold text-purple-700">AI Tutor đang soạn câu trả lời...</span>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl rounded-tl-xs p-3 shadow-2xs flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chatbox Input Form */}
          <div className="p-2.5 border-t border-neutral-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Hỏi AI Tutor về bài học hoặc code..."
                className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-brand-red focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 bg-brand-red hover:bg-brand-redHover disabled:bg-neutral-200 disabled:text-neutral-400 text-white rounded-lg transition shadow-2xs"
                title="Gửi câu hỏi"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
