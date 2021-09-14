<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// let userInfo=uni.getStorageSync('token')
			// console.log(!userInfo)
			// if(!userInfo){
			// 	uni.reLaunch({
			// 		url:'pages/login/login'
			// 	})
			// }
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
