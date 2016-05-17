#if js

package vellum;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

class CanvasTerminal extends RenderableTerminal {
	var font:Font;
	var canvas:CanvasElement;
	var context:CanvasRenderingContext2D;

	public function new(width:Int, height:Int, ?font:Font, ?canvas:CanvasElement) {
		super(width, height);

		// create a canvas to draw on if we don't have one
		if(canvas == null) {
			canvas = cast(js.Browser.document.createElement('Canvas'));
			js.Browser.window.document.body.appendChild(canvas);
		}
		this.canvas = canvas;
		this.context = canvas.getContext2d();

		// setup the font
		if(font == null) {
			font = Font.Courier();
		}
		this.font = font;

		// size the canvas appropriately
		var canvasWidth:Int = font.charWidth * width;
		var canvasHeight:Int = font.lineHeight * height;
		canvas.width = Std.int(canvasWidth * js.Browser.window.devicePixelRatio);
		canvas.height = Std.int(canvasHeight * js.Browser.window.devicePixelRatio);
		canvas.style.width = '${canvasWidth}px';
		canvas.style.height = '${canvasHeight}px';

		// set up the font
		context.font = '${font.size * js.Browser.window.devicePixelRatio}px ${font.family}, monospace';
	}

	override public function drawGlyph(x:Int, y:Int, glyph:Glyph) {
		// draw the background
		context.fillStyle = cast(glyph.background);
		context.fillRect(
			x * font.charWidth * js.Browser.window.devicePixelRatio,
			y * font.lineHeight * js.Browser.window.devicePixelRatio,
			font.charWidth * js.Browser.window.devicePixelRatio,
			font.lineHeight * js.Browser.window.devicePixelRatio);

		// don't draw empty chars
		if(glyph.code == 0 || glyph.code == ' '.charCodeAt(0)) return;

		// now draw the character
		context.fillStyle = cast(glyph.foreground);
		context.fillText(
			String.fromCharCode(glyph.code),
			(x * font.charWidth + font.x) * js.Browser.window.devicePixelRatio,
			(y * font.lineHeight + font.y) * js.Browser.window.devicePixelRatio);
	}
}

#end
