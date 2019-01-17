const data = [[
    { value: 1, hide: 0 },
    { value: 7, hide: 0 },
    { value: 2, hide: 1 },
    { value: 4, hide: 0 },
    { value: 5, hide: 0 },
    { value: 8, hide: 0 },
    { value: 3, hide: 0 },
    { value: 6, hide: 0 },
    { value: 9, hide: 1 },
], [
    { value: 8, hide: 0 },
    { value: 5, hide: 0 },
    { value: 4, hide: 0 },
    { value: 6, hide: 0 },
    { value: 3, hide: 0 },
    { value: 9, hide: 1 },
    { value: 1, hide: 0 },
    { value: 2, hide: 0 },
    { value: 7, hide: 1 },
], [
    { value: 3, hide: 0 },
    { value: 6, hide: 1 },
    { value: 9, hide: 0 },
    { value: 7, hide: 0 },
    { value: 1, hide: 1 },
    { value: 2, hide: 0 },
    { value: 4, hide: 0 },
    { value: 5, hide: 1 },
    { value: 8, hide: 0 },
], [
    { value: 4, hide: 0 },
    { value: 1, hide: 0 },
    { value: 7, hide: 0 },
    { value: 5, hide: 1 },
    { value: 9, hide: 0 },
    { value: 6, hide: 0 },
    { value: 8, hide: 1 },
    { value: 3, hide: 1 },
    { value: 2, hide: 1 },
], [
    { value: 6, hide: 0 },
    { value: 2, hide: 0 },
    { value: 3, hide: 0 },
    { value: 8, hide: 0 },
    { value: 7, hide: 1 },
    { value: 1, hide: 0 },
    { value: 9, hide: 1 },
    { value: 4, hide: 1 },
    { value: 5, hide: 0 },
], [
    { value: 9, hide: 1 },
    { value: 8, hide: 1 },
    { value: 5, hide: 1 },
    { value: 3, hide: 1 },
    { value: 2, hide: 1 },
    { value: 4, hide: 1 },
    { value: 7, hide: 0 },
    { value: 1, hide: 1 },
    { value: 6, hide: 1 },
], [
    { value: 5, hide: 0 },
    { value: 3, hide: 0 },
    { value: 6, hide: 1 },
    { value: 9, hide: 0 },
    { value: 4, hide: 0 },
    { value: 7, hide: 0 },
    { value: 2, hide: 0 },
    { value: 8, hide: 0 },
    { value: 1, hide: 1 },
], [
    { value: 7, hide: 1 },
    { value: 4, hide: 1 },
    { value: 1, hide: 1 },
    { value: 2, hide: 0 },
    { value: 8, hide: 1 },
    { value: 5, hide: 1 },
    { value: 6, hide: 1 },
    { value: 9, hide: 0 },
    { value: 3, hide: 0 },
], [
    { value: 2, hide: 1 },
    { value: 9, hide: 1 },
    { value: 8, hide: 0 },
    { value: 1, hide: 0 },
    { value: 6, hide: 0 },
    { value: 3, hide: 1 },
    { value: 5, hide: 1 },
    { value: 7, hide: 1 },
    { value: 4, hide: 1 },
]];

export default data;

let matrix = [];
// 随机生成第一行数
const allNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let tmpArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 8; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [tmpArr[i], tmpArr[random]] = [tmpArr[random], tmpArr[i]];
}
matrix.push(tmpArr);
let cnt = 0;
while (matrix.length < 9) {
    cnt++;
    if (cnt > 10000 && matrix.length > 1) {
        cnt = 0;
        matrix.pop();
    }
    let arr = [];
    let curLine = matrix.length;
    matrix.push(arr);
    for (let i = 0; i < 9; i++) {
        let n = getRandomNum(curLine, i);
        if (!n) {
            // 此次随机选数失败，重新开始
            matrix[curLine] = [];
            break;
        }
        matrix[curLine].push(n);
    }
    if (matrix[curLine].length !== 0) {
		cnt = 0;
    } else {
		matrix.pop();
	}
}

console.log(matrix);

function getSetK (line, col) {
    return Math.floor(line / 3) * 3 + Math.floor(col / 3);
}
function getValidNum (line, col) {
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
    for (let l = 0; l < line; l++) {
        excludeArr.push(matrix[l][col]);
    }
    for (let c = 0; c < col; c++) {
        excludeArr.push(matrix[line][c]);
    }
    for (let key in set[k]) {
        if (set[k][key]) {
            excludeArr.push(key - 0);
        }
    }

    excludeArr = Array.from(new Set(excludeArr));
    return allNum.filter(item => {
        return !excludeArr.includes(item);
    })
}
function getRandomNum (line, col) {
    let validArr = getValidNum(line, col);
    if (validArr.length > 0) {
        return validArr[Math.floor(Math.random() * (validArr.length + 1))];
    }
    return 0;
}
