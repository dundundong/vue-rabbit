# 项目笔记

## 1 创建项目和git仓库

创建vue3项目

src下创建项目结构

![1763285183496](README/1763285183496.png)

初始化git并推送github仓库

别名路径配置

​	输入@联想路径地址

​	比如

```
import HelloWorld from '@/components/HelloWorld.vue'
```

在src根目录下创建jsconfig.json

```
{
  "compilerOptions" : {
    "baseUrl" : "./",
    "paths" : {
      "@/*":["src/*"]
    }
  }
}
```

​	但是这个配置只做联想提示

​	真正起作用的是

vite.config.js

```
 resolve: {
    //实际路劲转换 @ -》src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
```



## 2 添加饿了么组件

安装

```
npm install element-plus --save
```

导入

```
npm install -D unplugin-vue-components unplugin-auto-import
```

更新vite.config.ts配置文件

```
//element plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    
```

测试

在App.vue

```
<script setup>
  
</script>

<template>
  <el-button type="primary">Primary</el-button>
  
</template>

<style scoped></style>

```

### 2.2定制主题色

安装sass

```
npm i sass -D
```

添加目录

![1763298384837](README/1763298384837.png)

放入配置

```
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b,
    ),
    'success': (
      // 成功色
      'base': #1dc779,
    ),
    'warning': (
      // 警告色
      'base': #ffb302,
    ),
    'danger': (
      // 危险色
      'base': #e26237,
    ),
    'error': (
      // 错误色
      'base': #cf4444,
    ),
  )
)
```

更新vite.config.ts文件

```
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//element plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        //1.
        ElementPlusResolver({ importStyle:'sass'}),
      ],
    }),

  ],
  resolve: {
    //实际路劲转换 @ -》src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  }
})

```

## 3 基础实例配置

axios基础配置

安装

```
npm i axios
```

​	在utils目录下创建http.js

```
//axios基础封装

import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})


export default httpInstance
```

这东西是给API服务的

创建testAPI.js

![1763300073394](README/1763300073394.png)

配置

```
import httpInstance from "@/utils/http";

export function getCategory () {
  return httpInstance({
    url: 'home/category/head'
  })
}
```

测试

在main.js里添加测试接口

```
//测试接口函数
import { getCategory } from '@/apis/testAPI'
getCategory().then(res =>{
    console.log(res)
})
```

![1763300166637](README/1763300166637.png)

成功



## 4 路由设置

一级路由（页面整体切换）

1.创建页面

![1763342654599](README/1763342654599.png)

2.在router里的index.js配置路由表

```
 routes: [
    {
      path:'/',
      component:Layout
    },
    {
      path:'/login',
      component:Login
    }
  ],
```

3.App.js配置路由出口

```
<template>
  <!--一级路由出口组件-->
  <router-view/>
</template>
```



二级路由（在一级路由页内部切换）

1.创建页面

![1763343415567](README/1763343415567.png)

2.在router里的index.js配置路由表

```
{
      path:'/',
      component:Layout,
      children:[
        {
          path:'',   //默认二级路由，置空
          component:Home
        },
        {
          path:'category',
          component:Category
        }
      ]
    },
```

3.Layout.js配置路由出口

```
<template>
    <div>我是首页
    <!--二级路由出口-->
    <RouterView/>
    </div>
</template>
```



## 5 静态资源引入
###  静态资源引入

1. 图片资源 - 把 images 文件夹放到 assets 目录下
2. 样式资源 - 把 common.scss 文件放到 styles 目录下

### scss变量自动导入

```css
$xtxColor: #27ba9b;
$helpColor: #e26237;
$sucColor: #1dc779;
$warnColor: #ffb302;
$priceColor: #cf4444;
```
```json
css: {
    preprocessorOptions: {
      scss: {
        // 自动导入scss文件
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
}
```

## 6 Layout页面搭建

创建页面结构如下 ![1763363444277](README/1763363444277.png)

配置路由   （Layout/index.vue）

```
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <div>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
  </div>
</template>
```

效果：![1763363519547](README/1763363519547.png)

### 6.1引入阿里图标库

网址：https://www.iconfont.cn/help/detail?spm=a313x.help_index.i3.48.21523a81nYt6cR&helptype=code![1763363692894](README/1763363692894.png)

> 字体图标采用的是阿里的字体图标库，样式文件已经准备好，在 `index.html`文件中引入即可

```html
  <link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
```

### 6.2 一级导航渲染

封装请求函数![1763366211223](README/1763366211223.png)

```
import httpInstance from "@/utils/http";

export function getCategoryAPI(){
    return httpInstance({
        url:'/home/category/head'
    })
}

```

LayoutHeader.vue 更新接口请求代码

