<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Inclure le fichier de connexion à la base de données
include('db.php');

// Récupérer les données du formulaire
$cin = $_POST['cin'] ?? null;
$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$image = $_FILES['image'] ?? null;

// Assurez-vous que tous les champs nécessaires sont remplis
if (empty($cin) || empty($name) || empty($email) || empty($password) || empty($image)) {
    echo json_encode(array("message" => "Tous les champs sont requis."));
    exit;
}

// Sécuriser les entrées
$cin = htmlspecialchars($cin);
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$password = htmlspecialchars($password);

// Vérification si l'utilisateur est un administrateur (valeurs spécifiées)
if ($cin == '11111111' && $name == 'mohamed essid' && $email == 'mohamed.essid@addinn.com' && $password == 'mohamed123') {
    $role = 'ADMIN'; // rôle admin
} else {
    $role = 'STAGIAIRE'; // rôle par défaut
}

// Gestion de l'image
$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Nom de l'image est "homme.jpg" (vous pouvez choisir un autre format si nécessaire)
$imageName = "homme.jpg";
$imagePath = $targetDir . $imageName;
$imageFileType = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));

$allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
if (!in_array($imageFileType, $allowedTypes)) {
    echo json_encode(array("message" => "Format d'image non valide."));
    exit;
}

if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
    echo json_encode(array("message" => "Erreur lors de l'upload de l'image."));
    exit;
}

// Insertion dans la base de données
$query = "INSERT INTO users (cin, name, email, password, role, image) VALUES (:cin, :name, :email, :password, :role, :image)";
$stmt = $conn->prepare($query);

$stmt->bindParam(':cin', $cin);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password); // Mot de passe en clair
$stmt->bindParam(':role', $role);
$stmt->bindParam(':image', $imagePath);

if ($stmt->execute()) {
    echo json_encode(array("message" => "Inscription réussie."));
} else {
    echo json_encode(array("message" => "Erreur lors de l'inscription."));
}
?>
