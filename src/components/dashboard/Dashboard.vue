<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
  <div ref="topActionRef" class="top-action-bar">
      <el-checkbox v-model="isRequestData" :label="t('fullData')" size="large" border @change="handleFullData"/>
  </div>
  <div class="main-content">
    <div ref="searchHeader" class="top-content">
      <el-row class="search-form" :gutter="10">
        <el-col
          class="form-item"
          :span="columnWidth"
          v-for="column in searchInfo.searchFormData"
          :key="column.label"
        >
          <span class="form-label">{{ t(column.label) }}</span>
          <el-select
            class="form-select"
            v-model="column.value"
            value-key="value"
            multiple
            allow-create
            clearable
            size="large"
            :offset="0"
            :show-arrow="false"
            :placeholder="column.filterType"
            :fit-input-width="true"
            @change="handleChange(column)"
            @clear="setCurrentSelect(column)"
            @visible-change="handleSelectToggle(column, $event)"
          >
            <template #empty>
              <div>{{ $t("noSelect") }}</div>
            </template>
            <!-- :multiple-limit="1" -->
            <!-- @focus="handleFocus(columns[index])" -->
            <!-- @clear="handleClear(index)" -->
            <template #header>
              <el-input
                v-model="column.searchInput"
                size="default"
                :placeholder="t('search.placeholder')"
                :prefix-icon="Search"
                clearable
                @input="handleSearch(column.searchInput)"
              />
              <div class="select-header-options">
                <span class="option-count">{{filteredOptions.length}} {{t('option')}}</span>
                <span class="option-btn">
                  <Buttons :buttons="buttons"></Buttons>
                </span>
              </div>
            </template>
            <el-option-group
              v-for="group in optionGroup"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :value="item.value"
                :disabled="item.disabled"
                :class="item.disabled ? 'filterInValid' : ''"
              >
                <span class="option-text">{{ item.value }}</span>
              </el-option>
            </el-option-group>
            <!-- <el-option
              v-for="item in filteredOptions"
              :key="item.value"
              :value="item.value"
            >
              <span class="option-text">{{ item.value }}</span>
            </el-option> -->
            <template #tag>
              <div class="select-tag">
                <span v-if="column.value.length" class="tag-status">{{column.isInclude?'':'NOT'}}</span>
                <span class="tag-label">
                  <span class="filterValid" :title="column.value.join(',')">{{column.value.join(',')}}</span>
                  <span v-if="column.ignoredValue.length" class="filterInValid"><span v-show="column.value.length">,</span>{{column.ignoredValue.join(',')}}</span>
                </span>
                <span v-if="column.value.length" class="tag-count">{{column.value.length}}</span>
              </div>
            </template>
            <template #footer>
              <el-radio-group v-model="column.isInclude" @change="handleChange(column)" size="default" class="radio-group" border-color="none" text-color="#ffffff" fill="#69707d">
                <el-radio-button :label="t('Include')" :value="true" />
                <el-radio-button :label="t('Exclude')" :value="false" />
              </el-radio-group>
            </template>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="center-content">
      <el-row class="table-content" :gutter="10">
        <el-col :span="24">
          <div style="text-align: right">
            <DropdownMenuList
              placement="bottom"
              popper-class="header-btn-dropdown"
              trigger="click"
              :list="columns"
              :icon="dropdownIcon"
              :maxHeight="380"
              @handleChangeColumns="handleChangeColumns"
            />
          </div>
          <el-table
            ref="mainTable"
            v-loading="loading"
            :data="filteredData"
            :height="tableHeight"
            stripe
            :sort-by="sortBy"
            :sort-orders="sortOrders"
            size="small"
            :header-cell-style="{ 'text-align': 'left', color: '#1a1c21' }"
            cell-class-name="table-cell"
            class="custom-table"
            show-overflow-tooltip
            v-el-table-infinite-scroll="loadMore"
            :infinite-scroll-disabled="scrollAble"
            :infinite-scroll-distance="200"
            :infinite-scroll-immediate="false"
          >
            <template #empty>
              <div>{{ $t("table.notdata") }}</div>
            </template>
            <el-table-column width="50">
              <template #default="scope">
                <div
                  @click="handleDrawerOpen(scope.row, scope.$index)"
                  class="table-svg-box"
                >
                  <!-- <el-button type="primary" @click="handleDrawerOpen(scope.row)">打开抽屉</el-button> -->
                  <svg
                    v-if="drawerState[scope.$index]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      d="m1.146 14.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4ZM6.5 8A1.5 1.5 0 0 1 8 9.5v3a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1 0-1h3Zm2-5a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 8 6.5v-3a.5.5 0 0 1 .5-.5Zm1.651 2.146 4-4a.5.5 0 0 1 .765.638l-.057.07-4 4a.5.5 0 0 1-.765-.638l.057-.07 4-4-4 4Z"
                      fill="#1268A7"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    class="euiIcon euiButtonIcon__icon css-1sl2y4w-euiIcon-s-inherit"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m4.354 12.354 8-8a.5.5 0 0 0-.708-.708l-8 8a.5.5 0 0 0 .708.708ZM1 10.5a.5.5 0 1 1 1 0v3a.5.5 0 0 0 .5.5h3a.5.5 0 1 1 0 1h-3A1.5 1.5 0 0 1 1 13.5v-3Zm14-5a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 1 0-1h3A1.5 1.5 0 0 1 15 2.5v3Z"
                      fill="#1268A7"
                    ></path>
                  </svg>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-for="(column,index) in columns.filter((c) => c.isShow)"
              :key="`col-${column.name}`"
              :prop="column.name"
              :label="column.name"
              width="120"
            >
            <template #header>
              <div class="header-container" >
                  <span class="column-text"> {{ t("col." + column.name) }} </span>
                  <el-popover
                    :ref="`col-${column.name}`"
                    :visible="activePopover === column.name"
                    trigger="click"
                    :width="150"
                    @hide="handlePopoverHide"
                    placement="bottom-start"
                    :teleported="true"
                    :hide-after="500"
                    v-if="dialogVisible"
                    @before-leave="handlePopoverBeforeLeave"
                  >
                    <template #reference>
                      <div class="more-btn" @click="handlePopoverShow(column.name)" :data-popover-anchor="column.name">
                        <el-icon>
                          <More />
                        </el-icon>
                      </div>
                    </template>
                    <div  @mouseleave="handlePopoverHide">
                      <OperationDetail
                        :column="column.name"
                        @handleOperation="handleOperation"
                      ></OperationDetail>
                    </div>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="filteredData.length" class="pagination-block">
            <!-- <el-pagination
              v-model:current-page="page.currentPage"
              v-model:page-size="page.pageSize"
              :page-sizes="[10, 25, 50,100]"
              layout="total, sizes, prev, pager"
              @current-change="handleCurrentPageChange"
              @size-change="handlePagesizeChange"
              v-model:total="page.total"
            />
            <el-icon  @click="handleNextPage"  class="next-page-icon"><ArrowRightBold /></el-icon> -->
            <span>{{t("dashboard.total")}}</span><span class="total-count">{{page.total}} </span><span>{{t("dashboard.records")}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <DocumentDrawer
      direction="rtl"
      title="JSON"
      :drawerVisible="drawerVisible"
      :data="jsonData"
      @handleClose="handleDrawerClose"
    ></DocumentDrawer>
  </div>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  watch,
  onMounted,
  computed,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { getCustomers } from "@/axios/api";
import { Search } from "@element-plus/icons-vue";
import DocumentDrawer from "@/components/dashboard/DocumentDrawer.vue";
import { defaultSearchColumns } from "@/utils/fields"
import { ElMessage } from "element-plus";
import DropdownMenuList from "./DropdownMenuList.vue";
import OperationDetail from "./OperationDetail.vue";
import Buttons from "@/components/button/Buttons.vue";
import { ShowIcon,HideIcon,AscSortIcon, DescSortIcon} from "../../utils/icons";
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { debounce } from "@/utils/utils";
const dropdownIcon = ref(require("@/assets/add-remove-columns.png"));

const isRequestData = ref(false); //true 请求云上数据  false 本地数据
const sortBy = ref(null);
const sortOrders = ref(null);
const activePopover = ref('')
const dialogVisible=ref(true)
//列信息
const columns = ref([]);
const searchInfo = reactive({
  searchInput:"", //当前搜索下拉框数据条件
  searchFormData:[], //搜索框表单数据
  selectOptions:[], //下拉框数据
  ignoredOptions:[], //下拉框忽略数据
  currentSelect:[], //当前筛选字段
  showSelcetOptions:[], //选中的选项显示/隐藏
  colOptions:[], //当前下拉框的数据
  searchParam:[]
})
// 表格数据
const loading = ref(false);
const tableData = ref([]);
// const filteredData = ref([]);
// const pageTableData = ref([]);
const tableHeight = ref(200);
const topActionRef = ref(null);
const searchHeader = ref(null);
const mainTable = ref(null);

const drawerVisible = ref(false);
const jsonData = ref({});
const drawerState = ref([]);
const showColumnIcon = ref([]);
let lastEvaluatedkey = {};

const scrollAble = ref(false)


// const handleScroll = (event) => {
//   console.log(event)
// //   const { scrollTop, scrollHeight, clientHeight } = event.target
// //   console.log(scrollTop, scrollHeight, clientHeight)
// // }
// } 

// const showIconInfo = ref(true);

const page = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 0,
});

