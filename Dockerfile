FROM node:20.9.0-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
CMD cp -r build result_build
