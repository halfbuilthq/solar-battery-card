var De = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const j = globalThis, ae = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ne = /* @__PURE__ */ Symbol(), pe = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== ne) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ae && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (o) => new Ce(typeof o == "string" ? o : o + "", void 0, ne), ke = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((r, i, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[s + 1], o[0]);
  return new Ce(t, o, ne);
}, Re = (o, e) => {
  if (ae) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = j.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, o.appendChild(r);
  }
}, ue = ae ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Oe(t);
})(o) : o;
const { is: Be, defineProperty: Fe, getOwnPropertyDescriptor: We, getOwnPropertyNames: je, getOwnPropertySymbols: Ve, getPrototypeOf: qe } = Object, K = globalThis, ge = K.trustedTypes, Ge = ge ? ge.emptyScript : "", Ke = K.reactiveElementPolyfillSupport, U = (o, e) => o, re = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Ge : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, He = (o, e) => !Be(o, e), fe = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: He };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Fe(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = We(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const c = i?.call(this);
      s?.call(this, a), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, r = [...je(t), ...Ve(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(ue(i));
    } else e !== void 0 && t.push(ue(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Re(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : re).toAttribute(t, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : re;
      this._$Em = i;
      const c = a.fromAttribute(t, s.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? He)(s, t) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: s }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, s] of r) {
        const { wrapped: a } = s, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, s, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[U("elementProperties")] = /* @__PURE__ */ new Map(), k[U("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: k }), (K.reactiveElementVersions ??= []).push("2.1.2");
const le = globalThis, ye = (o) => o, V = le.trustedTypes, _e = V ? V.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Pe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ze = "?" + $, Ye = `<${ze}>`, C = document, D = () => C.createComment(""), O = (o) => o === null || typeof o != "object" && typeof o != "function", ce = Array.isArray, Xe = (o) => ce(o) || typeof o?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, be = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, xe = /"/g, Me = /^(?:script|style|textarea|title)$/i, Te = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), b = Te(1), T = Te(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function Le(o, e) {
  if (!ce(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _e !== void 0 ? _e.createHTML(e) : e;
}
const Ze = (o, e) => {
  const t = o.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = M;
  for (let c = 0; c < t; c++) {
    const l = o[c];
    let p, d, h = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, d = a.exec(l), d !== null); ) f = a.lastIndex, a === M ? d[1] === "!--" ? a = me : d[1] !== void 0 ? a = be : d[2] !== void 0 ? (Me.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = A) : d[3] !== void 0 && (a = A) : a === A ? d[0] === ">" ? (a = i ?? M, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, p = d[1], a = d[3] === void 0 ? A : d[3] === '"' ? xe : ve) : a === xe || a === ve ? a = A : a === me || a === be ? a = M : (a = A, i = void 0);
    const y = a === A && o[c + 1].startsWith("/>") ? " " : "";
    s += a === M ? l + Ye : h >= 0 ? (r.push(p), l.slice(0, h) + Pe + l.slice(h) + $ + y) : l + $ + (h === -2 ? c : y);
  }
  return [Le(o, s + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class R {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const c = e.length - 1, l = this.parts, [p, d] = Ze(e, t);
    if (this.el = R.createElement(p, r), S.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = S.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Pe)) {
          const f = d[a++], y = i.getAttribute(h).split($), x = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: x[2], strings: y, ctor: x[1] === "." ? Qe : x[1] === "?" ? et : x[1] === "@" ? tt : Y }), i.removeAttribute(h);
        } else h.startsWith($) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Me.test(i.tagName)) {
          const h = i.textContent.split($), f = h.length - 1;
          if (f > 0) {
            i.textContent = V ? V.emptyScript : "";
            for (let y = 0; y < f; y++) i.append(h[y], D()), S.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[f], D());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ze) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf($, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += $.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = C.createElement("template");
    return r.innerHTML = e, r;
  }
}
function z(o, e, t = o, r) {
  if (e === P) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const s = O(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(o), i._$AT(o, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = z(o, i._$AS(o, e.values), i, r)), e;
}
class Je {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? C).importNode(t, !0);
    S.currentNode = i;
    let s = S.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new F(s, s.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (p = new rt(s, this, e)), this._$AV.push(p), l = r[++c];
      }
      a !== l?.index && (s = S.nextNode(), a++);
    }
    return S.currentNode = C, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = z(this, e, t), O(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Xe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = R.createElement(Le(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const s = new Je(i, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = we.get(e.strings);
    return t === void 0 && we.set(e.strings, t = new R(e)), t;
  }
  k(e) {
    ce(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new F(this.O(D()), this.O(D()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = ye(e).nextSibling;
      ye(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = z(this, e, t, 0), a = !O(e) || e !== this._$AH && e !== P, a && (this._$AH = e);
    else {
      const c = e;
      let l, p;
      for (e = s[0], l = 0; l < s.length - 1; l++) p = z(this, c[r + l], t, l), p === P && (p = this._$AH[l]), a ||= !O(p) || p !== this._$AH[l], p === g ? e = g : e !== g && (e += (p ?? "") + s[l + 1]), this._$AH[l] = p;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qe extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class et extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class tt extends Y {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = z(this, e, t, 0) ?? g) === P) return;
    const r = this._$AH, i = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const ot = le.litHtmlPolyfillSupport;
ot?.(R, F), (le.litHtmlVersions ??= []).push("3.3.3");
const it = (o, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = t?.renderBefore ?? null;
    r._$litPart$ = i = new F(e.insertBefore(D(), s), s, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
const de = globalThis;
class H extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = it(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
H._$litElement$ = !0, H.finalized = !0, de.litElementHydrateSupport?.({ LitElement: H });
const st = de.litElementPolyfillSupport;
st?.({ LitElement: H });
(de.litElementVersions ??= []).push("4.2.2");
const at = ke`
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
      var(--ha-card-background, var(--card-background-color, #fff))
    );
    font-size: 13px;
    font-weight: 700;
  }

  .status.discharging {
    color: var(--warning-color, #d97706);
    background: color-mix(
      in srgb,
      var(--warning-color, #d97706) 11%,
      var(--ha-card-background, var(--card-background-color, #fff))
    );
  }

  .status.idle {
    color: var(--secondary-text-color, #687286);
    background: color-mix(
      in srgb,
      var(--secondary-text-color, #687286) 9%,
      var(--ha-card-background, var(--card-background-color, #fff))
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
      var(--ha-card-background, var(--card-background-color, #fff))
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
  .energy-stat > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .solar-forecast {
    margin-top: 4px;
    line-height: 1.4;
  }

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
    backdrop-filter: blur(8px);
  }

  .chart-tooltip.place-right {
    margin-left: 14px;
  }

  .chart-tooltip.place-left {
    margin-left: -14px;
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

  .energy-stat > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .solar-forecast {
    margin-top: 4px;
    line-height: 1.4;
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
`, Ie = {
  "card.default_title": "Solar & storage",
  "card.subtitle": "Battery outlook",
  "card.today": "Today",
  "status.charging": "Charging",
  "status.discharging": "Discharging",
  "status.idle": "Idle",
  "battery.aria_status": "Battery status",
  "battery.full_by": "Full by {time}",
  "battery.charging_now": "Charging now",
  "battery.aria_graphic": "Battery {percent} percent charged",
  "battery.charging": "Charging battery",
  "battery.supplying": "Supplying home",
  "battery.idle": "Battery idle",
  "power.aria": "Current power",
  "power.solar": "Solar",
  "power.home": "Home",
  "power.battery": "Battery",
  "power.export": "Export",
  "chart.heading": "Power · 24 hours",
  "chart.aria": "Inspect solar, home and battery power history",
  "chart.svg_aria": "Solar, home and battery power for the past 24 hours",
  "chart.axis_start": "24h ago",
  "chart.axis_now": "Now",
  "chart.legend_aria": "Chart legend",
  "chart.history_unavailable": "Live history unavailable · showing current profile",
  "energy.aria": "Energy today",
  "energy.generated": "Generated",
  "energy.forecast_today": "Forecast today",
  "editor.field.solar_forecast_today": "Solar forecast today",
  "editor.helper.solar_forecast_today": "Optional full-day forecast energy in Wh, kWh or MWh. Choose total today, not remaining today or forecast power.",
  "editor.error.forecast_entity": "Solar forecast today must be a sensor entity ID.",
  "energy.consumed": "Consumed",
  "energy.stored": "Stored",
  "energy.exported": "Exported",
  "footer.solar_home_battery_export": "Solar covering home, charging battery and exporting",
  "footer.solar_home_battery": "Solar covering home and charging the battery",
  "footer.solar_home": "Solar covering the current home load",
  "footer.drawing": "Home load is drawing from battery or grid",
  "editor.section.live_power": "Live power",
  "editor.section.daily_energy": "Daily energy",
  "editor.section.behaviour": "Behaviour",
  "editor.field.title": "Title",
  "editor.field.power_unit": "Power display unit",
  "editor.field.energy_unit": "Energy display unit",
  "editor.error.unit": "{field} must use one of the listed units.",
  "editor.field.battery_soc": "Battery state of charge",
  "editor.field.solar_power": "Solar power",
  "editor.field.home_power": "Home power",
  "editor.field.battery_power": "Battery power",
  "editor.field.grid_power": "Grid power",
  "editor.field.solar_energy_today": "Solar energy today",
  "editor.field.home_energy_today": "Home energy today",
  "editor.field.battery_energy_today": "Battery energy stored today",
  "editor.field.export_energy_today": "Grid energy exported today",
  "editor.field.battery_capacity": "Usable battery capacity",
  "editor.field.battery_positive_is_charging": "Positive battery power means charging",
  "editor.field.grid_positive_is_export": "Positive grid power means export",
  "editor.field.show_power_chart": "Show 24-hour power chart",
  "editor.helper.battery_capacity": "Optional. Used to estimate when the battery will be full.",
  "editor.helper.battery_positive_is_charging": "Turn this off if your integration reports charging as a negative value.",
  "editor.helper.grid_positive_is_export": "Turn this off if your integration reports grid export as a negative value.",
  "editor.error.required": "{field} is required."
}, nt = {
  "card.default_title": "Solar & Speicher",
  "card.subtitle": "Batterie-Prognose",
  "card.today": "Heute",
  "status.charging": "Lädt",
  "status.discharging": "Entlädt",
  "status.idle": "Bereit",
  "battery.aria_status": "Batteriestatus",
  "battery.full_by": "Voll um {time}",
  "battery.charging_now": "Lädt gerade",
  "battery.aria_graphic": "Batterie zu {percent} Prozent geladen",
  "battery.charging": "Batterie wird geladen",
  "battery.supplying": "Versorgt das Haus",
  "battery.idle": "Batterie im Leerlauf",
  "power.aria": "Aktuelle Leistung",
  "power.solar": "Solar",
  "power.home": "Haus",
  "power.battery": "Batterie",
  "power.export": "Einspeisung",
  "chart.heading": "Leistung · 24 Stunden",
  "chart.aria": "Verlauf von Solar-, Haus- und Batterieleistung untersuchen",
  "chart.svg_aria": "Solar-, Haus- und Batterieleistung der letzten 24 Stunden",
  "chart.axis_start": "vor 24 h",
  "chart.axis_now": "Jetzt",
  "chart.legend_aria": "Diagrammlegende",
  "chart.history_unavailable": "Verlauf nicht verfügbar · aktuelles Profil wird gezeigt",
  "energy.aria": "Energie heute",
  "energy.generated": "Erzeugt",
  "energy.forecast_today": "Prognose heute",
  "editor.field.solar_forecast_today": "Solarprognose heute",
  "editor.helper.solar_forecast_today": "Optionale Energieprognose für den gesamten Tag in Wh, kWh oder MWh. Nicht die verbleibende Energie oder eine Leistungsprognose auswählen.",
  "editor.error.forecast_entity": "Solarprognose heute muss die Entitäts-ID eines Sensors sein.",
  "energy.consumed": "Verbraucht",
  "energy.stored": "Gespeichert",
  "energy.exported": "Eingespeist",
  "footer.solar_home_battery_export": "Solar deckt das Haus, lädt die Batterie und speist ein",
  "footer.solar_home_battery": "Solar deckt das Haus und lädt die Batterie",
  "footer.solar_home": "Solar deckt den aktuellen Hausverbrauch",
  "footer.drawing": "Hausverbrauch wird aus Batterie oder Netz gedeckt",
  "editor.section.live_power": "Aktuelle Leistung",
  "editor.section.daily_energy": "Tagesenergie",
  "editor.section.behaviour": "Verhalten",
  "editor.field.title": "Titel",
  "editor.field.power_unit": "Anzeigeeinheit für Leistung",
  "editor.field.energy_unit": "Anzeigeeinheit für Energie",
  "editor.error.unit": "{field} muss eine der aufgeführten Einheiten verwenden.",
  "editor.field.battery_soc": "Batterieladestand",
  "editor.field.solar_power": "Solarleistung",
  "editor.field.home_power": "Hausverbrauch",
  "editor.field.battery_power": "Batterieleistung",
  "editor.field.grid_power": "Netzleistung",
  "editor.field.solar_energy_today": "Solarenergie heute",
  "editor.field.home_energy_today": "Hausverbrauch heute",
  "editor.field.battery_energy_today": "Heute in die Batterie geladen",
  "editor.field.export_energy_today": "Heute ins Netz eingespeist",
  "editor.field.battery_capacity": "Nutzbare Batteriekapazität",
  "editor.field.battery_positive_is_charging": "Positive Batterieleistung bedeutet Laden",
  "editor.field.grid_positive_is_export": "Positive Netzleistung bedeutet Einspeisung",
  "editor.field.show_power_chart": "24-Stunden-Diagramm anzeigen",
  "editor.helper.battery_capacity": "Optional. Dient der Schätzung, wann die Batterie voll ist.",
  "editor.helper.battery_positive_is_charging": "Deaktivieren, wenn deine Integration das Laden als negativen Wert meldet.",
  "editor.helper.grid_positive_is_export": "Deaktivieren, wenn deine Integration die Einspeisung als negativen Wert meldet.",
  "editor.error.required": "{field} ist erforderlich."
}, lt = {
  en: Ie,
  de: nt
};
function ct(o) {
  if (!o) return "en";
  const [e] = o.toLowerCase().split(/[-_]/);
  return e || "en";
}
function n(o, e, t) {
  const r = ct(e), i = lt[r]?.[o] ?? Ie[o];
  return t ? Object.entries(t).reduce(
    (s, [a, c]) => s.split(`{${a}}`).join(String(c)),
    i
  ) : i;
}
const dt = {
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0,
  power_unit: "kW",
  energy_unit: "kWh"
}, ht = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], pt = [
  "title",
  "power_unit",
  "energy_unit",
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power",
  "solar_energy_today",
  "solar_forecast_today",
  "home_energy_today",
  "battery_energy_today",
  "export_energy_today",
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
], ut = [
  "solar_forecast_today",
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export"
];
function gt(o) {
  return pt.includes(o);
}
function ft(o) {
  return ut.includes(o);
}
function oe(o, e) {
  return n(`editor.field.${o}`, e);
}
function yt(o, e) {
  return n(`editor.helper.${o}`, e);
}
function _t(o) {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: n("editor.section.live_power", o),
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
        title: n("editor.section.daily_energy", o),
        flatten: !0,
        schema: [
          {
            type: "grid",
            name: "",
            flatten: !0,
            column_min_width: "220px",
            schema: [
              { name: "solar_energy_today", selector: { entity: { domain: "sensor" } } },
              { name: "solar_forecast_today", selector: { entity: { domain: "sensor" } } },
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
        title: n("editor.section.behaviour", o),
        flatten: !0,
        schema: [
          { name: "power_unit", selector: { select: { options: ["W", "kW"] } } },
          { name: "energy_unit", selector: { select: { options: ["Wh", "kWh"] } } },
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
    computeLabel: (e) => e.name && gt(e.name) ? oe(e.name, o) : void 0,
    computeHelper: (e) => e.name && ft(e.name) ? yt(e.name, o) : void 0,
    assertConfig: (e) => Ne(e, o)
  };
}
function Ne(o, e) {
  o = B(o);
  for (const [t, r] of [["power_unit", ["W", "kW"]], ["energy_unit", ["Wh", "kWh"]]])
    if (!r.includes(o[t]))
      throw new Error(n("editor.error.unit", e, { field: oe(t, e) }));
  if (o.solar_forecast_today !== void 0 && (typeof o.solar_forecast_today != "string" || !/^sensor\.[a-z0-9_]+$/.test(o.solar_forecast_today)))
    throw new Error(n("editor.error.forecast_entity", e));
  for (const t of ht)
    if (!o[t] || typeof o[t] != "string")
      throw new Error(
        n("editor.error.required", e, {
          field: oe(t, e)
        })
      );
}
function mt(o, e) {
  return o.title !== void 0 ? o.title : n("card.default_title", e);
}
function B(o) {
  const e = { ...o };
  for (const t of ["power_unit", "energy_unit", "solar_forecast_today"]) {
    const r = e[t];
    (r == null || r === "") && delete e[t];
  }
  return {
    ...dt,
    ...e,
    type: o.type || "custom:solar-battery-card"
  };
}
function L(o, e, t) {
  return o ? Object.values(o.states).find((i) => {
    if (i.attributes.device_class !== e) return !1;
    const s = `${i.entity_id} ${i.attributes.friendly_name ?? ""}`.toLowerCase();
    return t.some((a) => s.includes(a));
  })?.entity_id ?? "" : "";
}
function bt(o) {
  return B({
    type: "custom:solar-battery-card",
    battery_soc: L(o, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: L(o, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: L(o, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: L(o, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: L(o, "power", ["grid"]) || "sensor.grid_power"
  });
}
async function vt() {
  if (customElements.get("ha-form")) return;
  if (await (await (await window.loadCardHelpers?.())?.createCardElement({ type: "button" }))?.constructor?.getConfigElement?.(), !customElements.get("ha-form"))
    throw new Error("Home Assistant's form editor is unavailable.");
}
const q = class q extends H {
  setConfig(e) {
    this.getLocalizedForm().assertConfig(e), this._config = B(e), this._error = void 0;
  }
  getLocalizedForm() {
    const e = this.hass?.locale?.language ?? this.hass?.language;
    return _t(e);
  }
  render() {
    if (!this.hass || !this._config) return g;
    const e = this.getLocalizedForm();
    return b`
      ${this._error ? b`<p role="alert">${this._error}</p>` : g}
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e.schema}
        .computeLabel=${e.computeLabel}
        .computeHelper=${e.computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(e) {
    e.stopPropagation();
    const t = B(e.detail.value);
    this._config = t;
    try {
      this.getLocalizedForm().assertConfig(t), this._error = void 0;
    } catch (r) {
      this._error = r.message;
      return;
    }
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: t }
      })
    );
  }
};
q.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 }
}, q.styles = ke`
    :host {
      display: block;
    }
  `;
let ie = q;
function xt(o, e, t, r) {
  if (r <= 1 || t <= 0) return 0;
  const i = Math.min(1, Math.max(0, (o - e) / t));
  return Math.round(i * (r - 1));
}
function wt(o, e) {
  return e <= 1 ? 0 : Math.min(e - 1, Math.max(0, o)) / (e - 1) * 100;
}
function $t(o, e, t, r, i = 166, s = 88, a = 14) {
  const c = Math.min(t, Math.max(0, o)), l = Math.min(
    Math.max(4, r - s - 4),
    Math.max(4, e - s / 2)
  );
  return {
    x: c,
    top: l,
    placement: c + a + i > t ? "place-left" : "place-right"
  };
}
const At = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function he(o) {
  if (!o || At.has(o.state.toLowerCase())) return;
  const e = Number(o.state);
  return Number.isFinite(e) ? e : void 0;
}
function I(o) {
  const e = he(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "w" ? e / 1e3 : t === "mw" ? e / 1e6 : e;
}
function N(o) {
  const e = he(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "wh" ? e / 1e3 : t === "mwh" ? e * 1e3 : e;
}
function Ue(o, e, t = {}) {
  if (o === void 0) return "—";
  const r = t.digits ?? 2;
  return `${new Intl.NumberFormat(t.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: t.signed ? "exceptZero" : "auto"
  }).format(o)} ${e}`;
}
function v(o, e) {
  return e && o ? o.states[e] : void 0;
}
function Et(o, e, t, r = /* @__PURE__ */ new Date()) {
  if (o === void 0 || !t || t <= 0 || e <= 0 || o >= 100)
    return;
  const i = (100 - o) / 100 * t;
  return new Date(r.getTime() + i / e * 60 * 60 * 1e3);
}
function J(o, e = "kW", t = {}) {
  return Ue(o === void 0 ? void 0 : o * (e === "W" ? 1e3 : 1), e, {
    ...t,
    digits: e === "W" ? 0 : 2
  });
}
function $e(o, e = "kWh", t) {
  return Ue(o === void 0 ? void 0 : o * (e === "Wh" ? 1e3 : 1), e, {
    locale: t,
    digits: e === "Wh" ? 0 : 1
  });
}
function St(o) {
  const e = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  if (!e || !["wh", "kwh", "mwh"].includes(e) || !o?.state.trim()) return;
  const t = N(o);
  return t !== void 0 && Number.isFinite(t) && t >= 0 ? t : void 0;
}
const Ct = 24, Ae = 24;
function Q(o, e) {
  return o.find((t) => t.some((r) => r.entity_id === e)) ?? [];
}
function Ee(o, e) {
  return o ? I({
    ...o,
    attributes: {
      ...e?.attributes,
      ...o.attributes
    }
  }) ?? 0 : 0;
}
function ee(o, e, t) {
  if (o.length === 0) return 0;
  let r = o[0], i = o.at(-1) ?? o[0];
  for (const d of o) {
    const h = Date.parse(d.last_changed ?? d.last_updated ?? "");
    if (Number.isFinite(h) && (h <= e && (r = d), h >= e)) {
      i = d;
      break;
    }
  }
  const s = Date.parse(r.last_changed ?? r.last_updated ?? ""), a = Date.parse(i.last_changed ?? i.last_updated ?? ""), c = Ee(r, t), l = Ee(i, t);
  if (!Number.isFinite(s) || !Number.isFinite(a) || s === a)
    return c;
  const p = Math.min(
    1,
    Math.max(0, (e - s) / (a - s))
  );
  return c + (l - c) * p;
}
async function kt(o, e, t = /* @__PURE__ */ new Date()) {
  const r = t, i = new Date(r.getTime() - Ct * 60 * 60 * 1e3), s = [e.solar, e.home, e.battery], a = `history/period/${encodeURIComponent(i.toISOString())}?end_time=${encodeURIComponent(r.toISOString())}&filter_entity_id=${encodeURIComponent(s.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, c = await o.callApi("GET", a), l = Q(c, e.solar), p = Q(c, e.home), d = Q(c, e.battery);
  return Array.from({ length: Ae }, (h, f) => {
    const y = i.getTime() + f / (Ae - 1) * (r.getTime() - i.getTime());
    return {
      timestamp: y,
      solar: Math.max(0, ee(l, y, o.states[e.solar])),
      home: Math.max(0, ee(p, y, o.states[e.home])),
      battery: ee(d, y, o.states[e.battery])
    };
  });
}
const w = 480, E = 126, Ht = 300 * 1e3;
function te(o, e, t) {
  return Math.min(t, Math.max(e, o));
}
function Se(o, e, t, r) {
  if (o.length === 0) return [];
  const i = Math.max(0.1, r - t);
  return o.map((s, a) => [
    a / Math.max(1, o.length - 1) * w,
    4 + (r - s[e]) / i * (E - 8)
  ]);
}
function Pt(o) {
  return o.length === 0 ? "" : o.length === 1 ? `M 0 ${o[0][1]} L ${w} ${o[0][1]}` : o.slice(1).reduce((e, [t, r], i) => {
    const [s, a] = o[i], c = (s + t) / 2;
    return `${e} C ${c} ${a}, ${c} ${r}, ${t} ${r}`;
  }, `M ${o[0][0]} ${o[0][1]}`);
}
function zt(o, e, t, r = Date.now()) {
  const i = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], s = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], a = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return i.map((c, l) => ({
    timestamp: r - (i.length - 1 - l) * 2.4 * 60 * 60 * 1e3,
    solar: c * Math.max(o, 0.1),
    home: s[l] * Math.max(e, 0.1),
    battery: a[l] * t
  }));
}
const G = class G extends H {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static async getConfigElement() {
    return await vt(), document.createElement("solar-battery-card-editor");
  }
  static getStubConfig(e) {
    return bt(e);
  }
  setConfig(e) {
    Ne(e), this._config = B({ ...e });
  }
  getCardSize() {
    return this._config?.show_power_chart === !1 ? 8 : 12;
  }
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 3
    };
  }
  updated(e) {
    (e.has("hass") || e.has("_config")) && queueMicrotask(() => {
      this._loadHistoryIfNeeded();
    });
  }
  async _loadHistoryIfNeeded() {
    const e = this._config, t = this.hass;
    if (!e || !t || e.show_power_chart === !1) return;
    const r = [e.solar_power, e.home_power, e.battery_power].join("|"), i = Date.now();
    if (!(this._historyLoading || r === this._lastHistoryKey && i - this._lastHistoryFetch < Ht)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = r, this._lastHistoryFetch = i;
      try {
        this._history = await kt(t, {
          solar: e.solar_power,
          home: e.home_power,
          battery: e.battery_power
        });
      } catch {
        this._history = [], this._historyFailed = !0;
      } finally {
        this._historyLoading = !1;
      }
    }
  }
  _inspectChart(e, t) {
    const r = e.currentTarget.getBoundingClientRect();
    this._chartPointer = $t(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height
    );
    const i = xt(
      e.clientX,
      r.left,
      r.width,
      t
    );
    i !== this._activeChartIndex && (this._activeChartIndex = i);
  }
  _leaveChart(e) {
    e.pointerType === "mouse" && this._clearChartInspection();
  }
  _clearChartInspection() {
    this._activeChartIndex = void 0, this._chartPointer = void 0;
  }
  _navigateChart(e, t) {
    if (this._chartPointer = void 0, e.key === "Escape") {
      this._activeChartIndex = void 0;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const r = this._activeChartIndex ?? t - 1;
    this._activeChartIndex = e.key === "Home" ? 0 : e.key === "End" ? t - 1 : te(r + (e.key === "ArrowLeft" ? -1 : 1), 0, t - 1);
  }
  _renderChart(e, t) {
    const r = e.flatMap((u) => [
      u.solar,
      u.home,
      u.battery
    ]), i = Math.min(0, ...r), s = Math.max(
      0.1,
      ...r
    ), a = Math.max(0.1, s - i), c = 4 + s / a * (E - 8), l = ["solar", "home", "battery"].map((u) => {
      const _ = Se(e, u, i, s);
      return {
        key: u,
        path: Pt(_),
        end: _.at(-1) ?? [w, E]
      };
    }), p = this._activeChartIndex === void 0 ? void 0 : te(this._activeChartIndex, 0, e.length - 1), d = p === void 0 ? void 0 : e[p], h = p === void 0 ? void 0 : p / Math.max(1, e.length - 1) * w, f = p === void 0 ? void 0 : wt(p, e.length), y = p === void 0 ? [] : ["solar", "home", "battery"].map((u) => ({
      key: u,
      coordinate: Se(e, u, i, s)[p]
    })), x = this._chartPointer?.placement ?? (f !== void 0 && f > 64 ? "place-left" : "place-right"), W = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${f ?? 0}%`, X = d ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit"
    }).format(d.timestamp) : "";
    return b`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label=${n("chart.aria", t)}
        @pointerdown=${(u) => this._inspectChart(u, e.length)}
        @pointermove=${(u) => this._inspectChart(u, e.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(u) => this._navigateChart(u, e.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${w} ${E}"
          role="img"
          aria-label=${n("chart.svg_aria", t)}
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((u) => {
      const _ = u / 3 * E;
      return T`<line class="grid-line" x1="0" y1=${_} x2=${w} y2=${_}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((u) => {
      const _ = u / 4 * w;
      return T`<line class="grid-line" x1=${_} y1="0" x2=${_} y2=${E}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${c}
            x2=${w}
            y2=${c}
          ></line>
          ${l.map(
      ({ key: u, path: _, end: m }) => T`
              <path class="chart-line ${u}" d=${_}></path>
              <circle class="end-dot ${u}" cx=${m[0]} cy=${m[1]} r="4.5"></circle>
            `
    )}
          ${h === void 0 ? g : T`
                <line
                  class="inspection-line"
                  x1=${h}
                  y1="0"
                  x2=${h}
                  y2=${E}
                ></line>
                ${y.map(
      ({ key: u, coordinate: _ }) => T`
                    <circle
                      class="inspection-dot ${u}"
                      cx=${_[0]}
                      cy=${_[1]}
                      r="5"
                    ></circle>
                  `
    )}
              `}
        </svg>
        ${d && f !== void 0 ? b`
              <div
                class="chart-tooltip ${x}"
                style=${W}
                aria-live="polite"
              >
                <time>${X}</time>
                ${[
      { key: "solar", label: n("power.solar", t), value: d.solar, signed: !1 },
      { key: "home", label: n("power.home", t), value: d.home, signed: !1 },
      {
        key: "battery",
        label: n("power.battery", t),
        value: d.battery,
        signed: !0
      }
    ].map(
      (u) => b`
                    <div class="tooltip-item ${u.key}">
                      <span><i></i>${u.label}</span>
                      <strong>
                        ${J(u.value, this._config?.power_unit, {
        signed: u.signed,
        locale: t
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
    const e = this._config;
    if (!e) return g;
    const t = this.hass, r = t?.locale?.language ?? t?.language, i = te(
      he(v(t, e.battery_soc)) ?? 0,
      0,
      100
    ), s = Math.max(0, I(v(t, e.solar_power)) ?? 0), a = Math.max(0, I(v(t, e.home_power)) ?? 0), c = I(v(t, e.battery_power)) ?? 0, l = I(v(t, e.grid_power)) ?? 0, p = e.battery_positive_is_charging === !1 ? -1 : 1, d = p * c, h = (e.grid_positive_is_export === !1 ? -1 : 1) * l, f = d > 0.05 ? "charging" : d < -0.05 ? "discharging" : "idle", y = n(f === "charging" ? "status.charging" : f === "discharging" ? "status.discharging" : "status.idle", r), x = Et(
      i,
      Math.max(0, d),
      e.battery_capacity
    ), W = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }), X = this._history.length > 1 ? this._history.map((m) => ({
      ...m,
      battery: p * m.battery
    })) : zt(s, a, d), u = [
      {
        label: n("energy.generated", r),
        value: N(v(t, e.solar_energy_today)),
        tone: "solar"
      },
      {
        label: n("energy.consumed", r),
        value: N(v(t, e.home_energy_today)),
        tone: "home"
      },
      {
        label: n("energy.stored", r),
        value: N(v(t, e.battery_energy_today)),
        tone: "battery"
      },
      {
        label: n("energy.exported", r),
        value: N(v(t, e.export_energy_today)),
        tone: "export"
      }
    ], _ = s >= a && d > 0.05 && h > 0.05 ? n("footer.solar_home_battery_export", r) : s >= a && d > 0.05 ? n("footer.solar_home_battery", r) : s >= a ? n("footer.solar_home", r) : n("footer.drawing", r);
    return b`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${De}></path></svg>
              </div>
              <div>
                <h1>${mt(e, r)}</h1>
                <p class="subtitle">
                  ${n("card.subtitle", r)}
                  <span aria-hidden="true">·</span>
                  ${n("card.today", r)}
                </p>
              </div>
            </div>
            <div class="status ${f}">
              <span class="dot"></span>
              ${y}
            </div>
          </header>

          <section class="battery-hero" aria-label=${n("battery.aria_status", r)}>
            <div>
              <div class="percentage">${Math.round(i)}<span>%</span></div>
              <strong class="forecast">
                ${x ? n("battery.full_by", r, {
      time: W.format(x)
    }) : f === "charging" ? n("battery.charging_now", r) : y}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label=${n("battery.aria_graphic", r, {
      percent: Math.round(i)
    })}
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${i}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${n(f === "charging" ? "battery.charging" : f === "discharging" ? "battery.supplying" : "battery.idle", r)}
              </span>
              <strong>
                ${J(d, e.power_unit, {
      signed: !0,
      locale: r
    })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label=${n("power.aria", r)}>
            ${[
      { label: n("power.solar", r), value: s, tone: "solar", signed: !1 },
      { label: n("power.home", r), value: a, tone: "home", signed: !1 },
      { label: n("power.battery", r), value: d, tone: "battery", signed: !0 },
      { label: n("power.export", r), value: h, tone: "export", signed: !1 }
    ].map(
      (m) => b`
                <div class="power-stat ${m.tone}">
                  <span>${m.label}</span>
                  <strong>
                    ${J(m.value, this._config?.power_unit, {
        signed: m.signed,
        locale: r
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${e.show_power_chart === !1 ? g : b`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>${n("chart.heading", r)}</h2>
                    <time>${W.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(X, r)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>${n("chart.axis_start", r)}</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>${n("chart.axis_now", r)}</span>
                  </div>
                  <div class="legend" aria-label=${n("chart.legend_aria", r)}>
                    <span class="solar"><i></i>${n("power.solar", r)}</span>
                    <span class="home"><i></i>${n("power.home", r)}</span>
                    <span class="battery"><i></i>${n("power.battery", r)}</span>
                  </div>
                  ${this._historyFailed ? b`<p class="history-note">${n("chart.history_unavailable", r)}</p>` : g}
                </section>
              `}

          <section class="energy-stats" aria-label=${n("energy.aria", r)}>
            ${u.map(
      (m) => b`
                <div class="energy-stat ${m.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${m.label}</span>
                    <strong>${$e(m.value, e.energy_unit, r)}</strong>
                    ${m.tone === "solar" && e.solar_forecast_today ? b`<span class="solar-forecast">${n("energy.forecast_today", r)}
                          ${$e(St(v(t, e.solar_forecast_today)), e.energy_unit, r)}</span>` : g}
                  </div>
                </div>
              `
    )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${_}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
G.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 },
  _chartPointer: { state: !0 }
}, G.styles = at;
let se = G;
typeof customElements < "u" && (customElements.get("solar-battery-card-editor") || customElements.define("solar-battery-card-editor", ie), customElements.get("solar-battery-card") || customElements.define("solar-battery-card", se));
typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((o) => o.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: "A battery-first solar, power and daily energy overview."
}));
export {
  se as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
