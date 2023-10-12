#include <SPI.h>
#include <MFRC522.h>
#include <SD.h>

#define RST_PIN         9          // Configurable, see typical pin layout above
#define SS_PIN          10         // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);
String uidString;  // Create MFRC522 instance

void setup() {
	Serial.begin(9600);
	while (!Serial);
	SPI.begin();
	mfrc522.PCD_Init();
	delay(4);
	Serial.println("Initialization done !");
  pinMode(7, OUTPUT);
	Serial.println("Ready to scan");

}

void loop() {
	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if ( ! mfrc522.PICC_IsNewCardPresent()) {
	}

	// Select one of the cards
	if ( mfrc522.PICC_ReadCardSerial()) {
    Serial.print("RFID successfully scanned !");

    mfrc522.PICC_ReadCardSerial();

    uidString = String(mfrc522.uid.uidByte[0]) + " " + String(mfrc522.uid.uidByte[1]) + " " + String(mfrc522.uid.uidByte[2]) + " " + String(mfrc522.uid.uidByte[3]);

    Serial.print(String(" ( UID: " + uidString + " )"));
    digitalWrite(7, HIGH);
    delay(600);
    digitalWrite(7, LOW);
    delay(200);
    Serial.println("");
    Serial.println("waiting for scan...");
		return;
	}

}
