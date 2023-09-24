import WkButton from "./index.vue";

WkButton.install = function (Vue) {
  Vue.component(WkButton.name, WkButton);
};

export default WkButton;
