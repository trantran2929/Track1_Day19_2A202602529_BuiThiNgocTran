# Three-Option Design Sheet (Chặng 2)

## 1. Mở lại Solution Parking Lot (Day 17 Context)

Nhóm mở lại pool ý tưởng từ Day 17 và tinh chỉnh để đảm bảo có sự đa dạng thực sự về cơ chế giải quyết (mechanism), từ **AI-led (hệ thống tự chẩn đoán)** đến **User-led (người học tự soi chiếu)** và **Human-in-the-loop (kết hợp phản biện và trợ giảng)**:

1. **Nút "Tôi vẫn chưa hiểu":** AI Tutor đặt 2–3 câu chẩn đoán, chọn kiến thức nền, tạo refresher ngắn và đưa trở về bài học *(Solution directive gốc)*.
2. **Diagnostic Quiz ngắn bắt buộc:** Kiểm tra trước chương để phát hiện hổng kiến thức sớm.
3. **Cây phân rã kiến thức nền (Knowledge Checklist):** Bóc tách bài học thành các mắt xích prerequisite để người học tự tick chọn và đọc giải thích tức thì *(User-led / lấy cảm hứng từ workaround của Linh)*.
4. **Đối chiếu tương phản A/B & Escalation Trợ giảng:** AI đưa ra 2 cách hiểu A vs B để người học nhận diện điểm ngộ nhận; nếu vẫn nghẽn thì tự tạo brief gửi Mentor hỗ trợ 1-1 *(Human Escalation / lấy cảm hứng từ workaround của Khánh và Thương)*.
5. **AI Chatbot giải thích đa cấp độ (ELI5):** Cho phép hỏi đáp tự do theo nhiều góc nhìn.

---

## 2. Thiết kế ba Solution Options

### 2.1. Những thứ giữ nguyên (Constants)

| Thành phần | Quyết định chung cho Option A / B / C |
|------------|---------------------------------------|
| **Target user** | Học viên khóa đào tạo kỹ thuật/AI trên VLearn, có nền tảng chuyển ngành hoặc non-tech (Marketing, BA mới vào ngành). |
| **Situation** | Đang trong luồng học một bài học kỹ thuật tổng hợp hoặc làm bài tập thực hành phức tạp thì bị nghẽn ở một khái niệm nền tảng. |
| **Task** | Xác định và lấp nhanh lỗ hổng kiến thức nền đang cản trở để có thể tiếp tục hoàn thành bài học hiện tại. |
| **Desired outcome** | Hiểu được bản chất khái niệm bị hổng trong thời gian ngắn (< 3 phút), khôi phục sự tự tin và tiếp tục làm bài mà không phải rời khỏi giao diện học tập. |
| **Content/data fixture** | **Bài 4: Xây dựng RAG Agent cơ bản với LangChain** — Tại bước cấu hình `VectorStore Indexing`, học viên gặp lỗi/không hiểu thuật ngữ: *"Embedding Dimension & Cosine Similarity"*. |

---

### 2.2. Những thứ được phép khác (Variables across Options)

