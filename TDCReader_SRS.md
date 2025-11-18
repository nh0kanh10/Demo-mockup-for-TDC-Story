
# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS) - FUNCTIONAL SPECIFICATION
# DỰ ÁN: TDCReader - ỨNG DỤNG ĐỌC TRUYỆN TÍCH HỢP AI

| **Mã dự án** | **TDCReader** |
| :--- | :--- |
| **Phiên bản** | **4.0 (Strict 10-Point Structure)** |
| **Ngày cập nhật** | **26/05/2024** |
| **Tác giả** | **Senior Frontend Engineer** |

---

# MỤC LỤC CHỨC NĂNG

1.  **QUẢN LÝ TÀI KHOẢN**
2.  **KHÁM PHÁ & TÌM KIẾM**
3.  **TRẢI NGHIỆM ĐỌC (READING)**
4.  **TỦ TRUYỆN CÁ NHÂN**
5.  **HỆ THỐNG TÁC GIẢ**
6.  **AI STUDIO (SÁNG TẠO NỘI DUNG)**
7.  **CỘNG ĐỒNG (COMMUNITY)**
8.  **HỆ THỐNG TÀI CHÍNH (ECONOMY)**
9.  **HỒ SƠ & GAMIFICATION**

---

## 1. QUẢN LÝ TÀI KHOẢN

