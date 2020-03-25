FROM node:12.6.0-alpine as BUILDER

WORKDIR /build

COPY . .

RUN npm install --global nps
RUN npm install

ARG SOCKET_ENDPOINT="http://localhost:8080/ws"

RUN GATSBY_SOCKET_ENDPOINT=$SOCKET_ENDPOINT nps build


FROM nginx:alpine

WORKDIR /campfire

COPY --from=BUILDER /build/public/ /usr/share/nginx/html/

EXPOSE 80