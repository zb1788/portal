//千一网络 www.cftea.com
//Progress（进度条） v2.0
//http://www.cftea.com/products/webComponents/Progress/
//此文件为 utf-8 格式
//应用示例：
/*
<p>进度条 1：</p>
<div id="pp1"></div>

<p>进度条 2：</p>
<table>
  <tr>
    <td id="pp2"></td>
    <td id="pp2Text"></td>
  </tr>
</table>

<p>进度条 3：</p>
<div id="pp3"></div>
<div>
  <input type="button" value="减少一个 step" onclick="javascript:progress3.desc();" />
  <input type="button" value="设置 position 为 50" onclick="javascript:progress3.setPosition(50);" />
  <input type="button" value="增加一个 step" onclick="javascript:progress3.inc();" />
</div>


<script type="text/javascript" src="Progress.js"></script>
<script type="text/javascript">
<!--
//千一网络 www.cftea.com

var progress1 = new Progress("pp1", 0, 100, 100, 1, new ProgressStyle(200, 10, "#009999", "#00CCCC"));
progress1.create();
setInterval(function () { progress1.desc(); }, 50);

var progress2 = new Progress("pp2", 0, 100, 0, 1, new ProgressStyle(300, 20, "#CC0000", "#FF3333"));
progress2.onPositionChange = function () {
    document.getElementById("pp2Text").innerHTML = parseInt(progress2.position * 100 / (progress2.max - progress2.min)) + "%";
};
progress2.create();
setInterval(function () { progress2.inc(); }, 50);

var progress3 = new Progress("pp3", 0, 100, 25, 25, new ProgressStyle(200, 20, "#009999", "#FF0000"));
progress3.create();
-->
</script>
*/


//进度条样式
//属性 width，数字，进度条宽度。
//属性 height，数字，进度条高度。
//属性 borderWidth，数字，进度条边框粗细，边框是包含在 width 和 height 中的，默认值为 1。
//属性 borderColor，字符串，进度条边框的颜色。
//属性 barMargin，数字，进度条中显示条与边框的距离，默认值为 1。
//属性 barColor，字符串，进度条中显示条的颜色。
function ProgressStyle(width, height, borderColor, barColor)
{
    this.width = width;
    this.height = height;
    
    this.borderWidth = 1;
    this.borderColor = borderColor;
    
    this.barMargin = 1;
    this.barColor = barColor;
}

//进度条
//参数 targetIdOrTarget，字符串或 object，承载进度条的 HTML 控件 Id 名称或控件对象。
//参数 min，数字，进度条的最小指示值。
//参数 max，数字，进度条的最大指示值。
//参数 position，数字，进度条的当前指示值。
//参数 step，数字，进度条步进长度。
//参数 progressStyle，ProgressStyle，进度条的样式。
//事件 onPositionChange，函数，进度条的当前指示值发生改变时对应的方法。
//方法 create()，创建进度条。
//方法 setPosition，设置进度条的当前指示值。
//方法 desc，进度条的当前指示值减少一个 step。
//方法 inc，进度条的当前指示值增加一个 step。
function Progress(targetIdOrTarget, min, max, position, step, progressStyle)
{

    this.target = (typeof(targetIdOrTarget)=="string") ? document.getElementById(targetIdOrTarget) : targetIdOrTarget;
    this.targetid=targetIdOrTarget;
    this.object = null;
    this.bar = null;
    this.min = min;
    this.max = max;
    this.position = position;
    this.step = step;
    this.progressStyle = progressStyle;
    
    this.onPositionChange = null;
    
    this.create = Progress_create;
    this.setPosition = Progress_setPosition;
    this.desc = Progress_desc;
    this.inc = Progress_inc;
}

function Progress_create()
{
    this.object = document.createElement("div"); //不能用 span，因为 span 无宽度。
    this.object.style.width = this.progressStyle.width + "Px";
    this.object.style.height = this.progressStyle.height + "px";
    this.object.style.fontSize = "0px"; //避免有些浏览器中因文字大小影响 div 的最小高度。
    this.object.id=this.targetid+"_scroll"
    this.target.appendChild(this.object);
    
    var container = document.createElement("div"); //为了兼容不同浏览器中，对 border、margin 是否包含在 width 中的不同解释，增加一个 container。
    container.style.border = this.progressStyle.borderWidth + "px solid " + this.progressStyle.borderColor;
    container.style.padding = this.progressStyle.barMargin + "px"; //设置 container 的 padding，以达到 bar 的 margin 效果。
    container.style.fontSize = "0px";
    this.object.appendChild(container);
    
    this.bar = document.createElement("div");
    this.bar.style.height = (this.progressStyle.height - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2) + "px";
    this.bar.style.backgroundColor = this.progressStyle.barColor;
    this.bar.style.fontSize = "0px";
    container.appendChild(this.bar);


    this.setPosition(this.position); //设置初始位置
}


//将进度值位置设置到指定值。
function Progress_setPosition(position)
{
    if (position < this.min)
    {
        this.position = this.min;
        this.bar.style.width = "0px";
    }
    else if (position > this.max)
    {
        this.position = this.max;
        this.bar.style.width = (this.progressStyle.width - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2) + "px";
    }
    else
    {
        this.position = position;
        this.bar.style.width = ((this.position / (this.max - this.min)) * (this.progressStyle.width - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2)) + "px";
    }
    
    if (typeof(this.onPositionChange) == "function")
    {
        this.onPositionChange(); //事件
    }
}


//进度条当前指示值减少一个 step。
function Progress_desc()
{
    this.setPosition(this.position - this.step);
}


//进度条当前指示值增加一个 step。
function Progress_inc()
{
    this.setPosition(this.position + this.step);
}