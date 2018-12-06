var user = document.getElementsByClassName('user');
var username = document.getElementById('user')
var user_info = {};
if(getCookie("sess")){
	user[0].style.display = 'none'
    user_info = JSON.parse(getCookie("user_info"));

    username.innerHTML = user_info.name;
    console.log(user_info)
    user[1].onclick = function(){
    	delCookie("sess");
    	window.location.href = "login.html"
    }
    // alert(getCookie("sess"))
}else{
	user[1].style.display = 'none'

}