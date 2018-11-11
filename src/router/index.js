import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

//关于我们
import User from '@/components/user/User'

//个人中心模块
import MyCourse from '@/components/personal/MyCourse'
import MyCollect from '@/components/personal/MyCollect'
import Information from '@/components/personal/Information'
import Basic from '@/components/personal/Basic'
import Address from '@/components/personal/Address'
import Phone from '@/components/personal/Phone'
import Password from '@/components/personal/Password'
import Updateicon from '@/components/personal/Updateicon'

//course模块
import Course from '@/components/course/course'
import CourseInfo from '@/components/course/CourseInfo'
import Action from '@/components/course/Action'
import CourseFenlei from '@/components/course/CourseFenlei'
import DongZuoKu from '@/components/course/DongZuoKu'
import CourseSearch from '@/components/course/CourseSearch'


//user模块
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'

//mall模块
import Store from '@/components/mall/Store'
import Cart from '@/components/mall/Cart'
import GoodsDetail from '@/components/mall/GoodsDetail'
import GoodsAddress from '@/components/mall/GoodsAddress'
import Order from '@/components/mall/Order'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/mycourse',
      name: 'mycourse',
      component: MyCourse
    },
    {
      path: '/mycollect',
      name: 'mycollect',
      component: MyCollect
    },
    {
      path: '/information',
      name: 'information',
      component: Information
    },
    {
      path: '/basic',
      name: 'basic',
      component: Basic
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/phone',
      name: 'phone',
      component: Phone
    },
    {
      path: '/password',
      name: 'password',
      component: Password
    },
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/courseinfo/:cid',
      name: 'courseinfo',
      component: CourseInfo
    },
    {
      path: '/action/:aid',
      name: 'action',
      component: Action
    },
    {
      path: '/icon',
      name: 'icon',
      component: Updateicon
    },
    {
      path: '/coursefenlei/:tid',
      name: 'CourseFenlei',
      component: CourseFenlei
    },
    {
      path: '/coursesearch/:cname',
      name: 'coursesearch',
      component: CourseSearch
    },
    {
      path: '/mall',
      name: 'mall',
      component: Store
    },
    {
      path: '/detail/:gid',
      name: 'goods_detail',
      component: GoodsDetail,
      // redirect:'/detail/evaluate',
      // children: [ //这里就是二级路由的配置
      //   {
      //     path: '/detail/evaluate',
      //     name: 'evaluate',
      //     component: Evaluate
      //   },
      //   {
      //     path: '/detail/info',
      //     name: 'info',
      //     component: GoodDesc
      //   },
      // ]
    },
    {
      path: '/goodsaddress/:orderId',
      name: 'goodsaddress',
      component: GoodsAddress
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/regist',
      name: 'regist',
      component: Register
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/actionlibrary',
      name: 'dongzuoku',
      component: DongZuoKu
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
  ]
})
