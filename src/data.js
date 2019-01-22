Array.prototype.remove = function (val) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] != val) {
            arr.push(this[i]);
        }
    }
    return arr;
}
const allNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function getSudoku () {
    let matrix = [];
    let validMatrix = [];

    // 随机生成第一行数
    let tmpArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 8; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [tmpArr[i], tmpArr[random]] = [tmpArr[random], tmpArr[i]];
    }
    matrix.push(tmpArr);
    validMatrix.push([[], [], [], [], [], [], [], [], []]); // 第一行不需要收集有效数字
    let curLine = 1, curCol = 0;
    while (!(matrix[8] && matrix[8][8])) {
        if (!matrix[curLine]) {
            // 新建一行
            matrix.push([]);
            validMatrix.push([]);
        }
        if (!validMatrix[curLine][curCol]) {
            // 第一次计算该格子有效数
            let validNums = getValidNums(matrix, curLine, curCol);
            let len = validNums.length;
            if (len == 0) {
                // 没有可选值，回退，刷新上个格子的validNums
                validMatrix[curLine][curCol] = null;
                matrix[curLine][curCol] = null;
                curLine = curCol == 0 ? curLine - 1 : curLine;
                curCol = curCol == 0 ? 8 : curCol - 1;
                let value = matrix[curLine][curCol];
                validMatrix[curLine][curCol] = validMatrix[curLine][curCol].remove(value);
            } else {
                // 有可选值，随机选一个
                validMatrix[curLine][curCol] = validNums;
                matrix[curLine][curCol] = validNums[Math.floor(Math.random() * len)];
                curLine = curCol == 8 ? curLine + 1 : curLine;
                curCol = (curCol + 1) % 9;
            }
        } else {
            let validNums = validMatrix[curLine][curCol];
            let len = validNums.length;
            if (len == 0) {
                // 没有可选值，回退
                validMatrix[curLine][curCol] = null;
                matrix[curLine][curCol] = null;
                curLine = curCol == 0 ? curLine - 1 : curLine;
                curCol = curCol == 0 ? 8 : curCol - 1;
                let value = matrix[curLine][curCol];
                validMatrix[curLine][curCol] = validMatrix[curLine][curCol].remove(value);
            } else {
                matrix[curLine][curCol] = validNums[Math.floor(Math.random() * len)];
                curLine = curCol == 8 ? curLine + 1 : curLine;
                curCol = (curCol + 1) % 9;
            }
        }
    }
    return matrix;
}

function getSetK (line, col) {
    return Math.floor(line / 3) * 3 + Math.floor(col / 3);
}
function getValidNums (matrix, line, col) {
    let set = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    let s = getSetK(line, col);
    
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
    for (let l = 0; l < line; l++) {
        excludeArr.push(matrix[l][col]);
    }
    for (let c = 0; c < col; c++) {
        excludeArr.push(matrix[line][c]);
    }
    for (let key in set[s]) {
        if (set[s][key]) {
            excludeArr.push(key - 0);
        }
    }

    excludeArr = Array.from(new Set(excludeArr));
    return allNum.filter(item => {
        return !excludeArr.includes(item);
    });
}

let t1 = Date.now();
console.log(Date.now() - t1);
let matrix = getSudoku();
console.log('result: ', matrix);

let data = [];
let p = 34; // 出现填空的概率
data = matrix.map((line) => {
    return line.map(col => {
        let isHide = Math.floor(Math.random() * 100) < p;
        return {
            value: col,
            hide: isHide
        }
    })
});
export default data;