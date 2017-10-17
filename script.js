var cve = {
    // Initialize all the things
    init: function() {
        var self = this;
        this.addJquery();

        setTimeout(function() {
            self.addStyles();
            self.addEditor();
            self.addListeners();
        }, 250);
    },

    // Add jQuery to the head
    addJquery: function() {
        var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://code.jquery.com/jquery-3.2.1.min.js';

        document.body.appendChild(s);
    },

    // Add our styling
    addStyles: function() {
        var self = this;

        $('head').append('<style>' +
            '.cve {' +
                'position: fixed;' +
                'right: 0;' +
                'bottom: 0;' +
                'padding: 1rem;' +
                'font-size: 0.9rem !important;' +
                'color: black !important;' +
                'text-align: left;' +
                'border: solid #333333 !important;' +
                'border-width: 1px 0 0 1px !important;' +
                'background-color: #f5f5f5 !important;' +
            '}' +
        '</style>');
    },

    // Add the editor HTML
    addEditor: function() {
        var self = this;

        $('body').append('' +
        '<div class="cve">' +
            '<div class="cve__input cve__input--color">' +
                '<label>Background color:<br>' +
                    '<input type="color" id="background-color" value="#ffffff">' +
                '</label>' +
            '</div>' +
            '<div class="cve__input cve__input--color">' +
                '<label>Font color:<br>' +
                    '<input type="color" id="font-color" value="#ffffff">' +
                '</label>' +
            '</div>' +
            '<div class="cve__input cve__input--text">' +
                '<label>Font size:<br>' +
                    '<input type="range" id="font-size" min="50" max="250" step="1" value="150">' +
                '</label>' +
            '</div>' +
            '<div class="cve__input cve__input--text">' +
                '<button id="reset">Reset styles and restart</button>' +
            '</div>' +
        '</div>');
    },

    handleInput: function(property, value, unit) {
        var unit = unit || '';
        document.documentElement.style.setProperty('--'+property, value+unit);
        localStorage.setItem(property, value+unit);
    },

    addListeners: function() {
        var self = this;

        $('#background-color').on('change', function(e) {
            self.handleInput('background-color', e.target.value);
        });

        $('#font-color').on('change', function(e) {
            self.handleInput('font-color', e.target.value);
        });

        $('#font-size').on('input', function(e) {
            self.handleInput('font-size', e.target.value, '%');
        });

        $('#reset').on('click', function(e) {
            localStorage.clear();
            window.location.reload(true);
        });

        $(document).ready(function() {
            self.updateFromLocalStorage('background-color');
            self.updateFromLocalStorage('font-color');
            self.updateFromLocalStorage('font-size');
        });
    },

    updateFromLocalStorage: function(property) {
        var value = localStorage.getItem(property);
        var $input = $('#'+property);

        if (value) {
            document.documentElement.style.setProperty('--'+property, value);
            $input.val(value.replace('rem', ''));
        } else {
            value = getComputedStyle(document.body).getPropertyValue('--'+property);
            $input.val(value.replace('rem', '').trim());
        }
    }
}

cve.init();
