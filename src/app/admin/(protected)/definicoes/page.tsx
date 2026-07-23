import { settingsService } from "@/services/settings-service";
import { SettingsForm, type SettingsValues } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const s = await settingsService.get();

  const initial: SettingsValues = {
    companyName: s.companyName ?? "",
    email: s.email ?? "",
    phone: s.phone ?? "",
    whatsapp: s.whatsapp ?? "",
    address: s.address ?? "",
    facebook: s.facebook ?? "",
    instagram: s.instagram ?? "",
    youtube: s.youtube ?? "",
    linkedin: s.linkedin ?? "",
    logo: s.logo ?? "",
    heroTitle: s.heroTitle ?? "",
    heroSubtitle: s.heroSubtitle ?? "",
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Definições</h1>
        <p className="text-sm text-muted-foreground">
          Informação do site e contactos.
        </p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  );
}
