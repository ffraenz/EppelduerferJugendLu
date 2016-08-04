<?php

return [
    'default_locale' => 'lb_LU',
    'locale_slugs' => [
        'en' => 'en_GB',
    ],
    'memcache_namespace' => 'eppelduerfer-jugend',
    'public_transport_station_id' => 'A=1@O=Eppeldorf, Haaptstrooss@X=6,247556@Y=49,844565@U=82@L=140501003@B=1@p=1466497911;',
    'email' => 'contact@eppelduerferjugend.lu',
    'sender_email' => 'contact@eppelduerferjugend.lu',
    'sender_name' => 'Eppelduerfer Jugend',
    'facebook_app_id' => '1134895673236979',
    'routes' => [
        [
            'name' => 'index',
            'route' => '/',
            'type' => 'page',
            'template' => 'index',
        ],
        [
            'name' => 'activities',
            'route' => '/activities',
            'type' => 'page',
            'template' => 'activities',
        ],
        [
            'name' => 'spaghettisfest',
            'route' => '/spaghettisfest',
            'type' => 'page',
            'template' => 'spaghettisfest',
        ],
        [
            'name' => 'for_rent',
            'route' => '/for-rent',
            'type' => 'page',
            'template' => 'for-rent',
        ],
        [
            'name' => 'eppeldorf',
            'route' => '/eppeldorf',
            'type' => 'page',
            'template' => 'eppeldorf',
        ],
        [
            'name' => 'eppelduerf',
            'route' => '/eppelduerf',
            'type' => 'redirect',
            'url' => '/eppeldorf',
        ],
        [
            'name' => 'contact',
            'route' => '/contact',
            'type' => 'page',
            'template' => 'contact',
        ],
    ],
    'navigation' => [
        [
            'title' => __("Iwwer eis"),
            'route' => 'index',
        ],
        [
            'title' => __("Aktivitéiten"),
            'route' => 'activities',
        ],
        [
            'title' => __("Eppelduerf"),
            'route' => 'eppeldorf',
        ],
        [
            'title' => __("Kontakt"),
            'route' => 'contact',
        ]
    ],
];
