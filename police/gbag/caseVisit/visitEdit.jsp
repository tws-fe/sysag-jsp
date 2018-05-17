<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>

        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>来访登记信息表</title>
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
            </style>
        </head>

        <body>
            <div id="app" class="visit-container">
                <el-tabs type="border-card">
                    <el-tab-pane label="来访情况登记表">
                        <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <!-- 案件信息 -->
                            <fieldset class="visit-section">
                                <legend>案件信息</legend>
                                <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="操作方式" >
                                                <el-radio-group v-model="radio" class="operate-radio-group">
                                                    <el-radio label="1">选择已有案件</el-radio>
                                                    <el-radio label="2">手动输入</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-col>
    
                                    </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="案件编号" prop="casenum">
                                            <el-select v-model="ruleForm.casenum" filterable placeholder="请选择" class="caseno-selection" v-if="radio==1">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-input v-model="ruleForm.casenum" placeholder="请输入内容" v-if="radio==2"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-form-item label="案情简介" prop="caseinfo">
                                    <el-input type="textarea" ref="caseinfo" v-model="ruleForm.caseinfo" :disabled="radio==1&&!uuid"></el-input>
                                </el-form-item>
                            </fieldset>
                            <!-- 来访人员信息 -->
                            <fieldset class="visit-section">
                                <legend>来访人员信息</legend>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="姓名" prop="name">
                                            <el-input v-model="ruleForm.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="身份证号码" prop="idcardnum">
                                            <el-input v-model="ruleForm.idcardnum"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item prop="visittime" label="来访时间">
                                            <el-date-picker type="datetime" placeholder="选择时间" v-model="ruleForm.visittime" style="width: 100%;" default-time="12:00:00" class="datetime-picker"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="性别" prop="sex">
                                            <el-radio-group v-model="ruleForm.sex" class="sex-radio-group">
                                                <el-radio label="男"></el-radio>
                                                <el-radio label="女"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="联系电话" prop="telnum">
                                            <el-input v-model="ruleForm.telnum"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="14">
                                        <el-form-item label="工作单位">
                                            <el-input v-model="ruleForm.workunit"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="14">
                                        <el-form-item label="居住地址">
                                            <el-input v-model="ruleForm.address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="来访事由" prop="visitfor">
                                            <el-input type="textarea" v-model="ruleForm.visitfor"></el-input>
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
                                        <el-form-item label="接访民警" prop="receivecop">
                                            <el-input v-model="ruleForm.receivecop"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" :offset="2">
                                        <el-form-item label="主办民警" prop="auditdirectorname">
                                            <el-input v-model="ruleForm.auditdirectorname"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="前台答复">
                                            <el-input type="textarea" v-model="ruleForm.receivereply"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col>
                                        <el-form-item label="答复内容">
                                            <el-input type="textarea" v-model="ruleForm.reply"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="接访结果" prop="result">
                                            <el-radio-group v-model="ruleForm.result" class="result-radio-group">
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
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button type="primary" @click="resetForm('ruleForm')">发送短信</el-button>
                    <el-button type="warning" @click="resetForm('ruleForm')">关闭</el-button>
                </div>

            </div>
        </body>

        <script src="tws/js/vue.js"></script>
        <script src="tws/js/axios.min.js"></script>
        <!-- 引入组件库 -->
        <script src="tws/js/element-ui.index.js"></script>

        <script>

            let uuid = '${uuid}'
            console.log('uuid: ', uuid)




            let arr11 = [{ "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" }]

            new Vue({
                el: '#app',
                data: {
                    uuid,
                    radio: '1',
                    options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                    value8: '',
                    loading: true,
                    restaurants: [], //案件编号下拉列表
                    tableData: null,
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
                    rules: {
                        casenum: [{ required: true, message: '请选择或填写案件编号', trigger: 'change' }],
                        caseinfo: [{ required: true, message: '请填写案情简介', trigger: 'blur' }],
                        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                        idcardnum: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
                        visittime: [{ required: true, message: '请选择来访时间', trigger: 'change' }],
                        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                        telnum: [
                            { required: true, message: '请输入联系电话', trigger: 'blur' }
                        ],
                        visitfor: [{ required: true, message: '请填写来访事由', trigger: 'blur' }],
                        receivecop: [{ required: true, message: '请填写接访民警', trigger: 'blur' }],
                        auditdirectorname: [{ required: true, message: '请填写主办民警', trigger: 'blur' }],
                        result: [{ required: true, message: '请选择访问结果', trigger: 'change' }]
                    }
                },
                created() {
                    this.getCaseList()
                    if(uuid) {
                        this.getData()
                    }
                },
                methods: {
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
                    getCaseList() {
                        this.loading = true
                        let url =  'getCase.do?method=getCaseList'
                        axios.post(url).then(res => {
                            this.loading = false
                            // this.options = 
                        }).catch(err => {
                            this.loading = false
                        })
                    },
                    createFilter(queryString) {
                        return (restaurant) => {
                            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                        };
                    },
                    querySearch(queryString, cb) {
                        var restaurants = this.restaurants;
                        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        cb(results);
                    },
                    handleIconClick() {
                        // 注意这里的casenum不是原生DOM而是一个vue组件，没有click事件
                        this.$refs['casenum'].focus()
                    },
                    handleSelect(item) {
                        console.log(item);
                        this.ruleForm.casenum = item.value
                    },
                    submitForm(formName) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                alert('submit!');
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    },
                    resetForm(formName) {
                        this.$refs[formName].resetFields();
                    }
                },
                watch: {
                    // 根据案件编号来判断是在列表中选择的还是填写的
                    'ruleForm.casenum': function (val) {
                        let index = this.restaurants.findIndex(item => {
                            return item.value === val
                        })
                        if (index > -1) {
                            this.ruleForm.caseinfo = this.restaurants[index].address
                            this.$refs['caseinfo'].blur()
                        }
                        this.caseIsSelect = index > -1
                    }
                }
            })
        </script>

        </html>