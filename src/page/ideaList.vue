<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="学号">
				<el-input v-model="formData.loginName" placeholder="学号"></el-input>
			  </el-form-item>
				<el-button type="primary" @click="getIdeas">查询</el-button>
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
                  property="loginName"
                  label="学号"
				  align="center"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="studentName"
                  label="反馈人"
				  align="center"
                  width="150">
                </el-table-column>
				<el-table-column
                  property="createTime"
                  label="反馈时间"
				  align="center"
                  width="200">
                </el-table-column>
				<el-table-column
                  property="ideaDetail"
                  label="反馈内容"
				  align="center"
                  v-if="false">
                </el-table-column>
				<el-table-column label="操作" align="center" >
				  <template slot-scope="scope">
					<el-button type="info" 
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">详细内容</el-button>
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
			<el-dialog title="详细内容" :visible.sync="dialogFormVisible">
				<el-form :model="detailForm" ref="detailForm" label-width="100px" class="detailForm" >
					  <el-form-item label="学号" prop="loginName">
						<el-input v-model="detailForm.loginName" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="反馈人" prop="studentName">
						<el-input v-model="detailForm.studentName":disabled="true" ></el-input>
					  </el-form-item>
					  <el-form-item label="反馈时间" prop="createTime">
						<el-input v-model="detailForm.createTime" :disabled="true" ></el-input>
					  </el-form-item>
					  <el-form-item label="反馈内容" prop="ideaDetail">
						<el-input type="textarea" v-model="detailForm.ideaDetail" :disabled="true" ></el-input>
					  </el-form-item>
					  <el-form-item>
						<el-button @click="dialogFormVisible = false" type="primary" >关闭</el-button>
					  </el-form-item>
				</el-form>
				
			</el-dialog>
		</div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getIdeaList} from '@/api/getData'
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
				  loginName: ''
				},
				detailForm: {}
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
					const countData = await getIdeaList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getIdeas();
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
                this.getIdeas()
            },
            async getIdeas(){
                const data = await getIdeaList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					loginName: this.formData.loginName
				});
                this.tableData = [];
				if(data.status == 0){
						data.rows.forEach(item => {
						const tableData = {};
						tableData.loginName = item.loginName;
						tableData.studentName = item.studentName;
						tableData.ideaDetail = item.ideaDetail;
						tableData.createTime = item.createTime;
						this.tableData.push(tableData);
					})
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(row);
				this.detailForm = row;
				this.dialogFormVisible = true;
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
