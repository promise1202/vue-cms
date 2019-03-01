<template>
    <div class="goodsinfo">
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		</div>
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <div>
                            <p class="price">
                                市场价：<del>￥{{goodsinfo.market_price}}</del>
                                销售价：<span>￥{{goodsinfo.sell_price}}</span>
                            </p>
                            <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                            <p>
                                <mt-button type="primary" size="small">立即购买</mt-button>
                                <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
                            </p>
                        </div>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time|dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
import swiper from '../subcomponent/swiper.vue';
import numbox from '../subcomponent/numbox.vue';
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbotuList:[],
            goodsinfo:{},
            selectedCount:1,
            ballFlag:false
        }
    },
    created(){
        this.getlunbotu(),
        this.getgoodsinfo()
    },
    methods:{
        getlunbotu(){
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item => {
                        item.img=item.src
                    });
                    this.lunbotuList=result.body.message;
                }
            })
        },
        getgoodsinfo(){
            this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0];
                }
            })
        },
        getSelectedCount(count){
            this.selectedCount=count;
            console.log("父元素"+this.selectedCount)
        },
        goDesc(id){
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        goComment(id){
            this.$router.push({name:"goodscomment",params:{id}})
        },
        addCar(){
            this.ballFlag=!this.ballFlag;
            var goodsinfo={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true};
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter(el) {
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            const ball=this.$refs.ball.getBoundingClientRect();
            const badge=document.getElementById("badge").getBoundingClientRect();
            const x=badge.left-ball.left;
            const y=badge.top-ball.top;
            el.style.transform=`translate(${x}px,${y}px)`;
            el.style.transition="all .5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo{
    background-color: #eee;
    overflow: hidden;
    .price{
        span{
            color: #f00;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #f00;
        position: absolute;
        top: 390px;
        left: 150px;
        z-index: 999;
    }
}
</style>
