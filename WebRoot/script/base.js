// JavaScript Document
function cls(){ 
//捕获触发事件的对象，并设置为以下语句的默认对象 
with(event.srcElement) 
     //如果当前值为默认值，则清空 
if(value==defaultValue) value="";
} 
function res(){ 
//捕获触发事件的对象，并设置为以下语句的默认对象 
with(event.srcElement) 
//如果当前值为空，则重置为默认值 
if(value=="") value=defaultValue;
} 

function Show_Tab_List_baby(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_baby1";
			}
	}
}
function Show_Tab1(Tabid_num,Tabnum){
	for(var i=0;i<2;i++){document.getElementById("t_"+Tabid_num+i).style.display="none";}
	for(var i=0;i<2;i++){document.getElementById("Tabmenu_"+Tabid_num+i).className="trtw";}
	document.getElementById("Tabmenu_"+Tabid_num+Tabnum).className="wytw";
	document.getElementById("t_"+Tabid_num+Tabnum).style.display="block";
}

function Show_Tab_List_ms(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_ms";
			}
	}
}


function Show_Tab_List_sou(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_sou";
			}
	}
}

function Show_Tab_List_kc(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_kc";
			}
	}
}

function Show_Tab_List_fd(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="on";
			}
	}
}

function Show_Tab_List_pop(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_fd";
			}
	}
}


function Show_Tab_List_sq(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="curBtn_sq";
			}
	}
}


function Show_Tab_List_1(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_1";
			}
	}
}

/*教师文件夹-我的推荐页 勾选复选框背景变黄*/
function chaCloor(field){
var pig = field.checked;
pig?field.parentNode.parentNode.style.backgroundColor="#fffdd7":field.parentNode.parentNode.style.backgroundColor="#fff";
}

function chaCloor2(field){
var pig = field.checked;
pig?field.parentNode.parentNode.parentNode.style.backgroundColor="#fffdd7":field.parentNode.parentNode.parentNode.style.backgroundColor="#fff";
}

function check(obj){
		var checkbox=obj.getElementsByTagName("input");	
		checkbox[0].checked=!checkbox[0].checked;
}

function autoCheckall(id,kind)//反选(kind可以是checkbox或者radio)
    {
        checkbox=document.getElementById(id).getElementsByTagName("input");
        for(var i=0;i<checkbox.length;i++)
        {       
            if(checkbox[i].type==kind)    
			{
				if(checkbox[i].id!="All")
				{
	                checkbox[i].checked=!checkbox[i].checked;
					chaCloor(checkbox[i]);
				}
			}
		}
		
    } 
	
function autoCheckall2(id,kind)//反选(kind可以是checkbox或者radio)
    {
        checkbox=document.getElementById(id).getElementsByTagName("input");
        for(var i=0;i<checkbox.length;i++)
        {       
            if(checkbox[i].type==kind)    
			{
				if(checkbox[i].id!="All")
				{
	                checkbox[i].checked=!checkbox[i].checked;
					chaCloor2(checkbox[i]);
				}
			}
		}
		
    } 
//

