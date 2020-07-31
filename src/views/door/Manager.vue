<template>
  <div class="content-box">
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :form="form" 
      @submit="onFilterSubmit" 
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <!-- 开门时间 -->
      <a-form-item label="开门时间：">
        <a-range-picker
          v-decorator="[ 'createDate' ]"
          separator="到"
          :show-time="false"
          format="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          @change="onchangeDate"
          style="width: 280px;"
        />
      </a-form-item>
      <!-- 开门方式 -->
      <a-form-item label="开门方式：">
        <a-select
          :value="searchInfo.type"
          @change="onDoorChanged"
          style="width: 150px;"
        >
          <a-select-option 
            v-for="type in types" 
            :key="type.key" 
            :value="type.key">
            {{ type.val }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onOpenDoor"  style="margin-left: 200px;" :loading="openDoorLoading">
          点击开门
        </a-button>
        <a-button type="primary" html-type="submit" style="margin-left: 20px;">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 列表 -->
    <a-table
      tableLayout="fixed"
      :columns="columns" 
      :pagination="pagination"
      :data-source="doorList" 
      :loading="isLoading"
      :rowKey="record => record.id" 
      style="background-color: white; margin-top: 32px;"
      @change="onTableChange">
    </a-table>
  </div>
</template>

<script>
  import { columns } from './configs';
  import { mapActions } from 'vuex';
  export default {
    data () {
      return {
        form: this.$form.createForm(this),
        // 筛选查询的参数
        types: [],
        // 开门请求loading
        openDoorLoading: false,
        // 列表数据
        isLoading: false,
        columns: columns,
        pagination: {
          pageSize: 30,
        },
        doorList: [],
        searchInfo: {
          start: '',
          end: '',
          type: 0,
          page: 1,
        }
      };
    },
    created() {
      this.getOpenDoorList(this.searchInfo);
    },
    methods: {
      ...mapActions(['OpenDoorList', 'Opendoor']),
      async getOpenDoorList (data) {
        const rawData = await this.OpenDoorList(data);
        if (rawData.result) {
          this.doorList = rawData.result.list.map(x => x);
          this.pagination = {
            ...rawData.result.page_info,
            pageSize: rawData.result.page_info.limit,
            current: rawData.result.page_info.page,
          };
          this.types = rawData.result.type.map(x => x);
        }
      },
      async onOpenDoor() {
        this.openDoorLoading = true;
        const res = await this.Opendoor();
        if (res.code === 100) {
          this.$message.success(res.msg);
          // 刷新列表
          await this.getOpenDoorList(this.searchInfo);
        } else {
          this.$message.error(res.msg);
        }
        this.openDoorLoading = false;
      },
      onFilterSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            await this.getOpenDoorList(this.searchInfo);
          }
        });
      },
      async onTableChange(pagination, filters, sorter) {
        const doorInfo = {
          ...this.searchInfo,
          page: pagination.current
        };
        await this.getOpenDoorList(doorInfo);
      },
      async onchangeDate(date, dateString) {
        this.searchInfo.start = dateString[0];
        this.searchInfo.end = dateString[1];
        await this.getOpenDoorList(this.searchInfo);
      },
      async onDoorChanged(value) {
        this.searchInfo.type = value;
        await this.getOpenDoorList(this.searchInfo);
      }
    }
  };
</script>

<style lang="less" scoped>
  .wrap-button-cdkey {
    align-items: center;
    justify-content: center;
  }
</style>