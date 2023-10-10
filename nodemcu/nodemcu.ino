#include <ESP8266WiFi.h>
#include <SoftwareSerial.h> 
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

SoftwareSerial NodeMCU(D2,D3);

void setup() {

  Serial.begin(9600);
  NodeMCU.begin(4800);
  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
}


void loop() {
  if(NodeMCU.available() > 0){
    char data = NodeMCU.read();
    Serial.print(data);

  }
}

int POSTData(String data){

  return 1;
}