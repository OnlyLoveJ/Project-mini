<template>
  <el-dialog width="50%" class="liushui" title="支付流水" :visible.sync="payVisible">
    <div class="accout">
      <span>订单编号：JSUK89767678</span>
      <span>订单金额：10800.00</span>
      <span>已付金额：8800.00</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      style="width:100%"
      label-width="100px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item label="支付方名称" style="width:48%">
        <el-input placeholder="非必填"></el-input>
      </el-form-item>
      <el-form-item label="收款方式" style="width:48%" prop="name">
        <el-input placeholder="收钱吧"></el-input>
      </el-form-item>
      <el-form-item label="金额" style="width:48%" prop="name">
        <el-input v-model="ruleForm.name" style="width:100%" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="支付时间" style="width:48%" prop="name">
        <el-input v-model="ruleForm.name" style="width:100%" placeholder="输入名称"></el-input>
      </el-form-item>

      <el-form-item label="支付凭证" class="w-100">
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
      <el-form-item label="备注" class="w-100" prop="region">
        <el-input
          v-model="ruleForm.name"
          type="textarea"
          :rows="4"
          placeholder="多行输入"
          style="width:100%"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left:100px" class="w-100">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      payVisible: false,
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
    }
  }
};
</script>

<style lang="scss" scoped>
.liushui {
  //   >>>
  background: #ffffff;
  padding: 20px;
  .accout{
    display: flex;
    border-bottom: 1px solid #dcdfe6;
    padding:0 0 20px 0;
    margin-bottom: 20px;
    span{
      flex: 1;
      display: inline-block;
    }
  }
}
.w-100 {
  width: 100%;
  & ::v-deep .el-form-item__content {
    width: 79%;
  }
}
</style>