#include <ESP8266WiFi.h>
#include <SoftwareSerial.h> 
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

SoftwareSerial NodeMCU(D2,D3);
BearSSL::WiFiClientSecure client;
HTTPClient https;

const char* ssid = "Searching";
const char* password = "ertiga@8789";

const char* server = "127.0.0.1";
const int port = 3000;

const char* serverURL = "https://rfid-based-attendance-system-backend.onrender.com/?name=Omkar";

void setup() {

  Serial.begin(9600);
  NodeMCU.begin(4800);
  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
  pinMode(D7, OUTPUT);

  // Connect to Wi-Fi
  Serial.println();
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("Connected to WiFi");

  client.setInsecure(); 
  https.begin(client, serverURL);

  Serial.println("NodeMCU Ready !");
}


void loop() {
  if(NodeMCU.available() > 0){
    char data = NodeMCU.read();
    Serial.print(data);
    if(data == '\n'){
      digitalWrite(D7, HIGH);
      delay(500);
      digitalWrite(D7, LOW);
      sendGetReq2();
    }
  }
}

void sendGetReq2() {
  int httpResponseCode = https.GET();

  if (httpResponseCode > 0) {
    String response = https.getString();
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.print("Error on HTTPS request: ");
    Serial.println(httpResponseCode);
  }

  https.end();
}
void sendGetRequest() {

  if (client.connect(server, port)) {
    client.print("GET /?name=Omkar HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(server);
    client.print("\r\n");
    client.print("Connection: close\r\n\r\n");
    
    while (client.connected()) {
      if (client.available()) {
        String line = client.readStringUntil('\r');
        Serial.print(line);
      }
    }
    client.stop();
  } else {
    Serial.println("Failed to connect to server");
  }
}
