"use client"
import React, { useState } from 'react';
import { PlainLanguageStatementContent } from '@/app/survey/components/plain-language-statement-content';
import { ConsentFormContent } from '@/app/survey/components/consent-form-content';

type SurveyPage =
  | 'page1'
  | 'pls'
  | 'consent'
  | 'consentForm'
  | 'studyYear'
  | 'toc'
  | 'section1General'
  | 'section1Soil'
  | 'section2Production'
  | 'section2Rainfall'
  | 'section2Fertiliser'
  | 'section2FertiliserFollowup'
  | 'section3Biosecurity'
  | 'section3ChemicalFollowup'
  | 'section5Intro'
  | 'section5Traceability'
  | 'section5FutureProducts'
  | 'final';
const SURVEY_PAGE_FLOW: SurveyPage[] = [
  'page1',
  'pls',
  'consent',
  'consentForm',
  'studyYear',
  'toc',
  'section1General',
  'section1Soil',
  'section2Production',
  'section2Rainfall',
  'section2Fertiliser',
  'section2FertiliserFollowup',
  'section3Biosecurity',
  'section3ChemicalFollowup',
  'section5Intro',
  'section5Traceability',
  'section5FutureProducts',
  'final',
];

const FERTILISER_MATRIX_COLUMNS = [
  "Total Quantity per Year in Solid Form (in kilogram)",
  "Total Quantity per Year (Ready-to-Use Liquid Chemicals, Liters)",
  "Total Quantity per Year (Liquid Concentrates, Liters)",
  "How many times do you apply per year",
] as const;

const FERTILISER_MATRIX_ROWS = [
  "Inorganic macronutritions such as N, P, K, Ca, Mg.",
  "Inorganic micronutrients such as Fe, Zinc, Mn, Cu, Mo, Boron etc. (Synthetic)",
  "Humic acid / Fulvic acid",
  "Molasses",
  "Seaweed derivatives",
  "Animal-derived organic fertiliser, such as Fish emulsion, Bone meal, Blood meal",
  "pH Adjusters: (e.g., Acids, Chlorine, Hydrogen Peroxide, lime, dolomite)",
  "Other",
] as const;

const SECTION3_CHEMICAL_MATRIX_COLUMNS = [
  "Total quantity per year in solid form (kilograms)",
  "Total quantity per year in ready-to-use liquid form (litres)",
  "Total Quantity per Year in liquid concentrate form (litres)",
] as const;

const SECTION3_CHEMICAL_MATRIX_ROWS = [
  "Insecticides",
  "Herbicides (for weeds)",
  "Rodenticides",
  "Acaricides (for mites)",
  "Repellents (for various pests)",
  "Biological control agents",
  "Others",
] as const;

