# vellum
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/FuzzyWuzzie/vellum/master/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/FuzzyWuzzie/vellum.svg)](https://github.com/FuzzyWuzzie/vellum/issues) [![Code Climate](https://img.shields.io/codeclimate/github/FuzzyWuzzie/vellum.svg?maxAge=2592000)](https://codeclimate.com/github/FuzzyWuzzie/vellum) [![Travis](https://img.shields.io/travis/FuzzyWuzzie/vellum.svg?maxAge=2592000)](https://travis-ci.org/FuzzyWuzzie/vellum)

A small terminal emulation package; heavily based on, borrowed from, and inspired by [munificent/malison](https://github.com/munificent/malison).

## Examples

### Writing directly to the terminal

```haxe
var term:CanvasTerminal = new CanvasTerminal(80, 25, vellum.Font.Menlo());
term.print(0, 0, 'Hello world!');
term.render();
```

## Using Windows To Organize Things

```haxe
var term:CanvasTerminal = new CanvasTerminal(80, 25, vellum.Font.Menlo());
var window:Window = term.pushWindow(5, 5, 20, 1);
print(0, 0, 'I\'m in a window!');
term.render();
```

## Using Colours Via Escape Codes

```haxe
var term:CanvasTerminal = new CanvasTerminal(80, 25, vellum.Font.Menlo());
term.printColoured(1, 1, '@r#deH@oe@yl@gl@lbo@_#_ #q@kworld@_#_!');
term.render();
```

### Live Sample

A [live sample](http://FuzzyWuzzie.github.io/vellum/) is available to show it in action.
