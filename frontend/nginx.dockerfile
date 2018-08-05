FROM nginx:alpine
LABEL author="Danail Videv"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# ng build --watch --delete-output-path false

# build the docker image:
# docker build -t nginx-angular -f nginx.dockerfile .

# run the docker container
# docker run -p 8080:80 -v $(pwd)/dist:/usr/share/nginx/html nginx-angular