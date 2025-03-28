<template>
  <div>
    <div class="collection-title">选择数据表：</div>
    <el-tag
      v-for="item in collections"
      :key="item"
      :type="activeName === item ? 'success' : 'info'"
      @click="handleSelectCollection(item)"
      class="collection-tags"
      >{{ item }}</el-tag
    >
  </div>
  <div class="column-select">
    <div>选择显示字段:</div>
    <el-checkbox-group
      class="column-checkbox"
      v-model="checkedColumns"
      @change="handleCheckedColumnsChange"
    >
      <el-checkbox v-for="column in columns" :key="column" :value="column">{{
        column
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, getCurrentInstance } from "vue";
import {
  getAllMongodbCollections,
  getAllColumns,
//   getMockList,
} from "@/axios/api";

const collections = ref([]);
const columns = ref([]);
const checkedColumns = ref([]);
const selectCollectionName = ref("");
const dbName = ref("");
const activeName = ref("");
const { proxy } = getCurrentInstance();

const emit = defineEmits(["selectColInfo", "checkedColumnsChange"]);

onMounted(async () => {
    console.log('进来了')
  const result = await getAllMongodbCollections();
  if (result.code !== 200) {
    new proxy.$tips(result.msg, "error").showMsg();
    return;
  }
  let dbCollection = result.data;
  dbName.value = Object.keys(dbCollection)[0];
  collections.value = dbCollection[Object.keys(dbCollection)[0]];
  // let mockresult = await getMockList({limit:50})
  // console.log('@@@###',mockresult)
});

const handleSelectCollection = async (collection) => {
  if (collection !== selectCollectionName.value) {
    checkedColumns.value = [];
  }
  activeName.value = collection;
  selectCollectionName.value = collection;
  let params = { collectionName: collection };
  let result = await getAllColumns(params);
  if (result.code !== 200) {
    new proxy.$tips(result.msg, "error").showMsg();
    return;
  }
  columns.value = result.data[collection];
  checkedColumns.value = result.data[collection];
  emit(
    "selectColInfo",
    selectCollectionName.value,
    checkedColumns.value,
    dbName.value
  );
};

const handleCheckedColumnsChange = (vals) => {
  checkedColumns.value = vals;
  emit("checkedColumnsChange", vals);
};
</script>

<style scoped>
.collection-tags {
  margin: 10px;
}

.collection-title {
  font-size: 20px;
  margin-top: 5px;
}

.column-select {
  font-size: 20px;
  margin-top: 5px;
  border-top: 1px solid #eee;
}

.collection-tags:hover {
  background-color: rgb(121, 157, 192);
  cursor: pointer;
}

.column-checkbox {
  display: flex;
  flex-direction: column;
}

:deep(.el-checkbox__label) {
  font-size: 16px;
}
</style>
