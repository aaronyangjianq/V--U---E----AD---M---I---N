import {
  BasicLayout,
  UserLayout,
  RouteView,
  PageView,
} from '@/layouts';

export const asyncRouterMap = [
  // 首页
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/users',
    children: [
      // 用户管理
      {
        path: '/users',
        name: 'users',
        component: PageView,
        meta: {
          title: '用户管理',
          icon: 'user',
          // permission: ['u_0'],
        },
        redirect: '/users/list',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/users/list',
            name: 'usersList',
            component: () => import(/* webpackChunkName: "users" */ '@/views/users/List'),
            meta: {
              title: '用户列表',
            },
          },
          {
            path: '/users/usercoupon/:uid',
            name: 'usersCoupon',
            component: () => import(/* webpackChunkName: "users" */ '@/views/users/UserCoupon'),
            meta: {
              title: '用户卡券',
            },
          },
          {
            path: '/users/signrecord/:uid',
            name: 'usersSignRecord',
            component: () => import(/* webpackChunkName: "users" */ '@/views/users/SignRecord'),
            meta: {
              title: '打卡记录',
            },
          },
        ],
      },
      // 区域管理
      {
        path: '/area',
        name: 'area',
        component: PageView,
        meta: {
          title: '区域管理',
          icon: 'global',
          // permission: ['u_0'],
        },
        redirect: '/area/manager',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/area/manager',
            name: 'areaManager',
            component: () => import(/* webpackChunkName: "area" */ '@/views/area/Manager'),
            meta: {
              title: '区域管理',
            },
          },
        ],
      },
      // 座位管理
      {
        path: '/seat',
        name: 'seat',
        component: PageView,
        meta: {
          title: '座位管理',
          icon: 'table',
          // permission: ['u_0'],
        },
        redirect: '/seat/list',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/seat/list',
            name: 'seatList',
            component: () => import(/* webpackChunkName: "seat" */ '@/views/seat/List'),
            meta: {
              title: '座位列表',
            },
          },
          {
            path: '/seat/appointment',
            name: 'seatAppointment',
            component: () => import(/* webpackChunkName: "seat" */ '@/views/seat/Appointment'),
            meta: {
              title: '座位预约情况',
            },
          },
        ],
      },
      // 卡券购买管理
      {
        path: '/coupon',
        name: 'coupon',
        component: PageView,
        meta: {
          title: '卡券购买管理',
          icon: 'credit-card',
          // permission: ['u_0'],
        },
        redirect: '/coupon/manager',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/coupon/manager',
            name: 'couponManager',
            component: () => import(/* webpackChunkName: "coupon" */ '@/views/coupon/Manager'),
            meta: {
              title: '卡券管理',
            },
          },
        ],
      },
      // 兑换码审核
      {
        path: '/cdkey',
        name: 'cdkey',
        component: PageView,
        meta: {
          title: '兑换码审核',
          icon: 'qrcode',
        },
        redirect: '/cdkey/list',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/cdkey/list',
            name: 'cdkeyList',
            component: () => import(/* webpackChunkName: "cdkey" */ '@/views/conversionCode/List'),
            meta: {
              title: '兑换码审核',
            },
          },
          {
            path: '/cdkey/add',
            name: 'cdkeyAdd',
            component: () => import(/* webpackChunkName: "cdkey" */ '@/views/conversionCode/Add'),
            meta: {
              title: '生成兑换码',
            },
          },
        ],
      },
      // 订单管理
      {
        path: '/orders',
        name: 'orders',
        component: PageView,
        meta: {
          title: '订单管理',
          icon: 'robot',
        },
        redirect: '/orders/list',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/orders/list',
            name: 'ordersList',
            component: () => import(/* webpackChunkName: "orders" */ '@/views/orders/List'),
            meta: {
              title: '订单管理',
            },
          }
        ],
      },
      // 充值管理
      {
        path: '/recharge',
        name: 'recharge',
        component: PageView,
        meta: {
          title: '充值管理',
          icon: 'pay-circle',
        },
        redirect: '/recharge/record',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/recharge/record',
            name: 'rechargeRecord',
            component: () => import(/* webpackChunkName: "recharge" */ '@/views/recharge/Record'),
            meta: {
              title: '充值管理',
            },
          },
          {
            path: '/recharge/config',
            name: 'rechargeConfig',
            component: () => import(/* webpackChunkName: "recharge" */ '@/views/recharge/Config'),
            meta: {
              title: '充值价格配置',
            },
          }
        ],
      },
      // 大门管理
      {
        path: '/door',
        name: 'door',
        component: PageView,
        meta: {
          title: '大门管理',
          icon: 'select',
        },
        redirect: '/door/manager',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/door/manager',
            name: 'doorManager',
            component: () => import(/* webpackChunkName: "door" */ '@/views/door/Manager'),
            meta: {
              title: '大门管理',
            },
          }
        ],
      },
      // 首页幻灯管理
      {
        path: '/banner',
        name: 'banner',
        component: PageView,
        meta: {
          title: '首页幻灯管理',
          icon: 'file-ppt',
        },
        redirect: '/banner/manager',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/banner/manager',
            name: 'bannerManager',
            component: () => import(/* webpackChunkName: "banner" */ '@/views/banner/Manager'),
            meta: {
              title: '首页幻灯管理',
            },
          }
        ],
      },
      // 兑换时长管理
      {
        path: '/exchangeoption',
        name: 'exchangeoption',
        component: PageView,
        meta: {
          title: '兑换时长管理',
          icon: 'hourglass',
        },
        redirect: '/exchangeoption/edit',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/exchangeoption/edit',
            name: 'exchangeoptionEdit',
            component: () => import(/* webpackChunkName: "exchangeoption" */ '@/views/exchangeOption/edit'),
            meta: {
              title: '兑换时长参数设置',
            },
          }
        ],
      },
      // 商家电话管理
      {
        path: '/bussinessPhone',
        name: 'bussinessPhone',
        component: PageView,
        meta: {
          title: '商家电话管理',
          icon: 'phone',
        },
        redirect: '/bussinessPhone/PhoneEdit',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/bussinessPhone/PhoneEdit',
            name: 'bussinessPhoneEdit',
            component: () => import(/* webpackChunkName: "bussiness" */ '@/views/bussinessPhone/PhoneEdit'),
            meta: {
              title: '商家电话管理',
            },
          }
        ],
      },
      // 个人中心
      {
        path: '/account',
        name: 'account',
        component: PageView,
        meta: {
          title: '个人中心',
        },
        redirect: '/account/changePassword',
        hidden: true,
        children: [
          {
            path: 'changePassword',
            name: 'accountChangePwd',
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/ChangePassword'),
            meta: {
              title: '修改密码',
            },
          },
        ],
      },
    ],
  },

  // 页面错误
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
      path: 'login',
      name: 'login',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
    }]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
];
