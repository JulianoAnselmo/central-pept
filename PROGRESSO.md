# Central Peptídeos — Registro de Progresso

> Última atualização: 16 de abril de 2026
> Repositório: https://github.com/JulianoAnselmo/central-pept.git

---

## O que é este projeto

Site estático em **Next.js 15 + Tailwind CSS + TypeScript** publicado via **GitHub Pages**. Evoluiu de uma calculadora HTML/CSS/JS puro para uma central de conteúdo sobre peptídeos com enciclopédia, blog, calculadoras e venda de ebook.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Estilo | Tailwind CSS + CSS variables |
| Deploy | GitHub Pages (static export — `output: 'export'`) |
| Checkout ebook | Kiwify (URL via env var) |
| Fonte de dados | Arquivos TypeScript (`lib/`) — sem banco ainda |
| CI/CD | GitHub Actions (`push main` + `workflow_dispatch`) |

---

## Estrutura de pastas

```
calcular-peps/
├── .github/workflows/deploy.yml      ← build + deploy automático
├── app/
│   ├── layout.tsx                    ← root layout (Header, Footer, metadata)
│   ├── page.tsx                      ← home
│   ├── globals.css                   ← tema med-tech (teal/branco/cinza) + Inter
│   ├── sitemap.ts                    ← sitemap dinâmico
│   ├── robots.ts
│   ├── manifest.ts                   ← PWA
│   ├── feed.xml/route.ts             ← RSS feed
│   ├── blog/
│   │   ├── page.tsx                  ← listagem de artigos
│   │   ├── tag/[tag]/page.tsx        ← archive por tag
│   │   └── [slug]/page.tsx           ← 13 artigos (cada um é um arquivo)
│   ├── peptideos/
│   │   ├── page.tsx                  ← listagem + filtros
│   │   └── [slug]/
│   │       ├── page.tsx              ← página de cada peptídeo
│   │       └── opengraph-image.tsx   ← OG image dinâmica
│   ├── ferramentas/
│   │   ├── page.tsx                  ← hub de ferramentas
│   │   ├── reconstituicao/page.tsx   ← calculadora principal
│   │   ├── titulacao/page.tsx        ← titulação GLP-1
│   │   ├── mistura/page.tsx          ← mistura de peptídeos
│   │   ├── conversor/page.tsx        ← conversor de unidades
│   │   └── cronograma/page.tsx       ← calendário de doses
│   ├── ebook/
│   │   └── [slug]/page.tsx           ← landing page de venda do ebook
│   ├── comparar/page.tsx             ← comparador de peptídeos
│   ├── glossario/page.tsx            ← glossário med
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── metodologia/page.tsx
│   ├── privacidade/page.tsx
│   └── termos/page.tsx
├── components/
│   ├── blog/ArticleLayout.tsx        ← layout dos artigos com CTA ebook
│   ├── calculator/
│   │   ├── calc.ts                   ← fórmulas puras (portadas do app.js original)
│   │   ├── ReconstitutionCalculator.tsx
│   │   ├── MixCalculator.tsx
│   │   ├── UnitConverter.tsx
│   │   ├── ScheduleCalculator.tsx
│   │   ├── TitrationCalculator.tsx
│   │   └── Syringe.tsx               ← seringa SVG animada
│   ├── ebook/
│   │   └── EbookCTA.tsx              ← 4 variantes de CTA do ebook
│   ├── layout/
│   │   ├── Header.tsx                ← nav + busca global
│   │   ├── Footer.tsx                ← links + link ebook
│   │   ├── GlobalSearch.tsx          ← busca em tempo real
│   │   └── ThemeToggle.tsx           ← dark mode
│   ├── peptide/
│   │   ├── PeptideBrowser.tsx        ← listagem filtrada com client-side filter
│   │   ├── Comparator.tsx            ← comparador side-by-side
│   │   ├── InjectionSiteGuide.tsx    ← guia visual de aplicação
│   │   ├── QuickCalcWidget.tsx       ← widget de cálculo rápido
│   │   └── StatusBadge.tsx           ← badge regulatório (FDA/WADA)
│   └── ui/
│       ├── FAQ.tsx
│       ├── MedicalDisclaimer.tsx
│       ├── NewsletterSignup.tsx
│       ├── ShareButtons.tsx
│       ├── Breadcrumb.tsx
│       └── Skeleton.tsx
└── lib/
    ├── peptides.ts                   ← 21 peptídeos com todos os dados
    ├── articles.ts                   ← 13 artigos de blog
    ├── ebooks.ts                     ← 1 ebook (Retatrutida)
    └── search-index.ts               ← índice para busca global
```

