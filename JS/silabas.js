document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const levelSelector = document.getElementById('levelSelector');
    const syllablesContainer = document.getElementById('syllablesContainer');
    const wordContainer = document.getElementById('wordContainer');
    const imageContainer = document.getElementById('imageContainer');
    const wordImage = document.getElementById('wordImage');
    const feedback = document.getElementById('feedback');
    const checkBtn = document.getElementById('checkBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hearBtn = document.getElementById('hearBtn');
    
    // Variables de estado
    let currentLevel = 1;
    let currentWord = null;
    let syllables = [];
    let selectedSyllables = [];
    let wordSlots = [];
    
    // Niveles disponibles
    const levels = [1, 2, 3];
    
    // Inicializar la aplicación
    function init() {
        loadLevels();
        loadWord();
        setupEventListeners();
    }
    
    // Cargar los niveles
    function loadLevels() {
        levelSelector.innerHTML = '';
        
        levels.forEach(level => {
            const button = document.createElement('button');
            button.className = `level-btn ${level === currentLevel ? 'active' : ''}`;
            button.textContent = `Nivel ${level}`;
            button.addEventListener('click', () => {
                currentLevel = level;
                document.querySelectorAll('.level-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                loadWord();
            });
            levelSelector.appendChild(button);
        });
    }
    
    // Cargar una palabra aleatoria del nivel actual
    async function loadWord() {
        try {
            const response = await fetch(`silabas-api.php?nivel=${currentLevel}`);
            const result = await response.json();
            
            if (!result.success) {
                feedback.textContent = result.message || 'Error al cargar la palabra';
                return;
            }
            
            currentWord = result.data;
            syllables = currentWord.silabas.split('-');
            selectedSyllables = [];
            
            displaySyllables();
            prepareWordSlots();
            
            imageContainer.classList.remove('show');
            feedback.textContent = '';
            feedback.className = 'feedback';
            
            checkBtn.disabled = false;
            nextBtn.disabled = true;
        } catch (error) {
            console.error('Error:', error);
            feedback.textContent = 'Error al cargar la palabra. Intenta de nuevo.';
        }
    }
    
    // Mostrar las sílabas desordenadas
    function displaySyllables() {
        syllablesContainer.innerHTML = '';
        
        const shuffledSyllables = [...syllables].sort(() => Math.random() - 0.5);
        
        shuffledSyllables.forEach((syllable, index) => {
            const syllableElement = document.createElement('div');
            syllableElement.className = 'syllable';
            syllableElement.textContent = syllable;
            syllableElement.dataset.index = index;
            syllableElement.addEventListener('click', () => selectSyllable(syllableElement, syllable));
            syllablesContainer.appendChild(syllableElement);
        });
    }
    
    // Preparar los espacios para formar la palabra
    function prepareWordSlots() {
        wordContainer.innerHTML = '';
        wordSlots = [];
        
        for (let i = 0; i < syllables.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'word-slot';
            slot.dataset.index = i;
            slot.addEventListener('click', () => returnSyllable(slot));
            wordContainer.appendChild(slot);
            wordSlots.push(slot);
        }
    }
    
    // Seleccionar una sílaba
    function selectSyllable(element, syllable) {
        if (element.classList.contains('selected')) return;
        
        const emptySlot = wordSlots.find(slot => !slot.textContent);
        
        if (emptySlot) {
            emptySlot.textContent = syllable;
            emptySlot.dataset.syllable = syllable;
            element.classList.add('selected');
            selectedSyllables.push(syllable);
            
            wordSlots.forEach(slot => {
                slot.classList.toggle('highlight', !slot.textContent);
            });
        }
    }
    
    // Devolver una sílaba al contenedor
    function returnSyllable(slot) {
        if (!slot.textContent) return;
        
        const syllable = slot.textContent;
        slot.textContent = '';
        delete slot.dataset.syllable;
        
        const syllableElements = document.querySelectorAll('.syllable');
        syllableElements.forEach(el => {
            if (el.textContent === syllable && el.classList.contains('selected')) {
                el.classList.remove('selected');
                
                const index = selectedSyllables.indexOf(syllable);
                if (index !== -1) {
                    selectedSyllables.splice(index, 1);
                }
            }
        });
        
        wordSlots.forEach(s => {
            s.classList.toggle('highlight', !s.textContent);
        });
    }
    
    // Comprobar si la palabra formada es correcta
    function checkWord() {
        const formedWord = selectedSyllables.join('');
        const correctWord = currentWord.palabra.replace(/-/g, '');
        
        if (formedWord.toLowerCase() === correctWord.toLowerCase()) {
            feedback.textContent = '¡Correcto! ¡Buen trabajo!';
            feedback.className = 'feedback correct';
            
            wordImage.src = `../img/${currentWord.palabra}.jpg`;
            wordImage.alt = `Imagen de ${currentWord.palabra}`;
            imageContainer.classList.add('show');
            
            nextBtn.disabled = false;
        } else {
            feedback.textContent = 'Inténtalo de nuevo. ¡Tú puedes!';
            feedback.className = 'feedback incorrect';
        }
    }
    
    // Reproducir el audio de la palabra
    function playWordAudio() {
        if (!currentWord) return;
        
        const utterance = new SpeechSynthesisUtterance(currentWord.palabra);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        checkBtn.addEventListener('click', checkWord);
        nextBtn.addEventListener('click', loadWord);
        hearBtn.addEventListener('click', playWordAudio);
    }
    
    // Iniciar la aplicación
    init();
});