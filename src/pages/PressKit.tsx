
import { useState, useEffect } from "react";
import { Download, FileText, Image, FileIcon, Video } from "lucide-react";
import Seo from "@/seo/Seo";
import { PageHero } from "@/components/ox/Blocks";
import { Section } from "@/components/ox/primitives";
import { cn } from "@/lib/utils";
import { dbService, PressKitItem } from "@/services/DatabaseService";
import { staticPressKit } from "@/content/pressKit";
import { company } from "@/content/company";

const PressKit = () => {
  // Built-in assets render immediately (and in the prerendered HTML); backend items are extras.
  const [remote, setRemote] = useState<PressKitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const items = [...staticPressKit, ...remote];

  useEffect(() => {
    let alive = true;
    dbService
      .fetchPressKitItems()
      .then((data) => alive && setRemote(data))
      .catch((error) => console.warn('Press kit backend unavailable, showing built-in assets.', error))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  // Helper function to determine icon by file type
  const getItemIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Seo
        path="/press-kit"
        type="CollectionPage"
        title="Press Kit"
        description="Download official VirtusCo media resources for press coverage, partnerships, and brand usage."
      />

      <PageHero
        compact
        eyebrow="Press & Media"
        title={
          <>
            VirtusCo <span className="text-accent-ink">Press Kit</span>
          </>
        }
        lede="Download official VirtusCo media resources for press coverage, partnerships, and brand usage."
      />

      <Section label="Resources" className="sec-sm wrap">
        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "border px-4 py-[10px] font-mono text-[11.5px] uppercase leading-none tracking-[0.12em] transition-colors",
                activeCategory === category
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink hover:border-ink"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && remote.length === 0 && (
          <p className="sr-only" role="status">
            Checking for additional press materials
          </p>
        )}
        {filteredItems.length === 0 ? (
          <div className="border-y border-ink/15 py-16">
            <p className="lede text-body">No press kit materials available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article key={item.id} className="flex h-full flex-col border border-ink/15 bg-card">
                {item.thumbnail_url && (
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-ink/15 bg-paper-2">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      loading="lazy"
                      className="max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-4 text-quiet">
                    <span className="flex items-center gap-2">
                      {getItemIcon(item.file_type)}
                      <span className="mono-tag">{item.category}</span>
                    </span>
                    <span className="mono-tag border border-ink/15 px-2 py-1">{item.file_type}</span>
                  </div>
                  <h3 className="h-card text-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 font-serif text-[1rem] leading-relaxed text-body">{item.description}</p>
                  <a
                    href={item.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 bg-ink px-6 text-sm font-semibold text-cream transition-colors hover:bg-ink-3"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Section tone="paper-2" label="Boilerplate" className="sec-sm wrap">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-5">Boilerplate</p>
            <h2 className="h-section">About VirtusCo</h2>
          </div>
          <div>
            <p className="copy max-w-[64ch] text-ink">{company.shortDescription}</p>
            <p className="mt-6 font-serif text-body">
              Media contact:{' '}
              <a className="ulink text-ink" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default PressKit;
