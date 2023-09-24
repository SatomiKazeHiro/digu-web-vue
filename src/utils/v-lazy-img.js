import Vue from "vue";
import compress from "./compress";

const onload = (el, removeClass, loadedClass) => {
  // 方向样式
  if (el.naturalWidth >= el.naturalHeight) el.classList.add("img-horizontal");
  else if (el.naturalWidth < el.naturalHeight) el.classList.add("img-vertical");

  // 加载前后样式
  if (removeClass) el.classList.remove(removeClass);
  if (loadedClass) el.classList.add(loadedClass);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target;
      let config = JSON.parse(img.getAttribute("lazy-config"));

      if (config.isCompress) {
        let { URL, MAX_WIDTH, QUALITY, MIMETYPE, UNLOADED_CLASS, LOADED_CLASS } = config;
        compress(URL, MAX_WIDTH, QUALITY, MIMETYPE).then((src) => {
          img.onload = () => onload(img, UNLOADED_CLASS, LOADED_CLASS);
          img.src = src;
        });
      } else {
        img.onload = () => onload(img);
        img.src = config.URL;
      }
      img.removeAttribute("lazy-config");
      observer.unobserve(img);
    }
  });
});

// 图片懒加载
Vue.directive("lazy-img", {
  bind(el, binding) {
    let config = JSON.stringify({
      isCompress: false,
      ...binding.value,
    });
    el.setAttribute("lazy-config", config);
    observer.observe(el);
  },
});

// 图片懒加载+压缩
Vue.directive("lazy-img-compr", {
  bind(el, binding) {
    let config = JSON.stringify({
      isCompress: true,
      ...binding.value,
    });

    // 未加载图片时的样式
    if (config.UNLOADED_CLASS) el.classList.add(config.UNLOADED_CLASS);

    el.setAttribute("lazy-config", config);
    observer.observe(el);
  },
});
