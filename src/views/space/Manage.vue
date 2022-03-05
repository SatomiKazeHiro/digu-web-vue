<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="manage-box">
        <div class="tree-config-panel">
          <collapse title="目录树" ref="panel-tree" :initHeight="false">
            <el-tree
              slot="content"
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              :default-expand-all="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <div class="node-style">
                  <span class="label">{{ node.web_name || node.label }}</span>
                  <more-dropdown
                    class="dropdown"
                    :nodeData="{ node, data }"
                    @getAreaItem="getAreaItem"
                    @editAreaConfig="handelGetAreaConfig"
                    @getCategoryItem="getCategoryItem"
                    @editCategoryConfig="handleGetCategoryConfig"
                    @openFolder="openFolder"
                  />
                </div>
              </span>
            </el-tree>
          </collapse>
          <collapse title="Area 目录配置" ref="panel-area">
            <button
              slot="top-btn"
              class="btn fr edit"
              v-if="areaEditing"
              @click="setAreaConfigClick"
            >
              <svg-icon icon-class="space-manage-confirm"></svg-icon>
            </button>
            <el-form slot="content" :model="areaForm" v-if="areaForm.area">
              <el-form-item label="域目录">
                <el-input
                  v-model="areaForm.area"
                  :disabled="true"
                  :size="handleSize()"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="页面名"
                :class="{ change: areaForm.web_name !== areaFormCK.web_name }"
              >
                <el-input
                  v-model="areaForm.web_name"
                  :size="handleSize()"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="页面展示模板"
                :class="{
                  change: areaForm.log_template !== areaFormCK.log_template,
                }"
              >
                <el-select
                  v-model="areaForm.log_template"
                  style="width: 100%"
                  :size="handleSize()"
                >
                  <el-option label="默认模板" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="状态"
                :class="{
                  change: areaForm.state !== areaFormCK.state,
                }"
              >
                <el-select
                  v-model="areaForm.state"
                  style="width: 100%"
                  :size="handleSize()"
                >
                  <el-option label="显示" value="show"></el-option>
                  <el-option label="隐藏" value="hide"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="div-null-data" slot="content" v-else>未选择域</div>
          </collapse>
          <collapse title="Category 目录配置" ref="panel-category">
            <button
              slot="top-btn"
              class="btn fr edit"
              v-if="categoryEditing"
              @click="setCategoryConfigClick"
            >
              <svg-icon icon-class="space-manage-confirm"></svg-icon>
            </button>
            <el-form
              slot="content"
              :model="categoryForm"
              v-if="categoryForm.area && categoryForm.category"
            >
              <el-form-item label="域目录">
                <el-input
                  v-model="categoryForm.area"
                  :disabled="true"
                  :size="handleSize()"
                ></el-input>
              </el-form-item>
              <el-form-item label="分类目录">
                <el-input
                  v-model="categoryForm.category"
                  :disabled="true"
                  :size="handleSize()"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="页面名"
                :class="{
                  change: categoryForm.web_name !== categoryFormCK.web_name,
                }"
              >
                <el-input
                  v-model="categoryForm.web_name"
                  :size="handleSize()"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="页面展示模板"
                :class="{
                  change:
                    categoryForm.log_template !== categoryFormCK.log_template,
                }"
              >
                <el-select
                  v-model="categoryForm.log_template"
                  style="width: 100%"
                  :size="handleSize()"
                >
                  <el-option label="默认模板" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="资源展示模板"
                :class="{
                  change:
                    categoryForm.item_log_template !==
                    categoryFormCK.item_log_template,
                }"
              >
                <el-select
                  v-model="categoryForm.item_log_template"
                  style="width: 100%"
                  :size="handleSize()"
                >
                  <el-option label="插画模板" value="illustration"></el-option>
                  <el-option label="视频模板" value="video"></el-option>
                  <el-option label="混合模板" value="hybrid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="状态"
                :class="{ change: categoryForm.state !== categoryFormCK.state }"
              >
                <el-select
                  v-model="categoryForm.state"
                  style="width: 100%"
                  :size="handleSize()"
                >
                  <el-option label="显示" value="show"></el-option>
                  <el-option label="隐藏" value="hide"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="content" class="div-null-data" v-else>未选择分类</div>
          </collapse>
        </div>
        <div class="list-info-wrap">
          <div class="list-content brs-8-bc-fff">
            <div class="header">资源一栏</div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>目录</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentArea">{{
                currentArea
              }}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentCategory">{{
                currentCategory
              }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table
              :data="tableData"
              border
              :height="tableHeight"
              :header-cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="cover" label="封面" align="center">
                <template slot-scope="scope">
                  <img
                    :src="
                      '/proxy' +
                      scope.row.sources_url +
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
              <el-table-column label="操作" width="120">
                <div class="btn-wrap">
                  <div class="btn-cell">
                    <el-button type="primary" size="mini">查看</el-button>
                  </div>
                  <div class="btn-cell">
                    <el-button type="primary" size="mini">编辑</el-button>
                  </div>
                  <div class="btn-cell">
                    <el-button type="primary" size="mini">打开</el-button>
                  </div>
                </div>
              </el-table-column>
            </el-table>
            <div class="footer">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 30]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLogTree,
  getAreaConfig,
  getCategoryConfig,
  settAreaConfig,
  setCategoryConfig,
  getAreaNormal,
  getCategoryNormal,
} from "network/getDB";
import Collapse from "components/content/Collapse";
import MoreDropdown from "components/content/MoreDropdown";
export default {
  name: "Manage",
  components: {
    Collapse,
    MoreDropdown,
  },
  data() {
    return {
      // 目录树
      treeData: [],
      defaultProps: {
        children: "children",
        label: function (data, node) {
          return data.web_name || data.label;
        },
      },
      // 设置面板
      areaEditing: false,
      areaForm: {},
      areaFormCK: {},
      categoryEditing: false,
      categoryForm: {},
      categoryFormCK: {},
      // 资源项目表格
      tableData: [],
      tableHeight: 0,
      tableArea: "",
      tableCategory: "",

      currentPage: 1,
      limitPage: 20,
      total: 0,
      currentArea: "",
      currentCategory: "",
    };
  },
  mounted() {
    this.initLogTree();
    this.$nextTick(() => {
      // 表格高度调整：360+
      this.tableHeight =
        window.innerHeight - 364 < 400 ? 360 : window.innerHeight - 206;
    });
  },
  methods: {
    // 初始化节点树
    initLogTree() {
      getLogTree()
        .then((res) => {
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

    handleSize() {
      if (this.$store.state._browserStatus.appWidth < 1320) return "mini";
      else if (this.$store.state._browserStatus.appWidth < 1620) return "small";
      else return "medium";
    },

    // 获取 area 的配置信息
    handelGetAreaConfig(area) {
      if (area) {
        getAreaConfig(area)
          .then((res) => {
            if (res.code && res.code === 200) {
              if (res.data) {
                this.areaForm = res.data;
                // 对照组
                Object.keys(this.areaForm).map((i) => {
                  this.areaFormCK[i] = this.areaForm[i];
                });
                // 数据渲染后
                this.$nextTick(() => {
                  if (this.$refs["panel-area"]) {
                    this.$refs["panel-area"].resize();
                    // 如果面板是折叠状态，则打开
                    if (!this.$refs["panel-area"].contentHeight)
                      this.$refs["panel-area"].collapse();
                  }
                });
              }
            } else if (res.msg)
              this.$message({
                message: res.msg,
                type: "error",
              });
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "error",
            });
          });
      }
    },

    // 获取 category 的配置信息
    handleGetCategoryConfig(area, category) {
      getCategoryConfig(area, category)
        .then((res) => {
          if (res.code && res.code === 200) {
            if (res.data) {
              this.categoryForm = res.data;
              Object.keys(this.categoryForm).map((i) => {
                this.categoryFormCK[i] = this.categoryForm[i];
              });
              this.$nextTick(() => {
                if (this.$refs["panel-category"]) {
                  this.$refs["panel-category"].resize();
                  // 如果面板是折叠状态，则打开
                  if (!this.$refs["panel-category"].contentHeight)
                    this.$refs["panel-category"].collapse();
                }
              });
            } else if (res.msg)
              this.$message({
                message: res.msg,
                type: "error",
              });
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
        });
    },

    // 切换条目数
    handleSizeChange(val) {
      // 改变条目数的时候重新请求
      this.limitPage = val;
      this.currentPage = 1;
      if (this.currentArea) this.getItemsData();
    },

    // 控制分页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.currentArea) this.getItemsData();
    },

    // 提交 area 配置点击
    setAreaConfigClick() {
      this.$confirm("是否提交关于 Area 的配置修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          settAreaConfig(this.areaForm).then((res) => {
            if (res.code && res.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              // 重新生成树
              this.initLogTree();
              // 更新对照组
              Object.keys(this.areaForm).map((i) => {
                this.areaFormCK[i] = this.areaForm[i];
              });
              // 取消当前面板的编辑模式
              this.areaEditing = false;
            } else
              this.$message({
                message: res.msg,
                type: "error",
              });
          });
        })
        .catch();
    },

    // 提交 category 配置点击
    setCategoryConfigClick() {
      this.$confirm("是否提交关于 Category 的配置修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setCategoryConfig(this.categoryForm).then((res) => {
            if (res.code && res.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.initLogTree();
              Object.keys(this.categoryForm).map((i) => {
                this.categoryFormCK[i] = this.categoryForm[i];
              });
              this.categoryEditing = false;
            } else
              this.$message({
                message: res.msg,
                type: "error",
              });
          });
        })
        .catch();
    },

    // 查看资源项目
    getItemsData() {
      if (this.currentCategory) {
        this.getCategoryItem(this.currentArea, this.currentCategory);
      } else {
        this.getAreaItem(this.currentArea, this.currentCategory);
      }
    },
    getAreaItem(area) {
      // console.log(area);
      this.currentArea = area;
      this.currentCategory = "";
      getAreaNormal(area, this.limitPage, this.currentPage, "all").then(
        (res) => {
          console.log(res);
          if (res.code && res.code === 200) {
            this.tableData = res.data.resArr;
            this.currentPage = res.data.page;
            this.total = res.data.total;
          }
        }
      );
    },
    getCategoryItem(area, categoty) {
      // console.log(area, categoty);
      this.currentArea = area;
      this.currentCategory = categoty;
      getCategoryNormal(area, categoty, this.limitPage, this.currentPage, "all")
        .then((res) => {
          console.log(res);
          if (res.code && res.code === 200) {
            this.tableData = res.data.resArr;
            this.currentPage = res.data.page;
            this.total = res.data.total;
          }
        })
        .catch((err) => {
          reject(err);
        });
    },

    // 打开本地目录
    openFolder(...arg) {
      console.log(arg);
    },
  },
  watch: {
    areaForm: {
      deep: true,
      handler: function (newF) {
        if (JSON.stringify(newF) !== JSON.stringify(this.areaFormCK))
          this.areaEditing = true;
        else this.areaEditing = false;
      },
    },
    categoryForm: {
      deep: true,
      handler: function (newF) {
        if (JSON.stringify(newF) !== JSON.stringify(this.categoryFormCK))
          this.categoryEditing = true;
        else this.categoryEditing = false;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
#manage {
  position: relative;
  .manage-wrap {
    width: 1360px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .manage-box {
      padding: 28px 0;
      .tree-config-panel {
        width: 240px;
        float: left;
      }
      .list-info-wrap {
        overflow: hidden;
        padding-left: 20px;
        .list-content {
          height: calc(100vh - 56px);
          padding: 15px;
          display: flex;
          flex-direction: column;
          .header {
            color: #3c3c3c;
            padding-left: 5px;
            margin-left: 1px;
            border-left: 2px solid #87bcee;
          }
          .el-breadcrumb {
            padding: 15px 0 18px;
          }
          .el-table {
            flex: 1;
          }
          .footer {
            text-align: center;
            padding: 15px 0 5px;
          }
        }
      }
    }
  }
}

// 资源表格中图片的宽度
.el-table-img {
  max-width: 190px;
  width: 100%;
}

// 资源表格中 btn 的样式
.btn-wrap {
  display: flex;
  flex-direction: column;
  .btn-cell {
    text-align: center;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

// 空数据的样式
.div-null-data {
  width: 100%;
  height: 65px;
  line-height: 65px;
  color: #999999;
  font-size: 14px;
  text-align: center;
  user-select: none;
}

// 编辑提交按钮样式
.edit:hover {
  color: #00a1d6;
}

@media only screen and (max-width: 1620px) {
  #manage {
    .manage-wrap {
      width: 1020px;
      .manage-box {
        .tree-config-panel {
          width: 220px;
        }
        .list-info-wrap {
          padding-left: 15px;
        }
        ::v-deep label.el-form-item__label {
          line-height: 28px;
          padding: 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 1300px) {
  #manage {
    .manage-wrap {
      width: 970px;
      .manage-box {
        .tree-config-panel {
          width: 200px;
        }
        .list-info-wrap {
          padding-left: 10px;
        }
        ::v-deep label.el-form-item__label {
          line-height: 25px;
          padding: 0;
        }
      }
    }
  }
}
@media only screen and (width: 1024px) {
  #manage {
    .manage-wrap {
      width: 764px;
      .manage-box {
        .tree-config-panel {
          width: 200px;
        }
        .list-info-wrap {
          padding-left: 10px;
          .list-content {
            padding: 15px;
            .el-breadcrumb {
              padding: 10px 0 13px;
            }
            .el-pagination {
              ::v-deep .el-pagination__sizes {
                display: none;
              }
              ::v-deep .el-pagination__jump {
                margin-left: 0;
              }
            }
          }
          ::v-deep label.el-form-item__label {
            line-height: 22px;
            padding: 0;
          }
        }
      }
    }
  }
}

// 自定义表单样式（通用）
.el-form {
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
  margin-bottom: 0 !important;
  width: 100%;
}

// 表单中样式发生修改后变色
::v-deep .change {
  .el-form-item__label {
    color: #00a1d6;
  }
}

// 扩展点样式
.el-tree-node__content .custom-tree-node {
  // 节点 label 铺满一行，点击能触发事件
  flex: 1;
  .node-style {
    display: flex;
    line-height: 26px;
    span.label {
      flex: 1;
    }
    .dropdown {
      float: right;
      width: 20px;
      text-align: center;
      color: #999999;
    }
  }
}

// 节点右边操作按钮样式
.el-tree-node__content {
  position: relative;
  .dropdown {
    // display: none;
    opacity: 0;
    transition: all 0.2s ease;
  }
  // 鼠标悬停时，展示
  &:hover,
  :focus-within {
    .dropdown {
      // display: inline;
      opacity: 1;
    }
  }
}

// 节点（选中）高亮情况的样式
::v-deep.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  color: #fff;
  background: #00a1d6;
  border-radius: 4px;
  user-select: none;
  .dropdown {
    color: #fff !important;
  }
}

// 页节点左侧图标样式（隐藏）
::v-deep .el-tree-node__expand-icon {
  color: unset;
  &.is-leaf {
    color: transparent;
  }
}
</style>
