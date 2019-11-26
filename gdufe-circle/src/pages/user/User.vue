<template>
  <div class="container">
    <div class="titleBar">
      <p>User</p>
    </div>
    <div class="userBar">
      <div class="avatarEdit">
        <div class="avatar" :style="{'background-image': 'url(' + usericon + ')'}" @click="handleModal">
        </div>
<!--         <div class="ifFollow">
          <span style="vertical-align: middle">+</span>
          <span style="vertical-align: middle">Follow</span>
        </div> -->
      </div>
      <div class="userData">
        <p class="userName">{{username}}</p>
        <p class="userProfile" @click="showEdit">{{introduce}}</p>
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
        <span class="subTitle" @click="viewAll">view All</span>
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
    <div class="editModal">
      <a-modal
        title="修改头像"
        :visible="editVisble"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleModalCancel"
        :bodyStyle="bodyStyle"
      >
        <div 
          :style="Object.assign(iconStyle, {'background-image': 'url(' + usericon + ')'})"
        >
        </div>
        <a-upload
          action="http://up-z2.qiniu.com"
          listType="picture-card"
          :fileList="fileList"
          style="display: inline-block"
          :data="myToken"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-modal>
    </div>
    <div class="introduceEdit">
      <a-modal
        title="修改个人简介"
        :visible="introduceEditVisble"
        @ok="editIntroduce"
        @cancel="handleModalCancel"
      >
        <a-input :placeholder="introduce" v-model="newIntroduce" />
      </a-modal>
    </div>
  </div>
</template>

<script>
import pinyin from '../../../node_modules/js-pinyin/index';
import { Modal, Icon, Upload, Card, Input } from 'ant-design-vue';
import axios from '../../axios';
export default {
  name: 'User',
  mounted() {
    axios.getUploadToken()
      .then(({ data }) => {
        if(data.code == 200) {
          this.myToken.token = data.uploadToken;
        }else {
          this.$message.error(data.message,"请刷新页面");
        }
    })
    if(this.$route.query) {
      console.log(this.$route.query.userid);
      this.userid = this.$route.query.userid;
    }
    this.getUserData();
  },
  data() {
    return {
      username: pinyin.getFullChars(this.$store.state.username) || 'GG',
      userid: '',
      usericon: '',
      introduce: '',
      newIntroduce: '',
      iconStyle: {
        width:　'112px',
        height: '104px',
        display: 'inline-block',
        verticalAlign: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      },
      myToken: {
        token: '',
      },
      introduceEditVisble: false, // 修改个人简介的弹窗
      editVisble: false, // 修改头像的弹窗
      bodyStyle: {
        wdith: "80%",
        height: "200px",
      },
      confirmLoading: false,
      previewVisible: false, // 上传的头像预览开关
      previewImage: '',  // 预览的头像
      fileList: [], // 上传的头像
      followersNums: 74, // 关注者数量
      imgLists: [],
      imgSum: '',  // 用户相片数量
    }
  },
  methods: {
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

    // 提交修改的头像
    handleOk() {
      const url = `http://q1ar1a2r5.bkt.clouddn.com/${this.fileList[0].response.key}`;
      const data = {
        option: 'icon',
        userid: this.$store.state.userId,
        newData: url
      }
      axios.editUserFile(data)
        .then(({data}) => {
          if(data.code === 200) {
            this.$message.success('修改头像成功');
            this.editVisble = false;
            this.getUserData();
          } else {
            this.$message.error('修改失败');
          }
        })
    },

    // 关闭弹窗
    handleModalCancel() {
      this.editVisble = false;
      this.introduceEditVisble = false;
      this.fileList = [];
    },

    // 开启修改头像的弹窗
    handleModal() {
      this.editVisble = true;
    },

    // 关闭图片预览
    handleCancel() {
      this.previewVisible = false;
    },

    // 上传头像后的预览开关
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },

    // 上传头像之后的回调
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(fileList);
    },

    // 展示修改简介窗口
    showEdit() {
      this.introduceEditVisble = true;
    },

    // 提交修改的个人简介
    editIntroduce() {
      if(!this.newIntroduce){
        return false;
      }
      const data = {
        option: 'introduce',
        userid: this.$store.state.userId,
        newData: this.newIntroduce,
      };
      axios.editUserFile(data)
        .then(({ data }) => {
          if(data.code === 200) {
            this.$message.success('修改成功');
            this.introduceEditVisble = false;
            this.getUserData();
          } else {
            this.$message.error('修改失败');
          }          
        })
    },

    // 跳转到帖子详情
    toPost(id) {
      this.$router.push({ path: 'Post', query: { postId: id, postOwner: this.userid }});
    },

    // 展示全部帖子
    viewAll() {
       this.$router.push({ path: 'UserPost', query: { userid: this.userid }});
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
