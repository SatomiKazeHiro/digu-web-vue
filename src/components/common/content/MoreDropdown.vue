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
  props: {
    events: {
      type: Array,
      default: function () {
        return [
          {
            label: "打开",
            funcName: "openFolder",
          },
          {
            label: "编辑",
            funcName: "editNode",
          },
          {
            label: "删除",
            funcName: "deleteNode",
          },
        ];
      },
    },
    areaEvents: {
      type: Array,
      default: function () {
        return [
          {
            label: "打开",
            funcName: "openFolder",
          },
          {
            label: "编辑",
            funcName: "editArea",
          },
          {
            label: "删除",
            funcName: "deleteAreaFolder",
          },
        ];
      },
    },
    categoryEvents: {
      type: Array,
      default: function () {
        return [
          {
            label: "打开",
            funcName: "openFolder",
          },
          {
            label: "编辑",
            funcName: "editCategory",
          },
          {
            label: "删除",
            funcName: "deleteCategoryFolder",
          },
        ];
      },
    },
    // 注入数据
    data: {
      type: Object,
    },
  },

  methods: {
    clickMenu(item) {
      console.log(1);
      console.log(item);
      // 判断是父目录（Area）还是子目录（Category）
      // if (!item.parent.label) {

      // }else{

      // }
      // this.$emit(item.funcName, this.data);
    },
  },
};
</script>

<style lang="scss">
.rotate {
  cursor: pointer;
  transform: rotate(90deg);
  font-size: 14px;
  // height: 26px;
  // width: 26px;
}
</style>
