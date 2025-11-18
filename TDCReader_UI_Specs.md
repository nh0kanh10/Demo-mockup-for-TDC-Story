
# ĐẶC TẢ CHI TIẾT GIAO DIỆN NGƯỜI DÙNG (UI SPECIFICATION)
# DỰ ÁN: TDCReader - Atomic Design Breakdown

| **Mã dự án** | **TDCReader** |
| :--- | :--- |
| **Phiên bản** | **4.0 (Atomic Detail)** |
| **Ngày cập nhật** | **26/05/2024** |

Tài liệu này phân rã giao diện thành các phần tử nguyên tử (Atoms/Molecules) để đội ngũ Frontend có thể implement chính xác từng pixel và logic.

---

## 1. HEADER & NAVIGATION (GLOBAL)
*Component: `Header.tsx`*

### 1.1. Layout & Container
| ID | Tên Control | Loại | Style (Tailwind/CSS) | Hành vi / Logic |
| :--- | :--- | :--- | :--- | :--- |
| 1.1.1 | Header Wrapper | `header` | `fixed top-0 w-full bg-surface/80 backdrop-blur-sm border-b border-border-color z-40` | Luôn nổi trên cùng. |
| 1.1.2 | Main Container | `div` | `container mx-auto p-4 flex justify-between items-center gap-6` | Căn giữa nội dung. |

### 1.2. Logo Area (Left)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 1.2.1 | Logo Group | `div` | `flex items-center gap-2 cursor-pointer group` | Click: `onNavigate('home')` |
| 1.2.2 | Icon Box | `div` | `bg-primary text-white p-1.5 rounded-lg group-hover:bg-secondary transition` | Chứa SVG Logo. |
| 1.2.3 | App Name | `text` | `text-2xl font-extrabold text-primary hidden sm:block` | Text: "TDCReader" |

### 1.3. Navigation Links (Desktop)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 1.3.1 | Nav Group | `nav` | `hidden lg:flex items-center gap-1` | Ẩn trên mobile. |
| 1.3.2 | Ranking Link | `button` | `px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-text-secondary flex gap-2` | Click: `onNavigate('ranking')` |
| 1.3.3 | Community Link | `button` | (Như trên) | Click: `onNavigate('community')` |

### 1.4. Search Bar (Center)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 1.4.1 | Search Form | `form` | `flex-1 max-w-2xl hidden md:flex items-center gap-2` | Submit: Gọi `onSearch(keyword)`. |
| 1.4.2 | Search Input | `input` | `w-full bg-slate-100 rounded-l-full py-2.5 pl-10 pr-4 focus:bg-surface focus:border-primary` | Nhập từ khóa. |
| 1.4.3 | Submit Button | `button` | `bg-primary text-white px-6 py-2.5 rounded-r-full font-medium` | Text: "Tìm". |
| 1.4.4 | Adv Search Icon | `button` | `p-2.5 rounded-full hover:bg-slate-100 text-text-secondary` | Icon: `sliders`. Click: `onNavigate('advancedSearch')`. |

### 1.5. User Actions (Right)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 1.5.1 | Noti Button | `button` | `relative p-2 rounded-full hover:bg-slate-100` | Icon: `bell`. Click: `onOpenFollowing()`. |
| 1.5.2 | Noti Dot | `span` | `absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse` | Hiển thị nếu có User đăng nhập. |
| 1.5.3 | Avatar Circle | `div` | `w-10 h-10 bg-primary/20 text-primary rounded-full flex-center font-bold` | Hiển thị ký tự đầu username. |
| 1.5.4 | Login Button | `button` | `bg-primary text-white font-semibold py-2.5 px-6 rounded-full shadow-md` | Hiển thị nếu chưa login. Click: `onLogin()`. |

---

## 2. MÀN HÌNH TRANG CHỦ (NOVEL LIST VIEW)
*Component: `NovelListView.tsx`*

