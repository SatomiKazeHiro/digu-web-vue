<template>
  <div id="manage">
    <div class="manage-wrap">
      <div class="warehouse-wrap">
        <div class="log-tree-box">
          <div class="_title-cell">
            <span>目录</span>
          </div>
          <div class="log-tree-content"></div>
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
              <div class="table-box"></div>
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
export default {
  components: {
    SpaceManageSearch,
  },
};
</script>

<style lang="scss" scoped>
#manage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .manage-wrap {
    height: 100%;
    display: flex;
    .warehouse-wrap {
      width: 320px;
      background: #454545;
      display: flex;
      flex-direction: column;
      .log-tree-box {
        flex: 1.15;
        border-bottom: 1px solid #787878;
        display: flex;
        flex-direction: column;
        .log-tree-content {
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
      background: #f0f0f0;
      display: flex;
      .preview-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tools-nav {
          height: 48px;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          .item-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 40%;
            color: #202020;
            font-weight: 600;
            white-space: nowrap;
            text-overflow: ellipsis;
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
            background: #0c0c0c;
          }
          .items-table-box {
            height: 50%;
            display: flex;
            flex-direction: column;
            .items-nav {
              height: 40px;
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
        width: 300px;
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
        width: 280px;
        ._title-cell {
          font-size: 13px;
          height: 39px;
        }
      }
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
