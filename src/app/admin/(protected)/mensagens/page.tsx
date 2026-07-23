import { Mail, Phone } from "lucide-react";

import { contactService } from "@/services/contact-service";
import { Badge } from "@/components/ui/badge";
import { MarkReadButton } from "@/components/admin/mark-read-button";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("pt-PT", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminMessagesPage() {
  const messages = await contactService.list();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Mensagens</h1>
        <p className="text-sm text-muted-foreground">
          {messages.length} mensagens{unread > 0 && ` · ${unread} por ler`}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((m) => (
          <article
            key={m.id}
            className={`flex flex-col gap-3 rounded-2xl border bg-card p-5 ${
              m.read ? "border-border" : "border-gold/50"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-semibold text-ink">
                  {m.name}
                  {!m.read && <Badge variant="gold">Nova</Badge>}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-1 hover:text-ink"
                  >
                    <Mail className="size-3.5" />
                    {m.email}
                  </a>
                  {m.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="size-3.5" />
                      {m.phone}
                    </span>
                  )}
                </div>
              </div>
              <time className="font-mono text-xs text-muted-foreground">
                {dateFmt.format(m.createdAt)}
              </time>
            </div>

            {m.subject && (
              <p className="text-sm font-medium text-ink">{m.subject}</p>
            )}
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">
              {m.message}
            </p>

            <div className="flex justify-end">
              <MarkReadButton id={m.id} read={m.read} />
            </div>
          </article>
        ))}
        {messages.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-surface px-4 py-12 text-center text-sm text-muted-foreground">
            Ainda não há mensagens.
          </p>
        )}
      </div>
    </div>
  );
}
