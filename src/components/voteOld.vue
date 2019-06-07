<template>
  <div class="vote-wrap-old">
    <div class="show-wrap">
      <div class="tb-head">
        <div class="tb-head-col" v-for="(item, index) in tableData.header" :key="index">
          {{item}}
        </div>
      </div>
      <div class="tb-body">
        <div class="tb-row" v-for="(item, key) in tableData.body" :key="key">
          <div class="tb-col" v-for="(iCol, colKey) in item" :key="colKey"
          :class="{'noVote': isNoVote(iCol), 'col-title': isColTitle(iCol), 'col-hasVoter': isColHasVolter(iCol, colKey)}">
            {{showCol(iCol)}}
          </div>
        </div>
      </div>
    </div>
    <div class="set-wrap">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="所有小伙伴">
          <el-input type="textarea" v-model="form.allMember"></el-input>
        </el-form-item>
        <el-form-item label="曾经周最佳">
          <el-input type="textarea" v-model="form.oldGoodMember"></el-input>
        </el-form-item>
        <div class="vote">
          <el-select v-model="form.voteA" placeholder="投票人">
            <el-option v-for="(item, index) in memberOpt" :key="index"
            :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span>选</span>
          <el-select v-model="form.voteB" placeholder="得票人">
            <el-option v-for="(item, index) in beVoteOpt" :key="index"
            :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="handleVote">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vote',
  data () {
    return {
      memberList: ['刘志斌', '刘钦铸', '马文涛', '柯艳琴', '张贵', '戴敏', '熊龙辉', '叶国良', '许璠', '王晓芳', '艾小姚', '姜明哲', '王生资', '孟腾飞', '徐海', '刘雅琴'],
      noVoteList: ['刘志斌', '刘钦铸', '马文涛'],
      form: {
        oldGoodMember: '',
        allMember: '',
        voteA: '',
        voteB: ''
      },
      tableData: {
        header: ['', 'A', 'B', 'C', '票数'],
        body: {
          'A': {
            auth: {
              name: 'A',
              noVote: false
            },
            'A': 0,
            'B': 0,
            'C': 0,
            'total': ''
          },
          'B': {
            auth: {
              name: 'B',
              noVote: true
            },
            'A': 0,
            'B': 0,
            'C': 0,
            'total': ''
          },
          'C': {
            auth: {
              name: 'C',
              noVote: false
            },
            'A': 0,
            'B': 0,
            'C': 0,
            'total': ''
          }
        }
      }
    }
  },
  computed: {
    oldGoodMemList () {
      if (this.form.oldGoodMember !== '') {
        return this.form.oldGoodMember.split(',')
      } else {
        return []
      }
    },
    allMemList () {
      if (this.form.allMember !== '') {
        return this.form.allMember.split(',')
      } else {
        return []
      }
    },
    beVoteOpt () {
      let opt = []
      this.memberList.forEach(item => {
        if (!this.noVoteList.includes(item)) {
          let obj = {}
          obj.label = item
          obj.value = item
          opt.push(obj)
        }
      })
      return opt
    },
    memberOpt () {
      let opt = []
      this.memberList.forEach(item => {
        let obj = {}
        obj.label = item
        obj.value = item
        opt.push(obj)
      })
      return opt
    }
  },
  watch: {
    'allMemList' () {
      this.memberList = this.allMemList
      this.transTableData(this.allMemList)
    },
    'oldGoodMemList' () {
      this.noVoteList = this.oldGoodMemList
      this.transNoVote(this.noVoteList)
    }
  },
  methods: {
    // 处理所有人员数据
    transTableData (allMemList) {
      let header = ['', '票数']
      header.splice(1, 0, ...allMemList)
      this.tableData.header = header
      let body = {}
      allMemList.forEach(item => {
        body[item] = {}
        let obj = {}
        let auth = {
          name: item,
          noVote: false
        }
        obj.auth = auth
        allMemList.forEach(itemCol => {
          obj[itemCol] = 0
        })
        obj.total = ''
        body[item] = obj
      })
      this.tableData.body = body
    },
    // 处理过往周最佳数据
    transNoVote (noVoteList) {
      let {body} = this.tableData
      this.noVoteList.forEach(item => {
        body[item].auth.noVote = true
      })
    },
    handleVote () {
      let {voteA, voteB} = this.form
      let {body} = this.tableData
      body[voteB][voteA] = 1
      this.calcVoteNumber()
    },
    calcVoteNumber () {
      let {body} = this.tableData
      Object.keys(body).forEach(rowKey => {
        let total = 0
        Object.keys(body[rowKey]).forEach(colKey => {
          if (colKey !== 'auth' && colKey !== 'total') {
            total += +body[rowKey][colKey]
          }
        })
        body[rowKey].total = total
      })
    },
    isNoVote (item) {
      if (item.noVote === true) {
        return true
      } else {
        return false
      }
    },
    showCol (item) {
      if (item.name) {
        return item.name
      } else {
        return item
      }
    },
    isColTitle (iCol) {
      if (iCol.noVote) {
        return true
      } else {
        return false
      }
    },
    isColHasVolter (iCol, colKey) {
      if (colKey === 'total' && iCol > 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.transTableData(this.memberList)
    this.transNoVote(this.noVoteList)
  }
}
</script>

<style lang="less">
.vote-wrap-old {
  display:flex;
  margin:20px;
  .show-wrap{
    border: 1px solid #eee;
    flex: 1;
    .tb-head{
      display:flex;
      .tb-head-col {
        flex:1;
        height:60px;
        padding:5px 10px;
      }
    }
    .tb-body{
      .tb-row{
        display:flex;
        .tb-col{
          height:60px;
          flex:1;
          padding:5px 10px;
          align-items: center;
          justify-content: center;
          &.noVote{
            background-color:red;
          }
          &.col-title{
            width:100px;
          }
          &.col-hasVoter{
            color:rgb(0, 110, 255);
          }
        }
      }
    }
  }
  .set-wrap{
    margin-left:20px;
    width:600px;
  }
}
</style>
