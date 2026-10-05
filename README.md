# Lab 18/19 — Prototype & Solution Exploration

## 1. Thông tin cá nhân & Đội ngũ

| Thông tin | Chi tiết |
|---|---|
| **Họ tên** | **Bùi Thị Ngọc Trân** |
| **Mã học viên** | **2A202602529** |
| **Tên nhóm** | **فتيات جميلات** |
| **Case bài toán** | **Case A — AI Tutor: Diagnostic Refresher** |

| Thành viên | MHV | Phân công trong tài liệu nhóm |
|---|---|---|
| Phạm Thành Đạt | 2A202602721 | Kiến trúc testbed, Option B; điều phối phiên 1 |
| Đinh Thị Minh Tâm | 2A202602433 | Option C; điều phối phiên 2 |
| Bùi Thị Ngọc Trân | 2A202602529 | Option A; điều phối phiên 3 |

## 2. Hypothesis Problem

### Phát biểu theo năm thành tố

> Khi **đang học hoặc làm bài tập kỹ thuật AI tổng hợp như LangChain RAG Indexing**, **học viên non-tech và chuyển ngành** gặp trở ngại trong việc **xác định và bổ sung kiến thức nền để tiếp tục bài học**, bởi vì **khó tự xác định khái niệm chưa hiểu và phải tìm nội dung giải thích phù hợp từ nhiều nguồn**, dẫn đến **mất thời gian tra cứu, hỏi người khác và thực hành lặp lại, làm gián đoạn tiến trình học**.

| Thành tố | Nội dung |
|---|---|
| Situation | Đang học/làm bài kỹ thuật AI tổng hợp |
| User | Học viên non-tech/chuyển ngành |
| Job | Xác định, bổ sung kiến thức nền và tiếp tục bài |
| Barrier | Khó tự xác định khái niệm chưa hiểu, tìm nội dung phù hợp |
| Consequence | Tốn thời gian/công sức, gián đoạn học; chưa có số đo định lượng |

### Evidence nối tiếp Day17

- **Evidence cá nhân — Linh, Marketing:** Dùng AI Agent tạo checklist để hiểu từng bước code làm gì và vì sao. Nguồn: [Practice Note Day17](../Track1_Day17_2A202602529_BuiThiNgocTran/interview/notes.md).
- **Evidence được tài liệu nhóm tóm tắt:** Khánh phải xác nhận tài liệu AI thủ công; Khuê tìm tài liệu nền bên ngoài làm gián đoạn thực hành; Thương mất công điều chỉnh kết quả AI thiếu nhất quán. Cần gắn link notes gốc của đồng đội để truy vết các dữ kiện này.
- **Counter-evidence:** Linh chủ động tìm cách tiếp tục học, không bỏ dở. Vì vậy giảm drop-out là tác động kỳ vọng, chưa phải kết luận được chứng minh.

**Unknown:** Cơ chế AI-led, user-led hay đối chiếu kết hợp trợ giảng phù hợp hơn? Ôn nhanh có chuyển thành năng lực giải bài độc lập lâu dài không?

## 3. Three Solution Options

### Bối cảnh và nhiệm vụ chung

Cả ba phương án dùng cùng người học mục tiêu, Bài 4 xây dựng RAG Agent với LangChain, bước VectorStore Indexing và các khái niệm **Embedding Dimension & Cosine Similarity**. Nhiệm vụ: tìm hỗ trợ đúng kiến thức nền rồi quay lại bài. Hiểu trong dưới ba phút là mục tiêu thiết kế, chưa phải số đo đã xác nhận.

