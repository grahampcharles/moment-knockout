knockout.moment-binding
=======================

A knockout date parser by [Graham Charles](https://github.com/grahampcharles).

[A working demo is available](http://jsfiddle.net/grahampcharles/b8Lhes0x/).

## Dependencies ##

- [moment.js](http://www.momentjs.com)

## Usage ##

Invoke the binding by using the `moment:` value within the data-bind attribute, typically on an `<input>` element.

    <input type="text" data-bind="moment: dateOfBirth" />

The text displayed in the `input` will be the date as formatted by the `moment.js` library, or no text. The value returned by the view model will be a JavaScript Date (or `undefined`).

You can set the value of the view model property in code to a JavaScript Date or a string to be parsed:

    viewModel.dateOfBirth("2010-07-01");
    viewModel.dateOfBirth(new Date (2010, 6, 1));
    viewModel.dateOfBirth("1/1");

If the value cannot be parsed into a valid date, the control will display the invalid text.

## Options ##

     <input type="text" data-bind="moment: dateOfBirth, 
        format: 'MMMM D, YYYY', 
		invalid: 'invalid date', 
        beforeParse:function(d) { if (d=='today') { return new Date() } else return d; }
     "  />


- **format** (default `'MM/DD/YYYY'`): A format string to use for display.
- **parsePattern** (default `['M/D/YY', 'M/D/YYYY', 'YYYY-M-D', 'M/D']`): A format string (or array of format strings) to use for transforming input into a date.
- **invalid** (default `'-'`): A value to display if the date is invalid.
- **beforeParse** (default: `undefined`): A function that takes text input and returns either a valid Date, an altered string to be parsed, or `undefined`. For example, to parse the string 'today', you could use the example above.
- **afterParse** (default: `undefined`): A function that takes date (or `undefined`) input and returns either `true` (to allow the input), `false` or `undefined` (to disallow the input, as for an illegal value), or a different Date object. For example, to require a weekday entry, this function might return the previous day for Saturday dates, the next day for Sunday dates.
- **keymap**: (default: *up = -1 day, pageup = -1 month, etc.*) An object that maps keycodes to date-changing behavior. See "Keymapping," below. 
 
 
 
### Keymapping ###

The keymap is an object in the form:

    { key1: { unit: 'day', change: -1 }, ... }

where
     
* key: a keycode
* unit: a unit name as recognized by moment.js (e.g. 'day') (default = 'day')
* change: is a positive or negative value

The default mapping is:

* up, left: subtract one day
* right, down: add one day
* page up: subtract one month
* page down: add one month  



 
