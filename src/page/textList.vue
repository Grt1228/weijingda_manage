<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="标题">
				<el-input v-model="formData.textTitle" placeholder="标题"></el-input>
			  </el-form-item>
			  <el-form-item label="类别">
				<el-select v-model="formData.textType" placeholder="类别">
					<el-option label="全部" value=""></el-option>
					<el-option label="通知" value="0"></el-option>
					<el-option label="其他" value="1"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="状态">
				<el-select v-model="formData.status" placeholder="状态">
					<el-option label="全部" value=""></el-option>
					<el-option label="失效" value="0"></el-option>
					<el-option label="有效" value="1"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getTexts">查询</el-button>
			  </el-form-item>
			</el-form>
		</div>	
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
				  align="center"
                  width="50">
                </el-table-column>
				<el-table-column
                  property="appTextId"
                  label="新闻id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="textTitle"
                  label="标题"
				  align="center"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="textType"
                  label="类别"
				  align="center"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="textTypeDesc"
                  label="类别"
				  align="center"
				  width="100">
                </el-table-column>
				
				<el-table-column
                  property="status"
                  label="状态Code"
				  align="center"
                  v-if="false">
                </el-table-column>
				<el-table-column
                  property="modifiedTime"
                  label="修改时间"
				  align="center"
                  width="200">
                </el-table-column>
				<el-table-column
                  property="statusDesc"
                  label="状态"
				  align="center"
                  width="100">
                </el-table-column>
				<el-table-column
                  property="textContext"
                  label="内容"
				  align="center"
                  v-if="false">
                </el-table-column>
				<el-table-column label="操作" align="center" >
				  <template slot-scope="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				  </template>
				</el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
		<!-- Form -->
		<div>
			<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
				<el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="100px" class="detailForm">
					  <el-form-item label="文本标题" prop="textTitle">
						<el-input v-model="detailForm.textTitle"></el-input>
					  </el-form-item>
					  <el-form-item label="类别" prop="textType">
						<el-select v-model="detailForm.textType" placeholder="请选择类别">
							<el-option label="通知" value="0"></el-option>
							<el-option label="其他" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="状态" prop="status">
						<el-select v-model="detailForm.status" placeholder="状态">
							<el-option label="失效" value="0"></el-option>
							<el-option label="有效" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="文本内容" prop="textContext">
						<el-input type="textarea" v-model="detailForm.textContext"></el-input>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" @click="submitForm('detailForm')">保存</el-button>
						<el-button @click="dialogFormVisible = false">取消</el-button>
					  </el-form-item>
				</el-form>
				
			</el-dialog>
		</div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getTextList,updateText} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                pageNum: 0,
                pageSize: 20,
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				formData: {
				  textTitle: '',
				  textType: '',
				  status: ''
				},
				detailForm: {
				  textTitle: '',
				  textType: '',
				  status: '',
				  textContext: '',
				  appTextId: ''
				},
				rules: {
				  textTitle: [
					{ required: true, message: '请输入标题', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  textType: [
					{ required: true, message: '请选择文本类型', trigger: 'change' }
				  ],
				  textContext: [
					{ required: true, message: '请填写文本详情', trigger: 'blur' }
				  ]
				}
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
					const countData = await getTextList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getTexts();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.pageNum = (val - 1);
                this.getTexts()
            },
            async getTexts(){
                const data = await getTextList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					textTitle: this.formData.textTitle,
					newDate: this.formData.newDate,
					textType: this.formData.textType,
					status: this.formData.status
					
				});
                this.tableData = [];
				if(data.status == 0){
						data.rows.forEach(item => {
						const tableData = {};
						tableData.appTextId = item.appTextId;
						tableData.status = item.status;
						tableData.textTitle = item.textTitle;
						tableData.textType = item.textType;
						tableData.textTypeDesc = item.textTypeDesc;
						tableData.statusDesc = item.statusDesc;
						tableData.textContext = item.textContext;
						tableData.modifiedTime = item.modifiedTime;
						this.tableData.push(tableData);
					})
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(row);
				this.detailForm.status = row.status;
				this.detailForm.textTitle = row.textTitle;
				this.detailForm.textType = row.textType;
				this.detailForm.textContext = row.textContext;
				this.detailForm.appTextId = row.appTextId;
				this.dialogFormVisible = true;
			},
			submitForm(formName){
				console.log(this.detailForm);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updateText(this.detailForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getTexts();
						}else{
							this.$message({
								type: 'success',
								message: data.msg
							});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});			
				this.dialogFormVisible = false;
			}
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
	.form_container{
		padding-top: 20px ;
		padding-left: 40px ;
	}
</style>
