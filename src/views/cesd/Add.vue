<template>
    <el-form label-position="left" label-width="100px" ref="formRef" :model="form" style="max-width: 600px" :rules="rules">
         <el-form-item label="测试人" prop="cesr">
            <x-select-table
                :disabled="user.role==='patient'"                :header="[{label:'患者',field:'name',width:'100%'}]"
                v-model="form.cesr"
                :queryParams="[{name:'name',label:'患者'}]"
                api="/patient/list"
                labelField="name"
                valueField="id"
            ></x-select-table>
        </el-form-item>
        <el-form-item label="因小事而烦恼" prop="s1">
            <el-select filterable v-model="form.s1" clearable placeholder="Select">
                <el-option v-for="item in s1OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="不想吃东西胃口差" prop="s2">
            <el-select filterable v-model="form.s2" clearable placeholder="Select">
                <el-option v-for="item in s2OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="即时有人帮仍苦闷" prop="s3">
            <el-select filterable v-model="form.s3" clearable placeholder="Select">
                <el-option v-for="item in s3OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="觉得不如多数人好" prop="s4">
            <el-select filterable v-model="form.s4" clearable placeholder="Select">
                <el-option v-for="item in s4OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="做事无法集中注意" prop="s5">
            <el-select filterable v-model="form.s5" clearable placeholder="Select">
                <el-option v-for="item in s5OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感到情绪低落" prop="s6">
            <el-select filterable v-model="form.s6" clearable placeholder="Select">
                <el-option v-for="item in s6OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="做任何事都很费力" prop="s7">
            <el-select filterable v-model="form.s7" clearable placeholder="Select">
                <el-option v-for="item in s7OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感觉前途没有希望" prop="s8">
            <el-select filterable v-model="form.s8" clearable placeholder="Select">
                <el-option v-for="item in s8OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="我的生活是失败的" prop="s9">
            <el-select filterable v-model="form.s9" clearable placeholder="Select">
                <el-option v-for="item in s9OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感到害怕" prop="s10">
            <el-select filterable v-model="form.s10" clearable placeholder="Select">
                <el-option v-for="item in s10OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="睡眠不好" prop="s11">
            <el-select filterable v-model="form.s11" clearable placeholder="Select">
                <el-option v-for="item in s11OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感到不高兴" prop="s12">
            <el-select filterable v-model="form.s12" clearable placeholder="Select">
                <el-option v-for="item in s12OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="比平时说话要少" prop="s13">
            <el-select filterable v-model="form.s13" clearable placeholder="Select">
                <el-option v-for="item in s13OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感到孤单" prop="s14">
            <el-select filterable v-model="form.s14" clearable placeholder="Select">
                <el-option v-for="item in s14OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="人们对我不太好" prop="s15">
            <el-select filterable v-model="form.s15" clearable placeholder="Select">
                <el-option v-for="item in s15OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="生活没有意思" prop="s16">
            <el-select filterable v-model="form.s16" clearable placeholder="Select">
                <el-option v-for="item in s16OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="我曾哭泣" prop="s17">
            <el-select filterable v-model="form.s17" clearable placeholder="Select">
                <el-option v-for="item in s17OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="我感到忧愁" prop="s18">
            <el-select filterable v-model="form.s18" clearable placeholder="Select">
                <el-option v-for="item in s18OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="感到人们不喜欢我" prop="s19">
            <el-select filterable v-model="form.s19" clearable placeholder="Select">
                <el-option v-for="item in s19OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
        <el-form-item label="无法继续生活" prop="s20">
            <el-select filterable v-model="form.s20" clearable placeholder="Select">
                <el-option v-for="item in s20OptionList" :key="item.name" :label="item.name" :value="item.name"/>
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script setup>
    import {  reactive, ref } from 'vue'
    let user = Cache.getUser()//当前登录用户
    const formRef = ref();
    let form = ref({
         cesr : user.id,
        s1 : '',
        s2 : '',
        s3 : '',
        s4 : '',
        s5 : '',
        s6 : '',
        s7 : '',
        s8 : '',
        s9 : '',
        s10 : '',
        s11 : '',
        s12 : '',
        s13 : '',
        s14 : '',
        s15 : '',
        s16 : '',
        s17 : '',
        s18 : '',
        s19 : '',
        s20 : '',
    });
    let callBack;//保存成功回调函数
    const rules = reactive({
        s1:{required: true, message: "因小事而烦恼必填", trigger: "blur"},
        s2:{required: true, message: "不想吃东西胃口差必填", trigger: "blur"},
        s3:{required: true, message: "即时有人帮仍苦闷必填", trigger: "blur"},
        s4:{required: true, message: "觉得不如多数人好必填", trigger: "blur"},
        s5:{required: true, message: "做事无法集中注意必填", trigger: "blur"},
        s6:{required: true, message: "感到情绪低落必填", trigger: "blur"},
        s7:{required: true, message: "做任何事都很费力必填", trigger: "blur"},
        s8:{required: true, message: "感觉前途没有希望必填", trigger: "blur"},
        s9:{required: true, message: "我的生活是失败的必填", trigger: "blur"},
        s10:{required: true, message: "感到害怕必填", trigger: "blur"},
        s11:{required: true, message: "睡眠不好必填", trigger: "blur"},
        s12:{required: true, message: "感到不高兴必填", trigger: "blur"},
        s13:{required: true, message: "比平时说话要少必填", trigger: "blur"},
        s14:{required: true, message: "感到孤单必填", trigger: "blur"},
        s15:{required: true, message: "人们对我不太好必填", trigger: "blur"},
        s16:{required: true, message: "生活没有意思必填", trigger: "blur"},
        s17:{required: true, message: "我曾哭泣必填", trigger: "blur"},
        s18:{required: true, message: "我感到忧愁必填", trigger: "blur"},
        s19:{required: true, message: "感到人们不喜欢我必填", trigger: "blur"},
        s20:{required: true, message: "无法继续生活必填", trigger: "blur"},
    })

     let s1OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //因小事而烦恼 下拉框数据
     let s2OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //不想吃东西胃口差 下拉框数据
     let s3OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //即时有人帮仍苦闷 下拉框数据
     let s4OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //觉得不如多数人好 下拉框数据
     let s5OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //做事无法集中注意 下拉框数据
     let s6OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感到情绪低落 下拉框数据
     let s7OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //做任何事都很费力 下拉框数据
     let s8OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感觉前途没有希望 下拉框数据
     let s9OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //我的生活是失败的 下拉框数据
     let s10OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感到害怕 下拉框数据
     let s11OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //睡眠不好 下拉框数据
     let s12OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感到不高兴 下拉框数据
     let s13OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //比平时说话要少 下拉框数据
     let s14OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感到孤单 下拉框数据
     let s15OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //人们对我不太好 下拉框数据
     let s16OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //生活没有意思 下拉框数据
     let s17OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //我曾哭泣 下拉框数据
     let s18OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //我感到忧愁 下拉框数据
     let s19OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //感到人们不喜欢我 下拉框数据
     let s20OptionList = ref([  { name:'1小于一天'}, { name:'2一至两天'}, { name:'3三四天'}, { name:'4五至七天'}, ]) //无法继续生活 下拉框数据
    //初始化
    const render = (loadThisPage) => {
        callBack = loadThisPage
    }


    //提交
    const submit = async () => {

        await formRef.value.validate(async (isValid, invalidFields) => {
            if(! isValid) {
                Msg.error(Helper.getFirstMessage(invalidFields));
                return;
            }
            let {success,message} = await Http.post(`/cesd/save`, form.value);
            if(! success) {
                Msg.error(message);
                return;
            }
            Msg.success(message);
            Dialog.close();
            callBack()
        });
    }

    defineExpose({render,submit});

</script>

