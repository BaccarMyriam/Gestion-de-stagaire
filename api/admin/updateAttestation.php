<?php  
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$conn = new mysqli('localhost', 'root', '', 'addinn_db');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error]);
    exit;
}

header('Content-Type: application/json');

// Gestion des requêtes préliminaires (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] === 0) {
    $pdfFile = $_FILES['pdfFile'];
    $allowedExtensions = ['pdf'];
    $fileExtension = strtolower(pathinfo($pdfFile['name'], PATHINFO_EXTENSION));

    // Vérifier si l'extension du fichier est autorisée
    if (in_array($fileExtension, $allowedExtensions)) {
        // Vérification du type MIME
        $fileMimeType = mime_content_type($pdfFile['tmp_name']);
        if ($fileMimeType !== 'application/pdf') {
            echo json_encode(['success' => false, 'message' => 'Le fichier doit être un PDF.']);
            exit;
        }

        $uploadDir = 'uploads/';
        
        // Vérifier si le dossier 'uploads' existe, sinon créer
        if (!is_dir($uploadDir)) {
            if (!mkdir($uploadDir, 0777, true)) {
                echo json_encode(['success' => false, 'message' => 'Impossible de créer le dossier de téléchargement.']);
                exit;
            }
        }

        $filePath = $uploadDir . basename($pdfFile['name']);

        // Vérifier si le fichier existe déjà dans le dossier
        if (file_exists($filePath)) {
            echo json_encode(['success' => false, 'message' => 'Le fichier existe déjà.']);
            exit;
        }

        // Déplacer le fichier dans le dossier 'uploads'
        if (move_uploaded_file($pdfFile['tmp_name'], $filePath)) {
            $cin = $_POST['cin'] ?? null;
            $attestation_stage = $filePath;  // Le chemin du fichier PDF

            if (!empty($cin) && !empty($attestation_stage)) {
                $sql = "UPDATE users SET attestation_stage = ? WHERE cin = ?";
                $stmt = $conn->prepare($sql);
                if ($stmt) {
                    $stmt->bind_param("ss", $attestation_stage, $cin); // 'ss' pour string
                    if ($stmt->execute()) {
                        echo json_encode(['success' => true, 'message' => 'Attestation de stage mise à jour avec succès.']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour de l\'attestation.']);
                    }
                    $stmt->close();
                } else {
                    echo json_encode(['success' => false, 'message' => 'Erreur de préparation de la requête.']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'CIN ou attestation manquante.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement du fichier.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Format de fichier non autorisé.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Aucun fichier téléchargé ou erreur dans l\'upload.']);
}

$conn->close();
?>
