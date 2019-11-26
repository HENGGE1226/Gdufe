<template>
	<div class="back">
		<!-- <popUp></popUp> -->
		<div class="container">
			<div class="logo">
				<img src="@/assets/loginLogo.png">
			</div>
			<div class="loginForm">
				<input type="number"  placeholder="StudentID" v-model="username" id="userInput" />
				<input type="password"  placeholder="Password" v-model="password" id="passInput" />
				<input type="text"  placeholder="CheckCode" v-model="check" id="checkInput" />
				<img :src=imgUrl id="checkImg">
			</div>
			<div class="loginBtn">
				<AButton id="submitBtn" @click="handleLogin()" :loading="loading">Sign in</AButton>
			</div>
			<div class="loginTips">
				<p>请使用教务系统的学号和密码</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '../../axios';
import cookies from '../../cookies';
import { Button } from 'ant-design-vue';
export default {
	name: 'Login',
	beforeCreate () {
		document.querySelector('body').setAttribute('style', 'background:#f9f9f9');
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
	},
	beforeMount () {
		this.getCodeImg();
	},
	mounted(){
		console.log(cookies.getCookie('username'));
	},
	data() {
		return {
			randomNum: '', // 请求的唯一标识
			pageString: '', // 页面唯一标识
			username: '',
			password: '',
			check: '',
			imgUrl: '',
			loading: false,
		}
	},
	methods: {
		getCodeImg(){
			axios.getCodeImg()
				.then(({ data }) => {
					if(data.code == '200') {
						this.randomNum = data.num;
						this.pageString = data.pageNum;
						this.imgUrl = `http://172.27.193.46:7001/public/img/code${this.randomNum}.png`;
					}					
				})
				.catch((e) => {
					console.log(e);
					this.$message.error('获取验证码失败，请刷新页面');
				})
		},
		repeatCode(){
			axios.repeatCode()
				.then(({ data }) => {
					if(data.code == 200) {
						this.randomNum = data.num;
						this.imgUrl = `http://172.27.193.46:7001/public/img/code${this.randomNum}.png` + '?t='+(+new Date());
					}					
				})
		},
		handleLogin() {
			if(!this.username) {
				this.$message.error('用户名不能为空');
				return;
			}
			if(!this.password) {
				this.$message.error('密码不能为空');
				return;
			}
			if(!this.check) {
				this.$message.error('验证码不能为空');
				return;
			}
			this.loading = true;
			let userForm = {
				username: this.username,
				password: this.password,
				code: this.check,
				pageString: this.pageString,
			}
			this.$store.dispatch('UserLogin',userForm)
				.then(() => {
					this.$message.success('登陆成功');
					this.$router.push('User');
				}).catch((e) => {
					this.imgUrl = '';
					this.repeatCode();
				})
			this.loading = false;
		}
	},
	components: { AButton:Button }
}
</script>

<style scoped lang="less">
	@import '~styles/font.less'; 
	.back {
		height: 100%;
		.container {
			position: absolute;
			width: 100%;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			.logo {
				text-align: center;
			}
			.loginForm {
				width: 296px;
				height: 150px;
				padding-left: 7px;
				margin: 0 auto; 
				margin-top: 15px;
				margin-bottom: 30px;
				background: #ffffff;
				border-radius: 6px;
				box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
				input {
					width: 290px;
					height: 40px;
					border: none;
					outline:none;
					font-family: "EnglishFont";
					font-size: 14px;
					line-height: 21px;
					text-indent: 15px
				}
				input:-ms-input-placeholder {
					color: #b3bec9;
					font-family: "EnglishFont";
					font-size: 14px;
					font-weight: 400;
					line-height: 21px;
				}
				input::-webkit-input-placeholder {
					color: #b3bec9;
					font-family: "EnglishFont";
					font-size: 14px;
					font-weight: 400;
					line-height: 21px;
				}
				#userInput {
					height: 45px;
					border-bottom: 1px solid #f9f9f9;
					border-radius: 10px 10px 0 0;
				}
				#passInput {
					height: 45px;
					border-bottom: 1px solid #f9f9f9;
				}
				#checkInput {
					width: 180px;
					height: 45px;
					border-radius: 0px 0px 10px 10px;
				}

				#checkImg {
					width: 100px;
					height: 38px;
					position: absolute;
					vertical-align: sub;
					margin-top: 10px;
				}
			}
			.loginBtn {
				width: 100%;
				margin-bottom: 20px;
				#submitBtn {
					width: 300px;
					height: 40px;
					display: block;
					border: none;
					outline: none;
					border-radius: 6px;
					color: #ffffff;
					font-family: "EnglishFont";
					font-size: 16px;
					line-height: 24px;
					font-weight: 600;
					background: linear-gradient(225deg, #00C8FE, #4FACFE);
					margin: 0 auto;
				}
			}
			.loginTips {
				color: #b3bec9;
				font-family: 'ChineseFont';
				font-size: 14px;
				text-align: center;	
			}
		}
	}
 
</style>





