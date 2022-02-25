<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="warehouse-wrap">
        <div class="log-tree-box">
          <div class="_title-cell">
            <span>目录</span>
          </div>
          <div class="log-tree-container">
            <manage-log-tree :treeData="treeData"></manage-log-tree>
          </div>
        </div>
        <div class="tags-box">
          <div class="_title-cell">
            <span>标签</span>
          </div>
        </div>
      </div>
      <div class="content-wrap">
        <div class="preview-panel">
          <div class="tools-nav">
            <div class="item-path">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>目录</el-breadcrumb-item>
                <el-breadcrumb-item> currentArea </el-breadcrumb-item>
                <el-breadcrumb-item> currentCategory </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="item-title">测试名字</div>
            <div class="others-box">
              <div class="serach-box">
                <space-manage-search></space-manage-search>
              </div>
            </div>
          </div>
          <div class="preview-nav">
            <div class="preview-box"></div>
            <div class="items-table-box">
              <div class="items-nav">
                <div class="item-single-operation">
                  <svg-icon icon-class="space-manage-bookmark-plus"></svg-icon>
                  <svg-icon
                    icon-class="space-manage-archive-dwonload"
                  ></svg-icon>
                  <svg-icon icon-class="space-manage-delete"></svg-icon>
                  <el-divider direction="vertical"></el-divider>
                  <svg-icon icon-class="space-manage-link-external"></svg-icon>
                  <svg-icon icon-class="space-manage-calendar-plus"></svg-icon>
                  <svg-icon icon-class="space-manage-time-five"></svg-icon>
                  <svg-icon icon-class="space-manage-heart"></svg-icon>
                  <svg-icon icon-class="space-manage-image"></svg-icon>
                  <svg-icon icon-class="space-manage-purchase-tag"></svg-icon>
                  <svg-icon icon-class="space-manage-bookmark-heart"></svg-icon>
                  <svg-icon icon-class="space-manage-trash"></svg-icon>
                  <svg-icon icon-class="space-manage-bookmark"></svg-icon>
                  <svg-icon icon-class="space-manage-s-trash"></svg-icon>
                  <svg-icon icon-class="space-manage-s-trash-alt"></svg-icon>
                </div>
                <div class="item-multi-operation">
                  <svg-icon icon-class="space-manage-book-alt"></svg-icon>
                  <svg-icon icon-class="space-manage-grid-alt"></svg-icon>
                  <svg-icon icon-class="space-manage-archive-upload"></svg-icon>
                </div>
              </div>
              <div class="table-box">
                <el-table
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
                >
                  <el-table-column
                    prop="cover"
                    label="封面"
                    :width="isWidthLE1024() ? 120 : 200"
                  >
                    <template slot-scope="scope">
                      <img
                        :src="'/proxy' + scope.row.cover"
                        class="el-table-img"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="名称"> </el-table-column>
                  <el-table-column prop="intro" label="简介">
                    <template slot-scope="scope">
                      {{ scope.row.intro ? scope.row.intro : "" }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="files" label="文件" min-width="40">
                  </el-table-column>
                  <el-table-column prop="size" label="大小" min-width="40">
                  </el-table-column>
                  <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                      {{ scope.row.type === "normal" ? "单体" : "" }}
                      {{ scope.row.type === "serial" ? "连载" : "" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="120"> </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="config-panel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SpaceManageSearch from "components/common/header/SpaceManageSearch";
import ManageLogTree from "components/common/content/ManageLogTree";
import {
  getLogTree,
  getAreaConfig,
  getCategoryConfig,
  settAreaConfig,
  setCategoryConfig,
  getAreaNormal,
  getCategoryNormal,
} from "network/getDB";
export default {
  components: {
    SpaceManageSearch,
    ManageLogTree,
  },
  data() {
    return {
      treeData: [],
      tableData: [
        {
          cover:
            "/sources/anime/ova/クロスロード (2014)/クロスロード (2014).jpg",
          title: "クロスロード (2014)",
          intro: "",
          size: "",
          files: "",
          type: "normal",
        },
        {
          cover:
            "/sources/anime/bangumi/無彩限のファントム・ワールド (2016)/無彩限のファントム・ワールド (2016).jpg",
          title: "無彩限のファントム・ワールド (2016)",
          intro: "",
          size: "",
          files: "",
          type: "normal",
        },
        {
          cover:
            "/sources/anime/bangumi/無彩限のファントム・ワールド (2016)/無彩限のファントム・ワールド (2016).jpg",
          title: "無彩限のファントム・ワールド (2016)",
          intro: "",
          size: "",
          files: "",
          type: "normal",
        },
      ],
    };
  },
  mounted() {
    document.body.style.setProperty("--manage-global-transparency", 0.8);
    this.initLogTree();
  },
  beforeUpdate() {
    // 解决只有一二条记录时，在加载完封面的情况下，滚动条不出现
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  methods: {
    // 初始化节点树
    initLogTree() {
      getLogTree()
        .then((res) => {
          console.log(res);
          if (res.code && res.code === 200) {
            this.treeData = res.data;
          }
        })
        .catch((err) => {
          this.$message({
            message: "目录获取失败：" + err,
            type: "error",
          });
        });
    },
    // 判断是否是平板模式下操作（1024px）
    isWidthLE1024() {
      return this.$store.state._browserStatus.appWidth <= 1024;
    },
  },
};
</script>

<style lang="scss" scoped>
$spaceBgColorAlpha: var(--manage-global-transparency);
#manage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .manage-wrap {
    height: 100%;
    display: flex;
    .warehouse-wrap {
      width: 320px;
      min-width: 320px;
      background: rgba(69, 69, 69, $spaceBgColorAlpha);
      display: flex;
      flex-direction: column;
      transition: all 0.2s linear;
      .log-tree-box {
        flex: 1.15;
        border-bottom: 1px solid #787878;
        display: flex;
        flex-direction: column;
        .log-tree-container {
          flex: 1;
        }
      }
      .tags-box {
        flex: 1;
      }
      ._title-cell {
        height: 45px;
        font-size: 17px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #787878;
      }
    }
    .content-wrap {
      flex: 1;
      display: flex;
      overflow: hidden;
      border-left: 1px solid #787878;
      border-right: 1px solid #787878;
      .preview-panel {
        width: 100%;
        display: flex;
        flex-direction: column;
        .tools-nav {
          height: 48px;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          background: rgba(240, 240, 240, $spaceBgColorAlpha);
          .item-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 20%;
            color: #202020;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .others-box {
            display: flex;
            align-items: center;
            gap: 5px;
          }
        }
        .preview-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          .preview-box {
            height: 50%;
            background: rgba(12, 12, 12, $spaceBgColorAlpha);
          }
          .items-table-box {
            height: 50%;
            width: 100%;
            padding: 5px;
            display: flex;
            flex-direction: column;
            background: rgba(240, 240, 240, $spaceBgColorAlpha);
            .items-nav {
              height: 40px;
              min-height: 40px;
              font-size: 24px;
              color: #606266;
              display: flex;
              align-items: center;
              padding: 0 3px;
              .item-single-operation {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 6px;
              }
              .item-multi-operation {
                display: flex;
                align-items: center;
                gap: 6px;
              }
            }
            .table-box {
              flex: 1;
            }
          }
        }
      }
      .config-panel {
        flex: 0;
      }
    }
  }
}

