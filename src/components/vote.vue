<template>
  <div class="vote-wrap">
    <div class="member-panel">
      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(item, index) in memberList" :key="index">
        <div class="member-name-block" >
          <el-button @click="handleMember(item)" :type="getColor()" plain size="medium" :disabled="banOrVote === ''">{{item}}</el-button>
        </div>
      </el-col>
    </div>
    <div class="list">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="margin-bottom:20px;">
          <div class="ban-vote-panel">
            <el-button type="danger" class="btn-ban" @click="handleBan">BAN</el-button>
            <el-button type="primary" @click="handleVote">VOTE</el-button>
            <el-button type="success" @click="handleData">DATA</el-button>
          </div>
          <div class="ban-list">
            <p class="title">曾经的周最佳</p>
            <div class="ban-panel">
              <el-tag closable @close="handleDelBanItem(index)" :type="getColor()" v-for="(item, index) in banList" :key="index">{{item}}</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="vote-list">
            <div class="vote-block" v-for="(item, key) in score" :key="key">
              <div class="progress-line">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(item)"></el-progress>
              </div>
              <div class="vote-ticket" >
                <el-popover
                  placement="right"
                  title=""
                  width="200"
                  trigger="hover"
                  :content="getFans(key)">
                  <el-button :class="{'winner': isWinner(key)}" slot="reference" plain size="mini" :type="getColor()">
                    {{key}}<span class="ticket-num">{{item}}</span>票
                  </el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <voterDialog ref="voterDialog" :candidateList="candidateList" @vote="vote"></voterDialog>
    <dataDialog ref="dataDialog" :voteData="voteData"></dataDialog>
  </div>
</template>

<script>
import voterDialog from './voterDialog'
import dataDialog from './dataDialog'
import moment from 'moment'
export default {
  name: 'vote',
  components: {
    voterDialog,
    dataDialog
  },
  data () {
    return {
      voteData: {},
      // 发起选票的人
      fans: '',
      result: {},
      score: {},
      voteHistory: {},
      memberList: ['艾小姚', '陈煜', '戴敏', '黄群', '姜明哲', '柯艳琴', '刘钦铸', '刘雅琴', '刘志斌', '马文涛', '孟腾飞', '王生资', '王晓芳', '熊龙辉', '许璠', '徐海', '叶国良', '张贵'],
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
    handleDelBanItem (index) {
      this.banList.splice(index, 1)
    },
    isWinner (key) {
      if (this.result.hasOwnProperty(key)) {
        return true
      }
    },
    getPercentage (item) {
      let len = this.memberList.length - this.banList.length
      return Number(((item / len) * 100).toFixed(2))
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
      this.result = {}
      let maxIndex = []
      let values = []
      let keys = []
      Object.keys(this.score).forEach(key => {
        values.push(this.score[key])
        keys.push(key)
      })
      let max = 0
      // 获取最大分数
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
      // 排序
      for (let i = 0; i < values.length - 1; i++) {
        for (let j = i + 1; j < values.length; j++) {
          if (values[j] > values[i]) {
            let temp = values[i]
            values[i] = values[j]
            values[j] = temp
            // 同时对应的key 数组要进行排序
            temp = keys[i]
            keys[i] = keys[j]
            keys[j] = temp
          }
        }
      }
      this.score = {}
      keys.forEach((key, index) => {
        this.$set(this.score, key, values[index])
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
    setVoteHistory (per) {
      this.voteHistory[this.fans] = per
    },
    voteCheck (per) {
      // 检查，1，是否已经投过票了；2，是否重复投票；3，是否投自己
      if (this.voteHistory.hasOwnProperty(this.fans)) {
        // 重复投票，将一最后一次的为准
        this.$message({
          message: '亲，重复投票，之前的票数将作废哦!',
          type: 'warning'
        })
        // 粉丝之前投的人
        let prePer = this.voteHistory[this.fans]
        if (this.score[prePer] === 1) {
          this.$delete(this.score, prePer)
        } else {
          this.score[prePer] = this.score[prePer] - 1
        }
        this.$delete(this.voteHistory, this.fans)
      }
      // 投了自己
      if (this.fans === per) {
        this.$message({
          message: '迷之自信，看好你哦!',
          type: 'warning'
        })
      }
    },
    vote (person) {
      console.log('vote:', person)
      this.voteCheck(person)
      this.setVoteHistory(person)
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
    },
    // str 每隔3个逗号换行
    nByFlag (str, flag, num) {
      let flagIndex = 0
      str = str.replace(/,/g, (match) => {
        if (++flagIndex % num === 0) {
          return ',\n'
        } else {
          return match
        }
      })
      return str
    },
    handleData () {
      let obj = {
        ban: this.banList,
        // vote: this.nByFlag(JSON.stringify(this.voteHistory), ',', 3),
        vote: this.voteHistory,
        score: this.score,
        result: this.result
      }
      let doc = `---
title: ${moment().format('YYYYMMDD')}周最佳投票  
date: ${moment().format('YYYY-MM-DD hh:mm:ss')}
categories: vote
author: 云业务武汉团队
tags:
- 团队
sidebar: auto
---

###  周最佳

\`\`\`json
{
  <div class="in-line">
    <label class="line-name">"ban":</label>
    <p class="line-value">${JSON.stringify(obj.ban)},</p>
  </div>
  <div class="in-line">
    <label class="line-name">"vote":</label>
    <p class="line-value">${JSON.stringify(obj.vote)},</p>
  </div>
  <div class="in-line">
    <label class="line-name">"score":</label>
    <p class="line-value">${JSON.stringify(obj.score)},</p>
  </div>
  <div class="in-line">
    <label class="line-name">"result":</label>
    <p class="line-value">${JSON.stringify(obj.result)}</p>
  </div>
}
\`\`\`
`
      // doc = doc + '```json' + objStr + '```'
      let fileName = moment().format('YYYYMMDD') + '_周最佳投票.md'
      console.log('data:', {fileName, doc})
      this.$refs.dataDialog.dialogVisible = true
      this.voteData = {fileName, doc}
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
      .el-button{
        width:80px;
        height:40px;
      }
    }
  }
  .ban-vote-panel{
    margin-bottom:20px;
    padding:50px 20px;
    background-color:#fff;
    display:flex;
    justify-content: space-around;
  }
  .list{
    margin-top:20px;
    .ban-list{
      background-color:#fff;
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
          .el-button{
            width:100px;
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
