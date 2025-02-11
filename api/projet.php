<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$inputData = json_decode(file_get_contents('php://input'), true);

if (isset($inputData['cin'], $inputData['name'], $inputData['email'], $inputData['nprojet'], $inputData['description'])) {
    $cin = htmlspecialchars($inputData['cin']);
    $name = htmlspecialchars($inputData['name']);
    $email = filter_var($inputData['email'], FILTER_VALIDATE_EMAIL);
    $nprojet = htmlspecialchars($inputData['nprojet']);
    $description = htmlspecialchars($inputData['description']);

    if ($email === false) {
        echo json_encode(['error' => 'Adresse email invalide.']);
        exit();
    }

    try {
        $pdo = new PDO('mysql:host=localhost;dbname=addinn_db', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO projets (cin, name, email, nprojet, description) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$cin, $name, $email, $nprojet, $description]);

        echo json_encode(['message' => 'Projet ajouté avec succès']);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erreur de base de données: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Données incomplètes.']);
}
?>
