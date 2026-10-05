import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopNavigationProps {
  lessonTitle?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  lessonTitle = "Bài 4: Xây dựng RAG Agent cơ bản với LangChain"
}) => {
  return (
    <header className="bg-white border-b border-neutral-200 h-14 flex-shrink-0 flex items-center justify-between px-4 z-20 select-none">
      {/* Left: Back button & clean title */}
      <div className="flex items-center space-x-3 overflow-hidden">
        <Link
          to="/"
          aria-label="Quay lại"
          className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-sm font-semibold text-neutral-800 truncate" title={lessonTitle}>
          {lessonTitle}
        </h1>
      </div>

      {/* Right Navigation: Progress, Language, Avatar (AI Tutor button removed per prompt) */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
        {/* Progress indicator */}
        <div className="hidden sm:flex items-center space-x-2.5 text-xs text-neutral-600">
          <span className="whitespace-nowrap font-medium text-neutral-700">6/38 hoạt động</span>
          <div className="w-20 bg-neutral-200 h-1.5 rounded-full overflow-hidden flex">
            <div className="bg-sky-600 h-full w-[28%] rounded-full"></div>
          </div>
        </div>

        {/* Language switch */}
        <div className="flex items-center border border-neutral-200 rounded text-xs font-semibold overflow-hidden">
          <button className="px-2 py-0.5 text-neutral-500 hover:text-neutral-800 bg-white" type="button">
            EN
          </button>
          <button className="px-2 py-0.5 bg-brand-red text-white" type="button">
            VI
          </button>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-semibold text-xs cursor-pointer select-none">
          P
        </div>
      </div>
    </header>
  );
};
