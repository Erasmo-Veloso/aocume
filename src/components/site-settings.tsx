"use client";

import { createContext, useContext } from "react";

import { SITE } from "@/lib/site";
import type { SiteContact } from "@/lib/content";

const FALLBACK: SiteContact = {
  companyName: SITE.name,
  email: SITE.email,
  phone: SITE.phoneDisplay,
  whatsapp: SITE.whatsapp,
  address: SITE.address,
  facebook: SITE.social.facebook,
  instagram: SITE.social.instagram,
  youtube: SITE.social.youtube,
  linkedin: SITE.social.linkedin,
};

const SiteSettingsContext = createContext<SiteContact>(FALLBACK);

/** Semeado no servidor (layout) com os contactos da BD. */
export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteContact;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteContact {
  return useContext(SiteSettingsContext);
}
