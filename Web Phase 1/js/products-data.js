/**
 * NEW GOLDEN ENTERPRISES — PRODUCT CATALOG & SPECIFICATIONS DATABASE
 * Single source of truth for all 8 window and door architectural systems.
 */

export const PRODUCTS_DATA = [
  {
    id: 'bathroom-ventilators',
    categoryNumber: '01',
    categoryName: 'Bathroom Ventilators',
    title: 'Precision Louvered Ventilation Systems',
    shortDesc: 'Moisture-resistant architectural ventilators engineered with angled glass louvers and top-hung exhaust light for continuous air circulation.',
    longDesc: 'Engineered specifically for high-humidity environments, our Series 60 Bathroom Ventilator combines dual-action performance: an upper awning exhaust vent with frosted privacy glass and a lower bay of precision-angled adjustable glass louvers. Built with high-grade EPDM weather gaskets, corrosion-resistant pivots, and integrated stainless steel insect mesh.',
    image: 'assets/images/products/bathroom-ventilators.jpeg',
    tag: 'Moisture Sealed',
    modelMapping: 'bathroom-ventilators',
    seriesTag: 'SERIES 60 • LOUVER VENTILATION',
    heroHeadline: 'CONTROLLED MOISTURE. CONTINUOUS FRESH AIRFLOW.',
    specs: {
      'Profile Depth': '60mm Multi-Chamber uPVC / Aluminium',
      'Glazing Type': 'Frosted Privacy / Fluted Obscure Glass',
      'Water Tightness': 'Class 9A (600 Pa)',
      'Air Permeability': 'Class 4 (BS EN 12207)',
      'Acoustic Attenuation': 'Rw 34 dB',
      'Louver Blades': '6mm Toughened Frosted Glass with Aluminium Pivots',
      'Insect Protection': 'Concealed 304 Grade Stainless Steel Fine Mesh',
      'Ideal Applications': 'Luxury En-Suites, Powder Rooms, Wellness Spas, Kitchenettes'
    },
    features: [
      'Dual-action ventilation: adjustable glass louvers with top-hung awning sash',
      'Continuous moisture removal preventing dampness, mold, and odor accumulation',
      'High-grade EPDM perimeter gaskets prevent external rain and wind drafts',
      'Corrosion-resistant marine-grade aluminium pivot mechanism',
      'Privacy-enhancing obscure glass keeps interiors private while passing soft daylight',
      'Optional motorized actuator integration for automated climate automation'
    ],
    priceEstimate: '₹750 – ₹1,250 / sq.ft',
    sashActionLabel: 'Adjust Louvers & Top Sash'
  },
  {
    id: 'sliding-windows',
    categoryNumber: '02',
    categoryName: 'Sliding Windows & Doors',
    title: 'Panoramic Multi-Track Sliding Systems',
    shortDesc: 'Expansive glass facades featuring ultra-smooth stainless steel rollers, concealed multi-tracks, and flush floor transitions for unobstructed indoor-outdoor living.',
    longDesc: 'The Series 120 Multi-Track Sliding System delivers breathtaking panoramic clarity with minimal structural interruption. Featuring whisper-quiet precision stainless steel roller bearings, heavy-duty tandem carriages supporting up to 300 kg per panel, and a zero-step flush floor threshold for seamless transitions between living spaces and outdoor terraces.',
    image: 'assets/images/products/sliding-windows.jpeg',
    tag: 'Panoramic Vista',
    modelMapping: 'sliding-windows',
    seriesTag: 'SERIES 120 • MULTI-TRACK SLIDING',
    heroHeadline: 'PANORAMIC HORIZONS. ZERO-STEP TRANSITIONS.',
    specs: {
      'Profile Depth': '120mm Dual / Triple Track Aluminium',
      'Glazing Capacity': 'Double / Triple Glazed up to 38mm IGU',
      'Thermal Performance': 'Uw down to 1.10 W/m²K',
      'Acoustic Rating': 'Rw up to 41 dB',
      'Max Panel Weight': '300 kg per operable leaf',
      'Water Tightness': 'Class E900 (900 Pa)',
      'Threshold Detail': 'Flush Zero-Step Architectural Transition',
      'Ideal Applications': 'Patio Entrances, Penthouse Balconies, Poolside Pavilions'
    },
    features: [
      'Heavy-duty tandem stainless steel ball-bearing rollers for feather-light glide',
      'Multi-point perimeter hook locking system providing exceptional security',
      'Barrier-free flush threshold designed for architectural indoor-outdoor continuity',
      'Integrated sliding micro-mesh flyscreen track with concealed brush seals',
      'Thermal break polyamide bar eliminates condensation and heat transfer',
      'Expansive clear spans accommodating panels up to 3 meters in height'
    ],
    priceEstimate: '₹950 – ₹1,750 / sq.ft',
    sashActionLabel: 'Slide Sash Open (1.2m)'
  },
  {
    id: 'fixed-windows',
    categoryNumber: '03',
    categoryName: 'Fixed Windows',
    title: 'Minimalist Architectural Picture Windows',
    shortDesc: 'Designed to maximize natural light and framing landscape vistas. Ultra-slim sightlines with hermetic seals, optimized for climate-controlled spaces.',
    longDesc: 'The Series 70 Fixed Picture Window is designed to disappear into modern architecture. With an ultra-narrow 35mm structural face width, it maximizes daylight influx and frames exterior vistas like high-definition artwork. Hermetically sealed with perimeter EPDM gaskets and structural silicone joints, it offers superior thermal retention for air-conditioned and heated residences.',
    image: 'assets/images/products/fixed-windows.jpeg',
    tag: 'Maximum Light',
    modelMapping: 'fixed-windows',
    seriesTag: 'SERIES 70 • SLIMLINE PICTURE GLASS',
    heroHeadline: 'FRAMING NATURAL LIGHT. UNCOMPROMISING CLARITY.',
    specs: {
      'Profile Depth': '70mm – 85mm Thermally Broken Frame',
      'Sightline Width': 'Ultra-Slim 35mm Structural Face Width',
      'Thermal Performance': 'Uw down to 0.82 W/m²K (Passivhaus Ready)',
      'Acoustic Rating': 'Rw up to 44 dB',
      'Air Infiltration': '0.00 m³/h (Class 4 Hermetic Seal)',
      'Water Tightness': 'Class E1200 (1200 Pa)',
      'Maximum Span': 'Continuous spans up to 6 meters with structural silicone',
      'Ideal Applications': 'Double-Height Living Rooms, Gallery Corridors, Cantilevered Vistas'
    },
    features: [
      'Engineered for maximum natural daylight transmission and panoramic views',
      'Zero moving components ensuring 100% airtight and watertight lifetime integrity',
      'Concealed perimeter pressure-equalized drainage system',
      'Capable of carrying heavy high-performance acoustic and bullet-resistant laminated glass',
      'Ultra-minimalist frame creates a clean contemporary frameless aesthetic',
      'High thermal resistance drastically cuts HVAC heating and cooling expenses'
    ],
    priceEstimate: '₹650 – ₹1,150 / sq.ft',
    sashActionLabel: 'Hermetic Seal Active'
  },
  {
    id: 'french-windows',
    categoryNumber: '04',
    categoryName: 'French Windows & Doors',
    title: 'Classical & Contemporary French Casements',
    shortDesc: 'Timeless dual-swing openable casements featuring optional sunburst arched transoms, Georgian grid muntins, and luxury architectural lever hardware.',
    longDesc: 'Combining heritage elegance with modern precision engineering, our French Window systems feature double-leaf side-hung sashes with a flying mullion that leaves a 100% unobstructed opening when swung outward. Available with bespoke semicircular arched transoms, authentic divided lite muntin grids, and solid brass cremone locking bolts.',
    image: 'assets/images/products/french-windows.jpeg',
    tag: 'Classical Elegance',
    modelMapping: 'french-windows',
    seriesTag: 'SERIES 80 • FRENCH CASEMENT & ARCH',
    heroHeadline: 'HERITAGE ARCHITECTURE. CONTEMPORARY ENGINEERING.',
    specs: {
      'Profile Depth': '75mm – 85mm Precision Chamfered Frame',
      'Transom Style': 'Semicircular Arched Fanlight with Sunburst Muntins',
      'Hardware': 'Architectural Cremone Surface Bolts & Multipoint Latches',
      'Glazing': 'Double Glazed Insulated Unit with Internal Georgian Bars',
      'Acoustic Attenuation': 'Rw up to 41 dB',
      'Security Rating': 'PAS 24 / RC2 Certified Multipoint Hardware',
      'Clear Opening': '100% Clear Span with Flying Central Mullion',
      'Ideal Applications': 'Heritage Estates, Formal Dining Rooms, Courtyard Balconies, Master Suites'
    },
    features: [
      'Double openable leaves with flying mullion for a completely open unobstructed vista',
      'Bespoke arched head and radius bending capabilities to suit architectural openings',
      'Heavy-duty 3D adjustable concealed or architectural butt hinges',
      'Multipoint shootbolts driven by classic satin champagne gold Cremone levers',
      'Authentic divided lite aesthetic without compromising thermal insulation',
      'Triple perimeter compression seals prevent wind whistling and rain infiltration'
    ],
    priceEstimate: '₹1,100 – ₹1,950 / sq.ft',
    sashActionLabel: 'Open French Doors (65°)'
  },
  {
    id: 'casement-windows',
    categoryNumber: '05',
    categoryName: 'Casement Openable Windows',
    title: 'Side-Hung Outward & Inward Openable Casements',
    shortDesc: 'Engineered for exceptional breeze capture and perimeter sealing. Multi-point compression locking eliminates drafts and withstands severe coastal windloads.',
    longDesc: 'Our Series 85 Casement Windows are the benchmark of architectural fenestration. Built with a dual-bay layout containing a fixed picture section and a side-hung operable sash, the system uses multi-chamber thermal profiles and heavy-duty friction stays that hold position securely in high winds while channeling refreshing fresh air into the living environment.',
    image: 'assets/images/products/casement-windows.jpeg',
    tag: 'Acoustic Barrier',
    modelMapping: 'casement-windows',
    seriesTag: 'SERIES 85 • CASEMENT & FIXED',
    heroHeadline: 'ACOUSTIC CALM. UNCOMPROMISING STRUCTURAL INTEGRITY.',
    specs: {
      'Profile Depth': '85mm Multi-Chamber Architectural Profile',
      'Glazing Capacity': 'Double / Triple Glazed up to 36mm IGU',
      'Thermal Performance': 'Uw 0.94 W/m²K',
      'Acoustic Rating': 'Rw up to 43 dB (Hospital Grade Attenuation)',
      'Wind Resistance': 'Class C5 / B5 (2000 Pa Storm Resistance)',
      'Water Tightness': 'Class 9A (600 Pa Continuous Driving Rain)',
      'Opening Angle': 'Up to 90° for Easy Egress and Exterior Cleaning',
      'Ideal Applications': 'Modern Villas, Coastal Homes, High-Noise Urban Residences'
    },
    features: [
      'Heavy-duty stainless steel friction stays allow effortless operation and wind hold',
      'Continuous double and triple perimeter compression gaskets eliminate ambient noise',
      'Mushroom-cam multipoint locking system driven by single luxury architectural lever',
      'Concealed perimeter drainage channels direct moisture away from structural walls',
      'Available in powder-coated architectural metallics or warm walnut woodgrain',
      'High structural rigidity tested against cyclonic coastal wind pressures'
    ],
    priceEstimate: '₹850 – ₹1,550 / sq.ft',
    sashActionLabel: 'Open Casement (55°)'
  },
  {
    id: 'awning-top-hung',
    categoryNumber: '06',
    categoryName: 'Awning / Top-Hung Windows',
    title: 'Weather-Protected Top-Hung Awning Systems',
    shortDesc: 'Top-hinged sash swings outward from the bottom, creating a natural rain barrier that enables continuous, refreshing ventilation even during monsoon showers.',
    longDesc: 'The Series 75 Awning Window provides smart all-weather ventilation. Hinged securely at the top head, the bottom rail pushes outward, creating a protective canopy that repels driving rain while exhausting warm stale air. Equipped with scissor winders or stainless steel four-bar friction stays, this system is ideal for high-wall placements and tropical rainfall climates.',
    image: 'assets/images/products/awning-top-hung-windows.jpeg',
    tag: 'Rain Protection',
    modelMapping: 'awning-top-hung',
    seriesTag: 'SERIES 75 • TOP-HUNG AWNING',
    heroHeadline: 'CONTINUOUS VENTILATION. COMPLETE WEATHER PROTECTION.',
    specs: {
      'Profile Depth': '75mm Architectural Extrusion',
      'Glazing Type': 'Toughened Solar Control Double Glazing',
      'Water Tightness': 'Class 9A (Continuous Zero Ingress in Storms)',
      'Thermal Performance': 'Uw 1.05 W/m²K',
      'Acoustic Attenuation': 'Rw up to 38 dB',
      'Actuation Hardware': 'Manual Concealed Chain Winder or 4-Bar Friction Stays',
      'Max Opening Angle': '40° Outward Cantilever',
      'Ideal Applications': 'Upper Clerestory Facades, Bathrooms, Kitchen Areas, High-Rainfall Zones'
    },
    features: [
      'Natural rain barrier allows windows to remain open for ventilation during downpours',
      'High-level placement promotes natural stack effect ventilation for whole-home cooling',
      'Heavy-duty stainless steel four-bar hinges prevent sash sagging or binding',
      'Perimeter night-latch position allows secure ventilation while residents are asleep',
      'Can be paired above or below large fixed picture window assemblies',
      'Compatible with smart automated rain sensors that close windows automatically'
    ],
    priceEstimate: '₹800 – ₹1,450 / sq.ft',
    sashActionLabel: 'Swing Awning Out (40°)'
  },
  {
    id: 'tilt-and-turn',
    categoryNumber: '07',
    categoryName: 'Tilt-and-Turn Windows',
    title: 'Dual-Action German Tilt & Turn Systems',
    shortDesc: 'The pinnacle of European architectural versatility. Tilt inwards from the top for draft-free secure ventilation, or turn inwards 90° for effortless cleaning.',
    longDesc: 'Our Series 88 European Tilt & Turn system represents the zenith of fenestration engineering. Controlled by a single luxury architectural handle, a 90-degree turn swings the sash inward like a casement door for safe cleaning inside the room, while a 180-degree rotation tilts the top inward by 15 degrees for gentle, secure, draft-free ventilation.',
    image: 'assets/images/products/tilt-and-turn-windows.jpeg',
    tag: 'German Hardware',
    modelMapping: 'tilt-and-turn',
    seriesTag: 'SERIES 88 • DUAL-ACTION TILT & TURN',
    heroHeadline: 'GERMAN INGENUITY. DUAL-MODE FUNCTIONALITY.',
    specs: {
      'Profile Depth': '88mm 6-Chamber Thermally Broken Core',
      'Glazing Capacity': 'Triple Glazed Argon / Krypton up to 48mm',
      'Thermal Performance': 'Uw down to 0.78 W/m²K (Certified Passivhaus Standard)',
      'Acoustic Attenuation': 'Rw up to 45 dB (Near Silence)',
      'Air Permeability': 'Class 4 (Zero Air Infiltration at High Pressure)',
      'Security Certification': 'RC2 / PAS 24 Perimeter Mushroom Cam Security',
      'Modes of Operation': 'Inward Turn (90°) & Inward Top Tilt (15°)',
      'Ideal Applications': 'Luxury High-Rise Condos, Cold/Hot Extreme Climates, Acoustic Suites'
    },
    features: [
      'Single handle operation: effortless 2-in-1 dual ventilation and easy-clean modes',
      'Inward opening design allows effortless cleaning of exterior glass from inside the room',
      'Triple continuous EPDM gasket barrier delivers unmatched acoustic silence',
      'Integrated sash-mishandling device prevents accidental lever jams',
      'Child-safe tilt-first restrictor hardware option for high-rise family dwellings',
      'Passivhaus thermal metrics significantly cut building lifecycle energy costs'
    ],
    priceEstimate: '₹1,250 – ₹2,200 / sq.ft',
    sashActionLabel: 'Tilt / Turn Window'
  },
  {
    id: 'architectural-systems',
    categoryNumber: '08',
    categoryName: 'Architectural Window Systems',
    title: 'Bespoke Bow, Bay & Bi-Fold Folding Glass',
    shortDesc: 'Custom-engineered structural glass assemblies including faceted bow windows, bi-fold concertina door systems, and bespoke corner-to-corner glass connections.',
    longDesc: 'For landmark architectural statements, the Series 150 Architectural System offers custom structural glazing: multi-leaf bi-fold concertina glass doors that glide on heavy-duty stainless steel carriers to provide a 95% clear wall opening, custom faceted bow and bay windows that project into outdoor gardens, and 90-degree frameless glass-to-glass structural corners.',
    image: 'assets/images/products/bifold-doors.jpeg',
    tag: 'Bespoke Engineering',
    modelMapping: 'architectural-systems',
    seriesTag: 'SERIES 150 • BI-FOLD & STRUCTURAL GLASS',
    heroHeadline: 'LIMITLESS SPANS. TAILORED ARCHITECTURAL EXPRESSION.',
    specs: {
      'Profile Depth': '90mm – 150mm Custom Structural Profiles',
      'Panel Configurations': '2-Panel up to 10-Panel Bi-Fold / Faceted Corner Bays',
      'Span Capability': 'Open clear architectural spans up to 14 meters wide',
      'Panel Height': 'Up to 3.5 meters in height per individual leaf',
      'Corner Glazing': '90° and Variable-Angle Frameless Structural Glass Joints',
      'Hardware Mechanism': 'Heavy-Duty Top-Hung Stainless Steel Rolling Carriages',
      'Thermal Rating': 'Uw 1.15 W/m²K with Thermally Decoupled Profiles',
      'Ideal Applications': 'Grand Living Pavilions, Garden Rooms, Pool Houses, Penthouse Terraces'
    },
    features: [
      'Concertina folding bi-fold panels fold neatly away to reveal 95% unobstructed open space',
      'Bespoke faceted bay and bow couplers designed to create panoramic interior reading nooks',
      'Heavy-duty floor guides and top-hung rollers support up to 150 kg per individual folding leaf',
      'Multi-point master door locking enables daily pass-door access without folding all panels',
      'Custom color-matching to any international RAL architectural finish specification',
      'Engineered to resist hurricane-force wind loads and seismic structural movements'
    ],
    priceEstimate: '₹1,400 – ₹2,600 / sq.ft',
    sashActionLabel: 'Fold Bi-Fold Doors'
  }
];

