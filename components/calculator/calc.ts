import type { DoseUnit } from '@/lib/peptides';

// Converte valor de dose para miligramas (mg).
// UI é uma aproximação — varia por peptídeo na prática.
export function doseToMg(dose: number, unit: DoseUnit): number {
  if (!isFinite(dose)) return NaN;
  return unit === 'mcg' || unit === 'UI' ? dose / 1000 : dose;
}

export type CalcResult = {
  waterMl: number;
  concentration: number;     // mg/ml
  unitsPerDose: number;      // seringa base 100 U/ml
  dosesPerVial: number;
};

/**
 * Cálculo por volume: usuário informa água a adicionar.
 * Fórmulas idênticas ao site original:
 *   unidades = dose_mg * água_ml * 100 / mg_frasco
 *   concentração = mg_frasco / água_ml
 *   doses = mg_frasco / dose_mg
 */
export function calcByVolume(
  mg: number,
  waterMl: number,
  doseMg: number
): CalcResult | null {
  if (!(mg > 0 && waterMl > 0 && doseMg > 0)) return null;
  return {
    waterMl,
    concentration: mg / waterMl,
    unitsPerDose: (doseMg * waterMl * 100) / mg,
    dosesPerVial: mg / doseMg,
  };
}

/**
 * Cálculo por unidades: usuário informa quantas unidades quer puxar.
 * Inverte a fórmula acima para achar a água necessária.
 */
export function calcByUnits(
  mg: number,
  units: number,
  doseMg: number
): CalcResult | null {
  if (!(mg > 0 && units > 0 && doseMg > 0)) return null;
  const waterMl = (units * mg) / (doseMg * 100);
  return {
    waterMl,
    concentration: mg / waterMl,
    unitsPerDose: units,
    dosesPerVial: mg / doseMg,
  };
}

// Formatadores usados na UI
export function fmt(n: number | null | undefined, dec = 1): string {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const v = Math.round(n * 10 ** dec) / 10 ** dec;
  return v.toLocaleString('pt-BR', { maximumFractionDigits: dec });
}

export function fmtConcentration(n: number | null | undefined): string {
  if (n === null || n === undefined || isNaN(n)) return '—';
  if (n < 1) return fmt(n, 4);
  if (n < 10) return fmt(n, 3);
  return fmt(n, 2);
}