```
<script setup>
import {getCategoryAPI} from '@/apis/layout'
import { ref,onMounted } from 'vue'

const categoryList =ref([])
const getCategory = async() =>{
  const res = await getCategoryAPI()
  console.log(res)
  categoryList.value = res.result
}

onMounted(() =>{
  getCategory()
})
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryList" :key="item.id">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>
        
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      
    </div>
  </header>
</template>
```

### 6.3吸顶导航

逻辑：准备吸顶导航组件 -》 获取滚动距离 -》以滚动距离做判断条件控制组件盒子是否展示

#### 1.准备吸顶导航组件

![1763367256770](README/1763367256770.png)

```
<script setup>

</script>

<template>
  <div class="app-header-sticky">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/">居家</RouterLink>
        </li>
        <li>
          <RouterLink to="/">美食</RouterLink>
        </li>
        <li>
          <RouterLink to="/">服饰</RouterLink>
        </li>
        <li>
          <RouterLink to="/">母婴</RouterLink>
        </li>
        <li>
          <RouterLink to="/">个护</RouterLink>
        </li>
        <li>
          <RouterLink to="/">严选</RouterLink>
        </li>
        <li>
          <RouterLink to="/">数码</RouterLink>
        </li>
        <li>
          <RouterLink to="/">运动</RouterLink>
        </li>
        <li>
          <RouterLink to="/">杂项</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
```

吸顶组件有个样式代码

```
 &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
```

如果

```
<div class="app-header-sticky">
```

变成

```
<div class="app-header-sticky" show>
```

那么组件就显示，那么show的开启与否就是开启的条件

#### 2.获取滚动距离

需要用到一个工具

**VueUse** 是一个巨大的 **Vue 组合式 API (Composition API)** 工具集

https://vueuse.org/

安装它 

```
npm i @vueuse/core
```

搜索useScroll![1763367567118](README/1763367567118.png)

测试

```
<script setup>
//vue Use
import { useScroll } from '@vueuse/core'
const {y} = useScroll(window)
</script>

<template>
  <div class="app-header-sticky">
    {{ y }}
```

![1763367683107](README/1763367683107.png)

#### 3.show条件开启

```
<template>
  <div class="app-header-sticky" :class="{ show:y > 78 }">
    <div class="container">
```

### 6.4重复请求优化

为啥

LayoutFixed.vue和LayoutHeader.vue 发送了两次相同网络请求，资源浪费

逻辑图

![1763384640558](README/1763384640558.png)

创建文件

![1763384834016](README/1763384834016.png)

```
import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'


export const useCategoryStore = defineStore('category', () => {
    //导航列表的数据管理
    //state 导航列表数据
    const categoryList =ref([])

    //action 获取导航数据的方法
    const getCategory = async() =>{
    const res = await getCategoryAPI()
    categoryList.value = res.result
    }

    return{
        categoryList,
        getCategory
    }
})

```

组件页使用pinia中的数据

```
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()

......
<li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink to="/">{{item.name}}</RouterLink>
        </li>
```



## 7 Home 页面搭建

页面结构![1763430256512](README/1763430256512.png)

组件页创建![1763430278279](README/1763430278279.png)

### 7.1 分类实现  （准备模板 -》使用Pinia中的数据渲染）

```
<script setup>
import {useCategoryStore} from '@/stores/category'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0,2)" :key="i" to="/">{{i.name}}</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img :src="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{i.name}}
                  </p>
                  <p class="desc ellipsis">{{i.desc}}</p>
                  <p class="price"><i>¥</i>{{i.price}}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
```

### 7.2 轮播图实现

1.使用element plus组件![1763430767205](README/1763430767205.png)



2.获取接口数据![1763433100518](README/1763433100518.png)

```
import httpInstance from "@/utils/http";

//封装banner

export function getBannerAPI(){
    return httpInstance({
        url:'/home/banner'
    })
}
```

3.展示数据

```
<script setup>
import {getBannerAPI} from '@/apis/home'
import { onMounted,ref } from 'vue'

const bannerList = ref([])
const getBanner = async() =>{
    const res = await getBannerAPI()
    console.log(res)
    bannerList.value = res.result
}

onMounted(() => getBanner())
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
```

### 7.3 组件封装

步骤：![1763433713543](README/1763433713543.png)

1.模板

```
<script setup>

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          新鲜好物<small>新鲜出炉 品质靠谱</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <div> 主体内容 </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```

2.组件参数

```
<script setup>
//定义props
defineProps({
  title:{
    type:String
  },
  subTitle:({
    type:String
  })
})
</script>
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{title}}<small>{{subTitle}}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot />
    </div>
  </div>
</template>
```

3.使用 

```
import HomePanel from './components/HomePanel.vue'

 <HomePanel title="新鲜好物" sub-title="新鲜好物 好多商品">
    <div>
      我是新鲜好物的插槽
    </div>
  </HomePanel >
  <HomePanel title="人气推荐" sub-title="人气推荐 好多商品">
    <div>
      我是人气推荐的插槽
    </div>
  </HomePanel>
```

