/**//**
 * 定义路由跳转页面
 */
//引入路由文件
import {Routes, RouterModule} from "@angular/router";
//引入两个组件
import {Page1Component} from "./page1/page1.component";
import {Page2Component} from "./page2/page2.component";
import {ModuleWithProviders} from "@angular/core";
import {Page3Component} from "app/page3/page3.component";
//配置一个路由数组
const rootRouterConfig : Routes = [
    {path:"page1/:id",component:Page1Component},
    {path:"page2",component:Page2Component},
    {path:"page3",component:Page3Component}
]

//对外暴漏出去
export const rootRouterModule : ModuleWithProviders = RouterModule.forRoot(rootRouterConfig,{useHash:true});