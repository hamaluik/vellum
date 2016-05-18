(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var vellum_Display = function(width,height) {
	this.set_width(width);
	this.set_height(height);
	this.glyphs = [];
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		var row = [];
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			row.push(vellum_Glyph.fromChar(" "));
		}
		this.glyphs.push(row);
	}
};
vellum_Display.prototype = {
	set_width: function(w) {
		return this.width = w;
	}
	,set_height: function(h) {
		return this.height = h;
	}
	,clear: function(clearGlyph) {
		if(clearGlyph == null) clearGlyph = vellum_Glyph.fromChar(" ");
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.width;
			while(_g3 < _g2) {
				var x = _g3++;
				this.writeGlyph(x,y,clearGlyph);
			}
		}
	}
	,glyph: function(x,y) {
		if(x < 0) throw new js__$Boot_HaxeError("_x_ must be >= 0!");
		if(y < 0) throw new js__$Boot_HaxeError("_y_ must be >= 0!");
		if(x >= this.width) throw new js__$Boot_HaxeError("_x_ must be < width = " + this.width);
		if(y >= this.height) throw new js__$Boot_HaxeError("_y_ must be < height = " + this.height);
		return this.glyphs[y][x];
	}
	,print: function(x,y,text,foreground,background) {
		var _g1 = 0;
		var _g = text.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(x + i >= this.width) break;
			this.writeCharCode(x + i,y,text.charCodeAt(i),foreground,background);
		}
	}
	,writeGlyph: function(x,y,glyph) {
		this.writeCharCode(x,y,glyph.code,glyph.foreground,glyph.background);
	}
	,writeCharCode: function(x,y,code,foreground,background) {
		if(x < 0) throw new js__$Boot_HaxeError("_x_ must be >= 0!");
		if(y < 0) throw new js__$Boot_HaxeError("_y_ must be >= 0!");
		if(x >= this.width) throw new js__$Boot_HaxeError("_x_ must be < width = " + this.width);
		if(y >= this.height) throw new js__$Boot_HaxeError("_y_ must be < height = " + this.height);
		this.glyphs[y][x].code = code;
		this.glyphs[y][x].set_foreground(foreground);
		this.glyphs[y][x].set_background(background);
	}
	,writeChar: function(x,y,$char,foreground,background) {
		if($char.length < 1) throw new js__$Boot_HaxeError("_char_ **must** have at least 1 character!");
		this.writeCharCode(x,y,$char.charCodeAt(0),foreground,background);
	}
	,render: function() {
	}
};
var vellum_Window = function(x,y,z,width,height) {
	this.x = x;
	this.y = y;
	this.z = z;
	vellum_Display.call(this,width,height);
};
vellum_Window.__super__ = vellum_Display;
vellum_Window.prototype = $extend(vellum_Display.prototype,{
});
var BorderedWindow = function(x,y,z,width,height) {
	vellum_Window.call(this,x,y,z,width,height);
};
BorderedWindow.__super__ = vellum_Window;
BorderedWindow.prototype = $extend(vellum_Window.prototype,{
	render: function() {
		var _g1 = 1;
		var _g = this.width - 1;
		while(_g1 < _g) {
			var i = _g1++;
			this.writeChar(i,0,"═","rgb(128, 128, 128)");
			this.writeChar(i,this.height - 1,"═","rgb(128, 128, 128)");
		}
		var _g11 = 1;
		var _g2 = this.height - 1;
		while(_g11 < _g2) {
			var j = _g11++;
			this.writeChar(0,j,"║","rgb(128, 128, 128)");
			this.writeChar(this.width - 1,j,"║","rgb(128, 128, 128)");
		}
		this.writeChar(0,0,"╔","rgb(128, 128, 128)");
		this.writeChar(this.width - 1,0,"╗","rgb(128, 128, 128)");
		this.writeChar(this.width - 1,this.height - 1,"╝","rgb(128, 128, 128)");
		this.writeChar(0,this.height - 1,"╚","rgb(128, 128, 128)");
	}
});
var Example = function() { };
Example.main = function() {
	Example.term = new vellum_CanvasTerminal(80,25,vellum_Font.Menlo());
	Example.term.print(0,0,"Some windows:");
	Example.w1 = new BorderedWindow(2,2,0,30,5);
	Example.w1.print(1,1,"Hello world!");
	Example.term.addWindow(Example.w1);
	Example.w2 = new BorderedWindow(18,4,1,20,10);
	Example.w2.print(1,1,"I'm on top!");
	Example.term.addWindow(Example.w2);
	window.setInterval(Example.refresh,500);
};
Example.refresh = function() {
	Example.w1.print(1,2,Example.x?"█":" ");
	Example.term.render();
	Example.x = !Example.x;
};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Std = function() { };
Std["int"] = function(x) {
	return x | 0;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var vellum_Terminal = function(width,height) {
	this.windows = [];
	vellum_Display.call(this,width,height);
};
vellum_Terminal.__super__ = vellum_Display;
vellum_Terminal.prototype = $extend(vellum_Display.prototype,{
	sortWindows: function() {
		this.windows.sort(function(wa,wb) {
			return wa.z - wb.z;
		});
	}
	,addWindow: function(window) {
		this.windows.push(window);
		this.sortWindows();
	}
	,removeWindow: function(window) {
		HxOverrides.remove(this.windows,window);
		this.sortWindows();
	}
	,pushWindow: function(x,y,width,height) {
		var z = 0;
		if(this.windows.length > 0) z = this.windows[this.windows.length - 1].z + 1;
		var $window = new vellum_Window(x,y,z,width,height);
		this.windows.push($window);
		return $window;
	}
	,popWindow: function() {
		return this.windows.pop();
	}
	,getWindow: function(index) {
		if(index < 0 || index >= this.windows.length) return null;
		return this.windows[index];
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.windows;
		while(_g < _g1.length) {
			var w = _g1[_g];
			++_g;
			w.render();
			var _g3 = 0;
			var _g2 = w.height;
			while(_g3 < _g2) {
				var wy = _g3++;
				var _g5 = 0;
				var _g4 = w.width;
				while(_g5 < _g4) {
					var wx = _g5++;
					var tx = w.x + wx;
					var ty = w.y + wy;
					if(tx < 0 || ty < 0 || tx >= this.width || ty >= this.height) continue;
					this.writeGlyph(tx,ty,w.glyphs[wy][wx]);
				}
			}
		}
	}
});
var vellum_RenderableTerminal = function(width,height) {
	vellum_Terminal.call(this,width,height);
	this.oldGlyphs = [];
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		var row = [];
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			row.push(this.glyphs[y][x].copy());
		}
		this.oldGlyphs.push(row);
	}
};
vellum_RenderableTerminal.__super__ = vellum_Terminal;
vellum_RenderableTerminal.prototype = $extend(vellum_Terminal.prototype,{
	render: function() {
		vellum_Terminal.prototype.render.call(this);
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0;
			var _g2 = this.width;
			while(_g3 < _g2) {
				var x = _g3++;
				if(this.glyphs[y][x].notEquals(this.oldGlyphs[y][x])) {
					this.drawGlyph(x,y,this.glyphs[y][x]);
					this.oldGlyphs[y][x].code = this.glyphs[y][x].code;
					this.oldGlyphs[y][x].set_foreground(this.glyphs[y][x].foreground);
					this.oldGlyphs[y][x].set_background(this.glyphs[y][x].background);
				}
			}
		}
	}
	,drawGlyph: function(x,y,glyph) {
	}
});
var vellum_CanvasTerminal = function(width,height,font,canvas) {
	vellum_RenderableTerminal.call(this,width,height);
	if(canvas == null) {
		canvas = window.document.createElement("Canvas");
		window.document.body.appendChild(canvas);
	}
	this.canvas = canvas;
	this.context = canvas.getContext("2d",null);
	if(font == null) font = vellum_Font.Courier();
	this.font = font;
	var canvasWidth = font.charWidth * width;
	var canvasHeight = font.lineHeight * height;
	canvas.width = Std["int"](canvasWidth * window.devicePixelRatio);
	canvas.height = Std["int"](canvasHeight * window.devicePixelRatio);
	canvas.style.width = "" + canvasWidth + "px";
	canvas.style.height = "" + canvasHeight + "px";
	this.context.font = "" + font.size * window.devicePixelRatio + "px " + font.family + ", monospace";
};
vellum_CanvasTerminal.__super__ = vellum_RenderableTerminal;
vellum_CanvasTerminal.prototype = $extend(vellum_RenderableTerminal.prototype,{
	drawGlyph: function(x,y,glyph) {
		this.context.fillStyle = glyph.background;
		this.context.fillRect(x * this.font.charWidth * window.devicePixelRatio,y * this.font.lineHeight * window.devicePixelRatio,this.font.charWidth * window.devicePixelRatio,this.font.lineHeight * window.devicePixelRatio);
		if(glyph.code == 0 || glyph.code == HxOverrides.cca(" ",0)) return;
		this.context.fillStyle = glyph.foreground;
		this.context.fillText(String.fromCharCode(glyph.code),(x * this.font.charWidth + this.font.x) * window.devicePixelRatio,(y * this.font.lineHeight + this.font.y) * window.devicePixelRatio);
	}
});
var vellum_Font = function(family,size,charWidth,lineHeight,x,y) {
	this.family = family;
	this.size = size;
	this.charWidth = charWidth;
	this.lineHeight = lineHeight;
	this.x = x;
	this.y = y;
};
vellum_Font.Courier = function() {
	return new vellum_Font("Courier",12,8,14,1,10);
};
vellum_Font.Menlo = function() {
	return new vellum_Font("Menlo, Consolas",12,9,14,1,11);
};
var vellum_Glyph = function(code,foreground,background) {
	this.code = code;
	this.set_foreground(foreground);
	this.set_background(background);
};
vellum_Glyph.fromChar = function($char,foreground,background) {
	if($char.length < 1) throw new js__$Boot_HaxeError("_char_ **must** have at least 1 character!");
	return new vellum_Glyph($char.charCodeAt(0),foreground,background);
};
vellum_Glyph.prototype = {
	set_foreground: function(c) {
		if(c == null) this.foreground = vellum_Glyph.CLEAR_FOREGROUND; else this.foreground = c;
		return this.foreground;
	}
	,set_background: function(c) {
		if(c == null) this.background = vellum_Glyph.CLEAR_BACKGROUND; else this.background = c;
		return this.background;
	}
	,equals: function(other) {
		return this.code == other.code && this.foreground == other.foreground && this.background == other.background;
	}
	,notEquals: function(other) {
		return this.code != other.code || this.foreground != other.foreground || this.background != other.background;
	}
	,copy: function() {
		return new vellum_Glyph(this.code,this.foreground,this.background);
	}
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
vellum_Display.__meta__ = { fields : { set_width : { SuppressWarnings : ["checkstyle:InnerAssignment"]}, set_height : { SuppressWarnings : ["checkstyle:InnerAssignment"]}}};
Example.x = true;
vellum_Font.__meta__ = { statics : { Courier : { SuppressWarnings : ["checkstyle:MagicNumber","checkstyle:MethodName"]}, Menlo : { SuppressWarnings : ["checkstyle:MagicNumber","checkstyle:MethodName"]}}};
vellum_Glyph.CLEAR_FOREGROUND = "#fff";
vellum_Glyph.CLEAR_BACKGROUND = "#000";
Example.main();
})(typeof console != "undefined" ? console : {log:function(){}});
