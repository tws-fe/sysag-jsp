<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>案件详情</title>
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <style>
                    [v-cloak] {
                      display: none;
                    }
            </style>
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

                .el-table__empty-block {
                    height: 0;
                }

            </style>
        </head>

        <body>
            <div id="app" v-cloak class="visit-container">
                <el-tabs type="border-card">
                    <el-tab-pane label="案件信息详情">
                        <el-form size="mini" label-width="108px">
                            <!-- 基本情况 -->
                            <fieldset class="visit-section">
                                <legend>基本情况</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="案件编号">
                                            <el-input v-model="baseInfo.casenumber" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="案件性质">
                                            <el-input v-model="baseInfo.casenature" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="案件类别">
                                            <el-input v-model="baseInfo.casetype" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="案件状态">
                                            <el-input v-model="baseInfo.state" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="案件名称">
                                            <el-input v-model="baseInfo.casename" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="简要案情">
                                    <el-input type="textarea" ref="caseinfo" v-model="baseInfo.casedetails" attr-disabled></el-input>
                                </el-form-item>
                                <el-row>
                                    <el-col :span="14">
                                        <el-form-item label="详细地址">
                                            <el-input v-model="baseInfo.districtaddress" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="时机">
                                            <el-input v-model="baseInfo.opportunity" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="处所">
                                            <el-input v-model="baseInfo.place" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="部位">
                                            <el-input v-model="baseInfo.position" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="作案工具">
                                            <el-input v-model="baseInfo.toolscrime" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="手段特点">
                                            <el-input v-model="baseInfo.means" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="对象">
                                            <el-input v-model="baseInfo.target" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="作案人数">
                                            <el-input v-model="baseInfo.crimesnumber" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="死亡人数">
                                            <el-input v-model="baseInfo.deathtoll" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="受伤人数">
                                            <el-input v-model="baseInfo.injuriesnumber" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="损失折款">
                                            <el-input v-model="baseInfo.losscash" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="涉案价值">
                                            <el-input v-model="baseInfo.valueinvolved" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="挽回损失价值">
                                            <el-input v-model="baseInfo.salvagevalue" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </fieldset>
                            <!-- 报案人-受害人信息 -->
                            <fieldset class="visit-section">
                                <legend>报案人-受害人信息</legend>
                                <el-table stripe border size="small" :data="victims" style="width: 100%">
                                    <el-table-column prop="victimname" label="姓名" width="180" align="center"></el-table-column>
                                    <el-table-column prop="victimidcard" label="身份证" width="180" align="center"></el-table-column>
                                    <el-table-column prop="victimphone" label="电话" width="180" align="center"></el-table-column>
                                    <el-table-column prop="victimunit" label="工作单位" width="180" align="center"></el-table-column>
                                    <el-table-column prop="ctype" label="人员类型" align="center"></el-table-column>
                                </el-table>
                            </fieldset>
                            <!-- 证人信息 -->
                            <!-- <fieldset class="visit-section">
                    <legend>证人信息</legend>
                    <el-table stripe border size="small" :data="tableData" style="width: 100%">
                        <el-table-column prop="victimname" label="姓名" width="180" align="center"></el-table-column>
                        <el-table-column prop="victimidcard" label="身份证" width="180" align="center"></el-table-column>
                        <el-table-column prop="visitfor" label="笔录时间" width="180" align="center"></el-table-column>
                        <el-table-column prop="visittime" label="移交" width="180" align="center"></el-table-column>
                        <el-table-column prop="reply" label="备注" align="center"></el-table-column>
                    </el-table>
                </fieldset> -->
                            <!-- 嫌疑人信息 -->
                            <fieldset class="visit-section">
                                <legend>嫌疑人信息 </legend>
                                <el-table stripe border size="small" :data="suspects" style="width: 100%">
                                    <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
                                    <el-table-column prop="idcard" label="身份证" width="180" align="center"></el-table-column>
                                    <el-table-column prop="sex" label="性别" width="180" align="center"></el-table-column>
                                    <el-table-column prop="birthdate" label="出生日期" width="180" align="center"></el-table-column>
                                    <el-table-column prop="censusregiser" label="户籍所在地" align="center"></el-table-column>
                                </el-table>
                            </fieldset>
                            <!-- 其他信息 -->
                            <!-- <fieldset class="visit-section">
                    <legend>其他信息 </legend>
                    <el-table stripe border size="small" :data="tableData" style="width: 100%">
                        <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
                        <el-table-column prop="telnum" label="规格" width="180" align="center"></el-table-column>
                        <el-table-column prop="visitfor" label="数量 " width="180" align="center"></el-table-column>
                        <el-table-column prop="visittime" label="移交" width="180" align="center"></el-table-column>
                        <el-table-column prop="reply" label="备注" align="center"></el-table-column>
                    </el-table>
                </fieldset> -->
                            <!-- 办案任务 -->
                            <fieldset class="visit-section">
                                <legend>办案任务 </legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="主办民警">
                                            <el-input v-model="baseInfo._user_auditdirector" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="协办民警">
                                            <el-input v-model="baseInfo.assisting" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-table stripe border size="small" :data="task" style="width: 100%">
                                    <el-table-column prop="taskcontent" label="任务内容" width="300" align="center"></el-table-column>
                                    <el-table-column prop="taskresult" label="处理结果" width="400" align="center"></el-table-column>
                                    <el-table-column prop="handleperson" label="办理人 " width="180" align="center"></el-table-column>
                                    <el-table-column prop="handletime" label="办理时间" align="center"></el-table-column>
                                    <el-table-column prop="ispaper" label="是否有材料" align="center"></el-table-column>
                                </el-table>
                            </fieldset>
                            <!-- 办案阶段时间 -->
                            <fieldset class="visit-section">
                                <legend>办案阶段时间</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="报警时间">
                                            <el-input v-model="baseInfo.bjsj" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="受理时间">
                                            <el-input v-model="baseInfo.slsj" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="破案时间">
                                            <el-input v-model="baseInfo.detectdate" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="结案时间">
                                            <el-input v-model="baseInfo.casedate" attr-disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </fieldset>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div class="visit-submit">
                    <el-button type="warning" @click="resetForm('baseInfo')">关闭</el-button>
                </div>

            </div>
        </body>
        <script src="tws/js/vue.js"></script>
        <script src="tws/js/axios.min.js"></script>
        <!-- 引入组件库 -->
        <script src="tws/js/element-ui.index.js"></script>
        <script>
            let uuid = '${uuid}'
            // console.log(uuid)
            new Vue({
                el: '#app',
                data: {
                    baseInfo: null,
                    task: null,
                    victims: null,
                    suspects: null
                },
                created() {
                    this.getData()
                },
                methods: {
                    getData() {
                        axios.post('getCase.do?method=getCaseInfo&casenumber=' + uuid).then(res => {
                            // console.log(res)
                            let data = res.data
                            this.baseInfo = data.caseBean
                            data.caseTasks.forEach(item => {
                                let iP = item.ispaper
                                if(iP == 0){
                                    item.ispaper = '无'
                                }else if(iP == 1){
                                    item.ispaper = '有'
                                }else{
                                    item.ispaper = ''
                                }
                            })
                            this.task = data.caseTasks
                            this.victims = data.caseVictims
                            this.suspects = data.caseSuspects
                        })
                    }
                },
                watch: {

                }
            })
        </script>

        </html>