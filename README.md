# Conexão.fr — Site institucional (PT / FR / EN)

Este pacote contém o site completo da Conexão.fr em HTML/CSS puro, pensado para servir como **referência visual fiel** e como **fonte de blocos HTML** para implementação no Wix Multilingual.

## Arquivos

| Arquivo | Idioma | Uso |
|---|---|---|
| `index.html` | Português (pt-BR) | Versão principal |
| `index-fr.html` | Français (fr) | Versão secundária |
| `index-en.html` | English (en) | Versão secundária |

Cada arquivo é 100% autocontido (HTML + CSS + JS inline, sem dependências externas além do Google Fonts). Você pode abrir qualquer um deles direto no navegador para visualizar o resultado antes de importar para o Wix.

---

## 1. Como importar no Wix Multilingual

O Wix **não permite subir um arquivo `.html` como página inteira**. A forma correta de aproveitar este material é:

### Passo 1 — Ativar o Wix Multilingual primeiro
No painel do Wix: **Configurações → Multilíngue** → ative PT (idioma principal), depois adicione FR e EN como idiomas secundários. Isso já cria a estrutura de URLs (`/fr/`, `/en/`) e o **seletor de idioma nativo** — não é necessário recriar o seletor PT | FR | EN manualmente, ele já existe no header deste HTML apenas como referência visual.

> **Importante:** deixe o Wix gerar o hreflang automaticamente. As tags `<link rel="alternate" hreflang="...">` presentes no `<head>` de cada arquivo aqui são apenas para referência/portabilidade fora do Wix — no Wix Multilingual elas são geradas automaticamente e não devem ser duplicadas manualmente.

### Passo 2 — Recriar a estrutura de seções com elementos nativos do Wix
Para cada seção marcada com comentário `<!-- WIX: ... -->` no HTML, use o elemento nativo do Wix indicado no comentário (Strip, Repeater, Caixa, etc.) sempre que possível. Isso garante:
- Melhor performance mobile
- SEO nativo do Wix funcionando corretamente
- Edição fácil de texto sem mexer em código

Use os arquivos HTML como **guia de layout, cores, tipografia e copy** — não como embed literal de página inteira.

### Passo 3 — Usar HTML embed apenas onde necessário
Existem elementos que o Wix não replica nativamente com a mesma fidelidade (o card "destaque" com fundo navy assimétrico na seção "Como posso ajudar", o comparativo de 2 colunas em "Por que funciona", os cantos/gradientes do Hero). Para esses casos específicos:

1. Copie apenas o bloco de HTML da seção (da tag `<section>` até `</section>`).
2. No Wix Editor, adicione um elemento **HTML embed** (Adicionar → Embed → HTML personalizado/iframe) na área correspondente.
3. Cole o HTML da seção. As classes CSS já usam nomes específicos (`.pain-card`, `.help-card.featured`, etc.) — não há conflito com o CSS interno do Wix porque o embed roda em iframe isolado.
4. **Você precisará colar o bloco `<style>` (design system) dentro de cada embed** que usar essa abordagem, pois cada HTML embed do Wix roda em iframe isolado e não compartilha CSS entre embeds. Alternativamente, use a técnica do Passo 4 abaixo para centralizar o CSS.

### Passo 4 — Centralizar o CSS via Custom Code (recomendado se for usar vários embeds)
Em vez de colar o `<style>` completo em cada HTML embed:
1. Vá em **Configurações → Ferramentas de marketing e SEO → Código personalizado**.
2. Adicione o conteúdo do bloco `<style>...</style>` (o "DESIGN SYSTEM") em **Código personalizado**, marcado para carregar no `<head>`, em **todas as páginas**.
3. Isso não funciona dentro de HTML embeds em iframe (eles continuam isolados) — mas ajuda se você optar por recriar as seções com elementos nativos do Wix e só precisar das variáveis de cor/fonte como referência ao estilizar manualmente.

### Passo 5 — JSON-LD (Schema markup)
Cada arquivo tem um bloco `<script type="application/ld+json">` com `Person` + `ProfessionalService`. Cole esse bloco em:
**Configurações → Ferramentas de marketing e SEO → Código personalizado** → carregar no `<head>` → aplicar **apenas na Home** de cada versão de idioma (o Wix permite escopo por página).

Atualize os placeholders antes de publicar:
- `https://www.conexao.fr/` → confirme o domínio real de publicação.
- `sameAs` (LinkedIn) → confirme se a URL `linkedin.com/in/diogopiresdeoliveira/` é a correta.

