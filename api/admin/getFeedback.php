<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Exemple pour traiter la requête SELECT
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Connexion à la base de données
    $conn = new mysqli('localhost', 'root', '', 'addinn_db');
    
    // Vérifier si la connexion a échoué
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données.']);
        exit;
    }

    // Requête SELECT pour récupérer les feedbacks
    $query = "SELECT name, email, message, reponse FROM feedback";
    $result = $conn->query($query);

    // Vérifier si la requête a retourné des résultats
    if ($result->num_rows > 0) {
        // Tableau pour stocker les résultats
        $feedbacks = [];

        // Récupérer chaque ligne du résultat
        while ($row = $result->fetch_assoc()) {
            $feedbacks[] = $row;
        }

        // Retourner les résultats sous forme de JSON
        echo json_encode(['success' => true, 'data' => $feedbacks]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucun feedback trouvé.']);
    }

    // Fermer la connexion
    $conn->close();
}
?>
