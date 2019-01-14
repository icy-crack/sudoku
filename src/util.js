Element.prototype.hasClass = function (cls) {
    return [...this.classList].includes(cls);
}

Element.prototype.addClass = function (cls) {
    if (!this.hasClass(cls)) {
        this.className += ' ' + cls;
    }
}

Element.prototype.removeClass = function (cls) {
    if (this.hasClass(cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        this.className = this.className.replace(reg, ' ').trim();
    }
}