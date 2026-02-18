import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const siteTitle = "Dockly — Información sobre trabajo en cruceros";
  const fullTitle = title === "Home" ? siteTitle : `${title} | Dockly`;
  const defaultDescription = "Portal informativo independiente para personas de Latinoamérica interesadas en trabajar en cruceros. Áreas de trabajo, requisitos, salarios estimados y más.";
  const defaultImage = "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&h=630&q=80";
  const siteUrl = "https://docklycrew.org";

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) element.setAttribute("property", name);
        else element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description || defaultDescription);
    
    // Open Graph
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description || defaultDescription, true);
    updateMeta("og:image", image || defaultImage, true);
    updateMeta("og:url", url ? `${siteUrl}${url}` : siteUrl, true);

    // Twitter
    updateMeta("twitter:title", fullTitle, true);
    updateMeta("twitter:description", description || defaultDescription, true);
    updateMeta("twitter:image", image || defaultImage, true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url ? `${siteUrl}${url}` : siteUrl);

  }, [fullTitle, description, image, url]);

  return null;
}
