var Le = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const V = globalThis, re = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = /* @__PURE__ */ Symbol(), le = /* @__PURE__ */ new WeakMap();
let $e = class {
  constructor(e, r, t) {
    if (this._$cssResult$ = !0, t !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (re && e === void 0) {
      const t = r !== void 0 && r.length === 1;
      t && (e = le.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && le.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ie = (i) => new $e(typeof i == "string" ? i : i + "", void 0, ie), Ne = (i, ...e) => {
  const r = i.length === 1 ? i[0] : e.reduce((t, o, a) => t + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[a + 1], i[0]);
  return new $e(r, i, ie);
}, Ue = (i, e) => {
  if (re) i.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const t = document.createElement("style"), o = V.litNonce;
    o !== void 0 && t.setAttribute("nonce", o), t.textContent = r.cssText, i.appendChild(t);
  }
}, ce = re ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const t of e.cssRules) r += t.cssText;
  return Ie(r);
})(i) : i;
const { is: De, defineProperty: Oe, getOwnPropertyDescriptor: Re, getOwnPropertyNames: Be, getOwnPropertySymbols: Fe, getPrototypeOf: je } = Object, G = globalThis, de = G.trustedTypes, Ve = de ? de.emptyScript : "", qe = G.reactiveElementPolyfillSupport, I = (i, e) => i, ee = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Ve : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let r = i;
  switch (e) {
    case Boolean:
      r = i !== null;
      break;
    case Number:
      r = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(i);
      } catch {
        r = null;
      }
  }
  return r;
} }, we = (i, e) => !De(i, e), he = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), G.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = he) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const t = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(e, t, r);
      o !== void 0 && Oe(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, t) {
    const { get: o, set: a } = Re(this.prototype, e) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: o, set(s) {
      const c = o?.call(this);
      a?.call(this, s), this.requestUpdate(e, c, t);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? he;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const r = this.properties, t = [...Be(r), ...Fe(r)];
      for (const o of t) this.createProperty(o, r[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [t, o] of r) this.elementProperties.set(t, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, t] of this.elementProperties) {
      const o = this._$Eu(r, t);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const t = new Set(e.flat(1 / 0).reverse());
      for (const o of t) r.unshift(ce(o));
    } else e !== void 0 && r.push(ce(e));
    return r;
  }
  static _$Eu(e, r) {
    const t = r.attribute;
    return t === !1 ? void 0 : typeof t == "string" ? t : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const t of r.keys()) this.hasOwnProperty(t) && (e.set(t, this[t]), delete this[t]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ue(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, r, t) {
    this._$AK(e, t);
  }
  _$ET(e, r) {
    const t = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, t);
    if (o !== void 0 && t.reflect === !0) {
      const a = (t.converter?.toAttribute !== void 0 ? t.converter : ee).toAttribute(r, t.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const t = this.constructor, o = t._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = t.getPropertyOptions(o), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ee;
      this._$Em = o;
      const c = s.fromAttribute(r, a.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, r, t, o = !1, a) {
    if (e !== void 0) {
      const s = this.constructor;
      if (o === !1 && (a = this[e]), t ??= s.getPropertyOptions(e), !((t.hasChanged ?? we)(a, r) || t.useDefault && t.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, t)))) return;
      this.C(e, r, t);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: t, reflect: o, wrapped: a }, s) {
    t && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? r ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || t || (r = void 0), this._$AL.set(e, r)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
      const t = this.constructor.elementProperties;
      if (t.size > 0) for (const [o, a] of t) {
        const { wrapped: s } = a, c = this[o];
        s !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (t) {
      throw e = !1, this._$EM(), t;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[I("elementProperties")] = /* @__PURE__ */ new Map(), k[I("finalized")] = /* @__PURE__ */ new Map(), qe?.({ ReactiveElement: k }), (G.reactiveElementVersions ??= []).push("2.1.2");
const oe = globalThis, pe = (i) => i, q = oe.trustedTypes, ue = q ? q.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ae = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + w, We = `<${Se}>`, C = document, U = () => C.createComment(""), D = (i) => i === null || typeof i != "object" && typeof i != "function", ae = Array.isArray, Ge = (i) => ae(i) || typeof i?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, fe = />/g, A = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, _e = /"/g, Ee = /^(?:script|style|textarea|title)$/i, Ce = (i) => (e, ...r) => ({ _$litType$: i, strings: e, values: r }), x = Ce(1), M = Ce(2), H = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function ke(i, e) {
  if (!ae(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const Ke = (i, e) => {
  const r = i.length - 1, t = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = T;
  for (let c = 0; c < r; c++) {
    const n = i[c];
    let p, d, h = -1, g = 0;
    for (; g < n.length && (s.lastIndex = g, d = s.exec(n), d !== null); ) g = s.lastIndex, s === T ? d[1] === "!--" ? s = ge : d[1] !== void 0 ? s = fe : d[2] !== void 0 ? (Ee.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = A) : d[3] !== void 0 && (s = A) : s === A ? d[0] === ">" ? (s = o ?? T, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, p = d[1], s = d[3] === void 0 ? A : d[3] === '"' ? _e : ye) : s === _e || s === ye ? s = A : s === ge || s === fe ? s = T : (s = A, o = void 0);
    const y = s === A && i[c + 1].startsWith("/>") ? " " : "";
    a += s === T ? n + We : h >= 0 ? (t.push(p), n.slice(0, h) + Ae + n.slice(h) + w + y) : n + w + (h === -2 ? c : y);
  }
  return [ke(i, a + (i[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), t];
};
class O {
  constructor({ strings: e, _$litType$: r }, t) {
    let o;
    this.parts = [];
    let a = 0, s = 0;
    const c = e.length - 1, n = this.parts, [p, d] = Ke(e, r);
    if (this.el = O.createElement(p, t), E.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = E.nextNode()) !== null && n.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Ae)) {
          const g = d[s++], y = o.getAttribute(h).split(w), b = /([.?@])?(.*)/.exec(g);
          n.push({ type: 1, index: a, name: b[2], strings: y, ctor: b[1] === "." ? Xe : b[1] === "?" ? Ze : b[1] === "@" ? Je : K }), o.removeAttribute(h);
        } else h.startsWith(w) && (n.push({ type: 6, index: a }), o.removeAttribute(h));
        if (Ee.test(o.tagName)) {
          const h = o.textContent.split(w), g = h.length - 1;
          if (g > 0) {
            o.textContent = q ? q.emptyScript : "";
            for (let y = 0; y < g; y++) o.append(h[y], U()), E.nextNode(), n.push({ type: 2, index: ++a });
            o.append(h[g], U());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Se) n.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(w, h + 1)) !== -1; ) n.push({ type: 7, index: a }), h += w.length - 1;
      }
      a++;
    }
  }
  static createElement(e, r) {
    const t = C.createElement("template");
    return t.innerHTML = e, t;
  }
}
function P(i, e, r = i, t) {
  if (e === H) return e;
  let o = t !== void 0 ? r._$Co?.[t] : r._$Cl;
  const a = D(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(i), o._$AT(i, r, t)), t !== void 0 ? (r._$Co ??= [])[t] = o : r._$Cl = o), o !== void 0 && (e = P(i, o._$AS(i, e.values), o, t)), e;
}
class Ye {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: t } = this._$AD, o = (e?.creationScope ?? C).importNode(r, !0);
    E.currentNode = o;
    let a = E.nextNode(), s = 0, c = 0, n = t[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let p;
        n.type === 2 ? p = new R(a, a.nextSibling, this, e) : n.type === 1 ? p = new n.ctor(a, n.name, n.strings, this, e) : n.type === 6 && (p = new Qe(a, this, e)), this._$AV.push(p), n = t[++c];
      }
      s !== n?.index && (a = E.nextNode(), s++);
    }
    return E.currentNode = C, o;
  }
  p(e) {
    let r = 0;
    for (const t of this._$AV) t !== void 0 && (t.strings !== void 0 ? (t._$AI(e, t, r), r += t.strings.length - 2) : t._$AI(e[r])), r++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, r, t, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = t, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e?.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = P(this, e, r), D(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ge(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: r, _$litType$: t } = e, o = typeof t == "number" ? this._$AC(e) : (t.el === void 0 && (t.el = O.createElement(ke(t.h, t.h[0]), this.options)), t);
    if (this._$AH?._$AD === o) this._$AH.p(r);
    else {
      const a = new Ye(o, this), s = a.u(this.options);
      a.p(r), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let r = me.get(e.strings);
    return r === void 0 && me.set(e.strings, r = new O(e)), r;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let t, o = 0;
    for (const a of e) o === r.length ? r.push(t = new R(this.O(U()), this.O(U()), this, this.options)) : t = r[o], t._$AI(a), o++;
    o < r.length && (this._$AR(t && t._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); e !== this._$AB; ) {
      const t = pe(e).nextSibling;
      pe(e).remove(), e = t;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, t, o, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = a, t.length > 2 || t[0] !== "" || t[1] !== "" ? (this._$AH = Array(t.length - 1).fill(new String()), this.strings = t) : this._$AH = f;
  }
  _$AI(e, r = this, t, o) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = P(this, e, r, 0), s = !D(e) || e !== this._$AH && e !== H, s && (this._$AH = e);
    else {
      const c = e;
      let n, p;
      for (e = a[0], n = 0; n < a.length - 1; n++) p = P(this, c[t + n], r, n), p === H && (p = this._$AH[n]), s ||= !D(p) || p !== this._$AH[n], p === f ? e = f : e !== f && (e += (p ?? "") + a[n + 1]), this._$AH[n] = p;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xe extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Ze extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Je extends K {
  constructor(e, r, t, o, a) {
    super(e, r, t, o, a), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = P(this, e, r, 0) ?? f) === H) return;
    const t = this._$AH, o = e === f && t !== f || e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive, a = e !== f && (t === f || o);
    o && this.element.removeEventListener(this.name, this, t), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Qe {
  constructor(e, r, t) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = t;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const et = oe.litHtmlPolyfillSupport;
et?.(O, R), (oe.litHtmlVersions ??= []).push("3.3.3");
const tt = (i, e, r) => {
  const t = r?.renderBefore ?? e;
  let o = t._$litPart$;
  if (o === void 0) {
    const a = r?.renderBefore ?? null;
    t._$litPart$ = o = new R(e.insertBefore(U(), a), a, void 0, r ?? {});
  }
  return o._$AI(i), o;
};
const se = globalThis;
class N extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = tt(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return H;
  }
}
N._$litElement$ = !0, N.finalized = !0, se.litElementHydrateSupport?.({ LitElement: N });
const rt = se.litElementPolyfillSupport;
rt?.({ LitElement: N });
(se.litElementVersions ??= []).push("4.2.2");
const it = Ne`
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
`, He = {
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
  "picker.description": "A battery-first solar, power and daily energy overview.",
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
}, ot = {
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
  "picker.description": "Solar-, Leistungs- und Tagesenergieübersicht mit Fokus auf den Speicher.",
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
}, at = {
  en: He,
  de: ot
};
let Pe;
function st(i) {
  i && (Pe = i);
}
function nt() {
  return typeof navigator > "u" ? void 0 : navigator.language;
}
function lt(i) {
  if (!i) return "en";
  const [e] = i.toLowerCase().split(/[-_]/);
  return e || "en";
}
function l(i, e, r) {
  const t = lt(e ?? Pe ?? nt()), o = at[t]?.[i] ?? He[i];
  return r ? Object.entries(r).reduce(
    (a, [s, c]) => a.split(`{${s}}`).join(String(c)),
    o
  ) : o;
}
const ct = {
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0
}, dt = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], ht = [
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
], pt = [
  "battery_capacity",
  "battery_positive_is_charging",
  "grid_positive_is_export"
];
function ut(i) {
  return ht.includes(i);
}
function gt(i) {
  return pt.includes(i);
}
function Te(i) {
  return l(`editor.field.${i}`);
}
function ft(i) {
  return l(`editor.helper.${i}`);
}
function yt() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "",
        title: l("editor.section.live_power"),
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
        title: l("editor.section.daily_energy"),
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
        title: l("editor.section.behaviour"),
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
    computeLabel: (i) => i.name && ut(i.name) ? Te(i.name) : void 0,
    computeHelper: (i) => i.name && gt(i.name) ? ft(i.name) : void 0,
    assertConfig: (i) => Me(i)
  };
}
function Me(i) {
  for (const e of dt)
    if (!i[e] || typeof i[e] != "string")
      throw new Error(
        l("editor.error.required", void 0, { field: Te(e) })
      );
}
function ze(i) {
  return {
    ...ct,
    ...i,
    type: i.type || "custom:solar-battery-card"
  };
}
function z(i, e, r) {
  return i ? Object.values(i.states).find((o) => {
    if (o.attributes.device_class !== e) return !1;
    const a = `${o.entity_id} ${o.attributes.friendly_name ?? ""}`.toLowerCase();
    return r.some((s) => a.includes(s));
  })?.entity_id ?? "" : "";
}
function _t(i) {
  return ze({
    type: "custom:solar-battery-card",
    battery_soc: z(i, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: z(i, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: z(i, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: z(i, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: z(i, "power", ["grid"]) || "sensor.grid_power"
  });
}
function mt(i, e, r, t) {
  if (t <= 1 || r <= 0) return 0;
  const o = Math.min(1, Math.max(0, (i - e) / r));
  return Math.round(o * (t - 1));
}
function bt(i, e) {
  return e <= 1 ? 0 : Math.min(e - 1, Math.max(0, i)) / (e - 1) * 100;
}
function vt(i, e, r, t, o = 166, a = 88, s = 14) {
  const c = Math.min(r, Math.max(0, i)), n = Math.min(
    Math.max(4, t - a - 4),
    Math.max(4, e - a / 2)
  );
  return {
    x: c,
    top: n,
    placement: c + s + o > r ? "place-left" : "place-right"
  };
}
const xt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function ne(i) {
  if (!i || xt.has(i.state.toLowerCase())) return;
  const e = Number(i.state);
  return Number.isFinite(e) ? e : void 0;
}
function L(i) {
  const e = ne(i);
  if (e === void 0) return;
  const r = i?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return r === "w" ? e / 1e3 : r === "mw" ? e / 1e6 : e;
}
function F(i) {
  const e = ne(i);
  if (e === void 0) return;
  const r = i?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return r === "wh" ? e / 1e3 : r === "mwh" ? e * 1e3 : e;
}
function j(i, e, r = {}) {
  if (i === void 0) return "—";
  const t = r.digits ?? 2;
  return `${new Intl.NumberFormat(r.locale, {
    minimumFractionDigits: t,
    maximumFractionDigits: t,
    signDisplay: r.signed ? "exceptZero" : "auto"
  }).format(i)} ${e}`;
}
function v(i, e) {
  return e && i ? i.states[e] : void 0;
}
function $t(i, e, r, t = /* @__PURE__ */ new Date()) {
  if (i === void 0 || !r || r <= 0 || e <= 0 || i >= 100)
    return;
  const o = (100 - i) / 100 * r;
  return new Date(t.getTime() + o / e * 60 * 60 * 1e3);
}
const wt = 24, be = 24;
function Z(i, e) {
  return i.find((r) => r.some((t) => t.entity_id === e)) ?? [];
}
function ve(i, e) {
  return i ? L({
    ...i,
    attributes: {
      ...e?.attributes,
      ...i.attributes
    }
  }) ?? 0 : 0;
}
function J(i, e, r) {
  if (i.length === 0) return 0;
  let t = i[0], o = i.at(-1) ?? i[0];
  for (const d of i) {
    const h = Date.parse(d.last_changed ?? d.last_updated ?? "");
    if (Number.isFinite(h) && (h <= e && (t = d), h >= e)) {
      o = d;
      break;
    }
  }
  const a = Date.parse(t.last_changed ?? t.last_updated ?? ""), s = Date.parse(o.last_changed ?? o.last_updated ?? ""), c = ve(t, r), n = ve(o, r);
  if (!Number.isFinite(a) || !Number.isFinite(s) || a === s)
    return c;
  const p = Math.min(
    1,
    Math.max(0, (e - a) / (s - a))
  );
  return c + (n - c) * p;
}
async function At(i, e, r = /* @__PURE__ */ new Date()) {
  const t = r, o = new Date(t.getTime() - wt * 60 * 60 * 1e3), a = [e.solar, e.home, e.battery], s = `history/period/${encodeURIComponent(o.toISOString())}?end_time=${encodeURIComponent(t.toISOString())}&filter_entity_id=${encodeURIComponent(a.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, c = await i.callApi("GET", s), n = Z(c, e.solar), p = Z(c, e.home), d = Z(c, e.battery);
  return Array.from({ length: be }, (h, g) => {
    const y = o.getTime() + g / (be - 1) * (t.getTime() - o.getTime());
    return {
      timestamp: y,
      solar: Math.max(0, J(n, y, i.states[e.solar])),
      home: Math.max(0, J(p, y, i.states[e.home])),
      battery: J(d, y, i.states[e.battery])
    };
  });
}
const $ = 480, S = 126, St = 300 * 1e3;
function Q(i, e, r) {
  return Math.min(r, Math.max(e, i));
}
function xe(i, e, r, t) {
  if (i.length === 0) return [];
  const o = Math.max(0.1, t - r);
  return i.map((a, s) => [
    s / Math.max(1, i.length - 1) * $,
    4 + (t - a[e]) / o * (S - 8)
  ]);
}
function Et(i) {
  return i.length === 0 ? "" : i.length === 1 ? `M 0 ${i[0][1]} L ${$} ${i[0][1]}` : i.slice(1).reduce((e, [r, t], o) => {
    const [a, s] = i[o], c = (a + r) / 2;
    return `${e} C ${c} ${s}, ${c} ${t}, ${r} ${t}`;
  }, `M ${i[0][0]} ${i[0][1]}`);
}
function Ct(i, e, r, t = Date.now()) {
  const o = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], a = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], s = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return o.map((c, n) => ({
    timestamp: t - (o.length - 1 - n) * 2.4 * 60 * 60 * 1e3,
    solar: c * Math.max(i, 0.1),
    home: a[n] * Math.max(e, 0.1),
    battery: s[n] * r
  }));
}
const W = class W extends N {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static getConfigForm() {
    return yt();
  }
  static getStubConfig(e) {
    return _t(e);
  }
  setConfig(e) {
    Me(e), this._config = ze({ ...e });
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
    const e = this._config, r = this.hass;
    if (!e || !r || e.show_power_chart === !1) return;
    const t = [e.solar_power, e.home_power, e.battery_power].join("|"), o = Date.now();
    if (!(this._historyLoading || t === this._lastHistoryKey && o - this._lastHistoryFetch < St)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = t, this._lastHistoryFetch = o;
      try {
        this._history = await At(r, {
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
  _inspectChart(e, r) {
    const t = e.currentTarget.getBoundingClientRect();
    this._chartPointer = vt(
      e.clientX - t.left,
      e.clientY - t.top,
      t.width,
      t.height
    );
    const o = mt(
      e.clientX,
      t.left,
      t.width,
      r
    );
    o !== this._activeChartIndex && (this._activeChartIndex = o);
  }
  _leaveChart(e) {
    e.pointerType === "mouse" && this._clearChartInspection();
  }
  _clearChartInspection() {
    this._activeChartIndex = void 0, this._chartPointer = void 0;
  }
  _navigateChart(e, r) {
    if (this._chartPointer = void 0, e.key === "Escape") {
      this._activeChartIndex = void 0;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const t = this._activeChartIndex ?? r - 1;
    this._activeChartIndex = e.key === "Home" ? 0 : e.key === "End" ? r - 1 : Q(t + (e.key === "ArrowLeft" ? -1 : 1), 0, r - 1);
  }
  _renderChart(e, r) {
    const t = e.flatMap((u) => [
      u.solar,
      u.home,
      u.battery
    ]), o = Math.min(0, ...t), a = Math.max(
      0.1,
      ...t
    ), s = Math.max(0.1, a - o), c = 4 + a / s * (S - 8), n = ["solar", "home", "battery"].map((u) => {
      const _ = xe(e, u, o, a);
      return {
        key: u,
        path: Et(_),
        end: _.at(-1) ?? [$, S]
      };
    }), p = this._activeChartIndex === void 0 ? void 0 : Q(this._activeChartIndex, 0, e.length - 1), d = p === void 0 ? void 0 : e[p], h = p === void 0 ? void 0 : p / Math.max(1, e.length - 1) * $, g = p === void 0 ? void 0 : bt(p, e.length), y = p === void 0 ? [] : ["solar", "home", "battery"].map((u) => ({
      key: u,
      coordinate: xe(e, u, o, a)[p]
    })), b = this._chartPointer?.placement ?? (g !== void 0 && g > 64 ? "place-left" : "place-right"), B = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${g ?? 0}%`, Y = d ? new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }).format(d.timestamp) : "";
    return x`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label=${l("chart.aria", r)}
        @pointerdown=${(u) => this._inspectChart(u, e.length)}
        @pointermove=${(u) => this._inspectChart(u, e.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(u) => this._navigateChart(u, e.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${$} ${S}"
          role="img"
          aria-label="Solar, home and battery power for the past 24 hours"
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((u) => {
      const _ = u / 3 * S;
      return M`<line class="grid-line" x1="0" y1=${_} x2=${$} y2=${_}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((u) => {
      const _ = u / 4 * $;
      return M`<line class="grid-line" x1=${_} y1="0" x2=${_} y2=${S}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${c}
            x2=${$}
            y2=${c}
          ></line>
          ${n.map(
      ({ key: u, path: _, end: m }) => M`
              <path class="chart-line ${u}" d=${_}></path>
              <circle class="end-dot ${u}" cx=${m[0]} cy=${m[1]} r="4.5"></circle>
            `
    )}
          ${h === void 0 ? f : M`
                <line
                  class="inspection-line"
                  x1=${h}
                  y1="0"
                  x2=${h}
                  y2=${S}
                ></line>
                ${y.map(
      ({ key: u, coordinate: _ }) => M`
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
        ${d && g !== void 0 ? x`
              <div
                class="chart-tooltip ${b}"
                style=${B}
                aria-live="polite"
              >
                <time>${Y}</time>
                ${[
      { key: "solar", label: l("power.solar", r), value: d.solar, signed: !1 },
      { key: "home", label: l("power.home", r), value: d.home, signed: !1 },
      {
        key: "battery",
        label: l("power.battery", r),
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
        locale: r
      })}
                      </strong>
                    </div>
                  `
    )}
              </div>
            ` : f}
      </div>
    `;
  }
  render() {
    const e = this._config;
    if (!e) return f;
    const r = this.hass, t = r?.locale?.language ?? r?.language;
    st(t);
    const o = Q(
      ne(v(r, e.battery_soc)) ?? 0,
      0,
      100
    ), a = Math.max(0, L(v(r, e.solar_power)) ?? 0), s = Math.max(0, L(v(r, e.home_power)) ?? 0), c = L(v(r, e.battery_power)) ?? 0, n = L(v(r, e.grid_power)) ?? 0, p = e.battery_positive_is_charging === !1 ? -1 : 1, d = p * c, h = (e.grid_positive_is_export === !1 ? -1 : 1) * n, g = d > 0.05 ? "charging" : d < -0.05 ? "discharging" : "idle", y = l(g === "charging" ? "status.charging" : g === "discharging" ? "status.discharging" : "status.idle", t), b = $t(
      o,
      Math.max(0, d),
      e.battery_capacity
    ), B = new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit"
    }), Y = this._history.length > 1 ? this._history.map((m) => ({
      ...m,
      battery: p * m.battery
    })) : Ct(a, s, d), u = [
      {
        label: l("energy.generated", t),
        value: F(v(r, e.solar_energy_today)),
        tone: "solar"
      },
      {
        label: l("energy.consumed", t),
        value: F(v(r, e.home_energy_today)),
        tone: "home"
      },
      {
        label: l("energy.stored", t),
        value: F(v(r, e.battery_energy_today)),
        tone: "battery"
      },
      {
        label: l("energy.exported", t),
        value: F(v(r, e.export_energy_today)),
        tone: "export"
      }
    ], _ = a >= s && d > 0.05 && h > 0.05 ? l("footer.solar_home_battery_export", t) : a >= s && d > 0.05 ? l("footer.solar_home_battery", t) : a >= s ? l("footer.solar_home", t) : l("footer.drawing", t);
    return x`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${Le}></path></svg>
              </div>
              <div>
                <h1>${e.title || l("card.default_title", t)}</h1>
                <p class="subtitle">
                  ${l("card.subtitle", t)}
                  <span aria-hidden="true">·</span>
                  ${l("card.today", t)}
                </p>
              </div>
            </div>
            <div class="status ${g}">
              <span class="dot"></span>
              ${y}
            </div>
          </header>

          <section class="battery-hero" aria-label=${l("battery.aria_status", t)}>
            <div>
              <div class="percentage">${Math.round(o)}<span>%</span></div>
              <strong class="forecast">
                ${b ? l("battery.full_by", t, {
      time: B.format(b)
    }) : g === "charging" ? l("battery.charging_now", t) : y}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label=${l("battery.aria_graphic", t, {
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
                ${l(g === "charging" ? "battery.charging" : g === "discharging" ? "battery.supplying" : "battery.idle", t)}
              </span>
              <strong>
                ${j(d, "kW", {
      signed: !0,
      locale: t
    })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label=${l("power.aria", t)}>
            ${[
      { label: l("power.solar", t), value: a, tone: "solar", signed: !1 },
      { label: l("power.home", t), value: s, tone: "home", signed: !1 },
      { label: l("power.battery", t), value: d, tone: "battery", signed: !0 },
      { label: l("power.export", t), value: h, tone: "export", signed: !1 }
    ].map(
      (m) => x`
                <div class="power-stat ${m.tone}">
                  <span>${m.label}</span>
                  <strong>
                    ${j(m.value, "kW", {
        signed: m.signed,
        locale: t
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${e.show_power_chart === !1 ? f : x`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>${l("chart.heading", t)}</h2>
                    <time>${B.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(Y, t)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>${l("chart.axis_start", t)}</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>${l("chart.axis_now", t)}</span>
                  </div>
                  <div class="legend" aria-label=${l("chart.legend_aria", t)}>
                    <span class="solar"><i></i>${l("power.solar", t)}</span>
                    <span class="home"><i></i>${l("power.home", t)}</span>
                    <span class="battery"><i></i>${l("power.battery", t)}</span>
                  </div>
                  ${this._historyFailed ? x`<p class="history-note">${l("chart.history_unavailable", t)}</p>` : f}
                </section>
              `}

          <section class="energy-stats" aria-label=${l("energy.aria", t)}>
            ${u.map(
      (m) => x`
                <div class="energy-stat ${m.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${m.label}</span>
                    <strong>${j(m.value, "kWh", { digits: 1, locale: t })}</strong>
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
W.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 },
  _chartPointer: { state: !0 }
}, W.styles = it;
let te = W;
customElements.get("solar-battery-card") || customElements.define("solar-battery-card", te);
window.customCards = window.customCards || [];
window.customCards.some((i) => i.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: l("picker.description")
});
export {
  te as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
