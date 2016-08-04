<?php

require_once __DIR__ . '/includes/cache.php';
require_once __DIR__ . '/includes/webservices.php';

function renderTemplate($template, $variables = [], $indent = 0)
{
    if ($indent > 0) {
        ob_start();
    }

    if ($variables !== null) {
        extract($variables, EXTR_SKIP);
    }

    include(sprintf('application/templates/%s.phtml', $template));

    if ($indent > 0) {
        $html = ob_get_contents();
        ob_end_clean();
        echo indent($html, $indent);
    }
}

function indent($content, $count = 0)
{
    if ($count <= 0) {
        return $content;
    }

    $indentation = str_repeat('    ', $count);
    $content = str_replace("\n", "\n" . $indentation, $content);
    echo $content;
}

function isPost()
{
    return ($_SERVER['REQUEST_METHOD'] === 'POST');
}

function getPost($key)
{
    if (isPost() && isset($_POST[$key])) {
        return $_POST[$key];
    }
    return null;
}

function validateNotEmpty($value)
{
    return !empty(trim($value));
}

function validateEmail($value)
{
    return (filter_var($value, FILTER_VALIDATE_EMAIL) !== false);
}

function filterText($value)
{
    return strip_tags(trim($value));
}

function filterEmail($value)
{
    return filter_var($value, FILTER_SANITIZE_EMAIL);
}

function escapeAttr($value)
{
    return htmlspecialchars($value);
}

function escapeHtml($value)
{
    return htmlspecialchars($value);
}

function getData($key)
{
    global $data;

    if ($data === null) {
        return null;
    }

    if (!isset($data[$key])) {
        return null;
    }

    return $data[$key];
}

function setData($keyOrArray, $value = null)
{
    global $data;

    if (is_array($keyOrArray))
    {
        foreach ($keyOrArray as $key => $value) {
            setData($key, $value);
        }

        return;
    }

    $key = $keyOrArray;

    if ($data === null) {
        $data = [];
    }

    $data[$key] = $value;
}

function setTitle($title)
{
    global $titles;

    if ($titles === null) {
        $titles = [];
    }

    array_push($titles, $title);
}

function getTitle($hierarchy = false)
{
    global $titles;

    if ($titles === null) {
        return null;
    }

    if (!$hierarchy) {
        return $titles[0];
    }

    return implode(' ‹ ', $titles);
}

function getLocale()
{
    global $locale;
    return $locale;
}

function getConfig($key)
{
    global $config;

    if (!isset($config[$key])) {
        return null;
    }

    return $config[$key];
}

function url($route, $options = [])
{
    $locale = isset($options['locale']) ? $options['locale'] : getLocale();
    $localeSlug = array_search($locale, getConfig('locale_slugs'));

    if ($locale === getConfig('default_locale')) {
        return '/' . ($route !== 'index' ? $route : '');
    } else if ($route === 'index') {
        return '/' . $localeSlug;
    }

    // prepend locale to route
    $url = '/' . $localeSlug . ($route !== 'index' ? '/' . $route : '');

    // prepend force canonical
    if (isset($options['force_canonical']) && $options['force_canonical'] === true) {
        $url = getData('base_url') . $url;
    }

    return $url;
}

function __()
{
    $args = func_get_args();
    $text = array_shift($args);

    $translation = gettext($text);

    return vsprintf($translation, $args);
}
