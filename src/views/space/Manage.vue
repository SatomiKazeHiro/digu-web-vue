<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="title">
        <!-- <span>资源项目管理</span> -->
      </div>
      <div class="manage-box">
        <div class="ac-list">
          <div class="brs8fff list-cont">
            <div class="header">目录</div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :highlight-current="true"
              :default-expand-all="true"
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
                @click="() => t(node, data)"
              >
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </div>
        <div class="i-list">
          <div class="brs8fff ac-info">
            <div class="header">Area 目录配置</div>

            <el-form :model="areaForm">
              <el-form-item label="域目录">
                <el-input v-model="areaForm.area" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="页面名">
                <el-input v-model="areaForm.web_name"></el-input>
              </el-form-item>
              <el-form-item label="页面展示模板">
                <el-select v-model="areaForm.log_template" style="width: 100%">
                  <el-option label="模板1" value="type1"></el-option>
                  <el-option label="模板2" value="type2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="brs8fff ac-info">
            <div class="header">Category 目录配置</div>

            <el-form :model="categoryForm">
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
                  <el-option label="模板1" value="type1"></el-option>
                  <el-option label="模板2" value="type2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资源展示模板">
                <el-select
                  v-model="categoryForm.item_log_tempalte"
                  style="width: 100%"
                >
                  <el-option label="模板1" value="type1"></el-option>
                  <el-option label="模板2" value="type2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary">设置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="brs8fff list-cont">
            <div class="header">
              <div class="title">资源一栏</div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>目录</el-breadcrumb-item>
                <el-breadcrumb-item>插画</el-breadcrumb-item>
                <el-breadcrumb-item>设定集</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

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
import ManageItem from "components/common/boxs/ManageItem.vue";
export default {
  name: "Manage",
  components: {
    ManageItem,
  },
  data() {
    return {
      treeData: [
        {
          label: "漫画",
          children: [
            {
              label: "单行本",
            },
            {
              label: "连载本",
            },
          ],
        },
        {
          label: "插画",
          children: [
            {
              label: "画集",
            },
            {
              label: "设定集",
            },
          ],
        },
        {
          label: "动画",
          children: [
            {
              label: "番剧",
            },
            {
              label: "剧场版",
            },
            {
              label: "OVA",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [
        {
          cover:
            "/proxy/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "第一个",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "",
        },
        {
          cover:
            "http://localhost:2233/sources/manga/volume/[モリオン航空] 永久×バレット設定資料集３/1.jpg",
          title: "[モリオン航空] 永久×バレット設定資料集３",
          intro: "最后一个",
        },
      ],
      tableHeight: 0,
      currentA: "",
      currentC: "",
      currentPage: 1,
      areaForm: {
        area: "",
        web_name: "",
        log_template: "",
        state: "",
      },
      categoryForm: {
        area: "",
        category: "",
        web_name: "",
        log_template: "",
        item_log_tempalte: "",
        state: "",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 180;
    });
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    t(n, d) {
      console.log(n.parent.label, d);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#manage {
  width: 80%;
  margin: 0 auto;
  // background-color: rgba(255, 255, 255, 0.33);
  .manage-wrap {
    width: 100%;
    // .title {
    //   margin-top: 23px;
    //   margin-bottom: 20px;
    //   span {
    //     padding: 10px 34px 10px 14px;
    //     font-size: 24px;
    //     background: #fff;
    //     color: cornflowerblue;
    //     overflow: hidden;
    //     border-left: 5px solid cornflowerblue;
    //     border-bottom-right-radius: 26px;
    //     border-top-right-radius: 26px;
    //     line-height: 51px;
    //   }
    // }
    .manage-box {
      margin-top: 28px;
      .ac-list {
        width: 260px;
        float: left;
        .list-cont {
          padding: 15px;
          .header {
            color: #3c3c3c;
            padding-left: 5px;
            margin-bottom: 15px;
            margin-left: 1px;
            border-left: 2px solid #87bcee;
          }
        }
      }
      .i-list {
        overflow: hidden;
        .ac-info {
          padding: 15px;
          margin-left: 20px;
          margin-bottom: 15px;
          .header {
            color: #3c3c3c;
            padding-left: 5px;
            margin-bottom: 15px;
            border-left: 2px solid #87bcee;
          }
        }
        .list-cont {
          padding: 15px;
          margin-left: 20px;
          margin-bottom: 40px;
          .header {
            padding: 10px 0 15px;
            .title {
              color: #3c3c3c;
              padding-left: 5px;
              margin-bottom: 10px;
              border-left: 2px solid #87bcee;
            }
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
// 让文字填满一行，能点击得到并执行相应的函数
.el-tree-node__content .custom-tree-node {
  flex: 1;
}
// 自定义表单样式
.el-form {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}
// 表单中按钮自定义位置
::v-deep .el-form-item__content {
  height: 80px;
  position: relative;
  button.el-button {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
@media only screen and (max-width: 1920px) {
  .el-form-item {
    margin-bottom: 10px;
    flex: 0 0 25%;
    padding: 0 5px;
  }
}
@media only screen and (max-width: 1630px) {
  .el-form-item {
    margin-bottom: 10px;
    flex: 0 0 33%;
    padding: 0 5px;
  }
}
@media only screen and (max-width: 1280px) {
  .el-form-item {
    margin-bottom: 10px;
    flex: 0 0 50%;
    padding: 0 5px;
  }
}
</style>
