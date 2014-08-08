(function () {

    ko.bindingHandlers.moment = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var allBindings = allBindingsAccessor();
            var beforeParse = allBindings.beforeParse || $.noop();

            ko.utils.registerEventHandler(element, 'change', function () {

                var observable = valueAccessor();
                var val = $(element).val();

                if ($.isFunction(beforeParse)) {
                    val = beforeParse(val);
                }

                observable(val);

            });

            ko.utils.registerEventHandler(element, 'keydown', function (e) {

                function isDate(input) {
                    return Object.prototype.toString.call(input) === '[object Date]' ||
                        input instanceof Date;
                }

                var observable = valueAccessor();

                var change = 0,
                    unit = 'day';
                switch (e.which) {
                    case 38: // up
                    case 37: // left
                        change = -1;
                        break;
                    case 39: // right arrow
                    case 40: // down arrow
                        change = 1;
                        break;
                    case 33: // page up
                        change = -1;
                        unit = 'month';
                        break;
                    case 34: // page up
                        change = 1;
                        unit = 'month';
                        break;
                    default:
                        break;
                }

                if (change) {
                    if (isDate(observable())) {
                        observable(moment(observable()).add(change, unit).toDate());
                        $(element).select();
                        e.preventDefault();
                    }
                }

            });
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            function isDate(input) {
                return Object.prototype.toString.call(input) === '[object Date]' ||
                    input instanceof Date;
            }

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
                isDate(valueUnwrapped) ? moment(valueUnwrapped) :
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