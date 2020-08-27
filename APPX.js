//==============================  Procedimentos para instalação. ==================================
// instalar : NodeJS V 14.8 <- Versão diferente não funcionou.
//          : npm => Para instalação dos pacotes
//          
// Pacotes para manipular WhatsApp WEB
//          : npm i whatsapp-web.js  => Requer   - Manipulador do WhatsApp WEB
//          : npm i puppeteer        => Requer   - Abrir Browser e QRCode 
//          : npm i fd               => Requer   - Manipulador de Arquivos.
//          : npm i express          => Requer   - Conversor de Json   *****
//          : npm i request          => Requer   - Tiver que enviar dados para APIs Externas.
//          : npm i qrcode-terminal  => Opcional - Visualizar QRCode no Terminal
//
// Pacotes para servidor WEB
//          : npm install http
//          : npm install socket.io
//          : npm install body-parser
//          : npm install events
//          : npm install url
//          : npm install formidable
//          * npm install nodemailer
// LINKS
// https://github.com/pedroslopez/whatsapp-web.js/releases
// https://discord.com/channels/698610475432411196/744945758649843734
// https://waguide.pedroslopez.me/
// https://developers.google.com/web/tools/puppeteer/get-started
// 
//=====================================================================================================================
//---   PARAMETROS RECEBIDOS LINHA DOS
const paramPorta = process.argv.slice(2)
const paramSenha = process.argv.slice(3)
const [porta] = paramPorta;
const [senha] = paramSenha;
var txtport  = String(porta);
var txtsenha = String(senha);
var sair = 0;
// Valida parametros recebidos.
if (porta==undefined) {
    console.error('ERRO - Parametro 1 - PORTA - Não foi especificado')
    sair=1
};
if (senha==undefined) {
    console.error('ERRO - Parametro 2 - SENHA - Não foi especificado')
    sair=1
};
if (sair==1) {
    process.exit(0);
};
//=====================================================================================================================
// Include dos módulos...
// --- LIB WHATSAPP
const fs = require('fs');
const { Client } 	   = require('whatsapp-web.js');
const qrcode 	 	   = require('qrcode-terminal');
// --- LIB WEB SERVER
const app  			= require('express')();
const http 			= require('http').Server(app);
const io   			= require('socket.io')(http);
const bodyParser 	= require('body-parser');
const { Console } 	= require('console');

// Abrindo os limites de envio da string JSON parametros ---------------------------------------------------------------
app.use(bodyParser.json({
    limit: '150mb'
}));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    parameterLimit: 1000000,
    extended: true 
}));    

//---------  AUTENTICAÇÃO WHATSAPP-------------------------------------------------------------------------------------
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}
//Abre o Browse com o puppeteer
const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });
//const client = new Client({ puppeteer: { executablePath: '/path/to/chrome'}     });
// ou
//const client = new Client({session: sessionCfg});

client.initialize();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});
// CRIA ARQ. SESSION.json com o login do QRCode. 
client.on('authenticated', (session) => {
    console.log('AUTENTICANDO WHATSAPP', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});
client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTENTICAÇÃO FALHOU', msg);
    process.exit(0);
});
client.on('disconnected', (reason) => {
    console.log('WHATSAPP DESCONECTADO...', reason);
    console.log('RECONECTANDO, AGUARDE...', reason);
    client.initialize();
    //process.exit(0);
});
client.on('change_battery', (batteryInfo) => {
    // Battery percentage for attached device has changed
    const { battery, plugged } = batteryInfo;
    console.log(`Battery: ${battery}% - Charging? ${plugged}`);
});
client.on('CONFLICT', (reason) => {
    console.log('CONFLITO DETECTADO', reason);
    console.log('RECONECTANDO, AGUARDE...', reason);
    client.initialize();
});
client.on('change_state', (wastate) => {
    console.log("STATE = "+wastate);
});
client.on('ready', () => {
    console.log('WHATSAPP WEB PRONTO!  ( Versão 1.8 )');
    console.log('=============================================================');
    client.setDisplayName("BOT_WhatsAPP_Moshe");
});
//---------  FIM AUTENTICAÇÃO WHATSAPP --------------------------------------------------------------------------------




