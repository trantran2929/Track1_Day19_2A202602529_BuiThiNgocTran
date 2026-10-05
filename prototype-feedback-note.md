# Prototype Feedback Note — Phiên 3

## 1. Thông tin cá nhân và phiên kiểm thử

| Nội dung | Thông tin |
|---|---|
| **Họ tên người phỏng vấn** | **Bùi Thị Ngọc Trân** |
| **MHV** | **2A202602529** |
| **Tester** | **Lê Minh Trí**  |
| **Bối cảnh trong nguồn tổng hợp** | Tester Trí được mô tả là 24 tuổi, Data / Business Analyst đang học AI thực chiến |
| **Case** | AI Tutor — Diagnostic Refresher trên VLearn |
| **Nhiệm vụ chung** | Xác định và ôn kiến thức nền tại bước VectorStore Indexing để tiếp tục bài 4 RAG với LangChain |
| **Khái niệm thử nghiệm** | Embedding Dimension & Cosine Similarity |
| **Phạm vi so sánh** | Option A — Diagnostic Refresher; Option B — Knowledge Checklist; Option C — A/B Contrast & Escalation |
| **Ngày / thời lượng thực tế / thứ tự thử / phiên bản web** | Nguồn tổng hợp không ghi các thông tin này |

## 2. Ghi nhận phản hồi cá nhân — Fact-First

| Tiêu điểm quan sát hành vi | Ghi nhận từ nguồn tổng hợp |
|---|---|
| **First Action — Hành động đầu tiên** | Nguồn không ghi tester nhìn hoặc bấm vào đâu đầu tiên ở A/B/C. Không suy ra tester mở A trước chỉ vì cuối phiên chọn A. |
| **Hesitation — Do dự, dừng hoặc hiểu sai** | Nguồn không ghi vị trí do dự, thời gian dừng hoặc thao tác hiểu sai riêng của Trí. Nguồn mô tả quiz hai câu giúp tester cảm thấy tự tin hơn về việc hiểu Cosine; đây là cảm nhận, chưa chứng minh ban đầu tester đã hiểu sai hoặc sau đó hiểu đúng. |
| **Evidence Checking — Minh chứng được đọc hay bỏ qua** | Phần pattern của nhóm ghi rằng căn cứ từ câu trả lời quiz ở A, nguồn bài học ở B và minh chứng ở C làm tăng độ tin cậy. Tuy nhiên, không có ghi chép riêng về thao tác mở nguồn hoặc đọc cảnh báo của Trí; không khẳng định tester đã đọc toàn bộ nguồn. Con số 68% được nhắc trong tài liệu nhóm chưa có nguồn thống kê kèm theo. |
| **Control & Recovery — Sửa sai/lấy lại quyền kiểm soát** | Phần tổng hợp chung ghi cả ba tester kiểm tra và coi trọng các đường thoát như bỏ qua chẩn đoán, đóng drawer, hủy yêu cầu Mentor. Đây là nhận định tổng hợp; nguồn không ghi rõ Trí dùng nút nào, ở option nào và kết quả cụ thể. |
| **Selected Option — Phương án lựa chọn** | **Option A. Thứ tự ưu tiên theo cột Phiên 3: A > B > C.** |
| **Trade-offs — Lý do chọn và đánh đổi** | Trí thích A vì tính chất kiểm chứng khách quan; quiz hai câu giúp tester cảm thấy tự tin rằng đã hiểu Cosine. **Diễn giải đánh đổi:** tester có thể chấp nhận thêm bước trả lời quiz để có cơ hội tự kiểm tra thay vì chỉ đọc nội dung. Nguồn chưa có lời xác nhận trực tiếp điều tester sẵn sàng hy sinh. |
| **Counter-evidence — Dữ kiện trái kỳ vọng** | Quiz không gây cùng một phản ứng ở mọi người: Trí xem hai câu hỏi là công cụ hữu ích, trong khi Nam và Thảo được mô tả là thấy áp lực như bị kiểm tra bài cũ. Phát hiện này đi ngược giả định rằng mọi người học đang kẹt đều muốn tránh quiz; không có căn cứ để nói đó chắc chắn là kỳ vọng ban đầu của nhóm. |

### Những phản hồi khác liên quan tới tester

- Bảng tổng hợp ghi cả ba tester muốn hỗ trợ ngắn dưới ba phút để tiếp tục bài, thay vì đọc lại một bài giảng dài. Chưa có số đo thời gian hoàn thành riêng của Trí.
- Phần khác biệt ghi Trí và Thảo coi khả năng kết nối trợ giảng là điểm tựa an tâm. Điều này cho thấy tester có thể đánh giá cao một cơ chế ở C dù vẫn xếp A cao nhất; không có dữ kiện chứng minh tester đã nhận hỗ trợ thật.
- Chưa có dữ liệu về số lần Trí hỏi người điều phối, các lỗi web gặp phải hoặc thứ tự trải nghiệm A/B/C.

## 3. Phỏng vấn so sánh — Tóm tắt từ nguồn

Các câu trả lời dưới đây được diễn đạt lại từ bảng tổng hợp, không đặt trong ngoặc kép như lời nói nguyên văn của tester.

