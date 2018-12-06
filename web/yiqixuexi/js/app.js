// Based on AngularJS 1.4.2

var IWEB_ACCOUNT    = "test2"; 
var TOOLBOX_ACCOUNT = "test1"; 



// save a handle to the $rootScope obj
var rootScope;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goto_view(v) {
  	var baseUrl = window.location.href;
	baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
	window.location.href = baseUrl + "#/" + v;
}

function logout() {
	sessionStorage.setItem("login_name", "");
	sessionStorage.setItem("login_passwd", "");
	apiconn.logout();
}

var apiconn = new APIConnection();

apiconn.client_info.clienttype = "web";

apiconn.state_changed_handler = function() {

	rootScope.$apply(function() {
	
		console.log("state: "+apiconn.from_state+" => "+apiconn.conn_state);
	

		if (apiconn.conn_state == "IN_SESSION") {
	
			sessionStorage.setItem("login_name", apiconn.login_name);
			sessionStorage.setItem("login_passwd", apiconn.login_passwd);
				


		} else if (apiconn.conn_state == "LOGIN_SCREEN_ENABLED") {
	
			// auto re login after page refresh
			
			if (apiconn.login_name == "" && apiconn.credential_data == null) {
	
				var login_name = sessionStorage.getItem("login_name");
	            		var login_passwd = sessionStorage.getItem("login_passwd");
			
				var cred = sessionStorage.getItem("credential_data");
				var cred_obj = null;
				if (cred !== "") cred_obj = JSON.parse(cred);
	
				if (login_name != "" && login_name != null) {
	                		apiconn.login(login_name, login_passwd);
	
				} else if (cred_obj != null) {
	                		apiconn.loginx(cred_obj);
					
				} else {
				}
			}
			
		}
		
		rootScope.$broadcast("STATE_CHANGED_HANDLER", {});
	});
};

apiconn.response_received_handler = function(jo) {
// 	apiconn.send({
//     obj:"person",
//     act:"login",
//     login_type:"teacher",
//     login_name:"18120885256",
//     login_passwd:"12345678"
// })

	rootScope.$apply(function() {
		
		if (jo.ustr != null && jo.ustr != "" && jo.uerr != "ERR_CONNECTION_EXCEPTION") alert(jo.ustr);
		
		if (jo.obj == "person" && jo.act == "login" && jo.user_info && jo.server_info) {
			goto_view("i001");
		}
		if (jo.obj == "person" && jo.act == "logout") {
			goto_view("main");
			return;
		}

		// $scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {}
		if (jo.obj == "sdk" && jo.act == "switchreq") {
			return goto_view(jo.ixxx);
		}

		rootScope.$broadcast("RESPONSE_RECEIVED_HANDLER", jo);
	});
};
apiconn.wsUri = "ws://47.104.209.172:51717/yqds/";
apiconn.login('test1',1)






