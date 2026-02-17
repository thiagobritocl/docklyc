
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export default function DynamicPage() {
  const { slug } = useParams();
  const pageQuery = trpc.cms.public.pages.get.useQuery({ slug: slug || "" }, { enabled: !!slug });

  if (pageQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pageQuery.data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Página no encontrada</h1>
        <p className="text-muted-foreground mt-2">La página que buscas não existe ou foi removida.</p>
      </div>
    );
  }

  const page = pageQuery.data;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
        {page.imageUrl && (
          <img
            src={page.imageUrl}
            alt={page.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
              {page.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <Card className="p-8 md:p-12 shadow-xl border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
          <div 
            className="prose prose-invert prose-slate max-w-none 
              prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white
              prose-ul:text-slate-300 prose-ol:text-slate-300"
            dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }}
          />
        </Card>

        {/* Disclaimer footer if needed */}
        <div className="mt-12">
          <LegalDisclaimer sectionKey="general" />
        </div>
      </div>
    </div>
  );
}
