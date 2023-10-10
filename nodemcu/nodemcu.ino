#include <ESP8266WiFi.h>
#include <SoftwareSerial.h> 
#include <WiFiClient.h>

SoftwareSerial NodeMCU(D2,D3);
WiFiClient client;

const char* ssid = "Searching";
const char* password = "ertiga@8789";

const char* server = "127.0.0.1";
const int port = 3000;

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
      sendGetRequest();
    }
  }
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
