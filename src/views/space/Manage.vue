<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="manage-box">
        <div class="log-tree">
          <div class="brs8fff log-cont">
            <div class="header">目录树</div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              :default-expand-all="true"
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
                @click="getNodeMsg(node, data)"
              >
                <div class="node-style">
                  <span class="label">{{ node.web_name || node.label }}</span>
                  <more-dropdown class="dropdown" :data="{ node, data }" />
                </div>
              </span>
            </el-tree>
          </div>
        </div>
        <div class="aci-info-wrap">
          <collapse title="Area 目录配置" ref="panel-area">
            <button
              slot="top-btn"
              class="btn fr edit"
              v-if="areaEditing"
              @click="setAreaClick"
            >
              <svg-icon icon-class="space-manage-confirm"></svg-icon>
            </button>
            <el-form slot="content" :model="areaForm" v-if="areaForm.area">
              <el-form-item label="域目录">
                <el-input v-model="areaForm.area" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="页面名">
                <el-input v-model="areaForm.web_name"></el-input>
              </el-form-item>
              <el-form-item label="页面展示模板">
                <el-select v-model="areaForm.log_template" style="width: 100%">
                  <el-option label="默认模板" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="areaForm.state" style="width: 100%">
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
              @click="setCategoryClick"
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
                ></el-input>
              </el-form-item>
              <el-form-item label="分类目录">
                <el-input
                  v-model="categoryForm.category"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="页面名">
                <el-input v-model="categoryForm.web_name"></el-input>
              </el-form-item>
              <el-form-item label="页面展示模板">
                <el-select
                  v-model="categoryForm.log_template"
                  style="width: 100%"
                >
                  <el-option label="默认模板" value="normal"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资源展示模板">
                <el-select
                  v-model="categoryForm.item_log_tempalte"
                  style="width: 100%"
                >
                  <el-option label="插画模板" value="illustration"></el-option>
                  <el-option label="视频模板" value="video"></el-option>
                  <el-option label="混合模板" value="hybrid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="categoryForm.state" style="width: 100%">
                  <el-option label="显示" value="show"></el-option>
                  <el-option label="隐藏" value="hide"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="content" class="div-null-data" v-else>未选择分类</div>
          </collapse>
          <div class="brs8fff list-cont">
            <div class="header">资源一栏</div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>目录</el-breadcrumb-item>
              <el-breadcrumb-item>插画</el-breadcrumb-item>
              <el-breadcrumb-item>设定集</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table :data="tableData" border :height="tableHeight">
              <el-table-column
                prop="cover"
                label="封面"
                width="220"
                align="center"
              >
                <template slot-scope="scope">
                  <img :src="scope.row.cover" alt="" class="el-table-img" />
                </template>
              </el-table-column>
              <el-table-column
                prop="title"
                label="名称"
                width="220"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="intro" label="简介" align="center">
                <template slot-scope="scope">
                  {{ scope.row.intro ? scope.row.intro : "无" }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <!-- <template slot-scope="scope">

                </template> -->
              </el-table-column>
            </el-table>
            <div class="footer">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
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
} from "network/getDB";
import Collapse from "components/common/content/Collapse";
import MoreDropdown from "components/common/content/MoreDropdown";
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
      tableData: [
        {
          cover:
            "/proxy/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "第一个",
        },
      ],
      tableHeight: 0,
      currentArea: "",
      currentCategory: "",
      currentPage: 1,
    };
  },
  mounted() {
    this.initLogTree();
    this.$nextTick(() => {
      this.tableHeight =
        window.innerHeight - 364 < 400
          ? window.innerHeight - 40
          : window.innerHeight - 364;
    });
  },
  methods: {
    // 初始化节点树
    initLogTree() {
      getLogTree()
        .then((res) => {
          if (res.code === 200) {
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
    // 获取树节点内容
    getNodeMsg(n, d) {
      if (!n.parent.label) {
        // 当父节点不存在的时候则是 area
        getAreaConfig(d.label)
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
      } else {
        getCategoryConfig(n.parent.data.label, d.label).then((res) => {
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
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 提交配置
    setAreaClick() {
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
    setCategoryClick() {
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
      padding-top: 28px;
      .log-tree {
        width: 240px;
        float: left;
        .log-cont {
          padding: 15px;
          .header {
            color: #3c3c3c;
            padding-left: 5px;
            margin-left: 1px;
            border-left: 2px solid #87bcee;
          }
          .el-tree {
            margin-top: 10px;
          }
        }
      }
      .aci-info-wrap {
        overflow: hidden;
        padding-left: 20px;
        ::v-deep .collapss-panel {
          .el-form-item {
            flex: 0 0 20%;
            padding: 0 5px;
          }
        }
        .list-cont {
          padding: 15px;
          margin-bottom: 40px;
          .el-breadcrumb {
            padding: 15px 0 18px;
          }
          .el-table {
            max-height: 800px;
          }
          .footer {
            text-align: center;
            padding: 15px 0 10px;
          }
        }
      }
    }
  }
}
.el-table-img {
  width: 190px;
  // min-height: 230px;
}

// 空数据的样式
.div-null-data {
  width: 100%;
  height: 65px;
  line-height: 65px;
  color: #999999;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 1620px) {
  #manage {
    .manage-wrap {
      width: 1040px;
      .log-tree {
        width: 220px;
      }
      .manage-box {
        .aci-info-wrap {
          ::v-deep .collapss-panel {
            .el-form-item {
              flex: 0 0 25%;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1300px) {
  #manage {
    .manage-wrap {
      width: 990px;
      .manage-box {
        .log-tree {
          width: 200px;
        }
        .aci-info-wrap {
          ::v-deep .collapss-panel {
            .el-form-item {
              flex: 0 0 33.33%;
              padding: 0 5px;
            }
          }
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
        .log-tree {
          width: 200px;
        }
        .aci-info-wrap {
          padding-left: 10px;
          ::v-deep .collapss-panel {
            .el-form-item {
              // margin-bottom: 10px;
              flex: 0 0 50%;
              padding: 0 5px;
              ::v-deep.el-form-item__label {
                font-size: 12px;
                line-height: 30px;
              }
            }
          }
          .list-cont {
            padding: 15px;
            margin-bottom: 40px;
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
}

// 节点 label 铺满一行，点击能触发事件
.el-tree-node__content .custom-tree-node{
  flex: 1;
  .node-style{
    line-height: 26px;
  }
}

// 节点右边操作按钮样式
.el-tree-node__content {
  position: relative;
  .dropdown {
    position: absolute;
    right: 6px;
    color: #999999 !important;
    display: none;
  }
  // 鼠标悬停时，展示
  &:hover,
  :focus-within {
    .dropdown {
      display: inline;
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
