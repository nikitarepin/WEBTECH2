<?php
date_default_timezone_set('Asia/Yekaterinburg');

$title = 'ЛБ16';
$header = 'Hello world';
$currentYear = (int)date("Y");

function formatTime()
{
  $hours = (int)date("G");
  $minutes = (int)date("i");

  function getRightEnding($number, $one, $twoFour, $fiveNine)
  {
    $n = $number % 100;
    if ($n >= 11 && $n <= 19) return $fiveNine;
    $n = $number % 10;
    if ($n == 1) return $one;
    if ($n >= 2 && $n <= 4) return $twoFour;
    return $fiveNine;
  }

  $hoursEnding = getRightEnding($hours, "час", "часа", "часов");
  $minutesEnding = getRightEnding($minutes, "минута", "минуты", "минут");

  return "$hours $hoursEnding $minutes $minutesEnding";
}

?>

<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($title) ?></title>
  <link rel="stylesheet" href="src/style.css" />
</head>

<body>
  <h1><?= htmlspecialchars($header) ?></h1>
  <p>Current year: <?= htmlspecialchars($currentYear) ?></p>
  <p>Current time: <?= formatTime() ?></p>
</body>

</html>
