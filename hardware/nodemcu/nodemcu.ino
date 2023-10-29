#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ESP8266HTTPClient.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <ArduinoJson.h>

SoftwareSerial NodeMCU(D2,D3);

WiFiClient client;
HTTPClient http;

LiquidCrystal_I2C lcd(0x3F, 16, 2);

const char* ssid = "Searching";
const char* password = "ertiga@8789";


const String serverURL2 = "http://192.168.0.114:3001/saveAttendance/";


void setup() {
  
  Serial.begin(115200);

  Wire.begin(D5, D4); 

  lcd.begin();
  lcd.backlight();
  printLCD("Initializing...");

  NodeMCU.begin(4800);

  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
  pinMode(D7, OUTPUT);

  // Connect to WiFi
  Serial.println();
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  printLCD("Connecting...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1200);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("Connected to WiFi: " + WiFi.SSID());
  printLCD("Connected !");


  // client.setInsecure();
  http.begin(client, serverURL2);
  printLCD("Scan your card");
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
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, response);
    String message = doc["message"];
    printLCD(message);
    delay(500);
    printLCD("Scan your card");
    Serial.println();
  } else {
    printLCD("Server error " + String(httpResponseCode));
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

void printLCD(String str) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(str);
  delay(1000);
}
