class MyForm extends HTMLElement {
  constructor() {
    super();

    this.items = [];
    this.formData = {};
    this.attachShadow({ mode: "open" });
    this.list = document.createElement("ul");
    this.shadowRoot.appendChild(this.list);

    this.setStyle();
    this.initFormData();

    // 监听属性变化
    this.render = this.render.bind(this);
    this.observeAttributeChanges("items");
  }

  // 监听属性变化
  observeAttributeChanges(attributeName) {
    const observer = new MutationObserver(this.render);
    observer.observe(this, {
      attributes: true,
      attributeFilter: [attributeName],
      attributeOldValue: true,
    });
  }

  renderInput(item) {
    return `
    <div class="form-con">
      <label for="${item.field}">${item.name}：</label>
      <input class="contorl" type="text" data-field="${item.field}" id="${item.field}" placeholder="${item.value}" />
    </div>`;
  }

  renderBtn(item) {
    return `
    <div class="form-con">
      <button id="${item.field}">${item.name}</button>
    </div>`;
  }

  renderSelect(item) {
    const options = item.range.map((item) => {
      return `<option value="${item}">${item}</option> `;
    });
    return `
    <div class="form-con">
      <label for="${item.field}">${item.name}：</label>
      <select id="${item.field}" name="${item.field}"  data-field="${item.field}">  
        ${options}
      </select>  
    </div>`;
  }

  renderSwitch(item) {
    return `
    <div class="form-con">
      <label for="${item.field}">${item.name}：</label>
      <span class="toggle-off">OFF</span>  
      <div class="toggle-switch">  
        <input type="checkbox" class="toggle-input" data-field="${item.field}" id="${item.field}">  
        <label for="${item.field}" class="toggle-label">  
        <span class="toggle-inner">  
        <span class="toggle-switch-track"></span>  
        <span class="toggle-switch-thumb"></span>  
        </span>  
        </label>  
      </div>
      <span class="toggle-on">ON</span>  
    </div>`;
  }

  render() {
    const newValue = this.getAttribute("items");
    if (newValue !== null) {
      try {
        this.items = JSON.parse(newValue);
        const ul = this.shadowRoot.querySelector("ul");
        ul.innerHTML = "";
        this.items.forEach((item) => {
          const li = document.createElement("li");
          if (item.type === "input") {
            li.innerHTML = this.renderInput(item);
          }
          if (item.type === "button") {
            li.innerHTML = this.renderBtn(item);
          }
          if (item.type === "select") {
            li.innerHTML = this.renderSelect(item);
          }
          if (item.type === "switch") {
            li.innerHTML = this.renderSwitch(item);
          }
          ul.appendChild(li);
        });

        ul.addEventListener("input", (e) => {
          if (e.target.type === "text") {
            this.formData[e.target.dataset.field] = e.target.value;
          }
        });
        ul.addEventListener("change", (e) => {
          if (e.target.type === "checkbox") {
            console.dir(e.target.checked);
          }
        });
      } catch (e) {
        console.error("Invalid JSON:", e);
      }
    }
  }

  // 允许外部通过属性设置items
  static get observedAttributes() {
    return ["items"];
  }

  // 响应属性变化
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "items" && oldValue !== newValue) {
      this.render();
      this.initFormData();
      setTimeout(() => {
        this.formData.ssid = "123";
      }, 2500);
    }
  }

  initFormData() {
    this.formData = this.items.reduce((prve, item) => {
      if (item?.field && !prve[item?.field]) {
        prve[item.field] = "";
      }
      return prve;
    }, {});
  }

  setStyle() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "../style/common.css";
    this.shadowRoot.appendChild(link);
    const componentLink = link.cloneNode(true);
    componentLink.href = "../style/my-form.css";
    this.shadowRoot.appendChild(componentLink);
  }
}

customElements.define("my-form", MyForm);
