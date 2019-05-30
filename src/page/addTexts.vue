<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  <el-form-item label="文本标题" prop="textTitle">
					<el-input v-model="newForm.textTitle"></el-input>
				  </el-form-item>
				  <el-form-item label="类别" prop="textType">
					<el-select v-model="newForm.textType" placeholder="请选择类别">
						<el-option label="通知" value="0"></el-option>
						<el-option label="其他" value="1"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="状态" prop="status">
					<el-select v-model="newForm.status" placeholder="状态">
						<el-option label="失效" value="0"></el-option>
						<el-option label="有效" value="1"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="文本内容" prop="textContext">
					<el-input type="textarea" v-model="newForm.textContext"></el-input>
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
  import {addText} from '@/api/getData'
  export default {
    data() {
      return {
        newForm: {
		  textTitle: '',
		  textContext: '',
		  textType: '',
		  status: '0',
        },
        rules: {
		  textTitle: [
			{ required: true, message: '请输入文本标题', trigger: 'blur' },
			{ min: 1, max: 50, message: '长度在 3 到 10 个字符', trigger: 'blur' }
		  ],
		  textContext: [
			{ required: true, message: '请输入文本内容', trigger: 'change' }
		  ],
		  textType: [
			{ required: true, message: '请选文本类型', trigger: 'change' }
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
		
	},
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
			const data = await addText(this.newForm);
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
			  textTitle: '',
			  textContext: '',
			  textType: '',
			  status: '0',
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