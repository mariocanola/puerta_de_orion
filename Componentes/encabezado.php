<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $titulo ?? 'Mi sitio' ?></title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body data-rol="<?= $rol ?? '' ?>">

<header class="encabezado">
    <i class="fas fa-bars menu-toggle"></i>
    <img src="../imgs/logo.png" alt="text">
</header>

<div class="menu-categorias" id="menu">
    <ul id="menu-opciones"></ul>
</div>
