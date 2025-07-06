FROM node:iron

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . /app


RUN npm run build
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

EXPOSE 3000

# For Vite HMR
EXPOSE 24678 

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]