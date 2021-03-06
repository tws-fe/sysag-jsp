<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>民警首页</title>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
            <link rel="stylesheet" href="${pageContext.request.contextPath}/police/gbag/homePage/css/home.css">
            <style>
                [v-cloak] {
                    display: none;
                }

                .pie-btn {
                    padding: 0;
                }

                .pie-container {
                    position: relative;
                }

                .pie-title-btn {
                    position: absolute;
                    top: 10px;
                    z-index: 999;
                    margin-bottom: 10px;
                }

                #chart {
                    transform: translateY(-44px);
                }
            </style>
        </head>

        <body>
            <div id="app" v-cloak>
                <el-row class="data-show">
                    <el-col :span="4">
                        <el-card>
                            <p class="visit-title">当月案件来访</p>
                            <ul class="visit-list">
                               <%--  <li class="visit-list-item">
                                    <p class="vist-list-txt">
                                        <img class="visit-list-image" src="${pageContext.request.contextPath}/police/gbag/homePage/img/icon_todo.png" alt="">
                                        <span>待办案件</span>
                                    </p>
                                    <span class="list-number">3个</span>
                                </li> --%>
                                <li class="visit-list-item visit-list-item-mt20">
                                    <p class="vist-list-txt">
                                        <img class="visit-list-image" src="${pageContext.request.contextPath}/police/gbag/homePage/img/icon_myVisit.png" alt="">
                                        <span>我的来访</span>
                                    </p>
                                    <span class="list-number">{{myLFCount}}个</span>
                                </li>
                                <li class="visit-list-item">
                                    <p class="vist-list-txt">
                                        <img class="visit-list-image" src="${pageContext.request.contextPath}/police/gbag/homePage/img/icon_myReception.png" alt="">
                                        <span>我的接访</span>
                                    </p>
                                    <span class="list-number">{{myJFCount}}个</span>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                    <el-col :span="14" class="visit-main">
                        <el-card>
                            <div class="visit-main-title">
                                <span>案件管理流程-民警</span>

                                <p class="visit-main-icon-list">
                                    <span class="visit-main-icon-block visit-main-icon-blue"></span>
                                    <span class="visit-main-icon-item">民警</span>
                                    <span class="visit-main-icon-block visit-main-icon-orange"></span>
                                    <span class="visit-main-icon-item">案管</span>
                                    <span class="visit-main-icon-block visit-main-icon-yellow"></span>
                                    <span class="visit-main-icon-item">案审大队</span>
                                </p>
                            </div>
                            <img class="visit-main-image" src="${pageContext.request.contextPath}/police/gbag/homePage/img/mj.png" alt="" width="100%">
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card class="pie-container">
                            <p class="pie-title-btn">
                                <el-button type="text" class="pie-btn" @click="changePie(1)">当月案件统计</el-button>
                                <el-button type="text" class="pie-btn" @click="changePie(2)">当月任务统计</el-button>
                                </p2>
                                <div id="chart"></div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card v-loading="loading" class="follow_card">
                    <p class="follow_card_title">我的关注</p>
                    <el-table :data="tableData" stripe border style="width: 100%">
                        <!-- <el-table-column type="selection" width="58" align="center"></el-table-column> -->
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
                        <el-table-column prop="casename" label="案件名称" width="152" align="center"></el-table-column>
                        <el-table-column prop="casetype" label="案件类型" width="88" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="casenaturename" label="案件性质" width="156" align="center"></el-table-column>
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
                    <el-pagination v-if="pageCount" @current-change="handleCurrentChange" :page-count="pageCount" :pager-count="5" prev-text="上一页"
                        next-text="下一页" background layout="prev, pager, next">
                    </el-pagination>
                </el-card>
            </div>
        </body>
        <script src="tws/js/vue.js"></script>
        <script src="tws/js/axios.min.js"></script>
        <!-- 引入组件库 -->
        <script src="tws/js/element-ui.index.js"></script>
        <script src="tws/js/echarts.common.min.js"></script>
        <script>
            new Vue({
                el: '#app',
                data: {
                    tableData: null,
                    loading: true,
                    curPage: 1,
                    pageNum: 10,
                    pageCount: 0,
                    pieIndex: 1,
                    myChart: null,
                    myJFCount:null,
                    myLFCount:null
                },
                created() {
                    this.getLists()
                    this.getLeftdata()
                },
                mounted() {
                    this.myChart = echarts.init(document.getElementById('chart'))
                    this.initData()
                },
                methods: {
                    initData() {
                        let option = {}
                        if (this.pieIndex === 1) {
                            option =
                                {
                                    title: {
                                        text: '{a|45}{b| -件}\n{c|当月案件}',
                                        x: 'center',
                                        y: 'center',
                                        textStyle: {
                                            rich: {
                                                a: {
                                                    fontSize: 40,
                                                    fontWeight: 600,
                                                    color: '#888'
                                                },
                                                b: {
                                                    fontSize: 16,
                                                },
                                                c: {
                                                    fontSize: 14,
                                                    lineHeight: 20
                                                },
                                            }
                                        }
                                    },
                                    color: ['#5694c2', '#fecb45', '#f15d5d'],
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: "{b} : {c} "
                                    },
                                    legend: {
                                        left: 'center',
                                        bottom: 0,
                                        data: ['未完成', '已完成']
                                    },
                                    series: [
                                        {
                                            name: '当月案件统计',
                                            type: 'pie',
                                            radius: '55%',
                                            // center: ['50%', '60%'],
                                            radius: ['40%', '70%'],
                                            data: [
                                                {
                                                    value: 35, name: '未完成',
                                                    label: {
                                                        normal: {
                                                            formatter: '{c}'
                                                        }
                                                    }
                                                },
                                                {
                                                    value: 10, name: '已完成', label: {
                                                        normal: {
                                                            formatter: '{c}'
                                                        }
                                                    }
                                                }
                                            ],
                                        }
                                    ]
                                }

                        } else {
                            option =
                                {
                                    title: {
                                        text: '{a|64}{b| -件}\n{c|当月任务}',
                                        x: 'center',
                                        y: 'center',
                                        textStyle: {
                                            rich: {
                                                a: {
                                                    fontSize: 40,
                                                    fontWeight: 600,
                                                    color: '#888'
                                                },
                                                b: {
                                                    fontSize: 16,
                                                },
                                                c: {
                                                    fontSize: 14,
                                                    lineHeight: 20
                                                },
                                            }
                                        }
                                    },
                                    color: ['#5694c2', '#fecb45', '#f15d5d'],
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: "{b} : {c} "
                                    },
                                    legend: {
                                        left: 'center',
                                        bottom: 0,
                                        data: ['普通任务', '案审任务']
                                    },
                                    series: [
                                        {
                                            name: '当月任务统计',
                                            type: 'pie',
                                            radius: '55%',
                                            // center: ['50%', '60%'],
                                            radius: ['40%', '70%'],
                                            data: [
                                                {
                                                    value: 33, name: '普通任务',
                                                    label: {
                                                        normal: {
                                                            formatter: '{c}'
                                                        }
                                                    }
                                                },
                                                {
                                                    value: 31, name: '案审任务', label: {
                                                        normal: {
                                                            formatter: '{c}'
                                                        }
                                                    }
                                                }
                                            ],
                                        }
                                    ]
                                }


                        }
                        console.log(option, this.pieIndex)
                        this.myChart.setOption(option)
                    },
                    changePie(index) {
                        this.pieIndex = index
                        this.initData()
                    },
                    getLists() {
                        this.loading = true
                        let url = 'getCase.do?method=getMyFollow&curPage=' + this.curPage + '&pageNum=' + this.pageNum
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

                    handleCurrentChange(val) {
                        console.log(`当前页: ${val}`);
                        this.curPage = val
                        this.getLists()
                    },
                    toDetail(casenumber) {
                        var url = "${ctx}/getCase.do?method=toSeeCaseInfo&casenumber=" + casenumber;
                        matech.openTab(casenumber, "案件详情" + casenumber, url, true, parent);
                    },
                    getLeftdata(){
                        let url = 'getCaseVisit.do?method=myVisitStatistics&visitType=0'
                        let url1 = 'getCaseVisit.do?method=myVisitStatistics&visitType=1'
                        axios.get(url).then(res => {
                            this.myJFCount = res.data.list[0].myJFCount
                            console.log(res)
                        }).catch(err => {
                        
                        })
                        axios.get(url1).then(res => {
                            this.myLFCount = res.data.list[0].myJFCount
                            console.log(res)
                        }).catch(err => {
                        
                        })
                    }
                }
            })

        </script>

        </html>