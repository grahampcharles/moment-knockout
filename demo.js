/**
 * Created by Graham on 8/7/2014.
 */
$(function () {
    window.viewModel = {
        dateOfBirth : new ko.observable('1970-10-01')
    };

    ko.applyBindings(window.viewModel);
});