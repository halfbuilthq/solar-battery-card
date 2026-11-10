const ne = globalThis, Ee = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Se = /* @__PURE__ */ Symbol(), Me = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ee && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (o) => new Ke(typeof o == "string" ? o : o + "", void 0, Se), Ce = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((r, i, a) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[a + 1], o[0]);
  return new Ke(t, o, Se);
}, ht = (o, e) => {
  if (Ee) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = ne.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, o.appendChild(r);
  }
}, Le = Ee ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return dt(t);
})(o) : o;
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: ft, getOwnPropertyNames: _t, getOwnPropertySymbols: gt, getPrototypeOf: mt } = Object, ue = globalThis, Ie = ue.trustedTypes, yt = Ie ? Ie.emptyScript : "", bt = ue.reactiveElementPolyfillSupport, J = (o, e) => o, ve = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? yt : null;
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
} }, Ye = (o, e) => !pt(o, e), De = { attribute: !0, type: String, converter: ve, reflect: !1, useDefault: !1, hasChanged: Ye };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ue.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let B = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = De) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && ut(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: a } = ft(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const h = i?.call(this);
      a?.call(this, s), this.requestUpdate(e, h, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = mt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const t = this.properties, r = [..._t(t), ...gt(t)];
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
      for (const i of r) t.unshift(Le(i));
    } else e !== void 0 && t.push(Le(e));
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
    return ht(e, this.constructor.elementStyles), e;
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
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : ve).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ve;
      this._$Em = i;
      const h = s.fromAttribute(t, a.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, a) {
    if (e !== void 0) {
      const s = this.constructor;
      if (i === !1 && (a = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? Ye)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
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
        const { wrapped: s } = a, h = this[i];
        s !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, a, h);
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
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[J("elementProperties")] = /* @__PURE__ */ new Map(), B[J("finalized")] = /* @__PURE__ */ new Map(), bt?.({ ReactiveElement: B }), (ue.reactiveElementVersions ??= []).push("2.1.2");
const ze = globalThis, Ne = (o) => o, le = ze.trustedTypes, Fe = le ? le.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Xe = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, Je = "?" + M, vt = `<${Je}>`, U = document, ee = () => U.createComment(""), te = (o) => o === null || typeof o != "object" && typeof o != "function", He = Array.isArray, wt = (o) => He(o) || typeof o?.[Symbol.iterator] == "function", _e = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, We = /-->/g, Oe = />/g, I = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Re = /'/g, Ue = /"/g, Qe = /^(?:script|style|textarea|title)$/i, et = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), x = et(1), C = et(2), V = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), Be = /* @__PURE__ */ new WeakMap(), O = U.createTreeWalker(U, 129);
function tt(o, e) {
  if (!He(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Fe !== void 0 ? Fe.createHTML(e) : e;
}
const xt = (o, e) => {
  const t = o.length - 1, r = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = G;
  for (let h = 0; h < t; h++) {
    const l = o[h];
    let p, u, c = -1, m = 0;
    for (; m < l.length && (s.lastIndex = m, u = s.exec(l), u !== null); ) m = s.lastIndex, s === G ? u[1] === "!--" ? s = We : u[1] !== void 0 ? s = Oe : u[2] !== void 0 ? (Qe.test(u[2]) && (i = RegExp("</" + u[2], "g")), s = I) : u[3] !== void 0 && (s = I) : s === I ? u[0] === ">" ? (s = i ?? G, c = -1) : u[1] === void 0 ? c = -2 : (c = s.lastIndex - u[2].length, p = u[1], s = u[3] === void 0 ? I : u[3] === '"' ? Ue : Re) : s === Ue || s === Re ? s = I : s === We || s === Oe ? s = G : (s = I, i = void 0);
    const _ = s === I && o[h + 1].startsWith("/>") ? " " : "";
    a += s === G ? l + vt : c >= 0 ? (r.push(p), l.slice(0, c) + Xe + l.slice(c) + M + _) : l + M + (c === -2 ? h : _);
  }
  return [tt(o, a + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class re {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const h = e.length - 1, l = this.parts, [p, u] = xt(e, t);
    if (this.el = re.createElement(p, r), O.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = O.nextNode()) !== null && l.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Xe)) {
          const m = u[s++], _ = i.getAttribute(c).split(M), $ = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: $[2], strings: _, ctor: $[1] === "." ? kt : $[1] === "?" ? At : $[1] === "@" ? Et : fe }), i.removeAttribute(c);
        } else c.startsWith(M) && (l.push({ type: 6, index: a }), i.removeAttribute(c));
        if (Qe.test(i.tagName)) {
          const c = i.textContent.split(M), m = c.length - 1;
          if (m > 0) {
            i.textContent = le ? le.emptyScript : "";
            for (let _ = 0; _ < m; _++) i.append(c[_], ee()), O.nextNode(), l.push({ type: 2, index: ++a });
            i.append(c[m], ee());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Je) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(M, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += M.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = U.createElement("template");
    return r.innerHTML = e, r;
  }
}
function q(o, e, t = o, r) {
  if (e === V) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = te(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(o), i._$AT(o, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = q(o, i._$AS(o, e.values), i, r)), e;
}
class $t {
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
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? U).importNode(t, !0);
    O.currentNode = i;
    let a = O.nextNode(), s = 0, h = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let p;
        l.type === 2 ? p = new ie(a, a.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (p = new St(a, this, e)), this._$AV.push(p), l = r[++h];
      }
      s !== l?.index && (a = O.nextNode(), s++);
    }
    return O.currentNode = U, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class ie {
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
    e = q(this, e, t), te(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== V && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : wt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(U.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = re.createElement(tt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const a = new $t(i, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Be.get(e.strings);
    return t === void 0 && Be.set(e.strings, t = new re(e)), t;
  }
  k(e) {
    He(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const a of e) i === t.length ? t.push(r = new ie(this.O(ee()), this.O(ee()), this, this.options)) : r = t[i], r._$AI(a), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = Ne(e).nextSibling;
      Ne(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class fe {
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
    if (a === void 0) e = q(this, e, t, 0), s = !te(e) || e !== this._$AH && e !== V, s && (this._$AH = e);
    else {
      const h = e;
      let l, p;
      for (e = a[0], l = 0; l < a.length - 1; l++) p = q(this, h[r + l], t, l), p === V && (p = this._$AH[l]), s ||= !te(p) || p !== this._$AH[l], p === g ? e = g : e !== g && (e += (p ?? "") + a[l + 1]), this._$AH[l] = p;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class kt extends fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class At extends fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Et extends fe {
  constructor(e, t, r, i, a) {
    super(e, t, r, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = q(this, e, t, 0) ?? g) === V) return;
    const r = this._$AH, i = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class St {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const Ct = ze.litHtmlPolyfillSupport;
Ct?.(re, ie), (ze.litHtmlVersions ??= []).push("3.3.3");
const zt = (o, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = i = new ie(e.insertBefore(ee(), a), a, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
const Pe = globalThis;
class R extends B {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = zt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
}
R._$litElement$ = !0, R.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: R });
const Ht = Pe.litElementPolyfillSupport;
Ht?.({ LitElement: R });
(Pe.litElementVersions ??= []).push("4.2.2");
const Pt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]);
function Te(o) {
  if (!o || Pt.has(o.state.toLowerCase())) return;
  const e = Number(o.state);
  return Number.isFinite(e) ? e : void 0;
}
function L(o) {
  const e = Te(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "w" ? e / 1e3 : t === "mw" ? e / 1e6 : e;
}
function X(o) {
  const e = Te(o);
  if (e === void 0) return;
  const t = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  return t === "wh" ? e / 1e3 : t === "mwh" ? e * 1e3 : e;
}
function rt(o, e, t = {}) {
  if (o === void 0) return "—";
  const r = t.digits ?? 2;
  return `${new Intl.NumberFormat(t.locale, {
    minimumFractionDigits: r,
    maximumFractionDigits: r,
    signDisplay: t.signed ? "exceptZero" : "auto"
  }).format(o)} ${e}`;
}
function E(o, e) {
  return e && o ? o.states[e] : void 0;
}
function Tt(o, e, t, r = /* @__PURE__ */ new Date()) {
  if (o === void 0 || !t || t <= 0 || e <= 0 || o >= 100)
    return;
  const i = (100 - o) / 100 * t;
  return new Date(r.getTime() + i / e * 60 * 60 * 1e3);
}
function Q(o, e = "kW", t = {}) {
  return rt(o === void 0 ? void 0 : o * (e === "W" ? 1e3 : 1), e, {
    ...t,
    digits: e === "W" ? 0 : 2
  });
}
function ce(o, e = "kWh", t) {
  return rt(o === void 0 ? void 0 : o * (e === "Wh" ? 1e3 : 1), e, {
    locale: t,
    digits: e === "Wh" ? 0 : 1
  });
}
function Mt(o) {
  const e = o?.attributes.unit_of_measurement?.toLowerCase().replace(/\s/g, "");
  if (!e || !["wh", "kwh", "mwh"].includes(e) || !o?.state.trim()) return;
  const t = X(o);
  return t !== void 0 && Number.isFinite(t) && t >= 0 ? t : void 0;
}
const Z = /* @__PURE__ */ new Map();
function we(o, e) {
  const t = new Intl.DateTimeFormat("en-CA", {
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }), r = (u) => {
    const c = t.formatToParts(u);
    return ["year", "month", "day"].map((m) => c.find((_) => _.type === m).value).join("-");
  }, i = o.getTime(), a = r(i), s = `${t.resolvedOptions().timeZone}:${a}`, h = Z.get(s);
  if (h) return h;
  const l = (u, c, m) => {
    for (; c - u > 1; ) {
      const _ = Math.floor((u + c) / 2), $ = r(_);
      $ < a || m && $ === a ? u = _ : c = _;
    }
    return c;
  }, p = {
    start: l(i - 36 * 36e5, i, !1),
    end: l(i, i + 36 * 36e5, !0)
  };
  return Z.size >= 8 && Z.delete(Z.keys().next().value), Z.set(s, p), p;
}
function ge(o, e) {
  return e.split(".").reduce((t, r) => t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, r) ? t[r] : void 0, o);
}
function Lt(o) {
  if (typeof o != "string" || !/T.*(?:Z|[+-]\d{2}:\d{2})$/i.test(o)) return;
  const e = Date.parse(o);
  return Number.isFinite(e) ? e : void 0;
}
function ot(o, e, t) {
  const r = (c) => ({ status: c, points: [] });
  if (!o) return r("missing");
  if (e.solar_forecast_mode !== "hourly") {
    const c = Mt(o);
    return c === void 0 ? r("missing") : {
      status: "ok",
      totalKwh: c,
      points: [{ timestamp: t.start, kwh: c }, { timestamp: t.end, kwh: c }]
    };
  }
  const i = ge(o.attributes, e.solar_forecast_attribute ?? "forecast");
  if (!Array.isArray(i) || i.length === 0) return r("missing");
  const a = (e.solar_forecast_interval_minutes ?? 60) * 6e4, s = e.solar_forecast_input_unit ?? "kWh";
  if (!Number.isFinite(a) || a <= 0 || !["Wh", "kWh", "MWh", "W", "kW"].includes(s)) return r("invalid");
  const h = [];
  for (const c of i) {
    const m = Lt(ge(c, e.solar_forecast_time_field ?? "start"));
    if (m === void 0) return r("invalid");
    const _ = e.solar_forecast_time_is_end ? m - a : m, $ = _ + a;
    if ($ <= t.start || _ >= t.end) continue;
    const k = ge(c, e.solar_forecast_value_field ?? "energy");
    if (typeof k != "number" && typeof k != "string" || String(k).trim() === "") return r("invalid");
    const w = Number(k);
    if (!Number.isFinite(w) || w < 0) return r("invalid");
    const z = s === "Wh" ? w / 1e3 : s === "MWh" ? w * 1e3 : s === "W" ? w / 1e3 * a / 36e5 : s === "kW" ? w * a / 36e5 : w, f = Math.max(_, t.start), y = Math.min($, t.end);
    h.push({ start: f, end: y, kwh: z * (y - f) / a });
  }
  h.sort((c, m) => c.start - m.start);
  let l = t.start, p = 0;
  const u = [{ timestamp: l, kwh: 0 }];
  for (const c of h) {
    if (c.start < l) return r("invalid");
    if (c.start > l) return r("incomplete");
    if (p += c.kwh, !Number.isFinite(p)) return r("invalid");
    l = c.end, u.push({ timestamp: l, kwh: p });
  }
  return l !== t.end ? r("incomplete") : { status: "ok", points: u, totalKwh: p };
}
function Ve(o, e) {
  for (const t of o)
    for (let r = 0; r < t.length; r++) {
      const i = t[r];
      if (e === i.timestamp) return i.kwh;
      const a = t[r - 1];
      if (a && e > a.timestamp && e < i.timestamp)
        return a.kwh + (i.kwh - a.kwh) * (e - a.timestamp) / (i.timestamp - a.timestamp);
    }
}
const it = {
  "editor.field.show_solar": "Show solar",
  "editor.field.show_battery": "Show battery",
  "editor.helper.show_solar": "Show solar readings and forecasts. Turn off for a system without solar; solar sensors are then optional.",
  "editor.helper.show_battery": "Show battery status and readings. Turn off for a system without a battery; battery sensors are then optional.",
  "card.title_home": "Home energy",
  "card.title_battery": "Battery & home",
  "card.title_solar": "Solar & home",
  "card.subtitle_power": "Power overview",
  "footer.overview": "Home energy overview",
  "editor.section.solar_forecast": "Solar forecast",
  "editor.section.hourly_forecast": "Hourly input mapping",
  "forecast.mode.daily": "Daily total",
  "forecast.mode.hourly": "Hourly / interval data",
  "forecast.heading": "Power & forecast · today",
  "forecast.inspect": "Inspect power and forecast. Use left/right arrows, Home, End or Escape.",
  "forecast.aria": "Today’s power on the left axis, solar forecast energy on the right axis",
  "forecast.expected": "Forecast curve",
  "forecast.target": "Daily target",
  "forecast.history_failed": "Power history unavailable. Only current readings are shown.",
  "forecast.missing": "Forecast unavailable. Select a forecast sensor and check its data.",
  "forecast.invalid": "Invalid hourly forecast. Check timestamps, values, units and overlapping intervals.",
  "forecast.incomplete": "Hourly forecast is incomplete for today. Include every interval, with zeros overnight, or select a daily total.",
  "editor.error.forecast_mode": "Forecast format must be daily or hourly.",
  "editor.error.boolean": "{field} must be true or false.",
  "editor.error.forecast_path": "{field} must be a field name or a dotted path.",
  "editor.error.forecast_interval": "Forecast interval must be a whole number of minutes from 1 to 1440.",
  "editor.field.show_forecast_line": "Show forecast line on power chart",
  "editor.field.solar_forecast_mode": "Forecast data format",
  "editor.field.solar_forecast_attribute": "Forecast array attribute",
  "editor.field.solar_forecast_time_field": "Timestamp field",
  "editor.field.solar_forecast_value_field": "Value field",
  "editor.field.solar_forecast_input_unit": "Hourly input unit",
  "editor.field.solar_forecast_interval_minutes": "Interval length",
  "editor.field.solar_forecast_time_is_end": "Timestamps mark interval ends",
  "editor.helper.show_forecast_line": "Adds a blue energy forecast to the power chart and shows today, including future hours. Power uses the left axis; forecast energy uses the right axis.",
  "editor.helper.solar_forecast_mode": "Daily uses the sensor total as a target. Hourly accumulates interval forecasts into a curve.",
  "editor.helper.solar_forecast_attribute": "Hourly only. Attribute containing an array of interval records; dotted paths are supported. Default: forecast.",
  "editor.helper.solar_forecast_time_field": "Hourly only. ISO timestamp with Z or a UTC offset. Default: start. Dotted paths are supported.",
  "editor.helper.solar_forecast_value_field": "Hourly only. Energy per interval or average power, not a running total. Default: energy.",
  "editor.helper.solar_forecast_input_unit": "Energy is per interval; W/kW means average power over the interval. Independent of display units.",
  "editor.helper.solar_forecast_interval_minutes": "Hourly only. Default 60; use 30 for half-hourly data. Supply the full day, including zero-generation intervals.",
  "editor.helper.solar_forecast_time_is_end": "Hourly only. Off means timestamps mark interval starts.",
  "card.default_title": "Solar & storage",
  "card.subtitle": "Battery outlook",
  "card.today": "Today",
  "status.charging": "Charging",
  "status.discharging": "Discharging",
  "status.idle": "Idle",
  "battery.aria_status": "Battery status",
  "battery.full_by": "Full by {time}",
  "battery.reserve_by": "Reserve reached by {time}",
  "battery.reserve_by_short": "Reserve by {time}",
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
  "power.grid": "Grid",
  "power.import": "Import",
  "power.export": "Export",
  "chart.heading": "Power · 24 hours",
  "chart.aria": "Inspect power history",
  "chart.svg_aria": "Power for the past 24 hours",
  "chart.axis_start": "24h ago",
  "chart.axis_now": "Now",
  "chart.legend_aria": "Chart legend",
  "chart.history_unavailable": "Live history unavailable · showing current profile",
  "energy.aria": "Energy today",
  "energy.generated": "Generated",
  "energy.forecast_today": "Forecast today",
  "editor.field.solar_forecast_today": "Solar forecast today",
  "editor.helper.solar_forecast_today": "Daily: full-day energy sensor in Wh/kWh/MWh, not remaining today. Hourly: sensor containing the configured interval array.",
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
}, It = {
  "editor.field.show_solar": "Solar anzeigen",
  "editor.field.show_battery": "Batterie anzeigen",
  "editor.helper.show_solar": "Solarwerte und Prognosen anzeigen. Für Anlagen ohne Solar ausschalten; Solarsensoren sind dann optional.",
  "editor.helper.show_battery": "Batteriestatus und Werte anzeigen. Für Anlagen ohne Batterie ausschalten; Batteriesensoren sind dann optional.",
  "card.title_home": "Hausenergie",
  "card.title_battery": "Batterie & Haus",
  "card.title_solar": "Solar & Haus",
  "card.subtitle_power": "Leistungsübersicht",
  "footer.overview": "Energieübersicht des Hauses",
  "editor.section.solar_forecast": "Solarprognose",
  "editor.section.hourly_forecast": "Zuordnung der Intervalldaten",
  "forecast.mode.daily": "Tagessumme",
  "forecast.mode.hourly": "Stündliche / Intervalldaten",
  "forecast.heading": "Leistung & Prognose · heute",
  "forecast.inspect": "Leistung und Prognose untersuchen. Pfeiltasten, Pos1, Ende oder Escape verwenden.",
  "forecast.aria": "Heutige Leistung links, Solarprognoseenergie rechts",
  "forecast.expected": "Prognosekurve",
  "forecast.target": "Tagesziel",
  "forecast.history_failed": "Leistungsverlauf nicht verfügbar. Nur aktuelle Werte werden angezeigt.",
  "forecast.missing": "Prognose nicht verfügbar. Prognosesensor auswählen und Daten prüfen.",
  "forecast.invalid": "Ungültige Intervallprognose. Zeitstempel, Werte, Einheiten und überlappende Intervalle prüfen.",
  "forecast.incomplete": "Die Intervallprognose für heute ist unvollständig. Alle Intervalle mit nächtlichen Nullwerten liefern oder eine Tagessumme wählen.",
  "editor.error.forecast_mode": "Das Prognoseformat muss daily oder hourly sein.",
  "editor.error.boolean": "{field} muss true oder false sein.",
  "editor.error.forecast_path": "{field} muss ein Feldname oder ein Pfad mit Punkten sein.",
  "editor.error.forecast_interval": "Das Prognoseintervall muss eine ganze Minutenzahl von 1 bis 1440 sein.",
  "editor.field.show_forecast_line": "Prognoselinie im Leistungsdiagramm anzeigen",
  "editor.field.solar_forecast_mode": "Format der Prognosedaten",
  "editor.field.solar_forecast_attribute": "Attribut mit Prognoseliste",
  "editor.field.solar_forecast_time_field": "Zeitstempelfeld",
  "editor.field.solar_forecast_value_field": "Wertefeld",
  "editor.field.solar_forecast_input_unit": "Einheit der Intervallwerte",
  "editor.field.solar_forecast_interval_minutes": "Intervalllänge",
  "editor.field.solar_forecast_time_is_end": "Zeitstempel markieren das Intervallende",
  "editor.helper.show_forecast_line": "Ergänzt eine blaue Energieprognose im Leistungsdiagramm für den heutigen Tag, einschließlich zukünftiger Stunden. Leistung links, Prognoseenergie rechts.",
  "editor.helper.solar_forecast_mode": "Täglich nutzt den Sensorwert als Tagesziel. Stündlich summiert Intervallprognosen zu einer Kurve.",
  "editor.helper.solar_forecast_attribute": "Nur stündlich. Attribut mit einer Liste von Intervallen; Pfade mit Punkten sind möglich. Standard: forecast.",
  "editor.helper.solar_forecast_time_field": "Nur stündlich. ISO-Zeitstempel mit Z oder UTC-Versatz. Standard: start. Pfade mit Punkten sind möglich.",
  "editor.helper.solar_forecast_value_field": "Nur stündlich. Energie pro Intervall oder mittlere Leistung, keine laufende Summe. Standard: energy.",
  "editor.helper.solar_forecast_input_unit": "Energie gilt pro Intervall; W/kW bedeutet mittlere Leistung im Intervall. Unabhängig von der Anzeigeeinheit.",
  "editor.helper.solar_forecast_interval_minutes": "Nur stündlich. Standard 60; für halbstündliche Daten 30 wählen. Den ganzen Tag einschließlich Null-Intervallen liefern.",
  "editor.helper.solar_forecast_time_is_end": "Nur stündlich. Aus bedeutet: Zeitstempel markieren den Intervallbeginn.",
  "card.default_title": "Solar & Speicher",
  "card.subtitle": "Batterie-Prognose",
  "card.today": "Heute",
  "status.charging": "Lädt",
  "status.discharging": "Entlädt",
  "status.idle": "Bereit",
  "battery.aria_status": "Batteriestatus",
  "battery.full_by": "Voll um {time}",
  "battery.reserve_by": "Reserve erreicht um {time}",
  "battery.reserve_by_short": "Reserve um {time}",
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
  "power.grid": "Netz",
  "power.import": "Netzbezug",
  "power.export": "Einspeisung",
  "chart.heading": "Leistung · 24 Stunden",
  "chart.aria": "Leistungsverlauf untersuchen",
  "chart.svg_aria": "Leistung der letzten 24 Stunden",
  "chart.axis_start": "vor 24 h",
  "chart.axis_now": "Jetzt",
  "chart.legend_aria": "Diagrammlegende",
  "chart.history_unavailable": "Verlauf nicht verfügbar · aktuelles Profil wird gezeigt",
  "energy.aria": "Energie heute",
  "energy.generated": "Erzeugt",
  "energy.forecast_today": "Prognose heute",
  "editor.field.solar_forecast_today": "Solarprognose heute",
  "editor.helper.solar_forecast_today": "Täglich: Energie für den ganzen Tag in Wh/kWh/MWh, nicht verbleibende Energie. Stündlich: Sensor mit der konfigurierten Intervallliste.",
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
}, Dt = {
  en: it,
  de: It
};
function Nt(o) {
  if (!o) return "en";
  const [e] = o.toLowerCase().split(/[-_]/);
  return e || "en";
}
function n(o, e, t) {
  const r = Nt(e), i = Dt[r]?.[o] ?? it[o];
  return t ? Object.entries(t).reduce(
    (a, [s, h]) => a.split(`{${s}}`).join(String(h)),
    i
  ) : i;
}
const Ft = {
  battery_positive_is_charging: !0,
  grid_positive_is_export: !0,
  show_power_chart: !0,
  show_solar: !0,
  show_battery: !0,
  power_unit: "kW",
  energy_unit: "kWh",
  battery_lower_soc: 0,
  show_forecast_line: !1,
  solar_forecast_mode: "daily",
  solar_forecast_attribute: "forecast",
  solar_forecast_time_field: "start",
  solar_forecast_value_field: "energy",
  solar_forecast_input_unit: "kWh",
  solar_forecast_interval_minutes: 60,
  solar_forecast_time_is_end: !1
}, Wt = [
  "battery_soc",
  "solar_power",
  "home_power",
  "battery_power",
  "grid_power"
], Ot = [
  "show_solar",
  "show_battery",
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
  "show_forecast_line",
  "solar_forecast_mode",
  "solar_forecast_attribute",
  "solar_forecast_time_field",
  "solar_forecast_value_field",
  "solar_forecast_input_unit",
  "solar_forecast_interval_minutes",
  "solar_forecast_time_is_end",
  "home_energy_today",
  "battery_energy_today",
  "export_energy_today",
  "battery_capacity",
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export",
  "show_power_chart"
], Rt = [
  "show_solar",
  "show_battery",
  "solar_forecast_today",
  "show_forecast_line",
  "solar_forecast_mode",
  "solar_forecast_attribute",
  "solar_forecast_time_field",
  "solar_forecast_value_field",
  "solar_forecast_input_unit",
  "solar_forecast_interval_minutes",
  "solar_forecast_time_is_end",
  "battery_capacity",
  "battery_total_capacity",
  "battery_lower_soc",
  "battery_positive_is_charging",
  "grid_positive_is_export"
];
function Ut(o) {
  return Ot.includes(o);
}
function Bt(o) {
  return Rt.includes(o);
}
function F(o, e) {
  return n(`editor.field.${o}`, e);
}
function Vt(o, e) {
  return n(`editor.helper.${o}`, e);
}
function xe(o) {
  return [
    ...o?.show_solar === !1 ? [] : ["solar"],
    "home",
    ...o?.show_battery === !1 ? [] : ["battery"]
  ];
}
function qt(o, e) {
  const t = (r) => r.filter((i) => !(e?.show_solar === !1 && (i.name.startsWith("solar_") || i.name === "show_forecast_line" || i.title === n("editor.section.solar_forecast", o)) || e?.show_battery === !1 && i.name.startsWith("battery_"))).map((i) => i.schema ? { ...i, schema: t(i.schema) } : i);
  return {
    schema: t([
      { name: "show_solar", selector: { boolean: {} } },
      { name: "show_battery", selector: { boolean: {} } },
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
        flatten: !0,
        title: n("editor.section.solar_forecast", o),
        schema: [
          { name: "solar_forecast_today", selector: { entity: { domain: "sensor" } } },
          { name: "show_forecast_line", selector: { boolean: {} } },
          { name: "solar_forecast_mode", selector: { select: { options: [
            { value: "daily", label: n("forecast.mode.daily", o) },
            { value: "hourly", label: n("forecast.mode.hourly", o) }
          ] } } },
          {
            type: "expandable",
            name: "",
            flatten: !0,
            title: n("editor.section.hourly_forecast", o),
            schema: [
              { name: "solar_forecast_attribute", selector: { text: {} } },
              { name: "solar_forecast_time_field", selector: { text: {} } },
              { name: "solar_forecast_value_field", selector: { text: {} } },
              { name: "solar_forecast_input_unit", selector: { select: { options: ["Wh", "kWh", "MWh", "W", "kW"] } } },
              { name: "solar_forecast_interval_minutes", selector: { number: { min: 1, max: 1440, step: 1, mode: "box", unit_of_measurement: "min" } } },
              { name: "solar_forecast_time_is_end", selector: { boolean: {} } }
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
    ]),
    computeLabel: (r) => r.name && Ut(r.name) ? F(r.name, o) : void 0,
    computeHelper: (r) => r.name && Bt(r.name) ? Vt(r.name, o) : void 0,
    assertConfig: (r) => at(r, o)
  };
}
function at(o, e) {
  o = oe(o);
  for (const [t, r] of [["power_unit", ["W", "kW"]], ["energy_unit", ["Wh", "kWh"]]])
    if (!r.includes(o[t]))
      throw new Error(n("editor.error.unit", e, { field: F(t, e) }));
  for (const t of ["show_solar", "show_battery"])
    if (typeof o[t] != "boolean") throw new Error(n("editor.error.boolean", e, { field: F(t, e) }));
  if (o.show_solar !== !1) {
    if (o.solar_forecast_today !== void 0 && (typeof o.solar_forecast_today != "string" || !/^sensor\.[a-z0-9_]+$/.test(o.solar_forecast_today)))
      throw new Error(n("editor.error.forecast_entity", e));
    if (!["daily", "hourly"].includes(o.solar_forecast_mode))
      throw new Error(n("editor.error.forecast_mode", e));
    for (const t of ["show_forecast_line", "solar_forecast_time_is_end"])
      if (typeof o[t] != "boolean") throw new Error(n("editor.error.boolean", e, { field: F(t, e) }));
    if (o.solar_forecast_mode === "hourly") {
      for (const r of ["solar_forecast_attribute", "solar_forecast_time_field", "solar_forecast_value_field"])
        if (typeof o[r] != "string" || !/^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(o[r]))
          throw new Error(n("editor.error.forecast_path", e, { field: F(r, e) }));
      if (!["Wh", "kWh", "MWh", "W", "kW"].includes(o.solar_forecast_input_unit))
        throw new Error(n("editor.error.unit", e, { field: F("solar_forecast_input_unit", e) }));
      const t = o.solar_forecast_interval_minutes;
      if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > 1440)
        throw new Error(n("editor.error.forecast_interval", e));
    }
  }
  if (o.show_battery !== !1) {
    const t = o.battery_total_capacity, r = o.battery_lower_soc ?? 0;
    if (t !== void 0 && (typeof t != "number" || !Number.isFinite(t) || t <= 0))
      throw new Error(n("editor.error.total_capacity", e));
    if (typeof r != "number" || !Number.isFinite(r) || r < 0 || r >= 100)
      throw new Error(n("editor.error.lower_soc", e));
    if (r !== 0 && t === void 0)
      throw new Error(n("editor.error.reserve_requires_capacity", e));
  }
  for (const t of Wt)
    if (!(t === "solar_power" && o.show_solar === !1) && !(t.startsWith("battery_") && o.show_battery === !1) && (!o[t] || typeof o[t] != "string"))
      throw new Error(
        n("editor.error.required", e, {
          field: F(t, e)
        })
      );
}
function jt(o, e) {
  return o.title !== void 0 ? o.title : n(o.show_solar === !1 ? o.show_battery === !1 ? "card.title_home" : "card.title_battery" : o.show_battery === !1 ? "card.title_solar" : "card.default_title", e);
}
function oe(o) {
  const e = { ...o };
  for (const t of ["show_solar", "show_battery", "power_unit", "energy_unit", "solar_forecast_today", "battery_total_capacity", "battery_lower_soc", "show_forecast_line", "solar_forecast_mode", "solar_forecast_attribute", "solar_forecast_time_field", "solar_forecast_value_field", "solar_forecast_input_unit", "solar_forecast_interval_minutes", "solar_forecast_time_is_end"]) {
    const r = e[t];
    (r == null || r === "") && delete e[t];
  }
  return {
    ...Ft,
    ...e,
    type: o.type || "custom:solar-battery-card"
  };
}
function K(o, e, t) {
  return o ? Object.values(o.states).find((i) => {
    if (i.attributes.device_class !== e) return !1;
    const a = `${i.entity_id} ${i.attributes.friendly_name ?? ""}`.toLowerCase();
    return t.some((s) => a.includes(s));
  })?.entity_id ?? "" : "";
}
function Gt(o) {
  return oe({
    type: "custom:solar-battery-card",
    battery_soc: K(o, "battery", ["battery", "storage"]) || "sensor.battery_state_of_charge",
    solar_power: K(o, "power", ["solar", "pv"]) || "sensor.solar_power",
    home_power: K(o, "power", ["home", "house", "load"]) || "sensor.home_power",
    battery_power: K(o, "power", ["battery", "storage"]) || "sensor.battery_power",
    grid_power: K(o, "power", ["grid"]) || "sensor.grid_power"
  });
}
const D = 64, Y = 416, N = 28, S = 162, de = class de extends R {
  constructor() {
    super(...arguments), this.history = [], this.historyFailed = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._timer = setInterval(() => this.requestUpdate(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._timer);
  }
  inspect(e, t, r) {
    const i = e.currentTarget.getBoundingClientRect();
    if (!i.width) return;
    const a = (e.clientX - i.left) / i.width * 480;
    this._selected = t + Math.min(1, Math.max(0, (a - D) / (Y - D))) * (r - t);
  }
  navigate(e, t, r, i) {
    if (e.key === "Escape") {
      this._selected = void 0;
      return;
    }
    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) && (e.preventDefault(), this._selected = e.key === "Home" ? t : e.key === "End" ? r : Math.min(r, Math.max(t, (this._selected ?? i) + (e.key === "ArrowLeft" ? -1 : 1) * 36e5)));
  }
  render() {
    if (!this.hass || !this.config) return g;
    const e = this.config, t = this.hass.locale?.language ?? this.hass.language, r = this.hass.config?.time_zone, i = Date.now(), a = we(new Date(i), r), s = ot(E(this.hass, e.solar_forecast_today), e, a), h = xe(e), l = e.battery_positive_is_charging === !1 ? -1 : 1, p = {
      solar: L(E(this.hass, e.solar_power)),
      home: L(E(this.hass, e.home_power)),
      battery: L(E(this.hass, e.battery_power))
    };
    p.solar !== void 0 && (p.solar = Math.max(0, p.solar)), p.home !== void 0 && (p.home = Math.max(0, p.home)), p.battery !== void 0 && (p.battery *= l);
    const u = this.history.filter((d) => d.timestamp >= a.start && d.timestamp <= i && d.timestamp < a.end).sort((d, b) => d.timestamp - b.timestamp), c = h.map((d) => ({ key: d, points: [
      ...u.filter((b) => Number.isFinite(b[d])).map((b) => ({ timestamp: b.timestamp, kwh: b[d] * (d === "battery" ? l : 1) })),
      ...p[d] === void 0 ? [] : [{ timestamp: i, kwh: p[d] }]
    ] })), m = c.flatMap((d) => d.points.map((b) => b.kwh)), _ = Math.min(0, ...m), $ = Math.max(0.1, ...m), k = Math.max(1, s.totalKwh ?? 0), w = (d) => D + (d - a.start) / (a.end - a.start) * (Y - D), z = (d) => S - (d - _) / ($ - _) * (S - N), f = (d) => S - d / k * (S - N), y = (d, b) => d.map((j, se) => `${se ? "L" : "M"} ${w(j.timestamp)} ${b(j.kwh)}`).join(" "), A = this._selected !== void 0 && this._selected >= a.start && this._selected <= a.end ? this._selected : void 0, H = n(e.solar_forecast_mode === "hourly" ? "forecast.expected" : "forecast.target", t), ae = new Intl.DateTimeFormat(t, { timeZone: r, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }), P = (d) => d === a.end ? "24:00" : ae.format(d);
    return x`
      <section aria-label=${n("forecast.heading", t)}>
        <h2>${n("forecast.heading", t)}</h2>
        <div class="plot" role="group" tabindex="0" aria-label=${n("forecast.inspect", t)}
          @keydown=${(d) => this.navigate(d, a.start, a.end, i)}
          @blur=${() => {
      this._selected = void 0;
    }}>
          <svg viewBox="0 0 480 195" preserveAspectRatio="none" role="img" aria-label=${n("forecast.aria", t)}
            @pointerdown=${(d) => this.inspect(d, a.start, a.end)}
            @pointermove=${(d) => this.inspect(d, a.start, a.end)}
            @pointerleave=${(d) => {
      d.pointerType === "mouse" && (this._selected = void 0);
    }}
            @pointercancel=${() => {
      this._selected = void 0;
    }}>
            <text x=${D} y="12">${e.power_unit ?? "kW"}</text>
            <text class="energy-axis" x=${Y} y="12" text-anchor="end">${e.energy_unit ?? "kWh"}</text>
            ${[0, 0.5, 1].map((d) => C`
              <line class="grid" x1=${D} x2=${Y} y1=${S - d * (S - N)} y2=${S - d * (S - N)}></line>
              <text x=${D - 6} y=${S - d * (S - N) + 4} text-anchor="end">${Q(_ + ($ - _) * d, e.power_unit, { locale: t }).replace(/\s*(kW|W)$/, "")}</text>
              <text class="energy-axis" x=${Y + 6} y=${f(k * d) + 4}>${ce(k * d, e.energy_unit, t).replace(/\s*(kWh|Wh)$/, "")}</text>
            `)}
            ${[0, 0.25, 0.5, 0.75, 1].map((d) => {
      const b = a.start + d * (a.end - a.start);
      return C`<text x=${w(b)} y="187" text-anchor=${d === 0 ? "start" : d === 1 ? "end" : "middle"}>${P(b)}</text>`;
    })}
            <line class="now" x1=${w(i)} x2=${w(i)} y1=${N} y2=${S}></line>
            ${c.map(({ key: d, points: b }) => C`
              <path class="line ${d}" d=${y(b, z)}></path>
              ${b.length ? C`<circle class=${d} fill="currentColor" cx=${w(b.at(-1).timestamp)} cy=${z(b.at(-1).kwh)} r="3"></circle>` : g}
            `)}
            ${s.points.length ? C`<path class="line prediction" d=${y(s.points, f)}></path>` : g}
            ${A === void 0 ? g : C`<line class="selected" x1=${w(A)} x2=${w(A)} y1=${N} y2=${S}></line>`}
          </svg>
        </div>
        <div class="legend">
          ${h.map((d) => x`<span class=${d}><i></i>${n(`power.${d}`, t)}</span>`)}
          <span class="prediction"><i></i>${H}</span>
        </div>
        <div class="inspection" aria-live="polite">
          <span>${A === void 0 ? n("chart.axis_now", t) : P(A)}</span>
          ${c.map(({ key: d, points: b }) => x`<span>${n(`power.${d}`, t)}: ${Q(A === void 0 ? p[d] : Ve([b], A), e.power_unit, { locale: t, signed: d === "battery" })}</span>`)}
          <span>${A === void 0 && e.solar_forecast_mode === "hourly" ? n("energy.forecast_today", t) : H}: ${ce(A === void 0 ? s.totalKwh : Ve([s.points], A), e.energy_unit, t)}</span>
        </div>
        ${s.status === "ok" ? g : x`<p class="note">${n(
      s.status === "incomplete" ? "forecast.incomplete" : s.status === "invalid" ? "forecast.invalid" : "forecast.missing",
      t
    )}</p>`}
        ${this.historyFailed ? x`<p class="note">${n("forecast.history_failed", t)}</p>` : g}
      </section>
    `;
  }
};
de.properties = {
  hass: { attribute: !1 },
  config: { attribute: !1 },
  history: { attribute: !1 },
  historyFailed: { type: Boolean },
  _selected: { state: !0 }
}, de.styles = Ce`
    :host { display: block; color: var(--primary-text-color, #101521); --forecast-color: #168bba; }
    h2 { font-size: 14px; margin: 0 0 8px; }
    .plot { outline-offset: 3px; border-radius: 4px; }
    svg { display: block; width: 100%; height: auto; min-height: 170px; touch-action: pan-y; }
    text { fill: var(--secondary-text-color, #687286); font-size: 11px; }
    @container (max-width: 360px) { text { font-size: 16px; } }
    .grid { stroke: var(--divider-color, #e2e5e9); stroke-width: 1; }
    .line { fill: none; stroke-width: 2.5; }
    .solar { color: var(--solar-color, #c78a32); stroke: var(--solar-color, #c78a32); }
    .home { color: var(--home-color, #6942b5); stroke: var(--home-color, #6942b5); }
    .battery { color: var(--battery-color, #57874c); stroke: var(--battery-color, #57874c); }
    .line.battery { stroke-dasharray: 7 5; }
    .prediction { color: var(--forecast-color); stroke: var(--forecast-color); }
    .line.prediction { stroke-dasharray: 3 4; }
    .energy-axis { fill: var(--forecast-color); }
    .now { stroke: var(--secondary-text-color, #687286); stroke-dasharray: 2 4; opacity: .5; }
    .selected { stroke: var(--primary-text-color, #101521); opacity: .5; }
    .legend, .inspection { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12px; line-height: 1.5; }
    .legend span { display: inline-flex; align-items: center; gap: 5px; }
    .legend i { display: inline-block; width: 16px; border-top: 2px solid currentColor; }
    .legend .prediction i { border-top-style: dotted; }
    .legend .battery i { border-top-style: dashed; }
    .inspection { margin-top: 6px; overflow-wrap: anywhere; }
    .note { margin: 6px 0 0; font-size: 12px; line-height: 1.5; color: var(--secondary-text-color, #687286); }
  `;
let $e = de;
typeof customElements < "u" && !customElements.get("solar-forecast-chart") && customElements.define("solar-forecast-chart", $e);
var Zt = "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15", Kt = "M12 3L2 12H5V20H19V12H22L12 3M11.5 18V14H9L12.5 7V11H15L11.5 18Z", Yt = "M11.45,2V5.55L15,3.77L11.45,2M10.45,8L8,10.46L11.75,11.71L10.45,8M2,11.45L3.77,15L5.55,11.45H2M10,2H2V10C2.57,10.17 3.17,10.25 3.77,10.25C7.35,10.26 10.26,7.35 10.27,3.75C10.26,3.16 10.17,2.57 10,2M17,22V16H14L19,7V13H22L17,22Z";
function Xt(o, e, t) {
  if (!(o === void 0 || !Number.isFinite(o) || o < 0 || o > 100 || !Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t < 0 || t >= 100))
    return {
      usableKwh: e * ((100 - t) / 100),
      toFullKwh: e * ((100 - o) / 100),
      aboveReserveKwh: e * (Math.max(o - t, 0) / 100)
    };
}
function Jt(o, e, t, r = 0, i = /* @__PURE__ */ new Date()) {
  const a = Xt(o, t, r);
  if (!a || e === void 0 || !Number.isFinite(e) || !Number.isFinite(i.getTime()))
    return;
  if (e <= 0.05 && a.aboveReserveKwh === 0) return { kind: "at_reserve" };
  const s = e > 0.05 ? "full" : e < -0.05 ? "reserve" : void 0;
  if (!s) return;
  const h = s === "full" ? a.toFullKwh : a.aboveReserveKwh;
  if (h <= 0) return;
  const l = new Date(i.getTime() + h / Math.abs(e) * 36e5);
  return Number.isFinite(l.getTime()) ? { kind: s, time: l } : void 0;
}
function qe(o, e, t = /* @__PURE__ */ new Date(), r, i = !1) {
  const a = new Intl.DateTimeFormat("en-CA", { timeZone: r, year: "numeric", month: "2-digit", day: "2-digit" }), s = a.format(o) !== a.format(t), h = new Intl.DateTimeFormat("en", { timeZone: r, year: "numeric" }), l = h.format(o) !== h.format(t);
  return new Intl.DateTimeFormat(e, {
    timeZone: r,
    hour: "numeric",
    minute: "2-digit",
    ...s ? {
      year: !i || l ? "numeric" : void 0,
      month: i ? "2-digit" : "short",
      day: i ? "2-digit" : "numeric"
    } : {}
  }).format(o);
}
const Qt = Ce`
  :host {
    display: block;
    min-width: 0;
    container-type: inline-size;
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

  .title-group > div:last-child {
    min-width: 0;
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
    font-size: 14px;
    line-height: 1.3;
    overflow-wrap: anywhere;
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
    flex-wrap: wrap;
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
    grid-template-columns: repeat(var(--power-columns, 4), minmax(0, 1fr));
    padding: 18px 1px 16px;
    border-bottom: 1px solid var(--divider-color, #e2e5e9);
  }

  .power-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .energy-stat:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    border-right: 0;
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

    .power-stat:last-child:nth-child(odd) {
      grid-column: 1 / -1;
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
`;
async function er() {
  if (customElements.get("ha-form")) return;
  if (await (await (await window.loadCardHelpers?.())?.createCardElement({ type: "button" }))?.constructor?.getConfigElement?.(), !customElements.get("ha-form"))
    throw new Error("Home Assistant's form editor is unavailable.");
}
const he = class he extends R {
  setConfig(e) {
    this.getLocalizedForm().assertConfig(e), this._config = oe(e), this._error = void 0;
  }
  getLocalizedForm() {
    const e = this.hass?.locale?.language ?? this.hass?.language;
    return qt(e, this._config);
  }
  render() {
    if (!this.hass || !this._config) return g;
    const e = this.getLocalizedForm();
    return x`
      ${this._error ? x`<p role="alert">${this._error}</p>` : g}
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
    const t = oe(e.detail.value);
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
he.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _error: { state: !0 }
}, he.styles = Ce`
    :host {
      display: block;
    }
    [role="alert"] {
      color: var(--error-color, #db4437);
    }
  `;
let ke = he;
function tr(o, e, t, r) {
  if (r <= 1 || t <= 0) return 0;
  const i = Math.min(1, Math.max(0, (o - e) / t));
  return Math.round(i * (r - 1));
}
function rr(o, e) {
  return e <= 1 ? 0 : Math.min(e - 1, Math.max(0, o)) / (e - 1) * 100;
}
function or(o, e, t, r, i = 166, a = 88, s = 14) {
  const h = Math.min(t, Math.max(0, o)), l = Math.min(
    Math.max(4, r - a - 4),
    Math.max(4, e - a / 2)
  );
  return {
    x: h,
    top: l,
    placement: h + s + i > t ? "place-left" : "place-right"
  };
}
const ir = 24, je = 24;
function me(o, e) {
  return e ? o.find((t) => t.some((r) => r.entity_id === e)) ?? [] : [];
}
function Ge(o, e) {
  return o ? L({
    ...o,
    attributes: {
      ...e?.attributes,
      ...o.attributes
    }
  }) ?? 0 : 0;
}
function ye(o, e, t) {
  if (o.length === 0) return 0;
  let r = o[0], i = o.at(-1) ?? o[0];
  for (const u of o) {
    const c = Date.parse(u.last_changed ?? u.last_updated ?? "");
    if (Number.isFinite(c) && (c <= e && (r = u), c >= e)) {
      i = u;
      break;
    }
  }
  const a = Date.parse(r.last_changed ?? r.last_updated ?? ""), s = Date.parse(i.last_changed ?? i.last_updated ?? ""), h = Ge(r, t), l = Ge(i, t);
  if (!Number.isFinite(a) || !Number.isFinite(s) || a === s)
    return h;
  const p = Math.min(
    1,
    Math.max(0, (e - a) / (s - a))
  );
  return h + (l - h) * p;
}
async function ar(o, e, t = /* @__PURE__ */ new Date(), r = new Date(t.getTime() - ir * 60 * 60 * 1e3)) {
  const i = t, a = [e.solar, e.home, e.battery].filter((c) => !!c), s = `history/period/${encodeURIComponent(r.toISOString())}?end_time=${encodeURIComponent(i.toISOString())}&filter_entity_id=${encodeURIComponent(a.join(","))}&minimal_response&no_attributes&significant_changes_only=0`, h = await o.callApi("GET", s), l = me(h, e.solar), p = me(h, e.home), u = me(h, e.battery);
  return !l.length && !p.length && !u.length ? [] : Array.from({ length: je }, (c, m) => {
    const _ = r.getTime() + m / (je - 1) * (i.getTime() - r.getTime());
    return {
      timestamp: _,
      solar: Math.max(0, ye(l, _, e.solar ? o.states[e.solar] : void 0)),
      home: Math.max(0, ye(p, _, o.states[e.home])),
      battery: ye(u, _, e.battery ? o.states[e.battery] : void 0)
    };
  });
}
const T = 480, W = 126, sr = 300 * 1e3;
function be(o, e, t) {
  return Math.min(t, Math.max(e, o));
}
function Ze(o, e, t, r) {
  if (o.length === 0) return [];
  const i = Math.max(0.1, r - t);
  return o.map((a, s) => [
    s / Math.max(1, o.length - 1) * T,
    4 + (r - a[e]) / i * (W - 8)
  ]);
}
function nr(o) {
  return o.length === 0 ? "" : o.length === 1 ? `M 0 ${o[0][1]} L ${T} ${o[0][1]}` : o.slice(1).reduce((e, [t, r], i) => {
    const [a, s] = o[i], h = (a + t) / 2;
    return `${e} C ${h} ${s}, ${h} ${r}, ${t} ${r}`;
  }, `M ${o[0][0]} ${o[0][1]}`);
}
function lr(o, e, t, r = Date.now()) {
  const i = [0, 0.02, 0.08, 0.28, 0.58, 0.86, 1, 0.93, 0.7, 0.32, 0.08], a = [0.58, 0.59, 0.6, 0.68, 0.76, 0.78, 0.92, 0.88, 1, 0.98, 1.04], s = [0.25, 0.25, 0.27, 0.38, 0.58, 0.78, 1, 0.96, 0.7, 0.36, 0.2];
  return i.map((h, l) => ({
    timestamp: r - (i.length - 1 - l) * 2.4 * 60 * 60 * 1e3,
    solar: h * Math.max(o, 0.1),
    home: a[l] * Math.max(e, 0.1),
    battery: s[l] * t
  }));
}
const pe = class pe extends R {
  constructor() {
    super(...arguments), this._history = [], this._historyLoading = !1, this._historyFailed = !1, this._lastHistoryKey = "", this._lastHistoryFetch = 0, this._historyRequest = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._lastHistoryFetch = 0, this._historyTimer = setInterval(() => {
      this._loadHistoryIfNeeded();
    }, 6e4), this._loadHistoryIfNeeded();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._historyTimer), this._historyRequest++, this._historyLoading = !1;
  }
  static async getConfigElement() {
    return await er(), document.createElement("solar-battery-card-editor");
  }
  static getStubConfig(e) {
    return Gt(e);
  }
  setConfig(e) {
    at(e), this._config = oe({ ...e });
  }
  getCardSize() {
    return (this._config?.show_power_chart === !1 ? 8 : 12) - (this._config?.show_battery === !1 ? 4 : 0);
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
    if (!e || !t) return;
    if (e.show_power_chart === !1) {
      this._historyRequest++, this._historyLoading = !1, this._lastHistoryFetch = 0;
      return;
    }
    const r = Date.now(), i = e.show_solar !== !1 && e.show_forecast_line ? we(new Date(r), t.config?.time_zone).start : void 0, a = {
      solar: e.show_solar === !1 ? void 0 : e.solar_power,
      home: e.home_power,
      battery: e.show_battery === !1 ? void 0 : e.battery_power
    }, s = [a.solar, a.home, a.battery, i ?? "rolling"].join("|");
    if (s === this._lastHistoryKey && (this._historyLoading || r - this._lastHistoryFetch < sr))
      return;
    s !== this._lastHistoryKey && (this._history = []);
    const h = ++this._historyRequest;
    this._historyLoading = !0, this._historyFailed = !1, this._lastHistoryKey = s, this._lastHistoryFetch = r;
    try {
      const l = await ar(t, a, new Date(r), i === void 0 ? void 0 : new Date(i));
      h === this._historyRequest && (this._history = l);
    } catch {
      h === this._historyRequest && (this._history = [], this._historyFailed = !0);
    } finally {
      h === this._historyRequest && (this._historyLoading = !1);
    }
  }
  _inspectChart(e, t) {
    const r = e.currentTarget.getBoundingClientRect();
    this._chartPointer = or(
      e.clientX - r.left,
      e.clientY - r.top,
      r.width,
      r.height
    );
    const i = tr(
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
    this._activeChartIndex = e.key === "Home" ? 0 : e.key === "End" ? t - 1 : be(r + (e.key === "ArrowLeft" ? -1 : 1), 0, t - 1);
  }
  _renderChart(e, t) {
    const r = xe(this._config), i = e.flatMap((f) => r.map((y) => f[y])), a = Math.min(0, ...i), s = Math.max(
      0.1,
      ...i
    ), h = Math.max(0.1, s - a), l = 4 + s / h * (W - 8), p = r.map((f) => {
      const y = Ze(e, f, a, s);
      return {
        key: f,
        path: nr(y),
        end: y.at(-1) ?? [T, W]
      };
    }), u = this._activeChartIndex === void 0 ? void 0 : be(this._activeChartIndex, 0, e.length - 1), c = u === void 0 ? void 0 : e[u], m = u === void 0 ? void 0 : u / Math.max(1, e.length - 1) * T, _ = u === void 0 ? void 0 : rr(u, e.length), $ = u === void 0 ? [] : r.map((f) => ({
      key: f,
      coordinate: Ze(e, f, a, s)[u]
    })), k = this._chartPointer?.placement ?? (_ !== void 0 && _ > 64 ? "place-left" : "place-right"), w = this._chartPointer ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px` : `left: ${_ ?? 0}%`, z = c ? new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit"
    }).format(c.timestamp) : "";
    return x`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label=${n("chart.aria", t)}
        @pointerdown=${(f) => this._inspectChart(f, e.length)}
        @pointermove=${(f) => this._inspectChart(f, e.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(f) => this._navigateChart(f, e.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${T} ${W}"
          role="img"
          aria-label=${n("chart.svg_aria", t)}
          preserveAspectRatio="none"
        >
          ${[0, 1, 2, 3].map((f) => {
      const y = f / 3 * W;
      return C`<line class="grid-line" x1="0" y1=${y} x2=${T} y2=${y}></line>`;
    })}
          ${[0, 1, 2, 3, 4].map((f) => {
      const y = f / 4 * T;
      return C`<line class="grid-line" x1=${y} y1="0" x2=${y} y2=${W}></line>`;
    })}
          <line
            class="zero-line"
            x1="0"
            y1=${l}
            x2=${T}
            y2=${l}
          ></line>
          ${p.map(
      ({ key: f, path: y, end: A }) => C`
              <path class="chart-line ${f}" d=${y}></path>
              <circle class="end-dot ${f}" cx=${A[0]} cy=${A[1]} r="4.5"></circle>
            `
    )}
          ${m === void 0 ? g : C`
                <line
                  class="inspection-line"
                  x1=${m}
                  y1="0"
                  x2=${m}
                  y2=${W}
                ></line>
                ${$.map(
      ({ key: f, coordinate: y }) => C`
                    <circle
                      class="inspection-dot ${f}"
                      cx=${y[0]}
                      cy=${y[1]}
                      r="5"
                    ></circle>
                  `
    )}
              `}
        </svg>
        ${c && _ !== void 0 ? x`
              <div
                class="chart-tooltip ${k}"
                style=${w}
                aria-live="polite"
              >
                <time>${z}</time>
                ${[
      { key: "solar", label: n("power.solar", t), value: c.solar, signed: !1 },
      { key: "home", label: n("power.home", t), value: c.home, signed: !1 },
      {
        key: "battery",
        label: n("power.battery", t),
        value: c.battery,
        signed: !0
      }
    ].filter((f) => r.includes(f.key)).map(
      (f) => x`
                    <div class="tooltip-item ${f.key}">
                      <span><i></i>${f.label}</span>
                      <strong>
                        ${Q(f.value, this._config?.power_unit, {
        signed: f.signed,
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
    const t = e.show_solar !== !1, r = e.show_battery !== !1, i = (v) => (v !== "solar" || t) && (v !== "battery" || r), a = this.hass, s = a?.locale?.language ?? a?.language, h = Te(E(a, r ? e.battery_soc : void 0)), l = be(
      h ?? 0,
      0,
      100
    ), p = Math.max(0, L(E(a, t ? e.solar_power : void 0)) ?? 0), u = Math.max(0, L(E(a, e.home_power)) ?? 0), c = L(E(a, r ? e.battery_power : void 0)), m = c ?? 0, _ = L(E(a, e.grid_power)), $ = e.battery_positive_is_charging === !1 ? -1 : 1, k = $ * m, w = _ === void 0 ? void 0 : (e.grid_positive_is_export === !1 ? -1 : 1) * _, z = Math.max(0, w ?? 0), f = Math.max(0, -(w ?? 0)), y = n(
      z > 0 ? "power.export" : f > 0 ? "power.import" : "power.grid",
      s
    ), A = w === void 0 ? void 0 : z + f, H = k > 0.05 ? "charging" : k < -0.05 ? "discharging" : "idle", ae = n(H === "charging" ? "status.charging" : H === "discharging" ? "status.discharging" : "status.idle", s), P = /* @__PURE__ */ new Date(), d = e.battery_total_capacity === void 0 ? void 0 : Jt(
      h,
      c === void 0 ? void 0 : $ * c,
      e.battery_total_capacity,
      e.battery_lower_soc,
      P
    ), b = e.battery_total_capacity !== void 0 ? void 0 : Tt(
      l,
      Math.max(0, k),
      e.battery_capacity,
      P
    ), j = new Intl.DateTimeFormat(s, {
      hour: "numeric",
      minute: "2-digit"
    }), se = d?.kind === "at_reserve" ? n("battery.at_reserve", s) : d ? n(d.kind === "full" ? "battery.full_by" : "battery.reserve_by", s, {
      time: qe(d.time, s, P, a?.config?.time_zone)
    }) : b ? n("battery.full_by", s, { time: j.format(b) }) : H === "charging" ? n("battery.charging_now", s) : ae, st = d && "time" in d ? n(d.kind === "full" ? "battery.full_by" : "battery.reserve_by_short", s, {
      time: qe(d.time, s, P, a?.config?.time_zone, !0)
    }) : se, nt = this._history.length > 1 ? this._history.map((v) => ({
      ...v,
      battery: $ * v.battery
    })) : lr(p, u, k), lt = [
      {
        label: n("energy.generated", s),
        value: X(E(a, e.solar_energy_today)),
        tone: "solar"
      },
      {
        label: n("energy.consumed", s),
        value: X(E(a, e.home_energy_today)),
        tone: "home"
      },
      {
        label: n("energy.stored", s),
        value: X(E(a, e.battery_energy_today)),
        tone: "battery"
      },
      {
        label: n("energy.exported", s),
        value: X(E(a, e.export_energy_today)),
        tone: "export"
      }
    ].filter((v) => i(v.tone)), ct = !t || !r ? n("footer.overview", s) : p >= u && k > 0.05 && z > 0.05 ? n("footer.solar_home_battery_export", s) : p >= u && k > 0.05 ? n("footer.solar_home_battery", s) : p >= u ? n("footer.solar_home", s) : n("footer.drawing", s);
    return x`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${r ? Zt : t ? Yt : Kt}></path></svg>
              </div>
              <div>
                <h1>${jt(e, s)}</h1>
                <p class="subtitle">
                  ${n(r ? "card.subtitle" : "card.subtitle_power", s)}
                  <span aria-hidden="true">·</span>
                  ${n("card.today", s)}
                </p>
              </div>
            </div>
            ${r ? x`<div class="status ${H}">
              <span class="dot"></span>
              ${ae}
            </div>` : g}
          </header>

          ${r ? x`<section class="battery-hero" aria-label=${n("battery.aria_status", s)}>
            <div>
              <div class="percentage">${Math.round(l)}<span>%</span></div>
              <strong class="forecast" title=${se}>
                ${st}
              </strong>
            </div>
            <div
              class="battery-graphic"
              role="img"
              aria-label=${n("battery.aria_graphic", s, {
      percent: Math.round(l)
    })}
            >
              <div class="battery-shell">
                <div class="battery-fill" style="width: ${l}%"></div>
              </div>
              <div class="battery-cap"></div>
            </div>
            <div class="charge-line">
              <span>
                ${n(H === "charging" ? "battery.charging" : H === "discharging" ? "battery.supplying" : "battery.idle", s)}
              </span>
              <strong>
                ${Q(k, e.power_unit, {
      signed: !0,
      locale: s
    })}
              </strong>
            </div>
          </section>` : g}

          <section class="power-stats" style=${`--power-columns: ${2 + Number(t) + Number(r)}`} aria-label=${n("power.aria", s)}>
            ${[
      { label: n("power.solar", s), value: p, tone: "solar", signed: !1 },
      { label: n("power.home", s), value: u, tone: "home", signed: !1 },
      { label: n("power.battery", s), value: k, tone: "battery", signed: !0 },
      { label: y, value: A, tone: "export", signed: !1 }
    ].filter((v) => i(v.tone)).map(
      (v) => x`
                <div class="power-stat ${v.tone}">
                  <span>${v.label}</span>
                  <strong>
                    ${Q(v.value, this._config?.power_unit, {
        signed: v.signed,
        locale: s
      })}
                  </strong>
                </div>
              `
    )}
          </section>

          ${e.show_power_chart === !1 ? g : t && e.show_forecast_line ? x`
                <section class="chart-section">
                  <solar-forecast-chart .hass=${a} .config=${e} .history=${this._history} .historyFailed=${this._historyFailed}></solar-forecast-chart>
                </section>
              ` : x`
                <section class="chart-section">
                  <div class="section-heading">
                    <h2>${n("chart.heading", s)}</h2>
                    <time>${j.format(/* @__PURE__ */ new Date())}</time>
                  </div>
                  ${this._renderChart(nt, s)}
                  <div class="chart-axis" aria-hidden="true">
                    <span>${n("chart.axis_start", s)}</span>
                    <span>18h</span>
                    <span>12h</span>
                    <span>6h</span>
                    <span>${n("chart.axis_now", s)}</span>
                  </div>
                  <div class="legend" aria-label=${n("chart.legend_aria", s)}>
                    ${xe(e).map((v) => x`<span class=${v}><i></i>${n(`power.${v}`, s)}</span>`)}
                  </div>
                  ${this._historyFailed ? x`<p class="history-note">${n("chart.history_unavailable", s)}</p>` : g}
                </section>
              `}

          <section class="energy-stats" aria-label=${n("energy.aria", s)}>
            ${lt.map(
      (v) => x`
                <div class="energy-stat ${v.tone}">
                  <i aria-hidden="true"></i>
                  <div>
                    <span>${v.label}</span>
                    <strong>${ce(v.value, e.energy_unit, s)}</strong>
                    ${v.tone === "solar" && e.solar_forecast_today ? x`<span class="solar-forecast">${n("energy.forecast_today", s)}
                          ${ce(ot(E(a, e.solar_forecast_today), e, we(P, a?.config?.time_zone)).totalKwh, e.energy_unit, s)}</span>` : g}
                  </div>
                </div>
              `
    )}
          </section>

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${ct}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
};
pe.properties = {
  hass: { attribute: !1 },
  _config: { state: !0 },
  _history: { state: !0 },
  _historyLoading: { state: !0 },
  _historyFailed: { state: !0 },
  _activeChartIndex: { state: !0 },
  _chartPointer: { state: !0 }
}, pe.styles = Qt;
let Ae = pe;
typeof customElements < "u" && (customElements.get("solar-battery-card-editor") || customElements.define("solar-battery-card-editor", ke), customElements.get("solar-battery-card") || customElements.define("solar-battery-card", Ae));
typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((o) => o.type === "solar-battery-card") || window.customCards.push({
  type: "solar-battery-card",
  name: "Solar & Battery Card",
  preview: !0,
  description: "A battery-first solar, power and daily energy overview."
}));
export {
  Ae as SolarBatteryCard
};
//# sourceMappingURL=solar-battery-card.js.map
