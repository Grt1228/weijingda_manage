<template>

	<div>
		<head-top></head-top>
		<el-row style="margin-top: 20px;">
			<el-col :span="12" :offset="4">
				<el-form :model="imgForm" :rules="rules" ref="imgForm" label-width="100px" class="imgForm">
				  <el-form-item label="图片名称" prop="imageName">
					<el-input v-model="imgForm.imageName"></el-input>
				  </el-form-item>
				  <el-form-item label="图片类别" prop="imageType">
					<el-select v-model="imgForm.imageType" placeholder="请选择新闻类别">
					  <el-option label="轮播图" value="0"></el-option>
					  <el-option label="首页图标" value="1"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="图片状态" prop="status">
					<el-select v-model="imgForm.status" placeholder="状态">
						<el-option label="失效" value="0"></el-option>
						<el-option label="有效" value="1"></el-option>
					</el-select>
					</el-form-item>
				  <el-form-item label="排序号" prop="sortNum">
					<el-input-number v-model="imgForm.sortNum" :min="1" :max="100" label="排序号不能重复"></el-input-number>
				  </el-form-item>
				  <el-form-item label="上传图片" prop="imageUrl">
				  
					<el-upload
					  class="upload"
					  :action="baseUrl + '/back/image/upload'"
					  :show-file-list="false"
					  :on-success="handleShopAvatarScucess"
					  :before-upload="beforeUpload">
					  <img v-if="formData.image_path" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					
					<el-upload
					  class="upload"
					  :action="baseUrl + '/back/image/upload'"
					  :show-file-list="false"
					  drag
					  :on-success="handleShopAvatarScucess"
					  :before-upload="beforeUpload">:action="baseUrl + '/back/image/upload'"
					  :show-file-list="false"
					  :on-success="handleShopAvatarScucess"
					  :before-upload="beforeUpload">
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					
				  </el-form-item>
				  <el-form-item>
					<el-button type="primary" @click="submitForm('imgForm')">提交</el-button>
					<el-button @click="resetForm('imgForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import headTop from '../components/headTop'
	import {uploadImg,addOrUpdateImg} from '@/api/getData'
    export default {
    data() {
      return {
        imgForm: {
          imageName: '',
          imageType: '',
          status: '',
		  sortNum: '1',
		  imageUrl: ''
        },
        rules: {
          imageName: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          imageType: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          status: [
            {  required: true, message: '请选择状态', trigger: 'change' }
          ],
          sortNum: [
            { type: 'number', required: true, message: '请选择排序', trigger: 'change' }
          ]
        }
      };
    },
    components: {
    	headTop,
    },
	methods: {
      submitForm(formName) {
		console.log(this.imgForm);
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
      },
	  beforeAvatarUpload(file) {
		const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isRightType) {
		  this.$message.error('上传头像图片只能是 JPG 格式!');
		}
		if (!isLt2M) {
		  this.$message.error('上传头像图片大小不能超过 2MB!');
		}
		return isRightType && isLt2M;
	  },
	  async uploadImgFun(param){
		var fileObj = param.file;
		// FormData 对象
		var form = new FormData();
		// 文件对象
		form.append("file", fileObj);
	  	const data = await uploadImg(
			form
		);
		console.log(data);
	  }
    }
  }
</script>

<style lang="less">
	@import '../style/mixin';
</style>
