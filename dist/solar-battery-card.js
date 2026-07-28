var kt = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const L = globalThis, Z = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = /* @__PURE__ */ Symbol(), st = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Tt = (s) => new yt(typeof s == "string" ? s : s + "", void 0, J), Mt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, o, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[i + 1], s[0]);
  return new yt(e, s, J);
}, Pt = (s, t) => {
  if (Z) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), o = L.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = e.cssText, s.appendChild(r);
  }
}, ot = Z ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Tt(e);
})(s) : s;
const { is: Ut, defineProperty: zt, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: Ot, getOwnPropertySymbols: Rt, getPrototypeOf: Lt } = Object, B = globalThis, it = B.trustedTypes, Dt = it ? it.emptyScript : "", It = B.reactiveElementPolyfillSupport, M = (s, t) => s, K = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Dt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, mt = (s, t) => !Ut(s, t), at = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), B.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, r, e);
      o !== void 0 && zt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: o, set: i } = Nt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const l = o?.call(this);
      i?.call(this, a), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, r = [...Ot(e), ...Rt(e)];
      for (const o of r) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, o] of e) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const o = this._$Eu(e, r);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const o of r) e.unshift(ot(o));
    } else t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Pt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    const r = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : K).toAttribute(e, r.type);
      this._$Em = t, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, o = r._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const i = r.getPropertyOptions(o), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : K;
      this._$Em = o;
      const l = a.fromAttribute(e, i.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, o = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (i = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? mt)(i, e) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: o, wrapped: i }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, i] of r) {
        const { wrapped: a } = i, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, i, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[M("elementProperties")] = /* @__PURE__ */ new Map(), A[M("finalized")] = /* @__PURE__ */ new Map(), It?.({ ReactiveElement: A }), (B.reactiveElementVersions ??= []).push("2.1.2");
const X = globalThis, nt = (s) => s, D = X.trustedTypes, lt = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, _t = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + m, Bt = `<${$t}>`, x = document, U = () => x.createComment(""), z = (s) => s === null || typeof s != "object" && typeof s != "function", Q = Array.isArray, Ft = (s) => Q(s) || typeof s?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, ht = />/g, $ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, pt = /"/g, bt = /^(?:script|style|textarea|title)$/i, vt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), w = vt(1), V = vt(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), v = x.createTreeWalker(x, 129);
function xt(s, t) {
  if (!Q(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, r = [];
  let o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = H;
  for (let l = 0; l < e; l++) {
    const n = s[l];
    let c, h, d = -1, u = 0;
    for (; u < n.length && (a.lastIndex = u, h = a.exec(n), h !== null); ) u = a.lastIndex, a === H ? h[1] === "!--" ? a = ct : h[1] !== void 0 ? a = ht : h[2] !== void 0 ? (bt.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = $) : h[3] !== void 0 && (a = $) : a === $ ? h[0] === ">" ? (a = o ?? H, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? $ : h[3] === '"' ? pt : dt) : a === pt || a === dt ? a = $ : a === ct || a === ht ? a = H : (a = $, o = void 0);
    const g = a === $ && s[l + 1].startsWith("/>") ? " " : "";
    i += a === H ? n + Bt : d >= 0 ? (r.push(c), n.slice(0, d) + _t + n.slice(d) + m + g) : n + m + (d === -2 ? l : g);
  }
  return [xt(s, i + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class N {
  constructor({ strings: t, _$litType$: e }, r) {
    let o;
    this.parts = [];
    let i = 0, a = 0;
    const l = t.length - 1, n = this.parts, [c, h] = jt(t, e);
    if (this.el = N.createElement(c, r), v.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = v.nextNode()) !== null && n.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(_t)) {
          const u = h[a++], g = o.getAttribute(d).split(m), _ = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: i, name: _[2], strings: g, ctor: _[1] === "." ? qt : _[1] === "?" ? Wt : _[1] === "@" ? Gt : F }), o.removeAttribute(d);
        } else d.startsWith(m) && (n.push({ type: 6, index: i }), o.removeAttribute(d));
        if (bt.test(o.tagName)) {
          const d = o.textContent.split(m), u = d.length - 1;
          if (u > 0) {
            o.textContent = D ? D.emptyScript : "";
            for (let g = 0; g < u; g++) o.append(d[g], U()), v.nextNode(), n.push({ type: 2, index: ++i });
            o.append(d[u], U());
          }
        }
      } else if (o.nodeType === 8) if (o.data === $t) n.push({ type: 2, index: i });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(m, d + 1)) !== -1; ) n.push({ type: 7, index: i }), d += m.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const r = x.createElement("template");
    return r.innerHTML = t, r;
  }
}
function C(s, t, e = s, r) {
  if (t === E) return t;
  let o = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const i = z(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== i && (o?._$AO?.(!1), i === void 0 ? o = void 0 : (o = new i(s), o._$AT(s, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = o : e._$Cl = o), o !== void 0 && (t = C(s, o._$AS(s, t.values), o, r)), t;
}
class Vt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, o = (t?.creationScope ?? x).importNode(e, !0);
    v.currentNode = o;
    let i = v.nextNode(), a = 0, l = 0, n = r[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let c;
        n.type === 2 ? c = new O(i, i.nextSibling, this, t) : n.type === 1 ? c = new n.ctor(i, n.name, n.strings, this, t) : n.type === 6 && (c = new Kt(i, this, t)), this._$AV.push(c), n = r[++l];
      }
      a !== n?.index && (i = v.nextNode(), a++);
    }
    return v.currentNode = x, o;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, r, o) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), z(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ft(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, o = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = N.createElement(xt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const i = new Vt(o, this), a = i.u(this.options);
      i.p(e), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new N(t)), e;
  }
  k(t) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, o = 0;
    for (const i of t) o === e.length ? e.push(r = new O(this.O(U()), this.O(U()), this, this.options)) : r = e[o], r._$AI(i), o++;
    o < e.length && (this._$AR(r && r._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = nt(t).nextSibling;
      nt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, o, i) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  _$AI(t, e = this, r, o) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = C(this, t, e, 0), a = !z(t) || t !== this._$AH && t !== E, a && (this._$AH = t);
    else {
      const l = t;
      let n, c;
      for (t = i[0], n = 0; n < i.length - 1; n++) c = C(this, l[r + n], e, n), c === E && (c = this._$AH[n]), a ||= !z(c) || c !== this._$AH[n], c === p ? t = p : t !== p && (t += (c ?? "") + i[n + 1]), this._$AH[n] = c;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Wt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Gt extends F {
  constructor(t, e, r, o, i) {
    super(t, e, r, o, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? p) === E) return;
    const r = this._$AH, o = t === p && r !== p || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== p && (r === p || o);
    o && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Yt = X.litHtmlPolyfillSupport;
Yt?.(N, O), (X.litHtmlVersions ??= []).push("3.3.3");
const Zt = (s, t, e) => {
  const r = e?.renderBefore ?? t;
  let o = r._$litPart$;
  if (o === void 0) {
    const i = e?.renderBefore ?? null;
    r._$litPart$ = o = new O(t.insertBefore(U(), i), i, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
const tt = globalThis;
class P extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Zt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
P._$litElement$ = !0, P.finalized = !0, tt.litElementHydrateSupport?.({ LitElement: P });
const Jt = tt.litElementPolyfillSupport;
Jt?.({ LitElement: P });
(tt.litElementVersions ??= []).push("4.2.2");
const Xt = Mt`
  :host {
    display: block;
    color: var(--primary-text-color, #111522);
    font-family: var(
      --paper-font-body1_-_font-family,
      ui-sans-serif,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif
    );
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    display: block;
    overflow: hidden;
    padding: 18px;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: var(
      --ha-card-box-shadow,
      0 10px 28px rgba(25, 37, 55, 0.11)
    );
  }

  .card {
    container-type: inline-size;
  }

  .header,
  .title-group,
  .status,
  .charge-line,
  .section-heading,
  .legend,
  .footer {
    display: flex;
    align-items: center;
  }

  .header {
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 14px;
  }

  .title-group {
    min-width: 0;
    gap: 14px;
  }

  .icon-tile {
    display: grid;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 11px;
    color: var(--info-color, #1976d2);
    background: color-mix(in srgb, var(--info-color, #1976d2) 10%, transparent);
  }

  .icon-tile svg {
    width: 25px;
    height: 25px;
    fill: currentColor;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    color: var(--primary-text-color, #101521);
    font-size: 21px;
    font-weight: 720;
    line-height: 1.15;
    letter-spacing: -0.35px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    margin-top: 4px;
    color: var(--secondary-text-color, #687286);
    font-size: 14px;
  }

  .status {
    gap: 8px;
    flex: 0 0 auto;
    padding: 9px 14px;
    border-radius: 999px;
    color: var(--success-color, #27863a);
    background: color-mix(
      in srgb,
      var(--success-color, #2d963f) 11%,
      var(--ha-card-background, #fff)
    );
    font-size: 13px;
    font-weight: 700;
  }

  .status.discharging {
    color: var(--warning-color, #d97706);
    background: color-mix(
      in srgb,
      var(--warning-color, #d97706) 11%,
      var(--ha-card-background, #fff)
    );
  }

  .status.idle {
    color: var(--secondary-text-color, #687286);
    background: color-mix(
      in srgb,
      var(--secondary-text-color, #687286) 9%,
      var(--ha-card-background, #fff)
    );
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }

  .battery-hero {
    display: grid;
    grid-template-columns: minmax(132px, 1fr) minmax(155px, 1.7fr);
    align-items: center;
    gap: 13px 24px;
    padding: 15px 20px 13px;
    border: 1px solid
      color-mix(in srgb, var(--success-color, #2d963f) 28%, transparent);
    border-radius: 11px;
    background: color-mix(
      in srgb,
      var(--success-color, #2d963f) 4%,
      var(--ha-card-background, #fff)
    );
  }

  .percentage {
    color: var(--primary-text-color, #101521);
    font-size: 54px;
    font-weight: 780;
    line-height: 0.95;
    letter-spacing: -3px;
  }

  .percentage span {
    margin-left: 3px;
    font-size: 27px;
    letter-spacing: -1px;
  }

  .forecast {
    display: block;
    margin-top: 8px;
    color: var(--success-color, #2d963f);
    font-size: 16px;
    line-height: 1.2;
  }

  .battery-graphic {
    position: relative;
    width: 100%;
    max-width: 220px;
    height: 66px;
    margin-left: auto;
  }

  .battery-shell {
    position: absolute;
    inset: 0 10px 0 0;
    overflow: hidden;
    padding: 7px;
    border: 3px solid var(--primary-text-color, #2f394c);
    border-radius: 11px;
  }

  .battery-fill {
    height: 100%;
    border-radius: 5px;
    background: var(--success-color, #2d963f);
    transition: width 300ms ease;
  }

  .battery-cap {
    position: absolute;
    right: 0;
    top: 22px;
    width: 11px;
    height: 23px;
    border-radius: 0 4px 4px 0;
    background: var(--primary-text-color, #2f394c);
  }

  .charge-line {
    grid-column: 1 / -1;
    justify-content: space-between;
    gap: 18px;
    padding-top: 12px;
    border-top: 1px solid
      color-mix(in srgb, var(--success-color, #2d963f) 18%, transparent);
    color: var(--secondary-text-color, #687286);
    font-size: 16px;
  }

  .charge-line strong {
    color: var(--primary-text-color, #101521);
    font-size: 25px;
    letter-spacing: -0.7px;
    white-space: nowrap;
  }

  .power-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 18px 1px 16px;
    border-bottom: 1px solid var(--divider-color, #e2e5e9);
  }

  .power-stat {
    min-width: 0;
    padding: 0 7px;
    text-align: center;
  }

  .power-stat + .power-stat {
    border-left: 1px solid var(--divider-color, #e2e5e9);
  }

  .power-stat span,
  .power-stat strong,
  .energy-stat span,
  .energy-stat strong {
    display: block;
  }

  .power-stat span {
    font-size: 14px;
    font-weight: 700;
  }

  .power-stat strong {
    margin-top: 5px;
    color: var(--primary-text-color, #101521);
    font-size: 19px;
    letter-spacing: -0.35px;
    white-space: nowrap;
  }

  .solar {
    color: var(--warning-color, #df8700);
  }

  .home {
    color: #6d35c4;
  }

  .battery {
    color: var(--success-color, #2d963f);
  }

  .export {
    color: var(--info-color, #1976d2);
  }

  .chart-section {
    padding: 12px 9px 13px;
  }

  .section-heading {
    justify-content: space-between;
    gap: 16px;
  }

  .section-heading h2 {
    font-size: 14px;
    font-weight: 750;
  }

  .section-heading time,
  .chart-axis,
  .legend {
    color: var(--secondary-text-color, #687286);
  }

  .section-heading time {
    font-size: 13px;
  }

  .chart-wrap {
    height: 126px;
    margin-top: 10px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color, #e5e8ed);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .zero-line {
    stroke: var(--secondary-text-color, #687286);
    stroke-width: 1.5;
    stroke-opacity: 0.55;
    vector-effect: non-scaling-stroke;
  }

  .chart-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .chart-line.solar {
    stroke: var(--warning-color, #df8700);
  }

  .end-dot.solar {
    fill: var(--warning-color, #df8700);
  }

  .chart-line.home {
    stroke: #6d35c4;
  }

  .end-dot.home {
    fill: #6d35c4;
  }

  .chart-line.battery {
    stroke: var(--success-color, #2d963f);
  }

  .end-dot.battery {
    fill: var(--success-color, #2d963f);
  }

  .chart-line.battery {
    stroke-dasharray: 7 7;
  }

  .chart-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 11px;
  }

  .legend {
    gap: clamp(24px, 10cqw, 64px);
    margin-top: 12px;
    font-size: 12px;
  }

  .legend span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend i {
    width: 19px;
    height: 3px;
    border-radius: 3px;
    background: currentColor;
  }

  .legend .battery i {
    background: repeating-linear-gradient(
      90deg,
      currentColor 0 8px,
      transparent 8px 13px
    );
  }

  .energy-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid var(--divider-color, #e2e5e9);
    border-bottom: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat {
    display: flex;
    min-height: 65px;
    align-items: center;
    gap: 14px;
    padding: 10px 17px;
  }

  .energy-stat:nth-child(odd) {
    border-right: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat:nth-child(n + 3) {
    border-top: 1px solid var(--divider-color, #e2e5e9);
  }

  .energy-stat i {
    width: 3px;
    height: 43px;
    flex: 0 0 auto;
    border-radius: 3px;
    background: currentColor;
  }

  .energy-stat span {
    color: var(--secondary-text-color, #687286);
    font-size: 12px;
  }

  .energy-stat strong {
    margin-top: 3px;
    color: var(--primary-text-color, #101521);
    font-size: 19px;
    letter-spacing: -0.35px;
  }

  .footer {
    gap: 14px;
    padding-top: 14px;
    color: var(--success-color, #2d963f);
  }

  .footer span:last-child {
    color: var(--secondary-text-color, #687286);
    font-size: 12px;
    line-height: 1.35;
  }

  .history-note {
    margin: 8px 0 -2px;
    color: var(--secondary-text-color, #687286);
    font-size: 11px;
    text-align: right;
  }

  @container (max-width: 430px) {
    ha-card {
      padding: 14px;
    }

    .header {
      gap: 9px;
    }

    .title-group {
      gap: 10px;
    }

    h1 {
      font-size: 19px;
    }

    .subtitle {
      font-size: 12px;
    }

    .status {
      padding: 8px 10px;
      font-size: 12px;
    }

    .battery-hero {
      gap: 13px;
      padding-inline: 15px;
    }

    .percentage {
      font-size: 49px;
    }

    .battery-graphic {
      height: 59px;
    }

    .battery-cap {
      top: 19px;
      height: 22px;
    }

    .power-stat {
      padding-inline: 4px;
    }

    .power-stat span {
      font-size: 12px;
    }

    .power-stat strong {
      font-size: 16px;
    }
  }

  @container (max-width: 335px) {
    .battery-hero {
      grid-template-columns: 1fr;
    }

    .battery-graphic {
      width: 90%;
      max-width: none;
      margin-inline: auto;
    }

    .power-stats {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 14px;
    }

    .power-stat:nth-child(3) {
      border-left: 0;
    }

    .energy-stats {
      grid-template-columns: 1fr;
    }

    .energy-stat:nth-child(odd) {
      border-right: 0;
    }

    .energy-stat + .energy-stat {
      border-top: 1px solid var(--divider-color, #e2e5e9);
    }
  }
`, Qt = {
  title: "Solar & storage",
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0
}, te = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], wt = {
  title: "Title",
  battery_soc: "Battery state of charge",
  solar_power: "Solar power",
  home_power: "Home power",
  battery_power: "Battery power",
  grid_power: "Grid power",
  solar_energy_today: "Solar energy today",
  home_energy_today: "Home energy today",
  battery_energy_today: "Battery energy stored today",
  export_energy_today: "Grid energy exported today",
  battery_capacity: "Usable battery capacity",
  battery_positive_is_charging: "Positive battery power means charging",
  grid_positive_is_export: "Positive grid power means export",
  show_power_chart: "Show 24-hour power chart"
}, ee = {
  battery_capacity: "Optional. Used to estimate when the battery will be full.",
  battery_positive_is_charging: "Turn this off if your integration reports charging as a negative value.",
  grid_positive_is_export: "Turn this off if your integration reports grid export as a negative value."
};
function re() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: "Live power",
        flatten: !0,
        schema: [
          {
            type: "grid",
            name: "",
            flatten: !0,
            column_min_width: "220px",
            schema: [
              { name: "battery_soc", required: !0, selector: { entity: { domain: "sensor" } } },
              { name: "solar_power", required: !0, selector: { entity: { domain: "sensor" } } },
              { name: "home_power", required: !0, selector: { entity: { domain: "sensor" } } },
              { name: "battery_power", required: !0, selector: { entity: { domain: "sensor" } } },
              { name: "grid_power", required: !0, selector: { entity: { domain: "sensor" } } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Daily energy",
        flatten: !0,
        schema: [
          {
            type: "grid",
            name: "",
            flatten: !0,
            column_min_width: "220px",
            schema: [
              { name: "solar_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "home_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "battery_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "export_energy_today", selector: { entity: { domain: "sensor" } } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Behaviour",
        flatten: !0,
        schema: [
          {
            name: "battery_capacity",
            selector: { number: { min: 0, max: 500, step: 0.1, unit_of_measurement: "kWh" } }
          },
          { name: "battery_positive_is_charging", selector: { boolean: {} } },
          { name: "grid_positive_is_export", selector: { boolean: {} } },
          { name: "show_power_chart", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (s) => s.name ? wt[s.name] : void 0,
    computeHelper: (s) => s.name ? ee[s.name] : void 0,
    assertConfig: (s) => At(s)
  };
}
function At(s) {
  for (const t of te)
    if (!s[t] || typeof s[t] != "string")
      throw new Error(`${wt[t]} is required.`);
}
function St(s) {
  return {
    ...Qt,
    ...s,
    type: s.type || "custom:solar-battery-card"
  };
}
function k(s, t, e) {
  return s ? Object.values(s.states).find((o) => {
    if (o.attributes.device_class !== t) return !1;
    const i = `${o.entity_id} ${o.attributes.friendly_name ?? ""}`.toLowerCase();
    return e.some((a) => i.includes(a));
  })?.entity_id ?? "" : "";
}
function se(s) {
  return St({
    type: "custom:solar-battery-card",
    battery_soc: k(s, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: k(s, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: k(s, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: k(s, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: k(s, "power", ["grid"]) || "sensor.grid_power"
  });
}
const oe = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function et(s) {
  if (!s || oe.has(s.state.toLowerCase())) return;
  const t = Number(s.state);
  return Number.isFinite(t) ? t : void 0;
}
function T(s) {
  const t = et(s);
  if (t === void 0) return;
  const e = s?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return e === "w" ? t / 1e3 : e === "mw" ? t / 1e6 : t;
}
function R(s) {
  const t = et(s);
  if (t === void 0) return;
  const e = s?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return e === "wh" ? t / 1e3 : e === "mwh" ? t * 1e3 : t;
}
function q(s, t, e = {}) {
  if (s === void 0) return "—";
  const r = e.digits ?? 2;
  return `${new Intl.NumberFormat(e.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: e.signed ? "exceptZero" : "auto"
  }).format(s)} ${t}`;
}
function y(s, t) {
  return t && s ? s.states[t] : void 0;
}
function ie(s, t, e, r = /* @__PURE__ */ new Date()) {
  if (s === void 0 || !e || e <= 0 || t <= 0 || s >= 100)
    return;
  const o = (100 - s) / 100 * e;
  return new Date(r.getTime() + o / t * 60 * 60 * 1e3);
}
const ae = 24, gt = 24;
function W(s, t) {
  return s.find((e) => e.some((r) => r.entity_id === t)) ?? [];
}
function ft(s, t) {
  return s ? T({
    ...s,
    attributes: {
      ...t?.attributes,
      ...s.attributes
    }
  }) ?? 0 : 0;
}
function G(s, t, e) {
  if (s.length === 0) return 0;
  let r = s[0], o = s.at(-1) ?? s[0];
  for (const h of s) {
    const d = Date.parse(h.last_changed ?? h.last_updated ?? "");
    if (Number.isFinite(d) && (d <= t && (r = h), d >= t)) {
      o = h;
      break;
    }
  }
  const i = Date.parse(r.last_changed ?? r.last_updated ?? ""), a = Date.parse(o.last_changed ?? o.last_updated ?? ""), l = ft(r, e), n = ft(o, e);
  if (!Number.isFinite(i) || !Number.isFinite(a) || i === a)
    return l;
  const c = Math.min(
    1,
    Math.max(0, (t - i) / (a - i))
  );
  return l + (n - l) * c;
}
async function ne(s, t, e = /* @__PURE__ */ new Date()) {
  const r = e, o = new Date(r.getTime() - ae * 60 * 60 * 1e3), i = [t.solar, t.home, t.battery], a = `history/period/${encodeURIComponent(o.toISOString())}?end_time=${encodeURIComponent(r.toISOString())}&filter_entity_id=${encodeURIComponent(i.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, l = await s.callApi("GET", a), n = W(l, t.solar), c = W(l, t.home), h = W(l, t.battery);
  return Array.from({ length: gt }, (d, u) => {
    const g = o.getTime() + u / (gt - 1) * (r.getTime() - o.getTime());
    return {
      timestamp: g,
      solar: Math.max(0, G(n, g, s.states[t.solar])),
      home: Math.max(0, G(c, g, s.states[t.home])),
      battery: G(h, g, s.states[t.battery])
    };
  });
}
const b = 480, S = 126, le = 300 * 1e3;
function ce(s, t, e) {
  return Math.min(e, Math.max(t, s));
}
function he(s, t, e, r) {
  if (s.length === 0) return [];
  const o = Math.max(0.1, r - e);
  return s.map((i, a) => [
    a / Math.max(1, s.length - 1) * b,
    4 + (r - i[t]) / o * (S - 8)
  ]);
}
function de(s) {
  return s.length === 0 ? "" : s.length === 1 ? `M 0 ${s[0][1]} L ${b} ${s[0][1]}` : s.slice(1).reduce((t, [e, r], o) => {
    const [i, a] = s[o], l = (i + e) / 2;
    return `${t} C ${l} ${a}, ${l} ${r}, ${e} ${r}`;
  }, `M ${s[0][0]} ${s[0][1]}`);
}
function pe(s, t, e, r = Date.now()) {
  const o = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], i = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], a = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return o.map((l, n) => ({
    timestamp: r - (o.length - 1 - n) * 2.4 * 60 * 60 * 1e3,
    solar: l * Math.max(s, 0.1),
    home: i[n] * Math.max(t, 0.1),
    battery: a[n] * e
  }));
}
const I = class I extends P {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static getConfigForm() {
    return re();
  }
  static getStubConfig(t) {
    return se(t);
  }
  setConfig(t) {
    At(t), this._config = St({ ...t });
  }
  getCardSize() {
    return this._config?.show_power_chart === !1 ? 8 : 12;
  }
  getGridOptions() {
    return {
      rows: this._config?.show_power_chart === !1 ? 8 : 11,
      columns: 12,
      min_rows: 7,
      min_columns: 6
    };
  }
  updated(t) {
    (t.has("hass") || t.has("_config")) && queueMicrotask(() => {
      this._loadHistoryIfNeeded();
    });
  }
  async _loadHistoryIfNeeded() {
    const t = this._config, e = this.hass;
    if (!t || !e || t.show_power_chart === !1) return;
    const r = [t.solar_power, t.home_power, t.battery_power].join("|"), o = Date.now();
    if (!(this._historyLoading || r === this._lastHistoryKey && o - this._lastHistoryFetch < le)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = r, this._lastHistoryFetch = o;
      try {
        this._history = await ne(e, {
          solar: t.solar_power,
          home: t.home_power,
          battery: t.battery_power
        });
      } catch {
        this._history = [], this._historyFailed = !0;
      } finally {
        this._historyLoading = !1;
      }
    }
  }
  _renderChart(t) {
    const e = t.flatMap((n) => [
      n.solar,
      n.home,
      n.battery
    ]), r = Math.min(0, ...e), o = Math.max(
      0.1,
      ...e
    ), i = Math.max(0.1, o - r), a = 4 + o / i * (S - 8), l = ["solar", "home", "battery"].map((n) => {
      const c = he(t, n, r, o);
      return {
        key: n,
        path: de(c),
        end: c.at(-1) ?? [b, S]
      };
    });
    return w`
      <div class="chart-wrap">
        <svg
          viewBox="0 0 ${b} ${S}"
          role="img"
          aria-label="Solar, home and battery power for the past 24 hours"
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((n) => {
      const c = n / 3 * S;
      return V`<line class="grid-line" x1="0" y1=${c} x2=${b} y2=${c}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((n) => {
      const c = n / 4 * b;
      return V`<line class="grid-line" x1=${c} y1="0" x2=${c} y2=${S}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${a}
            x2=${b}
            y2=${a}
          ></line>
          ${l.map(
      ({ key: n, path: c, end: h }) => V`
              <path class="chart-line ${n}" d=${c}></path>
              <circle class="end-dot ${n}" cx=${h[0]} cy=${h[1]} r="4.5"></circle>
            `
    )}
        </svg>
      </div>
    `;
  }
  render() {
    const t = this._config;
    if (!t) return p;
    const e = this.hass, r = e?.locale?.language ?? e?.language, o = ce(
      et(y(e, t.battery_soc)) ?? 0,
      0,
      100
    ), i = Math.max(0, T(y(e, t.solar_power)) ?? 0), a = Math.max(0, T(y(e, t.home_power)) ?? 0), l = T(y(e, t.battery_power)) ?? 0, n = T(y(e, t.grid_power)) ?? 0, c = t.battery_positive_is_charging === !1 ? -1 : 1, h = c * l, d = (t.grid_positive_is_export === !1 ? -1 : 1) * n, u = h > 0.05 ? "charging" : h < -0.05 ? "discharging" : "idle", g = u === "charging" ? "Charging" : u === "discharging" ? "Discharging" : "Idle", _ = ie(
      o,
      Math.max(0, h),
      t.battery_capacity
    ), rt = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }), Et = this._history.length > 1 ? this._history.map((f) => ({
      ...f,
      battery: c * f.battery
    })) : pe(i, a, h), Ct = [
      {
        label: "Generated",
        value: R(y(e, t.solar_energy_today)),
        tone: "solar"
      },
      {
        label: "Consumed",
        value: R(y(e, t.home_energy_today)),
        tone: "home"
      },
      {
        label: "Stored",
        value: R(y(e, t.battery_energy_today)),
        tone: "battery"
      },
      {
        label: "Exported",
        value: R(y(e, t.export_energy_today)),
        tone: "export"
      }
    ], Ht = i >= a && h > 0.05 && d > 0.05 ? "Solar covering home, charging battery and exporting" : i >= a && h > 0.05 ? "Solar covering home and charging the battery" : i >= a ? "Solar covering the current home load" : "Home load is drawing from battery or grid";
    return w`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${kt}></path></svg>
              </div>
              <div>
                <h1>${t.title || "Solar & storage"}</h1>
                <p class="subtitle">Battery outlook <span aria-hidden="true">·</span> Today</p>
              </div>
            </div>
            <div class="status ${u}">
              <span class="dot"></span>
              ${g}
            </div>
          </header>

          <section class="battery-hero" aria-label="Battery status">
            <div>
              <div class="percentage">${Math.round(o)}<span>%</span></div>
              <strong class="forecast">
                ${_ ? `Full by ${rt.format(_)}` : u === "charging" ? "Charging now" : g}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label="Battery ${Math.round(o)} percent charged"
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${o}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${u === "charging" ? "Charging battery" : u === "discharging" ? "Supplying home" : "Battery idle"}
              </span>
              <strong>
                ${q(h, "kW", {
      signed: !0,
      locale: r
    })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label="Current power">
            ${[
      { label: "Solar", value: i, tone: "solar", signed: !1 },
      { label: "Home", value: a, tone: "home", signed: !1 },
      { label: "Battery", value: h, tone: "battery", signed: !0 },
      { label: "Export", value: d, tone: "export", signed: !1 }
    ].map(
      (f) => w`
                <div class="power-stat ${f.tone}">
                  <span>${f.label}</span>
                  <strong>
                    ${q(f.value, "kW", {
        signed: f.signed,
        locale: r
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${t.show_power_chart === !1 ? p : w`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>Power · 24 hours</h2>
                    <time>${rt.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(Et)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>24h ago</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>Now</span>
                  </div>
                  <div class="legend" aria-label="Chart legend">
                    <span class="solar"><i></i>Solar</span>
                    <span class="home"><i></i>Home</span>
                    <span class="battery"><i></i>Battery</span>
                  </div>
                  ${this._historyFailed ? w`<p class="history-note">Live history unavailable · showing current profile</p>` : p}
                </section>
              `}

          <section class="energy-stats" aria-label="Energy today">
            ${Ct.map(
      (f) => w`
                <div class="energy-stat ${f.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${f.label}</span>
                    <strong>${q(f.value, "kWh", { digits: 1, locale: r })}</strong>
                  </div>
                </div>
              `
    )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${Ht}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
I.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 }
}, I.styles = Xt;
let Y = I;
customElements.get("solar-battery-card") || customElements.define("solar-battery-card", Y);
window.customCards = window.customCards || [];
window.customCards.some((s) => s.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: "A battery-first solar, power and daily energy overview."
});
export {
  Y as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
