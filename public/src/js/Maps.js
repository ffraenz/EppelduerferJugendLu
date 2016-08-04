
(function($) {

    'use strict';

    $.maps = function(element, options) {

        var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#cccccc"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]}];

        var defaults = {
            locationLat: null,
            locationLng: null,
            locationTitle: null,
            locationIcon: null,
            zoom: 11,
            mapStyles: mapStyle,
            apiKey: null
        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        var $map = null,
            map = null,
            $popover = null,
            popoverVisible = true,
            location = null;

        plugin.init = function()
        {
            plugin.settings = $.extend({}, defaults, options);

            // bind elements
            $map = $element.find('.maps__map');
            $popover = $element.find('.maps__popover');

            // embed script
            plugin.embedScript();
        };

        plugin.embedScript = function()
        {
            if (window.mapScriptEmbedded) {
                return;
            }

            var apiKey = plugin.settings.apiKey;
            if ($element.data('apikey')) {
                apiKey = $element.data('apikey');
            }

            if (apiKey)
            {
                $.getScript(
                    'https://maps.googleapis.com/maps/api/js' +
                    '?key=' + apiKey +
                    '&callback=mapInit');

                window.mapScriptEmbedded = true;
            }
        };

        plugin.onMapInit = function()
        {
            // read location
            var locationLat = plugin.settings.locationLat;
            var locationLng = plugin.settings.locationLng;

            if ($element.data('location-lat')) {
                locationLat = $element.data('location-lat');
            }

            if ($element.data('location-lng')) {
                locationLng = $element.data('location-lng');
            }

            location = {
                lat: locationLat,
                lng: locationLng
            };

            // read location title
            var locationTitle = plugin.settings.locationTitle;

            if ($element.data('location-title')) {
                locationTitle = $element.data('location-title');
            }

            // read location icon
            var locationIcon = plugin.settings.locationIcon;

            if ($element.data('location-icon')) {
                locationIcon = $element.data('location-icon');
            }

            // read zoom
            var zoom = plugin.settings.zoom;

            if ($element.data('zoom')) {
                zoom = $element.data('zoom');
            }

            // init map
            map = new google.maps.Map($map[0], {
                center: location,
                zoom: zoom,
                styles: plugin.settings.mapStyles,
                draggable: !('ontouchend' in document),
                scrollwheel: false,
                streetViewControl: false,
                mapTypeControl: false
            });

            map.panBy(0, -150);

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: locationTitle,
                icon: locationIcon
            });

            // bind to events
            map.addListener('zoom_changed', onMapZoomChanged);
            map.addListener('dragstart', onMapDragStart);
            map.addListener('click', onMapClick);
            marker.addListener('click', onMarkerClick);

        };

        function onMapZoomChanged()
        {
            plugin.setPopoverVisible(false);
        }

        function onMapDragStart()
        {
            plugin.setPopoverVisible(false);
        }

        function onMapClick()
        {
            plugin.setPopoverVisible(false);
        }

        function onMarkerClick()
        {
            plugin.setPopoverVisible(!popoverVisible);
        }

        plugin.setPopoverVisible = function(visible)
        {
            if (visible === popoverVisible) {
                return;
            }

            if (visible)
            {
                // center map
                map.setCenter(location);
                map.panBy(0, -150)

                // show popover
                $popover.removeClass('popover--hidden');
            }
            else
            {
                $popover.addClass('popover--hidden');
            }

            popoverVisible = visible;
        }

        plugin.init();
    };

    $.fn.maps = function(options)
    {
        return this.each(function() {
            if (undefined == $(this).data('maps')) {
                var plugin = new $.maps(this, options);
                $(this).data('maps', plugin);
            }
        });

    };

    window.mapScriptEmbedded = false;

    window.mapInit = function()
    {
        $('.maps').each(function() {
            $(this).data('maps').onMapInit();
        });
    };

})(jQuery);
