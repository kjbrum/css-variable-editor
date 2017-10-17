(function() {
    var cve = {
        // Initialize all the things
        init: function() {
            this.addJquery();
            this.addStyles();
            this.addEditor();
        },

        // Add jQuery to the head
        addJquery: function() {
            var s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = 'https://code.jquery.com/jquery-3.2.1.min.js';

            document.head.appendChild(s);
        },

        // Add our styling
        addStyles = function() {
            var self = this;

            $('head').append('<style>\
                .cve-bar {\
                    position: absolute;\
                    right: 0;\
                    bottom: 0;\
                    background: cyan;\
                }\
            </style>');
        },

        // Add the editor HTML
        addEditor: function() {
            var self = this;

            $('html').append('<div class="cve">\
                This should be awesome!\
            </div>')
        }
    }

    cve.init();
});
