# Projektkompass

Web-App für Projekte, Aufgaben, Zeiten, Notizen und Kosten. Sie läuft im Browser und lässt sich auf dem iPhone wie eine App auf den Home-Bildschirm legen. Nach dem ersten Öffnen funktioniert sie auch offline.

## Wo liegen die Daten?

Nur auf dem jeweiligen Gerät, im Browser-Speicher (`localStorage`). Es gibt keinen Server und keine Datenbank. Die App lädt auch nichts von Drittanbietern nach, die Schriften liegen im Repo. Niemand sonst sieht die Einträge, auch nicht die Person, die den Link verschickt hat.

Folgen davon:

- Daten werden nicht zwischen Geräten abgeglichen (Handy ≠ Laptop).
- Wer die Websitedaten löscht oder im privaten Modus surft, verliert die Einträge.
- Sicherung: **Einstellungen → Sicherung → „Alle Daten als JSON sichern“**, wiederherstellen über „Sicherung einspielen“.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App |
| `manifest.webmanifest` | Name, Icon und Vollbild-Start für den Home-Bildschirm |
| `sw.js` | Service Worker: speichert die App-Dateien für den Offline-Betrieb |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App-Icons |
| `fonts/` | Schriften Figtree und IBM Plex Mono, lokal eingebunden (SIL Open Font License, Lizenztexte im Ordner) |

## Installation auf dem iPhone

1. Link in **Safari** öffnen.
2. Teilen-Symbol → **„Zum Home-Bildschirm“**.
3. Ab jetzt die App über das Icon starten. Die Daten gehören zu dieser Home-Bildschirm-App.

## Updates

Nach einer Änderung an `index.html` in `sw.js` die Konstante `VERSION` hochzählen (z. B. `v2`). Die App lädt online immer zuerst die neueste Version und fällt nur offline auf die gespeicherte zurück.
