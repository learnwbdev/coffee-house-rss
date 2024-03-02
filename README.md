# Учебный-проект: "Coffee House"

![Screenshot-Coffee-House](https://github.com/learnwbdev/coffee-house-rss/assets/138000021/7ca6e1ec-d7ec-431f-8ccb-3c02ed620b30)

## 1. Описание
Двухстраничный сайт для вымышленной кофейни **&laquo;Resource&raquo;**.

Проект реализован в рамках курса [**&laquo;JavaScript/Front-end&raquo;**](https://rs.school/js/) от **The Rolling Scopes School**.

#### 📄 Задание: [исходное задание от RS School](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/coffee-house/coffee-house.md)

#### 🎨 Макет: [макет Figma от RS School](https://www.figma.com/file/SAoBmuOqTfguehdT4IFRxQ/Coffee-House?type=design&node-id=0-1&mode=design&t=qis81E9Ovgx47eVl-0)

#### 🖥️ Деплой: [демо-сайт Coffee House](https://learnwbdev.github.io/coffee-house-rss/pages/home)

## 2. Стек технологий
![Иконка HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge)
![Иконка CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)
![Иконка JavaScript](https://img.shields.io/badge/JavaScript-323330?logo=javascript&logoColor=F7DF1E&style=for-the-badge)

## 3. Функционал
- двухстраничная отзывчиво-адаптивная верстка
- гамбургер-меню
- на странице **Home**:
    - карусель с автопрокруткой для популярных напитков
- на странице **Menu**:
    - переключение между разделами меню (**Coffee**, **Tea**, **Dessert**)
    - открытие модальных окон по клику на карточки меню
    - отображение стоимости при выбранном размере и добавках в модальном окне для каждой карточки меню
    - загрузка дополнительных карточек меню по нажатию на кнопку (для мобильных устройств)

## 4. Установка и запуск проекта в локальном репозитории

1. `git clone https://github.com/learnwbdev/coffee-house-rss.git` - клонировать репозиторий (HTTPS) на локальный компьютер

2. для просмотра страницы можно воспользоваться расширением [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) для **Visual Studio Code**. При установленном расширении необходимо нажать `"Open with Live Server"` в контекстном меню для файла `coffee-house-rss/pages/home/index.html`.<br>

## 5. Процесс создания
Проект был реализован в 3 этапа:

- **фиксированная верстка** страниц **Home** и **Menu** по макету для разрешения экрана **1440px**
- добавление **адаптивности** сайта от **380px** до **1440px**
- подключение **интерактивности** для страниц сайта
