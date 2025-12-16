<template>
    <el-form label-position="left" label-width="100px" ref="formRef" :model="form" style="max-width: 600px" :rules="rules">
                                                                            <el-form-item label="测试时间" prop="createtime">
                        <el-date-picker disabled value-format="YYYY-MM-DD HH:mm:ss" v-model="form.createtime" type="datetime" placeholder="选择时间" :shortcuts="shortcuts"/>
                    </el-form-item>
                                                                                     <el-form-item label="测试人" prop="cesr">
                        <x-select-table
                            disabled                                :header="[{label:'患者',field:'name',width:'100%'}]"
                                        v-model="form.cesr"
                                        :queryParams="[{name:'name',label:'患者'}]"
                                        api="/patient/list"
                                        labelField="name"
                                        valueField="id"
                        ></x-select-table>
                    </el-form-item>
                                                                                    <el-form-item label="做事提不起劲没兴趣" prop="s1">
                        <el-select disabled filterable v-model="form.s1" clearable placeholder="Select">
                            <el-option v-for="item in s1OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="感到心情低落沮丧" prop="s2">
                        <el-select  filterable v-model="form.s2" clearable placeholder="Select">
                            <el-option v-for="item in s2OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="入睡难睡不安稳" prop="s3">
                        <el-select  filterable v-model="form.s3" clearable placeholder="Select">
                            <el-option v-for="item in s3OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="感觉疲倦没活力" prop="s4">
                        <el-select  filterable v-model="form.s4" clearable placeholder="Select">
                            <el-option v-for="item in s4OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="食欲不振或吃太多" prop="s5">
                        <el-select  filterable v-model="form.s5" clearable placeholder="Select">
                            <el-option v-for="item in s5OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="觉得自己很糟" prop="s6">
                        <el-select  filterable v-model="form.s6" clearable placeholder="Select">
                            <el-option v-for="item in s6OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="对事物专注有困难" prop="s7">
                        <el-select  filterable v-model="form.s7" clearable placeholder="Select">
                            <el-option v-for="item in s7OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="动作或说话速度缓" prop="s8">
                        <el-select  filterable v-model="form.s8" clearable placeholder="Select">
                            <el-option v-for="item in s8OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="有死或伤害自己的念头" prop="s9">
                        <el-select  filterable v-model="form.s9" clearable placeholder="Select">
                            <el-option v-for="item in s9OptionList" :key="item.name" :label="item.name" :value="item.name"/>
                        </el-select>
                    </el-form-item>
                                                                                    <el-form-item label="总分" prop="score">
                        <el-input  maxlength="255" v-model.number="form.score" type="number"/>
                    </el-form-item>
                                                                                    <el-form-item label="结果" prop="jieg">
                        <el-input  maxlength="255" v-model="form.jieg" />
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
        createtime:{required: true, message: "测试时间必填", trigger: "blur"},
        cesr:{required: true, message: "测试人必填", trigger: "blur"},
        s1:{required: true, message: "做事提不起劲没兴趣必填", trigger: "blur"},
        s2:{required: true, message: "感到心情低落沮丧必填", trigger: "blur"},
        s3:{required: true, message: "入睡难睡不安稳必填", trigger: "blur"},
        s4:{required: true, message: "感觉疲倦没活力必填", trigger: "blur"},
        s5:{required: true, message: "食欲不振或吃太多必填", trigger: "blur"},
        s6:{required: true, message: "觉得自己很糟必填", trigger: "blur"},
        s7:{required: true, message: "对事物专注有困难必填", trigger: "blur"},
        s8:{required: true, message: "动作或说话速度缓必填", trigger: "blur"},
        s9:{required: true, message: "有死或伤害自己的念头必填", trigger: "blur"},
    })

     let s1OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //做事提不起劲没兴趣 下拉框数据
     let s2OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //感到心情低落沮丧 下拉框数据
     let s3OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //入睡难睡不安稳 下拉框数据
     let s4OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //感觉疲倦没活力 下拉框数据
     let s5OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //食欲不振或吃太多 下拉框数据
     let s6OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //觉得自己很糟 下拉框数据
     let s7OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //对事物专注有困难 下拉框数据
     let s8OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //动作或说话速度缓 下拉框数据
     let s9OptionList = ref([  { name:'0没有'}, { name:'1有几天'}, { name:'2一半以上时间'}, { name:'3几乎每天'}, ]) //有死或伤害自己的念头 下拉框数据

    const render = async (id,loadThisPage) => {
        Msg.loading("加载中..")
        let {data} = await Http.get(`/phq/detail`, {id: id});
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
            let {success,message} = await Http.post(`/phq/save`, form.value);
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

