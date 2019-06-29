<template>
  <el-dialog title="" :visible.sync="dialogVisible" max-width="80%">
    <div class="data-panel">
      <div class="item file-name">
        <div class="title">
          <h1>文件名称</h1>
          <el-button size="mini" type="primary" class="copy-btn" @click="copy('.file-name-txt')">复制</el-button>
        </div>
        <p class="file-name-txt" >{{voteData.fileName}}</p>
      </div>
      <div class="item doc">
        <div class="title">
          <h1>投票数据</h1>
          <el-button size="mini" type="primary" class="copy-btn" @click="copy('.doc-txt')">复制</el-button>
        </div>
        <pre class="doc-txt">{{voteData.doc}}</pre>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'dataDialog',
  props: {
    voteData: {
      required: true,
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    copy (ele) {
      let dom = document.querySelector(ele)
      dom.setAttribute('contenteditable', 'true')
      dom.focus()
      document.execCommand('selectAll')
      // 执行浏览器复制命令
      if (document.execCommand('copy')) {
        this.$message({
          message: '复制成功!',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="less" >
.el-dialog{
  width: 50%;
  height: calc(85vh - 50px);
  overflow-y: auto;
}
.el-dialog__body{
  padding:20px;
}
.data-panel{
  overflow-y: auto;
  .item{
    text-align: left;
    &>pre{
      overflow: hidden;
      white-space: pre-wrap;
    }
    .title{
      display:flex;
      align-items: center;
      .copy-btn{
        margin-left:20px;
      }
    }
  }
}
</style>
