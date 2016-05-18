package vellum;

// see https://github.com/munificent/malison/blob/master/lib/src/key_bindings.dart
@:enum
abstract KeyCode(Int) {
	var delete     = 8;
	var tab        = 9;
	var enter      = 13;
	var shift      = 16;
	var control    = 17;
	var option     = 18;
	var escape     = 27;
	var space      = 32;

	var left       = 37;
	var up         = 38;
	var right      = 39;
	var down       = 40;

	var zero       = 48;
	var one        = 49;
	var two        = 50;
	var three      = 51;
	var four       = 52;
	var five       = 53;
	var six        = 54;
	var seven      = 55;
	var eight      = 56;
	var nine       = 57;

	var a          = 65;
	var b          = 66;
	var c          = 67;
	var d          = 68;
	var e          = 69;
	var f          = 70;
	var g          = 71;
	var h          = 72;
	var i          = 73;
	var j          = 74;
	var k          = 75;
	var l          = 76;
	var m          = 77;
	var n          = 78;
	var o          = 79;
	var p          = 80;
	var q          = 81;
	var r          = 82;
	var s          = 83;
	var t          = 84;
	var u          = 85;
	var v          = 86;
	var w          = 87;
	var x          = 88;
	var y          = 89;
	var z          = 90;

	var numpad0   = 96;
	var numpad1   = 97;
	var numpad2   = 98;
	var numpad3   = 99;
	var numpad4   = 100;
	var numpad5   = 101;
	var numpad6   = 102;
	var numpad7   = 103;
	var numpad8   = 104;
	var numpad9   = 105;

	var semicolon  = 186;
	var comma      = 188;
	var period     = 190;
	var slash      = 191;
	var apostrophe = 222;
}
