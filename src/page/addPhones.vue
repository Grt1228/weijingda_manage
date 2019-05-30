<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="addForm">
					  <el-form-item label="部门名称" prop="phoneName">
						<el-input v-model="addForm.phoneName"></el-input>
					  </el-form-item>
					  <el-form-item label="联系方式" prop="phoneNumber">
						<el-input v-model="addForm.phoneNumber"></el-input>
					  </el-form-item>
					  <el-form-item label="所属级别" prop="phoneLevel">
						<el-select v-model="addForm.phoneLevel" placeholder="请选择所属级别">
							<el-option label="校级" value="0"></el-option>
							<el-option label="院级" value="1"></el-option>
							<el-option label="校园商铺" value="2"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item label="状态" prop="status">
						<el-select v-model="addForm.status" placeholder="状态">
							<el-option label="失效" value="0"></el-option>
							<el-option label="有效" value="1"></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" @click="submitForm('addForm')">保存</el-button>
					  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>
<script>
  import headTop from '@/components/headTop'
  import {addPhones} from '@/api/getData'
  export default {
    data() {
      return {
        addForm: {
		  phoneName: '',
		  phoneNumber: '',
		  phoneLevel: '0',
		  status: '0',
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
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
			const data = await addPhones(this.addForm);
            if(data.status == 0){
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.addForm = {
				  phoneName: '',
				  phoneNumber: '',
				  phoneLevel: '0',
				  status: '0',
				  phoneBookId: ''
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
      }
    }
  }
</script>

<style lang="less">
	@import '../style/mixin';
</style>