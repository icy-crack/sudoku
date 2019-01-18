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
        line.forEach(item => {
            let eleItem = document.createElement('div');
            eleItem.classList.add('item');
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
    })
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
            })
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
                })
            }
        }
    });
    // 填写
    let eleItem = document.querySelectorAll('.item');
    eleItem.forEach(item => {
        item.addEventListener('focus', (event) => {
            item.addEventListener('keydown', (e) => {
                let keyCode = e.keyCode;
                if (keyCode > 48 && keyCode < 58) {
                    // 1 ~ 9
                    item.innerText = e.key;
                    item.setAttribute('data-value', e.key);
                } else if (keyCode == 8 || keyCode == 127) {
                    // 删除
                    item.innerText = '';
                    item.setAttribute('data-value', '');
                } 
            })  
        });
        item.addEventListener('blur', () => {
            // 解除事件绑定
        })
    })
})();