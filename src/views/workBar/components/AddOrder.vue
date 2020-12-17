<template>
  <!-- 添加订单区域 -->
  <el-dialog title="添加商品" :visible.sync="AddVisible" width="500">
    <span slot="footer" class="dialog-footer">
      <el-button @click="AddVisible = false">取 消</el-button>
      <el-button type="primary" @click="AddVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "addOrder",
  components: {},
  data() {
    return {};
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
    // 表单关闭后调用
    handeleClose() {
      this.$parent.showAddOrder();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-divider ::v-deep .el-divider__text {
  //   background: blue;
  color: rgb(36, 177, 138);
}
.Addorder {
  //   >>>
}
</style>