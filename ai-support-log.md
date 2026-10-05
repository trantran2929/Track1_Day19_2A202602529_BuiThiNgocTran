# AI Support Log — Nhật Ký Hỗ Trợ Của AI & Phản Biện Con Người

- **Học viên:** Bùi Thị Ngọc Trân (MHV: 2A202602529)
- **Học phần:** VinUni AI Track 1 — Day 19 Lab (Diagnostic Refresher Prototype)
- **Công cụ AI sử dụng:** Codex / Claude.

---

## 1. AI Đã Giúp Được Những Gì? (AI Contributions)

1. **Rà soát Evidence & Yêu cầu của bài Lab:**
   - Đọc tài liệu Day19 và Practice Note Day17 phỏng vấn Linh; xác định workaround nhờ AI tạo checklist để hiểu từng bước code.
   - Đối chiếu yêu cầu chặng 1–6, năm Quality Gates và cấu trúc sáu tệp nộp bài.
   - Chỉ ra những nội dung còn thiếu hoặc chưa thống nhất: đóng góp cá nhân, tên tester, số phiên, dữ liệu quan sát và trạng thái hoàn thành Gate 5.

2. **Chuẩn bị Kịch bản Kiểm thử & Phiếu Phản hồi Cá nhân:**
   - Gợi ý nhiệm vụ chung cho ba phương án trong bối cảnh LangChain RAG Indexing, Embedding Dimension & Cosine Similarity.
   - Hỗ trợ câu hỏi xác thực bối cảnh, timeline 20 phút, câu hỏi so sánh và bảy tiêu điểm quan sát hành vi.
   - Biên soạn [prototype-feedback-note.md](prototype-feedback-note.md) từ cột phiên do tôi điều phối trong [group-feedback-synthesis.md](group-feedback-synthesis.md), tách bốn tầng Observed, Interpreted, Decided — Next Change và Still Unproven.

3. **Rà soát Prototype & Hoàn thiện Tài liệu Nộp bài:**
   - Đối chiếu mã nguồn với mô tả A/B/C và chỉ ra các điểm chưa khớp về quiz, nút hỗ trợ, quyền kiểm soát và trạng thái chọn sẵn.
   - Bổ sung nội dung còn thiếu trong [README.md](README.md), [prototype-link.md](prototype-link.md) và nhật ký AI có sẵn.
   - Các sửa đổi web do AI thực hiện ở một lượt hỗ trợ đã được hoàn lại theo yêu cầu của tôi; không tính chúng là thay đổi đang được giữ trong sản phẩm.

---

## 2. AI Đã Sai, Hời Hợt Hoặc Ảo Tưởng Ở Đâu? (AI Flaws & Hallucinations)

1. **Hiểu sai Vai trò Người phỏng vấn và Tester:**
   - *Biểu hiện của AI:* Ban đầu hiểu Lê Minh Trí là người phỏng vấn và chuẩn bị hồ sơ cá nhân đứng tên Trí.
   - *Hậu quả nếu giữ nguyên:* Phiếu không phản ánh đúng người điều phối. Thực tế tôi là người phỏng vấn, còn Lê Minh Trí là tester trải nghiệm web.

2. **Vượt quá Phạm vi Chỉnh sửa Tôi mong muốn:**
   - *Biểu hiện của AI:* Tạo bộ hồ sơ ở thư mục riêng; trong lượt hỗ trợ khác còn sửa mã nguồn và thêm file/thư mục.
   - *Vấn đề:* Tôi cần hoàn thiện nội dung còn thiếu trong các file Day19 có sẵn, không yêu cầu giữ các thay đổi web hoặc thêm bộ hồ sơ mới.
   - *Trạng thái xử lý:* Tôi yêu cầu hoàn lại; các thay đổi web và phần thêm mới của lượt đó đã được gỡ, chỉ giữ các phần bổ sung tài liệu được yêu cầu.

3. **Giới hạn khi Biên soạn Feedback từ Bản Tổng hợp:**
   - *Biểu hiện cần kiểm soát:* Nguồn có lựa chọn và nhận định tổng hợp, nhưng thiếu thao tác đầu tiên, điểm do dự, thời điểm và câu nói nguyên văn của tester. AI có thể diễn giải quá mức nếu coi bản tổng hợp là ghi chép trực tiếp.
   - *Vấn đề:* Không thể tự tạo dữ kiện để điền đủ phiếu; cảm giác tự tin sau quiz cũng chưa chứng minh năng lực giải bài hoặc ghi nhớ dài hạn.
   - *Giới hạn được giữ:* Phiếu ghi rõ nội dung kế thừa, diễn giải và phần nguồn chưa cung cấp. Con số 68% trong tài liệu nhóm chưa có nguồn xác minh; không coi đó là thống kê thực nghiệm đã được kiểm chứng.

---

## 3. Con Người Đã Tự Phản Biện & Can Thiệp Chỉnh Sửa Như Thế Nào? (Human-in-the-Loop Corrections)

1. **Đính chính Vai trò & Thông tin Hồ sơ Cá nhân:**
   - Tôi xác nhận **Bùi Thị Ngọc Trân là học viên và người phỏng vấn**, **Lê Minh Trí là tester**.
   - Tôi yêu cầu hoàn thiện phiếu dựa trên phiên do tôi điều phối trong bảng tổng hợp nhóm, thay vì làm hồ sơ cho tester.
   - Tên “Lê Minh Trí” trong nguồn tổng hợp còn khác tên đã đính chính; tôi cần đối chiếu tên, tuổi/nghề nghiệp và số phiên với ghi chép gốc trước khi nộp.

2. **Giới hạn Quyền Can thiệp & Giữ đúng Phạm vi Công việc:**
   - Tôi yêu cầu hoàn lại những thay đổi không phù hợp, không sửa web và không thêm file hoặc thư mục.
   - Tôi xác định chỉ hướng dẫn những phần chưa làm xong trong các tệp hiện có, rồi yêu cầu AI kiểm tra lại toàn bộ hồ sơ.
   - Tôi không đưa các hoạt động AI-log hooks, cài skills hoặc testbed riêng trong nhật ký của đồng đội thành đóng góp của cá nhân mình.

3. **Kiểm soát Tính Trung thực của Evidence & Kết luận (Gate 5):**
   - Phiếu phân biệt dữ kiện được báo cáo trong nguồn, diễn giải cá nhân và thông tin chưa có ghi chép; không thêm quote hoặc thao tác để lấp chỗ trống.
   - Quyết định Next Change của nhóm được dẫn về bảng tổng hợp; đề xuất cá nhân không được viết như quyết định nhóm đã thông qua.
   - Giữ mục **Still Unproven** về khả năng giải nhiệm vụ mới, ghi nhớ lâu dài và thời gian đáp ứng của trợ giảng thật; không lấy lựa chọn A của một tester để tuyên bố giải pháp đã thành công.
   - **Phần tôi cần tự bổ sung sau khi thực hiện:** dữ kiện gốc của phiên Lê Minh Trí, link hai phiếu còn lại, phần thiết kế/code tôi trực tiếp làm và các nội dung tôi tự kiểm tra/sửa. Nhật ký chưa coi những việc thiếu thông tin này là đã hoàn thành.