### 2.1. Featured Banner
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 2.1.1 | Banner Wrap | `div` | `relative rounded-2xl overflow-hidden h-[500px] cursor-pointer group` | Click: `onSelectNovel(featuredNovel)`. |
| 2.1.2 | Cover Img | `img` | `absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105` | Ảnh bìa chất lượng cao. |
| 2.1.3 | Overlay | `div` | `absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent` | Tăng độ tương phản cho text. |
| 2.1.4 | Badge | `span` | `bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded-md` | Text: "TRUYỆN NỔI BẬT". |
| 2.1.5 | Big Title | `h1` | `text-4xl md:text-6xl font-extrabold text-white` | Tên truyện. |
| 2.1.6 | CTA Button | `button` | `bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg` | Text: "Đọc Ngay". |

### 2.2. Novel Card Item (Used in Grids)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 2.2.1 | Card Container | `div` | `bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-2xl border border-border-color` | Click: `onSelectNovel(novel)`. |
| 2.2.2 | Image Box | `div` | `relative w-full pt-[150%]` | Giữ tỷ lệ khung hình 2:3. |
| 2.2.3 | Rating Tag | `div` | `absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded` | Icon `star` + Rating (e.g., 4.8). |
| 2.2.4 | Title | `h3` | `font-bold text-lg text-text-primary line-clamp-2` | Tên truyện. |
| 2.2.5 | Stats Row | `div` | `flex justify-between text-xs text-text-secondary border-t pt-3` | Icon `eye` + Views; Badge Status. |

---

## 3. MÀN HÌNH ĐỌC TRUYỆN (READER VIEW)
*Component: `ReaderView.tsx`*

### 3.1. Reader Toolbar (Floating Header)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 3.1.1 | Back Btn | `button` | `flex items-center gap-2 font-semibold hover:text-primary` | Click: `onBack`. |
| 3.1.2 | AI Toggle | `button` | `p-2 rounded-full bg-yellow-50 text-yellow-600` (if locked) | Icon `lock` hoặc `ai`. Toggle AI View. |
| 3.1.3 | Audio Btn | `button` | `p-2 rounded-full hover:bg-slate-200` | Icon `volume-2`. Click: `onPlayAudio`. |
| 3.1.4 | Settings Btn | `button` | `p-2 rounded-full hover:bg-slate-200` | Icon `settings`. Toggle Settings Panel. |

### 3.2. Settings Panel (Popup)
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 3.2.1 | Panel Box | `div` | `fixed top-20 right-4 bg-surface shadow-xl p-4 w-72 z-20` | Chứa các cài đặt. |
| 3.2.2 | Font Size Btn | `button` | `px-3 py-1 bg-slate-200 rounded` | Tăng/Giảm `fontSize`. |
| 3.2.3 | Theme Btn | `button` | `h-10 rounded-lg border-2` | Chọn Light/Dark/Sepia. |

### 3.3. Content & Paywall
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 3.3.1 | Text Container | `div` | `prose prose-lg max-w-none` | Chứa các thẻ `<p>`. |
| 3.3.2 | Paywall Box | `div` | `absolute inset-0 bg-background/80 backdrop-blur flex-col-center` | Che nội dung nếu `isVip` và chưa mua. |
| 3.3.3 | Unlock Btn | `button` | `bg-primary text-white font-bold py-3 px-8 rounded-full` | Text: "Mở khóa với X Xu". |

### 3.4. Footer Navigation
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 3.4.1 | Footer Bar | `footer` | `fixed bottom-0 w-full bg-surface/90 backdrop-blur shadow-top` | Chứa nút điều hướng. |
| 3.4.2 | Prev Btn | `button` | `bg-surface border text-text-primary rounded-full px-4 py-2` | Icon `arrow-left`. Disable nếu chương 1. |
| 3.4.3 | TOC Btn | `button` | `flex-col-center text-xs font-semibold` | Icon `list`. Mở Modal Mục lục. |
| 3.4.4 | Next Btn | `button` | `bg-primary text-white rounded-full px-4 py-2` | Icon `arrow-right`. Chuyển chương kế. |

---

## 4. DASHBOARD TÁC GIẢ (AUTHOR DASHBOARD VIEW)
*Component: `AuthorDashboardView.tsx`*

