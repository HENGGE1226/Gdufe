<template>
  <div  class="content">
    <aCard class="profiles" v-for="user of contentList" :key="user.postId">
      <div class="userinfo">
        <div>
          <img :src="user.icon" class="icon" @click="handleUser(user.userid)">
          <div class="userdata">
            <p class="username">{{user.username}}</p>
            <p class="postdate">{{user.createTime}}</p>
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
      <swiper :options="swiperOption" class="photolist">
        <swiper-slide class="listItem" v-for= "item of user.swiperList" :key='item.id'>
          <img :src="item.imgUrl" class="photoItem" v-gallery="user.postId" />
        </swiper-slide>
      </swiper>
      <div class="social">          
        <div class="comment" @click="handleComment(user.postId, user.userid)">
          <span class="commentCount">{{user.commentCount}}</span>
          <img src="../assets/chat.png" >
        </div>
        <div class="like">
          <span class="likeCount">0</span>
          <img src="../assets/heart.png">
        </div>      
      </div>
      <div class="commentCard" v-if="commentShow">
        <a-Card
          class="commentBody"
          title="评论列表 " 
          :headStyle="headStyle"
          :bodyStyle="bodyStyle"
        >
          <div class="commentItem" v-for=" item of commentList" :key="item.commentId">
            <div class="commentUser">
              <img :src="item.icon" class="commentIcon">
              <span class="username">{{item.username}}</span>
              <span class="commentDate">{{item.createTime}}</span>
            </div>
            <div class="commentContent">
              <span class="commentText">{{item.content}}</span>
            </div>
          </div>
          <div class="postComment">
            <a-input placeholder="请输入你的评论" v-model="userComment" style="width: 170px;marginRight: 5px"/><a-button type="primary" @click="postComment">发表</a-button>
          </div>
        </a-Card>
      </div>
    </aCard>
  </div>
</template>

<script>
import { Card, Input, Button } from 'ant-design-vue';
import axios from '../axios';
export default {
  name: 'PostCard',
  props: {
    contentList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    postId: '',
    postOwner: '',
    ifshowComment: '',
    commentList: '',
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 35,
        freeMode: true,
        loop: false
      },
      headStyle: {
        height: '15px',
        paddingLeft: '18px',
        fontSize: '14px',
        fontWeight: '700',
      },
      bodyStyle: {
        marginTop: '0px',
        paddingLeft: '18px',
      },
      commentShow: false,
      userComment: '',
    }
  },
  methods: {
    handleComment(postId, userid) {
      if(this.ifshowComment) {
        this.commentShow = !this.commentShow;
      } else {
        this.$router.push({ path: 'Post', query: { postId: postId, postOwner: userid }});
      }
    },
    // 发表评论
    postComment() {
      const params = {
        postId: this.postId,
        content: this.userComment,
        postOwner: this.postOwner,
        commentOwner: this.$store.state.userId,
        createTime: this.$moment(new Date).format("YYYY-MM-DD-HH:mm:ss"),
      }
      axios.postComment(params)
        .then(({ data }) => {
          if(data.code == 200) {
            this.$message.success('评论成功');
            this.userComment = null;
            this.$emit('handleRefresh');
          }else {
            this.$message.error('评论失败');
          }
        })
    },

    // 查看个人主页
    handleUser(id) {
      this.$router.push({ path: 'Friend', query: { userid: id }});
    }
  },
  components: {
    aCard: Card,
    aInput: Input,
    aButton: Button
  }
}
</script>

<style scoped lang="less">
  @import '~styles/font.less';
  .content{
    .profiles {
      width: 90%;
      height: auto;
      margin: 0 auto;
      margin-bottom: 20px;
      border: none;
      background: #ffffff;
      box-shadow: 0px 6px 9px rgba(0,0,0,0.2);
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
      .commentCard {
        margin-top: 20px;
        .commentBody {
          width: 100%;
          min-height: 100px;
          background: #ffffff;
          box-shadow: 0px 6px 9px rgba(0,0,0,0.08);
          border-radius: 10px;
          .commentItem {
            padding-top: 10px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f6f6f6;
            .commentUser {
              .commentIcon {
                width: 28px;
                height: 28px;
                border-radius: 6px;
              }
              .username {
                margin-left: 3px;
                vertical-align: middle;
                color: #2a2a30;
                font-family: EnglishFont;
                font-size: 16px;
                font-weight: 500;
              }
              .commentDate {
                float: right;
                line-height: 28px;
                color: #bbbccd;
                font-family: EnglishFont;
                font-weight: 300;
                font-size: 13px;
              }
            }
            .commentContent {
              margin-top: 10px;
              .commentText {
                margin-left: 35px;
                color: #2a2a30;
                font-size: 14px;
                font-weight: 400;
              }
            }
          }        
        }
      }
    }
  }
</style>
