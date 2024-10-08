FROM node:18-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/defalt.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]