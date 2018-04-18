<?php

function fetch($url, $method = 'GET', $data = null)
{
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function getActivities()
{
    $activities = getCachedValue('activities');

    if ($activities === null) {
        $activities = fetchActivities();
        setCachedValue('activities', $activities, 60 * 15);
    }

    return $activities;
}

function getPublicTransportDepartures()
{
    $departures = getCachedValue('publicTransportDepartures');

    if ($departures === null) {
        $departures = fetchPublicTransportDepartures();
        setCachedValue('publicTransportDepartures', $departures, 60 * 60);
    }

    return $departures;
}

function getWeather()
{
    $weather = getCachedValue('weather');

    if ($weather === null) {
        $weather = fetchWeather();
        setCachedValue('weather', $weather, 60 * 15);
    }

    return $weather;
}

function fetchActivities()
{
    $spreadsheetUrl = sprintf(
        'https://docs.google.com/spreadsheets/d/%1$s/export?format=csv&id=%1$s',
        getConfig('activities_google_sheet_id'));

    // fetch data
    $rawResponse = fetch($spreadsheetUrl);

    // read data
    $futureActivities = [];
    $pastActivities = [];
    $lines = str_getcsv($rawResponse, PHP_EOL);

    for ($i = 1; $i < count($lines); $i ++) {
        $row = str_getcsv($lines[$i]);
        $public = (strtoupper($row[0]) === 'JO');

        if ($public)
        {
            $activity = [
                'time' => strtotime($row[1]),
                'title' => $row[2],
                'location' => !empty($row[3]) ? $row[3] : null,
            ];

            if ($activity['time'] >= time()) {
                array_push($futureActivities, $activity);
            } else {
                array_push($pastActivities, $activity);
            }
        }
    }

    // sort future activities
    usort($futureActivities, function($a, $b) {
        return $a['time'] - $b['time'];
    });

    // sort past activities
    usort($pastActivities, function($a, $b) {
        return $b['time'] - $a['time'];
    });

    return array_merge($futureActivities, $pastActivities);
}

function fetchPublicTransportDepartures()
{
    $stationId = getConfig('publicTransportStationId');

    $departuresApiUrl = sprintf(
        'http://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt&format=json&duration=40319&maxJourneys=12&id=%s',
        urlencode($stationId)
    );

    $rawResponse = fetch($departuresApiUrl);
    $response = @json_decode($rawResponse, true);

    if ($response === null) {
        return null;
    }

    // read data
    $departures = [];
    if (isset($response['Departure'])) {
        foreach ($response['Departure'] as $entry)
        {
            array_push($departures, [
                'time' => strtotime($entry['date'] . ' ' . $entry['time']),
                'direction' => $entry['direction'],
                'product' => trim($entry['Product']['catOut']),
                'line' => $entry['Product']['line'],
            ]);
        }
    }

    return $departures;
}

function fetchWeather()
{
    $weatherApiUrl = 'http://www.lcd.lu/meteo/current_json.php';

    $rawResponse = fetch($weatherApiUrl);
    $response    = @json_decode($rawResponse, true);

    // check for errors or api unexpected changes
    if (
        $response === null ||
        !isset($response['weather']) ||
        count($response['weather']) == 0
    ) {
        return null;
    }

    // compose weather data
    // ['weather'] has 3 sections => 1st section: weather data, so get items at [0][..]
    $weather = [
        'condition'              => $response['icon'],
        'temperature'            => $response['temperature'],
        'temperature_feels_like' => $response['weather'][0][1]['value'],
        'pressure'               => $response['weather'][0][2]['value'],
        'pressure_sea_level'     => $response['weather'][0][3]['value'],
        'rain_last_half_hour'    => $response['weather'][0][4]['value'],
        'wind_speed'             => $response['weather'][0][7]['value'],
        'wind_direction'         => $response['weather'][0][8]['value'],
        'humidity'               => $response['weather'][0][9]['value'],
        'radioactivity'          => $response['weather'][0][15]['value'],
    ];

    return $weather;
}
