<?php
$host = 'localhost';  // L'adresse du serveur de base de données
$db = 'addinn_db';  // Nom de votre base de données
$user = 'root';  // Votre nom d'utilisateur
$pass = '';  // Votre mot de passe

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    // Définit le mode d'erreur de PDO à exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erreur de connexion à la base de données : ' . $e->getMessage();
    exit;
}
?>
