<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>扣押物品登记</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/element-ui.index.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/tws/css/el-table-style.css">
<style>
    .visit-container {
      width: 1280px;
      margin: 20px auto 0;
    }
    .el-tabs {
      background-color: #f5f5f5;
      border-radius: 20px;
    }
    .el-tabs__header, .el-tabs__nav-wrap {
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
    .visit-section > legend {
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

    /* 可编辑表格的处理 */
    .tb-edit .el-input {
        display: none;
    }
    .tb-edit .current-row .el-input {
        display: block;
    }
    .tb-edit .current-row .el-input+span {
        display: none;
    }

  </style>
</head>
<body>
    <div id="app" class="visit-container">
        <el-tabs type="border-card">
          <el-tab-pane label="扣押物品信息">
              <el-form size="mini" :model="ruleForm" 
                 ref="ruleForm" label-width="108px" >
                <!-- 基本情况 -->
                <fieldset class="visit-section">
                  <legend>基本情况</legend>
                  <el-row>
                    <el-col>
                      <el-form-item label="案件编号">
                          <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col>
                        <el-form-item label="案件性质">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  <el-row >
                    <el-col :span="6">
                          <el-form-item prop="visittime" label="扣押时间">
                              <el-date-picker type="datetime" placeholder="选择时间" 
                                v-model="ruleForm.visittime" style="width: 100%;"
                                default-time="12:00:00"></el-date-picker>
                            </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                      <el-form-item  label="扣押执行人" >
                          <el-input v-model="ruleForm.idcardnum" ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                      <el-form-item  label="见证人">
                          <el-input v-model="ruleForm.idcardnum" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                        <el-form-item label="状态">
                            <el-input></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
    
                </fieldset>
                <!-- 报案人-受害人信息 -->
                <fieldset class="visit-section">
                  <legend>办案任务</legend>
                  <el-button type="primary" @click="resetForm('ruleForm')">新 增</el-button>
                  <el-button type="primary" @click="resetForm('ruleForm')">删 除</el-button>
                  <el-table stripe border size="small" :data="tableData" style="width: 100%" class="tb-edit" highlight-current-row>
                    <el-table-column type="selection" label="选择" width="58"></el-table-column>
                    <el-table-column prop="name" label="编号" width="180" align="center">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.name" @change="handleEdit(scope.$index, scope.row)"></el-input>
                            <span>{{scope.row.name}}</span> 
                          </template>
                    </el-table-column>
                    <el-table-column  label="物品名称" width="180" align="center">
                      <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.telnum" @change="handleEdit(scope.$index, scope.row)"></el-input>
                        <span>{{scope.row.telnum}}</span> 
                      </template>
                    </el-table-column>
                    <el-table-column prop="visitfor" label="数量" width="180" align="center">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.visitfor" @change="handleEdit(scope.$index, scope.row)"></el-input>
                          <span>{{scope.row.visitfor}}</span> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="visittime" label="特征" width="180" align="center">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.visittime" @change="handleEdit(scope.$index, scope.row)"></el-input>
                            <span>{{scope.row.visittime}}</span> 
                          </template>
                    </el-table-column>
                    <el-table-column prop="reply" label="备注" align="center">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.reply" @change="handleEdit(scope.$index, scope.row)"></el-input>
                            <span>{{scope.row.reply}}</span> 
                          </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="删除" min-width="120">
                        <template slot-scope="scope">
                          <!-- <el-button type="text" @click="remove(scope.row.uuid)">编辑</el-button> -->
                          <el-button type="text" @click="remove(scope.row.uuid)">删除</el-button>
                        </template>
                      </el-table-column>
                  </el-table>
                </fieldset>  
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="visit-submit">
          <el-button type="primary" @click="resetForm('ruleForm')">保 存</el-button>
          <el-button type="warning" @click="resetForm('ruleForm')">关 闭</el-button>
        </div>
    
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
        value: '',
        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
        state1: '',
        tableData: [{
            name: '王小虎',
            telnum: '13112345678',
            visitfor: '上海市普陀区金沙江路 1518 弄',
            visittime: '2018-03-08',
            reply: '上海市普陀区金沙江路 1518'
          },{
            name: '王小虎',
            telnum: '13112345678',
            visitfor: '上海市普陀区金沙江路 1518 弄',
            visittime: '2018-03-08',
            reply: '上海市普陀区金沙江路 1518'
          }],
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
        }
      },
      created() {
  
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
      },
      watch: {
      
      }
    })
  </script>
</html>