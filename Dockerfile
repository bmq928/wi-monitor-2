FROM keymetrics/pm2:8-alpine

ADD . /var/app
RUN cd /var/app && \
    npm install --production

WORKDIR /var/app

EXPOSE 3001
CMD [ "pm2-runtime", "start", "pm2.json" ]
# CMD node ./src/index.js