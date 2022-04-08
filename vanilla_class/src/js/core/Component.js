class Component {
  constructor(parentNode, props = {}, state = {}) {
    this.parentNode = parentNode;
    this.props = props;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  render() {
    this.renderSelf();
    this.addEventListeners();
  }

  setChildState() {
    Object.values(this.childComponents).forEach((child) => {
      child.setState(this.state);
    });
  }

  setChildProps(name, props) {
    Object.entries(props).forEach(([key, value]) => {
      this.childComponents[name][key] = value;
    });
  }

  renderSelf() {}
  addEventListeners() {}
  fetchState() {}
}

export default Component;
