<template>
  <div class="manga-template" :style="getStyle($attrs.mediaInfo.type)">
    <components :is="getComponent($attrs.mediaInfo.type)" v-bind="$attrs" />
  </div>
</template>

<script>
import Separate from "./separate";
import Serialize from "./serialize";
export default {
  components: {
    Separate,
    Serialize,
  },
  inheritAttrs: false,
  props: {
    padTop: { type: String, default: "" },
  },
  methods: {
    getComponent(type) {
      if (type === "normal") return "Separate";
      else if (type === "serial") return "Serialize";
    },
    getStyle(type) {
      let style = { paddingTop: this.padTop };
      if (type === "serial") return { ...style };
      else if (type === "normal")
        return {
          ...style,
          backgroundColor: "#16151D",
        };
    },
  },
};
</script>

<style lang="scss" scoped>
.manga-template {
  padding-bottom: 48px;
}
</style>
