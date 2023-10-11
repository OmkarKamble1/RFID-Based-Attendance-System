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

const String serverURL = "https://rfid-based-attendance-system-backend.onrender.com";

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

String receivedData = "";

void loop() {
  while (NodeMCU.available() > 0) {
    char data = NodeMCU.read();
    receivedData += data;
    if (data == '\n' || data == ' ') {
      blink50();
      sendPostReq(receivedData);
      receivedData = "";
    }
  }
}

void sendGetReq2(String uid) { 
  int httpResponseCode = https.GET();
  String response = https.getString();

  if (httpResponseCode > 0) {
    blink50();
    Serial.println("Status: " + String(httpResponseCode));
    Serial.println(response);
  } else {
    Serial.println("Status: " + String(httpResponseCode));
    Serial.println(response);
  }
  https.end();
}

void sendPostReq(String uid) {
  https.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpResponseCode = https.POST(postData);
  String response = https.getString();

  if (httpResponseCode > 0) {
    blink50();
    Serial.println("Status: " + String(httpResponseCode));
    Serial.println(response);
  } else {
    Serial.println("Status: " + String(httpResponseCode));
    Serial.println(response);
  }
  https.end();
}

// void sendGetReq2(String uid) { 
//   String url = serverURL + "/?uid=" + uid;
//   Serial.println(url);
//   https.begin(client, url);
//   int httpResponseCode = https.GET();
//   String response = https.getString();

//   if (httpResponseCode > 0) {
//     blink100();
//     Serial.println("Status: " + httpResponseCode);
//     Serial.println(response);
//   } else {
//     Serial.println("Status: " + httpResponseCode);
//     Serial.println(response);
//   }

//   https.end();
// }

void blink50(){
  digitalWrite(D7, HIGH);
  delay(50);
  digitalWrite(D7, LOW);
  delay(50);
  digitalWrite(D7, HIGH);
  delay(50);
  digitalWrite(D7, LOW);
}
