/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		var account = loginInfo.account || '';
		var password = loginInfo.password || '';
		if (account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		
		//到服务器上查询用户信息
		Bmob.initialize("76493c30e1ef177da437273634f53648", "f9547b64e4367f44d77ef5e405420a6d");
		var UserInfo = Bmob.Object.extend("userinfo");
		var query = new Bmob.Query(UserInfo);
		query.equalTo("account", account);
		query.equalTo("password", password);
		// 查询是否存在改用户
		query.first({
		    success: function(obj) {
		    	if(obj!=null)
		    	{
		    		var u={
		    		id:obj.id,
		    		account:obj.get("account"),
			    	password:obj.get("password"),
			    	email:obj.get("email"),
			    	phone:obj.get("phone"),
			    	headImg:obj.get("headImg")
		    		};
		    		return owner.createState(u, callback);
		    	}
		    	else
		    	{
		    		return callback('用户名或密码错误');
		    	}
		    },
		    error: function(error) {
		    	plus.nativeUI.toast("error:"+error.message);
		    	return callback('用户名或密码错误');
		    }
		});

	};
	
//	function valid(account,password)
//	{
//		//到服务器上查询用户信息
//		Bmob.initialize("bba882a3972a66017bc8052a331eba29", "df9828ce3419b922d3a9c9b00ccfdf54");
//		var UserInfo = Bmob.Object.extend("userinfo");
//		var query = new Bmob.Query(UserInfo);
//		query.equalTo("account", account);
//		query.equalTo("password", password);
//		// 查询是否存在改用户
//		query.first({
//		    success: function(obj) {
//		    	if(obj!=null)
//		    	{
//		    		var u={
//		    		account:obj.get("account"),
//			    	password:obj.get("password"),
//			    	email:obj.get("email"),
//			    	phone:obj.get("phone"),
//			    	headImg:obj.get("headImg")
//		    		};
//		    		result=u;
//		    		console.log("u:"+u.account);
//		    		return u;
//		    	}
//		    	else
//		    	{
//		    		return null;
//		    	}
//		    },
//		    error: function(error) {
//		    	plus.nativeUI.toast("error:"+error.message);
//		    	return null;
//		    }
//		});
//	
//	};

	owner.createState = function(user, callback) {
		var state = owner.getState();
		state.id=user.id;
		state.account=user.account;
		state.password=user.password;
		state.email=user.email;
		state.phone=user.phone;
		state.headImg=user.headImg;
		state.token = "token"+user.account;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	owner.checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};
	
	owner.checkPhone = function(tel)
	{
		 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		 return reg.test(tel);
	}

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));