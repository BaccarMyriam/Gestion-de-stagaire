<?php
// Configuration des en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

// Activer les logs pour déboguer
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Réponse pour les requêtes OPTIONS (pré-vol CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204); // Pas de contenu
    exit;
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "addinn_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion à la base de données
if ($conn->connect_error) {
    http_response_code(500); // Erreur interne du serveur
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error]);
    exit;
}

// Vérifier que la méthode HTTP est POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

// Lire et décoder les données JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400); // Requête invalide
    echo json_encode(['success' => false, 'message' => 'Données JSON invalides ou non reçues.']);
    exit;
}

// Récupérer et valider les données
$cin = trim($data['Cin'] ?? '');
$np = trim($data['np'] ?? '');
$email = trim($data['email'] ?? '');
$telephone = trim($data['telephone'] ?? '');
$tarea = trim($data['tarea'] ?? '');

if (empty($cin) || empty($np) || empty($email) || empty($telephone) || empty($tarea)) {
    http_response_code(400); // Requête invalide
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Requête invalide
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// Insérer les données dans la base de données
$stmt = $conn->prepare("INSERT INTO contact (Cin, np, email, telephone, tarea) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    http_response_code(500); // Erreur interne du serveur
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la préparation de la requête : ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssss", $cin, $np, $email, $telephone, $tarea);

if ($stmt->execute()) {
    http_response_code(200); // Succès
    echo json_encode(['success' => true, 'message' => 'Formulaire soumis avec succès.']);
} else {
    http_response_code(500); // Erreur interne du serveur
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion dans la base de données : ' . $stmt->error]);
}

// Libérer les ressources et fermer la connexion
$stmt->close();
$conn->close();
?>
