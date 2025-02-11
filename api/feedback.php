<?php
// Activer les en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Gérer les requêtes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Configuration de la base de données
$host = 'localhost';
$dbname = 'addinn_db';
$username = 'root';
$password = '';

// Vérification de la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON de la requête
    $input = json_decode(file_get_contents('php://input'), true);

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');

    // Vérification des champs vides
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
        exit;
    }

    // Valider l'adresse email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
        exit;
    }

    try {
        // Connexion à la base de données
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            echo "Connexion réussie";
        } catch (PDOException $e) {
            die("Erreur de connexion : " . $e->getMessage());
        } // Préparer et exécuter la requête SQL
        $stmt = $pdo->prepare("INSERT INTO feedback (name, email, message) VALUES (:name, :email, :message)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message
        ]);

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Feedback enregistré avec succès']);
    } catch (PDOException $e) {
        die("Erreur : " . $e->getMessage());
    }
} else {
    // Méthode non autorisée
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>
