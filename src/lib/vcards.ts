// Dati per la generazione delle vCard (biglietto da visita digitale via QR).
// La foto (campo PHOTO) è il logo aziendale, condiviso per entrambi i founder.

export type VCardContact = {
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  org: string;
  email: string;
  phone: string;
  url: string;
};

export const VCARD_CONTACTS: VCardContact[] = [
  {
    slug: "matteo-gera",
    firstName: "Matteo",
    lastName: "Gera",
    title: "Founder & Partner",
    org: "Mole Venture",
    email: "matteo.gera@moleventure.com",
    phone: "+39 335 150 2216",
    url: "https://moleventure.com",
  },
  {
    slug: "francesco-motta",
    firstName: "Francesco",
    lastName: "Motta",
    title: "Founder & Partner",
    org: "Mole Venture",
    email: "francesco.motta@moleventure.com",
    phone: "+39 333 7898852",
    url: "https://moleventure.com",
  },
];

export function getVCardContact(slug: string): VCardContact | undefined {
  return VCARD_CONTACTS.find((c) => c.slug === slug);
}

// Escape dei caratteri riservati dal formato vCard (RFC 6350): , ; \ e newline.
function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

export function buildVCard(contact: VCardContact, photoBase64: string): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardText(contact.lastName)};${escapeVCardText(contact.firstName)};;;`,
    `FN:${escapeVCardText(contact.firstName + " " + contact.lastName)}`,
    `ORG:${escapeVCardText(contact.org)}`,
    `TITLE:${escapeVCardText(contact.title)}`,
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `URL:${contact.url}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`,
    "END:VCARD",
  ];
  // CRLF: terminatore di riga richiesto dallo standard vCard.
  return lines.join("\r\n") + "\r\n";
}
