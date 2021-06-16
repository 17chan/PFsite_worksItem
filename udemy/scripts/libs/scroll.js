class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px 0px",
            threshold: 0, //←はいりはじめると変化    1←出終わるときに変化
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // const ta = new TextAnimation(entry.target);
                    // ta.animate();
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };

        this.io = new IntersectionObserver(callback.bind(this), this.options);
        this.io.POLL_INTERVAL = 110;    //ms
        this.els.forEach(el => this.io.observe(el));
    }
    destroy() {
        this.io.disconnect();
    }
}