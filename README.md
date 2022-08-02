# Next.js + Supabase Authenticate テンプレート

## 技術スタック

- Next.js
- TypeScript
- ESLint
- Prettier
- Jest
- Tailwind CSS

## ソース管理

- Github

## バックエンド

- Supabase

## Supabase の型情報抽出

コンソールで以下を入力
npx openapi-typescript https://"your-project".supabase.co/rest/v1/?apikey="your-anon-key" --output type/supabase.ts

## Supabase を利用するにあたって

### 用意するもの

- Supabase のプロジェクト URL
- anon key
- role key (ユーザー削除用)

※ ユーザー削除はサーバーサイドで起動する必要がある。(Next.js だと SSG, SSR。もしくは API Route で。)
※ サーバーサイドで Supabase を使用する場合に role key が必要。
