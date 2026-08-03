import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  sw: {
    translation: {
      "nav": {
        "home": "Mwanzo",
        "about": "Kuhusu",
        "projects": "Miradi",
        "news": "Habari",
        "contact": "Mawasiliano",
        "login": "Ingia",
        "portal": "Lango"
      },
      "home": {
        "heritage": "Urithi Wetu, Mustakabali Wako",
        "title": "Maisha Plus Group",
        "subtitle": "Kikundi cha Maisha Plus (MPG) ni kikundi cha kijamii cha kuweka akiba na kusaidiana kilichopo Mbezi Msakuzi Kusini, Dar es Salaam. Kikiwa kimejengwa katika msingi wa umoja na uwajibikaji wa pamoja, tunawasaidia wanachama kupitia kuweka akiba, mikopo, na misaada katika nyakati nzuri na nyakati ngumu.",
        "active_members": "Wanachama Hai",
        "community_funds": "Fedha za Jumuiya",
        "projects_funded": "Miradi Inayofadhiliwa",
        "core_pillars": "Nguzo Zetu",
        "core_pillars_title": "Masuluhisho Kamili kwa Ukuaji Pamoja",
        "economic_empowerment": "Kuweka Akiba na Mikopo",
        "economic_desc": "Mfuko wa pamoja na mikopo baina ya wanachama ambayo husaidia wajasiriamali na familia kupata mtaji wakati wanapouhitaji zaidi.",
        "cultural_preservation": "Kusimama Pamoja",
        "cultural_desc": "Matukio, warsha, na programu za ushauri iliyoundwa kulinda na kupitisha hekima ya jadi kwa vizazi vijavyo.",
        "sustainable_living": "Ustawi wa Pamoja",
        "sustainable_desc": "Mipango ya kilimo kinachozingatia mazingira, miradi ya maji safi, na nishati mbadala ili kuhakikisha afya ya jamii kwa muda mrefu.",
        "featured_projects": "Miradi Iliyoangaziwa",
        "initiatives": "Mipango yetu",
        "view_all_projects": "Miradi Yote",
        "loading_projects": "Inapakia Miradi...",
        "no_projects": "Hakuna miradi bado.",
        "read_more": "Soma Zaidi",
        "our_story": "Hadithi Yetu",
        "building_futures": "Kujenga Mustakabali Endelevu",
        "about_p1": "Kikundi cha Maisha Plus (MPG) ni kikundi cha kijamii kilichopo Mbezi Msakuzi Kusini, kilichojengwa katika msingi wa umoja na ustawi wa pamoja. Wanachama wanasaidiana kupitia mfuko wa pamoja wa kuweka akiba, mikopo kwa wanachama, na akaunti ya benki (M-Koba) inayolinda pesa za kikundi.",
        "about_p2": "Mbali na kuweka akiba, tunasimama pamoja katika nyakati muhimu za maisha kwa kuchangia wanachama wakati wa ugonjwa, misiba, na harusi ili hakuna anayebeba magumu ya maisha peke yake.",
        "read_full_story": "Soma Hadithi Yetu Kamili",
        "unity": "Umoja",
        "in_diversity": "Katika Utofauti",
        "updates": "Sasisho",
        "latest_news": "Habari na Matukio ya Hivi Punde",
        "all_news": "Habari Zote",
        "loading_news": "Inapakia Habari...",
        "no_news": "Hakuna habari bado.",
        "read_article": "Soma Makala",
        "get_in_touch": "Wasiliana Nasi",
        "contact_us": "Wasiliana Nasi",
        "contact_desc": "Una maswali kuhusu miradi yetu au uanachama? Tungependa kusikia kutoka kwako. Tutumie ujumbe na tutajibu haraka iwezekanavyo.",
        "full_name": "Jina Kamili",
        "email_address": "Barua Pepe",
        "message": "Ujumbe",
        "send_message": "Tuma Ujumbe"
      },
      "about": {
        "title": "Kuhusu Sisi"
      },
      "contact": {
        "title": "Wasiliana Nasi"
      },
      "news": {
        "title": "Habari na Matukio",
        "loading": "Inapakia..."
      },
      "projects": {
        "title": "Miradi Yetu",
        "status": "Hali",
        "loading": "Inapakia..."
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "about": "About",
        "projects": "Projects",
        "news": "News",
        "contact": "Contact",
        "login": "Login",
        "portal": "Portal"
      },
      "home": {
        "heritage": "Our Heritage, Your Future",
        "title": "Maisha Plus Group",
        "subtitle": "Maisha Plus Group (MPG) is a community savings and support group in Mbezi Msakuzi Kusini, Dar es Salaam. Founded on unity and shared responsibility, we help members through savings, loans, and support in both good times and hard times.",
        "active_members": "Active Members",
        "community_funds": "Community Funds",
        "projects_funded": "Projects Funded",
        "core_pillars": "Core Pillars",
        "core_pillars_title": "Holistic Solutions for Collective Growth",
        "economic_empowerment": "Savings & Loans",
        "economic_desc": "A joint fund and member-to-member loans that help entrepreneurs and families access capital when they need it most.",
        "cultural_preservation": "Standing Together",
        "cultural_desc": "Structured support for members and their families during weddings, illness, and bereavement because no one should face hardship alone.",
        "sustainable_desc": "A protected group bank account (M-Koba) and community projects designed to grow members' income over time.",
        "featured_projects": "Featured Projects",
        "initiatives": "Our Initiatives",
        "view_all_projects": "All Projects",
        "loading_projects": "Loading Projects...",
        "no_projects": "No projects yet.",
        "read_more": "Read More",
        "our_story": "Our Story",
        "building_futures": "Building Sustainable Futures",
        "about_p1": "Maisha Plus Group (MPG) is a community based group in Mbezi Msakuzi Kusini, built on unity and shared prosperity. Members support each other through a joint savings fund, member-to-member loans, and a bank account (M-Koba) that safeguards the group's money.",
        "about_p2": "Beyond savings, we stand together in life's biggest moments contributing for members during illness, bereavement, and weddings so no one carries life's hardships alone.",
        "read_full_story": "Read Our Full Story",
        "unity": "Unity",
        "in_diversity": "In Diversity",
        "updates": "Updates",
        "latest_news": "Latest News & Events",
        "all_news": "All News",
        "loading_news": "Loading News...",
        "no_news": "No news yet.",
        "read_article": "Read Article",
        "get_in_touch": "Get in Touch",
        "contact_us": "Contact Us",
        "contact_desc": "Have questions about our projects or membership? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        "full_name": "Full Name",
        "email_address": "Email Address",
        "message": "Message",
        "send_message": "Send Message"
      },
      "about": {
        "title": "About Us"
      },
      "contact": {
        "title": "Contact Us"
      },
      "news": {
        "title": "News & Events",
        "loading": "Loading..."
      },
      "projects": {
        "title": "Our Projects",
        "status": "Status",
        "loading": "Loading..."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sw', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
