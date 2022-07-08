FROM node:14

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

RUN yarn install

# start app
CMD ["yarn", "start"]

EXPOSE 3000