---

## Conteúdo catalogado

### Peptídeos — 21 catalogados em `lib/peptides.ts`

| # | Slug | Categoria |
|---|---|---|
| 1 | bpc-157 | healing |
| 2 | tb-500 | healing |
| 3 | semaglutida | glp-1 |
| 4 | tirzepatida | glp-1 |
| 5 | retatrutide | glp-1 |
| 6 | cjc-1295 | growth-hormone |
| 7 | ipamorelina | growth-hormone |
| 8 | sermorelina | growth-hormone |
| 9 | tesamorelina | growth-hormone |
| 10 | hexarelina | growth-hormone |
| 11 | ghrp-2 | growth-hormone |
| 12 | ghrp-6 | growth-hormone |
| 13 | pt-141 | sexual-health |
| 14 | melanotan-ii | sexual-health |
| 15 | mots-c | longevity |
| 16 | aod-9604 | fat-loss |
| 17 | ghk-cu | skin |
| 18 | epithalon | longevity |
| 19 | selank | nootropic |
| 20 | semax | nootropic |
| 21 | gonadorelina | hormonal |

Cada peptídeo tem: doses típicas, frequência, mecanismo de ação, efeitos colaterais, status regulatório (FDA/WADA/ANVISA), FAQ, doses comuns de frasco, category, JSON-LD `MedicalSubstance`.

### Artigos do blog — 13 em `lib/articles.ts`

| Slug | Tema |
|---|---|
| como-reconstituir-semaglutida | Tutorial completo (artigo longo) |
| semaglutida-vs-tirzepatida | Comparativo (artigo longo) |
| agua-bacteriostatica-guia | Tutorial diluente (artigo longo) |
| ozempic-para-perder-peso-sem-diabetes | GLP-1 off-label |
| efeitos-colaterais-semaglutida | Segurança |
| como-guardar-ozempic-wegovy | Armazenamento |
| ozempic-falso-como-identificar | Segurança |
| tirzepatida-manipulada-seguranca | Manipulação |
| quanto-tempo-ozempic-faz-efeito | Farmacologia |
| efeito-rebote-apos-parar-semaglutida | Manutenção |
| nausea-ozempic-como-lidar | Efeitos colaterais |
| bpc-157-ciclo-duracao | Healing peptides |
| cjc-ipamorelina-como-combinar | Stack de GH |

Nenhum artigo tem `draft: true` — todos aparecem na listagem.

---

## Calculadoras — 5 ferramentas

### 1. Reconstituição (`/ferramentas/reconstituicao`)
- Portada do `app.js` original (21 peptídeos hard-coded)
- Fórmula: `u = dose_mg × água_ml × 100 / mg_frasco`
- Seringa SVG animada mostrando nível
- Dois modos: "Quero X doses" e "Tenho as unidades"
- 21 peptídeos com doses pré-configuradas

### 2. Titulação GLP-1 (`/ferramentas/titulacao`)
- Escalonamento semana a semana para semaglutida e tirzepatida
- Gera calendário com datas automáticas
- Export para calendário

### 3. Mistura (`/ferramentas/mistura`)
- Blend de peptídeos numa seringa só

### 4. Conversor de Unidades (`/ferramentas/conversor`)
- mg ↔ mcg ↔ UI por peptídeo

### 5. Cronograma (`/ferramentas/cronograma`)
- Calendário de doses

---

## Ebook — infraestrutura completa de venda

### O produto
- **Título**: Retatrutida: Estratégias para Maximizar Resultados
- **Arquivo físico**: `Retatrutida-Estrategias-para-Maximizar-Resultados.pdf` (C:\Users\julia\Downloads)
- **Preço**: R$ 29,90 (âncora: R$ 49,90 → 40% OFF)
- **Plataforma de venda**: Kiwify (checkout, entrega por email, antifraude, Pix/cartão/boleto)
- **Entrega**: automática por email em até 2 minutos após pagamento
- **Garantia**: 7 dias incondicional

