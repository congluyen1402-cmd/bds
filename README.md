# Hệ Thống Quản Trị - [Tên Thương Hiệu]

Chào mừng bạn đến với hệ thống quản trị (Admin Dashboard) của [Tên Thương Hiệu]. Hệ thống được thiết kế tối giản, dễ sử dụng trên cả máy tính và điện thoại.

## Dành Cho Quản Trị Viên (Owner / Manager)

### 1. Cách Thêm Bất Động Sản (Listing) Mới
1. Truy cập vào menu **Bất động sản** ở cột bên trái.
2. Bấm nút **+ Thêm BĐS** ở góc trên bên phải.
3. Điền các thông tin cơ bản: Tên dự án, Loại hình, Mức giá, Diện tích...
4. **Tải ảnh lên**: Kéo thả ảnh vào khu vực thư viện. Bạn có thể kéo thả để sắp xếp thứ tự ảnh. Ảnh đầu tiên sẽ làm ảnh bìa.
5. **Thẩm định pháp lý**: Tích chọn các mục đã kiểm tra (Sổ hồng, Quy hoạch...). Hệ thống sẽ tự động gắn huy hiệu "Đã thẩm định pháp lý" lên website.
6. Nhấn **Lưu & Đăng** hoặc **Lưu Nháp**.

### 2. Quản Lý Khách Hàng (CRM) & Phân Bổ Lead
1. Truy cập menu **Khách hàng (CRM)**. Bạn sẽ thấy bảng dạng cột (Kanban) thể hiện trạng thái của từng khách hàng.
2. Khi có khách hàng mới từ form website, hệ thống sẽ tự tạo thẻ ở cột **Khách Mới** và tự động gửi thông báo qua Zalo/Email.
3. Để thay đổi trạng thái (ví dụ: đã gọi điện xong), chỉ cần **kéo và thả** thẻ khách hàng đó sang cột **Đã Liên Hệ** hoặc **Hẹn Xem**.
4. Để giao khách cho chuyên viên khác, bấm vào thẻ khách hàng -> chọn **Chuyển giao** -> Chọn tên Agent.

### 3. Đặt Lịch Hẹn Xem Nhà
1. Truy cập menu **Lịch hẹn**.
2. Bấm **+ Thêm lịch hẹn**.
3. Chọn tên Khách hàng (đã có trong CRM), chọn BĐS muốn xem, và chọn Ngày/Giờ.
4. Hệ thống sẽ tự động ngăn chặn trùng lịch và gửi email/tin nhắn nhắc nhở cho khách 24h và 1h trước khi xem nhà.

---

## Dành Cho Lập Trình Viên (Technical Setup)

Dự án sử dụng: **Next.js (App Router)**, **Prisma (hiện tại dùng SQLite để chạy thử ngay, có thể đổi sang Postgres)**, **Tailwind CSS**.

### Hướng dẫn cài đặt (Step-by-step)
1. **Clone project** & di chuyển vào thư mục dự án.
2. Cài đặt thư viện: 
   ```bash
   npm install
   ```
3. Tạo file `.env` từ file mẫu:
   ```bash
   cp .env.example .env
   ```
   *(Bên trong `.env`, bạn chỉ cần khai báo biến môi trường nếu dùng Postgres hoặc Cloudinary. Mặc định Prisma đang dùng file `dev.db` cục bộ để bạn dễ test).*
4. Khởi tạo Database & Seed dữ liệu mẫu:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
5. Chạy dự án:
   ```bash
   npm run dev
   ```
6. Truy cập website tại `http://localhost:3000` và Admin tại `http://localhost:3000/admin`.