| Thành phần | Option A: Diagnostic Refresher (AI-Led) | Option B: Knowledge Checklist (User-Led) | Option C: A/B Contrast & Escalation (Co-create & Human) |
|------------|----------------------------------------|------------------------------------------|---------------------------------------------------------|
| **Solution mechanism** | **Chẩn đoán trắc nghiệm tự động:** AI đưa ra 2 câu hỏi mini-quiz để xác định điểm hổng, sau đó push một Refresher Card ngắn gọn về khái niệm nền tương ứng. | **Cây phân rã kiến thức tự chọn:** Giao diện hiển thị drawer checklist các mắt xích nền tảng của bài học; user tự click vào mắt xích mình thấy mơ hồ để xem giải thích trực quan. | **Đối chiếu phản biện tư duy & Kết nối Mentor:** AI đưa ra 2 kịch bản hiểu tương phản (A vs B) để user chọn; giải thích điểm ngộ nhận; nếu vẫn chưa thông thì tự động tạo ticket gửi Trợ giảng. |
| **User làm gì?** | Bấm nút *"Tôi vẫn chưa hiểu"*, trả lời 2 câu trắc nghiệm chẩn đoán của AI, đọc thẻ ôn tập được tạo tự động, bấm *"Quay lại bài học"*. | Mở drawer *"Kiến thức nền bài này"*, đọc qua checklist, tự tick chọn điểm mình chưa rõ (vd: `[ ] Cosine Similarity tính thế nào?`), đọc micro-lesson bung ra. | Bấm *"Đối chiếu cách hiểu"*, chọn cách hiểu A hoặc B phản ánh suy nghĩ của mình, đọc phân tích ngộ nhận; nếu vẫn tắc thì bấm *"Gửi Trợ giảng hỗ trợ"*. |
| **AI làm gì?** | Phân tích ngữ cảnh bài học + câu trả lời quiz của user để suy luận lỗ hổng cốt lõi, chọn concept nền và sinh tóm tắt 60 giây. | Tự động phân rã bài học hiện tại thành cấu trúc checklist prerequisite; hiển thị giải thích dạng visual / ELI5 tương ứng khi user click. | Sinh 2 kịch bản tương phản A vs B dựa trên các lỗi tư duy phổ biến; khi user yêu cầu escalate thì tự tóm tắt context (code, lỗi, lựa chọn) gửi cho Mentor. |
| **Trigger** | Học viên bấm nút *"Tôi vẫn chưa hiểu"* trên thanh bài giảng. | Học viên chủ động mở tab drawer *"Mắt xích kiến thức nền"* bên cạnh màn hình code/slide. | Học viên bấm *"Đối chiếu cách hiểu"* ngay tại đoạn bài giảng/bài tập bị nghẽn. |
| **Trade-off chính** | Tự động hóa cao, luồng khép kín; nhưng tạo áp lực tâm lý bị "kiểm tra", có thể suy đoán sai nếu user chọn bừa. | Trao toàn quyền kiểm soát cho user, không áp đặt; nhưng đòi hỏi user phải có khả năng tự nhận thức (metacognition) xem mình đang yếu ở đâu. | Trị đúng điểm ngộ nhận tư duy và có lưới an toàn con người; nhưng tốn chi phí vận hành trợ giảng và cần biên soạn kịch bản A/B chất lượng. |

---

## 3. Distance Check (Khoảng cách giữa các Option)

* **A khác B vì:**  
  Option A để **AI nắm quyền quyết định và suy luận lỗ hổng** thông qua bài trắc nghiệm bắt buộc (AI-Led Inference), trong khi Option B để **User chủ động tự soi chiếu và tự chọn** mắt xích kiến thức mình cần bổ sung từ bảng phân rã có sẵn (User-Led Self-Diagnosis).

* **B khác C vì:**  
  Option B là cơ chế **tự học độc lập 100% trên hệ thống** qua tài liệu vi mô (Self-Service Micro-Lessons), trong khi Option C sử dụng cơ chế **đối chiếu phản biện tư duy (Cognitive Contrast A/B)** và có luồng **chuyển giao cho con người (Human Escalation)** khi AI không giải quyết được.

* **A khác C vì:**  
  Option A cố gắng giữ người học trong một luồng tự động hóa hoàn toàn và chẩn đoán dạng đúng/sai (Testing & Refresher), trong khi Option C tập trung mổ xẻ nguyên nhân ngộ nhận bản chất qua hai góc nhìn A/B và có sự bảo chứng hỗ trợ từ Trợ giảng thật khi bế tắc.

---

## GATE 2 — Meaningful Options Check ✅

