import { useEffect } from 'react';

interface AirHockeySimulationProps {
  onFrame: (frame: string[]) => void;
  onComplete: () => void;
}

const AirHockeySimulation: React.FC<AirHockeySimulationProps> = ({
  onFrame,
  onComplete
}) => {
  useEffect(() => {
    const WIDTH = 30;
    const HEIGHT = 9;
    const PADDLE_HEIGHT = 3;
    const MAX_TICKS = 120;

    let puck = { x: 15, y: 4, dx: 1, dy: 1 };
    let leftPaddleY = 3;
    let rightPaddleY = 3;
    let ticks = 0;

    const renderFrame = () => {
      const top = '+' + '-'.repeat(WIDTH) + '+';
      const bottom = top;
      const lines = [top];

      for (let y = 0; y < HEIGHT; y++) {
        let row = '';
        for (let x = 0; x < WIDTH; x++) {
          if (x === 0 && y >= leftPaddleY && y < leftPaddleY + PADDLE_HEIGHT) {
            row += '|';
          } else if (x === WIDTH - 1 && y >= rightPaddleY && y < rightPaddleY + PADDLE_HEIGHT) {
            row += '|';
          } else if (x === puck.x && y === puck.y) {
            row += '●';
          } else {
            row += ' ';
          }
        }
        lines.push('|' + row + '|');
      }

      lines.push(bottom);
      onFrame(lines);
    };

    const loop = setInterval(() => {
      if (puck.y + puck.dy < 0 || puck.y + puck.dy >= HEIGHT) puck.dy *= -1;

      if (
        puck.x + puck.dx === 1 &&
        puck.y >= leftPaddleY &&
        puck.y < leftPaddleY + PADDLE_HEIGHT
      ) puck.dx *= -1;

      if (
        puck.x + puck.dx === WIDTH - 2 &&
        puck.y >= rightPaddleY &&
        puck.y < rightPaddleY + PADDLE_HEIGHT
      ) puck.dx *= -1;

      puck.x += puck.dx;
      puck.y += puck.dy;

      if (rightPaddleY + 1 < puck.y && rightPaddleY + PADDLE_HEIGHT < HEIGHT)
        rightPaddleY++;
      else if (rightPaddleY > puck.y && rightPaddleY > 0)
        rightPaddleY--;

      renderFrame();
      ticks++;

      if (puck.x <= 0) {
        onFrame(['GOAL! Player 2 scores.']);
        clearInterval(loop);
        onComplete();
      } else if (puck.x >= WIDTH - 1) {
        onFrame(['GOAL! Rushist scores.']);
        clearInterval(loop);
        onComplete();
      } else if (ticks >= MAX_TICKS) {
        onFrame(['Draw. No winner.']);
        clearInterval(loop);
        onComplete();
      }
    }, 120);

    return () => clearInterval(loop);
  }, [onFrame, onComplete]);

  return null;
};

export default AirHockeySimulation;