const REGIONS_BY_STATE: Record<string, string[]> = {
  VIC: [
    "Alexandra",
    "Aireys Inlet",
    "Fairhaven",
    "Allansford",
    "Anglesea",
    "Apollo Bay",
    "Ararat",
    "Avenel",
    "Avoca",
    "Bacchus Marsh",
    "Bairnsdale",
    "Ballan",
    "Ballarat",
    "Balnarring Beach",
    "Merricks",
    "Bannockburn",
    "Barnawartha",
    "Beaconsfield Upper",
    "Beaufort",
    "Beeac",
    "Beechworth",
    "Bellbridge",
    "Benalla",
    "Bendigo",
    "Beulah",
    "Birchip",
    "Birregurra",
    "Blackwood",
    "Boolarra",
    "Boort",
    "Briagolong",
    "Bridgewater",
    "Bright",
    "Broadford",
    "Bruthen",
    "Bulla",
    "Buninyong",
    "Bunyip",
    "Campbells Creek",
    "Camperdown",
    "Cann River",
    "Cape Paterson",
    "Cardigan Village",
    "Carisbrook",
    "Carrum Downs",
    "Casterton",
    "Castlemaine",
    "Charlton",
    "Chewton",
    "Chiltern",
    "Churchill",
    "Clifton Springs",
    "Clunes",
    "Cobden",
    "Cobram",
    "Cockatoo",
    "Cohuna",
    "Colac",
    "Coldstream",
    "Coleraine",
    "Coongulla",
    "Corinella",
    "Coronet Bay",
    "Corryong",
    "Cowes",
    "Craigieburn",
    "Cranbourne",
    "Cranbourne South",
    "Creswick",
    "Crib Point",
    "Darnum",
    "Dartmoor",
    "Daylesford",
    "Derrinallum",
    "Diggers Rest",
    "Dimboola",
    "Dinner Plain",
    "Donald",
    "Dookie",
    "Drouin",
    "Drysdale",
    "Dunkeld",
    "Dunolly",
    "Echuca",
    "Edenhope",
    "Eildon",
    "Elmore",
    "Emerald",
    "Euroa",
    "Flinders",
    "Foster",
    "Garfield",
    "Geelong",
    "Gembrook",
    "Girgarre",
    "Gisborne",
    "Glenrowan",
    "Goornong",
    "Gordon",
    "Goroke",
    "Grantville",
    "Gunbower",
    "Halls Gap",
    "Hamilton",
    "Harcourt",
    "Hastings",
    "Healesville",
    "Heathcote",
    "Heyfield",
    "Heywood",
    "Hopetoun",
    "Horsham",
    "Huntly",
    "Hurstbridge",
    "Indented Head",
    "Inglewood",
    "Inverleigh",
    "Inverloch",
    "Irymple",
    "Jeparit",
    "Kaniva",
    "Katamatite",
    "Kerang",
    "Kilmore",
    "Kinglake",
    "Koo Wee Rup",
    "Koondrook",
    "Koroit",
    "Korong Vale",
    "Korumburra",
    "Kyabram",
    "Kyneton",
    "Lake Boga",
    "Lake Bolac",
    "Lake Tyers",
    "Lakes Entrance",
    "Lancefield",
    "Lang Lang",
    "Lara",
    "Launching Place",
    "Learmonth",
    "Leitchville",
    "Leongatha",
    "Leopold",
    "Lethbridge",
    "Lindenow",
    "Linton",
    "Lismore",
    "Loch",
    "Loch Sport",
    "Lockington",
    "Longwarry",
    "Macarthur",
    "Macedon",
    "Maffra",
    "Maldon",
    "Mallacoota",
    "Malmsbury",
    "Manangatang",
    "Mansfield",
    "Marlo",
    "Maryborough",
    "Marysville",
    "Meeniyan",
    "Melbourne",
    "Melton",
    "Merbein",
    "Meredith",
    "Merino",
    "Mernda",
    "Merrigum",
    "Metung",
    "Mildura",
    "Millgrove",
    "Miners Rest",
    "Minyip",
    "Mirboo North",
    "Moe",
    "Moriac",
    "Mortlake",
    "Morwell",
    "Mount Beauty",
    "Mount Helen",
    "Mount Macedon",
    "Moyhu",
    "Murchison",
    "Murrayville",
    "Murtoa",
    "Myrtleford",
    "Nagambie",
    "Nar Nar Goon",
    "Nathalia",
    "Natimuk",
    "Neerim South",
    "New Gisborne",
    "Newhaven",
    "Newstead",
    "Nhill",
    "Noorat",
    "Numurkah",
    "Nyah",
    "Nyah West",
    "Nyora",
    "Ocean Grove",
    "Barwon Heads",
    "Officer",
    "Omeo",
    "Orbost",
    "Ouyen",
    "Pakenham",
    "Panton Hill",
    "Paynesville",
    "Pearcedale",
    "Penshurst",
    "Poowong",
    "Porepunkah",
    "Port Albert",
    "Port Campbell",
    "Port Fairy",
    "Port Welshpool",
    "Portarlington",
    "Portland",
    "Pyramid Hill",
    "Quambatook",
    "Queenscliff",
    "Rainbow",
    "Rawson",
    "Red Cliffs",
    "Rhyll",
    "Riddells Creek",
    "Robinvale",
    "Rochester",
    "Rockbank",
    "Romsey",
    "Rosedale",
    "Rupanyup",
    "Rushworth",
    "Rutherglen",
    "Sale",
    "San Remo",
    "Sea Lake",
    "Seaspray",
    "Seville",
    "Seymour",
    "Shepparton",
    "Mooroopna",
    "Shoreham",
    "Skipton",
    "Smythesdale",
    "Snake Valley",
    "Somers",
    "Somerville",
    "St Andrews",
    "St Andrews Beach",
    "St Arnaud",
    "St Leonards",
    "Stanhope",
    "Stawell",
    "Stratford",
    "Strathfieldsaye",
    "Strathmerton",
    "Sunbury",
    "Swan Hill",
    "Swifts Creek",
    "Talbot",
    "Tallangatta",
    "Tallarook",
    "Tangambalanga",
    "Tatura",
    "Tawonga",
    "Terang",
    "Timboon",
    "Tongala",
    "Toora",
    "Tooradin",
    "Torquay",
    "Trafalgar",
    "Traralgon",
    "Trentham",
    "Tungamah",
    "Tyabb",
    "Tyers",
    "Tylden",
    "Tynong",
    "Underbool",
    "Venus Bay",
    "Violet Town",
    "Wallan",
    "Wandong",
    "Heathcote Junction",
    "Wangaratta",
    "Warburton",
    "Warneet East",
    "Warracknabeal",
    "Warragul",
    "Warrnambool",
    "Wedderburn",
    "Whittlesea",
    "Willaura",
    "Winchelsea",
    "Wodonga",
    "Wonga Park",
    "Wonthaggi",
    "Woodend",
    "Woomelang",
    "Woori Yallock",
    "Woorinen",
    "Wycheproof",
    "Yackandandah",
    "Yallourn North",
    "Yarra Glen",
    "Yarra Junction",
    "Yarragon",
    "Yarram",
    "Yarrawonga",
    "Yea",
    "Yinnar",
  ],
  NSW: [
    "Aberdeen",
    "Adaminaby",
    "Adelong",
    "Agnes Banks",
    "Albury",
    "Alstonville",
    "Angourie",
    "Anna Bay",
    "Appin",
    "Ardlethan",
    "Ariah Park",
    "Armidale",
    "Arrawarra",
    "Ashford",
    "Attunga",
    "Austral",
    "Avondale",
    "Awaba",
    "Ballina",
    "Balranald",
    "Bangalow",
    "Baradine",
    "Barellan",
    "Bargo",
    "Barham",
    "Barmedman",
    "Barooga",
    "Barraba",
    "Basin View",
    "Batemans Bay",
    "Bathurst",
    "Batlow",
    "Bawley Point",
    "Beauty Point",
    "Beechwood",
    "Beelbangera",
    "Bega",
    "Bellingen",
    "Bemboka",
    "Bendemeer",
    "Bermagui",
    "Berrara",
    "Berridale",
    "Berrigan",
    "Berrima",
    "Berry",
    "Bilbul",
    "Binalong",
    "Bingara",
    "Binnaway",
    "Blackheath",
    "Blayney",
    "Boat Harbour",
    "Bodalla",
    "Bogangar",
    "Boggabilla",
    "Boggabri",
    "Bombala",
    "Bonalbo",
    "Bonnells Bay",
    "Bonny Hills",
    "Boorowa",
    "Bourke",
    "Bowen Mountain",
    "Bowral",
    "Bowraville",
    "Braidwood",
    "Brandy Hill",
    "Branxton-Greta",
    "Brewarrina",
    "Brightwaters",
    "Broadwater",
    "Broke",
    "Broken Hill",
    "Brooklyn",
    "Brooms Head",
    "Brunswick Heads",
    "Bulahdelah",
    "Bundanoon",
    "Bundarra",
    "Bungendore",
    "Buronga",
    "Burrill Lake",
    "Burringbar",
    "Buxton",
    "Byron Bay",
    "Cabramurra",
    "Callala Bay",
    "Cambewarra",
    "Camden Haven",
    "Camden West",
    "Candelo",
    "Canowindra",
    "Captains Flat",
    "Carcoar",
    "Cargo",
    "Casino",
    "Catherine Hill Bay",
    "Central Coast",
    "Cessnock-Bellbird",
    "Chain Valley Bay",
    "Clarence Town",
    "Clifton Grove",
    "Clunes",
    "Cobar",
    "Cobargo",
    "Cobbitty",
    "Coffs Harbour",
    "Coleambally",
    "Collarenebri",
    "Colo Vale",
    "Condobolin",
    "Coolah",
    "Coolamon",
    "Cooma",
    "Coomba Park",
    "Coomealla",
    "Coonabarabran",
    "Coonamble",
    "Coopernook",
    "Cooranbong",
    "Cootamundra",
    "Copmanhurst",
    "Coraki",
    "Coramba",
    "Corindi Beach",
    "Corlette",
    "Corowa",
    "Couridjah",
    "Coutts Crossing",
    "Cowan",
    "Cowra",
    "Crescent Head",
    "Crookwell",
    "Cudal",
    "Culburra-Orient Point",
    "Culcairn",
    "Cumnock",
    "Cunjurong",
    "Curlewis",
    "Currarong",
    "Dalmeny",
    "Dareton",
    "Darlington Point",
    "Deepwater",
    "Delegate",
    "Delungra",
    "Deniliquin",
    "Denman",
    "Diamond Beach",
    "Dora Creek",
    "Dorrigo",
    "Douglas Park",
    "Dubbo",
    "Dunedoo",
    "Dungog",
    "Dunoon",
    "Durras",
    "East Jindabyne",
    "Eden",
    "Ellalong",
    "Emerald Beach",
    "Emmaville",
    "Erowal Bay",
    "Estella",
    "Eugowra",
    "Euston",
    "Evans Head",
    "Exeter",
    "Fingal Bay",
    "Finley",
    "Fishermans Paradise",
    "Forbes",
    "Forest Hill",
    "Forster-Tuncurry",
    "Frederickton",
    "Freemans Reach",
    "Galston",
    "Ganmain",
    "Gerringong",
    "Gerroa",
    "Geurie",
    "Gilgai",
    "Gilgandra",
    "Gillieston Heights",
    "Glen Innes",
    "Glenorie",
    "Glenreagh",
    "Glossodia",
    "Gloucester",
    "Gol Gol",
    "Goodooga",
    "Goolgowi",
    "Goondiwindi",
    "Goulburn",
    "Grafton",
    "Grasmere",
    "Green Hill",
    "Green Point",
    "Greenwell Point",
    "Grenfell",
    "Gresford",
    "Griffith",
    "Gulargambone",
    "Gulgong",
    "Gulmarrad",
    "Gumly Gumly",
    "Gundagai",
    "Gunnedah",
    "Gunning",
    "Guyra",
    "Gwandalan",
    "Hallidays Point",
    "Hanwood",
    "Harden-Murrumburrah",
    "Harrington",
    "Harwood",
    "Hastings Point",
    "Hat Head",
    "Hawkesbury Heights",
    "Hawks Nest",
    "Hay",
    "Heddon Greta",
    "Helensburgh",
    "Henty",
    "Hill Top",
    "Hillston",
    "Hinton",
    "Holbrook",
    "Howlong",
    "Huskisson",
    "Hyland Park",
    "Iluka",
    "Inverell",
    "Ivanhoe",
    "Jamberoo",
    "Jerilderie",
    "Jindabyne",
    "Jindera",
    "Junction Hill",
    "Junee",
    "Kalaru",
    "Kandos",
    "Kangaroo Valley",
    "Karuah",
    "Katoomba",
    "Kempsey",
    "Kendall",
    "Kenthurst",
    "Khancoban",
    "Kiama",
    "Killingworth",
    "Kings Point",
    "Kitchener",
    "Koorawatha",
    "Kootingal",
    "Korora Bay",
    "Kurmond",
    "Kurrajong",
    "Kurrajong Heights",
    "Kurri Kurri-Weston",
    "Kyogle",
    "Ladysmith",
    "Lake Cargelligo",
    "Lake Cathie",
    "Lake Conjola",
    "Lake Conjola West",
    "Lake Munmorah",
    "Lake Tabourie",
    "Lakewood Estate",
    "Lansdowne",
    "Lawrence",
    "Lawson",
    "Leeton",
    "Lemon Tree Passage",
    "Lennox Head",
    "Lightning Ridge",
    "Lismore",
    "Lithgow",
    "Lochinvar",
    "Lockhart",
    "Londonderry",
    "Long Beach",
    "Luddenham",
    "Lyndhurst",
    "Macksville",
    "Maclean",
    "Maianbar",
    "Maitland",
    "Malua Bay",
    "Manildra",
    "Manilla",
    "Mannering Park",
    "Manning Point",
    "Marulan",
    "Mathoura",
    "McGraths Hill",
    "McMasters Beach",
    "Medlow Bath",
    "Medowie",
    "Menangle",
    "Menangle Park",
    "Mendooran",
    "Menindee",
    "Merimbula",
    "Merriwa",
    "Mid Sapphire Beach",
    "Millfield",
    "Millthorpe",
    "Milton",
    "Minmi",
    "Mirrabooka",
    "Mittagong",
    "Moama",
    "Modanville",
    "Mogo",
    "Molong",
    "Moonbi",
    "Moonee Beach",
    "Mooney Mooney",
    "Moree",
    "Morisset",
    "Moruya",
    "Moruya Heads",
    "Moss Vale",
    "Moulamein",
    "Mount Hunter",
    "Mount Victoria",
    "Mudgee",
    "Mulbring",
    "Mulgoa",
    "Mullumbimby",
    "Mulwala",
    "Mungindi",
    "Murrumbateman",
    "Murrurundi",
    "Murwillumbah",
    "Muswellbrook",
    "Mylestom",
    "Nabiac",
    "Nambucca Heads",
    "Narooma",
    "Narrabri",
    "Narrandera",
    "Narromine",
    "Neath",
    "Nelson Bay",
    "Nemingha",
    "Newcastle",
    "Nimbin",
    "Nimmitabel",
    "Nords Wharf",
    "North Arm Cove",
    "North Richmond",
    "North Rothbury",
    "Nowra",
    "Nundle",
    "Nyngan",
    "Oakdale",
    "Oaklands",
    "Oberon",
    "Ocean Shores",
    "Old Bar",
    "Old Erowal Bay",
    "Orange",
    "Otford",
    "Pacific Palms-Blueys Beach",
    "Pallamallawa",
    "Pambula",
    "Pambula Beach",
    "Parkes",
    "Paterson",
    "Patonga",
    "Paxton",
    "Peak Hill",
    "Perisher Village",
    "Perthville",
    "Picton",
    "Pitt Town",
    "Port Macquarie",
    "Portland",
    "Pottsville Beach",
    "Queanbeyan",
    "Quirindi",
    "Raymond Terrace",
    "Red Rock",
    "Robertson",
    "Rylstone",
    "Safety Beach",
    "Salamander Bay-Soldiers Point",
    "Sandy Beach",
    "Sandy Point",
    "Satur",
    "Sawtell",
    "Scone",
    "Scotts Head",
    "Seaham",
    "Seahampton",
    "Shoalhaven Heads",
    "Silverwater",
    "Singleton",
    "Smiths Lake",
    "Smithtown-Gladstone",
    "South Golden Beach",
    "South West Rocks",
    "Spring Hill",
    "St Georges Basin",
    "Stanwell Park",
    "Stanwell Tops",
    "Stockinbingal",
    "Stroud",
    "Stuarts Point",
    "Suffolk Park",
    "Sunshine",
    "Sussex Inlet",
    "Sydney",
    "Tahmoor",
    "Talbingo",
    "Tamworth",
    "Tapitallee",
    "Taralga",
    "Tarcutta",
    "Taree",
    "Tarraganda",
    "Tathra",
    "Tea Gardens",
    "Temora",
    "Tenterfield",
    "The Oaks",
    "The Rock",
    "Thirlmere",
    "Thredbo Village",
    "Tibooburra",
    "Tingha",
    "Tinonee",
    "Tocumwal",
    "Tomakin",
    "Tomerong",
    "Tooleybuc",
    "Tottenham",
    "Trangie",
    "Trundle",
    "Tucabia",
    "Tullamore",
    "Tumbarumba",
    "Tumbulgum",
    "Tumut",
    "Tura Beach",
    "Tuross Heads",
    "Tweed Heads",
    "Tyalgum",
    "Uki",
    "Ulladulla",
    "Ulmarra",
    "Ungarie",
    "Uralla",
    "Urana",
    "Uranquinty",
    "Urbenville",
    "Urunga",
    "Valla Beach",
    "Vineyard",
    "Wagga Wagga",
    "Wagstaff-Killcare",
    "Wakool",
    "Walcha",
    "Walgett",
    "Walla Walla",
    "Wallabi Point",
    "Wallacia",
    "Wallalong",
    "Wallerawang",
    "Wangi-Rathmines",
    "Wardell",
    "Warialda",
    "Warragamba",
    "Warren",
    "Waterfall",
    "Waterview Heights",
    "Wauchope",
    "Wee Waa",
    "Wellington",
    "Wentworth",
    "Werris Creek",
    "West Hoxton",
    "West Wyalong",
    "White Cliffs",
    "Whitton",
    "Wilberforce",
    "Wilcannia",
    "Willow Vale",
    "Wilton",
    "Windella Downs",
    "Windermere Park",
    "Windsor",
    "Windsor Downs",
    "Wingello",
    "Wingham",
    "Wollongbar",
    "Wollongong",
    "Wolumla",
    "Wongarbon",
    "Woodburn",
    "Woodenbong",
    "Woodstock",
    "Woolgoolga",
    "Wooli",
    "Wooloweyah",
    "Wooroowoolgan",
    "Wyee",
    "Wyee Point",
    "Yamba",
    "Yanco",
    "Yanderra",
    "Yarrawonga Park",
    "Yass",
    "Yellow Rock",
    "Yenda",
    "Yeoval",
    "Yerrinbool",
    "Young",
  ],
  QLD: [
    "Agnes Water",
    "Airlie Beach",
    "Alice River",
    "Alligator Creek",
    "Allingham",
    "Allora",
    "Alpha",
    "Amity",
    "Aramac",
    "Arcadia Bay",
    "Atherton",
    "Augathella",
    "Aurukun",
    "Ayr",
    "Babinda",
    "Bakers Creek",
    "Balgal Beach",
    "Bamaga",
    "Baralaba",
    "Barcaldine",
    "Bargara",
    "Beachmere",
    "Beaudesert",
    "Beerwah",
    "Bell",
    "Biggenden",
    "Biloela",
    "Bingil Bay",
    "Blackall",
    "Blackbutt",
    "Blacks Beach",
    "Blackwater",
    "Bli Bli",
    "Blue Mountain Heights",
    "Bluff",
    "Bohle Plains",
    "Bongaree",
    "Boonah",
    "Boreen Point",
    "Bouldercombe",
    "Boulia",
    "Bowen",
    "Boykambil",
    "Boyne Island",
    "Brandon",
    "Brisbane",
    "Bucasia",
    "Buderim",
    "Bundaberg",
    "Burketown",
    "Burnett Heads",
    "Burpengary",
    "Burrum Heads",
    "Caboolture",
    "Cairns",
    "Cairns Northern Beaches",
    "Calen",
    "Calliope",
    "Caloundra",
    "Cambooya",
    "Camooweal",
    "Campwin Beach",
    "Cannonvale",
    "Canungra",
    "Capella",
    "Caravonica",
    "Cardwell",
    "Cecil Plains",
    "Charleville",
    "Charters Towers",
    "Cherbourg",
    "Childers",
    "Chinchilla",
    "Clermont",
    "Clifton",
    "Cloncurry",
    "Collinsville",
    "Cooktown",
    "Cooloola Cove",
    "Coolum Beach",
    "Coominya",
    "Cooran",
    "Cooroy",
    "Cordalba",
    "Cordelia",
    "Cowal Creek",
    "Craiglie",
    "Crows Nest",
    "Croydon",
    "Cungulla",
    "Cunnamulla",
    "Dajarra",
    "Dalby",
    "Dayboro",
    "Deception Bay",
    "Deeragun",
    "Dimbulah",
    "Dirranbandi",
    "Donnybrook",
    "Doomadgee",
    "Duaringa",
    "Dundowran",
    "Dunwich",
    "Dysart",
    "Eagle Heights",
    "Eidsvold",
    "Eimeo",
    "El Arish",
    "Elliott Heads",
    "Emerald",
    "Emu Park",
    "Esk",
    "Eton",
    "Eumundi",
    "Farleigh",
    "Fernvale",
    "Finch Hatton",
    "Flying Fish Point",
    "Forest Hill",
    "Gatton",
    "Gayndah",
    "Georgetown",
    "Gin Gin",
    "Giru",
    "Gladstone",
    "Glass House Mountains",
    "Glenden",
    "Glenella",
    "Gold Coast",
    "Goombungee",
    "Goomeri",
    "Gordonvale",
    "Gracemere",
    "Grantham",
    "Grasstree Beach",
    "Greenmount",
    "Gympie",
    "Gympie South",
    "Half Tide Beach",
    "Halifax",
    "Hamilton Island",
    "Harrisville",
    "Hector",
    "Helensvale",
    "Helidon",
    "Herberton",
    "Hervey Bay",
    "Highfields",
    "Home Hill",
    "Hope Island",
    "Hope Vale",
    "Horseshoe Bay",
    "Howard",
    "Hughenden",
    "Imbil",
    "Ingham",
    "Inglewood",
    "Injune",
    "Innes Park",
    "Innisfail",
    "Jacobs Well",
    "Jalloonda",
    "Jandowae",
    "Jimboomba",
    "Julia Creek",
    "Kairi",
    "Kalamia Estate",
    "Kalbar",
    "Karalee",
    "Karana Downs",
    "Karumba",
    "Kawana Waters",
    "Kenilworth",
    "Kilcoy",
    "Kilkivan",
    "Killarney",
    "Kingaroy",
    "Kingsthorpe",
    "Kooralbyn",
    "Kowanyama",
    "Kuranda",
    "Kurrimine",
    "Laidley",
    "Landsborough",
    "Lockhart River",
    "Longreach",
    "Lowood",
    "Lucinda",
    "Mackay",
    "Macknade",
    "Malanda",
    "Maleny",
    "Mapleton",
    "Marburg",
    "Marcoola",
    "Marcus Beach",
    "Mareeba",
    "Marian",
    "Maroochydore",
    "Maryborough",
    "Merinda",
    "Middlemount",
    "Miles",
    "Millaa Millaa",
    "Millmerran",
    "Mirani",
    "Miriam Vale",
    "Mission Beach",
    "Mitchell",
    "Monto",
    "Mooloolah",
    "Moore Park",
    "Moranbah",
    "Morayfield",
    "Mossman",
    "Mount Garnet",
    "Mount Isa",
    "Mount Larcom",
    "Mount Low",
    "Mount Morgan",
    "Mount Nebo",
    "Mount Tamborine",
    "Moura",
    "Mourilyan",
    "Mudjimba",
    "Mundubbera",
    "Murgon",
    "Nambour",
    "Nanango",
    "Napranum",
    "Narangba",
    "Nelly Bay",
    "Nerang",
    "New Mapoon",
    "Newell",
    "Ningi",
    "Normanton",
    "North Tamborine",
    "Oakey",
    "Oxenford",
    "Pallarenda",
    "Palm Island",
    "Palmwoods",
    "Peachester",
    "Pentland",
    "Peregian Beach",
    "Picnic Bay",
    "Pittsworth",
    "Planella",
    "Point Lookout",
    "Point Talburpin",
    "Pomona",
    "Pormpuraaw",
    "Port Douglas",
    "Proserpine",
    "Proston",
    "Quilpie",
    "Rainbow Beach",
    "Rathdowney",
    "Ravenshoe",
    "Redland Bay",
    "Richmond",
    "River Heads",
    "Rockhampton",
    "Roma",
    "Rosewood",
    "Rubyvale",
    "Samford",
    "Sandstone Point",
    "Santa Barbara",
    "Sapphire",
    "Sarina",
    "Sarina Beach",
    "Seaforth",
    "Seventeen Seventy",
    "Shoal Point",
    "Silkwood",
    "Smithfield Heights",
    "South Johnstone",
    "South Mission Beach",
    "Springsure",
    "St George",
    "St Pauls",
    "Stanthorpe",
    "Surat",
    "Tambo",
    "Tannum Sands",
    "Tara",
    "Taroom",
    "Taylors Beach",
    "Tewantin-Noosa",
    "Texas",
    "Thangool",
    "Thargomindah",
    "The Junction",
    "The Palms",
    "Theodore",
    "Thursday Island",
    "Tiaro",
    "Tieri",
    "Tin Can Bay",
    "Tolga",
    "Toogoolawah",
    "Toogoom",
    "Toorbul",
    "Toowoomba",
    "Torbanlea",
    "Townsville-Thuringowa",
    "Trebonne",
    "Tully",
    "Tully Heads",
    "Umagico",
    "Victoria Point",
    "Walkerston",
    "Wallangarra",
    "Walloon",
    "Wallumbilla",
    "Wamuran",
    "Wandoan",
    "Wangan",
    "Warwick",
    "Weipa",
    "Willows Gemfields",
    "Winton",
    "Withcott",
    "Wondai",
    "Wonga Beach",
    "Wongaling Beach",
    "Woodford",
    "Woodgate",
    "Woombye",
    "Woorabinda",
    "Woorim",
    "Wujal Wujal",
    "Wyreema",
    "Yandina",
    "Yangan",
    "Yaroomba",
    "Yarrabah",
    "Yarraman",
    "Yelarbon",
    "Yeppoon",
    "Yuleba",
    "Yungaburra",
  ],
  SA: [
    "Adelaide",
    "Aldinga Beach",
    "Andamooka",
    "Angaston",
    "Angle Vale",
    "Ardrossan",
    "Auburn",
    "Balaklava",
    "Balhannah",
    "Barmera",
    "Beachport",
    "Berri",
    "Birdwood",
    "Blanchetown",
    "Blyth",
    "Booleroo Centre",
    "Bordertown",
    "Burra",
    "Bute",
    "Callington",
    "Carrickalinga",
    "Ceduna",
    "Clare",
    "Cleve",
    "Cobdogla",
    "Coffin Bay",
    "Coober Pedy",
    "Coonalpyn",
    "Cowell",
    "Crafers-Bridgewater",
    "Crystal Brook",
    "Cummins",
    "Echunga",
    "Edithburgh",
    "Elliston",
    "Eudunda",
    "Freeling",
    "Gawler",
    "Gladstone",
    "Goolwa",
    "Greenock",
    "Gumeracha",
    "Hahndorf",
    "Hamley Bridge",
    "Hawker",
    "Houghton",
    "Iron Knob",
    "Jamestown",
    "Kadina",
    "Kalangadoo",
    "Kapunda",
    "Karoonda",
    "Keith",
    "Kersbrook",
    "Kimba",
    "Kingscote",
    "Kingston Se",
    "Lameroo",
    "Laura",
    "Leigh Creek",
    "Lobethal",
    "Loxton",
    "Lucindale",
    "Lyndoch",
    "Macclesfield",
    "Maitland",
    "Mallala",
    "Mannum",
    "Maslin Beach",
    "McLaren Vale",
    "Meadows",
    "Meningie",
    "Middleton",
    "Milang",
    "Millicent",
    "Minlaton",
    "Mintabie",
    "Moonta",
    "Moorook",
    "Morgan",
    "Mount Barker",
    "Mount Burr",
    "Mount Compass",
    "Mount Gambier",
    "Mount Pleasant",
    "Mount Torrens",
    "Murray Bridge",
    "Nairne",
    "Nangwarry",
    "Napperby",
    "Naracoorte",
    "Normanville",
    "Nuriootpa",
    "Oakbank",
    "Orroroo",
    "Owen",
    "Paringa",
    "Penola",
    "Peterborough",
    "Pinnaroo",
    "Port Augusta",
    "Port Broughton",
    "Port Elliot",
    "Port Germein",
    "Port Lincoln",
    "Port MacDonnell",
    "Port Neill",
    "Port Pirie",
    "Port Victoria",
    "Port Vincent",
    "Port Wakefield",
    "Quorn",
    "Renmark",
    "Riverton",
    "Robe",
    "Roseworthy",
    "Roxby Downs",
    "Saddleworth",
    "Sellicks Beach",
    "Snowtown",
    "Spalding",
    "Springton",
    "Stansbury",
    "Strathalbyn",
    "Streaky Bay",
    "Summertown",
    "Swan Reach",
    "Tailem Bend",
    "Tantanoola",
    "Tanunda",
    "Tarpeena",
    "Tintinara",
    "Tumby Bay",
    "Two Wells",
    "Uraidla",
    "Victor Harbor",
    "Virginia",
    "Waikerie",
    "Wallaroo",
    "Warooka",
    "Wasleys",
    "Whyalla",
    "Williamstown",
    "Willunga",
    "Wilmington",
    "Wirrabara",
    "Woodside",
    "Woomera",
    "Wudinna",
    "Yalata",
    "Yankalilla",
    "Yorketown",
  ],
  WA: [
    "Albany",
    "Allanson",
    "Augusta",
    "Australind",
    "Bardi (One Arm Point)",
    "Beagle Bay",
    "Beverley",
    "Binningup",
    "Boddington",
    "Boyanup",
    "Boyup Brook",
    "Bremer Bay",
    "Bridgetown",
    "Brookton",
    "Broome",
    "Bruce Rock",
    "Brunswick Junction",
    "Bunbury",
    "Burekup",
    "Busselton",
    "Byford",
    "Capel",
    "Carnamah",
    "Carnarvon",
    "Cervantes",
    "Chidlow",
    "Collie",
    "Coolgardie",
    "Coral Bay",
    "Corrigin",
    "Cranbrook",
    "Cuballing",
    "Cue",
    "Cunderdin",
    "Dalwallinu",
    "Dampier",
    "Dardanup",
    "Darkan",
    "Denham",
    "Denmark",
    "Derby",
    "Dongara",
    "Donnybrook",
    "Dowerin",
    "Drummond Cove",
    "Dumbleyung",
    "Dunsborough",
    "Dwellingup",
    "East Bullsbrook",
    "Eaton",
    "Eneabba",
    "Esperance",
    "Exmouth",
    "Fitzroy Crossing",
    "Furnissdale",
    "Gelorup",
    "Geraldton",
    "Gingin",
    "Gnowangerup",
    "Golden Bay-Singleton",
    "Goomalling",
    "Green Head",
    "Greenbushes",
    "Halls Creek",
    "Harvey",
    "Hopetoun",
    "Jarrahdale",
    "Jerramungup",
    "Jurien Bay",
    "Kalbarri",
    "Kalgoorlie-Boulder",
    "Kalumburu Aboriginal Community",
    "Kambalda",
    "Karratha",
    "Katanning",
    "Kellerberrin",
    "Kojonup",
    "Kondinin",
    "Koorda",
    "Kulin",
    "Kununurra",
    "Kwinana",
    "Lagrange Aboriginal Community",
    "Lake Grace",
    "Lancelin",
    "Laverton",
    "Leeman",
    "Leinster",
    "Leonora",
    "Leschenault",
    "Little Grove",
    "Looma Aboriginal Community",
    "Mahogany Creek",
    "Mandurah",
    "Manjimup",
    "Marble Bar",
    "Margaret River",
    "Marvel Loch",
    "Meekatharra",
    "Merredin",
    "Mingenew",
    "Moora",
    "Morawa",
    "Mount Barker",
    "Mount Helena",
    "Mount Magnet",
    "Mukinbudin",
    "Mullewa",
    "Mundaring",
    "Mundijong",
    "Mungullah",
    "Nannup",
    "Narembeen",
    "Narrogin",
    "Newman",
    "Norseman",
    "North Pinjarra",
    "Northam",
    "Northampton",
    "Northcliffe",
    "Onslow",
    "Oombulgurri",
    "Pannawonica",
    "Paraburdoo",
    "Parkerville",
    "Pemberton",
    "Peppermint Grove",
    "Perth",
    "Pingelly",
    "Pinjarra",
    "Point Samson",
    "Port Hedland",
    "Quairading",
    "Quindalup",
    "Ravensthorpe",
    "Rockingham",
    "Roebourne",
    "Rottnest Island",
    "Sawyers Valley",
    "Serpentine",
    "Southern Cross",
    "Stoneville",
    "Stratham",
    "Tambellup",
    "Tammin",
    "Three Springs",
    "Tom Price",
    "Toodyay",
    "Turkey Creek",
    "Two Rocks",
    "Wagin",
    "Walpole",
    "Warburton",
    "Waroona",
    "Wickepin",
    "Wickham",
    "Williams",
    "Wiluna",
    "Wongan Hills",
    "Wooroloo",
    "Wundowie",
    "Wyalkatchem",
    "Wyndham",
    "Yanchep",
    "Yarloop",
    "York",
    "Yunderup",
  ],
  TAS: [
    "Bagdad",
    "Beaconsfield",
    "Beauty Point",
    "Bicheno",
    "Bothwell",
    "Bracknell",
    "Branxholm",
    "Bridgewater",
    "Bridport",
    "Burnie",
    "Campania",
    "Campbell Town",
    "Carrick",
    "Collinsvale",
    "Cremorne",
    "Cressy",
    "Currie",
    "Cygnet",
    "Deloraine",
    "Devonport",
    "Dilston",
    "Dodges Ferry",
    "Dover",
    "Dunalley",
    "Eaglehawk Neck",
    "Evandale",
    "Exeter",
    "Fern Tree",
    "Fingal",
    "Forth",
    "Franklin",
    "Gawler",
    "Geeveston",
    "George Town",
    "Gravelly Beach",
    "Hadspen",
    "Heybridge",
    "Hobart",
    "Howden",
    "Huonville",
    "Kempton",
    "Kettering",
    "Kingston",
    "Lanena",
    "Latrobe",
    "Lauderdale",
    "Launceston",
    "Legana",
    "Lewisham",
    "Lilydale",
    "Longford",
    "Low Head",
    "Margate",
    "Maydena",
    "Mole Creek",
    "New Norfolk",
    "Nubeena",
    "Oatlands",
    "Old Beach",
    "Opossum Bay",
    "Orford",
    "Otago",
    "Penguin",
    "Perth",
    "Pontville",
    "Port Sorell",
    "Primrose Sands",
    "Queenstown",
    "Railton",
    "Richmond",
    "Ridgley",
    "Ringarooma",
    "Rosebery",
    "Ross",
    "Scamander",
    "Scottsdale",
    "Seven Mile Beach",
    "Sheffield",
    "Sisters Beach",
    "Smithton",
    "Snug",
    "Sorell",
    "South Arm",
    "St Helens",
    "St Marys",
    "Stanley",
    "Strahan",
    "Sulphur Creek",
    "Swansea",
    "Triabunna",
    "Tullah",
    "Turners Beach",
    "Ulverstone",
    "Waratah",
    "Westbury",
    "White Beach",
    "Woodbridge",
    "Wynyard",
    "Zeehan",
  ],
  NT: [
    "Adelaide River",
    "Ali-Curung",
    "Alice Springs",
    "Alpurrurulam",
    "Alyangula",
    "Ampilatwatja",
    "Angurugu",
    "Barunga (Bamyili)",
    "Batchelor",
    "Belyuen",
    "Borroloola",
    "Coonawarra",
    "Daly River",
    "Darwin",
    "Elliott",
    "Galiwinku",
    "Gapuwiyak",
    "Gunyangara",
    "Hermannsburg",
    "Howard Springs",
    "Humpty Doo-McMinns Lagoon",
    "Jabiru",
    "Kalkarinji (Wave Hill)",
    "Kaltukatjara (Docker River)",
    "Katherine",
    "Kintore",
    "Lajamanu",
    "Maningrida",
    "Mataranka",
    "Milikapiti (Snake Bay)",
    "Milingimbi",
    "Minjilang",
    "Nguiu",
    "Ngukurr",
    "Nhulunbuy",
    "Numbulwar",
    "Oenpelli",
    "Palmerston",
    "Papunya Aboriginal Community",
    "Pine Creek",
    "Pirlangimpi (Garden Point)",
    "Port Keats (Wadeye)",
    "Ramingining",
    "Santa Teresa",
    "Tennant Creek",
    "Timber Creek",
    "Umbakumba",
    "Virginia-Bees Creek",
    "Warruwi",
    "Yirrkala",
    "Yuendumu",
    "Yulara Tourist Village",
  ],
  ACT: [
    "Canberra",
    "Hall",
  ],
};

