<template>
  <div class="content-box">
    <h3 style="color: #ff0000;">备注：图片更换后自动生效</h3>

    <!-- 图片列表 -->
    <banner 
      v-for="(banner, index) in banners" 
      :key="banner.bid"
      :i="index+1"
      :src="banner.img"
      :bannerId="banner.bid"
    />

    <!-- 新增上传 -->
    <div class="flex-row wrap-content">
      <span class="labe">第{{banners.length + 1}}张：</span>
      <a-upload
        name="image"
        list-type="picture-card"
        class="avatar-uploader"
        action="/admin/banner/upload"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="handleChange"
      >
        <a-icon :type="loading ? 'loading' : 'plus'" />
      </a-upload>
    </div>
  </div>
</template>

<script>
import Banner from './components/banner';
import { mapActions } from 'vuex';
export default {
  components: {
    Banner
  },
  data() {
    return {
      loading: false,
      banners: [],
      fileList: [],
      dataInfo: []
    };
  },
  async created () {
    const rawdata = await this.GetBannerInfo();
    this.banners = rawdata.result;
  },
  methods: {
    ...mapActions(['GetBannerInfo', 'Upload', 'AddUpload', 'ChangeUpload', 'deleteUpload']),
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
    async handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        const imageInfo = {
          image: info.file.response.result.name
        };
        // console.log('imageInfo', imageInfo);
        await this.AddUpload(imageInfo);
        const rawdata = await this.GetBannerInfo();
        this.banners = rawdata.result;
        this.loading = false;
      }
    },
  }
};
</script>

<style lang="less" scoped>
  .wrap-content {
    align-items: center;
    margin-top: 24px;

    .labe {
      width: 55px;
      display: inline-block;
    }
  }
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>