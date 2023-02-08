<?php
include('./modules/common.php');


?>
<!DOCTYPE html>
<html>
<head>
<title><?php echo $COMMON['title'];?></title>
<link rel="stylesheet" type="text/css" href="css/layout.css">
<script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.149.0/build/three.module.js",
                "OrbitControls": "https://unpkg.com/three@0.149.0/examples/jsm/controls/OrbitControls.js",
                "GLTFLoader": "https://unpkg.com/three@0.149.0/examples/jsm/loaders/GLTFLoader.js"
            }
        }
</script>
</head>
<body>