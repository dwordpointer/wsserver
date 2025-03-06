const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });

let clients = [];

wss.on("connection", (ws) => {
    console.log("Yeni istemci bağlandı!");
    clients.push(ws);

    ws.on("message", (message) => {
        console.log("Sipariş Alındı:", message.toString());

        // Bağlı tüm istemcilere siparişi gönder
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Bir istemci bağlantıyı kapattı.");
        clients = clients.filter(client => client !== ws);
    });
});

console.log("WebSocket sunucusu 4000 portunda çalışıyor...");
