Element.prototype.hasClass = function (cls) {
    return [...this.classList].includes(cls);
}

window.Toast = {
    style: 'position:fixed; left: 50%; top:50%; color: #fff; background: rgba(0,0,0,0.6);border-radius: 6px;padding: 12px; transform:translate(-50%, -50%)',
    info: (function (options) {
        let timer = null;
        return function (options) {
            if (typeof options == 'string') {
                options = {
                    content: options,
                    duration: 1500
                };
            }
            let eleMsg = document.querySelector('.toast');
            if (eleMsg) {
                document.body.removeChild(eleMsg);
                clearTimeout(timer);
            }
            let { content, duration } = options;
            eleMsg = document.createElement('div');
            eleMsg.classList.add('toast');
            eleMsg.innerText = content;
            document.body.appendChild(eleMsg);
            eleMsg.style = this.style;
            timer = setTimeout(() => {
                document.body.removeChild(eleMsg);
            }, duration);
        }
    })()
};