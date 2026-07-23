import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloating } from "@/components/whatsapp-floating";
import { SiteSettingsProvider } from "@/components/site-settings";
import { getContact } from "@/lib/content";

// Casca do site público (não aplicada ao painel admin).
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getContact();

  return (
    <SiteSettingsProvider value={contact}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsappFloating />
    </SiteSettingsProvider>
  );
}
