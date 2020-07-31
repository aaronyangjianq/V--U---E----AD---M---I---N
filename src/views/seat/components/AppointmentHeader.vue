<template>
  <div class="wrap-head">
    <div class="wrap-items" v-for="(item, index) in items" :key="index">
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => {
          return [];
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrap-head {
    display: flex;
  }
  .wrap-items {
    display: flex;
    flex-direction: column;

    p {
      width: 130px;
      height: 50px;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
</style>