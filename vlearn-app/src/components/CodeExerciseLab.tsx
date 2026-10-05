import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CodeExerciseLabProps {
  onTriggerAction?: () => void;
  triggerButtonText?: string;
  triggerButtonIcon?: React.ReactNode;
}

export const CodeExerciseLab: React.FC<CodeExerciseLabProps> = ({
  onTriggerAction,
  triggerButtonText = "Tôi chưa hiểu phần này",
  triggerButtonIcon
}) => {
  const defaultCode = `# Bài 4: Khởi tạo VectorStore Indexing cho LangChain
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# Bước 1: Khởi tạo Embedding model (mặc định 1536 chiều)
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Bước 2: Tạo Chroma VectorStore với thước đo Cosine Similarity
vector_db = Chroma(
    collection_name="financial_reports_rag",
    embedding_function=embeddings,
    collection_metadata={"hnsw:space": "cosine"}
)

# Bước 3: Thêm văn bản vào cơ sở dữ liệu
sample_docs = [
    "Doanh thu quý 3 của công ty tăng trưởng 42%",
    "Kiến trúc RAG sử dụng ChromaDB để lưu trữ ngữ nghĩa"
]

vector_db.add_texts(texts=sample_docs)
print("Hoàn tất: Đã lập chỉ mục 2 tài liệu thành công.")
`;

  const [code, setCode] = useState<string>(defaultCode);
  const [terminalOutput, setTerminalOutput] = useState<{
    status: 'idle' | 'running' | 'error' | 'success';
    message: string;
  }>({
    status: 'error',
    message: `[Runtime Error] DimensionMismatchException:
Collection 'financial_reports_rag' yêu cầu vector 1536 chiều, nhưng dữ liệu truyền vào là 768 chiều.
Lỗi xảy ra tại bước tính khoảng cách Cosine. Bạn cần kiểm tra lại embedding dimension.`
  });

  const handleRunCode = () => {
    setTerminalOutput({
      status: 'running',
      message: 'Đang chạy kiểm tra trong môi trường Python 3.11...'
    });

    setTimeout(() => {
      if (code.includes('text-embedding-3-small') && code.includes('"cosine"')) {
        setTerminalOutput({
          status: 'success',
          message: `>>> Python 3.11 Sandbox:
Khởi tạo ChromaDB collection 'financial_reports_rag'...
Đã đồng bộ vector dimension: 1536 chiều.
Thước đo: Cosine Similarity verified.
Hoàn tất: Đã lập chỉ mục 2 tài liệu thành công!`
        });
      } else {
        setTerminalOutput({
          status: 'error',
          message: `[Runtime Error] DimensionMismatchException:
Kích thước vector không khớp với cấu hình collection ChromaDB.
Vui lòng kiểm tra lại embedding model.`
        });
      }
    }, 600);
  };

  const handleReset = () => {
    setCode(defaultCode);
    setTerminalOutput({
      status: 'error',
      message: `[Runtime Error] DimensionMismatchException:
Collection 'financial_reports_rag' yêu cầu vector 1536 chiều, nhưng dữ liệu truyền vào là 768 chiều.`
    });
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden flex flex-col shadow-xs">
      {/* Code Editor Header */}
      <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-neutral-800 font-semibold">
            rag_vectorstore_indexing.py
          </span>
          <span className="text-2xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
            Có lỗi kích thước vector
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {onTriggerAction && (
            <button
              onClick={onTriggerAction}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-red hover:bg-brand-redHover text-white rounded text-xs font-semibold shadow-xs transition"
              type="button"
            >
              {triggerButtonIcon}
              <span>{triggerButtonText}</span>
            </button>
          )}

          <button
            onClick={handleRunCode}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded text-xs font-medium transition"
            type="button"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Chạy code</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-neutral-500 hover:text-neutral-800 rounded hover:bg-neutral-100 transition"
            title="Đặt lại code ban đầu"
            type="button"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Textarea / Editor */}
      <div className="p-3 bg-neutral-900 font-mono text-xs text-neutral-100">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={11}
          spellCheck={false}
          className="w-full bg-transparent text-neutral-100 border-0 focus:ring-0 p-0 font-mono leading-relaxed outline-none resize-none"
        />
      </div>

      {/* Terminal Output */}
      <div className="border-t border-neutral-200 bg-neutral-50">
        <div className="px-4 py-1.5 border-b border-neutral-200 flex items-center justify-between text-2xs text-neutral-600 font-mono">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span>Kết quả chạy / Console</span>
          </div>
          <div>
            {terminalOutput.status === 'error' && (
              <span className="text-red-600 flex items-center space-x-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                <span>Lỗi thực thi</span>
              </span>
            )}
            {terminalOutput.status === 'success' && (
              <span className="text-emerald-600 flex items-center space-x-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Thành công</span>
              </span>
            )}
          </div>
        </div>

        <div className="p-3 bg-neutral-100 font-mono text-xs overflow-x-auto">
          <pre
            className={`whitespace-pre-wrap ${
              terminalOutput.status === 'error'
                ? 'text-red-700'
                : terminalOutput.status === 'success'
                ? 'text-emerald-700'
                : 'text-neutral-700'
            }`}
          >
            {terminalOutput.message}
          </pre>
        </div>
      </div>
    </div>
  );
};