const buttons = reactive([
  {
    type: "",
    btnText: "",
    icon: true,
    get svg(){
      return searchInfo.showSelcetOptions ? ShowIcon:HideIcon
    },
    link:true,
    className: "btn-icon",
    get iconClass(){
      return searchInfo.showSelcetOptions ? 'btn-show':'btn-hide'
    },
    tooltipsPlacement:'top',
    get tooltipsText() {
      return searchInfo.showSelcetOptions ? 'btn.showTips':'btn.hideTips'
    },
    eventFn: function () {
      const allOptions = searchInfo.selectOptions[searchInfo.currentSelect.prop];
      const selectOption = searchInfo.currentSelect.value;
      if(searchInfo.showSelcetOptions){
        const arr = allOptions.filter((v)=>selectOption.includes(v.value));
        searchInfo.colOptions = arr;
        searchInfo.showSelcetOptions = false;
      }else{
        searchInfo.showSelcetOptions = true;
        searchInfo.colOptions = allOptions;
      }
    },
  },
  {
    type: "",
    btnText: "",
    icon: true,
    get svg(){
      return searchInfo.currentSelect.sortType === 'asc' ? AscSortIcon:DescSortIcon
    },
    link:true,
    className: "btn-icon",
    get iconClass(){
      return searchInfo.showSelcetOptions ? 'btn-sort':'btn-sort disable'
    },
    tooltipsPlacement:'top',
    get tooltipsText() {
      return (searchInfo.showSelcetOptions && searchInfo.colOptions.length > 0) ?(searchInfo.currentSelect.sortType === 'asc' ?'btn.sortAsc':'btn.sortDesc'):'btn.noDataSort'
    },
    get disabled(){
      return searchInfo.showSelcetOptions ? false : true
    },
    eventFn: function () {
      const sort = searchInfo.currentSelect.sortType === 'asc' ? 'desc':'asc';
      searchInfo.currentSelect.sortType = sort;
    },
  },
]);

