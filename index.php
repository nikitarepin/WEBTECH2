<?php

//1
function printNumbers()
{
    $n = 0;
    do {
        if ($n === 0) {
            echo "$n – это ноль<br>";
        } elseif ($n % 2 == ! 0) {
            echo "$n – нечетное число<br>";
        } else {
            echo "$n – четное число<br>";
        }
        $n++;
    } while ($n <= 10);
}

//2
$regions = [
    'Московская область' => ['Москва', 'Зеленоград', 'Клин'],
    'Ленинградская область' => ['Санкт-Петербург', 'Всеволожск', 'Павловск', 'Кронштадт'],
    'Рязанская область' => ['Рязань', 'Рыбное', 'Скопин']
];

//3
function transliterate($text)
{
    $alphabet = [
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'ye',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'yi',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'ts',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sch',
        'ь' => '',
        'ы' => 'y',
        'ъ' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya'
    ];

    $text = mb_strtolower($text);
    return strtr($text, $alphabet);
}

//4

$menu = [
    'Главная',
    'Специалисты',
    'Цены' => ['Тариф 1', 'Тариф 2', 'Тариф 3'],
    'Контакты'
];

//вложенное меню реализовано с помощью рекурсии
function viewMenu($menu)
{
    echo '<ul class="nav">';
    foreach ($menu as $item => $value) {
        if (is_array($value)) {
            echo "<li>$item";
            viewMenu($value);
            echo '</li>';
        } else {
            echo "<li>$value</li>";
        }
    }
    echo '</ul>';
}

?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ЛБ17</title>
    <link rel="stylesheet" href="src/style.css" />
</head>

<body>
    <header>
        <?= viewMenu($menu); ?>
    </header>

    <?= printNumbers(); ?>
    <br>

    <?php
    foreach ($regions as $region => $city) {
        echo "$region:<br>";
        echo implode(', ', $city) . ".<br>";
    }
    ?>
    <br>
    <?= transliterate("Привет, как твои дела?"); ?>

</body>

</html>
