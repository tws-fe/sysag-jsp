<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>我的关注</title>
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
                    padding-left: 46px;
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
        </head>

        <body>
            <div id="app">
                <div class="follow-head">
                    搜索内容：
                    <p class="search-container">
                        <el-input clearable v-model="searchTxt"></el-input>
                    </p>
                    <el-button plain @click="searchFollow">
                        <img src="../../images/edit.png" alt=""> 查询
                    </el-button>
                    <!-- <el-button plain @click="exportExl">
            <img src="../../images/edit.png" alt="">
            导出
            </el-button> -->
                    <el-button plain @click="unfollow">
                        <img src="../../images/edit.png" alt=""> 取消关注
                    </el-button>
                </div>
                <div v-loading="loading">
                    <el-table @selection-change="handleSelectionChange" :data="tableData" stripe border style="width: 100%">
                        <el-table-column type="selection" width="58" align="center"></el-table-column>
                        <el-table-column fixed label="序号" type="index" width="55" align="center"></el-table-column>
                        <el-table-column fixed label="案件进度" width="118" align="left">
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.taskschedule"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column fixed label="催办次数" width="85" align="center">
                            <template slot-scope="scope">
                                <el-badge :value="scope.row.remindersum" :class="scope.row.sup_bac"></el-badge>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="casenumber" label="案件编号" width="180" align="center"></el-table-column>
                        <el-table-column prop="casetype" label="案件类型" width="88" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="casenaturename" label="案件性质" width="156" align="center"></el-table-column>
                        <el-table-column prop="casename" label="案件名称" width="152" align="center"></el-table-column>
                        <el-table-column prop="statenames" label="案件状态" width="167" align="center"></el-table-column>
                        <el-table-column prop="_userNAME_auditdirector" label="主办民警" width="145" align="center"></el-table-column>
                        <el-table-column prop="ishandovername" label="是否交案" width="150" align="center"></el-table-column>
                        <el-table-column prop="bjsj" label="报警时间" width="200" align="center"></el-table-column>
                        <el-table-column prop="processState" label="办理状态" width="200" align="center"></el-table-column>
                        <el-table-column fixed="right" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="toDetail(scope.row.casenumber)">查看更多</el-button>
                            </template>
                        </el-table-column>
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
                        this.loading = true
                        let url = 'getCase.do?method=getMyFollow&keyWord=' + this.searchTxt + '&curPage=' + this.curPage + '&pageNum=' + this.pageNum
                        axios.post(url).then(res => {
                            this.loading = false
                            let arr = res.data.list
                            if (!arr) return
                            arr.forEach(item => {
                                let curtTaskschedule = item.taskschedule
                                let curRemindersum = item.remindersum
                                // 案件进度处理，后台返回的是字符串且没有做位数处理
                                if (curtTaskschedule) {
                                    if (curtTaskschedule.indexOf('.') > -1) {
                                        // item.taskschedule = parseFloat(parseFloat(cur).toFixed(2))
                                        item.taskschedule = parseInt(curtTaskschedule)
                                    }
                                } else {
                                    item.taskschedule = 0
                                }
                                // 催办次数，字符串转化为整型
                                item.remindersum = curRemindersum ? parseInt(curRemindersum) : 0
                                // 处理催办次数的背景色 <1 3  1-3  2  >3 1
                                let rS = item.remindersum
                                if (rS < 1) {
                                    item['sup_bac'] = 'sup_bac3'
                                } else if (rS < 4) {
                                    item['sup_bac'] = 'sup_bac2'
                                } else {
                                    item['sup_bac'] = 'sup_bac1'
                                }
                            })
                            this.tableData = arr
                            this.pageCount = res.data.pageCount
                        }).catch(err => {
                            this.loading = false
                        })



                    },
                    searchFollow() {
                        console.log('搜索')
                        this.curPage = 1
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
                        this.multipleSelection.forEach((item, index) => {
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
                        return XLSX.writeFile(new_workbook, new Date().getTime() + '.xlsx')
                    },
                    unfollow() {
                        console.log('取消关注', this.multipleSelection)
                        if (!this.multipleSelection.length) {
                            this.$message({
                                type: 'warning',
                                message: '请选择案件',
                                duration: 1000
                            })
                            return
                        }
                        let caseNumStr = ''
                        this.multipleSelection.forEach(item => {
                            caseNumStr += item.casenumber + ','
                        })
                        let str = caseNumStr.substr(0, caseNumStr.length - 1)
                        axios.post('getCase.do?method=cancelFollow&casenumber=' + str).then(res => {
                            // this.$message
                            if (res.data === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '取消成功',
                                    duration: 1000
                                })
                                // 本地数据处理
                                // this.multipleSelection.forEach(item => {
                                //     let caseNo = item.casenumber
                                //     let index = this.tableData.findIndex(item => {
                                //         return item.casenumber === caseNo
                                //     })
                                //     this.tableData.splice(index,1)
                                // })

                                // 把最后一页的数据都删除
                                if (this.multipleSelection.length == this.tableData.length && this.curPage == this.pageCount) {
                                    this.curPage--
                                }
                                this.getLists()
                            }
                        })
                    },
                    handleSelectionChange(val) {
                        this.multipleSelection = val
                    },
                    handleCurrentChange(val) {
                        console.log(`当前页: ${val}`);
                        this.curPage = val
                        this.getLists()
                    },
                    toDetail(casenumber) {
                        var url = "${ctx}/getCase.do?method=toSeeCaseInfo&casenumber=" + casenumber;
                        matech.openTab(casenumber, "案件详情" + casenumber, url, true, parent);
                    },
                }
            })
        </script>

        </html>