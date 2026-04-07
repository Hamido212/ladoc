'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface MathPaletteProps {
  onInsert: (symbol: string) => void;
}

const CATEGORIES = {
  greek: {
    label: 'greekLetters',
    symbols: [
      { label: 'α', value: 'alpha' },
      { label: 'β', value: 'beta' },
      { label: 'γ', value: 'gamma' },
      { label: 'δ', value: 'delta' },
      { label: 'ε', value: 'epsilon' },
      { label: 'ζ', value: 'zeta' },
      { label: 'η', value: 'eta' },
      { label: 'θ', value: 'theta' },
      { label: 'λ', value: 'lambda' },
      { label: 'μ', value: 'mu' },
      { label: 'π', value: 'pi' },
      { label: 'ρ', value: 'rho' },
      { label: 'σ', value: 'sigma' },
      { label: 'τ', value: 'tau' },
      { label: 'φ', value: 'phi' },
      { label: 'ω', value: 'omega' },
      { label: 'Γ', value: 'Gamma' },
      { label: 'Δ', value: 'Delta' },
      { label: 'Θ', value: 'Theta' },
      { label: 'Λ', value: 'Lambda' },
      { label: 'Π', value: 'Pi' },
      { label: 'Σ', value: 'Sigma' },
      { label: 'Φ', value: 'Phi' },
      { label: 'Ω', value: 'Omega' },
    ],
  },
  operators: {
    label: 'operators',
    symbols: [
      { label: '±', value: 'plus.minus' },
      { label: '∓', value: 'minus.plus' },
      { label: '×', value: 'times' },
      { label: '÷', value: 'div' },
      { label: '·', value: 'dot' },
      { label: '∘', value: 'compose' },
      { label: '⊕', value: 'oplus' },
      { label: '⊗', value: 'otimes' },
    ],
  },
  relations: {
    label: 'relations',
    symbols: [
      { label: '≠', value: 'eq.not' },
      { label: '≈', value: 'approx' },
      { label: '≤', value: 'lt.eq' },
      { label: '≥', value: 'gt.eq' },
      { label: '≪', value: 'lt.lt' },
      { label: '≫', value: 'gt.gt' },
      { label: '∝', value: 'prop' },
      { label: '∼', value: 'tilde.op' },
      { label: '≡', value: 'equiv' },
      { label: '⊂', value: 'subset' },
      { label: '⊃', value: 'supset' },
      { label: '∈', value: 'in' },
      { label: '∉', value: 'in.not' },
      { label: '∀', value: 'forall' },
      { label: '∃', value: 'exists' },
    ],
  },
  templates: {
    label: 'templates',
    symbols: [
      { label: 'a/b', value: 'a / b' },
      { label: 'x²', value: 'x^2' },
      { label: 'xₙ', value: 'x_n' },
      { label: '√x', value: 'sqrt(x)' },
      { label: 'ⁿ√x', value: 'root(n, x)' },
      { label: '∑', value: 'sum_(i=0)^n' },
      { label: '∏', value: 'product_(i=0)^n' },
      { label: '∫', value: 'integral_a^b' },
      { label: '∮', value: 'integral.cont' },
      { label: 'lim', value: 'lim_(x -> oo)' },
      { label: '(ⁿₖ)', value: 'binom(n, k)' },
      { label: '[⋯]', value: 'mat(a, b; c, d)' },
      { label: '|x|', value: 'abs(x)' },
      { label: '‖x‖', value: 'norm(x)' },
      { label: '→', value: 'arrow.r' },
      { label: '⟶', value: 'arrow.r.long' },
    ],
  },
  accents: {
    label: 'accents',
    symbols: [
      { label: 'x̂', value: 'hat(x)' },
      { label: 'x̄', value: 'overline(x)' },
      { label: 'x̃', value: 'tilde(x)' },
      { label: 'ẋ', value: 'dot(x)' },
      { label: 'ẍ', value: 'dot.double(x)' },
      { label: 'x⃗', value: 'arrow(x)' },
    ],
  },
};

export function MathPalette({ onInsert }: MathPaletteProps) {
  const t = useTranslations('math');
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>('templates');

  const category = CATEGORIES[activeCategory];

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-1 mb-2 border-b pb-2 overflow-x-auto">
        {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
              activeCategory === key
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {t(CATEGORIES[key].label)}
          </button>
        ))}
      </div>

      {/* Symbol grid */}
      <div className="grid grid-cols-8 gap-1">
        {category.symbols.map((sym) => (
          <button
            key={sym.value}
            onClick={() => onInsert(sym.value)}
            title={sym.value}
            className="p-2 text-center text-sm rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors font-mono"
          >
            {sym.label}
          </button>
        ))}
      </div>
    </div>
  );
}
