#!/bin/bash
set -e

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Определяем путь к конфигурационному файлу в текущей директории
CONFIG_FILE="deploy.conf"

# Проверка и загрузка файла конфигурации
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}Ошибка: Файл конфигурации $CONFIG_FILE не найден.${NC}"
    echo -e "${RED}Создайте файл deploy.conf с необходимыми параметрами:${NC}"
    echo -e "${RED}DOMAIN=your-domain.ru${NC}"
    echo -e "${RED}EMAIL=admin@your-domain.ru${NC}"
    echo -e "${RED}SITE_DIR=/var/www/your-site-folder${NC}"
    exit 1
fi

# Загружаем конфигурацию
source "$CONFIG_FILE"

# Проверяем наличие всех необходимых параметров
if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Ошибка: Параметр DOMAIN не указан в файле конфигурации.${NC}"
    exit 1
fi

if [ -z "$EMAIL" ]; then
    echo -e "${RED}Ошибка: Параметр EMAIL не указан в файле конфигурации.${NC}"
    exit 1
fi

if [ -z "$SITE_DIR" ]; then
    echo -e "${RED}Ошибка: Параметр SITE_DIR не указан в файле конфигурации.${NC}"
    exit 1
fi

# Задаем переменные на основе конфигурации
SITE_NAME=$(basename "$SITE_DIR")
DOCKER_COMPOSE_FILE="$SITE_DIR/docker-compose.yml"
NGINX_CONF="/etc/nginx/sites-available/$SITE_NAME"

echo -e "${GREEN}Настройка для:${NC}"
echo -e "${GREEN}Домен: ${DOMAIN}${NC}"
echo -e "${GREEN}Email: ${EMAIL}${NC}"
echo -e "${GREEN}Директория сайта: ${SITE_DIR}${NC}"
echo -e "${GREEN}Конфигурация Nginx: ${NGINX_CONF}${NC}"

# Проверка существования папки приложения
if [ ! -d "$SITE_DIR" ]; then
    echo -e "${BLUE}Директория $SITE_DIR не существует, создаем...${NC}"
    mkdir -p "$SITE_DIR"
fi

# Обновление системы
echo -e "${GREEN}Обновление системы...${NC}"
apt-get update && apt-get upgrade -y

# Установка необходимых пакетов
echo -e "${GREEN}Установка необходимых пакетов...${NC}"
apt-get install -y curl git nginx software-properties-common python3-certbot-nginx ufw

# Настройка фаервола
echo -e "${GREEN}Настройка фаервола...${NC}"
ufw allow 'Nginx Full'
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable

# Установка Docker
echo -e "${GREEN}Установка Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    systemctl enable docker
    systemctl start docker
    rm get-docker.sh
else
    echo -e "${BLUE}Docker уже установлен${NC}"
fi

# Установка Docker Compose
echo -e "${GREEN}Установка Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    apt-get install -y docker-compose
else
    echo -e "${BLUE}Docker Compose уже установлен${NC}"
fi

# Копируем конфигурационный файл в директорию сайта, если его там нет
if [ ! -f "$SITE_DIR/$CONFIG_FILE" ]; then
    echo -e "${GREEN}Копирование конфигурационного файла в $SITE_DIR...${NC}"
    cp "$CONFIG_FILE" "$SITE_DIR/"
fi

# Обновление домена в конфигурационных файлах
echo -e "${GREEN}Обновление домена в конфигурационных файлах...${NC}"
if [ -f "$SITE_DIR/src/constants/seo.ts" ]; then
    sed -i "s/siteUrl: .*,/siteUrl: 'https:\/\/${DOMAIN}',/" "$SITE_DIR/src/constants/seo.ts"
fi

if [ -f "$SITE_DIR/next-sitemap.config.js" ]; then
    sed -i "s/siteUrl: .*,/siteUrl: process.env.SITE_URL || 'https:\/\/${DOMAIN}',/" "$SITE_DIR/next-sitemap.config.js"
fi

# Создание Docker Compose файла, если его нет
if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
    echo -e "${GREEN}Создание Docker Compose файла...${NC}"
    cat > $DOCKER_COMPOSE_FILE << EOL
version: '3'

