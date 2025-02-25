<?php
// CORS Header
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines (ou spécifie l'origine exacte si nécessaire)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP nécessaires
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autoriser certains en-têtes

// Si c'est une requête OPTIONS (requête prévol), renvoyer un code 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}



// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "addinn_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données.'
    ]);
    exit();
}

// Vérifier si le paramètre CIN est bien envoyé
$cin = $_GET['cin'] ?? null; 

if (!$cin) {
    echo json_encode([
        'success' => false,
        'message' => 'CIN manquant.'
    ]);
    exit();
}

// Préparer la requête pour éviter les injections SQL
$stmt = $conn->prepare("SELECT cin, name, notes, resultat, attestation_stage FROM users WHERE cin = ?");
$stmt->bind_param("s", $cin);
$stmt->execute();
$result = $stmt->get_result();

// Vérifier si l'utilisateur existe
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Utilisateur non trouvé.'
    ]);
}

// Fermer la connexion
$stmt->close();
$conn->close();
?>
