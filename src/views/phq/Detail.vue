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
                 <el-form-item label="做事提不起劲没兴趣">
            <el-input disabled v-model="form.s1"  />
        </el-form-item>
                 <el-form-item label="感到心情低落沮丧">
            <el-input disabled v-model="form.s2"  />
        </el-form-item>
                 <el-form-item label="入睡难睡不安稳">
            <el-input disabled v-model="form.s3"  />
        </el-form-item>
                 <el-form-item label="感觉疲倦没活力">
            <el-input disabled v-model="form.s4"  />
        </el-form-item>
                 <el-form-item label="食欲不振或吃太多">
            <el-input disabled v-model="form.s5"  />
        </el-form-item>
                 <el-form-item label="觉得自己很糟">
            <el-input disabled v-model="form.s6"  />
        </el-form-item>
                 <el-form-item label="对事物专注有困难">
            <el-input disabled v-model="form.s7"  />
        </el-form-item>
                 <el-form-item label="动作或说话速度缓">
            <el-input disabled v-model="form.s8"  />
        </el-form-item>
                 <el-form-item label="有死或伤害自己的念头">
            <el-input disabled v-model="form.s9"  />
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
        let {data} = await Http.get(`/phq/detail`, {id});
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

