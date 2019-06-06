<template>
  <div class="vote-wrap">
    <div class="member-panel">
      <el-col :span="4" v-for="(item, index) in memberList" :key="index">
        <div class="member-name-block" >
          <el-button @click="handleMember(item)" :type="getColor()" plain size="medium" :disabled="banOrVote === ''">{{item}}</el-button>
        </div>
      </el-col>
    </div>
    <div class="ban-vote-panel">
      <el-button type="danger" class="btn-ban" @click="handleBan">BAN</el-button>
      <el-button type="primary" @click="handleVote">VOTE</el-button>
    </div>
    <div class="list">
      <div class="ban-list">
        <p class="title">曾经的周最佳</p>
        <div class="ban-panel">
          <el-tag :type="getColor()" v-for="(item, index) in banList" :key="index">{{item}}</el-tag>
        </div>
      </div>
      <div class="vote-list">
        <div class="vote-block" v-for="(item, key) in score" :key="key">
          <div class="progress-line">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(item)"></el-progress>
          </div>
          <div class="vote-ticket" :class="{'winner': isWinner(key)}">
            <el-popover
              placement="right"
              title=""
              width="200"
              trigger="hover"
              :content="getFans(key)">
              <el-button slot="reference" plain size="mini" :type="getColor()">
                {{key}}<span class="ticket-num">{{item}}</span>票
              </el-button>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <voterDialog ref="voterDialog" :candidateList="candidateList" @vote="vote"></voterDialog>
  </div>
</template>

<script>
import voterDialog from './voterDialog'
export default {
  name: 'vote',
  components: {
    voterDialog
  },
  data () {
    return {
      // 发起选票的人
      fans: '',
      result: {},
      score: {},
      voteHistory: {},
      memberList: ['刘志斌', '刘钦铸', '马文涛', '柯艳琴', '张贵', '戴敏', '熊龙辉', '叶国良', '许璠', '王晓芳', '艾小姚', '姜明哲', '王生资', '孟腾飞', '徐海', '刘雅琴'],
      banList: [],
      // candidateList: ['刘志斌', '刘钦铸', '马文涛'],
      colors: ['primary', 'success', 'info', 'warning', 'danger'],
      banOrVote: '' // '' , ban , vote 三种状态
    }
  },
  computed: {
    candidateList () {
      let arr = []
      this.memberList.forEach(item => {
        if (!this.banList.includes(item)) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    isWinner (key) {
      if (this.result.hasOwnProperty(key)) {
        return true
      }
    },
    getPercentage (item) {
      let len = this.memberList.length
      return (item / len).toFixed(2) * 100
    },
    getFans (key) {
      let str = ''
      let fanList = []
      Object.keys(this.voteHistory).forEach(keyHis => {
        if (this.voteHistory[keyHis] === key) {
          fanList.push(keyHis)
        }
      })
      str = '我的粉丝:' + fanList.join(',')
      return str
    },
    setResult () {
      let maxIndex = []
      let values = []
      let keys = []
      Object.keys(this.score).forEach(key => {
        values.push(this.score[key])
        keys.push(key)
      })
      let max = 0
      values.forEach((value, index) => {
        if (value > max) {
          max = value
          maxIndex = []
          maxIndex.push(index)
        } else if (value === max) {
          max = value
          maxIndex.push(index)
        }
      })
      maxIndex.forEach(value => {
        this.$set(this.result, keys[value], max)
      })
    },
    setScore (per) {
      if (!this.score.hasOwnProperty(per)) {
        // this.score[per] = 1
        this.$set(this.score, per, 1)
      } else {
        this.score[per] += 1
      }
    },
    vote (person) {
      console.log('vote:', person)
      this.voteHistory[this.fans] = person
      this.setScore(person)
      this.setResult()
    },
    handleMember (item) {
      if (this.banOrVote === 'vote') {
        this.fans = item
        this.$refs.voterDialog.dialogVisible = true
      } else if (this.banOrVote === 'ban') {
        if (!this.banList.includes(item)) {
          this.banList.push(item)
        }
      }
    },
    getColor () {
      var index = Math.floor(Math.random() * 5)
      return this.colors[index]
    },
    handleBan () {
      this.banOrVote = 'ban'
    },
    handleVote () {
      this.banOrVote = 'vote'
    }
  }
}
</script>

<style lang="less">
html,body{
  margin:0px;
  padding:0px
}
.vote-wrap {
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  padding:20px;
  width: 100%;
  background-color: #fafafa;
  .member-panel{
    display:flex;
    flex-wrap:wrap;
    background-color:#fff;
    padding:10px 10px 20px 20px;
    .member-name-block{
      margin-right:10px;
      margin-top:10px;
    }
  }
  .ban-vote-panel{
    margin-top:20px;
    padding:50px 20px;
    background-color:#fff;
    .btn-ban{
      margin-right:100px;
    }
  }
  .list{
    margin-top:20px;
    display:flex;
    .ban-list{
      width:400px;
      background-color:#fff;
      margin-right:20px;
      padding: 20px 10px 20px 20px;
      .ban-panel{
        display:flex;
        flex-wrap: wrap;
        margin-top:10px;
        .el-tag{
          margin-right:10px;
          margin-top:10px;
        }
      }
    }
    .vote-list{
      flex:1;
      background-color:#fff;
      display:flex;
      flex-direction: column;
      padding:0px 20px 20px 20px;
      .vote-block{
        margin-top:20px;
        display:flex;
        .progress-line{
          padding-top:5px;
          flex:1;
        }
        .vote-ticket{
          width:100px;
          margin-left:20px;
          .ticket-num{
            font-size:20px;
            padding:0 5px;
          }
        }
      }
    }
  }
  .title{
    margin:0px;
    text-align:left;
  }
}
  .warning{
    color: #E6A23C;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  .primary{
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .success{
    color: #67C23A;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  .danger{
    color: #F56C6C;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
  .info{
    color: #909399;
    background: #f4f4f5;
    border-color: #d3d4d6;
  }
  .winner{
    box-shadow: -4px 3px 10px -2px orange;
  }
</style>
