<?php
// Définir les entêtes pour autoriser les requêtes CORS et retourner du JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connexion à la base de données
$host = 'localhost';
$dbname = 'addinn_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Configurer le mode d'erreur de PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Échec de la connexion à la base de données : " . $e->getMessage()]);
    exit();
}

// Requête SQL pour récupérer les contacts
$sql = "SELECT Cin, np, email, telephone, tarea FROM contact";

// Exécuter la requête
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Récupérer les résultats sous forme de tableau associatif
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Retourner les données sous forme de JSON
    if ($contacts) {
        echo json_encode(["data" => $contacts]);
    } else {
        echo json_encode(["message" => "Aucun contact trouvé."]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Erreur lors de la récupération des contacts : " . $e->getMessage()]);
}

?>
