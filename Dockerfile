FROM mhart/alpine-node
WORKDIR /src
COPY package.json package.json
RUN npm install --production
ADD . .
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm","run","build"]
CMD ["npm","run","express-server"]
