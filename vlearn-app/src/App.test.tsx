import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('VLearn Adaptive Learning Studio Prototype Suite', () => {
  test('renders top navigation and clean course title', () => {
    render(<App />);
    expect(screen.getByText(/Bài 4: Xây dựng RAG Agent cơ bản với LangChain/i)).toBeInTheDocument();
  });

  test('renders links for all solution approaches on home overview', () => {
    render(<App />);
    expect(screen.getByText(/Cách 1: AI chẩn đoán/i)).toBeInTheDocument();
    expect(screen.getByText(/Cách 2: Tự chọn kiến thức/i)).toBeInTheDocument();
    expect(screen.getByText(/Cách 2B: Sơ đồ tri thức/i)).toBeInTheDocument();
    expect(screen.getByText(/Cách 3: Đối chiếu & Trợ giảng/i)).toBeInTheDocument();
  });

  test('renders syllabus and lesson content without redundant metadata', () => {
    render(<App />);
    expect(screen.getByTitle(/Nội dung bài học/i)).toBeInTheDocument();
    expect(screen.getByText(/0. VectorStore & Embeddings/i)).toBeInTheDocument();
    expect(screen.queryByText(/Track 1 · Day 18/i)).not.toBeInTheDocument();
  });

  test('confirms right sidebar is completely removed and left sidebar tabs work', () => {
    render(<App />);
    // Verify right sidebar title is removed
    expect(screen.queryByText(/Kiến thức nền liên quan \(Bài 2\)/i)).not.toBeInTheDocument();

    // Verify left sidebar has all 3 working tabs
    const aiTutorTab = screen.getByTitle(/AI Tutor Chatbot/i);
    expect(aiTutorTab).toBeInTheDocument();

    // Click AI Tutor tab
    fireEvent.click(aiTutorTab);

    // Verify AI Tutor Chatbox elements
    expect(screen.getByPlaceholderText(/Hỏi AI Tutor về bài học hoặc code.../i)).toBeInTheDocument();
    expect(screen.getByText(/Xin chào! Tôi là AI Tutor/i)).toBeInTheDocument();

    // Switch to Kiến thức nền tab
    const prereqTab = screen.getByTitle(/Mắt xích kiến thức nền/i);
    fireEvent.click(prereqTab);
    expect(screen.getByText(/Mắt xích kiến thức liên quan/i)).toBeInTheDocument();
    // Verify NotesRightSidebar exists with bookmarks
    expect(screen.getByText(/Ghi chú & Điểm nhấn/i)).toBeInTheDocument();
    expect(screen.getByText(/Dấu mốc video quan trọng/i)).toBeInTheDocument();
  });
});
