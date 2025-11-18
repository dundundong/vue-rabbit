import httpInstance from "@/utils/http";

//封装banner

export function getBannerAPI(){
    return httpInstance({
        url:'/home/banner'
    })
}