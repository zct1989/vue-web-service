# 编译阶段
FROM node:lts-alpine as builder

ADD . /builder/
WORKDIR /builder

RUN yarn config set registry https://registry.npm.taobao.org \
  && yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass \
  && yarn \
  && npm run build \
  && rm -rf src node_modules

# 运行阶段
FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/nginx.conf

COPY --from=builder /builder/dist/ /usr/share/nginx/html/
COPY --from=builder /builder/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80