// SERVIDOR WEB ---------- REST API -----------------------------------------------------------------------------------
//-------- MÉTODOS
//--- PING
app.post('/ping', function(req, res) {
    var content = req.body;
    console.clear();
    if (content.toString()=="[object Object]") {
        console.log('--- PING-------------------------------------------------------------------------------------------');
        console.log(content.toString());
        today = new Date();
        console.log('SERVIDOR WEB ATIVO'+ req.ip.toString());
        console.log('{"PORTA":"'+ txtport + '","DATA": "'+ today.toString()+'"}');
        res.statusCode = 200;
        res.end('{"PORTA":"'+ txtport + '","DATA": "'+ today.toString()+'"}');
    }else{
        res.statusCode(400).end(content);
    }
    console.log('---------------------------------------------------------------------------------------------------');
});
//--- INBOX
app.post('/inbox', function(req, res) {
    var content = req.body;
    var txtret  = '';

    if (isEmptyObject(content)){
        txtret = 'Json Invalido';
    }else{
        if(content.envdata[0].token==txtsenha){

        
            let numImagens = content.envdata[0].imagens.length;

            // SAIDA NO CONSOLE
            console.clear();
            console.log('RECEBEMOS PELA API:');
            console.log('Telefone.: ' +content.envdata[0].fone);
            console.log('Mensagem : ' +content.envdata[0].textomsg );
            console.log('e-Mail...: ' +content.envdata[0].email );
            console.log('Anexos...: ' +numImagens );
            console.log('-------------------------------------------------------------');
            txtret = '{"FONE":"'+content.envdata[0].fone+'", "TEXTOMSG":"'+content.envdata[0].textomsg +'"}';
  
            if(content.envdata[0].fone!="" && content.envdata[0].textomsg!=""){
                // ENVIA A MSG PARA O TELEFONE VIA WHATSAPP
                client.sendMessage(content.envdata[0].fone+'@c.us',content.envdata[0].textomsg);
            }
            //Grava as Imagens recebidas em arquivos....E Envia no ZAP
            if (numImagens>0){
                //client.sendMessage(content.envdata[0].fone,"Enviando ("+numImagens+") imagens, aguarde...");
                for (let img of content.envdata[0].imagens) {
                    var arq = "./arqrecebidos/" + img[0];
                    let buff = new Buffer.from(img[1], 'base64');
                    fs.writeFileSync(arq, buff);

                    // Envia o arquivo para o ZAP, sem ler o arquivo fisico, passando direto a string base64
                    //const { MessageMedia } = require('whatsapp-web.js');
                    //const media = new MessageMedia.fromFilePath(arq);
                    //const media = new MessageMedia( "image/png" , img[1]);

                    var xext=img[0].split('.').pop().toUpperCase();
                    if (xext== "JPG") {
                        xm = "image/jpeg";
                    }
                    if (xext == "PNG"){
                        xm  = "image/png";
                    }
                    if (xext== "GIF") {
                        xm  = "image/gif";
                    }
                    if (xext == "WEPB"){ 
                        xm  = "image/webp";
                    }
                    if (xext== "BMP") {
                        xm  = "bimage/bmp";
                    }
                    if (xext == "TXT") {
                        xm  = "text/plain";
                    }
                    if (xext == "PDF") {
                        xm  = "application/pdf";
                    }
                    else if (xext == "OGG"){
                        xm  = "audio/ogg; codecs=opus";
                    }
                    console.log(xext + ' - ' + xm + ' - ',img[0] );
                    const { MessageMedia } = require('whatsapp-web.js');
                    const media = new MessageMedia( xm , img[1],img[0]);
                    let $jsnomearq = "{caption: '" +img[0]+ "'}"
                    // // let chat = await msg.getChat();
                    client.sendMessage(content.envdata[0].fone+'@c.us',media);

                }
            }
        }else{
            txtret = 'Token Invalido';
        }    
    }
    res.end(txtret);
});

//--- LISTEN API REST - SUPER ORELHA
http.listen(porta, function(){
    var addr = http.address();
    console.clear();
    console.log('=============================================================');
    console.log('SERVIDOR WEB PRONTO' + addr.address + ':' + addr.port);
    console.log('=============================================================');
});