- [x] **Cùng chung nền tảng:** Cả 3 options đều giải quyết cho cùng đối tượng học viên non-tech, trong cùng tình huống nghẽn bài học LangChain RAG, cùng mong muốn tiếp tục hoàn thành bài học trong < 3 phút.
- [x] **Khác biệt có ý nghĩa ở cơ chế (Mechanism):**
  - Option A: *AI-Led Testing & Prescriptive Refreshing*.
  - Option B: *User-Led Checklist Exploration*.
  - Option C: *Co-created Cognitive Contrast & Human Escalation*.
- [x] **Không thiên vị (No Strawman Option):** Cả 3 phương án đều là những giải pháp nghiêm túc, khả thi và giải quyết trực diện rào cản thiếu kiến thức nền được phát hiện từ Day 17.

---

# Chặng 3 — Human–AI Design Pass

> **Nguyên tắc:** Chỉ review critical interaction cần test. Không thiết kế toàn bộ product và không thêm màn hình không cần thiết.

## 1. Bốn quyết định thiết kế (Four Design Decisions)

### 1.1. Expectation (Kỳ vọng & Giới hạn)
* **Option A (Diagnostic Refresher):**
  * *Trước khi AI hoạt động:* Nút bấm ghi rõ: *"Tôi vẫn chưa hiểu — AI sẽ đặt 2 câu hỏi trắc nghiệm nhanh để tìm lỗ hổng và tóm tắt kiến thức nền tương ứng trong 60s"*. Người học biết trước mình sắp làm một bài quiz ngắn, không bị bất ngờ hay hoang mang.
  * *Giới hạn cần nói rõ:* AI chỉ chẩn đoán các khái niệm prerequisite trực tiếp của bài học hiện tại (VectorStore / Embeddings), không trả lời các câu hỏi ngoài phạm vi bài học.
* **Option B (Knowledge Checklist):**
  * *Trước khi AI hoạt động:* Nhãn drawer ghi rõ: *"Mắt xích kiến thức nền bài này — AI đã bóc tách sẵn các khái niệm prerequisite, chọn điểm bạn đang mơ hồ để xem tóm tắt trực quan"*.
  * *Giới hạn cần nói rõ:* Đây là tài liệu tóm tắt kiến thức vi mô (micro-lesson), không viết hộ code bài tập cho học viên.
* **Option C (A/B Contrast & Escalation):**
  * *Trước khi AI hoạt động:* Ghi rõ: *"Đối chiếu cách hiểu — AI đưa ra 2 cách hiểu phổ biến (A vs B) để bạn so sánh suy nghĩ của mình. Nếu vẫn bế tắc, Trợ giảng sẽ hỗ trợ trực tiếp"*.
  * *Giới hạn cần nói rõ:* AI chỉ phân tích sự khác biệt tư duy, không thay thế việc chấm bài; Trợ giảng con người trực ban phản hồi trong giờ học.

### 1.2. Role and Agency (Phân vai & Mức độ tự chủ)
* **Option A:**
  * *User làm:* Trả lời 2 câu quiz, đọc Refresher Card, bấm quay lại bài học.
  * *AI làm:* Tạo câu hỏi chẩn đoán, chấm câu trả lời, suy luận concept bị hổng, sinh thẻ tóm tắt.
  * *Critical Moment:* **Ask** — AI hỏi người học qua quiz trước khi đưa ra nội dung ôn tập; tuyệt đối không tự ý ngắt bài học nếu user chưa bấm nút.
  * *Hậu quả khi sai:* AI chẩn đoán nhầm concept -> User mất ~60 giây đọc nội dung không đúng chỗ ngứa. Sai sót rất dễ phát hiện vì user đọc refresher sẽ thấy không khớp thắc mắc.
* **Option B:**
  * *User làm:* Tự duyệt checklist, tự click chọn concept mình cảm thấy chưa hiểu (Self-Assessment).
  * *AI làm:* Phân rã bài học thành checklist cấu trúc, hiển thị micro-lesson tương ứng khi có lệnh.
  * *Critical Moment:* **Don't Act** trừ khi có thao tác click từ User (User-initiated 100%).
  * *Hậu quả khi sai:* AI phân rã checklist thiếu sót -> Hậu quả cực thấp, user chỉ cần đóng card hoặc chọn concept khác.