services:
  $SITE_NAME:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SITE_URL=https://${DOMAIN}

networks:
  default:
    external: false
EOL
else
    echo -e "${BLUE}Docker Compose файл уже существует, обновляем URL...${NC}"
    sed -i "s/SITE_URL=https:\/\/.*$/SITE_URL=https:\/\/${DOMAIN}/" $DOCKER_COMPOSE_FILE
fi

# Создаем Dockerfile если его нет
if [ ! -f "$SITE_DIR/Dockerfile" ]; then
    echo -e "${GREEN}Создание Dockerfile...${NC}"
    cat > "$SITE_DIR/Dockerfile" << EOL
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменные окружения
ENV NODE_ENV production
ENV SITE_URL https://${DOMAIN}

# Собираем проект
RUN npm run build

# Запускаем приложение
CMD ["npm", "start"]
EOL
fi

# Создание/обновление скрипта для обновления домена
echo -e "${GREEN}Создание скрипта для обновления домена...${NC}"
cat > "$SITE_DIR/update-domain.sh" << EOL
#!/bin/bash
set -e

if [ -z "\$1" ]; then
    echo "Использование: \$0 новый-домен [новый-email]"
    exit 1
fi

NEW_DOMAIN=\$1
NEW_EMAIL=\$2

# Загружаем текущую конфигурацию
source "./deploy.conf"

# Обновление в файлах конфигурации
if [ -f "./src/constants/seo.ts" ]; then
    sed -i "s/siteUrl: .*,/siteUrl: 'https:\/\/\${NEW_DOMAIN}',/" ./src/constants/seo.ts
fi

if [ -f "./next-sitemap.config.js" ]; then
    sed -i "s/siteUrl: .*,/siteUrl: process.env.SITE_URL || 'https:\/\/\${NEW_DOMAIN}',/" ./next-sitemap.config.js
fi

# Обновление в файле docker-compose.yml
sed -i "s/SITE_URL=https:\/\/.*$/SITE_URL=https:\/\/\${NEW_DOMAIN}/" ./docker-compose.yml

# Обновление конфигурационного файла
sed -i "s/DOMAIN=.*/DOMAIN=\${NEW_DOMAIN}/" ./deploy.conf
if [ ! -z "\$NEW_EMAIL" ]; then
    sed -i "s/EMAIL=.*/EMAIL=\${NEW_EMAIL}/" ./deploy.conf
fi

# Обновление конфигурации Nginx
NGINX_CONF="/etc/nginx/sites-available/$SITE_NAME"
sudo sed -i "s/server_name .*;/server_name \${NEW_DOMAIN} www.\${NEW_DOMAIN};/" \$NGINX_CONF
sudo nginx -t && sudo systemctl restart nginx

echo "Домен обновлен на \${NEW_DOMAIN}"
echo "Не забудьте обновить SSL-сертификат командой:"

if [ ! -z "\$NEW_EMAIL" ]; then
    echo "sudo certbot --nginx -d \${NEW_DOMAIN} -d www.\${NEW_DOMAIN} -m \${NEW_EMAIL} --agree-tos --non-interactive"
else
    echo "sudo certbot --nginx -d \${NEW_DOMAIN} -d www.\${NEW_DOMAIN} --agree-tos --non-interactive"
fi

echo "И перезапустить контейнеры: docker-compose down && docker-compose up -d"
EOL

chmod +x "$SITE_DIR/update-domain.sh"

# Настройка Nginx
echo -e "${GREEN}Настройка Nginx...${NC}"
cat > $NGINX_CONF << EOL
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Включение сайта в Nginx
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Получение SSL-сертификата
echo -e "${GREEN}Получение SSL-сертификата...${NC}"
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL

# Запуск контейнеров
echo -e "${GREEN}Запуск Docker контейнеров...${NC}"
cd "$SITE_DIR"
docker-compose up -d

echo -e "${GREEN}Установка завершена!${NC}"
echo -e "${BLUE}Ваш сайт доступен по адресу: https://${DOMAIN}${NC}"
echo -e "${BLUE}Для изменения домена используйте скрипт: $SITE_DIR/update-domain.sh новый-домен [новый-email]${NC}"