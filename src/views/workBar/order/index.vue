<template>
  <div class="AddOrder">
    <!-- 添加订单区域 -->
    <el-divider class="width:100%" content-position="left">订单信息</el-divider>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      style="width:100%"
      label-width="100px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item label="姓名" style="width:48%" prop="name">凉凉</el-form-item>
      <el-form-item label="电话" style="width:48%" prop="name">18937827918</el-form-item>
      <el-form-item label="公司名称" class="w-100" prop="name">
        <el-input v-model="ruleForm.name" style="width:100%" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" class="w-100" prop="region">
        <el-input
          v-model="ruleForm.name"
          type="textarea"
          :rows="4"
          placeholder="多行输入"
          style="width:100%"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品信息" class="w-100" prop="region">
        <el-button type="primary" plain @click="showAddGoods">
          添加商品
          <i class="el-icon-plus el-icon--right"></i>
        </el-button>
        <el-table :data="tableData" border style="width: 100%;margin-top:20px">
          <el-table-column prop="date" label="商品名称"></el-table-column>
          <el-table-column prop="name" label="规格编号"></el-table-column>
          <el-table-column prop="address" label="规格详情"></el-table-column>
          <el-table-column prop="address" label="原价"></el-table-column>
          <el-table-column prop="address" label="成交价"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="合同附件" class="w-100">
        <el-upload
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-left:100px" class="w-100">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加商品弹框 -->
    <el-dialog title="添加商品" :visible.sync="addGcoodsVisible" width="500">
      <addGoods />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGcoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGcoodsVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addGoods from "../../components/AddGoods.vue";
export default {
  name: "addOrder",
  components: { addGoods },
  data() {
    return {
      // 添加商品弹窗
      addGcoodsVisible: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  props: {
    AddVisible: {
      type: Boolean,
      defaults: true
    }
  },
  methods: {
    //   表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 表单关闭前调用
    handeleClose() {
      this.$parent.showAddOrder();
    },
    showAddGoods() {
      this.addGcoodsVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-divider ::v-deep .el-divider__text {
  //   background: blue;
  color: rgb(36, 177, 138);
}
.AddOrder {
  //   >>>
  background: #ffffff;
  padding: 20px;
}
.w-100 {
  width: 100%;
  & ::v-deep .el-form-item__content {
    width: 90%;
  }
}
</style>
