# Central Peptídeos

Central de informação sobre peptídeos — calculadoras, enciclopédia e blog.

**Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS · static export para GitHub Pages.

## Status atual (Fase 1)

- ✅ Calculadora de Reconstituição funcional em `/ferramentas/reconstituicao`
- ✅ Listagem de peptídeos em `/peptideos` (21 cadastrados, hard-coded)
- ✅ Páginas individuais por peptídeo em `/peptideos/[slug]` (stub)
- ✅ Home, blog, sobre (placeholders para Fase 3)
- ✅ Sitemap, robots, SEO básico
- ✅ GitHub Action de deploy

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build estático (igual ao que sobe pro GH Pages)

```bash
npm run build    # gera pasta out/
npx serve out    # testar localmente
```

## Deploy no GitHub Pages

1. Faça push deste repositório para o GitHub.
2. Vá em **Settings → Pages** e selecione **GitHub Actions** como source.
3. A cada push na `main`, o workflow `.github/workflows/deploy.yml` builda e publica.
4. Para rebuild manual (ex: atualizar conteúdo sem mudar código), vá em **Actions → Deploy to GitHub Pages → Run workflow**.

A URL será `https://<seu-user>.github.io/<nome-do-repo>/`.

## Fases do projeto

| Fase | Escopo | Status |
|---|---|---|
| 1 | Scaffold + calculadora de reconstituição | ✅ |
| 2 | Supabase + páginas de peptídeos com conteúdo do DB | ⏳ |
| 3 | Blog (artigos markdown via DB) | ⏳ |
| 4 | Mais calculadoras (mistura, conversor, cronograma) | ⏳ |

Ver planejamento completo em `C:\Users\julia\.claude\plans\glistening-petting-lovelace.md`.

## Estrutura

```
app/
  layout.tsx                 # root layout + metadata
  page.tsx                   # home
  globals.css                # Tailwind + tema
  sitemap.ts, robots.ts      # SEO
  peptideos/
    page.tsx                 # listagem
    [slug]/page.tsx          # por peptídeo
  ferramentas/
    page.tsx                 # hub
    reconstituicao/page.tsx  # calculadora
  blog/, sobre/              # placeholders
components/
  layout/       Header, Footer
  calculator/   ReconstitutionCalculator (client), Syringe, calc (puro)
lib/
  peptides.ts                # 21 peptídeos (→ Supabase na Fase 2)
legacy/                      # versão anterior vanilla, preservada
```

## Migração das Fases seguintes

**Fase 2 (Supabase)**: criar tabelas, script `scripts/seed-peptides.ts`, refatorar `lib/peptides.ts` para fetch em build (Server Component). Adicionar secrets `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no GitHub.

**Fase 3 (Blog)**: tabela `articles`, MDX ou react-markdown, sitemap dinâmico.

**Fase 4**: novas calculadoras — cada uma vira um `page.tsx` em `/ferramentas/*` reusando os components UI.

## Cálculos (referência técnica)

Fórmulas idênticas ao site original (`calculadoradepeptideos.com.br`):

```
# Modo "tenho a água":
concentração = mg_frasco / água_ml
unidades     = dose_mg × água_ml × 100 / mg_frasco
doses        = mg_frasco / dose_mg

# Modo "tenho as unidades":
água_ml      = unidades × mg_frasco / (dose_mg × 100)
# (demais derivados acima)
```

Base: seringa de insulina 100 U/ml.
