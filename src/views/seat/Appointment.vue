<template>
  <div class="users-box">
    <!-- 时间选择 -->
    <a-tabs 
      :default-active-key="0" 
      @change="onDateChange" 
      :tabBarStyle="tabStyles">
      <a-tab-pane 
        v-for="date in dates" 
        :key="date.key" 
        :tab="date.val">
      </a-tab-pane>
    </a-tabs>
    <!-- 区域选择 -->
    <a-tabs 
      :default-active-key="0" 
      @change="onAreaChange"
      style="margin-top: 2px;"
      :tabBarStyle="tabStyles">
      <a-tab-pane 
        v-for="area in areas" 
        :key="area.key" 
        :tab="area.val"/>
    </a-tabs>
    <!-- 列表 -->
    <div class="seat-apponit">
      <div class="seat-apponit-box">
        <appoint-header :items="columns" style="margin-top: 10px;"/>
        <div class="flex-row">
          <div class="flex-column" v-for="(column, index) in columns" :key="index">
            <appoint-time 
              :style="{marginTop: (index > 0 ? 15 : 0) +'px'}" 
              v-for="(row, index) in column.list" 
              :key="row.value"
              :time="row.label"
              :flag="row.flag"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { AppointHeader, AppointTime } from './components';
  // import { datesInWeekly } from './configs';
  import { mapActions } from 'vuex';

  export default {
    components: {
      AppointHeader, AppointTime
    },
    data() {
      return {
        tabStyles: {
          marginBottom: 0, 
          backgroundColor: '#e8e8e8', 
          // paddingBottom: '10px', 
          paddingLeft: '10px', 
          paddingRight: '10px'
        },
        // 可选择的日期
        dates: [],
        // 可选择的区域
        areas: [],
        rows: [],
        isLoading: false,
        columns: [],
        // 查询条件
        queryData: {
          aid: '',
          date: '',
        },
      };
    },
    created() {
      // 初始化
      this.getPlaceSeat(this.queryData);
    },
    methods: {
      ...mapActions(['PlaceSeat']),
      async getPlaceSeat(data) {
        const rawData = await this.PlaceSeat(data);
        if (rawData.result) {
          this.dates = rawData.result.day.map(x => x);
          this.areas = rawData.result.area.map(x => x);
          this.columns = rawData.result.place.map(x => x);
        }
      },
      async onDateChange(activeKey) {
        this.queryData.date = activeKey;
        await this.getPlaceSeat(this.queryData);
      },
      async onAreaChange(activeKey) {
        this.queryData.aid = activeKey;
        await this.getPlaceSeat(this.queryData);
      },
    }
  };
</script>

<style lang="less" scoped>
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  .wrap-cell {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .wrap-cell .content {
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 60px;
    background-color: lightgrey;
    border-radius: 4px;
    color: white;
  }

  .seat-apponit {
    overflow-y: auto;

    .seat-apponit-box {
      min-width: 800px;
    }
  }
</style>