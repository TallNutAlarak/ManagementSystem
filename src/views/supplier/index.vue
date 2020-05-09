<template>
    <div>
        <supplier-search
            :searchMap="searchMap"
            @fetchdata="fetchdata"
            @TogglePopupShow="TogglePopupShow"
            @getRef="getRef"
            @openPopup="openPopup"
        ></supplier-search>
        <supplier-list
            :supplierList="list"
            @openPopup="openPopup"
            @fetchdata="fetchdata"
        ></supplier-list>
        <supplier-paging
            :currentPage="currentPage"
            :pageSize="pageSize"
            :total="total"
            @fetchdata="fetchdata"
            @pageChange="pageChange"
            @pageSizeChange="pageSizeChange"
        ></supplier-paging>
        <supplier-popup
            :dialogFormVisible="dialogFormVisible"
            @TogglePopupShow="TogglePopupShow"
            @getPopupRef="getPopupRef"
            @fetchdata="fetchdata"
        ></supplier-popup>
    </div>
</template>
<script>
import supplierApi from "@/api/supplier";
import SupplierList from "./SupplierList";
import SupplierPaging from "./SupplierPaging";
import SupplierSearch from "./SupplierSearch";
import SupplierPopup from "./SupplierPopup.vue";
export default {
    data() {
        return {
            list: [],
            // 每页条数
            pageSize: 10,
            // 当前页码
            currentPage: 1,
            searchMap: {
                name: "",
                linkman: "",
                mobile: ""
            },
            total: 0,
            dialogFormVisible: false,
            popupRef: {}
        };
    },
    created() {
        this.fetchdata();
    },
    components: {
        SupplierList,
        SupplierPaging,
        SupplierSearch,
        SupplierPopup
    },
    methods: {
        fetchdata() {
            supplierApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(res => {
                    const resp = res.data;
                    this.list = resp.data.rows;
                    this.total = resp.data.total;
                });
            console.log('数据刷新')
        },
        pageChange(val) {
            this.currentPage = val;
        },
        pageSizeChange(val) {
            this.pageSize = val;
        },
        TogglePopupShow() {
            this.dialogFormVisible = !this.dialogFormVisible;
        },
        getPopupRef(ref) {
            this.popupRef = ref;
        },
        getRef() {
            return this.popupRef;
        },
        openPopup() {
            this.dialogFormVisible = true;
            setTimeout(() => {
                this.$nextTick(() => {
                    this.popupRef.resetFields();
                });
            }, 100);
        }
    }
};
</script>
