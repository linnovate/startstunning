<?php 
    $aid = $_GET['case'];

    if (empty($aid)) {
        require('generator.php');
    } else {
        require('shared.php');
    }
    
?>