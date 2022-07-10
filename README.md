# 誰でもチケットを販売できるアプリ

## 技術スタック

- Next.js
- TypeScript
- ESLint
- Prettier
- Jest
- Tailwind CSS
- Stripe.js

## ソース管理

- Github

## バックエンド

- Supabase
- Stripe
- Vercel

## 処理の流れ

プロダクト操作、料金操作
Stripe → webhook → Firebase

## Supabase の方情報抽出

コンソールで以下を入力
npx openapi-typescript https://"your-project".supabase.co/rest/v1/?apikey="your-anon-key" --output types/supabase.ts
