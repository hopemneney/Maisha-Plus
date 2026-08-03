import { Link } from 'react-router-dom';
import { useProjects, useNews } from '../../lib/useDbData';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const { projects: allProjects, loading: projectsLoading } = useProjects();
  const { news: allNews, loading: newsLoading } = useNews();
  const projects = allProjects.slice(0, 2);
  const news = allNews.slice(0, 3);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Editorial Hero Section */}
      <section className="flex-1 flex flex-col min-h-[calc(100vh-100px)]">
        {/* Editorial Content */}
        <div className="w-full max-w-5xl mx-auto p-8 lg:p-16 flex flex-col justify-center items-center text-center">
          <span className="text-[#C25E30] font-serif italic text-lg lg:text-xl mb-4 uppercase tracking-wider">
            {t('home.heritage')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 font-black tracking-tight text-[#2D2A26] whitespace-pre-line">
            {t('home.title')}
          </h1>
          <p className="text-lg lg:text-xl max-w-2xl leading-relaxed opacity-70 mb-10 text-[#2D2A26]">
            {t('home.subtitle')}
          </p>
          <div className="flex items-center gap-6 lg:gap-8 flex-wrap justify-center">
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-serif italic text-[#2D2A26]">20+</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 text-[#2D2A26]">{t('home.active_members')}</span>
            </div>
            <div className="h-10 w-px bg-[#2D2A26]/20 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-serif italic text-[#2D2A26]">Tsh 4.2M</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 text-[#2D2A26]">{t('home.community_funds')}</span>
            </div>
            <div className="h-10 w-px bg-[#2D2A26]/20 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-serif italic text-[#2D2A26]">5</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 text-[#2D2A26]">{t('home.projects_funded')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-24 px-6 lg:px-12 border-t border-[#2D2A26]/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.core_pillars')}</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#2D2A26] font-black tracking-tight">{t('home.core_pillars_title')}</h2>
            </div>
            <p className="text-[#2D2A26] opacity-70 max-w-sm text-sm leading-relaxed">
              We operate on principles designed to uplift, sustain, and empower our local community for our generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.economic_empowerment'),
                desc: t('home.economic_desc')
              },
              {
                title: t('home.cultural_preservation'),
                desc: t('home.cultural_desc')
              },
              {
                title: t('home.sustainable_living'),
                desc: t('home.sustainable_desc')
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-10 border border-[#2D2A26]/10 rounded-2xl hover:shadow-lg transition-shadow">
                <span className="text-[#C25E30] font-serif italic text-3xl mb-6 block">0{i + 1}</span>
                <h3 className="text-xl font-bold uppercase tracking-tighter text-[#2D2A26] mb-4">{pillar.title}</h3>
                <p className="text-[#2D2A26] opacity-70 leading-relaxed text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 lg:px-12 bg-[#F2F0EB] border-t border-[#2D2A26]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.initiatives')}</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#2D2A26] font-black tracking-tight">{t('home.featured_projects')}</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-block px-6 py-2 border border-[#2D2A26] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors">
              {t('home.view_all_projects')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#2D2A26]/10 hover:shadow-lg transition-all flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#2D2A26]/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 w-full md:w-3/5 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 text-[#2D2A26] mb-2">
                    Status: {project.status}
                  </span>
                  <h3 className="text-2xl font-serif text-[#2D2A26] mb-3 group-hover:text-[#C25E30] transition-colors font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-[#2D2A26] opacity-70 text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/projects" className="inline-block px-6 py-2 border border-[#2D2A26] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors">
              {t('home.view_all_projects')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-12 border-t border-[#2D2A26]/10" id="about">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          <div className="w-full md:w-1/2">
            <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.our_story')}</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#2D2A26] font-black tracking-tight mb-8">{t('home.building_futures')}</h2>
            <p className="text-lg leading-relaxed opacity-80 mb-6 text-[#2D2A26]">
              {t('home.about_p1')}
            </p>
            <p className="text-lg leading-relaxed opacity-80 mb-8 text-[#2D2A26]">
              {t('home.about_p2')}
            </p>
            <Link to="/about" className="inline-block px-8 py-4 bg-[#2D2A26] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2D2A26]/80 transition-colors">
              {t('home.read_full_story')}
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-square bg-[#F2F0EB] rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[#2D2A26]/5 pointer-events-none"></div>
               <div className="w-64 h-64 border border-[#C25E30]/30 rounded-full flex items-center justify-center relative z-10 animate-[spin_60s_linear_infinite]">
                  <div className="w-48 h-48 border border-[#2D2A26]/20 rounded-full flex items-center justify-center">
                     <div className="w-32 h-32 bg-[#C25E30] rounded-full flex flex-col items-center justify-center text-white p-4 text-center shadow-2xl">
                        <span className="font-serif italic text-2xl mb-1">{t('home.unity')}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold">{t('home.in_diversity')}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#F2F0EB] border-t border-[#2D2A26]/10" id="news">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.updates')}</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-[#2D2A26] font-black tracking-tight">{t('home.latest_news')}</h2>
            </div>
            <Link to="/news" className="hidden md:inline-block px-6 py-2 border border-[#2D2A26] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors">
              {t('home.all_news')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsLoading ? (
               <div className="col-span-full py-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">{t('home.loading_news')}</div>
            ) : news.length > 0 ? (
               news.map(n => (
                 <Link to="/news" key={n.id} className="bg-white p-8 border border-[#2D2A26]/10 rounded-2xl shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between h-full min-h-[300px]">
                   <div>
                     <time className="text-[10px] uppercase tracking-widest font-bold text-[#C25E30] mb-4 block">
                       {format(new Date(n.createdAt), 'MMM d, yyyy')}
                     </time>
                     <h3 className="text-2xl font-serif font-bold tracking-tight text-[#2D2A26] mb-4 group-hover:text-[#C25E30] transition-colors line-clamp-2">{n.title}</h3>
                     <p className="opacity-70 text-sm leading-relaxed text-[#2D2A26] line-clamp-3">{n.content}</p>
                   </div>
                   <div className="mt-8 text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">{t('home.read_article')} &rarr;</div>
                 </Link>
               ))
            ) : (
               <div className="col-span-full py-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">{t('home.no_news')}</div>
            )}
          </div>
        </div>
      </section>


    </div>
  );
}
