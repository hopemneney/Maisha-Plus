import { useState, useMemo } from 'react';
import { 
  CONSTITUTION_TITLE, 
  CONSTITUTION_LOCATION, 
  CONSTITUTION_SECTIONS 
} from '../../../data/constitutionData';
import { Search, BookOpen, Scroll, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Constitution() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = useMemo(() => {
    let sections = CONSTITUTION_SECTIONS;
    
    if (activeTab !== 'all') {
      sections = sections.filter(s => s.id === activeTab);
    }

    if (!searchQuery.trim()) return sections;

    const query = searchQuery.toLowerCase();
    return sections.filter(s => {
      const matchTitle = s.title.toLowerCase().includes(query) || (s.subtitle && s.subtitle.toLowerCase().includes(query));
      const matchContent = s.content.some(c => 
        (c.heading && c.heading.toLowerCase().includes(query)) ||
        (c.paragraphs && c.paragraphs.some(p => p.toLowerCase().includes(query))) ||
        (c.list && c.list.some(l => l.toLowerCase().includes(query))) ||
        (c.subsections && c.subsections.some(sub => 
          sub.title.toLowerCase().includes(query) || 
          (sub.items && sub.items.some(i => i.toLowerCase().includes(query)))
        ))
      );
      return matchTitle || matchContent;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-4xl space-y-8">
      {/* Printable Header */}
      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2D2A26]/10">
          <div>
            <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-1 block">
              Official Document / Nyaraka Rasmi
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-black text-[#2D2A26] leading-tight">
              Katiba & Kanuni (Constitution)
            </h1>
            <p className="text-xs font-bold opacity-60 mt-1">
              {CONSTITUTION_LOCATION}
            </p>
          </div>
        </div>

        {/* Search & Navigation */}
        <div className="space-y-4 print:hidden">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2A26]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search constitution by keywords (e.g. 25,000, msiba, faini, mikutano, ada)..."
              className="w-full pl-12 pr-4 py-3.5 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] text-sm font-bold placeholder:font-normal placeholder:opacity-50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#C25E30] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Section Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#C25E30] text-white shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D2A26] border border-[#2D2A26]/10 hover:bg-white'
              }`}
            >
              All Sections
            </button>
            {CONSTITUTION_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === sec.id
                    ? 'bg-[#C25E30] text-white shadow-sm'
                    : 'bg-[#FAF9F6] text-[#2D2A26] border border-[#2D2A26]/10 hover:bg-white'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Constitution Content Display */}
      {filteredSections.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#2D2A26]/10">
          <BookOpen className="w-10 h-10 mx-auto text-[#2D2A26]/30 mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#2D2A26]">No sections matched your search</h3>
          <p className="text-xs text-[#2D2A26]/60 mt-1">Try searching with a different keyword like "ada", "faini", "msiba" or "mikutano".</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="mt-4 px-4 py-2 bg-[#2D2A26] text-white text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#C25E30] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <div 
              key={section.id} 
              className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm space-y-6"
            >
              <div className="border-b border-[#2D2A26]/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-black text-[#2D2A26] flex items-center gap-3">
                    <Scroll className="w-6 h-6 text-[#C25E30]" />
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs font-bold text-[#C25E30] uppercase tracking-wider mt-1">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6 text-[#2D2A26] text-sm leading-relaxed">
                {section.content.map((block, bIdx) => (
                  <div key={bIdx} className="space-y-3 bg-[#FAF9F6]/80 p-5 rounded-xl border border-[#2D2A26]/5">
                    {block.heading && (
                      <h3 className="font-bold text-base text-[#2D2A26] border-b border-[#2D2A26]/10 pb-2">
                        {block.heading}
                      </h3>
                    )}

                    {block.paragraphs && block.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="opacity-90 font-medium">
                        {para}
                      </p>
                    ))}

                    {block.list && (
                      <ul className="space-y-2 mt-2 pl-2">
                        {block.list.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#C25E30] shrink-0 mt-0.5" />
                            <span className="opacity-90 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.subsections && (
                      <div className="space-y-4 mt-3">
                        {block.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className="bg-white p-4 rounded-lg border border-[#2D2A26]/10 space-y-2">
                            <h4 className="font-bold text-sm text-[#C25E30]">{sub.title}</h4>
                            {sub.items && (
                              <ul className="space-y-1.5 pl-2">
                                {sub.items.map((it, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-xs font-medium opacity-90">
                                    <span className="text-[#C25E30] font-bold">•</span>
                                    <span>{it}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
