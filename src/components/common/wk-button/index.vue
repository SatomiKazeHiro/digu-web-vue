<template>
  <button :class="[type, size]" class="wk-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "WkButton",
  props: {
    type: { type: String, default: "" },
    size: { type: String, default: "normal" },
  },
};
</script>

<style lang="less" scoped>
button.wk-btn {
  outline: none;
  cursor: pointer;
  border: 1px solid @border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  // box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 2px;
  &:hover {
    border: 1px solid @main-color;
    background-color: @main-color;
    color: @white-text-color;
  }
}

button.small:extend(button.digu-btn) {
  height: 24px;
  padding: 0 8px;
  font-size: 14px;
}

button.normal:extend(button.digu-btn) {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
}

button.large:extend(button.digu-btn) {
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
}

button.primary:extend(button.digu-btn) {
  border: 1px solid @main-color;
  background-color: @main-color;
  color: @white-text-color;
}
</style>
