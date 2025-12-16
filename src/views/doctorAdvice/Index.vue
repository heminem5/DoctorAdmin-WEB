<template>
    <x-main>
        <!--搜索查询表单-->
        <el-row class="search-row">
                                                                                                     <div v-if="user.role!=='doctor'" class="search-item">
                            <span>医生</span>
                            <div style="width: 150px">
                                <x-select-table :header="[{label:'医生',field:'name',width:'100%'}]"
                                                v-model="searchForm.doid"
                                                :queryParams="[{name:'name',label:'医生'}]"
                                                api="/doctor/list"
                                                labelField="name"
                                                valueField="id"
                                ></x-select-table>
                            </div>
                        </div>
                                                                                                             <div v-if="user.role!=='patient'" class="search-item">
                            <span>患者</span>
                            <div style="width: 150px">
                                <x-select-table :header="[{label:'患者',field:'name',width:'100%'}]"
                                                v-model="searchForm.huanz"
                                                :queryParams="[{name:'name',label:'患者'}]"
                                                api="/patient/list"
                                                labelField="name"
                                                valueField="id"
                                ></x-select-table>
                            </div>
                        </div>
                                                                                                                                    
            <button class="btn btn-m" type="primary" @click="loadThisPage">查询</button>
            <button class="btn btn-success btn-m" v-if="user && ( user.role.toLowerCase() == 'doctor'   )" @click="onAdd">新增</button>
            <button class="btn btn-m" v-if=conf.EnableExcel @click="onExcel">导出excel</button>
            <button class="btn btn-m" v-if="user && (user.role.toLowerCase() == '')" @click="importExcel">导入excel</button>
        </el-row>
        <!--搜索查询表单 end-->

        <div class="statistic-info" v-if="pager.statisticInfo">
            {{pager.statisticInfo}}
        </div>

        <!--数据表-->
        <el-table :data="pager.records" style="width: 100%">
               <el-table-column label="医生">
            <template #default="scope">
                <el-button v-if="scope.row.doidFrn" type="primary" text bg @click="doidDetail(scope.row.doid)">{{ scope.row.doidFrn.name }}</el-button>
            </template>
        </el-table-column>
                  <el-table-column label="患者">
            <template #default="scope">
                <el-button v-if="scope.row.huanzFrn" type="primary" text bg @click="huanzDetail(scope.row.huanz)">{{ scope.row.huanzFrn.name }}</el-button>
            </template>
        </el-table-column>
                 <el-table-column label="建议">
            <template #default="scope">
                <span >{{scope.row.jiany}}</span>
            </template>
        </el-table-column>
                  <el-table-column sortable label="建议时间">
            <template #default="scope">
                <el-icon><timer/></el-icon><span>{{scope.row.createtime}}</span>
            </template>
        </el-table-column>
    
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <button class="btn" @click="onDetail(scope.row.id)">详情</button>
                    <button class="btn btn-warn" v-if=" user.role.toLowerCase() == 'doctor'  " @click="onEdit(scope.row.id)">编辑</button>
                    <button class="btn btn-error" v-if="  user.role.toLowerCase() == 'doctor'  " @click="onDelete(scope.row.id)">删除</button>

                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                v-model:current-page="pager.current"
                v-model:page-size="pager.size"
                background
                :page-sizes="[5, 10, 15, 20,50]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="pager.total"
                @size-change="loadThisPage"
                @current-change="loadThisPage"
        />
    </x-main>
</template>

<script setup name="doctorAdvice">
    let conf = codeying
    import {Helper} from "core";
    let user = Cache.getUser()//当前登录用户
    import {Timer,ChatDotSquare,Delete,Edit,InfoFilled} from '@element-plus/icons-vue'
    import {onMounted} from "vue";
    import DetailPage from "./Detail"
    import EditPage from "./Edit"
    import AddPage from "./Add"

    //搜索条件表单
    let searchForm = ref({
            doid : "",
            huanz : "",
    })
    //分页信息 默认查询第一页，20条数据
    let pager = ref({current: 1, size: 20})

    //钩子函数，挂载
    onMounted(() => {
        loadThisPage()
    })

    //加载本页数据
    const loadThisPage = async () => {
        Msg.loading("加载中...")
        //表单查询参数和分页参数
        let params = Object.assign(searchForm.value, {
            current: pager.value.current,
            size: pager.value.size
        });
        let {data,message} = await Http.get(`/doctorAdvice/list`, params);
        console.log("查询条件")
        console.log(params)
        console.log("查询结果")
        console.log(data)
        if (data) {
            pager.value = data
        }else {
            Msg.error(message);
        }
        Msg.loading(false)
    }

    //详情页
    const onDetail = async (id) => {
        const op = Dialog.open(DetailPage, '详情').setCancelText('').setConfirmText('')
        op.mounted(c => {
            c.render(id)
        })
    }
    //编辑页
    const onEdit = async (id) => {
        const op = Dialog.open(EditPage, `编辑`)
        op.mounted(c => {
            c.render(id, loadThisPage)
        })
        op.confirm(async (c) => {
            c.submit()
        })
    }
    //新增页
    const onAdd = async () => {
        const op = Dialog.open(AddPage, `新增`)
        op.mounted(c => {
            c.render(loadThisPage)
        })
        op.confirm(async (c) => {
            c.submit()
        })
    }
    //onExcel
    const onExcel = async () => {
        Http.download({},false,"/doctorAdvice/excel")
    }
    //删除
    const onDelete = async (id) => {
        const op = Msg.confirm('确定删除本条数据？')
        op.then(async () => {
            let {success, message} = await Http.post(`/doctorAdvice/delete?id=` + id);
            if (!success) {
                Msg.error(message);
            } else {
                Msg.success(message);
                await loadThisPage()
            }
        })
    }

     //医生详情页
    import doidDetailPage from "../doctor/Detail";
    const doidDetail = async (id)=> {
        const op = Dialog.open(doidDetailPage, '详情').setCancelText('').setConfirmText('')
        op.mounted(c => {
            c.render(id)
        })
    }
     //患者详情页
    import huanzDetailPage from "../patient/Detail";
    const huanzDetail = async (id)=> {
        const op = Dialog.open(huanzDetailPage, '详情').setCancelText('').setConfirmText('')
        op.mounted(c => {
            c.render(id)
        })
    }


    import ImportExcel from "../../components/lib/ImportExcel";
    const importExcel = ()=>{
        const op = Dialog.open(ImportExcel, `导入医生建议数据`).setCancelText('').setConfirmText('')
        op.mounted(c => {
            c.render('doctorAdvice',loadThisPage)
        })
    }
</script>


<style>
    /*分页右对齐*/
    .el-pagination {
        float: right;
    }
    .el-form--inline .el-form-item{
        margin-right: 0!important;
    }
    .search-row{
        display: flex;
        margin-bottom: 10px;
    }
    .search-item{
        display: flex;
    }
    .search-item span{
        white-space: nowrap;
        line-height: 32px;
        margin: 0 5px;
    }
</style>

