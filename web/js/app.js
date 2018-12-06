// Based on AngularJS 1.4.2

var IWEB_ACCOUNT    = "test2"; 
var TOOLBOX_ACCOUNT = "test1"; 



var rootScope;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goto_view(v) {
  	var baseUrl = window.location.href;
	baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
	window.location.href = baseUrl + "#/" + v;
}

function logout() {
	sessionStorage.setItem("login_name","");
	sessionStorage.setItem("login_password","");
	clearCookie();
	apiconn.logout();
}



	var apiconn = new APIConnection();
	apiconn.client_info.clienttype = "web";

	
	apiconn.wsUri = "ws://47.104.209.172:51717/yqds/";
	// apiconn.send_obj({"obj":"wechatOpenid","act":"get"})
	// //登录
function login(e){
	apiconn.loginx(e)
	var parm = e;
	apiconn.state_changed_handler = function() {
		console.log("state: "+apiconn.from_state+" => "+apiconn.conn_state);
		
	};

	apiconn.response_received_handler = function(jo) {
		console.log(jo)
		if(jo.ustr){
			alert(jo.ustr)
		}else{
			alert("登录成功！")
			// sessionStorage.setItem("sess", jo.sess);
			window.location.href='classSchedule.html';
			setCookie("sess", jo.sess,300)
			setCookie("login",JSON.stringify(parm));
			setCookie("user_info", JSON.stringify(jo.user_info),300)


		}
		
	};

}


data =''
function send(e){
	var log = {
                "obj":"person",
                "act":"login",
                "login_type":"student",
                };
   log.login_name=getCookie("login_name");
   log.login_passwd=getCookie("login_passwd");
    console.log(log)                    
	apiconn.loginx(log)
	apiconn.state_changed_handler = function() {
		console.log("state: "+apiconn.from_state+" => "+apiconn.conn_state);
		apiconn.send_obj(e);
	};

	apiconn.response_received_handler = function(jo) {
		// console.log(jo)
		data = jo;
		console.log(data)
		// window.location.href='classSchedule.html';
	}

}
charpter =''
function chapterSend(e){
	var log = {
                "obj":"person",
                "act":"login",
                "login_type":"student",
                };
   log.login_name=getCookie("login_name");
   log.login_passwd=getCookie("login_passwd");
    console.log(log)                    
	apiconn.loginx(log)
	apiconn.state_changed_handler = function() {
		console.log("state: "+apiconn.from_state+" => "+apiconn.conn_state);
		apiconn.send_obj(e);
	};

	apiconn.response_received_handler = function(jo) {
		// console.log(jo)
		charpter = jo;
		console.log(charpter)
		// window.location.href='classSchedule.html';
	}

}