### Arquivos criados

#### `lib/ebooks.ts`
- Tipo `Ebook` com todos os campos
- `EBOOKS[]` com o ebook da Retatrutida (10 bullets de aprendizado, 4 perfis de audiência, 6 FAQ items)
- URL do checkout via env var: `NEXT_PUBLIC_EBOOK_CHECKOUT_RETATRUTIDA`
- Funções: `getEbooks()`, `getEbookBySlug()`, `getEbookSlugs()`, `getEbooksForPeptide()`, `getEbooksForTags()`

#### `components/ebook/EbookCTA.tsx`
4 componentes exportados:

| Componente | Uso |
|---|---|
| `<EbookCTA variant="banner">` | Banner horizontal — topo de ferramentas/peptídeos |
| `<EbookCTA variant="inline">` | Card inline — meio de conteúdo |
| `<EbookCTA variant="sidebar">` | Card vertical — sidebar de artigo |
| `<EbookStickyCTA>` | Ultra-compacto — dentro do painel sticky de resultado das calculadoras |
| `<EbookBuyButton>` | Botão de checkout direto — landing page do ebook |

**Nota técnica importante**: Todas as cores são `style={{ background: 'linear-gradient(...)' }}` (inline), não classes Tailwind. Isso é necessário porque o Tailwind JIT não processa strings dinâmicas em template literals.

#### `app/ebook/[slug]/page.tsx`
Landing page completa com:
- Hero com gradient inline (fix do bug "landing apagada/cinza")
- Mockup da capa do ebook com badge dinâmico de desconto
- Seção "O que você vai aprender" (10 bullets)
- Seção "Para quem é" (4 perfis)
- Seção de oferta com price display
- FAQ (6 perguntas)
- CTA final
- **Schema JSON-LD `Product`** (Google mostra preço nos resultados de busca)
- UTM tracking: `?utm_source=site&utm_medium=landing-hero/mid/footer`

### Onde o CTA aparece no site

| Local | Componente | Variant |
|---|---|---|
| Home (entre enciclopédia e newsletter) | `EbookCTA` | `banner` |
| Hub de ferramentas | `EbookCTA` | `banner` |
| Ferramenta Titulação — topo | `EbookCTA` | `banner` |
| Ferramenta Titulação — rodapé | `EbookCTA` | `inline` |
| Ferramenta Reconstituição — página | importado mas pendente de renderização |
| Página do peptídeo Retatrutide — topo | `EbookCTA` | `banner` |
| Página do peptídeo Retatrutide — pós-FAQ | `EbookCTA` | `inline` |
| Artigos com tags glp-1/emagrecimento | `EbookCTA` | `inline` |
| Footer | Link com badge "Novo" | — |
| Sitemap | prioridade 0.9 | — |

