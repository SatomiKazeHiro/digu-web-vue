import Vue from "vue";
import compress from "./compress";

const onload = function (el) {
  if (el.naturalWidth > el.naturalHeight) el.classList.add("img-horizontal");
  else el.classList.add("img-vertical");
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target;
      let config = JSON.parse(img.getAttribute("lazy-config"));

      if (config.isCompress) {
        let { URL, MAX_WIDTH, QUALITY, MIMETYPE } = config;
        compress(URL, MAX_WIDTH, QUALITY, MIMETYPE).then((src) => {
          img.src = src;
          img.onload = onload(img);
        });
      } else {
        img.src = config.URL;
        img.onload = onload(img);
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
      URL: binding.value,
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

    el.setAttribute("lazy-config", config);
    observer.observe(el);
  },
});