//---------------------------------------------------------------------------------------------------------------------------
//--------- CHAMADAS DO WHASUP ----------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
client.on('message', async msg => {
    console.clear();
    console.log('=============================================================');
    console.log('MENSAGEM RECEBIDA', msg);

    //--- MEDIA - Quando Recebendo Arquivos...  Salvar no SRV LOCAL...
    if(msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        var extension = "";
        var xm = attachmentData.mimetype;
        console.log("MIDIA");
        console.log(xm);
        if (xm== "image/jpeg") 
            extension = "jpg";
        else if (xm == "image/png") 
            extension = "png";
        else if (xm== "image/gif") 
            extension = "gif";
        else if (xm == "image/webp") 
            extension = "webp";
        else if (xm== "image/bmp") 
            extension = "bmp";
        else if (xm == "text/plain") 
            extension = "txt";
        else if (xm == "application/pdf") 
            extension = "pdf";
        else if (xm == "audio/ogg; codecs=opus")
            extension = "ogg";
        if (extension == "")
            return;
        var base64Data = attachmentData.data.replace(/^data:image\/png;base64,/, "");
        const new_filename = "./arqrecebidos/" + msg.id.id + "." + extension;
        fs.writeFile(new_filename, base64Data, 'base64', function(err) {
            if (err != null) {
                console.log(err);
                return;
            }
        });
        msg.reply(`
            *Arquivo Recebido*
            Identicação: ${msg.id.id} 
            Enviado por: ${msg.id.remote}
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Tamanho : ${attachmentData.data.length}
        `);
    }

    //---------------------------- ROTINAS
    if (msg.body.toUpperCase()== 'PING2') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body.toUpperCase() == 'LINK') {
            msg.reply('https://www.dropbox.com/s/odlqxftgbthne0h/BotWhatsApp.zip?dl=0');

    } else if (msg.body == '!mediainfo' && msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
    //--------------------------- ENVIA LOGO
    } else if (msg.body.toUpperCase() == 'LOGO') {
        const { MessageMedia } = require('whatsapp-web.js');
        const media = MessageMedia.fromFilePath('Logo.png');
        let chat = await msg.getChat();
        client.sendMessage(msg.from,"Conforme Solicitado, Segue o Logotipo");
        chat.sendMessage(media);
        // const media = await new MessageMedia("image/jpeg", base64, "image.jpg");
        // client.sendMessage("xxxxxxxxxxxx@c.us", "My image JPG!", { media })

    //--------------------------- ENVIA PDF
    } else if (msg.body.toUpperCase() == 'PDF') {
        const { MessageMedia } = require('whatsapp-web.js');
        const media = MessageMedia.fromFilePath('teste.pdf');
        let chat = await msg.getChat();
        client.sendMessage(msg.from,"Conforme Solicitado, Segue o PDF");
        chat.sendMessage(media);    

    //--------------------------- ENVIA MP3
    } else if (msg.body.toUpperCase() == 'MP3') {
        const { MessageMedia } = require('whatsapp-web.js');
        const media = MessageMedia.fromFilePath('teste.mp3');
        let chat = await msg.getChat();
        client.sendMessage(msg.from,"Conforme Solicitado, Segue o MP3");
        chat.sendMessage(media);    

    //--------------------------- GRAVA NO WEBHOOK    
    }else if (msg.body.toUpperCase() == 'MM') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`Oi ${contact.number}`, {
            mentions: [contact]
            });
            console.log("Gravando ------------------------------");
        client.sendMessage(msg.from, 'Recebido.   Registrando, Aguarde...');
        var resposta = "";
        var request = require('request');
        var options = {
            'method': 'POST',
            'url': 'https://webapp.moshe.com.br/Api/WebHookMosheTeste/v1',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(msg)
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resposta = response.body;
            console.log(resposta);
            let info = client.info;
            client.sendMessage(msg.from, `
            *Informações*
            Nome...: ${info.pushname}
            Numero: ${msg.from}
            Ticket: ${resposta}
            `);
            console.log("FIM -----------------------------------");
        });
    }
});
// client.on('message', message => {
// 	console.log(message.body);
// });
// OUTRO MODO DE CHAMAR OS MÉTODOS
client.on('message', message => {
	if(message.body === 'ping' || message.body ==='PING' || message.body ==='Ping'  ) {
		message.reply('pong');
	}
});
client.on('message', message => {
	if(message.body.toUpperCase() == 'OI' ) {
		message.reply('Estou Ouvindo.... Continua.  :-)');
	}
});

client.on('message', async message => {
    if(message.body.toUpperCase() == 'TESTE')
    {
        const chat = await message.getChat();
        const user = await message.getContact();
        const contato = user.id.user;
        const date = new Date(Date.now());
        chat.sendStateTyping();
        
        message.forward(chatId);
        console.log(date);
        console.log(contato);
        // company.map((valores) => {
        //     if (valores.numero == contato) {
        //       if (date.getHours() < valores.fim) {
        //         msg.reply(`🤖: Hey *${valores.nome}*, seu turno ainda não acabou!!!`);
        //       } else {
        //         msg.reply(`🤖: Bom descanso *${valores.nome}*!`);
        //       }
        //     }
    }
});


//============================================================================== OUTRAS FUNÇÕES EM JS
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
}