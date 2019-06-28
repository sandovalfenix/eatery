const appDashboardHome = new Vue({
  el: '#appDashboardHome',
  data:{
		dishesLength: 0,
		waitersLength: 0,
	},
  delimiters: ['([','])'],
});

onSnapshot(db.collection("Dishes"), function(data){
	appDashboardHome.dishesLength = data.length;
});

onSnapshot(db.collection("Waiters"), function(data){
	appDashboardHome.waitersLength = data.length;
});