FROM node:latest as builder

COPY ./package.json ./package-lock.json /app/
WORKDIR /app/
RUN npm ci

COPY . /app/
RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
