document.addEventListener('DOMContentLoaded', function() {
    // Crossword data structure
    const crosswordData = {
        grid: [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        clues: {
            across: {
                1: { clue: "animal.mp4", answer: "PERRO", row: 0, col: 0 },
                2: { clue: "fruta.mp4", answer: "MANZANA", row: 1, col: 2 }
            },
            down: {
                1: { clue: "color.mp4", answer: "ROJO", row: 0, col: 0 },
                2: { clue: "objeto.mp4", answer: "MESA", row: 1, col: 2 }
            }
        }
    };

    // Video paths (replace with your actual video paths)
    const videoPaths = {
        "animal.mp4": "videos/animal.mp4",
        "fruta.mp4": "videos/fruta.mp4",
        "color.mp4": "videos/color.mp4",
        "objeto.mp4": "videos/objeto.mp4"
    };

    // Alphabet sign images (replace with your actual image paths)
    const alphabetSigns = {
        'A': 'images/A.png',
        'B': 'images/B.png',
        'C': 'images/C.png',
        // Add all letters of the alphabet
        // ...
        'Z': 'images/Z.png'
    };

    // Initialize the game
    initCrossword(crosswordData);
    initAlphabetSigns(alphabetSigns);
    initClues(crosswordData.clues, videoPaths);

    // Modal functionality
    const modal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close');
    const videoElement = document.getElementById('clue-video');

    closeBtn.onclick = function() {
        modal.style.display = "none";
        videoElement.pause();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            videoElement.pause();
        }
    };
});

function initCrossword(data) {
    const gridContainer = document.getElementById('crossword-grid');
    gridContainer.innerHTML = '';
    
    // Create cells
    for (let row = 0; row < data.grid.length; row++) {
        for (let col = 0; col < data.grid[row].length; col++) {
            const cellValue = data.grid[row][col];
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            if (cellValue === 0) {
                cell.classList.add('black');
            } else {
                // Add cell number
                const numberSpan = document.createElement('span');
                numberSpan.className = 'cell-number';
                numberSpan.textContent = cellValue;
                cell.appendChild(numberSpan);
                
                // Add input field
                const input = document.createElement('input');
                input.className = 'cell-input';
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = row;
                input.dataset.col = col;
                
                // Add event listeners for navigation
                input.addEventListener('keydown', handleInputNavigation);
                
                cell.appendChild(input);
            }
            
            gridContainer.appendChild(cell);
        }
    }
}

function handleInputNavigation(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    
    let nextInput = null;
    
    switch(e.key) {
        case 'ArrowUp':
            nextInput = document.querySelector(`.cell-input[data-row="${row-1}"][data-col="${col}"]`);
            break;
        case 'ArrowDown':
            nextInput = document.querySelector(`.cell-input[data-row="${row+1}"][data-col="${col}"]`);
            break;
        case 'ArrowLeft':
            nextInput = document.querySelector(`.cell-input[data-row="${row}"][data-col="${col-1}"]`);
            break;
        case 'ArrowRight':
            nextInput = document.querySelector(`.cell-input[data-row="${row}"][data-col="${col+1}"]`);
            break;
    }
    
    if (nextInput) {
        nextInput.focus();
    }
}

function initAlphabetSigns(signs) {
    const container = document.querySelector('.alphabet-signs');
    
    for (const [letter, imagePath] of Object.entries(signs)) {
        const sign = document.createElement('img');
        sign.className = 'alphabet-sign';
        sign.src = imagePath;
        sign.alt = `Sign for letter ${letter}`;
        sign.title = letter;
        sign.dataset.letter = letter;
        
        sign.addEventListener('click', function() {
            const activeInput = document.querySelector('.cell-input:focus');
            if (activeInput) {
                activeInput.value = letter;
                
                // Move to next cell
                const row = parseInt(activeInput.dataset.row);
                const col = parseInt(activeInput.dataset.col);
                const nextInput = document.querySelector(`.cell-input[data-row="${row}"][data-col="${col+1}"]`);
                if (nextInput) nextInput.focus();
            }
        });
        
        container.appendChild(sign);
    }
}

function initClues(clues, videoPaths) {
    const acrossList = document.getElementById('across-clues');
    const downList = document.getElementById('down-clues');
    
    // Clear existing clues
    acrossList.innerHTML = '';
    downList.innerHTML = '';
    
    // Add across clues
    for (const [number, clueData] of Object.entries(clues.across)) {
        const li = document.createElement('li');
        li.textContent = `${number}. `;
        li.dataset.clue = clueData.clue;
        
        li.addEventListener('click', function() {
            showVideo(videoPaths[clueData.clue]);
            highlightWord(clueData.row, clueData.col, 'across', clueData.answer.length);
        });
        
        acrossList.appendChild(li);
    }
    
    // Add down clues
    for (const [number, clueData] of Object.entries(clues.down)) {
        const li = document.createElement('li');
        li.textContent = `${number}. `;
        li.dataset.clue = clueData.clue;
        
        li.addEventListener('click', function() {
            showVideo(videoPaths[clueData.clue]);
            highlightWord(clueData.row, clueData.col, 'down', clueData.answer.length);
        });
        
        downList.appendChild(li);
    }
}

function showVideo(videoPath) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('clue-video');
    
    video.src = videoPath;
    modal.style.display = "block";
    video.play();
}

function highlightWord(startRow, startCol, direction, length) {
    // Remove previous highlights
    document.querySelectorAll('.cell-input').forEach(input => {
        input.style.backgroundColor = '';
    });
    
    for (let i = 0; i < length; i++) {
        let row = startRow;
        let col = startCol;
        
        if (direction === 'across') {
            col += i;
        } else {
            row += i;
        }
        
        const input = document.querySelector(`.cell-input[data-row="${row}"][data-col="${col}"]`);
        if (input) {
            input.style.backgroundColor = '#eaf2f8';
            input.focus();
        }
    }
}