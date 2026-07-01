import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Mittente verificato su Resend (dominio proprietario). Es: "Mole Ventures <noreply@mole-ventures.it>"
const FROM = process.env.CONTACT_FROM ?? "onboarding@resend.dev";
// Destinatario dei lead. Modificabile dalla dashboard Netlify senza toccare il codice.
const TO = process.env.CONTACT_TO;
// URL pubblico del sito, usato per caricare il logo nella mail. Es: https://mole-ventures.it
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "");

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !TO) {
    console.error("Configurazione email mancante: RESEND_API_KEY o CONTACT_TO");
    return NextResponse.json(
      { error: "Servizio email non configurato." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const nome = String(data.nome ?? "").trim();
  const azienda = String(data.azienda ?? "").trim();
  const telefono = String(data.telefono ?? "").trim();
  const email = String(data.email ?? "").trim();
  const oggetto = String(data.oggetto ?? "").trim();
  const messaggio = String(data.messaggio ?? "").trim();
  // Honeypot anti-spam: se valorizzato, è un bot.
  const website = String(data.website ?? "").trim();

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!nome || !email || !messaggio) {
    return NextResponse.json(
      { error: "Compila almeno nome, email e messaggio." },
      { status: 400 }
    );
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  const font =
    "'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";

  // Logo: se SITE_URL è configurato carica il logo del sito, altrimenti wordmark testuale.
  const brand = SITE_URL
    ? `<img src="${SITE_URL}/images/logo.png" alt="Mole Ventures" height="44" style="height:44px;width:auto;border:0;display:inline-block;font-family:${font};font-size:22px;font-weight:700;color:#ffffff;line-height:44px;" />`
    : `<span style="font-family:${font};font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.3px;">Mole Ventures</span>`;

  const righe = [
    ["Nome", nome],
    ["Azienda", azienda],
    ["Telefono", telefono],
    ["Email", email],
    ["Oggetto", oggetto],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e7ecf5;font-family:${font};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8895b0;width:120px;vertical-align:top">${k}</td>
          <td style="padding:14px 0;border-bottom:1px solid #e7ecf5;font-family:${font};font-size:15px;font-weight:500;color:#05155E;vertical-align:top">${escapeHtml(v)}</td>
        </tr>`
    )
    .join("");

  const html = `
  <!DOCTYPE html>
  <html lang="it">
    <body style="margin:0;padding:0;background-color:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
              <!-- Header brand: navy con sfumatura diagonale verso il kinetic blue -->
              <tr>
                <td style="background-color:#05155E;background-image:linear-gradient(135deg,#05155E 0%,#0a1f7a 55%,#062EB5 100%);padding:40px 44px;">
                  <div style="margin-bottom:18px;">${brand}</div>
                  <div style="font-family:${font};font-size:22px;font-weight:700;color:#ffffff;line-height:1.25;">Nuova lead dal sito</div>
                  <div style="font-family:${font};font-size:14px;color:#9fc6f6;margin-top:6px;">Un utente ha compilato il form contatti.</div>
                </td>
              </tr>
              <!-- Dettagli lead -->
              <tr>
                <td style="padding:36px 44px 8px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${righe}
                  </table>
                </td>
              </tr>
              <!-- Messaggio -->
              <tr>
                <td style="padding:24px 44px 8px;">
                  <div style="font-family:${font};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8895b0;margin-bottom:12px;">Messaggio</div>
                  <div style="font-family:${font};font-size:15px;line-height:1.7;color:#1c2a52;white-space:pre-wrap;">${escapeHtml(messaggio)}</div>
                </td>
              </tr>
              <!-- CTA rispondi -->
              ${
                email
                  ? `<tr>
                <td style="padding:28px 44px 8px;">
                  <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background-color:#062EB5;color:#ffffff;font-family:${font};font-size:14px;font-weight:600;text-decoration:none;padding:13px 26px;">Rispondi a ${escapeHtml(nome)}</a>
                </td>
              </tr>`
                  : ""
              }
              <!-- Footer -->
              <tr>
                <td style="padding:32px 44px 40px;">
                  <div style="border-top:1px solid #e7ecf5;padding-top:20px;font-family:${font};font-size:13px;color:#8895b0;line-height:1.6;">
                    Lead raccolta automaticamente dal form contatti del sito.${
                      email
                        ? ` Rispondi a questa mail per scrivere direttamente a <a href="mailto:${escapeHtml(email)}" style="color:#062EB5;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>.`
                        : ""
                    }
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO.split(",").map((a) => a.trim()),
      replyTo: email,
      subject: oggetto
        ? `[Sito] ${oggetto} — ${nome}`
        : `[Sito] Nuovo contatto — ${nome}`,
      html,
      text: [
        "Nuovo contatto dal sito",
        "",
        `Nome: ${nome}`,
        azienda && `Azienda: ${azienda}`,
        telefono && `Telefono: ${telefono}`,
        `Email: ${email}`,
        oggetto && `Oggetto: ${oggetto}`,
        "",
        "Messaggio:",
        messaggio,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Errore invio Resend:", error);
      return NextResponse.json(
        { error: "Invio non riuscito, riprova." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Errore inatteso invio email:", err);
    return NextResponse.json(
      { error: "Invio non riuscito, riprova." },
      { status: 500 }
    );
  }
}