const handleChangeColumns = (cols)=>{
  columns.value = cols;
}



onMounted(async () => {
  loadData();

  // 首次计算
  handleResize();
  
  
  // 窗口变化监听
  window.addEventListener('resize', handleResize);
  
  // 监听搜索栏高度变化
  const resizeObserver = new ResizeObserver(handleResize);
  if (searchHeader.value) {
    resizeObserver.observe(searchHeader.value);
  }
  
  // 组件卸载时清理
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    resizeObserver.disconnect()
  })
  
});

const columnWidth = ref(6);
const handleResize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 840) {
    columnWidth.value = 24; // 小屏幕时占满整行
  } else if (screenWidth >= 840 && screenWidth < 1245) {
    columnWidth.value = 12; // 中等屏幕时占一半
  } else if (screenWidth >= 992 && screenWidth < 1655) {
    columnWidth.value = 8; // 中等屏幕时占一半
  } else {
    columnWidth.value = 6; // 大屏幕时占三分之一
  }
  calculateTableHeight();
}


const loadMore =  debounce( ()=>{
  if(scrollAble.value === true){
    return;
  }
  let params = {
      size: 100,
      filterReq: {
        query: searchInfo.searchParam || [],
      },
      lastEvaluatedKey: lastEvaluatedkey,
    };
    loading.value = true;
    getCustomers(params)
      .then((result) => {
        loading.value = false;
        const items = result.data.items;
        if(items.length <page.pageSize*4){
          scrollAble.value = true;
        }else{
          scrollAble.value = false;
        }
        lastEvaluatedkey = result.data.lastEvaluatedKey;
        tableData.value = [...tableData.value,...items];
        page.total = tableData.value.length;
        items.map((v) => {
          const keys = Object.keys(v);
          keys.map((col) =>{
            if(!columns.value.some((item) => item.name === col) ){
              columns.value.push({name:col,isShow:true})
            }
          })
        });
        // updateSearchFormData();
      })
      .catch((err) => {
        loading.value = false;
        console.error(err?.msg);
      });
},500)

