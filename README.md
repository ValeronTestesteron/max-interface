# MAX Messenger Prototype (GREEN-API Integration)

Веб-интерфейс для отправки и получения текстовых сообщений, в max.

## Технологический стек
* React 18+ (Hooks, Components decomposition)
* Vite (Сборщик проекта)
* GREEN-API (Методы: `SendMessage` и Long Polling `ReceiveNotification`)

## Запуск проекта
1. Клонировать репозиторий: `git clone <ссылка_на_ваш_репозиторий>`
2. Установить зависимости: `npm install`
3. Запустить локальный сервер: `npm run dev`
4. Ввести свои учетные данные `idInstance` и `apiTokenInstance` из панели GREEN-API.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
