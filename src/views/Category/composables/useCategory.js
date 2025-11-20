//封装分类数据业务相关代码
import {onMounted, ref} from 'vue'
import {getCategoryApI} from '@/apis/category.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'


export function useCategory() {    
    //获取数据
    const categoryData  = ref([])
    const route = useRoute()
    const getCategory = async(id = route.params.id) =>{
    const res = await getCategoryApI(id)
    categoryData.value = res.result
    }
    onMounted(()=>getCategory())

    //在路由参数变化时，可以把分类数据数据接口重新发送
    onBeforeRouteUpdate((to)=>{
    console.log('路由参数变化了')
    console.log(to)
    getCategory(to.params.id)
    })

    return{
        categoryData
    }

}