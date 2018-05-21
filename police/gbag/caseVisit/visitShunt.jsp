<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>来访分流</title>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <style>
                .visit-container {
                    width: 1280px;
                    margin: 20px auto 0;
                }

                .el-tabs {
                    background-color: #f5f5f5;
                    border-radius: 20px;
                }

                .el-tabs__header,
                .el-tabs__nav-wrap {
                    border-top-right-radius: 20px;
                    border-top-left-radius: 20px;
                }

                .el-tabs__nav-scroll {
                    background-color: #2983b3;
                }

                .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
                    background-color: #2983b3;
                    border: 0;
                    color: #fff;
                }

                .visit-section {
                    border: 0;
                    border-top: 1px solid #ccc;
                }

                .visit-section>legend {
                    padding: 10px 20px;
                    font-size: 14px;
                }

                .el-tabs__item {
                    font-size: 16px;
                }

                .el-table {
                    margin: 0 auto;
                }

                .visit-submit {
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                }

                .el-button+.el-button {
                    margin-left: 30px;
                }

                /* .el-input input, .el-textarea textarea{
          border-color: #2983b3;
        } */

                /* table没有数据 */

                .el-table__empty-block {
                    height: 0;
                }

                /* ext样式覆盖，优化调整 */

                .operate-radio-group {
                    transform: translate(-86px, 6px);
                }

                .caseno-selection {
                    transform: translateX(-36px);
                }

                .el-autocomplete-suggestion li .name {
                    background-color: #fff;
                    color: #606266;
                }

                .el-autocomplete-suggestion li .name:hover {
                    background-color: #f5f7fa;
                }

                .sex-radio-group {
                    transform: translate(-90px, 6px);
                }

                .result-radio-group {
                    transform: translate(-36px, 6px);
                }

                .datetime-picker .el-input__inner {
                    padding-left: 30px !important;
                }
                /* dialog */
                .el-dialog__header {
                    background-color: #2983b3;
                }
                .el-dialog__title {
                    color: #fff;
                }
                .dialog-footer {
                    display: flex;
                    justify-content: center;
                }
            </style>
        </head>

        <body>
            <div id="app" class="visit-container">
                <el-tabs type="border-card" v-loading.fullscreen.lock="loading">
                    <el-tab-pane label="来访情况登记表">
                        <el-form size="mini" :model="ruleForm" ref="ruleForm" label-width="100px">
                            <!-- 案件信息 -->
                            <fieldset class="visit-section">
                                <legend>案件信息</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="案件编号" prop="casenum">
                                            <el-input v-model="ruleForm.casenum"  disabled></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-form-item label="案情简介" prop="caseinfo">
                                    <el-input type="textarea" autosize ref="caseinfo" v-model="ruleForm.caseinfo" disabled></el-input>
                                </el-form-item>
                            </fieldset>
                            <!-- 来访人员信息 -->
                            <fieldset class="visit-section">
                                <legend>来访人员信息</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="姓名" prop="name">
                                            <el-input v-model="ruleForm.name" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="身份证号码" prop="idcardnum">
                                            <el-input v-model="ruleForm.idcardnum" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item prop="visittime" label="来访时间">
                                            <!-- <el-date-picker type="datetime" placeholder="选择时间" v-model="ruleForm.visittime" style="width: 100%;" default-time="12:00:00"
                                                class="datetime-picker"></el-date-picker> -->
                                                <el-input v-model="ruleForm.visittime" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="性别" prop="sex">
                                            <el-radio-group v-model="ruleForm.sex" class="sex-radio-group" disabled>
                                                <el-radio label="男"></el-radio>
                                                <el-radio label="女"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="联系电话" prop="telnum">
                                            <el-input v-model="ruleForm.telnum" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="14">
                                        <el-form-item label="工作单位">
                                            <el-input v-model="ruleForm.workunit" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="14">
                                        <el-form-item label="居住地址">
                                            <el-input v-model="ruleForm.address" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="来访事由" prop="visitfor">
                                            <el-input type="textarea" autosize v-model="ruleForm.visitfor" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </fieldset>
                            <!-- 历史来访信息 -->
                            <fieldset class="visit-section" v-if="radio==1">
                                <legend>历史来访信息</legend>
                                <el-table stripe border size="small" :data="tableData" style="width: 100%">
                                    <el-table-column prop="name" label="来访人姓名" width="180" align="center"></el-table-column>
                                    <el-table-column prop="telnum" label="联系电话" width="180" align="center"></el-table-column>
                                    <el-table-column prop="visitfor" label="来访事由" width="180" align="center"></el-table-column>
                                    <el-table-column prop="visittime" label="来访时间" width="180" align="center"></el-table-column>
                                    <el-table-column prop="reply" label="答复内容" align="center"></el-table-column>
                                </el-table>
                            </fieldset>
                            <!-- 接访信息 -->
                            <fieldset class="visit-section">
                                <legend>接访信息</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="接访民警">
                                            <el-input v-model="ruleForm.receivecop" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="主办民警">
                                            <el-select v-model="loginid" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.loginid"
                                                    :label="item.name"
                                                    :value="item.loginid">
                                                </el-option>
                                            </el-select>
                                            <!-- <el-input v-model="ruleForm.auditdirectorname"></el-input> -->
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="前台答复">
                                            <el-input type="textarea" autosize v-model="ruleForm.receivereply" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="答复内容">
                                            <el-input type="textarea" autosize v-model="ruleForm.reply" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="接访结果" prop="result">
                                            <el-radio-group v-model="ruleForm.result" class="result-radio-group" disabled>
                                                <el-radio label="需跟进"></el-radio>
                                                <el-radio label="已解决"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </fieldset>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div class="visit-submit">
                    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
                    <el-button type="warning" @click="closeTab">关 闭</el-button>
                </div>
            </div>
        </body>

        <script src="tws/js/vue.js"></script>
        <script src="tws/js/axios.min.js"></script>
        <!-- 引入组件库 -->
        <script src="tws/js/element-ui.index.js"></script>

        <script>

            let uuid = '${uuid}'

            new Vue({
                el: '#app',
                data: {
                    dialogVisible: false,
                    uuid,
                    showMsgBtn: false,
                    radio: '1',
                    options: [],
                    loading: true,
                    tableData: null,
                    loginid: '',
                    ruleForm: {
                        casenum: '', //案件编号
                        caseinfo: '', //案情简介
                        name: '',
                        idcardnum: '', //身份证
                        visittime: '',
                        sex: '', //性别
                        telnum: '',
                        workunit: '',
                        address: '',
                        visitfor: '', //来访事由
                        receivecop: '', //接访民警
                        auditdirectorname: '', //主办民警
                        receivereply: '', //前台答复
                        reply: '', //答复内容
                        result: '' // 访问结果
                    },
                },
                created() {
                    this.getData()
                    this.getAuditdirectorname()
                },
                methods: {
                    getAuditdirectorname () {
                        let url = 'userInfo.do?method=getUserList'
                        axios.post(url).then(res => {
                            this.options = res.data
                        })
                    },
                    getData() {
                        this.loading = true
                        let url = 'getCaseVisit.do?method=getVisitInfo&uuid=' + uuid
                        axios.post(url).then(res => {
                            this.ruleForm = res.data.caseVisit
                            this.tableData = res.data.list
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                        })
                    },
                    handleSelect(item) {
                        console.log(item);
                        this.ruleForm.casenum = item.value
                    },
                    submitForm(formName) {
                       if (!this.loginid) {
                           this.$message({
                               type: 'error',
                               message: '请选择主办民警'
                           })
                           return
                       }
                       let url = 'getCaseVisit.do?method=saveThisVisit'
                       axios.post(url, {
                            uuid,
                            loginid: this.loginid 
                       }).then(res => {
                           this.$message({
                               type : 'success',
                               message: '保存成功！'
                           })
                       })
                    },
                    closeTab() {
                        matech.closeTab(parent);
                    }
                }
            })
        </script>

        </html>