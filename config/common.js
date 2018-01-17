var func = {
	CFS: (e) => {
	    function t(e) {
	        for (var t = "", n = 1; n <= e.length; n++) t += e.charAt(n - 1).charCodeAt(0);
	        var a = new Number(t);
	        return t = a.toString(16)
	    }
	    var n, a, o = 30;
	    if (n = o - e.length, n > 1)
	        for (var r = 1; n >= r; r++) e += String.fromCharCode(21);
	    for (var i = new Number(1), l = 1; o >= l; l++) a = o + e.charAt(l - 1).charCodeAt(0) * l, i *= a;
	    var d = new Number(i.toPrecision(15));
	    e = d.toString().toUpperCase();
	    for (var s = "", m = 1; m <= e.length; m++) s += t(e.substring(m - 1, m + 2));
	    for (var u = "", m = 20; m <= s.length - 18; m += 2) u += s.charAt(m - 1);
	    return u.toUpperCase()
	}, 

	WordToHex: (e) => {
	    var t, n, a = "",
	        o = "";
	    for (n = 0; 3 >= n; n++) t = e >>> 8 * n & 255, o = "0" + t.toString(16), a += o.substr(o.length - 2, 2);
	    return a
	}, 

	MD5: (e) => {
	    function t(e, t) {
	        return e << t | e >>> 32 - t
	    }

	    function n(e, t) {
	        var n, a, o, r, i;
	        return o = 2147483648 & e, r = 2147483648 & t, n = 1073741824 & e, a = 1073741824 & t, i = (1073741823 & e) + (1073741823 & t), n & a ? 2147483648 ^ i ^ o ^ r : n | a ? 1073741824 & i ? 3221225472 ^ i ^ o ^ r : 1073741824 ^ i ^ o ^ r : i ^ o ^ r
	    }

	    function a(e, t, n) {
	        return e & t | ~e & n
	    }

	    function o(e, t, n) {
	        return e & n | t & ~n
	    }

	    function r(e, t, n) {
	        return e ^ t ^ n
	    }

	    function i(e, t, n) {
	        return t ^ (e | ~n)
	    }

	    function l(e, o, r, i, l, d, s) {
	        return e = n(e, n(n(a(o, r, i), l), s)), n(t(e, d), o)
	    }

	    function d(e, a, r, i, l, d, s) {
	        return e = n(e, n(n(o(a, r, i), l), s)), n(t(e, d), a)
	    }

	    function s(e, a, o, i, l, d, s) {
	        return e = n(e, n(n(r(a, o, i), l), s)), n(t(e, d), a)
	    }

	    function m(e, a, o, r, l, d, s) {
	        return e = n(e, n(n(i(a, o, r), l), s)), n(t(e, d), a)
	    }

	    function u(e) {
	        for (var t, n = e.length, a = n + 8, o = (a - a % 64) / 64, r = 16 * (o + 1), i = Array(r - 1), l = 0, d = 0; n > d;) t = (d - d % 4) / 4, l = d % 4 * 8, i[t] = i[t] | e.charCodeAt(d) << l, d++;
	        return t = (d - d % 4) / 4, l = d % 4 * 8, i[t] = i[t] | 128 << l, i[r - 2] = n << 3, i[r - 1] = n >>> 29, i
	    }

	    function c(e) {
	        e = e.replace(/\r\n/g, "\n");
	        for (var t = "", n = 0; n < e.length; n++) {
	            var a = e.charCodeAt(n);
	            128 > a ? t += String.fromCharCode(a) : a > 127 && 2048 > a ? (t += String.fromCharCode(a >> 6 | 192), t += String.fromCharCode(63 & a | 128)) : (t += String.fromCharCode(a >> 12 | 224), t += String.fromCharCode(a >> 6 & 63 | 128), t += String.fromCharCode(63 & a | 128))
	        }
	        return t
	    }
	    var f, p, v, g, h, y, b, C, S, O = Array(),
	        B = 7,
	        E = 12,
	        w = 17,
	        I = 22,
	        F = 5,
	        _ = 9,
	        x = 14,
	        T = 20,
	        M = 4,
	        L = 11,
	        k = 16,
	        $ = 23,
	        P = 6,
	        A = 10,
	        H = 15,
	        N = 21;
	    for (e = c(e), O = u(e), y = 1732584193, b = 4023233417, C = 2562383102, S = 271733878, f = 0; f < O.length; f += 16) p = y, v = b, g = C, h = S, y = l(y, b, C, S, O[f + 0], B, 3614090360), S = l(S, y, b, C, O[f + 1], E, 3905402710), C = l(C, S, y, b, O[f + 2], w, 606105819), b = l(b, C, S, y, O[f + 3], I, 3250441966), y = l(y, b, C, S, O[f + 4], B, 4118548399), S = l(S, y, b, C, O[f + 5], E, 1200080426), C = l(C, S, y, b, O[f + 6], w, 2821735955), b = l(b, C, S, y, O[f + 7], I, 4249261313), y = l(y, b, C, S, O[f + 8], B, 1770035416), S = l(S, y, b, C, O[f + 9], E, 2336552879), C = l(C, S, y, b, O[f + 10], w, 4294925233), b = l(b, C, S, y, O[f + 11], I, 2304563134), y = l(y, b, C, S, O[f + 12], B, 1804603682), S = l(S, y, b, C, O[f + 13], E, 4254626195), C = l(C, S, y, b, O[f + 14], w, 2792965006), b = l(b, C, S, y, O[f + 15], I, 1236535329), y = d(y, b, C, S, O[f + 1], F, 4129170786), S = d(S, y, b, C, O[f + 6], _, 3225465664), C = d(C, S, y, b, O[f + 11], x, 643717713), b = d(b, C, S, y, O[f + 0], T, 3921069994), y = d(y, b, C, S, O[f + 5], F, 3593408605), S = d(S, y, b, C, O[f + 10], _, 38016083), C = d(C, S, y, b, O[f + 15], x, 3634488961), b = d(b, C, S, y, O[f + 4], T, 3889429448), y = d(y, b, C, S, O[f + 9], F, 568446438), S = d(S, y, b, C, O[f + 14], _, 3275163606), C = d(C, S, y, b, O[f + 3], x, 4107603335), b = d(b, C, S, y, O[f + 8], T, 1163531501), y = d(y, b, C, S, O[f + 13], F, 2850285829), S = d(S, y, b, C, O[f + 2], _, 4243563512), C = d(C, S, y, b, O[f + 7], x, 1735328473), b = d(b, C, S, y, O[f + 12], T, 2368359562), y = s(y, b, C, S, O[f + 5], M, 4294588738), S = s(S, y, b, C, O[f + 8], L, 2272392833), C = s(C, S, y, b, O[f + 11], k, 1839030562), b = s(b, C, S, y, O[f + 14], $, 4259657740), y = s(y, b, C, S, O[f + 1], M, 2763975236), S = s(S, y, b, C, O[f + 4], L, 1272893353), C = s(C, S, y, b, O[f + 7], k, 4139469664), b = s(b, C, S, y, O[f + 10], $, 3200236656), y = s(y, b, C, S, O[f + 13], M, 681279174), S = s(S, y, b, C, O[f + 0], L, 3936430074), C = s(C, S, y, b, O[f + 3], k, 3572445317), b = s(b, C, S, y, O[f + 6], $, 76029189), y = s(y, b, C, S, O[f + 9], M, 3654602809), S = s(S, y, b, C, O[f + 12], L, 3873151461), C = s(C, S, y, b, O[f + 15], k, 530742520), b = s(b, C, S, y, O[f + 2], $, 3299628645), y = m(y, b, C, S, O[f + 0], P, 4096336452), S = m(S, y, b, C, O[f + 7], A, 1126891415), C = m(C, S, y, b, O[f + 14], H, 2878612391), b = m(b, C, S, y, O[f + 5], N, 4237533241), y = m(y, b, C, S, O[f + 12], P, 1700485571), S = m(S, y, b, C, O[f + 3], A, 2399980690), C = m(C, S, y, b, O[f + 10], H, 4293915773), b = m(b, C, S, y, O[f + 1], N, 2240044497), y = m(y, b, C, S, O[f + 8], P, 1873313359), S = m(S, y, b, C, O[f + 15], A, 4264355552), C = m(C, S, y, b, O[f + 6], H, 2734768916), b = m(b, C, S, y, O[f + 13], N, 1309151649), y = m(y, b, C, S, O[f + 4], P, 4149444226), S = m(S, y, b, C, O[f + 11], A, 3174756917), C = m(C, S, y, b, O[f + 2], H, 718787259), b = m(b, C, S, y, O[f + 9], N, 3951481745), y = n(y, p), b = n(b, v), C = n(C, g), S = n(S, h);
	    var D = func.WordToHex(y) + func.WordToHex(b) + func.WordToHex(C) + func.WordToHex(S);
	    return D.toLowerCase()
	}, 
}

module.exports = func
