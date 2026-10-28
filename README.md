# lg-webos-vasco

Minha versão do launcher do Clean Your TV para LG webOS. Fiz para a minha TV: tela inicial limpa, em português, com relógio de 24 horas, um wallpaper do Vasco e um card com o calendário do time, mostrando o próximo jogo e o último resultado. O nome na saudação e o time do card são configuráveis, então dá para usar na sua TV com o seu nome e o seu time.

Isto não é um projeto do zero. O launcher é do Razdva122 (veja os créditos no fim) e aqui estão só as mudanças que fiz em cima dele, mais o arquivo novo do card de jogo. A instalação na TV continua sendo a do projeto original.

## O que muda em relação ao original

- Saudação em português (Bom dia, Boa tarde, Boa noite), com o nome que você colocar em `name`. No dia do jogo ela vira "Dia de jogo".
- Relógio de 24 horas, sem am/pm.
- Wallpaper de fundo com um véu escuro por cima, para o texto branco continuar legível. Os cards ficaram translúcidos.
- Cards de app menores (300 x 169 em vez de 360 x 202), o que deixa caber mais coisa na tela.
- Duas opções novas no `config.js`: `rowTwo`, uma segunda linha de apps, e `onlyListed`, para mostrar só os apps que você listou.
- `vasco.js`: card com o próximo jogo (dia, hora, estádio, campeonato) e o último resultado. Os dados vêm do TheSportsDB, que tem uma chave pública gratuita. O resultado fica guardado no `localStorage`, então se a TV estiver sem internet o card continua aparecendo com o último valor.

## Como usar na sua TV

Você precisa do modo desenvolvedor da LG ativo e de um computador na mesma rede. O passo a passo completo, com os pré-requisitos (Node, Python e Git), está em https://github.com/Razdva122/clean-your-tv-lg-webos/blob/main/docs/INSTALL.md. Leia antes de começar, principalmente a parte de recuperação.

Com isso pronto:

1. Clone o projeto original e volte para o commit em que fiz as mudanças:

```sh
git clone https://github.com/Razdva122/clean-your-tv-lg-webos.git
cd clean-your-tv-lg-webos
git checkout 9558611134270f3744658f0f6619ad0e67c5e37b
```

2. Baixe este repositório em outra pasta e aplique o patch dentro do projeto original:

```sh
git apply /caminho/para/lg-webos-vasco/patches/launcher.patch
cp /caminho/para/lg-webos-vasco/launcher/vasco.js launcher/
cp /caminho/para/lg-webos-vasco/launcher/wallpaper.jpg launcher/
cp /caminho/para/lg-webos-vasco/launcher/config.example.js launcher/config.js
```

3. Abra `launcher/config.js` e ajuste o nome, o time e os apps (veja abaixo).

4. O wallpaper do Vasco já vem em `launcher/wallpaper.jpg`. Para usar outro, troque o arquivo por uma imagem de 1920 x 1080. Sem imagem o fundo fica preto e o resto funciona igual.

5. Rode a instalação do projeto original com o IP da sua TV:

```sh
./install.sh 192.168.1.50
```

O `install.sh` baixa as ferramentas, pareia com a TV, monta o launcher e instala. Quando precisar, ele pede a senha que aparece na tela da TV.

## Configuração

- `name`: nome na saudação. Vazio, aparece só "Bom dia".
- `teamId`: id do time no TheSportsDB. Para achar o do seu, abra `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=Flamengo` trocando o nome, e copie o campo `idTeam`. O padrão, 134282, é o Vasco.
- `columns`, `dockApps`, `rowTwo`, `hiddenApps` e `onlyListed`: grade e lista de apps. Os ids são os do webOS, por exemplo `netflix` e `youtube.leanback.v4`. Para listar os ids dos apps da sua TV, use `python3 sync-apps.py IP-DA-TV --list` dentro do projeto original.

Os nomes de campeonato e os textos do card estão em português dentro do `vasco.js` (procure por `LEAGUES`). Se o seu time joga outras competições, acrescente ali.

## Limitações

- O launcher original foi testado numa LG OLED C3. Em outros modelos e versões de webOS pode se comportar diferente, então leia a parte de compatibilidade e de recuperação do projeto original antes de instalar.
- O `app.js` do original já vem minificado, por isso o patch mexe numa linha enorme. Ele aplica limpo no commit citado acima; em versões mais novas do original pode dar conflito.
- Nunca suba para o GitHub o `.lgtv-key.json` nem o `launcher/config.js` com dados seus. O `.gitignore` daqui já ignora os dois.
- A foto do wallpaper é de estádio e não sou o dono dos direitos de tudo que aparece nela. Se for reaproveitar o repo em algo comercial, troque a imagem.

## Créditos

- Clean Your TV para LG webOS, de Razdva122: https://github.com/Razdva122/clean-your-tv-lg-webos. É a base de tudo isto.
- webos-vibehack, de OmkarK97, em que o projeto acima se baseia: https://github.com/OmkarK97/webos-vibehack
- Dados dos jogos e escudos: TheSportsDB, https://www.thesportsdb.com

## Licença

MIT, a mesma do projeto original. O arquivo LICENSE mantém o copyright dos autores originais e acrescenta o meu.