### Chức năng 1.1: Đăng ký & Đăng nhập
**1. Tổng quan:** Cho phép người dùng tạo tài khoản mới hoặc truy cập vào hệ thống bằng tài khoản hiện có.
**2. Đối tượng:** Khách (Guest), Người dùng (User).
**3. Điều kiện tiên quyết:** Người dùng chưa đăng nhập vào hệ thống.
**4. Hậu điều kiện:** Hệ thống tạo phiên làm việc (Session/Token), cập nhật trạng thái người dùng thành "Đã đăng nhập".
**5. Tác nhân kích hoạt:** Người dùng nhấn nút "Đăng nhập" trên thanh Header.
**6. Use Case:** (Tham chiếu UC_01 trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_01 trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Hệ thống hiển thị Modal Xác thực (`AuthView`).
    2.  *Trường hợp Đăng ký:*
        *   Người dùng chọn tab "Đăng ký".
        *   Nhập `Username`, `Password`, `Confirm Password`.
        *   Nhấn nút "Đăng ký".
        *   Hệ thống hiển thị Modal chọn Sở thích (`InterestSelectionModal`).
        *   Người dùng chọn tối thiểu 3 thể loại và nhấn "Hoàn tất".
    3.  *Trường hợp Đăng nhập:*
        *   Người dùng nhập `Username` và `Password`.
        *   Nhấn nút "Đăng nhập".
    4.  Hệ thống kiểm tra tính hợp lệ của dữ liệu (Validate).
    5.  Nếu hợp lệ, hệ thống đóng Modal và cập nhật giao diện Header với thông tin người dùng.
**9. Quy tắc nghiệp vụ:**
    *   Tài khoản mới sau khi đăng ký thành công sẽ được tự động đăng nhập.
    *   Tên người dùng là duy nhất trong hệ thống.
**10. Quy tắc xác thực:**
    *   `Username`: Độ dài từ 5-30 ký tự, chỉ chứa chữ cái, số và dấu gạch dưới.
    *   `Password`: Độ dài từ 6-20 ký tự, phải chứa ít nhất 1 chữ cái và 1 chữ số.
    *   `Confirm Password`: Phải khớp hoàn toàn với `Password`.

### Chức năng 1.2: Khôi phục mật khẩu
**1. Tổng quan:** Cho phép người dùng thiết lập lại mật khẩu mới khi quên mật khẩu cũ.
**2. Đối tượng:** Khách (Guest).
**3. Điều kiện tiên quyết:** Tài khoản cần khôi phục phải tồn tại trong hệ thống.
**4. Hậu điều kiện:** Mật khẩu của tài khoản được cập nhật trong cơ sở dữ liệu.
**5. Tác nhân kích hoạt:** Người dùng nhấn vào liên kết "Quên mật khẩu?" trên Modal Đăng nhập.
**6. Use Case:** (Tham chiếu UC_Auth_Recover trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Auth_Recover trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng nhập `Username` hoặc `Email`. Nhấn "Gửi yêu cầu".
    2.  Hệ thống gửi mã `Recovery Code` (Giả lập qua alert).
    3.  Chuyển sang màn hình "Đặt lại mật khẩu".
    4.  Người dùng nhập `Recovery Code`, `New Password`, `Confirm New Password`.
    5.  Nhấn "Đặt lại mật khẩu".
    6.  Hệ thống cập nhật mật khẩu và yêu cầu người dùng đăng nhập lại.
**9. Quy tắc nghiệp vụ:** Mã khôi phục chỉ có hiệu lực trong thời gian ngắn (ví dụ: 5 phút).
**10. Quy tắc xác thực:**
    *   `Recovery Code`: Phải khớp với mã hệ thống đã tạo.
    *   `New Password`: Tuân thủ quy tắc độ mạnh mật khẩu như chức năng Đăng ký.

---

## 2. KHÁM PHÁ & TÌM KIẾM

### Chức năng 2.1: Xem danh sách truyện (Trang chủ)
**1. Tổng quan:** Hiển thị các danh sách truyện được phân loại như "Mới phát hành", "Thịnh hành" và Banner nổi bật.
**2. Đối tượng:** Tất cả (Khách, User, Author).
**3. Điều kiện tiên quyết:** Không có.
**4. Hậu điều kiện:** Danh sách truyện được hiển thị đầy đủ hình ảnh và thông tin cơ bản.
**5. Tác nhân kích hoạt:** Người dùng truy cập vào địa chỉ gốc của ứng dụng (`/`).
**6. Use Case:** (Tham chiếu UC_Browse trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Browse trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Hệ thống tải dữ liệu `Novels`.
    2.  Hiển thị Banner truyện nổi bật (`Featured Novel`).
    3.  Nếu người dùng đã đăng nhập và có lịch sử đọc, hiển thị thẻ "Tiếp tục đọc".
    4.  Hiển thị danh sách lưới "Mới phát hành" (4 truyện mới nhất).
    5.  Hiển thị danh sách lưới "Thịnh hành tuần này" (5 truyện có view cao nhất).
    6.  Người dùng click vào Card truyện để chuyển sang màn hình Chi tiết (`StoryDetailView`).
**9. Quy tắc nghiệp vụ:** Truyện nổi bật trên Banner được chọn dựa trên thuật toán điểm quảng cáo (Promotion Score).
**10. Quy tắc xác thực:** Không có.

### Chức năng 2.2: Tìm kiếm nâng cao
**1. Tổng quan:** Cho phép người dùng tìm kiếm truyện dựa trên nhiều tiêu chí kết hợp (Từ khóa, Thể loại, Trạng thái, Số chương...).
**2. Đối tượng:** Tất cả.
**3. Điều kiện tiên quyết:** Không có.
**4. Hậu điều kiện:** Danh sách kết quả lọc được hiển thị.
**5. Tác nhân kích hoạt:** Người dùng nhấn icon Slider trên thanh tìm kiếm hoặc truy cập trang Search.
**6. Use Case:** (Tham chiếu UC_Search trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Search trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng nhập từ khóa vào ô `Keyword`.
    2.  Người dùng chọn các bộ lọc: `Số chương`, `Sắp xếp`, `Trạng thái`, `Thể loại`, `Nhãn dán`.
    3.  Nhấn nút "LỌC KẾT QUẢ".
    4.  Hệ thống lọc danh sách `Novels` dựa trên tất cả tiêu chí đã chọn (Logic AND).
    5.  Hiển thị lưới kết quả bên dưới form tìm kiếm.
**9. Quy tắc nghiệp vụ:** Tìm kiếm theo từ khóa là tìm kiếm gần đúng (contains) và không phân biệt hoa thường.
**10. Quy tắc xác thực:**
    *   `Keyword`: Tối đa 100 ký tự.
    *   `Tags`: Các tag phân cách bằng dấu phẩy.

---

## 3. TRẢI NGHIỆM ĐỌC (READING)

### Chức năng 3.1: Đọc và Mở khóa Chương VIP
**1. Tổng quan:** Hiển thị nội dung văn bản của chương truyện. Xử lý quy trình thanh toán đối với các chương VIP.
**2. Đối tượng:** Người dùng (User), Khách (chỉ đọc được chương miễn phí).
**3. Điều kiện tiên quyết:** Truyện và Chương phải tồn tại trong hệ thống.
**4. Hậu điều kiện:** Người dùng bị trừ Xu (nếu mở khóa VIP), ID chương được thêm vào danh sách `unlockedChapterIds`.
**5. Tác nhân kích hoạt:** Người dùng chọn một chương từ danh sách hoặc nhấn "Chương sau".
**6. Use Case:** (Tham chiếu UC_Read_VIP trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Read_VIP trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Hệ thống kiểm tra thuộc tính `isVip` của chương.
    2.  *Nếu là chương Miễn phí hoặc Đã mở khóa:* Hiển thị toàn bộ nội dung văn bản.
    3.  *Nếu là chương VIP và Chưa mở khóa:*
        *   Hiển thị lớp phủ (Overlay) che mờ nội dung.
        *   Hiển thị thông báo yêu cầu mở khóa và giá tiền (ví dụ: 100 Xu).
        *   Người dùng nhấn nút "Mở khóa".
        *   Hệ thống kiểm tra số dư Xu.
        *   Nếu đủ Xu: Trừ Xu, cập nhật trạng thái mở khóa, hiển thị nội dung.
        *   Nếu thiếu Xu: Hiển thị thông báo lỗi và gợi ý nạp thêm.
**9. Quy tắc nghiệp vụ:**
    *   Giá mặc định cho 1 chương VIP là 100 Xu (hoặc theo cấu hình).
    *   Chương đã mua có thể đọc lại vĩnh viễn không cần trả phí.
**10. Quy tắc xác thực:** Số dư `coins` của người dùng >= Giá chương VIP.

### Chức năng 3.2: Xem nội dung AI (Comic/Video)
**1. Tổng quan:** Cho phép người dùng xem phiên bản truyện tranh hoặc video clip của chương truyện do AI tạo ra.
**2. Đối tượng:** Người dùng (User).
**3. Điều kiện tiên quyết:** Chương truyện đã có dữ liệu `aiComicImages` hoặc `aiClipUrl`.
**4. Hậu điều kiện:** Mở Modal xem nội dung AI, trừ Xu (nếu nội dung AI được set giá bán).
**5. Tác nhân kích hoạt:** Người dùng nhấn nút icon AI hoặc Banner quảng cáo AI trong giao diện đọc.
**6. Use Case:** (Tham chiếu UC_Read_AI trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Read_AI trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng nhấn vào nút xem nội dung AI.
    2.  Hệ thống kiểm tra `aiContentPrice`.
    3.  *Nếu Giá = 0 hoặc Đã mua:* Mở `AiResultModal` ở chế độ xem (Viewer Mode).
    4.  *Nếu Có giá bán và Chưa mua:*
        *   Hiển thị hộp thoại xác nhận thanh toán (ví dụ: 20 Xu).
        *   Người dùng nhấn "Đồng ý".
        *   Hệ thống trừ Xu, thêm ID chương vào `unlockedAiContentIds`.
        *   Mở Viewer.
**9. Quy tắc nghiệp vụ:** Việc mở khóa nội dung AI độc lập với việc mở khóa nội dung văn bản VIP.
**10. Quy tắc xác thực:** Số dư `coins` >= `aiContentPrice`.

---

## 4. TỦ TRUYỆN CÁ NHÂN (LIBRARY)

### Chức năng 4.1: Quản lý Lịch sử & Theo dõi
**1. Tổng quan:** Xem danh sách truyện đã đọc gần đây, truyện đang theo dõi và các bộ sưu tập cá nhân.
**2. Đối tượng:** Người dùng đã đăng nhập.
**3. Điều kiện tiên quyết:** Người dùng phải đăng nhập.
**4. Hậu điều kiện:** Danh sách truyện hiển thị đúng theo tab được chọn.
**5. Tác nhân kích hoạt:** Truy cập menu "Tủ truyện" từ Header.
**6. Use Case:** (Tham chiếu UC_Library trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Library trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Hệ thống hiển thị giao diện `LibraryView`.
    2.  Người dùng chọn tab: "Lịch sử đọc", "Đang theo dõi", hoặc "Bộ sưu tập".
    3.  Hệ thống lọc danh sách `Novels` dựa trên dữ liệu `user.lastRead`, danh sách Following (giả lập), hoặc `user.collections`.
    4.  Hiển thị danh sách dưới dạng thẻ ngang (Horizontal Card).
**9. Quy tắc nghiệp vụ:** Lịch sử đọc lưu tối đa 50 truyện gần nhất.
**10. Quy tắc xác thực:** Không có.

---

## 5. HỆ THỐNG TÁC GIẢ

### Chức năng 5.1: Đăng ký Tác giả
**1. Tổng quan:** Cho phép người dùng thường nâng cấp tài khoản lên tài khoản Tác giả để đăng truyện.
**2. Đối tượng:** Người dùng (Reader).
**3. Điều kiện tiên quyết:** Tài khoản hiện tại chưa phải là Tác giả (`isAuthor = false`).
**4. Hậu điều kiện:** Thuộc tính `isAuthor` của người dùng chuyển thành `true`.
**5. Tác nhân kích hoạt:** Điền form tại trang Hồ sơ (`ProfileView`).
**6. Use Case:** (Tham chiếu UC_Author_Reg trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Author_Reg trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng truy cập trang Hồ sơ.
    2.  Tại phần "Trở thành Tác giả", nhập `Bút danh` và `Giới thiệu bản thân`.
    3.  Nhấn "Gửi đơn đăng ký".
    4.  Hệ thống cập nhật trạng thái thành `pending` (Đang chờ duyệt).
    5.  (Quy trình giả lập) Sau 3 giây, hệ thống tự động duyệt, set trạng thái `approved` và `isAuthor = true`.
    6.  Hiển thị thông báo chúc mừng.
**9. Quy tắc nghiệp vụ:** Bút danh của tác giả nên là duy nhất trong hệ thống.
**10. Quy tắc xác thực:** Các trường thông tin đăng ký không được để trống.

### Chức năng 5.2: Quản lý Truyện (CRUD)
**1. Tổng quan:** Tạo truyện mới, chỉnh sửa thông tin truyện, thêm/sửa/xóa các chương.
**2. Đối tượng:** Tác giả (Author).
**3. Điều kiện tiên quyết:** Người dùng có quyền Tác giả.
**4. Hậu điều kiện:** Cơ sở dữ liệu được cập nhật với thông tin truyện mới.
**5. Tác nhân kích hoạt:** Truy cập `AuthorDashboardView`.
**6. Use Case:** (Tham chiếu UC_Manage_Story trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Manage_Story trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  *Tạo truyện:* Nhấn "Đăng truyện mới" -> Nhập Title, Summary, Cover, Genres -> Nhấn "Lưu".
    2.  *Sửa truyện:* Nhấn nút "Quản lý" trên một truyện -> Vào màn hình `EditStoryView`.
    3.  *Quản lý chương:*
        *   Nhấn "Thêm chương" -> Mở Modal `ChapterEditModal`.
        *   Nhập Tiêu đề, Nội dung.
        *   Cấu hình kiếm tiền: Check `isVip` hoặc nhập `aiContentPrice`.
        *   Nhấn "Lưu chương".
**9. Quy tắc nghiệp vụ:** Truyện phải có ít nhất 1 chương nội dung mới được hiển thị cho độc giả (Publish).
**10. Quy tắc xác thực:** Nội dung chương không được để trống.

---

## 6. AI STUDIO (SÁNG TẠO NỘI DUNG)

### Chức năng 6.1: Chuyển đổi Chương truyện (Generate AI)
**1. Tổng quan:** Sử dụng Gemini API để tạo hình ảnh (Comic) hoặc video (Clip) từ nội dung văn bản của chương.
**2. Đối tượng:** Tác giả (Author).
**3. Điều kiện tiên quyết:** Tác giả phải có số dư `aiCredits` lớn hơn 0.
**4. Hậu điều kiện:** Chương truyện được cập nhật dữ liệu media (`resultImages` hoặc `resultVideoUrl`), tài khoản bị trừ AI Credit.
**5. Tác nhân kích hoạt:** Nhấn icon AI tại danh sách chương trong `EditStoryView`.
**6. Use Case:** (Tham chiếu UC_AI_Gen trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_AI_Gen trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Hệ thống hiển thị Modal Cấu hình (`AiConversionModal`).
    2.  Tác giả chọn: Loại (Truyện tranh/Video), Phong cách (Manga/3D...), Chất lượng, Tỷ lệ khung hình.
    3.  Nhấn "Bắt đầu tạo".
    4.  Hệ thống trừ Credit (1 cho Comic, 3 cho Video).
    5.  Hiển thị Modal Xử lý (`AiProcessingModal`) trong khi gọi API.
    6.  Nhận kết quả từ API, hiển thị Modal Kết quả (`AiResultModal`).
    7.  Tác giả xem trước, nếu hài lòng nhấn "Lưu vào Thư viện".
**9. Quy tắc nghiệp vụ:**
    *   Chi phí: 1 Credit cho Comic, 3 Credits cho Video.
    *   Nếu API lỗi, hệ thống phải hoàn lại Credit cho tác giả.
**10. Quy tắc xác thực:** Số dư `user.aiCredits` >= Chi phí ước tính.

---

## 7. CỘNG ĐỒNG (COMMUNITY)

### Chức năng 7.1: Thảo luận & Bình luận
**1. Tổng quan:** Tạo bài viết thảo luận mới và trả lời các bài viết hiện có.
**2. Đối tượng:** Người dùng đã đăng nhập.
**3. Điều kiện tiên quyết:** Người dùng phải đăng nhập.
**4. Hậu điều kiện:** Bài viết hoặc phản hồi mới được lưu vào hệ thống.
**5. Tác nhân kích hoạt:** Truy cập `CommunityView`.
**6. Use Case:** (Tham chiếu UC_Community trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Community trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  *Tạo bài viết:*
        *   Nhấn "Tạo chủ đề mới".
        *   Nhập Tiêu đề và Nội dung trong Modal.
        *   Nhấn "Đăng bài".
    2.  *Trả lời:*
        *   Chọn một bài viết để xem chi tiết.
        *   Nhập nội dung vào ô bình luận.
        *   Nhấn "Gửi trả lời".
**9. Quy tắc nghiệp vụ:** Nội dung không được chứa từ ngữ vi phạm tiêu chuẩn cộng đồng (Filter cơ bản).
**10. Quy tắc xác thực:** Tiêu đề và Nội dung là bắt buộc.

---

## 8. HỆ THỐNG TÀI CHÍNH (ECONOMY)

### Chức năng 8.1: Nạp Xu & Mua Credit
**1. Tổng quan:** Người dùng nạp tiền thật để lấy Xu, và dùng Xu để mua lượt sử dụng AI (Credits).
**2. Đối tượng:** Người dùng (User).
**3. Điều kiện tiên quyết:** Cổng thanh toán hoạt động (giả lập).
**4. Hậu điều kiện:** Số dư `coins` hoặc `aiCredits` của người dùng tăng lên.
**5. Tác nhân kích hoạt:** Truy cập `CoinShopView` hoặc `StoreView`.
**6. Use Case:** (Tham chiếu UC_Payment trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Payment trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng chọn gói Xu hoặc gói AI Credit.
    2.  Chuyển đến màn hình Thanh toán (`PaymentView`).
    3.  Chọn phương thức thanh toán (Thẻ/Ví điện tử).
    4.  Nhấn "Thanh toán".
    5.  Hệ thống giả lập xử lý thành công và cộng số dư tương ứng.
**9. Quy tắc nghiệp vụ:** Tỷ lệ quy đổi giả định: 1 Coin = 200 VND.
**10. Quy tắc xác thực:** Thông tin thẻ giả lập không được để trống.

### Chức năng 8.2: Rút tiền (Withdraw)
**1. Tổng quan:** Tác giả rút doanh thu kiếm được từ truyện về tài khoản ngân hàng.
**2. Đối tượng:** Tác giả (Author).
**3. Điều kiện tiên quyết:** Số dư Doanh thu (`revenue`) phải lớn hơn mức tối thiểu.
**4. Hậu điều kiện:** Tạo yêu cầu rút tiền (Transaction status: Pending), số dư Doanh thu giảm.
**5. Tác nhân kích hoạt:** Tab "Thu nhập" trong `AuthorDashboardView`.
**6. Use Case:** (Tham chiếu UC_Withdraw trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Withdraw trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Nhấn nút "Rút tiền".
    2.  Nhập số tiền cần rút và chọn phương thức nhận tiền.
    3.  Nhấn "Gửi yêu cầu".
    4.  Hệ thống kiểm tra số dư khả dụng.
    5.  Nếu hợp lệ, trừ số dư và tạo giao dịch chờ xử lý.
**9. Quy tắc nghiệp vụ:** Số tiền rút tối thiểu là 100,000 VND.
**10. Quy tắc xác thực:** Số tiền rút <= Số dư `user.revenue`.

---

## 9. HỒ SƠ & GAMIFICATION

### Chức năng 9.1: Nhiệm vụ & Cây Tri Thức
**1. Tổng quan:** Hệ thống nhiệm vụ hàng ngày/tuần và trò chơi nuôi cây ảo dựa trên chuỗi ngày đọc sách (Reading Streak).
**2. Đối tượng:** Người dùng (User).
**3. Điều kiện tiên quyết:** Người dùng đã đăng nhập.
**4. Hậu điều kiện:** Người dùng nhận XP/Coin, trạng thái Cây thay đổi (lớn lên).
**5. Tác nhân kích hoạt:** Truy cập `QuestsView` hoặc `ProfileView`.
**6. Use Case:** (Tham chiếu UC_Gamification trong `TDCReader_ActivityDiagrams.md`)
**7. Sơ đồ Hoạt động:** (Tham chiếu AD_Gamification trong `TDCReader_ActivityDiagrams.md`)
**8. Luồng công việc:**
    1.  Người dùng thực hiện các hành động trong app (Đọc chương, Like, Comment).
    2.  Hệ thống ngầm cập nhật tiến độ nhiệm vụ (`currentProgress`).
    3.  Khi tiến độ đạt mục tiêu (`goal`), nút "Nhận thưởng" kích hoạt.
    4.  Người dùng nhấn nhận thưởng -> Cộng Xu/XP.
    5.  Hệ thống kiểm tra `readingStreak` để cập nhật hình ảnh Cây Tri Thức (Level 1 -> 4).
**9. Quy tắc nghiệp vụ:** Nhiệm vụ hàng ngày (Daily) được reset vào lúc 00:00 mỗi ngày.
**10. Quy tắc xác thực:** Không có.

---
*Hết tài liệu SRS*
