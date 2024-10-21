import React from "react";

export default function SampleFormula() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 mt-6 text-center">
        Widerrufsformular
      </h2>
      <p className="mb-4">
        An: Sema Taskin
        <br />
        [deine Adresse] auf Anfrage
        <br />
        <a href="mailto:sema@body-mirror.com" className="text-blue-600">
          sema@body-mirror.com
        </a>
      </p>
      <p className="mb-4">
        Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf
        der folgenden / die Buchung der folgenden Dienstleistung:
      </p>
      <p className="mb-4">
        Bestellt am:
        <br />
        Erhalten am:
      </p>
      <p className="mb-4">
        Name des Verbrauchers:
        <br />
        Adresse des Verbrauchers:
        <br />
        E-Mail-Adresse des Verbrauchers:
      </p>
      <p className="mb-4">
        Unterschrift des Verbrauchers (nur bei Mitteilung auf Papier):
      </p>
      <p className="mb-4">Datum:</p>
    </div>
  );
}
