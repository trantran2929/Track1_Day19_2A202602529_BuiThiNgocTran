# Lab 18/19 — Prototype & Solution Exploration

## 1. Thông tin cá nhân và nhóm

| Thông tin | Chi tiết |
|-----------|----------|
| **MHV** | 2A202602529 |
| **Họ tên** | Bùi Thị Ngọc Trân |
| **Tên nhóm** | **فتيات جميلات** |
| **Case tiếp tục** | **Case A — AI Tutor: Diagnostic Refresher** |

### Danh sách thành viên nhóm فتيات جميلات

| STT | Họ và tên | Mã sinh viên (MSV/MHV) | Vai trò |
|:---:|-----------|:----------------------:|---------|
| 1 | **Phạm Thành Đạt** | `2A202602721` | Option B |
| 2 | **Đinh Thị Minh Tâm** | `2A202602433` | Option A |
| 3 | **Bùi Thị Ngọc Trân** | `2A202602529` | Option C |

---

## 2. Bốn Artifacts từ Day 17 (Đặt cạnh nhau trước khi bắt đầu)

> **Nguyên tắc cốt lõi:** Nhóm tiếp tục đúng Case A từ Day 17. Practice interview Day 17 chưa đủ để chứng minh pain đã được validated. Day này chuyển sang thử nghiệm các cách giải bằng prototype mà không pitch hay tuyên bố *"User đã xác nhận solution này đúng"*.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. HYPOTHESIS PROBLEM (DAY 17)                                                         │
│ Học viên thường xuyên bị vướng mắc và bỏ dở bài học khi gặp các khái niệm nâng cao vì │
│ họ thiếu khả năng tự chẩn đoán chính xác lỗ hổng kiến thức nền của mình và không có    │
│ giải pháp ôn tập bổ trợ ngắn gọn, tức thì ngay tại luồng học.                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. BA PRACTICE NOTES (DAY 17)                                                          │
│ • Note 1 (Trân phỏng vấn bạn Linh - 22t, Marketing): Gặp khó khăn về công nghệ,        │
│   syntax, thuật toán LLM; tự mày mò hỏi quanh, đọc tài liệu, và nhờ AI Agent tạo       │
│   checklist phân rã từng bước thực thi trong code để hiểu bản chất.                    │
│ • Note 2 (Đạt phỏng vấn anh Khánh - 25t, BA): Domain mới mờ nhạt; tự đọc tài liệu cũ, │
│   dùng AI nắm khung tổng quan, lập danh sách Q&A, chuẩn bị phương án A/B để chốt spec. │
│ • Note 3 (Tâm phỏng vấn bạn Thương - 23t, BA): Slide bài học hiểu nhưng không sâu;     │
│   khi gặp khó khăn thì nhắn tin/email ghi rõ vướng ở điểm A/B kèm đề xuất giải pháp.   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. SOLUTION PARKING LOT (TỐI THIỂU 5 HƯỚNG TỪ DAY 17)                                  │
│ 1. Nút "Tôi vẫn chưa hiểu": AI Tutor đặt 2–3 câu chẩn đoán, chọn kiến thức nền, tạo     │
│    refresher ngắn và đưa trở về bài học (Solution chính của Case A).                   │
│ 2. Diagnostic Quiz ngắn bắt buộc trước mỗi chương mới để phát hiện lỗ hổng sớm.        │
│ 3. Cây phân rã kiến thức nền (Knowledge Checklist): bóc tách bài học thành các mắt xích│
│    prerequisite để người học tự tick chọn và xem giải thích tức thì.                   │
│ 4. Đối chiếu tương phản A/B & Escalation Trợ giảng: AI đưa ra 2 cách hiểu A vs B để     │
│    nhận diện ngộ nhận; nếu vẫn nghẽn thì tự tạo brief gửi Mentor hỗ trợ 1-1.           │
│ 5. AI Chatbot giải thích đa cấp độ (ELI5 / non-tech) + checklist hành động.            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. CONVERSATION GUIDE CUỐI (DAY 17)                                                    │
│ Bộ câu hỏi Big 3 neo vào "lần gần nhất", probe bank đào sâu hành vi – workaround –     │
│ hậu quả, và 3 phản xạ Deflect / Anchor / Dig để tránh bẫy phỏng vấn.                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Chặng 1 — Tổng hợp evidence (Evidence Synthesis)

### 3.1. Evidence huddle (Đối chiếu 3 Practice Notes)

