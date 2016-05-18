#if js

package vellum;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

class CanvasTerminal extends RenderableTerminal {
	var font:Font;
	var canvas:CanvasElement;
	var context:CanvasRenderingContext2D;

	override public function set_handlingInput(x:Bool):Bool {
		js.Browser.document.body.onkeydown = x ? onKeyDown : null;
		js.Browser.document.body.onkeyup = x ? onKeyUp : null;
		js.Browser.document.body.onkeypress = x ? onKeyPress : null;
		handlingInput = x;
		return handlingInput;
	}

	override public function set_width(w:Int):Int {
		super.set_width(w);
		resizeCanvas();
		return width;
	}

	override public function set_height(h:Int):Int {
		super.set_height(h);
		resizeCanvas();
		return height;
	}

	function resizeCanvas() {
		var canvasWidth:Int = font.charWidth * width;
		var canvasHeight:Int = font.lineHeight * height;
		canvas.width = Std.int(canvasWidth * js.Browser.window.devicePixelRatio);
		canvas.height = Std.int(canvasHeight * js.Browser.window.devicePixelRatio);
		canvas.style.width = '${canvasWidth}px';
		canvas.style.height = '${canvasHeight}px';
	}

	public function new(width:Int, height:Int, ?font:Font, ?canvas:CanvasElement, ?handleInput:Bool) {
		// initialize the display
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
		resizeCanvas();

		// set up the font
		context.font = '${font.size * js.Browser.window.devicePixelRatio}px ${font.family}, monospace';

		// enable input handling (by default)
		handlingInput = handleInput == null ? true : handleInput;
	}

	function onKeyDown(event:js.html.KeyboardEvent) {
		onKeyEvent(event, KeyEventType.DOWN);
	}

	function onKeyUp(event:js.html.KeyboardEvent) {
		onKeyEvent(event, KeyEventType.UP);
	}

	function onKeyPress(event:js.html.KeyboardEvent) {
		onKeyEvent(event, KeyEventType.PRESSED);
	}

	function onKeyEvent(event:js.html.KeyboardEvent, type:KeyEventType) {
		// if we don't have any windows to accept input, then don't bother!
		if(windows.length < 1) return;

		// grab the keycode
		// firefox uses 59 for semicolon
		var keyCode:KeyCode = event.keyCode == 59 ? KeyCode.semicolon : cast(event.keyCode);

		// send the bindings to our topmost window!
		if(windows[windows.length - 1].handleKeys(keyCode, type, event.shiftKey, event.altKey)) {
			// if the window handles the event, stop the propagation!
			event.preventDefault();
		}
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
