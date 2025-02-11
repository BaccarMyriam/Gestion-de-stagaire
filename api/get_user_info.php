<?php
// Définir les en-têtes CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS (prévol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "addinn_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer le CIN depuis les paramètres GET
$cin = $_GET['cin'] ?? null; // Utiliser l'opérateur null coalescent pour éviter l'erreur

// Valider le CIN
if (empty($cin)) {
    echo json_encode([
        'success' => false,
        'message' => 'CIN vide.'
    ]);
    exit();
}

// Utiliser une requête préparée pour éviter les injections SQL
$stmt = $conn->prepare("SELECT cin, name, email, image FROM users WHERE cin = ?");
if (!$stmt) {
    die("Erreur de préparation de la requête : " . $conn->error);
}
$stmt->bind_param("s", $cin); // "s" signifie que le paramètre est une chaîne
if (!$stmt->execute()) {
    die("Erreur d'exécution de la requête : " . $stmt->error);
}
$result = $stmt->get_result();

// Vérifier si l'utilisateur existe
if ($result->num_rows > 0) {
    // Récupérer les informations de l'utilisateur
    $user = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
} else {
    // Utilisateur non trouvé
    echo json_encode([
        'success' => false,
        'message' => 'Utilisateur non trouvé.'
    ]);
}

// Fermer la requête et la connexion
$stmt->close();
$conn->close();
?>