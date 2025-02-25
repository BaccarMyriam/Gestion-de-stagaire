<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

// Préparer la requête SQL pour récupérer les demandes
$query = "SELECT cin, nom, email, tel, cv, lettre, convention, stage, project, etat, remarque FROM demandes_stage WHERE cin = ?";
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
    $demandes = [];
    while ($row = $result->fetch_assoc()) {
        $demandes[] = $row; // Ajouter chaque demande au tableau
    }
    echo json_encode([
        'success' => true,
        'demandes' => $demandes // Renvoyer un tableau de demandes
    ]);
} else {
    echo json_encode([
        'success' => true,
        'demandes' => [] // Renvoyer un tableau vide si aucune demande n'est trouvée
    ]);
}

// Fermer la requête et la connexion
$stmt->close();
$conn->close();
?>