(() => {
    let playing = true;
    let score = 0;
    let missed = 0;
    const WINNING_SCORE = 10;
    const MAX_MISSES = 5;
    let activeHole = 1;

    // Функция для получения элемента по индексу
    const getHole = index => document.getElementById(`hole${index}`);

    // Функция для деактивации лунки
    const deactivateHole = index => {
        getHole(index).className = 'hole';
    };

    // Функция для активации лунки с кротом
    const activateHole = index => {
        getHole(index).className = 'hole hole_has-mole';
    };

    // Функция для перехода к следующей лунке
    const next = () => setTimeout(() => {
        if (!playing) {
            return;
        }
        deactivateHole(activeHole);
        activeHole = Math.floor(1 + Math.random() * 9);
        activateHole(activeHole);
        next();
    }, 800);

    // Функция обработки клика на лунке
    const onHoleClick = (event) => {
        if (!playing) {
            return;
        }

        if (event.target.classList.contains('hole_has-mole')) {
            score++;
            event.target.classList.remove('hole_has-mole');
        } else {
            missed++;
        }

        updateScoreBoard();

        if (score >= WINNING_SCORE) {
            alert('Вы выиграли!');
            resetGame();
        } else if (missed >= MAX_MISSES) {
            alert('Вы проиграли!');
            resetGame();
        }
    };

    // Функция обновления табло счета
    const updateScoreBoard = () => {
        document.getElementById('dead').textContent = score;
        document.getElementById('lost').textContent = missed;
    };

    // Функция для сброса состояния игры
    const resetGame = () => {
        playing = false;
        score = 0;
        missed = 0;
        updateScoreBoard();
        // Убираем всех кротов
        const holes = document.querySelectorAll('.hole');
        holes.forEach(hole => hole.classList.remove('hole_has-mole'));
        // Перезапускаем игру
        setTimeout(() => {
            playing = true;
            next();
        }, 1000);
    };

    // Добавление обработчиков событий на все лунки
    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);
        hole.addEventListener('click', onHoleClick);
    }

    // Начало игры
    next();
})();
