<p align="center">
  <img src="https://raw.githubusercontent.com/Lianginger/expense-tracker/master/public/img/favicon.ico" alt="logo"/>
</p>

# 家庭記帳本
這是一個使用 Express + MongoDB 打造的超實用家庭記帳本，隨時幫你記錄花出去的錢，快速掌握各月份、不同類別的總花費。
👉 [Demo website](https://home-expense-tracker.herokuapp.com/)  

歡迎使用下面提供的種子帳戶登入，看看我的四月份支出吧！  
( 看看就好，登入後請別幫我增加 / 刪除我的紀錄喔~ 😉)
```
Email:ginger@mail.com
Password:123456
```
![畫面截圖](https://github.com/Lianginger/expense-tracker/blob/master/public/img/screenshot-login.png)

# 功能：
- 註冊帳號登入 / Facebook 快速登入
- 密碼使用 bcrypt 處理
- 依月份、分類別篩選支出紀錄，並計算出總金額
- 瀏覽所有支出紀錄
- 能新增 / 修改 / 刪除任何支出紀錄
  
![網站功能](https://github.com/Lianginger/expense-tracker/blob/master/public/img/screenshot-index.png)

## 安裝前提
- [MongoDB 4.0 以上](https://docs.mongodb.com/manual/installation/)
- [Node.js](https://nodejs.org/en/download/)

## 如何安裝
開啟終端機(Terminal)，Clone 這個專案
```
git clone https://github.com/Lianginger/expense-tracker.git
```
進入檔案夾，並下載所有相依套件
```
cd expense-tracker
npm install
```
## 啟動伺服器
執行 app.js 檔案
```
node app.js
```
當終端機(Terminal)出現以下字樣
```
The Express server is running
Mongodb is connected!
```
即表示伺服器與資料庫已啟動並連結成功，在瀏覽器輸入 [http://localhost:3000](http://localhost:3000] 就可以開始記錄支出嘍！