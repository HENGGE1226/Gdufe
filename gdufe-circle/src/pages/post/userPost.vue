<template>
  <div class="homeContainer">
    <div class="titleBar">
      <p>AllPost</p>
      <div class="back" @click="Back()">
        <img src="../../assets/back.png" />
      </div>
    </div>
    <div class="wrapper" ref="bscroll">
      <div class="content"> 
        <PostCard 
          :contentList="contentList"
          :ifshowComment="false"
        >
        </PostCard>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue';
import BScroll from 'better-scroll';
import axios from '../../axios';
import pinyin from '../../../node_modules/js-pinyin/index';
import PostCard from '../../components/postCard';

export default {
  name: 'UserPost',
  data() {
    return {
      show: true,
      ifDeliver: false,
      isPullDown: false,
      options: {
        probeType: 3,
        pullDownRefresh: {
            threshold: 40, // 刷新时机
            stop: 30       // 回弹停留的距离
        },
        pullUpLoad: {
            threshold: 40  // 开始加载的时机
        },
        startY: 0
      },
			isActive: 1,
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
        loop: false
      },
      contentList: [],     
    }
  },
  mounted () {
    this.getPostList();
    this.scroll = new BScroll(this.$refs.bscroll, {
      click: true,
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
      this.getPostList();
    })
    this.scroll.on('pullingDown', () => {
      console.log('处理下拉刷新操作')
      this.getPostList();
    })
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    getPostList() {
      axios.queryAllPost()
      .then(({ data }) => {
        if(data.code == 200) {
          for(const i of data.list) {
            i.username = pinyin.getFullChars(i.username);
            i.createTime = this.$moment(i.createTime).format("YYYY-MM-DD")
          }
          this.contentList = data.list;
        }
        this.scroll.finishPullUp();
        this.scroll.finishPullDown();
      })
      .catch((e) => {
        console.log(e);
        this.$message.error('获取列表失败');
        this.scroll.finishPullUp();
        this.scroll.finishPullDown();
			})
    }
    
  },
  components: {
    aCard: Card,
    PostCard
  }
}
</script>

<style scoped lang="less">
@import '~styles/font.less';
.homeContainer {
  height: 100vh;
  background: #f9f9f9;
  padding-bottom: 60px;
  .titleBar {
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: EnglishFont;
    line-height: 40px;
    .back {
      width: 3%;
      display: inline-block;
      position: absolute;
      top: 0px;
      left: 15px;
      img {
        width: 15px;
        height: 12px;
      }
    }
  }
  .wrapper {
    height: 100%;
    overflow: hidden;
    .content{
      .profiles {
        width: 90%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 20px;
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
          width: 100%;
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
