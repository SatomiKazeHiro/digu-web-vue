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
              @openConfigPanel="openConfigPanel"
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
        <div class="content-inner" :class="{ 'config-on': configPanelDrawer }">
          <div class="config-panel">
            <div class="header-nav">
              <button
                class="transparent return-btn"
                @click="configPanelDrawer = false"
              >
                <svg-icon icon-class="close"></svg-icon>
              </button>
              <span class="title">页面配置面板</span>
            </div>
            <div class="config-content">
              <div class="config-item-box" v-if="editObj === 'area'">
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{ change: editArea.area !== editAreaCG.area }"
                  >
                    域目录
                  </div>
                  <div class="c-cont">
                    <el-input
                      v-model="editArea.area"
                      style="width: 100%"
                      :disabled="true"
                      size="medium"
                    ></el-input>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editArea.web_name !== editAreaCG.web_name,
                    }"
                  >
                    域页面名称
                  </div>
                  <div class="c-cont">
                    <el-input
                      v-model="editArea.web_name"
                      style="width: 100%"
                      size="medium"
                    ></el-input>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editArea.log_template !== editAreaCG.log_template,
                    }"
                  >
                    域页面展示模板
                  </div>
                  <div class="c-cont">
                    <el-select
                      v-model="editArea.log_template"
                      style="width: 100%"
                      size="medium"
                    >
                      <el-option label="默认模板" value="normal"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{ change: editArea.state !== editAreaCG.state }"
                  >
                    状态
                  </div>
                  <div class="c-cont">
                    <el-select
                      v-model="editArea.state"
                      style="width: 100%"
                      size="medium"
                    >
                      <el-option label="显示" value="show"></el-option>
                      <el-option label="隐藏" value="hide"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="config-item-box" v-else-if="editObj === 'category'">
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editCategoty.area !== editCategotyCG.area,
                    }"
                  >
                    域目录
                  </div>
                  <div class="c-cont">
                    <el-input
                      v-model="editCategoty.area"
                      style="width: 100%"
                      :disabled="true"
                      size="medium"
                    ></el-input>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editCategoty.category !== editCategotyCG.category,
                    }"
                  >
                    分类目录
                  </div>
                  <div class="c-cont">
                    <el-input
                      v-model="editCategoty.category"
                      style="width: 100%"
                      :disabled="true"
                      size="medium"
                    ></el-input>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editCategoty.web_name !== editCategotyCG.web_name,
                    }"
                  >
                    分类网页名称
                  </div>
                  <div class="c-cont">
                    <el-input
                      v-model="editCategoty.web_name"
                      style="width: 100%"
                      size="medium"
                    ></el-input>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change:
                        editCategoty.log_template !==
                        editCategotyCG.log_template,
                    }"
                  >
                    分类页面展示模板
                  </div>
                  <div class="c-cont">
                    <el-select
                      v-model="editCategoty.log_template"
                      style="width: 100%"
                      size="medium"
                    >
                      <el-option label="默认模板" value="normal"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change:
                        editCategoty.item_log_template !==
                        editCategotyCG.item_log_template,
                    }"
                  >
                    项目页面展示模板
                  </div>
                  <div class="c-cont">
                    <el-select
                      v-model="editCategoty.item_log_template"
                      style="width: 100%"
                      size="medium"
                    >
                      <el-option label="番剧模板" value="bangumi"></el-option>
                      <el-option
                        label="漫画模板"
                        value="manga"
                        :disabled="true"
                      ></el-option>
                      <el-option
                        label="插画模板"
                        value="illustration"
                        :disabled="true"
                      ></el-option>
                      <el-option label="视频模板" value="video"></el-option>
                      <el-option
                        label="混合模板"
                        value="hybrid"
                        :disabled="true"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="c-item">
                  <div
                    class="c-label"
                    :class="{
                      change: editCategoty.state !== editCategotyCG.state,
                    }"
                  >
                    状态
                  </div>
                  <div class="c-cont">
                    <el-select
                      v-model="editCategoty.state"
                      style="width: 100%"
                      size="medium"
                    >
                      <el-option label="显示" value="show"></el-option>
                      <el-option label="隐藏" value="hide"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="submit-btn">
                <button class="transparent" @click="handleSubmitConfig">
                  <svg-icon icon-class="check"></svg-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="preview-panel">
            <div class="header-nav">
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
                    ref="manage-table"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpaceManageSearch from "components/common/header/SpaceManageSearch";
import ManageLogTree from "components/content/ManageLogTree";
import ManageTable from "components/content/ManageTable";
import ManagePreview from "components/content/ManagePreview";
import { getAreaNormal, getCategoryNormal } from "network/getWebData";
import {
  getLogTree,
  getAreaConfig,
  getCategoryConfig,
  settAreaConfig,
  setCategoryConfig,
} from "network/handleConfig";
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
      assumeRoot: false,

      currentPage: 1,
      limitPage: 30,
      tableData: [],
      total: 0,

      isGridView: false,

      showCover: false,
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

      configPanelDrawer: false,
      editObj: "",

      editArea: {},
      editAreaCG: {},

      editCategoty: {},
      editCategotyCG: {},
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
    // 打开具体展示页面
    handleOpenPage() {
      let url = this.$router.resolve({
        path: this.currentItem.link_url,
      });
      window.open(url.href, "_blank");
    },
    // 对获取配置方法的进一步封装
    getAConfig(area) {
      getAreaConfig(area).then(
        (res) => {
          console.log(res);
          if (res.code && res.code === 200) {
            this.editArea = res.data;
            // 对照组
            Object.keys(this.editArea).map((i) => {
              this.editAreaCG[i] = this.editArea[i];
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getCConfig(area, category) {
      getCategoryConfig(area, category).then(
        (res) => {
          console.log(res);
          if (res.code && res.code === 200) {
            this.editCategoty = res.data;
            // 对照组
            Object.keys(this.editCategoty).map((i) => {
              this.editCategotyCG[i] = this.editCategoty[i];
            });
          }
        },
        (err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "请求错误" + err ? "：" + err : "",
          });
        }
      );
    },
    // 打开配置面板
    openConfigPanel(opt) {
      this.configPanelDrawer = true;
      if (opt.category) {
        this.editObj = "category";
        this.getCConfig(opt.area, opt.category);
      } else if (opt.area) {
        this.editObj = "area";
        this.getAConfig(opt.area);
      }
    },
    // 提交配置信息
    handleSubmitConfig() {
      if (this.editObj === "area") {
        settAreaConfig(this.editArea).then(
          (res) => {
            if (res.code && res.code === 200) {
              this.$message({
                type: "success",
                message: "设置成功",
              });
              this.initLogTree();
              this.getAConfig(this.editArea.area);
            } else
              this.$message({
                type: "success",
                message: "设置失败" + res.msg ? "：" + res.msg : "",
              });
          },
          (err) => {
            console.log(err);
            this.$message({
              type: "success",
              message: "设置失败" + err ? "：" + err : "",
            });
          }
        );
      } else if (this.editObj === "category") {
        setCategoryConfig(this.editCategoty).then(
          (res) => {
            if (res.code && res.code === 200) {
              this.$message({
                type: "success",
                message: "设置成功",
              });
              this.initLogTree();
              this.getCConfig(
                this.editCategoty.area,
                this.editCategoty.category
              );
            } else
              this.$message({
                type: "success",
                message: "设置失败" + res.msg ? "：" + res.msg : "",
              });
          },
          (err) => {
            console.log(err);
            this.$message({
              type: "success",
              message: "请求错误" + err ? "：" + err : "",
            });
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
