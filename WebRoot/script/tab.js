// JavaScript Document
function Show_Tab(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur";
			}
	}
}



function siblingPrevious(ele) {
	if (ele == null || typeof ele.previousSibling == 'undefined') return null;
	while (ele.previousSibling != null && ele.previousSibling.nodeType != 1) ele = ele.previousSibling;
	return ele.previousSibling;
}
function siblingNext(ele) {
	if (ele == null || typeof ele.nextSibling == 'undefined') return null;
	while (ele.nextSibling != null && ele.nextSibling.nodeType != 1) ele = ele.nextSibling;
	return ele.nextSibling;
}


function tabChange(e, sindex, delay) {
	if (!e) return;
	if (!delay) { var thisdelay = window.setTimeout(function() { tabChange(e, sindex, thisdelay); }, 1); e.onmouseout = function(e) { window.clearTimeout(thisdelay); }; return; }
	if (e.onmouseout != null) e.onmouseout = null;
	var es = e.parentNode.childNodes; 
	var cindex = 0;
	for (var i = 0; i < es.length; i++) {
		if (es[i].nodeType != 1) continue;
		if (es[i] == e) { cindex = i; if (es[i].className.indexOf('cur') < 0) es[i].className = es[i].className + 'cur';
		 }
		
		else es[i].className = es[i].className.replace('cur', '');
	}
}