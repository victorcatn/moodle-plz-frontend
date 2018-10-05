### STAGE 1: Build ###
# We label our stage as ‘builder’
FROM agonzalez3/angular-cli:6.1.5 as builder

USER root
WORKDIR /sein-app
COPY sein-app ./

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm install && ng build --prod

### STAGE 2: Setup ###
FROM nginx:1.13.9-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /sein-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
