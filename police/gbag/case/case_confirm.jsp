<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件确认列表</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
            <style>
                    .follow-head {
                      padding-left: 10px;
                    }
                    .search-container {
                      display: inline-block;
                    }
                    .follow-head>.el-button {
                      margin-left: 10px;
                      padding-left: 46px;
                      position: relative;
                    }
                    .follow-head>.el-button img {
                      position: absolute;
                      top: 50%;
                      left: 20px;
                      transform: translateY(-50%);
                    }
                    .el-pagination{
                      float: right;
                      margin-right: 40px;
                      margin-top: 24px;
                    }
                    /* 原来表格的td默认上下padding：12px，前面带el-button的操作的 */
                    /* td因为el-button默认padding：12px 20px，所以全局处理的时候应该处理el-button */
                    /* 而不是el-table */
                    /* .el-table td{
                      padding: 12px 0;
                    } */
                    </style>
</head>
<body>
        <div id="app" >
                <div class="follow-head">
                  搜索内容：
                  <p class="search-container">
                    <el-input clearable v-model="searchTxt"></el-input>
                  </p>
                  <el-button plain @click="searchFollow">
                    <img src="../../images/edit.png" alt="">
                    查询
                  </el-button>
                  <el-button plain @click="exportExl">
                    <img src="../../images/edit.png" alt="">
                    导出
                  </el-button>
                  <el-button plain @click="exportExl">
                    <img src="../../images/edit.png" alt="">
                    本月案件确认
                  </el-button>
                  <el-button plain @click="exportExl">
                    <img src="../../images/edit.png" alt="">
                    上月案件确认
                  </el-button>
                </div>
                <div v-loading="loading">
                  <el-table
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                    stripe border
                    style="width: 100%">
                    <el-table-column  type="selection" width="58"></el-table-column>
                    <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
                    <el-table-column fixed  label="案件名称" width="118"></el-table-column>
                    <el-table-column fixed  label="案件编号" width="85"></el-table-column>
                    <el-table-column fixed  prop="casenumber" label="案件性质" width="180"></el-table-column>
                    <el-table-column prop="casetype" label="主办民警" width="88" ></el-table-column>
                    <el-table-column prop="casetype" label="报警时间" width="88" ></el-table-column>
                    <el-table-column prop="casenaturename" label="案件状态" width="156"></el-table-column>
                    <el-table-column prop="casename" label="指派领导" width="152"></el-table-column>
                    <el-table-column prop="statenames" label="备注" ></el-table-column> 
                  </el-table>
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :pager-count="5"
                    prev-text="上一页"
                    next-text="下一页"
                    background
                    layout="prev, pager, next"
                    :total="1000">
                  </el-pagination>
                </div>
              </div>
</body>
<script src="tws/js/vue.js"></script>
<script src="tws/js/axios.min.js"></script>
<!-- 引入组件库 -->
<script src="tws/js/element-ui.index.js"></script>
<script src="tws/js/xlsx.full.min.js"></script>
<script>
        let arr1 = []
        for (let index = 0; index < 10; index++) {
          arr1.push({
            taskschedule: 0,
            remindersum: 0,
            casenumber: '',
            casetype: '',
            casenaturename: '',
            casename: '',
            statenames: '',
            _userNAME_auditdirector: '',
            ishandovername: '',
            bjsj: '',
            processState: ''
          })
        }
      
        new Vue({
          el:'#app',
          data: {
            searchTxt: '',
            tableData: arr1,
            loading: true,
            multipleSelection: []
          },
          created () {
            this.getLists()
          },
          methods: {
            getLists() {
              setTimeout(()=> {
                let arr = []
                for (let index = 0; index < 10; index++) {
                  arr.push({
                    taskschedule: '' + Math.random()*100,
                    remindersum: '' + Math.random()*10,
                    casenumber: 'A111111111122222',
                    casetype: '行政案件',
                    casenaturename: '妨碍佐证案',
                    casename: 'adadfadf',
                    statenames: '已受理未结',
                    _userNAME_auditdirector: '陈阿三',
                    ishandovername: '未交案',
                    bjsj: '2018-03-06 19:31:36',
                    processState: '侦办中'
                  })
                }
               
                 
                this.tableData = arr
                this.loading = false
              }, 1000)
            },
            searchFollow () {
              console.log('搜索')
            },
            exportExl () {
              if (!this.multipleSelection.length) {
                this.$message({
                  type: 'error',
                  message: '请选择案件',
                  duration: 1000
                })
                return
              }
              let arr = []
              this.multipleSelection.forEach((item,index) => {
                arr.push({
                  '序号': index + 1,
                  '案件进度': item.taskschedule,
                  '催办次数': item.remindersum,
                  '案件编号': item.casenumber,
                  '案件类型': item.casetype,
                  '案件性质': item.casenaturename,
                  '案件名称': item.casename,
                  '案件状态': item.statenames,
                  '主办民警': item._userNAME_auditdirector,
                  '是否交案': item.ishandovername,
                  '报警时间': item.bjsj,
                  '办理状态': item.processState
                })
              })
              let worksheet = XLSX.utils.json_to_sheet(arr)
              let new_workbook = XLSX.utils.book_new()
              XLSX.utils.book_append_sheet(new_workbook, worksheet, "我的案件")
              return XLSX.writeFile(new_workbook, new Date().getTime()+'.xlsx')
            },
            editVisit (row) {
              console.log('来访处理：', row)
            },
            handleSelectionChange(val) {
              this.multipleSelection = val
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`)
            }
          }
        })
      </script>
</html>