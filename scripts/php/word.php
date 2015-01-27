<?php
header('Content-type: application/json');

$file = fopen("../../resources/words.english","r");
$random = mt_rand(1,274908);
$counter = 1;
$word = "";

while(! feof($file))
  {
	$word = fgets($file);
	if ($counter == $random) {
		$json = ["word" => trim($word)];
		break;
	}
	$counter ++;
  }

fclose($file);
echo json_encode($json);
?>