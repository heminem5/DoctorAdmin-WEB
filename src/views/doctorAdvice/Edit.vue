<template>
    <el-form label-position="left" label-width="100px" ref="formRef" :model="form" style="max-width: 600px" :rules="rules">
                                                                             <el-form-item label="医生" prop="doid">
                        <x-select-table
                            :disabled="user.role==='doctor'"                                :header="[{label:'医生',field:'name',width:'100%'}]"
                                        v-model="form.doid"
                                        :queryParams="[{name:'name',label:'医生'}]"
                                        api="/doctor/list"
                                        labelField="name"
                                        valueField="id"
                        ></x-select-table>
                    </el-form-item>
                                                                                     <el-form-item label="患者" prop="huanz">
                        <x-select-table
                            :disabled="user.role==='patient'"                                :header="[{label:'患者',field:'name',width:'100%'}]"
                                        v-model="form.huanz"
                                        :queryParams="[{name:'name',label:'患者'}]"
                                        api="/patient/list"
                                        labelField="name"
                                        valueField="id"
                        ></x-select-table>
                    </el-form-item>
                                                                                    <el-form-item label="建议" prop="jiany">
                        <el-input  maxlength="255" v-model="form.jiany" />
                    </el-form-item>
                                                                                    <el-form-item label="建议详情" prop="xiangq">
                        <el-input  v-model="form.xiangq" type="textarea"/>
                    </el-form-item>
                                                                                    <el-form-item label="建议时间" prop="createtime">
                        <el-date-picker disabled value-format="YYYY-MM-DD HH:mm:ss" v-model="form.createtime" type="datetime" placeholder="选择时间" :shortcuts="shortcuts"/>
                    </el-form-item>
                                        </el-form>
</template>
<script setup>
    import {  reactive, ref } from 'vue'
    const formRef = ref();
    let user = Cache.getUser()//当前登录用户
    let form = ref({});
    let callBack;//保存成功回调函数
    const rules = reactive({
        doid:{required: true, message: "医生必填", trigger: "blur"},
        huanz:{required: true, message: "患者必填", trigger: "blur"},
        createtime:{required: true, message: "建议时间必填", trigger: "blur"},
    })


    const render = async (id,loadThisPage) => {
        Msg.loading("加载中..")
        let {data} = await Http.get(`/doctorAdvice/detail`, {id: id});
        form.value = data
        callBack = loadThisPage
        Msg.loading(false)
    }
    const submit = async () => {

        await formRef.value.validate(async (isValid, invalidFields) => {
            if(! isValid) {
                Msg.error(Helper.getFirstMessage(invalidFields));
                return;
            }
            let {success,message} = await Http.post(`/doctorAdvice/save`, form.value);
            if(! success) {
                Msg.error(message);
                return;
            }
            Msg.success(message);
            Dialog.close();
            callBack(form.value)
        });
    }

    defineExpose({render,submit});

</script>

