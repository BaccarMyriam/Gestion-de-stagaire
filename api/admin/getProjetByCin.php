<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "addinn_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données.'
    ]));
}

// Récupérer le CIN depuis les paramètres GET
$cin = $_GET['cin'] ?? null;

// Valider le CIN
if (empty($cin)) {
    echo json_encode([
        'success' => false,
        'message' => 'CIN vide.'
    ]);
    exit();
}

// Préparer la requête SQL pour récupérer les projets
$query = "SELECT cin, name, email, nprojet, description, etat, remarque FROM projets WHERE cin = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de préparation de la requête : ' . $conn->error
    ]);
    exit();
}

// Lier le paramètre CIN à la requête
$stmt->bind_param("s", $cin);

// Exécuter la requête
if (!$stmt->execute()) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur d\'exécution de la requête : ' . $stmt->error
    ]);
    exit();
}

// Récupérer les résultats
$result = $stmt->get_result();

// Vérifier s'il y a des résultats
if ($result->num_rows > 0) {
    $projets = [];
    while ($row = $result->fetch_assoc()) {
        $projets[] = $row; // Ajouter chaque projet au tableau
    }
    echo json_encode([
        'success' => true,
        'demandes' => $projets // Renvoyer un tableau de projets
    ]);
} else {
    echo json_encode([
        'success' => true,
        'demandes' => [] // Renvoyer un tableau vide si aucun projet n'est trouvé
    ]);
}

// Fermer la requête et la connexion
$stmt->close();
$conn->close();
?>