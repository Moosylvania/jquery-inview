# jquery-inview

## Description

jQuery plugin that adds a class to elements once they are scrolled into view.

## Usage

Use data attributes to define options on a per-element basis then initialize on page ready:

###### Data Attributes: 
* data-screen: 0-1(float)
* data-ivcallback: (string)

```javascript
$('.anim').inView();
```

Optionally, provide an options object to overwrite defaults.

### Options

#### addClass: string

Set the class to be added to the element when it is in view.
Default: 'show'

#### autoPercent: float

Set the position on the screen where the class should be called when not defined on the html element itself via the data-when attribute, between 0 and 1. By default 0.50 = 50% - middle of screen
Default: 0.50

#### reverse: boolean

Should the class be removed when scrolling back up?
Default: false

#### callbacks: object

Any callbacks that may need called when 'in view' is triggered. Useful if you need to run some javascript for fallback animations or to start a video. Functions are defined in the options object, then on the element that should trigger a callback, add the data attribute 'ivcallback'. See example.
Default: {}

## Examples

* Set custom class to be added and set it to be removed when scrolling back up the page.
```javascript
var opts = {
  addClass: 'animate',
  reverse: true
};
$('.in-view').inView(opts);
```
* Define a callback to trigger playing of a video once it's in view.
```html
<video class="anim" data-ivcallback="playVideo"></video>
```

```javascript
var opts = {
  callbacks: {
    playVideo: function(ele) {
      // ele is a jQuery reference to the element.
      ele.get(0).play();
    }
  }
};
$('.anim').inView(opts);
```
