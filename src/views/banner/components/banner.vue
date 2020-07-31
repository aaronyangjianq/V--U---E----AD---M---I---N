<template>
  <div class="flex-row wrap-content">
    <span class="labe">第{{i}}张：</span>
    <div class="pics">
      <img class="image" :src="imgSrc" />
      <div class="mask" v-if="loading"><a-icon style="font-size: 60px; color: #ffffff;" type="loading" /></div>
    </div>
    <a-upload
      name="image"
      action="/admin/banner/upload"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      @change="handleChange"
    >
      <a-button type="link" @click="changeImg(bannerId)">更换</a-button>
    </a-upload>
    <a-button type="link" @click="delImg(bannerId)">删除</a-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    i: {
      type: [Number, String],
      default: 0
    },
    bannerId: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      imgSrc: this.src,
      updateInfo: {
        bid: null,
        image: ''
      }
    };
  },
  methods: {
    ...mapActions(['GetBannerInfo', 'Upload', 'ChangeUpload', 'deleteUpload']),
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('请上传图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传的图不能超过2MB');
      }
      return isJpgOrPng && isLt2M;
    },
    async handleChange(file, fileList) {
      if (file.file.status === 'uploading') {
        this.loading = true;
        return ;
      }
      if (file.file.status === 'done') {
        this.updateInfo.image = file.file.response.result.name;
        const res = await this.ChangeUpload(this.updateInfo);
        if (res.code === 100) {
          this.$message.success(res.msg);
          this.imgSrc = file.file.response.result.url;
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      }
    },
    changeImg(bannerId) {
       this.updateInfo.bid = bannerId;
    },
    async delImg(bannerId) {
      const res = await this.deleteUpload({
        bid: bannerId,
      });
      if (res.code === 100) {
        this.$message.success(res.msg);
        // 刷新
        window.location.reload();
      } else {
        this.$message.error(res.msg);
      }
    }
  }
};
</script>

<style lang="less" scope>
  .wrap-content {
    align-items: center;
    margin-top: 24px;

    .labe {
      width: 55px;
      display: inline-block;
    }

    .pics {
      position: relative;
      width: 200px;
      height: 120px;
      z-index: 1;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: .7;
        z-index: 2;

        i {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

</style>