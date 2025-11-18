# Tập hợp Sơ đồ Hoạt động (Activity Diagrams) - TDCReader

Tài liệu này chứa các sơ đồ hoạt động chi tiết cho dự án TDCReader, tách biệt khỏi tài liệu SRS chính để dễ dàng quản lý và cập nhật.

## Mục lục Sơ đồ

1.  [Quy trình Đăng nhập & Đăng ký](#1-quy-trình-đăng-nhập--đăng-ký)
2.  [Quy trình Khôi phục Mật khẩu](#2-quy-trình-khôi-phục-mật-khẩu)
3.  [Quy trình Khám phá và Đọc truyện](#3-quy-trình-khám-phá-và-đọc-truyện)
4.  [Quy trình Đăng ký Tác giả](#4-quy-trình-đăng-ký-tác-giả)
5.  [Quy trình Tương tác Cộng đồng](#5-quy-trình-tương-tác-cộng-đồng)
6.  [Quy trình Quản lý Sáng tác (Đăng/Sửa truyện)](#6-quy-trình-quản-lý-sáng-tác)
7.  [Quy trình Chuyển đổi AI](#7-quy-trình-chuyển-đổi-ai)
8.  [Quy trình Mua Xu và Vật phẩm](#8-quy-trình-mua-xu-và-vật-phẩm)

---

### 1. Quy trình Đăng nhập & Đăng ký

Mô tả luồng tương tác khi người dùng muốn truy cập vào hệ thống hoặc tạo tài khoản mới.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Đăng nhập & Đăng ký

  lane "Người dùng (Actor)"
    start
    :1. Nhấn nút "Đăng nhập" trên Header;
    if (Chọn Đăng nhập hay Đăng ký?) then (Đăng ký)
      :3. Chọn tab "Đăng ký";
      :4. Nhập Tên người dùng, Mật khẩu, Xác nhận mật khẩu;
      :5. Nhấn nút "Đăng ký";
      :12. Chọn ít nhất 3 thể loại yêu thích trên Modal;
      :13. Nhấn nút "Tiếp tục";
      stop
    else (Đăng nhập)
      :15. Nhập Tên người dùng và Mật khẩu;
      :16. Nhấn nút "Đăng nhập";
      stop
    endif
  end

  lane "Hệ thống (System)"
    :2. Hiển thị Modal Xác thực (AuthView);
    if (Người dùng chọn Đăng ký) then (Đăng ký)
      :6. Tiếp nhận dữ liệu và Validate;
      if (7. Dữ liệu hợp lệ?) then (Hợp lệ)
        :9. Đóng AuthView, Hiển thị Modal Chọn Sở thích (InterestSelectionModal);
        :14. Validate số lượng thể loại và Tạo tài khoản mới;
        :20. Tự động đăng nhập và Đóng Modal;
      else (Không hợp lệ)
        :8. Hiển thị thông báo lỗi trên form Đăng ký;
        kill
      endif
    else (Đăng nhập)
      :17. Tiếp nhận dữ liệu và Validate;
      if (18. Dữ liệu hợp lệ?) then (Hợp lệ)
        :19. Kiểm tra thông tin xác thực trong CSDL;
        if (21. Xác thực thành công?) then (Thành công)
          :22. Tạo phiên làm việc (Session);
          :23. Đóng Modal, cập nhật Header hiển thị Avatar;
        else (Thất bại)
          :24. Hiển thị lỗi "Sai tên đăng nhập hoặc mật khẩu";
        endif
      else (Không hợp lệ)
        :25. Hiển thị lỗi validate trên form;
      endif
    endif
  end
```

---

### 2. Quy trình Khôi phục Mật khẩu

Mô tả các bước để người dùng đặt lại mật khẩu khi bị quên.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Khôi phục Mật khẩu

  lane "Người dùng (Actor)"
    start
    :1. Nhấn vào liên kết "Quên mật khẩu?" trên Modal Đăng nhập;
    :3. Nhập Tên người dùng hoặc Email đã đăng ký;
    :4. Nhấn nút "Gửi yêu cầu";
    :7. Kiểm tra email/tin nhắn để lấy Mã khôi phục;
    :8. Nhập Mã khôi phục, Mật khẩu mới, Xác nhận mật khẩu;
    :9. Nhấn nút "Đặt lại mật khẩu";
    :13. Nhấn nút "OK" trên thông báo thành công;
    :14. Thực hiện Đăng nhập với mật khẩu mới;
    stop
  end

  lane "Hệ thống (System)"
    :2. Chuyển đổi trạng thái Modal sang form "Quên mật khẩu";
    :5. Kiểm tra sự tồn tại của tài khoản;
    if (Tài khoản tồn tại?) then (Có)
        :6. Tạo mã OTP, gửi giả lập qua alert/email và chuyển sang form "Đặt lại mật khẩu";
    else (Không)
        :6a. Hiển thị lỗi "Tài khoản không tồn tại";
        kill
    endif
    :10. Validate mã OTP và độ mạnh mật khẩu mới;
    if (11. Hợp lệ?) then (Hợp lệ)
        :12. Cập nhật mật khẩu mới vào CSDL;
        :12a. Hiển thị thông báo "Đặt lại mật khẩu thành công";
        :12b. Chuyển Modal về trạng thái Đăng nhập;
    else (Không hợp lệ)
        :11a. Hiển thị thông báo lỗi (Sai mã hoặc mật khẩu yếu);
    endif
  end
```

---

### 3. Quy trình Khám phá và Đọc truyện

Mô tả luồng người dùng tìm kiếm truyện, xem chi tiết và đọc nội dung (bao gồm xử lý chương VIP).

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Khám phá và Đọc truyện

  lane "Người dùng (Actor)"
    start
    :1. Truy cập Trang chủ hoặc Tìm kiếm;
    :2. Nhấn vào ảnh bìa hoặc tên một bộ truyện;
    :4. Xem thông tin chi tiết, đánh giá tại StoryDetailView;
    :5. Nhấn vào một Chương trong danh sách;
    if (8. Chương là VIP?) then (VIP)
      if (10. Đã mở khóa trước đó?) then (Đã mở)
        :12. Đọc nội dung chương;
        stop
      else (Chưa mở)
        :11. Xem màn hình Paywall (Khóa);
        :13. Nhấn nút "Mở khóa với X Xu";
        if (15. Số dư đủ?) then (Đủ)
          :17. Xác nhận trừ Xu;
          :19. Đọc nội dung chương;
          stop
        else (Thiếu)
          :16. Nhận thông báo thiếu Xu;
          :18. Nhấn chuyển đến trang Nạp Xu;
          stop
        endif
      endif
    else (Miễn phí)
      :9. Đọc nội dung chương;
      stop
    endif
  end
  
  lane "Hệ thống (System)"
    :3. Tải và hiển thị Trang chi tiết truyện (StoryDetailView);
    :6. Kiểm tra thuộc tính `isVip` của chương;
    :7. Kiểm tra danh sách `unlockedChapterIds` của User;
    if (Chương VIP & Chưa mở khóa?) then (Đúng)
      :11. Hiển thị lớp phủ Paywall che nội dung;
      :14. Kiểm tra số dư `coins` của User;
      if (Đủ Xu?) then (Đủ)
        :17. Trừ Xu trong tài khoản;
        :17a. Thêm ID chương vào `unlockedChapterIds`;
        :17b. Tải lại giao diện, hiển thị nội dung đầy đủ;
      else (Thiếu)
        :16. Hiển thị Alert báo không đủ tiền;
      endif
    else (Sai)
      :9. Hiển thị toàn bộ nội dung chương (ReaderView);
    endif
  end
```

---

### 4. Quy trình Đăng ký Tác giả

Mô tả quá trình người dùng thường đăng ký để trở thành tác giả.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Đăng ký Tác giả

  lane "Người dùng (Actor)"
    start
    :1. Truy cập trang Hồ sơ (ProfileView);
    :3. Điền "Bút danh" và "Giới thiệu bản thân" vào form;
    :4. Nhấn nút "Gửi đơn đăng ký";
    :7. Chờ đợi hệ thống xét duyệt;
    :9. Nhận thông báo (Alert) chúc mừng;
    :10. Thấy giao diện thay đổi, xuất hiện quyền Tác giả;
    stop
  end

  lane "Hệ thống (System)"
    :2. Hiển thị form Đăng ký Tác giả (nếu chưa là tác giả);
    :5. Validate dữ liệu đầu vào (không được để trống);
    if (6. Dữ liệu hợp lệ?) then (Hợp lệ)
      :6a. Cập nhật trạng thái User thành `pending`;
      :6b. Hiển thị UI "Đang chờ xét duyệt";
      :8. (Quy trình ngầm) Tự động duyệt sau 3 giây;
      :8a. Cập nhật `isAuthor = true`, trạng thái `approved`;
      :8b. Gửi thông báo thành công cho User;
    else (Không hợp lệ)
      :5a. Hiển thị lỗi "Vui lòng điền đầy đủ thông tin";
    endif
  end
```

---

### 5. Quy trình Tương tác Cộng đồng

Mô tả cách người dùng tạo chủ đề mới hoặc phản hồi chủ đề có sẵn.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Tương tác Cộng đồng

  lane "Người dùng (Actor)"
    start
    :1. Truy cập trang Cộng đồng (CommunityView);
    if (Hành động?) then (Tạo bài mới)
      :3. Nhấn nút "Tạo chủ đề mới";
      :5. Nhập Tiêu đề và Nội dung bài viết;
      :6. Nhấn nút "Đăng bài";
      :9. Thấy bài viết mới xuất hiện trên đầu danh sách;
      stop
    else (Xem & Trả lời)
      :2. Nhấn vào một chủ đề để xem chi tiết;
      :10. Đọc nội dung và các bình luận;
      :11. Nhập nội dung vào ô "Viết trả lời";
      :12. Nhấn nút "Gửi trả lời";
      :15. Thấy bình luận của mình xuất hiện;
      stop
    endif
  end
  
  lane "Hệ thống (System)"
    if (Hành động = Tạo bài mới) then
      :4. Hiển thị Modal Tạo bài viết (CreatePostModal);
      :7. Validate dữ liệu (Tiêu đề, Nội dung);
      if (8. Hợp lệ?) then (Có)
        :8a. Tạo đối tượng Post mới;
        :8b. Thêm vào danh sách bài viết;
        :8c. Đóng Modal và cập nhật UI;
      else (Không)
        :7a. Báo lỗi thiếu thông tin;
      endif
    else (Xem & Trả lời)
      :13. Kiểm tra đăng nhập;
      if (Đã đăng nhập?) then (Rồi)
        :14. Tạo đối tượng Reply mới;
        :14a. Thêm vào danh sách replies của Post;
        :14b. Cập nhật UI trang chi tiết;
      else (Chưa)
        :13a. Hiển thị thông báo yêu cầu đăng nhập;
      endif
    endif
  end
```

---

### 6. Quy trình Quản lý Sáng tác

Mô tả quy trình tác giả đăng truyện mới hoặc chỉnh sửa nội dung truyện cũ.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Quản lý Sáng tác

  lane "Tác giả (Actor)"
    start
    :1. Truy cập Dashboard Tác giả;
    if (Hành động?) then (Đăng truyện mới)
      :3. Nhấn nút "Đăng truyện mới";
      :5. Điền: Tên, Mô tả, Ảnh bìa, Thể loại...;
      :6. Nhấn nút "Đăng truyện";
      :9. Thấy truyện mới trong danh sách quản lý;
      stop
    else (Chỉnh sửa truyện)
      :2. Nhấn nút "Quản lý" trên một đầu truyện;
      :10. Xem trang EditStoryView;
      fork
        :11. Nhấn "Thêm chương";
        :12. Nhập Tên chương, Nội dung, Tùy chọn VIP;
        :13. Nhấn "Lưu chương";
      fork again
        :14. Nhấn icon "Sửa" tại một chương;
        :15. Thay đổi nội dung;
        :16. Nhấn "Lưu chương";
      end fork
      :17. Nhấn nút "Lưu thay đổi" (Tổng thể);
      :20. Nhận thông báo thành công;
      stop
    endif
  end

  lane "Hệ thống (System)"
    if (Hành động = Đăng mới) then
      :4. Hiển thị form PostStoryView;
      :7. Validate các trường bắt buộc;
      if (8. Hợp lệ?) then (Có)
        :8a. Tạo ID truyện mới;
        :8b. Lưu vào danh sách Novels;
        :8c. Chuyển hướng về Dashboard;
      else (Không)
        :7a. Hiển thị lỗi thiếu thông tin;
      endif
    else (Chỉnh sửa)
      :13a. Cập nhật danh sách chương tạm thời trên Client;
      :16a. Cập nhật nội dung chương tạm thời;
      :18. Ghi đè thông tin truyện và danh sách chương vào CSDL;
      :19. Chuyển hướng về Dashboard;
    endif
  end
```

---

### 7. Quy trình Chuyển đổi AI

Mô tả quy trình tác giả sử dụng AI để tạo nội dung đa phương tiện từ văn bản.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Chuyển đổi AI

  lane "Tác giả (Actor)"
    start
    :1. Tại trang EditStoryView, nhấn icon "AI" ở một chương;
    :3. Chọn loại (Comic/Video), Phong cách, Chất lượng;
    :4. Nhập thêm Prompt bổ sung (tùy chọn);
    :5. Nhấn "Bắt đầu chuyển đổi";
    :9. Chờ đợi trong khi Modal xử lý hiển thị;
    :13. Xem trước kết quả (Ảnh/Video) trên Modal Kết quả;
    if (14. Hài lòng?) then (Có)
      :15. Nhấn nút "Lưu và Đóng";
      :17. Thấy icon AI sáng lên tại chương đó;
      stop
    else (Không)
      :16. Nhấn nút "Thử lại";
      :16a. Quay lại bước 2 (Form cấu hình);
    endif
  end

  lane "Hệ thống (System)"
    :2. Kiểm tra số dư AI Credits;
    if (Đủ Credit?) then (Đủ)
       :2a. Hiển thị Modal Cấu hình (AiConversionModal);
    else (Thiếu)
       :2b. Thông báo hết Credit và điều hướng sang Store;
       stop
    endif
    :6. Trừ 1 AI Credit của User;
    :7. Hiển thị Modal Xử lý (AiProcessingModal);
    :8. Gửi yêu cầu đến Gemini API (Google GenAI);
    if (10. API trả về thành công?) then (Có)
      :11. Nhận dữ liệu (Base64 ảnh hoặc Link video);
      :12. Ẩn Modal Xử lý, Hiển thị Modal Kết quả (AiResultModal);
      :15a. Cập nhật URL ảnh/video vào đối tượng Chapter;
    else (Lỗi)
      :10a. Hoàn lại 1 AI Credit;
      :10b. Hiển thị thông báo lỗi;
    endif
  end
```

---

### 8. Quy trình Mua Xu và Vật phẩm

Mô tả quy trình nạp tiền và mua sắm trong ứng dụng.

```mermaid
activityDiagram
  title Sơ đồ Hoạt động: Mua Xu và Vật phẩm

  lane "Người dùng (Actor)"
    start
    fork
      :1. Truy cập trang Nạp Xu (CoinShopView);
      :2. Chọn một gói Xu;
      :5. Tại trang Thanh toán, chọn phương thức (Thẻ/Ví);
      :6. Nhập thông tin thanh toán;
      :7. Nhấn nút "Thanh toán";
      :10. Nhận thông báo "Nạp thành công";
    fork again
      :12. Truy cập Cửa hàng (StoreView);
      :13. Chọn gói AI Credit (1, 5 hoặc 10);
      :14. Nhấn nút "Mua";
      :16. Nhấn "OK" trên hộp thoại xác nhận;
      :19. Nhận thông báo "Mua thành công";
    end fork
    stop
  end

  lane "Hệ thống (System)"
    if (Mua Xu) then
      :3. Chuyển đến trang Thanh toán (PaymentView);
      :4. Hiển thị thông tin gói đã chọn;
      :8. Giả lập xử lý giao dịch;
      :9. Cộng số Xu tương ứng vào tài khoản User;
      :9a. Chuyển hướng về trang Shop;
    else (Mua Item)
      :15. Kiểm tra số dư Xu của User;
      if (17. Đủ Xu?) then (Đủ)
        :18. Trừ Xu, Cộng AI Credit vào tài khoản;
        :18a. Cập nhật hiển thị số dư mới;
      else (Thiếu)
        :17a. Hiển thị Alert "Không đủ Xu";
        :17b. Gợi ý nạp thêm;
      endif
    endif
  end
```
