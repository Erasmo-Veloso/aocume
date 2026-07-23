import { packageService } from "@/services/package-service";
import { settingsService } from "@/services/settings-service";
import { SITE } from "@/lib/site";
import { waLink, packageEnquiryMessage } from "@/lib/whatsapp";
import type { PackageLeadInput } from "@/validators/package";

/**
 * Inicia o atendimento de um Pacote de Negócio. Constrói o payload que o n8n
 * precisa e, se N8N_WEBHOOK_URL estiver configurado, encaminha-o. Devolve
 * sempre o link de WhatsApp com a mensagem pré-preenchida (usado pelo frontend).
 */
export const leadService = {
  async createLead(packageId: string, input: PackageLeadInput) {
    const pkg = await packageService.getById(packageId);

    const payload = {
      packageId: pkg.id,
      packageName: pkg.name,
      investment: pkg.investment,
      clientName: input.clientName ?? null,
      phone: input.phone ?? null,
    };

    let forwarded = false;
    const webhook = process.env.N8N_WEBHOOK_URL;
    if (webhook) {
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        forwarded = res.ok;
      } catch {
        forwarded = false; // não bloqueia o lead se o n8n estiver indisponível
      }
    }

    const settings = await settingsService.get();
    const whatsapp = settings.whatsapp || SITE.whatsapp;
    const whatsappUrl = waLink(
      whatsapp,
      packageEnquiryMessage({
        id: pkg.id,
        name: pkg.name,
        investment: pkg.investment,
        ctaLabel: pkg.ctaLabel,
      })
    );

    return { payload, whatsappUrl, forwarded };
  },
};
