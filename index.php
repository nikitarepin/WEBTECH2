<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ЛБ17</title>
  <link rel="stylesheet" href="src/style.css" />
</head>

<body>

  <?php

  //1
  $a = 3;
  $b = 10;
  ?>

  <p>a = <?= $a ?></p>
  <p>b = <?= $b ?></p>

  <?php

  if ($a >= 0 && $b >= 0) {
    echo "<p>Положительные:</p>";
    if ($a > $b) {
      echo "<p>" . ($a - $b) . "</p>";
    } else {
      echo "<p>" . ($b - $a) . "</p>";
    }
  } elseif ($a < 0 && $b < 0) {
    echo "<p>Отрицательные:</p>";
    echo "<p>" . ($a * $b) . "</p>";
  } else {
    echo "<p>Разные знаки:</p>";
    echo "<p>" . ($a + $b) . "</p>";
  }

  echo "<hr>";

  //2
  $a = 7;
  ?>

  <p>a = <?= $a ?></p>

  <?php
  switch ($a) {
    case 0:
      echo "0, ";
    case 1:
      echo "1, ";
    case 2:
      echo "2, ";
    case 3:
      echo "3, ";
    case 4:
      echo "4, ";
    case 5:
      echo "5, ";
    case 6:
      echo "6, ";
    case 7:
      echo "7, ";
    case 8:
      echo "8, ";
    case 9:
      echo "9, ";
    case 10:
      echo "10, ";
    case 11:
      echo "11, ";
    case 12:
      echo "12, ";
    case 13:
      echo "13, ";
    case 14:
      echo "14, ";
    case 15:
      echo "15";
      break;
    default:
      echo "Число задано неверно";
  }

  echo "<hr>";

  //3
  $a = 3;
  $b = 3;

  function sum($a, $b)
  {
    return $a + $b;
  }

  function minus($a, $b)
  {
    return $a - $b;
  }

  function product($a, $b)
  {
    return $a * $b;
  }

  function del($a, $b)
  {
    if ($b == 0) {
      return "Нельзя делить на ноль";
    }
    return $a / $b;
  }
  ?>

  <?php
  //4
  function mathOperation($arg1, $arg2, $operation)
  {
    switch ($operation) {
      case 'sum':
        return sum($arg1, $arg2);
      case 'minus':
        return minus($arg1, $arg2);
      case 'product':
        return product($arg1, $arg2);
      case 'del':
        return del($arg1, $arg2);
      default:
        return "Такой операции нет";
    }
  }
  ?>

  <p>a = <?= $a ?></p>
  <p>b = <?= $b ?></p>
  <p>Сложение: <?= mathOperation($a, $b, "sum") ?></p>
  <p>Вычитание: <?= mathOperation($a, $b, "minus") ?></p>
  <p>Умножение: <?= mathOperation($a, $b, "product") ?></p>
  <p>Деление: <?= mathOperation($a, $b, "del") ?></p>
  <p>Ошибка: <?= mathOperation($a, $b, "sss") ?></p>

  <hr>
  <!-- 5 -->
  <p>Вывод года (способ 1): <?= date("Y") ?></p>
  <p>Вывод года (способ 2): <?php echo date('Y'); ?></p>
  <p>Вывод года (способ 3): <?php
                            $year = date('Y');
                            echo $year;
                            ?></p>
  <hr>

  <?php
  //6
  function power($val, $pow)
  {
    if ($pow == 0) {
      return 1;
    } elseif ($pow > 0) {
      return $val * power($val, $pow - 1);
    } else {
      return 1 / power($val, -$pow);
    }
  }

  $a = 2;
  $b = 3;
  $c = 5;
  $d = 0;
  $e = 2;
  $f = -2;
  ?>
  <p>a = <?= $a ?></p>
  <p>b = <?= $b ?></p>
  <p>Возведение в степень: <?= power($a, $b) ?></p>

  <p>a = <?= $c ?></p>
  <p>b = <?= $d ?></p>
  <p>Возведение в степень: <?= power($c, $d) ?></p>

  <p>a = <?= $e ?></p>
  <p>b = <?= $f ?></p>
  <p>Возведение в степень: <?= power($e, $f) ?></p>

</body>

</html>
