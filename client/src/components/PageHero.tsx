/*
 * PageHero.tsx — Reusable hero section for pages
 * Design: Midnight Compass — dark overlay on hero images, white text
 */
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  badge?: string;
}

export default function PageHero({ title, subtitle, imageUrl, badge }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>
      )}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
      )}

      <div className="container relative z-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide uppercase rounded-full bg-primary/15 text-primary border border-primary/20">
              {badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
