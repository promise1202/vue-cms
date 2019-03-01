<template>
    <div class="photoinfo">
        <h3>{{photoinfo.title}}</h3>
        <p>
            <span>发表时间：{{photoinfo.add_time|dataFormat}}</span>
            <span>点赞：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <div class="content" v-html="photoinfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import comment from '../../components/subcomponent/comment.vue';
export default {
    data() {
        return {
            id:this.$route.params.id,
            photoinfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo(),
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoinfo=result.body.message[0];
                }else{
                    Toast("获取图片信息失败！")
                }
            })
        },
        getThumbs(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item => {
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src
                    });
                    this.list=result.body.message;
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss">
.photoinfo{
    padding: 4px;
    >h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    p{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        .my-gallery{
            display: flex;
            flex-wrap: wrap;
            figure{
                margin: 10px;
                box-shadow:0 0 10px #999;
                img{
                    width: 100px;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>
