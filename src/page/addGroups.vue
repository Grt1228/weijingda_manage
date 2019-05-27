<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  <el-form-item label="组名称" prop="mapGroupName">
					<el-input v-model="newForm.mapGroupName"></el-input>
				  </el-form-item>
				  <el-form-item label="组描述" prop="mapGroupDesc">
					<el-input v-model="newForm.mapGroupDesc"></el-input>
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
  import {addMapGroup} from '@/api/getData'
  export default {
    data() {
      return {
        newForm: {
          mapGroupName: '',
          mapGroupDesc: '',
          status: '0',
        },
        rules: {
          mapGroupName: [
            { required: true, message: '请输入组名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mapGroupDesc: [
            { required: true, message: '请选择组描述', trigger: 'change' }
          ]
        }
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
			const data = await addMapGroup(this.newForm);
            if(data.status == 0){
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.newForm = {
				  mapGroupName: '',
				  mapGroupDesc: '',
				  status: '0',
				}
			}else{
				this.$message({
					type: 'error',
					message: data.msg
				});
			}
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