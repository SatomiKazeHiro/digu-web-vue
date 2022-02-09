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
              <div class="items-nav"></div>
              <div class="table-box">
                <el-table
                  :data="tableData"
                  height="100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column prop="cover" label="封面" align="center">
                    <template slot-scope="scope">
                      <img
                        :src="
                          '/proxy' +
                          scope.row.url +
                          scope.row.title +
                          '/' +
                          scope.row.cover
                        "
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
                  <el-table-column prop="type" label="类型" align="center">
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
      tableData: [],
    };
  },
  mounted() {
    document.body.style.setProperty("--manage-global-transparency", 0.8);
    this.initLogTree();
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
            display: flex;
            flex-direction: column;
            background: rgba(240, 240, 240, $spaceBgColorAlpha);
            .items-nav {
              height: 40px;
              min-height: 40px;
              border-bottom: 1px solid #ebeef5;
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
        width: 280px;
        min-width: 280px;
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
        width: 240px;
        min-width: 240px;
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

// // PC x<=1920px
// @media only screen and (max-width: 1920px) {}
// // PC x<=1280px
// @media only screen and (max-width: 1280px) {}
// // 手机、平板 x<=1024px
// @media only screen and (max-width: 1024px) {}
</style>
