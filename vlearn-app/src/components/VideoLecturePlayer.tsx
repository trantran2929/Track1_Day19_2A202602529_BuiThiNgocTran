import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bot,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAITutor } from '../context/AITutorContext';

interface VideoLecturePlayerProps {
  isOptionA?: boolean;
  onTriggerHelp?: () => void;
  helpButtonLabel?: string;
  videoSrc?: string;
}

export const VideoLecturePlayer: React.FC<VideoLecturePlayerProps> = ({
  isOptionA = true,
  helpButtonLabel = "Tôi vẫn chưa hiểu",
  videoSrc = "./videos/rag-lecture.mp4"
}) => {
  const { forwardToAITutor, setActiveTab } = useAITutor();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true); // start muted for autoplay safety
  const [liked, setLiked] = useState<boolean>(false);

  // Comments
  const [comments, setComments] = useState<string[]>([
    "Thầy giải thích đoạn góc giữa 2 vector rất trực quan!"
  ]);
  const [newComment, setNewComment] = useState<string>('');

  // Option A: Misunderstanding Assessment Score (0% to 100%)
  const [confusionScore, setConfusionScore] = useState<number>(20);

  // Option A: Chatbot Message & Border Timer State
  const [showChatbotMessage, setShowChatbotMessage] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<'unanswered' | 'correct' | 'wrong' | 'timeout'>('unanswered');
  const [timerSeconds, setTimerSeconds] = useState<number>(10);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | null>(null);

  // Real video timeupdate listener
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 15);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Option A Simulation: As the video plays, the assessment score increases
  useEffect(() => {
    if (!isOptionA || !isPlaying || showChatbotMessage) return;

    const interval = setInterval(() => {
      setConfusionScore((prev) => {
        const next = Math.min(100, prev + 4);
        if (next >= 100) {
          setShowChatbotMessage(true);
          setMessageStatus('unanswered');
          setTimerSeconds(10);
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isOptionA, isPlaying, showChatbotMessage]);

  // Option A: Countdown timer running around the border of the message
  useEffect(() => {
    if (!showChatbotMessage || messageStatus !== 'unanswered') return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 0.1) {
          // Timer runs out without answer -> PAUSE VIDEO and EMPHASIZE MESSAGE
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
          setMessageStatus('timeout');
          return 0;
        }
        return Math.max(0, parseFloat((prev - 0.1).toFixed(1)));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showChatbotMessage, messageStatus]);

  // User submits answer immediately on click
  const handleAnswerClick = (answer: 'a' | 'b') => {
    if (messageStatus !== 'unanswered' && messageStatus !== 'timeout') return;
    setSelectedAnswer(answer);

    if (answer === 'a') {
      // CORRECT ANSWER: Keep video playing smoothly!
      setMessageStatus('correct');
      // If video was paused (e.g. after timeout), resume it
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      setTimeout(() => {
        setShowChatbotMessage(false);
        setConfusionScore(0); // reset score
      }, 2500);
    } else {
      // WRONG ANSWER: Pause the video immediately and display explanation button!
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setMessageStatus('wrong');
    }
  };

  const handleForwardToAITutor = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowChatbotMessage(false);
    setConfusionScore(0);
    forwardToAITutor(
      "Tôi vừa trả lời câu hỏi kiểm tra trên bài giảng: 'Kích thước Vector Dimension (1536) trong mô hình OpenAI text-embedding-3-small có ý nghĩa gì?'. Tôi chọn đáp án 'Câu văn chỉ được chứa tối đa 1536 từ hoặc ký tự' và đã trả lời sai. Hãy giải thích giúp tôi bản chất toán học và ý nghĩa thực tế trong RAG.",
      "**Chào bạn! AI Tutor xin giải thích chi tiết câu hỏi này:**\n\n1. **Bản chất của Vector Dimension (1536 chiều):**\n- Khi mô hình Embedding tiếp nhận một đoạn văn bản, nó sẽ trích xuất 1536 thuộc tính ngữ nghĩa (semantic features). Mỗi chiều biểu thị mức độ phản ánh một khía cạnh ngữ cảnh trừu tượng.\n\n2. **Tại sao không phải là số từ tối đa?**\n- Bất kể đoạn văn chỉ có **1 từ** ('Python') hay đoạn văn dài **500 từ**, kết quả embedding luôn là một mảng gồm **đúng 1536 số thực** trong không gian $\\mathbb{R}^{1536}$.\n- Khái niệm số từ tối đa được gọi là **Context Window** (ví dụ 8191 tokens), không phải là Dimension!\n\n3. **Ý nghĩa khi dùng ChromaDB & Cosine Similarity:**\n- ChromaDB yêu cầu mọi vector nạp vào cùng một collection phải có chung số chiều để phép nhân vô hướng (Dot Product) và Cosine Similarity diễn ra hợp lệ.\n\n👉 Bạn có thể hỏi thêm tôi về cách cấu hình ChromaDB hoặc Cosine Similarity ngay bên dưới nhé!"
    );
  };

  // Manual trigger for testing or user click
  const handleManualTrigger = () => {
    setConfusionScore(100);
    setShowChatbotMessage(true);
    setMessageStatus('unanswered');
    setTimerSeconds(10);
    setSelectedAnswer(null);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [newComment, ...prev]);
    setNewComment('');
  };

  // Border timer percentage (100% down to 0%)
  const timerPercent = (timerSeconds / 10) * 100;

  return (
    <div className="w-full space-y-4">
      {/* REAL VIDEO PLAYER CONTAINER */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-neutral-300 bg-black aspect-video flex flex-col justify-end select-none group">
        {/* Real HTML5 Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Overlay Artwork Banner on top */}
        <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-3 sm:p-4 pointer-events-none flex items-center justify-between text-white z-10">
          <div className="flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 bg-brand-red rounded-xs"></span>
            <span className="font-bold tracking-wide">VLEARN STUDIO</span>
            <span className="text-neutral-400">•</span>
            <span className="font-medium text-neutral-200">BÀI 4: VECTORSTORE INDEXING</span>
          </div>
          <span className="text-2xs bg-black/40 px-2 py-0.5 rounded border border-white/20 font-mono text-neutral-300">
            Embedding Dimension &amp; Cosine
          </span>
        </div>

        {/* Big Center Play/Pause button when paused and no chatbot overlay */}
        {!isPlaying && !showChatbotMessage && (
          <button
            onClick={togglePlay}
            aria-label="Phát video"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/80 hover:bg-white text-neutral-900 shadow-xl flex items-center justify-center transition transform hover:scale-105 z-10"
            type="button"
          >
            <Play className="w-8 h-8 translate-x-0.5 fill-current" />
          </button>
        )}

        {/* OPTION A: CHATBOT MESSAGE OVERLAY WITH BORDER TIMER */}
        {isOptionA && showChatbotMessage && (
          <div
            className={`absolute z-20 top-12 right-4 left-4 sm:left-auto sm:w-[420px] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl transition-all duration-300 ${
              messageStatus === 'timeout'
                ? 'ring-4 ring-brand-red ring-offset-2 ring-offset-black scale-102 animate-pulse'
                : 'border border-neutral-200'
            }`}
          >
            {/* TIMER RUNNING AROUND THE BORDER OF THE MESSAGE */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none rounded-xl"
              style={{ overflow: 'visible' }}
            >
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                rx="10"
                fill="none"
                stroke={
                  messageStatus === 'timeout'
                    ? '#c92a2a'
                    : messageStatus === 'wrong'
                    ? '#e11d48'
                    : messageStatus === 'correct'
                    ? '#16a34a'
                    : '#c92a2a'
                }
                strokeWidth="3.5"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - timerPercent}
                className="transition-all duration-100 ease-linear"
              />
            </svg>

            {/* Chatbot Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-red-50 border border-brand-red/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 flex items-center space-x-1">
                    <span>AI Tutor kiểm tra nhanh</span>
                    <span className="text-[10px] text-brand-red font-mono font-semibold">
                      ({timerSeconds.toFixed(1)}s)
                    </span>
                  </h4>
                  <p className="text-[10px] text-neutral-500">
                    {messageStatus === 'timeout'
                      ? 'Video đã tạm dừng để bạn suy ngẫm câu hỏi'
                      : isPlaying
                      ? 'Video vẫn đang phát • Chọn câu trả lời ngay'
                      : 'Video đã tạm dừng'}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              {messageStatus === 'timeout' && (
                <span className="text-[10px] font-bold text-brand-red bg-red-100 px-2 py-0.5 rounded animate-bounce">
                  Hết giờ
                </span>
              )}
              {messageStatus === 'correct' && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Chính xác</span>
                </span>
              )}
              {messageStatus === 'wrong' && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Chưa đúng</span>
                </span>
              )}
            </div>

            {/* Question */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-900 leading-snug">
                Khi embedding model có dimension = 1536, điều đó có ý nghĩa gì?
              </p>

              {/* Answer Choices: Submit right away on click */}
              <div className="space-y-1.5 pt-1">
                {/* Option A (Correct) */}
                <button
                  onClick={() => handleAnswerClick('a')}
                  disabled={messageStatus === 'correct'}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start space-x-2 ${
                    selectedAnswer === 'a'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-medium'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
                  }`}
                  type="button"
                >
                  <span className="font-bold text-neutral-500">A.</span>
                  <span>Mỗi câu văn được biểu diễn thành tọa độ 1536 con số thực cố định.</span>
                </button>

                {/* Option B (Wrong) */}
                <button
                  onClick={() => handleAnswerClick('b')}
                  disabled={messageStatus === 'correct'}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start space-x-2 ${
                    selectedAnswer === 'b'
                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-medium'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
                  }`}
                  type="button"
                >
                  <span className="font-bold text-neutral-500">B.</span>
                  <span>Câu văn chỉ được chứa tối đa 1536 từ hoặc ký tự.</span>
                </button>
              </div>
            </div>

            {/* IF WRONG: Video is paused, display button to forward to AI Tutor */}
            {messageStatus === 'wrong' && (
              <div className="mt-3 pt-2.5 border-t border-neutral-200 space-y-2">
                <p className="text-2xs text-rose-700 font-medium">
                  Video đã tạm dừng vì bạn chọn chưa đúng. Mô hình embedding luôn gán đúng 1536 số thực cho mỗi đoạn văn, không phải số từ!
                </p>

                <button
                  onClick={handleForwardToAITutor}
                  className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition"
                  type="button"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Xem giải thích với AI Tutor</span>
                </button>
              </div>
            )}

            {/* IF TIMEOUT: Emphasize message banner & offer AI Tutor */}
            {messageStatus === 'timeout' && (
              <div className="mt-2.5 pt-2 border-t border-neutral-200 space-y-2 text-center">
                <p className="text-2xs font-semibold text-brand-red">
                  Hết thời gian trả lời nhanh! Hãy bấm chọn A hoặc B, hoặc nhờ AI Tutor giải thích.
                </p>
                <button
                  onClick={handleForwardToAITutor}
                  className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-xs font-medium flex items-center justify-center space-x-1.5 transition"
                  type="button"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Chuyển sang AI Tutor giải thích</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM VIDEO CONTROLS TOOLBAR */}
        <div className="z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3.5 pt-4 pb-2.5 text-white flex flex-col space-y-2">
          {/* Progress scrubber line */}
          <div className="w-full flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-brand-red hover:bg-white/50 transition"
            />
          </div>

          {/* Bottom control buttons & Indicators */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            {/* Left buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Tạm dừng" : "Phát"}
                className="hover:text-red-400 transition"
                type="button"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                aria-label="Âm lượng"
                className="hover:text-red-400 transition"
                type="button"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-2xs font-mono tracking-tight text-neutral-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right indicators */}
            <div className="flex items-center space-x-2 text-neutral-300 text-2xs">
              <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 font-mono">1080p</span>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      videoRef.current.requestFullscreen();
                    }
                  }
                }}
                aria-label="Toàn màn hình"
                className="hover:text-white"
                type="button"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REACTION & ASSESSING BUTTON BAR */}
      <div className="bg-white rounded-lg border border-neutral-200 p-3.5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
          {/* Reaction buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded border text-xs font-medium transition ${
                liked
                  ? 'border-brand-red text-brand-red bg-red-50/50'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
              type="button"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Thích · {liked ? 1 : 0}</span>
            </button>
            <button
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
              type="button"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Không thích</span>
            </button>
          </div>

          {/* CHATBOT ROBOT ICON + "TÔI VẪN CHƯA HIỂU" BUTTON WITH PROGRESS BAR TRACKING SCORE */}
          <div className="flex items-center space-x-2">
            {/* Robot Chatbot Icon beside button */}
            <button
              onClick={() => setActiveTab('aitutor')}
              className="flex items-center text-purple-700 hover:text-purple-900 transition p-1 hover:bg-purple-50 rounded"
              title="Mở AI Tutor Chat"
              type="button"
            >
              <Bot className="w-5 h-5 animate-bounce" />
            </button>

            {/* "Tôi vẫn chưa hiểu" button as a progress bar tracking confusion score */}
            <button
              onClick={handleManualTrigger}
              className="relative overflow-hidden px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs border border-neutral-300 hover:border-brand-red transition group"
              style={{ backgroundColor: '#262626' }}
              title="Bấm để kích hoạt câu hỏi kiểm tra nhanh hoặc theo dõi điểm tiếp thu"
              type="button"
            >
              {/* Dimmed Background Progress Fill that tracks the score */}
              <div
                className="absolute inset-y-0 left-0 bg-brand-red transition-all duration-300"
                style={{ width: `${confusionScore}%` }}
              />

              {/* Button text overlay on top of progress bar */}
              <span className="relative z-10 text-white font-medium flex items-center space-x-1.5">
                <span>{helpButtonLabel}</span>
                <span className="font-mono text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/90">
                  {Math.round(confusionScore)}%
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
            <span>Bình luận ({comments.length})</span>
          </h3>

          <div className="border border-neutral-200 rounded-lg p-3 bg-white focus-within:ring-1 focus-within:ring-neutral-400 focus-within:border-neutral-400 transition">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full text-xs text-neutral-800 placeholder-neutral-400 resize-none border-0 focus:ring-0 p-0 outline-none"
              placeholder="Chia sẻ câu hỏi hoặc nhận xét của bạn..."
              rows={2}
            />
            <div className="flex items-center justify-between pt-1 border-t border-neutral-100 mt-1">
              <span className="text-2xs text-neutral-400">Ctrl + Enter để gửi</span>
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-3 py-1 bg-brand-red hover:bg-brand-redHover disabled:bg-neutral-100 disabled:text-neutral-400 text-white rounded text-xs font-medium transition"
                type="button"
              >
                Gửi bình luận
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {comments.map((c, i) => (
              <div key={i} className="p-2.5 rounded bg-neutral-50 border border-neutral-200/70 text-xs text-neutral-800">
                <div className="flex items-center justify-between pb-1 text-2xs text-neutral-500">
                  <span className="font-semibold text-neutral-700">Học viên Linh</span>
                  <span>Vừa xong</span>
                </div>
                <p>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
