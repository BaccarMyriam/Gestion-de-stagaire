<?php
// Définir les en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si la requête est de type OPTIONS, retourner un statut 200 et sortir
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Connexion à la base de données
    $pdo = new PDO('mysql:host=localhost;dbname=addinn_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Exécuter la requête SQL pour récupérer les projets
    $stmt = $pdo->query("SELECT cin, name, email, nprojet, description, etat, remarque FROM projets");
    $projets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les données au format JSON
    echo json_encode($projets);
} catch (PDOException $e) {
    // Gérer les erreurs de connexion à la base de données
    echo json_encode(['error' => 'Erreur de base de données: ' . $e->getMessage()]);
}
?>
