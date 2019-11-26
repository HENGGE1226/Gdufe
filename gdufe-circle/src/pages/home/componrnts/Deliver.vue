<!-- 发表  -->
<template>
  <div class="deliverContainer">
    <transition enter-active-class="bounceInLeft" leave-active-class="fadeOutUp">
      <div>
        <div class="titleBar animated">
          <div class="tab">
            <div class="tabItem">
              <p>Share</p>
            </div>
            <div class="back" @click="Back()">
              <img src="../../../assets/back.png" />
            </div>
          </div>
        </div>
        <div class="deliverValue">
          <a-Card class="profiles">
            <textarea placeholder="Share Something" v-model="userValue" />
            <a-upload
              action="http://up-z2.qiniu.com"
              listType="picture-card"
              :fileList="fileList"
              :data="myToken"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-Card>
          <a-button 
            class="submitButton"
            @click="handleSubmit"
          >
            Submit
          </a-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Card, Input, Button, Upload, Modal, Icon } from 'ant-design-vue';
import axios from '../../../axios';
export default {
  name: 'Deliver',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      userValue: '',
      myToken: {
        token: '',
      },
    }
  },
  mounted() {
    axios.getUploadToken()
      .then(({ data }) => {
        if(data.code == 200) {
          this.myToken.token = data.uploadToken;
        }else {
          this.$message.error(data.message,"请刷新页面");
        }
      })
  },
  methods: {
    Back() {
      this.$emit('handleShow');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(fileList);
    },
    handleSubmit(){
      if(!this.fileList.length && !this.userValue) {
        this.$message.error('内容不能为空');
        return false;
      }
      let data = {
        userid: this.$store.state.userId,
        postValue: this.userValue,
        imgList: [],
        createTime: this.$moment(new Date).format("YYYY-MM-DD-HH:mm:ss"),
      };
      for(let i of this.fileList) {
        if(i.response) {
          let url = `http://q1ar1a2r5.bkt.clouddn.com/${i.response.key}`;
          data.imgList.push(url);
        }
      }
      data.imgList = (data.imgList).join(',');
      data.userid = Number(data.userid);
      axios.deliverPost(data)
        .then(({ data }) => {
          if(data.code == 200) {
            this.$message.success('发表成功');
            this.$emit('handleShow');
          } 
        })
        .catch((e) => {
					this.$message.error('发表失败');
				})
    }
  },
  components: {
    ACard: Card,
    AButton: Button,
    AUpload: Upload,
    AModal: Modal,
    AIcon: Icon
  }
}
</script>

<style lang="less">
@import '~styles/font.less';
.deliverContainer {
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
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
      .back {
        width: 3%;
        height: 100%;
        display: inline-block;
        position: absolute;
        left: 30px;
        img {
          width: 17px;
          height: 14px;
        }
      }
      .tabItem {
        display: inline-block;
        color: #000;
        margin-right: 10px;
      }
    }
    .edit {
      width: 3%;
      display: inline-block;
      position: absolute;
      right: 30px;
    }
  }
  .deliverValue {
    margin-top: 60px;
    text-align: center;
    .profiles {
      width: 90%;
      height: auto;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-bottom: 30px;
      border: none;
      background: #ffffff;
      box-shadow: 0px 5px 10px rgba(0,0,0,0.18);
      border-radius: 10px;
      textarea {
        width: 100%;
        height: 100px;
        font-size: 15px;
      }
    }
    .submitButton {
      width: 80%;
      height: 45px;
      margin-top: 10px;
      color: #ffffff;
      border-radius: 999em;
      font-family: EnglishFont;
      font-size: 16px;
      background: linear-gradient(225deg, #00C8FE, #4FACFE);
      box-shadow: 0px 5px 10px rgba(0,0,0,0.18);
      .submitButton:active {
        background: #fff;
      }
    }
  }
}

</style>