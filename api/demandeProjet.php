<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('db.php');

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Méthode HTTP invalide.']);
    exit();
}

// Vérification des champs obligatoires
$requiredFields = ['cin', 'nom', 'email', 'tel', 'stage', 'project'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['error' => "Le champ '$field' est requis."]);
        exit();
    }
}

// Vérification du répertoire de téléchargement
$uploadDir = 'projects/';
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        echo json_encode(['error' => "Impossible de créer le répertoire pour les téléchargements."]);
        exit();
    }
}

// Vérification des fichiers téléchargés
$uploadedFiles = [];
$fileFields = ['cv' => 'CV', 'lettre' => 'Lettre de motivation', 'convention' => 'Convention'];

foreach ($fileFields as $field => $label) {
    if (empty($_FILES[$field]) || $_FILES[$field]['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['error' => "Le fichier '$label' est manquant ou contient une erreur."]);
        exit();
    }

    $fileType = mime_content_type($_FILES[$field]['tmp_name']);
    if (!in_array($fileType, ['application/pdf', 'image/jpeg', 'image/png'])) {
        echo json_encode(['error' => "Le fichier '$label' doit être un fichier PDF ou une image."]);
        exit();
    }

    if ($_FILES[$field]['size'] > 5000000) {
        echo json_encode(['error' => "Le fichier '$label' dépasse la taille maximale autorisée de 5 Mo."]);
        exit();
    }

    $filePath = $uploadDir . uniqid() . '_' . basename($_FILES[$field]['name']);
    if (!move_uploaded_file($_FILES[$field]['tmp_name'], $filePath)) {
        echo json_encode(['error' => "Erreur lors de l'upload du fichier '$label'."]);
        exit();
    }
    $uploadedFiles[$field] = $filePath;
}

// Connexion à la base de données
try {
    $pdo = new PDO('mysql:host=localhost;dbname=addinn_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insertion dans la base de données
    $stmt = $pdo->prepare("INSERT INTO demandes_stage (cin, nom, email, tel, cv, lettre, convention, stage, project) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['cin'], 
        $_POST['nom'], 
        $_POST['email'], 
        $_POST['tel'], 
        $uploadedFiles['cv'], 
        $uploadedFiles['lettre'], 
        $uploadedFiles['convention'], 
        $_POST['stage'], 
        $_POST['project']
    ]);

    echo json_encode(['success' => 'Formulaire soumis avec succès.']);
} catch (PDOException $e) {
    error_log('Erreur SQL : ' . $e->getMessage());
    echo json_encode(['error' => "Erreur lors de l'insertion dans la base de données : " . $e->getMessage()]);
    exit();
}
?>
