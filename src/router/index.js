import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addNews = r => require.ensure([], () => r(require('@/page/addNews')), 'addNews');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const newList = r => require.ensure([], () => r(require('@/page/newList')), 'newList');
const ideaList = r => require.ensure([], () => r(require('@/page/ideaList')), 'ideaList');
const textList = r => require.ensure([], () => r(require('@/page/textList')), 'textList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const phoneList = r => require.ensure([], () => r(require('@/page/phoneList')), 'phoneList');
const groupList = r => require.ensure([], () => r(require('@/page/groupList')), 'groupList');
const addGroups = r => require.ensure([], () => r(require('@/page/addGroups')), 'addGroups');
const pointList = r => require.ensure([], () => r(require('@/page/pointList')), 'pointList');
const addPoints = r => require.ensure([], () => r(require('@/page/addPoints')), 'addPoints');
const addTexts = r => require.ensure([], () => r(require('@/page/addTexts')), 'addTexts');
const addPhones = r => require.ensure([], () => r(require('@/page/addPhones')), 'addPhones');
const addCalendars = r => require.ensure([], () => r(require('@/page/addCalendars')), 'addCalendars');
const calendarList = r => require.ensure([], () => r(require('@/page/calendarList')), 'calendarList');


const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addNews',
			component: addNews,
			meta: ['添加数据', '添加新闻'],
		},{
			path: '/addGroups',
			component: addGroups,
			meta: ['添加数据', '添加组'],
		},{
			path: '/addPoints',
			component: addPoints,
			meta: ['添加数据', '添加点'],
		},{
			path: '/addCalendars',
			component: addCalendars,
			meta: ['添加数据', '添加点'],
		},{
			path: '/addTexts',
			component: addTexts,
			meta: ['添加数据', '添加文本'],
		},{
			path: '/addPhones',
			component: addPhones,
			meta: ['添加数据', '添加文本'],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/newList',
			component: newList,
			meta: ['数据管理', '新闻列表'],
		},{
			path: '/ideaList',
			component: ideaList,
			meta: ['数据管理', '意见列表'],
		},{
			path: '/textList',
			component: textList,
			meta: ['数据管理', '文本列表'],
		},{
			path: '/phoneList',
			component: phoneList,
			meta: ['数据管理', '电话列表'],
		},{
			path: '/groupList',
			component: groupList,
			meta: ['数据管理', '组列表'],
		},{
			path: '/pointList',
			component: pointList,
			meta: ['数据管理', '点列表'],
		},{
			path: '/calendarList',
			component: calendarList,
			meta: ['数据管理', '点列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
