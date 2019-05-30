<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="学期">
				<el-date-picker
				  v-model="formData.calendarDate"
				  type=""
				  range-separator="至"
				  start-placeholder="开始月份"
				  end-placeholder="结束月份">
				</el-date-picker>
			  </el-form-item>
			  <el-form-item label="是否当前学期" prop="isCurrentYear">
				<el-select v-model="formData.isCurrentYear" >
					<el-option label="全部" value=""></el-option>
					<el-option label="是" value="0"></el-option>
					<el-option label="否" value="1"></el-option>
				</el-select>
			  </el-form-item>
			  <el-form-item label="年月">
				<el-date-picker
				  v-model="formData.calendarMonth"
				  type="month"
				  format="yyyy-MM"
				  value-format="yyyy-MM"
				  placeholder="选择年份月份">
				</el-date-picker>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getCalendars">查询</el-button>
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
                  property="calendarId"
                  label="日期id"
				  align="center"
				  v-if="false">
                </el-table-column>
                <el-table-column
                  property="calendarDate"
                  label="学期"
				  align="center"
                  width="200">
                </el-table-column>
				<el-table-column
                  property="calendarYear"
                  label="年"
				  align="center"
				  width="100"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="calendarMonth"
                  label="月"
				  align="center"
				  width="100"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="calendarDay"
                  label="日"
				  align="center"
                  width="150"
				  v-if="false">
                </el-table-column>
				<el-table-column
                  property="calendarInfo"
                  label="日期描述"
				  align="center"
				  v-if="false"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="isCurrentYear"
                  label="是否当前学期Code"
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
                  property="isCurrentYearDesc"
                  label="是否当前学期"
				  align="center"
                  width="100">
                </el-table-column>
				
				<el-table-column label="操作" align="center" >
				  <template slot-scope="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button 
					  size="mini" type="danger"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
					  <el-form-item label="学期" prop="calendarDate">
						<el-input v-model="editForm.calendarDate"></el-input>
					  </el-form-item>
					  
					  <el-form-item label="年份" prop="calendarYear">
						<el-input v-model="editForm.calendarYear"></el-input>
					  </el-form-item>
					  <el-form-item label="月份" prop="calendarMonth">
						<el-input v-model="editForm.calendarMonth"></el-input>
					  </el-form-item>
					  
					  <el-form-item label="日期" prop="calendarDay">
						<el-input v-model="editForm.calendarDay"   ></el-input>
					  </el-form-item>
					  <el-form-item label="是否当前学期" prop="isCurrentYear">
						<el-select v-model="editForm.isCurrentYear" >
							<el-option label="是" value="0"></el-option>
							<el-option label="否" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  
					  <el-form-item label="日期描述" prop="calendarInfo">
						<el-input v-model="editForm.calendarInfo"></el-input>
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
    import {getCalendarList,updateCalendar,deleteCalendar} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                pageNum: 1,
                pageSize: 10,
                count: 0,
                currentPage: 1,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				formData: {
				  calendarDate: '',
				  calendarYear: '',
				  calendarMonth: '',
				  isCurrentYear: ''
				},
				editForm: {
				  calendarId: '',
				  calendarDate: '',
				  calendarYear: '',
				  calendarMonth: '',
				  calendarInfo: '',
				  calendarDay: '',
				  isCurrentYear: ''
				},
				rules: {
				  calendarDate: [
					{ required: true, message: '请输入所属学期', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				  ],
				  calendarYear: [
					{ required: true, message: '请选择年份', trigger: 'change' }
				  ],
				  calendarMonth: [
					{ required: true, message: '请选择月份', trigger: 'change' }
				  ],
				  calendarDay: [
					{ required: true, message: '请选择日期', trigger: 'change' }
				  ],
				  isCurrentYear: [
					{ required: true, message: '请选择是否为当前学期', trigger: 'change' }
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
					const countData = await getCalendarList({pageNum: 0, pageSize: 1});
					if (countData.status == 0) {
						this.count = countData.total;
					}else{
						throw new Error('获取数据失败');
					}
					this.getCalendars();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
			deleteRow(index,row){
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning',
				  center: true
				}).then(async () =>  {
					const data = await deletePoint({"calendarId": row.calendarId});
					if(data.isCurrentYear == 0){
						this.$message({
							type: 'success',
							message: data.msg
						});
						this.getCalendars();
					}else{
						this.$message({
							type: 'success',
							message: data.msg
						});
					}
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});
			},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.pageNum = (val);
                this.getCalendars()
            },
            async getCalendars(){
				//calendarDate格式校历学期 2018-09~2019-06
				console.log(this.formData.calendarDate)
                const data = await getCalendarList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					calendarDate: this.formData.calendarDate,
					calendarYear: this.formData.calendarYear,
					calendarMonth: this.formData.calendarMonth,
					isCurrentYear: this.formData.isCurrentYear
					
				});
                this.tableData = [];
				if(data.status == 0){
					data.rows.forEach(item => {
						const tableData = {};
						tableData.calendarId = item.calendarId;
						tableData.calendarDate = item.calendarDate;
						tableData.calendarYear = item.calendarYear;
						tableData.calendarMonth = item.calendarMonth;
						tableData.calendarDay = item.calendarDay;
						tableData.calendarInfo = item.calendarInfo;
						tableData.isCurrentYear = item.isCurrentYear;
						tableData.isCurrentYearDesc = item.isCurrentYearDesc;
						tableData.modifiedTime = item.modifiedTime;
						this.tableData.push(tableData);
					})
					this.count = data.total;
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				this.editForm.calendarId = row.calendarId;
				this.editForm.calendarDate = row.calendarDate;
				this.editForm.calendarInfo = row.calendarInfo;
				this.editForm.calendarDay = row.calendarDay;
				this.editForm.isCurrentYear = row.isCurrentYear;
				this.editForm.calendarYear = row.calendarYear;
				this.editForm.calendarMonth = row.calendarMonth;
				this.dialogFormVisible = true;
			},
			submitForm(formName){
				console.log(this.editForm);
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const data = await updatePoint(this.editForm);
						console.log(data);
						if(data.status == 0){
							this.$message({
								type: 'success',
								message: data.msg
							});
							this.getCalendars();
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
