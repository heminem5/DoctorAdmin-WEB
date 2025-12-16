<template>
    <el-form
            label-position="left"
            label-width="100px"
            :model="form"
            style="max-width: 600px"
    >
             <el-form-item label="医生">
            <el-button v-if="form.doidFrn" type="primary" text bg @click="doidDetail(form.doid)">{{ form.doidFrn.name }}</el-button>
        </el-form-item>
                 <el-form-item label="患者">
            <el-button v-if="form.huanzFrn" type="primary" text bg @click="huanzDetail(form.huanz)">{{ form.huanzFrn.name }}</el-button>
        </el-form-item>
                 <el-form-item label="建议">
            <el-input disabled v-model="form.jiany"  />
        </el-form-item>
                 <el-form-item label="建议详情">
            <el-input disabled v-model="form.xiangq" type="textarea" />
        </el-form-item>
                 <el-form-item label="建议时间">
            <el-date-picker disabled value-format="YYYY-MM-DD HH:mm:ss" v-model="form.createtime" type="datetime" :shortcuts="shortcuts"/>
        </el-form-item>
        </el-form>


</template>
<script setup>
    let commentRef = ref(null)
    let form = ref({ doidFrn:null,huanzFrn:null, });

    const render = async (id) => {
        Msg.loading("loading...")
        let {data} = await Http.get(`/doctorAdvice/detail`, {id});
        console.log(data)
        form.value = data;
        Msg.loading(false)
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

    defineExpose({render});

</script>

