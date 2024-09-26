// ==UserScript==
// @name        BulkDP Buttons in Page
// @namespace   https://example.com
// @version     2.2
// @description Open specific link in the current page
// @match        https://wfm-web.hkt.com/wfm/wm/JobBulkExchDPView.action?*
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action?*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @author       Laco
// @icon	     https://www.clipartmax.com/png/full/269-2695857_cat-icons-cat-face-icon-png.png
// ==/UserScript==

(function() {
    'use strict';

    // 定義要打開的外部鏈接和登錄所需的參數
    const targetUrl = "https://wfm-web.hkt.com/wfm/wm/JobBulkExchDPCheck.action";
    const loginUrl = "https://iauth.hkt.com/auth/realms/iSSO/login-actions/authenticate";
    const loginParams = {
        session_code: "qIxx60AZtPdLd0TYsrH1G1V6K440cL_ADafI-p9J_pk",
        execution: "85959aa5-6b18-46c8-8d54-8d98e24c8ad1",
        client_id: "fswfm",
        tab_id: "WkhG4wHk3w4",
        username: "01503275",
        password: "Password0088"
    };

    // 添加浮動按鈕的 CSS 樣式
    GM_addStyle(`
        #external-link-button {
            position: fixed;
            bottom: 20px;
            left: 140px;
            background-color: #4CAF50;
            color: white;
            padding: 8px 16px;
            border: none;
            cursor: pointer;
            z-index: 9999;
            border-radius: 5px; /* 設置 5px 的圓角 */
        }
    `);

    // 創建浮動按鈕元素
    const button = document.createElement("button");
    button.id = "external-link-button";
    button.textContent = "Bulk ExchDP";

    // 添加按鈕點擊事件處理程序
    button.addEventListener("click", () => {
        console.log("Button clicked");

        // 首先, 使用 POST 請求登錄
        GM_xmlhttpRequest({
            method: "POST",
            url: loginUrl,
            data: new URLSearchParams(loginParams).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                console.log("Login response received");

                // 如果登錄成功, 選擇所有 JOB ID 複選框並點擊 "Bulk ExchDP" 按鈕
                if (response.status === 200) {
                    console.log("Login successful");

                    // 選擇所有 JOB ID 複選框
                    const checkboxes = document.querySelectorAll("input[type='checkbox'][name^='ck_']");
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = true;
                    });

                    // 點擊 "Bulk ExchDP" 按鈕
                    const bulkExchDPButton = document.querySelector("input[type='button'][value='Bulk ExchDP']");
                    if (bulkExchDPButton) {
                        bulkExchDPButton.click();

                        // 監聽新頁面的加載
                        window.addEventListener("load", function() {
                            // 獲取新頁面的 URL
                            const newPageUrl = window.location.href;

                            // 解析 URL 中的 jobId 和 keyList 參數
                            const urlParams = new URLSearchParams(newPageUrl);
                            const jobId = urlParams.get("jobId");
                            const keyList = urlParams.get("keyList");

                            // 在這里添加處理新頁面的邏輯
                            console.log("New page loaded, jobId:", jobId, ", keyList:", keyList);
                            // 在這里編寫獲取或操作新頁面內容的代碼
                        });
                    } else {
                        console.error("'Bulk ExchDP' button not found");
                    }
                } else {
                    console.error("Login failed");
                }
            },
            onerror: function(error) {
                console.error("Error:", error);
            }
        });
    });

    // 將按鈕添加到網頁中
    document.body.appendChild(button);
})();

//自動化填入EXCHDP

// 查找頁面上所有的 <tr> 標籤
const trElements = document.querySelectorAll("tr");

// 遍歷這些 <tr> 標籤,找到第6個和第7個 <td> 標籤中的 <span>
let exchIdSpan, dpNoSpan;
for (const tr of trElements) {
    const tdElements = tr.querySelectorAll("td");
    if (tdElements.length >= 6) {
        exchIdSpan = tdElements[5].querySelector("span");
    }
    if (tdElements.length >= 7) {
        dpNoSpan = tdElements[6].querySelector("span");
    }
}

// 獲取 Exch ID 和 DP No 的值
let exchId, dpNo;
if (exchIdSpan) {
    exchId = exchIdSpan.textContent.trim();
} else {
    console.error("Exch ID span not found");
}
if (dpNoSpan) {
    dpNo = dpNoSpan.textContent.trim();
} else {
    console.error("DP No span not found");
}

// 查找頁面上所有的 <input> 元素
const allInputs = document.querySelectorAll("input");

// 遍歷這些輸入框元素,找到 "exchId" 和 "dpNo" 名稱的輸入框
let exchIdInput, dpNoInput;
for (const input of allInputs) {
    if (input.name === "exchId") {
        exchIdInput = input;
    } else if (input.name === "dpNo") {
        dpNoInput = input;
    }
}

// 如果找到了 Exch ID 和 DP No 輸入框
if (exchIdInput && dpNoInput) {
    // 自動填寫 Exch ID 和 DP No
    exchIdInput.value = exchId || "";
    dpNoInput.value = dpNo || "";
} else {
    console.error("Failed to find Exch ID and DP No input fields");
}

 // 添加一些樣式以確保按鈕在小屏幕上也能正常顯示
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .select-deselect-all-button {
                bottom: 10px;
                right: 10px;
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 16px;
            }
        }
    `;
    document.head.appendChild(style);
