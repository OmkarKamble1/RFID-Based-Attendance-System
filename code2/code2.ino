#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 mfrc522(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;

void setup() {
  Serial.begin(9600);

  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  SPI.begin();
  mfrc522.PCD_Init(); 

  Serial.println("Ready to read !");
}

int blockNumber = 2;
int largestModulo4Number=blockNumber/4*4;
int trailerBlock=largestModulo4Number+3;

void loop() {

  if (!mfrc522.PICC_IsNewCardPresent()) return;

	if (!mfrc522.PICC_ReadCardSerial()) return;

  Serial.println("***card selected***");
  Serial.print("UID: ");
  for (byte i = 0; i < mfrc522.uid.size; ++i) {
    Serial.print(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println();

  readBlock();

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  Serial.println("***done***");
  Serial.println();

}

void readBlock() {
  byte buffersize = 18;
  byte readbackblock[18];
  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNumber, &key, &(mfrc522.uid));

  if (status != MFRC522::STATUS_OK) {
    Serial.print("Authentication failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return 3;
  }

  status = mfrc522.MIFARE_Read(blockNumber, readbackblock, &buffersize);

  if (status != MFRC522::STATUS_OK) {
    Serial.print("Read failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return 4;
  }
  
  String value = "";
  for (int i = 0; i < 16; i++)
  {
      value += (char)readbackblock[i];
  }
  value.trim();
  Serial.print("DATA: ");
  Serial.print(value);
  Serial.println();
}


int writeBlock() {

  byte blockcontent[16] = {"vu4f2021101"};

  byte status = mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, blockNumber, &key, &(mfrc522.uid));

  if (status != MFRC522::STATUS_OK) {
    Serial.print("Authentication failed: ");
    Serial.println(mfrc522.GetStatusCodeName(status));
    return 3;
  }

  mfrc522.MIFARE_Write(blockNumber, blockcontent, 16);
  Serial.println("block was written");

  Serial.println("Reading block to ensure");
  readBlock();
  return 0;
}
