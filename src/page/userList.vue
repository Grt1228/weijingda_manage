<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="学号">
				<el-input v-model="formData.loginName" placeholder="学号"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
				<el-input v-model="formData.studentName" placeholder="姓名"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getUsers">查询</el-button>
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
                  width="100">
                </el-table-column>
                
                <el-table-column
                  property="studentName"
                  label="用户姓名"
				  align="center"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="loginName"
				  align="center"
                  label="学号">
                </el-table-column>
				<el-table-column
                  property="createTime"
				  align="center"
                  label="注册日期"
                  width="220">
                </el-table-column>
				<el-table-column
                  property="statusDesc"
				  align="center"
                  label="状态"
                  width="220">
                </el-table-column>
				<el-table-column label="操作" align="center" >
				  <template slot-scope="scope">
					<el-button type="danger" 
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)" >禁止登陆</el-button>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                pageNum: 0,
                pageSize: 20,
                count: 0,
                currentPage: 1,
				formData: {
				  loginName: '',
				  studentName: ''
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
					const countData = await getUserList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
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
                this.getUsers()
            },
            async getUsers(){
                const data = await getUserList({pageNum: this.pageNum, pageSize: this.pageSize,loginName: this.formData.loginName,studentName: this.formData.studentName});
                this.tableData = [];
				if(data.status == 0){
						data.rows.forEach(item => {
						const tableData = {};
						tableData.loginName = item.loginName;
						tableData.createTime = item.createTime;
						tableData.studentName = item.studentName;
						tableData.statusDesc = item.statusDesc;
						this.tableData.push(tableData);
					})
					this.count = data.total;
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			handleEdit(index, row) {
				console.log(index, row);
			},
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
