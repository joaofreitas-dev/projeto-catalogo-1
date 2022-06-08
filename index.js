const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const jogos = [
  {
    id: 1,
    titulo: "Grand Theft Auto V",
    imagem:
      "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1618856444",
    descricao:
      "Grand Theft Auto V para PC oferece aos jogadores a opção de explorar o gigantesco e premiado mundo de Los Santos e Blaine County em resoluções de até 4K e além, assim como a chance de experimentar o jogo rodando a 60 FPS (quadros por segundo).",
    genero: "Ação, Aventura",
    plataforma: "PlayStation, Xbox, Microsoft Windows",
    preco: "168,39",
    desenvolvedor: "Rock Star Studios",
    reqmin: "Processador: Intel Core 2 Q6600 @ 2.40GHz / AMD Phenom 9850 @ 2.5GHz. Memória: 4 GB de RAM. Placa de vídeo: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11) Armazenamento: 72 GB de espaço disponível.",
    reqideal: "Sistema operacional: Windows 8 ou 8.1 64-Bit, Windows 7 64-Bit Service Pack 1 ou superiores. Processador / CPU: Intel Core i5 3470 3.2GHz Quad-core ou AMD X8FX-8350 de 4 GHz Octa-core ou superiores. Memória: 8 GB de RAM."
  },

  {
    id: 2,
    titulo: "Dark Souls™ III",
    imagem:
      "https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg?t=1653584490",
    descricao:
      "DARK SOULS™ continua a ultrapassar seus próprios limites em um ambicioso novo capítulo da série que definiu um gênero e que é aclamada pela crítica. Prepare-se para abraçar a escuridão!",
    genero: "Ação, RPG",
    plataforma: "PlayStation, Xbox, Microsoft Windows",
    preco: " 159,90",
    desenvolvedor: "FromSoftware",
    reqmin: "A memória RAM mínima que você precisa para reproduzir o seu jogo é de 6 GB. Processador mínimo exigido: Intel Core i5-2300, AMD FX-6300. Processador gráfico mínimo: GeForce GTX 460, Radeon HD 6870 para um bom funcionamento. O espaço mínimo que precisa é de 8 GB.",
    reqideal: "Sistema Operativo: Windows 7 SP1 64bit, Windows 8.1 64bit Windows 10 64bit. Processador: Intel Core i7-3770 / AMD® FX-8350. Memória: 8 GB de RAM. Placa gráfica: NVIDIA® GeForce GTX 970 / ATI Radeon R9 series. DirectX: Versão 11. Rede: Ligação à Internet de banda larga. Espaço no disco: Requer 25 GB de espaço livre."
  },

  {
    id: 3,
    titulo: "Minecraft",
    imagem:
      "https://www.minecraft.net/content/dam/minecraft/home/Games_Subnav_Minecraft-228x350.png",
    descricao:
      "Minecraft é um jogo eletrônico, que tem por objetivo básico construir e quebrar blocos. O jogo foi criado pelo sueco Markus Persson, lançado em 2011, inicialmente para PC e posteriormente para outras plataformas como Playstation 3, Playstation 4, Xbox 360 e Xbox One.",
    genero: "Ação, RPG",
    plataforma: "PlayStation, Xbox, Microsoft Windows",
    preco: " 129,90",
    desenvolvedor: "Mojang Studios",
    reqmin: "Sistema operacional: Windows 7, Mac OS X 10.9, Linux distribuição de 2014 ou mais recente. Processador: Intel Core i3-3210 3.2 GHz ou AMD A8-7600 APU 3.1 GHz. Memória RAM: 4GB. Placa de vídeo: Intel Graphics 4000, NVidia GeForce 400 ou AMD Radeon R5 com Open GL 4.4.",
    reqideal: "Sistema operacional: Windows 10, macOS 10.12, Linux distribuição de 2014 ou mais recente. Processador: Intel Core i5-4690 3.5 GHz ou AMD A10-7800 APU 3.5 GHz. Memória RAM: 8GB. Placa de vídeo: NVidia GeForce 700 ou AMD Radeon RX 200 com Open GL 4.5. Armazenamento: 4 GB de espaço disponível em SSD."
  },
];

let jogo = undefined;

app.get("/", (req, res) => {
  res.render("index", { jogos, jogo });
});



app.post("/create", (req, res) => {
  const jogo = req.body;
  jogo.id = jogos.length + 1;
  jogos.push(jogo);
  res.redirect("/");
});

app.get("/detalhes/:id", (req, res) => {
   id = +req.params.id;
  jogo = jogos.find((jogo) => jogo.id == id);
  res.render("detalhes", { jogo, jogos });
});


app.get("/cadastro", (req, res) => {
  res.render("cadastro", { jogos, jogo });
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  jogo = jogos.find((jogo) => jogo.id === id);
  const newjogo = req.body;
  newjogo.id = id + 1;
  jogos[id] = newjogo;
  jogo = undefined;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;

  delete jogos[id];

  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
