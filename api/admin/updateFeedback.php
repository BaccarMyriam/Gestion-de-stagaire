<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gestion des requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Connexion à la base de données
$conn = new mysqli('localhost', 'root', '', 'addinn_db');
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error,
    ]);
    exit;
}

// Récupérer les feedbacks
$query = "SELECT name, email, message, reponse FROM feedback";
$result = $conn->query($query);

if ($result) {
    $feedbacks = [];
    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
    echo json_encode([
        'success' => true,
        'data' => $feedbacks,
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de la récupération des feedbacks : ' . $conn->error,
    ]);
}

$conn->close();
?>