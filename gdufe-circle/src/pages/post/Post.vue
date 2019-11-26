<template>
  <div class="postContainer">
    <div class="titleBar">
      <p>Post</p>
      <div class="back" @click="Back()">
        <img src="../../assets/back.png" />
      </div>
    </div>
    <PostCard
      :postId="postId"
      :postOwner="postOwner"
      :contentList="item" 
      :ifshowComment="true"
      :commentList="commentList"
      @handleRefresh="Refresh"
      class="postCard"
    >  
    </PostCard>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue';
import axios from '../../axios';
import PostCard from '../../components/postCard';
import pinyin from '../../../node_modules/js-pinyin/index';
export default {
  name: 'Post',
  data() {
    return {
      postId: '',
      postOwner: '',
      item: [],
      commentList: [],
    }
  },
  mounted() {
    this.postId = this.$route.query.postId;
    this.postOwner = this.$route.query.postOwner;
    this.getPostDetail();
    this.getComment();
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    // 根据帖子Id获取帖子详情
    getPostDetail() {
      const params = {
        postId: this.postId
      }
      axios.queryPostById(params)
        .then(({data}) => {
          const res = data.postItem[0];
          res.username = pinyin.getFullChars(res.username);
          res.createTime = this.$moment(res.createTime).format("YYYY-MM-DD");
          res.imgList = res.imgList.split(',');
          res.swiperList = [];
          for(const i in res.imgList) {
            const item = {
              id: i,
              imgUrl: res.imgList[i],
            }
            res.swiperList.push(item);
          }
          this.item.push(res);
        })
    },
    // 获取帖子的全部评论
    getComment() {
      axios.queryAllComment({postId: this.postId})
        .then(({data}) => {
          const { list } = data;
          console.log(list);
          for(let i of list) {
            i.username = pinyin.getFullChars(i.username);
            i.createTime = this.$moment(i.createTime).format("YYYY-MM-DD");
          }
          this.commentList = list;
        })
    },

    // 刷新评论列表
    Refresh() {
      this.getComment();
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
	.postContainer {
    height: 100vh;
    box-sizing: border-box;
    background: #FFF;
    z-index: 100;
    .titleBar {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 16px;
      font-family: EnglishFont;
      line-height: 40px;
      position: relative;
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
    .postCard {
      margin-top: 20px;
    }
  }
</style>
