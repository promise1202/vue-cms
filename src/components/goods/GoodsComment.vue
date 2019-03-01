<template>
    <div class="goodscomment">
       <comment :id="this.id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponent/comment.vue';
export default {
data() {
    return {
id:this.$route.params.id
    }
},
components:{
    comment
}
}
</script>
<style lang="scss" scoped>
.goodscomment{
    padding: 4px;
}
</style>
