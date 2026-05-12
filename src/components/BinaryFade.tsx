import type { CSSProperties } from 'react';

import './BinaryFade.css';

export type BinaryFadeDirection =
  | 'left-to-right'
  | 'right-to-left'
  | 'top-to-bottom'
  | 'bottom-to-top';

type BinaryFadeLine = {
  id: number;
  digits: string;
  offset: number;
};

export type BinaryFadeProps = {
  /** Direction from the start edge to the blurred disappearing edge. */
  direction?: BinaryFadeDirection;
  /** Number of independent binary lines/columns to render. */
  lines?: number;
  /** Minimum amount of sharp digits before the fade tail. */
  minDigits?: number;
  /** Maximum amount of sharp digits before the fade tail. */
  maxDigits?: number;
  /** Number of digits in each of the three blur levels. */
  fadeDigits?: number;
  /** Seed used to keep the generated static binary pattern deterministic. */
  seed?: number;
  className?: string;
};

const lengthRatios = [0.48, 0.78, 0.6, 0.92, 0.68, 0.54, 0.86, 0.72, 1, 0.58, 0.8, 0.64];
const offsetRatios = [0, 0.09, 0.03, 0.15, 0.06, 0.2, 0.11, 0.01, 0.17, 0.07, 0.13, 0.04];

function makeDigits(length: number, seed: number) {
  let value = seed || 1;
  let result = '';

  for (let index = 0; index < length; index += 1) {
    value = (value * 1664525 + 1013904223 + index) % 4294967296;
    result += value % 7 < 3 ? '0' : '1';
  }

  return result;
}

function makeLines({
  lines,
  minDigits,
  maxDigits,
  fadeDigits,
  seed,
}: Required<Pick<BinaryFadeProps, 'lines' | 'minDigits' | 'maxDigits' | 'fadeDigits' | 'seed'>>): BinaryFadeLine[] {
  const safeLineCount = Math.max(1, lines);
  const safeMinDigits = Math.max(1, minDigits);
  const safeMaxDigits = Math.max(safeMinDigits, maxDigits);
  const sharpRange = safeMaxDigits - safeMinDigits;

  return Array.from({ length: safeLineCount }, (_, index) => {
    const ratio = lengthRatios[index % lengthRatios.length];
    const sharpLength = safeMinDigits + Math.round(sharpRange * ratio);
    const totalLength = sharpLength + fadeDigits * 3;

    return {
      id: index,
      digits: makeDigits(totalLength, seed + index * 97),
      offset: Math.round(offsetRatios[index % offsetRatios.length] * 100),
    };
  });
}

export function BinaryFade({
  direction = 'left-to-right',
  lines = 18,
  minDigits = 8,
  maxDigits = 34,
  fadeDigits = 6,
  seed = 42,
  className = '',
}: BinaryFadeProps) {
  const safeFadeDigits = Math.max(1, fadeDigits);
  const generatedLines = makeLines({ lines, minDigits, maxDigits, fadeDigits: safeFadeDigits, seed });
  const isVertical = direction === 'top-to-bottom' || direction === 'bottom-to-top';
  const isReverse = direction === 'right-to-left';

  return (
    <div
      aria-hidden="true"
      className={["binary-fade", `binary-fade--${direction}`, className].filter(Boolean).join(' ')}
      data-direction={direction}
    >
      {generatedLines.map((line) => {
        const sharp = line.digits.slice(0, -safeFadeDigits * 3);
        const fadeOne = line.digits.slice(-safeFadeDigits * 3, -safeFadeDigits * 2);
        const fadeTwo = line.digits.slice(-safeFadeDigits * 2, -safeFadeDigits);
        const fadeThree = line.digits.slice(-safeFadeDigits);
        const marginProp = isVertical ? '--binary-line-offset-x' : '--binary-line-offset-y';

        return (
          <span
            className="binary-fade__line"
            key={line.id}
            style={{ [marginProp]: `${line.offset}%` } as CSSProperties}
          >
            {(isReverse ? [fadeThree, fadeTwo, fadeOne, sharp] : [sharp, fadeOne, fadeTwo, fadeThree]).map(
              (chunk, chunkIndex) => (
                <span
                  className={chunkIndex === (isReverse ? 3 : 0) ? 'binary-fade__sharp' : `binary-fade__blur binary-fade__blur--${isReverse ? 3 - chunkIndex : chunkIndex}`}
                  key={`${line.id}-${chunkIndex}`}
                >
                  {chunk}
                </span>
              ),
            )}
          </span>
        );
      })}
    </div>
  );
}
