<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "addinn_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion : ' . $conn->connect_error]);
    exit;
}

try {
    // Récupérer les utilisateurs
    $query = "SELECT name, email, message, reponse FROM feedback";
    $result = $conn->query($query);

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row; // Ajouter chaque utilisateur au tableau
    }

    // Envoyer un tableau en réponse
    echo json_encode(['success' => true, 'data' => $feedbacks], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$conn->close();
?>
