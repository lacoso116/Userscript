// ==UserScript==
// @name         Deselect All Checkboxes
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds a floating "Deselect All" button in the bottom right of the page
// @author       Laco
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action?*
// @match        https://wfm-web.hkt.com/wfm/wm/JobBulkExchDPView.action?*
// @match        https://wfm-web.hkt.com/wfm/rm/fieldschedule/FieldSchedule.action
// @grant        none
// @icon         https://uxwing.com/wp-content/themes/uxwing/download/animals-and-birds/cat-icon.png
// ==/UserScript==

(function() {
    'use strict';

    // 創建 "Deselect All" 按鈕並設置樣式
    const deselectAllButton = document.createElement('button');
    deselectAllButton.textContent = 'Deselect All';
    deselectAllButton.classList.add('btn', 'btn-secondary', 'deselect-all-button');
    deselectAllButton.style.position = 'fixed';
    deselectAllButton.style.bottom = '20px';
    deselectAllButton.style.left = '20px';
    deselectAllButton.style.backgroundColor = '#6c757d';
    deselectAllButton.style.color = '#fff';
    deselectAllButton.style.zIndex = '9999';

    // 添加事件監聽器,點擊後去除所有勾選框的選中狀態
    deselectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });

    // 將 "Deselect All" 按鈕添加到網頁中
    document.body.appendChild(deselectAllButton);

    // 添加一些樣式以確保按鈕在小屏幕上也能正常顯示
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .deselect-all-button {
                bottom: 10px;
                right: 10px;
                font-size: 14px;
                padding: 6px 12px;
            }
        }
    `;
    document.head.appendChild(style);
})();
