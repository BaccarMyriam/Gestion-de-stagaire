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

// Gestion des requêtes préliminaires (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Lire les données JSON envoyées
$data = json_decode(file_get_contents("php://input"));

$cin = $data->cin ?? null;
$notes = $data->notes ?? null; // Utilisation de 'notes' pour le champ de mise à jour

// Vérification des données
if (!empty($cin) && !empty($notes)) {
    // Mise à jour de la base de données avec un champ de type double
    $sql = "UPDATE users SET notes = ? WHERE cin = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("ds", $notes, $cin); // 'ds' pour double et string
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Note mise à jour avec succès.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour de la note.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'CIN ou note manquante.']);
}

$conn->close();
?>
