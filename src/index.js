import data from './data';
import './util';
import './style.css';

(function () {
    let app = document.querySelector('#app');
    data.forEach((line, idx) => {
        let eleLine = document.createElement('div');
        eleLine.addClass('line');
        line.forEach(item => {
            let eleItem = document.createElement('div');
            eleItem.addClass('item');
            if (!item.hide) {
                eleItem.innerText = item.value;
            }
            eleLine.appendChild(eleItem);
        });
        app.appendChild(eleLine);
    })
})();