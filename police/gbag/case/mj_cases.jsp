<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <html>

        <head>
            <title>案件信息</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <!-- 引入样式 -->
            <link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
            <style>
                .case_nav {
                    display: flex;
                    padding-bottom: 4px;
                }

                .case_nav_item {
                    padding-left: 20px;
                }

                .case_nave_search {
                    display: flex;
                    align-items: center;
                }

                .case_nave_search>span {
                    white-space: nowrap;
                }

                .sup_bac1 sup {
                    background: #ff4646
                }

                .sup_bac2 sup {
                    background: #ffaa46;
                }

                .sup_bac3 sup {
                    background: #1b85ca;
                }

                .el-dialog__title {
                    color: white;
                }

                .el-dialog__header {
                    background: #2981b4;
                }

                .conserve_btn {
                    width: 125px;
                    height: 44px;
                    border-radius: 5px/4px;
                    background-color: #6392c8;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, .75), inset 0 1px rgba(255, 255, 255, .4), inset 0 0 1px rgba(255, 255, 255, .2);
                    border: solid 1px #2890b7;
                    background-image: linear-gradient(to top, #1c9ccb, #3276c3);
                    font-size: 18px;
                    cursor: pointer;
                    color: white;
                    margin-right: 1vw;
                }

                .close_btn {
                    width: 125px;
                    height: 44px;
                    border-radius: 5px/4px;
                    background-color: #ff7135;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, .75), inset 0 1px rgba(255, 255, 255, .4), inset 0 0 1px rgba(255, 255, 255, .2);
                    border: solid 1px #dc882d;
                    background-image: linear-gradient(to top, #ff9267, #fdad74 53%, #fdb075 58%, #fbc57f);
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
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
        <style>
            .el-table td,
            .el-table th.is-leaf {
                /* border: 1px solid #e3e3e3; */
                text-align: center;
            }

            .el-table td {
                padding: 0;
            }

            .el-table th {
                background-color: #f7f8f9 !important;
                color: #5e5e5e;
                padding: 10px 0;
            }

            .el-table th>.cell {
                font-size: 16px !important;
            }

            .paging {
                line-height: 32px;
                margin-top: 6px;
            }

            .el-pagination {
                float: right;
                margin-right: 40px;
            }

            .demonstration {
                float: right;
            }

            .addimg {
                position: absolute;
                top: -45px;
                left: 210px;
                z-index: 10;
                cursor: pointer;
            }

            .task {
                position: relative;
            }

            .el-tabs__content {
                overflow: inherit;
            }

            .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
            .el-table__body tr.current-row>td,
            .el-table__body tr.hover-row.current-row>td,
            .el-table__body tr.hover-row.el-table__row--striped.current-row>td,
            .el-table__body tr.hover-row.el-table__row--striped>td {
                background-color: #FBE3CB
            }

            .el-table__body tr.hover-row>td {
                background-color: #fdf2e7 !important;
            }

            /* .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #F2F9FF;
    } */

            [v-cloak] {
                display: none;
            }

            .save {
                position: absolute;
                top: -50px;
                left: 214px;
                z-index: 10;
                cursor: pointer;
            }

            /* 分页优化 */

            .el-pagination.is-background .btn-prev,
            .el-pagination.is-background .btn-next {
                min-width: 68px;
            }

            .el-pagination.is-background .el-pager li {
                margin: 0 1px;
            }

            /* 无数据 */

            .el-table__empty-block {
                height: 0;
            }

            .case_nave_search {
                display: flex;
                align-items: center;
            }

            .case_nave_search>span {
                white-space: nowrap;
            }
        </style>

        <body>
            <div id="caseApp" v-cloak>
                <!--案件-->
                <div class="case">
                    <el-row class="case_nav">
                        <el-col :span="3">
                            <div class="case_nav_item case_nave_search">
                                <span>交案状态：</span>
                                <el-select v-model="caseStatus" placeholder="请选择" size="small">
                                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="case_nav_item case_nave_search">
                                <span>呈案状态：</span>
                                <el-select v-model="takeCaseStatus" placeholder="请选择" size="small">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="case_nav_item case_nave_search">
                                <span>搜索内容：</span>
                                <el-input v-model="selectValue" placeholder="案件编号或案件名称" size="small"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="case_nav_item">
                                <el-button plain @click="select" size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_sousuo"></use>
                                    </svg>
                                    &nbsp;&nbsp;查询</el-button>
                                <el-button plain @click="refurbish" size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_shuaxin"></use>
                                    </svg>
                                    &nbsp;&nbsp;刷新</el-button>
                                <!-- 05.25 已处理 -->
                                <el-button plain @click="downloadSheet" size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_daochu1"></use>
                                    </svg>
                                    &nbsp;&nbsp;导出
                                </el-button>
                                <!-- <el-button @click="postCase" plain size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_jiaoanqueren"></use>
                                    </svg>
                                    &nbsp;&nbsp;材料提交</el-button> -->
                                <el-button plain v-if="listShow==true" @click="listDown" size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_yincangrenwu"></use>
                                    </svg>
                                    &nbsp;&nbsp;隐藏任务</el-button>
                                <el-button plain v-else @click="listUp" size="small">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_xianshirenwu"></use>
                                    </svg>
                                    &nbsp;&nbsp;显示任务</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table size="mini"  ref="singleTable" :data="tableData3.list" tooltip-effect="dark"
                        style="width: 100%" border stripe @selection-change="handleSelectionChange" highlight-current-row @current-change="rowClick">
                        <el-table-column type="selection" width="58"></el-table-column>
                        <el-table-column fixed prop="indexs" label="序号" width="55"></el-table-column>
                        <el-table-column fixed label="案件进度" width="118">
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.taskschedule"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column fixed label="催办次数" width="85">
                            <template slot-scope="scope">
                                <el-badge :value="scope.row.remindersum" :class="scope.row.sup_bac"></el-badge>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="casenumber" label="案件编号" width="180"></el-table-column>
                        <el-table-column prop="casename" label="案件名称" width="152"></el-table-column>
                        <el-table-column prop="_userNAME_auditdirector" label="主办民警" width="145"></el-table-column>
                        <el-table-column prop="casetype" label="案件类型" width="88" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="casenaturename" label="案件性质" width="156"></el-table-column>
                        <el-table-column prop="statenames" label="案件状态" width="88px"></el-table-column>
                        <el-table-column prop="ishandovername" label="是否交案" width="180px"></el-table-column>
                        <el-table-column prop="attendingState" label="办理状态" width="88"></el-table-column>
                        <el-table-column prop="bjsj" label="报警时间" width="200"></el-table-column>
                        <el-table-column fixed="right" label="操.作" min-width="280">
                            <template slot-scope="scope">
                                <el-button type="text" @click="toDetail(scope.row.casenumber)">查看详情</el-button>
                                <el-button type="text" @click="downWord(scope.row.uuid)">主办责任人指定书</el-button>
                                <el-button type="text" @click="follow(scope.row)">关注</el-button>
                                <!-- <el-button type="text">催办</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block paging">
                        <el-pagination background :page-size="5" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2"
                            layout="prev, pager, next" :total="this.tableData3.pageCount*5" prev-text="上一页" next-text="下一页">
                        </el-pagination </div>
                    </div>

                    <!--任务-->
                    <div class="task" style="margin-top:36px" v-if="listShow==true">

                        <%--任务类别--%>
                            <div>
                                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

                                    <el-tab-pane class="nomal_task" label="侦查任务" name="first">
                                        <!-- <img @click="addTask" class="addimg" src="${pageContext.request.contextPath}/tws/css/img/ag_add.png" />
                                        <el-button class="save" plain @click="onSubmit">
                                            &nbsp;&nbsp;保存</el-button> -->

                                        <div class="save">
                                            <el-button type="primary" plain @click="addTask" size="mini">
                                                <svg class="icon-ag" aria-hidden="true">
                                                    <use xlink:href="#icon-AG_xinzeng"></use>
                                                </svg>&nbsp;&nbsp; 新增
                                            </el-button>
                                            <el-button type="primary" plain @click="onSubmit('list1')" size="mini">
                                                <svg class="icon-ag" aria-hidden="true">
                                                    <use xlink:href="#icon-AG_tubiaocu-"></use>
                                                </svg>&nbsp;&nbsp; 保存
                                            </el-button>
                                            <el-button type="primary" plain size="mini" @click="postCase">
                                                <svg class="icon" aria-hidden="true">
                                                    <use xlink:href="#icon-AG_jiaoanqueren"></use>
                                                </svg>
                                                &nbsp;&nbsp;材料提交
                                            </el-button>
                                        </div>

                                        <el-table size="small" ref="multipleTable1" :data="tableData4.list1" tooltip-effect="dark" style="width: 100%" border stripe @selection-change="taskSelectionChange"
                                            v-loading="tableLoading">
                                            <el-table-column type="selection" width="58" fixed="left">

                                            </el-table-column>
                                            <el-table-column label="序号" type="index" width="55" fixed="left"></el-table-column>
                                            <el-table-column label="任务状态" width="118" fixed="left">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.row.state == 0" type="text">执行中</span>
                                                    <span v-else-if="scope.row.state == 1" type="text">已完成</span>
                                                    <span v-else-if="scope.row.state == 2" type="text">案管已确认</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="催办次数" width="85" fixed="left">
                                                <template slot-scope="scope">
                                                    <el-badge :value="scope.row.icount" :class="scope.row.sup_bac"></el-badge>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="交案状态" width="118" fixed="left">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.row.state1 == 0" type="text">无材料</span>
                                                    <span v-else-if="scope.row.state1 == 1" type="text">未移交材料</span>
                                                    <span v-else-if="scope.row.state1 == 2" type="text">已移交材料</span>
                                                    <span v-else-if="scope.row.state1 == 3" type="text">案管已确认</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="oper_user_id_" label="指派人" width="180" fixed="left"></el-table-column>
                                            <el-table-column prop="oper_time_" label="指派时间" width="180"></el-table-column>
                                            <el-table-column prop="taskcontent" label="任务内容" width="272" show-overflow-tooltip>
                                                <template slot-scope="scope">
                                                    <span v-if="!scope.row.isAdd">{{scope.row.taskcontent}}</span>
                                                    <el-autocomplete v-else popper-class="my-autocomplete" v-model="scope.row.taskcontent" :fetch-suggestions="querySearch" placeholder="请输入内容"
                                                        @select="handleSelect" @focus="handleblur(scope)" style="width:250px"
                                                        clearable>
                                                        <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
                                                        </i>
                                                        <template slot-scope="{item}">
                                                            <span class="">{{ item.VALUE }}</span>
                                                        </template>
                                                    </el-autocomplete>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="taskresult" label="处理结果" width="200">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.taskresult" size="small"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="ispaper" label="是否有材料" width="167">
                                                <template slot-scope="scope">
                                                    <el-radio-group v-model="scope.row.ispaper" @change="newTaskChange(scope.row)">
                                                        <el-radio :label="'0'">无</el-radio>
                                                        <el-radio :label="'1'">有</el-radio>
                                                    </el-radio-group>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="handleperson" label="办理人" width="184"></el-table-column>
                                            <el-table-column prop="update_time_" label="办理时间" width="184"></el-table-column>
                                            <el-table-column label="操作" min-width="280" width="200" fixed="right">
                                                <template slot-scope="scope">
                                                    <p v-show="!scope.row.isAdd">
                                                        <el-button v-show="scope.row.oper_user_id_==scope.row.handleperson" type="text" @click="del(scope.row.uuid)">删除</el-button>
                                                        <el-button type="text" @click="look(scope.row.uuid,true)">查看</el-button>
                                                        <el-button type="text" v-show="scope.row.state == 1 && scope.row.state1 == 1" @click="postCase(scope.row.uuid)">材料提交</el-button>
                                                        <!-- <el-button v-show="scope.row.state == 0 || scope.row.state == 1" type="text" @click="editor(scope.row.uuid,false)">编辑</el-button> -->
                                                        <!-- <el-button type="text">催办</el-button> -->
                                                    </p>
                                                    <p v-show="scope.row.isAdd">
                                                        <el-button type="text" @click="delNewTask(scope.$index)">删除</el-button>
                                                    </p>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-tab-pane>
                                    <el-tab-pane label="整改提纲" name="second">
                                            <div class="save">
                                                    <!-- <el-button type="primary" plain @click="addTask" size="small">
                                                        <svg class="icon-ag" aria-hidden="true">
                                                            <use xlink:href="#icon-AG_xinzeng"></use>
                                                        </svg>&nbsp;&nbsp; 新增
                                                    </el-button> -->
                                                    <el-button type="primary" plain @click="onSubmit('list2')" size="mini">
                                                        <svg class="icon-ag" aria-hidden="true">
                                                            <use xlink:href="#icon-AG_tubiaocu-"></use>
                                                        </svg>&nbsp;&nbsp; 保存
                                                    </el-button>
                                                    <el-button type="primary" plain size="mini" @click="asPostCase">
                                                        <svg class="icon" aria-hidden="true">
                                                            <use xlink:href="#icon-AG_jiaoanqueren"></use>
                                                        </svg>
                                                        &nbsp;&nbsp;材料提交
                                                    </el-button>
                                                </div>
                                        <el-table size="small" ref="multipleTable1" :data="tableData4.list2" tooltip-effect="dark" style="width: 100%" height="385" border stripe
                                            @selection-change="asTaskSelectionChange">
                                            <el-table-column label="" width="58" fixed="left">

                                            </el-table-column>
                                            <el-table-column label="序号" type="index" width="55" fixed="left"></el-table-column>

                                            <el-table-column label="任务状态" width="118" fixed="left">
                                                <template slot-scope="scope">
                                                    <!-- <el-button v-if="scope.row.state == 0" type="text">执行中</el-button> -->
                                                    <span v-if="scope.row.state == 0" type="text">待签收</span>
                                                    <span v-else-if="scope.row.state == 1" type="text">执行中</span>
                                                    <span v-else-if="scope.row.state == 2" type="text">已完成</span>
                                                    <span v-else-if="scope.row.state == 3" type="text">案审已确认</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="催办次数" width="85" fixed="left">
                                                <template slot-scope="scope">
                                                    <el-badge :value="scope.row.icount" :class="scope.row.sup_bac"></el-badge>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="oper_user_id_" label="任务指派人" width="180" fixed="left"></el-table-column>
                                            <el-table-column prop="taskcontent" label="任务内容" width="272" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="taskresult" label="处理结果" width="200">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.taskresult" size="small"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="handleperson" label="办理人" width="184"></el-table-column>
                                            <el-table-column prop="handletime" label="办理时间" width="184"></el-table-column>
                                            <el-table-column prop="ispaper" label="是否有材料" width="167">
                                                <template slot-scope="scope">
                                                    <el-radio-group v-model="scope.row.ispaper" @change="newTaskChange(scope.row)">
                                                        <el-radio :label="'0'">无</el-radio>
                                                        <el-radio :label="'1'">有</el-radio>
                                                    </el-radio-group>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作" min-width="280" width="200" fixed="right">
                                                <template slot-scope="scope">
                                                    <!-- <el-button type="text" @click="del(scope.row.uuid)">删除</el-button> -->
                                                    <el-button v-show="scope.row.state == 0" type="text" @click="sign(scope.row.uuid)">签收</el-button>
                                                    <el-button type="text" @click="look(scope.row.uuid,true)">查看</el-button>
                                                    <el-button v-show="scope.row.state == 1" type="text" @click="editor(scope.row.uuid,false)">编辑</el-button>
                                                    <!-- <el-button type="text">催办</el-button> -->
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>

                    </div>
                    <!--编辑框-->
                    <el-dialog :title="ftTitle" :visible.sync="dialogFormVisible">

                        <el-form :model="formTask" :rules="rules" ref="formTask" :inline="true" :label-width="100" :disabled="isdable">
                            <div>
                                <el-form-item label="案件编号" v-show="ftShow==true">
                                    <el-input placeholder="案件编号" v-model="formTask.mainformid" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="办理时间" v-show="ftShow==true">
                                    <el-input placeholder="办理时间" v-model="formTask.handletime" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="任务状态" v-show="ftShow==true">
                                    <el-input placeholder="任务状态" v-model="formTask.state" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="指派人" v-show="ftShow==true">
                                    <el-input placeholder="指派人" v-model="formTask.oper_user_id_" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="办理人" v-show="ftShow==true">
                                    <el-input placeholder="办理人" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="是否有材料" v-show="ftShow==true">
                                    <%--<el-input  placeholder="是否有材料" v-model="formTask.ispaper"></el-input>--%>
                                        <el-radio-group v-model="formTask.ispaper" style="margin-top:13px;">
                                            <el-radio :label="'0'">无</el-radio>
                                            <el-radio :label="'1'">有</el-radio>
                                        </el-radio-group>


                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="任务内容">

                                    <el-autocomplete popper-class="my-autocomplete" v-model="formTask.taskcontent" :fetch-suggestions="querySearch" placeholder="请输入内容"
                                        @select="handleSelect" style="width:24vw" disabled="true">
                                        <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
                                        </i>
                                        <template slot-scope="{item}">
                                            <span class="">{{ item.VALUE }}</span>
                                        </template>
                                    </el-autocomplete>

                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="处理结果" prop="taskresult">
                                    <el-input type="textarea" :rows="5" style="width:24vw;" v-model="formTask.taskresult"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-align: center">
                            <button v-show="isdable == false && ftShow==true" class="conserve_btn" type="primary" @click="onsubmit('formTask')">确 定</button>
                            <button v-show="isdable == false && ftShow == false" class="conserve_btn" type="primary" @click="addSubmit('formTask')">添 加</button>
                            <button class="close_btn" @click="dialogFormVisible = false">取 消</button>
                        </div>
                    </el-dialog>


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
            let name = '${name}'
            // axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
            new Vue({
                el: '#caseApp',
                data: function () {
                    return {
                        tableData3: null,
                        tableData4: null,
                        multiplPage2: 5,
                        options1: [{
                            value: 'unCase',
                            label: '未交案'
                        }, {
                            value: 'alreadyCase',
                            label: '已交案'
                        }, {
                            value: 'allJaCase',
                            label: '所有案件'
                        }],
                        options2: [
                            {
                                value: 'unca',
                                label: '未呈案',
                            }, {
                                value: 'alreadyca',
                                label: '呈案',
                            }, {
                                value: 'allCase',
                                label: '所有案件',
                            }],
                        taskOptions: null,
                        formTask: {
                            mainformid: '',
                            handletime: '',
                            state: '',
                            oper_user_id_: '',
                            handleperson: '',
                            ispaper: '',
                            taskresult: '',
                            taskcontent: ''
                        },
                        rules: {
                            taskresult: [
                                { required: true, message: '请输入处理结果', trigger: 'blur' }
                            ]
                        },
                        caseStatus: 'allJaCase',
                        takeCaseStatus: 'allCase',
                        selectValue: '',//搜索值
                        selectValue2: '',
                        currentPage2: 1,
                        pageNum: 5,
                        currentRow: null,
                        caseInfo: null,
                        dialogFormVisible: false,
                        listShow: true,
                        isdable: '',
                        //带输入建议框
                        restaurants: [],
                        state3: '',
                        ispaper: '',
                        activeName2: 'first',
                        ftShow: true,
                        ftTitle: "",
                        multipleSelection: [], //案件的选中
                        taskMultipleSelection: [], //任务的选中
                        tableLoading: false,
                        asTaskMultipleSelection: [] //案审任务选中
                    }
                },
                created: function () {
                    this.loadAll();
                    this.handleCurrentChange()
                },
                methods: {
                    newTaskChange(row) {
                        row.state1 = row.ispaper
                    },
                    // 保存任务
                    onSubmit(listName) {
                        let list = this.tableData4[listName]
                        let index = list.findIndex(item => {
                            return item.taskcontent == ""
                        })
                        if (index > -1) {
                            this.$message({
                                message: '保存失败,任务内容不能为空',
                                type: 'error',
                                duration: 1000
                            });
                            return
                        }

                        axios.post('getCaseTask.do?method=saveTask', { list: list }).then(response => {
                            if (response.data == 1) {
                                this.$notify({
                                    title: '成功',
                                    message: '保存成功',
                                    type: 'success'
                                });

                                this.rowClick(this.currentRow)


                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '保存失败请重试'
                                });
                            }
                        }).catch(function (err) {

                        });

                    },
                    handleblur(val) {
                        this.inde = val.$index
                    },
                    handleSelect(item) {
                        this.$nextTick(() => {

                            this.taskcontent = item.VALUE
                            this.tableData4.list1[this.inde].taskcontent = this.taskcontent

                        })
                    },
                    handleIconClick(ev) {

                    },
                    downWord(uuid) {
                        let url = '${ctx}/case.do?method=expWord&tables=vw_ga_case1`single`uuid&uuid=' + uuid + '&word=zrzd001'
                        axios.post(url).then(res => {
                            // console.log(res.data)
                            window.open(res.data)
                        })
                    },
                    handleClick() {

                    },
                    toDetail(casenumber) {
                        var url = "${ctx}/getCase.do?method=toSeeCaseInfo&casenumber=" + casenumber;
                        matech.openTab(casenumber, "案件详情" + casenumber, url, true, parent);
                    },
                    toggleSelection(rows) {
                        if (rows) {
                            rows.forEach(row => {
                                this.$refs.multipleTable.toggleRowSelection(row);
                            });
                        } else {
                            this.$refs.multipleTable.clearSelection();
                        }
                    },
                    taskSelectionChange(val) {
                        this.taskMultipleSelection = val
                    },
                    asTaskSelectionChange(val) {
                        this.asTaskMultipleSelection = val
                    },
                    handleSelectionChange(val) {
                        this.multipleSelection = val;
                    },
                    handleSizeChange(val) {
                        // console.log(`每页 ${val} 条`);
                    },
                    handleCurrentChange() {
                        axios.get('getCase.do?method=getMyCaseList&presentType=1&curPage=' + this.currentPage2 + '&pageNum=' + this.pageNum + '&caseStatus=' + this.caseStatus + '&takeCaseStatus=' + this.takeCaseStatus + '&contain=' + this.selectValue2)
                            .then(response => {
                                let data = response.data
                                if (data.list == null) {
                                    this.tableData3 = data
                                } else {
                                    // 数据优化
                                    let i = 0
                                    data.list.forEach(item => {
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
                                        i++
                                        item['indexs'] = i + (this.currentPage2 - 1) * this.pageNum

                                        //办理状态
                                        if (item.state2 == 0) {
                                            item['attendingState'] = '待处理'
                                        } else if (item.state2 == 1) {
                                            item['attendingState'] = '未完成'
                                        } else if (item.state2 == 2) {
                                            item['attendingState'] = '已完成'
                                        }


                                    })
                                    this.tableData3 = data
                                    this.tableData4 = data
                                    this.setCurrent(this.tableData3.list[0])
                                    console.log(data)
                                }
                            })
                            .catch(function (error) {

                            });
                    },
                    select() {
                        this.selectValue2 = this.selectValue
                        this.currentPage2 = 1
                        this.rowClick('')
                        this.handleCurrentChange()

                    },
                    rowClick(val) {
                        this.tableLoading = true
                        this.currentRow = val;
                        axios.get('getCaseTask.do?method=getTaskList&uuid=' + val.uuid)
                            .then(response => {
                                this.tableLoading = false
                                let data = response.data
                                console.log(data)
                                // 一般任务数据优化
                                data.list1.forEach(item => {
                                    let curRemindersum = item.icount
                                    let iP = item.ispaper
                                    // 催办次数，字符串转化为整型
                                    item.icount = curRemindersum ? parseInt(curRemindersum) : 0
                                    // 处理催办次数的背景色 <1 3  1-3  2  >3 1
                                    let rS = item.icount
                                    if (rS < 1) {
                                        item['sup_bac'] = 'sup_bac3'
                                    } else if (rS < 4) {
                                        item['sup_bac'] = 'sup_bac2'
                                    } else {
                                        item['sup_bac'] = 'sup_bac1'
                                    }
                                    // 非新增任务
                                    item.isAdd = false


                                })
                                // 案审任务数据优化
                                data.list2.forEach(item => {
                                    let curRemindersum = item.icount
                                    let iP = item.ispaper
                                    // 催办次数，字符串转化为整型
                                    item.icount = curRemindersum ? parseInt(curRemindersum) : 0
                                    // 处理催办次数的背景色 <1 3  1-3  2  >3 1
                                    let rS = item.icount
                                    if (rS < 1) {
                                        item['sup_bac'] = 'sup_bac3'
                                    } else if (rS < 4) {
                                        item['sup_bac'] = 'sup_bac2'
                                    } else {
                                        item['sup_bac'] = 'sup_bac1'
                                    }
                                    // if (iP == 0) {
                                    //     item.ispaper = '无'
                                    // } else if (iP == 1) {
                                    //     item.ispaper = '有'
                                    // } else {
                                    //     item.ispaper = ''
                                    // }
                                    item.atype =  "2"
                                })
                                this.tableData4 = data
                                this.dialogFormVisible = false
                                console.log(response.data)
                            })
                            .catch(function (error) {
                                this.tableLoading = false
                            });
                    },
                    setCurrent(row) {
                        console.log('row: ', row)
                        console.log(this.$refs)
                        this.$nextTick(() => {
                            console.log(this.$refs.singleTable)
                            this.$refs.singleTable.setCurrentRow(row);
                        })

                    },
                    listDown() {
                        this.listShow = false
                        this.pageNum = 15
                        this.currentPage2 = 1
                        this.handleCurrentChange()
                    },
                    listUp() {
                        this.listShow = true
                        this.pageNum = 5
                        this.currentPage2 = 1
                        this.handleCurrentChange()
                    },
                    look(uuid, isdable) {
                        this.ftShow = true
                        this.ftTitle = "查看任务"
                        axios.get('getCaseTask.do?method=getTaskInfo&uuid=' + uuid)
                            .then(response => {
                                let data1 = response.data
                                let sT = data1.state
                                if (sT == 0) {
                                    data1.state = '执行中'
                                } else if (sT == 1) {
                                    data1.state = '待签收'
                                } else if (sT == 2) {
                                    data1.state = '已完成'
                                } else {
                                    data1.state = '案管已确认'
                                }
                                this.formTask = data1
                                this.dialogFormVisible = true
                                this.isdable = isdable
                                console.log(this.formTask)
                            })
                            .catch(function (error) {

                            });

                    },
                    editor(uuid, isdable) {
                        this.look(uuid, isdable)
                        this.ftTitle = "编辑任务"
                    },
                    // onsubmit(formName) {
                    //     this.$refs[formName].validate((valid) => {
                    //         if (valid) {
                    //             axios.post('getCaseTask.do?method=saveTask', {
                    //                 handleperson: this.formTask.handleperson,
                    //                 ispaper: this.formTask.ispaper,
                    //                 taskcontent: this.formTask.taskcontent,
                    //                 taskresult: this.formTask.taskresult,
                    //                 uuid: this.formTask.uuid,
                    //                 editType: 'update'
                    //             })
                    //                 .then(response => {
                    //                     if (response.data == 1) {
                    //                         this.$notify({
                    //                             title: '成功',
                    //                             message: '保存成功',
                    //                             type: 'success'
                    //                         });
                    //                         //  console.log(this.currentRow)
                    //                         // this.handleCurrentChange()
                    //                         this.rowClick(this.currentRow)
                    //                     } else {
                    //                         this.$notify.error({
                    //                             title: '错误',
                    //                             message: '保存失败请重试'
                    //                         });
                    //                     }
                    //                 })
                    //                 .catch(function (err) {
                    //                     console.log(err);
                    //                 });

                    //         } else {
                    //             console.log('error submit!!');
                    //             return false;
                    //         }
                    //     });

                    // },
                    del(uuid) {
                        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios.get('getCaseTask.do?method=deleteTaskInfo&uuid=' + uuid)
                                .then(response => {
                                    if (response.statusText == "OK") {
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                        val = this.currentRow
                                        this.rowClick(val)

                                    }
                                })
                                .catch(function (error) {

                                });

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    },
                    // 05.25 已处理
                    downloadSheet() {
                        if (!this.multipleSelection || !this.multipleSelection.length) {
                            this.$message.error('请选择案件')
                            return
                        }
                        let arr = []
                        this.multipleSelection.forEach((item, index) => {
                            arr.push({
                                '序号': index + 1,
                                '案件进度': item.taskschedule,
                                '催办次数': item.remindersum,
                                '案件编号': item.casenumber,
                                '案件名称': item.casename,
                                '主办民警': item._userNAME_auditdirector,
                                '案件类型': item.casetype,
                                '案件性质': item.casenaturename,
                                '案件状态': item.statenames,
                                '是否交案': item.ishandovername,
                                '办理状态': item.attendingState,
                                '报警时间': item.bjsj
                            })
                        })
                        let worksheet = XLSX.utils.json_to_sheet(arr)
                        let new_workbook = XLSX.utils.book_new()
                        XLSX.utils.book_append_sheet(new_workbook, worksheet, "我的案件")
                        return XLSX.writeFile(new_workbook, new Date().getTime() + '.xlsx')
                    },
                    loadAll() {
                        //请求编辑框下拉数据
                        let data = []
                        axios.get('getCaseTask.do?method=getTaskContentList')
                            .then((response) => {
                                data = response.data;
                                this.$nextTick(() => {
                                    this.restaurants = data
                                })
                                console.log('restaurants: ', data)
                            })
                            .catch(function (error) {

                            })
                    },
                    querySearch(queryString, cb) {
                        var restaurants = this.restaurants;
                        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        cb(results);
                        console.log(restaurants)
                    },
                    createFilter(queryString) {
                        return (restaurant) => {
                            return (restaurant.VALUE.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                        };
                    },

                    handleIconClick(ev) {
                        console.log(this.restaurant)
                    },
                    addTask() {
                        // this.dialogFormVisible = true
                        // this.isdable = false
                        // this.ftShow = false
                        // this.ftTitle = "新添任务"
                        // this.formTask = []
                        // this.ispaper="3"
                        let data = {
                            state: '0',
                            state1: '0',
                            icount: 0,
                            oper_user_id_: name,
                            taskcontent: '',
                            taskresult: '',
                            handleperson: this.currentRow._userNAME_auditdirector,
                            oper_time_: formartTime(),
                            update_time_: '',
                            ispaper: '',
                            'sup_bac': 'sup_bac3',
                            isAdd: true,
                            mainformid: this.currentRow.casenumber
                        }
                        this.tableData4.list1.push(data)
                    },
                    // 删除新增的任务
                    delNewTask(index) {
                        this.tableData4.list1.splice(index, 1)
                    },
                    addSubmit(formName) {
                        dialogFormVisible = false
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                axios.post('getCaseTask.do?method=saveTask', {
                                    taskcontent: this.formTask.taskcontent,
                                    taskresult: this.formTask.taskresult,
                                    uuid: '',
                                    editType: 'add',
                                    mainformid: this.currentRow.casenumber
                                })
                                    .then(response => {
                                        if (response.data == 1) {
                                            this.$notify({
                                                title: '成功',
                                                message: '添加成功',
                                                type: 'success'
                                            });
                                            //  console.log(this.currentRow)
                                            this.rowClick(this.currentRow)


                                        } else {
                                            this.$notify.error({
                                                title: '错误',
                                                message: '保存失败请重试'
                                            });
                                        }
                                    })
                                    .catch(function (err) {
                                        this.$notify.error({
                                            title: '错误',
                                            message: '保存失败请重试'
                                        });
                                    });
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });


                    },
                    sign(uuid) {
                        this.$confirm('是否签收该任务?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            axios.get('getCase.do?method=caseReceive&uuid=' + uuid)
                                .then(response => {
                                    console.log(response)
                                    if (response.data == 1) {
                                        this.$message({
                                            type: 'success',
                                            message: '签收成功!'
                                        });
                                        val = this.currentRow
                                        this.rowClick(val)
                                    } else {
                                        this.$message.error('签收失败');

                                    }


                                })
                                .catch(function (error) {

                                });

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消签收'
                            });
                        });
                    },
                    // 案审任务材料提交
                    asPostCase () {
                        if (this.asTaskMultipleSelection.length === 0) {                                
                            this.$message({
                                type: 'warning',
                                message: '请选择任务',
                                duration: 1000
                            })
                            return
                        }
                        let taskid = this.asTaskMultipleSelection.filter(item => {
                            return item.state1 == 1
                        }).map(item => {
                            return item.uuid
                        }).join(',')
                        let url = 'getCaseTask.do?method=caseBookSubmit&taskid=' + taskid
                        axios.post(url).then(res => {
                            this.handleCurrentChange()
                            let message = res.data == 1 ? '材料提交成功' : '材料提交失败'
                            let type = res.data == 1 ? 'success' : 'error'
                            this.$message({
                                type: type,
                                message: message,
                                duration: 1000
                            })
                        })
                    },
                    // 普通任务材料提交
                    postCase(uuid) {
                        let caseid = ''
                        let taskid = ''
                        // 单个任务-材料提交
                        if (uuid && typeof uuid === 'string') {
                            taskid = uuid
                        } else {
                            // 05.27 修改功能和接口
                            // if (this.multipleSelection.length === 0 && this.taskMultipleSelection.length === 0) {
                            // 06.01 修改需求：案件上面的材料提交取消，添加到任务栏    
                            if (this.taskMultipleSelection.length === 0) {                                
                                this.$message({
                                    type: 'warning',
                                    message: '请选择任务',
                                    duration: 1000
                                })
                                return
                            }
                            // caseid = this.multipleSelection.map(item => {
                            //     return item.uuid
                            // }).join(',')
                            // 已移交材料才可以提交材料
                            taskid = this.taskMultipleSelection.filter(item => {
                                return item.state1 == 1
                            }).map(item => {
                                return item.uuid
                            }).join(',')
                        }
                        // if (caseid==''&&taskid=='') return
                        let url = 'getCaseTask.do?method=caseBookSubmit&caseid=' + caseid + '&taskid=' + taskid
                        axios.post(url).then(res => {
                            this.handleCurrentChange()
                            let message = res.data == 1 ? '材料提交成功' : '材料提交失败'
                            let type = res.data == 1 ? 'success' : 'error'
                            this.$message({
                                type: type,
                                message: message,
                                duration: 1000
                            })
                        })
                        /*
                        let caseNumber = '';
                        let cftj = null;
                        let rwwc = null;
                        if(this.multipleSelection){
                            this.multipleSelection.forEach((item,index) => {
                                caseNumber = caseNumber+item.casenumber+',';                   
                                if(item.ishandovername == "已提交"){
                                    cftj = false 
                                }
                                if(item.attendingState != "已完成"){
                                    rwwc = false
                                }
        
                            })
                            if(cftj == false){
                                this.$confirm('您所选择的案件包含已提交案件，请勿重复提交', '提示', {
                                    type: 'warning'
                                    }).then(() => {
                                    
                                    }).catch(() => {
                                             
                                });
                                return false;
                            }else if(rwwc == false){
                                    this.$confirm('您有未完成的任务，不能进行交案', '提示', {
                                    type: 'warning'
                                    }).then(() => {
                                    
                                    }).catch(() => {                                
                                 });
                                  return false;
                                }
        
                                
                                axios.post('getCase.do?method=caseTransfer',{
                                    casenumber:caseNumber,
                                    editType:1
                                })
                                .then( response => {
                                     console.log(response)
                                     if(response.data == 1){
                                        this.$message({
                                            type: 'success',
                                            message: '交案成功!'
                                        });
                                    val = this.currentRow
                                    this.rowClick(val)
                                    this.handleCurrentChange()
                                    }else{
                                        this.$message.error('交案失败');
                                    
                                    }    
                                 })
                                .catch(function (error) {
                                  
                                    });
        
        
                        }else{
                            this.$message.error('请选择案件');
                        }
                        */
                    },
                    refurbish() {
                        //this.currentPage2 = 1
                        this.handleCurrentChange()
                    },
                    follow(val) {
                        console.log(val)
                        axios.post('getCase.do?method=caseGz', {
                            casenumber: val.casenumber,
                            oper_user_id_: val.oper_user_id_
                        })
                            .then(response => {
                                console.log(response.data.value)
                                if (response.data.value == 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '关注成功',
                                        duration: 1000
                                    })
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '关注失败',
                                        duration: 1000
                                    })
                                }

                            })

                    }



                },
                mounted() {

                }
            })


            function formartTime() {
                let d = new Date().toLocaleString('zh', { hour12: false })
                let arr = []
                d.split(' ')[0].split('/').forEach(item => {
                    let curItem = parseInt(item)
                    arr.push(curItem > 10 ? item : ('0' + item))
                })
                return arr.join('-') + ' ' + d.split(' ')[1]
            }


            function printWord() {

                var uuid = _grid.chooseValue("UUID");

                if (uuid == '') {
                    alert("请选择要打印案件的责任指定人文书");
                    return;
                }
                extWordPrint('&tables=vw_ga_case1`single`uuid&uuid=' + uuid + '&word=zrzd001', uuid);
            }



            function extWordPrint(param, uuid) {
                //打印
                var url = contextPath + "/case.do?method=expWord&" + param;



                $.ajax({
                    async: true,
                    type: "POST",
                    url: url,
                    cache: false,
                    success: function (data) {
                        var t = data;
                        try {
                            downloadOpen(t, uuid);
                        } catch (e) { alert(e); }
                    }
                });

            }

            function downloadOpen(path, _key) {
                var o = police.getWebOffice();
                if (o) {
                    var uuid = _key;
                    var url = police.getlocationhost() + "/" + path;
                    var t = o.funDownloadZipFileAndOpen(url, uuid);
                }
            }
        </script>

        </html>