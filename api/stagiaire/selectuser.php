<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
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
// Inclure le fichier de connexion à la base de données
include('db.php');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Récupérer l'ID de l'utilisateur (par exemple, à partir d'un token ou d'un paramètre GET)
$cin = $_GET['cin'] ?? null;

if (empty($cin)) {
    echo json_encode(array("message" => "CIN requis."));
    exit;
}

// Sécuriser l'entrée
$cin = htmlspecialchars($cin);

// Requête pour récupérer les données de l'utilisateur
$query = "SELECT cin, name, email, password, image FROM users WHERE cin = :cin";
$stmt = $conn->prepare($query);
$stmt->bindParam(':cin', $cin);

if ($stmt->execute()) {
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(array("message" => "Utilisateur non trouvé."));
    }
} else {
    echo json_encode(array("message" => "Erreur lors de la récupération des données."));
}
?>
