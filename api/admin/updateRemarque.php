<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
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

// Gestion des requêtes préliminaires
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Récupération des données de la requête
$data = json_decode(file_get_contents('php://input'), true);

$cin = $data['cin'] ?? null;
$remarque = $data['remarque'] ?? null;

if (!empty($cin) && !empty($remarque)) {
    // Mise à jour de la base de données
    $sql = "UPDATE demandes_stage SET remarque = ? WHERE cin = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("ss", $remarque, $cin);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Remarque mise à jour avec succès.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour de la remarque.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Données manquantes.']);
}

$conn->close();
?>
