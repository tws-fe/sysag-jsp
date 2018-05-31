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
        [v-cloak] {
          display: none;
        }

        .icon-ag {
          width: 16px;
          height: 16px;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
      </style>
    </head>

    <body>
      <div id="app" v-cloak>
        <div class="follow-head">
          搜索内容：
          <p class="search-container">
            <el-input clearable v-model="searchTxt" size="small"></el-input>
          </p>
          <el-button plain @click="searchFollow" size="mini">
            <svg class="icon-ag" aria-hidden="true">
              <use xlink:href="#icon-AG_sousuo"></use>
            </svg> &nbsp;&nbsp;查询
          </el-button>
          <!-- 05.25 已处理  -->
          <el-button plain @click="exportExl" size="mini">
            <svg class="icon-ag" aria-hidden="true">
              <use xlink:href="#icon-AG_daochu1"></use>
            </svg> &nbsp;&nbsp;导出
          </el-button>
          <el-button plain @click="exportExlMoth('thismonth')" size="mini">
            <svg class="icon-ag" aria-hidden="true">
              <use xlink:href="#icon-AG_daochu1"></use>
            </svg> &nbsp;&nbsp;本月案件确认
          </el-button>
          <el-button plain @click="exportExlMoth('lastmonth')" size="mini">
            <svg class="icon-ag" aria-hidden="true">
              <use xlink:href="#icon-AG_daochu1"></use>
            </svg> &nbsp;&nbsp;上月案件确认
          </el-button>
        </div>
        <div v-loading="loading">
          <!--  按袁工要求调整字段顺序？？ -->
          <el-table size="small" @selection-change="handleSelectionChange" :data="tableData" stripe border style="width: 100%">
            <el-table-column type="selection" width="58"></el-table-column>
            <el-table-column fixed prop="indexs" label="序号" width="55"></el-table-column>
            <el-table-column fixed prop="casenumber" label="案件编号" width="240"></el-table-column>
            <el-table-column fixed prop="casename" label="案件名称" width="200"></el-table-column>
            <el-table-column prop="_user_auditdirector" label="主办民警" width="180"></el-table-column>
            <el-table-column fixed prop="casenaturename" label="案件性质" width="180"></el-table-column>
            <el-table-column prop="statenames" label="案件状态" width="180"></el-table-column>
            <el-table-column prop="assigntorname" label="指派领导" width="180"></el-table-column>
            <el-table-column prop="bjsj" label="报警时间" min-width="180"></el-table-column>
            <!-- <el-table-column prop="remark" label="备注"></el-table-column> -->
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" :pager-count="5" prev-text="上一页" next-text="下一页"
            background layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
    </body>
    <script src="tws/js/vue.js"></script>
    <script src="tws/js/axios.min.js"></script>
    <!-- 引入组件库 -->
    <script src="tws/js/element-ui.index.js"></script>
    <script src="tws/js/xlsx.full.min.js"></script>
    <script src="tws/js/iconfont.js"></script>
    <script>

      new Vue({
        el: '#app',
        data: {
          searchTxt: '',
          tableData: null,
          loading: true,
          multipleSelection: [],
          curPage: 1,
          pageNum: 10,
          pageCount: 0
        },
        created() {
          this.getLists()
        },
        methods: {
          getLists() {
            let i = 0
            let url = 'getCase.do?method=getCaseConfirmList&curPage=' + this.curPage + '&pageNum=' + this.pageNum + '&contain=' + this.searchTxt
            axios.post(url).then(res => {
              console.log(res.data.list)

              res.data.list.forEach(item => {
                let curtTaskschedule = item.taskschedule
                let curRemindersum = item.remindersum
                // 案件进度处理，后台返回的是字符串且没有做位数处理
                i++
                item['indexs'] = i + (this.curPage - 1) * this.pageNum


              })
              this.pageCount = res.data.pageCount
              this.tableData = res.data.list
              this.loading = false
            }).catch(err => {
              this.loading = false
            })
          },
          searchFollow() {
            console.log('搜索')
            this.getLists()
          },
          exportExl() {
            if (!this.multipleSelection.length) {
              this.$message({
                type: 'error',
                message: '请选择案件',
                duration: 1000
              })
              return
            }
            let arr = []
            let i = 0
            this.multipleSelection.forEach((item, index) => {
              i++
              arr.push({
                '序号': i + (this.currentPage2 - 1) * this.pageNum,
                '案件编号': item.casenumber,
                '案件名称': item.casename,
                '主办民警': item._userNAME_auditdirector,
                '案件性质': item.casenaturename,
                '案件状态': item.statenames,
                '指派领导': item.assigntorname,
                '报警时间': item.bjsj
              })
            })
            let worksheet = XLSX.utils.json_to_sheet(arr)
            let new_workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(new_workbook, worksheet, "我的案件")
            return XLSX.writeFile(new_workbook, new Date().getTime() + '.xlsx')
          },
          exportExlMoth(month) {
            let url = "${ctx}/case.do?method=expExcel&month="+month
            axios.post(url).then(res => {
              window.open(res.data)
            })
          },
          handleSelectionChange(val) {
            this.multipleSelection = val
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.curPage = val
            this.getLists()
          }
        }
      })
    </script>

    </html>