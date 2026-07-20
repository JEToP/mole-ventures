import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getVCardContact, buildVCard, VCARD_CONTACTS } from "@/lib/vcards";

// Logo aziendale condiviso, usato come foto del contatto per tutti i founder.
const PHOTO_PATH = path.join(
  process.cwd(),
  "public/images/team/vcard/logo-avatar.jpg"
);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const contact = getVCardContact(slug);
  if (!contact) {
    return new NextResponse("Contatto non trovato", { status: 404 });
  }

  const photoBuffer = await readFile(PHOTO_PATH);
  const vcard = buildVCard(contact, photoBuffer.toString("base64"));

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${contact.firstName}-${contact.lastName}.vcf"`,
      "Cache-Control": "public, max-age=3600",
      // Doppia sicurezza oltre al Disallow in robots.txt: anche se scansionata,
      // non deve finire indicizzata (non è una pagina di contenuto).
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

// Pre-genera le due route statiche in build (2 founder, nessun input dinamico).
export function generateStaticParams() {
  return VCARD_CONTACTS.map((c) => ({ slug: c.slug }));
}
