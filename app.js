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
  let curRot = 0;
  let random = Math.floor(Math.random() * tetraminoes.length);
  let cur = tetraminoes[random][0];
  console.log(cur);
  function draw() {
    cur.forEach((index) => {
      squares[curPos + index].classList.add('tetramino');
      squares[curPos + index].style.backgroundColor = 'red';
      // console.log(squares[curPos + index]);
    });
  }
  function undraw() {
    cur.forEach((index) => {
      squares[curPos + index].classList.remove('tetramino');
      squares[curPos + index].style.background = 'yellow';
    });
  }
  draw();

  //make the tetraminoes move down every second
  timerId = setInterval(fallDown, 1000);

  function fallDown() {
    undraw();
    curPos += w;
    draw();
    if (freeze() === 1) dropNew();
    // freeze();
  }

  function freeze() {
    if (
      cur.some((index) =>
        squares[curPos + index + w].classList.contains('taken')
      )
    ) {
      cur.forEach((index) => squares[curPos + index].classList.add('taken'));
      return 1;
    }
    return 0;
  }

  function dropNew() {
    random = Math.floor(Math.random() * tetraminoes.length);
    cur = tetraminoes[random][curRot];
    curPos = 4;
    draw();
  }
  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowDown') {
      moveDown();
    }
  }

  document.addEventListener('keyup', control);
  //move left unless at edge or there is a blockage
  function moveLeft() {
    undraw();

    const isAtLeftEdge = cur.some((index) => {
      return (curPos + index) % w === 0;
    });
    if (!isAtLeftEdge) curPos -= 1;

    const leftIsTaken = cur.some((index) => {
      return squares[curPos + index].classList.contains('taken');
    });
    if (leftIsTaken) curPos += 1;

    draw();
    // console.log('Move Left');
  }
  function moveRight() {
    undraw();
    const isAtRightEdge = cur.some((index) => {
      return (curPos + index) % w === w - 1;
    });
    if (!isAtRightEdge) curPos += 1;

    const rightIsTaken = cur.some((index) => {
      return squares[curPos + index].classList.contains('taken');
    });
    if (rightIsTaken) curPos -= 1;

    draw();
    // console.log('Move Right');
  }
  function moveDown() {
    undraw();
    // const isAtRightEdge = cur.some((index) => {
    //   return (curPos + index) % w === w - 1;
    // });
    // if (!isAtRightEdge) curPos += 1;
    curPos += w;
    const downIsTaken = cur.some((index) => {
      return squares[curPos + index].classList.contains('taken');
    });
    if (downIsTaken) curPos -= w;

    draw();
    // console.log('Move Right');
  }
});
