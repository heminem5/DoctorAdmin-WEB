<template>
    <el-form
            label-position="left"
            label-width="100px"
            :model="form"
            style="max-width: 600px"
    >
             <el-form-item label="测试时间">
            <el-date-picker disabled value-format="YYYY-MM-DD HH:mm:ss" v-model="form.createtime" type="datetime" :shortcuts="shortcuts"/>
        </el-form-item>
                 <el-form-item label="测试人">
            <el-button v-if="form.cesrFrn" type="primary" text bg @click="cesrDetail(form.cesr)">{{ form.cesrFrn.name }}</el-button>
        </el-form-item>
                 <el-form-item label="观察到的抑郁">
            <el-input disabled v-model="form.s1"  />
        </el-form-item>
                 <el-form-item label="抑郁主诉">
            <el-input disabled v-model="form.s2"  />
        </el-form-item>
                 <el-form-item label="内心紧张">
            <el-input disabled v-model="form.s3"  />
        </el-form-item>
                 <el-form-item label="睡眠减少">
            <el-input disabled v-model="form.s4"  />
        </el-form-item>
                 <el-form-item label="食欲减退">
            <el-input disabled v-model="form.s5"  />
        </el-form-item>
                 <el-form-item label="注意集中困难">
            <el-input disabled v-model="form.s6"  />
        </el-form-item>
                 <el-form-item label="懒散">
            <el-input disabled v-model="form.s7"  />
        </el-form-item>
                 <el-form-item label="感受不能">
            <el-input disabled v-model="form.s8"  />
        </el-form-item>
                 <el-form-item label="悲观思想">
            <el-input disabled v-model="form.s9"  />
        </el-form-item>
                 <el-form-item label="自杀观念">
            <el-input disabled v-model="form.s10"  />
        </el-form-item>
                 <el-form-item label="总分">
            <el-input disabled v-model="form.score"  />
        </el-form-item>
                 <el-form-item label="结果">
            <el-input disabled v-model="form.jieg"  />
        </el-form-item>
        </el-form>


</template>
<script setup>
    let commentRef = ref(null)
    let form = ref({ cesrFrn:null, });

    const render = async (id) => {
        Msg.loading("loading...")
        let {data} = await Http.get(`/madrs/detail`, {id});
        console.log(data)
        form.value = data;
        Msg.loading(false)
    }

     //测试人详情页
    import cesrDetailPage from "../patient/Detail";
    const cesrDetail = async (id)=> {
        const op = Dialog.open(cesrDetailPage, '详情').setCancelText('').setConfirmText('')
        op.mounted(c => {
            c.render(id)
        })
    }

    defineExpose({render});

</script>

