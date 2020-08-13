var spacedirlist=[{key:"",name:"联通"},{key:"gxq",name:"高新区"},{key:"dxekt",name:"电信"},{key:"ydhlj",name:"黑龙江移动"},{key:"ydqt",name:"移动全通"},{key:"jxqt",name:"江西移动全通"},{key:"hhhts",name:"呼和浩特定制"}];
function getSpaceDirName(dirkey){
	if(dirkey && ""!=dirkey){
		for(var sindex=0;sindex<spacedirlist.length;sindex++){
			var asp=spacedirlist[sindex];
			if(dirkey==asp.key){
				return asp.name;	
			}
		}
		return dirkey;
	}else{
		return "联通";
	}
}