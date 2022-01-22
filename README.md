# install axios to request API
# install node sass to write scss
# install bootstrap
# install redux to store states
# install Slider Carousel To Scroll Screen
# install lightbox to preview images
# install React-Toastify to display notification

# Các chức năng chính
1. Quản lý người dùng(admin, bác sĩ)
2. Quản lý phòng khám
3. Quản lý chuyên khoa
4. Quản lý bài đăng

# Những kiến thức trong project
- Life cycle của React 
    + Run constructor
    + Mount/Unmount
    + Render (state thay đổi -> re-render)

- Fire event:
    + Child -> Parent : dùng props
    + Parent -> Child : dùng ref
    + 2 phía: dùng Emitter(event) (thuộc NodeJS, k thuộc ReactJS)

- Redux: Lưu trữ các state dùng cho các component # nhau, chạy song song với React
? Tại sao k lưu xuống Local storage
    + An toàn hơn
    + Hiệu năng redux cao hơn
    + Khi lưu vào redux thì tắt app thông tin biến mất
    
    *) reduxStore: nơi lưu trữ data
    *) persistor: lưu trữ 1 biến <=> localStorage
    *) Cấu trúc hoạt động:
    Component ---(fire)---> Actions --> reducers ---(Lấy data & map vào state)--> State --> Component

# Link file Excel import data
https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit#gid=0