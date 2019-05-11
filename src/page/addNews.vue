<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  <el-form-item label="新闻标题" prop="newTitle">
					<el-input v-model="newForm.newTitle"></el-input>
				  </el-form-item>
				  <el-form-item label="新闻发布人" prop="newCreater">
					<el-input v-model="newForm.newCreater"></el-input>
				  </el-form-item>
				  <el-form-item label="新闻类别" prop="newType">
					<el-select v-model="newForm.newType" placeholder="请选择新闻类别">
					  <el-option label="区域一" value="shanghai"></el-option>
					  <el-option label="区域二" value="beijing"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="新闻日期" required>
					<el-col :span="11">
					  <el-form-item prop="newDate">
						<el-date-picker type="date" placeholder="选择日期" v-model="newForm.newDate" style="width: 100%;"></el-date-picker>
					  </el-form-item>
					</el-col>
				  </el-form-item>
				  <el-form-item label="新闻状态" prop="newStatus">
					<el-switch active-value="0" inactive-value="1" v-model="newForm.newStatus" ></el-switch>
				  </el-form-item>
				  <el-form-item label="新闻内容" prop="newDetail">
					<el-input type="textarea" v-model="newForm.newDetail"></el-input>
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
  export default {
    data() {
      return {
        newForm: {
          newTitle: '',
          newCreater: '',
          newType: '',
          newDate: '',
          newStatus: '0',
          newDetail: ''
        },
        rules: {
          newTitle: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          newCreater: [
            { required: true, message: '请选择新闻发布人', trigger: 'change' }
          ],
          newType: [
            { required: true, message: '请选择新闻类型', trigger: 'change' }
          ],
          newDate: [
            { type: 'date', required: true, message: '请选择新闻时间', trigger: 'change' }
          ],
          newDetail: [
            { required: true, message: '请填写新闻详情', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
		  console.log(this.newForm);
            this.$message({
				type: 'success',
				message: '新增成功成功'
			});
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