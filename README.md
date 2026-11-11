# LandingPage-SUNA

Landing page e portfólio da SUNA Software e Desenvolvimento. Feita com Vite, React e TypeScript.

## Rodar no computador

Requer Node 18 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # testa a versão de produção
```

## Publicar na Vercel

1. Na Vercel, clique em **Add New → Project** e importe este repositório.
2. A Vercel detecta o Vite sozinha: build `npm run build`, pasta de saída `dist`.
3. A cada push na `main`, o site é publicado de novo.

## Onde editar o conteúdo

| O que | Onde |
| --- | --- |
| Textos, serviços, etapas, WhatsApp e Instagram | `src/content.ts` |
| Projetos do portfólio | lista `projects` em `src/content.ts` |
| Cores e fontes | `src/styles/tokens.css` |
| Logos | `src/assets/brand/` |

### Portfólio

Os cinco projetos atuais são **exemplos** (aparecem com a etiqueta "exemplo" e textos entre colchetes). Para cada projeto real, troque `name`, `challenge`, `result` e `stack` e mude `placeholder` para `false`. Para mostrar uma captura de tela, coloque o arquivo em `src/assets/projetos/`, importe em `content.ts` (`import sistemaEscola from './assets/projetos/sistema-escola.png'`) e passe em `image`, com `imageAlt` descrevendo a tela. Sem imagem, o card mostra um espaço de areia rastelada. Quando nenhum projeto for exemplo, o texto da seção muda sozinho.

### Logos

As logos são usadas como máscara, então a cor vem do CSS (`color`). Se trocar um arquivo, mantenha o PNG com fundo transparente.

## Fontes

Instaladas pelo npm, sem depender do Google Fonts no navegador:

- **Títulos:** [Unbounded](https://fonts.google.com/specimen/Unbounded), larga e arredondada como o logotipo, sempre em minúsculas.
- **Texto:** [Onest](https://fonts.google.com/specimen/Onest), neutra e muito legível em telas pequenas.

### Trocar a fonte de texto

Alternativas gratuitas para uso comercial:

- [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare): geométrica, combina com o "a" de um andar do logotipo.
- [General Sans](https://www.fontshare.com/fonts/general-sans) (Fontshare): um pouco mais firme, boa para textos longos.
- [Figtree](https://fonts.google.com/specimen/Figtree) (Google): arredondada e amigável.

Para usar uma fonte baixada:

1. Coloque os arquivos `.woff2` em `src/assets/fonts/`.
2. Declare a fonte no início de `src/styles/tokens.css`:

   ```css
   @font-face {
     font-family: 'Satoshi';
     src: url('../assets/fonts/Satoshi-Variable.woff2') format('woff2');
     font-weight: 300 900;
     font-display: swap;
   }
   ```

3. Troque a variável: `--font-text: 'Satoshi', system-ui, sans-serif;`
4. Se não for mais usar a Onest, remova `import '@fontsource-variable/onest';` de `src/main.tsx` e rode `npm uninstall @fontsource-variable/onest`.

## Estrutura

```
src/
  App.tsx              ordem das seções
  content.ts           todo o conteúdo editável
  sections/            uma seção por arquivo (Header, Hero, Problem, Services, Projects, Team, Process, Contact, Footer)
  components/          SandGarden (areia animada do topo), Rake, Brand, Icon, garden.ts
  styles/              tokens.css (cores e fontes) e global.css
```
