# RFID-Based Attendance System

## Overview

The RFID-Based Attendance System is a web application designed to streamline attendance tracking for educational institutions. It utilizes RFID technology for efficient and accurate attendance management. The project is built with Node.js for the backend, React.js for the frontend, and Arduino Uno with MFRC522 transceiver for RFID logic.


## Technology Stack

- **Backend:** Node.js
- **Frontend:** React.js
- **RFID Logic:** Arduino Uno with MFRC522 transceiver
- **WiFi Communication:** NodeMCU ESP8266


## Features

- **Teacher Management:**
  - Teachers can log in to the system securely.
  - Only admin-approved teachers can sign up.

- **Lecture Creation:**
  - Teachers can create lectures by specifying semester, branch, division, and time interval.

- **Attendance Tracking:**
  - RFID cards are pre-allocated to students.
  - During lectures, the system scans RFID cards using MFRC522 to mark attendance.

- **Detailed Reporting:**
  - Teachers can fetch attendance details for any past or ongoing lecture.
  - Students can view their attendance records.

- **Edge Cases Covered:**
  - The system handles various edge cases to ensure robust performance.
