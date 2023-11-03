FROM node:20.9.0
WORKDIR /app 
COPY package.json package.json 
COPY package-lock.json package-lock.json 
RUN npm install 
COPY . . 
RUN npm run build
# CMD cp -r dist
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/dist"] 