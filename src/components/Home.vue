<template>
  <div class="home" style="margin-top: 30px">
    SIMPLE TODOS
    <el-row>
      <el-input
          placeholder="请输入优先级"
          style="display:inline-table; width: 10%; float:left"
          suffix-icon="el-icon-date"
          v-model="input_priority">
      </el-input>
      <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          style="display:inline-table; width: 10%; float:left"
          v-model="input_task">
      </el-input>
      <el-button @click="addTodo()" style="float:left; margin: 2px;" type="primary">增加</el-button>
      <el-button @click="delTodo()" style="float:left; margin: 2px;" type="primary">删除</el-button>
    </el-row>
    <el-table
        :data="todoList"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        ref="multipleTable"
        highlight-current-row
        border
        max-height="100%"
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="id"
          prop="id">
      </el-table-column>
      <el-table-column
          label="优先级"
          prop="priority">
      </el-table-column>
      <el-table-column
          label="任务名"
          prop="name">
      </el-table-column>
      <el-table-column
          label="添加时间"
          prop="add_time">
      </el-table-column>
      <el-table-column
          label="类型"
          prop="todo_type">
      </el-table-column>
    </el-table>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      input_task: '',
      input_priority: '',
      todoList: [],
      checked: true,
      checkBoxData: []
    }
  },
  mounted: function () {
    this.showTodos()
  },
  methods: {
    addTodo () {
      this.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add_todo/', // 接口地址
        data: {
          name: this.input_task, // 传接口参数
          priority: this.input_priority // 传接口参数
        }
      })
          .then(response => {
            var res = response.data
            console.log(res)
            if (res.error_num === 0) {
              this.showTodos()
            } else {
              this.$message.error('add fail')
              console.log(res.msg)
            }
          })
          .catch(error => console.log(error, 'error')) // 失败的返回
    },
    showTodos () {
      this.$axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/show_todos/' // 接口地址
      })
          .then((response) => {
            var res = response.data
            console.log(res)
            if (res.error_num === 0) {
              this.todoList = res.list
            } else {
              this.$message.error('query fail')
              console.log(res.msg)
            }
          })
    },
    delTodo () {
      this.$axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/del_todos/', // 接口地址
        data: {
          // ids: this.checkBoxData, // 传接口参数
          ids: this.multipleSelection
        }
      })
          .then((response) => {
            var res = response.data
            console.log(res)
            if (res.error_num === 0) {
              window.location.reload()  // 强制刷新页面
              this.showTodos()
            } else {
              this.$message.error('query fail')
              console.log(res.msg)
            }
          })
    },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        let arr=[]
        val.forEach(i=>{arr.push(i.id)})
        this.multipleSelection = arr
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-table--border:after, .el-table--group:after, .el-table:before {
  background-color: red;
}

.el-table--border, .el-table--group {
  border-color: red;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid red;
}

.el-table--border th, .el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid red;
}

.el-table--border td, .el-table--border th {
  border-right: 1px solid red;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
