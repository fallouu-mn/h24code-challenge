<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "h24code";

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Créer la table si elle n'existe pas
$sql = "CREATE TABLE IF NOT EXISTS code_snippets (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if (!$conn->query($sql)) {
    echo json_encode(["message" => "Error creating table: " . $conn->error]);
    exit;
}

// Gérer les requêtes GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $category = isset($_GET['category']) ? $_GET['category'] : 'all';
    
    if ($category === 'all') {
        $sql = "SELECT * FROM code_snippets ORDER BY created_at DESC";
    } else {
        $sql = "SELECT * FROM code_snippets WHERE category = '$category' ORDER BY created_at DESC";
    }
    
    $result = $conn->query($sql);
    
    $snippets = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $snippets[] = $row;
        }
    }
    
    echo json_encode($snippets);
    exit;
}

// Gérer les requêtes POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["message" => "Invalid JSON data"]);
        exit;
    }
    
    $title = $conn->real_escape_string($data['title'] ?? '');
    $description = $conn->real_escape_string($data['description'] ?? '');
    $category = $conn->real_escape_string($data['category'] ?? '');
    $code = $conn->real_escape_string($data['code'] ?? '');
    
    if (empty($title) || empty($description) || empty($category) || empty($code)) {
        echo json_encode(["message" => "Tous les champs sont requis"]);
        exit;
    }
    
    $stmt = $conn->prepare("INSERT INTO code_snippets (title, description, category, code) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $description, $category, $code);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Code snippet ajouté avec succès"]);
    } else {
        echo json_encode(["message" => "Erreur: " . $stmt->error]);
    }
    
    $stmt->close();
    exit;
}

echo json_encode(["message" => "Méthode non supportée"]);
$conn->close();
?>