class MyList extends HTMLElement {
  constructor() {
    super();

    this.items = [];
    this.attachShadow({ mode: "open" });
    this.list = document.createElement("ul");
    this.shadowRoot.appendChild(this.list);

    this.setStyle();

    // 监听属性变化
    this._updateList = this._updateList.bind(this);
    this.observeAttributeChanges("items");
  }

  // 监听属性变化
  observeAttributeChanges(attributeName) {
    const observer = new MutationObserver(this._updateList);
    observer.observe(this, {
      attributes: true,
      attributeFilter: [attributeName],
      attributeOldValue: true,
    });
  }

  _updateList() {
    const newValue = this.getAttribute("items");
    if (newValue !== null) {
      try {
        this.items = JSON.parse(newValue);
        const ul = this.shadowRoot.querySelector("ul");
        ul.innerHTML = "";
        this.items.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `<span class="name">${item.name}</span> : <span class="value">${item.value}</span>`;
          ul.appendChild(li);
        });
      } catch (e) {
        console.error("Invalid JSON:", e);
      }
    }
  }

  // 静态getter，允许外部通过属性设置items
  static get observedAttributes() {
    return ["items"];
  }

  // 响应属性变化
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "items" && oldValue !== newValue) {
      this._updateList();
    }
  }

  setStyle() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "../style/common.css";
    this.shadowRoot.appendChild(link);
    const componentLink = link.cloneNode(true);
    componentLink.href = "../style/my-list.css";
    this.shadowRoot.appendChild(componentLink);
  }
}

customElements.define("my-list", MyList);
