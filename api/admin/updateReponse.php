<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Connexion à la base de données
$conn = new mysqli('localhost', 'root', '', 'addinn_db');
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error,
    ]);
    exit;
}

header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Your existing PHP code for handling the request
$data = json_decode(file_get_contents('php://input'), true);

$cin = $data['cin'];
$reponse = $data['reponse'];

if (!empty($cin) && !empty($reponse)) {
    // Update the database
    $sql = "UPDATE contact SET reponse = ? WHERE Cin = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $reponse, $cin);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Réponse mise à jour avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour de la réponse.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Données manquantes.']);
}

$stmt->close();
$conn->close();
?>