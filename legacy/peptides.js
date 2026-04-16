// Base de peptídeos - valores extraídos do bundle do site original
// (calculadoradepeptideos.com.br) para manter equivalência de doses típicas.
window.PEPTIDES = [
  {
    name: "BPC-157",
    typicalDose: 250,
    doseUnit: "mcg",
    frequency: "1-2x por dia",
    description: "Peptídeo de proteção corporal. Promove cicatrização de tecidos, tendões e ligamentos.",
    commonAmounts: [5]
  },
  {
    name: "TB-500 (Timosina Beta-4)",
    typicalDose: 2.5,
    doseUnit: "mg",
    frequency: "2x por semana (carga), 1x por semana (manutenção)",
    description: "Promove recuperação tecidual, reduz inflamação e auxilia na cicatrização.",
    commonAmounts: [5, 10]
  },
  {
    name: "Semaglutida",
    typicalDose: 0.25,
    doseUnit: "mg",
    frequency: "1x por semana (dose inicial, aumentar gradualmente)",
    description: "Agonista do receptor GLP-1. Usado para controle glicêmico e perda de peso.",
    commonAmounts: [3, 5]
  },
  {
    name: "Tirzepatida",
    typicalDose: 2.5,
    doseUnit: "mg",
    frequency: "1x por semana",
    description: "Agonista duplo GIP/GLP-1. Usado para controle glicêmico e perda de peso.",
    commonAmounts: [5, 10, 15]
  },
  {
    name: "Retatrutide",
    typicalDose: 2,
    doseUnit: "mg",
    frequency: "1x por semana",
    description: "Agonista triplo GLP-1/GIP/glucagon em desenvolvimento para obesidade e diabetes tipo 2. Demonstrou perda de peso significativa em estudos de fase 2.",
    commonAmounts: [5, 10]
  },
  {
    name: "CJC-1295 (com DAC)",
    typicalDose: 2,
    doseUnit: "mg",
    frequency: "1x por semana",
    description: "Análogo do GHRH com meia-vida prolongada. Estimula a liberação de GH.",
    commonAmounts: [2, 5]
  },
  {
    name: "Ipamorelina",
    typicalDose: 200,
    doseUnit: "mcg",
    frequency: "2-3x por dia",
    description: "Secretagogo de GH seletivo. Menor efeito sobre cortisol e prolactina.",
    commonAmounts: [2, 5]
  },
  {
    name: "Sermorelina",
    typicalDose: 200,
    doseUnit: "mcg",
    frequency: "1x por dia (antes de dormir)",
    description: "Análogo do GHRH. Estimula a produção natural de hormônio do crescimento.",
    commonAmounts: [2, 3]
  },
  {
    name: "Tesamorelina",
    typicalDose: 2,
    doseUnit: "mg",
    frequency: "1x por dia",
    description: "Análogo do GHRH. Reduz gordura visceral abdominal.",
    commonAmounts: [2]
  },
  {
    name: "Hexarelina",
    typicalDose: 200,
    doseUnit: "mcg",
    frequency: "2-3x por dia",
    description: "Secretagogo de GH potente. Pode elevar cortisol e prolactina.",
    commonAmounts: [2, 5]
  },
  {
    name: "GHRP-2",
    typicalDose: 100,
    doseUnit: "mcg",
    frequency: "2-3x por dia",
    description: "Secretagogo de GH potente. Menor efeito no apetite que GHRP-6.",
    commonAmounts: [5]
  },
  {
    name: "GHRP-6",
    typicalDose: 100,
    doseUnit: "mcg",
    frequency: "2-3x por dia",
    description: "Secretagogo de GH. Aumenta apetite e liberação de GH.",
    commonAmounts: [5]
  },
  {
    name: "PT-141 (Bremelanotida)",
    typicalDose: 1.75,
    doseUnit: "mg",
    frequency: "Conforme necessário (máx 1x a cada 24h)",
    description: "Agonista do receptor MC4. Usado para disfunção sexual.",
    commonAmounts: [10]
  },
  {
    name: "Melanotan II",
    typicalDose: 0.25,
    doseUnit: "mg",
    frequency: "1x por dia (carga), 2x por semana (manutenção)",
    description: "Agonista do receptor de melanocortina. Promove bronzeamento da pele.",
    commonAmounts: [10]
  },
  {
    name: "MOTS-C",
    typicalDose: 500,
    doseUnit: "mcg",
    frequency: "1x por dia",
    description: "Peptídeo mitocondrial (MDP) de 16 aminoácidos. Ativa AMPK, melhora sensibilidade à insulina, promove oxidação de gordura e combate declínio metabólico.",
    commonAmounts: [10]
  },
  {
    name: "AOD-9604",
    typicalDose: 300,
    doseUnit: "mcg",
    frequency: "1x por dia",
    description: "Fragmento modificado do HGH. Promove lipólise sem efeitos na glicose.",
    commonAmounts: [5]
  },
  {
    name: "GHK-Cu",
    typicalDose: 1,
    doseUnit: "mg",
    frequency: "1x por dia",
    description: "Peptídeo de cobre. Promove regeneração tecidual e tem propriedades anti-envelhecimento.",
    commonAmounts: [50, 100]
  },
  {
    name: "Epithalon",
    typicalDose: 5,
    doseUnit: "mg",
    frequency: "1x por dia por 10-20 dias",
    description: "Tetrapeptídeo que ativa a telomerase. Potencial anti-envelhecimento.",
    commonAmounts: [10, 50]
  },
  {
    name: "Selank",
    typicalDose: 250,
    doseUnit: "mcg",
    frequency: "1-2x por dia",
    description: "Peptídeo ansiolítico. Reduz ansiedade e melhora função cognitiva.",
    commonAmounts: [5]
  },
  {
    name: "Semax",
    typicalDose: 200,
    doseUnit: "mcg",
    frequency: "1-2x por dia",
    description: "Peptídeo nootrópico. Melhora função cognitiva e neuroproteção.",
    commonAmounts: [5]
  },
  {
    name: "Gonadorelina",
    typicalDose: 100,
    doseUnit: "mcg",
    frequency: "2-3x por semana",
    description: "Análogo do GnRH. Estimula a produção de LH e FSH.",
    commonAmounts: [2]
  }
];
