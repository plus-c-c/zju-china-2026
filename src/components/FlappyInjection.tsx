import { useEffect, useRef, useState } from "react";
import "./FlappyInjection.css";

/**
 * Mini game: a Flappy-Bird-style run through healthy bones. Passing each bone
 * pair advances the injection progress shown in the bottom-right corner; when
 * the syringe is fully injected the player wins. All project artwork is served
 * from static.igem.wiki.
 */
const ASSETS = "https://static.igem.wiki/teams/6102/wiki/images/home";

const W = 960;
const H = 520;
const GROUND = 64;
const PIPE_W = 92;
const PIPE_GAP = 176;
const BONE_H = Math.round((PIPE_W * 1132) / 1390);
const BIRD_W = 62;
const BIRD_H = Math.round((BIRD_W * 1640) / 2360);
const SPEED = 180;
const GRAVITY = 1500;
const FLAP_VY = -430;
const TOTAL_BONES = 5;

type Phase = "ready" | "playing" | "over" | "won";

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
  seed: number;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function FlappyInjection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const flapRef = useRef<() => void>(() => {});
  const [phase, setPhase] = useState<Phase>("ready");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const bird = { x: 250, y: H / 2 - 40, vy: 0 };
    let pipes: Pipe[] = [];
    let passed = 0;
    let spawnTimer = 0;
    let elapsed = 0;
    let raf = 0;
    let last = performance.now();

    const birdImg = new Image();
    birdImg.src = `${ASSETS}/home-heading-bird.avif`;
    const boneImg = new Image();
    boneImg.src = `${ASSETS}/bird-return-bone-2.avif`;

    const reset = () => {
      bird.y = H / 2 - 40;
      bird.vy = 0;
      pipes = [];
      passed = 0;
      spawnTimer = 0;
      setProgress(0);
    };

    const flap = () => {
      if (phaseRef.current === "playing") {
        bird.vy = FLAP_VY;
      } else {
        reset();
        bird.vy = FLAP_VY;
        setPhase("playing");
      }
    };
    flapRef.current = flap;

    const spawn = () => {
      /* margin 76 保证下管的骨端与骨柄始终在地面之上（避免骨柄高度为负） */
      const margin = 76;
      const gapY =
        margin +
        PIPE_GAP / 2 +
        Math.random() * (H - GROUND - margin * 2 - PIPE_GAP);
      pipes.push({ x: W + 60, gapY, passed: false, seed: Math.random() * 100 });
    };

    const hitPipe = (pipe: Pipe) => {
      const bx = bird.x - BIRD_W / 2 + 8;
      const bw = BIRD_W - 16;
      const by = bird.y - BIRD_H / 2 + 5;
      const bh = BIRD_H - 10;
      if (bx + bw < pipe.x || bx > pipe.x + PIPE_W) return false;
      const gapTop = pipe.gapY - PIPE_GAP / 2;
      const gapBottom = pipe.gapY + PIPE_GAP / 2;
      return by < gapTop || by + bh > gapBottom;
    };

    const update = (dt: number) => {
      const current = phaseRef.current;
      elapsed += dt;
      if (current === "ready") {
        bird.y = H / 2 - 40 + Math.sin(elapsed * 3) * 10;
        return;
      }
      if (current === "playing") {
        bird.vy += GRAVITY * dt;
        bird.y += bird.vy * dt;
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawn();
          spawnTimer = 1.55;
        }
        for (const pipe of pipes) {
          pipe.x -= SPEED * dt;
          if (!pipe.passed && pipe.x + PIPE_W < bird.x - BIRD_W / 2) {
            pipe.passed = true;
            passed += 1;
            setProgress(Math.min(passed / TOTAL_BONES, 1));
            if (passed >= TOTAL_BONES) setPhase("won");
          }
        }
        pipes = pipes.filter((pipe) => pipe.x > -PIPE_W - 60);
        if (
          bird.y + BIRD_H / 2 > H - GROUND ||
          bird.y - BIRD_H / 2 < 0 ||
          pipes.some(hitPipe)
        ) {
          setPhase("over");
        }
        return;
      }
      if (current === "over") {
        bird.vy += GRAVITY * dt;
        bird.y = Math.min(bird.y + bird.vy * dt, H - GROUND - BIRD_H / 2);
      }
    };

    const drawBonePipe = (pipe: Pipe) => {
      const gapTop = pipe.gapY - PIPE_GAP / 2;
      const gapBottom = pipe.gapY + PIPE_GAP / 2;
      const x = pipe.x;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#dcc097";
      ctx.fillStyle = "#f5e2bf";
      // 上管：骨端翻转（关节面朝向间隙）
      const topShaftH = Math.max(gapTop - BONE_H, 0);
      roundRect(ctx, x, -8, PIPE_W, Math.max(topShaftH + 8, 8), 10);
      ctx.fill();
      ctx.stroke();
      if (boneImg.complete && boneImg.naturalWidth) {
        ctx.save();
        ctx.translate(x + PIPE_W / 2, gapTop - BONE_H / 2);
        ctx.rotate(Math.PI);
        ctx.drawImage(boneImg, -PIPE_W / 2, -BONE_H / 2, PIPE_W, BONE_H);
        ctx.restore();
      }
      // 下管：骨端正向
      const bottomTop = gapBottom + BONE_H;
      roundRect(
        ctx,
        x,
        bottomTop,
        PIPE_W,
        Math.max(H - GROUND - bottomTop + 8, 8),
        10,
      );
      ctx.fill();
      ctx.stroke();
      if (boneImg.complete && boneImg.naturalWidth) {
        ctx.drawImage(boneImg, x, gapBottom, PIPE_W, BONE_H);
      }
      // 骨孔纹理
      ctx.fillStyle = "#e9d2a9";
      for (let i = 0; i < 6; i++) {
        const px = x + 22 + ((pipe.seed * 31 + i * 47) % (PIPE_W - 44));
        const pyTop = 14 + ((pipe.seed * 53 + i * 67) % Math.max(topShaftH - 30, 1));
        ctx.beginPath();
        ctx.ellipse(px, pyTop, 4.5, 6.5, 0, 0, Math.PI * 2);
        ctx.fill();
        const pyBottom =
          bottomTop + 14 + ((pipe.seed * 67 + i * 41) % Math.max(H - GROUND - bottomTop - 30, 1));
        ctx.beginPath();
        ctx.ellipse(px, pyBottom, 4.5, 6.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCloud = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x + r * 0.9, y + r * 0.15, r * 0.72, 0, Math.PI * 2);
      ctx.arc(x - r * 0.9, y + r * 0.2, r * 0.65, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.fillStyle = "#ebf1fa";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      for (const [baseX, cy, r] of [
        [150, 92, 24],
        [250, 92, 16],
        [640, 150, 28],
        [730, 150, 18],
      ] as const) {
        const span = W + 200;
        const drift = (((baseX - elapsed * 16) % span) + span) % span;
        drawCloud(drift - 100, cy, r);
      }
      for (const pipe of pipes) drawBonePipe(pipe);
      ctx.fillStyle = "#f0e2c4";
      ctx.fillRect(0, H - GROUND, W, GROUND);
      ctx.fillStyle = "#dcc097";
      ctx.fillRect(0, H - GROUND, W, 4);
      if (birdImg.complete && birdImg.naturalWidth) {
        const rot = Math.max(-0.45, Math.min(1.1, bird.vy / 650));
        ctx.save();
        ctx.translate(bird.x, bird.y);
        ctx.rotate(rot);
        ctx.drawImage(birdImg, -BIRD_W / 2, -BIRD_H / 2, BIRD_W, BIRD_H);
        ctx.restore();
      } else {
        ctx.fillStyle = "#4f9df1";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, 16, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      /* 单帧异常不应中断动画循环（防止游戏卡死） */
      try {
        update(dt);
        draw();
      } catch (error) {
        console.error("FlappyInjection frame error:", error);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    observer.observe(canvas);
    const onKey = (event: KeyboardEvent) => {
      if (!inView) return;
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="flappy">
      <canvas
        ref={canvasRef}
        onClick={() => flapRef.current()}
        aria-label="Mini game: fly between the bones and complete the injection"
      />
      {phase === "ready" && (
        <div className="flappy__overlay flappy__overlay--soft">
          <p className="flappy__overlay-title">Inject the cartilage</p>
          <p className="flappy__overlay-text">
            Click / tap / press Space to fly. Pass {TOTAL_BONES} healthy bones
            to finish the injection.
          </p>
        </div>
      )}
      {phase === "over" && (
        <div className="flappy__overlay flappy__overlay--soft">
          <p className="flappy__overlay-title">GAME OVER</p>
          <p className="flappy__overlay-text">
            Click / tap / press Space to retry.
          </p>
        </div>
      )}
      {phase === "won" && (
        <div className="flappy__overlay flappy__overlay--win">
          <p className="flappy__overlay-title">YOU WIN!</p>
          <p className="flappy__overlay-text">
            Injection complete — the cartilage is repaired.
          </p>
          <p className="flappy__overlay-text">
            Click / tap / press Space to play again.
          </p>
        </div>
      )}
      <div className="inject" aria-hidden="true">
        <div className="inject__syringe">
          <div className="inject__syringe-inner">
            <img src={`${ASSETS}/home-05-solution-syringe.avif`} alt="" />
            <div className="inject__blocks">
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  className={`inject__block${
                    progress * TOTAL_BONES > index + 0.5
                      ? " inject__block--on"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="inject__bone">
          <div className="inject__bone-inner">
            <img src={`${ASSETS}/home-05-solution-bone.avif`} alt="" />
            <span
              className="inject__damage"
              style={{ opacity: 1 - progress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
