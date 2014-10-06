(function () {

    ko.bindingHandlers.moment = {

        isDate: function (input) {
            return Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
        },

        defaults: {
            keyMap: {
            '38': { 'change': -1 }, // up arrow
            '37': { 'change': -1 }, // left arrow
            '39': { 'change': 1 },  // right arrow
            '40': { 'change': 1 },  // down arrow
            '33': { 'change': -1, 'unit': 'month'}, // page up
            '34': { 'change': 1, 'unit': 'month'} // page down
            },
            beforeParse: undefined,
            afterParse: undefined,
            keyPressed: function( oldValue, change, unit, keycode) {
                // default key handler: add requested change and unit
                if (!ko.bindingHandlers.moment.isDate(oldValue)) {
                    return moment(); // default to today
                } else {
                    return moment(oldValue).add(change, unit).toDate();
                }
            },
            invalid: '-',
            format: 'MM/DD/YYYY',
            parsePattern: ['M/D/YY', 'M/D/YYYY', 'YYYY-M-D', 'M/D'],
            unit: "day"
        },

        keyMapDataKey: 'moment-keymap',

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var allBindings = allBindingsAccessor(),
                keyPressed = allBindings.keyPressed || ko.bindingHandlers.moment.defaults.keyPressed,
                beforeParse = allBindings.beforeParse || ko.bindingHandlers.moment.defaults.beforeParse,
                unitDefault = allBindings.unit || ko.bindingHandlers.moment.defaults.unit;

            // get keyMap, add it to the element
            var keyMap = $.extend({}, ko.bindingHandlers.moment.defaults.keyMap, allBindings.keyMap || {});
            $(element).data(ko.bindingHandlers.moment.keyMapDataKey, keyMap);

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

                // get and handle keyMap
                var keyMap = $(element).data(ko.bindingHandlers.moment.keyMapDataKey);

                if (keyMap) {
                    if (keyMap.hasOwnProperty(e.which.toString())) {
                        var keyMapping = keyMap[e.which.toString()] || {},
                            change = keyMapping.change || 0,
                            unit = keyMapping.unit || unitDefault || "day";

                        // handle keystroke
                        if (change) {
                            // user-defined date change handler
                            var newValue = observable();

                            if ($.isFunction(keyPressed)) {
                                newValue = keyPressed(observable(), change, unit, e.which);

                                if (moment.isMoment(newValue)) {
                                    newValue = newValue.toDate();
                                }
                            };

                            // set updated value
                            if (ko.bindingHandlers.moment.isDate(newValue)) {
                                observable(newValue);
                            } else {
                                // default to today
                                observable(new Date());
                            }

                            // select all text and prevent default key action
                            $(element).select();
                            e.preventDefault();
                        }
                    }
                }
            })
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var value = valueAccessor(),
                allBindings = allBindingsAccessor(),
                valueUnwrapped = ko.utils.unwrapObservable(value),
                afterParse = allBindings.afterParse || ko.bindingHandlers.moment.defaults.afterParse;
            var keyName = $.map(bindingContext.$data, function (v, k) {
                return (k)
            })[0];

            // Date formats: http://momentjs.com/docs/#/displaying/format/
            var pattern = allBindings.format || ko.bindingHandlers.moment.defaults.format;
            var invalidString = allBindings.invalid == undefined ? ko.bindingHandlers.moment.defaults.invalid : allBindings.invalid;
            var parsePattern = allBindings.parsePattern || ko.bindingHandlers.moment.defaults.parsePattern;

            var dateMoment =
                ko.bindingHandlers.moment.isDate(valueUnwrapped) ? moment(valueUnwrapped) :
                    ((valueUnwrapped !== null && valueUnwrapped !== undefined && valueUnwrapped.length > 0) ?
                        moment(valueUnwrapped, parsePattern) :
                        moment.invalid());

            // raise afterParse callback
            if ($.isFunction(afterParse)) {
                var parseValue = afterParse(dateMoment);

                if (moment.isMoment(parseValue)) {
                    dateMoment = parseValue;
                } else if (ko.bindingHandlers.moment.isDate(parseValue)) {
                    dateMoment = moment(parseValue);
                } else if (!parseValue) {
                    dateMoment = moment.invalid();
                }
                // otherwise (e.g., when return true), the parsed dateMoment is not altered
            }

            // get the updated value
            var newValue = dateMoment.isValid() ?
                dateMoment.toDate() : null;


            // format string for input box
            var output = dateMoment.isValid() ?
                dateMoment.format(pattern) :
                invalidString;

            if ($(element).is("input") === true) {
                $(element).val(output);
            } else {
                $(element).text(output);
            }

            // update value
            allBindingsAccessor().moment(newValue);
        }
    };
}());
