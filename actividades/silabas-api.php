<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'lectoescritura.cj0cgk6mciki.us-east-2.rds.amazonaws.com';
$dbname = 'lectoescritura';
$username = 'admin';
$password = 'solcorcol01';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener el nivel de la solicitud
    $nivel = isset($_GET['nivel']) ? (int)$_GET['nivel'] : 1;

    // Consulta para obtener una palabra aleatoria del nivel solicitado
    $stmt = $pdo->prepare("SELECT * FROM palabra WHERE nivel_id = ? ORDER BY RAND() LIMIT 1");
    $stmt->execute([$nivel]);
    $palabra = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($palabra) {
        echo json_encode([
            'success' => true,
            'data' => $palabra
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No se encontraron palabras para este nivel'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error de base de datos: ' . $e->getMessage()
    ]);
}
?>