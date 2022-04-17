# 我的餐廳清單
![image](https://github.com/coldfish5630/restaurant/blob/main/restaurant.JPG)
# 介紹
紀錄一份餐廳清單，可以瀏覽、新增、修改、刪除餐廳清單、查閱餐廳詳細資訊、連結Google Map。
# 功能
1.查閱所有已登錄餐廳  
2.點擊餐廳以檢視餐廳詳細資訊  
3.點擊詳細資訊內的地址連結可以開啟Google Map  
4.清單可依照名稱或種類進行搜尋  
5.使用者可以對餐廳資料進行新增、修改、刪除
6.使用者可以排序餐廳順序
# 開始使用
1.請確認已安裝Node.js及npm  

2.使用終端機((Terminal)將專案clone到本機位置  

``` bash
git clone https://github.com/coldfish5630/restaurant.git
```

3.安裝套件

```bash
npm install
```

4.在/restaurant新增.env，並設定環境變數MongoDB_URI

5.新增種子資料，看到done表示新增完成

```bash
npm run seed
```

6.完成後開啟程式

```bash
npm run start
```

7.看到下列訊息表示程式已正常開啟，請使用瀏覽器進入該網址http://localhost:3000

```bash
express is running on http://localhost:3000
mongodb connected
```

8.若要關閉程式請使用ctrl + c
# 使用工具
Node.js 16.13.0  
Express 4.16.4  
Express-Handlebars 3.0.0  
mongoose 5.13.14  
dotenv 16.0.0  
body-parser 1.20.0  
method-override 3.0.0
Bootstrap 4.3.1  
Font-awesome
