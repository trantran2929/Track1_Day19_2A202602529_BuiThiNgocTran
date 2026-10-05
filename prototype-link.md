# Prototype Links & Tester Protocol

## 1. Prototype Access Links (Liên kết thử nghiệm)

### Interactive Prototype Suite (Chạy trực tiếp)
- **Local / Repository URL:** [`./index.html`] hoặc [`./prototypes/index.html`]
- **GitHub Repository:** [Track1_Day19_2A202602529_BuiThiNgocTran on GitHub](https://github.com/trantran2929/Track1_Day19_2A202602529_BuiThiNgocTran)
- **Stitch Design Project:** `projects/10443824955033242934` (VLearn UI UX Redesign & Workspace Studio)

---

## 2. Kịch bản thử nghiệm chuẩn dành cho Tester ngoài nhóm (Gate 4)

### Bối cảnh giao cho Tester (Unbiased Framing)
> *"Chào bạn! Bạn đang vào vai một học viên non-tech / chuyển ngành tham gia khóa học AI trên nền tảng VLearn. Bạn đang thực hành Bài 4: Xây dựng RAG Agent cơ bản với LangChain. Tại bước VectorStore Indexing, bạn gặp lỗi hoặc cảm thấy bối rối trước hai thuật ngữ then chốt: **'Embedding Dimension'** (tại sao văn bản dài ngắn khác nhau đều thành 1536 chiều?) và **'Cosine Similarity'** (thuật toán này đo độ tương đồng ngữ nghĩa ra sao?). Bạn muốn nhanh chóng hiểu bản chất kiến thức nền để tiếp tục hoàn thành bài tập trong ít hơn 3 phút."*

### Nhiệm vụ của Tester (Task Instructions)
1. Quan sát màn hình bài tập LangChain và thông báo rào cản khái niệm bên trái.
2. Bấm nút kích hoạt hỗ trợ trên thanh công cụ.
3. Lần lượt trải nghiệm 3 phương án hỗ trợ (chuyển đổi qua thanh công cụ trên cùng):
   - **Option A: Diagnostic Refresher (AI-Led):** Trải nghiệm quy trình làm trắc nghiệm chẩn đoán 2 câu do AI dẫn dắt và đọc Refresher Card 60s.
   - **Option B: Knowledge Checklist (User-Led):** Khám phá drawer cây phân rã kiến thức nền, tự tick chọn mắt xích mình thấy mơ hồ (vd: *Cosine Similarity tính thế nào?*) và đọc micro-lesson trực quan bung ra.
   - **Option C: A/B Contrast & Escalation (Co-create & Human):** Trải nghiệm đối chiếu 2 kịch bản hiểu tương phản (Cách hiểu A vs Cách hiểu B), đọc giải thích ngộ nhận và thử nghiệm nút gửi ticket hỗ trợ 1-1 cho Trợ giảng.
4. Thử tính năng kiểm soát và phục hồi (**"✕ Đóng / Quay lại bài"**) ở mỗi phương án.
5. Vừa dùng vừa nói to suy nghĩ (Think-Aloud Protocol) mà không cần người hướng dẫn phải can thiệp hay gợi ý.

## 3. Kịch bản điều phối bổ sung — Chặng 5 & 6

Phần mô tả thao tác A/B/C ở trên dùng để người điều phối chuẩn bị. Khi giao nhiệm vụ cho tester, chỉ đọc mục tiêu dưới đây, không đọc trước danh sách nút cần bấm.

**Relevant Context Question — một câu, tối đa hai phút:**

> “Gần đây bạn có từng gặp khó khăn khi học một nội dung AI/kỹ thuật vì chưa hiểu kiến thức nền để tiếp tục bài không?”

**Outcome Task — dùng chung A/B/C:**

> “Bạn đang học Bài 4 xây dựng RAG Agent với LangChain. Tại VectorStore Indexing, bạn gặp thông báo kích thước vector không khớp và chưa rõ Embedding Dimension, Cosine Similarity. Hãy dùng từng phương án để tìm phần hỗ trợ bạn cần, rồi quay lại bài khi thấy có thể tiếp tục. Hãy nói to những gì đang nghĩ.”

### Bảy tiêu điểm quan sát

| Tiêu điểm | Ghi chép cần giữ lại |
|---|---|
| First Action | Thành phần bấm đầu tiên; hướng nhìn chỉ ghi khi quan sát được |
| Hesitation | Vị trí/thời điểm dừng trên ba giây và lời nói |
| Evidence Read / Ignored | Có mở nguồn/đọc cảnh báo không; không suy ra động cơ từ việc chưa mở |
| Misunderstanding | Tester kỳ vọng điều gì, hệ thống thực tế làm gì |
| Help Needed | Số lần hỏi trợ giúp, câu hỏi và phản hồi người điều phối |
| Correction / Recovery | Thao tác đổi, sửa, hủy, thoát, quay lại và kết quả |
| Selected Option & Trade-offs | Lựa chọn sau đủ A/B/C, lý do và điều chấp nhận đánh đổi |

### Timeline 20 phút

| Phút | Hoạt động |
|---|---|
| 0–2 | Mở đầu, xác thực bối cảnh, giao task |
| 2–14 | Thử đủ A/B/C, bốn phút mỗi option |
| 14–18 | So sánh và tìm hiểu đánh đổi |
| 18–20 | Rà soát phiếu và tách bốn tầng |

### Câu hỏi so sánh

1. “Trong tình huống thực tế này bạn chọn Option A, B hay C? Vì sao?”
2. “Ở phương án đó bạn muốn tự làm khâu nào và giao AI khâu nào?”
3. “Điểm nào còn khiến bạn lấn cấn, lo lắng hoặc chưa thoải mái?”

Probe khi chưa rõ đánh đổi: “Bạn chấp nhận mất thêm thời gian hoặc công sức ở đâu để có điểm bạn thích?”

### Quy tắc điều phối

Chỉ tester dùng chuột/bàn phím; cùng một task; không giải thích icon hoặc bấm hộ; kiên nhẫn với khoảng im lặng; không hỏi “Bạn có thích không?”; khi bị hỏi cách dùng, hỏi dội ngược “Theo bạn, tính năng này nên hoạt động như thế nào là hợp lý nhất?”.

Khi thực sự bế tắc, dùng một câu cứu hộ: “Bạn cứ thoải mái nói to suy nghĩ nhé”; “Bạn dự định làm gì tiếp theo?”; “Hệ thống nên phản hồi thế nào để bạn yên tâm?”. Ghi rõ mọi can thiệp.

### Annotation — chỉ dành người điều phối

| Option | Kỳ vọng tester tự làm | Điểm nóng | Không giải thích mớm lời |
|---|---|---|---|
| A | Tìm hỗ trợ, thử chẩn đoán, đọc/bác nội dung và quay lại | Quiz, áp lực, căn cứ và đường thoát | Đáp án, nút cần bấm, concept cần ôn |
| B | Tự chọn concept, đọc giải thích và quay lại | Tick so với mở nội dung, nguồn và đóng drawer | Ý nghĩa icon, chỉ trước concept |
| C | Chọn cách hiểu, đọc đối chiếu, duyệt/sửa/hủy yêu cầu | Kỳ vọng trợ giảng, quyền duyệt và phục hồi | Quan điểm đúng hoặc cách gửi/hủy |

Annotations không đưa tester đọc. Ghi lại phiên bản web và thứ tự thử; dùng B thống nhất, tránh đổi sang B1 giữa các phiên. Cần bổ sung URL trải nghiệm công khai và kiểm tra quyền truy cập trước khi nộp.
