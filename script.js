var cve = {
    // Initialize all the things
    init: function() {
        var self = this;
        this.addJquery();

        setTimeout(function() {
            self.addStyles();
            self.addEditor();
            self.addListeners();
        }, 500);
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
                'background-color: white !important;' +
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
                    '<input type="color" id="background-color" value="#ffffff"><br>' +
                '</label>' +
            '</div>' +
            '<div class="cve__input cve__input--color">' +
                '<label>Font color:<br>' +
                    '<input type="color" id="font-color" value="#ffffff"><br>' +
                '</label>' +
            '</div>' +
            '<div class="cve__input cve__input--text">' +
                '<label>Font size:<br>' +
                    '<input type="range" id="font-size" min="0.8" max="2" step="0.1" value="1"><br>' +
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
            self.handleInput('font-size', e.target.value, 'rem');
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
            console.log(value);
            $input.val(value.replace('rem', '').trim());
        }
    }

}

cve.init();