// PC x>1920px
@media only screen and (min-width: 1921px) {
  #manage {
    .manage-wrap {
      width: 1920px;
      margin: 0 auto;
    }
  }
}

// PC x<=1280px
@media only screen and (max-width: 1280px) {
  #manage {
    .manage-wrap {
      .warehouse-wrap {
        width: 260px;
        min-width: 260px;
        ._title-cell {
          font-size: 15px;
          height: 43px;
        }
      }
    }
  }
}

// 手机、平板 x<=1024px
@media only screen and (max-width: 1024px) {
  #manage {
    .manage-wrap {
      .warehouse-wrap {
        width: 200px;
        min-width: 200px;
      }
    }
  }
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
  background-color: transparent;
  border: none;
}
::v-deep.el-table th > .cell {
  font-weight: 700;
}

// 分隔符颜色
::v-deep .el-breadcrumb__separator {
  color: #606266;
}
.el-divider {
  background: #606266;
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

// ::v-deep .el-table--border td:last-child,
// ::v-deep .el-table--border th:last-child {
//   border-right: 1px solid #787878 !important;
// }

::v-deep .el-table--border td,
::v-deep .el-table--border th {
  border-right: 1px solid #787878;
}

// 资源表格中图片的宽度
.el-table-img {
  width: 100%;
}

// 表格斑马线条纹
// ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
//   background: #fafafa;
//   background: rgba(250, 250, 250, $spaceBgColorAlpha);
// }

// // PC x<=1920px
// @media only screen and (max-width: 1920px) {}
// // PC x<=1280px
// @media only screen and (max-width: 1280px) {}
// // 手机、平板 x<=1024px
// @media only screen and (max-width: 1024px) {}
</style>
