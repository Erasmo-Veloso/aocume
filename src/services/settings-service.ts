import { settingsRepository } from "@/repositories/settings-repository";
import { SITE } from "@/lib/site";
import type { UpdateSettingsInput } from "@/validators/settings";

/** Valores por omissão quando ainda não existe registo de definições. */
function defaults() {
  return {
    companyName: SITE.name,
    email: SITE.email,
    phone: SITE.phoneDisplay,
    whatsapp: SITE.whatsapp,
    address: SITE.address,
    facebook: SITE.social.facebook,
    instagram: SITE.social.instagram,
    youtube: SITE.social.youtube,
    linkedin: SITE.social.linkedin,
    logo: null,
    heroTitle: null,
    heroSubtitle: null,
  };
}

export const settingsService = {
  async get() {
    const settings = await settingsRepository.get();
    return settings ?? defaults();
  },

  async update(input: UpdateSettingsInput) {
    const existing = await settingsRepository.get();
    if (!existing) {
      return settingsRepository.create({ ...defaults(), ...input });
    }
    return settingsRepository.update(existing.id, input);
  },
};
