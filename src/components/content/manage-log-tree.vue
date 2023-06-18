<template>
  <div class="manage-log-tree">
    <div class="item-log-panel">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :default-expand-all="true"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.web_name || node.label }}</span>
          <button
            class="transparent"
            @click.stop="handleConfigClick(node, data)"
          >
            配置
          </button>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageLogTree",
  props: {
    treeData: { type: Array, default: () => [] },
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    // 点击任意节点
    handleNodeClick(data, node) {
      console.log("点击节点");
      // 父节点判断
      let parentNodeData = {};
      if (node.parent.data.label) {
        // 如果父节点存在，则赋值
        parentNodeData = node.parent.data;
        // parentNodeData.label = node.parent.data.label;
        // parentNodeData.web_name = node.parent.data.web_name;
      } else parentNodeData = null;
      // 默认父节点为 null
      this.$emit("selectNode", node.data, parentNodeData);
    },
    // 点击配置
    handleConfigClick(node, data) {
      console.log("点击配置配置");
      // console.log(node, data);
      if (node.parent.data.label)
        this.$emit("openACConfigPanel", {
          area: node.parent.data.label,
          category: data.label,
        });
      else this.$emit("openACConfigPanel", { area: data.label });
    },
  },
};
</script>

<style lang="less" scoped>
.manage-log-tree {
  height: 100%;
  position: relative;
  .item-log-panel {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    padding-right: 5px;
    padding-left: 3px;
    padding-top: 2px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: rgb(80, 80, 80);
    }
  }
}

::v-deep .el-tree {
  background: transparent;
  // 节点间距
  .el-tree-node__content {
    margin-bottom: 5px;
    line-height: 26px;
  }
  // 鼠标悬浮样式
  .el-tree-node:focus > .el-tree-node__content {
    border-radius: 4px;
    background-color: #66b1ff87 !important;
  }
  .el-tree-node__content:hover {
    border-radius: 4px;
    background-color: #66b1ff87;
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    border-radius: 4px;
    background-color: #66b1ff87;
  }
  // 标签样式
  span.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
    span,
    button {
      color: #c1c1c1;
    }
    button {
      opacity: 0;
      transition: opacity 0.1s linear;
    }
    &:hover {
      button {
        opacity: 1;
      }
    }
  }
  // 节点左侧图标
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    // 更换图标库
    font-family: "icomoon" !important;
  }
  .el-tree-node__expand-icon.expanded {
    // 动画取消
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-icon-caret-right:before {
    // 收起
    content: "\e903";
    font-size: 18px;
  }
  .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    // 展开
    content: "\e904";
    font-size: 18px;
  }
}
</style>