const handlePopoverBeforeLeave=()=>{
  dialogVisible.value = false
  setTimeout(() => {
    dialogVisible.value = true
  }, 100)
}

// 计算可用高度
const calculateTableHeight = () => {
  const windowHeight = window.innerHeight;
  const topActionHeight = topActionRef.value?.offsetHeight || 0;
  const topHeight = searchHeader.value?.offsetHeight || 0;
  const padding = 146; // 上下边距总和
  const height =  windowHeight - topActionHeight - topHeight - padding;
  tableHeight.value = height > 200 ? height : tableHeight.value;
}

const handlePopoverHide = () => {
        activePopover.value = '';
};

const handlePopoverShow = (column) => {
 activePopover.value =  activePopover.value === column ? '':  column;
}


const loadData = async () => {
  let params = {
    size: page.pageSize*4,
    filterReq: {
      query: searchInfo.searchParam || [],
    },
  };
  loading.value = true;
  columns.value = [];
  await getCustomers(params)
    .then((result) => {
      loading.value = false;
      const items = result.data.items;
      if(items.length < page.pageSize*4){
        scrollAble.value = true;
      }else{
        scrollAble.value = false;
      }
      lastEvaluatedkey = result.data.lastEvaluatedKey;
      tableData.value = items;
      page.total = tableData.value.length;
      updatePageData()
      let columnsValue = [];
      items.map((v) => {
        const keys = Object.keys(v);
        columnsValue = [...new Set([...columnsValue,...keys])];
      });
     columns.value =  columnsValue.map((col) =>{
        return {name:col,isShow:true}
      })
      updateSearchFormData();
    })
    .catch((err) => {
      loading.value = false;
      console.error(err?.msg);
    });
};

const handleFullData = () =>{
  searchInfo.searchFormData = [];
  searchInfo.searchParam = [];
  page.total = 0;
  nextTick(()=>{
    loadData();
  })
}

// update search form
const updateSearchFormData = () =>{
  
  if(searchInfo.searchFormData.length === 0){
      // const optionArr = getSelectOptions();
      // selectOptions.value = optionArr.options;
      // ignoredOptions.value = [];
      defaultSearchColumns.map((v)=>{
          searchInfo.searchFormData.push({
            label:v,
            prop:v,
            isInclude:true,
            value:[],
            ignoredValue:[],
            searchInput:"",
            sortType:'asc',
            filterType:'Any'
            // options:optionArr[v],
          })
      });
  }
  // else if(!isRequestData.value){
    // const optionArr = getSelectOptions();
    // selectOptions.value = optionArr.options;
    // ignoredOptions.value = optionArr.ignoredOptions;
    // console.log('111111111',optionArr)
  // }
  const optionArr = getSelectOptions();
  searchInfo.selectOptions = optionArr.options;
  searchInfo.ignoredOptions = optionArr.ignoredOptions || [];
}

