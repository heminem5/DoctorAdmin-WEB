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
                 <el-form-item label="因小事而烦恼">
            <el-input disabled v-model="form.s1"  />
        </el-form-item>
                 <el-form-item label="不想吃东西胃口差">
            <el-input disabled v-model="form.s2"  />
        </el-form-item>
                 <el-form-item label="即时有人帮仍苦闷">
            <el-input disabled v-model="form.s3"  />
        </el-form-item>
                 <el-form-item label="觉得不如多数人好">
            <el-input disabled v-model="form.s4"  />
        </el-form-item>
                 <el-form-item label="做事无法集中注意">
            <el-input disabled v-model="form.s5"  />
        </el-form-item>
                 <el-form-item label="感到情绪低落">
            <el-input disabled v-model="form.s6"  />
        </el-form-item>
                 <el-form-item label="做任何事都很费力">
            <el-input disabled v-model="form.s7"  />
        </el-form-item>
                 <el-form-item label="感觉前途没有希望">
            <el-input disabled v-model="form.s8"  />
        </el-form-item>
                 <el-form-item label="我的生活是失败的">
            <el-input disabled v-model="form.s9"  />
        </el-form-item>
                 <el-form-item label="感到害怕">
            <el-input disabled v-model="form.s10"  />
        </el-form-item>
                 <el-form-item label="睡眠不好">
            <el-input disabled v-model="form.s11"  />
        </el-form-item>
                 <el-form-item label="感到不高兴">
            <el-input disabled v-model="form.s12"  />
        </el-form-item>
                 <el-form-item label="比平时说话要少">
            <el-input disabled v-model="form.s13"  />
        </el-form-item>
                 <el-form-item label="感到孤单">
            <el-input disabled v-model="form.s14"  />
        </el-form-item>
                 <el-form-item label="人们对我不太好">
            <el-input disabled v-model="form.s15"  />
        </el-form-item>
                 <el-form-item label="生活没有意思">
            <el-input disabled v-model="form.s16"  />
        </el-form-item>
                 <el-form-item label="我曾哭泣">
            <el-input disabled v-model="form.s17"  />
        </el-form-item>
                 <el-form-item label="我感到忧愁">
            <el-input disabled v-model="form.s18"  />
        </el-form-item>
                 <el-form-item label="感到人们不喜欢我">
            <el-input disabled v-model="form.s19"  />
        </el-form-item>
                 <el-form-item label="无法继续生活">
            <el-input disabled v-model="form.s20"  />
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
        let {data} = await Http.get(`/cesd/detail`, {id});
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

