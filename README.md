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
npx openapi-typescript https://"your-project".supabase.co/rest/v1/?apikey="your-anon-key" --output types/supabase.ts
