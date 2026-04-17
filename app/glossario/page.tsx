import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossário',
  description: 'Termos técnicos usados na reconstituição, dosagem e administração de peptídeos explicados de forma clara.',
  alternates: { canonical: '/glossario' },
};

type Term = { term: string; definition: React.ReactNode; };

const TERMS: Term[] = [
  {
    term: 'Água bacteriostática',
    definition: (
      <>Água estéril com 0,9% de álcool benzílico como conservante. É o diluente padrão
      para reconstituição de peptídeos em frascos multi-dose, pois inibe crescimento
      bacteriano após múltiplas perfurações.</>
    ),
  },
  {
    term: 'Agonista',
    definition: (
      <>Molécula que se liga a um receptor e ativa sua função. &quot;Agonista GLP-1&quot; significa
      que o composto ativa o receptor de GLP-1 imitando o hormônio natural.</>
    ),
  },
  {
    term: 'AMPK',
    definition: (
      <>AMP-activated Protein Kinase. Enzima sensor do estado energético celular; sua
      ativação promove oxidação de gorduras, captação de glicose e biogênese
      mitocondrial. Alvo proposto de peptídeos como MOTS-C.</>
    ),
  },
  {
    term: 'Bula',
    definition: (
      <>Documento oficial aprovado pela agência regulatória (ANVISA, FDA) contendo
      indicações, posologia, contraindicações e efeitos colaterais do medicamento.</>
    ),
  },
  {
    term: 'COA',
    definition: (
      <>Certificate of Analysis — documento do fabricante atestando pureza e
      composição do produto, geralmente com resultado de HPLC. Importante ao comprar
      peptídeos manipulados ou de pesquisa.</>
    ),
  },
  {
    term: 'Concentração',
    definition: (
      <>Quantidade de substância por volume. Ex.: &quot;2,5 mg/ml&quot; significa 2,5 miligramas
      de peptídeo por mililitro de solução reconstituída. Determina quantas unidades
      puxar na seringa.</>
    ),
  },
  {
    term: 'Dose típica',
    definition: (
      <>Quantidade de peptídeo tipicamente administrada em cada aplicação, conforme
      documentado em estudos clínicos ou uso estabelecido. Não é uma recomendação
      individual — doses reais variam por pessoa, objetivo e supervisão médica.</>
    ),
  },
  {
    term: 'DPP-4',
    definition: (
      <>Dipeptidil-peptidase 4. Enzima que degrada peptídeos incluindo GLP-1 endógeno,
      limitando sua meia-vida. Peptídeos como semaglutida têm modificações para
      resistir à DPP-4 e durar mais no organismo.</>
    ),
  },
  {
    term: 'FDA',
    definition: (
      <>Food and Drug Administration — agência reguladora americana. A aprovação FDA
      é um dos marcos mais rigorosos de evidência de eficácia e segurança
      farmacológica.</>
    ),
  },
  {
    term: 'GH',
    definition: (
      <>Hormônio do crescimento (Growth Hormone). Hormônio peptídico produzido pela
      hipófise. Peptídeos &quot;secretagogos de GH&quot; estimulam sua liberação endógena.</>
    ),
  },
  {
    term: 'GHRH',
    definition: (
      <>Growth Hormone-Releasing Hormone. Hormônio hipotalâmico que estimula a
      secreção de GH pela hipófise. Análogos de GHRH incluem sermorelina,
      tesamorelina e CJC-1295.</>
    ),
  },
  {
    term: 'GHRP',
    definition: (
      <>Growth Hormone-Releasing Peptide. Classe de peptídeos sintéticos que imitam
      a grelina e estimulam liberação de GH via receptor GHSR-1a. Inclui ipamorelina,
      GHRP-2, GHRP-6 e hexarelina.</>
    ),
  },
  {
    term: 'GLP-1',
    definition: (
      <>Glucagon-Like Peptide 1. Hormônio intestinal liberado após refeições que
      estimula secreção de insulina, suprime glucagon e promove saciedade. Agonistas
      incluem semaglutida, liraglutida.</>
    ),
  },
  {
    term: 'GIP',
    definition: (
      <>Glucose-dependent Insulinotropic Polypeptide. Outro hormônio incretínico que,
      combinado com GLP-1, potencializa resposta insulínica. A tirzepatida ativa
      ambos (GIP + GLP-1) simultaneamente.</>
    ),
  },
  {
    term: 'IGF-1',
    definition: (
      <>Insulin-like Growth Factor 1. Hormônio produzido pelo fígado em resposta ao
      GH; media muitos efeitos anabólicos do GH. Elevação crônica está associada a
      preocupações oncológicas teóricas.</>
    ),
  },
  {
    term: 'Liofilizado',
    definition: (
      <>Pó seco obtido por liofilização (congelamento + desidratação a vácuo).
      Peptídeos são liofilizados para manter estabilidade durante armazenamento e
      transporte; precisam ser reconstituídos com água antes do uso.</>
    ),
  },
  {
    term: 'Meia-vida',
    definition: (
      <>Tempo necessário para que a concentração plasmática do peptídeo caia pela
      metade. Determina a frequência de aplicação: BPC-157 (~4h, 1-2x/dia),
      semaglutida (~7 dias, 1x/semana).</>
    ),
  },
  {
    term: 'Off-label',
    definition: (
      <>Uso de um medicamento fora das indicações aprovadas em bula. Não é ilegal se
      houver prescrição médica, mas carece de validação regulatória para aquela
      indicação específica.</>
    ),
  },
  {
    term: 'PubMed',
    definition: (
      <>Maior base de dados de literatura biomédica peer-reviewed, mantida pela NIH
      (EUA). É a fonte primária para pesquisa científica sobre peptídeos.</>
    ),
  },
  {
    term: 'Reconstituição',
    definition: (
      <>Processo de dissolver um peptídeo liofilizado (em pó) em um diluente líquido
      (geralmente água bacteriostática) para obter solução injetável. A proporção
      determina concentração e doses por frasco.</>
    ),
  },
  {
    term: 'Seringa de insulina U100',
    definition: (
      <>Seringa graduada em unidades de insulina onde 1 ml = 100 unidades (U).
      Comumente vem em capacidades de 30 U (0,3 ml), 50 U (0,5 ml) e 100 U (1 ml).
      É a seringa padrão para aplicação subcutânea de peptídeos.</>
    ),
  },
  {
    term: 'Subcutâneo (SC)',
    definition: (
      <>Via de administração em que a injeção é feita no tecido gorduroso logo abaixo
      da pele (abdome, coxa, braço). É a via mais comum para peptídeos, com absorção
      lenta e sustentada.</>
    ),
  },
  {
    term: 'UI / Unidade Internacional',
    definition: (
      <>Unidade de atividade biológica padronizada para um composto específico. Não
      é massa — a conversão UI↔mg depende do composto (ex.: 1 mg de HGH ≈ 3 UI).
      Só existe para medicamentos com potência biológica padronizada.</>
    ),
  },
  {
    term: 'VEGF',
    definition: (
      <>Vascular Endothelial Growth Factor. Fator de crescimento que promove formação
      de novos vasos sanguíneos (angiogênese). Modulado por peptídeos como BPC-157
      e Timosina Beta-4.</>
    ),
  },
  {
    term: 'WADA',
    definition: (
      <>World Anti-Doping Agency. Agência internacional que define a lista de
      substâncias proibidas em esporte competitivo. A maioria dos peptídeos
      performance-related está na classe S2 (hormônios peptídicos).</>
    ),
  },
];

