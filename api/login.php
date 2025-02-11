<?php
// Définir les paramètres de connexion à la base de données
$servername = "localhost";
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL (vide si aucun)
$dbname = "addinn_db"; // Nom de la base de données

// Définir les en-têtes CORS pour permettre l'accès depuis Angular
header("Access-Control-Allow-Origin: http://localhost:4200"); // Autoriser l'application Angular
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Méthodes autorisées
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS (prévol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Ne rien faire pour les requêtes OPTIONS
}

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les données POST
$data = json_decode(file_get_contents("php://input"));

// Valider le CIN et le mot de passe
if (empty($data->cin) || empty($data->password)) {
    echo json_encode([
        'success' => false,
        'message' => 'CIN ou mot de passe vide.'
    ]);
    exit();
}

// Récupérer le CIN et le mot de passe
$cin = $data->cin;
$password = $data->password;

// Vérifier une combinaison spécifique de CIN et mot de passe (exemple)
if ($cin === '11111111' && $password === 'mohamed123') {
    echo json_encode([
        'success' => true,
        'message' => 'Connexion réussie.',
        'redirect' => 'dashbord-admin'
    ]);
    exit();
}

// Utiliser une requête préparée pour éviter les injections SQL
$stmt = $conn->prepare("SELECT * FROM users WHERE cin = ? AND password = ?");
$stmt->bind_param("ss", $cin, $password); // "ss" signifie que les deux paramètres sont des chaînes
$stmt->execute();
$result = $stmt->get_result();

// Vérifier si l'utilisateur existe
if ($result->num_rows > 0) {
    // Utilisateur trouvé, rediriger vers la page utilisateur
    echo json_encode([
        'success' => true,
        'message' => 'Connexion réussie.',
        'redirect' => 'user'
    ]);
} else {
    // Utilisateur non trouvé ou mot de passe incorrect
    echo json_encode([
        'success' => false,
        'message' => 'CIN ou mot de passe incorrect.'
    ]);
}

// Fermer la requête et la connexion
$stmt->close();
$conn->close();
?>