| Option | Cơ chế thiết kế | Phân vai và đánh đổi | Link prototype |
|---|---|---|---|
| **A — Diagnostic Refresher (AI-Led)** | Quiz ngắn xác định điểm cần ôn, sau đó cung cấp Refresher Card | Người học trả lời; AI đề xuất nội dung. Có cơ hội kiểm chứng nhưng có thể gây áp lực/chẩn đoán sai | [Trải nghiệm A](prototypes/index.html#/option-a) |
| **B — Knowledge Checklist (User-Led)** | Checklist kiến thức nền để tự chọn concept và đọc micro-lesson | Người học chọn điểm chưa rõ; hệ thống cung cấp giải thích. Tự chủ nhưng cần tự đánh giá | [Trải nghiệm B](prototypes/index.html#/option-b) |
| **C — Contrast & Escalation (Co-create & Human)** | Đối chiếu hai cách hiểu và yêu cầu trợ giảng khi vẫn vướng | Người học chọn quan điểm, duyệt/hủy yêu cầu. Có đường hỗ trợ con người nhưng cần kiểm chứng vận hành | [Trải nghiệm C](prototypes/index.html#/option-c) |

Các link trên trỏ tới bản build trong repository, cần được phục vụ qua HTTP để trải nghiệm. **URL host công khai chưa được ghi trong hồ sơ.** B1 không thay B trong bộ kiểm thử A/B/C.

Chi tiết comparison contract, distance check và Human–AI Decision Table: [three-option-design-sheet.md](three-option-design-sheet.md). Kịch bản và annotations: [prototype-link.md](prototype-link.md).

**Giới hạn triển khai:** Mô tả thiết kế không tự chứng minh web đã triển khai đủ. Lần rà soát mã nguồn ghi nhận quiz A hiện khác mô tả hai câu/60 giây, callback hỗ trợ video B/C chưa được dùng và C chọn sẵn đáp án. Các sửa web đã được hoàn lại theo yêu cầu; cần kiểm tra giao diện thực tế trước khi xác nhận Gate 3/4.

## 4. Đóng góp cụ thể của tôi trong sản phẩm nhóm

| Hạng mục | Đóng góp/trách nhiệm cá nhân và minh chứng |
|---|---|
| **Option chịu trách nhiệm chính** | Tổng hợp evidence và khóa giải thiết vấn đề, đưa ra 3 solution option đối lập, Option A — Diagnostic Refresher (AI-Led) |
| **Evidence và bối cảnh chung** | Practice Note Day17 của tôi phỏng vấn Linh cung cấp workaround checklist và rào cản người học Marketing. Fixture nhóm thống nhất là Bài 4 RAG; cần bổ sung phần tôi trực tiếp tham gia chốt fixture |
| **Human–AI Decision Table** | Phần phụ trách A gồm kỳ vọng quiz, phân vai người/AI, căn cứ từ câu trả lời và quyền từ chối/quay lại. Cần xác nhận các quyết định tôi trực tiếp viết/sửa và minh chứng |
| **Kiểm thử cá nhân** | Phiên 3 do tôi điều phối, tester Trí; [phiếu cá nhân](prototype-feedback-note.md) đã tổng hợp phản hồi từ bảng nhóm |
| **Hỗ trợ đồng đội** | Cần bổ sung công việc thực tế như kiểm tra chéo B/C, thống nhất dữ liệu hoặc góp ý recovery; hiện chưa có minh chứng cụ thể |
| **Hoàn thiện hồ sơ** | Yêu cầu AI rà soát rubric, bổ sung kịch bản/phiếu, chuẩn hóa README và AI log; đính chính vai người phỏng vấn/tester và giới hạn phạm vi chỉnh sửa |


## 5. Dữ liệu kiểm thử & Bài học

### Phiên tôi dẫn dắt

Theo cột Phiên 3 trong bảng nhóm, tester Trí chọn **A > B > C**, đánh giá quiz là công cụ kiểm chứng và cảm thấy tự tin hơn về việc hiểu Cosine. Phiếu hiện ghi **Lê Minh Trí**, phù hợp tên trong bảng tổng hợp; trước đó cuộc trao đổi dùng Lê Minh Trí, cần xác nhận tên cuối cùng từ ghi chép thực tế.

Nguồn chưa ghi First Action, điểm do dự, thao tác đọc nguồn/recovery riêng, ngày và thứ tự thử. Không bổ sung các chi tiết này bằng suy đoán. Phiếu: [prototype-feedback-note.md](prototype-feedback-note.md).

### Tổng hợp ba phiên — theo tài liệu nhóm

| Người điều phối / tester | Lựa chọn | Lý do được báo cáo |
|---|---|---|
| Đạt / Nguyễn Hoàng Nam | B > C > A | Tự duyệt checklist, không muốn bị ép quiz |
| Tâm / Nguyễn Thu Thảo | C > B > A | Đối chiếu giúp nhận diện nhầm lẫn; an tâm với đường trợ giảng |
| Trân / Lê Minh Trí | A > B > C | Quiz tạo cơ hội tự kiểm chứng và cảm giác tự tin |

**Pattern/đối lập:** Nguồn ghi nhu cầu hỗ trợ ngắn, căn cứ rõ và đường kiểm soát. Quiz tạo sự an tâm cho Trí nhưng áp lực với Nam/Thảo. Đây là điểm cần hiểu nguyên nhân, không chỉ đếm phiếu chọn option.

Bản đầy đủ: [group-feedback-synthesis.md](group-feedback-synthesis.md). 
### Next Change của nhóm

**Quyết định được ghi trong nguồn:** Tạo luồng kết hợp bắt đầu bằng checklist B; khi chọn concept, bổ sung đối chiếu cách hiểu từ C và đường yêu cầu trợ giảng nếu vẫn chưa hiểu. Đây là một hướng thay đổi luồng hỗ trợ của nhóm; nên xác định phạm vi nhỏ nhất và hành vi cần kiểm tra vòng sau. Đề xuất riêng trong phiếu cá nhân không thay thế quyết định này.

### Still Unproven

- Cảm giác hiểu/tự tin chưa chứng minh khả năng giải tình huống VectorStore mới hoặc ghi nhớ dài hạn.
- Chưa có số đo riêng xác nhận hoàn thành dưới ba phút.
- Luồng trợ giảng mẫu chưa chứng minh thời gian đáp ứng và chi phí vận hành thật.

## 6. AI Support Log

**Công cụ được ghi trong nhật ký:** Codex và Claude.

**AI hỗ trợ hiệu quả:** Đọc và đối chiếu rubric, rà soát evidence/mã nguồn, chuẩn bị task và câu hỏi kiểm thử, biên soạn phiếu từ nguồn nhóm, định dạng tài liệu.

**Tôi đã phản biện/can thiệp:** Đính chính Trí là tester và tôi là người phỏng vấn; yêu cầu hoàn lại thay đổi web không phù hợp; giới hạn chỉ bổ sung các file hiện có; yêu cầu giữ cấu trúc AI log và README theo mẫu. Chưa có thông tin để ghi tôi tự tay sửa code hoặc xác nhận mọi chức năng đã chạy đúng.

**Kiểm soát kết luận:** Không tạo quote/thao tác giả; tách fact, diễn giải và quyết định; giữ Still Unproven; chưa dùng ba lựa chọn để khẳng định giảm drop-out.

Nhật ký ba phần đầy đủ: [ai-support-log.md](ai-support-log.md).
