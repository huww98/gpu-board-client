# gpu-board-client

## With Docker

```shell
docker run --detach --name gpu-board-client \
    --publish 80 \
    --volume /opt/gpu-board/config.json:/usr/share/nginx/html/config.json:ro \
    --restart always \
    huww98/gpu-board-client
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
