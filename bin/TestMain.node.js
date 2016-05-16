(function (console, $hx_exports, $global) { "use strict";
$hx_exports.promhx = $hx_exports.promhx || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x1 = $it1.next();
		l.add(x1);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var buddy_Buddy = function() { };
buddy_Buddy.__name__ = ["buddy","Buddy"];
var TestMain = function() { };
TestMain.__name__ = ["TestMain"];
TestMain.__interfaces__ = [buddy_Buddy];
TestMain.main = function() {
	var reporter = new buddy_reporting_ConsoleReporter();
	var testsRunning = true;
	var runner = new buddy_SuitesRunner([],reporter);
	runner.run().then(function(_) {
		if(process.platform == 'win32') { process.once('exit', function() { process.exit(runner.statusCode()); }); } else { process.exit(runner.statusCode()); }
	});
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var buddy_TestStatus = { __ename__ : true, __constructs__ : ["Unknown","Passed","Pending","Failed"] };
buddy_TestStatus.Unknown = ["Unknown",0];
buddy_TestStatus.Unknown.toString = $estr;
buddy_TestStatus.Unknown.__enum__ = buddy_TestStatus;
buddy_TestStatus.Passed = ["Passed",1];
buddy_TestStatus.Passed.toString = $estr;
buddy_TestStatus.Passed.__enum__ = buddy_TestStatus;
buddy_TestStatus.Pending = ["Pending",2];
buddy_TestStatus.Pending.toString = $estr;
buddy_TestStatus.Pending.__enum__ = buddy_TestStatus;
buddy_TestStatus.Failed = ["Failed",3];
buddy_TestStatus.Failed.toString = $estr;
buddy_TestStatus.Failed.__enum__ = buddy_TestStatus;
var buddy_TestStep = { __ename__ : true, __constructs__ : ["TSuite","TSpec"] };
buddy_TestStep.TSuite = function(s) { var $x = ["TSuite",0,s]; $x.__enum__ = buddy_TestStep; $x.toString = $estr; return $x; };
buddy_TestStep.TSpec = function(s) { var $x = ["TSpec",1,s]; $x.__enum__ = buddy_TestStep; $x.toString = $estr; return $x; };
var buddy_BeforeAfter = function(run,async) {
	if(async == null) async = false;
	this.run = run;
	this.async = async;
};
buddy_BeforeAfter.__name__ = ["buddy","BeforeAfter"];
buddy_BeforeAfter.prototype = {
	__class__: buddy_BeforeAfter
};
var buddy_Suite = function(name,buddySuite) {
	if(name == null) throw new js__$Boot_HaxeError("Suite requires a name.");
	if(buddySuite == null) throw new js__$Boot_HaxeError("Suite requires a BuddySuite.");
	this.name = name;
	this.buddySuite = buddySuite;
	this.before = new List();
	this.after = new List();
	this.steps = new List();
};
buddy_Suite.__name__ = ["buddy","Suite"];
buddy_Suite.prototype = {
	get_specs: function() {
		var output = new List();
		var _g_head = this.steps.h;
		var _g_val = null;
		while(_g_head != null) {
			var step;
			step = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			switch(step[1]) {
			case 1:
				var s = step[2];
				output.add(s);
				break;
			default:
			}
		}
		return output;
	}
	,get_suites: function() {
		var output = new List();
		var _g_head = this.steps.h;
		var _g_val = null;
		while(_g_head != null) {
			var step;
			step = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			switch(step[1]) {
			case 0:
				var s = step[2];
				output.add(s);
				break;
			default:
			}
		}
		return output;
	}
	,__class__: buddy_Suite
};
var buddy_Spec = function(suite,description,run,async,pending) {
	if(pending == null) pending = false;
	if(async == null) async = false;
	this.suite = suite;
	this.description = description;
	this.run = run;
	this.async = async;
	this.traces = new List();
	if(run == null) this.status = buddy_TestStatus.Pending; else if(pending) this.status = buddy_TestStatus.Pending; else this.status = buddy_TestStatus.Unknown;
};
buddy_Spec.__name__ = ["buddy","Spec"];
buddy_Spec.prototype = {
	setStatus: function(s,err,stack) {
		this.status = s;
		this.error = err;
		this.stack = stack;
	}
	,__class__: buddy_Spec
};
var buddy_BuddySuite = function() {
	this.suites = new List();
	this.befores = new List();
	this.afters = new List();
	this.suiteStack = new List();
	this.timeoutMs = 5000;
};
buddy_BuddySuite.__name__ = ["buddy","BuddySuite"];
buddy_BuddySuite.prototype = {
	describe: function(name,addSpecs) {
		this.addSuite(new buddy_Suite(name,this),addSpecs);
	}
	,xdescribe: function(name,addSpecs) {
	}
	,before: function(init) {
		this.syncBefore(init,true);
	}
	,after: function(deinit) {
		this.syncAfter(deinit,true);
	}
	,it: function(desc,test) {
		this.syncIt(desc,test,true);
	}
	,xit: function(desc,test) {
		this.syncXit(desc,test,true);
	}
	,fail: function(desc) {
		if(desc == null) desc = "Manually";
	}
	,failSync: function(test,desc,p) {
		if(desc == null) desc = "Manually";
		var stackItem = [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
		test(false,Std.string(desc),stackItem);
	}
	,addSuite: function(suite,addSpecs) {
		if(this.suiteStack.isEmpty()) this.suites.add(suite); else {
			var current = this.suiteStack.first();
			suite.parent = current;
			current.steps.add(buddy_TestStep.TSuite(suite));
		}
		if(buddy_BuddySuite.includeMode && !suite.include) {
			suite.steps = suite.steps.filter(function(step) {
				switch(step[1]) {
				case 1:
					var s = step[2];
					return s.include;
				default:
					return true;
				}
			});
			if(suite.steps.length > 0 || suite.parent != null && suite.parent.include) suite.include = true;
		}
		this.suiteStack.push(suite);
		addSpecs();
		this.suiteStack.pop();
	}
	,describeInclude: function(name,addSpecs) {
		buddy_BuddySuite.includeMode = true;
		var suite = new buddy_Suite(name,this);
		suite.include = true;
		this.addSuite(suite,addSpecs);
	}
	,itInclude: function(desc,test) {
		buddy_BuddySuite.includeMode = true;
		this.syncIt(desc,test,true,true);
	}
	,syncItInclude: function(desc,test) {
		buddy_BuddySuite.includeMode = true;
		this.syncIt(desc,test,false,true);
	}
	,beforeDescribe: function(init) {
		this.syncBeforeDescribe(init,true);
	}
	,afterDescribe: function(init) {
		this.syncAfterDescribe(init,true);
	}
	,syncBeforeDescribe: function(init,async) {
		if(async == null) async = false;
		this.befores.add(new buddy_BeforeAfter(init,async));
	}
	,syncAfterDescribe: function(init,async) {
		if(async == null) async = false;
		this.afters.add(new buddy_BeforeAfter(init,async));
	}
	,syncBefore: function(init,async) {
		if(async == null) async = false;
		this.suiteStack.first().before.add(new buddy_BeforeAfter(init,async));
	}
	,syncAfter: function(deinit,async) {
		if(async == null) async = false;
		this.suiteStack.first().after.add(new buddy_BeforeAfter(deinit,async));
	}
	,syncIt: function(desc,test,async,include) {
		if(include == null) include = false;
		if(async == null) async = false;
		var suite = this.suiteStack.first();
		var spec = new buddy_Spec(suite,desc,test,async);
		spec.include = include;
		suite.steps.add(buddy_TestStep.TSpec(spec));
	}
	,syncXit: function(desc,test,async) {
		if(async == null) async = false;
		var suite = this.suiteStack.first();
		var spec = new buddy_Spec(suite,desc,test,async,true);
		suite.steps.add(buddy_TestStep.TSpec(spec));
	}
	,__class__: buddy_BuddySuite
};
var buddy_Should = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	this.value = value;
	this.assert = assert;
	this.inverse = inverse;
};
buddy_Should.__name__ = ["buddy","Should"];
buddy_Should.prototype = {
	be: function(expected,p) {
		this.test(this.value == expected,p,"Expected " + this.quote(expected) + ", was " + this.quote(this.value),"Didn't expect " + this.quote(expected) + " but was equal to that");
	}
	,beType: function(type,p) {
		this.test(js_Boot.__instanceof(this.value,type),p,"Expected " + this.quote(this.value) + " to be type " + this.quote(type),"Expected " + this.quote(this.value) + " not to be type " + this.quote(type));
	}
	,quote: function(v) {
		if(typeof(v) == "string") return "\"" + Std.string(v) + "\""; else return Std.string(v);
	}
	,stackPos: function(p) {
		return [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
	}
	,test: function(expr,p,error,errorInverted) {
		if(!this.inverse) this.assert(expr,error,this.stackPos(p)); else this.assert(!expr,errorInverted,this.stackPos(p));
	}
	,__class__: buddy_Should
};
var buddy_ShouldDynamic = function(value,assert,inverse) {
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldDynamic.__name__ = ["buddy","ShouldDynamic"];
buddy_ShouldDynamic.should = function(d,assert) {
	return new buddy_ShouldDynamic(d,assert);
};
buddy_ShouldDynamic.__super__ = buddy_Should;
buddy_ShouldDynamic.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldDynamic(this.value,this.assert,!this.inverse);
	}
	,__class__: buddy_ShouldDynamic
});
var buddy_ShouldInt = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldInt.__name__ = ["buddy","ShouldInt"];
buddy_ShouldInt.should = function(i,assert) {
	return new buddy_ShouldInt(i,assert);
};
buddy_ShouldInt.__super__ = buddy_Should;
buddy_ShouldInt.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldInt(this.value,this.assert,!this.inverse);
	}
	,beLessThan: function(expected,p) {
		this.test(this.value < expected,p,"Expected less than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not less than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beGreaterThan: function(expected,p) {
		this.test(this.value > expected,p,"Expected greater than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not greater than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,__class__: buddy_ShouldInt
});
var buddy_ShouldFloat = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldFloat.__name__ = ["buddy","ShouldFloat"];
buddy_ShouldFloat.should = function(i,assert) {
	return new buddy_ShouldFloat(i,assert);
};
buddy_ShouldFloat.__super__ = buddy_Should;
buddy_ShouldFloat.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldFloat(this.value,this.assert,!this.inverse);
	}
	,beLessThan: function(expected,p) {
		this.test(this.value < expected,p,"Expected less than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not less than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beGreaterThan: function(expected,p) {
		this.test(this.value > expected,p,"Expected greater than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not greater than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beCloseTo: function(expected,precision,p) {
		if(precision == null) precision = 2;
		var expr = Math.abs(expected - this.value) < Math.pow(10,-precision) / 2;
		this.test(expr,p,"Expected close to " + this.quote(expected) + ", was " + this.quote(this.value),"Expected " + this.quote(this.value) + " not to be close to " + this.quote(expected));
	}
	,__class__: buddy_ShouldFloat
});
var buddy_ShouldDate = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldDate.__name__ = ["buddy","ShouldDate"];
buddy_ShouldDate.should = function(i,assert) {
	return new buddy_ShouldDate(i,assert);
};
buddy_ShouldDate.__super__ = buddy_Should;
buddy_ShouldDate.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldDate(this.value,this.assert,!this.inverse);
	}
	,beOn: function(expected,p) {
		this.test(this.value.getTime() == expected.getTime(),p,"Expected date equal to " + this.quote(expected) + ", was " + this.quote(this.value),"Expected date not equal to " + this.quote(expected));
	}
	,beBefore: function(expected,p) {
		this.test(this.value.getTime() < expected.getTime(),p,"Expected date before " + this.quote(expected) + ", was " + this.quote(this.value),"Expected date not before " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beAfter: function(expected,p) {
		this.test(this.value.getTime() > expected.getTime(),p,"Expected date after " + this.quote(expected) + ", was " + this.quote(this.value),"Expected date not after " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beOnStr: function(expected,p) {
		this.beOn(HxOverrides.strDate(expected),p);
		return;
	}
	,beBeforeStr: function(expected,p) {
		this.beBefore(HxOverrides.strDate(expected),p);
		return;
	}
	,beAfterStr: function(expected,p) {
		this.beAfter(HxOverrides.strDate(expected),p);
		return;
	}
	,__class__: buddy_ShouldDate
});
var buddy_ShouldString = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldString.__name__ = ["buddy","ShouldString"];
buddy_ShouldString.should = function(str,assert) {
	return new buddy_ShouldString(str,assert);
};
buddy_ShouldString.__super__ = buddy_Should;
buddy_ShouldString.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldString(this.value,this.assert,!this.inverse);
	}
	,contain: function(substring,p) {
		this.test(this.value.indexOf(substring) >= 0,p,"Expected " + this.quote(this.value) + " to contain " + this.quote(substring),"Expected " + this.quote(this.value) + " not to contain " + this.quote(substring));
	}
	,startWith: function(substring,p) {
		this.test(StringTools.startsWith(this.value,substring),p,"Expected " + this.quote(this.value) + " to start with " + this.quote(substring),"Expected " + this.quote(this.value) + " not to start with " + this.quote(substring));
	}
	,endWith: function(substring,p) {
		this.test(StringTools.endsWith(this.value,substring),p,"Expected " + this.quote(this.value) + " to end with " + this.quote(substring),"Expected " + this.quote(this.value) + " not to end with " + this.quote(substring));
	}
	,match: function(regexp,p) {
		this.test(regexp.match(this.value),p,"Expected " + this.quote(this.value) + " to match regular expression","Expected " + this.quote(this.value) + " not to match regular expression");
	}
	,__class__: buddy_ShouldString
});
var buddy_ShouldIterable = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldIterable.__name__ = ["buddy","ShouldIterable"];
buddy_ShouldIterable.should = function(value,assert) {
	return new buddy_ShouldIterable(value,assert);
};
buddy_ShouldIterable.__super__ = buddy_Should;
buddy_ShouldIterable.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldIterable(this.value,this.assert,!this.inverse);
	}
	,contain: function(o,p) {
		this.test(Lambda.exists(this.value,function(el) {
			return el == o;
		}),p,"Expected " + this.quote(this.value) + " to contain " + this.quote(o),"Expected " + this.quote(this.value) + " not to contain " + this.quote(o));
	}
	,containAll: function(values,p) {
		var expr = true;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var a = $it0.next();
			var a1 = [a];
			if(!Lambda.exists(this.value,(function(a1) {
				return function(v) {
					return v == a1[0];
				};
			})(a1))) {
				expr = false;
				break;
			}
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to contain all of " + this.quote(values),"Expected " + this.quote(this.value) + " not to contain all of " + this.quote(values));
	}
	,containExactly: function(values,p) {
		var a = $iterator(this.value)();
		var b = $iterator(values)();
		var expr = true;
		while(a.hasNext() || b.hasNext()) if(a.next() != b.next()) {
			expr = false;
			break;
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to contain exactly " + this.quote(values),"Expected " + this.quote(this.value) + " not to contain exactly " + this.quote(values));
	}
	,__class__: buddy_ShouldIterable
});
var buddy_ShouldFunctions = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	this.value = value;
	this.assert = assert;
	this.inverse = inverse;
};
buddy_ShouldFunctions.__name__ = ["buddy","ShouldFunctions"];
buddy_ShouldFunctions.should = function(value,assert) {
	return new buddy_ShouldFunctions(value,assert);
};
buddy_ShouldFunctions.prototype = {
	get_not: function() {
		return new buddy_ShouldFunctions(this.value,this.assert,!this.inverse);
	}
	,throwValue: function(v,p) {
		var caught = false;
		var exception = null;
		try {
			this.value();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			exception = e;
			caught = e == v;
		}
		this.test(caught,p,"Expected " + this.quote(this.value) + " to throw " + this.quote(v),"Expected " + this.quote(this.value) + " not to throw " + this.quote(v));
		return exception;
	}
	,throwType: function(type,p) {
		var caught = false;
		var name = Type.getClassName(type);
		var exceptionName = null;
		var exception = null;
		try {
			this.value();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			exception = e;
			exceptionName = Type.getClassName(Type.getClass(e));
			caught = js_Boot.__instanceof(e,type);
		}
		this.test(caught,p,"Expected " + this.quote(this.value) + " to throw type " + name + ", " + exceptionName + " was thrown instead","Expected " + this.quote(this.value) + " not to throw type " + name);
		return exception;
	}
	,be: function(expected,p) {
		this.test(this.value == expected,p,"Expected " + this.quote(expected) + ", was " + this.quote(this.value),"Didn't expect " + this.quote(expected) + " but was equal to that");
	}
	,quote: function(v) {
		if(typeof(v) == "string") return "\"" + Std.string(v) + "\""; else return Std.string(v);
	}
	,stackPos: function(p) {
		return [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
	}
	,test: function(expr,p,error,errorInverted) {
		if(!this.inverse) this.assert(expr,error,this.stackPos(p)); else this.assert(!expr,errorInverted,this.stackPos(p));
	}
	,__class__: buddy_ShouldFunctions
};
var buddy_SuitesRunner = function(buddySuites,reporter) {
	var includeMode;
	includeMode = ((function($this) {
		var $r;
		var _g = [];
		var $it0 = $iterator(buddySuites)();
		while( $it0.hasNext() ) {
			var b = $it0.next();
			var _g1_head = b.suites.h;
			var _g1_val = null;
			while(_g1_head != null) {
				var s;
				s = (function($this) {
					var $r;
					_g1_val = _g1_head[0];
					_g1_head = _g1_head[1];
					$r = _g1_val;
					return $r;
				}($this));
				if(s.include) _g.push(s);
			}
		}
		$r = _g;
		return $r;
	}(this))).length > 0;
	var _g1 = [];
	var $it1 = $iterator(buddySuites)();
	while( $it1.hasNext() ) {
		var b1 = $it1.next();
		var _g2_head = b1.suites.h;
		var _g2_val = null;
		while(_g2_head != null) {
			var s1;
			s1 = (function($this) {
				var $r;
				_g2_val = _g2_head[0];
				_g2_head = _g2_head[1];
				$r = _g2_val;
				return $r;
			}(this));
			if(!includeMode || s1.include) _g1.push(s1);
		}
	}
	this.suites = _g1;
	if(reporter == null) this.reporter = new buddy_reporting_ConsoleReporter(); else this.reporter = reporter;
};
buddy_SuitesRunner.__name__ = ["buddy","SuitesRunner"];
buddy_SuitesRunner.prototype = {
	run: function() {
		var _g = this;
		var def = new promhx_Deferred();
		var defPr = def.promise();
		this.reporter.start().then(function(ok) {
			if(ok) buddy_tools_AsyncTools.iterateAsyncBool(_g.suites,$bind(_g,_g.runSuite)).pipe(function(_) {
				return _g.reporter.done(_g.suites,!_g.failed());
			}).then(function(_1) {
				def.resolve(ok);
			}); else {
				_g.aborted = true;
				def.resolve(ok);
			}
		});
		return defPr;
	}
	,failed: function() {
		var testFail = null;
		testFail = function(s) {
			var failed = false;
			var _g_head = s.steps.h;
			var _g_val = null;
			while(_g_head != null) {
				var step;
				step = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				switch(step[1]) {
				case 1:
					var sp = step[2];
					if(sp.status == buddy_TestStatus.Failed) return true;
					break;
				case 0:
					var s2 = step[2];
					if(testFail(s2)) return true;
					break;
				}
			}
			return false;
		};
		var $it0 = $iterator(this.suites)();
		while( $it0.hasNext() ) {
			var s1 = $it0.next();
			if(testFail(s1)) return true;
		}
		return false;
	}
	,statusCode: function() {
		if(this.aborted) return 1;
		if(this.failed()) return 1; else return 0;
	}
	,runSuite: function(suite) {
		return new buddy_internal_SuiteRunner(suite,this.reporter).run();
	}
	,__class__: buddy_SuitesRunner
};
var buddy_internal_SuiteRunner = function(suite,reporter) {
	this.buddySuite = suite.buddySuite;
	this.suite = suite;
	this.reporter = reporter;
};
buddy_internal_SuiteRunner.__name__ = ["buddy","internal","SuiteRunner"];
buddy_internal_SuiteRunner.prototype = {
	run: function() {
		var _g = this;
		var traceFunc = haxe_Log.trace;
		var def = new promhx_Deferred();
		var pr = def.promise();
		buddy_tools_AsyncTools.iterateAsyncBool(this.suite.steps,$bind(this,this.runSteps)).then(function(_) {
			haxe_Log.trace = traceFunc;
			def.resolve(_g.suite);
		});
		return pr;
	}
	,allBefores: function(suite,list) {
		list = Lambda.concat(suite.before,list);
		if(suite.parent != null) return this.allBefores(suite.parent,list); else return Lambda.concat(this.buddySuite.befores,list);
	}
	,allAfters: function(suite,list) {
		list = Lambda.concat(suite.after,list);
		if(suite.parent != null) return this.allAfters(suite.parent,list);
		list = Lambda.concat(this.buddySuite.afters,list);
		var output = new List();
		var _g_head = list.h;
		var _g_val = null;
		while(_g_head != null) {
			var a;
			a = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			output.push(a);
		}
		return output;
	}
	,runBeforeAfter: function(b) {
		var def = new promhx_Deferred();
		var pr = def.promise();
		var done = function(calledFromSpec) {
			if(calledFromSpec == null) calledFromSpec = false;
			def.resolve(b);
		};
		b.run(done,function(s,err,stack) {
		});
		if(!b.async) done();
		return pr;
	}
	,runSteps: function(step) {
		var stepDone = new promhx_Deferred();
		var stepPr = stepDone.promise();
		switch(step[1]) {
		case 1:
			var spec = step[2];
			this.runSpec(spec).then(function(_) {
				stepDone.resolve(step);
			});
			break;
		case 0:
			var s = step[2];
			new buddy_internal_SuiteRunner(s,this.reporter).run().then(function(_1) {
				stepDone.resolve(step);
			});
			break;
		}
		return stepPr;
	}
	,runSpec: function(spec) {
		var _g = this;
		var specDone = new promhx_Deferred();
		var specPr = specDone.promise();
		specPr.pipe(function(s1) {
			if(_g.reporter != null) return _g.reporter.progress(s1); else return specPr;
		});
		if(spec.status != buddy_TestStatus.Unknown) {
			specDone.resolve(spec);
			return specPr;
		}
		var itDone = new promhx_Deferred();
		var itPromise = itDone.promise();
		var hasStatus = false;
		var status = function(s,error,stack) {
			hasStatus = true;
			if(!s && !itPromise._resolved && !itDone._resolved) itDone.resolve({ status : buddy_TestStatus.Failed, error : error, stack : stack});
		};
		var done = function(calledFromSpec) {
			if(calledFromSpec == null) calledFromSpec = true;
			if(!itPromise._resolved && !itDone._resolved) {
				if(calledFromSpec) hasStatus = true;
				itDone.resolve({ status : hasStatus?buddy_TestStatus.Passed:buddy_TestStatus.Pending, error : null, stack : null});
			}
		};
		haxe_Log.trace = function(v,pos) {
			spec.traces.add(pos.fileName + ":" + pos.lineNumber + ": " + Std.string(v));
		};
		var befores = this.allBefores(this.suite,new List());
		var afters = this.allAfters(this.suite,new List());
		var errorTimeout = null;
		buddy_tools_AsyncTools.iterateAsyncBool(befores,$bind(this,this.runBeforeAfter)).pipe(function(_) {
			if(spec.async) {
				var timeout = _g.buddySuite.timeoutMs;
				errorTimeout = buddy_tools_AsyncTools.wait(timeout);
				errorTimeout.catchError(function(e) {
					if(e != null) throw new js__$Boot_HaxeError(e);
				}).then(function(_1) {
					status(false,"Timeout after " + timeout + " ms",null);
				});
			}
			try {
				spec.run(done,status);
				if(!spec.async) done(false);
			} catch( e1 ) {
				haxe_CallStack.lastException = e1;
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				status(false,Std.string(e1),haxe_CallStack.exceptionStack());
			}
			return itPromise;
		}).pipe(function(result) {
			if(errorTimeout != null) {
				errorTimeout.reject(null);
				errorTimeout = null;
			}
			spec.setStatus(result.status,result.error,result.stack);
			return buddy_tools_AsyncTools.iterateAsyncBool(afters,$bind(_g,_g.runBeforeAfter));
		}).then(function(_2) {
			specDone.resolve(spec);
		});
		return specPr;
	}
	,__class__: buddy_internal_SuiteRunner
};
var buddy_internal_sys_NodeJs = function() { };
buddy_internal_sys_NodeJs.__name__ = ["buddy","internal","sys","NodeJs"];
buddy_internal_sys_NodeJs.print = function(s) {
	process.stdout.write(s);
};
buddy_internal_sys_NodeJs.println = function(s) {
	console.log(s);
};
var buddy_reporting_Reporter = function() { };
buddy_reporting_Reporter.__name__ = ["buddy","reporting","Reporter"];
buddy_reporting_Reporter.prototype = {
	__class__: buddy_reporting_Reporter
};
var buddy_reporting_TraceReporter = function() {
};
buddy_reporting_TraceReporter.__name__ = ["buddy","reporting","TraceReporter"];
buddy_reporting_TraceReporter.__interfaces__ = [buddy_reporting_Reporter];
buddy_reporting_TraceReporter.prototype = {
	start: function() {
		return this.resolveImmediately(true);
	}
	,progress: function(spec) {
		return this.resolveImmediately(spec);
	}
	,done: function(suites,status) {
		var _g = this;
		this.println("");
		var total = 0;
		var failures = 0;
		var pending = 0;
		var countTests = null;
		var printTests = null;
		countTests = function(s) {
			var _g_head = s.steps.h;
			var _g_val = null;
			while(_g_head != null) {
				var sp;
				sp = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				switch(sp[1]) {
				case 1:
					var sp1 = sp[2];
					total++;
					if(sp1.status == buddy_TestStatus.Failed) failures++; else if(sp1.status == buddy_TestStatus.Pending) pending++;
					break;
				case 0:
					var s1 = sp[2];
					countTests(s1);
					break;
				}
			}
		};
		Lambda.iter(suites,countTests);
		printTests = function(s2,indentLevel) {
			var print = function(str) {
				_g.println(StringTools.lpad(str," ",str.length + indentLevel * 2));
			};
			print(s2.name);
			var _g_head1 = s2.steps.h;
			var _g_val1 = null;
			while(_g_head1 != null) {
				var step;
				step = (function($this) {
					var $r;
					_g_val1 = _g_head1[0];
					_g_head1 = _g_head1[1];
					$r = _g_val1;
					return $r;
				}(this));
				switch(step[1]) {
				case 1:
					var sp2 = step[2];
					if(sp2.status == buddy_TestStatus.Failed) {
						print("  " + sp2.description + " (FAILED: " + sp2.error + ")");
						_g.printTraces(sp2);
						if(sp2.stack == null || sp2.stack.length == 0) continue;
						var _g1 = 0;
						var _g2 = sp2.stack;
						while(_g1 < _g2.length) {
							var s3 = _g2[_g1];
							++_g1;
							switch(s3[1]) {
							case 2:
								var line = s3[4];
								var file = s3[3];
								if(file.indexOf("buddy/internal/") != 0) print("    @ " + file + ":" + line); else {
								}
								break;
							default:
							}
						}
					} else {
						print("  " + sp2.description + " (" + Std.string(sp2.status) + ")");
						_g.printTraces(sp2);
					}
					break;
				case 0:
					var s4 = step[2];
					printTests(s4,indentLevel + 1);
					break;
				}
			}
		};
		Lambda.iter(suites,(function(f,a2) {
			return function(a1) {
				f(a1,a2);
			};
		})(printTests,0));
		this.println("" + total + " specs, " + failures + " failures, " + pending + " pending");
		return this.resolveImmediately(suites);
	}
	,printTraces: function(spec) {
		var _g_head = spec.traces.h;
		var _g_val = null;
		while(_g_head != null) {
			var t;
			t = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			this.println("    " + t);
		}
	}
	,print: function(s) {
	}
	,println: function(s) {
		haxe_Log.trace(s,{ fileName : "TraceReporter.hx", lineNumber : 105, className : "buddy.reporting.TraceReporter", methodName : "println"});
	}
	,resolveImmediately: function(o) {
		var def = new promhx_Deferred();
		var pr = def.promise();
		def.resolve(o);
		return pr;
	}
	,__class__: buddy_reporting_TraceReporter
};
var buddy_reporting_ConsoleReporter = function() {
	buddy_reporting_TraceReporter.call(this);
};
buddy_reporting_ConsoleReporter.__name__ = ["buddy","reporting","ConsoleReporter"];
buddy_reporting_ConsoleReporter.__super__ = buddy_reporting_TraceReporter;
buddy_reporting_ConsoleReporter.prototype = $extend(buddy_reporting_TraceReporter.prototype,{
	start: function() {
		return this.resolveImmediately(true);
	}
	,progress: function(spec) {
		this.print((function($this) {
			var $r;
			var _g = spec.status;
			$r = (function($this) {
				var $r;
				switch(_g[1]) {
				case 3:
					$r = "X";
					break;
				case 1:
					$r = ".";
					break;
				case 2:
					$r = "P";
					break;
				case 0:
					$r = "?";
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this)));
		return this.resolveImmediately(spec);
	}
	,done: function(suites,status) {
		var output = buddy_reporting_TraceReporter.prototype.done.call(this,suites,status);
		return output;
	}
	,print: function(s) {
		buddy_internal_sys_NodeJs.print(s);
	}
	,println: function(s) {
		buddy_internal_sys_NodeJs.println(s);
	}
	,__class__: buddy_reporting_ConsoleReporter
});
var buddy_tools_AsyncTools = function() { };
buddy_tools_AsyncTools.__name__ = ["buddy","tools","AsyncTools"];
buddy_tools_AsyncTools.iterateAsyncBool = function(it,action) {
	return buddy_tools_AsyncTools.iterateAsync(it,action,true);
};
buddy_tools_AsyncTools.iterateAsync = function(it,action,resolveWith) {
	var finished = new promhx_Deferred();
	var pr = finished.promise();
	buddy_tools_AsyncTools.next($iterator(it)(),action,finished,resolveWith);
	return pr;
};
buddy_tools_AsyncTools.wait = function(ms) {
	var def = new promhx_Deferred();
	var pr = def.promise();
	var done = function() {
		if(!pr._fulfilled) def.resolve(true);
	};
	haxe_Timer.delay(function() {
		done();
	},ms);
	return pr;
};
buddy_tools_AsyncTools.next = function(it,action,def,resolveWith) {
	if(!it.hasNext()) def.resolve(resolveWith); else {
		var n = it.next();
		action(n).then(function(_) {
			buddy_tools_AsyncTools.next(it,action,def,resolveWith);
		});
	}
};
var haxe_StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe_ds_Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe_ds_Option; $x.toString = $estr; return $x; };
haxe_ds_Option.None = ["None",1];
haxe_ds_Option.None.toString = $estr;
haxe_ds_Option.None.__enum__ = haxe_ds_Option;
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var promhx_base_AsyncBase = function(d) {
	this._resolved = false;
	this._pending = false;
	this._errorPending = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
	this._errored = false;
	if(d != null) promhx_base_AsyncBase.link(d,this,function(x) {
		return x;
	});
};
promhx_base_AsyncBase.__name__ = ["promhx","base","AsyncBase"];
promhx_base_AsyncBase.link = function(current,next,f) {
	current._update.push({ async : next, linkf : function(x) {
		next.handleResolve(f(x));
	}});
	promhx_base_AsyncBase.immediateLinkUpdate(current,next,f);
};
promhx_base_AsyncBase.immediateLinkUpdate = function(current,next,f) {
	if(current._errored && !current._errorPending && !(current._error.length > 0)) next.handleError(current._errorVal);
	if(current._resolved && !current._pending) try {
		next.handleResolve(f(current._val));
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		next.handleError(e);
	}
};
promhx_base_AsyncBase.linkAll = function(all,next) {
	var cthen = function(arr,current,v) {
		if(arr.length == 0 || promhx_base_AsyncBase.allFulfilled(arr)) {
			var vals;
			var _g = [];
			var $it0 = $iterator(all)();
			while( $it0.hasNext() ) {
				var a = $it0.next();
				_g.push(a == current?v:a._val);
			}
			vals = _g;
			next.handleResolve(vals);
		}
		null;
		return;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				f(a11,a2,v1);
				return;
			};
		})(cthen,(function($this) {
			var $r;
			var _g1 = [];
			var $it2 = $iterator(all)();
			while( $it2.hasNext() ) {
				var a21 = $it2.next();
				if(a21 != a1) _g1.push(a21);
			}
			$r = _g1;
			return $r;
		}(this)),a1)});
	}
	if(promhx_base_AsyncBase.allFulfilled(all)) next.handleResolve((function($this) {
		var $r;
		var _g2 = [];
		var $it3 = $iterator(all)();
		while( $it3.hasNext() ) {
			var a3 = $it3.next();
			_g2.push(a3._val);
		}
		$r = _g2;
		return $r;
	}(this)));
};
promhx_base_AsyncBase.pipeLink = function(current,ret,f) {
	var linked = false;
	var linkf = function(x) {
		if(!linked) {
			linked = true;
			var pipe_ret = f(x);
			pipe_ret._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
			promhx_base_AsyncBase.immediateLinkUpdate(pipe_ret,ret,function(x1) {
				return x1;
			});
		}
	};
	current._update.push({ async : ret, linkf : linkf});
	if(current._resolved && !current._pending) try {
		linkf(current._val);
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		ret.handleError(e);
	}
};
promhx_base_AsyncBase.allResolved = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._resolved) return false;
	}
	return true;
};
promhx_base_AsyncBase.allFulfilled = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._fulfilled) return false;
	}
	return true;
};
promhx_base_AsyncBase.prototype = {
	catchError: function(f) {
		this._error.push(f);
		return this;
	}
	,errorThen: function(f) {
		this._errorMap = f;
		return this;
	}
	,isResolved: function() {
		return this._resolved;
	}
	,isErrored: function() {
		return this._errored;
	}
	,isErrorHandled: function() {
		return this._error.length > 0;
	}
	,isErrorPending: function() {
		return this._errorPending;
	}
	,isFulfilled: function() {
		return this._fulfilled;
	}
	,isPending: function() {
		return this._pending;
	}
	,handleResolve: function(val) {
		this._resolve(val);
	}
	,_resolve: function(val) {
		var _g = this;
		if(this._pending) promhx_base_EventLoop.enqueue((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this._resolve),val)); else {
			this._resolved = true;
			this._pending = true;
			promhx_base_EventLoop.queue.add(function() {
				_g._val = val;
				var _g1 = 0;
				var _g2 = _g._update;
				while(_g1 < _g2.length) {
					var up = _g2[_g1];
					++_g1;
					try {
						up.linkf(val);
					} catch( e ) {
						haxe_CallStack.lastException = e;
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						up.async.handleError(e);
					}
				}
				_g._fulfilled = true;
				_g._pending = false;
			});
			promhx_base_EventLoop.continueOnNextLoop();
		}
	}
	,handleError: function(error) {
		this._handleError(error);
	}
	,_handleError: function(error) {
		var _g = this;
		var update_errors = function(e) {
			if(_g._error.length > 0) {
				var _g1 = 0;
				var _g2 = _g._error;
				while(_g1 < _g2.length) {
					var ef = _g2[_g1];
					++_g1;
					ef(e);
				}
			} else if(_g._update.length > 0) {
				var _g11 = 0;
				var _g21 = _g._update;
				while(_g11 < _g21.length) {
					var up = _g21[_g11];
					++_g11;
					up.async.handleError(e);
				}
			} else {
				haxe_Log.trace("Call Stack: " + haxe_CallStack.toString(haxe_CallStack.callStack()),{ fileName : "AsyncBase.hx", lineNumber : 165, className : "promhx.base.AsyncBase", methodName : "_handleError"});
				throw new js__$Boot_HaxeError(e);
			}
			_g._errorPending = false;
		};
		if(!this._errorPending) {
			this._errorPending = true;
			this._errored = true;
			this._errorVal = error;
			promhx_base_EventLoop.queue.add(function() {
				if(_g._errorMap != null) try {
					_g._resolve(_g._errorMap(error));
				} catch( e1 ) {
					haxe_CallStack.lastException = e1;
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					update_errors(e1);
				} else update_errors(error);
			});
			promhx_base_EventLoop.continueOnNextLoop();
		}
	}
	,then: function(f) {
		var ret = new promhx_base_AsyncBase();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.queue.add(function() {
			_g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx_base_EventLoop.continueOnNextLoop();
	}
	,isLinked: function(to) {
		var updated = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == to) return true;
		}
		return updated;
	}
	,__class__: promhx_base_AsyncBase
};
var promhx_Deferred = $hx_exports.promhx.Deferred = function() {
	promhx_base_AsyncBase.call(this);
};
promhx_Deferred.__name__ = ["promhx","Deferred"];
promhx_Deferred.__super__ = promhx_base_AsyncBase;
promhx_Deferred.prototype = $extend(promhx_base_AsyncBase.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,promise: function() {
		return new promhx_Promise(this);
	}
	,stream: function() {
		return new promhx_Stream(this);
	}
	,publicStream: function() {
		return new promhx_PublicStream(this);
	}
	,__class__: promhx_Deferred
});
var promhx_Promise = $hx_exports.promhx.Promise = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._rejected = false;
};
promhx_Promise.__name__ = ["promhx","Promise"];
promhx_Promise.whenAll = function(itb) {
	var ret = new promhx_Promise();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Promise.promise = function(_val) {
	var ret = new promhx_Promise();
	ret.handleResolve(_val);
	return ret;
};
promhx_Promise.__super__ = promhx_base_AsyncBase;
promhx_Promise.prototype = $extend(promhx_base_AsyncBase.prototype,{
	isRejected: function() {
		return this._rejected;
	}
	,reject: function(e) {
		this._rejected = true;
		this.handleError(e);
	}
	,handleResolve: function(val) {
		if(this._resolved) {
			var msg = "Promise has already been resolved";
			throw new js__$Boot_HaxeError(promhx_error_PromiseError.AlreadyResolved(msg));
		}
		this._resolve(val);
	}
	,then: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.queue.add(function() {
			if(!_g._fulfilled) {
				var msg = "Downstream Promise is not fullfilled";
				_g.handleError(promhx_error_PromiseError.DownstreamNotFullfilled(msg));
			} else _g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx_base_EventLoop.continueOnNextLoop();
	}
	,handleError: function(error) {
		this._rejected = true;
		this._handleError(error);
	}
	,pipe: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Promise();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
		});
		this.then($bind(ret,ret._resolve));
		return ret;
	}
	,__class__: promhx_Promise
});
var promhx_Stream = $hx_exports.promhx.Stream = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._end_deferred = new promhx_Deferred();
	this._end_promise = this._end_deferred.promise();
};
promhx_Stream.__name__ = ["promhx","Stream"];
promhx_Stream.foreach = function(itb) {
	var s = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		s.handleResolve(i);
	}
	s.end();
	return s;
};
promhx_Stream.wheneverAll = function(itb) {
	var ret = new promhx_Stream();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Stream.concatAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.concat(i);
	}
	return ret;
};
promhx_Stream.mergeAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.merge(i);
	}
	return ret;
};
promhx_Stream.stream = function(_val) {
	var ret = new promhx_Stream();
	ret.handleResolve(_val);
	return ret;
};
promhx_Stream.__super__ = promhx_base_AsyncBase;
promhx_Stream.prototype = $extend(promhx_base_AsyncBase.prototype,{
	then: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.link(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,detachStream: function(str) {
		var filtered = [];
		var removed = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == str) removed = true; else filtered.push(u);
		}
		this._update = filtered;
		return removed;
	}
	,first: function() {
		var s = new promhx_Promise();
		this.then(function(x) {
			if(!s._resolved) s.handleResolve(x);
		});
		return s;
	}
	,handleResolve: function(val) {
		if(!this._end && !this._pause) this._resolve(val);
	}
	,pause: function(set) {
		if(set == null) set = !this._pause;
		this._pause = set;
	}
	,pipe: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Stream();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
			piped._end_promise.then(($_=ret._end_promise,$bind($_,$_._resolve)));
		});
		this.then($bind(ret,ret._resolve));
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,handleEnd: function() {
		if(this._pending) {
			promhx_base_EventLoop.queue.add($bind(this,this.handleEnd));
			promhx_base_EventLoop.continueOnNextLoop();
		} else if(this._end_promise._resolved) return; else {
			this._end = true;
			var o;
			if(this._resolved) o = haxe_ds_Option.Some(this._val); else o = haxe_ds_Option.None;
			this._end_promise.handleResolve(o);
			this._update = [];
			this._error = [];
		}
	}
	,end: function() {
		promhx_base_EventLoop.queue.add($bind(this,this.handleEnd));
		promhx_base_EventLoop.continueOnNextLoop();
		return this;
	}
	,endThen: function(f) {
		return this._end_promise.then(f);
	}
	,filter: function(f) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : function(x) {
			if(f(x)) ret.handleResolve(x);
		}});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,concat: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		this._end_promise.then(function(_) {
			s.pipe(function(x1) {
				ret.handleResolve(x1);
				return ret;
			});
			s._end_promise.then(function(_1) {
				ret.end();
			});
		});
		return ret;
	}
	,merge: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		s._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		promhx_base_AsyncBase.immediateLinkUpdate(s,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,__class__: promhx_Stream
});
var promhx_PublicStream = $hx_exports.promhx.PublicStream = function(def) {
	promhx_Stream.call(this,def);
};
promhx_PublicStream.__name__ = ["promhx","PublicStream"];
promhx_PublicStream.publicstream = function(val) {
	var ps = new promhx_PublicStream();
	ps.handleResolve(val);
	return ps;
};
promhx_PublicStream.__super__ = promhx_Stream;
promhx_PublicStream.prototype = $extend(promhx_Stream.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,update: function(val) {
		this.handleResolve(val);
	}
	,__class__: promhx_PublicStream
});
var promhx_base_EventLoop = function() { };
promhx_base_EventLoop.__name__ = ["promhx","base","EventLoop"];
promhx_base_EventLoop.enqueue = function(eqf) {
	promhx_base_EventLoop.queue.add(eqf);
	promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.set_nextLoop = function(f) {
	if(promhx_base_EventLoop.nextLoop != null) throw new js__$Boot_HaxeError("nextLoop has already been set"); else promhx_base_EventLoop.nextLoop = f;
	return promhx_base_EventLoop.nextLoop;
};
promhx_base_EventLoop.queueEmpty = function() {
	return promhx_base_EventLoop.queue.isEmpty();
};
promhx_base_EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	var fn = null;
	while(max_iterations-- > 0 && (fn = promhx_base_EventLoop.queue.pop()) != null) fn();
	return promhx_base_EventLoop.queue.isEmpty();
};
promhx_base_EventLoop.clear = function() {
	promhx_base_EventLoop.queue = new List();
};
promhx_base_EventLoop.f = function() {
	var fn = promhx_base_EventLoop.queue.pop();
	if(fn != null) fn();
	if(!promhx_base_EventLoop.queue.isEmpty()) promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.continueOnNextLoop = function() {
	if(promhx_base_EventLoop.nextLoop != null) promhx_base_EventLoop.nextLoop(promhx_base_EventLoop.f); else setImmediate(promhx_base_EventLoop.f);
};
var promhx_error_PromiseError = { __ename__ : true, __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx_error_PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
promhx_error_PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
buddy_BuddySuite.exclude = "exclude";
buddy_BuddySuite.include = "include";
js_Boot.__toStr = {}.toString;
promhx_base_EventLoop.queue = new List();
TestMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
