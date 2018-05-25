<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>在线档案查询</title>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
            <style>
                .follow-head {
                    padding-left: 10px;
                    margin: 12px 0;
                }

                .search-container {
                    display: inline-block;
                }

                .follow-head>.el-button {
                    margin-left: 10px;
                    /* padding-left: 46px; */
                    position: relative;
                }

                .follow-head>.el-button img {
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    transform: translateY(-50%);
                }

                .el-pagination {
                    float: right;
                    margin-right: 40px;
                    margin-top: 24px;
                }
                .el-table__empty-block {
                    height: 0;
                }
            </style>
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
                            <el-input clearable v-model="searchTxt"></el-input>
                          </p>
                          <el-button plain @click="searchFollow">
                              <svg class="icon-ag" aria-hidden="true">
                                  <use xlink:href="#icon-AG_sousuo"></use>
                                </svg>
                                
                                &nbsp;&nbsp;查询
                          </el-button>
                          <!-- <el-button plain @click="exportExl">
                            <svg class="icon-ag" aria-hidden="true">
  <use xlink:href="#icon-AG_daochu1"></use>
</svg>

                            &nbsp;&nbsp;导出
                          </el-button> -->
                        </div>
                        <div v-loading="loading">
                          <el-table
                            @selection-change="handleSelectionChange"
                            :data="tableData"
                            stripe border
                            style="width: 100%">
                            <el-table-column  type="selection" width="58"></el-table-column>
                            <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
                            <el-table-column fixed prop="caseNo"  label="案件编号" width="118"></el-table-column>
                            <el-table-column fixed  prop="caseName" label="案件名称" width="85"></el-table-column>
                            <el-table-column fixed  prop="alarmTime" label="报警时间" width="180"></el-table-column>
                            <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
                            <el-table-column prop="state" label="案件类别" width="88" ></el-table-column>
                            <el-table-column prop="police" label="主办民警" width="156"></el-table-column>
                            <el-table-column prop="caseState" label="案件状态" width="152"></el-table-column>
                            <el-table-column prop="handDate" label="移交日期" width="167"></el-table-column>
                            <el-table-column prop="handName" label="移交人" width="145"></el-table-column>
                            <el-table-column prop="comment" label="备注" width="150"></el-table-column>
                            <el-table-column prop="handState" label="移交状态" width="150"></el-table-column>                            
                            <el-table-column fixed="right"  label="操作" min-width="150">
                              <template slot-scope="scope">
                                <el-button type="text" @click="editVisit(scope.row.uuid)">查看</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                          <el-pagination
                            @current-change="handleCurrentChange"
                            :page-count="pageCount"
                            :pager-count="5"
                            prev-text="上一页"
                            next-text="下一页"
                            background
                            layout="prev, pager, next"
                            >
                          </el-pagination>
                        </div>
                      </div>
        </body>
        <script src="tws/js/vue.js"></script>
        <script src="tws/js/axios.min.js"></script>
        <!-- 引入组件库 -->
        <script src="tws/js/element-ui.index.js"></script>
        <script src="tws/js/iconfont.js"></script>
        <script>
              
                new Vue({
                  el:'#app',
                  data: {
                    searchTxt: '',
                    tableData: null,
                    loading: false,
                    multipleSelection: [],
                    curPage: 1,
                    pageNum: 10,
                    pageCount: 5
                  },
                  created () {
                    this.getLists()
                  },
                  methods: {
                    getLists() {
                        this.loading = true
                        // let url = 'getCaseVisit.do?method=getMyCaseVisitList&curPage=' + this.curPage + '&pageNum=' + this.pageNum + '&contain=' + this.searchTxt
                        // axios.post(url).then(res => {
                        //   let data = res.data
                        //   this.tableData = data.list
                        //   this.pageCount = data.pageCount
                        //   this.loading = false
                        // }).catch(err => {
                        //   this.loading = false
                        // })

                        setTimeout(()=>{
                          this.loading = false
                          this.tableData = this.mockData()
                        },1000)
                    },
                    searchFollow () {
                      console.log('搜索')
                      this.getLists()
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
                    editVisit (uuid) {
                      var url = "${ctx}/getCaseVisit.do?method=toVisitEdit&uuid=" + uuid + '&editType=update'
                      matech.openTab(uuid, "来访情况登记表" + uuid, url, true, parent);
                    },
                    handleSelectionChange(val) {
                      this.multipleSelection = val
                    },
                    handleCurrentChange(val) {
                      console.log(`当前页: ${val}`)
                      this.curPage = val
                      this.getLists()
                    },
                    mockData () {
                      let arr = []
                      for (let index = 0; index < 4; index++) {
                        arr.push({
                          caseNo: '0246515',
                          caseName: '偷窃案',
                          alarmTime: '2018-03-25',
                          state: '刑事案件',
                          police: '张某某',
                          caseState: 'qwqwqw',
                          handDate: '2018-03-02',
                          handName: '王某某',
                          comment: '******',
                          handState: '未移交'
                        })
                        
                      }
                      return arr
                    }
                  }
                })
              </script>
        </html>