| Câu hỏi | Nội dung có thể tổng hợp |
|---|---|
| **Trong tình huống này, bạn chọn A, B hay C? Vì sao?** | Trí chọn A, xếp A > B > C. Lý do được ghi là muốn kiểm chứng mức hiểu thông qua quiz và cảm thấy tự tin hơn sau hai câu hỏi. |
| **Bạn muốn tự làm khâu nào và giao AI khâu nào?** | Nguồn không có câu trả lời trực tiếp. Việc thích quiz cho thấy tester đánh giá cao cơ chế tự kiểm tra, nhưng không đủ để xác định chính xác toàn bộ phân công người–AI tester mong muốn. |
| **Điểm nào còn khiến bạn lấn cấn hoặc chưa thoải mái?** | Nguồn không có phản hồi riêng của Trí về băn khoăn trong A. Không lấy sự lo lắng của Nam/Thảo làm câu trả lời của Trí. |
| **Bạn chấp nhận đánh đổi điều gì?** | Có thể diễn giải là thêm bước quiz đổi lấy cảm giác được kiểm chứng; cần lời xác nhận trực tiếp để coi đây là đánh đổi do tester phát biểu. |

## 4. Bóc tách bốn tầng tư duy

### 1. OBSERVED — Dữ kiện được ghi trong nguồn

- **O1:** Cột Phiên 3 ghi lựa chọn của Trí là **A > B > C**.
- **O2:** Nguồn tóm tắt Trí thích A vì tính chất kiểm chứng khách quan và cảm thấy quiz hai câu giúp tự tin về việc hiểu Cosine.
- **O3:** Phần khác biệt ghi Trí xem quiz là công cụ hữu ích, trái với cảm nhận áp lực được ghi ở Nam và Thảo.
- **O4:** Phần khác biệt ghi Trí đánh giá khả năng kết nối trợ giảng là điểm tựa an tâm.

Đây là dữ kiện được báo cáo trong tài liệu tổng hợp. Nguồn không cung cấp câu nói nguyên văn, chuỗi thao tác hoặc thời điểm; không thể khôi phục những chi tiết đó bằng suy đoán.

### 2. INTERPRETED — Diễn giải của người làm sản phẩm

Từ O1–O3, tôi diễn giải rằng với tester này, giá trị của A có thể nằm ở cơ hội tự kiểm chứng mức hiểu, chứ không chỉ ở tốc độ nhận giải thích. Một quiz ngắn có thể tạo sự an tâm cho một người nhưng tạo áp lực cho người khác. Không nên kết luận một kiểu hỗ trợ phù hợp cho mọi học viên.

Từ O4, tôi diễn giải rằng lựa chọn A không đồng nghĩa tester muốn loại bỏ trợ giảng. Cơ chế tự kiểm tra và đường hỗ trợ con người có thể đáp ứng hai nhu cầu khác nhau: tự xác nhận mức hiểu và có phương án khi vẫn bế tắc.

### 3. DECIDED — NEXT CHANGE

**Đề xuất cá nhân từ phiên này:** Cho người học lựa chọn rõ ràng **“Tự kiểm tra bằng quiz” hoặc “Đọc phần ôn tập ngay”** tại điểm bắt đầu hỗ trợ của A. Đây là một thay đổi ở cách vào luồng, nhằm giữ lợi ích kiểm chứng mà Trí đánh giá cao và cho người không muốn quiz quyền chọn đường khác. Đề xuất cần nhóm đối chiếu với hai phiếu gốc, chưa được coi là quyết định nhóm mới.

**Quyết định nhóm đã ghi trong nguồn:** Xây dựng luồng kết hợp bắt đầu từ checklist B, đưa đối chiếu cách hiểu C vào phần giải thích concept và có đường yêu cầu trợ giảng khi vẫn chưa hiểu. Phiếu cá nhân ghi nhận quyết định này để liên kết với [bảng tổng hợp](group-feedback-synthesis.md); không thay thế nó bằng đề xuất cá nhân hoặc tự khẳng định nhóm đã chọn đề xuất của tôi.

**Điểm cần kiểm tra ở vòng sau:** Người học có tự chọn được cách hỗ trợ phù hợp, ít cần giải thích của người điều phối và quay lại bài sau hỗ trợ hay không. Không lấy lựa chọn A của một tester để kết luận A là phương án tốt nhất cho toàn bộ người học.

### 4. STILL UNPROVEN — Điều chưa thể chứng minh

- Cảm giác tự tin sau quiz chưa chứng minh Trí hiểu đúng hoặc tự xử lý được một tình huống VectorStore mới mà không cần gợi ý.
- Chưa chứng minh việc ôn ngắn tạo ra ghi nhớ bền vững; cần nhiệm vụ mới hoặc kiểm tra sau một khoảng thời gian.
- Chưa có dữ liệu riêng để xác nhận Trí hoàn thành phần hỗ trợ dưới ba phút.
- Việc thấy an tâm vì có trợ giảng chưa chứng minh thời gian đáp ứng và chi phí vận hành của trợ giảng thật.

## 5. Phần người phỏng vấn cần đối chiếu với ghi chép gốc

Phiếu đã tổng hợp hết thông tin liên quan trong nguồn hiện có. Để đáp ứng yêu cầu bản ghi cá nhân do chính tôi điều phối, cần đối chiếu và bổ sung các chi tiết nguồn chưa lưu:

- Ngày, thời lượng thực tế, thứ tự A/B/C, phiên bản web và bối cảnh chính xác của Nguyễn Minh Trí.
- First Action, điểm do dự, kiểm tra nguồn và thao tác recovery riêng từng option.
- Số lần cần trợ giúp, sự hiểu sai kỳ vọng và can thiệp của người điều phối.
- Lời trả lời trực tiếp về phân vai người–AI, băn khoăn và đánh đổi.
