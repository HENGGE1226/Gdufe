<template>
  <div class="homeContainer">
    <div class="titleBar">
      <div class="tab">
				<router-Link v-for="(item,$index) in barList" :to="'/' + item.target" :key="item.target">
					<span :class="{tabItem: true, activeIcon: $index == isActive }" @click="changePage(item,$index)">
            {{item.text}}
					</span>
				</router-Link>
        <div class="edit">
          <img src="../../assets/edit.png" />
        </div>
      </div>
    </div>
    <div class="wrapper" ref="bscroll">
      <div class="content">
        <aCard class="profiles" v-for="user of contentList" :key="user.id">
          <div class="userinfo">
            <div>
              <img :src="user.userIcon" class="icon">
              <div class="userdata">
                <p class="username">{{user.userName}}</p>
                <p class="postdate">{{user.postDate}}</p>
              </div>
            </div>
            <div class="ifFollow">
              <span style="vertical-align: middle">+</span>
              <span style="vertical-align: middle">Follow</span>
            </div>
          </div>
          <div class="content">
            <p>{{user.content}}</p>
          </div>
          <swiper class="photolist" :options="swiperOption">
            <swiper-slide class="listItem" v-for= "item of user.swiperList" :key='item.id'>
              <img :src="item.imgUrl" class="photoItem" preview />
            </swiper-slide>
          </swiper>
          <div class="social">          
            <div class="comment">
              <span class="commentCount">256</span>
              <img src="../../assets/chat.png">
            </div>
            <div class="like">
              <span class="likeCount">2K</span>
              <img src="../../assets/heart.png">
            </div>          
          </div>  
        </aCard>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue';
import BScroll from 'better-scroll';

export default {
  name: 'Follow',
  data() {
    return {
			isActive: 0,
			barList:[
				{
          text: 'Follow',
					target: 'Follow'
				},
				{
          text: 'Home',
					target: 'Home'
				},
			],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 35,
        freeMode: true,
      },
      contentList: [{
        id: 2,
        userIcon: 'http://127.0.0.1:7001/public/user/user2.png',
        userName: 'YeGuangHeng',
        postDate: '18 Nov',
        content: '对宇宙而言忧伤并无意义，叹气只是刻意的呼吸。',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes1.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes2.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes3.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes4.png'
        }]        
      },{
        id: 3,
        userIcon: 'http://127.0.0.1:7001/public/user/user3.png',
        userName: 'SuRich',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes5.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes6.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes7.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes8.png'
        },{
          id: '5',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes9.png'
        }]        
      },{
        id: 4,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      },{
        id: 5,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      },{
        id: 6,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      },{
        id: 7,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      },{
        id: 8,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      },{
        id: 9,
        userIcon: 'http://127.0.0.1:7001/public/user/user4.png',
        userName: 'ZhanChaoHao',
        postDate: '18 Nov',
        content: '游龙当归海，海不迎我自来也',
        swiperList: [{
          id: '1',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes10.png'
        },{
          id: '2',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes11.png'
        },{
          id: '3',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes12.png'
        },{
          id: '4',
          imgUrl: 'http://127.0.0.1:7001/public/user/shoes13.png'
        }]
      }],     
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.bscroll, {
      // 上拉加载
      pullUpLoad: {
        // 当上拉距离超过30px时触发 pullingUp 事件
        threshold: -30
      },
      // 下拉刷新
      pullDownRefresh: {
        // 下拉距离超过30px触发pullingDown事件
        threshold: 30,
        // 回弹停留在距离顶部20px的位置
        stop: 20
      }
    })
    this.scroll.on('pullingUp', () => {
      console.log('处理上拉加载操作')
      setTimeout(() => {
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        this.scroll.finishPullUp()
      }, 2000)
    })
    this.scroll.on('pullingDown', () => {
      console.log('处理下拉刷新操作')
      setTimeout(() => {
        console.log('asfsaf')
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        this.scroll.finishPullDown()
      }, 2000)
    })    
  },
  methods: {
		//点击导航栏的时候添加样式
		changePage(item,index){
			this.isActive = index;
		}
  },
  components: {
    aCard: Card,
  }
}
</script>

<style scoped lang="less">
@import '~styles/font.less';
.homeContainer {
  height: 100vh;
  background: #f9f9f9;
  padding-top: 15px;
  padding-bottom: 60px;
  .titleBar {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    text-align: center;
    font-size: 16px;
    font-family: EnglishFont;
    line-height: 40px;
    z-index: 10;
    .tab{
      width: 94%;
			height: 100%;
			margin: 0 auto;
			background: white;
			box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
      border-radius:  0 0 10px 10px;
      .tabItem {
        color: #ccc;
        margin-right: 10px;
      }
      .activeIcon {
        color: black;
      }
			.activeIcon::before {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 135px;
        width: 40px;
        height: 3px;						
        background: linear-gradient(225deg, #00C8FE, #4FACFE); 
			}
    }
    .edit {
      width: 3%;
      display: inline-block;
      position: absolute;
      right: 30px;
    }
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
    .content {
      .profiles {
        width: 90%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 20px;
        padding: 0;
        border: none;
        background: #ffffff;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
        border-radius: 10px;
        .userinfo {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
          }
          .userdata {
            display: inline-block;
            vertical-align: top;
            margin-left: 5px;
            .username {
              height: 18px;
              color: #2a2a30;
              font-family: EnglishFont;
              font-size: 18px;
              font-weight: 500;
              line-height: 18px;
              padding-top: 3px;
            }
            .postdate {
              height: 22px;
              color: #bbbccd;
              font-family: EnglishFont;
              font-weight: 300;
              font-size: 13px;
              line-height: 27px;
            }
          }
          .ifFollow {
            width: 70px;
            height: 25px;
            float: right;
            color: #ffffff;
            text-align: center;
            border-radius: 999em;
            font-family: EnglishFont;
            font-size: 12px;
            line-height: 22px;
            background: linear-gradient(225deg, #00C8FE, #4FACFE);
            box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
          }
        }
        .content {
          width: 100%;
          color: #2a2a30;
          font-family: yuantiFont;
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          margin-top: 10px;
        }
        .photolist {
          width: auto;
          margin-top: 10px;
          .listItem {
            .photoItem {
              width: 90px;
              height: 90px;
              border-radius: 10px;
            }
          }
        }
        .social {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          .comment {
            display: inline-block;
            margin-right: 15px;
            .commentCount {
              margin-right: 5px;
              vertical-align: middle;
            }
          }
          .like {
            display: inline-block;
            .likeCount {
              margin-right: 5px;
              vertical-align: middle;
            }
          }
        }
      }      
    }

  }
}
</style>