export default function SurveyForm() {
  const [currentPage, setCurrentPage] = useState<SurveyPage>('page1');
  const [formData, setFormData] = useState({
    givenName: '',
    surname: '',
    contactNumber: '',
    email: '',
    farmName: '',
    farmStreetAddress: '',
    townCity: '',
    postcode: '',
    state: '',
    region: ''
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState('');
  const [isPage4SignatureValid, setIsPage4SignatureValid] = useState(false);
  const [backgroundEmail, setBackgroundEmail] = useState('');
  const [backgroundPostcode, setBackgroundPostcode] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [completedPreviousYears, setCompletedPreviousYears] = useState('');
  const [industryWorkTypes, setIndustryWorkTypes] = useState<string[]>([]);
  const [plantingTimes, setPlantingTimes] = useState('');
  const [soilTypesIdentified, setSoilTypesIdentified] = useState('');
  const [estimatedRainfall, setEstimatedRainfall] = useState('');
  const [solidFertiliserKg, setSolidFertiliserKg] = useState('');
  const [readyLiquidFertiliserLitres, setReadyLiquidFertiliserLitres] = useState('');
  const [concentrateFertiliserLitres, setConcentrateFertiliserLitres] = useState('');
  const [fertiliserMonitoring, setFertiliserMonitoring] = useState('');
  const [fertiliserMatrixValues, setFertiliserMatrixValues] = useState<
    Record<string, { solid: string; ready: string; concentrate: string; applyTimes: string }>
  >(() =>
    Object.fromEntries(
      FERTILISER_MATRIX_ROWS.map((row) => [
        row,
        { solid: '', ready: '', concentrate: '', applyTimes: '' },
      ]),
    ),
  );
  const [soilTestsSince2021, setSoilTestsSince2021] = useState<string[]>([]);
  const [soilTestsSince2024, setSoilTestsSince2024] = useState<string[]>([]);
  const [sapOrLeafTestingSince2024, setSapOrLeafTestingSince2024] = useState('');
  const [structuredFarmPlanAnswers, setStructuredFarmPlanAnswers] = useState<string[]>([]);
  const [bioIssuesTopThree, setBioIssuesTopThree] = useState<string[]>([]);
  const [competingFungiManagement, setCompetingFungiManagement] = useState<string[]>([]);
  const [solidChemicalsAmount, setSolidChemicalsAmount] = useState('');
  const [readyLiquidChemicalsAmount, setReadyLiquidChemicalsAmount] = useState('');
  const [concentratedChemicalsAmount, setConcentratedChemicalsAmount] = useState('');
  const [chemicalMonitoring, setChemicalMonitoring] = useState('');
  const [section3ChemicalMatrixValues, setSection3ChemicalMatrixValues] = useState<
    Record<string, { solid: string; ready: string; concentrate: string }>
  >(() =>
    Object.fromEntries(
      SECTION3_CHEMICAL_MATRIX_ROWS.map((row) => [row, { solid: '', ready: '', concentrate: '' }]),
    ),
  );
  const [usesPoultryForPestControl, setUsesPoultryForPestControl] = useState('');
  const [traceabilitySystem, setTraceabilitySystem] = useState('');
  const [plannedProductsIn5Years, setPlannedProductsIn5Years] = useState<string[]>([]);
  const availableRegions = REGIONS_BY_STATE[formData.state] ?? [];
  const totalPages = SURVEY_PAGE_FLOW.length;
  const currentPageIndex = SURVEY_PAGE_FLOW.indexOf(currentPage);
  const progressPercent = Math.round((currentPageIndex / (totalPages - 1)) * 100);
  const isStudyYearPageValid =
    backgroundEmail.trim() !== '' &&
    backgroundPostcode.trim() !== '' &&
    studyYear !== '' &&
    completedPreviousYears !== '' &&
    industryWorkTypes.length > 0;

  const toggleIndustryWorkType = (workType: string) => {
    setIndustryWorkTypes((prev) =>
      prev.includes(workType) ? prev.filter((item) => item !== workType) : [...prev, workType],
    );
  };

  const handleFertiliserMatrixChange = (
    row: string,
    field: 'solid' | 'ready' | 'concentrate' | 'applyTimes',
    value: string,
  ) => {
    setFertiliserMatrixValues((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [field]: value,
      },
    }));
  };

  const handleSection3ChemicalMatrixChange = (
    row: string,
    field: 'solid' | 'ready' | 'concentrate',
    value: string,
  ) => {
    setSection3ChemicalMatrixValues((prev) => ({
      ...prev,
      [row]: {
        ...prev[row],
        [field]: value,
      },
    }));
  };

  const toggleMultiSelect = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleConsentNextPage = () => {
    if (consent === 'no') {
      setCurrentPage('final');
      return;
    }
    if (consent === 'yes') {
      setCurrentPage('consentForm');
    }
  };

  const handleCloseWindow = () => {
    window.open('', '_self');
    window.close();

    // Fallback for browsers that block window.close() on non-script-opened tabs.
    setTimeout(() => {
      if (!window.closed) {
        window.location.replace('about:blank');
      }
    }, 100);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextState = e.target.value;
    if (nextState === "__clear__") {
      setFormData((prev) => ({ ...prev, state: "", region: "" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      state: nextState,
      // Clear region when state changes.
      region: prev.state === nextState ? prev.region : "",
    }));
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRegion = e.target.value;
    setFormData((prev) => ({
      ...prev,
      region: nextRegion === "__clear__" ? "" : nextRegion,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? 'Failed to submit survey.');
      }
      setSubmitMessage(`Submitted successfully. Response ID: ${result.responseId}`);
      setCurrentPage('pls');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setSubmitMessage(`Submit failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="bg-[#091a40] h-28 flex items-center px-8 sm:px-16">
        <img
          src="https://q.surveys.unimelb.edu.au/CP/Graphic.php?IM=IM_6PTif2kLNeUE5Bs"
          alt="The University of Melbourne"
          className="h-16"
          /* Note: You will need to add a white logo to your public folder */
        />
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-[6px]">
        <div
          className="bg-[#091a40] h-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="px-4 py-1 text-sm text-gray-600">
        {progressPercent}% Survey Completion
      </div>

      <main
        className={`${currentPage === 'page1' ? "max-w-3xl" : "max-w-4xl"} mx-auto py-12 px-6 sm:px-12`}
      >
        {currentPage === 'page1' ? (
          <form onSubmit={handleSubmit} className="space-y-6">

          <h2 className="text-xl text-gray-800 mb-6">
            <span className="text-black">*</span> Please provide the following information.
          </h2>

          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact given name</label>
              <input
                type="text" name="givenName" value={formData.givenName} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact surname</label>
              <input
                type="text" name="surname" value={formData.surname} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact number</label>
              <input
                type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Farm name</label>
              <input
                type="text" name="farmName" value={formData.farmName} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Farm street address</label>
              <input
                type="text" name="farmStreetAddress" value={formData.farmStreetAddress} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Town/City</label>
              <input
                type="text" name="townCity" value={formData.townCity} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Postcode</label>
              <input
                type="text" name="postcode" value={formData.postcode} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>
          </div>

          <div className="pt-8">
            <h2 className="text-lg text-gray-800 mb-4">
              <span className="text-black">*</span> State and region (If you do not know which region your farm is located in, please search the region based on your nearest town <a href="#" className="underline text-blue-700">here</a>)
            </h2>

            <div className="space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">State</label>
                <select
                  name="state" value={formData.state} onChange={handleStateChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] appearance-none"
                >
                  <option value=""></option>
                  {formData.state ? <option value="__clear__">Clear selection</option> : null}
                  <option value="VIC">Victoria</option>
                  <option value="NSW">New South Wales</option>
                  <option value="QLD">Queensland</option>
                  <option value="WA">Western Australia</option>
                  <option value="SA">South Australia</option>
                  <option value="TAS">Tasmania</option>
                  <option value="ACT">Australian Capital Territory</option>
                  <option value="NT">Northern Territory</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">Region</label>
                <select
                  name="region" value={formData.region} onChange={handleRegionChange}
                  disabled={!formData.state || availableRegions.length === 0}
                  className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] appearance-none"
                >
                  {!formData.state ? (
                    <option value="">Please select state first</option>
                  ) : availableRegions.length === 0 ? (
                    <option value="">No regions configured for this state</option>
                  ) : (
                    <>
                      <option value=""></option>
                      {formData.region ? (
                        <option value="__clear__">Clear selection</option>
                      ) : null}
                      {availableRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Submit/Next Button */}
          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Next page <span className="ml-2 font-bold">&gt;</span>
                </>
              )}
            </button>
          </div>
          {submitMessage ? (
            <p className="text-sm text-gray-700">{submitMessage}</p>
          ) : null}
          </form>
        ) : null}

        {currentPage === 'pls' ? (
          <div className="space-y-6">
            <PlainLanguageStatementContent />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('consent')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </div>
        ) : null}

        {currentPage === 'consent' ? (
          <section className="border border-gray-200 rounded-md p-6 bg-[#f8f9fa] text-sm text-gray-700 space-y-5">
            <h2 className="text-xl font-semibold text-[#091a40]">Consent</h2>
            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Do you consent to participate in this project?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="consent"
                  value="yes"
                  checked={consent === 'yes'}
                  onChange={(e) => setConsent(e.target.value)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="consent"
                  value="no"
                  checked={consent === 'no'}
                  onChange={(e) => setConsent(e.target.value)}
                />
                No
              </label>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('pls')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!consent}
                onClick={handleConsentNextPage}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  consent
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'consentForm' ? (
          <div className="space-y-4">
            <ConsentFormContent onValidityChange={setIsPage4SignatureValid} />
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('consent')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!isPage4SignatureValid}
                onClick={() => setCurrentPage('studyYear')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  isPage4SignatureValid
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </div>
        ) : null}

        {currentPage === 'studyYear' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-xl font-semibold text-[#091a40]">Background information</h2>
            <p className="text-base text-gray-800">
              Please provide the following information. If you have multiple farms, please fill in a
              questionnaire for each farm. (Compulsory question)
            </p>

            <div className="space-y-2">
              <label className="text-base text-gray-800 block">Email</label>
              <input
                type="text"
                value={backgroundEmail}
                onChange={(e) => setBackgroundEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] p-2.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base text-gray-800 block">Postcode</label>
              <input
                type="text"
                value={backgroundPostcode}
                onChange={(e) => setBackgroundPostcode(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] p-2.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base text-gray-800 block">
                Year of survey (Compulsory question)
              </label>
              <select
                value={studyYear}
                onChange={(e) => setStudyYear(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] p-2.5 bg-white focus:outline-none focus:border-[#091a40]"
              >
                <option value=""></option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
                <option value="2033">2033</option>
                <option value="2034">2034</option>
                <option value="2035">2035</option>
                <option value="2036">2036</option>
              </select>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Did you complete this questionnaire in previous years? (Compulsory question)
              </p>
              <p className="text-sm text-gray-700">
                (Paper based benchmarking questionnaire prior to 2025 does not count)
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="completedPreviousYears"
                  value="yes"
                  checked={completedPreviousYears === 'yes'}
                  onChange={(e) => setCompletedPreviousYears(e.target.value)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="completedPreviousYears"
                  value="no"
                  checked={completedPreviousYears === 'no'}
                  onChange={(e) => setCompletedPreviousYears(e.target.value)}
                />
                No
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Which of the following applies to your work in the truffle industry? Choose all that
                apply. (Compulsory question)
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={industryWorkTypes.includes('Nursery producer')}
                  onChange={() => toggleIndustryWorkType('Nursery producer')}
                />
                Nursery producer
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={industryWorkTypes.includes('Pre-production truffle grower (not yet producing)')}
                  onChange={() =>
                    toggleIndustryWorkType('Pre-production truffle grower (not yet producing)')
                  }
                />
                Pre-production truffle grower (not yet producing)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={industryWorkTypes.includes('Truffle grower (currently producing)')}
                  onChange={() => toggleIndustryWorkType('Truffle grower (currently producing)')}
                />
                Truffle grower (currently producing)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={industryWorkTypes.includes('Aggregator/wholesaler')}
                  onChange={() => toggleIndustryWorkType('Aggregator/wholesaler')}
                />
                Aggregator/wholesaler
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={industryWorkTypes.includes('Exporter')}
                  onChange={() => toggleIndustryWorkType('Exporter')}
                />
                Exporter
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('consentForm')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!isStudyYearPageValid}
                onClick={() => setCurrentPage('toc')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  isStudyYearPageValid
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'toc' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Table of contents</h2>

            <div className="space-y-2 text-base">
              <p>Section 1 - General information</p>
              <p>Section 2 - Production management</p>
              <p>Section 3 - Biosecurity management</p>
              <p>Section 4 - Harvest practice and post-harvest handling</p>
              <p>Section 5 - Sales operation</p>
              <p>Section 6 - Economic efficiency</p>
              <p>Section 7 - Energy consumption and sustainability</p>
            </div>

            <div className="space-y-2">
              <p className="text-base font-semibold text-[#091a40]">Important information:</p>
              <p>1. The survey is auto-saved, you can return anytime using the same device/browser.</p>
              <p>2. Incomplete surveys may be submitted.</p>
              <p>3. You may leave answers blank and skip questions.</p>
              <p>4. You may provide estimated values when exact values are not known.</p>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('studyYear')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section1General')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section1General' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 1 - General information</h2>
            <div className="space-y-3">
              <p className="text-base text-gray-800">
                At the same farm location, was the orchard planted in different years? If so, how
                many separate planting times were there?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plantingTimes"
                  value="1"
                  checked={plantingTimes === '1'}
                  onChange={(e) => setPlantingTimes(e.target.value)}
                />
                1
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plantingTimes"
                  value="2"
                  checked={plantingTimes === '2'}
                  onChange={(e) => setPlantingTimes(e.target.value)}
                />
                2
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plantingTimes"
                  value="3"
                  checked={plantingTimes === '3'}
                  onChange={(e) => setPlantingTimes(e.target.value)}
                />
                3
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plantingTimes"
                  value="4"
                  checked={plantingTimes === '4'}
                  onChange={(e) => setPlantingTimes(e.target.value)}
                />
                4
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="plantingTimes"
                  value="5 and above"
                  checked={plantingTimes === '5 and above'}
                  onChange={(e) => setPlantingTimes(e.target.value)}
                />
                5 and above
              </label>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('toc')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!plantingTimes}
                onClick={() => setCurrentPage('section1Soil')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  plantingTimes
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section1Soil' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 1 - General information</h2>
            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Are the different soil types identified in farm mapping (the orchard planted area,
                not the whole farm)?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="soilTypesIdentified"
                  value="yes"
                  checked={soilTypesIdentified === 'yes'}
                  onChange={(e) => setSoilTypesIdentified(e.target.value)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="soilTypesIdentified"
                  value="no"
                  checked={soilTypesIdentified === 'no'}
                  onChange={(e) => setSoilTypesIdentified(e.target.value)}
                />
                No
              </label>
            </div>

            <p className="text-sm text-gray-700">
              Caution: After you click &apos;Next&apos;, you will proceed to the next section and
              will not be able to return to this section. Please double-check before continuing to
              the next section.
            </p>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section1General')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!soilTypesIdentified}
                onClick={() => setCurrentPage('section2Production')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  soilTypesIdentified
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section2Production' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 2 - Production management</h2>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section2Rainfall')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section2Rainfall' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 2 - Production management</h2>
            <div className="space-y-2">
              <label className="text-base text-gray-800 block">
                What was the estimated rainfall at your farm in the last Calendar year? (in mm)
              </label>
              <input
                type="text"
                value={estimatedRainfall}
                onChange={(e) => setEstimatedRainfall(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] p-2.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section2Production')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section2Fertiliser')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section2Fertiliser' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 2 - Production management</h2>
            <div className="space-y-2">
              <p className="text-base text-gray-800">
                What was the total amount (in kilograms or litres) of fertiliser used on the whole
                farm in the last calendar year? (Leave blank if none used)
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">
                I use solid fertiliser (including dissolving it to make your own liquid fertiliser)
                (kilograms)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={solidFertiliserKg}
                onChange={(e) => setSolidFertiliserKg(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">
                I use ready-to-use liquid fertiliser (litres)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={readyLiquidFertiliserLitres}
                onChange={(e) => setReadyLiquidFertiliserLitres(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">
                I use liquid fertiliser concentrate, which I dilute before use (litres)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={concentrateFertiliserLitres}
                onChange={(e) => setConcentrateFertiliserLitres(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Did you monitor the amount of fertiliser you used in each category during the past
                calendar year?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fertiliserMonitoring"
                  value="yes"
                  checked={fertiliserMonitoring === 'yes'}
                  onChange={(e) => setFertiliserMonitoring(e.target.value)}
                />
                Yes, please estimate the amount you used in each category in the next question
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fertiliserMonitoring"
                  value="no"
                  checked={fertiliserMonitoring === 'no'}
                  onChange={(e) => setFertiliserMonitoring(e.target.value)}
                />
                No, I do not monitor the amount of chemicals I used in each category
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section2Rainfall')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!fertiliserMonitoring}
                onClick={() => setCurrentPage('section2FertiliserFollowup')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  fertiliserMonitoring
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section2FertiliserFollowup' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">
              Section 2 - Production management (Follow-up)
            </h2>

            {fertiliserMonitoring === 'yes' ? (
              <>
                <p className="text-base text-gray-800">
                  How many kilograms or litres of each type of fertiliser did you use for the whole
                  farm in the last calendar year? (leave zero if none used, please estimate the
                  numbers)
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-2 text-left font-semibold w-[30ch]">
                          Type
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold max-w-[24ch] whitespace-normal break-words">
                          {FERTILISER_MATRIX_COLUMNS[0]}
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold max-w-[24ch] whitespace-normal break-words">
                          {FERTILISER_MATRIX_COLUMNS[1]}
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold max-w-[24ch] whitespace-normal break-words">
                          {FERTILISER_MATRIX_COLUMNS[2]}
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold max-w-[24ch] whitespace-normal break-words">
                          {FERTILISER_MATRIX_COLUMNS[3]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {FERTILISER_MATRIX_ROWS.map((row) => (
                        <tr key={row}>
                          <td className="border border-gray-200 p-2 align-top">{row}</td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={fertiliserMatrixValues[row]?.solid ?? ''}
                              onChange={(e) =>
                                handleFertiliserMatrixChange(row, 'solid', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={fertiliserMatrixValues[row]?.ready ?? ''}
                              onChange={(e) =>
                                handleFertiliserMatrixChange(row, 'ready', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={fertiliserMatrixValues[row]?.concentrate ?? ''}
                              onChange={(e) =>
                                handleFertiliserMatrixChange(row, 'concentrate', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={fertiliserMatrixValues[row]?.applyTimes ?? ''}
                              onChange={(e) =>
                                handleFertiliserMatrixChange(row, 'applyTimes', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Have you conducted any of the following types of soil tests in the past 5 years
                (since January 2021)?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2021.includes('pH and soil mineralogy')}
                  onChange={() =>
                    toggleMultiSelect('pH and soil mineralogy', setSoilTestsSince2021)
                  }
                />
                pH and soil mineralogy
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2021.includes('Chemical residuals')}
                  onChange={() => toggleMultiSelect('Chemical residuals', setSoilTestsSince2021)}
                />
                Chemical residuals
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2021.includes('Heavy metal')}
                  onChange={() => toggleMultiSelect('Heavy metal', setSoilTestsSince2021)}
                />
                Heavy metal
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2021.includes('Microbiome')}
                  onChange={() => toggleMultiSelect('Microbiome', setSoilTestsSince2021)}
                />
                Microbiome
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Have you conducted any of the following types of soil tests since Jan 2024?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2024.includes('pH and soil mineralogy')}
                  onChange={() =>
                    toggleMultiSelect('pH and soil mineralogy', setSoilTestsSince2024)
                  }
                />
                pH and soil mineralogy
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2024.includes('Chemical residuals')}
                  onChange={() => toggleMultiSelect('Chemical residuals', setSoilTestsSince2024)}
                />
                Chemical residuals
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2024.includes('Heavy metal')}
                  onChange={() => toggleMultiSelect('Heavy metal', setSoilTestsSince2024)}
                />
                Heavy metal
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={soilTestsSince2024.includes('Microbiome')}
                  onChange={() => toggleMultiSelect('Microbiome', setSoilTestsSince2024)}
                />
                Microbiome
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Have you done tree foliage sap testing and/or leaf/petiole chemical analysis since
                Jan 2024?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sapOrLeafTestingSince2024"
                  value="yes"
                  checked={sapOrLeafTestingSince2024 === 'yes'}
                  onChange={(e) => setSapOrLeafTestingSince2024(e.target.value)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sapOrLeafTestingSince2024"
                  value="no"
                  checked={sapOrLeafTestingSince2024 === 'no'}
                  onChange={(e) => setSapOrLeafTestingSince2024(e.target.value)}
                />
                No
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Do you have a structured farm plan for management purposes? Choose multiple answers
                if appropriate.
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={structuredFarmPlanAnswers.includes('No')}
                  onChange={() => toggleMultiSelect('No', setStructuredFarmPlanAnswers)}
                />
                No
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={structuredFarmPlanAnswers.includes('Yes - all trees are numbered')}
                  onChange={() =>
                    toggleMultiSelect('Yes - all trees are numbered', setStructuredFarmPlanAnswers)
                  }
                />
                Yes - all trees are numbered
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={structuredFarmPlanAnswers.includes('Yes - all rows are numbered')}
                  onChange={() =>
                    toggleMultiSelect('Yes - all rows are numbered', setStructuredFarmPlanAnswers)
                  }
                />
                Yes - all rows are numbered
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={structuredFarmPlanAnswers.includes('Only partially numbered')}
                  onChange={() =>
                    toggleMultiSelect('Only partially numbered', setStructuredFarmPlanAnswers)
                  }
                />
                Only partially numbered
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section2Fertiliser')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section3Biosecurity')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section3Biosecurity' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 3 - Biosecurity management</h2>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                What are the three most important biological issues affecting your farm(s) in the
                past calendar year? Choose the most important three.
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes(
                    'Health of the host trees (including nutrient issues, pests and diseases)',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Health of the host trees (including nutrient issues, pests and diseases)',
                      setBioIssuesTopThree,
                    )
                  }
                />
                Health of the host trees (including nutrient issues, pests and diseases)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes(
                    'Truffle invertebrate pests (including slugs, larvae/worms, fungus gnats, millipedes, slaters, slugs, springtails)',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Truffle invertebrate pests (including slugs, larvae/worms, fungus gnats, millipedes, slaters, slugs, springtails)',
                      setBioIssuesTopThree,
                    )
                  }
                />
                Truffle invertebrate pests (including slugs, larvae/worms, fungus gnats,
                millipedes, slaters, slugs, springtails)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes(
                    'Vertebrates (for example possums, rabbits, wallabies)',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Vertebrates (for example possums, rabbits, wallabies)',
                      setBioIssuesTopThree,
                    )
                  }
                />
                Vertebrates (for example possums, rabbits, wallabies)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes('Truffle rot')}
                  onChange={() => toggleMultiSelect('Truffle rot', setBioIssuesTopThree)}
                />
                Truffle rot
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes('Post-harvest truffle spoilage')}
                  onChange={() =>
                    toggleMultiSelect('Post-harvest truffle spoilage', setBioIssuesTopThree)
                  }
                />
                Post-harvest truffle spoilage
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes(
                    'Contamination with other ectomycorrhizae (Other fungi)',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Contamination with other ectomycorrhizae (Other fungi)',
                      setBioIssuesTopThree,
                    )
                  }
                />
                Contamination with other ectomycorrhizae (Other fungi)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes(
                    'Nursery stock provenance and incoming plant health',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Nursery stock provenance and incoming plant health',
                      setBioIssuesTopThree,
                    )
                  }
                />
                Nursery stock provenance and incoming plant health
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bioIssuesTopThree.includes('Others')}
                  onChange={() => toggleMultiSelect('Others', setBioIssuesTopThree)}
                />
                Others
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                How do you manage the competing fungi in your farm? Choose all that apply.
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={competingFungiManagement.includes('I do not manage competing fungi')}
                  onChange={() =>
                    toggleMultiSelect('I do not manage competing fungi', setCompetingFungiManagement)
                  }
                />
                I do not manage competing fungi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={competingFungiManagement.includes(
                    'Isolate and quarantine sections of the farm',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'Isolate and quarantine sections of the farm',
                      setCompetingFungiManagement,
                    )
                  }
                />
                Isolate and quarantine sections of the farm
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={competingFungiManagement.includes('Physical removal')}
                  onChange={() =>
                    toggleMultiSelect('Physical removal', setCompetingFungiManagement)
                  }
                />
                Physical removal
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={competingFungiManagement.includes('Regulating soil pH')}
                  onChange={() => toggleMultiSelect('Regulating soil pH', setCompetingFungiManagement)}
                />
                Regulating soil pH
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={competingFungiManagement.includes('Others')}
                  onChange={() => toggleMultiSelect('Others', setCompetingFungiManagement)}
                />
                Others
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-base text-gray-800">
                What is the total amount of chemicals (excluding fertiliser, including insecticides,
                herbicides, rodenticides, acaricides, repellents, biological controls, etc.) used on
                your farm in the last calendar year? (in kilograms or litres)
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">
                Solid chemicals (including dissolving it to make your own liquid fertiliser)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={solidChemicalsAmount}
                onChange={(e) => setSolidChemicalsAmount(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">Ready-to-use liquid chemicals</label>
              <input
                type="number"
                min="0"
                step="any"
                value={readyLiquidChemicalsAmount}
                onChange={(e) => setReadyLiquidChemicalsAmount(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-gray-800">
                Liquid chemical concentrate, which I dilute before use
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={concentratedChemicalsAmount}
                onChange={(e) => setConcentratedChemicalsAmount(e.target.value)}
                className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Did you monitor the amount of chemicals you used in each category during the past
                calendar year? (excluding fertiliser, including insecticides, herbicides,
                rodenticides, acaricides, repellents, biological controls, etc.)
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="chemicalMonitoring"
                  value="yes"
                  checked={chemicalMonitoring === 'yes'}
                  onChange={(e) => setChemicalMonitoring(e.target.value)}
                />
                Yes, please estimate the amount you used in each category in the next question
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="chemicalMonitoring"
                  value="no"
                  checked={chemicalMonitoring === 'no'}
                  onChange={(e) => setChemicalMonitoring(e.target.value)}
                />
                No, I did not monitor the amount of chemicals I used in each category
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section2FertiliserFollowup')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                disabled={!chemicalMonitoring}
                onClick={() => setCurrentPage('section3ChemicalFollowup')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center font-medium ${
                  chemicalMonitoring
                    ? 'bg-[#091a40] text-white hover:bg-[#071433]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section3ChemicalFollowup' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">Section 3 - Biosecurity management</h2>

            {chemicalMonitoring === 'yes' ? (
              <>
                <p className="text-base text-gray-800">
                  What chemicals did you use on farm in the past calendar year? (in kilograms or
                  litres)
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-2 text-left font-semibold w-[26ch] max-w-[26ch] whitespace-normal break-words">
                          Type
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold w-[24ch] max-w-[24ch] whitespace-normal break-words">
                          {SECTION3_CHEMICAL_MATRIX_COLUMNS[0]}
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold w-[24ch] max-w-[24ch] whitespace-normal break-words">
                          {SECTION3_CHEMICAL_MATRIX_COLUMNS[1]}
                        </th>
                        <th className="border border-gray-200 p-2 text-left font-semibold w-[24ch] max-w-[24ch] whitespace-normal break-words">
                          {SECTION3_CHEMICAL_MATRIX_COLUMNS[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SECTION3_CHEMICAL_MATRIX_ROWS.map((row) => (
                        <tr key={row}>
                          <td className="border border-gray-200 p-2 align-top w-[26ch] max-w-[26ch] whitespace-normal break-words">
                            {row}
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={section3ChemicalMatrixValues[row]?.solid ?? ''}
                              onChange={(e) =>
                                handleSection3ChemicalMatrixChange(row, 'solid', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={section3ChemicalMatrixValues[row]?.ready ?? ''}
                              onChange={(e) =>
                                handleSection3ChemicalMatrixChange(row, 'ready', e.target.value)
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                          <td className="border border-gray-200 p-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={section3ChemicalMatrixValues[row]?.concentrate ?? ''}
                              onChange={(e) =>
                                handleSection3ChemicalMatrixChange(
                                  row,
                                  'concentrate',
                                  e.target.value,
                                )
                              }
                              className="w-[10ch] border border-gray-300 rounded-[4px] px-2 py-1.5 bg-white focus:outline-none focus:border-[#091a40]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}

            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Do you use poultry (such as ducks) on your farm to control invertebrate pests?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="usesPoultryForPestControl"
                  value="yes"
                  checked={usesPoultryForPestControl === 'yes'}
                  onChange={(e) => setUsesPoultryForPestControl(e.target.value)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="usesPoultryForPestControl"
                  value="no"
                  checked={usesPoultryForPestControl === 'no'}
                  onChange={(e) => setUsesPoultryForPestControl(e.target.value)}
                />
                No
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section3Biosecurity')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section5Intro')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section5Intro' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">
              Section 5 - Sales operation and economic efficiency
            </h2>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section3ChemicalFollowup')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section5Traceability')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section5Traceability' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">
              Section 5 - Sales operation and economic efficiency
            </h2>
            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Does your business use a system to trace truffles from harvest to final buyer?
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="traceabilitySystem"
                  value="No traceability system"
                  checked={traceabilitySystem === 'No traceability system'}
                  onChange={(e) => setTraceabilitySystem(e.target.value)}
                />
                No traceability system
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="traceabilitySystem"
                  value="Yes - informal (e.g. personal records, memory-based, basic notes)"
                  checked={
                    traceabilitySystem ===
                    'Yes - informal (e.g. personal records, memory-based, basic notes)'
                  }
                  onChange={(e) => setTraceabilitySystem(e.target.value)}
                />
                Yes - informal (e.g. personal records, memory-based, basic notes)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="traceabilitySystem"
                  value="Yes - basic written or spreadsheet records"
                  checked={traceabilitySystem === 'Yes - basic written or spreadsheet records'}
                  onChange={(e) => setTraceabilitySystem(e.target.value)}
                />
                Yes - basic written or spreadsheet records
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="traceabilitySystem"
                  value="Yes - digital system (farm software, QR code, batch ID, or equivalent)"
                  checked={
                    traceabilitySystem ===
                    'Yes - digital system (farm software, QR code, batch ID, or equivalent)'
                  }
                  onChange={(e) => setTraceabilitySystem(e.target.value)}
                />
                Yes - digital system (farm software, QR code, batch ID, or equivalent)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="traceabilitySystem"
                  value="Yes - certified or audited traceability system (e.g. organic certification, GI/PDO, blockchain-based, or third-party audited)"
                  checked={
                    traceabilitySystem ===
                    'Yes - certified or audited traceability system (e.g. organic certification, GI/PDO, blockchain-based, or third-party audited)'
                  }
                  onChange={(e) => setTraceabilitySystem(e.target.value)}
                />
                Yes - certified or audited traceability system (e.g. organic certification, GI/PDO,
                blockchain-based, or third-party audited)
              </label>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section5Intro')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('section5FutureProducts')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'section5FutureProducts' ? (
          <section className="p-6 bg-white text-sm text-gray-700 space-y-6">
            <h2 className="text-2xl font-semibold text-[#091a40]">
              Section 5 - Sales operation and economic efficiency
            </h2>
            <div className="space-y-3">
              <p className="text-base text-gray-800">
                Do you plan to produce any of the following products within in the next 5 years?
                Choose all that apply.
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Fresh Truffles')}
                  onChange={() => toggleMultiSelect('Fresh Truffles', setPlannedProductsIn5Years)}
                />
                Fresh Truffles
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Truffle Salt')}
                  onChange={() => toggleMultiSelect('Truffle Salt', setPlannedProductsIn5Years)}
                />
                Truffle Salt
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Truffle Honey')}
                  onChange={() => toggleMultiSelect('Truffle Honey', setPlannedProductsIn5Years)}
                />
                Truffle Honey
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Truffle Butter')}
                  onChange={() => toggleMultiSelect('Truffle Butter', setPlannedProductsIn5Years)}
                />
                Truffle Butter
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Truffle Paste')}
                  onChange={() => toggleMultiSelect('Truffle Paste', setPlannedProductsIn5Years)}
                />
                Truffle Paste
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Frozen Truffles')}
                  onChange={() => toggleMultiSelect('Frozen Truffles', setPlannedProductsIn5Years)}
                />
                Frozen Truffles
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes('Freeze-dried Truffle powder')}
                  onChange={() =>
                    toggleMultiSelect('Freeze-dried Truffle powder', setPlannedProductsIn5Years)
                  }
                />
                Freeze-dried Truffle powder
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plannedProductsIn5Years.includes(
                    'New truffle flavour product from this research program',
                  )}
                  onChange={() =>
                    toggleMultiSelect(
                      'New truffle flavour product from this research program',
                      setPlannedProductsIn5Years,
                    )
                  }
                />
                New truffle flavour product from this research program
              </label>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('section5Traceability')}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Previous page
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('final')}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
              >
                Next page <span className="ml-2 font-bold">&gt;</span>
              </button>
            </div>
          </section>
        ) : null}

        {currentPage === 'final' ? (
          <section className="border border-gray-200 rounded-md p-6 bg-[#f8f9fa] text-sm text-gray-700 space-y-4">
            <h2 className="text-xl font-semibold text-[#091a40]">Thank You</h2>
            <p>
              Thank you for take time to participate in this survey, you can close the window now.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleCloseWindow}
                className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors font-medium"
              >
                Close window
              </button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}