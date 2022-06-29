const tabBarList = [{
		pagePath: '/pages/home/index/index',
		iconPath: 'home',
		selectedIconPath: 'home-fill',
		midButton: false,
		text: '发现'
	},
	{
		pagePath: '/pages/home/add/add',
		selectedIconPath: 'https://cdn.uviewui.com/uview/common/min_button.png',
		iconPath: 'https://cdn.uviewui.com/uview/common/min_button_select.png',
		midButton: true,
		text: '发布'
	},
	{
		pagePath: '/pages/home/my/my',
		iconPath: 'account',
		selectedIconPath: 'account-fill',
		midButton: false,
		text: '我的'
	}
]

const state = {
	list: tabBarList
}

export default {
	namespaced: true,
	state
}