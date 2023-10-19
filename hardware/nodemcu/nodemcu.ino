#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>

SoftwareSerial NodeMCU(D2,D3);
WiFiClient client;
HTTPClient http;

const char* ssid = "Galaxy M31s9AD4";
const char* password = "miwg1716";


const String serverURL2 = "http://192.168.219.100 :3001/saveAttendance/";


void setup() {

  Serial.begin(115200);
  NodeMCU.begin(4800);
  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
  pinMode(D7, OUTPUT);

  // Connect to WiFi
  Serial.println();
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1200);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("Connected to WiFi: " + WiFi.SSID());

  // client.setInsecure();
  http.begin(client, serverURL2);
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

void sendPostReq(String uid) {
  
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");  
  http.addHeader("Authorization", "4A1ff8E237e8");
  String postData = "uid=" + uid;
  int httpResponseCode = http.POST(postData);
  String response = http.getString();
  if (httpResponseCode > 0) {
    blink50();
    Serial.println("Response:");
    Serial.println("Status code: " + String(httpResponseCode));
    Serial.print("Data: ");
    Serial.print(response);
    Serial.println();
  } else {
    Serial.println("Error:");
    Serial.println("Status code: " + String(httpResponseCode));
  }
  http.end();
}

void blink50(){
  digitalWrite(D7, HIGH);
  delay(50);
  digitalWrite(D7, LOW);
  delay(50);
  digitalWrite(D7, HIGH);
  delay(50);
  digitalWrite(D7, LOW);
}
