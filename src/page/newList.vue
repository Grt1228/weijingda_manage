<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="标题">
				<el-input v-model="formData.newTitle" placeholder="标题"></el-input>
			  </el-form-item>
			  <el-form-item label="类别">
				<el-select v-model="formData.newType" placeholder="类别">
					<el-option label="全部" value=""></el-option>
					<el-option label="校园新闻" value="1"></el-option>
					<el-option label="通知公告" value="2"></el-option>
					<el-option label="学术讲座" value="3"></el-option>
					<el-option label="科研信息" value="4"></el-option>
					<el-option label="教务通知" value="5"></el-option>
					<el-option label="学院动态" value="6"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="状态">
				<el-select v-model="formData.newStatus" placeholder="状态">
					<el-option label="全部" value=""></el-option>
					<el-option label="失效" value="0"></el-option>
					<el-option label="有效" value="1"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="创建时间">
				<el-input v-model="formData.newDate" placeholder="创建时间"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getNews">查询</el-button>
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
                  property="newId"
                  label="新闻id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="newTitle"
                  label="标题"
				  align="center"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="newType"
                  label="类别"
				  align="center"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="newTypeDesc"
                  label="类别"
				  align="center"
				  width="100">
                </el-table-column>
				<el-table-column
                  property="newDate"
                  label="创建日期"
				  align="center"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="newCreater"
                  label="发布人"
				  align="center"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="newStatus"
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
                  property="newStatusDesc"
                  label="状态"
				  align="center"
                  width="100">
                </el-table-column>
				<el-table-column
                  property="newDetail"
                  label="状态"
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
				<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
					  <el-form-item label="新闻标题" prop="newTitle">
						<el-input v-model="addForm.newTitle"></el-input>
					  </el-form-item>
					  <el-form-item label="新闻发布人" prop="newCreater">
						<el-input v-model="addForm.newCreater"></el-input>
					  </el-form-item>
					  <el-form-item label="新闻类别" prop="newType">
						<el-select v-model="addForm.newType" placeholder="请选择新闻类别">
							<el-option label="校园新闻" value="1"></el-option>
							<el-option label="通知公告" value="2"></el-option>
							<el-option label="学术讲座" value="3"></el-option>
							<el-option label="科研信息" value="4"></el-option>
							<el-option label="教务通知" value="5"></el-option>
							<el-option label="学院动态" value="6"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="新闻日期" required>
						<el-col :span="11">
						  <el-form-item prop="newDate">
							<el-input v-model="addForm.newDate" placeholder="输入汉子格式日期" style="width: 100%;" ></el-input>
						  </el-form-item>
						</el-col>
					  </el-form-item>
					  <el-form-item label="新闻状态" prop="newStatus">
						<el-select v-model="addForm.newStatus" placeholder="状态">
							<el-option label="失效" value="0"></el-option>
							<el-option label="有效" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="新闻内容" prop="newDetail">
						<el-input type="textarea" v-model="addForm.newDetail"></el-input>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" @click="submitForm('addForm')">保存</el-button>
						<el-button @click="dialogFormVisible = false">取消</el-button>
					  </el-form-item>
				</el-form>
				
			</el-dialog>
		</div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getNewList,updateNew} from '@/api/getData'
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
				  newTitle: '',
				  newCreater: '',
				  newType: '',
				  newDate: '',
				  newStatus: '',
				  newDetail: ''
				},
				addForm: {
				  newTitle: '',
				  newCreater: '',
				  newType: '',
				  newDate: '',
				  newStatus: '',
				  newDetail: '',
				  newId: ''
				},
				rules: {
				  newTitle: [
					{ required: true, message: '请输入新闻标题', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  newCreater: [
					{ required: true, message: '请选择新闻发布人', trigger: 'change' }
				  ],
				  newType: [
					{ required: true, message: '请选择新闻类型', trigger: 'change' }
				  ],
				  newDate: [
					{ required: true, message: '请输入新闻时间', trigger: 'change' }
				  ],
				  newDetail: [
					{ required: true, message: '请填写新闻详情', trigger: 'blur' }
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
					const countData = await getNewList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getNews();
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
                this.getNews()
            },
            async getNews(){
                const data = await getNewList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					newTitle: this.formData.newTitle,
					newDate: this.formData.newDate,
					newType: this.formData.newType,
					newStatus: this.formData.newStatus
					
				});
                this.tableData = [];
				if(data.status == 0){
						data.rows.forEach(item => {
						const tableData = {};
						tableData.newId = item.newId;
						tableData.newDate = item.newDate;
						tableData.newStatus = item.newStatus;
						tableData.newTitle = item.newTitle;
						tableData.newType = item.newType;
						tableData.newCreater = item.newCreater;
						tableData.newTypeDesc = item.newTypeDesc;
						tableData.newStatusDesc = item.newStatusDesc;
						tableData.newDetail = item.newDetail;
						tableData.modifiedTime = item.modifiedTime;
						this.tableData.push(tableData);
					})
					this.count = data.total;
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(row);
				this.addForm.newTitle = row.newTitle;
				this.addForm.newCreater = row.newCreater;
				this.addForm.newType = row.newType;
				this.addForm.newDate = row.newDate;
				this.addForm.newStatus = row.newStatus;
				this.addForm.newDetail = row.newDetail;
				this.addForm.newId = row.newId;
				this.dialogFormVisible = true;
			},
			submitForm(formName){
				console.log(this.addForm);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updateNew(this.addForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getNews();
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
