# Group Feedback Synthesis — AI Tutor Diagnostic Refresher

- **Nhóm:** Nhóm 2A — Case A: Diagnostic Refresher
- **Thành viên nhóm:** Phạm Thành Đạt (Lead & Facilitator Session 1), Đinh Thị Minh Tâm (Facilitator Session 2), Bùi Thị Ngọc Trân (Facilitator Session 3).
- **Nội dung thử nghiệm chung:** Bài 4: Xây dựng RAG Agent cơ bản với LangChain — VectorStore Indexing (Embedding Dimension & Cosine Similarity).
- **Tổng số phiên thử nghiệm:** 3 phiên độc lập với 3 tester ngoài nhóm hoàn toàn khác nhau về nền tảng chuyên môn.

---

## 1. Dữ liệu tổng hợp từ 3 Phiên Thử Nghiệm

| Thông tin phiên | Phiên 1 (Phạm Thành Đạt facilitate) | Phiên 2 (Đinh Thị Minh Tâm facilitate) | Phiên 3 (Bùi Thị Ngọc Trân facilitate) |
| :--- | :--- | :--- | :--- |
| **Tester ngoài nhóm** | **Nguyễn Hoàng Nam** (26 tuổi, Backend Engineer đang học AI) | **Nguyễn Thu Thảo** (22 tuổi, Sinh viên năm cuối ngành Hệ thống thông tin) | **Lê Minh Trí** (24 tuổi, Data / Business Analyst học AI thực chiến) |
| **Hành vi nổi bật** | Ưa chuộng Option B; tự duyệt checklist và đọc micro-lesson 1536 chiều; đánh giá cao việc không bị AI ép làm quiz. | Thích nhất Option C vì ví dụ tương phản A vs B chỉ trúng điểm nhầm lẫn giữa Token Count và Dimension; an tâm vì có nút gửi Trợ giảng. | Thích Option A vì tính chất xác thực khách quan; cảm thấy quiz 2 câu giúp tự tin rằng mình đã hiểu đúng thuật toán Cosine. |
| **Độ ưu tiên lựa chọn** | Option B > Option C > Option A | Option C > Option B > Option A | Option A > Option B > Option C |

---

## 2. Các Mẫu Hành Vi Đồng Thuận (Cross-Tester Patterns)

1. **Yêu cầu can thiệp vi mô dưới 3 phút:**
   - Cả 3 tester đều khẳng định khi đang kẹt ở bước VectorStore Indexing, họ chỉ cần giải thích ngắn gọn bản chất toán học/hình học để tiếp tục code, không muốn phải đọc lại cả bài giảng Bài 2 dài hàng nghìn chữ.

2. **Minh bạch bằng chứng gia tăng độ tin cậy:**
   - Dẫn chứng nguồn bài học (Bài 2 trong Option B), số liệu thống kê ngộ nhận 68% (Option C), hoặc phân tích trực tiếp từ câu trả lời quiz (Option A) giúp tester tin tưởng vào độ chính xác của nội dung hỗ trợ.

3. **Cần đường thoát hiểm an toàn (Safety Exit Paths):**
   - Các tính năng như "Bỏ qua chẩn đoán", "Đóng drawer", "Hủy ticket gửi Mentor" được cả 3 tester kiểm tra và đánh giá là điều kiện tiên quyết để họ không cảm thấy bị AI tước đoạt quyền tự chủ.

---

## 3. Các Điểm Khác Biệt Đáng Chú Ý (Divergences)

1. **Tâm lý tiếp nhận trắc nghiệm chẩn đoán (Option A):**
   - Với người học có xu hướng kiểm chứng logic chặt chẽ (Trí), quiz 2 câu là công cụ hữu ích.
   - Với người học đang căng thẳng vì bài thực hành (Nam & Thảo), quiz tạo cảm giác như "bị kiểm tra bài cũ" và gây thêm áp lực tâm lý.

2. **Nhu cầu can thiệp của con người (Option C):**
   - Kỹ sư có kinh nghiệm (Nam) muốn tự giải quyết vấn đề trên hệ thống và coi Trợ giảng là giải pháp cuối cùng.
   - Học viên non-tech / chuyển ngành (Thảo & Trí) xem nút kết nối Trợ giảng là điểm tựa an tâm sống còn để không bỏ dở khóa học.

---

## 4. One Group Next Change (Thay đổi then chốt tiếp theo dựa trên bằng chứng)

> **Thay đổi cốt lõi được thống nhất:**  
> **Tích hợp Cơ chế Lai (Hybrid Flow): Khởi đầu bằng Cây Mắt Xích Kiến Thức (Option B - User-Led), nhưng khi người học bấm vào một mắt xích (như Cosine Similarity), giao diện tích hợp thêm thẻ "Đối chiếu cách hiểu A vs B" (từ Option C) kèm nút gửi ticket Trợ giảng hỗ trợ 1-1 nếu vẫn chưa thông.**

- **Căn cứ từ bằng chứng thực nghiệm:** Option B cho người học quyền kiểm soát tốt nhất (Agency), trong khi cách trình bày tương phản A vs B của Option C mang lại hiệu quả phá vỡ ngộ nhận cao nhất đối với học viên non-tech.
- **Cam kết không nói quá bằng chứng (No Overclaiming):** Thay đổi này nhằm tối ưu hóa trải nghiệm tự học và trị ngộ nhận tại chỗ, **chưa khẳng định** sẽ loại bỏ hoàn toàn 100% tỷ lệ drop-out trên toàn khóa học.

---

## 5. Những Điểm Vẫn Chưa Được Kiểm Chứng (Still Unproven)

1. **Độ bền ghi nhớ (Long-term Knowledge Retention):** Chưa kiểm chứng được việc hiểu nhanh về Embedding Dimension trong 60 giây có giúp học viên tự cấu hình các kiến trúc VectorStore nâng cao hơn (như HNSW, Quantization) ở các bài học sau hay không.
2. **Chi phí và thời gian đáp ứng của Trợ giảng thật (Human Escalation SLA):** Nếu tính năng gửi ticket được sử dụng rộng rãi, liệu đội ngũ Trợ giảng có đáp ứng kịp thời gian phản hồi cam kết (trong 5-10 phút) hay sẽ tạo ra nút thắt cổ chai mới trong quy trình vận hành?
