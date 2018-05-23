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
            padding: 20px 0;
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
        .sup_bac1 sup{
            background:#ff4646
        }
        .sup_bac2 sup{
            background: #ffaa46;
        }
        .sup_bac3 sup{
            background: #1b85ca;
        }
        .el-dialog__title{
            color: white;
        }
        .el-dialog__header{
            background: #2981b4;
        }
        .conserve_btn{
            width: 125px;
            height: 44px;
            border-radius: 5px/4px;
            background-color: #6392c8;
            box-shadow: 0 1px 1px rgba(0,0,0,.75), inset 0 1px rgba(255,255,255,.4), inset 0 0 1px rgba(255,255,255,.2);
            border: solid 1px #2890b7;
            background-image: linear-gradient(to top, #1c9ccb, #3276c3);
            font-size: 18px;
            cursor: pointer;
            color: white;
            margin-right: 1vw;
        }
        .close_btn{
            width: 125px;
            height: 44px;
            border-radius: 5px/4px;
            background-color: #ff7135;
            box-shadow: 0 1px 1px rgba(0,0,0,.75), inset 0 1px rgba(255,255,255,.4), inset 0 0 1px rgba(255,255,255,.2);
            border: solid 1px #dc882d;
            background-image: linear-gradient(to top, #ff9267, #fdad74 53%, #fdb075 58%, #fbc57f);
            color:white;
            font-size: 18px;
            cursor: pointer;
        }

        [v-cloak] {
                            display: none;
                            }

    </style>
</head>
<style>
    .el-table td, .el-table th.is-leaf {
        /* border: 1px solid #e3e3e3; */
        text-align: center;
    }
    .el-table td{
        padding: 0;
    }
    .el-table th {
        background-color: #f7f8f9 !important;
        color: #5e5e5e;
        padding: 10px 0;
    }
    .el-table th>.cell {
        font-size:16px !important;
    }
    .paging{
      line-height: 32px;
        margin-top: 24px;
    }
    .el-pagination{
        float: right;
        margin-right: 40px;
    }
    .demonstration{
        float: right;
    }
    .addimg{
        position: absolute;
        top: -45px;
        left: 210px;
        z-index: 10;
        cursor: pointer;
    }
    .task{
        position: relative;
    }
    .el-tabs__content{
        overflow: inherit;
    }
    .dl .el-dialog{
        width: 35%;
    }


</style>
<body>
    <div id="caseApp" v-cloak v-loading.fullscreen.lock="fullscreenLoading">
        <!--案件-->
        <div class="case">
        <el-row class="case_nav">
            <el-col :span="4">
                <div class="case_nav_item">
                    <span>交案状态：</span>
                    <el-select v-model="caseStatus" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="case_nav_item">
                    <span>呈案状态：</span>
                    <el-select v-model="takeCaseStatus" placeholder="请选择">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="case_nav_item case_nave_search">
                    <span>搜索内容：</span>
                    <el-input v-model="selectValue" placeholder="案件编号或案件名称"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="case_nav_item">
                    <el-button plain @click="select"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
                    <el-button plain  @click="refurbish"><i class="el-icon-refresh"></i>&nbsp;&nbsp;刷新</el-button>
                    <el-button plain @click="downloadSheet"><i class="el-icon-download">&nbsp;&nbsp;导出</i></el-button>
                    <!-- <el-button @click="postCase" plain><i class="el-icon-edit" ></i>&nbsp;&nbsp;交案</el-button> -->
                    <el-button plain v-if="listShow==true" @click="listDown"><i class="el-icon-arrow-down"></i>&nbsp;&nbsp;隐藏任务</el-button>
                    <el-button plain v-else @click="listUp"><i class="el-icon-arrow-up"></i>&nbsp;&nbsp;显示任务</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table :style="{'min-height':listShow!=true?'':'250px'}"  ref="singleTable" :data="tableData3.list" tooltip-effect="dark"  style="width: 100%"
                  border stripe
                @selection-change="handleSelectionChange"
                  highlight-current-row
                  @current-change="rowClick"
        >
            <el-table-column type="selection" width="58"></el-table-column>
            <el-table-column fixed label="序号" type="index" width="55"  type="index"></el-table-column>
            <el-table-column fixed  label="案件进度" width="118">
                <template  slot-scope="scope">
                    <el-progress :percentage="scope.row.taskschedule"></el-progress>
                </template>
            </el-table-column>
            <el-table-column fixed label="催办次数" width="85">
                <template slot-scope="scope">
                    <el-badge :value="scope.row.remindersum" :class="scope.row.sup_bac" ></el-badge>
                </template>
            </el-table-column>
            <el-table-column fixed prop="casenumber" label="案件编号" width="180"></el-table-column>
            <el-table-column prop="casename" label="案件名称" width="152"></el-table-column>
            <el-table-column prop="casetype" label="案件类型" width="88" show-overflow-tooltip></el-table-column>
            <el-table-column prop="casenaturename" label="案件性质" width="156"></el-table-column>
            <el-table-column prop="_userNAME_auditdirector" label="主办民警" width="145"></el-table-column>
            <el-table-column prop="statenames" label="案件状态" width="88px"></el-table-column>
            <el-table-column prop="ishandovername" label="是否交案" width="120px"></el-table-column>
            <el-table-column prop="attendingState" label="办理状态" width="88"></el-table-column>
            <el-table-column prop="bjsj" label="报警时间" width="200"></el-table-column>
            <el-table-column fixed="right" label="操.作" min-width="280">
                <template slot-scope="scope">
                    <el-button type="text" @click="toDetail(scope.row.casenumber)">查看详情</el-button>
                    <el-button type="text">主办责任人指定书</el-button>
                    <el-button @click="Urge(scope.row.casenumber,'case')" type="text">催办</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block paging">
            <el-pagination
                    background
                    :page-size="5"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    prev-text="上一页"
                    next-text="下一页"
                    layout="prev, pager, next"
                    :total="this.tableData3.pageCount*5">
            </el-pagination
        </div>
        </div>

        <!--任务-->
        <div class="task" style="margin-top:65px" v-if="listShow==true">
           
            <%--任务类别--%>
            <div>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

                    <el-tab-pane class="nomal_task" label="普通任务" name="first">
                        <img v-show="imgShow == true" @click="addTask" class="addimg" src="${pageContext.request.contextPath}/tws/css/img/ag_add.png"/>
                        <el-table ref="multipleTable1" :data="tableData4.list1" tooltip-effect="dark" style="width: 100%" height="385"
                                  border stripe
                                  @selection-change="handleSelectionChange">
                            <el-table-column label="" width="58" fixed="left">

                            </el-table-column>
                            <el-table-column label="序号" type="index" width="55" fixed="left"></el-table-column>
                            <el-table-column label="任务状态" width="118" fixed="left">
                                <template slot-scope="scope">
                                    <el-text v-if="scope.row.state == 0" type="text">执行中</el-text>
                                    <el-text v-else-if="scope.row.state == 1" type="text">已完成</el-text>
                                    <el-text v-else-if="scope.row.state == 2" type="text">案管已确认</el-text>
                                </template>
                            </el-table-column >
                            <el-table-column label="催办次数" width="85" fixed="left">
                                <template slot-scope="scope">
                                    <el-badge :value="scope.row.icount" :class="scope.row.sup_bac" ></el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="oper_user_id_" label="任务指派人" width="180" fixed="left"></el-table-column>
                            <el-table-column prop="taskcontent" label="任务内容" width="272" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="taskresult" label="处理结果"  width="400"></el-table-column>
                            <el-table-column prop="handleperson" label="办理人" width="184"></el-table-column>
                            <el-table-column prop="handletime" label="办理时间" width="184"></el-table-column>
                            <el-table-column prop="ispaper" label="是否有材料" width="167"></el-table-column>
                            <el-table-column label="操作" min-width="280" width="200" fixed="right">
                                <template slot-scope="scope">

                                    <el-button v-show="scope.row.state == 0" type="text" @click="del(scope.row.uuid)">删除</el-button>
                                    <el-button v-show="scope.row.state == 1 || scope.row.state == 2" type="text" @click="look(scope.row.uuid,true)">查看</el-button>
                                    <el-button v-show="scope.row.state == 0" type="text" @click="editor(scope.row.uuid,false)">编辑</el-button>
                                    <el-button v-show="scope.row.state == 0" @click="Urge(scope.row.uuid,'task')" type="text">催办</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="案审任务" name="second">
                        <el-table ref="multipleTable1" :data="tableData4.list2" tooltip-effect="dark" style="width: 100%" height="385"
                                  border stripe
                                  @selection-change="handleSelectionChange">
                            <el-table-column label="" width="58" fixed="left">

                            </el-table-column>
                            <el-table-column label="序号" type="index" width="55" fixed="left"></el-table-column>
                            <el-table-column label="任务状态" width="118" fixed="left">
                                <template slot-scope="scope">
                                    <!-- <el-button v-if="scope.row.state == 0" type="text">执行中</el-button> -->
                                    <el-text v-if="scope.row.state == 0" type="text">待签收</el-text>
                                    <el-text v-else-if="scope.row.state == 1" type="text">执行中</el-text>
                                    <el-text v-else-if="scope.row.state == 2" type="text">已确认</el-text>
                                </template>
                            </el-table-column >
                            <el-table-column label="催办次数" width="85" fixed="left">
                                <template slot-scope="scope">
                                    <el-badge :value="scope.row.icount" :class="scope.row.sup_bac" ></el-badge>
                                </template>
                            </el-table-column>
                            <el-table-column prop="oper_user_id_" label="任务指派人" width="180" fixed="left"></el-table-column>
                            <el-table-column prop="taskcontent" label="任务内容" width="272" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="taskresult" label="处理结果"  width="400"></el-table-column>
                            <el-table-column prop="handleperson" label="办理人" width="184"></el-table-column>
                            <el-table-column prop="handletime" label="办理时间" width="184"></el-table-column>
                            <el-table-column prop="ispaper" label="是否有材料" width="167"></el-table-column>
                            <el-table-column label="操作" min-width="280" width="200" fixed="right">
                                <template slot-scope="scope">
                                    <!-- <el-button v-show="scope.row.state == 0" type="text" @click="del(scope.row.uuid)">删除</el-button> -->
                                    <el-button type="text" @click="look(scope.row.uuid,true,'true')">查看</el-button>
                                    <!-- <el-button v-show="scope.row.state == 0" type="text" @click="editor(scope.row.uuid,false)">编辑</el-button>
                                    <el-button v-show="scope.row.state == 0" type="text">催办</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
        <!--编辑框-->
        <el-dialog :title="ftTitle" :visible.sync="dialogFormVisible" v-bind:class="dl">

            <el-form :model="formTask" :rules="rules" ref="formTask"  :inline="true" :label-width="100" :disabled="isdable">
                <div>
                    <el-form-item label="案件编号" v-show="ftShow==true">
                        <el-input  placeholder="案件编号" v-model="formTask.mainformid" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="办理时间" v-show="ftShow==true">
                        <el-input  placeholder="办理时间" v-model="formTask.handletime" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="任务状态" v-show="ftShow==true">
                        <el-input  placeholder="任务状态" v-model="formTask.state" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="指派人" v-show="ftShow==true">
                        <el-input  placeholder="指派人" v-model="formTask.oper_user_id_" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="办理人" v-show="ftShow==true">
                        <el-input  placeholder="办理人"   disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有材料" v-show="ftShow==true">
        
                                <el-radio-group v-model="formTask.ispaper"  disabled="true" style="margin-top:13px;">
                                    <el-radio :label="'0'">无</el-radio>
                                    <el-radio :label="'1'">有</el-radio>
                                </el-radio-group>


                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="任务内容" prop="taskcontent">
                        <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model="formTask.taskcontent"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect" style="width:24vw">
                            <i
                                    class="el-icon-edit el-input__icon"
                                    slot="suffix"
                                    @click="handleIconClick">
                            </i>
                            <template slot-scope="{item}">
                                <span class="">{{ item.VALUE }}</span>
                            </template>
                        </el-autocomplete>

                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="处理结果" prop="taskresult">
                        <el-input  type="textarea" :rows="5" style="width:24vw;" v-model="formTask.taskresult"  disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer"  class="dialog-footer" style="text-align: center" >
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
<script>
    // axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
    new Vue({
        el: '#caseApp',
        data: function() {
            return {
                fullscreenLoading: false,
                tableData3: null,
                tableData4:null,
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
                options2: [{
                    value: 'unca',
                    label: '未呈案'
                }, {
                    
                    value: 'alreadyca',
                    label: '呈案'
                 },{
                    value: 'allCase',
                    label: '所有案件',
                }],
                taskOptions:null,
                formTask: {
                    mainformid: '',
                    handletime: '',
                    state: '',
                    oper_user_id_: '',
                    handleperson: '',
                    ispaper: '',
                    taskresult:'',
                    taskcontent:''
                },
                rules : {
                    taskcontent : [
                        { required: true, message: '请输入任务内容', trigger: 'change' }
                    ],
                },
                caseStatus: 'allJaCase',
                takeCaseStatus: 'allCase',
                selectValue: '',//搜索值
                selectValue2:'',
                currentPage2: 1,
                pageNum:5,
                currentRow: null,
                caseInfo:null,
                dialogFormVisible :false,
                listShow:true,
                isdable:'',
                //带输入建议框
                restaurants: [],
                state3: '',
                ispaper:'',
                activeName2:'first',
                ftShow:true,
                ftTitle:"",
                dl:"",
                imgShow:true
        


            }
        },
        beforeCreate() {
           
        },
        created: function() {
            this.loadAll();
            this.handleCurrentChange()
        },
        methods: {
            handleClick() {

            },
            toDetail (casenumber) {
                var url = "${ctx}/getCase.do?method=toSeeCaseInfo&casenumber=" + casenumber;
                matech.openTab(casenumber, "案件详情"+casenumber, url, true,parent);
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(val)
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange() {
                axios.get('getCase.do?method=getMyOrganCaseList&presentType=1&curPage='+this.currentPage2+'&pageNum='+this.pageNum+'&caseStatus='+this.caseStatus+'&takeCaseStatus='+this.takeCaseStatus+'&contain='+this.selectValue2)
                    .then( response => {
                    let data = response.data
                    if(data.list == null){
                    this.tableData3 = data
                    
                }else{
                    // 数据优化
                    data.list.forEach(item => {
                        let curtTaskschedule = item.taskschedule
                        let curRemindersum = item.remindersum
                        // 案件进度处理，后台返回的是字符串且没有做位数处理
                        if(curtTaskschedule) {
                            if(curtTaskschedule.indexOf('.') > -1) {
                                // item.taskschedule = parseFloat(parseFloat(cur).toFixed(2))
                                item.taskschedule = parseInt(curtTaskschedule)
                            }
                        }else {
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
                       //办理状态
                       if(item.allsum == 0){
                           item['attendingState'] = '待处理'
                       }else if(item.allsum !=0 && item.taskschedule<100){
                           item['attendingState'] = '未完成'
                       }else if(item.allsum !=0 && item.taskschedule==100){
                           item['attendingState'] = '已完成'
                       }

                })
                    this.tableData3 = data
                    this.tableData4 = data
                    this.setCurrent(this.tableData3.list[0])
                   // console.log(data)
                }
                    })
                .catch(function (error) {

                });
            },
            select(){
                this.selectValue2 = this.selectValue
                this.currentPage2 = 1
                this.rowClick('')
                this.handleCurrentChange()

            },
            rowClick(val){
                this.currentRow = val;
                if(val.ishandovername == "案管已确认"){
                   this.imgShow = false   
                }else{
                    this.imgShow = true
                }
                axios.get('getCaseTask.do?method=getTaskList&uuid='+val.uuid)
                    .then( response => {
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
                            console.log(rS)
                            if (rS < 1) {
                                item['sup_bac'] = 'sup_bac3'
                            } else if (rS < 4) {
                                item['sup_bac'] = 'sup_bac2'
                            } else {
                                item['sup_bac'] = 'sup_bac1'
                            }
                            if(iP == 0){
                                item.ispaper = '无'
                            }else if(iP == 1){
                                item.ispaper = '有'
                            }else{
                                item.ispaper = ''
                            }
                         console.log(iP)
                          
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
                    if(iP == 0){
                        item.ispaper = '无'
                    }else if(iP == 1){
                        item.ispaper = '有'
                    }else{
                        item.ispaper = ''
                    }
                })
                    this.tableData4 = data
                    this.dialogFormVisible = false
                   // console.log(response.data)
                 })
                .catch(function (error) {

                    });
            },
            setCurrent(row) {
               // console.log('row: ',row)
               // console.log(this.$refs)
                this.$nextTick(() => {
                    console.log(this.$refs.singleTable)
                    this.$refs.singleTable.setCurrentRow(row);
                })

            },
            listDown(){
                this.listShow = false
                this.pageNum = 15
                this.currentPage2 = 1
                this.handleCurrentChange()
            },
            listUp(){
                this.listShow = true
                this.pageNum = 5
                this.currentPage2 = 1
                this.handleCurrentChange()
            },
            look(uuid,isdable,anguan){
                this.ftShow = true
                this.ftTitle = "查看任务"
                axios.get('getCaseTask.do?method=getTaskInfo&uuid='+uuid)
                    .then( response => {
                    let data1 = response.data
                    let sT= data1.state
                    if(anguan){
                        if(sT == 0){
                            data1.state = '待签收'
                        }else if(sT == 1 ){
                            data1.state = '执行中'
                        }else if(sT == 2){
                            data1.state = '已确认'
                        }                  
                    }else{
                        if(sT == 0){
                            data1.state = '执行中'
                        }else if(sT == 1 ){
                            data1.state = '已完成'
                        }else if(sT == 2){
                            data1.state = '案管已确认'
                        }
                    }
                    this.formTask = data1
                    this.dialogFormVisible = true
                    this.isdable = isdable
                    console.log(this.formTask)
                 })
                .catch(function (error) {

                });

                },
                editor(uuid,isdable){
                    console.log(this.rules)
                    this.dl = ""
                    this.look(uuid,isdable)
                    this.ftTitle = "编辑任务"
                    
                },
                onsubmit(formName){
                    this.$refs[formName].validate((valid) => {
                        
                        if (valid) {
                            axios.post('getCaseTask.do?method=saveTask',{
                                handleperson:this.formTask.handleperson,
                                ispaper:this.formTask.ispaper,
                                taskcontent:this.formTask.taskcontent,
                                taskresult:this.formTask.taskresult,
                                uuid:this.formTask.uuid,
                                editType:'update'
                            })
                            .then(response => {
                                if(response.data == 1){                            
                                    this.$notify({
                                        title: '成功',
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                //  console.log(this.currentRow)
                                    this.rowClick(this.currentRow)


                                }else{
                                    this.$notify.error({
                                    title: '错误',
                                    message: '保存失败请重试'
                                    });
                                }
                            })
                            .catch(function(err){
                                console.log(err);
                            });

                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });   
                    
                },
                del(uuid){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get('getCaseTask.do?method=deleteTaskInfo&uuid='+uuid)
                        .then( response => {
                        if(response.statusText == "OK"){
                            this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
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

            downloadSheet () {
                if (!this.multipleSelection || !this.multipleSelection.length) {
                    this.$message.error('请选择案件')
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
                        '报警时间': item.bjsj
                    })
                })
                let worksheet = XLSX.utils.json_to_sheet(arr)
                let new_workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(new_workbook, worksheet, "我的案件")
                return XLSX.writeFile(new_workbook, new Date().getTime()+'.xlsx')
            },
            loadAll() {
                //请求编辑框下拉数据
                let data = []
                axios.get('getCaseTask.do?method=getTaskContentList')
                    .then((response) => {
                        data=response.data;
                        this.$nextTick(() => {
                            this.restaurants = data
                        })
                        console.log('restaurants: ',data)
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
            handleSelect(item) {
                console.log(item);
                this.formTask.taskcontent = item.VALUE
            },
            handleIconClick(ev) {
                console.log(this.restaurant)
            },
            addTask(){
                this.dialogFormVisible = true
                this.isdable = false
                this.ftShow = false
                this.ftTitle = "新添任务"
                this.formTask = []
                this.dl="dl"               
            },
            addSubmit(formName){
                dialogFormVisible = false
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('getCaseTask.do?method=saveTask',{
                        taskcontent:this.formTask.taskcontent,
                        uuid:'',
                        editType:'add',
                        mainformid:this.currentRow.casenumber
                    })
                        .then(response => {
                            console.log(response)
                            if(response.data == 1){
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success'
                                });
                              //  console.log(this.currentRow)
                                this.rowClick(this.currentRow)


                            }else{
                                this.$notify.error({
                                title: '错误',
                                message: '保存失败请重试'
                                });
                            }
                        })
                        .catch(function(err){
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
            sign(uuid){
                this.$confirm('是否签收该任务?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        
                        axios.get('getCase.do?method=caseReceive&uuid='+uuid)
                        .then( response => {
                        console.log(response)
                            if(response.data == 1){
                                this.$message({
                                    type: 'success',
                                    message: '签收成功!'
                                });
                            val = this.currentRow
                            this.rowClick(val)
                        }else{
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
            postCase(){
                console.log(11);
                console.log(this.multipleSelection);
                let caseNumber = '';
                let cftj = null;
                if(this.multipleSelection){
                    this.multipleSelection.forEach((item,index) => {
                        caseNumber = caseNumber+item.casenumber+',';
                        if(item.ishandovername == "已提交"){
                            cftj = false 
                        }
                    })
                    if(cftj == false){
                        this.$confirm('您所选择的案件包含已提交案件，请勿重复提交', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                            
                            }).catch(() => {
                                     
                        });
                        return false;
                    }

                    axios.post('getCase.do?method=caseTransfer',{
                      /*  casenumber:caseNumber,
                        editType:1*/
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
                                this.$message.error('请勾选案件');
                            
                            }    
                         })
                        .catch(function (error) {
                          
                            });


                }else{
                    this.$message.error('请选择案件');
                }
                
            },
            Urge(uuid,status){
                axios.get('getCaseTask.do?method=caseTaskUrge&uuid='+uuid+'&editType='+status)
                        .then(response => {
                             console.log(response)
                             val = this.currentRow
                             if(response.data == 1){
                                this.$notify({
                                    title: '成功',
                                    message: '催办成功',
                                    type: 'success'
                                });
                                if(status == 'task'){
                                    this.rowClick(val)
                                }else{
                                    this.rowClick(val)
                                    this.handleCurrentChange()
                                }
                             }else{
                        
                                this.$message({
                                    type: 'warning',
                                    message: '催办失败,该案件任务已在处理',
                                    duration: 1000
                                })
                             }    
                         })
                        .catch(function (error) {
                          
                        })
            },
            refurbish(){
                 //this.currentPage2 = 1
                 this.handleCurrentChange()
            }
        
        },

        mounted() {
           
        }
    })


</script>
</html>

