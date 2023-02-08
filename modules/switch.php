<?php


switch($SETTINGS['switch']){
	case 0:
	if(basename($_SERVER['PHP_SELF']) != 'offline.php'){
		header('Location: offline.php');
	}
	break;
	case 1:
	if(basename($_SERVER['PHP_SELF']) != 'main.php'){
		header('Location: main.php');
	}
	break;
	case 2:
	if(basename($_SERVER['PHP_SELF']) != 'promotion.php'){
		header('Location: promotion.php');
	}
	break;
}

?>