import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const BouncingBalls = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Создаем физический движок
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Создаем рендер
    const render = Matter.Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: '#2C372E', // Изменен фон
      },
    });

    Matter.Render.run(render);
    Matter.Runner.run(Matter.Runner.create(), engine);

    // Границы контейнера
    const walls = [
      Matter.Bodies.rectangle(300, 0, 600, 10, {
        isStatic: true,
        render: { visible: false },
      }), // Верхняя
      Matter.Bodies.rectangle(300, 400, 600, 10, {
        isStatic: true,
        render: { visible: false },
      }), // Нижняя
      Matter.Bodies.rectangle(0, 200, 10, 400, {
        isStatic: true,
        render: { visible: false },
      }), // Левая
      Matter.Bodies.rectangle(600, 200, 10, 400, {
        isStatic: true,
        render: { visible: false },
      }), // Правая
    ];
    Matter.World.add(world, walls);

    // Создаем мячи
    const createBall = (x, y, color, label) => {
      return Matter.Bodies.circle(x, y, 60, {
        restitution: 1, // Полностью упругий отскок
        friction: 0, // Без трения
        frictionAir: 0, // Без сопротивления воздуха
        render: {
          fillStyle: color,
        },
        label,
      });
    };

    const ballA = createBall(150, 200, '#7e22ce', 'Ball A');
    const ballB = createBall(450, 200, '#9FB3A2', 'Ball B'); // Изменен цвет

    // Добавляем начальную скорость мячам
    Matter.Body.setVelocity(ballA, { x: 1, y: 0.75 });
    Matter.Body.setVelocity(ballB, { x: -1, y: -0.75 });

    Matter.World.add(world, [ballA, ballB]);

    // Обеспечиваем постоянную скорость после столкновения
    const maintainVelocity = (ball, minSpeed = 0.75) => {
      const velocity = ball.velocity;
      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

      if (speed < minSpeed) {
        const scaleFactor = minSpeed / speed;
        Matter.Body.setVelocity(ball, {
          x: velocity.x * scaleFactor,
          y: velocity.y * scaleFactor,
        });
      }
    };

    Matter.Events.on(engine, 'afterUpdate', () => {
      maintainVelocity(ballA);
      maintainVelocity(ballB);
    });

    // Добавляем текст на мячи
    const addTextToBall = (ball, text) => {
      const textEl = document.createElement('div');
      textEl.innerText = text;
      textEl.style.position = 'absolute';
      textEl.style.color = 'white';
      textEl.style.fontSize = '20px';
      textEl.style.pointerEvents = 'none';
      containerRef.current.appendChild(textEl);

      // Синхронизация текста с положением мяча
      Matter.Events.on(engine, 'afterUpdate', () => {
        const { x, y } = ball.position;
        textEl.style.transform = `translate(${x - 30}px, ${y - 10}px)`; // Центрируем текст
      });
    };

    addTextToBall(ballA, 'Ball A');
    addTextToBall(ballB, 'Ball B');

    // Удаляем рендер и движок при размонтировании компонента
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '600px', height: '400px' }} />;
};

export default BouncingBalls;
