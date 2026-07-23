import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const settingsRepository = {
  get() {
    return prisma.siteSettings.findFirst();
  },

  create(data: Prisma.SiteSettingsCreateInput) {
    return prisma.siteSettings.create({ data });
  },

  update(id: string, data: Prisma.SiteSettingsUpdateInput) {
    return prisma.siteSettings.update({ where: { id }, data });
  },
};
