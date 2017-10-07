/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

/*! http://mths.be/utf8js v2.0.0 by @mathias */

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

/*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */

/*! Game Visualization connection bridge from MBC to gv.js @201705181304:PoweiChen */

! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define("io", [], t);
    else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.io = t()
    }
}(function() {
    var t;
    return function n(t, e, r) {
        function i(a, u) {
            if (!e[a]) {
                if (!t[a]) {
                    var s = "function" == typeof require && require;
                    if (!u && s) return s(a, !0);
                    if (o) return o(a, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                var c = e[a] = {
                    exports: {}
                };
                t[a][0].call(c.exports, function(n) {
                    var e = t[a][1][n];
                    return i(e ? e : n)
                }, c, c.exports, n, t, e, r)
            }
            return e[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(t, n, e) {
            n.exports = t("./lib/")
        }, {
            "./lib/": 2
        }],
        2: [function(t, n, e) {
            function r(t, n) {
                "object" == typeof t && (n = t, t = void 0), n = n || {};
                var e, r = i(t),
                    o = r.source,
                    c = r.id;
                return n.forceNew || n["force new connection"] || !1 === n.multiplex ? (u("ignoring socket cache for %s", o), e = a(o, n)) : (s[c] || (u("new io instance for %s", o), s[c] = a(o, n)), e = s[c]), e.socket(r.path)
            }
            var i = t("./url"),
                o = t("socket.io-parser"),
                a = t("./manager"),
                u = t("debug")("socket.io-client");
            n.exports = e = r;
            var s = e.managers = {};
            e.protocol = o.protocol, e.connect = r, e.Manager = t("./manager"), e.Socket = t("./socket")
        }, {
            "./manager": 3,
            "./socket": 5,
            "./url": 6,
            debug: 10,
            "socket.io-parser": 46
        }],
        3: [function(t, n, e) {
            function r(t, n) {
                return this instanceof r ? (t && "object" == typeof t && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = n, this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor(n.randomizationFactor || .5), this.backoff = new h({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == n.timeout ? 2e4 : n.timeout), this.readyState = "closed", this.uri = t, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new u.Encoder, this.decoder = new u.Decoder, this.autoConnect = n.autoConnect !== !1, void(this.autoConnect && this.open())) : new r(t, n)
            }
            var i = (t("./url"), t("engine.io-client")),
                o = t("./socket"),
                a = t("component-emitter"),
                u = t("socket.io-parser"),
                s = t("./on"),
                c = t("component-bind"),
                l = (t("object-component"), t("debug")("socket.io-client:manager")),
                f = t("indexof"),
                h = t("backo2");
            n.exports = r, r.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var t in this.nsps) this.nsps[t].emit.apply(this.nsps[t], arguments)
            }, r.prototype.updateSocketIds = function() {
                for (var t in this.nsps) this.nsps[t].id = this.engine.id
            }, a(r.prototype), r.prototype.reconnection = function(t) {
                return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
            }, r.prototype.reconnectionAttempts = function(t) {
                return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
            }, r.prototype.reconnectionDelay = function(t) {
                return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
            }, r.prototype.randomizationFactor = function(t) {
                return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
            }, r.prototype.reconnectionDelayMax = function(t) {
                return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
            }, r.prototype.timeout = function(t) {
                return arguments.length ? (this._timeout = t, this) : this._timeout
            }, r.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, r.prototype.open = r.prototype.connect = function(t) {
                if (l("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                l("opening %s", this.uri), this.engine = i(this.uri, this.opts);
                var n = this.engine,
                    e = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var r = s(n, "open", function() {
                        e.onopen(), t && t()
                    }),
                    o = s(n, "error", function(n) {
                        if (l("connect_error"), e.cleanup(), e.readyState = "closed", e.emitAll("connect_error", n), t) {
                            var r = new Error("Connection error");
                            r.data = n, t(r)
                        } else e.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var a = this._timeout;
                    l("connect attempt will timeout after %d", a);
                    var u = setTimeout(function() {
                        l("connect attempt timed out after %d", a), r.destroy(), n.close(), n.emit("error", "timeout"), e.emitAll("connect_timeout", a)
                    }, a);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(u)
                        }
                    })
                }
                return this.subs.push(r), this.subs.push(o), this
            }, r.prototype.onopen = function() {
                l("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var t = this.engine;
                this.subs.push(s(t, "data", c(this, "ondata"))), this.subs.push(s(this.decoder, "decoded", c(this, "ondecoded"))), this.subs.push(s(t, "error", c(this, "onerror"))), this.subs.push(s(t, "close", c(this, "onclose")))
            }, r.prototype.ondata = function(t) {
                this.decoder.add(t)
            }, r.prototype.ondecoded = function(t) {
                this.emit("packet", t)
            }, r.prototype.onerror = function(t) {
                l("error", t), this.emitAll("error", t)
            }, r.prototype.socket = function(t) {
                var n = this.nsps[t];
                if (!n) {
                    n = new o(this, t), this.nsps[t] = n;
                    var e = this;
                    n.on("connect", function() {
                        n.id = e.engine.id, ~f(e.connected, n) || e.connected.push(n)
                    })
                }
                return n
            }, r.prototype.destroy = function(t) {
                var n = f(this.connected, t);
                ~n && this.connected.splice(n, 1), this.connected.length || this.close()
            }, r.prototype.packet = function(t) {
                l("writing packet %j", t);
                var n = this;
                n.encoding ? n.packetBuffer.push(t) : (n.encoding = !0, this.encoder.encode(t, function(t) {
                    for (var e = 0; e < t.length; e++) n.engine.write(t[e]);
                    n.encoding = !1, n.processPacketQueue()
                }))
            }, r.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var t = this.packetBuffer.shift();
                    this.packet(t)
                }
            }, r.prototype.cleanup = function() {
                for (var t; t = this.subs.shift();) t.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
            }, r.prototype.close = r.prototype.disconnect = function() {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, r.prototype.onclose = function(t) {
                l("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
            }, r.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect) return this;
                var t = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) l("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
                else {
                    var n = this.backoff.duration();
                    l("will wait %dms before reconnect attempt", n), this.reconnecting = !0;
                    var e = setTimeout(function() {
                        t.skipReconnect || (l("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(n) {
                            n ? (l("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", n.data)) : (l("reconnect success"), t.onreconnect())
                        }))
                    }, n);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(e)
                        }
                    })
                }
            }, r.prototype.onreconnect = function() {
                var t = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
            }
        }, {
            "./on": 4,
            "./socket": 5,
            "./url": 6,
            backo2: 7,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "engine.io-client": 11,
            indexof: 42,
            "object-component": 43,
            "socket.io-parser": 46
        }],
        4: [function(t, n, e) {
            function r(t, n, e) {
                return t.on(n, e), {
                    destroy: function() {
                        t.removeListener(n, e)
                    }
                }
            }
            n.exports = r
        }, {}],
        5: [function(t, n, e) {
            function r(t, n) {
                this.io = t, this.nsp = n, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
            }
            var i = t("socket.io-parser"),
                o = t("component-emitter"),
                a = t("to-array"),
                u = t("./on"),
                s = t("component-bind"),
                c = t("debug")("socket.io-client:socket"),
                l = t("has-binary");
            n.exports = e = r;
            var f = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1
                },
                h = o.prototype.emit;
            o(r.prototype), r.prototype.subEvents = function() {
                if (!this.subs) {
                    var t = this.io;
                    this.subs = [u(t, "open", s(this, "onopen")), u(t, "packet", s(this, "onpacket")), u(t, "close", s(this, "onclose"))]
                }
            }, r.prototype.open = r.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
            }, r.prototype.send = function() {
                var t = a(arguments);
                return t.unshift("message"), this.emit.apply(this, t), this
            }, r.prototype.emit = function(t) {
                if (f.hasOwnProperty(t)) return h.apply(this, arguments), this;
                var n = a(arguments),
                    e = i.EVENT;
                l(n) && (e = i.BINARY_EVENT);
                var r = {
                    type: e,
                    data: n
                };
                return "function" == typeof n[n.length - 1] && (c("emitting packet with ack id %d", this.ids), this.acks[this.ids] = n.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this
            }, r.prototype.packet = function(t) {
                t.nsp = this.nsp, this.io.packet(t)
            }, r.prototype.onopen = function() {
                c("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: i.CONNECT
                })
            }, r.prototype.onclose = function(t) {
                c("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
            }, r.prototype.onpacket = function(t) {
                if (t.nsp == this.nsp) switch (t.type) {
                    case i.CONNECT:
                        this.onconnect();
                        break;
                    case i.EVENT:
                        this.onevent(t);
                        break;
                    case i.BINARY_EVENT:
                        this.onevent(t);
                        break;
                    case i.ACK:
                        this.onack(t);
                        break;
                    case i.BINARY_ACK:
                        this.onack(t);
                        break;
                    case i.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case i.ERROR:
                        this.emit("error", t.data)
                }
            }, r.prototype.onevent = function(t) {
                var n = t.data || [];
                c("emitting event %j", n), null != t.id && (c("attaching ack callback to event"), n.push(this.ack(t.id))), this.connected ? h.apply(this, n) : this.receiveBuffer.push(n)
            }, r.prototype.ack = function(t) {
                var n = this,
                    e = !1;
                return function() {
                    if (!e) {
                        e = !0;
                        var r = a(arguments);
                        c("sending ack %j", r);
                        var o = l(r) ? i.BINARY_ACK : i.ACK;
                        n.packet({
                            type: o,
                            id: t,
                            data: r
                        })
                    }
                }
            }, r.prototype.onack = function(t) {
                c("calling ack %s with %j", t.id, t.data);
                var n = this.acks[t.id];
                n.apply(this, t.data), delete this.acks[t.id]
            }, r.prototype.onconnect = function() {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, r.prototype.emitBuffered = function() {
                var t;
                for (t = 0; t < this.receiveBuffer.length; t++) h.apply(this, this.receiveBuffer[t]);
                for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
                this.sendBuffer = []
            }, r.prototype.ondisconnect = function() {
                c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, r.prototype.destroy = function() {
                if (this.subs) {
                    for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, r.prototype.close = r.prototype.disconnect = function() {
                return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
                    type: i.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }
        }, {
            "./on": 4,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "has-binary": 38,
            "socket.io-parser": 46,
            "to-array": 50
        }],
        6: [function(t, n, e) {
            (function(e) {
                function r(t, n) {
                    var r = t,
                        n = n || e.location;
                    return null == t && (t = n.protocol + "//" + n.host), "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? n.protocol + t : n.hostname + t), /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = "undefined" != typeof n ? n.protocol + "//" + t : "https://" + t), o("parse %s", t), r = i(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/", r.id = r.protocol + "://" + r.host + ":" + r.port, r.href = r.protocol + "://" + r.host + (n && n.port == r.port ? "" : ":" + r.port), r
                }
                var i = t("parseuri"),
                    o = t("debug")("socket.io-client:url");
                n.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            debug: 10,
            parseuri: 44
        }],
        7: [function(t, n, e) {
            function r(t) {
                t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
            }
            n.exports = r, r.prototype.duration = function() {
                var t = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var n = Math.random(),
                        e = Math.floor(n * this.jitter * t);
                    t = 0 == (1 & Math.floor(10 * n)) ? t - e : t + e
                }
                return 0 | Math.min(t, this.max)
            }, r.prototype.reset = function() {
                this.attempts = 0
            }, r.prototype.setMin = function(t) {
                this.ms = t
            }, r.prototype.setMax = function(t) {
                this.max = t
            }, r.prototype.setJitter = function(t) {
                this.jitter = t
            }
        }, {}],
        8: [function(t, n, e) {
            var r = [].slice;
            n.exports = function(t, n) {
                if ("string" == typeof n && (n = t[n]), "function" != typeof n) throw new Error("bind() requires a function");
                var e = r.call(arguments, 2);
                return function() {
                    return n.apply(t, e.concat(r.call(arguments)))
                }
            }
        }, {}],
        9: [function(t, n, e) {
            function r(t) {
                return t ? i(t) : void 0
            }

            function i(t) {
                for (var n in r.prototype) t[n] = r.prototype[n];
                return t
            }
            n.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, n) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(n), this
            }, r.prototype.once = function(t, n) {
                function e() {
                    r.off(t, e), n.apply(this, arguments)
                }
                var r = this;
                return this._callbacks = this._callbacks || {}, e.fn = n, this.on(t, e), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, n) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var e = this._callbacks[t];
                if (!e) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                for (var r, i = 0; i < e.length; i++)
                    if (r = e[i], r === n || r.fn === n) {
                        e.splice(i, 1);
                        break
                    }
                return this
            }, r.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var n = [].slice.call(arguments, 1),
                    e = this._callbacks[t];
                if (e) {
                    e = e.slice(0);
                    for (var r = 0, i = e.length; i > r; ++r) e[r].apply(this, n)
                }
                return this
            }, r.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, r.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, {}],
        10: [function(t, n, e) {
            function r(t) {
                return r.enabled(t) ? function(n) {
                    n = i(n);
                    var e = new Date,
                        o = e - (r[t] || e);
                    r[t] = e, n = t + " " + n + " +" + r.humanize(o), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                } : function() {}
            }

            function i(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            n.exports = r, r.names = [], r.skips = [], r.enable = function(t) {
                try {
                    localStorage.debug = t
                } catch (n) {}
                for (var e = (t || "").split(/[\s,]+/), i = e.length, o = 0; i > o; o++) t = e[o].replace("*", ".*?"), "-" === t[0] ? r.skips.push(new RegExp("^" + t.substr(1) + "$")) : r.names.push(new RegExp("^" + t + "$"))
            }, r.disable = function() {
                r.enable("")
            }, r.humanize = function(t) {
                var n = 1e3,
                    e = 6e4,
                    r = 60 * e;
                return t >= r ? (t / r).toFixed(1) + "h" : t >= e ? (t / e).toFixed(1) + "m" : t >= n ? (t / n | 0) + "s" : t + "ms"
            }, r.enabled = function(t) {
                for (var n = 0, e = r.skips.length; e > n; n++)
                    if (r.skips[n].test(t)) return !1;
                for (var n = 0, e = r.names.length; e > n; n++)
                    if (r.names[n].test(t)) return !0;
                return !1
            };
            try {
                window.localStorage && r.enable(localStorage.debug)
            } catch (o) {}
        }, {}],
        11: [function(t, n, e) {
            n.exports = t("./lib/")
        }, {
            "./lib/": 12
        }],
        12: [function(t, n, e) {
            n.exports = t("./socket"), n.exports.parser = t("engine.io-parser")
        }, {
            "./socket": 13,
            "engine.io-parser": 25
        }],
        13: [function(t, n, e) {
            (function(e) {
                function r(t, n) {
                    if (!(this instanceof r)) return new r(t, n);
                    if (n = n || {}, t && "object" == typeof t && (n = t, t = null), t && (t = l(t), n.host = t.host, n.secure = "https" == t.protocol || "wss" == t.protocol, n.port = t.port, t.query && (n.query = t.query)), this.secure = null != n.secure ? n.secure : e.location && "https:" == location.protocol, n.host) {
                        var i = n.host.split(":");
                        n.hostname = i.shift(), i.length ? n.port = i.pop() : n.port || (n.port = this.secure ? "443" : "80")
                    }
                    this.agent = n.agent || !1, this.hostname = n.hostname || (e.location ? location.hostname : "localhost"), this.port = n.port || (e.location && location.port ? location.port : this.secure ? 443 : 80), this.query = n.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), this.upgrade = !1 !== n.upgrade, this.path = (n.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!n.forceJSONP, this.jsonp = !1 !== n.jsonp, this.forceBase64 = !!n.forceBase64, this.enablesXDR = !!n.enablesXDR, this.timestampParam = n.timestampParam || "t", this.timestampRequests = n.timestampRequests, this.transports = n.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = n.policyPort || 843, this.rememberUpgrade = n.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = n.onlyBinaryUpgrades, this.pfx = n.pfx || null, this.key = n.key || null, this.passphrase = n.passphrase || null, this.cert = n.cert || null, this.ca = n.ca || null, this.ciphers = n.ciphers || null, this.rejectUnauthorized = n.rejectUnauthorized || null, this.open()
                }

                function i(t) {
                    var n = {};
                    for (var e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
                    return n
                }
                var o = t("./transports"),
                    a = t("component-emitter"),
                    u = t("debug")("engine.io-client:socket"),
                    s = t("indexof"),
                    c = t("engine.io-parser"),
                    l = t("parseuri"),
                    f = t("parsejson"),
                    h = t("parseqs");
                n.exports = r, r.priorWebsocketSuccess = !1, a(r.prototype), r.protocol = c.protocol, r.Socket = r, r.Transport = t("./transport"), r.transports = t("./transports"), r.parser = t("engine.io-parser"), r.prototype.createTransport = function(t) {
                    u('creating transport "%s"', t);
                    var n = i(this.query);
                    n.EIO = c.protocol, n.transport = t, this.id && (n.sid = this.id);
                    var e = new o[t]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: n,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized
                    });
                    return e
                }, r.prototype.open = function() {
                    var t;
                    if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) t = "websocket";
                    else {
                        if (0 == this.transports.length) {
                            var n = this;
                            return void setTimeout(function() {
                                n.emit("error", "No transports available")
                            }, 0)
                        }
                        t = this.transports[0]
                    }
                    this.readyState = "opening";
                    var t;
                    try {
                        t = this.createTransport(t)
                    } catch (e) {
                        return this.transports.shift(), void this.open()
                    }
                    t.open(), this.setTransport(t)
                }, r.prototype.setTransport = function(t) {
                    u("setting transport %s", t.name);
                    var n = this;
                    this.transport && (u("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function() {
                        n.onDrain()
                    }).on("packet", function(t) {
                        n.onPacket(t)
                    }).on("error", function(t) {
                        n.onError(t)
                    }).on("close", function() {
                        n.onClose("transport close")
                    })
                }, r.prototype.probe = function(t) {
                    function n() {
                        if (h.onlyBinaryUpgrades) {
                            var n = !this.supportsBinary && h.transport.supportsBinary;
                            f = f || n
                        }
                        f || (u('probe transport "%s" opened', t), l.send([{
                            type: "ping",
                            data: "probe"
                        }]), l.once("packet", function(n) {
                            if (!f)
                                if ("pong" == n.type && "probe" == n.data) {
                                    if (u('probe transport "%s" pong', t), h.upgrading = !0, h.emit("upgrading", l), !l) return;
                                    r.priorWebsocketSuccess = "websocket" == l.name, u('pausing current transport "%s"', h.transport.name), h.transport.pause(function() {
                                        f || "closed" != h.readyState && (u("changing transport and sending upgrade packet"), c(), h.setTransport(l), l.send([{
                                            type: "upgrade"
                                        }]), h.emit("upgrade", l), l = null, h.upgrading = !1, h.flush())
                                    })
                                } else {
                                    u('probe transport "%s" failed', t);
                                    var e = new Error("probe error");
                                    e.transport = l.name, h.emit("upgradeError", e)
                                }
                        }))
                    }

                    function e() {
                        f || (f = !0, c(), l.close(), l = null)
                    }

                    function i(n) {
                        var r = new Error("probe error: " + n);
                        r.transport = l.name, e(), u('probe transport "%s" failed because of error: %s', t, n), h.emit("upgradeError", r)
                    }

                    function o() {
                        i("transport closed")
                    }

                    function a() {
                        i("socket closed")
                    }

                    function s(t) {
                        l && t.name != l.name && (u('"%s" works - aborting "%s"', t.name, l.name), e())
                    }

                    function c() {
                        l.removeListener("open", n), l.removeListener("error", i), l.removeListener("close", o), h.removeListener("close", a), h.removeListener("upgrading", s)
                    }
                    u('probing transport "%s"', t);
                    var l = this.createTransport(t, {
                            probe: 1
                        }),
                        f = !1,
                        h = this;
                    r.priorWebsocketSuccess = !1, l.once("open", n), l.once("error", i), l.once("close", o), this.once("close", a), this.once("upgrading", s), l.open()
                }, r.prototype.onOpen = function() {
                    if (u("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        u("starting upgrade probes");
                        for (var t = 0, n = this.upgrades.length; n > t; t++) this.probe(this.upgrades[t])
                    }
                }, r.prototype.onPacket = function(t) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (u('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                        case "open":
                            this.onHandshake(f(t.data));
                            break;
                        case "pong":
                            this.setPing();
                            break;
                        case "error":
                            var n = new Error("server error");
                            n.code = t.data, this.emit("error", n);
                            break;
                        case "message":
                            this.emit("data", t.data), this.emit("message", t.data)
                    } else u('packet received with socket readyState "%s"', this.readyState)
                }, r.prototype.onHandshake = function(t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, r.prototype.onHeartbeat = function(t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var n = this;
                    n.pingTimeoutTimer = setTimeout(function() {
                        "closed" != n.readyState && n.onClose("ping timeout")
                    }, t || n.pingInterval + n.pingTimeout)
                }, r.prototype.setPing = function() {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                        u("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                    }, t.pingInterval)
                }, r.prototype.ping = function() {
                    this.sendPacket("ping")
                }, r.prototype.onDrain = function() {
                    for (var t = 0; t < this.prevBufferLen; t++) this.callbackBuffer[t] && this.callbackBuffer[t]();
                    this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, r.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (u("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, r.prototype.write = r.prototype.send = function(t, n) {
                    return this.sendPacket("message", t, n), this
                }, r.prototype.sendPacket = function(t, n, e) {
                    if ("closing" != this.readyState && "closed" != this.readyState) {
                        var r = {
                            type: t,
                            data: n
                        };
                        this.emit("packetCreate", r), this.writeBuffer.push(r), this.callbackBuffer.push(e), this.flush()
                    }
                }, r.prototype.close = function() {
                    function t() {
                        r.onClose("forced close"), u("socket closing - telling transport to close"), r.transport.close()
                    }

                    function n() {
                        r.removeListener("upgrade", n), r.removeListener("upgradeError", n), t()
                    }

                    function e() {
                        r.once("upgrade", n), r.once("upgradeError", n)
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var r = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? e() : t()
                        }) : this.upgrading ? e() : t()
                    }
                    return this
                }, r.prototype.onError = function(t) {
                    u("socket error %j", t), r.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                }, r.prototype.onClose = function(t, n) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        u('socket close with reason: "%s"', t);
                        var e = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
                            e.writeBuffer = [], e.callbackBuffer = [], e.prevBufferLen = 0
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, n)
                    }
                }, r.prototype.filterUpgrades = function(t) {
                    for (var n = [], e = 0, r = t.length; r > e; e++) ~s(this.transports, t[e]) && n.push(t[e]);
                    return n
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./transport": 14,
            "./transports": 15,
            "component-emitter": 9,
            debug: 22,
            "engine.io-parser": 25,
            indexof: 42,
            parsejson: 34,
            parseqs: 35,
            parseuri: 36
        }],
        14: [function(t, n, e) {
            function r(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized
            }
            var i = t("engine.io-parser"),
                o = t("component-emitter");
            n.exports = r, o(r.prototype), r.timestamps = 0, r.prototype.onError = function(t, n) {
                var e = new Error(t);
                return e.type = "TransportError", e.description = n, this.emit("error", e), this
            }, r.prototype.open = function() {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", this.doOpen()), this
            }, r.prototype.close = function() {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()), this
            }, r.prototype.send = function(t) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(t)
            }, r.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, r.prototype.onData = function(t) {
                var n = i.decodePacket(t, this.socket.binaryType);
                this.onPacket(n)
            }, r.prototype.onPacket = function(t) {
                this.emit("packet", t)
            }, r.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close")
            }
        }, {
            "component-emitter": 9,
            "engine.io-parser": 25
        }],
        15: [function(t, n, e) {
            (function(n) {
                function r(t) {
                    var e, r = !1,
                        u = !1,
                        s = !1 !== t.jsonp;
                    if (n.location) {
                        var c = "https:" == location.protocol,
                            l = location.port;
                        l || (l = c ? 443 : 80), r = t.hostname != location.hostname || l != t.port, u = t.secure != c
                    }
                    if (t.xdomain = r, t.xscheme = u, e = new i(t), "open" in e && !t.forceJSONP) return new o(t);
                    if (!s) throw new Error("JSONP disabled");
                    return new a(t)
                }
                var i = t("xmlhttprequest"),
                    o = t("./polling-xhr"),
                    a = t("./polling-jsonp"),
                    u = t("./websocket");
                e.polling = r, e.websocket = u
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling-jsonp": 16,
            "./polling-xhr": 17,
            "./websocket": 19,
            xmlhttprequest: 20
        }],
        16: [function(t, n, e) {
            (function(e) {
                function r() {}

                function i(t) {
                    o.call(this, t), this.query = this.query || {}, u || (e.___eio || (e.___eio = []), u = e.___eio), this.index = u.length;
                    var n = this;
                    u.push(function(t) {
                        n.onData(t)
                    }), this.query.j = this.index, e.document && e.addEventListener && e.addEventListener("beforeunload", function() {
                        n.script && (n.script.onerror = r)
                    }, !1)
                }
                var o = t("./polling"),
                    a = t("component-inherit");
                n.exports = i;
                var u, s = /\n/g,
                    c = /\\n/g;
                a(i, o), i.prototype.supportsBinary = !1, i.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
                }, i.prototype.doPoll = function() {
                    var t = this,
                        n = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.uri(), n.onerror = function(n) {
                        t.onError("jsonp poll error", n)
                    };
                    var e = document.getElementsByTagName("script")[0];
                    e.parentNode.insertBefore(n, e), this.script = n;
                    var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    r && setTimeout(function() {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t), document.body.removeChild(t)
                    }, 100)
                }, i.prototype.doWrite = function(t, n) {
                    function e() {
                        r(), n()
                    }

                    function r() {
                        if (i.iframe) try {
                            i.form.removeChild(i.iframe)
                        } catch (t) {
                            i.onError("jsonp polling iframe removal error", t)
                        }
                        try {
                            var n = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                            o = document.createElement(n)
                        } catch (t) {
                            o = document.createElement("iframe"), o.name = i.iframeId, o.src = "javascript:0"
                        }
                        o.id = i.iframeId, i.form.appendChild(o), i.iframe = o
                    }
                    var i = this;
                    if (!this.form) {
                        var o, a = document.createElement("form"),
                            u = document.createElement("textarea"),
                            l = this.iframeId = "eio_iframe_" + this.index;
                        a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = l, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), u.name = "d", a.appendChild(u), document.body.appendChild(a), this.form = a, this.area = u
                    }
                    this.form.action = this.uri(), r(), t = t.replace(c, "\\\n"), this.area.value = t.replace(s, "\\n");
                    try {
                        this.form.submit()
                    } catch (f) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == i.iframe.readyState && e()
                    } : this.iframe.onload = e
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-inherit": 21
        }],
        17: [function(t, n, e) {
            (function(e) {
                function r() {}

                function i(t) {
                    if (s.call(this, t), e.location) {
                        var n = "https:" == location.protocol,
                            r = location.port;
                        r || (r = n ? 443 : 80), this.xd = t.hostname != e.location.hostname || r != t.port, this.xs = t.secure != n
                    }
                }

                function o(t) {
                    this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.create()
                }

                function a() {
                    for (var t in o.requests) o.requests.hasOwnProperty(t) && o.requests[t].abort()
                }
                var u = t("xmlhttprequest"),
                    s = t("./polling"),
                    c = t("component-emitter"),
                    l = t("component-inherit"),
                    f = t("debug")("engine.io-client:polling-xhr");
                n.exports = i, n.exports.Request = o, l(i, s), i.prototype.supportsBinary = !0, i.prototype.request = function(t) {
                    return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, new o(t)
                }, i.prototype.doWrite = function(t, n) {
                    var e = "string" != typeof t && void 0 !== t,
                        r = this.request({
                            method: "POST",
                            data: t,
                            isBinary: e
                        }),
                        i = this;
                    r.on("success", n), r.on("error", function(t) {
                        i.onError("xhr post error", t)
                    }), this.sendXhr = r
                }, i.prototype.doPoll = function() {
                    f("xhr poll");
                    var t = this.request(),
                        n = this;
                    t.on("data", function(t) {
                        n.onData(t)
                    }), t.on("error", function(t) {
                        n.onError("xhr poll error", t)
                    }), this.pollXhr = t
                }, c(o.prototype), o.prototype.create = function() {
                    var t = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                    var n = this.xhr = new u(t),
                        r = this;
                    try {
                        if (f("xhr open %s: %s", this.method, this.uri), n.open(this.method, this.uri, this.async), this.supportsBinary && (n.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? n.setRequestHeader("Content-type", "application/octet-stream") : n.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (i) {}
                        "withCredentials" in n && (n.withCredentials = !0), this.hasXDR() ? (n.onload = function() {
                            r.onLoad()
                        }, n.onerror = function() {
                            r.onError(n.responseText)
                        }) : n.onreadystatechange = function() {
                            4 == n.readyState && (200 == n.status || 1223 == n.status ? r.onLoad() : setTimeout(function() {
                                r.onError(n.status)
                            }, 0))
                        }, f("xhr data %s", this.data), n.send(this.data)
                    } catch (i) {
                        return void setTimeout(function() {
                            r.onError(i)
                        }, 0)
                    }
                    e.document && (this.index = o.requestsCount++, o.requests[this.index] = this)
                }, o.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup()
                }, o.prototype.onData = function(t) {
                    this.emit("data", t), this.onSuccess()
                }, o.prototype.onError = function(t) {
                    this.emit("error", t), this.cleanup(!0)
                }, o.prototype.cleanup = function(t) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, t) try {
                            this.xhr.abort()
                        } catch (n) {}
                        e.document && delete o.requests[this.index], this.xhr = null
                    }
                }, o.prototype.onLoad = function() {
                    var t;
                    try {
                        var n;
                        try {
                            n = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (e) {}
                        t = "application/octet-stream" === n ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                    } catch (e) {
                        this.onError(e)
                    }
                    null != t && this.onData(t)
                }, o.prototype.hasXDR = function() {
                    return "undefined" != typeof e.XDomainRequest && !this.xs && this.enablesXDR
                }, o.prototype.abort = function() {
                    this.cleanup()
                }, e.document && (o.requestsCount = 0, o.requests = {}, e.attachEvent ? e.attachEvent("onunload", a) : e.addEventListener && e.addEventListener("beforeunload", a, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-emitter": 9,
            "component-inherit": 21,
            debug: 22,
            xmlhttprequest: 20
        }],
        18: [function(t, n, e) {
            function r(t) {
                var n = t && t.forceBase64;
                (!c || n) && (this.supportsBinary = !1), i.call(this, t)
            }
            var i = t("../transport"),
                o = t("parseqs"),
                a = t("engine.io-parser"),
                u = t("component-inherit"),
                s = t("debug")("engine.io-client:polling");
            n.exports = r;
            var c = function() {
                var n = t("xmlhttprequest"),
                    e = new n({
                        xdomain: !1
                    });
                return null != e.responseType
            }();
            u(r, i), r.prototype.name = "polling", r.prototype.doOpen = function() {
                this.poll()
            }, r.prototype.pause = function(t) {
                function n() {
                    s("paused"), e.readyState = "paused", t()
                }
                var e = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var r = 0;
                    this.polling && (s("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function() {
                        s("pre-pause polling complete"), --r || n()
                    })), this.writable || (s("we are currently writing - waiting to pause"), r++, this.once("drain", function() {
                        s("pre-pause writing complete"), --r || n()
                    }))
                } else n()
            }, r.prototype.poll = function() {
                s("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, r.prototype.onData = function(t) {
                var n = this;
                s("polling got data %s", t);
                var e = function(t, e, r) {
                    return "opening" == n.readyState && n.onOpen(), "close" == t.type ? (n.onClose(), !1) : void n.onPacket(t)
                };
                a.decodePayload(t, this.socket.binaryType, e), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : s('ignoring poll - transport state "%s"', this.readyState))
            }, r.prototype.doClose = function() {
                function t() {
                    s("writing close packet"), n.write([{
                        type: "close"
                    }])
                }
                var n = this;
                "open" == this.readyState ? (s("transport open - closing"), t()) : (s("transport not open - deferring close"), this.once("open", t))
            }, r.prototype.write = function(t) {
                var n = this;
                this.writable = !1;
                var e = function() {
                        n.writable = !0, n.emit("drain")
                    },
                    n = this;
                a.encodePayload(t, this.supportsBinary, function(t) {
                    n.doWrite(t, e)
                })
            }, r.prototype.uri = function() {
                var t = this.query || {},
                    n = this.secure ? "https" : "http",
                    e = "";
                return !1 !== this.timestampRequests && (t[this.timestampParam] = +new Date + "-" + i.timestamps++), this.supportsBinary || t.sid || (t.b64 = 1), t = o.encode(t), this.port && ("https" == n && 443 != this.port || "http" == n && 80 != this.port) && (e = ":" + this.port), t.length && (t = "?" + t), n + "://" + this.hostname + e + this.path + t
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            xmlhttprequest: 20
        }],
        19: [function(t, n, e) {
            function r(t) {
                var n = t && t.forceBase64;
                n && (this.supportsBinary = !1), i.call(this, t)
            }
            console.log('t',t)
            console.log('n',n)
            console.log('e',e)
            var i = t("../transport"),
                o = t("engine.io-parser"),
                a = t("parseqs"),
                u = t("component-inherit"),
                s = t("debug")("engine.io-client:websocket"),
                c = t("ws");
            n.exports = r, u(r, i), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
                if (this.check()) {
                    var t = this.uri(),
                        n = void 0,
                        e = {
                            agent: this.agent
                        };
                    e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.ws = new c(t, n, e), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, r.prototype.addEventListeners = function() {
                var t = this;
                this.ws.onopen = function() {
                    console.log('onpen>>>>>>>>>>>>')
                    t.onOpen()
                }, this.ws.onclose = function() {
                    t.onClose()
                }, this.ws.onmessage = function(n) {
                    console.log('on message', n.data)
                    t.onData(n.data)
                }, this.ws.onerror = function(n) {
                    t.onError("websocket error", n)
                }
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function(t) {
                var n = this;
                setTimeout(function() {
                    i.prototype.onData.call(n, t)
                    console.log('tttttttttttttttttttttt',t)
                }, 0)
            }), r.prototype.write = function(t) {
                function n() {
                    e.writable = !0, e.emit("drain")
                }
                var e = this;
                this.writable = !1;
                for (var r = 0, i = t.length; i > r; r++) o.encodePacket(t[r], this.supportsBinary, function(t) {
                    try {
                        e.ws.send(t)
                    } catch (n) {
                        s("websocket closed before onclose event")
                    }
                });
                setTimeout(n, 0)
            }, r.prototype.onClose = function() {
                i.prototype.onClose.call(this)
            }, r.prototype.doClose = function() {
                "undefined" != typeof this.ws && this.ws.close()
            }, r.prototype.uri = function() {
                var t = this.query || {},
                    n = this.secure ? "wss" : "ws",
                    e = "";
                return this.port && ("wss" == n && 443 != this.port || "ws" == n && 80 != this.port) && (e = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = +new Date), this.supportsBinary || (t.b64 = 1), t = a.encode(t), t.length && (t = "?" + t), n + "://" + this.hostname + e + this.path + t
            }, r.prototype.check = function() {
                return !(!c || "__initialize" in c && this.name === r.prototype.name)
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            ws: 37
        }],
        20: [function(t, n, e) {
            var r = t("has-cors");
            n.exports = function(t) {
                var n = t.xdomain,
                    e = t.xscheme,
                    i = t.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!n || r)) return new XMLHttpRequest
                } catch (o) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !e && i) return new XDomainRequest
                } catch (o) {}
                if (!n) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (o) {}
            }
        }, {
            "has-cors": 40
        }],
        21: [function(t, n, e) {
            n.exports = function(t, n) {
                var e = function() {};
                e.prototype = n.prototype, t.prototype = new e, t.prototype.constructor = t
            }
        }, {}],
        22: [function(t, n, e) {
            function r() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function i() {
                var t = arguments,
                    n = this.useColors;
                if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n) return t;
                var r = "color: " + this.color;
                t = [t[0], r, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                var i = 0,
                    o = 0;
                return t[0].replace(/%[a-z%]/g, function(t) {
                    "%" !== t && (i++, "%c" === t && (o = i))
                }), t.splice(o, 0, r), t
            }

            function o() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(t) {
                try {
                    null == t ? localStorage.removeItem("debug") : localStorage.debug = t
                } catch (n) {}
            }

            function u() {
                var t;
                try {
                    t = localStorage.debug
                } catch (n) {}
                return t
            }
            e = n.exports = t("./debug"), e.log = o, e.formatArgs = i, e.save = a, e.load = u, e.useColors = r, e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function(t) {
                return JSON.stringify(t)
            }, e.enable(u())
        }, {
            "./debug": 23
        }],
        23: [function(t, n, e) {
            function r() {
                return e.colors[l++ % e.colors.length]
            }

            function i(t) {
                function n() {}

                function i() {
                    var t = i,
                        n = +new Date,
                        o = n - (c || n);
                    t.diff = o, t.prev = c, t.curr = n, c = n, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = r());
                    var a = Array.prototype.slice.call(arguments);
                    a[0] = e.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
                    var u = 0;
                    a[0] = a[0].replace(/%([a-z%])/g, function(n, r) {
                        if ("%" === n) return n;
                        u++;
                        var i = e.formatters[r];
                        if ("function" == typeof i) {
                            var o = a[u];
                            n = i.call(t, o), a.splice(u, 1), u--
                        }
                        return n
                    }), "function" == typeof e.formatArgs && (a = e.formatArgs.apply(t, a));
                    var s = i.log || e.log || console.log.bind(console);
                    s.apply(t, a)
                }
                n.enabled = !1, i.enabled = !0;
                var o = e.enabled(t) ? i : n;
                return o.namespace = t, o
            }

            function o(t) {
                e.save(t);
                for (var n = (t || "").split(/[\s,]+/), r = n.length, i = 0; r > i; i++) n[i] && (t = n[i].replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
            }

            function a() {
                e.enable("")
            }

            function u(t) {
                var n, r;
                for (n = 0, r = e.skips.length; r > n; n++)
                    if (e.skips[n].test(t)) return !1;
                for (n = 0, r = e.names.length; r > n; n++)
                    if (e.names[n].test(t)) return !0;
                return !1
            }

            function s(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            e = n.exports = i, e.coerce = s, e.disable = a, e.enable = o, e.enabled = u, e.humanize = t("ms"), e.names = [], e.skips = [], e.formatters = {};
            var c, l = 0
        }, {
            ms: 24
        }],
        24: [function(t, n, e) {
            function r(t) {
                var n = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(t);
                if (n) {
                    var e = parseFloat(n[1]),
                        r = (n[2] || "ms").toLowerCase();
                    switch (r) {
                        case "years":
                        case "year":
                        case "y":
                            return e * f;
                        case "days":
                        case "day":
                        case "d":
                            return e * l;
                        case "hours":
                        case "hour":
                        case "h":
                            return e * c;
                        case "minutes":
                        case "minute":
                        case "m":
                            return e * s;
                        case "seconds":
                        case "second":
                        case "s":
                            return e * u;
                        case "ms":
                            return e
                    }
                }
            }

            function i(t) {
                return t >= l ? Math.round(t / l) + "d" : t >= c ? Math.round(t / c) + "h" : t >= s ? Math.round(t / s) + "m" : t >= u ? Math.round(t / u) + "s" : t + "ms"
            }

            function o(t) {
                return a(t, l, "day") || a(t, c, "hour") || a(t, s, "minute") || a(t, u, "second") || t + " ms"
            }

            function a(t, n, e) {
                return n > t ? void 0 : 1.5 * n > t ? Math.floor(t / n) + " " + e : Math.ceil(t / n) + " " + e + "s"
            }
            var u = 1e3,
                s = 60 * u,
                c = 60 * s,
                l = 24 * c,
                f = 365.25 * l;
            n.exports = function(t, n) {
                return n = n || {}, "string" == typeof t ? r(t) : n["long"] ? o(t) : i(t)
            }
        }, {}],
        25: [function(t, n, e) {
            (function(n) {
                function r(t, n) {
                    var r = "b" + e.packets[t.type] + t.data.data;
                    return n(r)
                }

                function i(t, n, r) {
                    if (!n) return e.encodeBase64Packet(t, r);
                    var i = t.data,
                        o = new Uint8Array(i),
                        a = new Uint8Array(1 + i.byteLength);
                    a[0] = y[t.type];
                    for (var u = 0; u < o.length; u++) a[u + 1] = o[u];
                    return r(a.buffer)
                }

                function o(t, n, r) {
                    if (!n) return e.encodeBase64Packet(t, r);
                    var i = new FileReader;
                    return i.onload = function() {
                        t.data = i.result, e.encodePacket(t, n, !0, r)
                    }, i.readAsArrayBuffer(t.data)
                }

                function a(t, n, r) {
                    if (!n) return e.encodeBase64Packet(t, r);
                    if (v) return o(t, n, r);
                    var i = new Uint8Array(1);
                    i[0] = y[t.type];
                    var a = new x([i.buffer, t.data]);
                    console.log('*****************************a',a);
                    return r(a)
                }

                function u(t, n, e) {
                    for (var r = new Array(t.length), i = h(t.length, e), o = function(t, e, i) {
                            n(e, function(n, e) {
                                r[t] = e, i(n, r)
                            })
                        }, a = 0; a < t.length; a++) o(a, t[a], i)
                }
                var s = t("./keys"),
                    c = t("has-binary"),
                    l = t("arraybuffer.slice"),
                    f = t("base64-arraybuffer"),
                    h = t("after"),
                    p = t("utf8"),
                    g = navigator.userAgent.match(/Android/i),
                    d = /PhantomJS/i.test(navigator.userAgent),
                    v = g || d;
                e.protocol = 3;
                var y = e.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                    m = s(y),
                    b = {
                        type: "error",
                        data: "parser error"
                    },
                    x = t("blob");
                e.encodePacket = function(t, e, o, u) {
                    "function" == typeof e && (u = e, e = !1), "function" == typeof o && (u = o, o = null);
                    var s = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                    if (n.ArrayBuffer && s instanceof ArrayBuffer) return i(t, e, u);
                    if (x && s instanceof n.Blob) return a(t, e, u);
                    if (s && s.base64) return r(t, u);
                    var c = y[t.type];
                    return void 0 !== t.data && (c += o ? p.encode(String(t.data)) : String(t.data)), u("" + c)
                }, e.encodeBase64Packet = function(t, r) {
                    var i = "b" + e.packets[t.type];
                    if (x && t.data instanceof x) {
                        var o = new FileReader;
                        return o.onload = function() {
                            var t = o.result.split(",")[1];
                            r(i + t)
                        }, o.readAsDataURL(t.data)
                    }
                    var a;
                    try {
                        a = String.fromCharCode.apply(null, new Uint8Array(t.data))
                    } catch (u) {
                        for (var s = new Uint8Array(t.data), c = new Array(s.length), l = 0; l < s.length; l++) c[l] = s[l];
                        a = String.fromCharCode.apply(null, c)
                    }
                    return i += n.btoa(a), r(i)
                }, e.decodePacket = function(t, n, r) {
                    if ("string" == typeof t || void 0 === t) {
                        if ("b" == t.charAt(0)) return e.decodeBase64Packet(t.substr(1), n);
                        if (r) try {
                            t = p.decode(t)
                        } catch (i) {
                            return b
                        }
                        var o = t.charAt(0);
                        return Number(o) == o && m[o] ? t.length > 1 ? {
                            type: m[o],
                            data: t.substring(1)
                        } : {
                            type: m[o]
                        } : b
                    }
                    var a = new Uint8Array(t),
                        o = a[0],
                        u = l(t, 1);
                    return x && "blob" === n && (u = new x([u])), {
                        type: m[o],
                        data: u
                    }
                }, e.decodeBase64Packet = function(t, e) {
                    var r = m[t.charAt(0)];
                    if (!n.ArrayBuffer) return {
                        type: r,
                        data: {
                            base64: !0,
                            data: t.substr(1)
                        }
                    };
                    var i = f.decode(t.substr(1));
                    return "blob" === e && x && (i = new x([i])), {
                        type: r,
                        data: i
                    }
                }, e.encodePayload = function(t, n, r) {
                    function i(t) {
                        return t.length + ":" + t
                    }

                    function o(t, r) {
                        e.encodePacket(t, a ? n : !1, !0, function(t) {
                            r(null, i(t))
                        })
                    }
                    "function" == typeof n && (r = n, n = null);
                    var a = c(t);
                    return n && a ? x && !v ? e.encodePayloadAsBlob(t, r) : e.encodePayloadAsArrayBuffer(t, r) : t.length ? void u(t, o, function(t, n) {
                        return r(n.join(""))
                    }) : r("0:")
                }, e.decodePayload = function(t, n, r) {
                    if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, r);
                    "function" == typeof n && (r = n, n = null);
                    var i;
                    if ("" == t) return r(b, 0, 1);
                    for (var o, a, u = "", s = 0, c = t.length; c > s; s++) {
                        var l = t.charAt(s);
                        if (":" != l) u += l;
                        else {
                            if ("" == u || u != (o = Number(u))) return r(b, 0, 1);
                            if (a = t.substr(s + 1, o), u != a.length) return r(b, 0, 1);
                            if (a.length) {
                                if (i = e.decodePacket(a, n, !0), b.type == i.type && b.data == i.data) return r(b, 0, 1);
                                var f = r(i, s + o, c);
                                if (!1 === f) return
                            }
                            s += o, u = ""
                        }
                    }
                    return "" != u ? r(b, 0, 1) : void 0
                }, e.encodePayloadAsArrayBuffer = function(t, n) {
                    function r(t, n) {
                        e.encodePacket(t, !0, !0, function(t) {
                            return n(null, t)
                        })
                    }
                    return t.length ? void u(t, r, function(t, e) {
                        var r = e.reduce(function(t, n) {
                                var e;
                                return e = "string" == typeof n ? n.length : n.byteLength, t + e.toString().length + e + 2
                            }, 0),
                            i = new Uint8Array(r),
                            o = 0;
                        return e.forEach(function(t) {
                            var n = "string" == typeof t,
                                e = t;
                            if (n) {
                                for (var r = new Uint8Array(t.length), a = 0; a < t.length; a++) r[a] = t.charCodeAt(a);
                                e = r.buffer
                            }
                            n ? i[o++] = 0 : i[o++] = 1;
                            for (var u = e.byteLength.toString(), a = 0; a < u.length; a++) i[o++] = parseInt(u[a]);
                            i[o++] = 255;
                            for (var r = new Uint8Array(e), a = 0; a < r.length; a++) i[o++] = r[a]
                        }), n(i.buffer)
                    }) : n(new ArrayBuffer(0))
                }, e.encodePayloadAsBlob = function(t, n) {
                    function r(t, n) {
                        e.encodePacket(t, !0, !0, function(t) {
                            var e = new Uint8Array(1);
                            if (e[0] = 1, "string" == typeof t) {
                                for (var r = new Uint8Array(t.length), i = 0; i < t.length; i++) r[i] = t.charCodeAt(i);
                                t = r.buffer, e[0] = 0
                            }
                            for (var o = t instanceof ArrayBuffer ? t.byteLength : t.size, a = o.toString(), u = new Uint8Array(a.length + 1), i = 0; i < a.length; i++) u[i] = parseInt(a[i]);
                            if (u[a.length] = 255, x) {
                                var s = new x([e.buffer, u.buffer, t]);
                                n(null, s)
                            }
                        })
                    }
                    u(t, r, function(t, e) {
                        return n(new x(e))
                    })
                }, e.decodePayloadAsBinary = function(t, n, r) {
                    "function" == typeof n && (r = n, n = null);
                    for (var i = t, o = [], a = !1; i.byteLength > 0;) {
                        for (var u = new Uint8Array(i), s = 0 === u[0], c = "", f = 1; 255 != u[f]; f++) {
                            if (c.length > 310) {
                                a = !0;
                                break
                            }
                            c += u[f]
                        }
                        if (a) return r(b, 0, 1);
                        i = l(i, 2 + c.length), c = parseInt(c);
                        var h = l(i, 0, c);
                        if (s) try {
                            h = String.fromCharCode.apply(null, new Uint8Array(h))
                        } catch (p) {
                            var g = new Uint8Array(h);
                            h = "";
                            for (var f = 0; f < g.length; f++) h += String.fromCharCode(g[f])
                        }
                        o.push(h), i = l(i, c)
                    }
                    var d = o.length;
                    o.forEach(function(t, i) {
                        r(e.decodePacket(t, n, !0), i, d)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./keys": 26,
            after: 27,
            "arraybuffer.slice": 28,
            "base64-arraybuffer": 29,
            blob: 30,
            "has-binary": 31,
            utf8: 33
        }],
        26: [function(t, n, e) {
            n.exports = Object.keys || function(t) {
                var n = [],
                    e = Object.prototype.hasOwnProperty;
                for (var r in t) e.call(t, r) && n.push(r);
                return n
            }
        }, {}],
        27: [function(t, n, e) {
            function r(t, n, e) {
                function r(t, i) {
                    if (r.count <= 0) throw new Error("after called too many times");
                    --r.count, t ? (o = !0, n(t), n = e) : 0 !== r.count || o || n(null, i)
                }
                var o = !1;
                return e = e || i, r.count = t, 0 === t ? n() : r
            }

            function i() {}
            n.exports = r
        }, {}],
        28: [function(t, n, e) {
            n.exports = function(t, n, e) {
                var r = t.byteLength;
                if (n = n || 0, e = e || r, t.slice) return t.slice(n, e);
                if (0 > n && (n += r), 0 > e && (e += r), e > r && (e = r), n >= r || n >= e || 0 === r) return new ArrayBuffer(0);
                for (var i = new Uint8Array(t), o = new Uint8Array(e - n), a = n, u = 0; e > a; a++, u++) o[u] = i[a];
                return o.buffer
            }
        }, {}],
        29: [function(t, n, e) {
            ! function(t) {
                "use strict";
                e.encode = function(n) {
                    var e, r = new Uint8Array(n),
                        i = r.length,
                        o = "";
                    for (e = 0; i > e; e += 3) o += t[r[e] >> 2], o += t[(3 & r[e]) << 4 | r[e + 1] >> 4], o += t[(15 & r[e + 1]) << 2 | r[e + 2] >> 6], o += t[63 & r[e + 2]];
                    return i % 3 === 2 ? o = o.substring(0, o.length - 1) + "=" : i % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o
                }, e.decode = function(n) {
                    var e, r, i, o, a, u = .75 * n.length,
                        s = n.length,
                        c = 0;
                    "=" === n[n.length - 1] && (u--, "=" === n[n.length - 2] && u--);
                    var l = new ArrayBuffer(u),
                        f = new Uint8Array(l);
                    for (e = 0; s > e; e += 4) r = t.indexOf(n[e]), i = t.indexOf(n[e + 1]), o = t.indexOf(n[e + 2]), a = t.indexOf(n[e + 3]), f[c++] = r << 2 | i >> 4, f[c++] = (15 & i) << 4 | o >> 2, f[c++] = (3 & o) << 6 | 63 & a;
                    return l
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        30: [function(t, n, e) {
            (function(t) {
                function e(t, n) {
                    n = n || {};
                    for (var e = new r, i = 0; i < t.length; i++) e.append(t[i]);
                    return n.type ? e.getBlob(n.type) : e.getBlob()
                }
                var r = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder,
                    i = function() {
                        try {
                            var t = new Blob(["hi"]);
                            return 2 == t.size
                        } catch (n) {
                            return !1
                        }
                    }(),
                    o = r && r.prototype.append && r.prototype.getBlob;
                n.exports = function() {
                    return i ? t.Blob : o ? e : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        31: [function(t, n, e) {
            (function(e) {
                function r(t) {
                    function n(t) {
                        if (!t) return !1;
                        if (e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer || e.Blob && t instanceof Blob || e.File && t instanceof File) return !0;
                        if (i(t)) {
                            for (var r = 0; r < t.length; r++)
                                if (n(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (t.hasOwnProperty(o) && n(t[o])) return !0
                        }
                        return !1
                    }
                    return n(t)
                }
                var i = t("isarray");
                n.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 32
        }],
        32: [function(t, n, e) {
            n.exports = Array.isArray || function(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
        }, {}],
        33: [function(n, e, r) {
            (function(n) {
                ! function(i) {
                    function o(t) {
                        for (var n, e, r = [], i = 0, o = t.length; o > i;) n = t.charCodeAt(i++), n >= 55296 && 56319 >= n && o > i ? (e = t.charCodeAt(i++), 56320 == (64512 & e) ? r.push(((1023 & n) << 10) + (1023 & e) + 65536) : (r.push(n), i--)) : r.push(n);
                        return r
                    }

                    function a(t) {
                        for (var n, e = t.length, r = -1, i = ""; ++r < e;) n = t[r], n > 65535 && (n -= 65536, i += b(n >>> 10 & 1023 | 55296), n = 56320 | 1023 & n), i += b(n);
                        return i
                    }

                    function u(t, n) {
                        return b(t >> n & 63 | 128)
                    }

                    function s(t) {
                        if (0 == (4294967168 & t)) return b(t);
                        var n = "";
                        return 0 == (4294965248 & t) ? n = b(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (n = b(t >> 12 & 15 | 224), n += u(t, 6)) : 0 == (4292870144 & t) && (n = b(t >> 18 & 7 | 240), n += u(t, 12), n += u(t, 6)), n += b(63 & t | 128)
                    }

                    function c(t) {
                        for (var n, e = o(t), r = e.length, i = -1, a = ""; ++i < r;) n = e[i], a += s(n);
                        return a
                    }

                    function l() {
                        if (m >= y) throw Error("Invalid byte index");
                        var t = 255 & v[m];
                        if (m++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte")
                    }

                    function f() {
                        var t, n, e, r, i;
                        if (m > y) throw Error("Invalid byte index");
                        if (m == y) return !1;
                        if (t = 255 & v[m], m++, 0 == (128 & t)) return t;
                        if (192 == (224 & t)) {
                            var n = l();
                            if (i = (31 & t) << 6 | n, i >= 128) return i;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & t)) {
                            if (n = l(), e = l(), i = (15 & t) << 12 | n << 6 | e, i >= 2048) return i;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & t) && (n = l(), e = l(), r = l(), i = (15 & t) << 18 | n << 12 | e << 6 | r, i >= 65536 && 1114111 >= i)) return i;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function h(t) {
                        v = o(t), y = v.length, m = 0;
                        for (var n, e = [];
                            (n = f()) !== !1;) e.push(n);
                        return a(e)
                    }
                    var p = "object" == typeof r && r,
                        g = "object" == typeof e && e && e.exports == p && e,
                        d = "object" == typeof n && n;
                    (d.global === d || d.window === d) && (i = d);
                    var v, y, m, b = String.fromCharCode,
                        x = {
                            version: "2.0.0",
                            encode: c,
                            decode: h
                        };
                    if ("function" == typeof t && "object" == typeof t.amd && t.amd) t(function() {
                        return x
                    });
                    else if (p && !p.nodeType)
                        if (g) g.exports = x;
                        else {
                            var w = {},
                                M = w.hasOwnProperty;
                            for (var k in x) M.call(x, k) && (p[k] = x[k])
                        } else i.utf8 = x
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        34: [function(t, n, e) {
            (function(t) {
                var e = /^[\],:{}\s]*$/,
                    r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    i = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    o = /(?:^|:|,)(?:\s*\[)+/g,
                    a = /^\s+/,
                    u = /\s+$/;
                n.exports = function(n) {
                    return "string" == typeof n && n ? (n = n.replace(a, "").replace(u, ""), t.JSON && JSON.parse ? JSON.parse(n) : e.test(n.replace(r, "@").replace(i, "]").replace(o, "")) ? new Function("return " + n)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        35: [function(t, n, e) {
            e.encode = function(t) {
                var n = "";
                for (var e in t) t.hasOwnProperty(e) && (n.length && (n += "&"), n += encodeURIComponent(e) + "=" + encodeURIComponent(t[e]));
                return n
            }, e.decode = function(t) {
                for (var n = {}, e = t.split("&"), r = 0, i = e.length; i > r; r++) {
                    var o = e[r].split("=");
                    n[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return n
            }
        }, {}],
        36: [function(t, n, e) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            n.exports = function(t) {
                var n = t,
                    e = t.indexOf("["),
                    o = t.indexOf("]"); - 1 != e && -1 != o && (t = t.substring(0, e) + t.substring(e, o).replace(/:/g, ";") + t.substring(o, t.length));
                for (var a = r.exec(t || ""), u = {}, s = 14; s--;) u[i[s]] = a[s] || "";
                return -1 != e && -1 != o && (u.source = n, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), u.ipv6uri = !0), u
            }
        }, {}],
        37: [function(t, n, e) {
            function r(t, n, e) {
                var r;
                return r = n ? new o(t, n) : new o(t)
            }
            var i = function() {
                    return this
                }(),
                o = i.WebSocket || i.MozWebSocket;
            n.exports = o ? r : null, o && (r.prototype = o.prototype)
        }, {}],
        38: [function(t, n, e) {
            (function(e) {
                function r(t) {
                    function n(t) {
                        if (!t) return !1;
                        if (e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer || e.Blob && t instanceof Blob || e.File && t instanceof File) return !0;
                        if (i(t)) {
                            for (var r = 0; r < t.length; r++)
                                if (n(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (Object.prototype.hasOwnProperty.call(t, o) && n(t[o])) return !0
                        }
                        return !1
                    }
                    return n(t)
                }
                var i = t("isarray");
                n.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 39
        }],
        39: [function(t, n, e) {
            n.exports = t(32)
        }, {}],
        40: [function(t, n, e) {
            var r = t("global");
            try {
                n.exports = "XMLHttpRequest" in r && "withCredentials" in new r.XMLHttpRequest
            } catch (i) {
                n.exports = !1
            }
        }, {
            global: 41
        }],
        41: [function(t, n, e) {
            n.exports = function() {
                return this
            }()
        }, {}],
        42: [function(t, n, e) {
            var r = [].indexOf;
            n.exports = function(t, n) {
                if (r) return t.indexOf(n);
                for (var e = 0; e < t.length; ++e)
                    if (t[e] === n) return e;
                return -1
            }
        }, {}],
        43: [function(t, n, e) {
            var r = Object.prototype.hasOwnProperty;
            e.keys = Object.keys || function(t) {
                var n = [];
                for (var e in t) r.call(t, e) && n.push(e);
                return n
            }, e.values = function(t) {
                var n = [];
                for (var e in t) r.call(t, e) && n.push(t[e]);
                return n
            }, e.merge = function(t, n) {
                for (var e in n) r.call(n, e) && (t[e] = n[e]);
                return t
            }, e.length = function(t) {
                return e.keys(t).length
            }, e.isEmpty = function(t) {
                return 0 == e.length(t)
            }
        }, {}],
        44: [function(t, n, e) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            n.exports = function(t) {
                for (var n = r.exec(t || ""), e = {}, o = 14; o--;) e[i[o]] = n[o] || "";
                return e
            }
        }, {}],
        45: [function(t, n, e) {
            (function(n) {
                var r = t("isarray"),
                    i = t("./is-buffer");
                e.deconstructPacket = function(t) {
                    function n(t) {
                        if (!t) return t;
                        if (i(t)) {
                            var o = {
                                _placeholder: !0,
                                num: e.length
                            };
                            return e.push(t), o
                        }
                        if (r(t)) {
                            for (var a = new Array(t.length), u = 0; u < t.length; u++) a[u] = n(t[u]);
                            return a
                        }
                        if ("object" == typeof t && !(t instanceof Date)) {
                            var a = {};
                            for (var s in t) a[s] = n(t[s]);
                            return a
                        }
                        return t
                    }
                    var e = [],
                        o = t.data,
                        a = t;
                    return a.data = n(o), a.attachments = e.length, {
                        packet: a,
                        buffers: e
                    }
                }, e.reconstructPacket = function(t, n) {
                    function e(t) {
                        if (t && t._placeholder) {
                            var i = n[t.num];
                            return i
                        }
                        if (r(t)) {
                            for (var o = 0; o < t.length; o++) t[o] = e(t[o]);
                            return t
                        }
                        if (t && "object" == typeof t) {
                            for (var a in t) t[a] = e(t[a]);
                            return t
                        }
                        return t
                    }
                    return t.data = e(t.data), t.attachments = void 0, t
                }, e.removeBlobs = function(t, e) {
                    function o(t, s, c) {
                        if (!t) return t;
                        if (n.Blob && t instanceof Blob || n.File && t instanceof File) {
                            a++;
                            var l = new FileReader;
                            l.onload = function() {
                                c ? c[s] = this.result : u = this.result, --a || e(u)
                            }, l.readAsArrayBuffer(t)
                        } else if (r(t))
                            for (var f = 0; f < t.length; f++) o(t[f], f, t);
                        else if (t && "object" == typeof t && !i(t))
                            for (var h in t) o(t[h], h, t)
                    }
                    var a = 0,
                        u = t;
                    o(u), a || e(u)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./is-buffer": 47,
            isarray: 48
        }],
        46: [function(t, n, e) {
            function r() {}

            function i(t) {
                var n = "",
                    r = !1;
                return n += t.type, (e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) && (n += t.attachments, n += "-"), t.nsp && "/" != t.nsp && (r = !0, n += t.nsp), null != t.id && (r && (n += ",", r = !1), n += t.id), null != t.data && (r && (n += ","), n += f.stringify(t.data)), l("encoded %j as %s", t, n), n
            }

            function o(t, n) {
                function e(t) {
                    var e = p.deconstructPacket(t),
                        r = i(e.packet),
                        o = e.buffers;
                    o.unshift(r), n(o)
                }
                p.removeBlobs(t, e)
            }

            function a() {
                this.reconstructor = null
            }

            function u(t) {
                var n = {},
                    r = 0;
                if (n.type = Number(t.charAt(0)), null == e.types[n.type]) return c();
                if (e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type) {
                    for (var i = "";
                        "-" != t.charAt(++r) && (i += t.charAt(r), r != t.length););
                    if (i != Number(i) || "-" != t.charAt(r)) throw new Error("Illegal attachments");
                    n.attachments = Number(i)
                }
                if ("/" == t.charAt(r + 1))
                    for (n.nsp = ""; ++r;) {
                        var o = t.charAt(r);
                        if ("," == o) break;
                        if (n.nsp += o, r == t.length) break
                    } else n.nsp = "/";
                var a = t.charAt(r + 1);
                if ("" !== a && Number(a) == a) {
                    for (n.id = ""; ++r;) {
                        var o = t.charAt(r);
                        if (null == o || Number(o) != o) {
                            --r;
                            break
                        }
                        if (n.id += t.charAt(r), r == t.length) break
                    }
                    n.id = Number(n.id)
                }
                if (t.charAt(++r)) try {
                    n.data = f.parse(t.substr(r))
                } catch (u) {
                    return c()
                }
                return l("decoded %s as %j", t, n), n
            }

            function s(t) {
                this.reconPack = t, this.buffers = []
            }

            function c(t) {
                return {
                    type: e.ERROR,
                    data: "parser error"
                }
            }
            var l = t("debug")("socket.io-parser"),
                f = t("json3"),
                h = (t("isarray"), t("component-emitter")),
                p = t("./binary"),
                g = t("./is-buffer");
            e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = r, e.Decoder = a, r.prototype.encode = function(t, n) {
                if (l("encoding packet %j", t), e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) o(t, n);
                else {
                    var r = i(t);
                    n([r])
                }
            }, h(a.prototype), a.prototype.add = function(t) {
                var n;
                if ("string" == typeof t) n = u(t), e.BINARY_EVENT == n.type || e.BINARY_ACK == n.type ? (this.reconstructor = new s(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
                else {
                    if (!g(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, this.emit("decoded", n))
                }
            }, a.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, s.prototype.takeBinaryData = function(t) {
                if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
                    var n = p.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), n
                }
                return null
            }, s.prototype.finishedReconstruction = function() {
                this.reconPack = null, this.buffers = []
            }
        }, {
            "./binary": 45,
            "./is-buffer": 47,
            "component-emitter": 9,
            debug: 10,
            isarray: 48,
            json3: 49
        }],
        47: [function(t, n, e) {
            (function(t) {
                function e(n) {
                    return t.Buffer && t.Buffer.isBuffer(n) || t.ArrayBuffer && n instanceof ArrayBuffer
                }
                n.exports = e
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        48: [function(t, n, e) {
            n.exports = t(32)
        }, {}],
        49: [function(n, e, r) {
            ! function(n) {
                function e(t) {
                    if (e[t] !== a) return e[t];
                    var n;
                    if ("bug-string-char-index" == t) n = "a" != "a" [0];
                    else if ("json" == t) n = e("json-stringify") && e("json-parse");
                    else {
                        var r, i = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == t) {
                            var o = l.stringify,
                                s = "function" == typeof o && f;
                            if (s) {
                                (r = function() {
                                    return 1
                                }).toJSON = r;
                                try {
                                    s = "0" === o(0) && "0" === o(new Number) && '""' == o(new String) && o(u) === a && o(a) === a && o() === a && "1" === o(r) && "[1]" == o([r]) && "[null]" == o([a]) && "null" == o(null) && "[null,null,null]" == o([a, u, null]) && o({
                                        a: [r, !0, !1, null, "\x00\b\n\f\r	"]
                                    }) == i && "1" === o(null, r) && "[\n 1,\n 2\n]" == o([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == o(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == o(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == o(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == o(new Date(-1))
                                } catch (c) {
                                    s = !1
                                }
                            }
                            n = s
                        }
                        if ("json-parse" == t) {
                            var h = l.parse;
                            if ("function" == typeof h) try {
                                if (0 === h("0") && !h(!1)) {
                                    r = h(i);
                                    var p = 5 == r.a.length && 1 === r.a[0];
                                    if (p) {
                                        try {
                                            p = !h('"	"')
                                        } catch (c) {}
                                        if (p) try {
                                            p = 1 !== h("01")
                                        } catch (c) {}
                                        if (p) try {
                                            p = 1 !== h("1.")
                                        } catch (c) {}
                                    }
                                }
                            } catch (c) {
                                p = !1
                            }
                            n = p
                        }
                    }
                    return e[t] = !!n
                }
                var i, o, a, u = {}.toString,
                    s = "function" == typeof t && t.amd,
                    c = "object" == typeof JSON && JSON,
                    l = "object" == typeof r && r && !r.nodeType && r;
                l && c ? (l.stringify = c.stringify, l.parse = c.parse) : l = n.JSON = c || {};
                var f = new Date(-0xc782b5b800cec);
                try {
                    f = -109252 == f.getUTCFullYear() && 0 === f.getUTCMonth() && 1 === f.getUTCDate() && 10 == f.getUTCHours() && 37 == f.getUTCMinutes() && 6 == f.getUTCSeconds() && 708 == f.getUTCMilliseconds()
                } catch (h) {}
                if (!e("json")) {
                    var p = "[object Function]",
                        g = "[object Date]",
                        d = "[object Number]",
                        v = "[object String]",
                        y = "[object Array]",
                        m = "[object Boolean]",
                        b = e("bug-string-char-index");
                    if (!f) var x = Math.floor,
                        w = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        M = function(t, n) {
                            return w[n] + 365 * (t - 1970) + x((t - 1969 + (n = +(n > 1))) / 4) - x((t - 1901 + n) / 100) + x((t - 1601 + n) / 400)
                        };
                    (i = {}.hasOwnProperty) || (i = function(t) {
                        var n, e = {};
                        return (e.__proto__ = null, e.__proto__ = {
                            toString: 1
                        }, e).toString != u ? i = function(t) {
                            var n = this.__proto__,
                                e = t in (this.__proto__ = null, this);
                            return this.__proto__ = n, e
                        } : (n = e.constructor, i = function(t) {
                            var e = (this.constructor || n).prototype;
                            return t in this && !(t in e && this[t] === e[t])
                        }), e = null, i.call(this, t)
                    });
                    var k = {
                            "boolean": 1,
                            number: 1,
                            string: 1,
                            undefined: 1
                        },
                        _ = function(t, n) {
                            var e = typeof t[n];
                            return "object" == e ? !!t[n] : !k[e]
                        };
                    if (o = function(t, n) {
                            var e, r, a, s = 0;
                            (e = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, r = new e;
                            for (a in r) i.call(r, a) && s++;
                            return e = r = null, s ? o = 2 == s ? function(t, n) {
                                var e, r = {},
                                    o = u.call(t) == p;
                                for (e in t) o && "prototype" == e || i.call(r, e) || !(r[e] = 1) || !i.call(t, e) || n(e)
                            } : function(t, n) {
                                var e, r, o = u.call(t) == p;
                                for (e in t) o && "prototype" == e || !i.call(t, e) || (r = "constructor" === e) || n(e);
                                (r || i.call(t, e = "constructor")) && n(e)
                            } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], o = function(t, n) {
                                var e, o, a = u.call(t) == p,
                                    s = !a && "function" != typeof t.constructor && _(t, "hasOwnProperty") ? t.hasOwnProperty : i;
                                for (e in t) a && "prototype" == e || !s.call(t, e) || n(e);
                                for (o = r.length; e = r[--o]; s.call(t, e) && n(e));
                            }), o(t, n)
                        }, !e("json-stringify")) {
                        var S = {
                                92: "\\\\",
                                34: '\\"',
                                8: "\\b",
                                12: "\\f",
                                10: "\\n",
                                13: "\\r",
                                9: "\\t"
                            },
                            E = "000000",
                            A = function(t, n) {
                                return (E + (n || 0)).slice(-t)
                            },
                            N = "\\u00",
                            C = function(t) {
                                var n, e = '"',
                                    r = 0,
                                    i = t.length,
                                    o = i > 10 && b;
                                for (o && (n = t.split("")); i > r; r++) {
                                    var a = t.charCodeAt(r);
                                    switch (a) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            e += S[a];
                                            break;
                                        default:
                                            if (32 > a) {
                                                e += N + A(2, a.toString(16));
                                                break
                                            }
                                            e += o ? n[r] : b ? t.charAt(r) : t[r]
                                    }
                                }
                                return e + '"'
                            },
                            T = function(t, n, e, r, s, c, l) {
                                var f, h, p, b, w, k, _, S, E, N, j, O, P, L, R, q;
                                try {
                                    f = n[t]
                                } catch (B) {}
                                if ("object" == typeof f && f)
                                    if (h = u.call(f), h != g || i.call(f, "toJSON")) "function" == typeof f.toJSON && (h != d && h != v && h != y || i.call(f, "toJSON")) && (f = f.toJSON(t));
                                    else if (f > -1 / 0 && 1 / 0 > f) {
                                    if (M) {
                                        for (w = x(f / 864e5), p = x(w / 365.2425) + 1970 - 1; M(p + 1, 0) <= w; p++);
                                        for (b = x((w - M(p, 0)) / 30.42); M(p, b + 1) <= w; b++);
                                        w = 1 + w - M(p, b), k = (f % 864e5 + 864e5) % 864e5, _ = x(k / 36e5) % 24, S = x(k / 6e4) % 60, E = x(k / 1e3) % 60, N = k % 1e3
                                    } else p = f.getUTCFullYear(), b = f.getUTCMonth(), w = f.getUTCDate(), _ = f.getUTCHours(), S = f.getUTCMinutes(), E = f.getUTCSeconds(), N = f.getUTCMilliseconds();
                                    f = (0 >= p || p >= 1e4 ? (0 > p ? "-" : "+") + A(6, 0 > p ? -p : p) : A(4, p)) + "-" + A(2, b + 1) + "-" + A(2, w) + "T" + A(2, _) + ":" + A(2, S) + ":" + A(2, E) + "." + A(3, N) + "Z"
                                } else f = null;
                                if (e && (f = e.call(n, t, f)), null === f) return "null";
                                if (h = u.call(f), h == m) return "" + f;
                                if (h == d) return f > -1 / 0 && 1 / 0 > f ? "" + f : "null";
                                if (h == v) return C("" + f);
                                if ("object" == typeof f) {
                                    for (L = l.length; L--;)
                                        if (l[L] === f) throw TypeError();
                                    if (l.push(f), j = [], R = c, c += s, h == y) {
                                        for (P = 0, L = f.length; L > P; P++) O = T(P, f, e, r, s, c, l), j.push(O === a ? "null" : O);
                                        q = j.length ? s ? "[\n" + c + j.join(",\n" + c) + "\n" + R + "]" : "[" + j.join(",") + "]" : "[]"
                                    } else o(r || f, function(t) {
                                        var n = T(t, f, e, r, s, c, l);
                                        n !== a && j.push(C(t) + ":" + (s ? " " : "") + n)
                                    }), q = j.length ? s ? "{\n" + c + j.join(",\n" + c) + "\n" + R + "}" : "{" + j.join(",") + "}" : "{}";
                                    return l.pop(), q
                                }
                            };
                        l.stringify = function(t, n, e) {
                            var r, i, o, a;
                            if ("function" == typeof n || "object" == typeof n && n)
                                if ((a = u.call(n)) == p) i = n;
                                else if (a == y) {
                                o = {};
                                for (var s, c = 0, l = n.length; l > c; s = n[c++], a = u.call(s), (a == v || a == d) && (o[s] = 1));
                            }
                            if (e)
                                if ((a = u.call(e)) == d) {
                                    if ((e -= e % 1) > 0)
                                        for (r = "", e > 10 && (e = 10); r.length < e; r += " ");
                                } else a == v && (r = e.length <= 10 ? e : e.slice(0, 10));
                            return T("", (s = {}, s[""] = t, s), i, o, r, "", [])
                        }
                    }
                    if (!e("json-parse")) {
                        var j, O, P = String.fromCharCode,
                            L = {
                                92: "\\",
                                34: '"',
                                47: "/",
                                98: "\b",
                                116: "	",
                                110: "\n",
                                102: "\f",
                                114: "\r"
                            },
                            R = function() {
                                throw j = O = null, SyntaxError()
                            },
                            q = function() {
                                for (var t, n, e, r, i, o = O, a = o.length; a > j;) switch (i = o.charCodeAt(j)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        j++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return t = b ? o.charAt(j) : o[j], j++, t;
                                    case 34:
                                        for (t = "@", j++; a > j;)
                                            if (i = o.charCodeAt(j), 32 > i) R();
                                            else if (92 == i) switch (i = o.charCodeAt(++j)) {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                t += L[i], j++;
                                                break;
                                            case 117:
                                                for (n = ++j, e = j + 4; e > j; j++) i = o.charCodeAt(j), i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i || R();
                                                t += P("0x" + o.slice(n, j));
                                                break;
                                            default:
                                                R()
                                        } else {
                                            if (34 == i) break;
                                            for (i = o.charCodeAt(j), n = j; i >= 32 && 92 != i && 34 != i;) i = o.charCodeAt(++j);
                                            t += o.slice(n, j)
                                        }
                                        if (34 == o.charCodeAt(j)) return j++, t;
                                        R();
                                    default:
                                        if (n = j, 45 == i && (r = !0, i = o.charCodeAt(++j)), i >= 48 && 57 >= i) {
                                            for (48 == i && (i = o.charCodeAt(j + 1), i >= 48 && 57 >= i) && R(), r = !1; a > j && (i = o.charCodeAt(j), i >= 48 && 57 >= i); j++);
                                            if (46 == o.charCodeAt(j)) {
                                                for (e = ++j; a > e && (i = o.charCodeAt(e), i >= 48 && 57 >= i); e++);
                                                e == j && R(), j = e
                                            }
                                            if (i = o.charCodeAt(j), 101 == i || 69 == i) {
                                                for (i = o.charCodeAt(++j), (43 == i || 45 == i) && j++,
                                                    e = j; a > e && (i = o.charCodeAt(e), i >= 48 && 57 >= i); e++);
                                                e == j && R(), j = e
                                            }
                                            return +o.slice(n, j)
                                        }
                                        if (r && R(), "true" == o.slice(j, j + 4)) return j += 4, !0;
                                        if ("false" == o.slice(j, j + 5)) return j += 5, !1;
                                        if ("null" == o.slice(j, j + 4)) return j += 4, null;
                                        R()
                                }
                                return "$"
                            },
                            B = function(t) {
                                var n, e;
                                if ("$" == t && R(), "string" == typeof t) {
                                    if ("@" == (b ? t.charAt(0) : t[0])) return t.slice(1);
                                    if ("[" == t) {
                                        for (n = []; t = q(), "]" != t; e || (e = !0)) e && ("," == t ? (t = q(), "]" == t && R()) : R()), "," == t && R(), n.push(B(t));
                                        return n
                                    }
                                    if ("{" == t) {
                                        for (n = {}; t = q(), "}" != t; e || (e = !0)) e && ("," == t ? (t = q(), "}" == t && R()) : R()), ("," == t || "string" != typeof t || "@" != (b ? t.charAt(0) : t[0]) || ":" != q()) && R(), n[t.slice(1)] = B(q());
                                        return n
                                    }
                                    R()
                                }
                                return t
                            },
                            z = function(t, n, e) {
                                var r = D(t, n, e);
                                r === a ? delete t[n] : t[n] = r
                            },
                            D = function(t, n, e) {
                                var r, i = t[n];
                                if ("object" == typeof i && i)
                                    if (u.call(i) == y)
                                        for (r = i.length; r--;) z(i, r, e);
                                    else o(i, function(t) {
                                        z(i, t, e)
                                    });
                                return e.call(t, n, i)
                            };
                        l.parse = function(t, n) {
                            var e, r;
                            return j = 0, O = "" + t, e = B(q()), "$" != q() && R(), j = O = null, n && u.call(n) == p ? D((r = {}, r[""] = e, r), "", n) : e
                        }
                    }
                }
                s && t(function() {
                    return l
                })
            }(this)
        }, {}],
        50: [function(t, n, e) {
            function r(t, n) {
                var e = [];
                n = n || 0;
                for (var r = n || 0; r < t.length; r++) e[r - n] = t[r];
                return e
            }
            n.exports = r
        }, {}]
    }, {}, [1])(1)
}),
function(t, n) {
    "function" == typeof define && define.amd ? define("ConnecterFactory", ["jquery", "io"], n) : "object" == typeof exports ? module.exports = n(require("jquery"), require("io")) : t.ConnecterFactory = n(t.jQuery, t.io)
}("undefined" != typeof window ? window : this, function(t, n) {
    function e() {
        function n(t, n) {
            for (var e = {}; n >= t; t += 1) e[t] = t;
            return e
        }
        var e = {
                basketball: {
                    1: "Not Start",
                    4: "Rt Pause",
                    16: "Finish",
                    32: "Rt Finish",
                    2e3: "Quarter break",
                    2001: "1st Quarter",
                    2002: "2nd Quarter",
                    2003: "3rd Quarter",
                    2004: "4th Quarter",
                    2005: "Overtime"
                },
                soccer: {
                    1: "Not Start",
                    2: "1st Half",
                    4: "Rt Pause",
                    8: "2nd Half",
                    16: "Finish",
                    32: "Rt Finish",
                    64: "1st Extra",
                    128: "Ex Pause",
                    256: "2nd Extra",
                    512: "Ex Finish",
                    1024: "PK"
                }
            },
            r = {
                basketball: [{
                    21: "InPossession",
                    22: "Pause",
                    24: "Foul",
                    25: "Point2",
                    26: "Point3",
                    271: "Point2Miss",
                    272: "Point3Miss",
                    28: "CancelScore",
                    29: "Substitution",
                    31: "StartOf1st",
                    32: "StartOf2nd",
                    33: "StartOf3rd",
                    34: "StartOf4th",
                    35: "StartOfOT",
                    36: "EndOfOT",
                    37: "EndOf1st",
                    38: "EndOf2nd",
                    39: "EndOf3rd",
                    310: "EndOf4th",
                    231: "TeamPenalty1",
                    232: "TeamPenalty2",
                    233: "TeamPenalty3",
                    234: "TeamPenaltyScore",
                    235: "TeamPenaltyMiss",
                    311: "BeforeOT",
                    312: "MatchFinish",
                    990: "ForceUpdateStati"
                }, {
                    1: "home",
                    2: "away"
                }, n(1, 3), n(0, 9), n(0, 9), n(0, 99)],
                soccer: [{
                    21: "InPossession",
                    22: "Attack",
                    23: "DangerousAttack",
                    24: "ThrowIn",
                    25: "GoalKick",
                    261: "ShotOnTarget",
                    262: "ShotOffTarget",
                    263: "ShotBlocked",
                    27: "FreeKick",
                    28: "Penalty",
                    29: "CornerKick",
                    210: "Offside",
                    211: "Breakaway",
                    31: "YellowCard",
                    32: "RedCard",
                    33: "Goal",
                    34: "InjuryBreak",
                    35: "Substitution",
                    36: "Suspend",
                    37: "HalfTime",
                    38: "GameOver",
                    39: "GameStart",
                    310: "Restart",
                    311: "FirstExtra",
                    312: "SecondExtra",
                    313: "ExtraTimeStop",
                    314: "SecondYellowCard",
                    990: "ForceUpdateStati"
                }, {
                    1: "home",
                    2: "away"
                }, {
                    1: "left",
                    2: "right"
                }, {
                    1: "zone1",
                    2: "zone2",
                    3: "zone3",
                    4: "zone4",
                    5: "zone5"
                }, {
                    1: "danzone1",
                    2: "danzone2",
                    3: "danzone3",
                    4: "danzone4",
                    5: "danzone5"
                }]
            },
            a = {
                basketball: {
                    score: "score",
                    bonus: "bonus",
                    fouls: "fouls",
                    points2: "points2",
                    points3: "points3",
                    timeout: "timeout",
                    ftcount: "ftcount",
                    q1Point: "q1Point",
                    q2Point: "q2Point",
                    q3Point: "q3Point",
                    q4Point: "q4Point",
                    otPoint: "otPoint"
                },
                soccer: {
                    goal: "goal",
                    corner: "corner",
                    yc: "yellowcard",
                    rc: "redcard",
                    pen: "penalty",
                    ontarget: "ontarget",
                    offtarget: "offtarget",
                    time: "time",
                    condition: "condition"
                }
            },
            u = {
                basketball: ["event", "team", "zone", "penaltyOrder", "totalPenalty", "weight"],
                soccer: ["event", "team", "side", "zone", "danzone"]
            },
            s = {
                basketball: /e(\d{2,3})t?(\d?)z?(\d?)f?(\d?)(\d?)d?(\d{0,2})/,
                soccer: /e(\d{2,3})t?(\d?)s?(\d?)z?(\d?)d?z?(\d?)/
            },
            c = {
                basketball: {
                    home: {
                        score: 0,
                        bonus: 0,
                        fouls: 0,
                        points2: 0,
                        points3: 0,
                        timeout: 0,
                        ftcount: 0,
                        q1Point: 0,
                        q2Point: 0,
                        q3Point: 0,
                        q4Point: 0,
                        otPoint: 0
                    },
                    away: {
                        score: 0,
                        bonus: 0,
                        fouls: 0,
                        points2: 0,
                        points3: 0,
                        timeout: 0,
                        ftcount: 0,
                        q1Point: 0,
                        q2Point: 0,
                        q3Point: 0,
                        q4Point: 0,
                        otPoint: 0
                    },
                    lastEventTime: "00:00",
                    condition: "Not Start"
                },
                soccer: {
                    home: {
                        goal: [],
                        corner: 0,
                        yellowcard: [],
                        redcard: [],
                        penalty: 0,
                        ontarget: 0,
                        offtarget: 0,
                        time: "00:00",
                        condition: "Not Start"
                    },
                    away: {
                        goal: [],
                        corner: 0,
                        yellowcard: [],
                        redcard: [],
                        penalty: 0,
                        ontarget: 0,
                        offtarget: 0,
                        time: "00:00",
                        condition: "Not Start"
                    },
                    lastEventTime: "00:00",
                    condition: "Not Start"
                }
            },
            l = {
                userlang: void 0,
                gvType: void 0,
                socket: void 0,
                fileUrl: "//gvweb.garcade.net:8096",
                wsUrl: "//gvweb.garcade.net",
                gvlibver: void 0,
                gvUrl: void 0,
                imgUrl: void 0,
                renderName: void 0,
                application: void 0
            },
            f = {
                soccer: {
                    full: {
                        gvType: "full",
                        gvUrl: "/soccer/gvlib-desktop.js",
                        imgUrl: "/soccer/desktop/",
                        renderName: "SoccerTabletopRenderer",
                        application: "SOCCER"
                    },
                    widget: {
                        gvType: "widget",
                        gvUrl: "/soccer/gvlib-widget.js",
                        imgUrl: "/soccer/widget/",
                        renderName: "SoccerWidgetRenderer",
                        application: "SOCCER"
                    },
                    mobile: {
                        gvType: "mobile",
                        gvUrl: "/soccer/gvlib-mobile.js",
                        imgUrl: "/soccer/touch_device/",
                        renderName: "SoccerTouchDeviceRenderer",
                        application: "SOCCER"
                    }
                },
                basketball: {
                    full: {
                        gvType: "full",
                        gvUrl: "/basketball/gvlib-desktop.js",
                        imgUrl: "/basketball/desktop/",
                        renderName: "BasketballTabletopRenderer",
                        application: "BASKETBALL"
                    },
                    widget: {
                        gvType: "widget",
                        gvUrl: "/basketball/gvlib-widget.js",
                        imgUrl: "/basketball/widget/",
                        renderName: "SoccerWidgetRenderer",
                        application: "BASKETBALL"
                    },
                    mobile: {
                        gvType: "mobile",
                        gvUrl: "/basketball/gvlib-mobile.js",
                        imgUrl: "/basketball/touch_device/",
                        renderName: "BasketballTouchDeviceRenderer",
                        application: "BASKETBALL"
                    }
                }
            };
        this.getConnector = function(n, h) {
            var p = t.extend({}, l);
            switch (h = -1 !== Object.keys(f).indexOf(h) ? h : "soccer", n = -1 !== Object.keys(f[h]).indexOf(n) ? n : "full", p = t.extend(p, f[h][n]), p.gvUrl = p.fileUrl + p.gvUrl, p.imgUrl = p.fileUrl + p.imgUrl, h) {
                case "soccer":
                    return new i(p, e[h], r[h], a[h], u[h], s[h], c[h]);
                case "basketball":
                    return new o(p, e[h], r[h], a[h], u[h], s[h], c[h])
            }
        }
    }

    function r(e, r, i, o, u, s, c) {
        function l() {
            if ("object" == typeof l.instance) return l.instance;
            var n, e = 200,
                r = void 0,
                i = function() {
                    var r = 1 === t(f.gvContainer).length ? t(f.gvContainer).width() : -1;
                    this.cronTask = setTimeout(i, e), r !== n && (-1 === r ? f.gvend() : f.rendererResize()), n = r
                };
            this.start = function() {
                n = t(f.gvContainer).width(), r = setTimeout(i, e)
            }, this.stop = function() {
                clearTimeout(r)
            }, this.start = this.start.bind(this), this.stop = this.stop.bind(this), l.instance = this
        }
        var f = this;
        this.eventQueue = [], this.gv_event = void 0, this.gv_summaryinfo = void 0, this.keepAuth = void 0, this.reconnTask = void 0, this.disconnectLimit = 10, this.renderer = void 0, this.gvContainer = void 0, this.history = void 0, this.waitForVersion = void 0, this.gvMonitor = new l, this.trailObj = e, this.conditionDef = r, this.eventsDef = i, this.keyMapping = o, this.paraDef = u, this.eventRegex = s, this.defaultHistory = c, this.invert = function(t) {
            var n = {};
            for (var e in t) t.hasOwnProperty(e) && (n[t[e]] = e);
            return n
        }, this.defToCondition = this.invert(r), this.getGID = function(t) {
            function n() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            for (var e = "", r = 0; t > r; r += 1) e += n();
            return e
        }, this.getInternetExplorerVersion = function() {
            var t = -1;
            if ("Microsoft Internet Explorer" == navigator.appName) {
                var n = navigator.userAgent,
                    e = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                null !== e.exec(n) && (t = parseFloat(RegExp.$1))
            }
            return t
        }, this.scriptLoadedCallback = function() {
            1 == t(this.gvContainer).length && this.startGV()
        }, this.cachedScript = function(n, e) {
            e = t.extend(e || {}, {
                dataType: "script",
                cache: !0,
                url: n + "?v=" + this.trailObj.gvlibver,
                scriptCharset: "UTF-8",
                success: this.scriptLoadedCallback
            }), t.ajax(e)
        }, this.infoMapping = function(t, n) {
            var e = this,
                r = {};
            return t.forEach(function(t, i) {
                e.keyMapping[t] ? r[e.keyMapping[t]] = n[i] : r[t] = n[i]
            }), r
        }, this.subscribeMatch = function() {
            this.history = t.extend({}, this.defaultHistory), this.trailObj.socket.emit("subscribe", {
                application: this.trailObj.application,
                id: this.trailObj.matchid
            })
        }, this.cutscene = function(t) {
            this.renderer && ("reconnecting" === t ? (this.renderer.resetField(), this.renderer.reconnecting()) : "disconnect" === t && this.renderer.disconnect())
        }, this.getSocket = function() {
            var t, e = a + this.trailObj.wsUrl;
            return t = 9 !== this.getInternetExplorerVersion() ? n.connect(e, {
                multiplex: !1,
                transports: ["websocket", "polling"],
                query: {
                    key: this.trailObj.dispatcherkey,
                    gid: this.getGID(8)
                },
                reconnection: !1
            }) : n.connect(e, {
                multiplex: !1,
                transports: ["polling"],
                query: {
                    key: this.trailObj.dispatcherkey,
                    gid: this.getGID(8)
                },
                reconnection: !1
            })
        }, this.bindSocketEvent = function(t) {
            var n = this;
            return t.on("connect", function() {
                n.disconnectLimit <= 5 && (n.renderer.clear(), n.startGV(!0), n.renderer.prepare(n.trailObj.homename, n.trailObj.awayname)), n.disconnectLimit = 10, n.subscribeMatch()
            }).on("connect_error", function(t) {
                n.disconnectLimit -= 1, n.disconnectLimit > 0 ? (5 == n.disconnectLimit && n.cutscene("reconnecting"), n.doReconnect()) : n.cutscene("disconnect")
            }).on("event", function(t) {
                n.eventParser("event", t)
            }).on("history", function(t) {
                n.eventParser("history", t)
            }).on("disconnect", function() {
                n.disconnectLimit -= 1, n.disconnectLimit > 0 ? (5 == n.disconnectLimit && n.cutscene("reconnecting"), n.doReconnect()) : n.cutscene("disconnect")
            }).on("error", function(t) {}).on("reconnect", function(t) {}).on("reconnect_attempt", function() {}).on("reconnecting", function(e) {
                e === t.io._reconnectionAttempts / 2 && n.cutscene("reconnecting"), e === t.io._reconnectionAttempts && n.cutscene("disconnect")
            }).on("reconnect_error", function(t) {}).on("reconnect_failed", function() {}), t
        }, this.doReconnect = function() {
            var t = this;
            clearTimeout(this.reconnTask), this.reconnTask = setTimeout(function() {
                t.trailObj.socket = t.bindSocketEvent(t.getSocket())
            }, 2e3)
        }, this.hitServant = function() {
            var t = this;
            this.renderer.prepare(this.trailObj.homename, this.trailObj.awayname), void 0 === this.trailObj.socket ? this.trailObj.socket = this.bindSocketEvent(this.getSocket()) : this.subscribeMatch(), this.keepAuth = setInterval(function() {
                void 0 === t.trailObj.socket ? clearInterval(t.keepAuth) : t.trailObj.socket.emit("auth", t.trailObj.dispatcherkey)
            }, 6e4)
        }, this.rendererResize = function() {
            this.renderer && t(this.gvContainer).width() > 0 && this.renderer.resize()
        }, this.setGvlibVersion = function(t) {
            this.trailObj.gvlibver = t
        }, this.getGvlibVersion = function() {
            var n = this;
            t.ajax({
                url: this.trailObj.fileUrl + "/version",
                dataType: "jsonp",
                jsonpCallback: "setGvlibVersion",
                success: function(t) {
                    n.trailObj.gvlibver = t
                }
            })
        }, this.getGvlibVersion(), this.preStartGV = function(t) {
            this.trailObj.dispatcherkey && (void 0 !== window && window.hasOwnProperty(this.trailObj.renderName) && void 0 === t ? this.startGV() : void 0 === this.trailObj.gvlibver ? this.waitForVersion = setTimeout(this.preStartGV, 100) : this.cachedScript(a + this.trailObj.gvUrl))
        }, this.startGV = function(n) {
            this.renderer = new window[this.trailObj.renderName], this.renderer.image_base_path = a + this.trailObj.imgUrl, this.renderer.set_initial_global(), this.renderer.set_initial_playground(), this.renderer.set_initial_langpack(), this.renderer.set_container_id(this.trailObj.divid), this.renderer.set_lang(this.trailObj.userlang), n !== !0 && ("widget" == this.trailObj.gvType || t(window).on("resize", this.rendererResize), this.hitServant()), this.gvMonitor.start()
        }, this.gvstart = function(n, e, r, i) {
            (this.getInternetExplorerVersion() > 8 || -1 === this.getInternetExplorerVersion()) && (this.gvContainer = "#" + i, t.extend(this.trailObj, {
                matchid: n,
                homename: e,
                awayname: r,
                divid: i
            }), this.trailObj.userlang = -1 !== this.langSet.indexOf(this.trailObj.userlang) ? this.trailObj.userlang : "en", this.gvend(), this.preStartGV())
        }, this.gvend = function() {
            if (this.trailObj.socket) {
                try {
                    this.trailObj.socket.disconnect()
                } catch (n) {}
                this.trailObj.socket = void 0
            }
            this.renderer && this.renderer.clear(), clearInterval(this.keepAuth), clearTimeout(this.reconnTask), clearTimeout(this.waitForVersion), t(window).off("resize", this.rendererResize), this.eventQueue = [], this.disconnectLimit = 10, this.gv_event = void 0, this.gv_summaryinfo = void 0, this.keepAuth = void 0, this.renderer = void 0, this.history = void 0, this.gvMonitor.stop()
        }, this.gvreload = function() {
            this.gvend(), this.preStartGV()
        }, this.setKey = function(t) {
            this.trailObj.dispatcherkey = t
        }, this.setUserLang = function(t) {
            this.trailObj.userlang = t, this.renderer && this.renderer.set_lang(t)
        }, this.setTeamName = function(t, n) {
            this.renderer && this.renderer.set_team_name(t, n)
        }, this.getTrailObj = function() {
            return this.trailObj
        }, this.invert = this.invert.bind(this), this.getGID = this.getGID.bind(this), this.getInternetExplorerVersion = this.getInternetExplorerVersion.bind(this), this.scriptLoadedCallback = this.scriptLoadedCallback.bind(this), this.cachedScript = this.cachedScript.bind(this), this.infoMapping = this.infoMapping.bind(this), this.subscribeMatch = this.subscribeMatch.bind(this), this.cutscene = this.cutscene.bind(this), this.getSocket = this.getSocket.bind(this), this.bindSocketEvent = this.bindSocketEvent.bind(this), this.doReconnect = this.doReconnect.bind(this), this.hitServant = this.hitServant.bind(this), this.rendererResize = this.rendererResize.bind(this), this.setGvlibVersion = this.setGvlibVersion.bind(this), this.getGvlibVersion = this.getGvlibVersion.bind(this), this.preStartGV = this.preStartGV.bind(this), this.startGV = this.startGV.bind(this), this.gvstart = this.gvstart.bind(this), this.gvend = this.gvend.bind(this), this.gvreload = this.gvreload.bind(this), this.setKey = this.setKey.bind(this), this.setUserLang = this.setUserLang.bind(this), this.setTeamName = this.setTeamName.bind(this), this.getTrailObj = this.getTrailObj.bind(this)
    }

    function i(t, n, e, i, o, a, u) {
        r.call(this, t, n, e, i, o, a, u)
    }

    function o(t, n, e, i, o, a, u) {
        r.call(this, t, n, e, i, o, a, u)
    }
    var a = document.location.protocol;
    return i.prototype = Object.create(r.prototype), i.prototype.constructor = i, i.prototype.teamKeys = ["home", "away"], i.prototype.langSet = ["en", "ch", "cs", "zhcn"], i.prototype.lastModified = void 0, i.prototype.executeEvents = function() {
        if (0 !== this.eventQueue.length)
            for (; this.eventQueue.length > 0;) {
                var t = this.eventQueue.shift();
                this.renderer && t && this.renderer[t.event] && this.renderer[t.event](t)
            }
    }, i.prototype.eventProcesser = function(t) {
        var n = this,
            e = t.eventcodeid.split(this.eventRegex).slice(1, this.paraDef.length + 1),
            r = {};
        this.eventsDef.forEach(function(t, i) {
            e[i] && (r[n.paraDef[i]] = t[e[i]])
        }), r.time = t.time, r.condition = t.condition, this.teamKeys.forEach(function(e) {
            n.history[e].time = t.time, n.history[e].condition = n.conditionDef[t.condition]
        }), this.history.lastEventTime = t.time, this.history.condition = this.conditionDef[t.condition], this.eventQueue.push(r)
    }, i.prototype.eventParser = function(t, n) {
        var e = this;
        if (this.gv_event = n.gv_event || this.gv_event, this.gv_summaryinfo = n.gv_summaryinfo || this.gv_summaryinfo, this.gv_summaryinfo.teamrow && (this.gv_summaryinfo = this.gv_summaryinfo.teamrow), n.event || n.summaryinfo) {
            if (n.event && (n.event.forEach(function(t) {
                    e.eventProcesser(e.infoMapping(e.gv_event, t))
                }), -1 == this.executeEvents())) return;
            if (n.summaryinfo) {
                var r, i, o = this.history.lastEventTime,
                    a = this.history.condition,
                    u = this.infoMapping(this.gv_summaryinfo, n.summaryinfo.home),
                    s = u.time || n.summaryinfo.lastEventTime,
                    c = this.conditionDef[u.condition || n.summaryinfo.condition]; - 1 !== Object.keys(n.summaryinfo).indexOf("lastModified") ? (r = s, i = c) : parseInt(this.defToCondition[a]) < parseInt(this.defToCondition[c]) ? (r = s, i = c) : (r = o, i = a), this.teamKeys.forEach(function(t) {
                    e.history[t] = e.infoMapping(e.gv_summaryinfo, n.summaryinfo[t]), e.history[t].time = r, e.history[t].condition = i
                }), this.history.lastEventTime = r, this.history.condition = i
            }
            "history" == t ? this.renderer.setStatistics(this.history, t) : -1 !== Object.keys(n.summaryinfo || {}).indexOf("lastModified") ? this.lastModified !== n.summaryinfo.lastModified && (this.lastModified = n.summaryinfo.lastModified, this.renderer.setStatistics(this.history, t)) : n.event && this.renderer.setStatistics(this.history, t)
        }
    }, o.prototype = Object.create(r.prototype), o.prototype.constructor = o, o.prototype.teamKeys = ["home", "away"], o.prototype.langSet = ["en", "ch", "cs", "zhcn", "vn"], o.prototype.executeEvents = function() {
        if (0 !== this.eventQueue.length) {
            var t = 0,
                n = void 0;
            this.eventQueue.forEach(function(e) {
                "number" == typeof e.weight && e.weight >= t && (t = e.weight, n = e)
            }), this.eventQueue = [], this.renderer[n.event](n)
        }
    }, o.prototype.eventProcesser = function(t) {
        var n = this,
            e = t.eventcodeid.split(this.eventRegex).slice(1, this.paraDef.length + 1),
            r = {};
        this.eventsDef.forEach(function(t, i) {
            e[i] && (r[n.paraDef[i]] = t[e[i]])
        }), r.time = t.time, r.condition = t.condition, this.history.lastEventTime = t.time, this.history.condition = this.conditionDef[t.condition], this.eventQueue.push(r)
    }, o.prototype.eventParser = function(t, n) {
        var e = this;
        if (this.gv_event = n.gv_event || this.gv_event, this.gv_summaryinfo = n.gv_summaryinfo || this.gv_summaryinfo, this.gv_summaryinfo.teamrow && (this.gv_summaryinfo = this.gv_summaryinfo.teamrow), n.event || n.summaryinfo) {
            if (n.event && (n.event.forEach(function(t) {
                    e.eventProcesser(e.infoMapping(e.gv_event, t))
                }), -1 == this.executeEvents())) return;
            n.summaryinfo && (this.teamKeys.forEach(function(t) {
                e.history[t] = e.infoMapping(e.gv_summaryinfo, n.summaryinfo[t])
            }), this.history.lastEventTime = n.summaryinfo.lastEventTime, this.history.condition = this.conditionDef[n.summaryinfo.condition]), this.renderer.setStatistics(this.history, t)
        }
    }, e
}),
function(t, n) {
    "function" == typeof define && define.amd ? define("trailblazer", ["jquery", "ConnecterFactory"], n) : "object" == typeof exports ? module.exports = n(require("jquery"), require("ConnecterFactory")) : t.trailblazer = n(t.jQuery, t.ConnecterFactory)
}("undefined" != typeof window ? window : this, function(t, n) {
    function e() {
        if ("object" == typeof e.instance) return e.instance;
        this.gvList = {};
        var t = null,
            r = null,
            i = new n;
        this.gvstart = function(n, e, o, a, u, s) {
            this.gvList[a] && (this.gvend(a), delete this.gvList[a]);
            var c = i.getConnector(u, s);
            this.gvList[a] = c, c.setKey(t), c.setUserLang(r), c.gvstart(n, e, o, a)
        }, this.gvend = function(t) {
            this.gvList[t] && (this.gvList[t].gvend(), this.gvList[t] = null, delete this.gvList[t])
        }, this.gvreload = function(t) {
            this.gvList[t] && this.gvList[t].gvreload()
        }, this.setKey = function(n) {
            t = n;
            for (var e in this.gvList) this.gvList[e].setKey(n)
        }, this.setUserLang = function(t) {
            r = t;
            for (var n in this.gvList) this.gvList[n].setUserLang(t)
        }, this.setSetting = function(t, n, e) {
            this.gvList[e] && this.gvList[e].setTeamName(t, n)
        }, this.getTrailObj = function(t) {
            return this.gvList[t] ? this.gvList[t].getTrailObj() : void 0
        }, e.instance = this
    }
    return e
}), ! function() {
    function t(t) {
        return t && (t.ownerDocument || t.document || t).documentElement
    }

    function n(t) {
        return t && (t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView)
    }

    function e(t, n) {
        return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function r(t) {
        return null === t ? NaN : +t
    }

    function i(t) {
        return !isNaN(t)
    }

    function o(t) {
        return {
            left: function(n, e, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = n.length); i > r;) {
                    var o = r + i >>> 1;
                    t(n[o], e) < 0 ? r = o + 1 : i = o
                }
                return r
            },
            right: function(n, e, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = n.length); i > r;) {
                    var o = r + i >>> 1;
                    t(n[o], e) > 0 ? i = o : r = o + 1
                }
                return r
            }
        }
    }

    function a(t) {
        return t.length
    }

    function u(t) {
        for (var n = 1; t * n % 1;) n *= 10;
        return n
    }

    function s(t, n) {
        for (var e in n) Object.defineProperty(t.prototype, e, {
            value: n[e],
            enumerable: !1
        })
    }

    function c() {
        this._ = Object.create(null)
    }

    function l(t) {
        return (t += "") === wa || t[0] === Ma ? Ma + t : t
    }

    function f(t) {
        return (t += "")[0] === Ma ? t.slice(1) : t
    }

    function h(t) {
        return l(t) in this._
    }

    function p(t) {
        return (t = l(t)) in this._ && delete this._[t]
    }

    function g() {
        var t = [];
        for (var n in this._) t.push(f(n));
        return t
    }

    function d() {
        var t = 0;
        for (var n in this._) ++t;
        return t
    }

    function v() {
        for (var t in this._) return !1;
        return !0
    }

    function y() {
        this._ = Object.create(null)
    }

    function m(t) {
        return t
    }

    function b(t, n, e) {
        return function() {
            var r = e.apply(n, arguments);
            return r === n ? t : r
        }
    }

    function x(t, n) {
        if (n in t) return n;
        n = n.charAt(0).toUpperCase() + n.slice(1);
        for (var e = 0, r = ka.length; r > e; ++e) {
            var i = ka[e] + n;
            if (i in t) return i
        }
    }

    function w() {}

    function M() {}

    function k(t) {
        function n() {
            for (var n, r = e, i = -1, o = r.length; ++i < o;)(n = r[i].on) && n.apply(this, arguments);
            return t
        }
        var e = [],
            r = new c;
        return n.on = function(n, i) {
            var o, a = r.get(n);
            return arguments.length < 2 ? a && a.on : (a && (a.on = null, e = e.slice(0, o = e.indexOf(a)).concat(e.slice(o + 1)), r.remove(n)), i && e.push(r.set(n, {
                on: i
            })), t)
        }, n
    }

    function _() {
        sa.event.preventDefault()
    }

    function S() {
        for (var t, n = sa.event; t = n.sourceEvent;) n = t;
        return n
    }

    function E(t) {
        for (var n = new M, e = 0, r = arguments.length; ++e < r;) n[arguments[e]] = k(n);
        return n.of = function(e, r) {
            return function(i) {
                try {
                    var o = i.sourceEvent = sa.event;
                    i.target = t, sa.event = i, n[i.type].apply(e, r)
                } finally {
                    sa.event = o
                }
            }
        }, n
    }

    function A(t) {
        return Sa(t, Ca), t
    }

    function N(t) {
        return "function" == typeof t ? t : function() {
            return Ea(t, this)
        }
    }

    function C(t) {
        return "function" == typeof t ? t : function() {
            return Aa(t, this)
        }
    }

    function T(t, n) {
        function e() {
            this.removeAttribute(t)
        }

        function r() {
            this.removeAttributeNS(t.space, t.local)
        }

        function i() {
            this.setAttribute(t, n)
        }

        function o() {
            this.setAttributeNS(t.space, t.local, n)
        }

        function a() {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
        }

        function u() {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
        }
        return t = sa.ns.qualify(t), null == n ? t.local ? r : e : "function" == typeof n ? t.local ? u : a : t.local ? o : i
    }

    function j(t) {
        return t.trim().replace(/\s+/g, " ")
    }

    function O(t) {
        return new RegExp("(?:^|\\s+)" + sa.requote(t) + "(?:\\s+|$)", "g")
    }

    function P(t) {
        return (t + "").trim().split(/^|\s+/)
    }

    function L(t, n) {
        function e() {
            for (var e = -1; ++e < i;) t[e](this, n)
        }

        function r() {
            for (var e = -1, r = n.apply(this, arguments); ++e < i;) t[e](this, r)
        }
        t = P(t).map(R);
        var i = t.length;
        return "function" == typeof n ? r : e
    }

    function R(t) {
        var n = O(t);
        return function(e, r) {
            if (i = e.classList) return r ? i.add(t) : i.remove(t);
            var i = e.getAttribute("class") || "";
            r ? (n.lastIndex = 0, n.test(i) || e.setAttribute("class", j(i + " " + t))) : e.setAttribute("class", j(i.replace(n, " ")))
        }
    }

    function q(t, n, e) {
        function r() {
            this.style.removeProperty(t)
        }

        function i() {
            this.style.setProperty(t, n, e)
        }

        function o() {
            var r = n.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
        }
        return null == n ? r : "function" == typeof n ? o : i
    }

    function B(t, n) {
        function e() {
            delete this[t]
        }

        function r() {
            this[t] = n
        }

        function i() {
            var e = n.apply(this, arguments);
            null == e ? delete this[t] : this[t] = e
        }
        return null == n ? e : "function" == typeof n ? i : r
    }

    function z(t) {
        function n() {
            var n = this.ownerDocument,
                e = this.namespaceURI;
            return e ? n.createElementNS(e, t) : n.createElement(t)
        }

        function e() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        }
        return "function" == typeof t ? t : (t = sa.ns.qualify(t)).local ? e : n
    }

    function D() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function U(t) {
        return {
            __data__: t
        }
    }

    function I(t) {
        return function() {
            return Na(this, t)
        }
    }

    function F(t) {
        return arguments.length || (t = e),
            function(n, e) {
                return n && e ? t(n.__data__, e.__data__) : !n - !e
            }
    }

    function H(t, n) {
        for (var e = 0, r = t.length; r > e; e++)
            for (var i, o = t[e], a = 0, u = o.length; u > a; a++)(i = o[a]) && n(i, a, e);
        return t
    }

    function V(t) {
        return Sa(t, ja), t
    }

    function Y(t) {
        var n, e;
        return function(r, i, o) {
            var a, u = t[o].update,
                s = u.length;
            for (o != e && (e = o, n = 0), i >= n && (n = i + 1); !(a = u[n]) && ++n < s;);
            return a
        }
    }

    function X(t, n, e) {
        function r() {
            var n = this[a];
            n && (this.removeEventListener(t, n, n.$), delete this[a])
        }

        function i() {
            var i = s(n, la(arguments));
            r.call(this), this.addEventListener(t, this[a] = i, i.$ = e), i._ = n
        }

        function o() {
            var n, e = new RegExp("^__on([^.]+)" + sa.requote(t) + "$");
            for (var r in this)
                if (n = r.match(e)) {
                    var i = this[r];
                    this.removeEventListener(n[1], i, i.$), delete this[r]
                }
        }
        var a = "__on" + t,
            u = t.indexOf("."),
            s = G;
        u > 0 && (t = t.slice(0, u));
        var c = Oa.get(t);
        return c && (t = c, s = K), u ? n ? i : r : n ? w : o
    }

    function G(t, n) {
        return function(e) {
            var r = sa.event;
            sa.event = e, n[0] = this.__data__;
            try {
                t.apply(this, n)
            } finally {
                sa.event = r
            }
        }
    }

    function K(t, n) {
        var e = G(t, n);
        return function(t) {
            var n = this,
                r = t.relatedTarget;
            r && (r === n || 8 & r.compareDocumentPosition(n)) || e.call(n, t)
        }
    }

    function J(e) {
        var r = ".dragsuppress-" + ++La,
            i = "click" + r,
            o = sa.select(n(e)).on("touchmove" + r, _).on("dragstart" + r, _).on("selectstart" + r, _);
        if (null == Pa && (Pa = "onselectstart" in e ? !1 : x(e.style, "userSelect")), Pa) {
            var a = t(e).style,
                u = a[Pa];
            a[Pa] = "none"
        }
        return function(t) {
            if (o.on(r, null), Pa && (a[Pa] = u), t) {
                var n = function() {
                    o.on(i, null)
                };
                o.on(i, function() {
                    _(), n()
                }, !0), setTimeout(n, 0)
            }
        }
    }

    function $(t, e) {
        e.changedTouches && (e = e.changedTouches[0]);
        var r = t.ownerSVGElement || t;
        if (r.createSVGPoint) {
            var i = r.createSVGPoint();
            if (0 > Ra) {
                var o = n(t);
                if (o.scrollX || o.scrollY) {
                    r = sa.select("body").append("svg").style({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }, "important");
                    var a = r[0][0].getScreenCTM();
                    Ra = !(a.f || a.e), r.remove()
                }
            }
            return Ra ? (i.x = e.pageX, i.y = e.pageY) : (i.x = e.clientX, i.y = e.clientY), i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y]
        }
        var u = t.getBoundingClientRect();
        return [e.clientX - u.left - t.clientLeft, e.clientY - u.top - t.clientTop]
    }

    function Z() {
        return sa.event.changedTouches[0].identifier
    }

    function W(t) {
        return t > 0 ? 1 : 0 > t ? -1 : 0
    }

    function Q(t, n, e) {
        return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
    }

    function tt(t) {
        return t > 1 ? 0 : -1 > t ? za : Math.acos(t)
    }

    function nt(t) {
        return t > 1 ? Ia : -1 > t ? -Ia : Math.asin(t)
    }

    function et(t) {
        return ((t = Math.exp(t)) - 1 / t) / 2
    }

    function rt(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }

    function it(t) {
        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
    }

    function ot(t) {
        return (t = Math.sin(t / 2)) * t
    }

    function at() {}

    function ut(t, n, e) {
        return this instanceof ut ? (this.h = +t, this.s = +n, void(this.l = +e)) : arguments.length < 2 ? t instanceof ut ? new ut(t.h, t.s, t.l) : wt("" + t, Mt, ut) : new ut(t, n, e)
    }

    function st(t, n, e) {
        function r(t) {
            return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? o + (a - o) * t / 60 : 180 > t ? a : 240 > t ? o + (a - o) * (240 - t) / 60 : o
        }

        function i(t) {
            return Math.round(255 * r(t))
        }
        var o, a;
        return t = isNaN(t) ? 0 : (t %= 360) < 0 ? t + 360 : t, n = isNaN(n) ? 0 : 0 > n ? 0 : n > 1 ? 1 : n, e = 0 > e ? 0 : e > 1 ? 1 : e, a = .5 >= e ? e * (1 + n) : e + n - e * n, o = 2 * e - a, new yt(i(t + 120), i(t), i(t - 120))
    }

    function ct(t, n, e) {
        return this instanceof ct ? (this.h = +t, this.c = +n, void(this.l = +e)) : arguments.length < 2 ? t instanceof ct ? new ct(t.h, t.c, t.l) : t instanceof ft ? pt(t.l, t.a, t.b) : pt((t = kt((t = sa.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : new ct(t, n, e)
    }

    function lt(t, n, e) {
        return isNaN(t) && (t = 0), isNaN(n) && (n = 0), new ft(e, Math.cos(t *= Fa) * n, Math.sin(t) * n)
    }

    function ft(t, n, e) {
        return this instanceof ft ? (this.l = +t, this.a = +n, void(this.b = +e)) : arguments.length < 2 ? t instanceof ft ? new ft(t.l, t.a, t.b) : t instanceof ct ? lt(t.h, t.c, t.l) : kt((t = yt(t)).r, t.g, t.b) : new ft(t, n, e)
    }

    function ht(t, n, e) {
        var r = (t + 16) / 116,
            i = r + n / 500,
            o = r - e / 200;
        return i = gt(i) * Qa, r = gt(r) * tu, o = gt(o) * nu, new yt(vt(3.2404542 * i - 1.5371385 * r - .4985314 * o), vt(-.969266 * i + 1.8760108 * r + .041556 * o), vt(.0556434 * i - .2040259 * r + 1.0572252 * o))
    }

    function pt(t, n, e) {
        return t > 0 ? new ct(Math.atan2(e, n) * Ha, Math.sqrt(n * n + e * e), t) : new ct(NaN, NaN, t)
    }

    function gt(t) {
        return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }

    function dt(t) {
        return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }

    function vt(t) {
        return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }

    function yt(t, n, e) {
        return this instanceof yt ? (this.r = ~~t, this.g = ~~n, void(this.b = ~~e)) : arguments.length < 2 ? t instanceof yt ? new yt(t.r, t.g, t.b) : wt("" + t, yt, st) : new yt(t, n, e)
    }

    function mt(t) {
        return new yt(t >> 16, t >> 8 & 255, 255 & t)
    }

    function bt(t) {
        return mt(t) + ""
    }

    function xt(t) {
        return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }

    function wt(t, n, e) {
        var r, i, o, a = 0,
            u = 0,
            s = 0;
        if (r = /([a-z]+)\((.*)\)/.exec(t = t.toLowerCase())) switch (i = r[2].split(","), r[1]) {
            case "hsl":
                return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
            case "rgb":
                return n(St(i[0]), St(i[1]), St(i[2]))
        }
        return (o = iu.get(t)) ? n(o.r, o.g, o.b) : (null == t || "#" !== t.charAt(0) || isNaN(o = parseInt(t.slice(1), 16)) || (4 === t.length ? (a = (3840 & o) >> 4, a = a >> 4 | a, u = 240 & o, u = u >> 4 | u, s = 15 & o, s = s << 4 | s) : 7 === t.length && (a = (16711680 & o) >> 16, u = (65280 & o) >> 8, s = 255 & o)), n(a, u, s))
    }

    function Mt(t, n, e) {
        var r, i, o = Math.min(t /= 255, n /= 255, e /= 255),
            a = Math.max(t, n, e),
            u = a - o,
            s = (a + o) / 2;
        return u ? (i = .5 > s ? u / (a + o) : u / (2 - a - o), r = t == a ? (n - e) / u + (e > n ? 6 : 0) : n == a ? (e - t) / u + 2 : (t - n) / u + 4, r *= 60) : (r = NaN, i = s > 0 && 1 > s ? 0 : r), new ut(r, i, s)
    }

    function kt(t, n, e) {
        t = _t(t), n = _t(n), e = _t(e);
        var r = dt((.4124564 * t + .3575761 * n + .1804375 * e) / Qa),
            i = dt((.2126729 * t + .7151522 * n + .072175 * e) / tu),
            o = dt((.0193339 * t + .119192 * n + .9503041 * e) / nu);
        return ft(116 * i - 16, 500 * (r - i), 200 * (i - o))
    }

    function _t(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function St(t) {
        var n = parseFloat(t);
        return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * n) : n
    }

    function Et(t) {
        return "function" == typeof t ? t : function() {
            return t
        }
    }

    function At(t) {
        return function(n, e, r) {
            return 2 === arguments.length && "function" == typeof e && (r = e, e = null), Nt(n, e, t, r)
        }
    }

    function Nt(t, n, e, r) {
        function i() {
            var t, n = s.status;
            if (!n && Tt(s) || n >= 200 && 300 > n || 304 === n) {
                try {
                    t = e.call(o, s)
                } catch (r) {
                    return void a.error.call(o, r)
                }
                a.load.call(o, t)
            } else a.error.call(o, s)
        }
        var o = {},
            a = sa.dispatch("beforesend", "progress", "load", "error"),
            u = {},
            s = new XMLHttpRequest,
            c = null;
        return !this.XDomainRequest || "withCredentials" in s || !/^(http(s)?:)?\/\//.test(t) || (s = new XDomainRequest), "onload" in s ? s.onload = s.onerror = i : s.onreadystatechange = function() {
            s.readyState > 3 && i()
        }, s.onprogress = function(t) {
            var n = sa.event;
            sa.event = t;
            try {
                a.progress.call(o, s)
            } finally {
                sa.event = n
            }
        }, o.header = function(t, n) {
            return t = (t + "").toLowerCase(), arguments.length < 2 ? u[t] : (null == n ? delete u[t] : u[t] = n + "", o)
        }, o.mimeType = function(t) {
            return arguments.length ? (n = null == t ? null : t + "", o) : n
        }, o.responseType = function(t) {
            return arguments.length ? (c = t, o) : c
        }, o.response = function(t) {
            return e = t, o
        }, ["get", "post"].forEach(function(t) {
            o[t] = function() {
                return o.send.apply(o, [t].concat(la(arguments)))
            }
        }), o.send = function(e, r, i) {
            if (2 === arguments.length && "function" == typeof r && (i = r, r = null), s.open(e, t, !0), null == n || "accept" in u || (u.accept = n + ",*/*"), s.setRequestHeader)
                for (var l in u) s.setRequestHeader(l, u[l]);
            return null != n && s.overrideMimeType && s.overrideMimeType(n), null != c && (s.responseType = c), null != i && o.on("error", i).on("load", function(t) {
                i(null, t)
            }), a.beforesend.call(o, s), s.send(null == r ? null : r), o
        }, o.abort = function() {
            return s.abort(), o
        }, sa.rebind(o, a, "on"), null == r ? o : o.get(Ct(r))
    }

    function Ct(t) {
        return 1 === t.length ? function(n, e) {
            t(null == n ? e : null)
        } : t
    }

    function Tt(t) {
        var n = t.responseType;
        return n && "text" !== n ? t.response : t.responseText
    }

    function jt(t, n, e) {
        var r = arguments.length;
        2 > r && (n = 0), 3 > r && (e = Date.now());
        var i = e + n,
            o = {
                c: t,
                t: i,
                n: null
            };
        return au ? au.n = o : ou = o, au = o, uu || (su = clearTimeout(su), uu = 1, cu(Ot)), o
    }

    function Ot() {
        var t = Pt(),
            n = Lt() - t;
        n > 24 ? (isFinite(n) && (clearTimeout(su), su = setTimeout(Ot, n)), uu = 0) : (uu = 1, cu(Ot))
    }

    function Pt() {
        for (var t = Date.now(), n = ou; n;) t >= n.t && n.c(t - n.t) && (n.c = null), n = n.n;
        return t
    }

    function Lt() {
        for (var t, n = ou, e = 1 / 0; n;) n.c ? (n.t < e && (e = n.t), n = (t = n).n) : n = t ? t.n = n.n : ou = n.n;
        return au = t, e
    }

    function Rt(t, n) {
        return n - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
    }

    function qt(t, n) {
        var e = Math.pow(10, 3 * xa(8 - n));
        return {
            scale: n > 8 ? function(t) {
                return t / e
            } : function(t) {
                return t * e
            },
            symbol: t
        }
    }

    function Bt(t) {
        var n = t.decimal,
            e = t.thousands,
            r = t.grouping,
            i = t.currency,
            o = r && e ? function(t, n) {
                for (var i = t.length, o = [], a = 0, u = r[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), o.push(t.substring(i -= u, i + u)), !((s += u + 1) > n));) u = r[a = (a + 1) % r.length];
                return o.reverse().join(e)
            } : m;
        return function(t) {
            var e = fu.exec(t),
                r = e[1] || " ",
                a = e[2] || ">",
                u = e[3] || "-",
                s = e[4] || "",
                c = e[5],
                l = +e[6],
                f = e[7],
                h = e[8],
                p = e[9],
                g = 1,
                d = "",
                v = "",
                y = !1,
                m = !0;
            switch (h && (h = +h.substring(1)), (c || "0" === r && "=" === a) && (c = r = "0", a = "="), p) {
                case "n":
                    f = !0, p = "g";
                    break;
                case "%":
                    g = 100, v = "%", p = "f";
                    break;
                case "p":
                    g = 100, v = "%", p = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    "#" === s && (d = "0" + p.toLowerCase());
                case "c":
                    m = !1;
                case "d":
                    y = !0, h = 0;
                    break;
                case "s":
                    g = -1, p = "r"
            }
            "$" === s && (d = i[0], v = i[1]), "r" != p || h || (p = "g"), null != h && ("g" == p ? h = Math.max(1, Math.min(21, h)) : ("e" == p || "f" == p) && (h = Math.max(0, Math.min(20, h)))), p = hu.get(p) || zt;
            var b = c && f;
            return function(t) {
                var e = v;
                if (y && t % 1) return "";
                var i = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : "-" === u ? "" : u;
                if (0 > g) {
                    var s = sa.formatPrefix(t, h);
                    t = s.scale(t), e = s.symbol + v
                } else t *= g;
                t = p(t, h);
                var x, w, M = t.lastIndexOf(".");
                if (0 > M) {
                    var k = m ? t.lastIndexOf("e") : -1;
                    0 > k ? (x = t, w = "") : (x = t.substring(0, k), w = t.substring(k))
                } else x = t.substring(0, M), w = n + t.substring(M + 1);
                !c && f && (x = o(x, 1 / 0));
                var _ = d.length + x.length + w.length + (b ? 0 : i.length),
                    S = l > _ ? new Array(_ = l - _ + 1).join(r) : "";
                return b && (x = o(S + x, S.length ? l - w.length : 1 / 0)), i += d, t = x + w, ("<" === a ? i + t + S : ">" === a ? S + i + t : "^" === a ? S.substring(0, _ >>= 1) + i + t + S.substring(_) : i + (b ? t : S + t)) + e
            }
        }
    }

    function zt(t) {
        return t + ""
    }

    function Dt() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Ut(t, n, e) {
        function r(n) {
            var e = t(n),
                r = o(e, 1);
            return r - n > n - e ? e : r
        }

        function i(e) {
            return n(e = t(new gu(e - 1)), 1), e
        }

        function o(t, e) {
            return n(t = new gu(+t), e), t
        }

        function a(t, r, o) {
            var a = i(t),
                u = [];
            if (o > 1)
                for (; r > a;) e(a) % o || u.push(new Date(+a)), n(a, 1);
            else
                for (; r > a;) u.push(new Date(+a)), n(a, 1);
            return u
        }

        function u(t, n, e) {
            try {
                gu = Dt;
                var r = new Dt;
                return r._ = t, a(r, n, e)
            } finally {
                gu = Date
            }
        }
        t.floor = t, t.round = r, t.ceil = i, t.offset = o, t.range = a;
        var s = t.utc = It(t);
        return s.floor = s, s.round = It(r), s.ceil = It(i), s.offset = It(o), s.range = u, t
    }

    function It(t) {
        return function(n, e) {
            try {
                gu = Dt;
                var r = new Dt;
                return r._ = n, t(r, e)._
            } finally {
                gu = Date
            }
        }
    }

    function Ft(t) {
        function n(t) {
            function n(n) {
                for (var e, i, o, a = [], u = -1, s = 0; ++u < r;) 37 === t.charCodeAt(u) && (a.push(t.slice(s, u)), null != (i = vu[e = t.charAt(++u)]) && (e = t.charAt(++u)), (o = N[e]) && (e = o(n, null == i ? "e" === e ? " " : "0" : i)), a.push(e), s = u + 1);
                return a.push(t.slice(s, u)), a.join("")
            }
            var r = t.length;
            return n.parse = function(n) {
                var r = {
                        y: 1900,
                        m: 0,
                        d: 1,
                        H: 0,
                        M: 0,
                        S: 0,
                        L: 0,
                        Z: null
                    },
                    i = e(r, t, n, 0);
                if (i != n.length) return null;
                "p" in r && (r.H = r.H % 12 + 12 * r.p);
                var o = null != r.Z && gu !== Dt,
                    a = new(o ? Dt : gu);
                return "j" in r ? a.setFullYear(r.y, 0, r.j) : "W" in r || "U" in r ? ("w" in r || (r.w = "W" in r ? 1 : 0), a.setFullYear(r.y, 0, 1), a.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (a.getDay() + 5) % 7 : r.w + 7 * r.U - (a.getDay() + 6) % 7)) : a.setFullYear(r.y, r.m, r.d), a.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L), o ? a._ : a
            }, n.toString = function() {
                return t
            }, n
        }

        function e(t, n, e, r) {
            for (var i, o, a, u = 0, s = n.length, c = e.length; s > u;) {
                if (r >= c) return -1;
                if (i = n.charCodeAt(u++), 37 === i) {
                    if (a = n.charAt(u++), o = C[a in vu ? n.charAt(u++) : a], !o || (r = o(t, e, r)) < 0) return -1
                } else if (i != e.charCodeAt(r++)) return -1
            }
            return r
        }

        function r(t, n, e) {
            M.lastIndex = 0;
            var r = M.exec(n.slice(e));
            return r ? (t.w = k.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function i(t, n, e) {
            x.lastIndex = 0;
            var r = x.exec(n.slice(e));
            return r ? (t.w = w.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function o(t, n, e) {
            E.lastIndex = 0;
            var r = E.exec(n.slice(e));
            return r ? (t.m = A.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function a(t, n, e) {
            _.lastIndex = 0;
            var r = _.exec(n.slice(e));
            return r ? (t.m = S.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function u(t, n, r) {
            return e(t, N.c.toString(), n, r)
        }

        function s(t, n, r) {
            return e(t, N.x.toString(), n, r)
        }

        function c(t, n, r) {
            return e(t, N.X.toString(), n, r)
        }

        function l(t, n, e) {
            var r = b.get(n.slice(e, e += 2).toLowerCase());
            return null == r ? -1 : (t.p = r, e)
        }
        var f = t.dateTime,
            h = t.date,
            p = t.time,
            g = t.periods,
            d = t.days,
            v = t.shortDays,
            y = t.months,
            m = t.shortMonths;
        n.utc = function(t) {
            function e(t) {
                try {
                    gu = Dt;
                    var n = new gu;
                    return n._ = t, r(n)
                } finally {
                    gu = Date
                }
            }
            var r = n(t);
            return e.parse = function(t) {
                try {
                    gu = Dt;
                    var n = r.parse(t);
                    return n && n._
                } finally {
                    gu = Date
                }
            }, e.toString = r.toString, e
        }, n.multi = n.utc.multi = cn;
        var b = sa.map(),
            x = Vt(d),
            w = Yt(d),
            M = Vt(v),
            k = Yt(v),
            _ = Vt(y),
            S = Yt(y),
            E = Vt(m),
            A = Yt(m);
        g.forEach(function(t, n) {
            b.set(t.toLowerCase(), n)
        });
        var N = {
                a: function(t) {
                    return v[t.getDay()]
                },
                A: function(t) {
                    return d[t.getDay()]
                },
                b: function(t) {
                    return m[t.getMonth()]
                },
                B: function(t) {
                    return y[t.getMonth()]
                },
                c: n(f),
                d: function(t, n) {
                    return Ht(t.getDate(), n, 2)
                },
                e: function(t, n) {
                    return Ht(t.getDate(), n, 2)
                },
                H: function(t, n) {
                    return Ht(t.getHours(), n, 2)
                },
                I: function(t, n) {
                    return Ht(t.getHours() % 12 || 12, n, 2)
                },
                j: function(t, n) {
                    return Ht(1 + pu.dayOfYear(t), n, 3)
                },
                L: function(t, n) {
                    return Ht(t.getMilliseconds(), n, 3)
                },
                m: function(t, n) {
                    return Ht(t.getMonth() + 1, n, 2)
                },
                M: function(t, n) {
                    return Ht(t.getMinutes(), n, 2)
                },
                p: function(t) {
                    return g[+(t.getHours() >= 12)]
                },
                S: function(t, n) {
                    return Ht(t.getSeconds(), n, 2)
                },
                U: function(t, n) {
                    return Ht(pu.sundayOfYear(t), n, 2)
                },
                w: function(t) {
                    return t.getDay()
                },
                W: function(t, n) {
                    return Ht(pu.mondayOfYear(t), n, 2)
                },
                x: n(h),
                X: n(p),
                y: function(t, n) {
                    return Ht(t.getFullYear() % 100, n, 2)
                },
                Y: function(t, n) {
                    return Ht(t.getFullYear() % 1e4, n, 4)
                },
                Z: un,
                "%": function() {
                    return "%"
                }
            },
            C = {
                a: r,
                A: i,
                b: o,
                B: a,
                c: u,
                d: tn,
                e: tn,
                H: en,
                I: en,
                j: nn,
                L: an,
                m: Qt,
                M: rn,
                p: l,
                S: on,
                U: Gt,
                w: Xt,
                W: Kt,
                x: s,
                X: c,
                y: $t,
                Y: Jt,
                Z: Zt,
                "%": sn
            };
        return n
    }

    function Ht(t, n, e) {
        var r = 0 > t ? "-" : "",
            i = (r ? -t : t) + "",
            o = i.length;
        return r + (e > o ? new Array(e - o + 1).join(n) + i : i)
    }

    function Vt(t) {
        return new RegExp("^(?:" + t.map(sa.requote).join("|") + ")", "i")
    }

    function Yt(t) {
        for (var n = new c, e = -1, r = t.length; ++e < r;) n.set(t[e].toLowerCase(), e);
        return n
    }

    function Xt(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 1));
        return r ? (t.w = +r[0], e + r[0].length) : -1
    }

    function Gt(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e));
        return r ? (t.U = +r[0], e + r[0].length) : -1
    }

    function Kt(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e));
        return r ? (t.W = +r[0], e + r[0].length) : -1
    }

    function Jt(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 4));
        return r ? (t.y = +r[0], e + r[0].length) : -1
    }

    function $t(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.y = Wt(+r[0]), e + r[0].length) : -1
    }

    function Zt(t, n, e) {
        return /^[+-]\d{4}$/.test(n = n.slice(e, e + 5)) ? (t.Z = -n, e + 5) : -1
    }

    function Wt(t) {
        return t + (t > 68 ? 1900 : 2e3)
    }

    function Qt(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.m = r[0] - 1, e + r[0].length) : -1
    }

    function tn(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.d = +r[0], e + r[0].length) : -1
    }

    function nn(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 3));
        return r ? (t.j = +r[0], e + r[0].length) : -1
    }

    function en(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.H = +r[0], e + r[0].length) : -1
    }

    function rn(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.M = +r[0], e + r[0].length) : -1
    }

    function on(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 2));
        return r ? (t.S = +r[0], e + r[0].length) : -1
    }

    function an(t, n, e) {
        yu.lastIndex = 0;
        var r = yu.exec(n.slice(e, e + 3));
        return r ? (t.L = +r[0], e + r[0].length) : -1
    }

    function un(t) {
        var n = t.getTimezoneOffset(),
            e = n > 0 ? "-" : "+",
            r = xa(n) / 60 | 0,
            i = xa(n) % 60;
        return e + Ht(r, "0", 2) + Ht(i, "0", 2)
    }

    function sn(t, n, e) {
        mu.lastIndex = 0;
        var r = mu.exec(n.slice(e, e + 1));
        return r ? e + r[0].length : -1
    }

    function cn(t) {
        for (var n = t.length, e = -1; ++e < n;) t[e][0] = this(t[e][0]);
        return function(n) {
            for (var e = 0, r = t[e]; !r[1](n);) r = t[++e];
            return r[0](n)
        }
    }

    function ln() {}

    function fn(t, n, e) {
        var r = e.s = t + n,
            i = r - t,
            o = r - i;
        e.t = t - o + (n - i)
    }

    function hn(t, n) {
        t && Mu.hasOwnProperty(t.type) && Mu[t.type](t, n)
    }

    function pn(t, n, e) {
        var r, i = -1,
            o = t.length - e;
        for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
        n.lineEnd()
    }

    function gn(t, n) {
        var e = -1,
            r = t.length;
        for (n.polygonStart(); ++e < r;) pn(t[e], n, 1);
        n.polygonEnd()
    }

    function dn() {
        function t(t, n) {
            t *= Fa, n = n * Fa / 2 + za / 4;
            var e = t - r,
                a = e >= 0 ? 1 : -1,
                u = a * e,
                s = Math.cos(n),
                c = Math.sin(n),
                l = o * c,
                f = i * s + l * Math.cos(u),
                h = l * a * Math.sin(u);
            _u.add(Math.atan2(h, f)), r = t, i = s, o = c
        }
        var n, e, r, i, o;
        Su.point = function(a, u) {
            Su.point = t, r = (n = a) * Fa, i = Math.cos(u = (e = u) * Fa / 2 + za / 4), o = Math.sin(u)
        }, Su.lineEnd = function() {
            t(n, e)
        }
    }

    function vn(t) {
        var n = t[0],
            e = t[1],
            r = Math.cos(e);
        return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
    }

    function yn(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function mn(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function bn(t, n) {
        t[0] += n[0], t[1] += n[1], t[2] += n[2]
    }

    function xn(t, n) {
        return [t[0] * n, t[1] * n, t[2] * n]
    }

    function wn(t) {
        var n = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= n, t[1] /= n, t[2] /= n
    }

    function Mn(t) {
        return [Math.atan2(t[1], t[0]), nt(t[2])]
    }

    function kn(t, n) {
        return xa(t[0] - n[0]) < qa && xa(t[1] - n[1]) < qa
    }

    function _n(t, n) {
        t *= Fa;
        var e = Math.cos(n *= Fa);
        Sn(e * Math.cos(t), e * Math.sin(t), Math.sin(n))
    }

    function Sn(t, n, e) {
        ++Eu, Nu += (t - Nu) / Eu, Cu += (n - Cu) / Eu, Tu += (e - Tu) / Eu
    }

    function En() {
        function t(t, i) {
            t *= Fa;
            var o = Math.cos(i *= Fa),
                a = o * Math.cos(t),
                u = o * Math.sin(t),
                s = Math.sin(i),
                c = Math.atan2(Math.sqrt((c = e * s - r * u) * c + (c = r * a - n * s) * c + (c = n * u - e * a) * c), n * a + e * u + r * s);
            Au += c, ju += c * (n + (n = a)), Ou += c * (e + (e = u)), Pu += c * (r + (r = s)), Sn(n, e, r)
        }
        var n, e, r;
        Bu.point = function(i, o) {
            i *= Fa;
            var a = Math.cos(o *= Fa);
            n = a * Math.cos(i), e = a * Math.sin(i), r = Math.sin(o), Bu.point = t, Sn(n, e, r)
        }
    }

    function An() {
        Bu.point = _n
    }

    function Nn() {
        function t(t, n) {
            t *= Fa;
            var e = Math.cos(n *= Fa),
                a = e * Math.cos(t),
                u = e * Math.sin(t),
                s = Math.sin(n),
                c = i * s - o * u,
                l = o * a - r * s,
                f = r * u - i * a,
                h = Math.sqrt(c * c + l * l + f * f),
                p = r * a + i * u + o * s,
                g = h && -tt(p) / h,
                d = Math.atan2(h, p);
            Lu += g * c, Ru += g * l, qu += g * f, Au += d, ju += d * (r + (r = a)), Ou += d * (i + (i = u)), Pu += d * (o + (o = s)), Sn(r, i, o)
        }
        var n, e, r, i, o;
        Bu.point = function(a, u) {
            n = a, e = u, Bu.point = t, a *= Fa;
            var s = Math.cos(u *= Fa);
            r = s * Math.cos(a), i = s * Math.sin(a), o = Math.sin(u), Sn(r, i, o)
        }, Bu.lineEnd = function() {
            t(n, e), Bu.lineEnd = An, Bu.point = _n
        }
    }

    function Cn(t, n) {
        function e(e, r) {
            return e = t(e, r), n(e[0], e[1])
        }
        return t.invert && n.invert && (e.invert = function(e, r) {
            return e = n.invert(e, r), e && t.invert(e[0], e[1])
        }), e
    }

    function Tn() {
        return !0
    }

    function jn(t, n, e, r, i) {
        var o = [],
            a = [];
        if (t.forEach(function(t) {
                if (!((n = t.length - 1) <= 0)) {
                    var n, e = t[0],
                        r = t[n];
                    if (kn(e, r)) {
                        i.lineStart();
                        for (var u = 0; n > u; ++u) i.point((e = t[u])[0], e[1]);
                        return void i.lineEnd()
                    }
                    var s = new Pn(e, t, null, !0),
                        c = new Pn(e, null, s, !1);
                    s.o = c, o.push(s), a.push(c), s = new Pn(r, t, null, !1), c = new Pn(r, null, s, !0), s.o = c, o.push(s), a.push(c)
                }
            }), a.sort(n), On(o), On(a), o.length) {
            for (var u = 0, s = e, c = a.length; c > u; ++u) a[u].e = s = !s;
            for (var l, f, h = o[0];;) {
                for (var p = h, g = !0; p.v;)
                    if ((p = p.n) === h) return;
                l = p.z, i.lineStart();
                do {
                    if (p.v = p.o.v = !0, p.e) {
                        if (g)
                            for (var u = 0, c = l.length; c > u; ++u) i.point((f = l[u])[0], f[1]);
                        else r(p.x, p.n.x, 1, i);
                        p = p.n
                    } else {
                        if (g) {
                            l = p.p.z;
                            for (var u = l.length - 1; u >= 0; --u) i.point((f = l[u])[0], f[1])
                        } else r(p.x, p.p.x, -1, i);
                        p = p.p
                    }
                    p = p.o, l = p.z, g = !g
                } while (!p.v);
                i.lineEnd()
            }
        }
    }

    function On(t) {
        if (n = t.length) {
            for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
            i.n = e = t[0], e.p = i
        }
    }

    function Pn(t, n, e, r) {
        this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
    }

    function Ln(t, n, e, r) {
        return function(i, o) {
            function a(n, e) {
                var r = i(n, e);
                t(n = r[0], e = r[1]) && o.point(n, e)
            }

            function u(t, n) {
                var e = i(t, n);
                v.point(e[0], e[1])
            }

            function s() {
                m.point = u, v.lineStart()
            }

            function c() {
                m.point = a, v.lineEnd()
            }

            function l(t, n) {
                d.push([t, n]);
                var e = i(t, n);
                x.point(e[0], e[1])
            }

            function f() {
                x.lineStart(), d = []
            }

            function h() {
                l(d[0][0], d[0][1]), x.lineEnd();
                var t, n = x.clean(),
                    e = b.buffer(),
                    r = e.length;
                if (d.pop(), g.push(d), d = null, r)
                    if (1 & n) {
                        t = e[0];
                        var i, r = t.length - 1,
                            a = -1;
                        if (r > 0) {
                            for (w || (o.polygonStart(), w = !0), o.lineStart(); ++a < r;) o.point((i = t[a])[0], i[1]);
                            o.lineEnd()
                        }
                    } else r > 1 && 2 & n && e.push(e.pop().concat(e.shift())), p.push(e.filter(Rn))
            }
            var p, g, d, v = n(o),
                y = i.invert(r[0], r[1]),
                m = {
                    point: a,
                    lineStart: s,
                    lineEnd: c,
                    polygonStart: function() {
                        m.point = l, m.lineStart = f, m.lineEnd = h, p = [], g = []
                    },
                    polygonEnd: function() {
                        m.point = a, m.lineStart = s, m.lineEnd = c, p = sa.merge(p);
                        var t = In(y, g);
                        p.length ? (w || (o.polygonStart(), w = !0), jn(p, Bn, t, e, o)) : t && (w || (o.polygonStart(), w = !0), o.lineStart(), e(null, null, 1, o), o.lineEnd()), w && (o.polygonEnd(), w = !1), p = g = null
                    },
                    sphere: function() {
                        o.polygonStart(), o.lineStart(), e(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                    }
                },
                b = qn(),
                x = n(b),
                w = !1;
            return m
        }
    }

    function Rn(t) {
        return t.length > 1
    }

    function qn() {
        var t, n = [];
        return {
            lineStart: function() {
                n.push(t = [])
            },
            point: function(n, e) {
                t.push([n, e])
            },
            lineEnd: w,
            buffer: function() {
                var e = n;
                return n = [], t = null, e
            },
            rejoin: function() {
                n.length > 1 && n.push(n.pop().concat(n.shift()))
            }
        }
    }

    function Bn(t, n) {
        return ((t = t.x)[0] < 0 ? t[1] - Ia - qa : Ia - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Ia - qa : Ia - n[1])
    }

    function zn(t) {
        var n, e = NaN,
            r = NaN,
            i = NaN;
        return {
            lineStart: function() {
                t.lineStart(), n = 1
            },
            point: function(o, a) {
                var u = o > 0 ? za : -za,
                    s = xa(o - e);
                xa(s - za) < qa ? (t.point(e, r = (r + a) / 2 > 0 ? Ia : -Ia), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), n = 0) : i !== u && s >= za && (xa(e - i) < qa && (e -= i * qa), xa(o - u) < qa && (o -= u * qa), r = Dn(e, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), n = 0), t.point(e = o, r = a), i = u
            },
            lineEnd: function() {
                t.lineEnd(), e = r = NaN
            },
            clean: function() {
                return 2 - n
            }
        }
    }

    function Dn(t, n, e, r) {
        var i, o, a = Math.sin(t - e);
        return xa(a) > qa ? Math.atan((Math.sin(n) * (o = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(n)) * Math.sin(t)) / (i * o * a)) : (n + r) / 2
    }

    function Un(t, n, e, r) {
        var i;
        if (null == t) i = e * Ia, r.point(-za, i), r.point(0, i), r.point(za, i), r.point(za, 0), r.point(za, -i), r.point(0, -i), r.point(-za, -i), r.point(-za, 0), r.point(-za, i);
        else if (xa(t[0] - n[0]) > qa) {
            var o = t[0] < n[0] ? za : -za;
            i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(n[0], n[1])
    }

    function In(t, n) {
        var e = t[0],
            r = t[1],
            i = [Math.sin(e), -Math.cos(e), 0],
            o = 0,
            a = 0;
        _u.reset();
        for (var u = 0, s = n.length; s > u; ++u) {
            var c = n[u],
                l = c.length;
            if (l)
                for (var f = c[0], h = f[0], p = f[1] / 2 + za / 4, g = Math.sin(p), d = Math.cos(p), v = 1;;) {
                    v === l && (v = 0), t = c[v];
                    var y = t[0],
                        m = t[1] / 2 + za / 4,
                        b = Math.sin(m),
                        x = Math.cos(m),
                        w = y - h,
                        M = w >= 0 ? 1 : -1,
                        k = M * w,
                        _ = k > za,
                        S = g * b;
                    if (_u.add(Math.atan2(S * M * Math.sin(k), d * x + S * Math.cos(k))), o += _ ? w + M * Da : w, _ ^ h >= e ^ y >= e) {
                        var E = mn(vn(f), vn(t));
                        wn(E);
                        var A = mn(i, E);
                        wn(A);
                        var N = (_ ^ w >= 0 ? -1 : 1) * nt(A[2]);
                        (r > N || r === N && (E[0] || E[1])) && (a += _ ^ w >= 0 ? 1 : -1)
                    }
                    if (!v++) break;
                    h = y, g = b, d = x, f = t
                }
        }
        return (-qa > o || qa > o && 0 > _u) ^ 1 & a
    }

    function Fn(t) {
        function n(t, n) {
            return Math.cos(t) * Math.cos(n) > o
        }

        function e(t) {
            var e, o, s, c, l;
            return {
                lineStart: function() {
                    c = s = !1, l = 1
                },
                point: function(f, h) {
                    var p, g = [f, h],
                        d = n(f, h),
                        v = a ? d ? 0 : i(f, h) : d ? i(f + (0 > f ? za : -za), h) : 0;
                    if (!e && (c = s = d) && t.lineStart(), d !== s && (p = r(e, g), (kn(e, p) || kn(g, p)) && (g[0] += qa, g[1] += qa, d = n(g[0], g[1]))), d !== s) l = 0, d ? (t.lineStart(), p = r(g, e), t.point(p[0], p[1])) : (p = r(e, g), t.point(p[0], p[1]), t.lineEnd()), e = p;
                    else if (u && e && a ^ d) {
                        var y;
                        v & o || !(y = r(g, e, !0)) || (l = 0, a ? (t.lineStart(), t.point(y[0][0], y[0][1]), t.point(y[1][0], y[1][1]), t.lineEnd()) : (t.point(y[1][0], y[1][1]), t.lineEnd(), t.lineStart(), t.point(y[0][0], y[0][1])))
                    }!d || e && kn(e, g) || t.point(g[0], g[1]), e = g, s = d, o = v
                },
                lineEnd: function() {
                    s && t.lineEnd(), e = null
                },
                clean: function() {
                    return l | (c && s) << 1
                }
            }
        }

        function r(t, n, e) {
            var r = vn(t),
                i = vn(n),
                a = [1, 0, 0],
                u = mn(r, i),
                s = yn(u, u),
                c = u[0],
                l = s - c * c;
            if (!l) return !e && t;
            var f = o * s / l,
                h = -o * c / l,
                p = mn(a, u),
                g = xn(a, f),
                d = xn(u, h);
            bn(g, d);
            var v = p,
                y = yn(g, v),
                m = yn(v, v),
                b = y * y - m * (yn(g, g) - 1);
            if (!(0 > b)) {
                var x = Math.sqrt(b),
                    w = xn(v, (-y - x) / m);
                if (bn(w, g), w = Mn(w), !e) return w;
                var M, k = t[0],
                    _ = n[0],
                    S = t[1],
                    E = n[1];
                k > _ && (M = k, k = _, _ = M);
                var A = _ - k,
                    N = xa(A - za) < qa,
                    C = N || qa > A;
                if (!N && S > E && (M = S, S = E, E = M), C ? N ? S + E > 0 ^ w[1] < (xa(w[0] - k) < qa ? S : E) : S <= w[1] && w[1] <= E : A > za ^ (k <= w[0] && w[0] <= _)) {
                    var T = xn(v, (-y + x) / m);
                    return bn(T, g), [w, Mn(T)]
                }
            }
        }

        function i(n, e) {
            var r = a ? t : za - t,
                i = 0;
            return -r > n ? i |= 1 : n > r && (i |= 2), -r > e ? i |= 4 : e > r && (i |= 8), i
        }
        var o = Math.cos(t),
            a = o > 0,
            u = xa(o) > qa,
            s = de(t, 6 * Fa);
        return Ln(n, e, s, a ? [0, -t] : [-za, t - za])
    }

    function Hn(t, n, e, r) {
        return function(i) {
            var o, a = i.a,
                u = i.b,
                s = a.x,
                c = a.y,
                l = u.x,
                f = u.y,
                h = 0,
                p = 1,
                g = l - s,
                d = f - c;
            if (o = t - s, g || !(o > 0)) {
                if (o /= g, 0 > g) {
                    if (h > o) return;
                    p > o && (p = o)
                } else if (g > 0) {
                    if (o > p) return;
                    o > h && (h = o)
                }
                if (o = e - s, g || !(0 > o)) {
                    if (o /= g, 0 > g) {
                        if (o > p) return;
                        o > h && (h = o)
                    } else if (g > 0) {
                        if (h > o) return;
                        p > o && (p = o)
                    }
                    if (o = n - c, d || !(o > 0)) {
                        if (o /= d, 0 > d) {
                            if (h > o) return;
                            p > o && (p = o)
                        } else if (d > 0) {
                            if (o > p) return;
                            o > h && (h = o)
                        }
                        if (o = r - c, d || !(0 > o)) {
                            if (o /= d, 0 > d) {
                                if (o > p) return;
                                o > h && (h = o)
                            } else if (d > 0) {
                                if (h > o) return;
                                p > o && (p = o)
                            }
                            return h > 0 && (i.a = {
                                x: s + h * g,
                                y: c + h * d
                            }), 1 > p && (i.b = {
                                x: s + p * g,
                                y: c + p * d
                            }), i
                        }
                    }
                }
            }
        }
    }

    function Vn(t, n, e, r) {
        function i(r, i) {
            return xa(r[0] - t) < qa ? i > 0 ? 0 : 3 : xa(r[0] - e) < qa ? i > 0 ? 2 : 1 : xa(r[1] - n) < qa ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function o(t, n) {
            return a(t.x, n.x)
        }

        function a(t, n) {
            var e = i(t, 1),
                r = i(n, 1);
            return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
        }
        return function(u) {
            function s(t) {
                for (var n = 0, e = v.length, r = t[1], i = 0; e > i; ++i)
                    for (var o, a = 1, u = v[i], s = u.length, c = u[0]; s > a; ++a) o = u[a], c[1] <= r ? o[1] > r && Q(c, o, t) > 0 && ++n : o[1] <= r && Q(c, o, t) < 0 && --n, c = o;
                return 0 !== n
            }

            function c(o, u, s, c) {
                var l = 0,
                    f = 0;
                if (null == o || (l = i(o, s)) !== (f = i(u, s)) || a(o, u) < 0 ^ s > 0) {
                    do c.point(0 === l || 3 === l ? t : e, l > 1 ? r : n); while ((l = (l + s + 4) % 4) !== f)
                } else c.point(u[0], u[1])
            }

            function l(i, o) {
                return i >= t && e >= i && o >= n && r >= o
            }

            function f(t, n) {
                l(t, n) && u.point(t, n)
            }

            function h() {
                C.point = g, v && v.push(y = []), _ = !0, k = !1, w = M = NaN
            }

            function p() {
                d && (g(m, b), x && k && A.rejoin(), d.push(A.buffer())), C.point = f, k && u.lineEnd()
            }

            function g(t, n) {
                t = Math.max(-Du, Math.min(Du, t)), n = Math.max(-Du, Math.min(Du, n));
                var e = l(t, n);
                if (v && y.push([t, n]), _) m = t, b = n, x = e, _ = !1, e && (u.lineStart(), u.point(t, n));
                else if (e && k) u.point(t, n);
                else {
                    var r = {
                        a: {
                            x: w,
                            y: M
                        },
                        b: {
                            x: t,
                            y: n
                        }
                    };
                    N(r) ? (k || (u.lineStart(), u.point(r.a.x, r.a.y)), u.point(r.b.x, r.b.y), e || u.lineEnd(), S = !1) : e && (u.lineStart(), u.point(t, n), S = !1)
                }
                w = t, M = n, k = e
            }
            var d, v, y, m, b, x, w, M, k, _, S, E = u,
                A = qn(),
                N = Hn(t, n, e, r),
                C = {
                    point: f,
                    lineStart: h,
                    lineEnd: p,
                    polygonStart: function() {
                        u = A, d = [], v = [], S = !0
                    },
                    polygonEnd: function() {
                        u = E, d = sa.merge(d);
                        var n = s([t, r]),
                            e = S && n,
                            i = d.length;
                        (e || i) && (u.polygonStart(), e && (u.lineStart(), c(null, null, 1, u), u.lineEnd()), i && jn(d, o, n, c, u), u.polygonEnd()), d = v = y = null
                    }
                };
            return C
        }
    }

    function Yn(t) {
        var n = 0,
            e = za / 3,
            r = ue(t),
            i = r(n, e);
        return i.parallels = function(t) {
            return arguments.length ? r(n = t[0] * za / 180, e = t[1] * za / 180) : [n / za * 180, e / za * 180]
        }, i
    }

    function Xn(t, n) {
        function e(t, n) {
            var e = Math.sqrt(o - 2 * i * Math.sin(n)) / i;
            return [e * Math.sin(t *= i), a - e * Math.cos(t)]
        }
        var r = Math.sin(t),
            i = (r + Math.sin(n)) / 2,
            o = 1 + r * (2 * i - r),
            a = Math.sqrt(o) / i;
        return e.invert = function(t, n) {
            var e = a - n;
            return [Math.atan2(t, e) / i, nt((o - (t * t + e * e) * i * i) / (2 * i))]
        }, e
    }

    function Gn() {
        function t(t, n) {
            Iu += i * t - r * n, r = t, i = n
        }
        var n, e, r, i;
        Xu.point = function(o, a) {
            Xu.point = t, n = r = o, e = i = a
        }, Xu.lineEnd = function() {
            t(n, e)
        }
    }

    function Kn(t, n) {
        Fu > t && (Fu = t), t > Vu && (Vu = t), Hu > n && (Hu = n), n > Yu && (Yu = n)
    }

    function Jn() {
        function t(t, n) {
            a.push("M", t, ",", n, o)
        }

        function n(t, n) {
            a.push("M", t, ",", n), u.point = e
        }

        function e(t, n) {
            a.push("L", t, ",", n)
        }

        function r() {
            u.point = t
        }

        function i() {
            a.push("Z")
        }
        var o = $n(4.5),
            a = [],
            u = {
                point: t,
                lineStart: function() {
                    u.point = n
                },
                lineEnd: r,
                polygonStart: function() {
                    u.lineEnd = i
                },
                polygonEnd: function() {
                    u.lineEnd = r, u.point = t
                },
                pointRadius: function(t) {
                    return o = $n(t), u
                },
                result: function() {
                    if (a.length) {
                        var t = a.join("");
                        return a = [], t
                    }
                }
            };
        return u
    }

    function $n(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function Zn(t, n) {
        Nu += t, Cu += n, ++Tu
    }

    function Wn() {
        function t(t, r) {
            var i = t - n,
                o = r - e,
                a = Math.sqrt(i * i + o * o);
            ju += a * (n + t) / 2, Ou += a * (e + r) / 2, Pu += a, Zn(n = t, e = r)
        }
        var n, e;
        Ku.point = function(r, i) {
            Ku.point = t, Zn(n = r, e = i)
        }
    }

    function Qn() {
        Ku.point = Zn
    }

    function te() {
        function t(t, n) {
            var e = t - r,
                o = n - i,
                a = Math.sqrt(e * e + o * o);
            ju += a * (r + t) / 2, Ou += a * (i + n) / 2, Pu += a, a = i * t - r * n, Lu += a * (r + t), Ru += a * (i + n), qu += 3 * a, Zn(r = t, i = n)
        }
        var n, e, r, i;
        Ku.point = function(o, a) {
            Ku.point = t, Zn(n = r = o, e = i = a)
        }, Ku.lineEnd = function() {
            t(n, e)
        }
    }

    function ne(t) {
        function n(n, e) {
            t.moveTo(n + a, e), t.arc(n, e, a, 0, Da)
        }

        function e(n, e) {
            t.moveTo(n, e), u.point = r
        }

        function r(n, e) {
            t.lineTo(n, e)
        }

        function i() {
            u.point = n
        }

        function o() {
            t.closePath()
        }
        var a = 4.5,
            u = {
                point: n,
                lineStart: function() {
                    u.point = e
                },
                lineEnd: i,
                polygonStart: function() {
                    u.lineEnd = o
                },
                polygonEnd: function() {
                    u.lineEnd = i, u.point = n
                },
                pointRadius: function(t) {
                    return a = t, u
                },
                result: w
            };
        return u
    }

    function ee(t) {
        function n(t) {
            return (u ? r : e)(t)
        }

        function e(n) {
            return oe(n, function(e, r) {
                e = t(e, r), n.point(e[0], e[1])
            })
        }

        function r(n) {
            function e(e, r) {
                e = t(e, r), n.point(e[0], e[1])
            }

            function r() {
                b = NaN, _.point = o, n.lineStart()
            }

            function o(e, r) {
                var o = vn([e, r]),
                    a = t(e, r);
                i(b, x, m, w, M, k, b = a[0], x = a[1], m = e, w = o[0], M = o[1], k = o[2], u, n), n.point(b, x)
            }

            function a() {
                _.point = e, n.lineEnd()
            }

            function s() {
                r(), _.point = c, _.lineEnd = l
            }

            function c(t, n) {
                o(f = t, h = n), p = b, g = x, d = w, v = M, y = k, _.point = o
            }

            function l() {
                i(b, x, m, w, M, k, p, g, f, d, v, y, u, n), _.lineEnd = a, a()
            }
            var f, h, p, g, d, v, y, m, b, x, w, M, k, _ = {
                point: e,
                lineStart: r,
                lineEnd: a,
                polygonStart: function() {
                    n.polygonStart(), _.lineStart = s
                },
                polygonEnd: function() {
                    n.polygonEnd(), _.lineStart = r
                }
            };
            return _
        }

        function i(n, e, r, u, s, c, l, f, h, p, g, d, v, y) {
            var m = l - n,
                b = f - e,
                x = m * m + b * b;
            if (x > 4 * o && v--) {
                var w = u + p,
                    M = s + g,
                    k = c + d,
                    _ = Math.sqrt(w * w + M * M + k * k),
                    S = Math.asin(k /= _),
                    E = xa(xa(k) - 1) < qa || xa(r - h) < qa ? (r + h) / 2 : Math.atan2(M, w),
                    A = t(E, S),
                    N = A[0],
                    C = A[1],
                    T = N - n,
                    j = C - e,
                    O = b * T - m * j;
                (O * O / x > o || xa((m * T + b * j) / x - .5) > .3 || a > u * p + s * g + c * d) && (i(n, e, r, u, s, c, N, C, E, w /= _, M /= _, k, v, y), y.point(N, C), i(N, C, E, w, M, k, l, f, h, p, g, d, v, y))
            }
        }
        var o = .5,
            a = Math.cos(30 * Fa),
            u = 16;
        return n.precision = function(t) {
            return arguments.length ? (u = (o = t * t) > 0 && 16, n) : Math.sqrt(o)
        }, n
    }

    function re(t) {
        var n = ee(function(n, e) {
            return t([n * Ha, e * Ha])
        });
        return function(t) {
            return se(n(t))
        }
    }

    function ie(t) {
        this.stream = t
    }

    function oe(t, n) {
        return {
            point: n,
            sphere: function() {
                t.sphere()
            },
            lineStart: function() {
                t.lineStart()
            },
            lineEnd: function() {
                t.lineEnd()
            },
            polygonStart: function() {
                t.polygonStart()
            },
            polygonEnd: function() {
                t.polygonEnd()
            }
        }
    }

    function ae(t) {
        return ue(function() {
            return t
        })()
    }

    function ue(t) {
        function n(t) {
            return t = u(t[0] * Fa, t[1] * Fa), [t[0] * h + s, c - t[1] * h]
        }

        function e(t) {
            return t = u.invert((t[0] - s) / h, (c - t[1]) / h), t && [t[0] * Ha, t[1] * Ha]
        }

        function r() {
            u = Cn(a = fe(y, b, x), o);
            var t = o(d, v);
            return s = p - t[0] * h, c = g + t[1] * h, i()
        }

        function i() {
            return l && (l.valid = !1, l = null), n
        }
        var o, a, u, s, c, l, f = ee(function(t, n) {
                return t = o(t, n), [t[0] * h + s, c - t[1] * h]
            }),
            h = 150,
            p = 480,
            g = 250,
            d = 0,
            v = 0,
            y = 0,
            b = 0,
            x = 0,
            w = zu,
            M = m,
            k = null,
            _ = null;
        return n.stream = function(t) {
                return l && (l.valid = !1), l = se(w(a, f(M(t)))), l.valid = !0, l
            }, n.clipAngle = function(t) {
                return arguments.length ? (w = null == t ? (k = t, zu) : Fn((k = +t) * Fa), i()) : k
            }, n.clipExtent = function(t) {
                return arguments.length ? (_ = t, M = t ? Vn(t[0][0], t[0][1], t[1][0], t[1][1]) : m, i()) : _
            }, n.scale = function(t) {
                return arguments.length ? (h = +t, r()) : h
            }, n.translate = function(t) {
                return arguments.length ? (p = +t[0], g = +t[1], r()) : [p, g]
            }, n.center = function(t) {
                return arguments.length ? (d = t[0] % 360 * Fa, v = t[1] % 360 * Fa, r()) : [d * Ha, v * Ha]
            }, n.rotate = function(t) {
                return arguments.length ? (y = t[0] % 360 * Fa, b = t[1] % 360 * Fa, x = t.length > 2 ? t[2] % 360 * Fa : 0, r()) : [y * Ha, b * Ha, x * Ha]
            }, sa.rebind(n, f, "precision"),
            function() {
                return o = t.apply(this, arguments), n.invert = o.invert && e, r()
            }
    }

    function se(t) {
        return oe(t, function(n, e) {
            t.point(n * Fa, e * Fa)
        })
    }

    function ce(t, n) {
        return [t, n]
    }

    function le(t, n) {
        return [t > za ? t - Da : -za > t ? t + Da : t, n]
    }

    function fe(t, n, e) {
        return t ? n || e ? Cn(pe(t), ge(n, e)) : pe(t) : n || e ? ge(n, e) : le
    }

    function he(t) {
        return function(n, e) {
            return n += t, [n > za ? n - Da : -za > n ? n + Da : n, e]
        }
    }

    function pe(t) {
        var n = he(t);
        return n.invert = he(-t), n
    }

    function ge(t, n) {
        function e(t, n) {
            var e = Math.cos(n),
                u = Math.cos(t) * e,
                s = Math.sin(t) * e,
                c = Math.sin(n),
                l = c * r + u * i;
            return [Math.atan2(s * o - l * a, u * r - c * i), nt(l * o + s * a)]
        }
        var r = Math.cos(t),
            i = Math.sin(t),
            o = Math.cos(n),
            a = Math.sin(n);
        return e.invert = function(t, n) {
            var e = Math.cos(n),
                u = Math.cos(t) * e,
                s = Math.sin(t) * e,
                c = Math.sin(n),
                l = c * o - s * a;
            return [Math.atan2(s * o + c * a, u * r + l * i), nt(l * r - u * i)]
        }, e
    }

    function de(t, n) {
        var e = Math.cos(t),
            r = Math.sin(t);
        return function(i, o, a, u) {
            var s = a * n;
            null != i ? (i = ve(e, i), o = ve(e, o), (a > 0 ? o > i : i > o) && (i += a * Da)) : (i = t + a * Da, o = t - .5 * s);
            for (var c, l = i; a > 0 ? l > o : o > l; l -= s) u.point((c = Mn([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], c[1])
        }
    }

    function ve(t, n) {
        var e = vn(n);
        e[0] -= t, wn(e);
        var r = tt(-e[1]);
        return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - qa) % (2 * Math.PI)
    }

    function ye(t, n, e) {
        var r = sa.range(t, n - qa, e).concat(n);
        return function(t) {
            return r.map(function(n) {
                return [t, n]
            })
        }
    }

    function me(t, n, e) {
        var r = sa.range(t, n - qa, e).concat(n);
        return function(t) {
            return r.map(function(n) {
                return [n, t]
            })
        }
    }

    function be(t) {
        return t.source
    }

    function xe(t) {
        return t.target
    }

    function we(t, n, e, r) {
        var i = Math.cos(n),
            o = Math.sin(n),
            a = Math.cos(r),
            u = Math.sin(r),
            s = i * Math.cos(t),
            c = i * Math.sin(t),
            l = a * Math.cos(e),
            f = a * Math.sin(e),
            h = 2 * Math.asin(Math.sqrt(ot(r - n) + i * a * ot(e - t))),
            p = 1 / Math.sin(h),
            g = h ? function(t) {
                var n = Math.sin(t *= h) * p,
                    e = Math.sin(h - t) * p,
                    r = e * s + n * l,
                    i = e * c + n * f,
                    a = e * o + n * u;
                return [Math.atan2(i, r) * Ha, Math.atan2(a, Math.sqrt(r * r + i * i)) * Ha]
            } : function() {
                return [t * Ha, n * Ha]
            };
        return g.distance = h, g
    }

    function Me() {
        function t(t, i) {
            var o = Math.sin(i *= Fa),
                a = Math.cos(i),
                u = xa((t *= Fa) - n),
                s = Math.cos(u);
            Ju += Math.atan2(Math.sqrt((u = a * Math.sin(u)) * u + (u = r * o - e * a * s) * u), e * o + r * a * s), n = t, e = o, r = a
        }
        var n, e, r;
        $u.point = function(i, o) {
            n = i * Fa, e = Math.sin(o *= Fa), r = Math.cos(o), $u.point = t
        }, $u.lineEnd = function() {
            $u.point = $u.lineEnd = w
        }
    }

    function ke(t, n) {
        function e(n, e) {
            var r = Math.cos(n),
                i = Math.cos(e),
                o = t(r * i);
            return [o * i * Math.sin(n), o * Math.sin(e)]
        }
        return e.invert = function(t, e) {
            var r = Math.sqrt(t * t + e * e),
                i = n(r),
                o = Math.sin(i),
                a = Math.cos(i);
            return [Math.atan2(t * o, r * a), Math.asin(r && e * o / r)]
        }, e
    }

    function _e(t, n) {
        function e(t, n) {
            a > 0 ? -Ia + qa > n && (n = -Ia + qa) : n > Ia - qa && (n = Ia - qa);
            var e = a / Math.pow(i(n), o);
            return [e * Math.sin(o * t), a - e * Math.cos(o * t)]
        }
        var r = Math.cos(t),
            i = function(t) {
                return Math.tan(za / 4 + t / 2)
            },
            o = t === n ? Math.sin(t) : Math.log(r / Math.cos(n)) / Math.log(i(n) / i(t)),
            a = r * Math.pow(i(t), o) / o;
        return o ? (e.invert = function(t, n) {
            var e = a - n,
                r = W(o) * Math.sqrt(t * t + e * e);
            return [Math.atan2(t, e) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - Ia]
        }, e) : Ee
    }

    function Se(t, n) {
        function e(t, n) {
            var e = o - n;
            return [e * Math.sin(i * t), o - e * Math.cos(i * t)]
        }
        var r = Math.cos(t),
            i = t === n ? Math.sin(t) : (r - Math.cos(n)) / (n - t),
            o = r / i + t;
        return xa(i) < qa ? ce : (e.invert = function(t, n) {
            var e = o - n;
            return [Math.atan2(t, e) / i, o - W(i) * Math.sqrt(t * t + e * e)]
        }, e)
    }

    function Ee(t, n) {
        return [t, Math.log(Math.tan(za / 4 + n / 2))]
    }

    function Ae(t) {
        var n, e = ae(t),
            r = e.scale,
            i = e.translate,
            o = e.clipExtent;
        return e.scale = function() {
            var t = r.apply(e, arguments);
            return t === e ? n ? e.clipExtent(null) : e : t
        }, e.translate = function() {
            var t = i.apply(e, arguments);
            return t === e ? n ? e.clipExtent(null) : e : t
        }, e.clipExtent = function(t) {
            var a = o.apply(e, arguments);
            if (a === e) {
                if (n = null == t) {
                    var u = za * r(),
                        s = i();
                    o([
                        [s[0] - u, s[1] - u],
                        [s[0] + u, s[1] + u]
                    ])
                }
            } else n && (a = null);
            return a
        }, e.clipExtent(null)
    }

    function Ne(t, n) {
        return [Math.log(Math.tan(za / 4 + n / 2)), -t]
    }

    function Ce(t) {
        return t[0]
    }

    function Te(t) {
        return t[1]
    }

    function je(t) {
        for (var n = t.length, e = [0, 1], r = 2, i = 2; n > i; i++) {
            for (; r > 1 && Q(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0;) --r;
            e[r++] = i
        }
        return e.slice(0, r)
    }

    function Oe(t, n) {
        return t[0] - n[0] || t[1] - n[1]
    }

    function Pe(t, n, e) {
        return (e[0] - n[0]) * (t[1] - n[1]) < (e[1] - n[1]) * (t[0] - n[0])
    }

    function Le(t, n, e, r) {
        var i = t[0],
            o = e[0],
            a = n[0] - i,
            u = r[0] - o,
            s = t[1],
            c = e[1],
            l = n[1] - s,
            f = r[1] - c,
            h = (u * (s - c) - f * (i - o)) / (f * a - u * l);
        return [i + h * a, s + h * l]
    }

    function Re(t) {
        var n = t[0],
            e = t[t.length - 1];
        return !(n[0] - e[0] || n[1] - e[1])
    }

    function qe() {
        rr(this), this.edge = this.site = this.circle = null
    }

    function Be(t) {
        var n = ss.pop() || new qe;
        return n.site = t, n
    }

    function ze(t) {
        Ke(t), os.remove(t), ss.push(t), rr(t)
    }

    function De(t) {
        var n = t.circle,
            e = n.x,
            r = n.cy,
            i = {
                x: e,
                y: r
            },
            o = t.P,
            a = t.N,
            u = [t];
        ze(t);
        for (var s = o; s.circle && xa(e - s.circle.x) < qa && xa(r - s.circle.cy) < qa;) o = s.P, u.unshift(s), ze(s), s = o;
        u.unshift(s), Ke(s);
        for (var c = a; c.circle && xa(e - c.circle.x) < qa && xa(r - c.circle.cy) < qa;) a = c.N, u.push(c), ze(c), c = a;
        u.push(c), Ke(c);
        var l, f = u.length;
        for (l = 1; f > l; ++l) c = u[l], s = u[l - 1], tr(c.edge, s.site, c.site, i);
        s = u[0], c = u[f - 1], c.edge = We(s.site, c.site, null, i), Ge(s), Ge(c)
    }

    function Ue(t) {
        for (var n, e, r, i, o = t.x, a = t.y, u = os._; u;)
            if (r = Ie(u, a) - o, r > qa) u = u.L;
            else {
                if (i = o - Fe(u, a), !(i > qa)) {
                    r > -qa ? (n = u.P, e = u) : i > -qa ? (n = u, e = u.N) : n = e = u;
                    break
                }
                if (!u.R) {
                    n = u;
                    break
                }
                u = u.R
            }
        var s = Be(t);
        if (os.insert(n, s), n || e) {
            if (n === e) return Ke(n), e = Be(n.site), os.insert(s, e), s.edge = e.edge = We(n.site, s.site), Ge(n), void Ge(e);
            if (!e) return void(s.edge = We(n.site, s.site));
            Ke(n), Ke(e);
            var c = n.site,
                l = c.x,
                f = c.y,
                h = t.x - l,
                p = t.y - f,
                g = e.site,
                d = g.x - l,
                v = g.y - f,
                y = 2 * (h * v - p * d),
                m = h * h + p * p,
                b = d * d + v * v,
                x = {
                    x: (v * m - p * b) / y + l,
                    y: (h * b - d * m) / y + f
                };
            tr(e.edge, c, g, x), s.edge = We(c, t, null, x), e.edge = We(t, g, null, x), Ge(n), Ge(e)
        }
    }

    function Ie(t, n) {
        var e = t.site,
            r = e.x,
            i = e.y,
            o = i - n;
        if (!o) return r;
        var a = t.P;
        if (!a) return -(1 / 0);
        e = a.site;
        var u = e.x,
            s = e.y,
            c = s - n;
        if (!c) return u;
        var l = u - r,
            f = 1 / o - 1 / c,
            h = l / c;
        return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * c) - s + c / 2 + i - o / 2))) / f + r : (r + u) / 2
    }

    function Fe(t, n) {
        var e = t.N;
        if (e) return Ie(e, n);
        var r = t.site;
        return r.y === n ? r.x : 1 / 0
    }

    function He(t) {
        this.site = t, this.edges = []
    }

    function Ve(t) {
        for (var n, e, r, i, o, a, u, s, c, l, f = t[0][0], h = t[1][0], p = t[0][1], g = t[1][1], d = is, v = d.length; v--;)
            if (o = d[v], o && o.prepare())
                for (u = o.edges, s = u.length, a = 0; s > a;) l = u[a].end(), r = l.x, i = l.y, c = u[++a % s].start(), n = c.x, e = c.y, (xa(r - n) > qa || xa(i - e) > qa) && (u.splice(a, 0, new nr(Qe(o.site, l, xa(r - f) < qa && g - i > qa ? {
                    x: f,
                    y: xa(n - f) < qa ? e : g
                } : xa(i - g) < qa && h - r > qa ? {
                    x: xa(e - g) < qa ? n : h,
                    y: g
                } : xa(r - h) < qa && i - p > qa ? {
                    x: h,
                    y: xa(n - h) < qa ? e : p
                } : xa(i - p) < qa && r - f > qa ? {
                    x: xa(e - p) < qa ? n : f,
                    y: p
                } : null), o.site, null)), ++s)
    }

    function Ye(t, n) {
        return n.angle - t.angle
    }

    function Xe() {
        rr(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function Ge(t) {
        var n = t.P,
            e = t.N;
        if (n && e) {
            var r = n.site,
                i = t.site,
                o = e.site;
            if (r !== o) {
                var a = i.x,
                    u = i.y,
                    s = r.x - a,
                    c = r.y - u,
                    l = o.x - a,
                    f = o.y - u,
                    h = 2 * (s * f - c * l);
                if (!(h >= -Ba)) {
                    var p = s * s + c * c,
                        g = l * l + f * f,
                        d = (f * p - c * g) / h,
                        v = (s * g - l * p) / h,
                        f = v + u,
                        y = cs.pop() || new Xe;
                    y.arc = t, y.site = i, y.x = d + a, y.y = f + Math.sqrt(d * d + v * v), y.cy = f, t.circle = y;
                    for (var m = null, b = us._; b;)
                        if (y.y < b.y || y.y === b.y && y.x <= b.x) {
                            if (!b.L) {
                                m = b.P;
                                break
                            }
                            b = b.L
                        } else {
                            if (!b.R) {
                                m = b;
                                break
                            }
                            b = b.R
                        }
                    us.insert(m, y), m || (as = y)
                }
            }
        }
    }

    function Ke(t) {
        var n = t.circle;
        n && (n.P || (as = n.N), us.remove(n), cs.push(n), rr(n), t.circle = null)
    }

    function Je(t) {
        for (var n, e = rs, r = Hn(t[0][0], t[0][1], t[1][0], t[1][1]), i = e.length; i--;) n = e[i], (!$e(n, t) || !r(n) || xa(n.a.x - n.b.x) < qa && xa(n.a.y - n.b.y) < qa) && (n.a = n.b = null, e.splice(i, 1))
    }

    function $e(t, n) {
        var e = t.b;
        if (e) return !0;
        var r, i, o = t.a,
            a = n[0][0],
            u = n[1][0],
            s = n[0][1],
            c = n[1][1],
            l = t.l,
            f = t.r,
            h = l.x,
            p = l.y,
            g = f.x,
            d = f.y,
            v = (h + g) / 2,
            y = (p + d) / 2;
        if (d === p) {
            if (a > v || v >= u) return;
            if (h > g) {
                if (o) {
                    if (o.y >= c) return
                } else o = {
                    x: v,
                    y: s
                };
                e = {
                    x: v,
                    y: c
                }
            } else {
                if (o) {
                    if (o.y < s) return
                } else o = {
                    x: v,
                    y: c
                };
                e = {
                    x: v,
                    y: s
                }
            }
        } else if (r = (h - g) / (d - p), i = y - r * v, -1 > r || r > 1)
            if (h > g) {
                if (o) {
                    if (o.y >= c) return
                } else o = {
                    x: (s - i) / r,
                    y: s
                };
                e = {
                    x: (c - i) / r,
                    y: c
                }
            } else {
                if (o) {
                    if (o.y < s) return
                } else o = {
                    x: (c - i) / r,
                    y: c
                };
                e = {
                    x: (s - i) / r,
                    y: s
                }
            } else if (d > p) {
            if (o) {
                if (o.x >= u) return
            } else o = {
                x: a,
                y: r * a + i
            };
            e = {
                x: u,
                y: r * u + i
            }
        } else {
            if (o) {
                if (o.x < a) return
            } else o = {
                x: u,
                y: r * u + i
            };
            e = {
                x: a,
                y: r * a + i
            }
        }
        return t.a = o, t.b = e, !0
    }

    function Ze(t, n) {
        this.l = t, this.r = n, this.a = this.b = null
    }

    function We(t, n, e, r) {
        var i = new Ze(t, n);
        return rs.push(i), e && tr(i, t, n, e), r && tr(i, n, t, r), is[t.i].edges.push(new nr(i, t, n)), is[n.i].edges.push(new nr(i, n, t)), i
    }

    function Qe(t, n, e) {
        var r = new Ze(t, null);
        return r.a = n, r.b = e, rs.push(r), r
    }

    function tr(t, n, e, r) {
        t.a || t.b ? t.l === e ? t.b = r : t.a = r : (t.a = r, t.l = n, t.r = e)
    }

    function nr(t, n, e) {
        var r = t.a,
            i = t.b;
        this.edge = t, this.site = n, this.angle = e ? Math.atan2(e.y - n.y, e.x - n.x) : t.l === n ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
    }

    function er() {
        this._ = null
    }

    function rr(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null
    }

    function ir(t, n) {
        var e = n,
            r = n.R,
            i = e.U;
        i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
    }

    function or(t, n) {
        var e = n,
            r = n.L,
            i = e.U;
        i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
    }

    function ar(t) {
        for (; t.L;) t = t.L;
        return t
    }

    function ur(t, n) {
        var e, r, i, o = t.sort(sr).pop();
        for (rs = [], is = new Array(t.length), os = new er, us = new er;;)
            if (i = as, o && (!i || o.y < i.y || o.y === i.y && o.x < i.x))(o.x !== e || o.y !== r) && (is[o.i] = new He(o), Ue(o), e = o.x, r = o.y), o = t.pop();
            else {
                if (!i) break;
                De(i.arc)
            }
        n && (Je(n), Ve(n));
        var a = {
            cells: is,
            edges: rs
        };
        return os = us = rs = is = null, a
    }

    function sr(t, n) {
        return n.y - t.y || n.x - t.x
    }

    function cr(t, n, e) {
        return (t.x - e.x) * (n.y - t.y) - (t.x - n.x) * (e.y - t.y)
    }

    function lr(t) {
        return t.x
    }

    function fr(t) {
        return t.y
    }

    function hr() {
        return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
        }
    }

    function pr(t, n, e, r, i, o) {
        if (!t(n, e, r, i, o)) {
            var a = .5 * (e + i),
                u = .5 * (r + o),
                s = n.nodes;
            s[0] && pr(t, s[0], e, r, a, u), s[1] && pr(t, s[1], a, r, i, u), s[2] && pr(t, s[2], e, u, a, o), s[3] && pr(t, s[3], a, u, i, o)
        }
    }

    function gr(t, n, e, r, i, o, a) {
        var u, s = 1 / 0;
        return function c(t, l, f, h, p) {
            if (!(l > o || f > a || r > h || i > p)) {
                if (g = t.point) {
                    var g, d = n - t.x,
                        v = e - t.y,
                        y = d * d + v * v;
                    if (s > y) {
                        var m = Math.sqrt(s = y);
                        r = n - m, i = e - m, o = n + m, a = e + m, u = g
                    }
                }
                for (var b = t.nodes, x = .5 * (l + h), w = .5 * (f + p), M = n >= x, k = e >= w, _ = k << 1 | M, S = _ + 4; S > _; ++_)
                    if (t = b[3 & _]) switch (3 & _) {
                        case 0:
                            c(t, l, f, x, w);
                            break;
                        case 1:
                            c(t, x, f, h, w);
                            break;
                        case 2:
                            c(t, l, w, x, p);
                            break;
                        case 3:
                            c(t, x, w, h, p)
                    }
            }
        }(t, r, i, o, a), u
    }

    function dr(t, n) {
        t = sa.rgb(t), n = sa.rgb(n);
        var e = t.r,
            r = t.g,
            i = t.b,
            o = n.r - e,
            a = n.g - r,
            u = n.b - i;
        return function(t) {
            return "#" + xt(Math.round(e + o * t)) + xt(Math.round(r + a * t)) + xt(Math.round(i + u * t))
        }
    }

    function vr(t, n) {
        var e, r = {},
            i = {};
        for (e in t) e in n ? r[e] = br(t[e], n[e]) : i[e] = t[e];
        for (e in n) e in t || (i[e] = n[e]);
        return function(t) {
            for (e in r) i[e] = r[e](t);
            return i
        }
    }

    function yr(t, n) {
        return t = +t, n = +n,
            function(e) {
                return t * (1 - e) + n * e
            }
    }

    function mr(t, n) {
        var e, r, i, o = fs.lastIndex = hs.lastIndex = 0,
            a = -1,
            u = [],
            s = [];
        for (t += "", n += "";
            (e = fs.exec(t)) && (r = hs.exec(n));)(i = r.index) > o && (i = n.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, s.push({
            i: a,
            x: yr(e, r)
        })), o = hs.lastIndex;
        return o < n.length && (i = n.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? s[0] ? (n = s[0].x, function(t) {
            return n(t) + ""
        }) : function() {
            return n
        } : (n = s.length, function(t) {
            for (var e, r = 0; n > r; ++r) u[(e = s[r]).i] = e.x(t);
            return u.join("")
        })
    }

    function br(t, n) {
        for (var e, r = sa.interpolators.length; --r >= 0 && !(e = sa.interpolators[r](t, n)););
        return e
    }

    function xr(t, n) {
        var e, r = [],
            i = [],
            o = t.length,
            a = n.length,
            u = Math.min(t.length, n.length);
        for (e = 0; u > e; ++e) r.push(br(t[e], n[e]));
        for (; o > e; ++e) i[e] = t[e];
        for (; a > e; ++e) i[e] = n[e];
        return function(t) {
            for (e = 0; u > e; ++e) i[e] = r[e](t);
            return i
        }
    }

    function wr(t) {
        return function(n) {
            return 0 >= n ? 0 : n >= 1 ? 1 : t(n)
        }
    }

    function Mr(t) {
        return function(n) {
            return 1 - t(1 - n)
        }
    }

    function kr(t) {
        return function(n) {
            return .5 * (.5 > n ? t(2 * n) : 2 - t(2 - 2 * n))
        }
    }

    function _r(t) {
        return t * t
    }

    function Sr(t) {
        return t * t * t
    }

    function Er(t) {
        if (0 >= t) return 0;
        if (t >= 1) return 1;
        var n = t * t,
            e = n * t;
        return 4 * (.5 > t ? e : 3 * (t - n) + e - .75)
    }

    function Ar(t) {
        return function(n) {
            return Math.pow(n, t)
        }
    }

    function Nr(t) {
        return 1 - Math.cos(t * Ia)
    }

    function Cr(t) {
        return Math.pow(2, 10 * (t - 1))
    }

    function Tr(t) {
        return 1 - Math.sqrt(1 - t * t)
    }

    function jr(t, n) {
        var e;
        return arguments.length < 2 && (n = .45), arguments.length ? e = n / Da * Math.asin(1 / t) : (t = 1, e = n / 4),
            function(r) {
                return 1 + t * Math.pow(2, -10 * r) * Math.sin((r - e) * Da / n)
            }
    }

    function Or(t) {
        return t || (t = 1.70158),
            function(n) {
                return n * n * ((t + 1) * n - t)
            }
    }

    function Pr(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }

    function Lr(t, n) {
        t = sa.hcl(t), n = sa.hcl(n);
        var e = t.h,
            r = t.c,
            i = t.l,
            o = n.h - e,
            a = n.c - r,
            u = n.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? n.c : r), isNaN(o) ? (o = 0, e = isNaN(e) ? n.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return lt(e + o * t, r + a * t, i + u * t) + ""
            }
    }

    function Rr(t, n) {
        t = sa.hsl(t), n = sa.hsl(n);
        var e = t.h,
            r = t.s,
            i = t.l,
            o = n.h - e,
            a = n.s - r,
            u = n.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? n.s : r),
            isNaN(o) ? (o = 0, e = isNaN(e) ? n.h : e) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return st(e + o * t, r + a * t, i + u * t) + ""
            }
    }

    function qr(t, n) {
        t = sa.lab(t), n = sa.lab(n);
        var e = t.l,
            r = t.a,
            i = t.b,
            o = n.l - e,
            a = n.a - r,
            u = n.b - i;
        return function(t) {
            return ht(e + o * t, r + a * t, i + u * t) + ""
        }
    }

    function Br(t, n) {
        return n -= t,
            function(e) {
                return Math.round(t + n * e)
            }
    }

    function zr(t) {
        var n = [t.a, t.b],
            e = [t.c, t.d],
            r = Ur(n),
            i = Dr(n, e),
            o = Ur(Ir(e, n, -i)) || 0;
        n[0] * e[1] < e[0] * n[1] && (n[0] *= -1, n[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(n[1], n[0]) : Math.atan2(-e[0], e[1])) * Ha, this.translate = [t.e, t.f], this.scale = [r, o], this.skew = o ? Math.atan2(i, o) * Ha : 0
    }

    function Dr(t, n) {
        return t[0] * n[0] + t[1] * n[1]
    }

    function Ur(t) {
        var n = Math.sqrt(Dr(t, t));
        return n && (t[0] /= n, t[1] /= n), n
    }

    function Ir(t, n, e) {
        return t[0] += e * n[0], t[1] += e * n[1], t
    }

    function Fr(t) {
        return t.length ? t.pop() + "," : ""
    }

    function Hr(t, n, e, r) {
        if (t[0] !== n[0] || t[1] !== n[1]) {
            var i = e.push("translate(", null, ",", null, ")");
            r.push({
                i: i - 4,
                x: yr(t[0], n[0])
            }, {
                i: i - 2,
                x: yr(t[1], n[1])
            })
        } else(n[0] || n[1]) && e.push("translate(" + n + ")")
    }

    function Vr(t, n, e, r) {
        t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), r.push({
            i: e.push(Fr(e) + "rotate(", null, ")") - 2,
            x: yr(t, n)
        })) : n && e.push(Fr(e) + "rotate(" + n + ")")
    }

    function Yr(t, n, e, r) {
        t !== n ? r.push({
            i: e.push(Fr(e) + "skewX(", null, ")") - 2,
            x: yr(t, n)
        }) : n && e.push(Fr(e) + "skewX(" + n + ")")
    }

    function Xr(t, n, e, r) {
        if (t[0] !== n[0] || t[1] !== n[1]) {
            var i = e.push(Fr(e) + "scale(", null, ",", null, ")");
            r.push({
                i: i - 4,
                x: yr(t[0], n[0])
            }, {
                i: i - 2,
                x: yr(t[1], n[1])
            })
        } else(1 !== n[0] || 1 !== n[1]) && e.push(Fr(e) + "scale(" + n + ")")
    }

    function Gr(t, n) {
        var e = [],
            r = [];
        return t = sa.transform(t), n = sa.transform(n), Hr(t.translate, n.translate, e, r), Vr(t.rotate, n.rotate, e, r), Yr(t.skew, n.skew, e, r), Xr(t.scale, n.scale, e, r), t = n = null,
            function(t) {
                for (var n, i = -1, o = r.length; ++i < o;) e[(n = r[i]).i] = n.x(t);
                return e.join("")
            }
    }

    function Kr(t, n) {
        return n = (n -= t = +t) || 1 / n,
            function(e) {
                return (e - t) / n
            }
    }

    function Jr(t, n) {
        return n = (n -= t = +t) || 1 / n,
            function(e) {
                return Math.max(0, Math.min(1, (e - t) / n))
            }
    }

    function $r(t) {
        for (var n = t.source, e = t.target, r = Wr(n, e), i = [n]; n !== r;) n = n.parent, i.push(n);
        for (var o = i.length; e !== r;) i.splice(o, 0, e), e = e.parent;
        return i
    }

    function Zr(t) {
        for (var n = [], e = t.parent; null != e;) n.push(t), t = e, e = e.parent;
        return n.push(t), n
    }

    function Wr(t, n) {
        if (t === n) return t;
        for (var e = Zr(t), r = Zr(n), i = e.pop(), o = r.pop(), a = null; i === o;) a = i, i = e.pop(), o = r.pop();
        return a
    }

    function Qr(t) {
        t.fixed |= 2
    }

    function ti(t) {
        t.fixed &= -7
    }

    function ni(t) {
        t.fixed |= 4, t.px = t.x, t.py = t.y
    }

    function ei(t) {
        t.fixed &= -5
    }

    function ri(t, n, e) {
        var r = 0,
            i = 0;
        if (t.charge = 0, !t.leaf)
            for (var o, a = t.nodes, u = a.length, s = -1; ++s < u;) o = a[s], null != o && (ri(o, n, e), t.charge += o.charge, r += o.charge * o.cx, i += o.charge * o.cy);
        if (t.point) {
            t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
            var c = n * e[t.point.index];
            t.charge += t.pointCharge = c, r += c * t.point.x, i += c * t.point.y
        }
        t.cx = r / t.charge, t.cy = i / t.charge
    }

    function ii(t, n) {
        return sa.rebind(t, n, "sort", "children", "value"), t.nodes = t, t.links = li, t
    }

    function oi(t, n) {
        for (var e = [t]; null != (t = e.pop());)
            if (n(t), (i = t.children) && (r = i.length))
                for (var r, i; --r >= 0;) e.push(i[r])
    }

    function ai(t, n) {
        for (var e = [t], r = []; null != (t = e.pop());)
            if (r.push(t), (o = t.children) && (i = o.length))
                for (var i, o, a = -1; ++a < i;) e.push(o[a]);
        for (; null != (t = r.pop());) n(t)
    }

    function ui(t) {
        return t.children
    }

    function si(t) {
        return t.value
    }

    function ci(t, n) {
        return n.value - t.value
    }

    function li(t) {
        return sa.merge(t.map(function(t) {
            return (t.children || []).map(function(n) {
                return {
                    source: t,
                    target: n
                }
            })
        }))
    }

    function fi(t) {
        return t.x
    }

    function hi(t) {
        return t.y
    }

    function pi(t, n, e) {
        t.y0 = n, t.y = e
    }

    function gi(t) {
        return sa.range(t.length)
    }

    function di(t) {
        for (var n = -1, e = t[0].length, r = []; ++n < e;) r[n] = 0;
        return r
    }

    function vi(t) {
        for (var n, e = 1, r = 0, i = t[0][1], o = t.length; o > e; ++e)(n = t[e][1]) > i && (r = e, i = n);
        return r
    }

    function yi(t) {
        return t.reduce(mi, 0)
    }

    function mi(t, n) {
        return t + n[1]
    }

    function bi(t, n) {
        return xi(t, Math.ceil(Math.log(n.length) / Math.LN2 + 1))
    }

    function xi(t, n) {
        for (var e = -1, r = +t[0], i = (t[1] - r) / n, o = []; ++e <= n;) o[e] = i * e + r;
        return o
    }

    function wi(t) {
        return [sa.min(t), sa.max(t)]
    }

    function Mi(t, n) {
        return t.value - n.value
    }

    function ki(t, n) {
        var e = t._pack_next;
        t._pack_next = n, n._pack_prev = t, n._pack_next = e, e._pack_prev = n
    }

    function _i(t, n) {
        t._pack_next = n, n._pack_prev = t
    }

    function Si(t, n) {
        var e = n.x - t.x,
            r = n.y - t.y,
            i = t.r + n.r;
        return .999 * i * i > e * e + r * r
    }

    function Ei(t) {
        function n(t) {
            l = Math.min(t.x - t.r, l), f = Math.max(t.x + t.r, f), h = Math.min(t.y - t.r, h), p = Math.max(t.y + t.r, p)
        }
        if ((e = t.children) && (c = e.length)) {
            var e, r, i, o, a, u, s, c, l = 1 / 0,
                f = -(1 / 0),
                h = 1 / 0,
                p = -(1 / 0);
            if (e.forEach(Ai), r = e[0], r.x = -r.r, r.y = 0, n(r), c > 1 && (i = e[1], i.x = i.r, i.y = 0, n(i), c > 2))
                for (o = e[2], Ti(r, i, o), n(o), ki(r, o), r._pack_prev = o, ki(o, i), i = r._pack_next, a = 3; c > a; a++) {
                    Ti(r, i, o = e[a]);
                    var g = 0,
                        d = 1,
                        v = 1;
                    for (u = i._pack_next; u !== i; u = u._pack_next, d++)
                        if (Si(u, o)) {
                            g = 1;
                            break
                        }
                    if (1 == g)
                        for (s = r._pack_prev; s !== u._pack_prev && !Si(s, o); s = s._pack_prev, v++);
                    g ? (v > d || d == v && i.r < r.r ? _i(r, i = u) : _i(r = s, i), a--) : (ki(r, o), i = o, n(o))
                }
            var y = (l + f) / 2,
                m = (h + p) / 2,
                b = 0;
            for (a = 0; c > a; a++) o = e[a], o.x -= y, o.y -= m, b = Math.max(b, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
            t.r = b, e.forEach(Ni)
        }
    }

    function Ai(t) {
        t._pack_next = t._pack_prev = t
    }

    function Ni(t) {
        delete t._pack_next, delete t._pack_prev
    }

    function Ci(t, n, e, r) {
        var i = t.children;
        if (t.x = n += r * t.x, t.y = e += r * t.y, t.r *= r, i)
            for (var o = -1, a = i.length; ++o < a;) Ci(i[o], n, e, r)
    }

    function Ti(t, n, e) {
        var r = t.r + e.r,
            i = n.x - t.x,
            o = n.y - t.y;
        if (r && (i || o)) {
            var a = n.r + e.r,
                u = i * i + o * o;
            a *= a, r *= r;
            var s = .5 + (r - a) / (2 * u),
                c = Math.sqrt(Math.max(0, 2 * a * (r + u) - (r -= u) * r - a * a)) / (2 * u);
            e.x = t.x + s * i + c * o, e.y = t.y + s * o - c * i
        } else e.x = t.x + r, e.y = t.y
    }

    function ji(t, n) {
        return t.parent == n.parent ? 1 : 2
    }

    function Oi(t) {
        var n = t.children;
        return n.length ? n[0] : t.t
    }

    function Pi(t) {
        var n, e = t.children;
        return (n = e.length) ? e[n - 1] : t.t
    }

    function Li(t, n, e) {
        var r = e / (n.i - t.i);
        n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e
    }

    function Ri(t) {
        for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;) n = i[o], n.z += e, n.m += e, e += n.s + (r += n.c)
    }

    function qi(t, n, e) {
        return t.a.parent === n.parent ? t.a : e
    }

    function Bi(t) {
        return 1 + sa.max(t, function(t) {
            return t.y
        })
    }

    function zi(t) {
        return t.reduce(function(t, n) {
            return t + n.x
        }, 0) / t.length
    }

    function Di(t) {
        var n = t.children;
        return n && n.length ? Di(n[0]) : t
    }

    function Ui(t) {
        var n, e = t.children;
        return e && (n = e.length) ? Ui(e[n - 1]) : t
    }

    function Ii(t) {
        return {
            x: t.x,
            y: t.y,
            dx: t.dx,
            dy: t.dy
        }
    }

    function Fi(t, n) {
        var e = t.x + n[3],
            r = t.y + n[0],
            i = t.dx - n[1] - n[3],
            o = t.dy - n[0] - n[2];
        return 0 > i && (e += i / 2, i = 0), 0 > o && (r += o / 2, o = 0), {
            x: e,
            y: r,
            dx: i,
            dy: o
        }
    }

    function Hi(t) {
        var n = t[0],
            e = t[t.length - 1];
        return e > n ? [n, e] : [e, n]
    }

    function Vi(t) {
        return t.rangeExtent ? t.rangeExtent() : Hi(t.range())
    }

    function Yi(t, n, e, r) {
        var i = e(t[0], t[1]),
            o = r(n[0], n[1]);
        return function(t) {
            return o(i(t))
        }
    }

    function Xi(t, n) {
        var e, r = 0,
            i = t.length - 1,
            o = t[r],
            a = t[i];
        return o > a && (e = r, r = i, i = e, e = o, o = a, a = e), t[r] = n.floor(o), t[i] = n.ceil(a), t
    }

    function Gi(t) {
        return t ? {
            floor: function(n) {
                return Math.floor(n / t) * t
            },
            ceil: function(n) {
                return Math.ceil(n / t) * t
            }
        } : ks
    }

    function Ki(t, n, e, r) {
        var i = [],
            o = [],
            a = 0,
            u = Math.min(t.length, n.length) - 1;
        for (t[u] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a <= u;) i.push(e(t[a - 1], t[a])), o.push(r(n[a - 1], n[a]));
        return function(n) {
            var e = sa.bisect(t, n, 1, u) - 1;
            return o[e](i[e](n))
        }
    }

    function Ji(t, n, e, r) {
        function i() {
            var i = Math.min(t.length, n.length) > 2 ? Ki : Yi,
                s = r ? Jr : Kr;
            return a = i(t, n, s, e), u = i(n, t, s, br), o
        }

        function o(t) {
            return a(t)
        }
        var a, u;
        return o.invert = function(t) {
            return u(t)
        }, o.domain = function(n) {
            return arguments.length ? (t = n.map(Number), i()) : t
        }, o.range = function(t) {
            return arguments.length ? (n = t, i()) : n
        }, o.rangeRound = function(t) {
            return o.range(t).interpolate(Br)
        }, o.clamp = function(t) {
            return arguments.length ? (r = t, i()) : r
        }, o.interpolate = function(t) {
            return arguments.length ? (e = t, i()) : e
        }, o.ticks = function(n) {
            return Qi(t, n)
        }, o.tickFormat = function(n, e) {
            return to(t, n, e)
        }, o.nice = function(n) {
            return Zi(t, n), i()
        }, o.copy = function() {
            return Ji(t, n, e, r)
        }, i()
    }

    function $i(t, n) {
        return sa.rebind(t, n, "range", "rangeRound", "interpolate", "clamp")
    }

    function Zi(t, n) {
        return Xi(t, Gi(Wi(t, n)[2]))
    }

    function Wi(t, n) {
        null == n && (n = 10);
        var e = Hi(t),
            r = e[1] - e[0],
            i = Math.pow(10, Math.floor(Math.log(r / n) / Math.LN10)),
            o = n / r * i;
        return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e
    }

    function Qi(t, n) {
        return sa.range.apply(sa, Wi(t, n))
    }

    function to(t, n, e) {
        var r = Wi(t, n);
        if (e) {
            var i = fu.exec(e);
            if (i.shift(), "s" === i[8]) {
                var o = sa.formatPrefix(Math.max(xa(r[0]), xa(r[1])));
                return i[7] || (i[7] = "." + no(o.scale(r[2]))), i[8] = "f", e = sa.format(i.join("")),
                    function(t) {
                        return e(o.scale(t)) + o.symbol
                    }
            }
            i[7] || (i[7] = "." + eo(i[8], r)), e = i.join("")
        } else e = ",." + no(r[2]) + "f";
        return sa.format(e)
    }

    function no(t) {
        return -Math.floor(Math.log(t) / Math.LN10 + .01)
    }

    function eo(t, n) {
        var e = no(n[2]);
        return t in _s ? Math.abs(e - no(Math.max(xa(n[0]), xa(n[1])))) + +("e" !== t) : e - 2 * ("%" === t)
    }

    function ro(t, n, e, r) {
        function i(t) {
            return (e ? Math.log(0 > t ? 0 : t) : -Math.log(t > 0 ? 0 : -t)) / Math.log(n)
        }

        function o(t) {
            return e ? Math.pow(n, t) : -Math.pow(n, -t)
        }

        function a(n) {
            return t(i(n))
        }
        return a.invert = function(n) {
            return o(t.invert(n))
        }, a.domain = function(n) {
            return arguments.length ? (e = n[0] >= 0, t.domain((r = n.map(Number)).map(i)), a) : r
        }, a.base = function(e) {
            return arguments.length ? (n = +e, t.domain(r.map(i)), a) : n
        }, a.nice = function() {
            var n = Xi(r.map(i), e ? Math : Es);
            return t.domain(n), r = n.map(o), a
        }, a.ticks = function() {
            var t = Hi(r),
                a = [],
                u = t[0],
                s = t[1],
                c = Math.floor(i(u)),
                l = Math.ceil(i(s)),
                f = n % 1 ? 2 : n;
            if (isFinite(l - c)) {
                if (e) {
                    for (; l > c; c++)
                        for (var h = 1; f > h; h++) a.push(o(c) * h);
                    a.push(o(c))
                } else
                    for (a.push(o(c)); c++ < l;)
                        for (var h = f - 1; h > 0; h--) a.push(o(c) * h);
                for (c = 0; a[c] < u; c++);
                for (l = a.length; a[l - 1] > s; l--);
                a = a.slice(c, l)
            }
            return a
        }, a.tickFormat = function(t, n) {
            if (!arguments.length) return Ss;
            arguments.length < 2 ? n = Ss : "function" != typeof n && (n = sa.format(n));
            var r, u = Math.max(.1, t / a.ticks().length),
                s = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor);
            return function(t) {
                return t / o(s(i(t) + r)) <= u ? n(t) : ""
            }
        }, a.copy = function() {
            return ro(t.copy(), n, e, r)
        }, $i(a, t)
    }

    function io(t, n, e) {
        function r(n) {
            return t(i(n))
        }
        var i = oo(n),
            o = oo(1 / n);
        return r.invert = function(n) {
            return o(t.invert(n))
        }, r.domain = function(n) {
            return arguments.length ? (t.domain((e = n.map(Number)).map(i)), r) : e
        }, r.ticks = function(t) {
            return Qi(e, t)
        }, r.tickFormat = function(t, n) {
            return to(e, t, n)
        }, r.nice = function(t) {
            return r.domain(Zi(e, t))
        }, r.exponent = function(a) {
            return arguments.length ? (i = oo(n = a), o = oo(1 / n), t.domain(e.map(i)), r) : n
        }, r.copy = function() {
            return io(t.copy(), n, e)
        }, $i(r, t)
    }

    function oo(t) {
        return function(n) {
            return 0 > n ? -Math.pow(-n, t) : Math.pow(n, t)
        }
    }

    function ao(t, n) {
        function e(e) {
            return o[((i.get(e) || ("range" === n.t ? i.set(e, t.push(e)) : NaN)) - 1) % o.length]
        }

        function r(n, e) {
            return sa.range(t.length).map(function(t) {
                return n + e * t
            })
        }
        var i, o, a;
        return e.domain = function(r) {
            if (!arguments.length) return t;
            t = [], i = new c;
            for (var o, a = -1, u = r.length; ++a < u;) i.has(o = r[a]) || i.set(o, t.push(o));
            return e[n.t].apply(e, n.a)
        }, e.range = function(t) {
            return arguments.length ? (o = t, a = 0, n = {
                t: "range",
                a: arguments
            }, e) : o
        }, e.rangePoints = function(i, u) {
            arguments.length < 2 && (u = 0);
            var s = i[0],
                c = i[1],
                l = t.length < 2 ? (s = (s + c) / 2, 0) : (c - s) / (t.length - 1 + u);
            return o = r(s + l * u / 2, l), a = 0, n = {
                t: "rangePoints",
                a: arguments
            }, e
        }, e.rangeRoundPoints = function(i, u) {
            arguments.length < 2 && (u = 0);
            var s = i[0],
                c = i[1],
                l = t.length < 2 ? (s = c = Math.round((s + c) / 2), 0) : (c - s) / (t.length - 1 + u) | 0;
            return o = r(s + Math.round(l * u / 2 + (c - s - (t.length - 1 + u) * l) / 2), l), a = 0, n = {
                t: "rangeRoundPoints",
                a: arguments
            }, e
        }, e.rangeBands = function(i, u, s) {
            arguments.length < 2 && (u = 0), arguments.length < 3 && (s = u);
            var c = i[1] < i[0],
                l = i[c - 0],
                f = i[1 - c],
                h = (f - l) / (t.length - u + 2 * s);
            return o = r(l + h * s, h), c && o.reverse(), a = h * (1 - u), n = {
                t: "rangeBands",
                a: arguments
            }, e
        }, e.rangeRoundBands = function(i, u, s) {
            arguments.length < 2 && (u = 0), arguments.length < 3 && (s = u);
            var c = i[1] < i[0],
                l = i[c - 0],
                f = i[1 - c],
                h = Math.floor((f - l) / (t.length - u + 2 * s));
            return o = r(l + Math.round((f - l - (t.length - u) * h) / 2), h), c && o.reverse(), a = Math.round(h * (1 - u)), n = {
                t: "rangeRoundBands",
                a: arguments
            }, e
        }, e.rangeBand = function() {
            return a
        }, e.rangeExtent = function() {
            return Hi(n.a[0])
        }, e.copy = function() {
            return ao(t, n)
        }, e.domain(t)
    }

    function uo(t, n) {
        function o() {
            var e = 0,
                r = n.length;
            for (u = []; ++e < r;) u[e - 1] = sa.quantile(t, e / r);
            return a
        }

        function a(t) {
            return isNaN(t = +t) ? void 0 : n[sa.bisect(u, t)]
        }
        var u;
        return a.domain = function(n) {
            return arguments.length ? (t = n.map(r).filter(i).sort(e), o()) : t
        }, a.range = function(t) {
            return arguments.length ? (n = t, o()) : n
        }, a.quantiles = function() {
            return u
        }, a.invertExtent = function(e) {
            return e = n.indexOf(e), 0 > e ? [NaN, NaN] : [e > 0 ? u[e - 1] : t[0], e < u.length ? u[e] : t[t.length - 1]]
        }, a.copy = function() {
            return uo(t, n)
        }, o()
    }

    function so(t, n, e) {
        function r(n) {
            return e[Math.max(0, Math.min(a, Math.floor(o * (n - t))))]
        }

        function i() {
            return o = e.length / (n - t), a = e.length - 1, r
        }
        var o, a;
        return r.domain = function(e) {
            return arguments.length ? (t = +e[0], n = +e[e.length - 1], i()) : [t, n]
        }, r.range = function(t) {
            return arguments.length ? (e = t, i()) : e
        }, r.invertExtent = function(n) {
            return n = e.indexOf(n), n = 0 > n ? NaN : n / o + t, [n, n + 1 / o]
        }, r.copy = function() {
            return so(t, n, e)
        }, i()
    }

    function co(t, n) {
        function e(e) {
            return e >= e ? n[sa.bisect(t, e)] : void 0
        }
        return e.domain = function(n) {
            return arguments.length ? (t = n, e) : t
        }, e.range = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.invertExtent = function(e) {
            return e = n.indexOf(e), [t[e - 1], t[e]]
        }, e.copy = function() {
            return co(t, n)
        }, e
    }

    function lo(t) {
        function n(t) {
            return +t
        }
        return n.invert = n, n.domain = n.range = function(e) {
            return arguments.length ? (t = e.map(n), n) : t
        }, n.ticks = function(n) {
            return Qi(t, n)
        }, n.tickFormat = function(n, e) {
            return to(t, n, e)
        }, n.copy = function() {
            return lo(t)
        }, n
    }

    function fo() {
        return 0
    }

    function ho(t) {
        return t.innerRadius
    }

    function po(t) {
        return t.outerRadius
    }

    function go(t) {
        return t.startAngle
    }

    function vo(t) {
        return t.endAngle
    }

    function yo(t) {
        return t && t.padAngle
    }

    function mo(t, n, e, r) {
        return (t - e) * n - (n - r) * t > 0 ? 0 : 1
    }

    function bo(t, n, e, r, i) {
        var o = t[0] - n[0],
            a = t[1] - n[1],
            u = (i ? r : -r) / Math.sqrt(o * o + a * a),
            s = u * a,
            c = -u * o,
            l = t[0] + s,
            f = t[1] + c,
            h = n[0] + s,
            p = n[1] + c,
            g = (l + h) / 2,
            d = (f + p) / 2,
            v = h - l,
            y = p - f,
            m = v * v + y * y,
            b = e - r,
            x = l * p - h * f,
            w = (0 > y ? -1 : 1) * Math.sqrt(Math.max(0, b * b * m - x * x)),
            M = (x * y - v * w) / m,
            k = (-x * v - y * w) / m,
            _ = (x * y + v * w) / m,
            S = (-x * v + y * w) / m,
            E = M - g,
            A = k - d,
            N = _ - g,
            C = S - d;
        return E * E + A * A > N * N + C * C && (M = _, k = S), [
            [M - s, k - c],
            [M * e / b, k * e / b]
        ]
    }

    function xo(t) {
        function n(n) {
            function a() {
                c.push("M", o(t(l), u))
            }
            for (var s, c = [], l = [], f = -1, h = n.length, p = Et(e), g = Et(r); ++f < h;) i.call(this, s = n[f], f) ? l.push([+p.call(this, s, f), +g.call(this, s, f)]) : l.length && (a(), l = []);
            return l.length && a(), c.length ? c.join("") : null
        }
        var e = Ce,
            r = Te,
            i = Tn,
            o = wo,
            a = o.key,
            u = .7;
        return n.x = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.y = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.defined = function(t) {
            return arguments.length ? (i = t, n) : i
        }, n.interpolate = function(t) {
            return arguments.length ? (a = "function" == typeof t ? o = t : (o = Os.get(t) || wo).key, n) : a
        }, n.tension = function(t) {
            return arguments.length ? (u = t, n) : u
        }, n
    }

    function wo(t) {
        return t.length > 1 ? t.join("L") : t + "Z"
    }

    function Mo(t) {
        return t.join("L") + "Z"
    }

    function ko(t) {
        for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("H", (r[0] + (r = t[n])[0]) / 2, "V", r[1]);
        return e > 1 && i.push("H", r[0]), i.join("")
    }

    function _o(t) {
        for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("V", (r = t[n])[1], "H", r[0]);
        return i.join("")
    }

    function So(t) {
        for (var n = 0, e = t.length, r = t[0], i = [r[0], ",", r[1]]; ++n < e;) i.push("H", (r = t[n])[0], "V", r[1]);
        return i.join("")
    }

    function Eo(t, n) {
        return t.length < 4 ? wo(t) : t[1] + Co(t.slice(1, -1), To(t, n))
    }

    function Ao(t, n) {
        return t.length < 3 ? Mo(t) : t[0] + Co((t.push(t[0]), t), To([t[t.length - 2]].concat(t, [t[1]]), n))
    }

    function No(t, n) {
        return t.length < 3 ? wo(t) : t[0] + Co(t, To(t, n))
    }

    function Co(t, n) {
        if (n.length < 1 || t.length != n.length && t.length != n.length + 2) return wo(t);
        var e = t.length != n.length,
            r = "",
            i = t[0],
            o = t[1],
            a = n[0],
            u = a,
            s = 1;
        if (e && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], i = t[1], s = 2), n.length > 1) {
            u = n[1], o = t[s], s++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1];
            for (var c = 2; c < n.length; c++, s++) o = t[s], u = n[c], r += "S" + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1]
        }
        if (e) {
            var l = t[s];
            r += "Q" + (o[0] + 2 * u[0] / 3) + "," + (o[1] + 2 * u[1] / 3) + "," + l[0] + "," + l[1]
        }
        return r
    }

    function To(t, n) {
        for (var e, r = [], i = (1 - n) / 2, o = t[0], a = t[1], u = 1, s = t.length; ++u < s;) e = o, o = a, a = t[u], r.push([i * (a[0] - e[0]), i * (a[1] - e[1])]);
        return r
    }

    function jo(t) {
        if (t.length < 3) return wo(t);
        var n = 1,
            e = t.length,
            r = t[0],
            i = r[0],
            o = r[1],
            a = [i, i, i, (r = t[1])[0]],
            u = [o, o, o, r[1]],
            s = [i, ",", o, "L", Ro(Rs, a), ",", Ro(Rs, u)];
        for (t.push(t[e - 1]); ++n <= e;) r = t[n], a.shift(), a.push(r[0]), u.shift(), u.push(r[1]), qo(s, a, u);
        return t.pop(), s.push("L", r), s.join("")
    }

    function Oo(t) {
        if (t.length < 4) return wo(t);
        for (var n, e = [], r = -1, i = t.length, o = [0], a = [0]; ++r < 3;) n = t[r], o.push(n[0]), a.push(n[1]);
        for (e.push(Ro(Rs, o) + "," + Ro(Rs, a)), --r; ++r < i;) n = t[r], o.shift(), o.push(n[0]), a.shift(), a.push(n[1]), qo(e, o, a);
        return e.join("")
    }

    function Po(t) {
        for (var n, e, r = -1, i = t.length, o = i + 4, a = [], u = []; ++r < 4;) e = t[r % i], a.push(e[0]), u.push(e[1]);
        for (n = [Ro(Rs, a), ",", Ro(Rs, u)], --r; ++r < o;) e = t[r % i], a.shift(), a.push(e[0]), u.shift(), u.push(e[1]), qo(n, a, u);
        return n.join("")
    }

    function Lo(t, n) {
        var e = t.length - 1;
        if (e)
            for (var r, i, o = t[0][0], a = t[0][1], u = t[e][0] - o, s = t[e][1] - a, c = -1; ++c <= e;) r = t[c], i = c / e, r[0] = n * r[0] + (1 - n) * (o + i * u), r[1] = n * r[1] + (1 - n) * (a + i * s);
        return jo(t)
    }

    function Ro(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2] + t[3] * n[3]
    }

    function qo(t, n, e) {
        t.push("C", Ro(Ps, n), ",", Ro(Ps, e), ",", Ro(Ls, n), ",", Ro(Ls, e), ",", Ro(Rs, n), ",", Ro(Rs, e))
    }

    function Bo(t, n) {
        return (n[1] - t[1]) / (n[0] - t[0])
    }

    function zo(t) {
        for (var n = 0, e = t.length - 1, r = [], i = t[0], o = t[1], a = r[0] = Bo(i, o); ++n < e;) r[n] = (a + (a = Bo(i = o, o = t[n + 1]))) / 2;
        return r[n] = a, r
    }

    function Do(t) {
        for (var n, e, r, i, o = [], a = zo(t), u = -1, s = t.length - 1; ++u < s;) n = Bo(t[u], t[u + 1]), xa(n) < qa ? a[u] = a[u + 1] = 0 : (e = a[u] / n, r = a[u + 1] / n, i = e * e + r * r, i > 9 && (i = 3 * n / Math.sqrt(i), a[u] = i * e, a[u + 1] = i * r));
        for (u = -1; ++u <= s;) i = (t[Math.min(s, u + 1)][0] - t[Math.max(0, u - 1)][0]) / (6 * (1 + a[u] * a[u])), o.push([i || 0, a[u] * i || 0]);
        return o
    }

    function Uo(t) {
        return t.length < 3 ? wo(t) : t[0] + Co(t, Do(t))
    }

    function Io(t) {
        for (var n, e, r, i = -1, o = t.length; ++i < o;) n = t[i], e = n[0], r = n[1] - Ia, n[0] = e * Math.cos(r), n[1] = e * Math.sin(r);
        return t
    }

    function Fo(t) {
        function n(n) {
            function s() {
                d.push("M", u(t(y), f), l, c(t(v.reverse()), f), "Z")
            }
            for (var h, p, g, d = [], v = [], y = [], m = -1, b = n.length, x = Et(e), w = Et(i), M = e === r ? function() {
                    return p
                } : Et(r), k = i === o ? function() {
                    return g
                } : Et(o); ++m < b;) a.call(this, h = n[m], m) ? (v.push([p = +x.call(this, h, m), g = +w.call(this, h, m)]), y.push([+M.call(this, h, m), +k.call(this, h, m)])) : v.length && (s(), v = [], y = []);
            return v.length && s(), d.length ? d.join("") : null
        }
        var e = Ce,
            r = Ce,
            i = 0,
            o = Te,
            a = Tn,
            u = wo,
            s = u.key,
            c = u,
            l = "L",
            f = .7;
        return n.x = function(t) {
            return arguments.length ? (e = r = t, n) : r
        }, n.x0 = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.x1 = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.y = function(t) {
            return arguments.length ? (i = o = t, n) : o
        }, n.y0 = function(t) {
            return arguments.length ? (i = t, n) : i
        }, n.y1 = function(t) {
            return arguments.length ? (o = t, n) : o
        }, n.defined = function(t) {
            return arguments.length ? (a = t, n) : a
        }, n.interpolate = function(t) {
            return arguments.length ? (s = "function" == typeof t ? u = t : (u = Os.get(t) || wo).key, c = u.reverse || u, l = u.closed ? "M" : "L", n) : s
        }, n.tension = function(t) {
            return arguments.length ? (f = t, n) : f
        }, n
    }

    function Ho(t) {
        return t.radius
    }

    function Vo(t) {
        return [t.x, t.y]
    }

    function Yo(t) {
        return function() {
            var n = t.apply(this, arguments),
                e = n[0],
                r = n[1] - Ia;
            return [e * Math.cos(r), e * Math.sin(r)]
        }
    }

    function Xo() {
        return 64
    }

    function Go() {
        return "circle"
    }

    function Ko(t) {
        var n = Math.sqrt(t / za);
        return "M0," + n + "A" + n + "," + n + " 0 1,1 0," + -n + "A" + n + "," + n + " 0 1,1 0," + n + "Z"
    }

    function Jo(t) {
        return function() {
            var n, e, r;
            (n = this[t]) && (r = n[e = n.active]) && (r.timer.c = null, r.timer.t = NaN, --n.count ? delete n[e] : delete this[t], n.active += .5, r.event && r.event.interrupt.call(this, this.__data__, r.index))
        }
    }

    function $o(t, n, e) {
        return Sa(t, Fs), t.namespace = n, t.id = e, t
    }

    function Zo(t, n, e, r) {
        var i = t.id,
            o = t.namespace;
        return H(t, "function" == typeof e ? function(t, a, u) {
            t[o][i].tween.set(n, r(e.call(t, t.__data__, a, u)))
        } : (e = r(e), function(t) {
            t[o][i].tween.set(n, e)
        }))
    }

    function Wo(t) {
        return null == t && (t = ""),
            function() {
                this.textContent = t
            }
    }

    function Qo(t) {
        return null == t ? "__transition__" : "__transition_" + t + "__"
    }

    function ta(t, n, e, r, i) {
        function o(t) {
            var n = d.delay;
            return l.t = n + s, t >= n ? a(t - n) : void(l.c = a)
        }

        function a(e) {
            var i = g.active,
                o = g[i];
            o && (o.timer.c = null, o.timer.t = NaN, --g.count, delete g[i], o.event && o.event.interrupt.call(t, t.__data__, o.index));
            for (var a in g)
                if (r > +a) {
                    var c = g[a];
                    c.timer.c = null, c.timer.t = NaN, --g.count, delete g[a]
                }
            l.c = u, jt(function() {
                return l.c && u(e || 1) && (l.c = null, l.t = NaN), 1
            }, 0, s), g.active = r, d.event && d.event.start.call(t, t.__data__, n), p = [], d.tween.forEach(function(e, r) {
                (r = r.call(t, t.__data__, n)) && p.push(r)
            }), h = d.ease, f = d.duration
        }

        function u(i) {
            for (var o = i / f, a = h(o), u = p.length; u > 0;) p[--u].call(t, a);
            return o >= 1 ? (d.event && d.event.end.call(t, t.__data__, n), --g.count ? delete g[r] : delete t[e], 1) : void 0
        }
        var s, l, f, h, p, g = t[e] || (t[e] = {
                active: 0,
                count: 0
            }),
            d = g[r];
        d || (s = i.time, l = jt(o, 0, s), d = g[r] = {
            tween: new c,
            time: s,
            timer: l,
            delay: i.delay,
            duration: i.duration,
            ease: i.ease,
            index: n
        }, i = null, ++g.count)
    }

    function na(t, n, e) {
        t.attr("transform", function(t) {
            var r = n(t);
            return "translate(" + (isFinite(r) ? r : e(t)) + ",0)"
        })
    }

    function ea(t, n, e) {
        t.attr("transform", function(t) {
            var r = n(t);
            return "translate(0," + (isFinite(r) ? r : e(t)) + ")"
        })
    }

    function ra(t) {
        return t.toISOString()
    }

    function ia(t, n, e) {
        function r(n) {
            return t(n)
        }

        function i(t, e) {
            var r = t[1] - t[0],
                i = r / e,
                o = sa.bisect(Zs, i);
            return o == Zs.length ? [n.year, Wi(t.map(function(t) {
                return t / 31536e6
            }), e)[2]] : o ? n[i / Zs[o - 1] < Zs[o] / i ? o - 1 : o] : [tc, Wi(t, e)[2]]
        }
        return r.invert = function(n) {
            return oa(t.invert(n))
        }, r.domain = function(n) {
            return arguments.length ? (t.domain(n), r) : t.domain().map(oa)
        }, r.nice = function(t, n) {
            function e(e) {
                return !isNaN(e) && !t.range(e, oa(+e + 1), n).length
            }
            var o = r.domain(),
                a = Hi(o),
                u = null == t ? i(a, 10) : "number" == typeof t && i(a, t);
            return u && (t = u[0], n = u[1]), r.domain(Xi(o, n > 1 ? {
                floor: function(n) {
                    for (; e(n = t.floor(n));) n = oa(n - 1);
                    return n
                },
                ceil: function(n) {
                    for (; e(n = t.ceil(n));) n = oa(+n + 1);
                    return n
                }
            } : t))
        }, r.ticks = function(t, n) {
            var e = Hi(r.domain()),
                o = null == t ? i(e, 10) : "number" == typeof t ? i(e, t) : !t.range && [{
                    range: t
                }, n];
            return o && (t = o[0], n = o[1]), t.range(e[0], oa(+e[1] + 1), 1 > n ? 1 : n)
        }, r.tickFormat = function() {
            return e
        }, r.copy = function() {
            return ia(t.copy(), n, e)
        }, $i(r, t)
    }

    function oa(t) {
        return new Date(t)
    }

    function aa(t) {
        return JSON.parse(t.responseText)
    }

    function ua(t) {
        var n = fa.createRange();
        return n.selectNode(fa.body), n.createContextualFragment(t.responseText)
    }
    var sa = {
            version: "3.5.9"
        },
        ca = [].slice,
        la = function(t) {
            return ca.call(t)
        },
        fa = this.document;
    if (fa) try {
        la(fa.documentElement.childNodes)[0].nodeType
    } catch (ha) {
        la = function(t) {
            for (var n = t.length, e = new Array(n); n--;) e[n] = t[n];
            return e
        }
    }
    if (Date.now || (Date.now = function() {
            return +new Date
        }), fa) try {
        fa.createElement("DIV").style.setProperty("opacity", 0, "")
    } catch (pa) {
        var ga = this.Element.prototype,
            da = ga.setAttribute,
            va = ga.setAttributeNS,
            ya = this.CSSStyleDeclaration.prototype,
            ma = ya.setProperty;
        ga.setAttribute = function(t, n) {
            da.call(this, t, n + "")
        }, ga.setAttributeNS = function(t, n, e) {
            va.call(this, t, n, e + "")
        }, ya.setProperty = function(t, n, e) {
            ma.call(this, t, n + "", e)
        }
    }
    sa.ascending = e, sa.descending = function(t, n) {
        return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN
    }, sa.min = function(t, n) {
        var e, r, i = -1,
            o = t.length;
        if (1 === arguments.length) {
            for (; ++i < o;)
                if (null != (r = t[i]) && r >= r) {
                    e = r;
                    break
                }
            for (; ++i < o;) null != (r = t[i]) && e > r && (e = r)
        } else {
            for (; ++i < o;)
                if (null != (r = n.call(t, t[i], i)) && r >= r) {
                    e = r;
                    break
                }
            for (; ++i < o;) null != (r = n.call(t, t[i], i)) && e > r && (e = r)
        }
        return e
    }, sa.max = function(t, n) {
        var e, r, i = -1,
            o = t.length;
        if (1 === arguments.length) {
            for (; ++i < o;)
                if (null != (r = t[i]) && r >= r) {
                    e = r;
                    break
                }
            for (; ++i < o;) null != (r = t[i]) && r > e && (e = r)
        } else {
            for (; ++i < o;)
                if (null != (r = n.call(t, t[i], i)) && r >= r) {
                    e = r;
                    break
                }
            for (; ++i < o;) null != (r = n.call(t, t[i], i)) && r > e && (e = r)
        }
        return e
    }, sa.extent = function(t, n) {
        var e, r, i, o = -1,
            a = t.length;
        if (1 === arguments.length) {
            for (; ++o < a;)
                if (null != (r = t[o]) && r >= r) {
                    e = i = r;
                    break
                }
            for (; ++o < a;) null != (r = t[o]) && (e > r && (e = r), r > i && (i = r))
        } else {
            for (; ++o < a;)
                if (null != (r = n.call(t, t[o], o)) && r >= r) {
                    e = i = r;
                    break
                }
            for (; ++o < a;) null != (r = n.call(t, t[o], o)) && (e > r && (e = r), r > i && (i = r))
        }
        return [e, i]
    }, sa.sum = function(t, n) {
        var e, r = 0,
            o = t.length,
            a = -1;
        if (1 === arguments.length)
            for (; ++a < o;) i(e = +t[a]) && (r += e);
        else
            for (; ++a < o;) i(e = +n.call(t, t[a], a)) && (r += e);
        return r
    }, sa.mean = function(t, n) {
        var e, o = 0,
            a = t.length,
            u = -1,
            s = a;
        if (1 === arguments.length)
            for (; ++u < a;) i(e = r(t[u])) ? o += e : --s;
        else
            for (; ++u < a;) i(e = r(n.call(t, t[u], u))) ? o += e : --s;
        return s ? o / s : void 0
    }, sa.quantile = function(t, n) {
        var e = (t.length - 1) * n + 1,
            r = Math.floor(e),
            i = +t[r - 1],
            o = e - r;
        return o ? i + o * (t[r] - i) : i
    }, sa.median = function(t, n) {
        var o, a = [],
            u = t.length,
            s = -1;
        if (1 === arguments.length)
            for (; ++s < u;) i(o = r(t[s])) && a.push(o);
        else
            for (; ++s < u;) i(o = r(n.call(t, t[s], s))) && a.push(o);
        return a.length ? sa.quantile(a.sort(e), .5) : void 0
    }, sa.variance = function(t, n) {
        var e, o, a = t.length,
            u = 0,
            s = 0,
            c = -1,
            l = 0;
        if (1 === arguments.length)
            for (; ++c < a;) i(e = r(t[c])) && (o = e - u, u += o / ++l, s += o * (e - u));
        else
            for (; ++c < a;) i(e = r(n.call(t, t[c], c))) && (o = e - u, u += o / ++l, s += o * (e - u));
        return l > 1 ? s / (l - 1) : void 0
    }, sa.deviation = function() {
        var t = sa.variance.apply(this, arguments);
        return t ? Math.sqrt(t) : t
    };
    var ba = o(e);
    sa.bisectLeft = ba.left, sa.bisect = sa.bisectRight = ba.right, sa.bisector = function(t) {
        return o(1 === t.length ? function(n, r) {
            return e(t(n), r)
        } : t)
    }, sa.shuffle = function(t, n, e) {
        (o = arguments.length) < 3 && (e = t.length, 2 > o && (n = 0));
        for (var r, i, o = e - n; o;) i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r;
        return t
    }, sa.permute = function(t, n) {
        for (var e = n.length, r = new Array(e); e--;) r[e] = t[n[e]];
        return r
    }, sa.pairs = function(t) {
        for (var n, e = 0, r = t.length - 1, i = t[0], o = new Array(0 > r ? 0 : r); r > e;) o[e] = [n = i, i = t[++e]];
        return o
    }, sa.zip = function() {
        if (!(r = arguments.length)) return [];
        for (var t = -1, n = sa.min(arguments, a), e = new Array(n); ++t < n;)
            for (var r, i = -1, o = e[t] = new Array(r); ++i < r;) o[i] = arguments[i][t];
        return e
    }, sa.transpose = function(t) {
        return sa.zip.apply(sa, t)
    }, sa.keys = function(t) {
        var n = [];
        for (var e in t) n.push(e);
        return n
    }, sa.values = function(t) {
        var n = [];
        for (var e in t) n.push(t[e]);
        return n
    }, sa.entries = function(t) {
        var n = [];
        for (var e in t) n.push({
            key: e,
            value: t[e]
        });
        return n
    }, sa.merge = function(t) {
        for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i;) a += t[o].length;
        for (e = new Array(a); --i >= 0;)
            for (r = t[i], n = r.length; --n >= 0;) e[--a] = r[n];
        return e
    };
    var xa = Math.abs;
    sa.range = function(t, n, e) {
        if (arguments.length < 3 && (e = 1, arguments.length < 2 && (n = t, t = 0)), (n - t) / e === 1 / 0) throw new Error("infinite range");
        var r, i = [],
            o = u(xa(e)),
            a = -1;
        if (t *= o, n *= o, e *= o, 0 > e)
            for (;
                (r = t + e * ++a) > n;) i.push(r / o);
        else
            for (;
                (r = t + e * ++a) < n;) i.push(r / o);
        return i
    }, sa.map = function(t, n) {
        var e = new c;
        if (t instanceof c) t.forEach(function(t, n) {
            e.set(t, n)
        });
        else if (Array.isArray(t)) {
            var r, i = -1,
                o = t.length;
            if (1 === arguments.length)
                for (; ++i < o;) e.set(i, t[i]);
            else
                for (; ++i < o;) e.set(n.call(t, r = t[i], i), r)
        } else
            for (var a in t) e.set(a, t[a]);
        return e
    };
    var wa = "__proto__",
        Ma = "\x00";
    s(c, {
        has: h,
        get: function(t) {
            return this._[l(t)]
        },
        set: function(t, n) {
            return this._[l(t)] = n
        },
        remove: p,
        keys: g,
        values: function() {
            var t = [];
            for (var n in this._) t.push(this._[n]);
            return t
        },
        entries: function() {
            var t = [];
            for (var n in this._) t.push({
                key: f(n),
                value: this._[n]
            });
            return t
        },
        size: d,
        empty: v,
        forEach: function(t) {
            for (var n in this._) t.call(this, f(n), this._[n])
        }
    }), sa.nest = function() {
        function t(n, a, u) {
            if (u >= o.length) return r ? r.call(i, a) : e ? a.sort(e) : a;
            for (var s, l, f, h, p = -1, g = a.length, d = o[u++], v = new c; ++p < g;)(h = v.get(s = d(l = a[p]))) ? h.push(l) : v.set(s, [l]);
            return n ? (l = n(), f = function(e, r) {
                l.set(e, t(n, r, u))
            }) : (l = {}, f = function(e, r) {
                l[e] = t(n, r, u)
            }), v.forEach(f), l
        }

        function n(t, e) {
            if (e >= o.length) return t;
            var r = [],
                i = a[e++];
            return t.forEach(function(t, i) {
                r.push({
                    key: t,
                    values: n(i, e)
                })
            }), i ? r.sort(function(t, n) {
                return i(t.key, n.key)
            }) : r
        }
        var e, r, i = {},
            o = [],
            a = [];
        return i.map = function(n, e) {
            return t(e, n, 0)
        }, i.entries = function(e) {
            return n(t(sa.map, e, 0), 0)
        }, i.key = function(t) {
            return o.push(t), i
        }, i.sortKeys = function(t) {
            return a[o.length - 1] = t, i
        }, i.sortValues = function(t) {
            return e = t, i
        }, i.rollup = function(t) {
            return r = t, i
        }, i
    }, sa.set = function(t) {
        var n = new y;
        if (t)
            for (var e = 0, r = t.length; r > e; ++e) n.add(t[e]);
        return n
    }, s(y, {
        has: h,
        add: function(t) {
            return this._[l(t += "")] = !0, t
        },
        remove: p,
        values: g,
        size: d,
        empty: v,
        forEach: function(t) {
            for (var n in this._) t.call(this, f(n))
        }
    }), sa.behavior = {}, sa.rebind = function(t, n) {
        for (var e, r = 1, i = arguments.length; ++r < i;) t[e = arguments[r]] = b(t, n, n[e]);
        return t
    };
    var ka = ["webkit", "ms", "moz", "Moz", "o", "O"];
    sa.dispatch = function() {
        for (var t = new M, n = -1, e = arguments.length; ++n < e;) t[arguments[n]] = k(t);
        return t
    }, M.prototype.on = function(t, n) {
        var e = t.indexOf("."),
            r = "";
        if (e >= 0 && (r = t.slice(e + 1), t = t.slice(0, e)), t) return arguments.length < 2 ? this[t].on(r) : this[t].on(r, n);
        if (2 === arguments.length) {
            if (null == n)
                for (t in this) this.hasOwnProperty(t) && this[t].on(r, null);
            return this
        }
    }, sa.event = null, sa.requote = function(t) {
        return t.replace(_a, "\\$&")
    };
    var _a = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
        Sa = {}.__proto__ ? function(t, n) {
            t.__proto__ = n
        } : function(t, n) {
            for (var e in n) t[e] = n[e]
        },
        Ea = function(t, n) {
            return n.querySelector(t)
        },
        Aa = function(t, n) {
            return n.querySelectorAll(t)
        },
        Na = function(t, n) {
            var e = t.matches || t[x(t, "matchesSelector")];
            return (Na = function(t, n) {
                return e.call(t, n)
            })(t, n)
        };
    "function" == typeof Sizzle && (Ea = function(t, n) {
        return Sizzle(t, n)[0] || null
    }, Aa = Sizzle, Na = Sizzle.matchesSelector), sa.selection = function() {
        return sa.select(fa.documentElement)
    };
    var Ca = sa.selection.prototype = [];
    Ca.select = function(t) {
        var n, e, r, i, o = [];
        t = N(t);
        for (var a = -1, u = this.length; ++a < u;) {
            o.push(n = []), n.parentNode = (r = this[a]).parentNode;
            for (var s = -1, c = r.length; ++s < c;)(i = r[s]) ? (n.push(e = t.call(i, i.__data__, s, a)), e && "__data__" in i && (e.__data__ = i.__data__)) : n.push(null)
        }
        return A(o)
    }, Ca.selectAll = function(t) {
        var n, e, r = [];
        t = C(t);
        for (var i = -1, o = this.length; ++i < o;)
            for (var a = this[i], u = -1, s = a.length; ++u < s;)(e = a[u]) && (r.push(n = la(t.call(e, e.__data__, u, i))), n.parentNode = e);
        return A(r)
    };
    var Ta = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    sa.ns = {
        prefix: Ta,
        qualify: function(t) {
            var n = t.indexOf(":"),
                e = t;
            return n >= 0 && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)), Ta.hasOwnProperty(e) ? {
                space: Ta[e],
                local: t
            } : t
        }
    }, Ca.attr = function(t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var e = this.node();
                return t = sa.ns.qualify(t), t.local ? e.getAttributeNS(t.space, t.local) : e.getAttribute(t)
            }
            for (n in t) this.each(T(n, t[n]));
            return this
        }
        return this.each(T(t, n))
    }, Ca.classed = function(t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var e = this.node(),
                    r = (t = P(t)).length,
                    i = -1;
                if (n = e.classList) {
                    for (; ++i < r;)
                        if (!n.contains(t[i])) return !1
                } else
                    for (n = e.getAttribute("class"); ++i < r;)
                        if (!O(t[i]).test(n)) return !1; return !0
            }
            for (n in t) this.each(L(n, t[n]));
            return this
        }
        return this.each(L(t, n))
    }, Ca.style = function(t, e, r) {
        var i = arguments.length;
        if (3 > i) {
            if ("string" != typeof t) {
                2 > i && (e = "");
                for (r in t) this.each(q(r, t[r], e));
                return this
            }
            if (2 > i) {
                var o = this.node();
                return n(o).getComputedStyle(o, null).getPropertyValue(t)
            }
            r = ""
        }
        return this.each(q(t, e, r))
    }, Ca.property = function(t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) return this.node()[t];
            for (n in t) this.each(B(n, t[n]));
            return this
        }
        return this.each(B(t, n))
    }, Ca.text = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var n = t.apply(this, arguments);
            this.textContent = null == n ? "" : n
        } : null == t ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = t
        }) : this.node().textContent
    }, Ca.html = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var n = t.apply(this, arguments);
            this.innerHTML = null == n ? "" : n
        } : null == t ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = t
        }) : this.node().innerHTML
    }, Ca.append = function(t) {
        return t = z(t), this.select(function() {
            return this.appendChild(t.apply(this, arguments))
        })
    }, Ca.insert = function(t, n) {
        return t = z(t), n = N(n), this.select(function() {
            return this.insertBefore(t.apply(this, arguments), n.apply(this, arguments) || null)
        })
    }, Ca.remove = function() {
        return this.each(D)
    }, Ca.data = function(t, n) {
        function e(t, e) {
            var r, i, o, a = t.length,
                f = e.length,
                h = Math.min(a, f),
                p = new Array(f),
                g = new Array(f),
                d = new Array(a);
            if (n) {
                var v, y = new c,
                    m = new Array(a);
                for (r = -1; ++r < a;)(i = t[r]) && (y.has(v = n.call(i, i.__data__, r)) ? d[r] = i : y.set(v, i), m[r] = v);
                for (r = -1; ++r < f;)(i = y.get(v = n.call(e, o = e[r], r))) ? i !== !0 && (p[r] = i, i.__data__ = o) : g[r] = U(o), y.set(v, !0);
                for (r = -1; ++r < a;) r in m && y.get(m[r]) !== !0 && (d[r] = t[r])
            } else {
                for (r = -1; ++r < h;) i = t[r], o = e[r], i ? (i.__data__ = o, p[r] = i) : g[r] = U(o);
                for (; f > r; ++r) g[r] = U(e[r]);
                for (; a > r; ++r) d[r] = t[r]
            }
            g.update = p, g.parentNode = p.parentNode = d.parentNode = t.parentNode, u.push(g), s.push(p), l.push(d)
        }
        var r, i, o = -1,
            a = this.length;
        if (!arguments.length) {
            for (t = new Array(a = (r = this[0]).length); ++o < a;)(i = r[o]) && (t[o] = i.__data__);
            return t
        }
        var u = V([]),
            s = A([]),
            l = A([]);
        if ("function" == typeof t)
            for (; ++o < a;) e(r = this[o], t.call(r, r.parentNode.__data__, o));
        else
            for (; ++o < a;) e(r = this[o], t);
        return s.enter = function() {
            return u
        }, s.exit = function() {
            return l
        }, s
    }, Ca.datum = function(t) {
        return arguments.length ? this.property("__data__", t) : this.property("__data__")
    }, Ca.filter = function(t) {
        var n, e, r, i = [];
        "function" != typeof t && (t = I(t));
        for (var o = 0, a = this.length; a > o; o++) {
            i.push(n = []), n.parentNode = (e = this[o]).parentNode;
            for (var u = 0, s = e.length; s > u; u++)(r = e[u]) && t.call(r, r.__data__, u, o) && n.push(r)
        }
        return A(i)
    }, Ca.order = function() {
        for (var t = -1, n = this.length; ++t < n;)
            for (var e, r = this[t], i = r.length - 1, o = r[i]; --i >= 0;)(e = r[i]) && (o && o !== e.nextSibling && o.parentNode.insertBefore(e, o), o = e);
        return this
    }, Ca.sort = function(t) {
        t = F.apply(this, arguments);
        for (var n = -1, e = this.length; ++n < e;) this[n].sort(t);
        return this.order()
    }, Ca.each = function(t) {
        return H(this, function(n, e, r) {
            t.call(n, n.__data__, e, r)
        })
    }, Ca.call = function(t) {
        var n = la(arguments);
        return t.apply(n[0] = this, n), this
    }, Ca.empty = function() {
        return !this.node()
    }, Ca.node = function() {
        for (var t = 0, n = this.length; n > t; t++)
            for (var e = this[t], r = 0, i = e.length; i > r; r++) {
                var o = e[r];
                if (o) return o
            }
        return null
    }, Ca.size = function() {
        var t = 0;
        return H(this, function() {
            ++t
        }), t
    };
    var ja = [];
    sa.selection.enter = V, sa.selection.enter.prototype = ja, ja.append = Ca.append, ja.empty = Ca.empty, ja.node = Ca.node, ja.call = Ca.call, ja.size = Ca.size, ja.select = function(t) {
        for (var n, e, r, i, o, a = [], u = -1, s = this.length; ++u < s;) {
            r = (i = this[u]).update, a.push(n = []), n.parentNode = i.parentNode;
            for (var c = -1, l = i.length; ++c < l;)(o = i[c]) ? (n.push(r[c] = e = t.call(i.parentNode, o.__data__, c, u)), e.__data__ = o.__data__) : n.push(null)
        }
        return A(a)
    }, ja.insert = function(t, n) {
        return arguments.length < 2 && (n = Y(this)), Ca.insert.call(this, t, n)
    }, sa.select = function(n) {
        var e;
        return "string" == typeof n ? (e = [Ea(n, fa)], e.parentNode = fa.documentElement) : (e = [n], e.parentNode = t(n)), A([e])
    }, sa.selectAll = function(t) {
        var n;
        return "string" == typeof t ? (n = la(Aa(t, fa)), n.parentNode = fa.documentElement) : (n = la(t), n.parentNode = null), A([n])
    }, Ca.on = function(t, n, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (n = !1);
                for (e in t) this.each(X(e, t[e], n));
                return this
            }
            if (2 > r) return (r = this.node()["__on" + t]) && r._;
            e = !1
        }
        return this.each(X(t, n, e))
    };
    var Oa = sa.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    fa && Oa.forEach(function(t) {
        "on" + t in fa && Oa.remove(t)
    });
    var Pa, La = 0;
    sa.mouse = function(t) {
        return $(t, S())
    };
    var Ra = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    sa.touch = function(t, n, e) {
        if (arguments.length < 3 && (e = n, n = S().changedTouches), n)
            for (var r, i = 0, o = n.length; o > i; ++i)
                if ((r = n[i]).identifier === e) return $(t, r)
    }, sa.behavior.drag = function() {
        function t() {
            this.on("mousedown.drag", o).on("touchstart.drag", a)
        }

        function e(t, n, e, o, a) {
            return function() {
                function u() {
                    var t, e, r = n(h, d);
                    r && (t = r[0] - b[0], e = r[1] - b[1], g |= t | e, b = r, p({
                        type: "drag",
                        x: r[0] + c[0],
                        y: r[1] + c[1],
                        dx: t,
                        dy: e
                    }))
                }

                function s() {
                    n(h, d) && (y.on(o + v, null).on(a + v, null), m(g), p({
                        type: "dragend"
                    }))
                }
                var c, l = this,
                    f = sa.event.target,
                    h = l.parentNode,
                    p = r.of(l, arguments),
                    g = 0,
                    d = t(),
                    v = ".drag" + (null == d ? "" : "-" + d),
                    y = sa.select(e(f)).on(o + v, u).on(a + v, s),
                    m = J(f),
                    b = n(h, d);
                i ? (c = i.apply(l, arguments), c = [c.x - b[0], c.y - b[1]]) : c = [0, 0], p({
                    type: "dragstart"
                })
            }
        }
        var r = E(t, "drag", "dragstart", "dragend"),
            i = null,
            o = e(w, sa.mouse, n, "mousemove", "mouseup"),
            a = e(Z, sa.touch, m, "touchmove", "touchend");
        return t.origin = function(n) {
            return arguments.length ? (i = n, t) : i
        }, sa.rebind(t, r, "on")
    }, sa.touches = function(t, n) {
        return arguments.length < 2 && (n = S().touches), n ? la(n).map(function(n) {
            var e = $(t, n);
            return e.identifier = n.identifier, e
        }) : []
    };
    var qa = 1e-6,
        Ba = qa * qa,
        za = Math.PI,
        Da = 2 * za,
        Ua = Da - qa,
        Ia = za / 2,
        Fa = za / 180,
        Ha = 180 / za,
        Va = Math.SQRT2,
        Ya = 2,
        Xa = 4;
    sa.interpolateZoom = function(t, n) {
        var e, r, i = t[0],
            o = t[1],
            a = t[2],
            u = n[0],
            s = n[1],
            c = n[2],
            l = u - i,
            f = s - o,
            h = l * l + f * f;
        if (Ba > h) r = Math.log(c / a) / Va, e = function(t) {
            return [i + t * l, o + t * f, a * Math.exp(Va * t * r)]
        };
        else {
            var p = Math.sqrt(h),
                g = (c * c - a * a + Xa * h) / (2 * a * Ya * p),
                d = (c * c - a * a - Xa * h) / (2 * c * Ya * p),
                v = Math.log(Math.sqrt(g * g + 1) - g),
                y = Math.log(Math.sqrt(d * d + 1) - d);
            r = (y - v) / Va, e = function(t) {
                var n = t * r,
                    e = rt(v),
                    u = a / (Ya * p) * (e * it(Va * n + v) - et(v));
                return [i + u * l, o + u * f, a * e / rt(Va * n + v)]
            }
        }
        return e.duration = 1e3 * r, e
    }, sa.behavior.zoom = function() {
        function t(t) {
            t.on(j, f).on(Ka + ".zoom", p).on("dblclick.zoom", g).on(L, h)
        }

        function e(t) {
            return [(t[0] - S.x) / S.k, (t[1] - S.y) / S.k]
        }

        function r(t) {
            return [t[0] * S.k + S.x, t[1] * S.k + S.y]
        }

        function i(t) {
            S.k = Math.max(N[0], Math.min(N[1], t))
        }

        function o(t, n) {
            n = r(n), S.x += t[0] - n[0], S.y += t[1] - n[1]
        }

        function a(n, e, r, a) {
            n.__chart__ = {
                x: S.x,
                y: S.y,
                k: S.k
            }, i(Math.pow(2, a)), o(v = e, r), n = sa.select(n), C > 0 && (n = n.transition().duration(C)), n.call(t.event)
        }

        function u() {
            w && w.domain(x.range().map(function(t) {
                return (t - S.x) / S.k
            }).map(x.invert)), k && k.domain(M.range().map(function(t) {
                return (t - S.y) / S.k
            }).map(M.invert))
        }

        function s(t) {
            T++ || t({
                type: "zoomstart"
            })
        }

        function c(t) {
            u(), t({
                type: "zoom",
                scale: S.k,
                translate: [S.x, S.y]
            })
        }

        function l(t) {
            --T || (t({
                type: "zoomend"
            }), v = null)
        }

        function f() {
            function t() {
                u = 1, o(sa.mouse(i), h), c(a)
            }

            function r() {
                f.on(O, null).on(P, null), p(u), l(a)
            }
            var i = this,
                a = R.of(i, arguments),
                u = 0,
                f = sa.select(n(i)).on(O, t).on(P, r),
                h = e(sa.mouse(i)),
                p = J(i);
            Is.call(i), s(a)
        }

        function h() {
            function t() {
                var t = sa.touches(g);
                return p = S.k, t.forEach(function(t) {
                    t.identifier in v && (v[t.identifier] = e(t))
                }), t
            }

            function n() {
                var n = sa.event.target;
                sa.select(n).on(x, r).on(w, u), M.push(n);
                for (var e = sa.event.changedTouches, i = 0, o = e.length; o > i; ++i) v[e[i].identifier] = null;
                var s = t(),
                    c = Date.now();
                if (1 === s.length) {
                    if (500 > c - b) {
                        var l = s[0];
                        a(g, l, v[l.identifier], Math.floor(Math.log(S.k) / Math.LN2) + 1), _()
                    }
                    b = c
                } else if (s.length > 1) {
                    var l = s[0],
                        f = s[1],
                        h = l[0] - f[0],
                        p = l[1] - f[1];
                    y = h * h + p * p
                }
            }

            function r() {
                var t, n, e, r, a = sa.touches(g);
                Is.call(g);
                for (var u = 0, s = a.length; s > u; ++u, r = null)
                    if (e = a[u], r = v[e.identifier]) {
                        if (n) break;
                        t = e, n = r
                    }
                if (r) {
                    var l = (l = e[0] - t[0]) * l + (l = e[1] - t[1]) * l,
                        f = y && Math.sqrt(l / y);
                    t = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], n = [(n[0] + r[0]) / 2, (n[1] + r[1]) / 2], i(f * p)
                }
                b = null, o(t, n), c(d)
            }

            function u() {
                if (sa.event.touches.length) {
                    for (var n = sa.event.changedTouches, e = 0, r = n.length; r > e; ++e) delete v[n[e].identifier];
                    for (var i in v) return void t()
                }
                sa.selectAll(M).on(m, null), k.on(j, f).on(L, h), E(), l(d)
            }
            var p, g = this,
                d = R.of(g, arguments),
                v = {},
                y = 0,
                m = ".zoom-" + sa.event.changedTouches[0].identifier,
                x = "touchmove" + m,
                w = "touchend" + m,
                M = [],
                k = sa.select(g),
                E = J(g);
            n(), s(d), k.on(j, null).on(L, n)
        }

        function p() {
            var t = R.of(this, arguments);
            m ? clearTimeout(m) : (Is.call(this), d = e(v = y || sa.mouse(this)), s(t)), m = setTimeout(function() {
                m = null, l(t)
            }, 50), _(), i(Math.pow(2, .002 * Ga()) * S.k), o(v, d), c(t)
        }

        function g() {
            var t = sa.mouse(this),
                n = Math.log(S.k) / Math.LN2;
            a(this, t, e(t), sa.event.shiftKey ? Math.ceil(n) - 1 : Math.floor(n) + 1)
        }
        var d, v, y, m, b, x, w, M, k, S = {
                x: 0,
                y: 0,
                k: 1
            },
            A = [960, 500],
            N = Ja,
            C = 250,
            T = 0,
            j = "mousedown.zoom",
            O = "mousemove.zoom",
            P = "mouseup.zoom",
            L = "touchstart.zoom",
            R = E(t, "zoomstart", "zoom", "zoomend");
        return Ka || (Ka = "onwheel" in fa ? (Ga = function() {
            return -sa.event.deltaY * (sa.event.deltaMode ? 120 : 1)
        }, "wheel") : "onmousewheel" in fa ? (Ga = function() {
            return sa.event.wheelDelta
        }, "mousewheel") : (Ga = function() {
            return -sa.event.detail
        }, "MozMousePixelScroll")), t.event = function(t) {
            t.each(function() {
                var t = R.of(this, arguments),
                    n = S;
                Ds ? sa.select(this).transition().each("start.zoom", function() {
                    S = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, s(t)
                }).tween("zoom:zoom", function() {
                    var e = A[0],
                        r = A[1],
                        i = v ? v[0] : e / 2,
                        o = v ? v[1] : r / 2,
                        a = sa.interpolateZoom([(i - S.x) / S.k, (o - S.y) / S.k, e / S.k], [(i - n.x) / n.k, (o - n.y) / n.k, e / n.k]);
                    return function(n) {
                        var r = a(n),
                            u = e / r[2];
                        this.__chart__ = S = {
                            x: i - r[0] * u,
                            y: o - r[1] * u,
                            k: u
                        }, c(t)
                    }
                }).each("interrupt.zoom", function() {
                    l(t)
                }).each("end.zoom", function() {
                    l(t)
                }) : (this.__chart__ = S, s(t), c(t), l(t))
            })
        }, t.translate = function(n) {
            return arguments.length ? (S = {
                x: +n[0],
                y: +n[1],
                k: S.k
            }, u(), t) : [S.x, S.y]
        }, t.scale = function(n) {
            return arguments.length ? (S = {
                x: S.x,
                y: S.y,
                k: null
            }, i(+n), u(), t) : S.k
        }, t.scaleExtent = function(n) {
            return arguments.length ? (N = null == n ? Ja : [+n[0], +n[1]], t) : N
        }, t.center = function(n) {
            return arguments.length ? (y = n && [+n[0], +n[1]], t) : y
        }, t.size = function(n) {
            return arguments.length ? (A = n && [+n[0], +n[1]], t) : A
        }, t.duration = function(n) {
            return arguments.length ? (C = +n, t) : C
        }, t.x = function(n) {
            return arguments.length ? (w = n, x = n.copy(), S = {
                x: 0,
                y: 0,
                k: 1
            }, t) : w
        }, t.y = function(n) {
            return arguments.length ? (k = n, M = n.copy(), S = {
                x: 0,
                y: 0,
                k: 1
            }, t) : k
        }, sa.rebind(t, R, "on")
    };
    var Ga, Ka, Ja = [0, 1 / 0];
    sa.color = at, at.prototype.toString = function() {
        return this.rgb() + ""
    }, sa.hsl = ut;
    var $a = ut.prototype = new at;
    $a.brighter = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), new ut(this.h, this.s, this.l / t)
    }, $a.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), new ut(this.h, this.s, t * this.l)
    }, $a.rgb = function() {
        return st(this.h, this.s, this.l)
    }, sa.hcl = ct;
    var Za = ct.prototype = new at;
    Za.brighter = function(t) {
        return new ct(this.h, this.c, Math.min(100, this.l + Wa * (arguments.length ? t : 1)))
    }, Za.darker = function(t) {
        return new ct(this.h, this.c, Math.max(0, this.l - Wa * (arguments.length ? t : 1)))
    }, Za.rgb = function() {
        return lt(this.h, this.c, this.l).rgb()
    }, sa.lab = ft;
    var Wa = 18,
        Qa = .95047,
        tu = 1,
        nu = 1.08883,
        eu = ft.prototype = new at;
    eu.brighter = function(t) {
        return new ft(Math.min(100, this.l + Wa * (arguments.length ? t : 1)), this.a, this.b)
    }, eu.darker = function(t) {
        return new ft(Math.max(0, this.l - Wa * (arguments.length ? t : 1)), this.a, this.b)
    }, eu.rgb = function() {
        return ht(this.l, this.a, this.b)
    }, sa.rgb = yt;
    var ru = yt.prototype = new at;
    ru.brighter = function(t) {
        t = Math.pow(.7, arguments.length ? t : 1);
        var n = this.r,
            e = this.g,
            r = this.b,
            i = 30;
        return n || e || r ? (n && i > n && (n = i), e && i > e && (e = i), r && i > r && (r = i), new yt(Math.min(255, n / t), Math.min(255, e / t), Math.min(255, r / t))) : new yt(i, i, i)
    }, ru.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), new yt(t * this.r, t * this.g, t * this.b)
    }, ru.hsl = function() {
        return Mt(this.r, this.g, this.b)
    }, ru.toString = function() {
        return "#" + xt(this.r) + xt(this.g) + xt(this.b)
    };
    var iu = sa.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    iu.forEach(function(t, n) {
        iu.set(t, mt(n))
    }), sa.functor = Et, sa.xhr = At(m), sa.dsv = function(t, n) {
        function e(t, e, o) {
            arguments.length < 3 && (o = e, e = null);
            var a = Nt(t, n, null == e ? r : i(e), o);
            return a.row = function(t) {
                return arguments.length ? a.response(null == (e = t) ? r : i(t)) : e
            }, a
        }

        function r(t) {
            return e.parse(t.responseText)
        }

        function i(t) {
            return function(n) {
                return e.parse(n.responseText, t)
            }
        }

        function o(n) {
            return n.map(a).join(t)
        }

        function a(t) {
            return u.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
        }
        var u = new RegExp('["' + t + "\n]"),
            s = t.charCodeAt(0);
        return e.parse = function(t, n) {
            var r;
            return e.parseRows(t, function(t, e) {
                if (r) return r(t, e - 1);
                var i = new Function("d", "return {" + t.map(function(t, n) {
                    return JSON.stringify(t) + ": d[" + n + "]"
                }).join(",") + "}");
                r = n ? function(t, e) {
                    return n(i(t), e)
                } : i
            })
        }, e.parseRows = function(t, n) {
            function e() {
                if (l >= c) return a;
                if (i) return i = !1, o;
                var n = l;
                if (34 === t.charCodeAt(n)) {
                    for (var e = n; e++ < c;)
                        if (34 === t.charCodeAt(e)) {
                            if (34 !== t.charCodeAt(e + 1)) break;
                            ++e
                        }
                    l = e + 2;
                    var r = t.charCodeAt(e + 1);
                    return 13 === r ? (i = !0, 10 === t.charCodeAt(e + 2) && ++l) : 10 === r && (i = !0), t.slice(n + 1, e).replace(/""/g, '"')
                }
                for (; c > l;) {
                    var r = t.charCodeAt(l++),
                        u = 1;
                    if (10 === r) i = !0;
                    else if (13 === r) i = !0, 10 === t.charCodeAt(l) && (++l, ++u);
                    else if (r !== s) continue;
                    return t.slice(n, l - u)
                }
                return t.slice(n)
            }
            for (var r, i, o = {}, a = {}, u = [], c = t.length, l = 0, f = 0;
                (r = e()) !== a;) {
                for (var h = []; r !== o && r !== a;) h.push(r), r = e();
                n && null == (h = n(h, f++)) || u.push(h)
            }
            return u
        }, e.format = function(n) {
            if (Array.isArray(n[0])) return e.formatRows(n);
            var r = new y,
                i = [];
            return n.forEach(function(t) {
                for (var n in t) r.has(n) || i.push(r.add(n))
            }), [i.map(a).join(t)].concat(n.map(function(n) {
                return i.map(function(t) {
                    return a(n[t])
                }).join(t)
            })).join("\n")
        }, e.formatRows = function(t) {
            return t.map(o).join("\n")
        }, e
    }, sa.csv = sa.dsv(",", "text/csv"), sa.tsv = sa.dsv("	", "text/tab-separated-values");
    var ou, au, uu, su, cu = this[x(this, "requestAnimationFrame")] || function(t) {
        setTimeout(t, 17)
    };
    sa.timer = function() {
        jt.apply(this, arguments)
    }, sa.timer.flush = function() {
        Pt(), Lt()
    }, sa.round = function(t, n) {
        return n ? Math.round(t * (n = Math.pow(10, n))) / n : Math.round(t)
    };
    var lu = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(qt);
    sa.formatPrefix = function(t, n) {
        var e = 0;
        return (t = +t) && (0 > t && (t *= -1), n && (t = sa.round(t, Rt(t, n))), e = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), lu[8 + e / 3]
    };
    var fu = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
        hu = sa.map({
            b: function(t) {
                return t.toString(2)
            },
            c: function(t) {
                return String.fromCharCode(t)
            },
            o: function(t) {
                return t.toString(8)
            },
            x: function(t) {
                return t.toString(16)
            },
            X: function(t) {
                return t.toString(16).toUpperCase()
            },
            g: function(t, n) {
                return t.toPrecision(n)
            },
            e: function(t, n) {
                return t.toExponential(n)
            },
            f: function(t, n) {
                return t.toFixed(n)
            },
            r: function(t, n) {
                return (t = sa.round(t, Rt(t, n))).toFixed(Math.max(0, Math.min(20, Rt(t * (1 + 1e-15), n))))
            }
        }),
        pu = sa.time = {},
        gu = Date;
    Dt.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            du.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            du.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            du.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            du.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            du.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            du.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            du.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            du.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            du.setTime.apply(this._, arguments)
        }
    };
    var du = Date.prototype;
    pu.year = Ut(function(t) {
        return t = pu.day(t), t.setMonth(0, 1), t
    }, function(t, n) {
        t.setFullYear(t.getFullYear() + n)
    }, function(t) {
        return t.getFullYear()
    }), pu.years = pu.year.range, pu.years.utc = pu.year.utc.range, pu.day = Ut(function(t) {
        var n = new gu(2e3, 0);
        return n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), n
    }, function(t, n) {
        t.setDate(t.getDate() + n)
    }, function(t) {
        return t.getDate() - 1
    }), pu.days = pu.day.range, pu.days.utc = pu.day.utc.range, pu.dayOfYear = function(t) {
        var n = pu.year(t);
        return Math.floor((t - n - 6e4 * (t.getTimezoneOffset() - n.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, n) {
        n = 7 - n;
        var e = pu[t] = Ut(function(t) {
            return (t = pu.day(t)).setDate(t.getDate() - (t.getDay() + n) % 7), t
        }, function(t, n) {
            t.setDate(t.getDate() + 7 * Math.floor(n))
        }, function(t) {
            var e = pu.year(t).getDay();
            return Math.floor((pu.dayOfYear(t) + (e + n) % 7) / 7) - (e !== n)
        });
        pu[t + "s"] = e.range, pu[t + "s"].utc = e.utc.range, pu[t + "OfYear"] = function(t) {
            var e = pu.year(t).getDay();
            return Math.floor((pu.dayOfYear(t) + (e + n) % 7) / 7)
        }
    }), pu.week = pu.sunday, pu.weeks = pu.sunday.range, pu.weeks.utc = pu.sunday.utc.range, pu.weekOfYear = pu.sundayOfYear;
    var vu = {
            "-": "",
            _: " ",
            0: "0"
        },
        yu = /^\s*\d+/,
        mu = /^%/;
    sa.locale = function(t) {
        return {
            numberFormat: Bt(t),
            timeFormat: Ft(t)
        }
    };
    var bu = sa.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    sa.format = bu.numberFormat, sa.geo = {}, ln.prototype = {
        s: 0,
        t: 0,
        add: function(t) {
            fn(t, this.t, xu), fn(xu.s, this.s, this), this.s ? this.t += xu.t : this.s = xu.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var xu = new ln;
    sa.geo.stream = function(t, n) {
        t && wu.hasOwnProperty(t.type) ? wu[t.type](t, n) : hn(t, n)
    };
    var wu = {
            Feature: function(t, n) {
                hn(t.geometry, n)
            },
            FeatureCollection: function(t, n) {
                for (var e = t.features, r = -1, i = e.length; ++r < i;) hn(e[r].geometry, n)
            }
        },
        Mu = {
            Sphere: function(t, n) {
                n.sphere()
            },
            Point: function(t, n) {
                t = t.coordinates, n.point(t[0], t[1], t[2])
            },
            MultiPoint: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
            },
            LineString: function(t, n) {
                pn(t.coordinates, n, 0)
            },
            MultiLineString: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) pn(e[r], n, 0)
            },
            Polygon: function(t, n) {
                gn(t.coordinates, n)
            },
            MultiPolygon: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) gn(e[r], n)
            },
            GeometryCollection: function(t, n) {
                for (var e = t.geometries, r = -1, i = e.length; ++r < i;) hn(e[r], n)
            }
        };
    sa.geo.area = function(t) {
        return ku = 0, sa.geo.stream(t, Su), ku
    };
    var ku, _u = new ln,
        Su = {
            sphere: function() {
                ku += 4 * za
            },
            point: w,
            lineStart: w,
            lineEnd: w,
            polygonStart: function() {
                _u.reset(), Su.lineStart = dn
            },
            polygonEnd: function() {
                var t = 2 * _u;
                ku += 0 > t ? 4 * za + t : t, Su.lineStart = Su.lineEnd = Su.point = w
            }
        };
    sa.geo.bounds = function() {
        function t(t, n) {
            b.push(x = [l = t, h = t]), f > n && (f = n), n > p && (p = n)
        }

        function n(n, e) {
            var r = vn([n * Fa, e * Fa]);
            if (y) {
                var i = mn(y, r),
                    o = [i[1], -i[0], 0],
                    a = mn(o, i);
                wn(a), a = Mn(a);
                var s = n - g,
                    c = s > 0 ? 1 : -1,
                    d = a[0] * Ha * c,
                    v = xa(s) > 180;
                if (v ^ (d > c * g && c * n > d)) {
                    var m = a[1] * Ha;
                    m > p && (p = m)
                } else if (d = (d + 360) % 360 - 180, v ^ (d > c * g && c * n > d)) {
                    var m = -a[1] * Ha;
                    f > m && (f = m)
                } else f > e && (f = e), e > p && (p = e);
                v ? g > n ? u(l, n) > u(l, h) && (h = n) : u(n, h) > u(l, h) && (l = n) : h >= l ? (l > n && (l = n), n > h && (h = n)) : n > g ? u(l, n) > u(l, h) && (h = n) : u(n, h) > u(l, h) && (l = n)
            } else t(n, e);
            y = r, g = n
        }

        function e() {
            w.point = n
        }

        function r() {
            x[0] = l, x[1] = h, w.point = t, y = null
        }

        function i(t, e) {
            if (y) {
                var r = t - g;
                m += xa(r) > 180 ? r + (r > 0 ? 360 : -360) : r
            } else d = t, v = e;
            Su.point(t, e), n(t, e)
        }

        function o() {
            Su.lineStart()
        }

        function a() {
            i(d, v), Su.lineEnd(), xa(m) > qa && (l = -(h = 180)), x[0] = l, x[1] = h, y = null
        }

        function u(t, n) {
            return (n -= t) < 0 ? n + 360 : n
        }

        function s(t, n) {
            return t[0] - n[0]
        }

        function c(t, n) {
            return n[0] <= n[1] ? n[0] <= t && t <= n[1] : t < n[0] || n[1] < t
        }
        var l, f, h, p, g, d, v, y, m, b, x, w = {
            point: t,
            lineStart: e,
            lineEnd: r,
            polygonStart: function() {
                w.point = i, w.lineStart = o, w.lineEnd = a, m = 0, Su.polygonStart()
            },
            polygonEnd: function() {
                Su.polygonEnd(), w.point = t, w.lineStart = e, w.lineEnd = r, 0 > _u ? (l = -(h = 180), f = -(p = 90)) : m > qa ? p = 90 : -qa > m && (f = -90), x[0] = l, x[1] = h
            }
        };
        return function(t) {
            p = h = -(l = f = 1 / 0), b = [], sa.geo.stream(t, w);
            var n = b.length;
            if (n) {
                b.sort(s);
                for (var e, r = 1, i = b[0], o = [i]; n > r; ++r) e = b[r], c(e[0], i) || c(e[1], i) ? (u(i[0], e[1]) > u(i[0], i[1]) && (i[1] = e[1]), u(e[0], i[1]) > u(i[0], i[1]) && (i[0] = e[0])) : o.push(i = e);
                for (var a, e, g = -(1 / 0), n = o.length - 1, r = 0, i = o[n]; n >= r; i = e, ++r) e = o[r], (a = u(i[1], e[0])) > g && (g = a, l = e[0], h = i[1])
            }
            return b = x = null, l === 1 / 0 || f === 1 / 0 ? [
                [NaN, NaN],
                [NaN, NaN]
            ] : [
                [l, f],
                [h, p]
            ]
        }
    }(), sa.geo.centroid = function(t) {
        Eu = Au = Nu = Cu = Tu = ju = Ou = Pu = Lu = Ru = qu = 0, sa.geo.stream(t, Bu);
        var n = Lu,
            e = Ru,
            r = qu,
            i = n * n + e * e + r * r;
        return Ba > i && (n = ju, e = Ou, r = Pu, qa > Au && (n = Nu, e = Cu, r = Tu), i = n * n + e * e + r * r, Ba > i) ? [NaN, NaN] : [Math.atan2(e, n) * Ha, nt(r / Math.sqrt(i)) * Ha]
    };
    var Eu, Au, Nu, Cu, Tu, ju, Ou, Pu, Lu, Ru, qu, Bu = {
            sphere: w,
            point: _n,
            lineStart: En,
            lineEnd: An,
            polygonStart: function() {
                Bu.lineStart = Nn
            },
            polygonEnd: function() {
                Bu.lineStart = En
            }
        },
        zu = Ln(Tn, zn, Un, [-za, -za / 2]),
        Du = 1e9;
    sa.geo.clipExtent = function() {
        var t, n, e, r, i, o, a = {
            stream: function(t) {
                return i && (i.valid = !1), i = o(t), i.valid = !0, i
            },
            extent: function(u) {
                return arguments.length ? (o = Vn(t = +u[0][0], n = +u[0][1], e = +u[1][0], r = +u[1][1]), i && (i.valid = !1, i = null), a) : [
                    [t, n],
                    [e, r]
                ]
            }
        };
        return a.extent([
            [0, 0],
            [960, 500]
        ])
    }, (sa.geo.conicEqualArea = function() {
        return Yn(Xn)
    }).raw = Xn, sa.geo.albers = function() {
        return sa.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, sa.geo.albersUsa = function() {
        function t(t) {
            var o = t[0],
                a = t[1];
            return n = null, e(o, a), n || (r(o, a), n) || i(o, a), n
        }
        var n, e, r, i, o = sa.geo.albers(),
            a = sa.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
            u = sa.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
            s = {
                point: function(t, e) {
                    n = [t, e]
                }
            };
        return t.invert = function(t) {
            var n = o.scale(),
                e = o.translate(),
                r = (t[0] - e[0]) / n,
                i = (t[1] - e[1]) / n;
            return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? a : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? u : o).invert(t)
        }, t.stream = function(t) {
            var n = o.stream(t),
                e = a.stream(t),
                r = u.stream(t);
            return {
                point: function(t, i) {
                    n.point(t, i), e.point(t, i), r.point(t, i)
                },
                sphere: function() {
                    n.sphere(), e.sphere(), r.sphere()
                },
                lineStart: function() {
                    n.lineStart(), e.lineStart(), r.lineStart()
                },
                lineEnd: function() {
                    n.lineEnd(), e.lineEnd(), r.lineEnd()
                },
                polygonStart: function() {
                    n.polygonStart(), e.polygonStart(), r.polygonStart()
                },
                polygonEnd: function() {
                    n.polygonEnd(), e.polygonEnd(), r.polygonEnd()
                }
            }
        }, t.precision = function(n) {
            return arguments.length ? (o.precision(n), a.precision(n), u.precision(n), t) : o.precision()
        }, t.scale = function(n) {
            return arguments.length ? (o.scale(n), a.scale(.35 * n), u.scale(n), t.translate(o.translate())) : o.scale()
        }, t.translate = function(n) {
            if (!arguments.length) return o.translate();
            var c = o.scale(),
                l = +n[0],
                f = +n[1];
            return e = o.translate(n).clipExtent([
                [l - .455 * c, f - .238 * c],
                [l + .455 * c, f + .238 * c]
            ]).stream(s).point, r = a.translate([l - .307 * c, f + .201 * c]).clipExtent([
                [l - .425 * c + qa, f + .12 * c + qa],
                [l - .214 * c - qa, f + .234 * c - qa]
            ]).stream(s).point, i = u.translate([l - .205 * c, f + .212 * c]).clipExtent([
                [l - .214 * c + qa, f + .166 * c + qa],
                [l - .115 * c - qa, f + .234 * c - qa]
            ]).stream(s).point, t
        }, t.scale(1070)
    };
    var Uu, Iu, Fu, Hu, Vu, Yu, Xu = {
            point: w,
            lineStart: w,
            lineEnd: w,
            polygonStart: function() {
                Iu = 0, Xu.lineStart = Gn
            },
            polygonEnd: function() {
                Xu.lineStart = Xu.lineEnd = Xu.point = w, Uu += xa(Iu / 2)
            }
        },
        Gu = {
            point: Kn,
            lineStart: w,
            lineEnd: w,
            polygonStart: w,
            polygonEnd: w
        },
        Ku = {
            point: Zn,
            lineStart: Wn,
            lineEnd: Qn,
            polygonStart: function() {
                Ku.lineStart = te
            },
            polygonEnd: function() {
                Ku.point = Zn, Ku.lineStart = Wn, Ku.lineEnd = Qn
            }
        };
    sa.geo.path = function() {
        function t(t) {
            return t && ("function" == typeof u && o.pointRadius(+u.apply(this, arguments)), a && a.valid || (a = i(o)), sa.geo.stream(t, a)), o.result()
        }

        function n() {
            return a = null, t
        }
        var e, r, i, o, a, u = 4.5;
        return t.area = function(t) {
            return Uu = 0, sa.geo.stream(t, i(Xu)), Uu
        }, t.centroid = function(t) {
            return Nu = Cu = Tu = ju = Ou = Pu = Lu = Ru = qu = 0, sa.geo.stream(t, i(Ku)), qu ? [Lu / qu, Ru / qu] : Pu ? [ju / Pu, Ou / Pu] : Tu ? [Nu / Tu, Cu / Tu] : [NaN, NaN]
        }, t.bounds = function(t) {
            return Vu = Yu = -(Fu = Hu = 1 / 0), sa.geo.stream(t, i(Gu)), [
                [Fu, Hu],
                [Vu, Yu]
            ]
        }, t.projection = function(t) {
            return arguments.length ? (i = (e = t) ? t.stream || re(t) : m, n()) : e
        }, t.context = function(t) {
            return arguments.length ? (o = null == (r = t) ? new Jn : new ne(t), "function" != typeof u && o.pointRadius(u), n()) : r
        }, t.pointRadius = function(n) {
            return arguments.length ? (u = "function" == typeof n ? n : (o.pointRadius(+n), +n), t) : u
        }, t.projection(sa.geo.albersUsa()).context(null)
    }, sa.geo.transform = function(t) {
        return {
            stream: function(n) {
                var e = new ie(n);
                for (var r in t) e[r] = t[r];
                return e
            }
        }
    }, ie.prototype = {
        point: function(t, n) {
            this.stream.point(t, n)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    }, sa.geo.projection = ae, sa.geo.projectionMutator = ue, (sa.geo.equirectangular = function() {
        return ae(ce)
    }).raw = ce.invert = ce, sa.geo.rotation = function(t) {
        function n(n) {
            return n = t(n[0] * Fa, n[1] * Fa), n[0] *= Ha, n[1] *= Ha, n
        }
        return t = fe(t[0] % 360 * Fa, t[1] * Fa, t.length > 2 ? t[2] * Fa : 0), n.invert = function(n) {
            return n = t.invert(n[0] * Fa, n[1] * Fa), n[0] *= Ha, n[1] *= Ha, n
        }, n
    }, le.invert = ce, sa.geo.circle = function() {
        function t() {
            var t = "function" == typeof r ? r.apply(this, arguments) : r,
                n = fe(-t[0] * Fa, -t[1] * Fa, 0).invert,
                i = [];
            return e(null, null, 1, {
                point: function(t, e) {
                    i.push(t = n(t, e)), t[0] *= Ha, t[1] *= Ha
                }
            }), {
                type: "Polygon",
                coordinates: [i]
            }
        }
        var n, e, r = [0, 0],
            i = 6;
        return t.origin = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t.angle = function(r) {
            return arguments.length ? (e = de((n = +r) * Fa, i * Fa), t) : n
        }, t.precision = function(r) {
            return arguments.length ? (e = de(n * Fa, (i = +r) * Fa), t) : i
        }, t.angle(90)
    }, sa.geo.distance = function(t, n) {
        var e, r = (n[0] - t[0]) * Fa,
            i = t[1] * Fa,
            o = n[1] * Fa,
            a = Math.sin(r),
            u = Math.cos(r),
            s = Math.sin(i),
            c = Math.cos(i),
            l = Math.sin(o),
            f = Math.cos(o);
        return Math.atan2(Math.sqrt((e = f * a) * e + (e = c * l - s * f * u) * e), s * l + c * f * u)
    }, sa.geo.graticule = function() {
        function t() {
            return {
                type: "MultiLineString",
                coordinates: n()
            }
        }

        function n() {
            return sa.range(Math.ceil(o / v) * v, i, v).map(h).concat(sa.range(Math.ceil(c / y) * y, s, y).map(p)).concat(sa.range(Math.ceil(r / g) * g, e, g).filter(function(t) {
                return xa(t % v) > qa
            }).map(l)).concat(sa.range(Math.ceil(u / d) * d, a, d).filter(function(t) {
                return xa(t % y) > qa
            }).map(f))
        }
        var e, r, i, o, a, u, s, c, l, f, h, p, g = 10,
            d = g,
            v = 90,
            y = 360,
            m = 2.5;
        return t.lines = function() {
            return n().map(function(t) {
                return {
                    type: "LineString",
                    coordinates: t
                }
            })
        }, t.outline = function() {
            return {
                type: "Polygon",
                coordinates: [h(o).concat(p(s).slice(1), h(i).reverse().slice(1), p(c).reverse().slice(1))]
            }
        }, t.extent = function(n) {
            return arguments.length ? t.majorExtent(n).minorExtent(n) : t.minorExtent()
        }, t.majorExtent = function(n) {
            return arguments.length ? (o = +n[0][0], i = +n[1][0], c = +n[0][1], s = +n[1][1], o > i && (n = o, o = i, i = n), c > s && (n = c, c = s, s = n), t.precision(m)) : [
                [o, c],
                [i, s]
            ]
        }, t.minorExtent = function(n) {
            return arguments.length ? (r = +n[0][0], e = +n[1][0], u = +n[0][1], a = +n[1][1], r > e && (n = r, r = e, e = n), u > a && (n = u, u = a, a = n), t.precision(m)) : [
                [r, u],
                [e, a]
            ]
        }, t.step = function(n) {
            return arguments.length ? t.majorStep(n).minorStep(n) : t.minorStep()
        }, t.majorStep = function(n) {
            return arguments.length ? (v = +n[0], y = +n[1], t) : [v, y]
        }, t.minorStep = function(n) {
            return arguments.length ? (g = +n[0], d = +n[1], t) : [g, d]
        }, t.precision = function(n) {
            return arguments.length ? (m = +n, l = ye(u, a, 90), f = me(r, e, m), h = ye(c, s, 90), p = me(o, i, m), t) : m
        }, t.majorExtent([
            [-180, -90 + qa],
            [180, 90 - qa]
        ]).minorExtent([
            [-180, -80 - qa],
            [180, 80 + qa]
        ])
    }, sa.geo.greatArc = function() {
        function t() {
            return {
                type: "LineString",
                coordinates: [n || r.apply(this, arguments), e || i.apply(this, arguments)]
            }
        }
        var n, e, r = be,
            i = xe;
        return t.distance = function() {
            return sa.geo.distance(n || r.apply(this, arguments), e || i.apply(this, arguments))
        }, t.source = function(e) {
            return arguments.length ? (r = e, n = "function" == typeof e ? null : e, t) : r
        }, t.target = function(n) {
            return arguments.length ? (i = n, e = "function" == typeof n ? null : n, t) : i
        }, t.precision = function() {
            return arguments.length ? t : 0
        }, t
    }, sa.geo.interpolate = function(t, n) {
        return we(t[0] * Fa, t[1] * Fa, n[0] * Fa, n[1] * Fa)
    }, sa.geo.length = function(t) {
        return Ju = 0, sa.geo.stream(t, $u), Ju
    };
    var Ju, $u = {
            sphere: w,
            point: w,
            lineStart: Me,
            lineEnd: w,
            polygonStart: w,
            polygonEnd: w
        },
        Zu = ke(function(t) {
            return Math.sqrt(2 / (1 + t))
        }, function(t) {
            return 2 * Math.asin(t / 2)
        });
    (sa.geo.azimuthalEqualArea = function() {
        return ae(Zu)
    }).raw = Zu;
    var Wu = ke(function(t) {
        var n = Math.acos(t);
        return n && n / Math.sin(n)
    }, m);
    (sa.geo.azimuthalEquidistant = function() {
        return ae(Wu)
    }).raw = Wu, (sa.geo.conicConformal = function() {
        return Yn(_e)
    }).raw = _e, (sa.geo.conicEquidistant = function() {
        return Yn(Se)
    }).raw = Se;
    var Qu = ke(function(t) {
        return 1 / t
    }, Math.atan);
    (sa.geo.gnomonic = function() {
        return ae(Qu)
    }).raw = Qu, Ee.invert = function(t, n) {
        return [t, 2 * Math.atan(Math.exp(n)) - Ia]
    }, (sa.geo.mercator = function() {
        return Ae(Ee)
    }).raw = Ee;
    var ts = ke(function() {
        return 1
    }, Math.asin);
    (sa.geo.orthographic = function() {
        return ae(ts)
    }).raw = ts;
    var ns = ke(function(t) {
        return 1 / (1 + t)
    }, function(t) {
        return 2 * Math.atan(t)
    });
    (sa.geo.stereographic = function() {
        return ae(ns)
    }).raw = ns, Ne.invert = function(t, n) {
        return [-n, 2 * Math.atan(Math.exp(t)) - Ia]
    }, (sa.geo.transverseMercator = function() {
        var t = Ae(Ne),
            n = t.center,
            e = t.rotate;
        return t.center = function(t) {
            return t ? n([-t[1], t[0]]) : (t = n(), [t[1], -t[0]])
        }, t.rotate = function(t) {
            return t ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = e(), [t[0], t[1], t[2] - 90])
        }, e([0, 0, 90])
    }).raw = Ne, sa.geom = {}, sa.geom.hull = function(t) {
        function n(t) {
            if (t.length < 3) return [];
            var n, i = Et(e),
                o = Et(r),
                a = t.length,
                u = [],
                s = [];
            for (n = 0; a > n; n++) u.push([+i.call(this, t[n], n), +o.call(this, t[n], n), n]);
            for (u.sort(Oe), n = 0; a > n; n++) s.push([u[n][0], -u[n][1]]);
            var c = je(u),
                l = je(s),
                f = l[0] === c[0],
                h = l[l.length - 1] === c[c.length - 1],
                p = [];
            for (n = c.length - 1; n >= 0; --n) p.push(t[u[c[n]][2]]);
            for (n = +f; n < l.length - h; ++n) p.push(t[u[l[n]][2]]);
            return p
        }
        var e = Ce,
            r = Te;
        return arguments.length ? n(t) : (n.x = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.y = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n)
    }, sa.geom.polygon = function(t) {
        return Sa(t, es), t
    };
    var es = sa.geom.polygon.prototype = [];
    es.area = function() {
        for (var t, n = -1, e = this.length, r = this[e - 1], i = 0; ++n < e;) t = r, r = this[n], i += t[1] * r[0] - t[0] * r[1];
        return .5 * i
    }, es.centroid = function(t) {
        var n, e, r = -1,
            i = this.length,
            o = 0,
            a = 0,
            u = this[i - 1];
        for (arguments.length || (t = -1 / (6 * this.area())); ++r < i;) n = u, u = this[r], e = n[0] * u[1] - u[0] * n[1], o += (n[0] + u[0]) * e, a += (n[1] + u[1]) * e;
        return [o * t, a * t]
    }, es.clip = function(t) {
        for (var n, e, r, i, o, a, u = Re(t), s = -1, c = this.length - Re(this), l = this[c - 1]; ++s < c;) {
            for (n = t.slice(), t.length = 0, i = this[s], o = n[(r = n.length - u) - 1], e = -1; ++e < r;) a = n[e], Pe(a, l, i) ? (Pe(o, l, i) || t.push(Le(o, a, l, i)), t.push(a)) : Pe(o, l, i) && t.push(Le(o, a, l, i)), o = a;
            u && t.push(t[0]), l = i
        }
        return t
    };
    var rs, is, os, as, us, ss = [],
        cs = [];
    He.prototype.prepare = function() {
        for (var t, n = this.edges, e = n.length; e--;) t = n[e].edge, t.b && t.a || n.splice(e, 1);
        return n.sort(Ye), n.length
    }, nr.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, er.prototype = {
        insert: function(t, n) {
            var e, r, i;
            if (t) {
                if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
                    for (t = t.R; t.L;) t = t.L;
                    t.L = n
                } else t.R = n;
                e = t
            } else this._ ? (t = ar(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null);
            for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (ir(this, e), t = e, e = t.U), e.C = !1, r.C = !0, or(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (or(this, e), t = e, e = t.U), e.C = !1, r.C = !0, ir(this, r))), e = t.U;
            this._.C = !1
        },
        remove: function(t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
            var n, e, r, i = t.U,
                o = t.L,
                a = t.R;
            if (e = o ? a ? ar(a) : o : a, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && a ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== a ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = a, a.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r) {
                if (t && t.C) return void(t.C = !1);
                do {
                    if (t === this._) break;
                    if (t === i.L) {
                        if (n = i.R, n.C && (n.C = !1, i.C = !0, ir(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
                            n.R && n.R.C || (n.L.C = !1,
                                n.C = !0, or(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, ir(this, i), t = this._;
                            break
                        }
                    } else if (n = i.L, n.C && (n.C = !1, i.C = !0, or(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
                        n.L && n.L.C || (n.R.C = !1, n.C = !0, ir(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, or(this, i), t = this._;
                        break
                    }
                    n.C = !0, t = i, i = i.U
                } while (!t.C);
                t && (t.C = !1)
            }
        }
    }, sa.geom.voronoi = function(t) {
        function n(t) {
            var n = new Array(t.length),
                r = u[0][0],
                i = u[0][1],
                o = u[1][0],
                a = u[1][1];
            return ur(e(t), u).cells.forEach(function(e, u) {
                var s = e.edges,
                    c = e.site,
                    l = n[u] = s.length ? s.map(function(t) {
                        var n = t.start();
                        return [n.x, n.y]
                    }) : c.x >= r && c.x <= o && c.y >= i && c.y <= a ? [
                        [r, a],
                        [o, a],
                        [o, i],
                        [r, i]
                    ] : [];
                l.point = t[u]
            }), n
        }

        function e(t) {
            return t.map(function(t, n) {
                return {
                    x: Math.round(o(t, n) / qa) * qa,
                    y: Math.round(a(t, n) / qa) * qa,
                    i: n
                }
            })
        }
        var r = Ce,
            i = Te,
            o = r,
            a = i,
            u = ls;
        return t ? n(t) : (n.links = function(t) {
            return ur(e(t)).edges.filter(function(t) {
                return t.l && t.r
            }).map(function(n) {
                return {
                    source: t[n.l.i],
                    target: t[n.r.i]
                }
            })
        }, n.triangles = function(t) {
            var n = [];
            return ur(e(t)).cells.forEach(function(e, r) {
                for (var i, o, a = e.site, u = e.edges.sort(Ye), s = -1, c = u.length, l = u[c - 1].edge, f = l.l === a ? l.r : l.l; ++s < c;) i = l, o = f, l = u[s].edge, f = l.l === a ? l.r : l.l, r < o.i && r < f.i && cr(a, o, f) < 0 && n.push([t[r], t[o.i], t[f.i]])
            }), n
        }, n.x = function(t) {
            return arguments.length ? (o = Et(r = t), n) : r
        }, n.y = function(t) {
            return arguments.length ? (a = Et(i = t), n) : i
        }, n.clipExtent = function(t) {
            return arguments.length ? (u = null == t ? ls : t, n) : u === ls ? null : u
        }, n.size = function(t) {
            return arguments.length ? n.clipExtent(t && [
                [0, 0], t
            ]) : u === ls ? null : u && u[1]
        }, n)
    };
    var ls = [
        [-1e6, -1e6],
        [1e6, 1e6]
    ];
    sa.geom.delaunay = function(t) {
        return sa.geom.voronoi().triangles(t)
    }, sa.geom.quadtree = function(t, n, e, r, i) {
        function o(t) {
            function o(t, n, e, r, i, o, a, u) {
                if (!isNaN(e) && !isNaN(r))
                    if (t.leaf) {
                        var s = t.x,
                            l = t.y;
                        if (null != s)
                            if (xa(s - e) + xa(l - r) < .01) c(t, n, e, r, i, o, a, u);
                            else {
                                var f = t.point;
                                t.x = t.y = t.point = null, c(t, f, s, l, i, o, a, u), c(t, n, e, r, i, o, a, u)
                            } else t.x = e, t.y = r, t.point = n
                    } else c(t, n, e, r, i, o, a, u)
            }

            function c(t, n, e, r, i, a, u, s) {
                var c = .5 * (i + u),
                    l = .5 * (a + s),
                    f = e >= c,
                    h = r >= l,
                    p = h << 1 | f;
                t.leaf = !1, t = t.nodes[p] || (t.nodes[p] = hr()), f ? i = c : u = c, h ? a = l : s = l, o(t, n, e, r, i, a, u, s)
            }
            var l, f, h, p, g, d, v, y, m, b = Et(u),
                x = Et(s);
            if (null != n) d = n, v = e, y = r, m = i;
            else if (y = m = -(d = v = 1 / 0), f = [], h = [], g = t.length, a)
                for (p = 0; g > p; ++p) l = t[p], l.x < d && (d = l.x), l.y < v && (v = l.y), l.x > y && (y = l.x), l.y > m && (m = l.y), f.push(l.x), h.push(l.y);
            else
                for (p = 0; g > p; ++p) {
                    var w = +b(l = t[p], p),
                        M = +x(l, p);
                    d > w && (d = w), v > M && (v = M), w > y && (y = w), M > m && (m = M), f.push(w), h.push(M)
                }
            var k = y - d,
                _ = m - v;
            k > _ ? m = v + k : y = d + _;
            var S = hr();
            if (S.add = function(t) {
                    o(S, t, +b(t, ++p), +x(t, p), d, v, y, m)
                }, S.visit = function(t) {
                    pr(t, S, d, v, y, m)
                }, S.find = function(t) {
                    return gr(S, t[0], t[1], d, v, y, m)
                }, p = -1, null == n) {
                for (; ++p < g;) o(S, t[p], f[p], h[p], d, v, y, m);
                --p
            } else t.forEach(S.add);
            return f = h = t = l = null, S
        }
        var a, u = Ce,
            s = Te;
        return (a = arguments.length) ? (u = lr, s = fr, 3 === a && (i = e, r = n, e = n = 0), o(t)) : (o.x = function(t) {
            return arguments.length ? (u = t, o) : u
        }, o.y = function(t) {
            return arguments.length ? (s = t, o) : s
        }, o.extent = function(t) {
            return arguments.length ? (null == t ? n = e = r = i = null : (n = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]), o) : null == n ? null : [
                [n, e],
                [r, i]
            ]
        }, o.size = function(t) {
            return arguments.length ? (null == t ? n = e = r = i = null : (n = e = 0, r = +t[0], i = +t[1]), o) : null == n ? null : [r - n, i - e]
        }, o)
    }, sa.interpolateRgb = dr, sa.interpolateObject = vr, sa.interpolateNumber = yr, sa.interpolateString = mr;
    var fs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        hs = new RegExp(fs.source, "g");
    sa.interpolate = br, sa.interpolators = [function(t, n) {
        var e = typeof n;
        return ("string" === e ? iu.has(n.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(n) ? dr : mr : n instanceof at ? dr : Array.isArray(n) ? xr : "object" === e && isNaN(n) ? vr : yr)(t, n)
    }], sa.interpolateArray = xr;
    var ps = function() {
            return m
        },
        gs = sa.map({
            linear: ps,
            poly: Ar,
            quad: function() {
                return _r
            },
            cubic: function() {
                return Sr
            },
            sin: function() {
                return Nr
            },
            exp: function() {
                return Cr
            },
            circle: function() {
                return Tr
            },
            elastic: jr,
            back: Or,
            bounce: function() {
                return Pr
            }
        }),
        ds = sa.map({
            "in": m,
            out: Mr,
            "in-out": kr,
            "out-in": function(t) {
                return kr(Mr(t))
            }
        });
    sa.ease = function(t) {
        var n = t.indexOf("-"),
            e = n >= 0 ? t.slice(0, n) : t,
            r = n >= 0 ? t.slice(n + 1) : "in";
        return e = gs.get(e) || ps, r = ds.get(r) || m, wr(r(e.apply(null, ca.call(arguments, 1))))
    }, sa.interpolateHcl = Lr, sa.interpolateHsl = Rr, sa.interpolateLab = qr, sa.interpolateRound = Br, sa.transform = function(t) {
        var n = fa.createElementNS(sa.ns.prefix.svg, "g");
        return (sa.transform = function(t) {
            if (null != t) {
                n.setAttribute("transform", t);
                var e = n.transform.baseVal.consolidate()
            }
            return new zr(e ? e.matrix : vs)
        })(t)
    }, zr.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var vs = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    sa.interpolateTransform = Gr, sa.layout = {}, sa.layout.bundle = function() {
        return function(t) {
            for (var n = [], e = -1, r = t.length; ++e < r;) n.push($r(t[e]));
            return n
        }
    }, sa.layout.chord = function() {
        function t() {
            var t, c, f, h, p, g = {},
                d = [],
                v = sa.range(o),
                y = [];
            for (e = [], r = [], t = 0, h = -1; ++h < o;) {
                for (c = 0, p = -1; ++p < o;) c += i[h][p];
                d.push(c), y.push(sa.range(o)), t += c
            }
            for (a && v.sort(function(t, n) {
                    return a(d[t], d[n])
                }), u && y.forEach(function(t, n) {
                    t.sort(function(t, e) {
                        return u(i[n][t], i[n][e])
                    })
                }), t = (Da - l * o) / t, c = 0, h = -1; ++h < o;) {
                for (f = c, p = -1; ++p < o;) {
                    var m = v[h],
                        b = y[m][p],
                        x = i[m][b],
                        w = c,
                        M = c += x * t;
                    g[m + "-" + b] = {
                        index: m,
                        subindex: b,
                        startAngle: w,
                        endAngle: M,
                        value: x
                    }
                }
                r[m] = {
                    index: m,
                    startAngle: f,
                    endAngle: c,
                    value: (c - f) / t
                }, c += l
            }
            for (h = -1; ++h < o;)
                for (p = h - 1; ++p < o;) {
                    var k = g[h + "-" + p],
                        _ = g[p + "-" + h];
                    (k.value || _.value) && e.push(k.value < _.value ? {
                        source: _,
                        target: k
                    } : {
                        source: k,
                        target: _
                    })
                }
            s && n()
        }

        function n() {
            e.sort(function(t, n) {
                return s((t.source.value + t.target.value) / 2, (n.source.value + n.target.value) / 2)
            })
        }
        var e, r, i, o, a, u, s, c = {},
            l = 0;
        return c.matrix = function(t) {
            return arguments.length ? (o = (i = t) && i.length, e = r = null, c) : i
        }, c.padding = function(t) {
            return arguments.length ? (l = t, e = r = null, c) : l
        }, c.sortGroups = function(t) {
            return arguments.length ? (a = t, e = r = null, c) : a
        }, c.sortSubgroups = function(t) {
            return arguments.length ? (u = t, e = null, c) : u
        }, c.sortChords = function(t) {
            return arguments.length ? (s = t, e && n(), c) : s
        }, c.chords = function() {
            return e || t(), e
        }, c.groups = function() {
            return r || t(), r
        }, c
    }, sa.layout.force = function() {
        function t(t) {
            return function(n, e, r, i) {
                if (n.point !== t) {
                    var o = n.cx - t.x,
                        a = n.cy - t.y,
                        u = i - e,
                        s = o * o + a * a;
                    if (s > u * u / y) {
                        if (d > s) {
                            var c = n.charge / s;
                            t.px -= o * c, t.py -= a * c
                        }
                        return !0
                    }
                    if (n.point && s && d > s) {
                        var c = n.pointCharge / s;
                        t.px -= o * c, t.py -= a * c
                    }
                }
                return !n.charge
            }
        }

        function n(t) {
            t.px = sa.event.x, t.py = sa.event.y, s.resume()
        }
        var e, r, i, o, a, u, s = {},
            c = sa.dispatch("start", "tick", "end"),
            l = [1, 1],
            f = .9,
            h = ys,
            p = ms,
            g = -30,
            d = bs,
            v = .1,
            y = .64,
            b = [],
            x = [];
        return s.tick = function() {
            if ((i *= .99) < .005) return e = null, c.end({
                type: "end",
                alpha: i = 0
            }), !0;
            var n, r, s, h, p, d, y, m, w, M = b.length,
                k = x.length;
            for (r = 0; k > r; ++r) s = x[r], h = s.source, p = s.target, m = p.x - h.x, w = p.y - h.y, (d = m * m + w * w) && (d = i * a[r] * ((d = Math.sqrt(d)) - o[r]) / d, m *= d, w *= d, p.x -= m * (y = h.weight + p.weight ? h.weight / (h.weight + p.weight) : .5), p.y -= w * y, h.x += m * (y = 1 - y), h.y += w * y);
            if ((y = i * v) && (m = l[0] / 2, w = l[1] / 2, r = -1, y))
                for (; ++r < M;) s = b[r], s.x += (m - s.x) * y, s.y += (w - s.y) * y;
            if (g)
                for (ri(n = sa.geom.quadtree(b), i, u), r = -1; ++r < M;)(s = b[r]).fixed || n.visit(t(s));
            for (r = -1; ++r < M;) s = b[r], s.fixed ? (s.x = s.px, s.y = s.py) : (s.x -= (s.px - (s.px = s.x)) * f, s.y -= (s.py - (s.py = s.y)) * f);
            c.tick({
                type: "tick",
                alpha: i
            })
        }, s.nodes = function(t) {
            return arguments.length ? (b = t, s) : b
        }, s.links = function(t) {
            return arguments.length ? (x = t, s) : x
        }, s.size = function(t) {
            return arguments.length ? (l = t, s) : l
        }, s.linkDistance = function(t) {
            return arguments.length ? (h = "function" == typeof t ? t : +t, s) : h
        }, s.distance = s.linkDistance, s.linkStrength = function(t) {
            return arguments.length ? (p = "function" == typeof t ? t : +t, s) : p
        }, s.friction = function(t) {
            return arguments.length ? (f = +t, s) : f
        }, s.charge = function(t) {
            return arguments.length ? (g = "function" == typeof t ? t : +t, s) : g
        }, s.chargeDistance = function(t) {
            return arguments.length ? (d = t * t, s) : Math.sqrt(d)
        }, s.gravity = function(t) {
            return arguments.length ? (v = +t, s) : v
        }, s.theta = function(t) {
            return arguments.length ? (y = t * t, s) : Math.sqrt(y)
        }, s.alpha = function(t) {
            return arguments.length ? (t = +t, i ? t > 0 ? i = t : (e.c = null, e.t = NaN, e = null, c.start({
                type: "end",
                alpha: i = 0
            })) : t > 0 && (c.start({
                type: "start",
                alpha: i = t
            }), e = jt(s.tick)), s) : i
        }, s.start = function() {
            function t(t, r) {
                if (!e) {
                    for (e = new Array(i), s = 0; i > s; ++s) e[s] = [];
                    for (s = 0; c > s; ++s) {
                        var o = x[s];
                        e[o.source.index].push(o.target), e[o.target.index].push(o.source)
                    }
                }
                for (var a, u = e[n], s = -1, l = u.length; ++s < l;)
                    if (!isNaN(a = u[s][t])) return a;
                return Math.random() * r
            }
            var n, e, r, i = b.length,
                c = x.length,
                f = l[0],
                d = l[1];
            for (n = 0; i > n; ++n)(r = b[n]).index = n, r.weight = 0;
            for (n = 0; c > n; ++n) r = x[n], "number" == typeof r.source && (r.source = b[r.source]), "number" == typeof r.target && (r.target = b[r.target]), ++r.source.weight, ++r.target.weight;
            for (n = 0; i > n; ++n) r = b[n], isNaN(r.x) && (r.x = t("x", f)), isNaN(r.y) && (r.y = t("y", d)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
            if (o = [], "function" == typeof h)
                for (n = 0; c > n; ++n) o[n] = +h.call(this, x[n], n);
            else
                for (n = 0; c > n; ++n) o[n] = h;
            if (a = [], "function" == typeof p)
                for (n = 0; c > n; ++n) a[n] = +p.call(this, x[n], n);
            else
                for (n = 0; c > n; ++n) a[n] = p;
            if (u = [], "function" == typeof g)
                for (n = 0; i > n; ++n) u[n] = +g.call(this, b[n], n);
            else
                for (n = 0; i > n; ++n) u[n] = g;
            return s.resume()
        }, s.resume = function() {
            return s.alpha(.1)
        }, s.stop = function() {
            return s.alpha(0)
        }, s.drag = function() {
            return r || (r = sa.behavior.drag().origin(m).on("dragstart.force", Qr).on("drag.force", n).on("dragend.force", ti)), arguments.length ? void this.on("mouseover.force", ni).on("mouseout.force", ei).call(r) : r
        }, sa.rebind(s, c, "on")
    };
    var ys = 20,
        ms = 1,
        bs = 1 / 0;
    sa.layout.hierarchy = function() {
        function t(i) {
            var o, a = [i],
                u = [];
            for (i.depth = 0; null != (o = a.pop());)
                if (u.push(o), (c = e.call(t, o, o.depth)) && (s = c.length)) {
                    for (var s, c, l; --s >= 0;) a.push(l = c[s]), l.parent = o, l.depth = o.depth + 1;
                    r && (o.value = 0), o.children = c
                } else r && (o.value = +r.call(t, o, o.depth) || 0), delete o.children;
            return ai(i, function(t) {
                var e, i;
                n && (e = t.children) && e.sort(n), r && (i = t.parent) && (i.value += t.value)
            }), u
        }
        var n = ci,
            e = ui,
            r = si;
        return t.sort = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.children = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.value = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t.revalue = function(n) {
            return r && (oi(n, function(t) {
                t.children && (t.value = 0)
            }), ai(n, function(n) {
                var e;
                n.children || (n.value = +r.call(t, n, n.depth) || 0), (e = n.parent) && (e.value += n.value)
            })), n
        }, t
    }, sa.layout.partition = function() {
        function t(n, e, r, i) {
            var o = n.children;
            if (n.x = e, n.y = n.depth * i, n.dx = r, n.dy = i, o && (a = o.length)) {
                var a, u, s, c = -1;
                for (r = n.value ? r / n.value : 0; ++c < a;) t(u = o[c], e, s = u.value * r, i), e += s
            }
        }

        function n(t) {
            var e = t.children,
                r = 0;
            if (e && (i = e.length))
                for (var i, o = -1; ++o < i;) r = Math.max(r, n(e[o]));
            return 1 + r
        }

        function e(e, o) {
            var a = r.call(this, e, o);
            return t(a[0], 0, i[0], i[1] / n(a[0])), a
        }
        var r = sa.layout.hierarchy(),
            i = [1, 1];
        return e.size = function(t) {
            return arguments.length ? (i = t, e) : i
        }, ii(e, r)
    }, sa.layout.pie = function() {
        function t(a) {
            var u, s = a.length,
                c = a.map(function(e, r) {
                    return +n.call(t, e, r)
                }),
                l = +("function" == typeof r ? r.apply(this, arguments) : r),
                f = ("function" == typeof i ? i.apply(this, arguments) : i) - l,
                h = Math.min(Math.abs(f) / s, +("function" == typeof o ? o.apply(this, arguments) : o)),
                p = h * (0 > f ? -1 : 1),
                g = sa.sum(c),
                d = g ? (f - s * p) / g : 0,
                v = sa.range(s),
                y = [];
            return null != e && v.sort(e === xs ? function(t, n) {
                return c[n] - c[t]
            } : function(t, n) {
                return e(a[t], a[n])
            }), v.forEach(function(t) {
                y[t] = {
                    data: a[t],
                    value: u = c[t],
                    startAngle: l,
                    endAngle: l += u * d + p,
                    padAngle: h
                }
            }), y
        }
        var n = Number,
            e = xs,
            r = 0,
            i = Da,
            o = 0;
        return t.value = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.sort = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.startAngle = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t.endAngle = function(n) {
            return arguments.length ? (i = n, t) : i
        }, t.padAngle = function(n) {
            return arguments.length ? (o = n, t) : o
        }, t
    };
    var xs = {};
    sa.layout.stack = function() {
        function t(u, s) {
            if (!(h = u.length)) return u;
            var c = u.map(function(e, r) {
                    return n.call(t, e, r)
                }),
                l = c.map(function(n) {
                    return n.map(function(n, e) {
                        return [o.call(t, n, e), a.call(t, n, e)]
                    })
                }),
                f = e.call(t, l, s);
            c = sa.permute(c, f), l = sa.permute(l, f);
            var h, p, g, d, v = r.call(t, l, s),
                y = c[0].length;
            for (g = 0; y > g; ++g)
                for (i.call(t, c[0][g], d = v[g], l[0][g][1]), p = 1; h > p; ++p) i.call(t, c[p][g], d += l[p - 1][g][1], l[p][g][1]);
            return u
        }
        var n = m,
            e = gi,
            r = di,
            i = pi,
            o = fi,
            a = hi;
        return t.values = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.order = function(n) {
            return arguments.length ? (e = "function" == typeof n ? n : ws.get(n) || gi, t) : e
        }, t.offset = function(n) {
            return arguments.length ? (r = "function" == typeof n ? n : Ms.get(n) || di, t) : r
        }, t.x = function(n) {
            return arguments.length ? (o = n, t) : o
        }, t.y = function(n) {
            return arguments.length ? (a = n, t) : a
        }, t.out = function(n) {
            return arguments.length ? (i = n, t) : i
        }, t
    };
    var ws = sa.map({
            "inside-out": function(t) {
                var n, e, r = t.length,
                    i = t.map(vi),
                    o = t.map(yi),
                    a = sa.range(r).sort(function(t, n) {
                        return i[t] - i[n]
                    }),
                    u = 0,
                    s = 0,
                    c = [],
                    l = [];
                for (n = 0; r > n; ++n) e = a[n], s > u ? (u += o[e], c.push(e)) : (s += o[e], l.push(e));
                return l.reverse().concat(c)
            },
            reverse: function(t) {
                return sa.range(t.length).reverse()
            },
            "default": gi
        }),
        Ms = sa.map({
            silhouette: function(t) {
                var n, e, r, i = t.length,
                    o = t[0].length,
                    a = [],
                    u = 0,
                    s = [];
                for (e = 0; o > e; ++e) {
                    for (n = 0, r = 0; i > n; n++) r += t[n][e][1];
                    r > u && (u = r), a.push(r)
                }
                for (e = 0; o > e; ++e) s[e] = (u - a[e]) / 2;
                return s
            },
            wiggle: function(t) {
                var n, e, r, i, o, a, u, s, c, l = t.length,
                    f = t[0],
                    h = f.length,
                    p = [];
                for (p[0] = s = c = 0, e = 1; h > e; ++e) {
                    for (n = 0, i = 0; l > n; ++n) i += t[n][e][1];
                    for (n = 0, o = 0, u = f[e][0] - f[e - 1][0]; l > n; ++n) {
                        for (r = 0, a = (t[n][e][1] - t[n][e - 1][1]) / (2 * u); n > r; ++r) a += (t[r][e][1] - t[r][e - 1][1]) / u;
                        o += a * t[n][e][1]
                    }
                    p[e] = s -= i ? o / i * u : 0, c > s && (c = s)
                }
                for (e = 0; h > e; ++e) p[e] -= c;
                return p
            },
            expand: function(t) {
                var n, e, r, i = t.length,
                    o = t[0].length,
                    a = 1 / i,
                    u = [];
                for (e = 0; o > e; ++e) {
                    for (n = 0, r = 0; i > n; n++) r += t[n][e][1];
                    if (r)
                        for (n = 0; i > n; n++) t[n][e][1] /= r;
                    else
                        for (n = 0; i > n; n++) t[n][e][1] = a
                }
                for (e = 0; o > e; ++e) u[e] = 0;
                return u
            },
            zero: di
        });
    sa.layout.histogram = function() {
        function t(t, o) {
            for (var a, u, s = [], c = t.map(e, this), l = r.call(this, c, o), f = i.call(this, l, c, o), o = -1, h = c.length, p = f.length - 1, g = n ? 1 : 1 / h; ++o < p;) a = s[o] = [], a.dx = f[o + 1] - (a.x = f[o]), a.y = 0;
            if (p > 0)
                for (o = -1; ++o < h;) u = c[o], u >= l[0] && u <= l[1] && (a = s[sa.bisect(f, u, 1, p) - 1], a.y += g, a.push(t[o]));
            return s
        }
        var n = !0,
            e = Number,
            r = wi,
            i = bi;
        return t.value = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.range = function(n) {
            return arguments.length ? (r = Et(n), t) : r
        }, t.bins = function(n) {
            return arguments.length ? (i = "number" == typeof n ? function(t) {
                return xi(t, n)
            } : Et(n), t) : i
        }, t.frequency = function(e) {
            return arguments.length ? (n = !!e, t) : n
        }, t
    }, sa.layout.pack = function() {
        function t(t, o) {
            var a = e.call(this, t, o),
                u = a[0],
                s = i[0],
                c = i[1],
                l = null == n ? Math.sqrt : "function" == typeof n ? n : function() {
                    return n
                };
            if (u.x = u.y = 0, ai(u, function(t) {
                    t.r = +l(t.value)
                }), ai(u, Ei), r) {
                var f = r * (n ? 1 : Math.max(2 * u.r / s, 2 * u.r / c)) / 2;
                ai(u, function(t) {
                    t.r += f
                }), ai(u, Ei), ai(u, function(t) {
                    t.r -= f
                })
            }
            return Ci(u, s / 2, c / 2, n ? 1 : 1 / Math.max(2 * u.r / s, 2 * u.r / c)), a
        }
        var n, e = sa.layout.hierarchy().sort(Mi),
            r = 0,
            i = [1, 1];
        return t.size = function(n) {
            return arguments.length ? (i = n, t) : i
        }, t.radius = function(e) {
            return arguments.length ? (n = null == e || "function" == typeof e ? e : +e, t) : n
        }, t.padding = function(n) {
            return arguments.length ? (r = +n, t) : r
        }, ii(t, e)
    }, sa.layout.tree = function() {
        function t(t, i) {
            var l = a.call(this, t, i),
                f = l[0],
                h = n(f);
            if (ai(h, e), h.parent.m = -h.z, oi(h, r), c) oi(f, o);
            else {
                var p = f,
                    g = f,
                    d = f;
                oi(f, function(t) {
                    t.x < p.x && (p = t), t.x > g.x && (g = t), t.depth > d.depth && (d = t)
                });
                var v = u(p, g) / 2 - p.x,
                    y = s[0] / (g.x + u(g, p) / 2 + v),
                    m = s[1] / (d.depth || 1);
                oi(f, function(t) {
                    t.x = (t.x + v) * y, t.y = t.depth * m
                })
            }
            return l
        }

        function n(t) {
            for (var n, e = {
                    A: null,
                    children: [t]
                }, r = [e]; null != (n = r.pop());)
                for (var i, o = n.children, a = 0, u = o.length; u > a; ++a) r.push((o[a] = i = {
                    _: o[a],
                    parent: n,
                    children: (i = o[a].children) && i.slice() || [],
                    A: null,
                    a: null,
                    z: 0,
                    m: 0,
                    c: 0,
                    s: 0,
                    t: null,
                    i: a
                }).a = i);
            return e.children[0]
        }

        function e(t) {
            var n = t.children,
                e = t.parent.children,
                r = t.i ? e[t.i - 1] : null;
            if (n.length) {
                Ri(t);
                var o = (n[0].z + n[n.length - 1].z) / 2;
                r ? (t.z = r.z + u(t._, r._), t.m = t.z - o) : t.z = o
            } else r && (t.z = r.z + u(t._, r._));
            t.parent.A = i(t, r, t.parent.A || e[0])
        }

        function r(t) {
            t._.x = t.z + t.parent.m, t.m += t.parent.m
        }

        function i(t, n, e) {
            if (n) {
                for (var r, i = t, o = t, a = n, s = i.parent.children[0], c = i.m, l = o.m, f = a.m, h = s.m; a = Pi(a), i = Oi(i), a && i;) s = Oi(s), o = Pi(o), o.a = t, r = a.z + f - i.z - c + u(a._, i._), r > 0 && (Li(qi(a, t, e), t, r), c += r, l += r), f += a.m, c += i.m, h += s.m, l += o.m;
                a && !Pi(o) && (o.t = a, o.m += f - l), i && !Oi(s) && (s.t = i, s.m += c - h, e = t)
            }
            return e
        }

        function o(t) {
            t.x *= s[0], t.y = t.depth * s[1]
        }
        var a = sa.layout.hierarchy().sort(null).value(null),
            u = ji,
            s = [1, 1],
            c = null;
        return t.separation = function(n) {
            return arguments.length ? (u = n, t) : u
        }, t.size = function(n) {
            return arguments.length ? (c = null == (s = n) ? o : null, t) : c ? null : s
        }, t.nodeSize = function(n) {
            return arguments.length ? (c = null == (s = n) ? null : o, t) : c ? s : null
        }, ii(t, a)
    }, sa.layout.cluster = function() {
        function t(t, o) {
            var a, u = n.call(this, t, o),
                s = u[0],
                c = 0;
            ai(s, function(t) {
                var n = t.children;
                n && n.length ? (t.x = zi(n), t.y = Bi(n)) : (t.x = a ? c += e(t, a) : 0, t.y = 0, a = t)
            });
            var l = Di(s),
                f = Ui(s),
                h = l.x - e(l, f) / 2,
                p = f.x + e(f, l) / 2;
            return ai(s, i ? function(t) {
                t.x = (t.x - s.x) * r[0], t.y = (s.y - t.y) * r[1]
            } : function(t) {
                t.x = (t.x - h) / (p - h) * r[0], t.y = (1 - (s.y ? t.y / s.y : 1)) * r[1]
            }), u
        }
        var n = sa.layout.hierarchy().sort(null).value(null),
            e = ji,
            r = [1, 1],
            i = !1;
        return t.separation = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.size = function(n) {
            return arguments.length ? (i = null == (r = n), t) : i ? null : r
        }, t.nodeSize = function(n) {
            return arguments.length ? (i = null != (r = n), t) : i ? r : null
        }, ii(t, n)
    }, sa.layout.treemap = function() {
        function t(t, n) {
            for (var e, r, i = -1, o = t.length; ++i < o;) r = (e = t[i]).value * (0 > n ? 0 : n), e.area = isNaN(r) || 0 >= r ? 0 : r
        }

        function n(e) {
            var o = e.children;
            if (o && o.length) {
                var a, u, s, c = f(e),
                    l = [],
                    h = o.slice(),
                    g = 1 / 0,
                    d = "slice" === p ? c.dx : "dice" === p ? c.dy : "slice-dice" === p ? 1 & e.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);
                for (t(h, c.dx * c.dy / e.value), l.area = 0;
                    (s = h.length) > 0;) l.push(a = h[s - 1]), l.area += a.area, "squarify" !== p || (u = r(l, d)) <= g ? (h.pop(), g = u) : (l.area -= l.pop().area, i(l, d, c, !1), d = Math.min(c.dx, c.dy), l.length = l.area = 0, g = 1 / 0);
                l.length && (i(l, d, c, !0), l.length = l.area = 0), o.forEach(n)
            }
        }

        function e(n) {
            var r = n.children;
            if (r && r.length) {
                var o, a = f(n),
                    u = r.slice(),
                    s = [];
                for (t(u, a.dx * a.dy / n.value), s.area = 0; o = u.pop();) s.push(o), s.area += o.area, null != o.z && (i(s, o.z ? a.dx : a.dy, a, !u.length), s.length = s.area = 0);
                r.forEach(e)
            }
        }

        function r(t, n) {
            for (var e, r = t.area, i = 0, o = 1 / 0, a = -1, u = t.length; ++a < u;)(e = t[a].area) && (o > e && (o = e), e > i && (i = e));
            return r *= r, n *= n, r ? Math.max(n * i * g / r, r / (n * o * g)) : 1 / 0
        }

        function i(t, n, e, r) {
            var i, o = -1,
                a = t.length,
                u = e.x,
                c = e.y,
                l = n ? s(t.area / n) : 0;
            if (n == e.dx) {
                for ((r || l > e.dy) && (l = e.dy); ++o < a;) i = t[o], i.x = u, i.y = c, i.dy = l, u += i.dx = Math.min(e.x + e.dx - u, l ? s(i.area / l) : 0);
                i.z = !0, i.dx += e.x + e.dx - u, e.y += l, e.dy -= l
            } else {
                for ((r || l > e.dx) && (l = e.dx); ++o < a;) i = t[o], i.x = u, i.y = c, i.dx = l, c += i.dy = Math.min(e.y + e.dy - c, l ? s(i.area / l) : 0);
                i.z = !1, i.dy += e.y + e.dy - c, e.x += l, e.dx -= l
            }
        }

        function o(r) {
            var i = a || u(r),
                o = i[0];
            return o.x = o.y = 0, o.value ? (o.dx = c[0], o.dy = c[1]) : o.dx = o.dy = 0, a && u.revalue(o), t([o], o.dx * o.dy / o.value), (a ? e : n)(o), h && (a = i), i
        }
        var a, u = sa.layout.hierarchy(),
            s = Math.round,
            c = [1, 1],
            l = null,
            f = Ii,
            h = !1,
            p = "squarify",
            g = .5 * (1 + Math.sqrt(5));
        return o.size = function(t) {
            return arguments.length ? (c = t, o) : c
        }, o.padding = function(t) {
            function n(n) {
                var e = t.call(o, n, n.depth);
                return null == e ? Ii(n) : Fi(n, "number" == typeof e ? [e, e, e, e] : e)
            }

            function e(n) {
                return Fi(n, t)
            }
            if (!arguments.length) return l;
            var r;
            return f = null == (l = t) ? Ii : "function" == (r = typeof t) ? n : "number" === r ? (t = [t, t, t, t], e) : e, o
        }, o.round = function(t) {
            return arguments.length ? (s = t ? Math.round : Number, o) : s != Number
        }, o.sticky = function(t) {
            return arguments.length ? (h = t, a = null, o) : h
        }, o.ratio = function(t) {
            return arguments.length ? (g = t, o) : g
        }, o.mode = function(t) {
            return arguments.length ? (p = t + "", o) : p
        }, ii(o, u)
    }, sa.random = {
        normal: function(t, n) {
            var e = arguments.length;
            return 2 > e && (n = 1), 1 > e && (t = 0),
                function() {
                    var e, r, i;
                    do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = e * e + r * r; while (!i || i > 1);
                    return t + n * e * Math.sqrt(-2 * Math.log(i) / i)
                }
        },
        logNormal: function() {
            var t = sa.random.normal.apply(sa, arguments);
            return function() {
                return Math.exp(t())
            }
        },
        bates: function(t) {
            var n = sa.random.irwinHall(t);
            return function() {
                return n() / t
            }
        },
        irwinHall: function(t) {
            return function() {
                for (var n = 0, e = 0; t > e; e++) n += Math.random();
                return n
            }
        }
    }, sa.scale = {};
    var ks = {
        floor: m,
        ceil: m
    };
    sa.scale.linear = function() {
        return Ji([0, 1], [0, 1], br, !1)
    };
    var _s = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    sa.scale.log = function() {
        return ro(sa.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var Ss = sa.format(".0e"),
        Es = {
            floor: function(t) {
                return -Math.ceil(-t)
            },
            ceil: function(t) {
                return -Math.floor(-t)
            }
        };
    sa.scale.pow = function() {
        return io(sa.scale.linear(), 1, [0, 1])
    }, sa.scale.sqrt = function() {
        return sa.scale.pow().exponent(.5)
    }, sa.scale.ordinal = function() {
        return ao([], {
            t: "range",
            a: [
                []
            ]
        })
    }, sa.scale.category10 = function() {
        return sa.scale.ordinal().range(As)
    }, sa.scale.category20 = function() {
        return sa.scale.ordinal().range(Ns)
    }, sa.scale.category20b = function() {
        return sa.scale.ordinal().range(Cs)
    }, sa.scale.category20c = function() {
        return sa.scale.ordinal().range(Ts)
    };
    var As = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(bt),
        Ns = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(bt),
        Cs = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(bt),
        Ts = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(bt);
    sa.scale.quantile = function() {
        return uo([], [])
    }, sa.scale.quantize = function() {
        return so(0, 1, [0, 1])
    }, sa.scale.threshold = function() {
        return co([.5], [0, 1])
    }, sa.scale.identity = function() {
        return lo([0, 1])
    }, sa.svg = {}, sa.svg.arc = function() {
        function t() {
            var t = Math.max(0, +e.apply(this, arguments)),
                c = Math.max(0, +r.apply(this, arguments)),
                l = a.apply(this, arguments) - Ia,
                f = u.apply(this, arguments) - Ia,
                h = Math.abs(f - l),
                p = l > f ? 0 : 1;
            if (t > c && (g = c, c = t, t = g), h >= Ua) return n(c, p) + (t ? n(t, 1 - p) : "") + "Z";
            var g, d, v, y, m, b, x, w, M, k, _, S, E = 0,
                A = 0,
                N = [];
            if ((y = (+s.apply(this, arguments) || 0) / 2) && (v = o === js ? Math.sqrt(t * t + c * c) : +o.apply(this, arguments), p || (A *= -1), c && (A = nt(v / c * Math.sin(y))), t && (E = nt(v / t * Math.sin(y)))), c) {
                m = c * Math.cos(l + A), b = c * Math.sin(l + A), x = c * Math.cos(f - A), w = c * Math.sin(f - A);
                var C = Math.abs(f - l - 2 * A) <= za ? 0 : 1;
                if (A && mo(m, b, x, w) === p ^ C) {
                    var T = (l + f) / 2;
                    m = c * Math.cos(T), b = c * Math.sin(T), x = w = null
                }
            } else m = b = 0;
            if (t) {
                M = t * Math.cos(f - E), k = t * Math.sin(f - E), _ = t * Math.cos(l + E), S = t * Math.sin(l + E);
                var j = Math.abs(l - f + 2 * E) <= za ? 0 : 1;
                if (E && mo(M, k, _, S) === 1 - p ^ j) {
                    var O = (l + f) / 2;
                    M = t * Math.cos(O), k = t * Math.sin(O), _ = S = null
                }
            } else M = k = 0;
            if (h > qa && (g = Math.min(Math.abs(c - t) / 2, +i.apply(this, arguments))) > .001) {
                d = c > t ^ p ? 0 : 1;
                var P = g,
                    L = g;
                if (za > h) {
                    var R = null == _ ? [M, k] : null == x ? [m, b] : Le([m, b], [_, S], [x, w], [M, k]),
                        q = m - R[0],
                        B = b - R[1],
                        z = x - R[0],
                        D = w - R[1],
                        U = 1 / Math.sin(Math.acos((q * z + B * D) / (Math.sqrt(q * q + B * B) * Math.sqrt(z * z + D * D))) / 2),
                        I = Math.sqrt(R[0] * R[0] + R[1] * R[1]);
                    L = Math.min(g, (t - I) / (U - 1)), P = Math.min(g, (c - I) / (U + 1))
                }
                if (null != x) {
                    var F = bo(null == _ ? [M, k] : [_, S], [m, b], c, P, p),
                        H = bo([x, w], [M, k], c, P, p);
                    g === P ? N.push("M", F[0], "A", P, ",", P, " 0 0,", d, " ", F[1], "A", c, ",", c, " 0 ", 1 - p ^ mo(F[1][0], F[1][1], H[1][0], H[1][1]), ",", p, " ", H[1], "A", P, ",", P, " 0 0,", d, " ", H[0]) : N.push("M", F[0], "A", P, ",", P, " 0 1,", d, " ", H[0])
                } else N.push("M", m, ",", b);
                if (null != _) {
                    var V = bo([m, b], [_, S], t, -L, p),
                        Y = bo([M, k], null == x ? [m, b] : [x, w], t, -L, p);
                    g === L ? N.push("L", Y[0], "A", L, ",", L, " 0 0,", d, " ", Y[1], "A", t, ",", t, " 0 ", p ^ mo(Y[1][0], Y[1][1], V[1][0], V[1][1]), ",", 1 - p, " ", V[1], "A", L, ",", L, " 0 0,", d, " ", V[0]) : N.push("L", Y[0], "A", L, ",", L, " 0 0,", d, " ", V[0])
                } else N.push("L", M, ",", k)
            } else N.push("M", m, ",", b), null != x && N.push("A", c, ",", c, " 0 ", C, ",", p, " ", x, ",", w), N.push("L", M, ",", k), null != _ && N.push("A", t, ",", t, " 0 ", j, ",", 1 - p, " ", _, ",", S);
            return N.push("Z"), N.join("")
        }

        function n(t, n) {
            return "M0," + t + "A" + t + "," + t + " 0 1," + n + " 0," + -t + "A" + t + "," + t + " 0 1," + n + " 0," + t
        }
        var e = ho,
            r = po,
            i = fo,
            o = js,
            a = go,
            u = vo,
            s = yo;
        return t.innerRadius = function(n) {
            return arguments.length ? (e = Et(n), t) : e
        }, t.outerRadius = function(n) {
            return arguments.length ? (r = Et(n), t) : r
        }, t.cornerRadius = function(n) {
            return arguments.length ? (i = Et(n), t) : i
        }, t.padRadius = function(n) {
            return arguments.length ? (o = n == js ? js : Et(n), t) : o
        }, t.startAngle = function(n) {
            return arguments.length ? (a = Et(n), t) : a
        }, t.endAngle = function(n) {
            return arguments.length ? (u = Et(n), t) : u
        }, t.padAngle = function(n) {
            return arguments.length ? (s = Et(n), t) : s
        }, t.centroid = function() {
            var t = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2,
                n = (+a.apply(this, arguments) + +u.apply(this, arguments)) / 2 - Ia;
            return [Math.cos(n) * t, Math.sin(n) * t]
        }, t
    };
    var js = "auto";
    sa.svg.line = function() {
        return xo(m)
    };
    var Os = sa.map({
        linear: wo,
        "linear-closed": Mo,
        step: ko,
        "step-before": _o,
        "step-after": So,
        basis: jo,
        "basis-open": Oo,
        "basis-closed": Po,
        bundle: Lo,
        cardinal: No,
        "cardinal-open": Eo,
        "cardinal-closed": Ao,
        monotone: Uo
    });
    Os.forEach(function(t, n) {
        n.key = t, n.closed = /-closed$/.test(t)
    });
    var Ps = [0, 2 / 3, 1 / 3, 0],
        Ls = [0, 1 / 3, 2 / 3, 0],
        Rs = [0, 1 / 6, 2 / 3, 1 / 6];
    sa.svg.line.radial = function() {
        var t = xo(Io);
        return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, _o.reverse = So, So.reverse = _o, sa.svg.area = function() {
        return Fo(m)
    }, sa.svg.area.radial = function() {
        var t = Fo(Io);
        return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, sa.svg.chord = function() {
        function t(t, u) {
            var s = n(this, o, t, u),
                c = n(this, a, t, u);
            return "M" + s.p0 + r(s.r, s.p1, s.a1 - s.a0) + (e(s, c) ? i(s.r, s.p1, s.r, s.p0) : i(s.r, s.p1, c.r, c.p0) + r(c.r, c.p1, c.a1 - c.a0) + i(c.r, c.p1, s.r, s.p0)) + "Z"
        }

        function n(t, n, e, r) {
            var i = n.call(t, e, r),
                o = u.call(t, i, r),
                a = s.call(t, i, r) - Ia,
                l = c.call(t, i, r) - Ia;
            return {
                r: o,
                a0: a,
                a1: l,
                p0: [o * Math.cos(a), o * Math.sin(a)],
                p1: [o * Math.cos(l), o * Math.sin(l)]
            }
        }

        function e(t, n) {
            return t.a0 == n.a0 && t.a1 == n.a1
        }

        function r(t, n, e) {
            return "A" + t + "," + t + " 0 " + +(e > za) + ",1 " + n
        }

        function i(t, n, e, r) {
            return "Q 0,0 " + r
        }
        var o = be,
            a = xe,
            u = Ho,
            s = go,
            c = vo;
        return t.radius = function(n) {
            return arguments.length ? (u = Et(n), t) : u
        }, t.source = function(n) {
            return arguments.length ? (o = Et(n), t) : o
        }, t.target = function(n) {
            return arguments.length ? (a = Et(n), t) : a
        }, t.startAngle = function(n) {
            return arguments.length ? (s = Et(n), t) : s
        }, t.endAngle = function(n) {
            return arguments.length ? (c = Et(n), t) : c
        }, t
    }, sa.svg.diagonal = function() {
        function t(t, i) {
            var o = n.call(this, t, i),
                a = e.call(this, t, i),
                u = (o.y + a.y) / 2,
                s = [o, {
                    x: o.x,
                    y: u
                }, {
                    x: a.x,
                    y: u
                }, a];
            return s = s.map(r), "M" + s[0] + "C" + s[1] + " " + s[2] + " " + s[3]
        }
        var n = be,
            e = xe,
            r = Vo;
        return t.source = function(e) {
            return arguments.length ? (n = Et(e), t) : n
        }, t.target = function(n) {
            return arguments.length ? (e = Et(n), t) : e
        }, t.projection = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t
    }, sa.svg.diagonal.radial = function() {
        var t = sa.svg.diagonal(),
            n = Vo,
            e = t.projection;
        return t.projection = function(t) {
            return arguments.length ? e(Yo(n = t)) : n
        }, t
    }, sa.svg.symbol = function() {
        function t(t, r) {
            return (qs.get(n.call(this, t, r)) || Ko)(e.call(this, t, r))
        }
        var n = Go,
            e = Xo;
        return t.type = function(e) {
            return arguments.length ? (n = Et(e), t) : n
        }, t.size = function(n) {
            return arguments.length ? (e = Et(n), t) : e
        }, t
    };
    var qs = sa.map({
        circle: Ko,
        cross: function(t) {
            var n = Math.sqrt(t / 5) / 2;
            return "M" + -3 * n + "," + -n + "H" + -n + "V" + -3 * n + "H" + n + "V" + -n + "H" + 3 * n + "V" + n + "H" + n + "V" + 3 * n + "H" + -n + "V" + n + "H" + -3 * n + "Z"
        },
        diamond: function(t) {
            var n = Math.sqrt(t / (2 * zs)),
                e = n * zs;
            return "M0," + -n + "L" + e + ",0 0," + n + " " + -e + ",0Z"
        },
        square: function(t) {
            var n = Math.sqrt(t) / 2;
            return "M" + -n + "," + -n + "L" + n + "," + -n + " " + n + "," + n + " " + -n + "," + n + "Z"
        },
        "triangle-down": function(t) {
            var n = Math.sqrt(t / Bs),
                e = n * Bs / 2;
            return "M0," + e + "L" + n + "," + -e + " " + -n + "," + -e + "Z"
        },
        "triangle-up": function(t) {
            var n = Math.sqrt(t / Bs),
                e = n * Bs / 2;
            return "M0," + -e + "L" + n + "," + e + " " + -n + "," + e + "Z"
        }
    });
    sa.svg.symbolTypes = qs.keys();
    var Bs = Math.sqrt(3),
        zs = Math.tan(30 * Fa);
    Ca.transition = function(t) {
        for (var n, e, r = Ds || ++Hs, i = Qo(t), o = [], a = Us || {
                time: Date.now(),
                ease: Er,
                delay: 0,
                duration: 250
            }, u = -1, s = this.length; ++u < s;) {
            o.push(n = []);
            for (var c = this[u], l = -1, f = c.length; ++l < f;)(e = c[l]) && ta(e, l, i, r, a), n.push(e)
        }
        return $o(o, i, r)
    }, Ca.interrupt = function(t) {
        return this.each(null == t ? Is : Jo(Qo(t)))
    };
    var Ds, Us, Is = Jo(Qo()),
        Fs = [],
        Hs = 0;
    Fs.call = Ca.call, Fs.empty = Ca.empty, Fs.node = Ca.node, Fs.size = Ca.size, sa.transition = function(t, n) {
        return t && t.transition ? Ds ? t.transition(n) : t : sa.selection().transition(t)
    }, sa.transition.prototype = Fs, Fs.select = function(t) {
        var n, e, r, i = this.id,
            o = this.namespace,
            a = [];
        t = N(t);
        for (var u = -1, s = this.length; ++u < s;) {
            a.push(n = []);
            for (var c = this[u], l = -1, f = c.length; ++l < f;)(r = c[l]) && (e = t.call(r, r.__data__, l, u)) ? ("__data__" in r && (e.__data__ = r.__data__), ta(e, l, o, i, r[o][i]), n.push(e)) : n.push(null)
        }
        return $o(a, o, i)
    }, Fs.selectAll = function(t) {
        var n, e, r, i, o, a = this.id,
            u = this.namespace,
            s = [];
        t = C(t);
        for (var c = -1, l = this.length; ++c < l;)
            for (var f = this[c], h = -1, p = f.length; ++h < p;)
                if (r = f[h]) {
                    o = r[u][a], e = t.call(r, r.__data__, h, c), s.push(n = []);
                    for (var g = -1, d = e.length; ++g < d;)(i = e[g]) && ta(i, g, u, a, o), n.push(i)
                }
        return $o(s, u, a)
    }, Fs.filter = function(t) {
        var n, e, r, i = [];
        "function" != typeof t && (t = I(t));
        for (var o = 0, a = this.length; a > o; o++) {
            i.push(n = []);
            for (var e = this[o], u = 0, s = e.length; s > u; u++)(r = e[u]) && t.call(r, r.__data__, u, o) && n.push(r)
        }
        return $o(i, this.namespace, this.id)
    }, Fs.tween = function(t, n) {
        var e = this.id,
            r = this.namespace;
        return arguments.length < 2 ? this.node()[r][e].tween.get(t) : H(this, null == n ? function(n) {
            n[r][e].tween.remove(t)
        } : function(i) {
            i[r][e].tween.set(t, n)
        })
    }, Fs.attr = function(t, n) {
        function e() {
            this.removeAttribute(u)
        }

        function r() {
            this.removeAttributeNS(u.space, u.local)
        }

        function i(t) {
            return null == t ? e : (t += "", function() {
                var n, e = this.getAttribute(u);
                return e !== t && (n = a(e, t), function(t) {
                    this.setAttribute(u, n(t))
                })
            })
        }

        function o(t) {
            return null == t ? r : (t += "", function() {
                var n, e = this.getAttributeNS(u.space, u.local);
                return e !== t && (n = a(e, t), function(t) {
                    this.setAttributeNS(u.space, u.local, n(t))
                })
            })
        }
        if (arguments.length < 2) {
            for (n in t) this.attr(n, t[n]);
            return this
        }
        var a = "transform" == t ? Gr : br,
            u = sa.ns.qualify(t);
        return Zo(this, "attr." + t, n, u.local ? o : i)
    }, Fs.attrTween = function(t, n) {
        function e(t, e) {
            var r = n.call(this, t, e, this.getAttribute(i));
            return r && function(t) {
                this.setAttribute(i, r(t))
            }
        }

        function r(t, e) {
            var r = n.call(this, t, e, this.getAttributeNS(i.space, i.local));
            return r && function(t) {
                this.setAttributeNS(i.space, i.local, r(t))
            }
        }
        var i = sa.ns.qualify(t);
        return this.tween("attr." + t, i.local ? r : e)
    }, Fs.style = function(t, e, r) {
        function i() {
            this.style.removeProperty(t)
        }

        function o(e) {
            return null == e ? i : (e += "", function() {
                var i, o = n(this).getComputedStyle(this, null).getPropertyValue(t);
                return o !== e && (i = br(o, e), function(n) {
                    this.style.setProperty(t, i(n), r)
                })
            })
        }
        var a = arguments.length;
        if (3 > a) {
            if ("string" != typeof t) {
                2 > a && (e = "");
                for (r in t) this.style(r, t[r], e);
                return this
            }
            r = ""
        }
        return Zo(this, "style." + t, e, o)
    }, Fs.styleTween = function(t, e, r) {
        function i(i, o) {
            var a = e.call(this, i, o, n(this).getComputedStyle(this, null).getPropertyValue(t));
            return a && function(n) {
                this.style.setProperty(t, a(n), r)
            }
        }
        return arguments.length < 3 && (r = ""), this.tween("style." + t, i)
    }, Fs.text = function(t) {
        return Zo(this, "text", t, Wo)
    }, Fs.remove = function() {
        var t = this.namespace;
        return this.each("end.transition", function() {
            var n;
            this[t].count < 2 && (n = this.parentNode) && n.removeChild(this)
        })
    }, Fs.ease = function(t) {
        var n = this.id,
            e = this.namespace;
        return arguments.length < 1 ? this.node()[e][n].ease : ("function" != typeof t && (t = sa.ease.apply(sa, arguments)), H(this, function(r) {
            r[e][n].ease = t
        }))
    }, Fs.delay = function(t) {
        var n = this.id,
            e = this.namespace;
        return arguments.length < 1 ? this.node()[e][n].delay : H(this, "function" == typeof t ? function(r, i, o) {
            r[e][n].delay = +t.call(r, r.__data__, i, o)
        } : (t = +t, function(r) {
            r[e][n].delay = t
        }))
    }, Fs.duration = function(t) {
        var n = this.id,
            e = this.namespace;
        return arguments.length < 1 ? this.node()[e][n].duration : H(this, "function" == typeof t ? function(r, i, o) {
            r[e][n].duration = Math.max(1, t.call(r, r.__data__, i, o))
        } : (t = Math.max(1, t), function(r) {
            r[e][n].duration = t
        }))
    }, Fs.each = function(t, n) {
        var e = this.id,
            r = this.namespace;
        if (arguments.length < 2) {
            var i = Us,
                o = Ds;
            try {
                Ds = e, H(this, function(n, i, o) {
                    Us = n[r][e], t.call(n, n.__data__, i, o)
                })
            } finally {
                Us = i, Ds = o
            }
        } else H(this, function(i) {
            var o = i[r][e];
            (o.event || (o.event = sa.dispatch("start", "end", "interrupt"))).on(t, n)
        });
        return this
    }, Fs.transition = function() {
        for (var t, n, e, r, i = this.id, o = ++Hs, a = this.namespace, u = [], s = 0, c = this.length; c > s; s++) {
            u.push(t = []);
            for (var n = this[s], l = 0, f = n.length; f > l; l++)(e = n[l]) && (r = e[a][i], ta(e, l, a, o, {
                time: r.time,
                ease: r.ease,
                delay: r.delay + r.duration,
                duration: r.duration
            })), t.push(e)
        }
        return $o(u, a, o)
    }, sa.svg.axis = function() {
        function t(t) {
            t.each(function() {
                var t, c = sa.select(this),
                    l = this.__chart__ || e,
                    f = this.__chart__ = e.copy(),
                    h = null == s ? f.ticks ? f.ticks.apply(f, u) : f.domain() : s,
                    p = null == n ? f.tickFormat ? f.tickFormat.apply(f, u) : m : n,
                    g = c.selectAll(".tick").data(h, f),
                    d = g.enter().insert("g", ".domain").attr("class", "tick").style("opacity", qa),
                    v = sa.transition(g.exit()).style("opacity", qa).remove(),
                    y = sa.transition(g.order()).style("opacity", 1),
                    b = Math.max(i, 0) + a,
                    x = Vi(f),
                    w = c.selectAll(".domain").data([0]),
                    M = (w.enter().append("path").attr("class", "domain"),
                        sa.transition(w));
                d.append("line"), d.append("text");
                var k, _, S, E, A = d.select("line"),
                    N = y.select("line"),
                    C = g.select("text").text(p),
                    T = d.select("text"),
                    j = y.select("text"),
                    O = "top" === r || "left" === r ? -1 : 1;
                if ("bottom" === r || "top" === r ? (t = na, k = "x", S = "y", _ = "x2", E = "y2", C.attr("dy", 0 > O ? "0em" : ".71em").style("text-anchor", "middle"), M.attr("d", "M" + x[0] + "," + O * o + "V0H" + x[1] + "V" + O * o)) : (t = ea, k = "y", S = "x", _ = "y2", E = "x2", C.attr("dy", ".32em").style("text-anchor", 0 > O ? "end" : "start"), M.attr("d", "M" + O * o + "," + x[0] + "H0V" + x[1] + "H" + O * o)), A.attr(E, O * i), T.attr(S, O * b), N.attr(_, 0).attr(E, O * i), j.attr(k, 0).attr(S, O * b), f.rangeBand) {
                    var P = f,
                        L = P.rangeBand() / 2;
                    l = f = function(t) {
                        return P(t) + L
                    }
                } else l.rangeBand ? l = f : v.call(t, f, l);
                d.call(t, l, f), y.call(t, f, f)
            })
        }
        var n, e = sa.scale.linear(),
            r = Vs,
            i = 6,
            o = 6,
            a = 3,
            u = [10],
            s = null;
        return t.scale = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.orient = function(n) {
            return arguments.length ? (r = n in Ys ? n + "" : Vs, t) : r
        }, t.ticks = function() {
            return arguments.length ? (u = la(arguments), t) : u
        }, t.tickValues = function(n) {
            return arguments.length ? (s = n, t) : s
        }, t.tickFormat = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.tickSize = function(n) {
            var e = arguments.length;
            return e ? (i = +n, o = +arguments[e - 1], t) : i
        }, t.innerTickSize = function(n) {
            return arguments.length ? (i = +n, t) : i
        }, t.outerTickSize = function(n) {
            return arguments.length ? (o = +n, t) : o
        }, t.tickPadding = function(n) {
            return arguments.length ? (a = +n, t) : a
        }, t.tickSubdivide = function() {
            return arguments.length && t
        }, t
    };
    var Vs = "bottom",
        Ys = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
    sa.svg.brush = function() {
        function t(n) {
            n.each(function() {
                var n = sa.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", o).on("touchstart.brush", o),
                    a = n.selectAll(".background").data([0]);
                a.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), n.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var u = n.selectAll(".resize").data(d, m);
                u.exit().remove(), u.enter().append("g").attr("class", function(t) {
                    return "resize " + t
                }).style("cursor", function(t) {
                    return Xs[t]
                }).append("rect").attr("x", function(t) {
                    return /[ew]$/.test(t) ? -3 : null
                }).attr("y", function(t) {
                    return /^[ns]/.test(t) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), u.style("display", t.empty() ? "none" : null);
                var s, f = sa.transition(n),
                    h = sa.transition(a);
                c && (s = Vi(c), h.attr("x", s[0]).attr("width", s[1] - s[0]), r(f)), l && (s = Vi(l), h.attr("y", s[0]).attr("height", s[1] - s[0]), i(f)), e(f)
            })
        }

        function e(t) {
            t.selectAll(".resize").attr("transform", function(t) {
                return "translate(" + f[+/e$/.test(t)] + "," + h[+/^s/.test(t)] + ")"
            })
        }

        function r(t) {
            t.select(".extent").attr("x", f[0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1] - f[0])
        }

        function i(t) {
            t.select(".extent").attr("y", h[0]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0])
        }

        function o() {
            function o() {
                32 == sa.event.keyCode && (C || (b = null, j[0] -= f[1], j[1] -= h[1], C = 2), _())
            }

            function d() {
                32 == sa.event.keyCode && 2 == C && (j[0] += f[1], j[1] += h[1], C = 0, _())
            }

            function v() {
                var t = sa.mouse(w),
                    n = !1;
                x && (t[0] += x[0], t[1] += x[1]), C || (sa.event.altKey ? (b || (b = [(f[0] + f[1]) / 2, (h[0] + h[1]) / 2]), j[0] = f[+(t[0] < b[0])], j[1] = h[+(t[1] < b[1])]) : b = null), A && y(t, c, 0) && (r(S), n = !0), N && y(t, l, 1) && (i(S), n = !0), n && (e(S), k({
                    type: "brush",
                    mode: C ? "move" : "resize"
                }))
            }

            function y(t, n, e) {
                var r, i, o = Vi(n),
                    s = o[0],
                    c = o[1],
                    l = j[e],
                    d = e ? h : f,
                    v = d[1] - d[0];
                return C && (s -= l, c -= v + l), r = (e ? g : p) ? Math.max(s, Math.min(c, t[e])) : t[e], C ? i = (r += l) + v : (b && (l = Math.max(s, Math.min(c, 2 * b[e] - r))), r > l ? (i = r, r = l) : i = l), d[0] != r || d[1] != i ? (e ? u = null : a = null, d[0] = r, d[1] = i, !0) : void 0
            }

            function m() {
                v(), S.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), sa.select("body").style("cursor", null), O.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), T(), k({
                    type: "brushend"
                })
            }
            var b, x, w = this,
                M = sa.select(sa.event.target),
                k = s.of(w, arguments),
                S = sa.select(w),
                E = M.datum(),
                A = !/^(n|s)$/.test(E) && c,
                N = !/^(e|w)$/.test(E) && l,
                C = M.classed("extent"),
                T = J(w),
                j = sa.mouse(w),
                O = sa.select(n(w)).on("keydown.brush", o).on("keyup.brush", d);
            if (sa.event.changedTouches ? O.on("touchmove.brush", v).on("touchend.brush", m) : O.on("mousemove.brush", v).on("mouseup.brush", m), S.interrupt().selectAll("*").interrupt(), C) j[0] = f[0] - j[0], j[1] = h[0] - j[1];
            else if (E) {
                var P = +/w$/.test(E),
                    L = +/^n/.test(E);
                x = [f[1 - P] - j[0], h[1 - L] - j[1]], j[0] = f[P], j[1] = h[L]
            } else sa.event.altKey && (b = j.slice());
            S.style("pointer-events", "none").selectAll(".resize").style("display", null), sa.select("body").style("cursor", M.style("cursor")), k({
                type: "brushstart"
            }), v()
        }
        var a, u, s = E(t, "brushstart", "brush", "brushend"),
            c = null,
            l = null,
            f = [0, 0],
            h = [0, 0],
            p = !0,
            g = !0,
            d = Gs[0];
        return t.event = function(t) {
            t.each(function() {
                var t = s.of(this, arguments),
                    n = {
                        x: f,
                        y: h,
                        i: a,
                        j: u
                    },
                    e = this.__chart__ || n;
                this.__chart__ = n, Ds ? sa.select(this).transition().each("start.brush", function() {
                    a = e.i, u = e.j, f = e.x, h = e.y, t({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var e = xr(f, n.x),
                        r = xr(h, n.y);
                    return a = u = null,
                        function(i) {
                            f = n.x = e(i), h = n.y = r(i), t({
                                type: "brush",
                                mode: "resize"
                            })
                        }
                }).each("end.brush", function() {
                    a = n.i, u = n.j, t({
                        type: "brush",
                        mode: "resize"
                    }), t({
                        type: "brushend"
                    })
                }) : (t({
                    type: "brushstart"
                }), t({
                    type: "brush",
                    mode: "resize"
                }), t({
                    type: "brushend"
                }))
            })
        }, t.x = function(n) {
            return arguments.length ? (c = n, d = Gs[!c << 1 | !l], t) : c
        }, t.y = function(n) {
            return arguments.length ? (l = n, d = Gs[!c << 1 | !l], t) : l
        }, t.clamp = function(n) {
            return arguments.length ? (c && l ? (p = !!n[0], g = !!n[1]) : c ? p = !!n : l && (g = !!n), t) : c && l ? [p, g] : c ? p : l ? g : null
        }, t.extent = function(n) {
            var e, r, i, o, s;
            return arguments.length ? (c && (e = n[0], r = n[1], l && (e = e[0], r = r[0]), a = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (s = e, e = r, r = s), (e != f[0] || r != f[1]) && (f = [e, r])), l && (i = n[0], o = n[1], c && (i = i[1], o = o[1]), u = [i, o], l.invert && (i = l(i), o = l(o)), i > o && (s = i, i = o, o = s), (i != h[0] || o != h[1]) && (h = [i, o])), t) : (c && (a ? (e = a[0], r = a[1]) : (e = f[0], r = f[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (s = e, e = r, r = s))), l && (u ? (i = u[0], o = u[1]) : (i = h[0], o = h[1], l.invert && (i = l.invert(i), o = l.invert(o)), i > o && (s = i, i = o, o = s))), c && l ? [
                [e, i],
                [r, o]
            ] : c ? [e, r] : l && [i, o])
        }, t.clear = function() {
            return t.empty() || (f = [0, 0], h = [0, 0], a = u = null), t
        }, t.empty = function() {
            return !!c && f[0] == f[1] || !!l && h[0] == h[1]
        }, sa.rebind(t, s, "on")
    };
    var Xs = {
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        },
        Gs = [
            ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
            ["e", "w"],
            ["n", "s"],
            []
        ],
        Ks = pu.format = bu.timeFormat,
        Js = Ks.utc,
        $s = Js("%Y-%m-%dT%H:%M:%S.%LZ");
    Ks.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? ra : $s, ra.parse = function(t) {
        var n = new Date(t);
        return isNaN(n) ? null : n
    }, ra.toString = $s.toString, pu.second = Ut(function(t) {
        return new gu(1e3 * Math.floor(t / 1e3))
    }, function(t, n) {
        t.setTime(t.getTime() + 1e3 * Math.floor(n))
    }, function(t) {
        return t.getSeconds()
    }), pu.seconds = pu.second.range, pu.seconds.utc = pu.second.utc.range, pu.minute = Ut(function(t) {
        return new gu(6e4 * Math.floor(t / 6e4))
    }, function(t, n) {
        t.setTime(t.getTime() + 6e4 * Math.floor(n))
    }, function(t) {
        return t.getMinutes()
    }), pu.minutes = pu.minute.range, pu.minutes.utc = pu.minute.utc.range, pu.hour = Ut(function(t) {
        var n = t.getTimezoneOffset() / 60;
        return new gu(36e5 * (Math.floor(t / 36e5 - n) + n))
    }, function(t, n) {
        t.setTime(t.getTime() + 36e5 * Math.floor(n))
    }, function(t) {
        return t.getHours()
    }), pu.hours = pu.hour.range, pu.hours.utc = pu.hour.utc.range, pu.month = Ut(function(t) {
        return t = pu.day(t), t.setDate(1), t
    }, function(t, n) {
        t.setMonth(t.getMonth() + n)
    }, function(t) {
        return t.getMonth()
    }), pu.months = pu.month.range, pu.months.utc = pu.month.utc.range;
    var Zs = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        Ws = [
            [pu.second, 1],
            [pu.second, 5],
            [pu.second, 15],
            [pu.second, 30],
            [pu.minute, 1],
            [pu.minute, 5],
            [pu.minute, 15],
            [pu.minute, 30],
            [pu.hour, 1],
            [pu.hour, 3],
            [pu.hour, 6],
            [pu.hour, 12],
            [pu.day, 1],
            [pu.day, 2],
            [pu.week, 1],
            [pu.month, 1],
            [pu.month, 3],
            [pu.year, 1]
        ],
        Qs = Ks.multi([
            [".%L", function(t) {
                return t.getMilliseconds()
            }],
            [":%S", function(t) {
                return t.getSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getMinutes()
            }],
            ["%I %p", function(t) {
                return t.getHours()
            }],
            ["%a %d", function(t) {
                return t.getDay() && 1 != t.getDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getDate()
            }],
            ["%B", function(t) {
                return t.getMonth()
            }],
            ["%Y", Tn]
        ]),
        tc = {
            range: function(t, n, e) {
                return sa.range(Math.ceil(t / e) * e, +n, e).map(oa)
            },
            floor: m,
            ceil: m
        };
    Ws.year = pu.year, pu.scale = function() {
        return ia(sa.scale.linear(), Ws, Qs)
    };
    var nc = Ws.map(function(t) {
            return [t[0].utc, t[1]]
        }),
        ec = Js.multi([
            [".%L", function(t) {
                return t.getUTCMilliseconds()
            }],
            [":%S", function(t) {
                return t.getUTCSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getUTCMinutes()
            }],
            ["%I %p", function(t) {
                return t.getUTCHours()
            }],
            ["%a %d", function(t) {
                return t.getUTCDay() && 1 != t.getUTCDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getUTCDate()
            }],
            ["%B", function(t) {
                return t.getUTCMonth()
            }],
            ["%Y", Tn]
        ]);
    nc.year = pu.year.utc, pu.scale.utc = function() {
        return ia(sa.scale.linear(), nc, ec)
    }, sa.text = At(function(t) {
        return t.responseText
    }), sa.json = function(t, n) {
        return Nt(t, "application/json", aa, n)
    }, sa.html = function(t, n) {
        return Nt(t, "text/html", ua, n)
    }, sa.xml = At(function(t) {
        return t.responseXML
    }), "function" == typeof define && define.amd ? (this.d3 = sa, define("d3", sa)) : "object" == typeof module && module.exports ? module.exports = sa : this.d3 = sa
}();
var ImageLoader;
ImageLoader = function() {
    function t() {
        this.registered_href = []
    }
    return t.prototype.register = function(t) {
        return this.registered_href.push(t)
    }, t.prototype.load = function(t) {
        var n, e, r, i, o, a, u, s;
        for (s = 0, n = [], a = this.registered_href, u = [], r = 0, o = a.length; o > r; r++) e = a[r], i = new Image, i.onload = function(e) {
            return function() {
                return s++, s + n.length === e.registered_href.length ? (n.length > 0 && console.warn("gv load image fail on " + n.join(", ")), t()) : void 0
            }
        }(this), i.onerror = function(e) {
            return function() {
                return n.push(e.src), s + n.length === e.registered_href.length ? (n.length > 0 && console.warn("load image fail on " + n.join(", ")), t()) : void 0
            }
        }(this), u.push(i.src = e);
        return u
    }, t
}(), d3.selection.prototype.blink = function(t, n) {
    var e, r, i;
    return e = this, r = 0, (i = function() {
        return t > r ? e.transition().duration(n).tween("opacity", function() {
            return function(t) {
                return this.style.opacity = .5 > t ? 1 : 0
            }
        }).each("end", i) : this.style.opacity = 1, r++
    })()
};