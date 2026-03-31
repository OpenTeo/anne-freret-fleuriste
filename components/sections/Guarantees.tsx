'use client';

const Guarantees = () => {
  const guarantees = [
    {
      icon: (
        <svg className="w-5 h-5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: 'Livraison France',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fraîcheur 7 jours',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: 'Fait main',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: 'Emballage soigné',
    },
  ];

  return (
    <section className="py-8 md:py-10 border-y border-[#e8e0d8] bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-4 divide-x-0 md:divide-x divide-[#e8e0d8]">
          {guarantees.map((guarantee, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 md:gap-3 md:px-6 first:pl-0 last:pr-0"
            >
              <div className="flex-shrink-0">
                {guarantee.icon}
              </div>
              <p className="text-xs md:text-sm text-[#2d2a26] font-light whitespace-nowrap">
                {guarantee.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
