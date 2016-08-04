/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
var objectFitImages=function(){"use strict";var e="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";var t=/(object-fit|object-position)\s*:\s*([^;$"'\s]+)/g;var i="object-fit"in document.createElement("i").style;var n=false;function r(e){var i=getComputedStyle(e).fontFamily;var n;var r={};while((n=t.exec(i))!==null){r[n[1]]=n[2]}return r}function o(t,i){var n=r(t);if(!n["object-fit"]||n["object-fit"]==="fill"){return}i=i||t.currentSrc||t.src;if(t.srcset){t.srcset=""}if(!t[e]){t.src=e;a(t)}t[e]=t[e]||{s:i};t.style.backgroundImage='url("'+i+'")';t.style.backgroundPosition=n["object-position"]||"center";t.style.backgroundRepeat="no-repeat";if(n["object-fit"].indexOf("scale-down")<0){t.style.backgroundSize=n["object-fit"].replace("none","auto")}else{if(!t[e].i){t[e].i=new Image;t[e].i.src=i}(function o(){if(t[e].i.naturalWidth){if(t[e].i.naturalWidth>t.width||t[e].i.naturalHeight>t.height){t.style.backgroundSize="contain"}else{t.style.backgroundSize="auto"}return}setTimeout(o,100)})()}}function a(t){var i={get:function(){return t[e].s},set:function(i){delete t[e].i;return o(t,i)}};Object.defineProperty(t,"src",i);Object.defineProperty(t,"currentSrc",{get:i.get})}function c(e){window.addEventListener("resize",f.bind(null,e))}function u(e){if(e.target.tagName==="IMG"){o(e.target)}}function f(e,t){if(i){return false}var r=!n&&!e;t=t||{};e=e||"img";if(typeof e==="string"){e=document.querySelectorAll("img")}else if(!e.length){e=[e]}for(var a=0;a<e.length;a++){o(e[a])}if(r){document.body.addEventListener("load",u,true);n=true;e="img"}if(t.watchMQ){c(e)}}return f}();


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


(function($) {

    'use strict';

    $.photoGallery = function(element, options) {

        var defaults = {

        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
            element = element;

        var selectedPhotoIndex = -1,
            lastColumnCount = 0,
            overlay = null,
            $photos = [],
            $grid = null;

        plugin.init = function()
        {
            plugin.settings = $.extend({}, defaults, options);

            // bind photo elements and detach them
            $photos = $element.find('.photo-gallery__photo');

            $photos.click(function() {
                var index = $photos.index(this);
                plugin.selectPhotoIndex(index);
                return false;
            });

            // init overlay
            var $overlay = $element.find('.photo-gallery__overlay');
            $overlay.overlay({
                onPrevious: onOverlayPrevious,
                onNext: onOverlayNext
            });

            // bind overlay instance
            overlay = $overlay.data('overlay');

            // create grid element
            $grid =
                $('<div></div>')
                    .addClass('grid');

            $element.append($grid);

            // initial layout
            plugin.layout();

            // layout on resize
            $(window).resize(function() {
                plugin.layout();
            });
        };

        function onOverlayPrevious()
        {
            plugin.selectPhotoIndex(selectedPhotoIndex - 1);
        }

        function onOverlayNext()
        {
            plugin.selectPhotoIndex(selectedPhotoIndex + 1);
        }

        plugin.selectPhotoIndex = function(index)
        {
            if ($(window).width() <= 768)
            {
                // do not show overlay on mobile devices
                return;
            }

            // rotate index
            index = (index + $photos.length) % $photos.length;

            if (selectedPhotoIndex === index)
            {
                overlay.setVisible(true);
                return;
            }

            // keep track of the selected photo index
            selectedPhotoIndex = index;

            // collect photo and attributes
            var $photo = $($photos[index]);
            var title = $photo.attr('title');
            var url = $photo.attr('data-url');
            var thumbUrl = $photo.attr('data-thumb-url');

            // remove panes
            overlay.getElement().find('.overlay__pane').remove();

            // create pane
            var $overlayPane =
                $('<div></div>')
                    .addClass('overlay__pane');

            // build image
            var $thumbImage = 
                $('<img>')
                    .addClass('image-contain__image image-contain__image--loading')
                    .attr('src', thumbUrl);

            var $imageContain =
                $('<div></div>')
                    .addClass('image-contain')
                    .append($thumbImage);

            // populate pane
            $overlayPane.append(
                $('<div></div>')
                    .addClass('overlay__media')
                    .append($imageContain),
                $('<div></div>')
                    .addClass('overlay__heading')
                    .append(
                        $('<h3></h3>')
                            .addClass('overlay__title')
                            .text(title)
                    )
            );

            // append pane to overlay
            overlay.getElement().append($overlayPane);
            objectFitImages($thumbImage[0]);

            // show overlay
            overlay.setVisible(true);

            // replace thumb by original image when preloaded
            preloadImage(url, function() {

                var $image =
                    $('<img>')
                        .addClass('image-contain__image')
                        .attr('src', url);

                $imageContain
                    .empty()
                    .append($image);

                objectFitImages($image[0]);
            });
        };

        function preloadImage(url, callback)
        {
            var image = new Image();
            image.onload = callback;
            image.src = url;
        }

        plugin.layout = function()
        {
            // calculate column count
            var columnCount = 1;
            var width = $(window).width();

            // column count break points
            if (width > 768) {
                columnCount = 2;
            }

            if (width > 1200) {
                columnCount = 3;
            }

            // prevent layout if column count did not change
            if (lastColumnCount === columnCount) {
                return;
            }

            // hide overlay on mobile devices
            if (width <= 768) {
                overlay.setVisible(false);
            }

            // detach photo elements
            $photos.detach();

            // empty grid
            $grid.empty();

            // build columns
            var $columns = $(),
                columnHeights = [],
                i = 0,
                j = 0;

            for (i = 0; i < columnCount; i ++)
            {
                var $column =
                    $('<div></div>')
                        .addClass('grid__column');

                $grid.append($column);
                $columns = $columns.add($column);
                columnHeights.push(0);
            }

            // distribute photos in columns
            for (i = 0; i < $photos.length; i ++)
            {
                var $photo = $($photos[i]);

                var $image = $photo.find('.photo-gallery__image');
                var height = parseInt($image.attr('height'));

                // find smallest column
                var minColIndex = 0;
                var minColHeight = columnHeights[0];

                for (j = 1; j < columnCount; j ++) {
                    if (columnHeights[j] < minColHeight) {
                        minColIndex = j;
                        minColHeight = columnHeights[j];
                    }
                }

                // append photo to column
                $($columns[minColIndex]).append($photo);
                columnHeights[minColIndex] += height;
            }

        };

        plugin.init();
    };

    $.fn.photoGallery = function(options)
    {
        return this.each(function() {
            if (undefined == $(this).data('photoGallery')) {
                var plugin = new $.photoGallery(this, options);
                $(this).data('photoGallery', plugin);
            }
        });

    };

})(jQuery);
