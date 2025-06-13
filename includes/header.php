<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'Aprendiendo con Diversión'; ?></title>
    <link rel="stylesheet" href="../css/styles.css">
    <style>
        /* Estilos específicos para la actividad de sílabas */
        .syllables-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            min-height: 60px;
        }

        .syllable {
            background-color: #f0f8ff;
            border: 2px solid #4d96ff;
            border-radius: 10px;
            padding: 10px 15px;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
        }

        .syllable:hover {
            background-color: #d1e3ff;
            transform: scale(1.1);
        }

        .word-container {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin: 30px 0;
            min-height: 60px;
            flex-wrap: wrap;
        }

        .word-slot {
            width: 60px;
            height: 60px;
            border: 2px dashed #4d96ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .word-slot.highlight {
            background-color: #f0f8ff;
        }

        .image-container {
            width: 200px;
            height: 200px;
            margin: 20px auto;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            background-color: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s;
        }

        .image-container.show {
            opacity: 1;
        }

        .image-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .feedback {
            margin-top: 20px;
            font-size: 1.2rem;
            min-height: 30px;
        }

        .correct {
            color: #6bff6b;
        }

        .incorrect {
            color: #ff6b6b;
        }

        @media (max-width: 600px) {
            .syllable {
                font-size: 1.2rem;
                padding: 8px 12px;
            }
            
            .word-slot {
                width: 50px;
                height: 50px;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="header-container">
            <div class="logo" onclick="location.href='../index.php'">
                <div class="logo-text">Aprendiendo con Diversión</div>
            </div>
            <nav>
                <ul>
                    <li><a href="../index.php">Inicio</a></li>
                    <li><a href="../actividades.php">Actividades</a></li>
                    <li><a href="../recursos.php">Recursos</a></li>
                    <li><a href="../contacto.php">Contacto</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">