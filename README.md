# Conexão.fr — site institucional (PT / FR / EN)

Site estático em HTML/CSS/JS puro, publicado no GitHub Pages a partir deste repositório. Cada `git push` na branch `main` publica automaticamente, em 1 a 2 minutos.

## Estrutura

```
index.html                     Português (pt-BR)  →  https://conexao.fr/
fr/index.html                  Français           →  https://conexao.fr/fr/
en/index.html                  English            →  https://conexao.fr/en/
privacidade/index.html         Avisos legais e privacidade (PT)
fr/confidentialite/index.html  Mentions légales et confidentialité (FR)
en/privacy/index.html          Legal notice and privacy (EN)
assets/site.css                Design system e estilos (compartilhado)
assets/site.js                 Menu, banner de cookies (Consent Mode v2), eventos para o GTM, agenda
assets/foto-diogo.jpg          Foto (800×800, otimizada)
assets/logo-*.png              Logos Kokua e Skin Essentials (uso autorizado)
assets/og-image.png            Imagem de compartilhamento (1200×630)
sitemap.xml, robots.txt, llms.txt, favicon.svg, 404.html
CNAME, .nojekyll               Necessários ao GitHub Pages (domínio personalizado e sem Jekyll)
docs/gtm-container-conexaofr.json   Container do GTM para importar
```

O design system (cores e tipografia) está em variáveis CSS no `:root` de `assets/site.css`. Como o CSS e o JS são compartilhados, uma mudança visual é feita uma vez só.

## Publicação

1. Editar os arquivos.
2. `git add -A && git commit -m "mensagem" && git push`.
3. O GitHub Pages publica em 1 a 2 minutos (aba Actions do repositório mostra o andamento).

DNS (gerenciado no Wix, para manter o e-mail do Google Workspace): o domínio raiz tem quatro registros A do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) e o `www` um CNAME para `diogooliveira-conexaofr.github.io`. Não alterar os registros MX e TXT. O repositório é público (exigência do plano gratuito do GitHub Pages).

## SEO e AIO

- `lang` correto por página; `hreflang` auto-referenciado entre PT, FR e EN, com `x-default` apontando para PT.
- URLs canônicas sem `www`.
- JSON-LD: `Person`, `ProfessionalService` (com catálogo de serviços) e `FAQPage`, no idioma de cada página.
- `sitemap.xml` com alternativas de idioma, `robots.txt` liberando rastreadores de IA e `llms.txt` com o resumo da entidade.
- Nome e cargo idênticos nas três versões: "Diogo Pires de Oliveira" e "Consultor Estratégico Independente / Consultant Stratégique Indépendant / Independent Strategy Consultant".
- Ao mudar textos de FAQ, atualizar também o JSON-LD `FAQPage` da mesma página (o texto precisa ser igual).

## Tagueamento (GTM + GA4 + Google Ads)

- Container GTM: `GTM-M29VZQ7R`, instalado nas 6 páginas.
- Consent Mode v2: `ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage` começam **negados**; o banner de cookies atualiza conforme a escolha. "Gerenciar cookies" no rodapé reabre o banner.
- A agenda do Google Calendar só carrega após clique em "Ver horários disponíveis" (ou após aceitar cookies).

Eventos enviados ao `dataLayer` (todos com `page_language`):

| Evento | Quando | Parâmetros |
|---|---|---|
| `contact_click` | clique em e-mail, telefone ou LinkedIn | `contact_method`, `click_location` |
| `cta_click` | clique em botão que leva a uma âncora | `cta_text`, `cta_target`, `click_location` |
| `language_switch` | troca de idioma | `target_language` |
| `scheduler_load` | agenda carregada | `auto_loaded` |
| `view_scheduler` | agenda entra na tela | |
| `consent_update` | escolha no banner | `consent_granted` |

### Configurar no GTM

1. GTM → Admin → Import Container → `docs/gtm-container-conexaofr.json` → workspace existente → **Merge** (sobrescrever conflitos não é necessário).
2. Em Variáveis, abrir `const - GA4 Measurement ID` e trocar `G-XXXXXXXXXX` pelo ID real do GA4.
3. Visualizar (Preview) navegando pelo site e conferindo que as tags disparam depois de aceitar os cookies; publicar a versão.
4. No GA4, marcar `contact_click` (e, se quiser, `scheduler_load`) como **eventos-chave**.

### Google Ads

O número exibido na conta (`141-446-7631`) é o **ID do cliente** e não serve para conversões. Caminho recomendado:

1. GA4 → Admin → Vínculos do Google Ads → vincular à conta `141-446-7631`.
2. No Google Ads → Metas → Conversões → Importar → Propriedades do Google Analytics 4 → importar `contact_click`.
3. Alternativa: criar uma conversão no Ads e usar a tag "Conversão do Google Ads" no GTM, que exige o **ID de conversão** (`AW-XXXXXXXXX`) e o **rótulo**.

## Pendências

- Atualizar a atividade (conseil, APE 7022Z) e o endereço (Chatou) no Guichet Unique, para bater com os avisos legais.
- ID de medição do GA4 (`G-…`) no GTM.
- Conferir os textos jurídicos com um profissional, se desejado.
