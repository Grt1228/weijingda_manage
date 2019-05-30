<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="newForm" :rules="rules" ref="newForm" label-width="100px" class="newForm">
				  
				  <!-- <el-form-item label="学期" prop="calendarDate" >
					<el-input v-model="newForm.calendarDate"></el-input>
					<el-date-picker
					  v-model="newForm.calendarDate"
					  type="monthrange"
					  range-separator="至"
					  start-placeholder="开始月份"
					  end-placeholder="结束月份">
					</el-date-picker> 
				  </el-form-item>-->
				  <el-form-item label="日期" prop="selectDate">
					<!--<el-date-picker
					  v-model="selectDate"
					  type="date"
					  value-format="yyyy-MM-dd"
					  placeholder="选择日期">
					</el-date-picker>-->
					<el-date-picker
					  v-model="selectDate"
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期">
					</el-date-picker>
				  </el-form-item>
				  <!-- <el-form-item label="当前学期" prop="isCurrentYear">
					<el-select v-model="newForm.isCurrentYear" >
						<el-option label="是" value="0"></el-option>
						<el-option label="否" value="1"></el-option>
					</el-select>
				  </el-form-item> -->
				  
				  <el-form-item label="日期描述" prop="calendarInfo">
					<el-input type="textarea" v-model="newForm.calendarInfo"></el-input>
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
  import {addCalendar} from '@/api/getData'
  export default {
    data() {
      return {
		selectDate: null,
        newForm: {
		  calendarInfo: ''
        },
        rules: {
		  calendarInfo: [
			{ required: true, message: '请输入文字描述信息', trigger: 'change' }
		  ]
		}
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
		this.newForm.beginDate = this.selectDate[0];
		this.newForm.endDate = this.selectDate[1];
		console.log(this.newForm);
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
			const data = await addCalendar(this.newForm);
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