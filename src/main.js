import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'


const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令
app.directive('img-lazy',{
    mounted(el,binging){
        //el:指令绑定的那个元素
        //binging:binging.value 指令等于号后面绑定的表达式的值 图片url
        console.log(el,binging.value)
        useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if(isIntersecting){
                //进入了视口区域
                el.src = binging.value
            }
          },
        )
    }
})