export const FINISHES_DATA = {
  'matte-white': {
    name: 'Matte White (RAL 9016)',
    color: '#F3F3F1',
    code: 'RAL 9016',
    desc: 'Pure crisp architectural white with a durable matte powder coat finish.'
  },
  'anthracite': {
    name: 'Anthracite Grey (RAL 7016)',
    color: '#2E3338',
    code: 'RAL 7016',
    desc: 'Deep modern architectural charcoal favoured by contemporary designers.'
  },
  'black': {
    name: 'Obsidian Black Anodized',
    color: '#161616',
    code: 'RAL 9005',
    desc: 'Striking satin black finish creating bold, graphic window outlines.'
  },
  'aluminium': {
    name: 'Natural Brushed Aluminium',
    color: '#C8CDD3',
    code: 'Anodized 25µ',
    desc: 'Metallic industrial elegance highlighting precision extruded aluminium lines.'
  },
  'wood': {
    name: 'Architectural Warm Walnut',
    color: '#5C3B23',
    code: 'Timber Foil',
    desc: 'Natural warmth and tactile timber grain with zero maintenance requirements.'
  },
  'gold': {
    name: 'Satin Champagne Gold',
    color: '#B99A5B',
    code: 'Bespoke Satin',
    desc: 'Signature luxury champagne accent finish embodying timeless architectural distinction.'
  }
};

export const GLASS_DATA = {
  'clear': {
    name: 'Ultra-Clear Insulated Double Glazing',
    desc: '92% natural light transmission with dual airtight acoustic chambers.'
  },
  'acoustic-lowe': {
    name: 'Acoustic Low-E Thermal Tint',
    desc: 'Reflects radiant infrared heat and blocks up to 43 dB of exterior urban noise.'
  },
  'bronze': {
    name: 'Solar Control Bronze Guard',
    desc: 'Subtle warm bronze tint reducing harsh solar glare and interior UV fading.'
  },
  'frosted': {
    name: 'Satin Architectural Frosted Privacy',
    desc: 'Diffuses natural daylight while providing 100% visual privacy for bathrooms and suites.'
  }
};
