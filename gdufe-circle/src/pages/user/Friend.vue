<template>
  <div class="container">
    <div class="titleBar">
      <p>User</p>
      <div class="back" @click="Back()">
        <img src="../../assets/back.png" />
      </div>
    </div>
    <div class="userBar">
      <div class="avatarEdit">
        <div class="avatar" :style="{'background-image': 'url(' + usericon + ')'}">
        </div>
        <div class="ifFollow">
          <span style="vertical-align: middle">+</span>
          <span style="vertical-align: middle">Follow</span>
        </div>
      </div>
      <div class="userData">
        <p class="userName">{{username}}</p>
        <p class="userProfile">{{introduce}}</p>
      </div>
      <div class="followList">
        <div class="followItem">
          <p class="taskNums">{{imgSum || 0}}</p>
          <p class="taskType">Photos</p>
        </div>
        <div class="followItem">
          <p class="taskNums">0</p>
          <p class="taskType">Follow</p>
        </div>
        <div class="followItem">
          <p class="taskNums">{{followersNums}}</p>
          <p class="taskType">Followers</p>
        </div>
      </div>
    </div>
    <div class="photoBar">
      <div class="photoBarTitle">
        <span class="mainTitle">Photos</span>
        <span class="subTitle">view All</span>
      </div>
      <div class="photoList">
        <div 
          v-for="(item, index) in imgLists" 
          :key="item.id" 
          class="imgList"
          :style="{'background-image': 'url(' + item.imgUrl + ')'}"
          @click="toPost(item.id)"
        >
          <p v-if="index == 5">+{{imgSum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pinyin from '../../../node_modules/js-pinyin/index';
import { Modal, Icon, Upload, Card, Input } from 'ant-design-vue';
import axios from '../../axios';
export default {
  name: 'Friend',
  mounted() {
    if(this.$route.query) {
      this.userid = this.$route.query.userid;
    }
    this.getUserData();
  },
  data() {
    return {
      username: '',
      userid: '',
      usericon: '',
      followersNums: 74, // 关注者数量
      imgLists: [],
      imgSum: '',  // 用户相片数量
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    // 获取用户的个人资料
    getUserData() {
      axios.getUserMessage({ userid: this.userid || this.$store.state.userId })
        .then(({data}) => {
          if(data.code === 200) {
            const { userData } = data;
            this.usericon = userData.icon;
            this.introduce = userData.introduce;
            this.imgSum = data.imgSum;
            this.userid = userData.userid;
            this.username = pinyin.getFullChars(userData.username);
            if(userData.imgList) {
              for(const i of userData.imgList) {
                if(this.imgLists.length >= 6) {
                  return;
                }
                let url = i.imgList.split(',')[0];
                let item = {
                  id: i.postId,
                  imgUrl: url,
                }
                this.imgLists.push(item);
              }
            }
          }
        })
        .catch((e)=> {
          this.$message.error(e);
          console.log(this.imgLists);
        })
    },
    // 跳转到帖子详情
    toPost(id) {
      this.$router.push({ path: 'Post', query: { postId: id, postOwner: this.userid }});
    }
  },
  components: {
    AModal: Modal,
    AUpload: Upload,
    AIcon: Icon,
    ACard: Card,
    AInput: Input,
  }
}
</script>

<style scoped lang="less">
  @import '~styles/font.less';
	.container {
    height: 100vh;
    box-sizing: border-box;
    background: #fff;
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
    .userBar {
      margin-top: 10px;
      .avatarEdit {
        display: flex;
        justify-content: space-between;
        .avatar {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 30px;
          border-radius: 50%;
          background: #ececec;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
        }
        .ifFollow {
          width: 110px;
          height: 35px;
          color: #ffffff;
          margin-top: 8px;
          margin-right: 20px;
          text-align: center;
          border-radius: 999em;
          font-family: EnglishFont;
          font-size: 16px;
          line-height: 30px;
          background: linear-gradient(225deg, #00C8FE, #4FACFE);
          box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
        }
      }
      .userData {
        width: 100%;
        margin-top: 25px;
        .userName {
          margin-left: 30px;
          color: #171f24;
          font-family: EnglishFont;
          font-size: 28px;
          font-weight: 400;
          line-height: 34px;
        }
        .userProfile {
          margin-top: 5px;
          margin-left: 30px;
          color: #778087;
          font-family: Roboto;
          font-size: 15px;
          font-weight: 400;
          line-height: 20px;
        }
      }
      .followList {
        width: 95%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center; 
        background: white;
        margin-top: 30px;
        border-radius: 0 7px 7px 0;
        box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
        .followItem {
          font-family: EnglishFont;
          text-align: center;
          .taskNums {
            font-size: 17px;
            line-height: 22px;
            color: #171f24;
          }
          .taskType {
            font-size: 12px;
            font-family: Roboto;
            color: #aab2b7;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }
    .photoBar {
      width: 95%;
      margin: 0 auto;
      margin-top: 50px;
      background: white;
      .photoBarTitle {
        width: 100%;
        height: 21px;
        display: flex;
        justify-content: space-between;
        .mainTitle {
          color: #171f24;
          font-family: Roboto;
          font-size: 16px;
          margin-left: 20px;
          line-height: 21px;
        }
        .subTitle {
          color: #aab2b7;
          font-family: Roboto;
          font-size: 12px;
          font-weight: 400;
          margin-right: 30px;
          line-height: 21px;
        }
      }
      .photoList {
        margin-top: 5px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .imgList {
          width: 105px;
          height: 105px;
          margin-top: 10px;
          margin-right: 2px;
          border-radius: 8px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          p {
            color: #ffffff;
            font-family: EnglishFont;
            font-size: 20px;
            line-height: 105px;
            text-align: center;
          }
        }
        .imgList :last-child {
          width: 105px;
          height: 105px;
          border-radius: 8px;
          background: linear-gradient(225deg, #00C8FE, #4FACFE) !important;
          box-shadow: 0px 10px20px rgba(0,0,0,0.3);
        }
      }
    }
    .editModal {
      .iconShow {
        width: 104px;
        height: 104px;
        background: #ccc;
        display: inline-block; 
      }
      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
	}

</style>