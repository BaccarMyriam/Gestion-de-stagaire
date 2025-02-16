<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permet les requêtes cross-origin
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=localhost;dbname=addinn_db', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()
    ]);
    exit;
}

// Lire et décoder les données JSON reçues
$data = json_decode(file_get_contents("php://input"), true);

// Débogage - enregistrer les données reçues dans le fichier log
error_log("Données reçues : " . print_r($data, true));

if (!$data || !isset($data['cin']) || empty($data['cin'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Le CIN est requis.'
    ]);
    exit;
}

$cin = $data['cin'];

try {
    // Démarrer une transaction pour garantir la suppression complète
    $pdo->beginTransaction();

    // Supprimer les enregistrements liés
    $tables = ['demandes_stage', 'projets', /*'contact' 'feedback',*/ 'users'];

    foreach ($tables as $table) {
        $sql = "DELETE FROM $table WHERE cin = :cin";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['cin' => $cin]);
    }

    // Valider la transaction
    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Utilisateur et ses données liées ont été supprimés avec succès.'
    ]);
} catch (Exception $e) {
    // Annuler la transaction en cas d'erreur
    $pdo->rollBack();
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur lors de la suppression : ' . $e->getMessage()
    ]);
}
?>
