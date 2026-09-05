var Ne = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const V = globalThis, oe = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = /* @__PURE__ */ Symbol(), de = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (oe && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = de.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && de.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (i) => new Ae(typeof i == "string" ? i : i + "", void 0, ae), Ee = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((r, o, a) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[a + 1], i[0]);
  return new Ae(t, i, ae);
}, De = (i, e) => {
  if (oe) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), o = V.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = t.cssText, i.appendChild(r);
  }
}, he = oe ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Ue(t);
})(i) : i;
const { is: Oe, defineProperty: Re, getOwnPropertyDescriptor: Be, getOwnPropertyNames: Fe, getOwnPropertySymbols: je, getPrototypeOf: Ve } = Object, K = globalThis, pe = K.trustedTypes, qe = pe ? pe.emptyScript : "", We = K.reactiveElementPolyfillSupport, N = (i, e) => i, te = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? qe : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, Se = (i, e) => !Oe(i, e), ue = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: Se };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(e, r, t);
      o !== void 0 && Re(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: o, set: a } = Be(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: o, set(s) {
      const c = o?.call(this);
      a?.call(this, s), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Ve(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const t = this.properties, r = [...Fe(t), ...je(t)];
      for (const o of r) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, o] of t) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const o = this._$Eu(t, r);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const o of r) t.unshift(he(o));
    } else e !== void 0 && t.push(he(e));
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
    return De(e, this.constructor.elementStyles), e;
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
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : te).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = r.getPropertyOptions(o), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : te;
      this._$Em = o;
      const c = s.fromAttribute(t, a.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, o = !1, a) {
    if (e !== void 0) {
      const s = this.constructor;
      if (o === !1 && (a = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? Se)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: o, wrapped: a }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) {
        const { wrapped: s } = a, c = this[o];
        s !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[N("elementProperties")] = /* @__PURE__ */ new Map(), k[N("finalized")] = /* @__PURE__ */ new Map(), We?.({ ReactiveElement: k }), (K.reactiveElementVersions ??= []).push("2.1.2");
const se = globalThis, ge = (i) => i, q = se.trustedTypes, fe = q ? q.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ce = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + w, Ge = `<${ke}>`, C = document, U = () => C.createComment(""), D = (i) => i === null || typeof i != "object" && typeof i != "function", ne = Array.isArray, Ke = (i) => ne(i) || typeof i?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, _e = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, be = /"/g, He = /^(?:script|style|textarea|title)$/i, Pe = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), x = Pe(1), z = Pe(2), P = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function Te(i, e) {
  if (!ne(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(e) : e;
}
const Ye = (i, e) => {
  const t = i.length - 1, r = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = M;
  for (let c = 0; c < t; c++) {
    const n = i[c];
    let p, d, h = -1, f = 0;
    for (; f < n.length && (s.lastIndex = f, d = s.exec(n), d !== null); ) f = s.lastIndex, s === M ? d[1] === "!--" ? s = ye : d[1] !== void 0 ? s = _e : d[2] !== void 0 ? (He.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = A) : d[3] !== void 0 && (s = A) : s === A ? d[0] === ">" ? (s = o ?? M, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, p = d[1], s = d[3] === void 0 ? A : d[3] === '"' ? be : me) : s === be || s === me ? s = A : s === ye || s === _e ? s = M : (s = A, o = void 0);
    const y = s === A && i[c + 1].startsWith("/>") ? " " : "";
    a += s === M ? n + Ge : h >= 0 ? (r.push(p), n.slice(0, h) + Ce + n.slice(h) + w + y) : n + w + (h === -2 ? c : y);
  }
  return [Te(i, a + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class O {
  constructor({ strings: e, _$litType$: t }, r) {
    let o;
    this.parts = [];
    let a = 0, s = 0;
    const c = e.length - 1, n = this.parts, [p, d] = Ye(e, t);
    if (this.el = O.createElement(p, r), S.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = S.nextNode()) !== null && n.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Ce)) {
          const f = d[s++], y = o.getAttribute(h).split(w), b = /([.?@])?(.*)/.exec(f);
          n.push({ type: 1, index: a, name: b[2], strings: y, ctor: b[1] === "." ? Ze : b[1] === "?" ? Je : b[1] === "@" ? Qe : Y }), o.removeAttribute(h);
        } else h.startsWith(w) && (n.push({ type: 6, index: a }), o.removeAttribute(h));
        if (He.test(o.tagName)) {
          const h = o.textContent.split(w), f = h.length - 1;
          if (f > 0) {
            o.textContent = q ? q.emptyScript : "";
            for (let y = 0; y < f; y++) o.append(h[y], U()), S.nextNode(), n.push({ type: 2, index: ++a });
            o.append(h[f], U());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ke) n.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(w, h + 1)) !== -1; ) n.push({ type: 7, index: a }), h += w.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = C.createElement("template");
    return r.innerHTML = e, r;
  }
}
function T(i, e, t = i, r) {
  if (e === P) return e;
  let o = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = D(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(i), o._$AT(i, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = o : t._$Cl = o), o !== void 0 && (e = T(i, o._$AS(i, e.values), o, r)), e;
}
class Xe {
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
    const { el: { content: t }, parts: r } = this._$AD, o = (e?.creationScope ?? C).importNode(t, !0);
    S.currentNode = o;
    let a = S.nextNode(), s = 0, c = 0, n = r[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let p;
        n.type === 2 ? p = new R(a, a.nextSibling, this, e) : n.type === 1 ? p = new n.ctor(a, n.name, n.strings, this, e) : n.type === 6 && (p = new et(a, this, e)), this._$AV.push(p), n = r[++c];
      }
      s !== n?.index && (a = S.nextNode(), s++);
    }
    return S.currentNode = C, o;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, o) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    e = T(this, e, t), D(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== P && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ke(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = O.createElement(Te(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(t);
    else {
      const a = new Xe(o, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = ve.get(e.strings);
    return t === void 0 && ve.set(e.strings, t = new O(e)), t;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, o = 0;
    for (const a of e) o === t.length ? t.push(r = new R(this.O(U()), this.O(U()), this, this.options)) : r = t[o], r._$AI(a), o++;
    o < t.length && (this._$AR(r && r._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = ge(e).nextSibling;
      ge(e).remove(), e = r;
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
  constructor(e, t, r, o, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, t = this, r, o) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = T(this, e, t, 0), s = !D(e) || e !== this._$AH && e !== P, s && (this._$AH = e);
    else {
      const c = e;
      let n, p;
      for (e = a[0], n = 0; n < a.length - 1; n++) p = T(this, c[r + n], t, n), p === P && (p = this._$AH[n]), s ||= !D(p) || p !== this._$AH[n], p === g ? e = g : e !== g && (e += (p ?? "") + a[n + 1]), this._$AH[n] = p;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ze extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Je extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Qe extends Y {
  constructor(e, t, r, o, a) {
    super(e, t, r, o, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = T(this, e, t, 0) ?? g) === P) return;
    const r = this._$AH, o = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== g && (r === g || o);
    o && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class et {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    T(this, e);
  }
}
const tt = se.litHtmlPolyfillSupport;
tt?.(O, R), (se.litHtmlVersions ??= []).push("3.3.3");
const rt = (i, e, t) => {
  const r = t?.renderBefore ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = o = new R(e.insertBefore(U(), a), a, void 0, t ?? {});
  }
  return o._$AI(i), o;
};
const le = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(t, this.renderRoot, this.renderOptions);
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
H._$litElement$ = !0, H.finalized = !0, le.litElementHydrateSupport?.({ LitElement: H });
const it = le.litElementPolyfillSupport;
it?.({ LitElement: H });
(le.litElementVersions ??= []).push("4.2.2");
const ot = Ee`
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
`, Me = {
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
}, at = {
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
}, st = {
  en: Me,
  de: at
};
function nt(i) {
  if (!i) return "en";
  const [e] = i.toLowerCase().split(/[-_]/);
  return e || "en";
}
function l(i, e, t) {
  const r = nt(e), o = st[r]?.[i] ?? Me[i];
  return t ? Object.entries(t).reduce(
    (a, [s, c]) => a.split(`{${s}}`).join(String(c)),
    o
  ) : o;
}
const lt = {
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0
}, ct = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], dt = [
  "title",
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power",
  "solar_energy_today",
  "home_energy_today",
  "battery_energy_today",
  "export_energy_today",
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
], ht = [
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export"
];
function pt(i) {
  return dt.includes(i);
}
function ut(i) {
  return ht.includes(i);
}
function ze(i, e) {
  return l(`editor.field.${i}`, e);
}
function gt(i, e) {
  return l(`editor.helper.${i}`, e);
}
function ft(i) {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: l("editor.section.live_power", i),
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
        title: l("editor.section.daily_energy", i),
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
        title: l("editor.section.behaviour", i),
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
    computeLabel: (e) => e.name && pt(e.name) ? ze(e.name, i) : void 0,
    computeHelper: (e) => e.name && ut(e.name) ? gt(e.name, i) : void 0,
    assertConfig: (e) => Le(e, i)
  };
}
function Le(i, e) {
  for (const t of ct)
    if (!i[t] || typeof i[t] != "string")
      throw new Error(
        l("editor.error.required", e, {
          field: ze(t, e)
        })
      );
}
function yt(i, e) {
  return i.title !== void 0 ? i.title : l("card.default_title", e);
}
function Ie(i) {
  return {
    ...lt,
    ...i,
    type: i.type || "custom:solar-battery-card"
  };
}
function L(i, e, t) {
  return i ? Object.values(i.states).find((o) => {
    if (o.attributes.device_class !== e) return !1;
    const a = `${o.entity_id} ${o.attributes.friendly_name ?? ""}`.toLowerCase();
    return t.some((s) => a.includes(s));
  })?.entity_id ?? "" : "";
}
function _t(i) {
  return Ie({
    type: "custom:solar-battery-card",
    battery_soc: L(i, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: L(i, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: L(i, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: L(i, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: L(i, "power", ["grid"]) || "sensor.grid_power"
  });
}
async function mt() {
  if (customElements.get("ha-form")) return;
  if (await (await (await window.loadCardHelpers?.())?.createCardElement({ type: "button" }))?.constructor?.getConfigElement?.(), !customElements.get("ha-form"))
    throw new Error("Home Assistant's form editor is unavailable.");
}
const W = class W extends H {
  setConfig(e) {
    this.getLocalizedForm().assertConfig(e), this._config = e;
  }
  getLocalizedForm() {
    const e = this.hass?.locale?.language ?? this.hass?.language;
    return ft(e);
  }
  render() {
    if (!this.hass || !this._config) return g;
    const e = this.getLocalizedForm();
    return x`
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
    const t = e.detail.value;
    this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: t }
      })
    );
  }
};
W.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 }
}, W.styles = Ee`
    :host {
      display: block;
    }
  `;
let re = W;
function bt(i, e, t, r) {
  if (r <= 1 || t <= 0) return 0;
  const o = Math.min(1, Math.max(0, (i - e) / t));
  return Math.round(o * (r - 1));
}
function vt(i, e) {
  return e <= 1 ? 0 : Math.min(e - 1, Math.max(0, i)) / (e - 1) * 100;
}
function xt(i, e, t, r, o = 166, a = 88, s = 14) {
  const c = Math.min(t, Math.max(0, i)), n = Math.min(
    Math.max(4, r - a - 4),
    Math.max(4, e - a / 2)
  );
  return {
    x: c,
    top: n,
    placement: c + s + o > t ? "place-left" : "place-right"
  };
}
const $t = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function ce(i) {
  if (!i || $t.has(i.state.toLowerCase())) return;
  const e = Number(i.state);
  return Number.isFinite(e) ? e : void 0;
}
function I(i) {
  const e = ce(i);
  if (e === void 0) return;
  const t = i?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "w" ? e / 1e3 : t === "mw" ? e / 1e6 : e;
}
function F(i) {
  const e = ce(i);
  if (e === void 0) return;
  const t = i?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "wh" ? e / 1e3 : t === "mwh" ? e * 1e3 : e;
}
function j(i, e, t = {}) {
  if (i === void 0) return "—";
  const r = t.digits ?? 2;
  return `${new Intl.NumberFormat(t.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: t.signed ? "exceptZero" : "auto"
  }).format(i)} ${e}`;
}
function v(i, e) {
  return e && i ? i.states[e] : void 0;
}
function wt(i, e, t, r = /* @__PURE__ */ new Date()) {
  if (i === void 0 || !t || t <= 0 || e <= 0 || i >= 100)
    return;
  const o = (100 - i) / 100 * t;
  return new Date(r.getTime() + o / e * 60 * 60 * 1e3);
}
const At = 24, xe = 24;
function J(i, e) {
  return i.find((t) => t.some((r) => r.entity_id === e)) ?? [];
}
function $e(i, e) {
  return i ? I({
    ...i,
    attributes: {
      ...e?.attributes,
      ...i.attributes
    }
  }) ?? 0 : 0;
}
function Q(i, e, t) {
  if (i.length === 0) return 0;
  let r = i[0], o = i.at(-1) ?? i[0];
  for (const d of i) {
    const h = Date.parse(d.last_changed ?? d.last_updated ?? "");
    if (Number.isFinite(h) && (h <= e && (r = d), h >= e)) {
      o = d;
      break;
    }
  }
  const a = Date.parse(r.last_changed ?? r.last_updated ?? ""), s = Date.parse(o.last_changed ?? o.last_updated ?? ""), c = $e(r, t), n = $e(o, t);
  if (!Number.isFinite(a) || !Number.isFinite(s) || a === s)
    return c;
  const p = Math.min(
    1,
    Math.max(0, (e - a) / (s - a))
  );
  return c + (n - c) * p;
}
async function Et(i, e, t = /* @__PURE__ */ new Date()) {
  const r = t, o = new Date(r.getTime() - At * 60 * 60 * 1e3), a = [e.solar, e.home, e.battery], s = `history/period/${encodeURIComponent(o.toISOString())}?end_time=${encodeURIComponent(r.toISOString())}&filter_entity_id=${encodeURIComponent(a.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, c = await i.callApi("GET", s), n = J(c, e.solar), p = J(c, e.home), d = J(c, e.battery);
  return Array.from({ length: xe }, (h, f) => {
    const y = o.getTime() + f / (xe - 1) * (r.getTime() - o.getTime());
    return {
      timestamp: y,
      solar: Math.max(0, Q(n, y, i.states[e.solar])),
      home: Math.max(0, Q(p, y, i.states[e.home])),
      battery: Q(d, y, i.states[e.battery])
    };
  });
}
const $ = 480, E = 126, St = 300 * 1e3;
function ee(i, e, t) {
  return Math.min(t, Math.max(e, i));
}
function we(i, e, t, r) {
  if (i.length === 0) return [];
  const o = Math.max(0.1, r - t);
  return i.map((a, s) => [
    s / Math.max(1, i.length - 1) * $,
    4 + (r - a[e]) / o * (E - 8)
  ]);
}
function Ct(i) {
  return i.length === 0 ? "" : i.length === 1 ? `M 0 ${i[0][1]} L ${$} ${i[0][1]}` : i.slice(1).reduce((e, [t, r], o) => {
    const [a, s] = i[o], c = (a + t) / 2;
    return `${e} C ${c} ${s}, ${c} ${r}, ${t} ${r}`;
  }, `M ${i[0][0]} ${i[0][1]}`);
}
function kt(i, e, t, r = Date.now()) {
  const o = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], a = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], s = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return o.map((c, n) => ({
    timestamp: r - (o.length - 1 - n) * 2.4 * 60 * 60 * 1e3,
    solar: c * Math.max(i, 0.1),
    home: a[n] * Math.max(e, 0.1),
    battery: s[n] * t
  }));
}
const G = class G extends H {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static async getConfigElement() {
    return await mt(), document.createElement("solar-battery-card-editor");
  }
  static getStubConfig(e) {
    return _t(e);
  }
  setConfig(e) {
    Le(e), this._config = Ie({ ...e });
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
    const r = [e.solar_power, e.home_power, e.battery_power].join("|"), o = Date.now();
    if (!(this._historyLoading || r === this._lastHistoryKey && o - this._lastHistoryFetch < St)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = r, this._lastHistoryFetch = o;
      try {
        this._history = await Et(t, {
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
    this._chartPointer = xt(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height
    );
    const o = bt(
      e.clientX,
      r.left,
      r.width,
      t
    );
    o !== this._activeChartIndex && (this._activeChartIndex = o);
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
    this._activeChartIndex = e.key === "Home" ? 0 : e.key === "End" ? t - 1 : ee(r + (e.key === "ArrowLeft" ? -1 : 1), 0, t - 1);
  }
  _renderChart(e, t) {
    const r = e.flatMap((u) => [
      u.solar,
      u.home,
      u.battery
    ]), o = Math.min(0, ...r), a = Math.max(
      0.1,
      ...r
    ), s = Math.max(0.1, a - o), c = 4 + a / s * (E - 8), n = ["solar", "home", "battery"].map((u) => {
      const _ = we(e, u, o, a);
      return {
        key: u,
        path: Ct(_),
        end: _.at(-1) ?? [$, E]
      };
    }), p = this._activeChartIndex === void 0 ? void 0 : ee(this._activeChartIndex, 0, e.length - 1), d = p === void 0 ? void 0 : e[p], h = p === void 0 ? void 0 : p / Math.max(1, e.length - 1) * $, f = p === void 0 ? void 0 : vt(p, e.length), y = p === void 0 ? [] : ["solar", "home", "battery"].map((u) => ({
      key: u,
      coordinate: we(e, u, o, a)[p]
    })), b = this._chartPointer?.placement ?? (f !== void 0 && f > 64 ? "place-left" : "place-right"), B = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${f ?? 0}%`, X = d ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit"
    }).format(d.timestamp) : "";
    return x`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label=${l("chart.aria", t)}
        @pointerdown=${(u) => this._inspectChart(u, e.length)}
        @pointermove=${(u) => this._inspectChart(u, e.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(u) => this._navigateChart(u, e.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${$} ${E}"
          role="img"
          aria-label=${l("chart.svg_aria", t)}
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((u) => {
      const _ = u / 3 * E;
      return z`<line class="grid-line" x1="0" y1=${_} x2=${$} y2=${_}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((u) => {
      const _ = u / 4 * $;
      return z`<line class="grid-line" x1=${_} y1="0" x2=${_} y2=${E}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${c}
            x2=${$}
            y2=${c}
          ></line>
          ${n.map(
      ({ key: u, path: _, end: m }) => z`
              <path class="chart-line ${u}" d=${_}></path>
              <circle class="end-dot ${u}" cx=${m[0]} cy=${m[1]} r="4.5"></circle>
            `
    )}
          ${h === void 0 ? g : z`
                <line
                  class="inspection-line"
                  x1=${h}
                  y1="0"
                  x2=${h}
                  y2=${E}
                ></line>
                ${y.map(
      ({ key: u, coordinate: _ }) => z`
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
        ${d && f !== void 0 ? x`
              <div
                class="chart-tooltip ${b}"
                style=${B}
                aria-live="polite"
              >
                <time>${X}</time>
                ${[
      { key: "solar", label: l("power.solar", t), value: d.solar, signed: !1 },
      { key: "home", label: l("power.home", t), value: d.home, signed: !1 },
      {
        key: "battery",
        label: l("power.battery", t),
        value: d.battery,
        signed: !0
      }
    ].map(
      (u) => x`
                    <div class="tooltip-item ${u.key}">
                      <span><i></i>${u.label}</span>
                      <strong>
                        ${j(u.value, "kW", {
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
    const t = this.hass, r = t?.locale?.language ?? t?.language, o = ee(
      ce(v(t, e.battery_soc)) ?? 0,
      0,
      100
    ), a = Math.max(0, I(v(t, e.solar_power)) ?? 0), s = Math.max(0, I(v(t, e.home_power)) ?? 0), c = I(v(t, e.battery_power)) ?? 0, n = I(v(t, e.grid_power)) ?? 0, p = e.battery_positive_is_charging === !1 ? -1 : 1, d = p * c, h = (e.grid_positive_is_export === !1 ? -1 : 1) * n, f = d > 0.05 ? "charging" : d < -0.05 ? "discharging" : "idle", y = l(f === "charging" ? "status.charging" : f === "discharging" ? "status.discharging" : "status.idle", r), b = wt(
      o,
      Math.max(0, d),
      e.battery_capacity
    ), B = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }), X = this._history.length > 1 ? this._history.map((m) => ({
      ...m,
      battery: p * m.battery
    })) : kt(a, s, d), u = [
      {
        label: l("energy.generated", r),
        value: F(v(t, e.solar_energy_today)),
        tone: "solar"
      },
      {
        label: l("energy.consumed", r),
        value: F(v(t, e.home_energy_today)),
        tone: "home"
      },
      {
        label: l("energy.stored", r),
        value: F(v(t, e.battery_energy_today)),
        tone: "battery"
      },
      {
        label: l("energy.exported", r),
        value: F(v(t, e.export_energy_today)),
        tone: "export"
      }
    ], _ = a >= s && d > 0.05 && h > 0.05 ? l("footer.solar_home_battery_export", r) : a >= s && d > 0.05 ? l("footer.solar_home_battery", r) : a >= s ? l("footer.solar_home", r) : l("footer.drawing", r);
    return x`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${Ne}></path></svg>
              </div>
              <div>
                <h1>${yt(e, r)}</h1>
                <p class="subtitle">
                  ${l("card.subtitle", r)}
                  <span aria-hidden="true">·</span>
                  ${l("card.today", r)}
                </p>
              </div>
            </div>
            <div class="status ${f}">
              <span class="dot"></span>
              ${y}
            </div>
          </header>

          <section class="battery-hero" aria-label=${l("battery.aria_status", r)}>
            <div>
              <div class="percentage">${Math.round(o)}<span>%</span></div>
              <strong class="forecast">
                ${b ? l("battery.full_by", r, {
      time: B.format(b)
    }) : f === "charging" ? l("battery.charging_now", r) : y}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label=${l("battery.aria_graphic", r, {
      percent: Math.round(o)
    })}
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${o}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${l(f === "charging" ? "battery.charging" : f === "discharging" ? "battery.supplying" : "battery.idle", r)}
              </span>
              <strong>
                ${j(d, "kW", {
      signed: !0,
      locale: r
    })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label=${l("power.aria", r)}>
            ${[
      { label: l("power.solar", r), value: a, tone: "solar", signed: !1 },
      { label: l("power.home", r), value: s, tone: "home", signed: !1 },
      { label: l("power.battery", r), value: d, tone: "battery", signed: !0 },
      { label: l("power.export", r), value: h, tone: "export", signed: !1 }
    ].map(
      (m) => x`
                <div class="power-stat ${m.tone}">
                  <span>${m.label}</span>
                  <strong>
                    ${j(m.value, "kW", {
        signed: m.signed,
        locale: r
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${e.show_power_chart === !1 ? g : x`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>${l("chart.heading", r)}</h2>
                    <time>${B.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(X, r)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>${l("chart.axis_start", r)}</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>${l("chart.axis_now", r)}</span>
                  </div>
                  <div class="legend" aria-label=${l("chart.legend_aria", r)}>
                    <span class="solar"><i></i>${l("power.solar", r)}</span>
                    <span class="home"><i></i>${l("power.home", r)}</span>
                    <span class="battery"><i></i>${l("power.battery", r)}</span>
                  </div>
                  ${this._historyFailed ? x`<p class="history-note">${l("chart.history_unavailable", r)}</p>` : g}
                </section>
              `}

          <section class="energy-stats" aria-label=${l("energy.aria", r)}>
            ${u.map(
      (m) => x`
                <div class="energy-stat ${m.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${m.label}</span>
                    <strong>${j(m.value, "kWh", { digits: 1, locale: r })}</strong>
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
}, G.styles = ot;
let ie = G;
typeof customElements < "u" && (customElements.get("solar-battery-card-editor") || customElements.define("solar-battery-card-editor", re), customElements.get("solar-battery-card") || customElements.define("solar-battery-card", ie));
typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((i) => i.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: "A battery-first solar, power and daily energy overview."
}));
export {
  ie as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