### 4.1. Dashboard Navigation
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 4.1.1 | Tab Button | `button` | `px-6 py-3 border-b-2 font-semibold` | Active: `text-primary border-primary`. Switch Tabs. |
| 4.1.2 | Create Btn | `button` | `bg-primary text-white py-3 px-6 rounded-lg shadow-md` | Text: "Đăng truyện mới". |

### 4.2. Story List Item
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 4.2.1 | Row Container | `div` | `p-4 flex items-center gap-4 hover:bg-slate-50` | Chứa thông tin 1 truyện. |
| 4.2.2 | Thumbnail | `img` | `w-16 h-24 object-cover rounded-md` | Ảnh bìa nhỏ. |
| 4.2.3 | Info Col | `div` | `flex-grow` | Tên truyện, trạng thái. |
| 4.2.4 | Stats Col | `div` | `flex gap-6 text-sm text-text-secondary` | Icons: Eye, Heart, Bookmark. |
| 4.2.5 | Edit Btn | `button` | `bg-white border hover:bg-slate-100 py-2 px-4 rounded-lg` | Text: "Quản lý". Click: `onEditNovel`. |

---

## 5. MÀN HÌNH CHỈNH SỬA TRUYỆN (EDIT STORY VIEW)
*Component: `EditStoryView.tsx`*

### 5.1. Edit Form
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 5.1.1 | Title Input | `input` | `w-full bg-background border-slate-300 rounded-lg p-3` | Sửa tên truyện. |
| 5.1.2 | Summary Area | `textarea`| `w-full bg-background border-slate-300 rounded-lg p-3` | Sửa mô tả. |

### 5.2. Chapter List Management
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 5.2.1 | Add Chapter Btn| `button` | `bg-primary text-white py-2 px-4 rounded-lg` | Mở Modal thêm chương. |
| 5.2.2 | Chapter Row | `div` | `p-4 flex justify-between hover:bg-slate-50` | Hiển thị 1 chương. |
| 5.2.3 | AI Gen Btn | `button` | `p-2 hover:bg-accent/10 text-accent rounded-full` | Icon `ai`. Mở `AiConversionModal`. |
| 5.2.4 | Edit Chap Btn | `button` | `p-2 hover:bg-slate-200 rounded-full` | Icon `edit-3`. Mở `ChapterEditModal`. |

---

## 6. AI CONVERSION MODAL
*Component: `AiConversionModal.tsx`*

### 6.1. Config Panel
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 6.1.1 | Modal Box | `div` | `bg-surface rounded-2xl max-w-4xl flex flex-col md:flex-row` | Popup chính. |
| 6.1.2 | Type Option | `button` | `p-4 rounded-xl border-2 flex-col-center` | Chọn `Comic` hoặc `Clip`. Active: `border-primary`. |
| 6.1.3 | Prompt Input | `textarea`| `w-full bg-slate-50 border rounded-lg p-3` | Nhập prompt bổ sung. |
| 6.1.4 | Submit Btn | `button` | `w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl` | Text: "Bắt đầu tạo (X Credits)". |

---

## 7. AUTH MODAL (LOGIN/REGISTER)
*Component: `AuthView.tsx`*

### 7.1. Form Controls
| ID | Tên Control | Loại | Style | Hành vi |
| :--- | :--- | :--- | :--- | :--- |
| 7.1.1 | Username Input | `input` | `w-full bg-background border-slate-300 p-3 rounded-lg` | Nhập tên đăng nhập. |
| 7.1.2 | Password Input | `input` | `w-full bg-background border-slate-300 p-3 rounded-lg` | Nhập mật khẩu (type password). |
| 7.1.3 | Action Button | `button` | `w-full bg-primary text-white font-bold py-3 rounded-lg` | Text: "Đăng nhập" / "Đăng ký". |
| 7.1.4 | Toggle Link | `button` | `text-accent hover:underline text-sm` | Chuyển đổi giữa Login/Register/Forgot. |
| 7.1.5 | Social Btn | `button` | `flex-1 bg-white border py-2 px-4 rounded-lg flex-center` | Login Google/Facebook. |

---
