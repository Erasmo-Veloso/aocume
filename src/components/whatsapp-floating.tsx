import { MessageCircle } from "lucide-react";
import { generalEnquiryLink } from "@/lib/whatsapp";

/** Botão flutuante de WhatsApp, presente em todas as páginas públicas. */
export function WhatsappFloating() {
  return (
    <a
      href={generalEnquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:scale-105 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-6" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
