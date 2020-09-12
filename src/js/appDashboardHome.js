const appDashboardHome = new Vue({
  el: '#appDashboardHome',
  data:{
		dishesLength: 0,
		waitersLength: 0,
	},
  delimiters: ['([','])'],
});

onSnapshot("Dishes", false, function(data){
	appDashboardHome.dishesLength = data.length;
});

onSnapshot("Waiters", false, function(data){
	appDashboardHome.waitersLength = data.length;
});
