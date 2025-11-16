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

3 基础实例配置

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