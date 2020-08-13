// JavaScript Document

/*弹出下拉框(层)*/
var timeOut=[];
function onMouseOutbox(x){
	timeOut[x]= window.setTimeout( function() {
	$('#'+x).hide();
	},0);
	$('#'+x).parent().siblings().css("position","relative");
	var abc=$('#'+x).attr("class");
	if(abc.indexOf("drop")>=0){
		$('#'+x).siblings().removeClass();
		$('#'+x).siblings().addClass("arr2 arr_d");	 
	}
}
function onMouseOverbox(x){
	window.clearTimeout(timeOut[x]);
	$('#'+x).fadeIn(300);
	$('#'+x).parent().siblings().css("position","static");
	var abc=$('#'+x).attr("class");
	if(abc.indexOf("drop")>=0){
		$('#'+x).siblings().removeClass();
		$('#'+x).siblings().addClass("arr2 arr_u");	 
	}
} 

function onMouseOutbox2(y){
	timeOut[y]= window.setTimeout( function() {
	$('#'+y).hide();
	},0);
	var abc=$('#'+y).attr("class");
	if(abc.indexOf("drop")>=0){
		$('#'+y).siblings().removeClass();
		$('#'+y).siblings().addClass("arr arr_d");	 
	}
}
function onMouseOverbox2(y){
	window.clearTimeout(timeOut[y]);
	$('#'+y).fadeIn(300);
	var abc=$('#'+y).attr("class");
	if(abc.indexOf("drop")>=0){
		$('#'+y).siblings().removeClass();
		$('#'+y).siblings().addClass("arr arr_u");	 
	}
} 

function onMouseOutbox_base(x){
timeOut[x]= window.setTimeout( function() {
$('#'+x).fadeOut(300);
},500);
}
function onMouseOverbox_base(x){
window.clearTimeout(timeOut[x]);
$('#'+x).fadeIn(300);
} 


/*页签切换*/
function Show_Tab(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			document.getElementById(where+"Tab_"+i).childNodes[0].style.display="none";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="cur_2";
			document.getElementById(where+"Tab_"+i).childNodes[0].style.display="block";
			}
	}
}

function Show_Tab2(num,active,where){
	for(var i=0;i<num;i++){
		if(i!=active){
			document.getElementById(where+"s_"+i).style.display="none";
			document.getElementById(where+"Tab_"+i).className="";
			document.getElementById(where+"Tab_"+i).childNodes[0].style.display="none";
			}else{
			document.getElementById(where+"s_"+i).style.display="block";
			document.getElementById(where+"Tab_"+i).className="sel2";
			document.getElementById(where+"Tab_"+i).childNodes[0].style.display="block";
			}
	}
}

/*下拉框的值选择后，上面的值发生对应的改变*/
$(".drop a").click(function(){
	var str = $(this).text();
	$(this).parent().prev().text(str);
	$(".drop").hide();
})

/*显示、隐藏左侧目录树*/
$(".hideTree a").click(function(){
		$(".dtree").hide();
		$(".kc_list").addClass('full');
		$(".kc_con").css('background-image','none');
		$(".rightfloat").fadeIn("200");
	}
)

$(".show_dtree a").click(function(){
		$(".dtree").show();
		$(".kc_list").removeClass("full");
		$(".kc_con").css('background-image','url(../public/images/bg_list.png)');
		$(".rightfloat").fadeOut("200");
	}
)

function hid_tree(){
	var clienW =($(window).width()); //浏览器时下窗口可视区域宽度 
	if (clienW < 1280) {
		$(".dtree").hide();
		$(".kc_list").addClass('full');
		$(".kc_con").css('background-image','none');
		$(".rightfloat").fadeIn("200");	
		}
	}


/*评论框获得焦点时变高*/
$(".mul_text").focus(function(){
	$(this).animate( { height: "80px"}, 400);
	})
	
$(".mul_text").blur(function(){
	$(this).animate( { height: "40px"}, 400);
	})

$(".piclist li").hover(function(){
	$(this).children("div.tjB2").show();
	},function(){
		$(this).children("div.tjB2").hide();
		})

