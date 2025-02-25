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
$result = $data->resultat ?? null; // Utilisation de 'resultat' pour le champ de mise à jour

// Vérification des données
if (!empty($cin) && !empty($result)) {
    // Mise à jour de la base de données
    $sql = "UPDATE users SET resultat = ? WHERE cin = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("ss", $result, $cin); // 'ss' pour deux chaînes
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Résultat mis à jour avec succès.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour du résultat.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'CIN ou résultat manquant.']);
}

$conn->close();
?>
