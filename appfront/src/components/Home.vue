<template>
  <div class="home">
    <el-row display="margin-top:10px">
      <el-input v-model="input" placeholder="input task"
                style="display:inline-table; width: 10%; float:left"></el-input>
      <el-button type="primary" @click="addTodo()" style="float:left; margin: 2px;">add</el-button>
    </el-row>
    <el-row>
      <el-table :data="todoList" style="width: 100%" border>
        <el-table-column prop="id" label="id" min-width="90">
          <template slot-scope="scope"> {{ scope.row.pk }}</template>
        </el-table-column>
        <el-table-column prop="priority" label="priority" min-width="100">
          <template slot-scope="scope"> {{ scope.row.fields.priority }}</template>
        </el-table-column>
        <el-table-column prop="name" label="name" min-width="100">
          <template slot-scope="scope"> {{ scope.row.fields.name }}</template>
        </el-table-column>
        <el-table-column prop="add_time" label="add_time" min-width="100">
          <template slot-scope="scope"> {{ scope.row.fields.add_time }}</template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      input: '',
      todoList: []
    }
  },
  mounted: function () {
    this.showTodos()
  },
  methods: {
    addTodo () {
      this.$http.get('http://127.0.0.1:8000/api/add_todo?name=' + this.input)
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
            this.showTodos()
          } else {
            this.$message.error('add fail')
            console.log(res['msg'])
          }
        })
    },
    showTodos () {
      this.$http.get('http://127.0.0.1:8000/api/show_todos')
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          console.log(res)
          if (res.error_num === 0) {
            this.todoList = res['list']
          } else {
            this.$message.error('query fail')
            console.log(res['msg'])
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-col {
    min-height: 50px
  }
  /*.el-table--border, .el-table--group{*/
  /*  border: 10px;*/
  /*}*/
  /*.el-table__header-wrapper th:nth-last-of-type(2){*/
  /*  border-right: 10px;*/
  /*}*/
  /*.el-table--border td:nth-last-of-type(1){*/
  /*  border-right: 10px;*/
  /*}*/
  /*.el-table--border::after, .el-table--group::after{*/
  /*  width: 10%;*/
  /*}*/
  .el-table--border:after,
  .el-table--group:after,
  .el-table:before {
    background-color: red;
  }

  .el-table--border,
  .el-table--group {
    border-color: red;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid red;
  }

  .el-table--border th,
  .el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid red;
  }

  .el-table--border td,
  .el-table--border th {
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
