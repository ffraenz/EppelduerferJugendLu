
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
