
cnpm install && npm run build && cd ./server && npm install && cd .. && rm -rf ./server/public && mkdir ./server/public && mv ./dist/index.html ./server/public/index.html && mv ./dist/static/ ./server/public/static/