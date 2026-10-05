import React, { createContext, useContext, useState } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

export interface PrerequisiteItem {
  id: string;
  title: string;
  desc: string;
  checked: boolean;
  module: string;
  explanation: string;
  mathFormula?: string;
  codeSnippet?: string;
}

interface AITutorContextType {
  activeTab: 'syllabus' | 'prerequisites' | 'aitutor';
  setActiveTab: (tab: 'syllabus' | 'prerequisites' | 'aitutor') => void;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  toggleLessonCompleted: (id: string) => void;
  chatMessages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string, customReply?: string) => void;
  clearChat: () => void;
  forwardToAITutor: (userPrompt: string, aiExplanation: string) => void;
  prereqItems: PrerequisiteItem[];
  togglePrereq: (id: string) => void;
  markAllPrereqs: (completed: boolean) => void;
  activePrereqDetail: string | null;
  setActivePrereqDetail: (id: string | null) => void;
}

const initialPrereqs: PrerequisiteItem[] = [
  {
    id: 'emb-basic',
    title: 'Vector Embeddings là gì?',
    desc: 'Chuyển văn bản thành tọa độ số thực trong không gian đa chiều.',
    checked: true,
    module: 'Bài 2.1',
    explanation: 'Vector Embeddings là kỹ thuật ánh xạ từng từ, câu hoặc tài liệu thành một chuỗi số thực cố định sao cho các câu có ngữ nghĩa tương đồng sẽ nằm gần nhau trong không gian vector.',
    codeSnippet: 'embeddings = OpenAIEmbeddings(model="text-embedding-3-small")'
  },
  {
    id: 'dimension',
    title: 'Vector Dimension (1536)',
    desc: 'Số chiều cố định do mô hình embedding sinh ra.',
    checked: true,
    module: 'Bài 2.3',
    explanation: 'Mỗi vector biểu diễn một điểm với đúng 1536 tọa độ (cho text-embedding-3-small). Bất kể văn bản 1 từ hay 500 từ, độ dài mảng số thực luôn bằng 1536.',
    mathFormula: 'dim(v) = 1536 \\in \\mathbb{R}^{1536}'
  },
  {
    id: 'cosine',
    title: 'Cosine Similarity',
    desc: 'Đo góc hướng ý nghĩa, triệt tiêu ảnh hưởng của độ dài văn bản.',
    checked: false,
    module: 'Bài 2.4',
    explanation: 'Cosine Similarity tính góc lệch cosine giữa 2 vector. Vì chỉ quan tâm đến hướng vector chỉ về đâu chứ không quan tâm độ dài của vector, phép đo này cực kỳ hiệu quả khi so khớp văn bản dài và ngắn.',
    mathFormula: '\\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}',
    codeSnippet: 'collection = chroma_client.create_collection("docs", metadata={"hnsw:space": "cosine"})'
  },
  {
    id: 'euclidean',
    title: 'Khoảng cách Euclid (L2 Distance)',
    desc: 'Đo khoảng cách thẳng hình học giữa hai tọa độ.',
    checked: false,
    module: 'Bài 2.5',
    explanation: 'Khoảng cách Euclid đo khoảng cách đường thẳng giữa 2 điểm. Nếu văn bản dài chứa nhiều từ lặp lại, vector sẽ bị kéo dài ra xa gốc tọa độ khiến khoảng cách Euclid tăng cao dù cùng nội dung.',
    mathFormula: 'd(\\mathbf{A}, \\mathbf{B}) = \\sqrt{\\sum_{i=1}^n (A_i - B_i)^2}'
  }
];

const defaultInitialMessages: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'agent',
    text: 'Xin chào! Tôi là AI Tutor hỗ trợ bài học LangChain RAG. Nếu bạn gặp bất kỳ khái niệm nào chưa rõ (như Cosine Similarity, Embeddings, ChromaDB Indexing), hãy đặt câu hỏi tại đây hoặc nhấn "Tôi chưa hiểu" trên bài giảng để tôi phân tích nhé!',
    timestamp: '10:00'
  }
];

const AITutorContext = createContext<AITutorContextType | undefined>(undefined);

export const AITutorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'prerequisites' | 'aitutor'>('syllabus');
  const [activeLessonId, setActiveLessonId] = useState<string>('sec1-2');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['sec0-0', 'sec0-1']);
  const [prereqItems, setPrereqItems] = useState<PrerequisiteItem[]>(initialPrereqs);
  const [activePrereqDetail, setActivePrereqDetail] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(defaultInitialMessages);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePrereq = (id: string) => {
    setPrereqItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const markAllPrereqs = (completed: boolean) => {
    setPrereqItems((prev) => prev.map((item) => ({ ...item, checked: completed })));
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: 'Cuộc trò chuyện đã được làm mới. Hãy nhập câu hỏi hoặc chọn một trong các gợi ý bên dưới để bắt đầu!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const forwardToAITutor = (userPrompt: string, aiExplanation: string) => {
    setActiveTab('aitutor');
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const agentMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        sender: 'agent',
        text: aiExplanation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 450);
  };

  const sendMessage = (text: string, customReply?: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let replyText = customReply;
      if (!replyText) {
        const lower = text.toLowerCase();
        if (lower.includes('cosine') || lower.includes('khoảng cách')) {
          replyText = `**Về Cosine Similarity:**\nTrong không gian vector nhiều chiều (1536 chiều), Cosine Similarity đo góc giữa 2 vector:\n$$\\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$\n- Nếu $\\cos(\\theta) = 1$: Hai văn bản cùng hướng ý nghĩa.\n- Điểm mạnh: Không phụ thuộc vào độ dài câu (câu 5 từ và câu 200 từ vẫn so khớp chuẩn).`;
        } else if (lower.includes('euclid') || lower.includes('khoảng cách euclid')) {
          replyText = `**Khoảng cách Euclid (L2 Distance):**\nĐo khoảng cách thẳng giữa 2 điểm. Điểm yếu trong NLP là các văn bản dài có vector dài hơn, khiến khoảng cách bị thổi phồng giả tạo dù cùng chủ đề. Vì vậy trong RAG, hầu hết VectorStore đều cấu hình mặc định là Cosine Similarity.`;
        } else if (lower.includes('code') || lower.includes('chromadb')) {
          replyText = `**Code cấu hình ChromaDB với Cosine Similarity:**\n\`\`\`python\nfrom langchain_chroma import Chroma\nfrom langchain_openai import OpenAIEmbeddings\n\nvectorstore = Chroma(\n    collection_name="rag_knowledge",\n    embedding_function=OpenAIEmbeddings(),\n    collection_metadata={"hnsw:space": "cosine"}\n)\nretriever = vectorstore.as_retriever(search_kwargs={"k": 3})\n\`\`\`\nTham số \`"hnsw:space": "cosine"\` sẽ ép ChromaDB dùng Cosine Similarity làm metric xếp hạng.`;
        } else {
          replyText = `Tôi đã nhận được câu hỏi: "${text}".\n\nTrong kiến trúc RAG với LangChain, việc chuẩn hóa vector và chọn đúng similarity metric (Cosine vs Dot Product vs L2) quyết định trực tiếp đến độ chính xác của bước Retrieval. Bạn có muốn xem ví dụ code so sánh thực tế không?`;
        }
      }

      const agentMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <AITutorContext.Provider
      value={{
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
      }}
    >
      {children}
    </AITutorContext.Provider>
  );
};

export const useAITutor = (): AITutorContextType => {
  const context = useContext(AITutorContext);
  if (!context) {
    throw new Error('useAITutor must be used within an AITutorProvider');
  }
  return context;
};
