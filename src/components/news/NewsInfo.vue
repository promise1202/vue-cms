<template>
    <div class="newsInfo">
        <h3 class="title">{{newinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newinfo.add_time|dataFormat}}</span>
            <span>点击：{{newinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newinfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import comment from '../subcomponent/comment.vue';
export default {
    data(){
        return {
            id:this.$route.params.id,
            newinfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get("api/getnew/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.newinfo=result.body.message[0];
                }else{
                    Toast("获取新闻详细内容失败！")
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
.newsInfo{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: #f00;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
}
</style>
