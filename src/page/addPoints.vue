<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  <el-form-item label="点名称" prop="mapPointName">
					<el-input v-model="newForm.mapPointName"></el-input>
				  </el-form-item>
				  <el-form-item label="点描述" prop="mapPointDesc">
					<el-input v-model="newForm.mapPointDesc"></el-input>
				  </el-form-item>
				  <el-form-item label="点类别" prop="pointType" >
					<el-select v-model="newForm.pointType" placeholder="请选择点类别" @change="changePointType">
						<el-option label="普通点" value="0"></el-option>
						<el-option label="线路点" value="1"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="点经度" prop="mapPointLongitude">
					<el-input v-model="newForm.mapPointLongitude"></el-input>
				  </el-form-item>
				  <el-form-item label="点纬度" prop="mapPointLatitude">
					<el-input v-model="newForm.mapPointLatitude"></el-input>
				  </el-form-item>
				  <el-form-item label="组类别" prop="mapGroupId">
					<el-select v-model="newForm.mapGroupId" placeholder="请选择点类别">
						<el-option
							 v-for="item in groupTypeList"
							 :key="item.mapGroupName"
							 :label="item.mapGroupName"
							 :value="item.mapGroupId">
						</el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="排序号" >
					<el-input v-model="newForm.sort" placeholder="路线类别填写" :disabled="tag" ></el-input>
				  </el-form-item>
				  <el-form-item label="状态" prop="status">
					<el-select v-model="newForm.status" placeholder="状态">
						<el-option label="失效" value="0"></el-option>
						<el-option label="有效" value="1"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
					<el-button type="primary" @click="submitForm('newForm')">立即创建</el-button>
					<el-button @click="resetForm('newForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script>
  import headTop from '@/components/headTop'
  import {addPoint,getMapGroupList} from '@/api/getData'
  export default {
    data() {
      return {
		tag: false,
		groupTypeList: [],
        newForm: {
          mapPointId: '',
		  mapPointName: '',
		  mapPointLongitude: '',
		  mapPointLatitude: '',
		  mapPointDesc: '',
		  pointType: '',
		  sort: '',
		  status: '0',
		  mapGroupId: ''
        },
        rules: {
		  mapPointName: [
			{ required: true, message: '请输入点名称', trigger: 'blur' },
			{ min: 1, max: 50, message: '长度在 3 到 10 个字符', trigger: 'blur' }
		  ],
		  mapGroupId: [
			{ required: true, message: '请输入组类别', trigger: 'change' }
		  ],
		  pointType: [
			{ required: true, message: '请选点类型', trigger: 'change' }
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
      };
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
		if(value==0){
			this.tag = true
		}else{
			this.tag = false
		}
	  },
      submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
			const data = await addPoint(this.newForm);
            if(data.status == 0){
				this.$message({
					type: 'success',
					message: data.msg
				});
			}else{
				this.$message({
					type: 'error',
					message: data.msg
				});
			}
			this.newForm = {
			  mapPointId: '',
			  mapPointName: '',
			  mapPointLongitude: '',
			  mapPointLatitude: '',
			  mapPointDesc: '',
			  pointType: '',
			  sort: '',
			  status: '0',
			  mapGroupId: ''
			}
			this.tag = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
	@import '../style/mixin';
</style>