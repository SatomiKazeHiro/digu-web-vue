<template>
  <div class="manga-template" :class="{ padTop }">
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
    padTop: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getComponent(type) {
      if (type === "normal") return "Separate";
      else if (type === "serial") return "Serialize";
    },
  },
};
</script>

<style lang="scss" scoped>
.manga-template {
  &.padTop {
    padding-top: 56px;
  }
}
</style>
