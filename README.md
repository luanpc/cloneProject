# install axios to request API
# install node sass to write scss
# install bootstrap
# install redux to store states
# install Slider Carousel To Scroll Screen

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
