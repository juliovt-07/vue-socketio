<img src="icon.svg" align="right" width="200" height="145" />

# Vue-Socketio

`Vue-Socketio` é um boilerplate vue-socket.io para configurar uma nova aplicação vue usando node backend e websockets. Ele consiste em um cliente vue e um servidor node e está usando [vue-socket.io-extended] (https://github.com/probil/vue-socket.io-extended) para vincular socket.io à instância Vue. O projeto está configurado para ser implantado no Heroku.

:sparkles: Aplicação demonstrativa:
[vue-socketio-heroku-starter.herokuapp.com](https://vue-socketio-heroku-starter.herokuapp.com/)

## Execute

Execute `yarn start` para desenvolvimento, execute `yarn build` e `yarn start` para produção

O projeto é uma aplicação de contador simples, usando um servidor node-socket.io para incrementar o valor em todos os clientes conectados. O servidor node está localizado em `server.js`.

## Fazer Deploy no Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/alexwidua/vue-socketio-heroku-starter)

ou crie manualmente um novo aplicativo Heroku e adicione os buildpacks `heroku/nodejs` e` https://github.com / heroku/heroku-buildpack-static`. Observe que
o servidor node é executado a partir do caminho especificado no [Procfile] (https://heroku-vue-socket-test.herokuapp.com/).
