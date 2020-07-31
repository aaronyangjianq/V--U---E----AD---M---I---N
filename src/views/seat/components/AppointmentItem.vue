<template>
  <div class="wrap flex-row">
    <div :class="`${ flag ? 'content' : 'content-use'} flex-column`">
      <span class="time">{{ time }}</span>
      <span class="state">{{ flag ? '满员': '空闲' }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: String,
        default: ''
      },
      flag: {
        type: Boolean,
        default: false
      }
      // state: {
      //   type: 
      // }
    }
  };
</script>

<style lang="less" scoped>
  .wrap {
    width: 130px;
    height: 60px;
    align-items: center;
    justify-content: center;
  }
  .wrap .content {
    width: 110px;
    height: 60px;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: grey;
    border-radius: 4px;
  }
  .wrap .content-use {
    width: 110px;
    height: 60px;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: skyblue;
    border-radius: 4px;
  }
</style>