### Setup pendente (ação do usuário)
1. Criar conta em [kiwify.com](https://kiwify.com)
2. Fazer upload do PDF `Retatrutida-Estrategias-para-Maximizar-Resultados.pdf`
3. Definir preço R$ 29,90 / preço de comparação R$ 49,90
4. Copiar a URL de checkout (formato: `https://pay.kiwify.com.br/XXXXX`)
5. Adicionar no GitHub → Settings → Secrets and variables → Actions:
   ```
   NEXT_PUBLIC_EBOOK_CHECKOUT_RETATRUTIDA = https://pay.kiwify.com.br/XXXXX
   ```
6. Fazer push → Action reconstrói o site com a URL correta

---

## SEO implementado

| Schema | Onde |
|---|---|
| `MedicalSubstance` + `Drug` | Cada página de peptídeo |
| `Article` + `FAQPage` | Artigos do blog |
| `BreadcrumbList` | Todas as páginas internas |
| `MedicalWebPage` | Páginas de peptídeo |
| `WebSite` + `SearchAction` | Home (habilita sitelinks search no Google) |
| `Organization` + `Person` | Home |
| `Product` | Landing page do ebook |

Outros:
- `sitemap.xml` dinâmico com todos os slugs (peptídeos, artigos, ebook — prioridade 0.9)
- `robots.txt` allow all
- `manifest.json` para PWA com shortcuts de ferramentas
- RSS feed em `/feed.xml`
- OG images dinâmicas por peptídeo (`opengraph-image.tsx`)
- Tags OpenGraph e Twitter Card em todas as páginas

---

## Deploy

### GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger automático**: push para `main`
- **Trigger manual**: botão "Run workflow" no GitHub Actions
- **Build**: `npm ci` → `npm run build` → gera pasta `out/`
- **Deploy**: `actions/deploy-pages` para GitHub Pages

### next.config.mjs
```js
output: 'export',
basePath: process.env.PAGES_BASE || '',   // ex: '/central-pept'
images: { unoptimized: true },
trailingSlash: true,
```

### URLs esperadas
- Site: `https://JulianoAnselmo.github.io/central-pept/`
- Ebook: `https://JulianoAnselmo.github.io/central-pept/ebook/retatrutida-estrategias/`
- Peptídeo: `https://JulianoAnselmo.github.io/central-pept/peptideos/retatrutide/`

---

## Git

- **Repositório remoto**: `https://github.com/JulianoAnselmo/central-pept.git`
- **Commit inicial**: `b993f2e` — "feat: Central Peptídeos v1 — calculadoras, enciclopédia, blog, comparador"
- **Mudanças não commitadas** (ebook + CTAs):
  - `app/ebook/[slug]/page.tsx` (novo)
  - `components/ebook/EbookCTA.tsx` (novo)
  - `lib/ebooks.ts` (novo)
  - `app/ferramentas/page.tsx` (modificado — banner ebook)
  - `app/ferramentas/reconstituicao/page.tsx` (modificado — imports)
  - `app/ferramentas/titulacao/page.tsx` (modificado — CTAs topo e rodapé)
  - `app/page.tsx` (modificado — banner ebook)
  - `app/peptideos/[slug]/page.tsx` (modificado — CTAs retatrutide)
  - `app/sitemap.ts` (modificado — ebook)
  - `components/blog/ArticleLayout.tsx` (modificado — CTA inline)
  - `components/layout/Footer.tsx` (modificado — link ebook)

---

## Pendências

### Crítico
- [ ] **Commitar e fazer push** de todas as mudanças do ebook (o commit inicial só tem o site base, não tem o ebook)
- [ ] **Configurar Kiwify**: fazer upload do PDF e copiar URL do checkout
- [ ] **Adicionar o secret** `NEXT_PUBLIC_EBOOK_CHECKOUT_RETATRUTIDA` no GitHub

### Técnico
- [ ] **EbookStickyCTA nas calculadoras**: inserir dentro do `div.lg:sticky.lg:top-20` de cada calculadora (para que o usuário veja o anúncio enquanto usa a ferramenta)
  - `components/calculator/ReconstitutionCalculator.tsx` (linha ~650)
  - `components/calculator/MixCalculator.tsx`
  - `components/calculator/UnitConverter.tsx`
  - `components/calculator/ScheduleCalculator.tsx`
  - `components/calculator/TitrationCalculator.tsx`
- [ ] **Busca global**: adicionar ebook ao `lib/search-index.ts`
- [ ] **Ferramenta Reconstituição**: finalizar renderização do CTA na página

### Conteúdo (futuro)
- [ ] Subir ebook na Kiwify com descrição e cover
- [ ] Criar mais ebooks para outros peptídeos
- [ ] Supabase (Fase 2): migrar dados para DB, habilitar edição via Supabase Studio

---

## Verificação rápida

Para testar localmente antes de publicar:
```bash
cd C:\dev\calcular-peps
npm run dev
# Abre http://localhost:3000

# Checar ebook:
# http://localhost:3000/ebook/retatrutida-estrategias

# Build estático:
npm run build
npx serve out
```

Para publicar:
```bash
git add .
git commit -m "feat: ebook Retatrutida — landing page, CTAs, infraestrutura de venda"
git push origin main
# Aguardar GitHub Action (~2 min)
```
