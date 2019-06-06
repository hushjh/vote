<template>
  <el-dialog title="候选人名单" :show-close="false" :visible.sync="dialogVisible" max-width="80%" >
    <div class="candidate-panel">
      <div class="radio-block" v-for="(item, index) in candidateList" :key="index" :class="[getColor()]">
        <el-radio v-model="radio" :label="item">{{item}}</el-radio>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'voterDialog',
  props: {
    candidateList: {
      required: true,
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      radio: '',
      dialogVisible: false,
      colors: ['primary', 'success', 'info', 'warning', 'danger']
    }
  },
  methods: {
    handleSure () {
      this.dialogVisible = false
      this.$emit('vote', this.radio)
    },
    getColor () {
      var index = Math.floor(Math.random() * 5)
      return this.colors[index]
    }
  }
}
</script>
<style lang="less" >
.el-dialog__body{
  padding:20px;
}
.candidate-panel{
  .radio-block{
    display:inline-block;
    margin-right:10px;
    margin-bottom:10px;
    border-radius:3px;
    padding:10px 15px;
    border:1px solid #eee;
  }
}
</style>
