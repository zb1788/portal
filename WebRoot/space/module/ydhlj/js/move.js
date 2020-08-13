function move(t, n, e, r, a) {
    clearInterval(t.iTimer);
    var u = e || 1e3, i = {};
    for (var o in n)i[o] = {}, "opacity" == o ? (i[o].b = Math.round(100 * css(t, o)), i[o].c = 100 * n[o] - i[o].b) : (i[o].b = parseInt(css(t, o)), i[o].c = n[o] - i[o].b);
    var r = r || "linear", c = (new Date).getTime();
    t.iTimer = setInterval(function () {
        var e = (new Date).getTime() - c;
        e >= u && (e = u);
        for (var o in n) {
            var f = Tween[r](e, i[o].b, i[o].c, u);
            "opacity" == o ? (t.style[o] = f / 100, t.style.filter = "alpha(opacity=" + f + ")") : t.style[o] = f + "px"
        }
        e == u && (clearInterval(t.iTimer), a && a.call(t))
    }, 16)
}
function css(t, n) {
    return t.currentStyle ? t.currentStyle[n] : getComputedStyle(t, !1)[n]
}
var Tween = {
    linear: function (t, n, e, r) {
        return e * t / r + n
    }, easeIn: function (t, n, e, r) {
        return e * (t /= r) * t + n
    }, easeOut: function (t, n, e, r) {
        return -e * (t /= r) * (t - 2) + n
    }, easeBoth: function (t, n, e, r) {
        return (t /= r / 2) < 1 ? e / 2 * t * t + n : -e / 2 * (--t * (t - 2) - 1) + n
    }, easeInStrong: function (t, n, e, r) {
        return e * (t /= r) * t * t * t + n
    }, easeOutStrong: function (t, n, e, r) {
        return -e * ((t = t / r - 1) * t * t * t - 1) + n
    }, easeBothStrong: function (t, n, e, r) {
        return (t /= r / 2) < 1 ? e / 2 * t * t * t * t + n : -e / 2 * ((t -= 2) * t * t * t - 2) + n
    }, elasticIn: function (t, n, e, r, a, u) {
        if (0 === t)return n;
        if (1 == (t /= r))return n + e;
        if (u || (u = .3 * r), !a || a < Math.abs(e)) {
            a = e;
            var i = u / 4
        } else var i = u / (2 * Math.PI) * Math.asin(e / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / u)) + n
    }, elasticOut: function (t, n, e, r, a, u) {
        if (0 === t)return n;
        if (1 == (t /= r))return n + e;
        if (u || (u = .3 * r), !a || a < Math.abs(e)) {
            a = e;
            var i = u / 4
        } else var i = u / (2 * Math.PI) * Math.asin(e / a);
        return a * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - i) * Math.PI / u) + e + n
    }, elasticBoth: function (t, n, e, r, a, u) {
        if (0 === t)return n;
        if (2 == (t /= r / 2))return n + e;
        if (u || (u = .3 * r * 1.5), !a || a < Math.abs(e)) {
            a = e;
            var i = u / 4
        } else var i = u / (2 * Math.PI) * Math.asin(e / a);
        return 1 > t ? -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / u) + n : a * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / u) * .5 + e + n
    }, backIn: function (t, n, e, r, a) {
        return "undefined" == typeof a && (a = 1.70158), e * (t /= r) * t * ((a + 1) * t - a) + n
    }, backOut: function (t, n, e, r, a) {
        return "undefined" == typeof a && (a = 2.0158), e * ((t = t / r - 1) * t * ((a + 1) * t + a) + 1) + n
    }, backBoth: function (t, n, e, r, a) {
        return "undefined" == typeof a && (a = 1.70158), (t /= r / 2) < 1 ? e / 2 * t * t * (((a *= 1.525) + 1) * t - a) + n : e / 2 * ((t -= 2) * t * (((a *= 1.525) + 1) * t + a) + 2) + n
    }, bounceIn: function (t, n, e, r) {
        return e - Tween.bounceOut(r - t, 0, e, r) + n
    }, bounceOut: function (t, n, e, r) {
        return (t /= r) < 1 / 2.75 ? 7.5625 * e * t * t + n : 2 / 2.75 > t ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    }, bounceBoth: function (t, n, e, r) {
        return r / 2 > t ? .5 * Tween.bounceIn(2 * t, 0, e, r) + n : .5 * Tween.bounceOut(2 * t - r, 0, e, r) + .5 * e + n
    }
};