export default function GlossarioPage() {
  const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));

  // Agrupar por letra inicial
  const groups = sorted.reduce<Record<string, Term[]>>((acc, t) => {
    const letter = t.term[0].toUpperCase();
    acc[letter] = acc[letter] || [];
    acc[letter].push(t);
    return acc;
  }, {});

  const letters = Object.keys(groups).sort();

  return (
    <>
      <section className="bg-gradient-mesh border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-10 pb-8 md:pt-14 md:pb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Glossário</span>
          <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Termos técnicos, explicados
          </h1>
          <p className="mt-3 text-lg text-ink-2 max-w-2xl">
            {TERMS.length} termos do universo de peptídeos — de &quot;bacteriostática&quot; a
            &quot;WADA&quot; — explicados de forma clara e sem jargão desnecessário.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Navegação por letra */}
        <nav aria-label="Navegação do glossário" className="mb-8 flex flex-wrap gap-1.5 pb-4 border-b border-border sticky top-20 bg-bg/95 backdrop-blur z-20 -mx-4 px-4 py-3">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letra-${l}`}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-surface text-sm font-bold text-ink-2 hover:border-teal hover:text-teal-700 hover:bg-teal-50 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {letters.map((letter) => (
          <section key={letter} id={`letra-${letter}`} className="mb-8 scroll-mt-32">
            <h2 className="text-2xl font-extrabold text-teal-700 mb-3">{letter}</h2>
            <div className="space-y-4">
              {groups[letter].map((t) => (
                <div key={t.term} className="card p-4">
                  <dt className="font-bold text-ink mb-1.5">{t.term}</dt>
                  <dd className="text-sm text-ink-2 leading-relaxed">{t.definition}</dd>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
