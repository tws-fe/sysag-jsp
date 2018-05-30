<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>我的提醒</title>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
            <style>
                .el-card__body {
                    padding-top: 10px;
                }

                .el-table__header thead {
                    display: none;
                }

                .index-bg {
                    display: inline-block;
                    width: 26px;
                    height: 18px;
                    /* background-image: url(../img/indexbg.png); */
                    background-image: url(${pageContext.request.contextPath}/police/gbag/img/indexbg.png);
                    color: #fff;
                    font-size: 12px;
                    margin-right: 10px;
                }

                .index-bg-txt {
                    display: inline-block;
                    font-size: 12px;
                    padding-left: 2px;
                    transform: translateY(-3px);
                }

                .el-tag {
                    margin-left: 10px;
                }
            </style>
            <style>
                [v-cloak] {
                    display: none;
                }
                .icon {
                width: 1em;
                height: 1em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }
            </style>
        </head>

        <body>
            <div id="app" v-cloak>
                <el-card class="box-card">
                    <div slot="header">
                        <span>我的提醒</span>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                        <el-button plain @click="sreach">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-AG_sousuo"></use>
                            </svg>
                            &nbsp;&nbsp;查询
                        </el-button>
                    </div>
                    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                        <el-table-column min-width="180" align="left">
                            <template slot-scope="scope">
                                <span class="index-bg">
                                    <i class="index-bg-txt">{{(scope.$index+1)
                                        <10? ( '0'+(scope.$index+1)):(scope.$index+1)}}</i>
                                </span>
                                <span>提醒内容：{{scope.row.content}}</span>
                                <el-tag :type="scope.row.createmodal=='案件催交'?'warning':'danger'">{{scope.row.createmodal}}</el-tag>
                                <!-- <el-tag type="danger">催办提醒</el-tag> -->
                            </template>
                        </el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <span>创建人：{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="280">
                            <template slot-scope="scope">
                                <span>创建时间：{{scope.row.createdatetime}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background :page-size="5" @current-change="handleCurrentChange" :page-count="pageCount"
                        prev-text="上一页" next-text="下一页" layout="prev, pager, next">
                    </el-pagination </div>
                </el-card>
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
                    tableData: [],
                    loading: false,
                    curPage: 1,
                    pageCount: 0,
                    pageNum: 10,
                    pickerOptions2: {
                        shortcuts: [{
                            text: '最近一周',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '当月',
                            onClick(picker) {
                            const curMonth = new Date().getMonth();
                            let start = new Date();
                            start.setDate(1)
                            let end = new Date();
                            end.setMonth(curMonth + 1)
                            end.setDate(0)
                            picker.$emit('pick', [start, end]);
                            }
                        }]
                    },
                    dateRange: '',
                    startDate: '',
                    endDate: '' 
                },
                created () {
                    const curMonth = new Date().getMonth();
                    let start = new Date();
                    start.setDate(1)
                    let end = new Date();
                    end.setMonth(curMonth + 1)
                    end.setDate(0)
                    this.startDate = formartTime(start)
                    this.endDate = formartTime(end)
                    this.getLists()
                },
                methods: {
                    getLists () {
                        this.loading = true
                        let url = 'getMessage.do?method=getMyRemindList&curPage='+this.curPage+'&pageNum='+this.pageNum+'&startDate='+this.startDate+'&endDate='+this.endDate
                        axios.post(url).then(res => {
                            let data = res.data
                            // let arr = []
                            // for (let index = 0; index < 10; index++) {
                            //     arr.push({
                            //         content: '提醒内容' + index,
                            //         name: '创建人' + index,
                            //         createdatetime:  new Date().toLocaleString(),
                            //         createmodal: Math.random() > 0.5 ? '案件催交': 'xxx'
                            //     })                               
                            // }
                            // this.tableData = arr
                            // this.pageCount = 10

                            this.tableData = data.list
                            this.pageCount = data.pageCount
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                        })
                    },
                    handleCurrentChange(page) {
                        this.curPage = page
                        this.getLists()
                    },
                    sreach() {
                        if (!this.dateRange.length) {
                            this.$message({
                                type: 'error',
                                message: '请选择日期',
                                duration: 1000
                            })
                            return
                        }
                        this.startDate = formartTime(this.dateRange[0])
                        this.endDate = formartTime(this.dateRange[1])
                        this.getLists()
                    }
                }
            })

            function formartTime(date) {
                let dateObj = date ? date : new Date()
                let d = dateObj.toLocaleString('zh', {hour12:false})
                let arr = []
                d.split(' ')[0].split('/').forEach(item => {
                    let curItem = parseInt(item)
                    arr.push(curItem > 10 ? item : ('0' + item))
                })
                return arr.join('-')+' '+d.split(' ')[1]
            }
        </script>

        </html>