<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="组类别">
				<el-select
					 v-model="formData.mapGroupId"
					 placeholder="请输入关键词"
					 >
					 <el-option
						 v-for="item in groupTypeList"
						 :key="item.mapGroupName"
						 :label="item.mapGroupName"
						 :value="item.mapGroupId">
					 </el-option>
				</el-select>
			  </el-form-item>
			  
			  <el-form-item label="点类别">
				<el-select v-model="formData.pointType" placeholder="类别">
					<el-option label="全部" value=""></el-option>
					<el-option label="普通点" value="0"></el-option>
					<el-option label="线路点" value="1"></el-option>
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
				<el-button type="primary" @click="getPoints">查询</el-button>
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
                  property="mapPointId"
                  label="点id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="mapPointName"
                  label="点名称"
				  align="center"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="pointType"
                  label="点类别"
				  align="center"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="pointTypeDesc"
                  label="点类别"
				  align="center"
				  width="100">
                </el-table-column>
				<el-table-column
                  property="mapPointLongitude"
                  label="经度"
				  align="center"
				  width="100"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="mapPointLatitude"
                  label="纬度"
				  align="center"
				  width="100"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="sort"
                  label="排序号"
				  align="center"
                  width="150"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="mapPointDesc"
                  label="点描述"
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
                  property="mapGroupName"
                  label="组名称"
				  align="center"
                >
                </el-table-column>
				<el-table-column
                  property="mapGroupId"
                  label="组id"
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
                  :page-size="10"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
		<!-- Form -->
		<div>
			<el-dialog title="修改信息" :visible.sync="dialogFormVisible">
				<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
					  <el-form-item label="点名称" prop="mapPointName">
						<el-input v-model="addForm.mapPointName"></el-input>
					  </el-form-item>
					  <el-form-item label="点描述" prop="mapPointDesc">
						<el-input v-model="addForm.mapPointDesc"></el-input>
					  </el-form-item>
					  <el-form-item label="点类别" prop="pointType">
						<el-select v-model="addForm.pointType" placeholder="请选择点类别" @change="changePointType">
							<el-option label="普通点" value="0"></el-option>
							<el-option label="线路点" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="点经度" prop="mapPointLongitude">
						<el-input v-model="addForm.mapPointLongitude"></el-input>
					  </el-form-item>
					  <el-form-item label="点纬度" prop="mapPointLatitude">
						<el-input v-model="addForm.mapPointLatitude"></el-input>
					  </el-form-item>
					  <el-form-item label="组类别" prop="mapGroupId">
						<el-select v-model="addForm.mapGroupId" placeholder="请选择点类别">
							<el-option
								 v-for="item in groupTypeList"
								 :key="item.mapGroupName"
								 :label="item.mapGroupName"
								 :value="item.mapGroupId">
							</el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="排序号" prop="sort">
						<el-input v-model="addForm.sort" placeholder="路线类别填写" :disabled="tag" ></el-input>
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
    import {getPointList,updatePoint,getMapGroupList} from '@/api/getData'
    export default {
        data(){
            return {
				tag: false,
				groupTypeList: [],
                tableData: [],
                currentRow: null,
                pageNum: 1,
                pageSize: 10,
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				formData: {
				  pointType: '',
				  status: '',
				  mapGroupId: ''
				},
				addForm: {
				  mapPointId: '',
				  mapPointName: '',
				  mapPointLongitude: '',
				  mapPointLatitude: '',
				  mapPointDesc: '',
				  pointType: '',
				  sort: '',
				  status: '',
				  mapGroupId: ''
				},
				rules: {
				  mapPointName: [
					{ required: true, message: '请输入点名称', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				  ],
				  pointType: [
					{ required: true, message: '请选点类型', trigger: 'change' }
				  ],
				  mapGroupId: [
					{ required: true, message: '请输入组类别', trigger: 'change' }
				  ],
				  mapPointLongitude: [
					{ required: true, message: '请输入经度', trigger: 'change' }
				  ],
				  mapPointLatitude: [
					{ required: true, message: '请输入纬度', trigger: 'change' }
				  ],
				  status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
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
					//数据列表
					const countData = await getPointList({pageNum: 0, pageSize: 1});
					if (countData.status == 0) {
						this.count = countData.total;
					}else{
						throw new Error('获取数据失败');
					}
					this.getPoints();
					//组列表
					const groupData = await getMapGroupList({
						pageNum: 0, 
						pageSize: 100,
					});
					if (groupData.status == 0) {
						groupData.rows.forEach(item => {
							const oneGroupType = {};
							oneGroupType.mapGroupName = item.mapGroupName;
							oneGroupType.mapGroupId = item.mapGroupId;
							this.groupTypeList.push(oneGroupType);
						})
                    }else{
                        throw new Error('获取组类别数据失败');
                    }
					
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			changePointType(value){
				if(value==1){
					this.tag = true
				}
				console.log(value)
			},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.pageNum = (val);
                this.getPoints()
            },
            async getPoints(){
                const data = await getPointList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					mapGroupId: this.formData.mapGroupId,
					pointType: this.formData.pointType,
					status: this.formData.status
					
				});
                this.tableData = [];
				if(data.status == 0){
					data.rows.forEach(item => {
						const tableData = {};
						tableData.mapPointId = item.mapPointId;
						tableData.mapPointName = item.mapPointName;
						tableData.mapPointLongitude = item.mapPointLongitude;
						tableData.mapPointLatitude = item.mapPointLatitude;
						tableData.mapPointDesc = item.mapPointDesc;
						tableData.pointType = item.pointType;
						tableData.pointTypeDesc = item.pointTypeDesc;
						tableData.mapGroupName = item.mapGroupName;
						tableData.mapGroupId = item.mapGroupId;
						tableData.sort = item.sort;
						tableData.status = item.status;
						tableData.statusDesc = item.statusDesc;
						tableData.modifiedTime = item.modifiedTime;
						this.tableData.push(tableData);
					})
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(row);
				this.addForm.mapPointId = row.mapPointId;
				this.addForm.mapPointName = row.mapPointName;
				this.addForm.mapPointDesc = row.mapPointDesc;
				this.addForm.pointType = row.pointType;
				this.addForm.sort = row.sort;
				this.addForm.status = row.status;
				this.addForm.mapGroupId = row.mapGroupId;
				this.addForm.mapPointLongitude = row.mapPointLongitude;
				this.addForm.mapPointLatitude = row.mapPointLatitude;
				this.dialogFormVisible = true;
			},
			submitForm(formName){
				console.log(this.addForm);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updatePoint(this.addForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getPoints();
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
