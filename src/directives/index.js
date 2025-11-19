import { useIntersectionObserver } from '@vueuse/core'


//定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //懒加载指令逻辑
        app.directive('img-lazy', {
            mounted(el, binging) {
                //el:指令绑定的那个元素
                //binging:binging.value 指令等于号后面绑定的表达式的值 图片url
                console.log(el, binging.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting)
                        if (isIntersecting) {
                            //进入了视口区域
                            el.src = binging.value
                            //停止监听
                            stop()
                        }
                    },
                )
            }
        })
    }
}