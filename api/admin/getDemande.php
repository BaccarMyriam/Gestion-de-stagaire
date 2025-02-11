<?php
// CORS headers doivent être définis avant toute sortie
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Remplacez "*" par votre domaine en production
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=addinn_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT cin, nom, email, tel, cv, lettre, convention, stage, project, etat, remarque FROM demandes_stage");
    $demandes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $demandes]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération des données : ' . $e->getMessage()]);
}
?>
