<!-- 底部导航条  -->

<template>
	<div class="container">
		<div class="iconBox">
			<ul class="iconList">
				<router-Link v-for="(item,$index) in barList" :to="'/' + item.target" :key="item.target">
					<li :class="{icon: true, activeIcon: $index == isActive }" @click="changePage(item,$index)">
						<img :src="item.img" />
					</li>
				</router-Link>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NavBar',
	beforeMount () {
		let urlParams = this.$route.path;
		switch(urlParams) {
			case '/Home':
				this.isActive = 0;
				break;
			case '/Flame':
				this.isActive = 1;
				break;
			case '/User':
				this.isActive = 2;
				break;
		}
  },
	data() {
		return {
			isActive: 0,
			barList:[
				{
					img: require("../assets/home.png"),
					target: 'Home'
				},
				{
					img: require("../assets/flame.png"),
					target: 'Flame'
				},
				{
					img: require("../assets/user.png"),
					target: 'User'
				}
			]
		}
	},
	methods: {	
		//点击导航栏的时候添加样式
		changePage(item,index){
			this.isActive = index;
		}
	},
	components: {

	}
}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		height: 56px;
		z-index: 99;
		.iconBox {
			width: 88%;
			height: 100%;
			margin: 0 auto;
			background: white;
			box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
			border-radius: 10px 10px 0 0;
			.iconList {
				display: flex;
				justify-content: space-around;
				.icon {
					width: 83px;
					position: relative;
					text-align: center;
					display: inline-block;
					line-height: 56px;
				}
				.activeIcon::before {
						content: "";
						position: absolute;
						bottom: 5px;
						left: 26.5px;
						width: 29px;
						height: 3px;						
						background: linear-gradient(225deg, #00C8FE, #4FACFE); 
				}
			}
		}
	}
</style>
