function TB_show(caption, url) { //function called when the user clicks on a thickbox link
	
	try {
		if (window.innerHeight && window.scrollMaxY) {	
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			yScroll = document.body.offsetHeight;
	  	}
		
		$("body")
		.append("<div id='TB_overlay"+caption+"' class='TB_overlay'></div><div id='TB_window"+caption+"' class='TB_window'></div>");
		$("#TB_overlay"+caption).css("opacity","0.6");
		$("#TB_overlay"+caption).css("filter","alpha(opacity=60)");
		$("#TB_overlay"+caption).css("-moz-opacity","0.6");
		$(window).resize(function(){TB_position(caption)});
		$("body").append("<div id='TB_load"+caption+"' class='TB_load'><div id='TB_loadContent"+caption+"' class='TB_loadContent'></div></div>");
		$("#TB_overlay"+caption).css("height",yScroll +"px");
		$("#TB_overlay"+caption).show();
		var urlString = /.jpg|.jpeg|.png|.gif|.html|.htm|.jsp|.action/g;
		var urlType = url.match(urlString);
		
		if(urlType == '.htm' || urlType == '.html'|| urlType == '.jsp'|| urlType == '.action'){//code to show html pages
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = parseQuery( queryString );
			TB_WIDTH = (params['width']*1) + 4;
			TB_HEIGHT = (params['height']*1) + 20;
			ajaxContentW = TB_WIDTH - 4;
			ajaxContentH = TB_HEIGHT - 25;
			$("#TB_window"+caption).append("<div id='TB_ajaxContent"+caption+"' style='width:"+ajaxContentW+"px;' class='TB_ajaxContent'></div>");
			//$("#TB_closeWindowButton").click(TB_remove);
			$("#TB_ajaxContent"+caption).load(url, function(){
			TB_position(caption);
			$("#TB_load"+caption).remove();
			$("#TB_window"+caption).slideDown("normal");
			});
			$("#TB_overlay"+caption).css("z-index",$(".TB_window").size()*102);
			$("#TB_window"+caption).css("z-index",$(".TB_window").size()*102);
			
		}
		
	} catch(e) {
		alert( e );
	}
}

//helper functions below

function TB_remove(caption) {
	// #TB_load removal added by Christian Montoya; solves bug when overlay is closed before image loads
	$("#TB_window"+caption).fadeOut("fast",function(){$('#TB_window'+caption+',#TB_overlay'+caption+',#TB_load').remove();}); 
	return false;
}

function TB_position(caption) {
	var de = document.documentElement;
	var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
  
  	if (window.innerHeight && window.scrollMaxY) {	
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		yScroll = document.body.offsetHeight;
  	}
	
	$("#TB_window"+caption).css({width:TB_WIDTH+"px",
		left: ((w - TB_WIDTH)/2)+"px"});
	$("#TB_overlay"+caption).css("height",yScroll +"px");
}

function parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
