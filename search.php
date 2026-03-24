<?php
// --- AUCUN ESPACE OU HTML AVANT CECI ---

$host = "localhost";
$user = "root";
$pass = "";
$db = "aniverse";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erreur : " . $conn->connect_error);
}

if (isset($_GET['search'])) {

    // Nettoyage
    $search = strtolower(trim($_GET['search']));
    $search = str_replace(["-", "_"], " ", $search);

    // Redirections simples sans HTML avant
    $routes = [
        "one piece" => "onepiece.html",
        "onepiece" => "onepiece.html",
        "one-piece" => "onepiece.html",

        "naruto" => "naruto.html",

        "solo leveling" => "sololeveling.html",
        "sololeveling" => "sololeveling.html",

        "mha" => "mha.html",
        "my hero academia" => "mha.html",

        "attack on titan" => "titan.html",
        "aot" => "titan.html",
        "snk" => "titan.html"
    ];

    if (array_key_exists($search, $routes)) {
        header("Location: " . $routes[$search]);
        exit();
    }

    // Si aucun résultat
    header("Location: no-result.html");
    exit();
}
?>

