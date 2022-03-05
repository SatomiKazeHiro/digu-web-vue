<template>
  <el-dropdown trigger="click" class="custom-tree-menu" size="small">
    <i class="el-icon-more rotate" />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in events"
        :key="index"
        :divided="index > 0"
        @click.native="clickMenu(item)"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: "MoreDropdown",
  data() {
    return {
      events: [],
    };
  },
  props: {
    areaEvents: {
      type: Array,
      default: function () {
        return [
          {
            label: "查看",
            funcName: "getAreaItem",
          },
          {
            label: "编辑",
            funcName: "editAreaConfig",
          },
          {
            label: "打开",
            funcName: "openFolder",
          },
        ];
      },
    },
    categoryEvents: {
      type: Array,
      default: function () {
        return [
          {
            label: "查看",
            funcName: "getCategoryItem",
          },
          {
            label: "编辑",
            funcName: "editCategoryConfig",
          },
          {
            label: "打开",
            funcName: "openFolder",
          },
        ];
      },
    },
    // 注入数据
    nodeData: {
      type: Object,
    },
  },
  mounted() {
    // console.log(this.nodeData);
    if (!this.nodeData.node.parent.label) this.events = this.areaEvents;
    else this.events = this.categoryEvents;
  },
  methods: {
    clickMenu(item) {
      if (!this.nodeData.node.parent.label) {
        this.$emit(item.funcName, this.nodeData.node.data.label);
      } else {
        this.$emit(
          item.funcName,
          this.nodeData.node.parent.data.label,
          this.nodeData.node.data.label
        );
      }
    },
  },
};
</script>

<style lang="scss">
.rotate {
  cursor: pointer;
  transform: rotate(90deg);
  font-size: 14px;
}
</style>