| Practice Note | User đã thực sự làm/nói gì? (Facts) | Điều nhóm đang diễn giải (Interpretations) |
|---------------|-------------------------------------|--------------------------------------------|
| **1. Bạn Linh (22t - Marketing)** *(Lượt của Trân)* | • **Nói:** *"Khó khăn lớn nhất chắc sẽ là về phần công nghệ... ngay cả việc tiếp cận công nghệ là nó cũng đã khác rồi... ẩn sau những quyết định đó có rất nhiều thuật toán..."*<br>• **Làm:** Hỏi liên tục mọi người xung quanh; đọc nhiều tài liệu; thực hành lặp lại nhiều lần; ra lệnh cho AI Agent: *"tạo cho tôi checklist để tôi đi qua từng cái hoạt động kiểu xem kỹ từng bước là nó làm như thế nào và nó làm để làm gì."* | Người học non-tech bị hổng kiến thức nền kỹ thuật, không hiểu bản chất thuật toán và code. Workaround dùng AI agent chia nhỏ checklist chứng minh nhu cầu **chẩn đoán và phân rã kiến thức từng bước nhỏ** để vượt qua điểm nghẽn. |
| **2. Anh Khánh (25t - BA)** *(Lượt của Đạt)* | • **Nói:** *"Khó khăn nhất là khi làm việc với domain hoàn toàn mới... tài liệu đầu vào rất mờ nhạt... Nếu mình không hiểu đúng bản chất thì rất dễ truyền đạt sai cho dev..."*<br>• **Làm:** Tự đọc lại tài liệu cũ, dùng AI nắm khung tổng quan; lên danh sách câu hỏi Q&A chi tiết; chuẩn bị sẵn phương án A/B để hỏi lead/khách hàng chốt luồng. | Khi đối mặt với kiến thức/nghiệp vụ mới, người học/người làm cần một **"khung tổng quan" (mental model)** trước. Họ không thích hỏi chung chung mà chủ động thu hẹp phạm vi vướng mắc thành các lựa chọn cụ thể để được hỗ trợ tức thì. |
| **3. Bạn Thương (23t - BA)** *(Lượt của Tâm)* | • **Nói:** *"Hiểu nhưng mà không sâu. Chỉ là biết thôi chứ không hiểu lắm."*<br>• **Làm:** Xác nhận lại yêu cầu qua tin nhắn/email có minh chứng; trình bày rõ: *"mình đang khó khăn ở việc A việc B và em cần giải pháp cho A và B... việc này gấp và ảnh hưởng tiến độ thế nào"* để người khác hỗ trợ ngay. | Trạng thái "hiểu nông / hiểu tạm thời" rất phổ biến. Khi gặp khó, user cần **xác định chính xác điểm nghẽn (A hay B)** thay vì học lại toàn bộ từ đầu, và họ cần sự hỗ trợ kịp thời để không bị đình trệ tiến độ. |

---

### 3.2. Thảo luận nhanh nhóm (Quick Synthesis Questions)

1. **Có situation, behavior hoặc workaround nào xuất hiện nhiều hơn một lần?**
   - **Situation lặp lại:** Cả 3 người đều đối mặt với tình huống tiếp nhận khối lượng kiến thức mới hoàn toàn (Linh: AI/code; Khánh: domain mới; Thương: nghiệp vụ khó/slide bài học).
   - **Workaround lặp lại:** Cả 3 đều không thụ động bỏ cuộc mà đều dùng **workaround chủ động**: tự tra cứu tài liệu cũ/mạng, dùng AI để tóm tắt/chia nhỏ vấn đề, và khi tìm kiếm sự trợ giúp từ con người (đồng nghiệp, mentor, sếp) thì đều cố gắng **cụ thể hóa điểm mình chưa hiểu** (Linh nhờ AI tạo checklist từng bước; Khánh chuẩn bị options A/B; Thương chỉ rõ vướng ở điểm A hay B).

2. **Evidence nào mâu thuẫn hoặc làm nhóm bất ngờ?**
   - **Bất ngờ:** Linh là dân non-tech (Marketing) nhưng không né tránh code mà lại biến AI thành công cụ tạo checklist giải thích code. Thay vì cần một người dạy kèm giải thích dài dòng, Linh cần một công cụ phân rã các bước thực thi để tự kiểm tra hiểu biết của mình.
   - **Mâu thuẫn với giả định ban đầu:** Nhóm từng giả định học viên sẽ nản lòng và bỏ dở ngay khi gặp khó, nhưng thực tế các học viên có động lực cao sẽ tìm mọi workaround (hỏi người khác, dùng AI, lặp lại nhiều lần) trước khi bỏ cuộc; tuy nhiên cái giá phải trả là mất rất nhiều thời gian và năng lượng.

