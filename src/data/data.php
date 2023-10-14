<?php
$conn = mysqli_connect("localhost", "nlerond_utilisateur", "utilisateur123", "nlerond_BDD_Ajax");
$activeButtonsJSON = $_POST["activeButtons"];
$activeButtons = json_decode($activeButtonsJSON);

$critere = [];

$styleOptions = ['cartoon', 'realiste'];
$paysageOptions = ['ville', 'montagne'];

foreach ($activeButtons as $value) {
    $button = substr($value, 8);
    $style = '';
    $paysage = '';

    if (in_array($button, $styleOptions)) {
        $style = $button;
    }

    if (in_array($button, $paysageOptions)) {
        $paysage = $button;
    }

    if ($style != '' && $paysage != '') {
        $critere[] = "style = '$style' AND paysage = '$paysage'";
    } else if (!empty($style)) {
        $critere[] = "style = '$style'";
    } else if (!empty($paysage)) {
        $critere[] = "paysage = '$paysage'";
    }
}

if (!empty($critere)) {
    $whereClause = implode(" AND ", $critere);
    $sql = "SELECT DISTINCT nom FROM images WHERE $whereClause";
} else {
    $sql = "SELECT DISTINCT nom FROM images";
}




$mysqli_query = mysqli_query($conn, $sql);
$values = [];

while ($row = mysqli_fetch_assoc($mysqli_query)) {
    $values[] = $row['nom'];
}

$valuesRandom = [];
shuffle($values);

for ($i = 0; $i < min(4, count($values)); $i++) {
    $valuesRandom['img' . ($i + 1)] = $values[$i];
}
echo json_encode($valuesRandom, JSON_UNESCAPED_UNICODE);
mysqli_close($conn);
