<template>
  <div class="goods">
    <!-- 选择商品分类 -->
    <div class="goods-wrap" v-show="AddOrder">
      <el-cascader-panel ref="cascader" @change="handleChange" :options="options"></el-cascader-panel>
      <el-button type="primary" style="margin-top:20px" @click="Next">下一步</el-button>
    </div>
    <!-- 填写商品信息 -->
    <div style="width:100%" v-show="!AddOrder">
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 基本信息 -->
        <el-form-item class="el-item-title white">
          <div>基本信息</div>
        </el-form-item>
        <el-form-item class="white" style="padding-top:15px;" label="商品分类">
          <span v-for="(item,index) in selectedLabel" :key="index">{{item+(index>1?'':'/')}}</span>
          <span class="good_class_edit">修改</span>
        </el-form-item>
        <el-form-item class="white" label="商品名称">
          <el-input placeholder="请输入名称"></el-input>
        </el-form-item>
        <!-- 图文信息 -->
        <el-form-item class="el-item-title white">
          <div>图文信息</div>
        </el-form-item>
        <el-form-item class="white" style="padding-top:15px;" label="主图">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">主图只能上传jpg/png文件，且不超过5张</div>
          </el-upload>
        </el-form-item>
        <el-form-item class="white" label="商品描述">
          <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 价格与库存 -->
        <el-form-item class="el-item-title white">
          <div>价格与库存</div>
        </el-form-item>
        <el-form-item label="商品规格" style="padding-top:15px;" class="white">
          <div class="goods-specs">
            <div class="top">
              <el-select v-model="value" placeholder="请选择">
                <el-option label="颜色" value="color"></el-option>
                <el-option label="尺寸" value="size"></el-option>
                <el-option label="重量" value="weight"></el-option>
              </el-select>
              <el-button type="danger" size="small">删除规格</el-button>
            </div>
            <div class="bottom">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="红色"></el-checkbox>
                <el-checkbox label="白色"></el-checkbox>
                <el-checkbox label="黄色"></el-checkbox>
                <el-checkbox label="绿色"></el-checkbox>
                <el-checkbox label="蓝色" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="goods-specs">
            <div class="top">
              <el-select v-model="value" placeholder="请选择">
                <el-option label="颜色" value="color"></el-option>
                <el-option label="尺寸" value="size"></el-option>
                <el-option label="重量" value="weight"></el-option>
              </el-select>
              <el-button type="danger" size="small">删除规格</el-button>
            </div>
            <div class="bottom">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="红色"></el-checkbox>
                <el-checkbox label="白色"></el-checkbox>
                <el-checkbox label="黄色"></el-checkbox>
                <el-checkbox label="绿色"></el-checkbox>
                <el-checkbox label="蓝色" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
        <!-- 商品库存 -->
        <el-form-item label="商品库存" class="white">
          <div class="stock">
            <el-select placeholder="选择颜色" class="m-r-10" style="flex:1">
              <el-option label="白色" value="color"></el-option>
              <el-option label="红色" value="size"></el-option>
              <el-option label="紫色" value="weight"></el-option>
              <el-option label="绿色" value="weight"></el-option>
              <el-option label="黄色" value="weight"></el-option>
            </el-select>
            <el-select placeholder="选择尺寸" class="m-r-10" style="flex:1">
              <el-option label="22" value="color"></el-option>
              <el-option label="44" value="size"></el-option>
              <el-option label="77" value="weight"></el-option>
              <el-option label="99" value="weight"></el-option>
              <el-option label="100" value="weight"></el-option>
            </el-select>
            <el-input placeholder="库存" class="m-r-10" style="flex:1"></el-input>
            <el-input placeholder="价格" class="m-r-10" style="flex:1"></el-input>
            <el-input placeholder="SKU编码" style="flex:2"></el-input>
          </div>
          <!-- 表格展示 -->
          <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="date" label="颜色" width="180"></el-table-column>
            <el-table-column prop="name" label="尺寸" width="180"></el-table-column>
            <el-table-column prop="address" label="库存"></el-table-column>
            <el-table-column prop="address" label="价格"></el-table-column>
            <el-table-column prop="address" label="SKU编码"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布商品</el-button>
          <el-button>保存草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   控制添加订单弹窗的出现
      AddOrder: true,
      selectedValue: null,
      adddialogvisible: false,
      selectedLabel: null,
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      checkList: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
  methods: {
    showAdd() {
      this.adddialogvisible = true;
    },
    Next() {
      if (!this.selectedValue) return this.$message.error("请先选择分类");
      this.AddOrder = false;
    },
    handleChange(e) {
      // console.log(node)
      let Nodes = this.$refs.cascader.getCheckedNodes()[0];
      this.selectedValue = e;
      this.selectedLabel = Nodes.pathLabels;
    },
    // 商品上传
    onSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  margin: 0 auto;
  width: 900px;
  padding: 20px;
  .goods-wrap {
    margin: 0 auto;
  }
}
.good_class_edit {
  cursor: pointer;
  padding-left: 15px;
  color: #999;
}

// 距离右边距离
.m-r-10{
  margin-right: 10px;
}

//定制element-ui表单样式
.el-form-item {
  padding: 0 20px;
}
.el-item-title ::v-deep .el-form-item__content {
  margin-left: 10px !important;
  font-size: 18px;
  color: #666;
  font-weight: 600;
}
.white {
  background: #ffffff;
  margin-bottom: 0;
  padding-bottom: 22px;

  // 商品规格
  .goods-specs {
    background: #f8f8f8;
    padding: 0px 15px;
    .top {
      padding: 15px 0;
      display: flex;
      border-bottom: 1px solid #dcdfe6;
      justify-content: space-between;
    }
    .bottom {
      border-bottom: 1px solid #dcdfe6;
      margin-bottom: 10px;
    }
  }
  // 库存
  .stock {
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
  }
}
.el-item-title {
  padding-top: 20px;
  margin-top: 22px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dcdfe6;
}
</style>