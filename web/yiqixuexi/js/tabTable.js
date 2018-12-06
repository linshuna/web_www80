clickTab();


//单击切换
function clickTab(){
	var index = 0;
	var tab = document.getElementsByClassName('tab');
    var table = document.getElementsByClassName('classSchedule');
	for(var i = 0; i < tab.length; i++ ){
		tab[i].index = i;
		tab[i].onclick = function(){
			index = this.index;
			initTab(tab,table);
			tabIndex(tab,table,index)
			
		}
	}
}

//初始化
function initTab(e,body){
	for(var i = 0; i < e.length;i++){
		e[i].className = "tab";
		body[i].className = "classSchedule";
		
	}
}

//索引标签
function tabIndex(e,body,index){
	e[index].classList.add("tab-index");
	body[index].classList.add ("classIndex");
}