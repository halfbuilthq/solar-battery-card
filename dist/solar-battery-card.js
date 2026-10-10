var We = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
const q = globalThis, ne = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = /* @__PURE__ */ Symbol(), ue = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ne && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = ue.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && ue.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ve = (o) => new ke(typeof o == "string" ? o : o + "", void 0, le), ze = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((r, i, a) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[a + 1], o[0]);
  return new ke(t, o, le);
}, je = (o, e) => {
  if (ne) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = q.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, o.appendChild(r);
  }
}, ge = ne ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Ve(t);
})(o) : o;
const { is: qe, defineProperty: Ge, getOwnPropertyDescriptor: Ke, getOwnPropertyNames: Ye, getOwnPropertySymbols: Xe, getPrototypeOf: Ze } = Object, X = globalThis, fe = X.trustedTypes, Je = fe ? fe.emptyScript : "", Qe = X.reactiveElementPolyfillSupport, R = (o, e) => o, oe = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? Je : null;
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
} }, He = (o, e) => !qe(o, e), ye = { attribute: !0, type: String, converter: oe, reflect: !1, useDefault: !1, hasChanged: He };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), X.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let k = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Ge(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: a } = Ke(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const c = i?.call(this);
      a?.call(this, s), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = Ze(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const t = this.properties, r = [...Ye(t), ...Xe(t)];
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
      for (const i of r) t.unshift(ge(i));
    } else e !== void 0 && t.push(ge(e));
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
    return je(e, this.constructor.elementStyles), e;
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
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : oe).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : oe;
      this._$Em = i;
      const c = s.fromAttribute(t, a.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, a) {
    if (e !== void 0) {
      const s = this.constructor;
      if (i === !1 && (a = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? He)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: a }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, a] of r) {
        const { wrapped: s } = a, c = this[i];
        s !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, a, c);
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[R("elementProperties")] = /* @__PURE__ */ new Map(), k[R("finalized")] = /* @__PURE__ */ new Map(), Qe?.({ ReactiveElement: k }), (X.reactiveElementVersions ??= []).push("2.1.2");
const ce = globalThis, _e = (o) => o, G = ce.trustedTypes, me = G ? G.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Pe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Te = "?" + $, et = `<${Te}>`, C = document, U = () => C.createComment(""), F = (o) => o === null || typeof o != "object" && typeof o != "function", de = Array.isArray, tt = (o) => de(o) || typeof o?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, ve = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, xe = /"/g, Me = /^(?:script|style|textarea|title)$/i, Le = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), v = Le(1), O = Le(2), H = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function Oe(o, e) {
  if (!de(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(e) : e;
}
const rt = (o, e) => {
  const t = o.length - 1, r = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = L;
  for (let c = 0; c < t; c++) {
    const l = o[c];
    let p, u, d = -1, f = 0;
    for (; f < l.length && (s.lastIndex = f, u = s.exec(l), u !== null); ) f = s.lastIndex, s === L ? u[1] === "!--" ? s = be : u[1] !== void 0 ? s = ve : u[2] !== void 0 ? (Me.test(u[2]) && (i = RegExp("</" + u[2], "g")), s = A) : u[3] !== void 0 && (s = A) : s === A ? u[0] === ">" ? (s = i ?? L, d = -1) : u[1] === void 0 ? d = -2 : (d = s.lastIndex - u[2].length, p = u[1], s = u[3] === void 0 ? A : u[3] === '"' ? xe : we) : s === xe || s === we ? s = A : s === be || s === ve ? s = L : (s = A, i = void 0);
    const y = s === A && o[c + 1].startsWith("/>") ? " " : "";
    a += s === L ? l + et : d >= 0 ? (r.push(p), l.slice(0, d) + Pe + l.slice(d) + $ + y) : l + $ + (d === -2 ? c : y);
  }
  return [Oe(o, a + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class B {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const c = e.length - 1, l = this.parts, [p, u] = rt(e, t);
    if (this.el = B.createElement(p, r), S.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = S.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Pe)) {
          const f = u[s++], y = i.getAttribute(d).split($), m = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: a, name: m[2], strings: y, ctor: m[1] === "." ? it : m[1] === "?" ? at : m[1] === "@" ? st : Z }), i.removeAttribute(d);
        } else d.startsWith($) && (l.push({ type: 6, index: a }), i.removeAttribute(d));
        if (Me.test(i.tagName)) {
          const d = i.textContent.split($), f = d.length - 1;
          if (f > 0) {
            i.textContent = G ? G.emptyScript : "";
            for (let y = 0; y < f; y++) i.append(d[y], U()), S.nextNode(), l.push({ type: 2, index: ++a });
            i.append(d[f], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Te) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = i.data.indexOf($, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += $.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = C.createElement("template");
    return r.innerHTML = e, r;
  }
}
function P(o, e, t = o, r) {
  if (e === H) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = F(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(o), i._$AT(o, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = P(o, i._$AS(o, e.values), i, r)), e;
}
class ot {
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
    let a = S.nextNode(), s = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let p;
        l.type === 2 ? p = new V(a, a.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (p = new nt(a, this, e)), this._$AV.push(p), l = r[++c];
      }
      s !== l?.index && (a = S.nextNode(), s++);
    }
    return S.currentNode = C, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class V {
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
    e = P(this, e, t), F(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = B.createElement(Oe(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const a = new ot(i, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = $e.get(e.strings);
    return t === void 0 && $e.set(e.strings, t = new B(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const a of e) i === t.length ? t.push(r = new V(this.O(U()), this.O(U()), this, this.options)) : r = t[i], r._$AI(a), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = _e(e).nextSibling;
      _e(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, t = this, r, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = P(this, e, t, 0), s = !F(e) || e !== this._$AH && e !== H, s && (this._$AH = e);
    else {
      const c = e;
      let l, p;
      for (e = a[0], l = 0; l < a.length - 1; l++) p = P(this, c[r + l], t, l), p === H && (p = this._$AH[l]), s ||= !F(p) || p !== this._$AH[l], p === g ? e = g : e !== g && (e += (p ?? "") + a[l + 1]), this._$AH[l] = p;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class it extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class at extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class st extends Z {
  constructor(e, t, r, i, a) {
    super(e, t, r, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = P(this, e, t, 0) ?? g) === H) return;
    const r = this._$AH, i = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class nt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const lt = ce.litHtmlPolyfillSupport;
lt?.(B, V), (ce.litHtmlVersions ??= []).push("3.3.3");
const ct = (o, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = i = new V(e.insertBefore(U(), a), a, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
const he = globalThis;
class z extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ct(t, this.renderRoot, this.renderOptions);
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
z._$litElement$ = !0, z.finalized = !0, he.litElementHydrateSupport?.({ LitElement: z });
const dt = he.litElementPolyfillSupport;
dt?.({ LitElement: z });
(he.litElementVersions ??= []).push("4.2.2");
function ht(o, e, t) {
  if (!(o === void 0 || !Number.isFinite(o) || o < 0 || o > 100 || !Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t < 0 || t >= 100))
    return {
      usableKwh: e * ((100 - t) / 100),
      toFullKwh: e * ((100 - o) / 100),
      aboveReserveKwh: e * (Math.max(o - t, 0) / 100)
    };
}
function pt(o, e, t, r = 0, i = /* @__PURE__ */ new Date()) {
  const a = ht(o, t, r);
  if (!a || e === void 0 || !Number.isFinite(e) || !Number.isFinite(i.getTime()))
    return;
  if (e <= 0.05 && a.aboveReserveKwh === 0) return { kind: "at_reserve" };
  const s = e > 0.05 ? "full" : e < -0.05 ? "reserve" : void 0;
  if (!s) return;
  const c = s === "full" ? a.toFullKwh : a.aboveReserveKwh;
  if (c <= 0) return;
  const l = new Date(i.getTime() + c / Math.abs(e) * 36e5);
  return Number.isFinite(l.getTime()) ? { kind: s, time: l } : void 0;
}
function ut(o, e, t = /* @__PURE__ */ new Date(), r) {
  const i = new Intl.DateTimeFormat("en-CA", { timeZone: r, year: "numeric", month: "2-digit", day: "2-digit" }), a = i.format(o) !== i.format(t);
  return new Intl.DateTimeFormat(e, {
    timeZone: r,
    hour: "numeric",
    minute: "2-digit",
    ...a ? { year: "numeric", month: "short", day: "numeric" } : {}
  }).format(o);
}
const gt = ze`
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
`, Ne = {
  "card.default_title": "Solar & storage",
  "card.subtitle": "Battery outlook",
  "card.today": "Today",
  "status.charging": "Charging",
  "status.discharging": "Discharging",
  "status.idle": "Idle",
  "battery.aria_status": "Battery status",
  "battery.full_by": "Full by {time}",
  "battery.reserve_by": "Reserve reached by {time}",
  "battery.at_reserve": "At/below reserve",
  "editor.field.battery_total_capacity": "Total battery capacity",
  "editor.field.battery_lower_soc": "Lower SOC limit",
  "editor.helper.battery_total_capacity": "Optional kWh for the sensor’s full 0–100% SOC range. Overrides usable battery capacity. Requires absolute SOC, not reserve-rescaled SOC.",
  "editor.helper.battery_lower_soc": "Discharge reserve in percent (default 0). A nonzero reserve requires total battery capacity. Does not reduce charging headroom.",
  "editor.error.total_capacity": "Total battery capacity must be a finite number greater than zero.",
  "editor.error.lower_soc": "Lower SOC limit must be a finite percentage from 0 to below 100.",
  "editor.error.reserve_requires_capacity": "Set total battery capacity before using a nonzero lower SOC limit.",
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
  "editor.helper.battery_capacity": "Optional legacy capacity in kWh. Used to estimate full time only when total battery capacity is not set.",
  "editor.helper.battery_positive_is_charging": "Turn this off if your integration reports charging as a negative value.",
  "editor.helper.grid_positive_is_export": "Turn this off if your integration reports grid export as a negative value.",
  "editor.error.required": "{field} is required."
}, ft = {
  "card.default_title": "Solar & Speicher",
  "card.subtitle": "Batterie-Prognose",
  "card.today": "Heute",
  "status.charging": "Lädt",
  "status.discharging": "Entlädt",
  "status.idle": "Bereit",
  "battery.aria_status": "Batteriestatus",
  "battery.full_by": "Voll um {time}",
  "battery.reserve_by": "Reserve erreicht um {time}",
  "battery.at_reserve": "Reserve erreicht/unterschritten",
  "editor.field.battery_total_capacity": "Gesamte Batteriekapazität",
  "editor.field.battery_lower_soc": "Untere SOC-Grenze",
  "editor.helper.battery_total_capacity": "Optionale kWh für den gesamten SOC-Bereich von 0–100 %. Hat Vorrang vor der nutzbaren Kapazität. Benötigt absoluten, nicht auf die Reserve umgerechneten SOC.",
  "editor.helper.battery_lower_soc": "Entladereserve in Prozent (Standard 0). Eine Reserve größer als null benötigt die Gesamtkapazität. Verringert nicht die zum Vollladen benötigte Energie.",
  "editor.error.total_capacity": "Die Gesamtkapazität muss eine endliche Zahl größer als null sein.",
  "editor.error.lower_soc": "Die untere SOC-Grenze muss ein endlicher Prozentwert von 0 bis unter 100 sein.",
  "editor.error.reserve_requires_capacity": "Für eine untere SOC-Grenze größer als null zuerst die Gesamtkapazität angeben.",
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
  "editor.helper.battery_capacity": "Optionale bisherige Kapazität in kWh. Wird nur ohne Gesamtkapazität zur Ladezeitschätzung verwendet.",
  "editor.helper.battery_positive_is_charging": "Deaktivieren, wenn deine Integration das Laden als negativen Wert meldet.",
  "editor.helper.grid_positive_is_export": "Deaktivieren, wenn deine Integration die Einspeisung als negativen Wert meldet.",
  "editor.error.required": "{field} ist erforderlich."
}, yt = {
  en: Ne,
  de: ft
};
function _t(o) {
  if (!o) return "en";
  const [e] = o.toLowerCase().split(/[-_]/);
  return e || "en";
}
function n(o, e, t) {
  const r = _t(e), i = yt[r]?.[o] ?? Ne[o];
  return t ? Object.entries(t).reduce(
    (a, [s, c]) => a.split(`{${s}}`).join(String(c)),
    i
  ) : i;
}
const mt = {
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0,
  power_unit: "kW",
  energy_unit: "kWh",
  battery_lower_soc: 0
}, bt = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], vt = [
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
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
], wt = [
  "solar_forecast_today",
  "battery_capacity",
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export"
];
function xt(o) {
  return vt.includes(o);
}
function $t(o) {
  return wt.includes(o);
}
function ie(o, e) {
  return n(`editor.field.${o}`, e);
}
function At(o, e) {
  return n(`editor.helper.${o}`, e);
}
function Et(o) {
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
          { name: "battery_total_capacity", selector: { number: { min: 0.01, step: 0.01, mode: "box", unit_of_measurement: "kWh" } } },
          { name: "battery_lower_soc", selector: { number: { min: 0, max: 99.99, step: 0.01, mode: "box", unit_of_measurement: "%" } } },
          { name: "battery_positive_is_charging", selector: { boolean: {} } },
          { name: "grid_positive_is_export", selector: { boolean: {} } },
          { name: "show_power_chart", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (e) => e.name && xt(e.name) ? ie(e.name, o) : void 0,
    computeHelper: (e) => e.name && $t(e.name) ? At(e.name, o) : void 0,
    assertConfig: (e) => De(e, o)
  };
}
function De(o, e) {
  o = W(o);
  for (const [i, a] of [["power_unit", ["W", "kW"]], ["energy_unit", ["Wh", "kWh"]]])
    if (!a.includes(o[i]))
      throw new Error(n("editor.error.unit", e, { field: ie(i, e) }));
  if (o.solar_forecast_today !== void 0 && (typeof o.solar_forecast_today != "string" || !/^sensor\.[a-z0-9_]+$/.test(o.solar_forecast_today)))
    throw new Error(n("editor.error.forecast_entity", e));
  const t = o.battery_total_capacity, r = o.battery_lower_soc ?? 0;
  if (t !== void 0 && (typeof t != "number" || !Number.isFinite(t) || t <= 0))
    throw new Error(n("editor.error.total_capacity", e));
  if (typeof r != "number" || !Number.isFinite(r) || r < 0 || r >= 100)
    throw new Error(n("editor.error.lower_soc", e));
  if (r !== 0 && t === void 0)
    throw new Error(n("editor.error.reserve_requires_capacity", e));
  for (const i of bt)
    if (!o[i] || typeof o[i] != "string")
      throw new Error(
        n("editor.error.required", e, {
          field: ie(i, e)
        })
      );
}
function St(o, e) {
  return o.title !== void 0 ? o.title : n("card.default_title", e);
}
function W(o) {
  const e = { ...o };
  for (const t of ["power_unit", "energy_unit", "solar_forecast_today", "battery_total_capacity", "battery_lower_soc"]) {
    const r = e[t];
    (r == null || r === "") && delete e[t];
  }
  return {
    ...mt,
    ...e,
    type: o.type || "custom:solar-battery-card"
  };
}
function N(o, e, t) {
  return o ? Object.values(o.states).find((i) => {
    if (i.attributes.device_class !== e) return !1;
    const a = `${i.entity_id} ${i.attributes.friendly_name ?? ""}`.toLowerCase();
    return t.some((s) => a.includes(s));
  })?.entity_id ?? "" : "";
}
function Ct(o) {
  return W({
    type: "custom:solar-battery-card",
    battery_soc: N(o, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: N(o, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: N(o, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: N(o, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: N(o, "power", ["grid"]) || "sensor.grid_power"
  });
}
async function kt() {
  if (customElements.get("ha-form")) return;
  if (await (await (await window.loadCardHelpers?.())?.createCardElement({ type: "button" }))?.constructor?.getConfigElement?.(), !customElements.get("ha-form"))
    throw new Error("Home Assistant's form editor is unavailable.");
}
const K = class K extends z {
  setConfig(e) {
    this.getLocalizedForm().assertConfig(e), this._config = W(e), this._error = void 0;
  }
  getLocalizedForm() {
    const e = this.hass?.locale?.language ?? this.hass?.language;
    return Et(e);
  }
  render() {
    if (!this.hass || !this._config) return g;
    const e = this.getLocalizedForm();
    return v`
      ${this._error ? v`<p role="alert">${this._error}</p>` : g}
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
    const t = W(e.detail.value);
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
K.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 }
}, K.styles = ze`
    :host {
      display: block;
    }
    [role="alert"] {
      color: var(--error-color, #db4437);
    }
  `;
let ae = K;
function zt(o, e, t, r) {
  if (r <= 1 || t <= 0) return 0;
  const i = Math.min(1, Math.max(0, (o - e) / t));
  return Math.round(i * (r - 1));
}
function Ht(o, e) {
  return e <= 1 ? 0 : Math.min(e - 1, Math.max(0, o)) / (e - 1) * 100;
}
function Pt(o, e, t, r, i = 166, a = 88, s = 14) {
  const c = Math.min(t, Math.max(0, o)), l = Math.min(
    Math.max(4, r - a - 4),
    Math.max(4, e - a / 2)
  );
  return {
    x: c,
    top: l,
    placement: c + s + i > t ? "place-left" : "place-right"
  };
}
const Tt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function pe(o) {
  if (!o || Tt.has(o.state.toLowerCase())) return;
  const e = Number(o.state);
  return Number.isFinite(e) ? e : void 0;
}
function D(o) {
  const e = pe(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "w" ? e / 1e3 : t === "mw" ? e / 1e6 : e;
}
function I(o) {
  const e = pe(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "wh" ? e / 1e3 : t === "mwh" ? e * 1e3 : e;
}
function Ie(o, e, t = {}) {
  if (o === void 0) return "—";
  const r = t.digits ?? 2;
  return `${new Intl.NumberFormat(t.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: t.signed ? "exceptZero" : "auto"
  }).format(o)} ${e}`;
}
function w(o, e) {
  return e && o ? o.states[e] : void 0;
}
function Mt(o, e, t, r = /* @__PURE__ */ new Date()) {
  if (o === void 0 || !t || t <= 0 || e <= 0 || o >= 100)
    return;
  const i = (100 - o) / 100 * t;
  return new Date(r.getTime() + i / e * 60 * 60 * 1e3);
}
function Q(o, e = "kW", t = {}) {
  return Ie(o === void 0 ? void 0 : o * (e === "W" ? 1e3 : 1), e, {
    ...t,
    digits: e === "W" ? 0 : 2
  });
}
function Ae(o, e = "kWh", t) {
  return Ie(o === void 0 ? void 0 : o * (e === "Wh" ? 1e3 : 1), e, {
    locale: t,
    digits: e === "Wh" ? 0 : 1
  });
}
function Lt(o) {
  const e = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  if (!e || !["wh", "kwh", "mwh"].includes(e) || !o?.state.trim()) return;
  const t = I(o);
  return t !== void 0 && Number.isFinite(t) && t >= 0 ? t : void 0;
}
const Ot = 24, Ee = 24;
function ee(o, e) {
  return o.find((t) => t.some((r) => r.entity_id === e)) ?? [];
}
function Se(o, e) {
  return o ? D({
    ...o,
    attributes: {
      ...e?.attributes,
      ...o.attributes
    }
  }) ?? 0 : 0;
}
function te(o, e, t) {
  if (o.length === 0) return 0;
  let r = o[0], i = o.at(-1) ?? o[0];
  for (const u of o) {
    const d = Date.parse(u.last_changed ?? u.last_updated ?? "");
    if (Number.isFinite(d) && (d <= e && (r = u), d >= e)) {
      i = u;
      break;
    }
  }
  const a = Date.parse(r.last_changed ?? r.last_updated ?? ""), s = Date.parse(i.last_changed ?? i.last_updated ?? ""), c = Se(r, t), l = Se(i, t);
  if (!Number.isFinite(a) || !Number.isFinite(s) || a === s)
    return c;
  const p = Math.min(
    1,
    Math.max(0, (e - a) / (s - a))
  );
  return c + (l - c) * p;
}
async function Nt(o, e, t = /* @__PURE__ */ new Date()) {
  const r = t, i = new Date(r.getTime() - Ot * 60 * 60 * 1e3), a = [e.solar, e.home, e.battery], s = `history/period/${encodeURIComponent(i.toISOString())}?end_time=${encodeURIComponent(r.toISOString())}&filter_entity_id=${encodeURIComponent(a.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, c = await o.callApi("GET", s), l = ee(c, e.solar), p = ee(c, e.home), u = ee(c, e.battery);
  return Array.from({ length: Ee }, (d, f) => {
    const y = i.getTime() + f / (Ee - 1) * (r.getTime() - i.getTime());
    return {
      timestamp: y,
      solar: Math.max(0, te(l, y, o.states[e.solar])),
      home: Math.max(0, te(p, y, o.states[e.home])),
      battery: te(u, y, o.states[e.battery])
    };
  });
}
const x = 480, E = 126, Dt = 300 * 1e3;
function re(o, e, t) {
  return Math.min(t, Math.max(e, o));
}
function Ce(o, e, t, r) {
  if (o.length === 0) return [];
  const i = Math.max(0.1, r - t);
  return o.map((a, s) => [
    s / Math.max(1, o.length - 1) * x,
    4 + (r - a[e]) / i * (E - 8)
  ]);
}
function It(o) {
  return o.length === 0 ? "" : o.length === 1 ? `M 0 ${o[0][1]} L ${x} ${o[0][1]}` : o.slice(1).reduce((e, [t, r], i) => {
    const [a, s] = o[i], c = (a + t) / 2;
    return `${e} C ${c} ${s}, ${c} ${r}, ${t} ${r}`;
  }, `M ${o[0][0]} ${o[0][1]}`);
}
function Rt(o, e, t, r = Date.now()) {
  const i = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], a = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], s = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return i.map((c, l) => ({
    timestamp: r - (i.length - 1 - l) * 2.4 * 60 * 60 * 1e3,
    solar: c * Math.max(o, 0.1),
    home: a[l] * Math.max(e, 0.1),
    battery: s[l] * t
  }));
}
const Y = class Y extends z {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0;
  }
  static async getConfigElement() {
    return await kt(), document.createElement("solar-battery-card-editor");
  }
  static getStubConfig(e) {
    return Ct(e);
  }
  setConfig(e) {
    De(e), this._config = W({ ...e });
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
    if (!(this._historyLoading || r === this._lastHistoryKey && i - this._lastHistoryFetch < Dt)) {
      this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = r, this._lastHistoryFetch = i;
      try {
        this._history = await Nt(t, {
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
    this._chartPointer = Pt(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height
    );
    const i = zt(
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
    this._activeChartIndex = e.key === "Home" ? 0 : e.key === "End" ? t - 1 : re(r + (e.key === "ArrowLeft" ? -1 : 1), 0, t - 1);
  }
  _renderChart(e, t) {
    const r = e.flatMap((h) => [
      h.solar,
      h.home,
      h.battery
    ]), i = Math.min(0, ...r), a = Math.max(
      0.1,
      ...r
    ), s = Math.max(0.1, a - i), c = 4 + a / s * (E - 8), l = ["solar", "home", "battery"].map((h) => {
      const _ = Ce(e, h, i, a);
      return {
        key: h,
        path: It(_),
        end: _.at(-1) ?? [x, E]
      };
    }), p = this._activeChartIndex === void 0 ? void 0 : re(this._activeChartIndex, 0, e.length - 1), u = p === void 0 ? void 0 : e[p], d = p === void 0 ? void 0 : p / Math.max(1, e.length - 1) * x, f = p === void 0 ? void 0 : Ht(p, e.length), y = p === void 0 ? [] : ["solar", "home", "battery"].map((h) => ({
      key: h,
      coordinate: Ce(e, h, i, a)[p]
    })), m = this._chartPointer?.placement ?? (f !== void 0 && f > 64 ? "place-left" : "place-right"), j = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${f ?? 0}%`, T = u ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit"
    }).format(u.timestamp) : "";
    return v`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label=${n("chart.aria", t)}
        @pointerdown=${(h) => this._inspectChart(h, e.length)}
        @pointermove=${(h) => this._inspectChart(h, e.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(h) => this._navigateChart(h, e.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${x} ${E}"
          role="img"
          aria-label=${n("chart.svg_aria", t)}
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((h) => {
      const _ = h / 3 * E;
      return O`<line class="grid-line" x1="0" y1=${_} x2=${x} y2=${_}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((h) => {
      const _ = h / 4 * x;
      return O`<line class="grid-line" x1=${_} y1="0" x2=${_} y2=${E}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${c}
            x2=${x}
            y2=${c}
          ></line>
          ${l.map(
      ({ key: h, path: _, end: M }) => O`
              <path class="chart-line ${h}" d=${_}></path>
              <circle class="end-dot ${h}" cx=${M[0]} cy=${M[1]} r="4.5"></circle>
            `
    )}
          ${d === void 0 ? g : O`
                <line
                  class="inspection-line"
                  x1=${d}
                  y1="0"
                  x2=${d}
                  y2=${E}
                ></line>
                ${y.map(
      ({ key: h, coordinate: _ }) => O`
                    <circle
                      class="inspection-dot ${h}"
                      cx=${_[0]}
                      cy=${_[1]}
                      r="5"
                    ></circle>
                  `
    )}
              `}
        </svg>
        ${u && f !== void 0 ? v`
              <div
                class="chart-tooltip ${m}"
                style=${j}
                aria-live="polite"
              >
                <time>${T}</time>
                ${[
      { key: "solar", label: n("power.solar", t), value: u.solar, signed: !1 },
      { key: "home", label: n("power.home", t), value: u.home, signed: !1 },
      {
        key: "battery",
        label: n("power.battery", t),
        value: u.battery,
        signed: !0
      }
    ].map(
      (h) => v`
                    <div class="tooltip-item ${h.key}">
                      <span><i></i>${h.label}</span>
                      <strong>
                        ${Q(h.value, this._config?.power_unit, {
        signed: h.signed,
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
    const t = this.hass, r = t?.locale?.language ?? t?.language, i = pe(w(t, e.battery_soc)), a = re(
      i ?? 0,
      0,
      100
    ), s = Math.max(0, D(w(t, e.solar_power)) ?? 0), c = Math.max(0, D(w(t, e.home_power)) ?? 0), l = D(w(t, e.battery_power)), p = l ?? 0, u = D(w(t, e.grid_power)) ?? 0, d = e.battery_positive_is_charging === !1 ? -1 : 1, f = d * p, y = (e.grid_positive_is_export === !1 ? -1 : 1) * u, m = f > 0.05 ? "charging" : f < -0.05 ? "discharging" : "idle", j = n(m === "charging" ? "status.charging" : m === "discharging" ? "status.discharging" : "status.idle", r), T = /* @__PURE__ */ new Date(), h = e.battery_total_capacity === void 0 ? void 0 : pt(
      i,
      l === void 0 ? void 0 : d * l,
      e.battery_total_capacity,
      e.battery_lower_soc,
      T
    ), _ = e.battery_total_capacity !== void 0 ? void 0 : Mt(
      a,
      Math.max(0, f),
      e.battery_capacity,
      T
    ), M = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit"
    }), Re = h?.kind === "at_reserve" ? n("battery.at_reserve", r) : h ? n(h.kind === "full" ? "battery.full_by" : "battery.reserve_by", r, {
      time: ut(h.time, r, T, t?.config?.time_zone)
    }) : _ ? n("battery.full_by", r, { time: M.format(_) }) : m === "charging" ? n("battery.charging_now", r) : j, Ue = this._history.length > 1 ? this._history.map((b) => ({
      ...b,
      battery: d * b.battery
    })) : Rt(s, c, f), Fe = [
      {
        label: n("energy.generated", r),
        value: I(w(t, e.solar_energy_today)),
        tone: "solar"
      },
      {
        label: n("energy.consumed", r),
        value: I(w(t, e.home_energy_today)),
        tone: "home"
      },
      {
        label: n("energy.stored", r),
        value: I(w(t, e.battery_energy_today)),
        tone: "battery"
      },
      {
        label: n("energy.exported", r),
        value: I(w(t, e.export_energy_today)),
        tone: "export"
      }
    ], Be = s >= c && f > 0.05 && y > 0.05 ? n("footer.solar_home_battery_export", r) : s >= c && f > 0.05 ? n("footer.solar_home_battery", r) : s >= c ? n("footer.solar_home", r) : n("footer.drawing", r);
    return v`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${We}></path></svg>
              </div>
              <div>
                <h1>${St(e, r)}</h1>
                <p class="subtitle">
                  ${n("card.subtitle", r)}
                  <span aria-hidden="true">·</span>
                  ${n("card.today", r)}
                </p>
              </div>
            </div>
            <div class="status ${m}">
              <span class="dot"></span>
              ${j}
            </div>
          </header>

          <section class="battery-hero" aria-label=${n("battery.aria_status", r)}>
            <div>
              <div class="percentage">${Math.round(a)}<span>%</span></div>
              <strong class="forecast">
                ${Re}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label=${n("battery.aria_graphic", r, {
      percent: Math.round(a)
    })}
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${a}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${n(m === "charging" ? "battery.charging" : m === "discharging" ? "battery.supplying" : "battery.idle", r)}
              </span>
              <strong>
                ${Q(f, e.power_unit, {
      signed: !0,
      locale: r
    })}
              </strong>
            </div>
          </section>

          <section class="power-stats" aria-label=${n("power.aria", r)}>
            ${[
      { label: n("power.solar", r), value: s, tone: "solar", signed: !1 },
      { label: n("power.home", r), value: c, tone: "home", signed: !1 },
      { label: n("power.battery", r), value: f, tone: "battery", signed: !0 },
      { label: n("power.export", r), value: y, tone: "export", signed: !1 }
    ].map(
      (b) => v`
                <div class="power-stat ${b.tone}">
                  <span>${b.label}</span>
                  <strong>
                    ${Q(b.value, this._config?.power_unit, {
        signed: b.signed,
        locale: r
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${e.show_power_chart === !1 ? g : v`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>${n("chart.heading", r)}</h2>
                    <time>${M.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(Ue, r)}
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
                  ${this._historyFailed ? v`<p class="history-note">${n("chart.history_unavailable", r)}</p>` : g}
                </section>
              `}

          <section class="energy-stats" aria-label=${n("energy.aria", r)}>
            ${Fe.map(
      (b) => v`
                <div class="energy-stat ${b.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${b.label}</span>
                    <strong>${Ae(b.value, e.energy_unit, r)}</strong>
                    ${b.tone === "solar" && e.solar_forecast_today ? v`<span class="solar-forecast">${n("energy.forecast_today", r)}
                          ${Ae(Lt(w(t, e.solar_forecast_today)), e.energy_unit, r)}</span>` : g}
                  </div>
                </div>
              `
    )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${Be}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
Y.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 },
  _chartPointer: { state: !0 }
}, Y.styles = gt;
let se = Y;
typeof customElements < "u" && (customElements.get("solar-battery-card-editor") || customElements.define("solar-battery-card-editor", ae), customElements.get("solar-battery-card") || customElements.define("solar-battery-card", se));
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