* **Option C:**
  * *User làm:* Chọn phương án A hoặc B phản ánh suy nghĩ của mình; quyết định có cần chuyển tiếp cho Mentor hay không.
  * *AI làm:* Sinh 2 kịch bản tương phản; giải thích ngộ nhận; tự động gom context (vị trí code, lỗi, lựa chọn A/B) gửi Mentor khi user yêu cầu.
  * *Critical Moment:* **Ask** — AI hỏi user chọn A hay B, và hỏi xác nhận trước khi gửi ticket cho Mentor.
  * *Hậu quả khi sai:* Cả 2 kịch bản A/B không khớp suy nghĩ của user -> User bấm *"Gửi Trợ giảng"* ngay lập tức để con người can thiệp.

### 1.3. Evidence and Uncertainty (Căn cứ & Xử lý bất định)
* **Option A:**
  * *Căn cứ:* Hiển thị rõ: *"Dựa trên bài học VectorStore và 2 câu trả lời quiz vừa rồi của bạn, AI nhận thấy bạn đang vướng ở: Cosine Similarity"*.
  * *Bất định:* Nếu điểm quiz mấp mé hoặc không rõ ràng, AI hiển thị: *"AI chưa chắc chắn bạn đang vướng ở Khái niệm Vector hay Thuật toán Cosine — Dưới đây là tóm tắt nhanh cả hai khái niệm"*.
* **Option B:**
  * *Căn cứ:* Ghi rõ nguồn bài học gốc: *"Trích xuất từ Bài 2: Nhập môn Vector Embeddings"*.
  * *Bất định:* Hệ thống không suy đoán ngầm, hiển thị trực quan toàn bộ cây mắt xích kèm thanh tiến độ để người học tự định vị mức độ hiểu của mình.
* **Option C:**
  * *Căn cứ:* *"68% học viên mới thường nhầm lẫn giữa Vector Dimension và Token Count — Dưới đây là điểm khác biệt cốt lõi"*.
  * *Bất định:* Nếu AI không xác định được lỗi code của user để tạo cặp A/B phù hợp, hệ thống bỏ qua bước đối chiếu và hiện ngay nút: *"Kết nối Trợ giảng với ngữ cảnh hiện tại"*.

### 1.4. Control and Recovery (Kiểm soát & Phục hồi)
* **Option A:**
  * *Kiểm soát:* Nút *"Bỏ qua chẩn đoán, quay lại bài"* luôn hiển thị ở góc trên; nút *"Đây không phải phần tôi cần"* ở cuối Refresher.
  * *Phục hồi:* Bấm *"Quay lại bài"* lập tức đóng overlay, đưa user về đúng dòng code/slide đang học mà không mất dữ liệu.
* **Option B:**
  * *Kiểm soát:* Drawer có nút đóng `[X]`, click ra ngoài để dismiss; các mục tick chọn có thể bỏ chọn (undo) bất kỳ lúc nào.
  * *Phục hồi:* Đóng drawer là tiếp tục làm bài ngay; có nút *"Mở bài giảng gốc"* nếu muốn đọc sâu hơn.
* **Option C:**
  * *Kiểm soát:* User được preview nội dung tóm tắt context trước khi bấm gửi Trợ giảng, có thể hủy (Cancel) gửi ticket.
  * *Phục hồi:* Nếu phần giải thích A/B không thỏa đáng, nút *"Gặp Trợ giảng"* là đường thoát an toàn 100%.

---

## 2. Human–AI Decision Table

