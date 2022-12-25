document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const w = 10;
    console.log(squares);
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');

    //Tetrominoes
    const ltetramino = [
        [1, 1 + w, 1 + 2 * w, 2],
        [w, w + 1, w + 2, 2 * w + 2],
        [2 * w, 1, 1 + w, 1 + 2 * w],
        [w, 2 * w, 2 * w + 1, 2 * w + 2],
    ];

    const ztetramino = [
        [2 * w, 1 + w, 1 + 2 * w, 2 + w],
        [0, w, 1 + w, 1 + 2 * w],
        [2 * w, 1 + w, 1 + 2 * w, 2 + w],
        [0, w, 1 + w, 1 + 2 * w],
    ];

    const ttetramino = [
        [1, 1 + w, w, 2 + w],
        [1, 1 + w, 1 + 2 * w, 2 + w],
        [w, 1 + w, 2 + w, 1 + 2 * w],
        [1, 1 + w, 1 + 2 * w, w],
    ];

    const otetramino = [
        [0, 1, w, 1 + w],
        [(0, 1, w, 1 + w)],
        [(0, 1, w, 1 + w)],
        [(0, 1, w, 1 + w)],
    ];

    const itetramino = [
        [1, 1 + w, 1 + 2 * w, 1 + 3 * w],
        [w, 1 + w, 2 + w, 3 + w],
        [1, 1 + w, 1 + 2 * w, 1 + 3 * w],
        [w, 1 + w, 2 + w, 3 + w],
    ];

    const tetraminoes = [
        ltetramino,
        ztetramino,
        ttetramino,
        otetramino,
        itetramino,
    ];

    let curPos = 4;
    let cur = tetraminoes[0][0];
    console.log(cur);
    function draw() {
        cur.forEach((index) => {
            squares[curPos + index].classList.add('tetramino');
            squares[curPos + index].style.backgroundColor = 'red';
            console.log(squares[curPos + index]);
        });
    }

    draw();
});
