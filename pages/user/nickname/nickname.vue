<template>
	<view>
		<div class="nickname">
		    <div class="sub-btn fs30" @click="saveNickName">确定</div>
		    <div class="input">
		      <input v-model="nickName" maxlength="20" placeholder="请输入昵称" @input="doInput" />
		    </div>
		  </div>
	</view>
</template>

<script>
	import { postUpdateNickname } from '@/api/userApi.js'
	import validator from '@/utils/validator.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				nickName: ''
			};
		},
		onShow() {
		  let nickName = uni.getStorageSync('nickName')
		  this.nickName = nickName === 'null' ? '' : uni.getStorageSync('nickName')
		},
		methods: {
			doInput(){
				if( 0<this.nickName.length&&this.nickName.length>12 ){
					T.tips('昵称在1~20个字符之间')
				}
			},
		    nickNameChange: function (e) {
		       uni.setStorageSync('nickName', e)
		    },
		    saveNickName() {
		      console.log(validator.isNickName(this.nickName))
		      if (validator.isNickName(this.nickName)) {
		        let data = {
		          nickName: this.nickName
		        }
		        postUpdateNickname(data).then(res => {
		          if (res.code === '1000') {
		            uni.setStorageSync('nickName', this.nickName)
		            uni.navigateBack({
		            	delta:1
		            })
		          } else {
		            uni.showToast(res.message || '错误')
		          }
		        }).catch(err => {
		          uni.showToast(err.message || '错误')
		        })
		      } else {
		        uni.showToast('请输入英文字母或者汉字，限2-20个字符')
		      }
		    }
		  }
		 
	}
</script>


<style lang="scss" scoped>
.nickname {
  .sub-btn{
    position: absolute;
    top: 20upx;
    right: 0upx;
    z-index: 99999;
    height: 88upx;
    width: 120upx;
	
    line-height: 100upx;
  }
  height: 100vh;
  background-color: #f0f0f0;
  .input {
    margin-top: 20upx;
    background-color: #fff;
    height: 100upx;
	line-height: 100upx;
    padding-left: 30upx;
  }
  input {
    line-height: 100upx;
	height: 100upx;
    font-size: 30upx;
	width: 600upx;
    color: #000;
    border: none;
    outline: none;
  }
}
</style>