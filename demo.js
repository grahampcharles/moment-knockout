/**
 * Created by Graham on 8/7/2014.
 */
$(function () {
    window.viewModel = {
        dateOfBirth: new ko.observable('1970-10-01'),
        dateNumber2: new ko.observable('1970-10-01'),
        dateMonth: new ko.observable('1970-01-01'),
        excludeWeekends: function( oldValue, change, unit, keycode) {
            var newValue = moment(oldValue);
            if (!newValue.isValid()) { newValue = moment(); } else {
                newValue = newValue.add(change, unit);
                while (newValue.day() === 0 || newValue.day() === 6) {
                    newValue.add (Math.sign(change) || 1, "day");
                }
            }
            return newValue;

        }
    };

    ko.applyBindings(window.viewModel);
});