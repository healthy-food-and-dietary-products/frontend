# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Explaining the process of creating and using .env files and consts

- Переменные окружения в Vite начинаются с префикса `VITE_`
- Для переменных окружения используется файл `.env.local` (они загружаются в любых случаях и игнорируются git'ом)
- Загруженные env переменные также доступны клиентскому исходному коду через `import.meta.env` (например `import.meta.env.VITE_API_URL;`)
- Файл `env.d.ts` в корне проекта для типизации переменных окружения, это необязательно, но позволит предотвратить часть ошибок, если вы пишете на ts
- если есть файл типизации (пункт выше), то импорт в ts происходит так `const apiUrl: string = import.meta.env.VITE_API_URL;`
