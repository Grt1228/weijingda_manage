<template>
    <div class="fillcontain">
        <head-top></head-top>
		<div class="form_container">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
			  <el-form-item label="新闻标题" prop="newId">
					<el-select v-model="newId" placeholder="请选择新闻">
						<el-option
							 v-for="item in newList"
							 :key="item.newTitle"
							 :label="item.newTitle"
							 :value="item.newId">
						</el-option>
					</el-select>
				</el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="getContents">查询</el-button>
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
                  property="content"
                  label="内容"
				  align="center"
                  width="200">
                </el-table-column>
				<el-table-column label="操作" align="center" >
				  <template slot-scope="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
    import {getNewContentList,getNewList,deleteContent} from '@/api/getData'

    export default {
        data(){
            return {
				newList: [],
                tableData: [],
                currentRow: null,
                pageNum: 0,
                pageSize: 20,
                count: 0,
                currentPage: 1,
				formLabelWidth: '120px',
				formData: {
				  newId: ''
				},
				newId: ''
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
					const countData = await getNewContentList({pageNum: 0, pageSize: 1});
                    if (countData.status == 0) {
                        this.count = countData.total;
                    }else{
                        throw new Error('获取数据失败');
                    }
					//新闻标题
					this.getNewTitle();
					//获得新闻列表
                    this.getContents();
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
                this.getContents()
            },
            async getContents(){
                const data = await getNewContentList({
					pageNum: this.pageNum, 
					pageSize: this.pageSize,
					newId: this.newId
					
				});
                this.tableData = [];
				if(data.status == 0){
						data.data.list.forEach(item => {
						const tableData = {};
						tableData.newId = item.newId;
						tableData.content = item.content;
						this.tableData.push(tableData);
					})
					this.count = data.data.total;
				}else{
                    throw new Error('获取数据失败');
                }
                
            },
			async getNewTitle(){
                try{
					//新闻列表
					const newData = await getNewList({
						pageNum: 0, 
						pageSize: 100,
						newStatus: '1'
					});
					if (newData.status == 0) {
						newData.rows.forEach(item => {
							const oneNew = {};
							oneNew.newTitle = item.newTitle;
							oneNew.newId = item.newId;
							this.newList.push(oneNew);
						})
					}else{
						throw new Error('获取新闻标题数据失败');
					}
					
				}catch(err){
					console.log('获取数据失败', err);
				}
                
            },
			handleEdit(index, row) {
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'error',
				  center: true
				}).then( async() =>{
				    const data = await deleteContent({
						newId: row.newId
					});
					if(data.status == 0){
						this.$message({
							type: 'success',
							message: data.msg
						});
						this.getContents();
					}else{
						this.$message({
							type: 'error',
							message: data.msg
						});
					}
				});
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
