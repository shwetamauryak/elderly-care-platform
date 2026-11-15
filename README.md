# AuraCare — Smart Elderly Care & Medication Management Platform

> **Built for Catalyst Solo AI Hackathon (November 2026)**  
> **Author:** Shweta Maurya  
> **Challenge:** Elderly Care & Medication Management Platform  

---

## 🌟 Executive Overview & Problem Alignment

Elderly individuals frequently balance complex medication regimens across multiple chronic conditions (hypertension, diabetes, cardiac care) alongside routine diagnostic appointments. When care routines fall solely on the individual or fragmented notes, adherence slips, and family members remain unaware of critical missed doses.

**AuraCare** is an interconnected, highly accessible healthcare management ecosystem specifically engineered for elderly individuals, their caretakers, and extended family members. It places the elderly person at the center of their healthcare decisions while maintaining continuous, transparent visibility and proactive alert mechanisms for their support circle.

---

## 🎯 Key Capabilities & Architecture

### 1. Secure Passcode-Based Role Ecosystem
* **Elderly View (Passcode `1111`):** Simplified, distraction-free interface with high-contrast text, large touch targets, and instant Hindi/English voice readout of today's schedule.
* **Caretaker View (Passcode `2222`):** Administrative control to add/edit medication dosages, adjust schedules, and verify doses taken.
* **Family Member View (Passcode `3333`):** High-level adherence analytics, scheduled doctor appointment calendar, and automated event notifications.

### 2. Intelligent Medication Scheduling & Adherence Engine
* One-tap **"Mark as Taken"** with automated timestamping.
* **"Missed Dose"** detection that calculates real-time adherence rates (e.g., 94% weekly adherence).
* Visual categorisation across morning, afternoon, evening, and night routines.

### 3. Proactive Automated Email Alerts
* Automatic alert triggers when a medication dose is missed, notifying designated family and caretaker email addresses.
* Routine scheduled reminders before upcoming consultations.
* Interactive audit trail documenting all care actions.

### 4. Elderly-Centric Accessibility (WCAG AAA)
* **Web Speech API Audio Engine:** One-tap voice readout of pending medications for visually impaired or elderly users.
* **Dynamic Typography Scaling (A- / A+):** On-the-fly font size adjustment.
* Clean visual hierarchy minimizing cognitive overload.

---

## 🛠️ Technology Stack

* **Frontend:** Responsive HTML5, Tailwind CSS, Lucide Icons
* **Application Logic:** Modular Vanilla JavaScript (ES6+), Web Speech API
* **State Management & Persistence:** LocalStorage state engine with reactive event logging
* **Notifications:** Automated proactive email simulation engine

---

## 🚀 Getting Started & Local Setup

1. Clone or download the repository:
   ```bash
   git clone https://github.com/shwetamauryak/elderly-care-platform.git
   cd elderly-care-platform
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Edge, Safari, Firefox).
3. Test the role passcodes:
   * **Elderly:** `1111`
   * **Caretaker:** `2222`
   * **Family:** `3333`

---

## 📄 License
MIT License • Built by Shweta Maurya for Catalyst Solo AI Hackathon.
