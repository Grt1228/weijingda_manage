<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  <el-form-item label="校历描述标题" prop="calendarTitle">
					<el-input v-model="newForm.calendarTitle"></el-input>
				  </el-form-item>
				  <el-form-item label="校历描述内容" prop="calendarInfo">
					<el-input type="textarea"  :autosize="{ minRows: 2}" v-model="newForm.calendarInfo" placeholder="描述信息回车换行，每行前加“-”" ></el-input>
				  </el-form-item>
				  <el-form-item label="校历描述内容" prop="calendarDate">
					<el-date-picker
					  v-model="newForm.calendarDate"
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 300"
					  placeholder="选择所属学期的第一个月）">
					</el-date-picker>
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
  import {addCalendarDesc} from '@/api/getData'
  export default {
    data() {
      return {
		selectDate: null,
        newForm: {
		  calendarTitle: '',
		  calendarInfo: '',
		  calendarDate: '',
		  status: '0',
        },
        rules: {
		  calendarInfo: [
			{ required: true, message: '请输入描述信息', trigger: 'change' }
		  ],
		  calendarTitle: [
			{ required: true, message: '请输入标题信息', trigger: 'change' }
		  ]
		  
		}
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
			const data = await addCalendarDesc(this.newForm);
            if(data.status == 0){
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.selectDate = null;
				this.newForm = {
				  calendarInfo: '',
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