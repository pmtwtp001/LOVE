# 三版落地頁架構（同一專案、同一套報名後台）

## 網址對照

| 版本 | 訴求 | 檔案 | 上線網址（GitHub Pages） |
|------|------|------|---------------------------|
| **A 主力** | 恐懼／需求：預防失智 | `a/index.html` | `https://pmtwtp001.github.io/LOVE/a/` |
| **B** | 權威／故事：失智可以改變嗎 | `b/index.html` | `https://pmtwtp001.github.io/LOVE/b/` |
| **C** | 價值顛覆：大腦保養 | `c/index.html` | `https://pmtwtp001.github.io/LOVE/c/` |

根目錄 `https://pmtwtp001.github.io/LOVE/` **沒有** `index.html`（會 404）。對外只投放 `/a/`、`/b/`、`/c/`。

三版**主內容**只有：主標 + `data/page-a|b|c/` 的 `topN`～`top11` 長圖 + 報名表（已移除三頁共用舊模板區塊）。`script.js` 會依 `data-page-variant` 強制 hero 圖載入對應資料夾。

**重要：** 三資料夾內的 `.jpg` 必須是**不同檔案**才會看起來不同；若三邊放同一張圖，畫面仍會一樣。換圖後 `git push` 才會上線。

三頁共用：`styles.css`、`script.js`、`translations.js`、同一個 `GOOGLE_SCRIPT_URL`（Google Sheet / 郵件邏輯不變）。

---

## 資料夾結構

```text
Love/
├── a/index.html            # A 版 → /LOVE/a/
├── b/index.html            # B 版 → /LOVE/b/
├── c/index.html            # C 版 → /LOVE/c/
├── styles.css
├── script.js
├── translations.js
└── data/
    ├── shared/             # 全站共用素材
    │   ├── med.jpg         # 預設分享預覽（可改）
    │   └── README.md
    ├── page-a/             # A 版圖片（依 top 順序）
    │   ├── topN.jpg        # 首屏 CTA → 開報名
    │   ├── top1.jpg … top11.jpg
    │   ├── share.jpg       # 選填：A 版專用 OG 圖
    │   └── README.md
    ├── page-b/             # B 版（媒體、故事、巫奉約）
    │   ├── topN.jpg …
    │   └── README.md
    └── page-c/             # C 版（大腦保養價值，後段才揭露價格）
        ├── topN.jpg …
        └── README.md
```

**規則：** 每一版各自用 `top1`、`top2`… 編號，只改該版資料夾內檔案，不會蓋到其他版。  
**影片：** 可放 `page-x/video-01.mp4` 或在 HTML 裡把某張 `top4.jpg` 包成 YouTube 連結（與現有 `index` 相同做法）。

---

## 各版文案定位（HTML 內 `page-variant-headline`）

### A 版｜`a/index.html`｜`data/page-a/`

- **主標：** 你害怕的，可能不是變老。是有一天，忘了自己最愛的人。
- **目的：** 冷流量、預防失智、最高轉換（主力投放）
- **關鍵字：** 預防失智、及早開始、未來的自己
- **表單隱藏欄：** `落地頁版本` = `A-預防失智`

### B 版｜`b/index.html`｜`data/page-b/`

- **主標：** 失智，只能一路退化嗎？
- **目的：** 巫奉約經歷、書籍、媒體、課程成果 → 建立信任
- **關鍵字：** 巫奉約、方法、真實經歷、證據
- **表單隱藏欄：** `落地頁版本` = `B-權威故事`

### C 版｜`c/index.html`｜`data/page-c/`

- **主標：** 我們保養皮膚、鍛鍊身體，卻常常忘了保養大腦。
- **目的：** 重新定義大腦保養價值；**前面不露價**，後段再揭露 2 小時 NT$3,600
- **關鍵字：** 大腦保養、健康老化、投資自己
- **表單隱藏欄：** `落地頁版本` = `C-大腦保養`

---

## 換圖工作流程

1. 確認要改哪一版 → 只開 `data/page-a` / `page-b` / `page-c`。
2. 依頁面由上到下對照 `topN.jpg`、`top1.jpg`… 替換檔案（檔名不變、只換內容）。
3. `git add` → `commit` → `push` → 等 GitHub Pages 1～2 分鐘更新。

---

## 後台（選做）

若要在 Google Sheet 區分來源，新增一欄（例如 **K 落地頁版本**），Apps Script `appendRow` 寫入表單的 `落地頁版本`。  
目前表單已帶此欄位，Sheet 與 Script 尚未擴欄時，欄位仍會隨 POST 送出（可在 Script 日誌看到）。

---

## 廣告／追蹤建議

- A：`https://pmtwtp001.github.io/LOVE/a/?ref=xxx`  
- B：`https://pmtwtp001.github.io/LOVE/b/?ref=xxx`  
- C：`https://pmtwtp001.github.io/LOVE/c/?ref=xxx`  

`ref` 仍走既有推廣代碼邏輯（`script.js`）。
