// JavaScript Document

//ҳ��������ʱ���ж�ҳ��ֱ��ʣ��Զ����ز�ͬ��ʽ��
$(document).ready(function(){
	var clienW =($(window).width()); //�����ʱ�´��ڿ��������� 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-index.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-index.css");
		}
	
	
});

//�������ڿ��ʱ�������滻ҳ���е���ʽ��
function resizeWidth(){
	var clienW =($(window).width()); //�����ʱ�´��ڿ��������� 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-index.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-index.css");
		}
	}

$(window).resize(function(){
	setTimeout(resizeWidth,500);
})
