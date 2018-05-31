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
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td{
        background-color:#FBE3CB
    }
    .el-table__body tr.hover-row>td{
        background-color:#fdf2e7 !important;
    }
    /* .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #F2F9FF;
    } */

    [v-cloak] {
            display: none;
                    }


</style>
<body >
<div id="caseApp"  v-cloak>
    <!--案件-->
    <div class="case">
        <el-row class="case_nav">
            <el-col :span="4">
                <div class="case_nav_item">
                    <span>派出所：</span>
                    <el-select v-model="paichusuo" placeholder="请选择派出所">
                        <el-option v-for="item in options3" :key="item.departid" :label="item.standbyname" :value="item.departid">
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
            <el-col :span="8">
                <div class="case_nav_item">
                        <el-button plain @click="select">
                                <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_sousuo"></use>
                                      </svg>
                            &nbsp;&nbsp;查询</el-button>
                        <el-button plain @click="refurbish">
                                <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_shuaxin"></use>
                                      </svg>
                            &nbsp;&nbsp;刷新</el-button>
                            <!-- 05.25 已处理 -->
                        <el-button plain @click="downloadSheet">
                                <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-AG_daochu1"></use>
                                      </svg>
                            &nbsp;&nbsp;导出
                        </el-button>
                       
                     
                        
                </div>
            </el-col>
        </el-row>
        <el-table :style="{'min-height':listShow!=true?'':'250px'}"  ref="singleTable" :data="tableData3.list" tooltip-effect="dark"  style="width: 100%"
                  border stripe
                  @selection-change="handleSelectionChange"
                  highlight-current-row
           
        >
            <el-table-column type="selection" width="58"></el-table-column>
            <el-table-column fixed prop="indexs" label="序号" width="55"></el-table-column>
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
            <el-table-column prop="_userNAME_auditdirector" label="主办民警" width="145"></el-table-column> 
            <el-table-column prop="casetype" label="案件类型" width="88" show-overflow-tooltip></el-table-column>
            <el-table-column prop="casenaturename" label="案件性质" width="156"></el-table-column>
            <el-table-column prop="statenames" label="案件状态" width="88px"></el-table-column>
           <!--  <el-table-column prop="ishandovername" label="是否交案" width="180px"></el-table-column> -->
            <el-table-column prop="attendingState" label="办理状态" width="88px"></el-table-column>
            <el-table-column prop="standbyname" label="派出所" width="180px"></el-table-column>
            <el-table-column prop="bjsj" label="报警时间" width="200px"></el-table-column>    
            <el-table-column fixed="right" label="操作" min-width="180px">
                <template slot-scope="scope">
                    <el-button type="text" @click="toDetail(scope.row.casenumber)">查看详情</el-button>
                    <!-- <el-button type="text" @click="downWord(scope.row.uuid)">主办责任人指定书</el-button> -->
                    <!-- <el-button type="text" @click="follow(scope.row)">关注</el-button> -->
                    <!-- <el-button type="text">催办</el-button> -->
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
                    layout="prev, pager, next"
                    :total="this.tableData3.pageCount*5">
            </el-pagination>
        </div>
    </div>
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
    // axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
    new Vue({
        el: '#caseApp',
        data: function() {
            return {
                tableData3: null,
                multiplPage2: 5,            
                options3:[{
                    value: 'unCase',
                    label: '拱北派出所'
                },{
                    value: 'alreadyCase',
                    label: '南屏派出所'
                }, {
                    value: 'allJaCase',
                    label: '前山派出所'
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
                    taskresult : [
                        { required: true, message: '请输入处理结果', trigger: 'blur' }
                    ]
                },
                paichusuo:null,
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
                ftTitle:""


            }
        },
        created: function() {
            this.loadAll();
            this.handleCurrentChange()
             //派出所下拉数据
             let url = 'getCase.do?method=getPCSListData'
                    axios.get(url).then(res => { 
                        this.options3 = res.data.list
                     //   console.log(this.paichusuo)
             })
        },
        methods: {
            downWord(uuid) {
                        let url = '${ctx}/case.do?method=expWord&tables=vw_ga_case1`single`uuid&uuid=' + uuid + '&word=zrzd001'
                        axios.post(url).then(res => {
                            // console.log(res.data)
                            window.open(res.data)
                        })
                    },
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
                axios.get('getCase.do?method=getFJLDCaseListData&organid='+this.paichusuo+'&curPage='+this.currentPage2+'&pageNum='+this.pageNum+'&contain='+this.selectValue2)
                    .then( response => {
                    let data = response.data
                    if(data.list == null){
                    this.tableData3 = data
                }else{
                    // 数据优化
                    let i=0
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
                    i++
                    item['indexs']=i+(this.currentPage2-1)*this.pageNum
                    	
                    //办理状态
                    if(item.state2 == 0){
                        item['attendingState'] = '待处理'
                    }else if(item.state2 == 1){
                        item['attendingState'] = '未完成'
                    }else if(item.state2 == 2){
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
            select(){
                this.selectValue2 = this.selectValue
                this.currentPage2 = 1
                this.handleCurrentChange()
                console.log(this.paichusuo)           
            },
           
            setCurrent(row) {
                console.log('row: ',row)
                console.log(this.$refs)
                this.$nextTick(() => {
                    console.log(this.$refs.singleTable)
                this.$refs.singleTable.setCurrentRow(row);
               
            })

            },
        
         
        
        
       
            // 05.25 已处理
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
            
         
           
            refurbish(){
                 //this.currentPage2 = 1
                 this.handleCurrentChange()
            },

        },
        mounted() {

        }
    })


    function printWord(){
    	
        var uuid = _grid.chooseValue("UUID");
    	
    	if (uuid == '') {
    		alert("请选择要打印案件的责任指定人文书");
    		return;
    	}
    		extWordPrint('&tables=vw_ga_case1`single`uuid&uuid='+uuid+'&word=zrzd001',uuid);
    }



    function extWordPrint(param,uuid){
       	//打印
    	var url =contextPath+ "/case.do?method=expWord&"+param;



    	$.ajax({ 
    		async: true, 
    		type : "POST", 
    		url : url,
        	cache:false,    
    		success : function(data) { 
    			var t=data;
    			try{ 
    				downloadOpen(t,uuid);
    			}catch(e){alert(e);}
    		} 
     	}); 
    	
    }

    function downloadOpen(path,_key){
    	var o=police.getWebOffice();
    	if (o){
    		var uuid=_key;
    		var url = police.getlocationhost() +"/"+ path;
    		var t=o.funDownloadZipFileAndOpen(url,uuid);
    	}	
    }
</script>
</html>

