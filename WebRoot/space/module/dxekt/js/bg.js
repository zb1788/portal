function LoadImage(id) {
    var _this = $("#" + id);
    var title = _this.attr("data-title");
    var width = TrimPx(_this.css("width"));
    var height = TrimPx(_this.css("height"));
    var border_radius = _this.css("border-radius");
    var shape = "square";
    if (border_radius == "50%") shape = "circle";
    var border_width = TrimPx(_this.css("border-width"));
    var border_color = rgb2hex(_this.css("border-color"));
    var border_color = border_color;
    if (title == undefined) return;
    $.ajax({
        type: 'post',
        url: 'http://112.74.75.214/I_VSEA/service/i_vsea/i_vsea_service.ashx',
        data: { "rsc_title": title, "width": width, "height": height, "shape": shape, "border_width": border_width, "border_color": border_color },
        success: function(data) {
            var json = eval("(" + data + ")");
            _this.attr("src", json.data)
        }
    })
}



function rgb2hex(rgb) { rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2) } return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) }

function TrimPx(str) { return str.substr(0, str.length - 2) }