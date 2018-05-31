<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>行政案件材料确认表</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
<style>
    .active {
      background: #fff;
    border-color: #409EFF;
    color: #409EFF;
    }
    .el-table th>.cell {
      font-size: 14px !important;
    }
    .el-icon-remove, .el-icon-circle-plus {
      color:  #2983b3;
    }
    .el-button-group .el-button:not(:last-child) {
      margin-right: 0;
    }
    [v-cloak] {
        display: none;
    }

    .icon {
      width: 12px; 
      height: 12px;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }

    .tb-edit .el-input { 
    display: none 
    } 
    .tb-edit .current-row .el-input { 
        display: block 
    } 
    .tb-edit .current-row .el-input+span { 
        display: none 
    }

    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
    <div id="app" v-cloak>
        <el-form :inline="true" size="small" class="head-form">
            <el-form-item label="总览：">
                <el-button-group>
                    <el-button plain @click="changePandect" :class="{active:pandect}">案件总览</el-button>
                    <el-button plain @click="changePandect" :class="{active:!pandect}">材料总览</el-button>
                  </el-button-group>
            </el-form-item>
            <el-form-item label="入库状态：">
              <el-select v-model="state">
                <el-option label="未入库" value="未入库"></el-option>
                <el-option label="已入库" value="已入库"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搜索内容：">
              <el-input v-model="searchTxt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button plain class="img-btn" @click="search" size="small">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-AG_sousuo"></use>
                  </svg>
                  &nbsp;&nbsp;查询
                  </el-button>
            </el-form-item>
            <el-form-item>
                <!-- 05.25 页面字段未确定！ -->
                <el-button plain class="img-btn" size="small">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-AG_daochu1"></use>
                  </svg>
                  &nbsp;&nbsp;导出
                  </el-button>
            </el-form-item>
            <el-form-item>
                <el-button plain class="img-btn" :disabled="state=='未入库'" size="small">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-AG_piliangyijiao"></use>
                  </svg>
                  &nbsp;&nbsp;批量移交
                  </el-button>
            </el-form-item>
          </el-form>
      <div v-loading="loading">
        <div v-if="pandect" key="true">
          <el-table size="small" @selection-change="handleSelectionChange" :data="tableData" stripe border style="width: 100%">
            <el-table-column type="selection" width="58"></el-table-column>
            <el-table-column fixed label="序号" type="index" width="55"></el-table-column>
            <el-table-column fixed prop="caseNo" label="案件编号" width="118"></el-table-column>
            <el-table-column fixed prop="caseName" label="案件名称" width="85"></el-table-column>
            <el-table-column fixed prop="alarmTime" label="报警时间" width="180"></el-table-column>
            <el-table-column prop="state" label="案件类别" width="88"></el-table-column>
            <el-table-column prop="police" label="主办民警" width="156"></el-table-column>
            <el-table-column prop="caseState" label="案件状态" width="152"></el-table-column>
            <el-table-column prop="handDate" label="移交时间" width="167"></el-table-column>
            <el-table-column prop="handName" label="移交人" width="145"></el-table-column>
            <el-table-column prop="comment" label="备注" width="150"></el-table-column>
            <el-table-column prop="pending" label="待入库" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="240">
              <template slot-scope="scope">
                <el-button type="text" @click="toPutin(scope.row.uuid)">确认入库</el-button>
                <el-button type="text" @click="toVisit(scope.row.uuid)">编辑材料</el-button>
                <el-button type="text" >查看更多</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" :pager-count="5" prev-text="上一页" next-text="下一页"
            background layout="prev, pager, next">
          </el-pagination>
        </div>
        <div v-else key="false">
            <el-table size="small" @selection-change="handleSelectionChange1" :data="tableData1" stripe border style="width: 100%">
                <el-table-column type="selection" width="58"></el-table-column>
                <el-table-column fixed label="序号" type="index" width="55"></el-table-column>
                <el-table-column fixed prop="caseNo" label="案件编号" width="118"></el-table-column>
                <el-table-column fixed prop="caseName" label="案件名称" width="85"></el-table-column>
                <el-table-column prop="victim" label="受害人姓名" width="100"></el-table-column>
                <el-table-column prop="witness" label="证人姓名" width="100"></el-table-column>
                <el-table-column prop="suspect" label="嫌疑人姓名" width="100"></el-table-column>
                <el-table-column prop="idCardNo" label="身份证号码" width="180"></el-table-column>
                <el-table-column prop="materials" label="材料内容" width="167"></el-table-column>
                <el-table-column prop="other" label="其他名称" width="145"></el-table-column>
                <el-table-column prop="specification" label="规格" width="150"></el-table-column>
                <el-table-column prop="number" label="数量" width="150"></el-table-column>
                <el-table-column prop="comment" label="备注" width="150"></el-table-column>
                <el-table-column prop="iventory" label="入库状态" width="150"></el-table-column>
                <el-table-column prop="handed" label="移交状态" width="150"></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="240">
                  <template slot-scope="scope">
                    <el-button type="text" >移交</el-button>
                    <el-button type="text">查看更多</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination @current-change="handleCurrentChange" :page-count="pageCount" :pager-count="5" prev-text="上一页" next-text="下一页"
                background layout="prev, pager, next">
              </el-pagination>
        </div>
      </div>
      <!-- 入库弹框 -->
      <el-dialog
        title="案件材料入库"
        :visible="putinVisible"
        @close="putinVisible=false"
        width="60%">
        <el-table size="mini"
          @selection-change="handleSelectionChange"
          :data="materialsData1"
          stripe border
          style="width: 100%">
          <el-table-column label="受害人" align="center">
            <el-table-column  type="selection" width="58"></el-table-column>
            <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
            <el-table-column fixed prop="name"  label="姓名" width="118"></el-table-column>
            <el-table-column fixed  prop="idCardNo" label="身份证" width="185"></el-table-column>
            <el-table-column fixed  prop="materials" label="材料内容" width="180"></el-table-column>
            <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
            <el-table-column prop="iventory" label="入库" width="88" ></el-table-column>
            <el-table-column prop="comment" label="备注" ></el-table-column>
          </el-table-column>
        </el-table>
        <el-table size="mini"
        @selection-change="handleSelectionChange"
        :data="materialsData1"
        stripe border
        style="width: 100%">
        <el-table-column label="证人" align="center">
          <el-table-column  type="selection" width="58"></el-table-column>
          <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
          <el-table-column fixed prop="name"  label="姓名" width="118"></el-table-column>
          <el-table-column fixed  prop="idCardNo" label="身份证" width="185"></el-table-column>
          <el-table-column fixed  prop="materials" label="材料内容" width="180"></el-table-column>
          <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
          <el-table-column prop="iventory" label="入库" width="88" ></el-table-column>
          <el-table-column prop="comment" label="备注" ></el-table-column>
        </el-table-column>
      </el-table>
      <el-table size="mini"
      @selection-change="handleSelectionChange"
      :data="materialsData1"
      stripe border
      style="width: 100%">
      <el-table-column label="嫌疑人" align="center">
        <el-table-column  type="selection" width="58"></el-table-column>
        <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
        <el-table-column fixed prop="name"  label="姓名" width="118"></el-table-column>
        <el-table-column fixed  prop="idCardNo" label="身份证" width="185"></el-table-column>
        <el-table-column fixed  prop="materials" label="材料内容" width="180"></el-table-column>
        <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
        <el-table-column prop="iventory" label="入库" width="88" ></el-table-column>
        <el-table-column prop="comment" label="备注" ></el-table-column>
      </el-table-column>
    </el-table>
    <el-table size="mini"
    @selection-change="handleSelectionChange"
    :data="materialsData"
    stripe border
    style="width: 100%">
    <el-table-column label="其他" align="center">
      <el-table-column  type="selection" width="58"></el-table-column>
      <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
      <el-table-column fixed prop="result"  label="名称" width="118"></el-table-column>
      <el-table-column fixed  prop="name" label="规格" width="85"></el-table-column>
      <el-table-column fixed  prop="visittime" label="数量" width="180"></el-table-column>
      <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
      <el-table-column prop="telnum" label="入库" width="88" ></el-table-column>
      <el-table-column prop="visitfor" label="备注" ></el-table-column>
    </el-table-column>
  </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="putinVisible = false">确认入库</el-button>
          <el-button @click="putinVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
  
      <!-- 编辑案件材料弹框 -->
      <el-dialog
        title="编辑案件材料"
        :visible="editVisible"
        @close="editVisible=false"
        width="60%">
        <el-table size="mini" class="tb-edit"
          highlight-current-row
          @selection-change="handleSelectionChange"
          :data="materialsData"
          stripe border
          style="width: 100%">
          <el-table-column label="受害人" align="center">
            <el-table-column  label="选择" width="58">
              <template slot-scope="scope">
                  <el-button icon="el-icon-remove" circle v-if="!scope.row.isLast" @click=removeMaterials(scope.$index)></el-button>
                  <el-button icon="el-icon-circle-plus" circle v-else @click="addMaterials"></el-button>
              </template>
            </el-table-column>
            <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
            <el-table-column fixed prop="name"  label="姓名" width="118">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.name"></el-input>
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed  prop="idCardNo" label="身份证" width="185">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.idCardNo"></el-input>
                <span>{{scope.row.idCardNo}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed  prop="materials" label="材料内容" width="180">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.materials"></el-input>
                <span>{{scope.row.materials}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
            <el-table-column prop="iventory" label="入库" width="88" >
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.iventory"></el-input>
                <span>{{scope.row.iventory}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注" >
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.comment"></el-input>
                <span>{{scope.row.comment}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table size="mini" class="tb-edit"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :data="materialsData"
        stripe border
        style="width: 100%">
        <el-table-column label="证人" align="center">
          <el-table-column  label="选择" width="58">
            <template slot-scope="scope">
                <el-button icon="el-icon-remove" circle v-if="!scope.row.isLast" @click=removeMaterials(scope.$index)></el-button>
                <el-button icon="el-icon-circle-plus" circle v-else @click="addMaterials"></el-button>
            </template>
          </el-table-column>
          <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
          <el-table-column fixed prop="name"  label="姓名" width="118">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.name"></el-input>
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed  prop="idCardNo" label="身份证" width="185">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.idCardNo"></el-input>
              <span>{{scope.row.idCardNo}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed  prop="materials" label="材料内容" width="180">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.materials"></el-input>
              <span>{{scope.row.materials}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
          <el-table-column prop="iventory" label="入库" width="88" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.iventory"></el-input>
              <span>{{scope.row.iventory}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.comment"></el-input>
              <span>{{scope.row.comment}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table size="mini" class="tb-edit"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :data="materialsData"
      stripe border
      style="width: 100%">
      <el-table-column label="嫌疑人" align="center">
        <el-table-column  label="选择" width="58">
          <template slot-scope="scope">
              <el-button icon="el-icon-remove" circle v-if="!scope.row.isLast" @click=removeMaterials(scope.$index)></el-button>
              <el-button icon="el-icon-circle-plus" circle v-else @click="addMaterials"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
        <el-table-column fixed prop="name"  label="姓名" width="118">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.name"></el-input>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed  prop="idCardNo" label="身份证" width="185">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.idCardNo"></el-input>
            <span>{{scope.row.idCardNo}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed  prop="materials" label="材料内容" width="180">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.materials"></el-input>
            <span>{{scope.row.materials}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
        <el-table-column prop="iventory" label="入库" width="88" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.iventory"></el-input>
            <span>{{scope.row.iventory}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="备注" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.comment"></el-input>
            <span>{{scope.row.comment}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table size="mini"
    @selection-change="handleSelectionChange"
    :data="tableData"
    stripe border
    style="width: 100%">
    <el-table-column label="其他" align="center">
      <el-table-column  type="selection" width="58"></el-table-column>
      <el-table-column fixed  label="序号" type="index" width="55"></el-table-column>
      <el-table-column fixed prop="result"  label="名称" width="118"></el-table-column>
      <el-table-column fixed  prop="name" label="规格" width="85"></el-table-column>
      <el-table-column fixed  prop="visittime" label="数量" width="180"></el-table-column>
      <!-- <el-table-column prop="casetype" label="来访次数" width="88" ></el-table-column> -->
      <el-table-column prop="telnum" label="入库" width="88" ></el-table-column>
      <el-table-column prop="visitfor" label="备注" ></el-table-column>
    </el-table-column>
  </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editVisible = false">保 存</el-button>
          <el-button @click="editVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
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
        pandect: true,
        state: '未入库',
        searchTxt: '',
        putinVisible: false,
        editVisible: false,
        tableData: null,
        tableData1: null,
        materialsData: [],
        loading: true,
        multipleSelection: [],
        multipleSelection1: [],
        curPage: 1,
        pageNum: 10,
        pageCount: 5,
        tablTest: [{isLast: false},{isLast:true}]
      },
      computed: {
        materialsData1 () {
          return this.materialsData.filter(item => {
                  return !item.isLast
                })
        }
      },
      created() {
        this.getLists()
        this.materialsData = this.mockMaterialsData()
        console.log(this.materialsData)
      },
      methods: {
        toPutin() {
          this.putinVisible = true
        },
        toVisit () {
          this.editVisible = true
        },
        getLists() {
          // let url = 'getCaseVisit.do?method=getMyCaseVisitList&curPage=' + this.curPage + '&pageNum=' + this.pageNum + '&contain=' + this.searchTxt
          // axios.post(url).then(res => {
          // let data = res.data
          // this.tableData = data.list
          // this.pageCount = data.pageCount
          // this.loading = false
          // }).catch(err => {
          // this.loading = false
          // })
          
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.tableData = this.mockData()
            this.tableData1 = this.mockData1()
          },1000)
  
        },
        search() {
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
        editVisit(uuid) {
          var url = "${ctx}/getCaseVisit.do?method=toVisitEdit&uuid=" + uuid + '&editType=update'
          matech.openTab(uuid, "来访情况登记表" + uuid, url, true, parent);
        },
        handleSelectionChange(val) {
          this.multipleSelection = val
        },
        handleSelectionChange1(val) {
          this.multipleSelection1 = val
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`)
          this.curPage = val
          this.getLists()
        },
        changePandect () {
          this.pandect = !this.pandect
        },
        removeMaterials (index) {
          this.materialsData.splice(index, 1)
        },
        addMaterials () {
          let temp = this.materialsData[this.materialsData.length-1]
          this.materialsData[this.materialsData.length-1] = {
              isLast: false,
              name: '',
              idCardNo: '',
              materials: '',
              iventory: '',
              comment: ''
            }
            this.materialsData.push(temp)
        },
        mockData() {
          let arr = []
          for (let index = 0; index < 4; index++) {
            arr.push({
              caseNo: '0246515',
              caseName: '偷窃案',
              alarmTime: '2018-03-25',
              state: '刑事案件',
              police: '张某某',
              caseState: 'qwqwqw',
              handDate: '2018-03-02',
              handName: '王某某',
              comment: '******',
              pending: 5
            })
          }
          return arr
        },
        mockData1() {
          let arr = []
          for (let index = 0; index < 4; index++) {
            arr.push({
              caseNo: '0246515',
              caseName: '偷窃案',
              victim: '陈某某',
              witness: '李某某',
              suspect: '张某某',
              idCardNo: 4401583459909374858,
              materials: '****',
              other: '手机',
              specification: '华为',
              number: 1,
              comment: '******',
              iventory: '未入库',
              handed: '未移交' 
            })
          }
          return arr
        },
        mockMaterialsData () {
          let arr = []
          for (let index = 0; index <2; index++) {
            arr.push({
              isLast: false,
              name: '陈某某',
              idCardNo: 4401583459909374858,
              materials: '****',
              iventory: '未入库',
              comment: '******'
            })
          }
          arr.push({
              isLast: true,
              name: '',
              idCardNo: '',
              materials: '',
              iventory: '',
              comment: ''
            })
          console.log(arr)
          return arr
        }
      },
      watch: {
        'pandect': function(val) {
          console.log('pandect:', val)
          this.curPage = 1
          this.getLists()
        }
      }
    })
  </script>
</html>