
(function($) {

    'use strict';

    // bind elements
    var $window = $(window),
        revealOnScroll = !Modernizr.touch,
        paddedWindowHeight = 0,
        size = null,
        documentLoadComplete = false,
        $revealSections = $('.section, .site-header'),
        $revealOnScroll = $('*[data-reveal]');

    function ready()
    {
        // bind resize event
        $window.resize(resize);

        // handle scrollable click
        $('*[data-action="scroll-to-content"]').click(function() {

            // only scroll down if a hero takes up the entire screen
            if ($('.site-header--hero').length !== 0) {
                $('body').animate({
                    scrollTop: $window.height() - 30
                });
            }

            return false;
        });

        // initial event call
        resize();

        // init photo galleries
        $('.photo-gallery').photoGallery();

        // object-fit polyfill
        objectFitImages('.image-cover__image, .image-contain__image, .image-logo__image');
    }

    function load()
    {
        documentLoadComplete = true;

        // init maps
        $('.maps').maps();

        if (revealOnScroll)
        {
            // bind scroll event
            $window.scroll(scroll);

            // initial scroll event call
            scroll();
        }
    }

    function resize()
    {
        var height = $window.height();
        var width = $window.width();
        paddedWindowHeight = height - 85;

        // determine size
        size = 'lg';
        if (width <= 768) {
            size = 'xs';
        } else if (width <= 992) {
            size = 'sm';
        } else if (width <= 1200) {
            size = 'md';
        }

        if (revealOnScroll)
        {
            // calculate offset top for each element on page
            $revealSections.each(function() {
                var $this = $(this);
                $this.data('offset-top', $this.offset().top);
            });

            // trigger scroll event
            if (documentLoadComplete) {
                scroll();
            }
        }
    }

    function scroll()
    {
        var scrolled = $window.scrollTop();

        $revealSections.each(function() {
            var $section = $(this);

            if (scrolled + paddedWindowHeight > $section.data('offset-top'))
            {
                // trigger reveal animations inside this section
                $section.find('*[data-reveal]').each(function() {
                    var $this = $(this);

                    // expected value "animation-name [delay] [size]"
                    // e.g. "fade-in 0.2s"
                    var animations = $this.data('reveal').split(';'),
                        animated = false,
                        i = -1;

                    while (!animated && ++i < animations.length)
                    {
                        var spec = animations[i].trim();
                        var properties = spec.split(' ');

                        var animation = properties[0];
                        var delay = 100;
                        var sizes = [];

                        var animationClass = 'animate animate--' + animation;

                        if (properties.length >= 2) {
                            delay += parseFloat(properties[1], 10) * 1000;
                        }

                        if (properties.length >= 3) {
                            sizes = properties[2].split('+');
                        }

                        if (sizes.length === 0 || sizes.indexOf(size) !== -1)
                        {
                            setTimeout(function() {

                                $this.addClass('revealed ' + animationClass);

                            }, delay);

                            animated = true;
                        }
                    }

                    // reveal element for other sizes
                    //  prevents hidden elements when resizing
                    if (!animated) {
                        $this.addClass('revealed');
                    }
                });

                // remove element from watch list
                $revealSections = $revealSections.not($section);
            }
        });
    }

    // bind load event
    $(window).on('load', load);
    
    // bind ready event
    $(ready);

})(jQuery);
