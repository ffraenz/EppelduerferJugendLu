<?php

function getMemcache()
{
    global $memcache;

    // check if memcache is available
    if (!class_exists('Memcached')) {
        return null;
    }

    // create memcache instance if not done yet
    if ($memcache === null) {
        $memcache = new Memcached();
        $memcache->addServer('localhost', 11211);
    }

    return $memcache;
}

function getCachedValue($key)
{
    $memcache = getMemcache();
    if ($memcache === null) {
        return null;
    }

    $value = getMemcache()->get(getConfig('memcache_namespace') . $key);
    if ($value === false) {
        return null;
    }

    return $value;
}

function setCachedValue($key, $value, $lifetime = 900)
{
    $memcache = getMemcache();
    if ($memcache === null) {
        return;
    }

    getMemcache()->set(getConfig('memcache_namespace') . $key, $value, $lifetime);
}
