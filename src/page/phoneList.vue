<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="部门名称">
				<el-input v-model="formData.phoneName" placeholder="部门名称"></el-input>
			  </el-form-item>
			  <el-form-item label="所属级别">
				<el-select v-model="formData.phoneLevel" placeholder="所属级别">
					<el-option label="全部" value=""></el-option>
					<el-option label="校级" value="0"></el-option>
					<el-option label="院级" value="1"></el-option>
					<el-option label="校园商铺" value="2"></el-option>
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
				<el-button type="primary" @click="getPhones">查询</el-button>
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
                  width="60">
                </el-table-column>
				<el-table-column
                  property="phoneBookId"
                  label="记录id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="phoneName"
                  label="部门名称"
				  align="center"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="phoneLevelCode"
                  label="所属级别"
				  align="center"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="phoneLevelDesc"
                  label="所属级别"
				  align="center"
				  width="100">
                </el-table-column>
				<el-table-column
                  property="phoneNumber"
                  label="联系方式"
				  align="center"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="statusCode"
                  label="状态Code"
				  align="center"
                  v-if="true">
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
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
		<!-- Form -->
		<div>
			<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
				<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="editForm">
					  <el-form-item label="部门名称" prop="phoneName">
						<el-input v-model="editForm.phoneName"></el-input>
					  </el-form-item>
					  <el-form-item label="联系方式" prop="phoneNumber">
						<el-input v-model="editForm.phoneNumber"></el-input>
					  </el-form-item>
					  <el-form-item label="所属级别" prop="phoneLevel">
						<el-select v-model="editForm.phoneLevel" placeholder="请选择所属级别">
							<el-option label="校级" value="0"></el-option>
							<el-option label="院级" value="1"></el-option>
							<el-option label="校园商铺" value="2"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="状态" prop="status">
						<el-select v-model="editForm.status" placeholder="状态">
							<el-option label="失效" value="0"></el-option>
							<el-option label="有效" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" @click="submitForm('editForm')">保存</el-button>
						<el-button @click="dialogFormVisible = false">取消</el-button>
					  </el-form-item>
				</el-form>
				
			</el-dialog>
		</div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getPhoneList,updatePhone} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                pageNum: 0,
                pageSize: 10,
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				formData: {
				  phoneName: '',
				  phoneLevel: '',
				  status: ''
				},
				editForm: {
				  phoneName: '',
				  phoneNumber: '',
				  phoneLevel: '',
				  status: '',
				  phoneBookId: ''
				},
				rules: {
				  phoneName: [
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  phoneNumber: [
					{ required: true, message: '请选择部门电话', trigger: 'change' }
				  ],
				  phoneLevelCode: [
					{ required: true, message: '请选择部门级别', trigger: 'change' }
				  ],
				  statusCode: [
					{ required: true, message: '请输入状态', trigger: 'change' }
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
					const countData = await getPhoneList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getPhones();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.pageNum = (val);
                this.getPhones()
            },
            async getPhones(){
                const data = await getPhoneList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					phoneName: this.formData.phoneName,
					phoneLevel: this.formData.phoneLevel,
					status: this.formData.status
				});
				console.log(data);
                this.tableData = [];
				if(data.status == 0){
					data.rows.forEach(item => {
						const tableData = {};
						tableData.phoneBookId = item.phoneBookId;
						tableData.statusCode = item.statusCode;
						tableData.phoneName = item.phoneName;
						tableData.phoneLevelCode = item.phoneLevelCode;
						tableData.phoneNumber = item.phoneNumber;
						tableData.phoneLevelDesc = item.phoneLevelDesc;
						tableData.statusDesc = item.statusDesc;
						tableData.modifiedTime = item.modifiedTime;
						this.tableData.push(tableData);
					});
					this.count = data.total;
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(row);
				this.editForm.phoneName = row.phoneName;
				this.editForm.phoneNumber = row.phoneNumber;
				this.editForm.phoneLevel = row.phoneLevelCode;
				this.editForm.status = row.statusCode;
				this.editForm.phoneBookId = row.phoneBookId;
				this.dialogFormVisible = true;
				console.log("editForm"+this.editForm)
			},
			submitForm(formName){
				console.log(this.editForm);
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updatePhone(this.editForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getPhones();
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