3. **Điều gì vẫn chỉ là suy đoán của nhóm?**
   - Nhóm vẫn đang **suy đoán** rằng: *"Việc chẩn đoán tự động bằng 2–3 câu hỏi trắc nghiệm ngắn sẽ giúp học viên nhận ra đúng lỗ hổng và quay lại bài học hiệu quả hơn việc họ tự dùng chatbot prompt tự do hoặc tự search"*. Chúng ta chưa có bằng chứng thực tế cho thấy một bài chẩn đoán ngắn có thực sự đánh trúng điểm họ quên hay gây thêm phiền toái/ngắt quãng mạch học.

4. **Hypothesis Problem nào đủ cụ thể để nhóm dùng làm điểm xuất phát hôm nay?**
   - Tập trung vào rào cản: **Người học bị tắc nghẽn ở khái niệm nâng cao do thiếu hụt kiến thức nền tảng và không biết chính xác mình đang hổng ở mắt xích nào**, dẫn đến việc phải mày mò thủ công mất nhiều thời gian hoặc học lan man.

---

### 3.3. Chốt Hypothesis Problem

> Cấu trúc chuẩn:  
> **Khi [situation], [user] gặp khó khăn trong việc [job] vì [barrier], dẫn đến [consequence].**

- **Hypothesis Problem nhóm tiếp tục:**
  > **Khi đang học các bài học hoặc làm bài tập kỹ thuật có tính tổng hợp, học viên (đặc biệt là người chuyển ngành / non-tech) gặp khó khăn trong việc tiếp tục tiến độ bài học vì không xác định được chính xác mình đang bị hổng kiến thức nền tảng nào và thiếu phần giải thích bổ trợ ngắn gọn ngay tại chỗ, dẫn đến việc mất nhiều thời gian tự mày mò qua các tài liệu rời rạc, cảm thấy quá tải và có nguy cơ bỏ dở buổi học.**

- **Evidence ban đầu hỗ trợ giả thuyết (Observation từ Day 17):**
  - Trong buổi phỏng vấn Day 17, bạn Linh (Marketing chuyển sang AI) chia sẻ thực tế: gặp bài khó về thuật toán/syntax thì *"không hiểu một cái gì cả"*, phải tự mày mò đọc rất nhiều tài liệu, thực hành lặp đi lặp lại và phải dùng workaround là bảo AI Agent tạo checklist phân rã từng bước để đọc hiểu code.
  - Bạn Thương cũng xác nhận việc đọc slide bài học *"hiểu nhưng không sâu, chỉ biết thôi chứ không hiểu lắm"*, khi gặp khó khăn không biết điểm cốt lõi nằm ở đâu nếu không có người chỉ dẫn phân tách điểm A/B.

- **Điều vẫn chưa được chứng minh:**
  - Chưa chứng minh được liệu người học có thực sự muốn hệ thống tự động "chẩn đoán" bằng câu hỏi ngắn ngay trong luồng học hay không, hay họ thích tự chủ động hỏi đáp tự do (free-form chat) với AI hoặc tra cứu tài liệu theo ý mình.
  - Chưa biết liệu một phần ôn tập bổ trợ ngắn (diagnostic refresher) có đủ để lấp lỗ hổng kiến thức nền sâu của người học non-tech hay không.

### GATE 1 — Evidence Continuity Check: **ĐẠT ✅**

---

## 4. Chặng 2 — Ba Solution Options (Tóm tắt)

*Chi tiết toàn văn thiết kế và Distance check xem tại file riêng:* [`three-option-design-sheet.md`](./three-option-design-sheet.md)

| Thành phần | Option A: Diagnostic Refresher (AI-Led) | Option B: Knowledge Checklist (User-Led) | Option C: A/B Contrast & Escalation (Co-create & Human) |
|------------|----------------------------------------|------------------------------------------|---------------------------------------------------------|
| **Cơ chế (Mechanism)** | **Chẩn đoán trắc nghiệm tự động:** AI đặt 2 câu mini-quiz để dò điểm hổng, push Refresher Card 60s. | **Cây phân rã kiến thức tự chọn:** Drawer checklist các mắt xích nền tảng; user tự tick chọn điểm mơ hồ để xem visual micro-lesson. | **Đối chiếu phản biện tư duy & Trợ giảng:** AI đưa ra 2 cách hiểu A vs B để user nhận diện ngộ nhận; nếu vẫn nghẽn thì escalate gửi Mentor. |
| **Quyền quyết định** | **AI quyết định** (AI-Led Inference). | **User quyết định** (User-Led Self-Assessment). | **Phối hợp & Có lưới an toàn** (Co-create + Human in the loop). |
| **Trigger** | Nút *"Tôi vẫn chưa hiểu"* trên thanh bài học. | Tab drawer *"Mắt xích kiến thức nền"* bên cạnh màn hình. | Nút *"Đối chiếu cách hiểu"* tại bước code/bài tập bị nghẽn. |
| **Trade-off** | Nhanh, tự động; nhưng áp lực bị kiểm tra. | Tự do, không áp đặt; nhưng cần năng lực tự nhận thức (metacognition). | Trị đúng ngộ nhận tư duy; nhưng tốn chi phí vận hành trợ giảng. |

