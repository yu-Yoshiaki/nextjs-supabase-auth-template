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
- Vercel

## 決済システム

- Stripe

~~## 処理の流れ~~

~~プロダクト操作、料金操作~~
~~Stripe → webhook → Firebase~~
Firebaes → Supabase に乗り換え
Supabase は、サーバーレス関数が開発途上のため見送り。

## Supabase の型情報抽出

コンソールで以下を入力
npx openapi-typescript https://"your-project".supabase.co/rest/v1/?apikey="your-anon-key" --output types/supabase.ts
