import React from 'react';
import { Link } from 'react-router-dom';
import { TopNavigation } from '../components/TopNavigation';
import { LeftSyllabus } from '../components/LeftSyllabus';
import { VideoLecturePlayer } from '../components/VideoLecturePlayer';
import { NotesRightSidebar } from '../components/NotesRightSidebar';
import {
  Sliders,
  ListChecks,
  Users,
  ArrowRight,
  Share2
} from 'lucide-react';

export const HomeOverview: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-neutral-800">
      {/* Top Navigation - Clean, no option tabs */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Syllabus */}
        <LeftSyllabus />

        {/* Central Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Welcome Card */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                VLearn Studio: Ba cách tiếp cận khi gặp khái niệm khó
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                Khi học viên gặp thuật ngữ phức tạp trong bài thực hành LangChain (ví dụ: Embedding Dimension &amp; Cosine Similarity), hệ thống cung cấp 3 cách hỗ trợ khác nhau để bạn thử nghiệm:
              </p>
            </div>

            {/* Clean Choice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              {/* Option A Link */}
              <Link
                to="/option-a"
                className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-brand-red hover:bg-red-50/20 transition flex flex-col justify-between space-y-3 group shadow-2xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-brand-red font-semibold text-xs">
                    <Sliders className="w-4 h-4" />
                    <span>Cách 1: AI chẩn đoán</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    AI đặt 2 câu hỏi ngắn để suy luận chỗ bạn bị nghẽn và đưa tóm tắt trong 60 giây.
                  </p>
                </div>
                <div className="text-xs text-brand-red font-medium flex items-center space-x-1 pt-1">
                  <span>Trải nghiệm Cách 1</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>

              {/* Option B Link */}
              <Link
                to="/option-b"
                className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-brand-red hover:bg-red-50/20 transition flex flex-col justify-between space-y-3 group shadow-2xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-neutral-800 font-semibold text-xs">
                    <ListChecks className="w-4 h-4 text-brand-red" />
                    <span>Cách 2: Tự chọn kiến thức</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Mở bảng các mắt xích kiến thức nền có sẵn; bạn tự chọn điểm mình mơ hồ để đọc giải thích.
                  </p>
                </div>
                <div className="text-xs text-brand-red font-medium flex items-center space-x-1 pt-1">
                  <span>Trải nghiệm Cách 2</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>

              {/* Option B1 Link (Knowledge Graph) */}
              <Link
                to="/option-b1"
                className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-brand-red hover:bg-red-50/20 transition flex flex-col justify-between space-y-3 group shadow-2xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-neutral-800 font-semibold text-xs">
                    <Share2 className="w-4 h-4 text-brand-red" />
                    <span>Cách 2B: Sơ đồ tri thức</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Nút mở đồ thị mắt xích trực quan với tài liệu tham khảo và liên kết AI Tutor bên cạnh.
                  </p>
                </div>
                <div className="text-xs text-brand-red font-medium flex items-center space-x-1 pt-1">
                  <span>Trải nghiệm Cách 2B</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>

              {/* Option C Link */}
              <Link
                to="/option-c"
                className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-brand-red hover:bg-red-50/20 transition flex flex-col justify-between space-y-3 group shadow-2xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-neutral-800 font-semibold text-xs">
                    <Users className="w-4 h-4 text-brand-red" />
                    <span>Cách 3: Đối chiếu &amp; Trợ giảng</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Đối chiếu 2 cách hiểu phổ biến (A vs B) để nhận diện ngộ nhận; có thể gửi câu hỏi cho trợ giảng.
                  </p>
                </div>
                <div className="text-xs text-brand-red font-medium flex items-center space-x-1 pt-1">
                  <span>Trải nghiệm Cách 3</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            </div>
          </div>

          {/* Video Lecture Player (Stitch Baseline View) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
              Giao diện bài học chuẩn
            </h3>
            <VideoLecturePlayer
              isOptionA={false}
              helpButtonLabel="Thử nghiệm hỗ trợ"
              onTriggerHelp={() => (window.location.hash = '#/option-a')}
            />
          </div>
        </div>
      </main>

        {/* Notes Right Sidebar */}
        <NotesRightSidebar initialOpen={true} />
      </div>
    </div>
  );
};
