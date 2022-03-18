
// variáveis da Bolinha 

let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// variáveis da Raquete

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da Raquete Oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let velocidadeXbolinha = 7; 
let velocidadeYbolinha = 7;

let colidiu = false;

// placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo 

let raquetada;
let ponto;
let trilha;

function preload() {
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
  
}

let chanceDeErrar = 0;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();  
  movimentaBolinha();
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete,yRaquete);  
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  
   circle(xBolinha, yBolinha, diametro)
  
}

function movimentaBolinha(){
  
   xBolinha += velocidadeXbolinha;
  
  yBolinha += velocidadeYbolinha;
  
  
}

function verificaColisaoBorda(){
  
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    
    velocidadeXbolinha *= -1;
    
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0 ){
    
    velocidadeYbolinha *= -1;
    
  }
  
  
}

function mostraRaquete(x, y){
  
    rect(x, y, raqueteComprimento, raqueteAltura);

  
}

function movimentaRaquete (){
  
  if (keyIsDown(UP_ARROW)){
    
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    
    yRaquete += 10;
    
    
  }
  
}

function verificaColisaoRaquete() {
  
if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
  
    velocidadeXbolinha *= -1;
  
  
}
    raquetada.play();

    
  }
  
  function movimentaRaqueteOponente() {
    
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
    function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
    
  
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXbolinha *= -1;
        raquetada.play();

    }

}
 
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  
  fill(color(255, 140, 0));
  rect(150, 10,40,20);
    fill(255);
  text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
  rect(450,10,40,20);
    fill(255);
  text(pontosOponente, 470, 26);
}
    
 function marcaPonto(){
   if (xBolinha > 590){
     meusPontos += 1;
     ponto.play();
   
   }
    if (xBolinha < 10){
      
      pontosOponente += 1;
      ponto.play();
      
    } 
   
 }

