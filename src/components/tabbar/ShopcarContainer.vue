<template>
  <div class="shopCar">
    <div class="shopCar-list">
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
              <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
              <img :src="item.thumb_path" alt="">
              <div class="info">
                <h1>{{item.title}}</h1>
                <p>
                  <span>￥{{item.sell_price}}</span>
                  <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                  <a href="#" @click.prevent="remove(item.id)">删除</a>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner money">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span>{{$store.getters.getGoodsAmount.count}}</span> 件，总价 <span>￥{{$store.getters.getGoodsAmount.amount}}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../subcomponent/numbox1.vue';
export default {
  data() {
    return {
      goodslist:[]
    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      var ids=[];
      this.$store.state.car.forEach(item =>ids.push(item.id));
      if(ids.length==0){
        return;
      }
      this.$http.get("api/goods/getshopcarlist/"+ids.join(',')).then(result=>{
        if(result.body.status===0){
          this.goodslist=result.body.message;
        }
      })
    },
    remove(id){
      this.goodslist.some((item,i)=>{
        if(item.id==id){
          this.goodslist.splice(i,1);
          this.$store.commit("removeGood",id);
        }
      })
    },
    selectedChanged(id,val){
      this.$store.commit("updateGoodsSelected",{id,selected:val})
    }
  },
  components:{
    numbox
  }
};
</script>
<style lang="scss" scoped>
.shopCar{
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner{
    display: flex;
    align-items: center;
  }
  img{
    width: 60px;
    height: 60px;
  }
  h1{
    font-size: 13px;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span{
      color: #f00;
      font-weight: bold;
    }
  }
  .money{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span{
    color: #f00;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
