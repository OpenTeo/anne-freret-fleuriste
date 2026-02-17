import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/lib/mock-data';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Get similar posts (same category, different post)
  const similarPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-20">
        
        {/* Hero Image */}
        <section className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Breadcrumb */}
          <div className="absolute bottom-6 left-0 right-0">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <nav className="flex items-center gap-2 text-white/90 text-sm mb-4">
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <Link 
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="hover:text-white transition-colors"
                >
                  {post.category}
                </Link>
                <span>/</span>
                <span className="text-white/70">
                  {post.title}
                </span>
              </nav>
              
              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-[#6b6560] mb-8 pb-6 border-b border-[#e8e0d8]">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {post.author}
                  </div>

                  <span className="inline-block px-3 py-1 text-xs font-medium text-[#b8956a] bg-[#b8956a]/10 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg prose-stone max-w-none
                    prose-headings:font-serif prose-headings:text-[#2d2a26]
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mb-4 prose-h3:mt-8
                    prose-p:text-[#2d2a26] prose-p:leading-relaxed prose-p:mb-6
                    prose-strong:text-[#2d2a26] prose-strong:font-semibold
                    prose-a:text-[#b8956a] prose-a:no-underline hover:prose-a:underline
                    "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Back to Blog */}
                <div className="mt-12 pt-8 border-t border-[#e8e0d8]">
                  <Link 
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[#b8956a] hover:text-[#2d2a26] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour au blog
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 order-first lg:order-last">
                
                {/* Similar Articles */}
                {similarPosts.length > 0 && (
                  <div className="bg-[#ffffff] rounded-lg border border-[#e8e0d8] p-6 mb-8">
                    <h3 className="font-serif text-xl text-[#2d2a26] mb-6">
                      Articles similaires
                    </h3>
                    <div className="space-y-6">
                      {similarPosts.map((similarPost) => (
                        <Link 
                          key={similarPost.id}
                          href={`/blog/${similarPost.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-3">
                            <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                              <img
                                src={similarPost.image}
                                alt={similarPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-[#2d2a26] group-hover:text-[#b8956a] transition-colors line-clamp-2 leading-snug">
                                {similarPost.title}
                              </h4>
                              <p className="text-xs text-[#6b6560] mt-1">
                                {similarPost.readTime}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-[#b8956a] rounded-lg p-6 text-center text-white">
                  <h3 className="font-serif text-xl mb-3">
                    {post.ctaTitle || 'Découvrir nos bouquets'}
                  </h3>
                  <p className="text-sm opacity-90 mb-5">
                    {post.ctaDescription || 'Laissez-vous séduire par nos créations florales uniques, composées avec passion dans notre atelier normand.'}
                  </p>
                  <Link 
                    href={post.ctaLink || '/boutique'}
                    className="inline-block bg-white text-[#b8956a] px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    {post.ctaLabel || 'Voir nos créations'}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return {
      title: 'Article non trouvé | Anne Freret',
    };
  }

  return {
    title: `${post.title} | Le Journal Floral - Anne Freret`,
    description: post.excerpt,
  };
}