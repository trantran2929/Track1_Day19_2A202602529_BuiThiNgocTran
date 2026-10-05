import React, { useState } from 'react';
import { TopNavigation } from '../components/TopNavigation';
import { LeftSyllabus } from '../components/LeftSyllabus';
import { VideoLecturePlayer } from '../components/VideoLecturePlayer';
import { CodeExerciseLab } from '../components/CodeExerciseLab';
import { NotesRightSidebar } from '../components/NotesRightSidebar';
import {
  GitCompare,
  LifeBuoy,
  X,
  ArrowRight,
  Send,
  Check,
  Sparkles,
  Bot,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useAITutor } from '../context/AITutorContext';

export const OptionCPage: React.FC = () => {
  const { forwardToAITutor, setActiveTab } = useAITutor();
  const [contrastActive, setContrastActive] = useState<boolean>(true);
  const [selectedStance, setSelectedStance] = useState<'A' | 'B' | null>('B');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);
  const [showEscalationBox, setShowEscalationBox] = useState<boolean>(false);
  const [mentorNote, setMentorNote] = useState<string>(
    'Tôi hiểu Cosine Similarity đo góc, nhưng tại sao khi chuẩn hóa vector L2 thì Dot Product lại tương đương Cosine Similarity?'
  );
  const [escalated, setEscalated] = useState<boolean>(false);

  const handleSelectStance = (stance: 'A' | 'B') => {
    setSelectedStance(stance);
    setHasEvaluated(true);
  };

  const handleAskAITutorContrast = () => {
    setActiveTab('aitutor');
    forwardToAITutor(
      `Phân tích đối chiếu chuyên sâu giúp tôi:
Quan điểm A: "Khoảng cách Euclid đo đường thẳng nên luôn chính xác hơn góc Cosine".
Quan điểm B: "Góc Cosine chuẩn hóa độ dài câu nên đo ý nghĩa trung thực hơn".
Tại sao Quan điểm A lại là ngộ nhận phổ biến và khi nào thì nên dùng từng loại trong thực tế RAG?`,
      `**Phân tích đối chiếu từ AI Tutor: Euclid vs Cosine Similarity**

### 1. Bảng đối chiếu nhanh:
| Tiêu chí | Khoảng cách Euclid (L2) | Cosine Similarity |
| :--- | :--- | :--- |
| **Công thức** | $\\sqrt{\\sum (A_i - B_i)^2}$ | $\\frac{A \\cdot B}{\\|A\\| \\|B\\|}$ |
| **Phụ thuộc độ dài câu** | Rất nhạy cảm (Độ dài làm thổi phồng khoảng cách) | **Hoàn toàn độc lập** (Độ dài bị triệt tiêu) |
| **Ứng dụng tối ưu** | Đo khoảng cách vật lý, cụm dữ liệu chuẩn hóa | **So khớp văn bản, tài liệu RAG, Chatbot** |

### 2. Vì sao Quan điểm A là ngộ nhận phổ biến?
- Trong hình học 2D/3D thông thường, trực giác con người nghĩ khoảng cách đường thẳng ngắn nhất là chuẩn nhất.
- Tuy nhiên trong xử lý ngôn ngữ tự nhiên (NLP), câu dài 100 từ có nhiều từ lặp lại sẽ làm vector bị kéo dài ra xa gấp 10 lần câu 10 từ dù cùng một chủ đề (ví dụ cùng nói về 'Trí tuệ nhân tạo').
- Khi dùng Euclid, khoảng cách giữa 2 câu này sẽ bị tính rất xa nhau (sai lệch ý nghĩa).

### 3. Cấu hình ChromaDB chuẩn:
\`\`\`python
# Cấu hình metric cosine trong ChromaDB:
collection = client.create_collection(
    name="rag_knowledge",
    metadata={"hnsw:space": "cosine"}
)
\`\`\`
👉 Bạn có muốn xem thêm ví dụ tính toán số học cụ thể giữa 2 vector mẫu không?`
    );
  };

  const handleConfirmSendToMentor = () => {
    setEscalated(true);
    setShowEscalationBox(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 text-neutral-800">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Syllabus: Defaults to AI Tutor tab for active assistance */}
        <LeftSyllabus defaultTab="aitutor" />

        {/* Central Workspace Area: Clean, Spacious Full Width */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Escalation Success Alert Banner */}
            {escalated && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 px-4 flex items-center justify-between text-xs text-emerald-800 shadow-xs animate-in fade-in">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold block">Đã gửi câu hỏi đối chiếu cho Trợ giảng trực ban!</span>
                    <span className="text-2xs text-emerald-700">
                      Trợ giảng Nguyễn Văn A sẽ phản hồi giải đáp trực tiếp qua khung chat trong vòng 10 phút.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setEscalated(false)}
                  className="text-neutral-500 hover:text-neutral-800 text-2xs font-semibold px-2 py-1 rounded hover:bg-emerald-100 transition"
                >
                  Đóng
                </button>
              </div>
            )}

            {/* Video Lecture Player (Stitch Baseline View with real video) */}
            <VideoLecturePlayer
              isOptionA={false}
              onTriggerHelp={() => setContrastActive(true)}
              helpButtonLabel="Đối chiếu 2 cách hiểu"
              videoSrc="./videos/rag-lecture.mp4"
            />

            {/* ======================================================== */}
            {/* IMPROVED COGNITIVE CONTRAST IN-FLOW WORKBENCH            */}
            {/* (Inspired by Option A's in-context instant feedback flow) */}
            {/* ======================================================== */}
            {contrastActive && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 border border-brand-red/30 flex items-center justify-center text-brand-red">
                      <GitCompare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-neutral-900 text-sm">
                          Đối chiếu Nhận thức: Khoảng cách Euclid vs Góc Cosine
                        </h3>
                        <span className="text-[10px] bg-red-100/70 text-brand-red font-semibold px-2 py-0.5 rounded-full">
                          Cách 3: Phản tư &amp; Trợ giảng
                        </span>
                      </div>
                      <p className="text-2xs text-neutral-500 mt-0.5">
                        Chọn quan điểm mà bạn nghĩ là bản chất khi so sánh văn bản trong hệ thống RAG:
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAskAITutorContrast}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition shadow-2xs"
                      type="button"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Hỏi AI Tutor đối chiếu</span>
                    </button>
                  </div>
                </div>

                {/* Stance Choice Cards (Side by side comparison) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* Quan điểm A */}
                  <div
                    onClick={() => handleSelectStance('A')}
                    className={`p-4 rounded-xl border cursor-pointer transition select-none flex flex-col justify-between space-y-2.5 ${
                      selectedStance === 'A'
                        ? 'border-amber-400 bg-amber-50/30 ring-2 ring-amber-300 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100/60'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-neutral-900">
                          Quan điểm A (Trực giác hình học)
                        </span>
                        {hasEvaluated && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Ngộ nhận phổ biến</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed font-mono text-[11px] bg-white p-2.5 rounded-lg border border-neutral-200">
                        &quot;Khoảng cách Euclid là đường thẳng nối 2 điểm, nên khi 2 vector càng gần nhau thì ý nghĩa càng sát nhau nhất. Không cần đo góc Cosine phức tạp.&quot;
                      </p>
                    </div>

                    {hasEvaluated && selectedStance === 'A' && (
                      <div className="text-2xs text-amber-800 bg-amber-100/80 p-2.5 rounded-lg border border-amber-200 space-y-1">
                        <p className="font-semibold">⚠️ Tại sao đây là ngộ nhận?</p>
                        <p className="leading-relaxed">
                          Độ dài câu làm sai lệch khoảng cách Euclid: một bài 10 từ và bài 500 từ cùng chủ đề sẽ có vector Euclid rất xa nhau.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quan điểm B */}
                  <div
                    onClick={() => handleSelectStance('B')}
                    className={`p-4 rounded-xl border cursor-pointer transition select-none flex flex-col justify-between space-y-2.5 ${
                      selectedStance === 'B'
                        ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-400 shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100/60'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-neutral-900">
                          Quan điểm B (Bản chất NLP &amp; RAG)
                        </span>
                        {hasEvaluated && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Đúng bản chất</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed font-mono text-[11px] bg-white p-2.5 rounded-lg border border-neutral-200">
                        &quot;Cosine Similarity chỉ đo hướng của vector (ngữ cảnh ngữ nghĩa), chia cho tích độ dài nên hoàn toàn triệt tiêu ảnh hưởng của việc văn bản dài hay ngắn.&quot;
                      </p>
                    </div>

                    {hasEvaluated && selectedStance === 'B' && (
                      <div className="text-2xs text-emerald-800 bg-emerald-100/80 p-2.5 rounded-lg border border-emerald-200 space-y-1">
                        <p className="font-semibold">✅ Chính xác!</p>
                        <p className="leading-relaxed">
                          Cosine Similarity chuẩn hóa magnitude về 1, giúp so khớp tài liệu chính xác bất kể độ dài văn bản.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instant Action Bar: Seamless Bridge to AI Tutor & Human TA */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-2.5">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAskAITutorContrast}
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center space-x-2 shadow-xs transition"
                      type="button"
                    >
                      <Bot className="w-3.5 h-3.5 text-purple-400" />
                      <span>Nhờ AI Tutor phân tích so sánh chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShowEscalationBox(!showEscalationBox)}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200 flex items-center space-x-1.5 transition"
                      type="button"
                    >
                      <LifeBuoy className="w-3.5 h-3.5 text-brand-red" />
                      <span>Gửi câu hỏi cho Trợ giảng (Human TA)</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-neutral-500">
                    Phản hồi trợ giảng cam kết trong <strong>10 phút</strong>
                  </span>
                </div>

                {/* Inline Escalation Box to Human TA (No clunky modal overlay!) */}
                {showEscalationBox && (
                  <div className="mt-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LifeBuoy className="w-4 h-4 text-brand-red" />
                        <h4 className="text-xs font-bold text-neutral-900">
                          Chuyển câu hỏi cho Trợ giảng trực ban
                        </h4>
                      </div>
                      <button
                        onClick={() => setShowEscalationBox(false)}
                        className="text-neutral-400 hover:text-neutral-600 p-1"
                        type="button"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-2xs text-neutral-600">
                      Nếu câu trả lời của AI Tutor chưa giải tỏa hết băn khoăn, hãy nhập câu hỏi cụ thể bên dưới để Trợ giảng hỗ trợ trực tiếp:
                    </p>

                    <textarea
                      rows={3}
                      value={mentorNote}
                      onChange={(e) => setMentorNote(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-red"
                      placeholder="Nhập băn khoăn hoặc trường hợp bạn muốn trợ giảng giải thích..."
                    />

                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setShowEscalationBox(false)}
                        className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-200 rounded"
                        type="button"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleConfirmSendToMentor}
                        className="px-4 py-1.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5"
                        type="button"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Xác nhận gửi trợ giảng (10m)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Code Exercise Lab sits directly below */}
            <CodeExerciseLab
              onTriggerAction={() => setContrastActive(true)}
              triggerButtonText="Đối chiếu nhận thức"
              triggerButtonIcon={<GitCompare className="w-3.5 h-3.5" />}
            />
          </div>
        </main>

        {/* Notes Right Sidebar */}
        <NotesRightSidebar initialOpen={true} />
      </div>
    </div>
  );
};
