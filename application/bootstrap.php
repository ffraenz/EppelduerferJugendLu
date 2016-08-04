<?php

// require vendor libraries
require_once 'vendor/autoload.php';

// require page functions
require_once 'functions.php';

// load config
global $config;
$config = include('application/config/global.php');

if (file_exists('application/config/local.php')) {
    $config = array_merge_recursive($config, include('config/local.php'));
}

// read url
$url = $_SERVER['REQUEST_URI'];
$urlParts = explode('?', $url);
$urlParts = explode('/', $urlParts[0]);

// remove leading empty string
array_shift($urlParts);

// default locale
$locale = getConfig('default_locale');

// retrieve local from url if it is set
if (count($urlParts) > 0 && isset(getConfig('locale_slugs')[$urlParts[0]])) {
    $locale = getConfig('locale_slugs')[array_shift($urlParts)];
}

// apply locale
putenv('LC_ALL=' . $locale);
setlocale(LC_ALL, $locale);

// configure translations
$gettextDomain = 'messages';
bindtextdomain($gettextDomain, 'language');
bind_textdomain_codeset($gettextDomain, 'UTF-8');
textdomain($gettextDomain);

// match route
$routes = getConfig('routes');
$routeUrl = '/' . implode('/', $urlParts);
$route = null;
$i = -1;

while ($route === null && ++ $i < count($routes)) {
    if ($routes[$i]['route'] === $routeUrl) {
        $route = $routes[$i];
    }
}

// handle 404
if ($route === null) {
    http_response_code(404);
    $route = [
        'type' => '404',
        'template' => '404',
    ];
}

// handle redirect route
if ($route['type'] === 'redirect') {
    http_response_code(301);
    header('Location: ' . $route['url']);
    die();
}

$baseUrl = sprintf(
    '%s://%s',
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
);

// populate data
setData([
    'base_url' => $baseUrl,
    'page_url' => $baseUrl . $_SERVER['REQUEST_URI'],
    'routes' => $routes,
    'route' => $route,
    'locale' => $locale,
    'navigation' => getConfig('navigation'),
]);

// run template
renderTemplate($route['template']);
