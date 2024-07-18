# Установка базового образа
FROM node:18

# Создание рабочей директории
WORKDIR /usr/src/app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Компиляция TypeScript в JavaScript
RUN npm run build

# Указание команды для запуска приложения
CMD ["node", "dist/index.js"]

# Экспонирование порта
EXPOSE 3000