### GATE 2 — Meaningful Options Check: **ĐẠT ✅**

---

## 5. Chặng 3 — Human–AI Design Pass (Tóm tắt)

*Chi tiết 4 quyết định thiết kế và phân tích rủi ro xem tại file riêng:* [`three-option-design-sheet.md`](./three-option-design-sheet.md)

### Human–AI Decision Table

| Human–AI Decision | Option A: Diagnostic Refresher (AI-Led) | Option B: Knowledge Checklist (User-Led) | Option C: A/B Contrast & Escalation (Co-create & Human) |
|---|---|---|---|
| **User làm gì? AI làm gì?** | User trả lời mini-quiz & đọc refresher; AI tạo câu hỏi, chẩn đoán điểm hổng và sinh refresher tương ứng. | User tự duyệt checklist & chọn mắt xích chưa hiểu; AI phân rã bài học thành checklist & hiển thị visual micro-lesson. | User chọn hướng tư duy A/B & quyết định escalate; AI tạo kịch bản tương phản & soạn context brief gửi Mentor. |
| **AI Act / Ask / Don't Act? Vì sao?** | **Ask:** AI hỏi bằng quiz trước khi can thiệp, vì tự tiện push bài học mới sẽ làm ngắt mạch tư duy của học viên. | **Don't Act:** AI thụ động chờ user mở drawer và click chọn, đảm bảo người học nắm quyền kiểm soát 100%. | **Ask:** AI hỏi user chọn A hay B, và hỏi xác nhận trước khi chuyển tiếp dữ liệu cho Trợ giảng con người. |
| **User hiểu capability / limit bằng gì?** | Micro-copy tại nút trigger nói rõ mục đích làm quiz 60s; ghi rõ phạm vi chẩn đoán chỉ giới hạn trong bài học hiện tại. | Nhãn tab ghi rõ danh mục kiến thức nền có sẵn; thông báo micro-lesson chỉ giải thích lý thuyết, không làm hộ bài tập. | Mô tả rõ cơ chế đối chiếu tư duy; thông báo khung giờ trực ban và thời gian phản hồi dự kiến của Trợ giảng. |
| **Evidence / uncertainty được thể hiện thế nào?** | Dẫn chứng từ câu trả lời quiz vừa làm; nếu không chắc chắn, AI hiển thị cả 2 concept liên đới thay vì đoán mò. | Dẫn link bài học gốc trong giáo trình; hiển thị cây mắt xích minh bạch, không dùng suy luận ngầm. | Dẫn chứng số liệu nhầm lẫn phổ biến từ học viên trước; nếu không chắc lỗi code, AI mở ngay nút kết nối Trợ giảng. |
| **User kiểm soát và recovery thế nào?** | Nút *"Bỏ qua chẩn đoán"* và *"Đây không phải phần tôi cần"*; đóng overlay để quay lại đúng vị trí bài học ban đầu. | Nút đóng drawer `[X]`; bỏ tick chọn; nút mở rộng giáo trình gốc; không ảnh hưởng màn hình làm bài chính. | Preview nội dung ticket trước khi gửi; nút hủy gửi; đường thoát chắc chắn thông qua Trợ giảng con người. |

### Feedback & Data Check
* **Phản hồi:** Đánh giá của user chỉ ảnh hưởng tới độ chi tiết trong phiên học hiện tại; không làm thay đổi giáo trình chung.
* **Quyền riêng tư:** Hệ thống chỉ đọc ngữ cảnh bài học hiện tại; học viên có quyền tắt trợ lý AI (opt-out) trong Cài đặt cá nhân.

### GATE 3 — Human Control Check: **ĐẠT ✅**
- [x] Mỗi option phân định rạch ròi vai trò của User và AI.
- [x] Agency phù hợp: Dùng **Ask** hoặc **Don't Act** tại critical moments; không tự tiện can thiệp thô bạo làm gián đoạn bài làm.
- [x] Luôn có đường thoát (exit path) và phục hồi (recovery) nhanh chóng, an toàn.

