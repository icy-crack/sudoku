import data from './data';
import './util';
import './style.css';

(function () {
    // init sudoku
    let app = document.querySelector('#app');
    let cnt = 1;
    data.forEach((line, idx) => {
        let eleLine = document.createElement('div');
        eleLine.classList.add('line');
        line.forEach((item, col) => {
            let eleItem = document.createElement('div');
            eleItem.classList.add('item');
            eleItem.setAttribute('data-line', idx);
            eleItem.setAttribute('data-col', col);
            if (!item.hide) {
                eleItem.innerText = item.value;
                eleItem.setAttribute('data-value', item.value);
                eleItem.classList.add('static');
            } else {
                eleItem.setAttribute('tabindex', cnt++);
            }
            eleLine.appendChild(eleItem);
        });
        app.appendChild(eleLine);
    });
})();

(function () {
    let eleNums = document.querySelector('.tool-nums');
    // 锁定数字
    eleNums.addEventListener('click', (event) => {
        let target = event.target;
        const findValue = target.innerText;
        
        let tipnumArr = document.querySelectorAll('.num');
        let numArr = document.querySelectorAll('.item');

        if (target.hasClass('active')) {
            // 取消提示
            target.classList.remove('active');
            numArr.forEach(item => {
                item.classList.remove('tips');
            });
            numArr.forEach(item => {
                item.classList.remove('tips');
            });
        } else {
            // 添加提示
            tipnumArr.forEach(tip => {
                tip.classList.remove('active');
            });
            target.classList.add('active');
            if (findValue) {
                numArr.forEach(item => {
                    if (item.dataset.value == findValue) {
                        item.classList.add('tips');
                    } else {
                        item.classList.remove('tips');
                    }
                });
            }
        }
    });
    // 填写
    let eleItem = document.querySelectorAll('.item');
    eleItem.forEach(item => {
        function keydownHandle (e) {
            const keyCode = e.keyCode;
            if (keyCode > 48 && keyCode < 58) {
                // 1 ~ 9
                item.innerText = e.key;
                item.setAttribute('data-value', e.key);
            } else if (keyCode == 8 || keyCode == 127) {
                // 删除
                item.innerText = '';
                item.setAttribute('data-value', '');
            } 
        }
        item.addEventListener('focus', (event) => {
            item.addEventListener('keydown', keydownHandle); 
        });
        item.addEventListener('blur', () => {
            // 解除事件绑定
            item.removeEventListener('keydown', keydownHandle);
        });
    });

    // 工具
    let tools = document.querySelector('.tools');
    let btnCheck = document.querySelector('.btn-check');
    let btnSubmit = document.querySelector('.btn-submit');
    let Items = Array.prototype.slice.call(document.querySelectorAll('.item'), 0);

    let checked = false;
    tools.addEventListener('click', function (event) {
        let target = event.target;
        if (target == btnCheck) {
            // 检查填写
            if (checked) {
                checked = false;
                Items.forEach(item => {
                    item.classList.remove('invalid');
                });
                return;
            }
            checked = true;
            let itemNeedCheck = Items.filter(item => {
                return !item.hasClass('.static') && item.dataset.value;
            });
            let allRight = true;
            itemNeedCheck.forEach(item => {
                const { line, col, value} = item.dataset;
                const d = data[line][col];
                if (d.hide && d.value != value) {
                    // 填写错了
                    allRight = false;
                    item.classList.add('invalid');
                } 
            });
            if (allRight) {
                window.Toast.info('暂无错误');
            }
        } else if (target == btnSubmit) {
            let allRight = true;
            Items.some(item => {
                const { line, col, value} = item.dataset;
                const d = data[line][col];
                if (d.value != value) {
                    allRight = false;
                    return true;
                }
            });
            if (allRight) {
                window.Toast.info('恭喜你！');
            } else {
                window.Toast.info('回答有误，再检查检查');
            }
        }
    });
})();
