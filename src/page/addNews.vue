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
					  <el-option label="校园新闻" value="1"></el-option>
					  <el-option label="通知公告" value="2"></el-option>
					  <el-option label="学术讲座" value="3"></el-option>
					  <el-option label="科研信息" value="4"></el-option>
					  <el-option label="教务通知" value="5"></el-option>
					  <el-option label="学院动态" value="6"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="新闻头图" prop="imageId">
					<el-select v-model="newForm.imageId" placeholder="请选择新闻头图" @change="changeImage">
						<el-option
							 v-for="item in imageList"
							 :key="item.imageUrl"
							 :label="item.imageName"
							 :value="item.imageId">
						</el-option>
					</el-select>
				</el-form-item>
				  <el-form-item label="新闻日期" required>
					<el-col :span="11">
					  <el-form-item prop="newDate" >
						<el-input v-model="newForm.newDate" placeholder="格式：1999年5月21日"></el-input>
					  </el-form-item>
					</el-col>
				  </el-form-item>
				  <el-form-item label="新闻状态" prop="newStatus">
					<el-select v-model="newForm.newStatus" placeholder="">
					  <el-option label="有效" value="1"></el-option>
					  <el-option label="无效" value="0"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="新闻概述" prop="newDetail">
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
  import {addNews,getImageList} from '@/api/getData'
  export default {
    data() {
      return {
		imageList: [],
		currentImageUrl: '',
        newForm: {
          newTitle: '',
          newCreater: '',
          newType: '',
          newDate: '',
          newStatus: '0',
          newDetail: '',
		  imageId: '',
		  imageUrl: ''
        },
        rules: {
          newTitle: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 1, max: 60, message: '超长', trigger: 'blur' }
          ],
          newCreater: [
            { required: true, message: '请选择新闻发布人', trigger: 'change' }
          ],
          newType: [
            { required: true, message: '请选择新闻类型', trigger: 'change' }
          ],
          newDate: [
            {required: true, message: '请输入新闻时间', trigger: 'change' }
          ],
          newDetail: [
            { required: true, message: '请填写新闻概述', trigger: 'blur' }
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
	  changeImage(e){
		this.imageList.forEach((item) => {
			if(item.imageId == e){
				this.currentImageUrl = item.imageUrl;
			}
			
		})
		console.log(this.currentImageUrl)
	  },
	  async initData(){
		try{
			//新闻列表
			const imageData = await getImageList({
				pageNum: 0, 
				pageSize: 100,
				newStatus: '1',
				imageType: '2'
			});
			if (imageData.status == 0) {
				imageData.rows.forEach(item => {
					const oneImage = {};
					oneImage.imageName = item.imageName;
					oneImage.imageUrl = item.imageUrl;
					oneImage.imageId = item.imageId;
					this.imageList.push(oneImage);
				})
			}else{
				throw new Error('获取图片数据失败');
			}
			
		}catch(err){
			console.log('获取数据失败', err);
		}
	  },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
			console.log(this.newForm);
			this.newForm.imageUrl = this.currentImageUrl
            const data = await addNews(this.newForm);
			if(data.status == 0){
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.$refs[formName].resetFields();
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