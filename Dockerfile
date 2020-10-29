FROM node:latest

RUN apt-get update && apt-get install -y git \
    && git clone https://github.com/usermine12/mjws-backend \
    && cd mjws-backend && npm install

WORKDIR /mjws-backend
EXPOSE 4000
CMD ["npm", "run", "start"]