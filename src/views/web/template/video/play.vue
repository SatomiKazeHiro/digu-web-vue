<template>
  <div>视频模板{{ mediaInfo }}</div>
</template>

<script>
export default {
  props: {
    mediaInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
