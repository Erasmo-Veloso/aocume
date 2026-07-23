import { testimonialService } from "@/services/testimonial-service";
import { TestimonialManager } from "@/components/admin/testimonial-manager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await testimonialService.list();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Testemunhos</h1>
        <p className="text-sm text-muted-foreground">
          Prova social exibida no site. Destaque os melhores.
        </p>
      </div>
      <TestimonialManager
        initial={testimonials.map((t) => ({
          id: t.id,
          clientName: t.clientName,
          position: t.position,
          content: t.content,
          photo: t.photo,
          videoUrl: t.videoUrl,
          format: t.format,
          rating: t.rating,
          featured: t.featured,
        }))}
      />
    </div>
  );
}
