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
    
    // 工具
    let app = document.querySelector('#app');
    let tools = document.querySelector('.tools');
    let btnCheck = document.querySelector('.btn-check');
    let btnSubmit = document.querySelector('.btn-submit');
    let btnTips = document.querySelector('.btn-tips');
    let Items = Array.prototype.slice.call(document.querySelectorAll('.item'), 0);
    let itemNeedFilled = Items.filter(item => {
        return !item.hasClass('static');
    });

    let checked = false;
    let switchTips = false;

    // 清除检查样式
    function clearCheck () {
        btnCheck.classList.remove('pressed');
        Items.forEach(item => {
            item.classList.remove('invalid');
        });
    }

    function getSetK (line, col) {
        return Math.floor(line / 3) * 3 + Math.floor(col / 3);
    }
    // 获取当前matrix
    function formatMatric () {
        let arr = [];
        let lines = Array.prototype.slice.call(document.querySelectorAll('.line'));
        lines.map(line => {
            let cols = Array.prototype.slice.call(line.querySelectorAll('.item'));
            let data = cols.map(item => {
                return item.dataset.value - 0 || 0;
            });
            arr.push(data);
        });
        return arr;
    }
    // 计算所有 填写单元格 的可填数字
    function getAllTips () {
        let matrix = formatMatric();
        itemNeedFilled.forEach(item => {
            let line = item.dataset.line;
            let col = item.dataset.col;
            let data = getValidNum(matrix, line, col);
            item.setAttribute('data-valid', data.join(','));
        });
    }
    // 单元格可填写的数字
    function getValidNum(matrix, line, col) {
        let set = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        let k = getSetK(line, col);
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (matrix[i] && matrix[i][j]) {
                    let k = getSetK(i, j);
                    set[k][matrix[i][j]] = 1;
                } else {
                    break;
                }
            }
        }
        let excludeArr = [];
        for (let l = 0; l < 9; l++) {
            excludeArr.push(matrix[l][col]);
        }
        for (let c = 0; c < 9; c++) {
            excludeArr.push(matrix[line][c]);
        }
        for (let key in set[k]) {
            if (set[k][key]) {
                excludeArr.push(key - 0);
            }
        }
        excludeArr = Array.from(new Set(excludeArr));
        return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => {
            return !excludeArr.includes(item);
        })
    }

    // 填写
    Items.forEach(item => {
        function keydownHandle (e) {
            if (checked) {
                clearCheck();
                checked = false;
            }
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
            if (switchTips) {
                getAllTips();
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

    app.addEventListener('mousemove', (event) => {
        let target = event.target;
        let tips = target.dataset.valid || '';
        if (switchTips) {
            document.querySelector('.tips-arr span').innerText = tips;
        }
    })

    tools.addEventListener('click', function (event) {
        let target = event.target;
        if (target == btnCheck) {
            // 检查填写
            if (checked) {
                clearCheck();
                checked = false;
                return;
            }
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
            } else {
                checked = true;
                btnCheck.classList.add('pressed');
            }
        } else if (target == btnSubmit) {
            if (checked) {
                clearCheck();
                checked = false;
            }
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
        } else if (target == btnTips) {
            // 开启提示
            switchTips = !switchTips;
            if (switchTips) {
                btnTips.classList.add('pressed');
                getAllTips();
                document.querySelector('.tips-arr').classList.remove('hide');
            } else {
                btnTips.classList.remove('pressed');
                document.querySelector('.tips-arr').classList.add('hide');
            }
        }
    });
})();
