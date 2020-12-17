<template>
  <div class="workBar">
    <!-- tab标签栏 -->
    <header class="workBar-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="users" />
        <el-tab-pane label="配置管理" name="allocation" />
        <el-tab-pane label="角色管理" name="roles" />
        <el-tab-pane label="定时任务补偿" name="mission" />
      </el-tabs>
    </header>
    <!-- 主要操作区域 -->
    <section class="main">
      <!-- 搜索选择区域 -->
      <!-- 表格展示区域 -->
      <div class="show-area">
        <div class="btn-crud">
          <el-button type="primary" size="mini" @click="Showdetail">新增</el-button>
          <el-button type="info" size="mini" @click="tranForm">订单变更页面</el-button>
          <!-- <el-button type="info" size="mini" @click="tranForm">转交</el-button>
          <el-button type="info" size="mini" @click="tranForm">转交</el-button>
          <el-button type="info" size="mini" @click="tranForm">转交</el-button> -->
        </div>
        <el-dialog
          title="提示"
          :visible.sync="orderDetailVisible"
          width="80%"
          :before-close="handleClose"
        >
          <div class="order-detail">
            <!-- 订单编号 -->
            <div class="top">
              <div class="left">订单编号:JKIU1898772</div>
              <div class="right">
                <el-button type="succcess" size="small">发送短信</el-button>
                <el-button type="primary" size="small">线下报单</el-button>
                <el-button type="warning" size="small">取消订单</el-button>
              </div>
            </div>
            <!-- 步骤 -->
            <div class="steup">
              <div class="item">待支付</div>
              <el-steps :active="0" align-center>
                <el-step
                  title="生成订单"
                  icon="el-icon-document-checked"
                  description="2020-1-20 12:23:00"
                ></el-step>
                <el-step title="支付订单" icon="el-icon-coin" description="2020-1-20 12:23:00"></el-step>
                <el-step title="分配订单" icon="el-icon-share" description="2020-1-20 12:23:00"></el-step>
                <el-step title="办理订单" icon="el-icon-receiving" description="2020-1-20 12:23:00"></el-step>
                <el-step title="办结订单" icon="el-icon-switch-button" description="2020-1-20 12:23:00"></el-step>
              </el-steps>
            </div>
            <!-- 商品信息 -->
            <div class="main">
              <div class="main-top">
                <div class="item">
                  <div class="title">客户信息</div>
                  <p class="text-info">
                    <span class="text-left">姓名：</span>
                    <span class="text-desc">凉凉</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">电话：</span>
                    <span class="text-desc">187646878687</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">公司名称：</span>
                    <span class="text-desc">阿里巴巴</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">备注：</span>
                    <span class="text-desc">阿里八八八八八八阿里巴巴</span>
                  </p>
                </div>
                <div class="item">
                  <div class="title">付款信息</div>
                  <p class="text-info">
                    <span class="text-left">订单金额：</span>
                    <span class="text-desc">108000.00</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">付款金额：</span>
                    <span class="text-desc">0</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">欠费金额：</span>
                    <span class="text-desc">0</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">退费金额：</span>
                    <span class="text-desc">0</span>
                  </p>
                </div>
                <div class="item">
                  <div class="title">基础信息</div>
                  <p class="text-info">
                    <span class="text-left">创建人：</span>
                    <span class="text-desc">亮亮</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">创建时间：</span>
                    <span class="text-desc">187646878687</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">办理人：</span>
                    <span class="text-desc">阿里巴巴</span>
                  </p>
                  <p class="text-info">
                    <span class="text-left">最后办理时间：</span>
                    <span class="text-desc">2077-12-22 09:55:08</span>
                  </p>
                </div>
              </div>
              <div class="main-content">
                <h3>商品信息</h3>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="name" label="规格编号" width="180"></el-table-column>
                  <el-table-column prop="address" label="规格详情"></el-table-column>
                  <el-table-column label="原价">$670</el-table-column>
                  <el-table-column label="成交价">$890</el-table-column>
                </el-table>
              </div>
              <div class="main-bottom">
                <h3>操作记录</h3>
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="订单状态" width="180"></el-table-column>
                  <el-table-column prop="name" label="内容" width="180"></el-table-column>
                  <el-table-column prop="address" label="操作人"></el-table-column>
                  <el-table-column label="操作时间">2020-10-28 00:00:00</el-table-column>
                </el-table>
              </div>
              <liushui ref="liushui" />
              <el-button type="primary" size="small" @click="pay">支付流水</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </section>
    <!-- 添加 -->
    <AddOrder :AddVisible="AddVisible" />
  </div>
</template>

<script>
import AddOrder from "./components/AddOrder.vue";
import liushui from "./components/liushui.vue"
export default {
  name: "workBar",
  components: {
    AddOrder,
    liushui
  },
  data() {
    return {
      activeName: "users",
      AddVisible: false,
      // 订单详情显示控制
      orderDetailVisible: false,
      // 支付流水显示控制
      payVisible: false,
      crud: {
        data: [
          {
            username: 123,
            nickName: "llll",
            phone: "7387387",
            wechat: "wechat",
            qq: "1213213"
          }
        ]
      },
      // 显示添加订弹框
      Order: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  methods: {
    // 点击tab标签
    handleClick(tab) {
      console.log(tab.name);
    },
    // 添加订单
    ShowAddOrder() {
      this.AddVisible = !this.AddVisible;
    },
    Showdetail() {
      this.orderDetailVisible = true;
    },
    tranForm() {
      this.$router.push('/Order')
    },
    pay() {
      this.$refs.liushui.payVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
}
.workBar {
  padding: 20px;
  .workBar-tabs {
    background: #ffffff;
    margin-bottom: 15px;
  }
  .main {
    background: #ffffff;
    padding: 20px;
  }
}

.order-detail {
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .steup {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-right: none;
    border-left: none;
    padding: 20px 0;
    & .item:nth-child(1) {
      color: red;
      padding: 30px;
      margin: 5px 0 5px 60px;
      border-right: 1px solid #dcdfe6;
    }
    .el-steps {
      flex: 1;
    }
  }
  .main {
    padding: 0 30px;
    .main-top {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      .item {
        width: 33.33%;
        .title {
          font-size: 17px;
          font-weight: 600;
          padding-left: 58px;
        }
        p {
          padding-top: 25px;
          .text-left {
            width: 100px;
            text-align: right;
          }
        }
      }
    }
    .big-title {
      font-size: 18px;
      padding: 0 15px;
    }
  }
}
</style>