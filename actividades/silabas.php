<?php
$pageTitle = "Formando Palabras con Sílabas";
require_once '../includes/header.php';
?>

<div class="container">
    <h1>Formando Palabras con Sílabas</h1>
    
    <div class="level-selector" id="levelSelector">
        <!-- Los niveles se cargarán dinámicamente desde JavaScript -->
    </div>
    
    <div class="game-area">
        <div class="syllables-container" id="syllablesContainer">
            <!-- Las sílabas se cargarán dinámicamente -->
        </div>
        
        <div class="word-container" id="wordContainer">
            <!-- Los espacios para la palabra se generarán dinámicamente -->
        </div>
        
        <div class="image-container" id="imageContainer">
            <img id="wordImage" src="" alt="Imagen de la palabra">
        </div>
        
        <div class="feedback" id="feedback"></div>
    </div>
    
    <div class="controls">
        <button id="checkBtn">Comprobar</button>
        <button id="nextBtn">Siguiente</button>
        <button id="hearBtn">Escuchar</button>
    </div>
</div>

<?php require_once '../includes/footer.php'; ?>