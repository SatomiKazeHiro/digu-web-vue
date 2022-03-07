<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="warehouse-wrap">
        <div class="log-tree-box">
          <div class="_title-cell">
            <span>目录</span>
            <button
              class="addFoler"
              v-if="isSelectRootOrAreaNode"
              @click="plusFolder"
            >
              <svg-icon icon-class="space-manage-folder-plus"></svg-icon>
            </button>
          </div>
          <div class="log-tree-container" @click="selectRootNode">
            <manage-log-tree
              :treeData="treeData"
              @selectNode="setTreeNode"
            ></manage-log-tree>
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
                <el-breadcrumb-item
                  v-if="currentAreaNode.web_name || currentAreaNode.label"
                >
                  {{ currentAreaNode.web_name || currentAreaNode.label }}
                </el-breadcrumb-item>
                <el-breadcrumb-item
                  v-if="
                    currentCategoryNode.web_name || currentCategoryNode.label
                  "
                >
                  {{
                    currentCategoryNode.web_name || currentCategoryNode.label
                  }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <!-- <div class="item-title" :title="currentItem.title">
              {{ currentItem.title }}
            </div> -->
            <div class="others-box">
              <div class="serach-box">
                <space-manage-search></space-manage-search>
              </div>
            </div>
          </div>
          <div class="preview-nav">
            <div class="item-preview-box">
              <manage-preview :itemObj="currentItem"></manage-preview>
            </div>
            <div class="items-table-box">
              <div class="items-nav">
                <div class="item-single-operation">
                  <button
                    class="item-btn"
                    :class="{ on: showCover }"
                    @click="showCover = !showCover"
                    title="显示封面"
                  >
                    <svg-icon icon-class="space-manage-cover"></svg-icon>
                  </button>
                  <el-divider
                    direction="vertical"
                    v-if="currentItem.id"
                  ></el-divider>
                  <button
                    class="item-btn"
                    v-if="currentItem.id"
                    title="稍后再看"
                  >
                    <svg-icon icon-class="space-manage-laterTime"></svg-icon>
                  </button>
                  <button class="item-btn" v-if="currentItem.id" title="收藏">
                    <svg-icon icon-class="space-manage-star"></svg-icon>
                  </button>
                  <button class="item-btn" v-if="currentItem.id" title="下载">
                    <svg-icon icon-class="space-manage-dwonload"></svg-icon>
                  </button>
                  <button class="item-btn" v-if="currentItem.id" title="删除">
                    <svg-icon icon-class="space-manage-delete"></svg-icon>
                  </button>
                  <el-divider
                    direction="vertical"
                    v-if="currentItem.id"
                  ></el-divider>
                  <button class="item-btn" v-if="currentItem.id" title="编辑">
                    <svg-icon icon-class="space-manage-edit"></svg-icon>
                  </button>
                  <button
                    class="item-btn"
                    v-if="currentItem.id"
                    title="跳转到展示页面"
                    @click="handleOpenPage"
                  >
                    <svg-icon icon-class="space-manage-external"></svg-icon>
                  </button>
                </div>
                <div class="item-multi-operation">
                  <button
                    class="item-btn"
                    v-if="currentAreaNode.label && currentCategoryNode.label"
                    title="上传"
                  >
                    <svg-icon icon-class="space-manage-upload"></svg-icon>
                  </button>
                  <el-divider
                    direction="vertical"
                    v-if="currentAreaNode.label && currentCategoryNode.label"
                  ></el-divider>
                  <button
                    class="item-btn"
                    title="切换视图"
                    :class="{ on: isGridView }"
                    @click="isGridView = !isGridView"
                  >
                    <svg-icon icon-class="space-manage-grid"></svg-icon>
                  </button>
                </div>
              </div>
              <div class="table-box">
                <manage-table
                  :isGridView="isGridView"
                  :tableData="tableData"
                  :showCover="showCover"
                  @selectChange="selectChange"
                ></manage-table>
              </div>
              <div class="pagination-box">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="30"
                  :total="total"
                  layout="total, ->, prev, pager, next"
                >
                </el-pagination>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="jumper"
                >
                </el-pagination>
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
import ManageLogTree from "components/content/ManageLogTree";
import ManageTable from "components/content/ManageTable";
import ManagePreview from "components/content/ManagePreview";
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
    ManageTable,
    ManagePreview,
  },
  data() {
    return {
      treeData: [],
      currentAreaNode: {
        label: "",
        web_name: "",
      },
      currentCategoryNode: {
        label: "",
        web_name: "",
      },
      isSelectRootOrAreaNode: false,
      // 假想根目录（用于区分是创建一级还是二级目录）
      assumeRoot: "",

      currentPage: 1,
      limitPage: 30,
      tableData: [],
      total: 0,

      isGridView: false,

      showCover: true,
      currentItem: {
        id: "",
        title: "",
        cover: "",
        intro: "",
        link_url: "",
        sources_url: "",
        type: "",
        amount: "",
        size: "",
      },
    };
  },
  mounted() {
    document.body.style.setProperty("--manage-preview-height", 380);
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
    // 获取数据
    getData() {
      return new Promise((resolve, reject) => {
        if (
          this.currentAreaNode.label !== "" &&
          this.currentCategoryNode.label === ""
        ) {
          getAreaNormal(
            this.currentAreaNode.label,
            this.limitPage,
            this.currentPage,
            "all"
          ).then(
            (res) => {
              console.log(res);
              if (res.code && res.code === 200) {
                this.tableData = res.data.resArr;
                this.total = res.data.total;
                this.tableData.forEach((i) => {
                  i.cover = i.sources_url + "/" + i.cover;
                });
                resolve();
              } else reject();
            },
            (err) => {
              console.log(err);
              reject();
            }
          );
        } else if (
          this.currentAreaNode.label !== "" &&
          this.currentCategoryNode.label !== ""
        ) {
          getCategoryNormal(
            this.currentAreaNode.label,
            this.currentCategoryNode.label,
            this.limitPage,
            this.currentPage,
            "all"
          ).then(
            (res) => {
              console.log(res);
              if (res.code && res.code === 200) {
                this.tableData = res.data.resArr;
                this.total = res.data.total;
                this.tableData.forEach((i) => {
                  i.cover = i.sources_url + "/" + i.cover;
                });
                resolve();
              } else reject();
            },
            (err) => {
              console.log(err);
              reject();
            }
          );
        }
      });
    },
    // 设置当前节点信息
    setTreeNode(currentNode, parentNode) {
      this.currentPage = 1;
      if (!parentNode) {
        // 父元素不存在的时候，认为是一级（area）目录
        this.currentCategoryNode = {
          label: "",
          web_name: "",
        };
        this.currentAreaNode = currentNode;
        // 只有一级目录（area）才能创建子目录，同时标记根目录为假
        this.isSelectRootOrAreaNode = true;
        this.assumeRoot = false;
      } else {
        this.currentAreaNode = parentNode;
        this.currentCategoryNode = currentNode;
        // 二级目录（category）不能创建子目录
        this.isSelectRootOrAreaNode = false;
      }
      this.getData();
    },
    // 监听表格选择
    selectChange(rowObj) {
      Object.keys(this.currentItem).forEach((key) => {
        this.currentItem[key] = rowObj[key];
      });
    },
    // 选中假想根目录
    selectRootNode() {
      console.log("假设是根目录");
      this.isSelectRootOrAreaNode = true;
      this.assumeRoot = true;
    },
    // 创建目录
    plusFolder() {
      if (this.assumeRoot) {
        console.log("创建一级目录");
      } else {
        console.log(
          "创建二级目录 <- ",
          this.currentAreaNode.web_name || this.currentAreaNode.label
        );
      }
    },
    // 切换表格分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 打开展示页面
    handleOpenPage() {
      let url = this.$router.resolve({
        path: this.currentItem.link_url,
      });
      window.open(url.href, "_blank");
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
        height: 44px;
        line-height: 44px;
        font-size: 17px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #787878;
        button {
          width: 28px;
          height: 28px;
          line-height: 28px;
          border-radius: 3px;
          font-size: 22px;
          color: #c1c1c1;
          background: transparent;
          outline: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s linear;
          &:hover {
            background: #747474;
          }
        }
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
          min-height: 48px;
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
            max-width: 25%;
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
          .item-preview-box {
            height: calc(var(--manage-preview-height) * 1px);
            background: rgba(12, 12, 12, $spaceBgColorAlpha);
          }
          .items-table-box {
            height: calc(100vh - var(--manage-preview-height) * 1px - 48px);
            // flex: 1;
            width: 100%;
            padding: 5px;
            display: flex;
            flex-direction: column;
            background: rgba(240, 240, 240, $spaceBgColorAlpha);
            .items-nav {
              height: 40px;
              min-height: 40px;
              display: flex;
              align-items: center;
              .item-single-operation {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 5px;
              }
              .item-multi-operation {
                display: flex;
                align-items: center;
                gap: 5px;
              }
              button.item-btn {
                width: 28px;
                height: 28px;
                line-height: 28px;
                border-radius: 3px;
                font-size: 22px;
                color: #525252;
                border: 1px solid transparent;
                outline: none;
                background: transparent;
                transition: all 0.3s linear;
                cursor: pointer;
                &:hover {
                  border: 1px solid #999999;
                }
                &.on {
                  background: #999999;
                  border: 1px solid #999999;
                }
                &.none-border {
                  border: 1px solid transparent !important;
                }
              }
            }
            .table-box {
              height: calc(100vh - var(--manage-preview-height) * 1px - 128px);
            }
            .pagination-box {
              height: 40px;
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              padding-bottom: 1px;
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

// 分隔符颜色
::v-deep .el-breadcrumb__separator {
  color: #606266;
}
.el-divider {
  background: #606266;
}
// 分页
::v-deep .el-pagination {
  padding-left: 0px;
  padding-right: 2px;
  .btn-next,
  .btn-prev {
    color: #787878;
    background: transparent;
  }
  .el-pager li {
    color: #787878;
    background: transparent;
    &.active {
      color: #409eff;
    }
  }
  .el-pagination__jump {
    .el-input__inner {
      background-color: transparent;
      border: 1px solid #787878;
    }
  }
}

// // PC x<=1920px
// @media only screen and (max-width: 1920px) {}
// // PC x<=1280px
// @media only screen and (max-width: 1280px) {}
// // 手机、平板 x<=1024px
// @media only screen and (max-width: 1024px) {}
</style>
