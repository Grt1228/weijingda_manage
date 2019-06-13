<template>
    <div>
        <head-top></head-top>
        <div class="edit_container">
			<el-form label-width="100px" >
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
			</el-form>
			<!-- 图片上传组件辅助-->
			<el-upload
					class="avatar-uploader"
					:action="serverUrl"
					:show-file-list="false"
					:on-success="uploadSuccess"
					:on-error="uploadError"
					:before-upload="beforeUpload"
					multiple>
			</el-upload>
			<!--富文本编辑器组件-->
			<el-row v-loading="quillUpdateImg">
				<quill-editor
						v-model="content"
						ref="myQuillEditor"
						:options="editorOption"
						@ready="onEditorReady($event)"
				>
				</quill-editor>
		    </el-row>
        </div>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'
	import {addContent,getNewList} from '@/api/getData'
	
	// 工具栏配置
	const toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	  ['blockquote', 'code-block'],

	  [{'header': 1}, {'header': 2}],               // custom button values
	  [{'list': 'ordered'}, {'list': 'bullet'}],
	  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
	  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
	  [{'direction': 'rtl'}],                         // text direction

	  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
	  [{'header': [1, 2, 3, 4, 5, 6, false]}],

	  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
	  [{'font': []}],
	  [{'align': []}],
	  ['link', 'image', 'video'],
	  ['clean']                                         // remove formatting button
	]
	
    export default {
        data(){
            return {
				newList: [],
			    quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: 'http://localhost:8888/back/image/upload',  // 这里写你要上传的图片服务器地址
                content: '', // 富文本内容
				newId: '',
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
		created(){
			this.initData();
		},
        methods: {
			async initData(){
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
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    async submit(){
                //console.log(this.content);
				var formData = {
					newId: this.newId,
					content: this.content
				};
				const data = await addContent(formData);
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
            },
			// 上传图片前
            beforeUpload(res, file) {
				// 显示loading动画
                this.quillUpdateImg = true
			},
            // 上传图片成功
            uploadSuccess(res, file) {
				// res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.status == '0' && res.data !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
			},
            // 上传图片失败
            uploadError(res, file) {
				// loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
			}
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
	.editer{
		height: 350px;
	}
	.submit_btn{
		text-align: center;
	}
</style>
