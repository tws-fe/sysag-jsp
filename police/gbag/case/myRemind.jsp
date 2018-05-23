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
            </style>
        </head>

        <body>
            <div id="app" v-cloak>
                <el-card class="box-card">
                    <div slot="header">
                        <span>我的提醒</span>
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
                </el-card>
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
                    tableData: [],
                    loading: false
                },
                created () {
                    this.getLists()
                },
                methods: {
                    getLists () {
                        this.loading = true
                        let url = 'getMessage.do?method=getMyRemindList&curPage=1&pageNum=100'
                        axios.post(url).then(res => {
                            console.log(res)
                            this.tableData = res.data.list
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                        })
                    }
                }
            })
        </script>

        </html>