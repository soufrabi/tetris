document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const w = 10;
    console.log(squares);
    let score = 0;
    let lastRow = squares.length / w;
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const RotateBtn = document.querySelector('#rotate-btn');
    const LeftBtn = document.querySelector('#left-btn');
    const RightBtn = document.querySelector('#right-btn');
    const DownBtn = document.querySelector('#down-btn');
    const ControlBtns = [RotateBtn, LeftBtn, RightBtn, DownBtn];
    const colBase = 'yellow';
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
        [0, 1, w, 1 + w],
        [0, 1, w, 1 + w],
        [0, 1, w, 1 + w],
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
    const colors = ['red', 'blue', 'green', 'fuchsia'];
    let curPos = 4;
    let curTet = Math.floor(Math.random() * tetraminoes.length);
    let curRot = Math.floor(Math.random() * tetraminoes[curTet].length);
    let curCol = colors[Math.floor(Math.random() * colors.length)];
    // let curCol = 'red';
    let cur = tetraminoes[curTet][curRot];
    console.log(cur);

    // let curTet, curRot, curCol, cur;
    //genNew();
    function genNew() {
        curTet = Math.floor(Math.random() * tetraminoes.length);
        curRot = Math.floor(Math.random() * tetraminoes[curTet].length);
        curCol = colors[Math.floor(Math.random() * colors.length)];
        cur = tetraminoes[curTet][curRot];
    }
    function draw() {
        cur = tetraminoes[curTet][curRot];
        cur.forEach((index) => {
            squares[curPos + index].classList.add('tetramino');
            squares[curPos + index].style.backgroundColor = curCol;
            // console.log(squares[curPos + index]);
        });
    }
    function undraw() {
        cur = tetraminoes[curTet][curRot];

        cur.forEach((index) => {
            squares[curPos + index].classList.remove('tetramino');
            squares[curPos + index].style.backgroundColor = colBase;
            // console.log(squares[curPos + index]);
        });
    }
    draw();
    undraw();
    draw();
    function controlKey(e) {
        if (e.key == 'ArrowLeft') {
            moveLeft();
        } else if (e.key == 'ArrowRight') {
            moveRight();
        } else if (e.key == 'ArrowDown') {
            moveDown();
        } else if (e.key == 'ArrowUp') {
            rotate();
        }
    }
    document.addEventListener('keydown', controlKey);

    // function controlButton(e) {
    //     if (this.id == 'LeftBtn') {
    //         moveLeft();
    //     } else if (this.id == 'RightBtn') {
    //         moveRight();
    //     } else if (this.id == 'DownBtn') {
    //         moveDown();
    //     } else if (this.id == 'RotateBtn') {
    //         rotate();
    //     }
    // }
    // ControlBtns.forEach((btn) => {
    //     btn.addEventListener('click', controlButton);
    // });

    StartBtn.addEventListener('click', () => {
        window.location.reload(true);
    });
    RotateBtn.addEventListener('click', rotate);
    LeftBtn.addEventListener('click', moveLeft);
    RightBtn.addEventListener('click', moveRight);
    DownBtn.addEventListener('click', moveDown);

    function moveLeft() {
        const isAtLeftEdge = cur.some((index) => {
            return (curPos + index) % w === 0;
        });

        if (isAtLeftEdge) return;

        const isLeftTaken = cur.some((index) => {
            return squares[curPos - 1 + index].classList.contains('taken');
        });

        if (isLeftTaken) return;

        undraw();
        curPos -= 1;
        draw();
    }

    function moveRight() {
        const isAtRightEdge = cur.some((index) => {
            return (curPos + index) % w === w - 1;
        });

        if (isAtRightEdge) return;

        const isRightTaken = cur.some((index) => {
            return squares[curPos + 1 + index].classList.contains('taken');
        });

        if (isRightTaken) return;

        undraw();
        curPos += 1;
        draw();
    }
    function moveDown() {
        const n = squares.length;
        const isAtBottomEdge = cur.some((index) => {
            return curPos + index <= n - 1 && curPos + index >= n - w;
        });

        if (isAtBottomEdge) return;

        const isBottomTaken = cur.some((index) => {
            return squares[curPos + w + index].classList.contains('taken');
        });

        if (isBottomTaken) return;

        undraw();
        curPos += w;
        draw();
    }
    function rotate() {
        const n = squares.length;
        for (let i = (curRot + 1) % 4; i != curRot; i = (i + 1) % 4) {
            cur = tetraminoes[curTet][i];
            const rotateIsNotValid = cur.some((index) => {
                return curPos + index >= n || curPos + index < 0;
            });
            if (rotateIsNotValid) continue;
            const rotateIsTaken = cur.some((index) => {
                return squares[curPos + index].classList.contains('taken');
            });
            const isAtLeftEdge = cur.some((index) => {
                return (curPos + index) % w === 0;
            });
            const isAtRightEdge = cur.some((index) => {
                return (curPos + index) % w === w - 1;
            });

            const rotateIsPossible =
                !rotateIsNotValid &&
                !rotateIsTaken &&
                !(isAtLeftEdge && isAtRightEdge);

            if (rotateIsPossible) {
                undraw();
                curRot = i % 4;
                draw();

                return;
            }
        }

        cur = tetraminoes[curTet][curRot];
    }

    const timer = setInterval(fun, 1000);

    function fun() {
        moveDown();
        if (canFreeze()) {
            freeze();
            dropNew();
        }
    }

    function canFreeze() {
        const n = squares.length;
        const isAtBottomEdge = cur.some((index) => {
            return curPos + index <= n - 1 && curPos + index >= n - w;
        });

        if (isAtBottomEdge) return 1;

        const isBottomTaken = cur.some((index) => {
            return squares[curPos + w + index].classList.contains('taken');
        });

        if (isBottomTaken) return 1;

        return 0;

        // undraw();
        // curPos += w;
        // draw();
    }

    function freeze() {
        cur = tetraminoes[curTet][curRot];

        cur.forEach((index) => {
            squares[curPos + index].classList.add('taken');
            // squares[curPos + index].style.backgroundColor = colBase;
            // console.log(squares[curPos + index]);
        });
    }

    function dropNew() {
        // curPos = 4;
        // curTet = Math.floor(Math.random() * tetraminoes.length);
        // curRot = 0;
        // cur = tetraminoes[curTet][curRot];
        curPos = 4;
        genNew();
        const isTaken = checkOver();
        if (!isTaken) {
            draw();
        } else {
            alert(`Game Over : Your score is ${score}`);
            clearInterval(timer);
        }
    }

    function checkOver() {
        const isTaken = cur.some((index) => {
            return squares[curPos + index].classList.contains('taken');
        });
        return isTaken;
    }

    function checkScore() {}
});
