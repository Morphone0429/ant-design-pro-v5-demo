export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },
  {
    path: '/order',
    name: '一级菜单',
    icon: 'smile',
    component: '@/layouts/index',
    routes: [{ name: '一级菜单order', path: '/order/detail', component: './Order' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Order' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '管理员管理', icon: 'table', path: '/basic-list', component: './BasicList' },
  { path: '/', redirect: '/order' },
  { component: './404' },
];
