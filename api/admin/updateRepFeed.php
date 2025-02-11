<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Connexion à la base de données
$conn = new mysqli('localhost', 'root', '', 'addinn_db');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
    exit;
}

// Gestion des requêtes préalables (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Récupération et validation des données
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$reponse = trim($data['reponse'] ?? '');

if (empty($email) || empty($reponse)) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes.']);
    exit;
}

// Vérification si l'email existe dans la base
$checkEmailQuery = "SELECT * FROM feedback WHERE email = ?";
$stmtCheck = $conn->prepare($checkEmailQuery);
$stmtCheck->bind_param("s", $email);
$stmtCheck->execute();
$result = $stmtCheck->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => "L'email spécifié n'existe pas."]);
    exit;
}

// Mise à jour de la réponse
$sql = "UPDATE feedback SET reponse = ? WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $reponse, $email);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Réponse mise à jour avec succès.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour de la réponse.']);
}

$stmt->close();
$conn->close();
?>
