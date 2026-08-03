export interface ConstitutionSection {
  id: string;
  title: string;
  subtitle?: string;
  content: {
    heading?: string;
    paragraphs?: string[];
    list?: string[];
    subsections?: {
      title: string;
      items?: string[];
      details?: string[];
    }[];
  }[];
}

export const CONSTITUTION_TITLE = "KATIBA YA KIKUNDI CHA MAISHA PLUS GROUP (MPG)";
export const CONSTITUTION_LOCATION = "MBEZI – MSAKUZI KUSINI, UBUNGO, DAR ES SALAAM";

export const CONSTITUTION_SECTIONS: ConstitutionSection[] = [
  {
    id: "utangulizi",
    title: "Utangulizi & Tafsiri",
    subtitle: "Preamble and Definitions",
    content: [
      {
        heading: "UTANGULIZI",
        paragraphs: [
          "KWA KUTAMBUA KUWA Kwa kuunda umoja na kuunganisha nguvu, fikra na rasilimali zetu kwa Pamoja na kuweka umoja wenye lengo la kuleta maendeleo ya pamoja katika maisha yetu, jamii na Taifa kwa ujumla.",
          "KWA KUTAMBUA KUWA Umoja na Mshikamano ni jambo la muhimu na la msingi, tumeazimia kuanzisha na kuendeleza umoja wetu utakaosimamia malengo na madhumuni mbalimbali yenye lengo la kushirikiana katika furaha, shida na kuleta maendeleo kwa mtu mmoja mmoja, kikundi, na Taifa kwa ujumla.",
          "KWA KUTAMBUA KUWA katika utekelezaji wa malengo, madhumuni, na mipango yetu ya kiuchumi na kijamii tunatilia mkazo kuwa na umoja na ushirikiano miongoni mwetu kama wanakikundi, jamii inayotuzunguka na Taifa kwa ujumla.",
          "SASA BASI Kwa dhamira Thabiti na ya dhati tunaanzisha Umoja wenye nia na lengo la kujenga upendo wa kushirikiana kwa pamoja, kusaidiana katika furaha na shida utakaojulikana kwa jina \"MAISHA PLUS GROUP\"."
        ]
      },
      {
        heading: "TAFSIRI YA MANENO",
        paragraphs: [
          "Kama zitakavyotumika katika Katiba hii, maneno yafuatayo yatakuwa na maana zifuatazo:"
        ],
        subsections: [
          {
            title: "Tafsiri Kuu",
            items: [
              "Akaunti: Akaunti ya kikundi cha MAISHA PLUS GROUP.",
              "Furaha: Maisha ya kila siku ya mwanadamu anayoyaishi ikiwa ni pamoja na kuoa, kuolewa, kujumuika, na sherehe nyingine ambazo mwanachama ataona zinamsaidia kuongeza furaha.",
              "Kamati: Kamati mbalimbali kama zilivyoundwa na kubainishwa na wanakikundi.",
              "Katiba: Katiba ya MAISHA PLUS GROUP.",
              "Katibu: Katibu wa kikundi.",
              "Kikundi: MAISHA PLUS GROUP.",
              "Kufukuzwa: Kuondolewa katika kikundi kwa mujibu wa Katiba.",
              "Maamuzi: Maamuzi yaliyotolewa na wanakikundi kwa kufuata matakwa na msingi ya Katiba hii.",
              "Maendeleo: Shughuli yoyote halali iwe ya kijamii au kiuchumi yenye lengo la kuleta maendeleo ya mtu mmoja mmoja, kikundi, jamii, na Taifa kwa ujumla.",
              "Mapato: Mapato yote halali yanayopatikana kwa mujibu wa maelekezo ya Katiba hii.",
              "Mhazini: Mhazini wa kikundi.",
              "Muhuri: Muhuri wa kikundi.",
              "Mwanachama: Mwanachama hai wa kikundi.",
              "Mwenyekiti: Mwenyekiti wa kikundi aliyechaguliwa kwa mujibu wa katiba hii.",
              "Shida: Maisha ya kila siku anayoishi mwanadamu yakiwa ya majonzi na huzuni. Hii inajumuisha ugonjwa (Kuugua au kuuguliwa), misiba, ajali na majanga mbalimbali mfano moto.",
              "Umoja: Muungano wa hiari wa wanakikundi wote wenye dhamira, nia na lengo moja."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sehemu-1",
    title: "Sehemu ya Kwanza",
    subtitle: "Jina, Makao Makuu, Dira & Madhumuni",
    content: [
      {
        heading: "1.1 Jina la Kikundi / Umoja",
        paragraphs: ["Jina la kikundi hiki litakuwa \"MAISHA PLUS GROUP\", kwa kifupi (MPG)."]
      },
      {
        heading: "1.2 Makao Makuu",
        paragraphs: ["Makao makuu ya umoja huu yatakuwa Mbezi Msakuzi Kusini, Wilaya ya Ubungo, Mkoa wa Dar es Salaam, Tanzania."]
      },
      {
        heading: "1.3 Lugha",
        paragraphs: ["Lugha rasmi itakayotumika kuendesha shughuli zote za kikundi ni Kiswahili."]
      },
      {
        heading: "1.4 Imani ya Kikundi",
        paragraphs: ["Umoja huu unaamini kuwa:"],
        list: [
          "Wanachama wote ni sawa.",
          "Kila mwanachama ana haki ya kutambulika na kuthaminiwa utu wake na kwamba anastahili haki zote zilizoainishwa katika Katiba hii.",
          "Umoja na mshikamano wa wanachama wote ndio njia pekee itakayokuza ushirikiano wa karibu kwa kutambuana, kufahamiana, kushirikiana na kusaidiana katika shughuli mbalimbali za furaha, shida na maendeleo."
        ]
      },
      {
        heading: "1.5 Dira",
        paragraphs: ["Kujenga jamii yenye hamasa ya Pamoja yenye lengo la kusaidiana na kuleta maendeleo kijamii na kiuchumi katika makazi yetu."]
      },
      {
        heading: "1.6 Madhumuni ya MAISHA PLUS GROUP (MPG)",
        list: [
          "Kusaidiana katika shida na raha.",
          "Kujenga umoja na upendo, pia kudumisha uhusiano mzuri kati ya wanakikundi na familia zao.",
          "Kuwa na mfuko wa pamoja wenye lengo la kusaidiana.",
          "Kufungua akaunti ya Benki yenye lengo la kuhifadhi pesa za wanakikundi (M-Koba).",
          "Kuanzisha miradi mbalimbali yenye lengo la kutuinua kiuchumi."
        ]
      }
    ]
  },
  {
    id: "sehemu-2",
    title: "Sehemu ya Pili",
    subtitle: "Sifa, Haki na Wajibu wa Mwanachama",
    content: [
      {
        heading: "2.1 Sifa za Mwanachama",
        paragraphs: ["Mwanachama atakuwa na sifa zifuatazo:"],
        list: [
          "Awe na umri wa miaka 18 na kuendelea.",
          "Awe mkazi wa Maisha Plus - Mbezi Msakuzi Kusini.",
          "Awe na akili timamu wakati wa kujiunga.",
          "Awe tayari kulipa kiingilio cha Shilingi 25,000/=.",
          "Aridhie kulipa mchango wa uanachama wa kila mwezi wa Shilingi 5,000/=.",
          "Awe tayari kushirikiana na wanachama wenzake na viongozi hasa katika matukio ya kijamii yanayohusu wanachama wenzake na maendeleo ya mtaa.",
          "Awe tayari kulipa kiingilio cha Shilingi 25,000/= na kulipa michango yote ya nyuma tangu kikundi cha Maisha Plus Group kimeanzishwa kwa mwanachama mpya."
        ]
      },
      {
        heading: "2.2 Haki za Mwanachama",
        list: [
          "Kushiriki katika shughuli mbalimbali za umoja kulingana na taratibu zilizowekwa.",
          "Kuhudhuria na kutoa maoni yake kwenye vikao/mikutano ya umoja huu.",
          "Kuchagua au kuchaguliwa kuwa kiongozi wa umoja.",
          "Kupatiwa katiba ya umoja huu.",
          "Kusaidiwa wakati wa matukio kama misiba, ugonjwa na harusi kulingana na masharti yaliyoainishwa katika katiba na miongozo ya kikundi.",
          "Kutoa maoni juu ya uendeshaji au maboresho katika umoja ili mradi asivunje katiba.",
          "Kujua mapato na matumizi ya umoja."
        ]
      },
      {
        heading: "2.3 Wajibu wa Mwanachama",
        list: [
          "Kulipa ada ya uanachama ya kila mwezi na michango mingine kulingana na taratibu zilizowekwa.",
          "Kutetea na kutekeleza kwa vitendo kanuni na miongozo iliyowekwa katika Katiba ili kufikia madhumuni ya kuanzishwa kwa umoja huu.",
          "Kuwa na moyo wa kujitolea katika kushirikiana na wanachama wenzake.",
          "Kushauri uongozi kwa busara katika mambo yanayohusu umoja.",
          "Kutoa taarifa sahihi zinazohusu familia yake na yeye mwenyewe kila anapotakiwa kufanya hivyo.",
          "Kusoma, kuielewa, kuilinda na kuitetea katiba ya kikundi.",
          "Kuiheshimu katiba ya kikundi."
        ]
      }
    ]
  },
  {
    id: "sehemu-3",
    title: "Sehemu ya Tatu",
    subtitle: "Uongozi na Majukumu ya Viongozi",
    content: [
      {
        heading: "3.1 Uongozi wa Kikundi",
        paragraphs: [
          "Umoja huu utakuwa na viongozi wafuatao: Mwenyekiti, Mwenyekiti Msaidizi (Makamu), Katibu, na Mweka Hazina (Mhazini).",
          "Viongozi watachaguliwa kwa kupigiwa kura kila baada ya miaka mitatu (3). Kiongozi anaweza kuchaguliwa kwa kipindi kingine cha miaka mitatu, hivyo atakuwa kiongozi kwa awamu mbili tu."
        ]
      },
      {
        heading: "3.2 Sifa za Kiongozi",
        list: [
          "Awe muadilifu na mwaminifu.",
          "Awe mwenye msimamo na maamuzi yenye manufaa katika kusimamia kikundi.",
          "Awe mtu anayejali muda.",
          "Awe anajua kusoma na kuandika.",
          "Awe mstari wa mbele na mhamasishaji katika kufanya kazi za kikundi.",
          "Awe Mvumilivu mwenye hekima na busara.",
          "Awe mbunifu na mwenye fikra za kuleta maendeleo ya kikundi.",
          "Awe na uwezo wa kuongoza.",
          "Awe mfano mzuri wa kulipa michango ya kikundi.",
          "Msemaji wa kikundi."
        ]
      },
      {
        heading: "3.3 Kazi za Mwenyekiti & Makamu Mwenyekiti",
        paragraphs: [
          "Mwenyekiti: Atakuwa kiongozi mkuu wa viongozi wote, msemaji mkuu, mwangalizi mkuu wa shughuli zote na mwenyekiti wa mikutano yote.",
          "Makamu Mwenyekiti: Ni msaidizi wa Mwenyekiti, atawajibika kwa kazi za Mwenyekiti endapo hatakuwepo, na ni mjumbe wa kamati ya uongozi."
        ]
      },
      {
        heading: "3.5 Kazi za Katibu & Mhazini",
        paragraphs: [
          "Katibu: Mtunza nyaraka na kumbukumbu zote, mratibu wa vikao, mtendaji mkuu wa kila siku, na kuitisha mikutano kwa kuwasiliana na Mwenyekiti.",
          "Mhazini: Kupokea na kukusanya fedha zote za michango, kutunza kumbukumbu za fedha, kuandaa bajeti, na kutoa taarifa ya mapato na matumizi kila baada ya miezi minne (4) au inapohitajika."
        ]
      },
      {
        heading: "3.7 Uwajibishwaji wa Viongozi",
        paragraphs: [
          "Endapo kiongozi yeyote atashindwa kutekeleza majukumu yake kama yalivyoainishwa katika Katiba hii, wanachama wasiopungua theluthi mbili (2/3) kwenye mkutano mkuu au mkutano wa dharura watakuwa na haki ya kumwajibisha kiongozi huyo."
        ]
      }
    ]
  },
  {
    id: "sehemu-4",
    title: "Sehemu ya Nne",
    subtitle: "Mapato, Fedha & Michango ya Kijamii",
    content: [
      {
        heading: "4.1 Mapato ya Kikundi",
        list: [
          "Kiingilio cha Uanachama: Tshs. 25,000/= (Non-Refundable fee).",
          "Michango ya kila mwezi: Tshs. 5,000/= kwa mwezi.",
          "Faida itakayotokana na kukopeshana."
        ]
      },
      {
        heading: "4.2 - 4.4 Udhibiti na Utoaji wa Fedha",
        paragraphs: [
          "Kikundi kitafungua Akaunti ya Benki itakayopendekezwa na theluthi mbili (2/3) ya wanachama hai.",
          "Utoaji wa fedha utahitaji saini mbili (2): Mhazini na Mwenyekiti au Katibu.",
          "Udhiniti: Kutakuwa na faili la orodha ya wanachama linalopitiwa kila mwezi, kumbukumbu sahihi za stakabadhi halali, na kamati maalum ya ukaguzi wa mahesabu inapobidi."
        ]
      },
      {
        heading: "4.5 Michango ya Misiba na Sherehe",
        subsections: [
          {
            title: "a) Ugonjwa",
            items: ["Michango ya ugonjwa ni hiari ya mwanachama kuchanga kiasi chochote atakachojaliwa."]
          },
          {
            title: "b) Michango ya Misiba",
            items: [
              "Wafuatao wakifariki: Mwanachama mwenyewe, watoto, wazazi, mke/mme anayetambulika, wakwe (baba/mama wa mwenzi), au mwanafamilia anayekaa nyumbani.",
              "Kila mwanachama atachangia Tshs. 10,000/= ndani ya wiki moja toka msiba ulipotokea.",
              "Pesa itatoka kwenye mfuko wa kikundi na kurejeshwa na michango ya wanachama."
            ]
          },
          {
            title: "c) Michango ya Sherehe (Harusi)",
            items: [
              "Harusi: Tshs. 300,000/= itatolewa katika mfuko wa kikundi / kuchangiwa na wanachama kwa uwiano sawa kabla ya sherehe.",
              "Wahusika: Mtoto wa mwanachama, au mwanachama ambaye hajaoa/hajaolewa."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sehemu-5",
    title: "Sehemu ya Tano",
    subtitle: "Mikutano, Uchaguzi & Migogoro",
    content: [
      {
        heading: "5.1 & 5.2 Mikutano ya Kikundi",
        paragraphs: [
          "Aina za Mikutano: Mkutano Mkuu (mara 4 kwa mwaka - kila miezi 3), Mikutano ya Dharura, na Mikutano ya Kamati Tendaji (mara 1 kwa mwezi).",
          "Akidi: Akidi ya Mkutano Mkuu ni theluthi mbili (2/3) ya wanachama hai."
        ]
      },
      {
        heading: "5.5 Uchaguzi wa Viongozi",
        list: [
          "Uchaguzi kwa kura za siri kila baada ya miaka 3.",
          "Taarifa ya uchaguzi itatolewa miezi 3 kabla ya uchaguzi.",
          "Kamati ya uchaguzi ya wajumbe 3 itatangaza matokeo.",
          "Mshindi lazima apate zaidi ya nusu (50%+) ya kura zilizopigwa."
        ]
      },
      {
        heading: "5.7 - 5.9 Utatuzi wa Migogoro & Kuvunjika kwa Kikundi",
        paragraphs: [
          "Utatuzi wa Migogoro: Utaanzia kwa Kamati Tendaji. Ikishindikana, kikao cha dharura cha wanachama wote kitaitishwa.",
          "Kuvunjika kwa Kikundi: Kwa maombi ya angalau 75% ya wanachama hai, au kupungua kwa wanachama chini ya 20%, au amri ya Msajili/Mahakama."
        ]
      }
    ]
  },
  {
    id: "kanuni-2024",
    title: "Kanuni za Kikundi (2024)",
    subtitle: "By-laws and Fines Rules",
    content: [
      {
        heading: "KANUNI ZA KIKUNDI CHA MAISHA PLUS GROUP (2024)",
        subsections: [
          {
            title: "Ada na Faini za Mikutano",
            items: [
              "Ada ya Kila Mwezi: Tshs. 5,000/=. Mwanachama asiyelipa ada kwa miezi mitatu (3) atapewa onyo mara 3 kwa maandishi. Baada ya onyo la 3, atahesabika amejiondoa.",
              "Faini ya Kukosa Kikao: Mwanachama asipohudhuria kikao bila taarifa atalazimika kutoa Tshs. 5,000/= kama faini.",
              "Faini ya Kuchelewa Kikao: Mwanachama akichelewa dakika 15 (robo saa) kwenye kikao chochote atawajibika kulipa Tshs. 2,000/= kama faini.",
              "Get-Together ya Mwaka: Inafanyika tarehe 1 January kila mwaka."
            ]
          }
        ]
      }
    ]
  }
];
