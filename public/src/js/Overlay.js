
(function($) {

    'use strict';

    $.overlay = function(element, options) {

        var defaults = {
            visible: false,
            onNext: function() {},
            onPrevious: function() {}
        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        var visible = true;

        plugin.init = function()
        {
            plugin.settings = $.extend({}, defaults, options);

            visible = plugin.settings.visible;

            // initial visible state
            if (visible === false) {
                $element.addClass('overlay--hidden');
            }
            
            // bind element
            $element.find('.overlay__btn-close').click(onCloseBtnClick);
            $element.find('.overlay__btn-previous').click(onPreviousBtnClick);
            $element.find('.overlay__btn-next').click(onNextBtnClick);
        };

        function onCloseBtnClick(e)
        {
            plugin.setVisible(false);
            return false;
        }

        function onPreviousBtnClick(e)
        {
            plugin.settings.onPrevious();
            return false;
        }

        function onNextBtnClick(e)
        {
            plugin.settings.onNext();
            return false;
        }

        plugin.toggleVisible = function()
        {
            plugin.setVisible(!visible);
        }

        plugin.setVisible = function(_visible)
        {
            if (_visible === visible) {
                return;
            }

            visible = _visible;

            if (visible) {
                $element.removeClass('overlay--hidden');
                $('body').addClass('overlay-visible');
            } else {
                $element.addClass('overlay--hidden');
                $('body').removeClass('overlay-visible');
            }
        };

        plugin.getElement = function()
        {
            return $element;
        };

        plugin.init();
    };

    $.fn.overlay = function(options)
    {
        return this.each(function() {
            if (undefined == $(this).data('overlay')) {
                var plugin = new $.overlay(this, options);
                $(this).data('overlay', plugin);
            }
        });

    };

})(jQuery);
