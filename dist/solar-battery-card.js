var Tt = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const V = globalThis, et = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = /* @__PURE__ */ Symbol(), nt = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (o) => new bt(typeof o == "string" ? o : o + "", void 0, rt), Ut = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((r, s, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[i + 1], o[0]);
  return new bt(e, o, rt);
}, zt = (o, t) => {
  if (et) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), s = V.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = e.cssText, o.appendChild(r);
  }
}, lt = et ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Pt(e);
})(o) : o;
const { is: It, defineProperty: Rt, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: Ot, getOwnPropertySymbols: Lt, getPrototypeOf: Dt } = Object, G = globalThis, ct = G.trustedTypes, Bt = ct ? ct.emptyScript : "", Ft = G.reactiveElementPolyfillSupport, z = (o, t) => o, Q = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Bt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, $t = (o, t) => !It(o, t), ht = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), G.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let C = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, r, e);
      s !== void 0 && Rt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: s, set: i } = Nt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const c = s?.call(this);
      i?.call(this, a), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = Dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, r = [...Ot(e), ...Lt(e)];
      for (const s of r) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, s] of e) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const s = this._$Eu(e, r);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) e.unshift(lt(s));
    } else t !== void 0 && e.push(lt(t));
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
    return zt(t, this.constructor.elementStyles), t;
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
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : Q).toAttribute(e, r.type);
      this._$Em = t, i == null ? this.removeAttribute(s) : this.setAttribute(s, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const i = r.getPropertyOptions(s), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Q;
      this._$Em = s;
      const c = a.fromAttribute(e, i.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, s = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (i = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? $t)(i, e) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: s, wrapped: i }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, i] of this._$Ep) this[s] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, i] of r) {
        const { wrapped: a } = i, c = this[s];
        a !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, i, c);
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[z("elementProperties")] = /* @__PURE__ */ new Map(), C[z("finalized")] = /* @__PURE__ */ new Map(), Ft?.({ ReactiveElement: C }), (G.reactiveElementVersions ??= []).push("2.1.2");
const ot = globalThis, dt = (o) => o, q = ot.trustedTypes, pt = q ? q.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, wt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + $, jt = `<${At}>`, E = document, R = () => E.createComment(""), N = (o) => o === null || typeof o != "object" && typeof o != "function", st = Array.isArray, Vt = (o) => st(o) || typeof o?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, gt = />/g, w = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, mt = /"/g, St = /^(?:script|style|textarea|title)$/i, Et = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), x = Et(1), T = Et(2), k = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), S = E.createTreeWalker(E, 129);
function Ct(o, t) {
  if (!st(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const qt = (o, t) => {
  const e = o.length - 1, r = [];
  let s, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = M;
  for (let c = 0; c < e; c++) {
    const n = o[c];
    let d, l, h = -1, u = 0;
    for (; u < n.length && (a.lastIndex = u, l = a.exec(n), l !== null); ) u = a.lastIndex, a === M ? l[1] === "!--" ? a = ut : l[1] !== void 0 ? a = gt : l[2] !== void 0 ? (St.test(l[2]) && (s = RegExp("</" + l[2], "g")), a = w) : l[3] !== void 0 && (a = w) : a === w ? l[0] === ">" ? (a = s ?? M, h = -1) : l[1] === void 0 ? h = -2 : (h = a.lastIndex - l[2].length, d = l[1], a = l[3] === void 0 ? w : l[3] === '"' ? mt : ft) : a === mt || a === ft ? a = w : a === ut || a === gt ? a = M : (a = w, s = void 0);
    const f = a === w && o[c + 1].startsWith("/>") ? " " : "";
    i += a === M ? n + jt : h >= 0 ? (r.push(d), n.slice(0, h) + wt + n.slice(h) + $ + f) : n + $ + (h === -2 ? c : f);
  }
  return [Ct(o, i + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class O {
  constructor({ strings: t, _$litType$: e }, r) {
    let s;
    this.parts = [];
    let i = 0, a = 0;
    const c = t.length - 1, n = this.parts, [d, l] = qt(t, e);
    if (this.el = O.createElement(d, r), S.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = S.nextNode()) !== null && n.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(wt)) {
          const u = l[a++], f = s.getAttribute(h).split($), _ = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: i, name: _[2], strings: f, ctor: _[1] === "." ? Gt : _[1] === "?" ? Kt : _[1] === "@" ? Xt : K }), s.removeAttribute(h);
        } else h.startsWith($) && (n.push({ type: 6, index: i }), s.removeAttribute(h));
        if (St.test(s.tagName)) {
          const h = s.textContent.split($), u = h.length - 1;
          if (u > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let f = 0; f < u; f++) s.append(h[f], R()), S.nextNode(), n.push({ type: 2, index: ++i });
            s.append(h[u], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === At) n.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = s.data.indexOf($, h + 1)) !== -1; ) n.push({ type: 7, index: i }), h += $.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const r = E.createElement("template");
    return r.innerHTML = t, r;
  }
}
function H(o, t, e = o, r) {
  if (t === k) return t;
  let s = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const i = N(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== i && (s?._$AO?.(!1), i === void 0 ? s = void 0 : (s = new i(o), s._$AT(o, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = s : e._$Cl = s), s !== void 0 && (t = H(o, s._$AS(o, t.values), s, r)), t;
}
class Wt {
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
    const { el: { content: e }, parts: r } = this._$AD, s = (t?.creationScope ?? E).importNode(e, !0);
    S.currentNode = s;
    let i = S.nextNode(), a = 0, c = 0, n = r[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new L(i, i.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(i, n.name, n.strings, this, t) : n.type === 6 && (d = new Yt(i, this, t)), this._$AV.push(d), n = r[++c];
      }
      a !== n?.index && (i = S.nextNode(), a++);
    }
    return S.currentNode = E, s;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, r, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = H(this, t, e), N(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = O.createElement(Ct(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const i = new Wt(s, this), a = i.u(this.options);
      i.p(e), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, s = 0;
    for (const i of t) s === e.length ? e.push(r = new L(this.O(R()), this.O(R()), this, this.options)) : r = e[s], r._$AI(i), s++;
    s < e.length && (this._$AR(r && r._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = dt(t).nextSibling;
      dt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, s, i) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, e = this, r, s) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = H(this, t, e, 0), a = !N(t) || t !== this._$AH && t !== k, a && (this._$AH = t);
    else {
      const c = t;
      let n, d;
      for (t = i[0], n = 0; n < i.length - 1; n++) d = H(this, c[r + n], e, n), d === k && (d = this._$AH[n]), a ||= !N(d) || d !== this._$AH[n], d === g ? t = g : t !== g && (t += (d ?? "") + i[n + 1]), this._$AH[n] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Kt extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Xt extends K {
  constructor(t, e, r, s, i) {
    super(t, e, r, s, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? g) === k) return;
    const r = this._$AH, s = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== g && (r === g || s);
    s && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Yt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const Zt = ot.litHtmlPolyfillSupport;
Zt?.(O, L), (ot.litHtmlVersions ??= []).push("3.3.3");
const Jt = (o, t, e) => {
  const r = e?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const i = e?.renderBefore ?? null;
    r._$litPart$ = s = new L(t.insertBefore(R(), i), i, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
const it = globalThis;
class I extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
I._$litElement$ = !0, I.finalized = !0, it.litElementHydrateSupport?.({ LitElement: I });
const Qt = it.litElementPolyfillSupport;
Qt?.({ LitElement: I });
(it.litElementVersions ??= []).push("4.2.2");
const te = Ut`
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
    position: relative;
    height: 126px;
    margin-top: 10px;
    border-radius: 5px;
    outline: none;
    touch-action: pan-y;
    user-select: none;
  }

  .chart-wrap:focus-visible {
    outline: 2px solid var(--info-color, #1976d2);
    outline-offset: 3px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
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

  .inspection-line {
    stroke: var(--primary-text-color, #101521);
    stroke-dasharray: 3 4;
    stroke-opacity: 0.45;
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
  }

  .inspection-dot {
    stroke: var(--ha-card-background, var(--card-background-color, #fff));
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .inspection-dot.solar {
    fill: var(--warning-color, #df8700);
  }

  .inspection-dot.home {
    fill: #6d35c4;
  }

  .inspection-dot.battery {
    fill: var(--success-color, #2d963f);
  }

  .chart-tooltip {
    position: absolute;
    z-index: 2;
    top: 8px;
    width: 166px;
    padding: 9px 10px;
    border: 1px solid
      color-mix(in srgb, var(--primary-text-color, #101521) 14%, transparent);
    border-radius: 10px;
    color: var(--primary-text-color, #101521);
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color, #fff)) 94%,
      transparent
    );
    box-shadow: 0 7px 22px rgba(18, 26, 42, 0.18);
    pointer-events: none;
    transform: translateX(-50%);
    backdrop-filter: blur(8px);
  }

  .chart-tooltip.align-left {
    transform: translateX(0);
  }

  .chart-tooltip.align-right {
    transform: translateX(-100%);
  }

  .chart-tooltip time {
    display: block;
    margin-bottom: 5px;
    color: var(--secondary-text-color, #687286);
    font-size: 10px;
    font-weight: 700;
  }

  .tooltip-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 11px;
  }

  .tooltip-item + .tooltip-item {
    margin-top: 4px;
  }

  .tooltip-item span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
  }

  .tooltip-item i {
    width: 7px;
    height: 7px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: currentColor;
  }

  .tooltip-item strong {
    color: var(--primary-text-color, #101521);
    font-size: 11px;
    white-space: nowrap;
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
`, ee = {
  title: "Solar & storage",
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0
}, re = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], kt = {
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
}, oe = {
  battery_capacity: "Optional. Used to estimate when the battery will be full.",
  battery_positive_is_charging: "Turn this off if your integration reports charging as a negative value.",
  grid_positive_is_export: "Turn this off if your integration reports grid export as a negative value."
};
function se() {
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
    computeLabel: (o) => o.name ? kt[o.name] : void 0,
    computeHelper: (o) => o.name ? oe[o.name] : void 0,
    assertConfig: (o) => Ht(o)
  };
}
function Ht(o) {
  for (const t of re)
    if (!o[t] || typeof o[t] != "string")
      throw new Error(`${kt[t]} is required.`);
}
function Mt(o) {
  return {
    ...ee,
    ...o,
    type: o.type || "custom:solar-battery-card"
  };
}
function P(o, t, e) {
  return o ? Object.values(o.states).find((s) => {
    if (s.attributes.device_class !== t) return !1;
    const i = `${s.entity_id} ${s.attributes.friendly_name ?? ""}`.toLowerCase();
    return e.some((a) => i.includes(a));
  })?.entity_id ?? "" : "";
}
function ie(o) {
  return Mt({
    type: "custom:solar-battery-card",
    battery_soc: P(o, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: P(o, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: P(o, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: P(o, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: P(o, "power", ["grid"]) || "sensor.grid_power"
  });
}
function ae(o, t, e, r) {
  if (r <= 1 || e <= 0) return 0;
  const s = Math.min(1, Math.max(0, (o - t) / e));
  return Math.round(s * (r - 1));
}
function ne(o, t) {
  return t <= 1 ? 0 : Math.min(t - 1, Math.max(0, o)) / (t - 1) * 100;
}
const le = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function at(o) {
  if (!o || le.has(o.state.toLowerCase())) return;
  const t = Number(o.state);
  return Number.isFinite(t) ? t : void 0;
}
function U(o) {
  const t = at(o);
  if (t === void 0) return;
  const e = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return e === "w" ? t / 1e3 : e === "mw" ? t / 1e6 : t;
}
function F(o) {
  const t = at(o);
  if (t === void 0) return;
  const e = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return e === "wh" ? t / 1e3 : e === "mwh" ? t * 1e3 : t;
}
function j(o, t, e = {}) {
  if (o === void 0) return "—";
  const r = e.digits ?? 2;
  return `${new Intl.NumberFormat(e.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: e.signed ? "exceptZero" : "auto"
  }).format(o)} ${t}`;
}
function v(o, t) {
  return t && o ? o.states[t] : void 0;
}
function ce(o, t, e, r = /* @__PURE__ */ new Date()) {
  if (o === void 0 || !e || e <= 0 || t <= 0 || o >= 100)
    return;
  const s = (100 - o) / 100 * e;
  return new Date(r.getTime() + s / t * 60 * 60 * 1e3);
}
const he = 24, _t = 24;
function Y(o, t) {
  return o.find((e) => e.some((r) => r.entity_id === t)) ?? [];
}
function vt(o, t) {
  return o ? U({
    ...o,
    attributes: {
      ...t?.attributes,
      ...o.attributes
    }
  }) ?? 0 : 0;
}
function Z(o, t, e) {
  if (o.length === 0) return 0;
  let r = o[0], s = o.at(-1) ?? o[0];
  for (const l of o) {
    const h = Date.parse(l.last_changed ?? l.last_updated ?? "");
    if (Number.isFinite(h) && (h <= t && (r = l), h >= t)) {
      s = l;
      break;
    }
  }
  const i = Date.parse(r.last_changed ?? r.last_updated ?? ""), a = Date.parse(s.last_changed ?? s.last_updated ?? ""), c = vt(r, e), n = vt(s, e);
  if (!Number.isFinite(i) || !Number.isFinite(a) || i === a)
    return c;
  const d = Math.min(
    1,
    Math.max(0, (t - i) / (a - i))
  );
  return c + (n - c) * d;
}
async function de(o, t, e = /* @__PURE__ */ new Date()) {
  const r = e, s = new Date(r.getTime() - he * 60 * 60 * 1e3), i = [t.solar, t.home, t.battery], a = `history/period/${encodeURIComponent(s.toISOString())}?end_time=${encodeURIComponent(r.toISOString())}&filter_entity_id=${encodeURIComponent(i.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, c = await o.callApi("GET", a), n = Y(c, t.solar), d = Y(c, t.home), l = Y(c, t.battery);
  return Array.from({ length: _t }, (h, u) => {
    const f = s.getTime() + u / (_t - 1) * (r.getTime() - s.getTime());
    return {
      timestamp: f,
      solar: Math.max(0, Z(n, f, o.states[t.solar])),
      home: Math.max(0, Z(d, f, o.states[t.home])),
      battery: Z(l, f, o.states[t.battery])
    };
  });
}
const b = 480, A = 126, pe = 300 * 1e3;
function J(o, t, e) {
  return Math.min(e, Math.max(t, o));
}
function xt(o, t, e, r) {
  if (o.length === 0) return [];
  const s = Math.max(0.1, r - e);
  return o.map((i, a) => [
    a / Math.max(1, o.length - 1) * b,
    4 + (r - i[t]) / s * (A - 8)
  ]);
}
function ue(o) {
  return o.length === 0 ? "" : o.length === 1 ? `M 0 ${o[0][1]} L ${b} ${o[0][1]}` : o.slice(1).reduce((t, [e, r], s) => {
    const [i, a] = o[s], c = (i + e) / 2;
    return `${t} C ${c} ${a}, ${c} ${r}, ${e} ${r}`;
  }, `M ${o[0][0]} ${o[0][1]}`);
}
function ge(o, t, e, r = Date.now()) {
  const s = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], i = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], a = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return s.map((c, n) => ({
    timestamp: r - (s.length - 1 - n) * 2.4 * 60 * 60 * 1e3,
    solar: c * Math.max(o, 0.1),
    home: i[n] * Math.max(t, 0.1),
    battery: a[n] * e
  }));
}
const W = class W extends I {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static getConfigForm() {
    return se();
  }
  static getStubConfig(t) {
    return ie(t);
  }
  setConfig(t) {
    Ht(t), this._config = Mt({ ...t });
  }
  getCardSize() {
    return this._config?.show_power_chart === !1 ? 8 : 12;
  }
  getGridOptions() {
    return {
      columns: 12,
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
    const r = [t.solar_power, t.home_power, t.battery_power].join("|"), s = Date.now();
    if (!(this._historyLoading || r === this._lastHistoryKey && s - this._lastHistoryFetch < pe)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = r, this._lastHistoryFetch = s;
      try {
        this._history = await de(e, {
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
  _inspectChart(t, e) {
    const r = t.currentTarget.getBoundingClientRect(), s = ae(
      t.clientX,
      r.left,
      r.width,
      e
    );
    s !== this._activeChartIndex && (this._activeChartIndex = s);
  }
  _leaveChart(t) {
    t.pointerType === "mouse" && (this._activeChartIndex = void 0);
  }
  _navigateChart(t, e) {
    if (t.key === "Escape") {
      this._activeChartIndex = void 0;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key)) return;
    t.preventDefault();
    const r = this._activeChartIndex ?? e - 1;
    this._activeChartIndex = t.key === "Home" ? 0 : t.key === "End" ? e - 1 : J(r + (t.key === "ArrowLeft" ? -1 : 1), 0, e - 1);
  }
  _renderChart(t, e) {
    const r = t.flatMap((p) => [
      p.solar,
      p.home,
      p.battery
    ]), s = Math.min(0, ...r), i = Math.max(
      0.1,
      ...r
    ), a = Math.max(0.1, i - s), c = 4 + i / a * (A - 8), n = ["solar", "home", "battery"].map((p) => {
      const m = xt(t, p, s, i);
      return {
        key: p,
        path: ue(m),
        end: m.at(-1) ?? [b, A]
      };
    }), d = this._activeChartIndex === void 0 ? void 0 : J(this._activeChartIndex, 0, t.length - 1), l = d === void 0 ? void 0 : t[d], h = d === void 0 ? void 0 : d / Math.max(1, t.length - 1) * b, u = d === void 0 ? void 0 : ne(d, t.length), f = d === void 0 ? [] : ["solar", "home", "battery"].map((p) => ({
      key: p,
      coordinate: xt(t, p, s, i)[d]
    })), _ = u === void 0 ? "" : u < 34 ? "align-left" : u > 66 ? "align-right" : "", D = l ? new Intl.DateTimeFormat(e, {
      hour: "numeric",
      minute: "2-digit"
    }).format(l.timestamp) : "";
    return x`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label="Inspect solar, home and battery power history"
        @pointerdown=${(p) => this._inspectChart(p, t.length)}
        @pointermove=${(p) => this._inspectChart(p, t.length)}
        @pointerleave=${this._leaveChart}
        @keydown=${(p) => this._navigateChart(p, t.length)}
        @blur=${() => {
      this._activeChartIndex = void 0;
    }}
      >
        <svg
          viewBox="0 0 ${b} ${A}"
          role="img"
          aria-label="Solar, home and battery power for the past 24 hours"
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((p) => {
      const m = p / 3 * A;
      return T`<line class="grid-line" x1="0" y1=${m} x2=${b} y2=${m}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((p) => {
      const m = p / 4 * b;
      return T`<line class="grid-line" x1=${m} y1="0" x2=${m} y2=${A}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${c}
            x2=${b}
            y2=${c}
          ></line>
          ${n.map(
      ({ key: p, path: m, end: B }) => T`
              <path class="chart-line ${p}" d=${m}></path>
              <circle class="end-dot ${p}" cx=${B[0]} cy=${B[1]} r="4.5"></circle>
            `
    )}
          ${h === void 0 ? g : T`
                <line
                  class="inspection-line"
                  x1=${h}
                  y1="0"
                  x2=${h}
                  y2=${A}
                ></line>
                ${f.map(
      ({ key: p, coordinate: m }) => T`
                    <circle
                      class="inspection-dot ${p}"
                      cx=${m[0]}
                      cy=${m[1]}
                      r="5"
                    ></circle>
                  `
    )}
              `}
        </svg>
        ${l && u !== void 0 ? x`
              <div
                class="chart-tooltip ${_}"
                style="left: ${u}%"
                aria-live="polite"
              >
                <time>${D}</time>
                ${[
      { key: "solar", label: "Solar", value: l.solar, signed: !1 },
      { key: "home", label: "Home", value: l.home, signed: !1 },
      {
        key: "battery",
        label: "Battery",
        value: l.battery,
        signed: !0
      }
    ].map(
      (p) => x`
                    <div class="tooltip-item ${p.key}">
                      <span><i></i>${p.label}</span>
                      <strong>
                        ${j(p.value, "kW", {
        signed: p.signed,
        locale: e
      })}
                      </strong>
                    </div>
                  `
    )}
              </div>
            ` : g}
      </div>
    `;
  }
  render() {
    const t = this._config;
    if (!t) return g;
    const e = this.hass, r = e?.locale?.language ?? e?.language, s = J(
      at(v(e, t.battery_soc)) ?? 0,
      0,
      100
    ), i = Math.max(0, U(v(e, t.solar_power)) ?? 0), a = Math.max(0, U(v(e, t.home_power)) ?? 0), c = U(v(e, t.battery_power)) ?? 0, n = U(v(e, t.grid_power)) ?? 0, d = t.battery_positive_is_charging === !1 ? -1 : 1, l = d * c, h = (t.grid_positive_is_export === !1 ? -1 : 1) * n, u = l > 0.05 ? "charging" : l < -0.05 ? "discharging" : "idle", f = u === "charging" ? "Charging" : u === "discharging" ? "Discharging" : "Idle", _ = ce(
      s,
      Math.max(0, l),
      t.battery_capacity
    ), D = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }), p = this._history.length > 1 ? this._history.map((y) => ({
      ...y,
      battery: d * y.battery
    })) : ge(i, a, l), m = [
      {
        label: "Generated",
        value: F(v(e, t.solar_energy_today)),
        tone: "solar"
      },
      {
        label: "Consumed",
        value: F(v(e, t.home_energy_today)),
        tone: "home"
      },
      {
        label: "Stored",
        value: F(v(e, t.battery_energy_today)),
        tone: "battery"
      },
      {
        label: "Exported",
        value: F(v(e, t.export_energy_today)),
        tone: "export"
      }
    ], B = i >= a && l > 0.05 && h > 0.05 ? "Solar covering home, charging battery and exporting" : i >= a && l > 0.05 ? "Solar covering home and charging the battery" : i >= a ? "Solar covering the current home load" : "Home load is drawing from battery or grid";
    return x`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${Tt}></path></svg>
              </div>
              <div>
                <h1>${t.title || "Solar & storage"}</h1>
                <p class="subtitle">Battery outlook <span aria-hidden="true">·</span> Today</p>
              </div>
            </div>
            <div class="status ${u}">
              <span class="dot"></span>
              ${f}
            </div>
          </header>

          <section class="battery-hero" aria-label="Battery status">
            <div>
              <div class="percentage">${Math.round(s)}<span>%</span></div>
              <strong class="forecast">
                ${_ ? `Full by ${D.format(_)}` : u === "charging" ? "Charging now" : f}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label="Battery ${Math.round(s)} percent charged"
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${s}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${u === "charging" ? "Charging battery" : u === "discharging" ? "Supplying home" : "Battery idle"}
              </span>
              <strong>
                ${j(l, "kW", {
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
      { label: "Battery", value: l, tone: "battery", signed: !0 },
      { label: "Export", value: h, tone: "export", signed: !1 }
    ].map(
      (y) => x`
                <div class="power-stat ${y.tone}">
                  <span>${y.label}</span>
                  <strong>
                    ${j(y.value, "kW", {
        signed: y.signed,
        locale: r
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${t.show_power_chart === !1 ? g : x`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>Power · 24 hours</h2>
                    <time>${D.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(p, r)}
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
                  ${this._historyFailed ? x`<p class="history-note">Live history unavailable · showing current profile</p>` : g}
                </section>
              `}

          <section class="energy-stats" aria-label="Energy today">
            ${m.map(
      (y) => x`
                <div class="energy-stat ${y.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${y.label}</span>
                    <strong>${j(y.value, "kWh", { digits: 1, locale: r })}</strong>
                  </div>
                </div>
              `
    )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${B}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
W.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 }
}, W.styles = te;
let tt = W;
customElements.get("solar-battery-card") || customElements.define("solar-battery-card", tt);
window.customCards = window.customCards || [];
window.customCards.some((o) => o.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: "A battery-first solar, power and daily energy overview."
});
export {
  tt as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