### Passo 6 — Meta tags (title, description, Open Graph)
O Wix tem campos nativos de SEO por página (**SEO → Configurações avançadas de SEO** em cada página/idioma). Copie o conteúdo de `<title>`, `<meta name="description">` e as tags `og:*` de cada arquivo para os campos correspondentes do painel de SEO do Wix **em vez de** inserir as meta tags via código — o Wix já gerencia isso nativamente e evita duplicidade de tags.

---

## 2. Seções que precisam de revisão manual antes de publicar

- **E-mail de contato**: os arquivos usam `diogo.oliveira@conexao.fr` (mailto: e texto visível). Confirme se este é o e-mail definitivo antes de publicar.
- **LinkedIn**: a URL usada é um placeholder (`linkedin.com/in/diogopiresdeoliveira/`). Confirme e substitua pela URL real do perfil.
- **Imagem Open Graph (`og:image`)**: os arquivos referenciam `https://www.conexao.fr/assets/og-image.jpg`, que **não existe ainda**. Crie uma imagem 1200×630px com a identidade visual (navy + coral + logo) e publique nesse caminho, ou ajuste a URL no Custom Code do Wix.
- **Foto do Diogo**: a seção "Quem sou eu" usa um monograma circular ("DO") como placeholder. Recomendado substituir por uma foto profissional real antes de publicar — é o elemento de maior impacto de confiança na seção.
- **Domínio canônico**: todas as tags `canonical` e `hreflang` assumem `https://www.conexao.fr/`. Ajuste se o domínio publicado for diferente.
- **Cases**: os 3 cases estão sem nomes de clientes por padrão de confidencialidade, conforme solicitado. Se em algum momento houver autorização de clientes para citar nomes/logos, isso pode reforçar bastante a prova social — vale revisitar.
- **Números/resultados dos cases**: propositalmente não incluí métricas específicas (%, R$, etc.) por não ter esses dados confirmados. Se você tiver resultados quantificáveis reais e autorizados, adicioná-los aos cases aumenta consideravelmente o poder de conversão da seção.
- **Fonte Georgia**: Georgia não está disponível no Google Fonts. O CSS usa `Georgia` como primeira opção (fonte de sistema, presente em Windows e Mac) com `Cormorant Garamond` (Google Fonts) como reforço/alternativa para dispositivos sem Georgia instalada. Se o Wix Editor permitir upload de fonte customizada, considere subir a Georgia real para consistência 100% garantida.

---

## 3. Estrutura de âncoras (idêntica nas 3 línguas)

Para manter os links internos e o menu funcionando de forma consistente entre idiomas, os `id` das seções são os mesmos nos 3 arquivos (não traduzidos):

```
#hero      → Hero
#problem   → O Problema
#help      → Como Posso Ajudar
#models    → Como Trabalhamos
#why       → Por Que Funciona
#cases     → Cases
#about     → Quem Sou Eu
#contact   → CTA Final / Contato
```

Ao recriar no Wix, mantenha esses IDs de âncora nos elementos de seção (o Wix permite definir "ID de elemento" nas configurações de cada seção) para que os links do menu funcionem em todas as versões de idioma.

---

## 4. Testado / considerações técnicas

- **Sem frameworks**: CSS puro com custom properties (`:root`), sem Bootstrap/Tailwind.
- **Mobile-first**: breakpoints em 900px, 760px e 480px; menu hambúrguer via JS vanilla (10 linhas, sem dependências).
- **Scroll suave**: via `scroll-behavior: smooth` em CSS, sem necessidade de biblioteca JS.
- **Performance**: única dependência externa é Google Fonts (Cormorant Garamond + DM Sans); pode ser removida se você preferir usar apenas fontes de sistema.
- **Acessibilidade**: skip-link, `aria-expanded`/`aria-controls` no menu mobile, `aria-current="page"` no seletor de idioma.

---

## 5. Próximos passos sugeridos

1. Revisar e confirmar os itens da seção "2. Seções que precisam de revisão manual".
2. Ativar Wix Multilingual e configurar PT como idioma principal.
3. Recriar seção por seção seguindo os comentários `<!-- WIX: ... -->`.
4. Configurar SEO por página (title/description/OG) no painel nativo do Wix.
5. Publicar em ambiente de staging do Wix e testar os 3 idiomas, mobile e desktop, antes de ir ao ar.
