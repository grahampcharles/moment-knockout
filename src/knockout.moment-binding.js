(function () {

    ko.bindingHandlers.moment = {

<<<<<<< HEAD
        isDate: function (input) {
            return Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
=======
        /*
         Keymapping: The keymap is an object in the form
         { key1: { unit: 'day', change: -1 }, ... }
         where
         key: a keycode
         unit: a unit name as recognized by moment.js (e.g. 'day') (default = 'day')
         change: is a positive or negative value
         */
        defaultKeymap: {
            '38': { 'change': -1 }, // up arrow
            '37': { 'change': -1 }, // left arrow
            '39': { 'change': 1 },  // right arrow
            '40': { 'change': 1 },  // down arrow
            '33': { 'change': -1, 'unit': 'month'}, // page up
            '34': { 'change': -1, 'unit': 'month'} // page down
>>>>>>> origin/update-keyboard-controls
        },

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var allBindings = allBindingsAccessor(),
                beforeParse = allBindings.beforeParse || $.noop();

            // get keymap, add it to the element
            var keymap = $.extend({}, ko.bindingHandlers.moment.defaultKeymap, allBindings.keymap || {});
            $(element).data('moment-keymap', keymap);

            // register change event
            ko.utils.registerEventHandler(element, 'change', function () {

                var observable = valueAccessor();
                var val = $(element).val();

                if ($.isFunction(beforeParse)) {
                    val = beforeParse(val);
                }

                observable(val);

            });

            ko.utils.registerEventHandler(element, 'keydown', function (e) {

                var observable = valueAccessor();

                // get and handle keymap
                var keymap = $(element).data('moment-keymap');

                if (keymap) {
                    if (keymap.hasOwnProperty(e.which.toString())) {
                        var keymapping = keymap[e.which.toString()] || {},
                            change = keymapping.change || 0,
                            unit = keymapping.unit || "day";

                        // handle keystroke
                        if (change) {
                            if (isDate(observable())) {
                                observable(moment(observable()).add(change, unit).toDate());
                            } else {
                                // default to today
                                observable(new Date());
                            }

                            // select all text and prevent default key action
                            $(element).select();
                            e.preventDefault();

                        }

<<<<<<< HEAD
                if (change) {
                    if (ko.bindingHandlers.moment.isDate(observable())) {
                        observable(moment(observable()).add(change, unit).toDate());
                        $(element).select();
                        e.preventDefault();
=======
>>>>>>> origin/update-keyboard-controls
                    }
                }

            });
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var value = valueAccessor();
            var allBindings = allBindingsAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var keyName = $.map(bindingContext.$data, function (v, k) {
                return (k)
            })[0];

            // Date formats: http://momentjs.com/docs/#/displaying/format/
            var pattern = allBindings.format || 'MM/DD/YYYY';
            var invalidString = allBindings.invalid || '-';
            var parsePattern = allBindings.parsePattern || ['M/D/YY', 'M/D/YYYY', 'YYYY-M-D', 'M/D'];

            var dateMoment =
                ko.bindingHandlers.moment.isDate(valueUnwrapped) ? moment(valueUnwrapped) :
                    ((valueUnwrapped !== null && valueUnwrapped !== undefined && valueUnwrapped.length > 0) ?
                        moment(valueUnwrapped, parsePattern) :
                        moment.invalid());

            var output = dateMoment.isValid() ?
                dateMoment.format(pattern) :
                invalidString;

            var newValue = dateMoment.isValid() ?
                dateMoment.toDate() : null;

            if ($(element).is("input") === true) {
                $(element).val(output);
            } else {
                $(element).text(output);
            }

            bindingContext.$rawData[keyName](newValue)
        }
    };
}());