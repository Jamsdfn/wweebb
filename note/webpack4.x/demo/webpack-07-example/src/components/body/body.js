$("#center").click(()=>{
	require.ensure(['../img/img.js'],function(require){
		require('../img/img.js');	//执行这这个模块
	})
});