| Human–AI Decision | Option A: Diagnostic Refresher (AI-Led) | Option B: Knowledge Checklist (User-Led) | Option C: A/B Contrast & Escalation (Co-create & Human) |
|---|---|---|---|
| **User làm gì? AI làm gì?** | User trả lời mini-quiz & đọc refresher; AI tạo câu hỏi, chẩn đoán điểm hổng và sinh refresher tương ứng. | User tự duyệt checklist & chọn mắt xích chưa hiểu; AI phân rã bài học thành checklist & hiển thị visual micro-lesson. | User chọn hướng tư duy A/B & quyết định escalate; AI tạo kịch bản tương phản & soạn context brief gửi Mentor. |
| **AI Act / Ask / Don't Act? Vì sao?** | **Ask:** AI hỏi bằng quiz trước khi can thiệp, vì tự tiện push bài học mới sẽ làm ngắt mạch tư duy của học viên. | **Don't Act:** AI thụ động chờ user mở drawer và click chọn, đảm bảo người học nắm quyền kiểm soát 100%. | **Ask:** AI hỏi user chọn A hay B, và hỏi xác nhận trước khi chuyển tiếp dữ liệu cho Trợ giảng con người. |
| **User hiểu capability / limit bằng gì?** | Micro-copy tại nút trigger nói rõ mục đích làm quiz 60s; ghi rõ phạm vi chẩn đoán chỉ giới hạn trong bài học hiện tại. | Nhãn tab ghi rõ danh mục kiến thức nền có sẵn; thông báo micro-lesson chỉ giải thích lý thuyết, không làm hộ bài tập. | Mô tả rõ cơ chế đối chiếu tư duy; thông báo khung giờ trực ban và thời gian phản hồi dự kiến của Trợ giảng. |
| **Evidence / uncertainty được thể hiện thế nào?** | Dẫn chứng từ câu trả lời quiz vừa làm; nếu không chắc chắn, AI hiển thị cả 2 concept liên đới thay vì đoán mò. | Dẫn link bài học gốc trong giáo trình; hiển thị cây mắt xích minh bạch, không dùng suy luận ngầm. | Dẫn chứng số liệu nhầm lẫn phổ biến từ học viên trước; nếu không chắc lỗi code, AI mở ngay nút kết nối Trợ giảng. |
| **User kiểm soát và recovery thế nào?** | Nút *"Bỏ qua chẩn đoán"* và *"Đây không phải phần tôi cần"*; đóng overlay để quay lại đúng vị trí bài học ban đầu. | Nút đóng drawer `[X]`; bỏ tick chọn; nút mở rộng giáo trình gốc; không ảnh hưởng màn hình làm bài chính. | Preview nội dung ticket trước khi gửi; nút hủy gửi; đường thoát chắc chắn thông qua Trợ giảng con người. |

---

## 3. Feedback and Data Check

* **Cơ chế phản hồi (Feedback impact):** Lựa chọn và đánh giá của user (hữu ích / không hữu ích) chỉ tác động tới phiên học hiện tại để tinh chỉnh độ sâu của giải thích; không làm thay đổi giáo trình chung của các học viên khác.
* **Quyền riêng tư & Thu hồi dữ liệu (Data permission & Opt-out):** Hệ thống chỉ đọc ngữ cảnh bài học hiện tại và thao tác tại chỗ, không thu thập dữ liệu cá nhân nhạy cảm; học viên có thể tắt hoàn toàn trợ lý AI trong phần Cài đặt cá nhân nếu muốn tự học truyền thống.

---

## GATE 3 — Human Control Check: **ĐẠT ✅**

- [x] Mỗi option đều nói rõ vai trò User làm gì và AI làm gì.
- [x] Agency phù hợp với hậu quả khi sai: Cả 3 phương án đều chọn cơ chế **Ask** hoặc **Don't Act** tại các thời điểm then chốt (critical moments); không có phương án nào tự động can thiệp thô bạo (không auto-act) làm gián đoạn luồng làm bài.
- [x] Người dùng luôn có ít nhất một đường kiểm soát (control) và đường phục hồi (recovery / exit path) nhanh chóng, an toàn.

