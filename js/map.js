			var map, geolocation;
			    //加载地图，调用浏览器定位服务
			    map = new AMap.Map('container', {
			        resizeEnable: true
			    });
			    map.plugin('AMap.Geolocation', function() {
			        geolocation = new AMap.Geolocation({
			            enableHighAccuracy: true,//是否使用高精度定位，默认:true
			            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			            buttonPosition:'RB'
			        });
			        map.addControl(geolocation);
			        geolocation.getCurrentPosition();
			        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//			        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
			    });
			    //解析定位结果
//			    function onComplete(data) {
//			        var str = [];
//			        str.push(data.position.getLng()+','+data.position.getLat());
//			       	document.getElementById("discussion").addEventListener("tap",function(e){
//		      			mui.openWindow({
//		      				url: 'http://m.amap.com/around/?locations='+str+'&keywords=美食,小吃,饮品,特产,夜市,公交站&defaultIndex=3&defaultView=&searchRadius=5000&key=1f927cf7ffd0ae1e082c26a49f264dfe'
//						});
//		      		});
//			    }
function onComplete(data) {
			        var str = [];
			        str.push(data.position.getLng()+','+data.position.getLat());
			        var iframe = document.getElementById('iframe');
			        iframe.setAttribute("src","http://m.amap.com/around/?locations="+str+"&keywords=美食,小吃,饮品,特产,夜市,公交站&defaultIndex=3&defaultView=&searchRadius=5000&key=1f927cf7ffd0ae1e082c26a49f264dfe")
			    }