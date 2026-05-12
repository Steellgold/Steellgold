# Binary Fade React Component

Composant React statique qui affiche des lignes de chiffres binaires avec trois niveaux de flou à l'extrémité, pour donner l'impression que les chiffres disparaissent progressivement.

## Installation

```bash
npm install
npm run dev
```

## Utilisation

```tsx
import { BinaryFade } from './components/BinaryFade';

export function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <BinaryFade direction="left-to-right" />
      <h1>CONSORGIUM</h1>
    </section>
  );
}
```

Le composant prend toute la taille de son parent grâce à `position: absolute`, `width: 100%` et `height: 100%`. Le parent doit donc être positionné (`position: relative`) et masqué (`overflow: hidden`) si l'on veut couper proprement les chiffres aux bords.

## Props principales

| Prop | Type | Défaut | Description |
| --- | --- | --- | --- |
| `direction` | `'left-to-right' \| 'right-to-left' \| 'top-to-bottom' \| 'bottom-to-top'` | `'left-to-right'` | Définit le bord de départ et le bord vers lequel les chiffres disparaissent. |
| `lines` | `number` | `18` | Nombre de lignes ou colonnes binaires. |
| `minDigits` | `number` | `8` | Nombre minimum de chiffres nets sur une ligne. |
| `maxDigits` | `number` | `34` | Nombre maximum de chiffres nets sur une ligne. |
| `fadeDigits` | `number` | `6` | Nombre de chiffres dans chacun des trois niveaux de flou. |
| `seed` | `number` | `42` | Graine déterministe pour garder un rendu statique mais personnalisable. |
| `className` | `string` | `''` | Classe CSS additionnelle. |

## Comportement

- Les chiffres sont générés une seule fois de manière déterministe, sans animation.
- Chaque ligne a une longueur différente pour obtenir un rendu organique.
- Les lignes démarrent réellement depuis le bord de leur conteneur selon `direction`.
- La fin de chaque ligne contient trois segments de flou progressif : léger, moyen, fort.
