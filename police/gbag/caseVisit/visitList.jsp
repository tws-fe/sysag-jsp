<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>来访登记列表</title>
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
                        </svg>
                        &nbsp;&nbsp;查询
                    </el-button>
                    <!-- 05.25 已处理 -->
                    <el-button plain @click="exportExl" size="mini">
                        <svg class="icon-ag" aria-hidden="true">
                            <use xlink:href="#icon-AG_daochu1"></use>
                        </svg>

                        &nbsp;&nbsp;导出
                    </el-button>
                    <el-button plain @click="editVisit('')" size="mini">
                        <svg class="icon-ag" aria-hidden="true">
                            <use xlink:href="#icon-AG_xinzeng"></use>
                        </svg>
                        &nbsp;&nbsp;新增
                    </el-button>
                </div>
                <div v-loading="loading">
                    <el-table size="small" @selection-change="handleSelectionChange" :data="tableData" stripe border style="width: 100%">
                        <!-- <el-table-column type="selection" width="58" align="center"></el-table-column> -->
                        <el-table-column fixed prop="indexs" label="序号" width="55"></el-table-column>
                        <el-table-column fixed prop="result" label="处理结果" width="118"></el-table-column>
                        <el-table-column fixed prop="name" label="来访人" width="85"></el-table-column>
                        <el-table-column fixed prop="visittime" label="来访时间" width="180"></el-table-column>
                        <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
                        <el-table-column prop="telnum" label="联系电话" width="180"></el-table-column>
                        <el-table-column prop="visitfor" label="来访事由" width="156"></el-table-column>
                        <el-table-column prop="receivereply" label="前台答复" width="152"></el-table-column>
                        <el-table-column prop="reply" label="答复内容" width="167"></el-table-column>
                        <el-table-column prop="auditdirectorname" label="主办民警" width="145"></el-table-column>
                        <el-table-column prop="receivecopname" label="接访民警" width="145"></el-table-column>
                        <el-table-column prop="casenum" label="案件编号" width="150"></el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="150">
                            <template slot-scope="scope">
                                <el-button type="text" @click="editVisit(scope.row.uuid,scope.row.casenum,1)">编辑</el-button>
                                <!-- <el-button type="text" @click="removeVisit(scope.row.casenum)">删除</el-button> -->
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
                        this.loading = true
                        let i = 0
                        let url = 'getCaseVisit.do?method=getVisitList&contain=' + this.searchTxt + '&curPage=' + this.curPage + '&pageNum=' + this.pageNum
                        axios.post(url).then(res => {
                            // console.log(res)
                            res.data.list.forEach(item => {
                                let curtTaskschedule = item.taskschedule
                                let curRemindersum = item.remindersum
                                // 案件进度处理，后台返回的是字符串且没有做位数处理
                                i++
                                item['indexs'] = i + (this.curPage - 1) * this.pageNum
                            })
                            this.tableData = res.data.list
                            this.pageCount = res.data.pageCount
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
                        this.multipleSelection.forEach((item, index) => {
                            arr.push({
                                '序号': index + 1,
                                '处理结果': item.result,
                                '来访人': item.name,
                                '来访时间': item.visittime,
                                '联系电话': item.telnum,
                                '来访事由': item.visitfor,
                                '前台答复': item.receivereply,
                                '答复内容': item.reply,
                                '主办民警': item.receivecop,
                                '案件编号': item.casenum
                            })
                        })
                        let worksheet = XLSX.utils.json_to_sheet(arr)
                        let new_workbook = XLSX.utils.book_new()
                        XLSX.utils.book_append_sheet(new_workbook, worksheet, "来访登记列表")
                        return XLSX.writeFile(new_workbook, new Date().getTime() + '.xlsx')
                    },
                    editVisit(uuid, casenum, type) {
                        if (type == "1") {
                            var url = "${ctx}/getCaseVisit.do?method=toVisitEdit&uuid=" + uuid + '&editType=' + (uuid ? 'update' : 'add')
                            matech.openTab(uuid + "登记", "来访情况登记表" + casenum, url, true, parent);
                        } else {
                            var url = "${ctx}/getCaseVisit.do?method=toVisitEdit&uuid=" + uuid + '&editType=' + (uuid ? 'update' : 'add')
                            matech.openTab(uuid + "登记", "来访情况登记表", url, true, parent);
                        }

                    },
                    removeVisit(row) {
                        console.log('删除来访')
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