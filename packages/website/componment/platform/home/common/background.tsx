import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import SimplexNoise from "simplex-noise";
import { useEffect } from "react";
import { Box } from "@chakra-ui/layout";

const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

// return a random number within a range
function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(
  n: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

// Create a new simplex noise instance
const simplex = new SimplexNoise();

const randomColor = () => {
  const colorChoices = ["#2200dd", "#4f06f9", "#d006f9"];
  // pick a random color
  return colorChoices[~~random(0, colorChoices.length)].replace(
    "#",
    "0x"
  ) as any;
};

// Orb class
class Orb {
  bounds: { x: { min: number; max: number }; y: { min: number; max: number } };
  x: any;
  y: any;
  scale: number;
  fill: number;
  radius: any;
  xOff: any;
  yOff: any;
  inc: number;
  graphics: PIXI.Graphics;
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // what color is the orb?
    this.fill = fill;

    // the original radius of the orb, set relative to window height
    this.radius =
      window.innerWidth < 1000
        ? random(window.innerHeight / 8, window.innerHeight / 4)
        : random(window.innerHeight / 6, window.innerHeight / 3);

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    // how quickly the noise/self similar random values step through time
    this.inc = window.innerWidth < 1000 ? 0.002 : 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;
  }

  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerHeight / 8 : window.innerWidth / 5;
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX =
      window.innerWidth < 1000 ? window.innerWidth / 2 : window.innerWidth / 2;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight / 2
        : window.innerHeight / 2;

    // allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist,
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist,
      },
    };
  }

  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // clear anything currently drawn to graphics
    this.graphics.clear();

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}

class BackgroundManager {
  app: PIXI.Application | null | undefined;
  orbs: any[] | undefined;

  init() {
    if (this.app) return;
    // Create PixiJS app
    this.app = new PIXI.Application({
      view:
        document.querySelector(".orb-canvas") === null
          ? undefined
          : (document.querySelector(".orb-canvas") as any),
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: undefined,
      transparent: true,
    });

    this.app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

    // Create orbs
    this.orbs = [];

    for (let i = 0; i < 10; i++) {
      const orb = new Orb(randomColor());

      this.app.stage.addChild(orb.graphics);

      this.orbs.push(orb);
    }

    // Animate!
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.app.ticker.add(() => {
        this.orbs?.forEach((orb) => {
          orb.update();
          orb.render();
        });
      });
    } else {
      this.orbs.forEach((orb) => {
        orb.update();
        orb.render();
      });
    }
  }

  destroy() {
    if (this.app) return;
    (this.app as any)?.destroy?.();
    this.app = undefined;
    this.orbs = undefined;
  }
}
const bg = new BackgroundManager();

export const Background = () => {
  useEffect(() => {
    bg.init();
    return () => {
      bg.destroy();
    };
  });
  return (
    <Box w="100%" h="100%" overflow="hidden">
      <canvas className="orb-canvas"></canvas>
    </Box>
  );
};

export default Background;
