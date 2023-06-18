<template>
  <div class="manage-table">
    <div class="grid-view-wrap" v-if="isGridView" ref="gridView">
      <div class="grid-item" v-for="i in tableData" :key="i.id">
        <div class="item-content" @click="clickGridItem(i)">
          <div class="img-box">
            <img :src="'/proxy' + i.cover" />
          </div>
          <div class="title-box">{{ i.title }}</div>
        </div>
      </div>
    </div>
    <el-table
      v-else
      ref="table"
      :data="tableData"
      height="100%"
      border
      :cell-style="{ borderColor: '#787878' }"
      :header-cell-style="{
        padding: '3px 0',
        borderColor: '#787878',
        color: '#787878',
      }"
      :row-class-name="tableRowClassName"
      @row-click="clickTableRow"
    >
      <el-table-column label="#" width="41" align="center"> </el-table-column>
      <el-table-column
        prop="cover"
        label="封面"
        :width="isWidthLE1024() ? 120 : 200"
        v-if="showCover"
      >
        <template slot-scope="scope">
          <img :src="'/proxy' + scope.row.cover" class="el-table-img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称"> </el-table-column>
      <el-table-column prop="intro" label="简介">
        <template slot-scope="scope">
          {{ scope.row.intro ? scope.row.intro : "" }}
        </template>
      </el-table-column>
      <el-table-column label="文件" width="64" align="center">
        <template slot-scope="scope">
          <div style="text-align: right">{{ scope.row.amount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="大小" width="92" align="center">
        <template slot-scope="scope">
          <div style="text-align: right">{{ scope.row.size }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.type === "normal" ? "单体" : "" }}
          {{ scope.row.type === "serial" ? "连载" : "" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ManageTable",
  props: {
    tableData: { type: Array, default: [] },
    showCover: { type: Boolean, default: true },
    isGridView: { type: Boolean, default: true },
  },
  data() {
    return {
      selectIndex: "",
    };
  },
  beforeUpdate() {
    // 解决只有一二条记录时，在加载完封面的情况下，滚动条不出现
    this.$nextTick(() => {
      if (this.$refs.table) this.$refs.table.doLayout();
    });
  },
  methods: {
    // 判断是否是平板模式下操作（1024px）
    isWidthLE1024() {
      return this.$store.state._browserStatus.appWidth <= 1024;
    },
    // 每行赋予下标，同时高亮当前行
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
      if (rowIndex === this.selectIndex) return "current-select";
      else return "";
    },
    // 点击表格的一行
    clickTableRow(row) {
      this.selectIndex = row.index;
      this.$emit("selectChange", row);
    },
    // 点击网格的一个
    clickGridItem(item) {
      this.$emit("selectChange", item);
    },
  },
  watch: {
    // 监听表发生变化的时候，重置选中的记录
    tableData() {
      this.selectIndex = "";
      this.$emit("selectChange", {
        id: "",
        title: "",
        cover: "",
        intro: "",
        link_url: "",
        sources_url: "",
        type: "",
        amount: "",
        size: "",
      });
      if (this.$refs.table) this.$refs.table.bodyWrapper.scrollTop = 0;
      if (this.$refs.gridView) this.$refs.gridView.scrollTop = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.manage-table {
  height: 100%;
  .grid-view-wrap {
    height: 100%;
    overflow-y: auto;
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #787878;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
    .grid-item {
      flex: 0 0 10%;
      overflow: hidden;
      margin-bottom: 5px;
      white-space: normal;
      padding: 5px;
      .item-content {
        height: 100%;
        color: #555555;
        background-color: #ffffff;
        border-radius: 4px;
        cursor: pointer;
        padding: 3px 3px 6px;
        transition: box-shadow 0.2s;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        &:hover {
          box-shadow: rgba(0, 173, 236, 0.6) 0px 1px 4px;
        }
        .img-box {
          width: 100%;
          height: 0;
          overflow: hidden;
          padding-bottom: 140%;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 3px;
            overflow: hidden;
            display: block;
            &.horizontal {
              width: 100%;
              height: auto;
            }
          }
        }
        .title-box {
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          font-weight: bold;
          padding: 4px 2px 2px;
          font-size: 13px;
          word-break: break-all;
        }
      }
    }
  }
}

@media only screen and (max-width: 1680px) {
  .manage-table {
    .grid-view-wrap {
      .grid-item {
        flex: 0 0 16.6%;
      }
    }
  }
}

@media only screen and (max-width: 1280px) {
  .manage-table {
    .grid-view-wrap {
      .grid-item {
        flex: 0 0 20%;
      }
    }
  }
}

// 资源表格中图片的宽度
.el-table-img {
  width: 100%;
}

// 表格背景透明
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
::v-deep .el-table th {
  background-color: transparent !important;
}
::v-deep .el-table tr {
  background-color: transparent !important;
}
::v-deep .el-table--enable-row-transition .el-table__body td,
::v-deep.el-table .cell {
  border: none;
}
::v-deep.el-table th > .cell {
  font-weight: 700;
}

// 表格边框
::v-deep .el-table--border:after,
::v-deep .el-table--group:after,
::v-deep .el-table:before {
  background-color: #787878;
}

::v-deep .el-table--border,
::v-deep .el-table--group {
  border-color: #787878;
}

::v-deep .el-table td,
::v-deep .el-table th.is-leaf {
  border-bottom: 1px solid #787878 !important;
}

::v-deep .el-table--border th,
::v-deep .el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid #787878;
}

// ::v-deep .el-table--border td:first-child,
// ::v-deep .el-table--border th:first-child {
//   border-right: 1px solid #787878 !important;
// }

::v-deep .el-table--border td:last-child,
::v-deep .el-table--border th:last-child {
  border-right: 1px solid #787878 !important;
}

::v-deep .el-table--border td,
::v-deep .el-table--border th {
  border-right: 1px solid #787878;
}

// 高亮当前选择
::v-deep .current-select td {
  background: #f5f7fa;
}

// 表格斑马线条纹
// ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
//   background: #fafafa;
//   background: rgba(250, 250, 250, $spaceBgColorAlpha);
// }
</style>
