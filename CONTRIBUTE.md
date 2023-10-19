## 🟢 Ветвление

🔹 Один из вариантов - Git flow (with elements of GitHub Flow).

Creating a feature branch in Gitflow is a straightforward process.

First, you need to create a new branch off of the develop branch. This branch should be named according to the feature you are working on, such as “feature/my-new-feature”.

Next, you should switch to the new branch and make your changes. This could include adding new files, modifying existing files, or deleting files.

Once you have made your changes, you should commit them to the feature branch. This will create a snapshot of your changes that can be used to track progress.

Once you have committed your changes, you should push the feature branch to the remote repository. This will allow other developers to access your changes and collaborate on the feature.

Finally, you should create a pull request to merge the feature branch into the develop branch. This will allow other developers to review your changes and provide feedback before they are merged into the main codebase.

Once the pull request is approved, the feature branch can be merged into the develop branch and the feature branch can be deleted.

It's important to use continuous integration. This involves integrating the code into the main branch on a regular basis. This helps to ensure that the code is always up to date and that any potential issues or bugs are identified quickly.

🔹 Названия для веток даются по шаблону:

> refactor/что затронули

Например:

> test/auth-service
>
> hotfix/bem-naming
>
> refactor/auth-controller
>
> fix/libs/workbooks-view
>
> featture/questions
>
> refactor/user/questions/question-form

## &nbsp;

---

## 🟢 Политика слияния [Semi-linear merge](https://devblogs.microsoft.com/devops/pull-requests-with-rebase/)

