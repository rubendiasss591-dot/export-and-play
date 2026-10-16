<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture decisions

- Route all application page redirects through the shared, globally exposed `redirectWithParams` helper, including error-page recovery, so the original query string is preserved without touching checkout tracking or business logic.

- Keep this single-product storefront as one route, using local public assets for the cloned source and CDN pointers for user-uploaded media.
- Gate Meta Pixel loading by country, Global Privacy Control, and a persistent local opt-out so ad measurement respects the no-banner privacy route.
