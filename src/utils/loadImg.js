import Vue from "vue";
import compress from "./compress";

// 图片懒加载
Vue.directive("lazy-img", {
  bind(el, binding) {
    el.src = binding.value;
    el.onload = function () {
      // let top = el.getBoundingClientRect().top;
      if (el.naturalWidth > el.naturalHeight) el.classList.add("img-horizontal");
      else el.classList.add("img-vertical");
    };
  },
});

// 图片懒加载+压缩
Vue.directive("lazy-img-compr", {
  bind(el, binding) {
    let { URL, MAX_WIDTH, QUALITY, MIMETYPE } = binding.value;
    compress(URL, MAX_WIDTH, QUALITY, MIMETYPE).then((src) => {
      el.src = src;
      el.onload = function () {
        // let top = el.getBoundingClientRect().top;
        if (el.naturalWidth > el.naturalHeight) el.classList.add("img-horizontal");
        else el.classList.add("img-vertical");
      };
    });
  },
});