//获取下拉框数据
const getSelectOptions = () => {
  const options = {};
  const ignoredOptions = {};
  const data = isRequestData.value ? tableData.value : filteredData.value;
  searchInfo.searchFormData.forEach((column) => {
    
    const uniqueValues = [
      ...new Set(data.filter(item => item[column.label] != null && item[column.label] !== '').map((item) => item[column.label])),
    ];
    // const selectedOptions = searchInfo.searchFormData.find((v)=>v.label === column.name); //已选项
    if(column.ignoredValue?.length > 0){
      
      // 将 array2 转换为 Set
      const values = new Set(uniqueValues);
      // 筛选出包含的元素
      // const included = selectedOptions.ignoredValue.filter(item => values.has(item));
      // 筛选出不包含的元素
      const excluded = column.ignoredValue.filter(item => !values.has(item));
      // selectedOptions.value = selectedOptions.ignoredValue;
      column.ignoredValue = excluded;
 
      ignoredOptions[column.label] = excluded?.map((option) => {
        return {
          label:column.label,
          value:option,
          // disabled:true
        }
      }) || [];
    }
  
    const defaultOptions = searchInfo.selectOptions[column.label];
    if(defaultOptions?.length > 0){
      if(column.label==='modelName1'){
        options[column.label] = defaultOptions;
      }else if(column.label==='clientCode' && searchInfo.currentSelect.label !== 'modelName1'){
        options[column.label] = defaultOptions;
      }else{
        options[column.label] = uniqueValues.map((value) => ({
          label: column.label,
          value: value,
        }));
      }
    }else{
      options[column.label] = uniqueValues.map((value) => ({
        label: column.label,
        value: value,
      }));
    }
   
    // else if((column==='modelName1' || column==='clientCode') && currentSelect.value.label === 'clientCode'){
    //   options[column] = selectOptions.value[column];
    // }else{
      
    // }
  });
  return {
    options,
    ignoredOptions
  };
};

const handleOperation = async ({ column, operation }) => {
  switch (operation) {
    case "moveLeft":{
      if (column === columns.value[0].name) {
        return;
      }
      let leftIndex = columns.value.findIndex((item) => item.name === column);
      columns.value = swapElements(columns.value, leftIndex);
      handlePopoverHide()
      break;
    }
    case "moveRight":{
      if (column === columns.value[columns.value.length - 1].name) {
        return;
      }
      let rightIndex = columns.value.findIndex((item) => item.name === column);
      [columns.value[rightIndex], columns.value[rightIndex + 1]] = [
        columns.value[rightIndex + 1],
        columns.value[rightIndex],
      ];
      handlePopoverHide()
      break;
    }
    case "copyName":
      try {
        await navigator.clipboard.writeText(column);
        ElMessage.success(t("dashboard.copySuccess"));
      } catch (err) {
        ElMessage.error(t("dashboard.copyFailed"));
      }
  
      break;
    case "copyColumn":{
      let copArr = [];
      searchInfo.selectOptions[column].forEach((item) => {
        copArr.push(item.value);
      });
      try {
        await navigator.clipboard.writeText(JSON.stringify(copArr));
        ElMessage.success(t("dashboard.copySuccess"));
      } catch (err) {
        ElMessage.error(t("dashboard.copyFailed"));
      }
     
      break;
    }
    case "sortAsc":
      sortBy.value = column;
      sortOrders.value = "ascending";
      // pageTableData.value.sort((a, b) => {
        tableData.value.sort((a, b) => {
        return a[column] > b[column] ? 1 : -1;
      });
   
      break;
    case "sortDesc":
      sortBy.value = column;
      sortOrders.value = "descending";
      // pageTableData.value.sort((a, b) => {
        tableData.value.sort((a, b) => {
        return a[column] < b[column] ? 1 : -1;
      });
      
      break;
    default:
      break;
  }
};

