// ==UserScript==
// @name         Select/Deselect All Buttons
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Adds floating "Select All" and "Deselect All" buttons
// @author       Laco
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action?*
// @match        https://wfm-web.hkt.com/wfm/wm/JobBulkExchDPView.action?*
// @match        https://wfm-web.hkt.com/wfm/rm/fieldschedule/FieldSchedule.action
// @icon         https://cdn-icons-png.freepik.com/256/6988/6988878.png?semt=ais_hybrid
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 創建 "Select/Deselect All" 按鈕
    const selectDeselectAllButton = document.createElement('button');
    selectDeselectAllButton.classList.add('btn', 'btn-secondary', 'select-deselect-all-button');
    selectDeselectAllButton.style.position = 'fixed';
    selectDeselectAllButton.style.bottom = '20px';
    selectDeselectAllButton.style.left = '20px';
    selectDeselectAllButton.style.backgroundColor = '#007bff';
    selectDeselectAllButton.style.color = '#fff';
    selectDeselectAllButton.style.borderRadius = '5px';
    selectDeselectAllButton.style.padding = '6px 12px';
    selectDeselectAllButton.style.fontSize = '16px';
    selectDeselectAllButton.style.zIndex = '9999';

    let allChecked = false;
    selectDeselectAllButton.textContent = 'Select All';
    selectDeselectAllButton.style.backgroundColor = '#007bff'; // 初始為藍色
    selectDeselectAllButton.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
        });
        allChecked = !allChecked;
        selectDeselectAllButton.textContent = allChecked ? 'Deselect All' : 'Select All';
        selectDeselectAllButton.style.backgroundColor = allChecked ? '#6c757d' : '#007bff'; // 切換按鈕顏色
                selectDeselectAllButton.classList.add('flashing'); // 添加閃爍效果
        setTimeout(() => {
            selectDeselectAllButton.classList.remove('flashing'); // 0.5秒後移除閃爍效果
        }, 500);
    });


    document.body.appendChild(selectDeselectAllButton);

    // 添加閃爍效果的 CSS 樣式
    // 添加一些樣式以確保按鈕在小屏幕上也能正常顯示
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        .flashing {
            animation: flash 1s ease-in-out;
        }
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
})();