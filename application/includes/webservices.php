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
    $weatherApiUrl = 'http://www.lcd.lu/meteo/weather_apps.php?type=actual&system=ios';

    $rawResponse = fetch($weatherApiUrl);
    $response = @json_decode($rawResponse, true);

    // check for errors or api unexpected changes
    if (
        $response === null ||
        !isset($response['data']) ||
        count($response['data']['weather']) !== 16
    ) {
        return null;
    }

    // collect values
    $values = [];

    foreach ($response['data']['weather'] as $property)
    {
        $value = isset($property['value']) ?
            $property['value'][0]['value'] : $property['value_img'][0]['value'];

        array_push($values, trim($value));
    }

    // compose weather data
    $weather = [
        'condition' => $values[0],
        'temperature' => $values[1],
        'temperature_feels_like' => $values[2],
        'pressure' => $values[3],
        'pressure_sea_level' => $values[4],
        'rain_last_half_hour' => $values[5],
        'wind_speed' => $values[8],
        'wind_direction' => $values[9],
        'humidity' => $values[10],
        'radioactivity' => $values[14],
    ];

    return $weather;
}
