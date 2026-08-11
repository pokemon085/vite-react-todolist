# 📝 React + TypeScript + ECharts 待辦事項清單 (TodoList)

這是一個結合了**待辦事項管理 (TodoList)** 與**圓餅圖統計圖表**的網頁應用程式。

除了具備基本的「新增任務」、「刪除任務」和「切換完成狀態」功能外，還加入了**關鍵字搜尋**、**空白或重複任務的提示彈窗**，並透過 **ECharts 圖表**即時呈現進行中與已完成的任務比例，所有數據皆會自動儲存於瀏覽器的 `localStorage` 中，即使關閉網頁也不會遺失。

---

## 🚀 核心功能特色

- **⚡ 技術開發**：使用 **React 19** + **TypeScript** + **Vite** 提供極速的開發與網頁載入體驗。
- **📋 待辦清單管理**：支援新增任務、勾選標記完成/進行中、刪除任務。
- **🔍 篩選與搜尋**：
  - **狀態切換**：可依「全部」、「進行中」、「已完成」狀態篩選顯示的任務。
  - **關鍵字搜尋**：輸入關鍵字即時過濾任務內容。
- **📊 數據視覺化 (ECharts)**：整合 ECharts，將已完成與進行中的任務比例即時繪製成圓餅圖，掌握完成進度。
- **💾 自動存檔 (LocalStorage)**：自動將任務儲存於瀏覽器，重開網頁數據依然保留。
- **⚠️ 貼心提示彈窗**：輸入空白內容或重複的任務時，會彈出錯誤提示，防止重複輸入。

---

## 🛠️ 技術棧與工具

- **前端框架**：[React 19](https://react.dev/) (TSX)
- **程式語言**：[TypeScript](https://www.typescriptlang.org/)
- **建置工具**：[Vite](https://vitejs.dev/)
- **樣式處理**：[Sass / SCSS](https://sass-lang.com/)
- **圖表套件**：[ECharts](https://echarts.apache.org/) & [echarts-for-react](https://github.com/hustcc/echarts-for-react)
- **程式碼檢查與格式化**：[Oxlint](https://oxc.rs/) & [Prettier](https://prettier.io/)

---

## 📂 專案目錄結構

```text
src/
├── components/          # 共用組件
│   ├── NoData/          # 暫無數據時的顯示畫面
│   ├── NotifyPopup/     # 警告提示彈窗
│   ├── PieChart/        # ECharts 圓餅圖統計圖表
│   └── Search/          # 關鍵字搜尋欄位
├── pages/
│   └── TodoList/        # 待辦事項清單主頁面 (包含排版與邏輯)
├── type/                # TypeScript 型別定義檔
├── App.tsx              # 應用程式入口組件
├── main.tsx             # 專案渲染起點
└── index.css            # 全域基礎樣式
```

---

## ⚙️ 快速啟動指南

### 1. 安裝套件

在專案根目錄下執行以下指令安裝所需套件：

```bash
npm install
```

### 2. 啟動開發伺服器

啟動本地端開發環境：

```bash
npm run dev
```

### 3. 專案打包

將專案編譯並打包以供部署：

```bash
npm run build
```

---

## 🧪 開發常用指令

- `npm run dev`：啟動開發模式
- `npm run build`：檢查 TypeScript 並打包專案
- `npm run lint`：使用 Oxlint 快速檢查程式碼錯誤
- `npm run format`：使用 Prettier 自動格式化排版程式碼