![semi linear](https://devblogs.microsoft.com/devops/wp-content/uploads/sites/6/2019/04/semilinear-1.gif)

Эта стратегия представляет собой смесь rebase и merge.

1. Сначала коммиты в PR ребейзятся поверх основной ветки.
2. Затем происходит слияние с основной веткой с созданием мерж реквеста. Это эмулирует выполнение `git rebase master` на ветке pull request, а затем `git merge pr --no-ff` на ветке master.

Сочетает в себе лучшие из двух миров: отдельные коммиты сохраняются, чтобы мы могли видеть, как равивалась работа, но вместо простого ребейза у нас создается мерж коммит, чтобы мы могли увидеть начало и конец работы в каждом PR.

## &nbsp;

---

## 🟢 Conventional commits

https://www.conventionalcommits.org/ru/v1.0.0-beta.2/

Коммиты делаются малыми шагами, используя Conventional Commits.
Язык для комментариев En или Ru.
Лучше использовать шаблон:

```
<type>[optional область]: <краткое описание>

[optional тело]

[optional подвал]
```

### 🔹 type

Для автоматизированной обработки важно чтобы типы были стандартизированы, их можно расширять, но базовый набор содержит следующие: feat:, fix:, build:, chore:, ci:, docs:, style:, refactor:, perf:, test:;

_feat_ - добавление новой функциональности  
_fix_ - исправление ошибки  
_build_ - изменения, затрагивающие процесс сборки приложения (например, _добавление_ зависимости в package.json).  
_ci_ - изменения, затрагивающие CI процессы  
_docs_ - изменения в документации, не затрагивающие работу кода  
_style_ - изменение в форматировании кода, не затрагивающие его реализацию (например переименование переменных)  
_refactor_ - изменение в реализации кода  
_perf_ - изменения, повышающие производительность кода (например, оптимизация работы алгоритма)  
_test_ - изменения затрагивающие тесты и не влияющие на функциональность  
_chore_ - изменение, не подпадающее под перечисленные категории

### 🔹 description

Важное правило: хорошее примечание к коммиту должно заканчивать следующее предложение:
«После применения данного коммита будет {{ текст вашего примечания }}». При этом первая часть фразы в коммите не пишется, она произносится в уме.

Например:

> После применения данного коммита будет _обновлен файл readme_  
> После применения данного коммита будет _добавлена валидация вызова GET /user/:id API_  
> После применения данного коммита будет _отменен коммит 12345_

Или

«If applied, this commit will {{ your subject line here }}»

Например:

> If applied, this commit will _refactor subsystem X for readability_  
> If applied, this commit will _update getting started documentation_  
> If applied, this commit will _remove deprecated methods_

Примеры коммитов:

> _fix: move json module to modules_ - «If applied, this commit will move json module to modules»
>
> _feat: добавлен сервис для конвертации md в pdf_ - «После применения данного коммита будет добавлен сервис для конвертации md в pdf»
>
> Ещё примеры коммитов:
> refactor: remove unused methods
>
> refactor(activity-calendar): delete circle import
>
> feat: change title
>
> style: change padding and icon style
>
> fix: change init state from string to const
>
> chore: update file with version

## &nbsp;

---

## 🟢 kebab-case for File and Folder Names

MacOS has a case-insensitive file system, so MyComponent.js and myComponent.js are the same. Git didn't recognize the change, but the CI on GitHub used a Linux image, which is case-sensitive, causing issues.

While this may appear to be ok, there is a danger down the track, when you come to deploy to your Linux machine with a case-sensitive file system.

On your Mac (or PC), you can import a file with a slightly incorrect filename, like this:

> import MyWidget from './myWidget'

Notice the my in ./myWidget. This will work ok, but when you deploy, it will fail. These kinds of errors are difficult to find and fix, and you are usually under pressure to get things working, so are perhaps not as calm as you should be.

To avoid this problem, it's better to make ALL filenames/foldernames are lower case, and use kebab-case, which makes it easy to read.

> ❗ instead of MyComponent.js, write my-component.js.

> ❗ instead of useMyHook.js, write use-my-hook.js.

Next.js uses this by default, and Angular includes it in its style guide. Kebab-case can save you and your team some headaches.

## &nbsp;

## Explaining the process of creating and using .env files and consts

- Переменные окружения в Vite начинаются с префикса `VITE_`
- Для переменных окружения используется файл `.env.local` (они загружаются в любых случаях и игнорируются git'ом)
- Загруженные env переменные также доступны клиентскому исходному коду через `import.meta.env` (например `import.meta.env.VITE_API_URL;`)
- Файл `env.d.ts` в корне проекта для типизации переменных окружения, это необязательно, но позволит предотвратить часть ошибок, если вы пишете на ts
- если есть файл типизации (пункт выше), то импорт в ts происходит так `const apiUrl: string = import.meta.env.VITE_API_URL;`

## &nbsp;

## Этапы прекоммита и самого коммита

1.  (`npm run lint`/ `npm run format` / `npm run lint:fix`) по желанию
2.  (`npm run prepare`) первый запуск
3.  `git rebase develop` - При выполнении этой команды, Git применяет все коммиты с вашей ветки поверх последнего коммита в ветке `develop`
    (Важно понимать, что перебазирование изменяет историю коммитов. Поэтому, если вы делаете перебазирование ветки, которая уже была опубликована (например, синхронизирована с удаленным репозиторием), будьте осторожны, так как это может привести к проблемам с другими членами команды, использующими эту ветку.)
4.  `npm run commit` (выбор в терминале нужных пунктов и названий, дописывание комментариев)
5.  При необходимости, самостоятельная публикация ветки (если ее еще нет в общем репозитории)
6.  Создание pull request'а по изменениям и запрос merg'а в ветку develop

## &nbsp;

## ВАЖНО!

- Нельзя напрямую отправлять изменения в develop и main, создавайте локальные ветки для изменений, а затем закидывайте их в pull request для merg'a!!!

- Как можно чаще подтягивайте изменения с ветки develop

## &nbsp;

### Порядок подтягивания изменений:

1. Обновите вашу локальную копию основной ветки:
   `git fetch origin develop`
   (Эта команда загрузит последние изменения из удаленного репозитория ветки develop, но не применит их к вашей локальной ветке.)
2. `git merge origin/develop`
   Эта команда применит изменения из ветки develop к вашей текущей ветке.

### ИЛИ

`git rebase origin/develop`
Эта команда перебазирует вашу ветку на последний коммит из ветки develop.
Важно помнить, что перебазирование изменяет историю коммитов, поэтому будьте осторожны, если ваша ветка уже была опубликована и использована другими членами команды.

3. Если Git обнаружит конфликты при слиянии или перебазировании, вам придется разрешить их вручную.

4. Коммит
   `git add . `
   `git commit -m "Merge (или Rebase) with develop"`

## &nbsp;

### ИЛИ

1. Использование команды git pull
   `git pull origin develop`
   `git pull --rebase origin develop` (с перебазированием)

Эта команда сначала выполняет git fetch для загрузки последних изменений из удаленной ветки develop, а затем автоматически объединяет их с вашей текущей веткой.

2. Коммит
   `git add . `
   `git commit -m "Merge (или Rebase) with develop"`

## &nbsp;

Это все позволит избежать появления и накапливания конфликтов)))
