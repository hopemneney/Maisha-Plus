import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="py-24 px-6 lg:px-12 flex-1">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.our_story')}</span>
        <h1 className="text-5xl font-serif font-black tracking-tight text-[#2D2A26] mb-12 uppercase">{t('about.title')}</h1>
        
        <div className="bg-white p-10 md:p-16 border border-[#2D2A26]/10 rounded-2xl shadow-sm text-[#2D2A26]">
          <h2 className="text-2xl font-serif italic mb-6 text-[#C25E30]">{t('home.building_futures')}</h2>
          <p className="text-lg leading-relaxed opacity-80 mb-6">
            {t('home.about_p1')}
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            {t('home.about_p2')}
          </p>
        </div>
      </div>
    </div>
  );
}
