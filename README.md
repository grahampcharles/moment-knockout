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
= **beforeParse** (default: `$.noop`): A function that takes text input and returns either a valid Date, an altered string to be parsed, or `undefined`. For example, to parse the string 'today', you could use the example above.





 
