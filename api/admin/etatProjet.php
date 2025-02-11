<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

// Récupérer les données envoyées par Angular (au format JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Vérifier si les données nécessaires sont présentes
if (!isset($data['cin']) || !isset($data['etat'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes.']);
    exit;
}

// Récupérer et valider les données
$cin = $data['cin'];
$nouvelEtat = strtolower(trim($data['etat'])); // Convertir en minuscule pour validation

// Valider la valeur de 'etat'
$valeursValides = ['en attente', 'accepter', 'refuser'];
if (!in_array($nouvelEtat, $valeursValides, true)) {
    echo json_encode(['success' => false, 'message' => "Valeur 'etat' invalide."]);
    exit;
}

// Vérifier si le CIN existe dans la base de données
$stmt = $pdo->prepare("SELECT COUNT(*) FROM projets WHERE cin = :cin");
$stmt->execute([':cin' => $cin]);

if ($stmt->fetchColumn() == 0) {
    echo json_encode(['success' => false, 'message' => "Aucun enregistrement trouvé avec ce CIN."]);
    exit;
}

// Tenter de mettre à jour l'état
try {
    $sql = "UPDATE projets SET etat = :etat WHERE cin = :cin";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':etat' => $nouvelEtat,
        ':cin' => $cin
    ]);

    // Vérifier si une ligne a été mise à jour
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'État mis à jour avec succès.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucune mise à jour effectuée.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur SQL : ' . $e->getMessage()]);
}
?>