const swapElements = (arr, index) => {
  if (index <= 0 || index >= arr.length - 1) {
    return arr;
  }
  [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
  return arr;
};

// const showOptinalMessage = () => {
//   showIconInfo.value = true;
// };

const handleDrawerOpen = (rowData, index) => {
  drawerVisible.value = true;
  jsonData.value = rowData;
  drawerState.value[index] = !drawerState.value[index];
};

const handleDrawerClose = () => {
  drawerVisible.value = false;
  drawerState.value.forEach((item, index) => {
    drawerState.value[index] = false;
  });
};

watch(columns, (newVal) => {
  newVal.forEach(() => {
    showColumnIcon.value.push(false);
  });
});


const handleSearch = (val) => {
  searchInfo.searchInput = val || '';
};

// 过滤后的选项（计算属性）
const filteredOptions = computed(() => {
  const keyword = searchInfo.searchInput.toLowerCase();
  const data = searchInfo.colOptions.filter(item =>
    item.value?.toLowerCase().includes(keyword)
  );
  // sort value
  return sortArray(data, 'value', searchInfo.currentSelect.sortType);
});

const ignoredOptions = computed(() => {
  return  searchInfo.ignoredOptions[searchInfo.currentSelect.label];
});

const optionGroup = ref([
  {
    label: '',
    options: filteredOptions,
  },
  {
    label: 'Ignored selection',
    options: ignoredOptions,
  },
]);


const sortArray = (data, field, order = 'asc') => {
  return data.sort((a, b) => {
    if (a[field] < b[field]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// 监听下拉框状态
const handleSelectToggle = (column,visible) => {
  if (visible) {
    searchInfo.searchInput = column.searchInput || '';
    setCurrentSelect(column);
    searchInfo.showSelcetOptions = true;
  }
}

const setCurrentSelect = (column) =>{
  searchInfo.currentSelect = column;
  searchInfo.colOptions = searchInfo.selectOptions[column.prop];
}

//下拉数据选中
const handleChange = debounce(() => {
  searchInfo.searchParam = [];
  scrollAble.value = false;
  searchInfo.searchFormData.map((columnItem)=>{
    //切换模型，清空其他数据
    // if(columns.label !== 'modelName1'){
    //   const columnOptions = searchInfo.selectOptions[columns.prop].map(v=>{
    //     return v.value
    //   });
    //   const excluded = columns.value.filter(v => !columnOptions.includes(v));
    //   columns.ignoredValue = excluded;
    //   console.log(columns.prop,'ignoredValue',excluded)
    // }
    if(searchInfo.currentSelect.label === 'modelName1' && columnItem.label !== 'modelName1'){
      columnItem.value = [];
    }
    // if(searchInfo.currentSelect.label === 'clientCode' && columnItem.label !== 'modelName1'){
    //   columnItem.value = [];
    // }

    let dataArr = [];
    let item = columnItem.value;
    if(typeof(item) === 'string'){
      dataArr.push(item);
    }else{
      dataArr = item;
    }
    if(dataArr?.length){
      const params = {
        type:'logic',
        logic:'OR', //OR/AND
        negative:false,
        items:[]
      };
      let operator = '=';
      if(!columnItem.isInclude){
        params.negative = true;
      }
      dataArr.map((v)=>{
        const items = {
          attribute:columnItem.prop,
          operator:operator,
          value:v
        }
        params.items.push(items);
      })
      searchInfo.searchParam.push(params);
    }
  })
  //搜索
  if(isRequestData.value){
    loadData();
  }else{
    applyFilters();
  }
}, 500) // 设置延迟时间为 500 毫秒);

const applyFilters = () =>{
  page.total = filteredData.value.length;
  updateSearchFormData();
}

const filteredData = computed(() => {
  if(isRequestData.value){
    return tableData.value;
  }else{
     return tableData.value.filter(item => {
      return searchInfo.searchFormData.every((column)=>{
        let searchVal = [];
        const defaultOptions = searchInfo.selectOptions[column.label];
        if(!column.isInclude){
          defaultOptions.some((v)=> {
            if(!column.value.includes(v.value)){
              searchVal.push(v.value)
            }
          });
        }else{
          searchVal = column.value;
        }
        if(searchVal.length === 0){
          return true;
        }else{
        return searchVal.some((val)=>{
          return item[column.prop].toString().toLowerCase().includes(val.toString().toLowerCase());
        })
        }
        
      });
    });
  }
});

const updatePageData=()=>{
  //  pageTableData.value = tableData.value.slice((page.currentPage - 1)*page.pageSize, page.pageSize*page.currentPage)
  // drawerState.value = new Array(pageTableData.value.length).fill(false)
  drawerState.value = new Array(tableData.value.length).fill(false)
}

</script>

<style scoped>
.container{
  overflow: hidden;
  height: 100%;
}
.top-action-bar{
  padding: 5px 10px 5px 10px;
  background-color: #fafbfd;
  border-bottom:1px solid #ebeef5;
}
.total-count{
  margin:0 10px
}
.main-content {
  background-color: #f7f8fc;
  color: rgb(52, 55, 65);
  height: calc(100% - 99px);
  overflow-y: auto;
}
.top-content {
  margin: 0 8px;
  padding-bottom: 4px;
  padding-top:5px;
}
.center-content {
  padding: 5px 10px;
}

.header-icon {
  margin-left: 10px;
  cursor: pointer;
}

.header-icon:hover {
  cursor: pointer;
}

.header-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.more-btn {
  position: absolute;
  right: 0;
  display: none;
  cursor: pointer;
  margin-left: 10px;
  flex: 1;
}

.header-container:hover .more-btn {
  display: block;
}
.optional-row-message {
  display: flex;
  margin: 3px 0;
}

.icon-box {
  margin-right: 5px;
}

.right-btn {
  text-align: right;
  margin: 3px 0;
}

.table-content {
  height: 100%;
  min-height: 380px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0.9px 4px,
    rgba(0, 0, 0, 0.06) 0px 2.6px 8px, rgba(0, 0, 0, 0.05) 0px 5.7px 12px,
    rgba(0, 0, 0, 0.04) 0px 15px 15px;
}

.table-content .el-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

:deep(.table-content .el-table tr) {
  height: 32px;
}

:deep(.table-content .el-table tr.el-table__row--striped td.el-table__cell) {
  background-color: #f5f7fa;
}

.right-content {
  border: 1px solid #eee;
  height: 100%;
}

.next-page-icon{
  cursor: pointer;
  margin-left: 5px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.message-text:hover {
  cursor: pointer;
  text-decoration: underline;
}

.form-item {
  margin: 5px 0;
  display: flex !important;
}

.form-label {
  height: 38px;
  line-height: 38px;
  background-color: var(--el-fill-color-blank);
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #d3dae6e6;
  border-right: 0;
  text-align: center;
  padding: 0px 12px;
  justify-content: center;
  text-align: center;
  background-color: #e9edf3;
  color: #1a1c21;
  font-size: 12px;
  font-weight: 600;
}

.form-select {
  flex: 1;
}

.form-select :deep(.el-select__wrapper),.form-select:hover :deep(.el-select__wrapper)  {
  height: 38px;
  line-height: 38px;
  border: 1px solid #d3dae6e6;
  border-left: 0;
  box-shadow: none;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.form-select :deep(.el-select__selected-item.el-tooltip__trigger){
    position: absolute;
    right: 0;
}

.form-select :deep(.el-tag){
  background-color: transparent;
  padding: 0;
  color: #000;
}
.form-select .select-tag{
  display: inline-flex;
}
.form-select .tag-status{
  color: #bd271e;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
}
.form-select .tag-label{
  max-width: 290px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.form-select .tag-label .filterValid{
  color: rgb(52, 55, 65);
  font-size: 1.2rem;
  font-weight: 500;
}
.form-select .tag-label .filterInValid{
  color: #69707d;
  font-weight: 400;
  text-decoration: line-through;
}
.form-select .tag-count{
  position: absolute;
  right: 0;
  top: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  background-color: rgb(77, 210, 202);
  cursor: inherit;
}

.select-header-options{
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 5px;
}
.select-header-options .option-count{
  
}
.select-header-options .option-btn{
  flex: 1;
  text-align: right;
}

:deep(.el-select-dropdown__footer){
  background-color: rgb(247, 248, 252);
}
.radio-group{
    /* padding: 2px; */
    background-color: rgb(249, 251, 253);
    /* border: 1px solid rgba(211, 218, 230, 0.9); */
    border-radius: 4px;
}

.custom-table {
  border-radius: 6px;
  min-width: 120px;
  min-height: 200px;
}

.table-cell {
  text-align: "center";
  color: "#343741";
}

.pagination-block {
  display: flex;
  justify-content: left;
  align-items: center;
  padding:10px 10px;
  font-size: 12px;
}

.drawer-content {
  text-align: right;
  color: #1268a7;
  font-size: 14px;
}

.json-content {
  margin-top: 10px;
}

.drawer-content span:hover {
  cursor: pointer;
  text-decoration: underline;
}

.table-svg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
<style>
.el-select-dropdown__header{
  padding: 10px 10px 5px 10px !important;
}

.option-btn .btn-icon{
  width: 20px;
  height: 20px;
}

.btn-show{
 padding: 3px;
}

.btn-hide{
  padding: 3px;
  border-radius: 4px;
  color: rgb(0, 97, 166);
  background-color: rgb(204, 228, 245);
}

.btn-sort{
  cursor: pointer;
}

.btn-sort.disable{
  cursor: no-drop;
  opacity: 0.3;
}
</style>