/* =========================================================
   PeptideCalc — App Logic
   Resultados em tempo real, sem botão "Calcular".
   ========================================================= */
(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  const state = {
    peptide:  null,    // objeto do peptídeo selecionado
    mg:       null,    // mg no frasco
    waterMl:  null,    // água em ml (modo volume)
    units:    null,    // unidades desejadas (modo units)
    dose:     null,    // dose por injeção (na unidade do peptídeo)
    syringe:  50,      // 30 | 50 | 100
    mode:    'volume'  // 'volume' | 'units'
  };

  // ── DOM helpers ─────────────────────────────────────────
  const $  = (id) => document.getElementById(id);
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  // ── Element refs ────────────────────────────────────────
  const el = {
    // combobox
    comboTrigger:   $('combo-trigger'),
    comboDisplay:   $('combo-display'),
    comboDropdown:  $('combo-dropdown'),
    comboSearch:    $('combo-search'),
    comboList:      $('combo-list'),
    comboCustomBtn: $('combo-custom-btn'),
    // custom form
    customForm:     $('custom-form'),
    customName:     $('custom-name'),
    customDose:     $('custom-dose'),
    customUnit:     $('custom-unit'),
    customAdd:      $('custom-add'),
    // peptide pill
    peptidePill:    $('peptide-pill'),
    pillName:       $('pill-name'),
    pillMeta:       $('pill-meta'),
    pillClear:      $('pill-clear'),
    // fields
    inputMg:        $('input-mg'),
    chipsMg:        $('chips-mg'),
    fieldWaterWrap: $('field-water-wrap'),
    inputWater:     $('input-water'),
    fieldUnitsWrap: $('field-units-wrap'),
    inputUnits:     $('input-units'),
    inputDose:      $('input-dose'),
    doseUnitLabel:  $('dose-unit-label'),
    chipsDose:      $('chips-dose'),
    modeTabs:       $$('.mode-tab'),
    syrTabs:        $$('.syr-tab'),
    // result
    resultEmpty:    $('result-empty'),
    resultCard:     $('result-card'),
    resPeptide:     $('res-peptide-name'),
    resUnits:       $('res-units'),
    resUnitsSub:    $('res-units-sub'),
    resConc:        $('res-conc'),
    resDoses:       $('res-doses'),
    resWater:       $('res-water'),
    metricWaterRow: $('metric-water-row'),
    syringeSvg:     $('syringe-svg'),
    alerts:         $('alerts'),
    btnCopy:        $('btn-copy'),
    // other
    tooltip:        $('tooltip'),
    toast:          $('toast'),
  };

  // ── Utils ───────────────────────────────────────────────
  function fmt(n, dec = 1) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    const v = Math.round(n * 10 ** dec) / 10 ** dec;
    return v.toLocaleString('pt-BR', { maximumFractionDigits: dec });
  }

  function fmtConc(n) {
    // show more precision for concentrations
    if (n === null || isNaN(n)) return '—';
    if (n < 1)  return fmt(n, 4);
    if (n < 10) return fmt(n, 3);
    return fmt(n, 2);
  }

  function doseToMg(dose, unit) {
    const d = parseFloat(dose);
    if (isNaN(d)) return NaN;
    return unit === 'mcg' || unit === 'UI' ? d / 1000 : d;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
    );
  }

  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.toast.classList.remove('show'), 2000);
  }

  // ── Calculations ────────────────────────────────────────
  function calcByVolume(mg, waterMl, doseMg) {
    if (!(mg > 0 && waterMl > 0 && doseMg > 0)) return null;
    return {
      waterMl,
      concentration:  mg / waterMl,
      unitsPerDose:   (doseMg * waterMl * 100) / mg,
      dosesPerVial:   mg / doseMg
    };
  }

  function calcByUnits(mg, units, doseMg) {
    if (!(mg > 0 && units > 0 && doseMg > 0)) return null;
    const waterMl = (units * mg) / (doseMg * 100);
    return {
      waterMl,
      concentration:  mg / waterMl,
      unitsPerDose:   units,
      dosesPerVial:   mg / doseMg
    };
  }

  function compute() {
    if (!state.peptide) return null;
    const doseMg = doseToMg(state.dose, state.peptide.doseUnit);
    if (state.mode === 'units')
      return calcByUnits(state.mg, state.units, doseMg);
    return calcByVolume(state.mg, state.waterMl, doseMg);
  }

  // ── Combobox ────────────────────────────────────────────
  let comboOpen = false;

  function openCombo() {
    comboOpen = true;
    el.comboTrigger.setAttribute('aria-expanded', 'true');
    el.comboDropdown.classList.remove('hidden');
    el.comboSearch.value = '';
    renderComboList('');
    requestAnimationFrame(() => el.comboSearch.focus());
  }

  function closeCombo() {
    comboOpen = false;
    el.comboTrigger.setAttribute('aria-expanded', 'false');
    el.comboDropdown.classList.add('hidden');
  }

  function toggleCombo() {
    comboOpen ? closeCombo() : openCombo();
  }

  function renderComboList(q) {
    const filter = q.trim().toLowerCase();
    const items = (window.PEPTIDES || []).filter((p) =>
      !filter || p.name.toLowerCase().includes(filter)
    );
    el.comboList.innerHTML = '';
    if (items.length === 0) {
      el.comboList.innerHTML = `<li class="combo-empty">Nenhum resultado. Use "Outro peptídeo" abaixo.</li>`;
      return;
    }
    items.forEach((p) => {
      const li = document.createElement('li');
      li.className = 'combo-item' + (state.peptide?.name === p.name ? ' selected' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '-1');
      li.innerHTML = `
        <div>
          <div class="ci-name">${esc(p.name)}</div>
          <div class="ci-freq">${esc(p.frequency)}</div>
        </div>
        <span class="ci-dose">${p.typicalDose} ${p.doseUnit}</span>
      `;
      li.addEventListener('mousedown', (e) => { e.preventDefault(); selectPeptide(p); });
      el.comboList.appendChild(li);
    });
  }

  function selectPeptide(p) {
    state.peptide = p;
    state.dose    = p.typicalDose;
    closeCombo();
    el.comboDisplay.textContent  = p.name;
    el.comboDisplay.className    = 'combo-display-text';
    el.peptidePill.classList.remove('hidden');
    el.pillName.textContent = p.name;
    el.pillMeta.textContent = `Dose típica: ${p.typicalDose} ${p.doseUnit} · ${p.frequency}`;

    // update dose field
    el.doseUnitLabel.textContent = p.doseUnit;
    el.inputDose.value = p.typicalDose;

    // dose chips (±50% of typical)
    renderDoseChips(p);

    // mg chips from commonAmounts
    el.chipsMg.innerHTML = '';
    const amounts = p.commonAmounts?.length ? p.commonAmounts : [5, 10];
    amounts.forEach((a) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = `${a} mg`;
      b.addEventListener('click', () => { el.inputMg.value = a; state.mg = a; recalc(); });
      el.chipsMg.appendChild(b);
    });
    // auto-fill first amount if only one
    if (amounts.length === 1 && !state.mg) {
      el.inputMg.value = amounts[0];
      state.mg = amounts[0];
    }

    recalc();
  }

  function renderDoseChips(p) {
    el.chipsDose.innerHTML = '';
    const d = p.typicalDose;
    const opts = d > 0 ? [d * 0.5, d, d * 1.5, d * 2].filter(v => v > 0) : [];
    opts.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = `${v} ${p.doseUnit}`;
      b.addEventListener('click', () => { el.inputDose.value = v; state.dose = v; recalc(); });
      el.chipsDose.appendChild(b);
    });
  }

  function clearPeptide() {
    state.peptide = null;
    state.dose    = null;
    el.comboDisplay.textContent = 'Buscar peptídeo…';
    el.comboDisplay.className   = 'combo-placeholder';
    el.peptidePill.classList.add('hidden');
    el.chipsMg.innerHTML = '';
    el.chipsDose.innerHTML = '';
    el.inputDose.value = '';
    el.doseUnitLabel.textContent = 'mg';
    recalc();
  }

  function addCustomPeptide() {
    const name = (el.customName.value || '').trim();
    const dose = parseFloat(el.customDose.value);
    const unit = el.customUnit.value;
    if (!name)        { showToast('Informe o nome do peptídeo.'); el.customName.focus(); return; }
    if (!(dose > 0))  { showToast('Informe uma dose típica válida.'); el.customDose.focus(); return; }
    const p = { name, typicalDose: dose, doseUnit: unit, frequency: 'Conforme orientação', description: '', commonAmounts: [] };
    selectPeptide(p);
    el.customForm.classList.add('hidden');
    el.customForm.setAttribute('hidden', '');
    el.customName.value = '';
    el.customDose.value = '';
    showToast('Peptídeo adicionado.');
  }

  // ── Mode switching ───────────────────────────────────────
  function setMode(mode) {
    state.mode = mode;
    el.modeTabs.forEach((t) => {
      const active = t.dataset.mode === mode;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    if (mode === 'units') {
      el.fieldWaterWrap.classList.add('hidden');
      el.fieldUnitsWrap.classList.remove('hidden');
      // show water metric row with calculated value
      el.metricWaterRow.classList.remove('hidden');
    } else {
      el.fieldWaterWrap.classList.remove('hidden');
      el.fieldUnitsWrap.classList.add('hidden');
      // hide water row (input is shown in form)
      el.metricWaterRow.classList.add('hidden');
    }
    recalc();
  }

  // ── Syringe tabs ────────────────────────────────────────
  function setSyringe(n) {
    state.syringe = n;
    el.syrTabs.forEach((b) => {
      const active = parseInt(b.dataset.syringe, 10) === n;
      b.classList.toggle('active', active);
      b.setAttribute('aria-checked', active);
    });
    recalc();
  }

  // ── Recalc & render result ───────────────────────────────
  function recalc() {
    const r = compute();
    if (!r) {
      el.resultEmpty.classList.remove('hidden');
      el.resultCard.classList.add('hidden');
      return;
    }
    el.resultEmpty.classList.add('hidden');
    el.resultCard.classList.remove('hidden');
    renderResult(r);
  }

  function renderResult(r) {
    const p = state.peptide;
    el.resPeptide.textContent  = p.name;
    el.resUnits.textContent    = fmt(r.unitsPerDose, 1);
    el.resUnitsSub.textContent = `em seringa de ${state.syringe} U`;
    el.resConc.textContent     = fmtConc(r.concentration);
    el.resDoses.textContent    = fmt(r.dosesPerVial, 1);
    el.resWater.textContent    = fmt(r.waterMl, 2);

    el.syringeSvg.innerHTML = buildSyringe(r.unitsPerDose, state.syringe);
    renderAlerts(r);
  }

  // ── Alerts ──────────────────────────────────────────────
  function renderAlerts(r) {
    const out = [];
    if (r.unitsPerDose > state.syringe) {
      out.push('err', `Dose excede a capacidade da seringa de ${state.syringe} U. Use uma seringa maior ou divida a aplicação.`);
    } else if (r.unitsPerDose < 5) {
      out.push('warn', 'Unidades muito pequenas (< 5 U) — difíceis de medir com precisão. Considere adicionar mais água.');
    } else if (r.unitsPerDose >= 10 && r.unitsPerDose <= 50) {
      out.push('success', 'Faixa ideal (10–50 U). Fácil de medir com precisão.');
    }
    if (r.waterMl > 0 && r.waterMl < 0.3) {
      out.push('warn', 'Volume de água muito pequeno (< 0,3 ml). Pode ser difícil de medir. Considere aumentar.');
    }
    // build HTML — push stores alternating kind/msg
    let html = '';
    for (let i = 0; i < out.length; i += 2) {
      const kind = out[i], msg = out[i + 1];
      const icons = { err: '⚠️', warn: '⚠️', success: '✅' };
      html += `<div class="alert alert-${kind}"><span class="alert-icon">${icons[kind]}</span><span>${esc(msg)}</span></div>`;
    }
    el.alerts.innerHTML = html;
  }

  // ── Syringe SVG ─────────────────────────────────────────
  function buildSyringe(units, maxU) {
    const safeU = Math.max(0, Math.min(units, maxU));
    const W = 520, H = 88;
    const bx = 60, bw = 360, by = 24, bh = 30;
    const majorEvery = maxU <= 30 ? 5 : 10;
    const ticks = [];

    for (let i = 0; i <= maxU; i++) {
      const x  = bx + (i / maxU) * bw;
      const big = i % majorEvery === 0;
      const th  = big ? 11 : 5;
      ticks.push(`<line x1="${x.toFixed(1)}" y1="${by + bh}" x2="${x.toFixed(1)}" y2="${(by + bh + th).toFixed(1)}" stroke="#94a3b8" stroke-width="${big ? 1.2 : 0.7}"/>`);
      if (big) ticks.push(`<text x="${x.toFixed(1)}" y="${by + bh + th + 11}" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="Inter,sans-serif">${i}</text>`);
    }

    const fillW  = (safeU / maxU) * bw;
    const markX  = bx + fillW;
    const piston = bx - 1; // plunger butts up against fill edge in "pulled" illustration
    const rodX   = 10;
    const rodW   = bx - 6;

    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
    <clipPath id="barrel-clip">
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3"/>
    </clipPath>
  </defs>

  <!-- needle tip -->
  <line x1="${bx + bw + 12}" y1="${by + bh/2}" x2="${bx + bw + 52}" y2="${by + bh/2}" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <rect x="${bx + bw}" y="${by + bh/2 - 4}" width="14" height="8" fill="#cbd5e1" rx="1"/>

  <!-- barrel background -->
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="3"/>

  <!-- liquid fill (animated) -->
  <g clip-path="url(#barrel-clip)">
    <rect class="syringe-fill" x="${bx}" y="${by}" width="${fillW.toFixed(1)}" height="${bh}" fill="url(#lg)" opacity="0.8"/>
  </g>

  <!-- tick marks -->
  ${ticks.join('')}

  <!-- barrel border on top of fill -->
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="none" stroke="#cbd5e1" stroke-width="1.5" rx="3"/>

  <!-- marker: dashed line + label -->
  <line x1="${markX.toFixed(1)}" y1="${by - 4}" x2="${markX.toFixed(1)}" y2="${by + bh + 3}" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="3 2"/>
  <rect x="${(markX - 16).toFixed(1)}" y="${(by - 18).toFixed(1)}" width="32" height="18" rx="5" fill="#0d9488"/>
  <text x="${markX.toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${fmt(safeU, 1)} U</text>

  <!-- plunger rod -->
  <rect x="${rodX}" y="${by + bh/2 - 3}" width="${rodW}" height="6" fill="#94a3b8" rx="2"/>
  <!-- plunger handle -->
  <rect x="${rodX - 8}" y="${by + bh/2 - 12}" width="10" height="24" fill="#64748b" rx="2"/>
  <!-- plunger head (grey disc touching barrel entry) -->
  <rect x="${bx - 6}" y="${by - 2}" width="7" height="${bh + 4}" fill="#e2e8f0" rx="1"/>
  <!-- barrel entry flange -->
  <rect x="${bx - 1}" y="${by - 5}" width="2" height="${bh + 10}" fill="#94a3b8"/>
</svg>`;
  }

  // ── Copy ────────────────────────────────────────────────
  function copyResult() {
    const r = compute();
    if (!r) return;
    const p = state.peptide;
    const text = [
      '📋 Cálculo de Reconstituição',
      `Peptídeo: ${p.name}`,
      `Frasco: ${fmt(state.mg, 2)} mg`,
      `Água BAC: ${fmt(r.waterMl, 2)} ml`,
      `Concentração: ${fmtConc(r.concentration)} mg/ml`,
      `Dose: ${fmt(state.dose, 3)} ${p.doseUnit}`,
      `Unidades/dose: ${fmt(r.unitsPerDose, 1)} U (seringa ${state.syringe} U)`,
      `Doses/frasco: ${fmt(r.dosesPerVial, 1)}`,
    ].join('\n');
    const done = () => showToast('Copiado!');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = Object.assign(document.createElement('textarea'), {
      value: text,
      style: 'position:fixed;top:-999px'
    });
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch {}
    document.body.removeChild(ta);
  }

  // ── Tooltip ─────────────────────────────────────────────
  function initTooltips() {
    document.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.help-btn[data-tip]');
      if (!btn) return;
      el.tooltip.textContent = btn.dataset.tip;
      el.tooltip.classList.remove('hidden');
      positionTooltip(btn);
      requestAnimationFrame(() => el.tooltip.classList.add('visible'));
    });
    document.addEventListener('mouseout', (e) => {
      if (!e.target.closest('.help-btn')) return;
      el.tooltip.classList.remove('visible');
      setTimeout(() => el.tooltip.classList.add('hidden'), 150);
    });
    document.addEventListener('focusin', (e) => {
      const btn = e.target.closest('.help-btn[data-tip]');
      if (!btn) return;
      el.tooltip.textContent = btn.dataset.tip;
      el.tooltip.classList.remove('hidden');
      positionTooltip(btn);
      requestAnimationFrame(() => el.tooltip.classList.add('visible'));
    });
    document.addEventListener('focusout', (e) => {
      if (!e.target.closest('.help-btn')) return;
      el.tooltip.classList.remove('visible');
      setTimeout(() => el.tooltip.classList.add('hidden'), 150);
    });
  }

  function positionTooltip(anchor) {
    const r = anchor.getBoundingClientRect();
    const tw = el.tooltip.offsetWidth || 200;
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    const top = r.top - el.tooltip.offsetHeight - 8;
    el.tooltip.style.left = left + 'px';
    el.tooltip.style.top  = (top > 0 ? top : r.bottom + 8) + 'px';
  }

  // ── Wire events ─────────────────────────────────────────
  function wire() {
    // combobox
    el.comboTrigger.addEventListener('click', toggleCombo);
    el.comboTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCombo(); }
      if (e.key === 'Escape') closeCombo();
    });
    el.comboSearch.addEventListener('input', (e) => renderComboList(e.target.value));
    el.comboSearch.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCombo(); });
    // close on outside click
    document.addEventListener('mousedown', (e) => {
      if (comboOpen && !$('peptide-combo').contains(e.target)) closeCombo();
    });

    // custom peptide
    el.comboCustomBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      closeCombo();
      const isHidden = el.customForm.classList.contains('hidden');
      if (isHidden) {
        el.customForm.classList.remove('hidden');
        el.customForm.removeAttribute('hidden');
        el.customName.focus();
      } else {
        el.customForm.classList.add('hidden');
        el.customForm.setAttribute('hidden', '');
      }
    });
    el.customAdd.addEventListener('click', addCustomPeptide);
    [el.customName, el.customDose].forEach((i) => {
      i.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomPeptide(); } });
    });
    el.pillClear.addEventListener('click', clearPeptide);

    // fields
    el.inputMg.addEventListener('input', (e) => { state.mg = parseFloat(e.target.value); recalc(); });
    el.inputWater.addEventListener('input', (e) => { state.waterMl = parseFloat(e.target.value); recalc(); });
    el.inputUnits.addEventListener('input', (e) => { state.units = parseFloat(e.target.value); recalc(); });
    el.inputDose.addEventListener('input', (e) => { state.dose = parseFloat(e.target.value); recalc(); });

    // water chips (static in HTML)
    $$('.chip[data-water]').forEach((c) => {
      c.addEventListener('click', () => {
        const v = parseFloat(c.dataset.water);
        el.inputWater.value = v;
        state.waterMl = v;
        recalc();
      });
    });

    // units chips (static in HTML)
    $$('.chip[data-units]').forEach((c) => {
      c.addEventListener('click', () => {
        const v = parseFloat(c.dataset.units);
        el.inputUnits.value = v;
        state.units = v;
        recalc();
      });
    });

    // mode tabs
    el.modeTabs.forEach((t) => {
      t.addEventListener('click', () => setMode(t.dataset.mode));
    });

    // syringe tabs
    el.syrTabs.forEach((b) => {
      b.addEventListener('click', () => setSyringe(parseInt(b.dataset.syringe, 10)));
    });

    // copy
    el.btnCopy.addEventListener('click', copyResult);
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    if (!window.PEPTIDES?.length) { console.error('PEPTIDES não carregado.'); return; }
    wire();
    initTooltips();
    // init mode UI
    setMode('volume');
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
