<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="组名称">
				<el-input v-model="formData.mapGroupName" placeholder="组名称"></el-input>
			  </el-form-item>
			  <el-form-item label="状态">
				<el-select v-model="formData.status" placeholder="状态">
					<el-option label="全部" value=""></el-option>
					<el-option label="失效" value="0"></el-option>
					<el-option label="有效" value="1"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getGroups">查询</el-button>
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
                  property="mapGroupId"
                  label="新闻id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="mapGroupName"
                  label="组名称"
				  align="center"
                  width="200">
                </el-table-column>
				<el-table-column
                  property="mapGroupDesc"
                  label="租描述"
				  align="center"
                  width="150">
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
					  <el-form-item label="组名称" prop="mapGroupName">
						<el-input v-model="addForm.mapGroupName"></el-input>
					  </el-form-item>
					  <el-form-item label="组描述" prop="mapGroupDesc">
						<el-input v-model="addForm.mapGroupDesc"></el-input>
					  </el-form-item>
					  <el-form-item label="状态" prop="status">
						<el-select v-model="addForm.status" placeholder="状态">
							<el-option label="失效" value="0"></el-option>
							<el-option label="有效" value="1"></el-option>
						</el-select>
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
    import {getMapGroupList,updateMapGroup} from '@/api/getData'
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
				  mapGroupName: '',
				  mapGroupDesc: '',
				  status: '',
				},
				addForm: {
				  mapGroupName: '',
				  mapGroupDesc: '',
				  status: '',
				  mapGroupId: ''
				},
				rules: {
				  mapGroupName: [
					{ required: true, message: '请输入租名称', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  mapGroupDesc: [
					{ required: true, message: '请输入租描述', trigger: 'change' }
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
					const countData = await getMapGroupList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getGroups();
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
                this.getGroups()
            },
            async getGroups(){
                const data = await getMapGroupList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					mapGroupName: this.formData.mapGroupName,
					status: this.formData.status
					
				});
                this.tableData = [];
				if(data.status == 0){
						data.rows.forEach(item => {
						const tableData = {};
						tableData.mapGroupId = item.mapGroupId;
						tableData.status = item.status;
						tableData.mapGroupName = item.mapGroupName;
						tableData.mapGroupDesc = item.mapGroupDesc;
						tableData.statusDesc = item.statusDesc;
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
				this.addForm.mapGroupName = row.mapGroupName;
				this.addForm.mapGroupDesc = row.mapGroupDesc;
				this.addForm.status = row.status;
				this.addForm.mapGroupId = row.mapGroupId;
				this.dialogFormVisible = true;
			},
			submitForm(formName){
				console.log(this.addForm);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updateMapGroup(this.addForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getGroups();
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
