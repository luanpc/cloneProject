- Link Home: https://luan-frontend-reactjs.herokuapp.com
- Link login: https://luan-frontend-reactjs.herokuapp.com/login
- Test
- Admin: username/password: (admin/admin)
- Bác sĩ: username/password: (luanpc@gmail.com/123456)

- install axios to request API
- install node sass to write scss
- install bootstrap
- install redux to store states
- install Slider Carousel To Scroll Screen
- install lightbox to preview images
- install React-Toastify to display notification
- install mark-down to edit text

# Các chức năng chính
1. Quản lý người dùng(admin, bác sĩ- lịch khám bệnh)
2. Quản lý phòng khám
3. Quản lý chuyên khoa
4. Quản lý bài đăng
    
- BulkCreate Sequelize( xử lý trường dữ liệu lớn): chọn nhiều Time lịch khám cùng lúc insert vào DB

==========Setting libraries =========
1. npm install --save body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1
2.  npm install --save-dev @babel/core@7.12.10 @babel/preset-env@7.12.10 
@babel/node@7.12.10 nodemon@2.0.7

==========Sequelize==============
1. Cài đặt các thư viện: sequlize-cli, sequelize và mysql2
npm install --save-dev sequelize-cli@6.2.0
npm install --save mysql2@2.2.5
npm install --save sequelize@6.6.2

2. Thêm file .sequelizerc tại thư mục root
Nội dung file .sequelizerc
const path = require('path');
module.exports = {
  'config': path.resolve('./src/config', 'config.json'),
  'migrations-path': path.resolve('./src', 'migrations'),
  'models-path': path.resolve('./src', 'models'),
  'seeders-path': path.resolve('./src', 'seeders')
}

Tại thư mục root, sử dụng câu lệnh: node_modules/.bin/sequelize init

3. Tạo model: 
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

4: Tạo migrations:
npx sequelize-cli db:migrate

5. Tạo Seeder: npx sequelize-cli seed:generate --name demo-user
	npx sequelize-cli db:seed:all

up: data
Link: https://sequelize.org/master/manual/migrations.html#running-seeds

node -v : 13.11.0

*) set before push to heroku: heroku config:set NPM_CONFIG_PRODUCTION=false
*) config Procfile: node:web server/index.js
# Link file Excel import data
https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit#gid=0
