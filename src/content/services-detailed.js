export const services = [
  {
    id: 'event-lighting-design',
    step: '01',
    name: 'Event Lighting Design',
    serviceimg: '/lighting/laser-show.webp',
    img: '/lighting/laser-show.webp',
    alt: 'Lighting designer working on event layout with 3D visualization software',
    description: 'Full-service lighting design from concept to execution with detailed 3D visualizations',
    link: '/services/event-lighting-design',
    serviceDetails: {
      process: 'Initial consultation → Site analysis → 3D rendering → Final implementation',
      deliverables: 'Lighting plot, equipment list, power plan',
      team: 'Senior lighting designer + technical director',
      revisionRounds: 3,
      includes: 'Venue liaison & vendor coordination'
    },
    packages: [
      {
        name: 'Basic Design Package',
        description: 'For simple events with single-space lighting',
        price: 1495,
        timeframe: '2-3 weeks'
      },
      {
        name: 'Premium Design Package',
        description: 'Multi-space designs with technical drawings',
        price: 2995,
        timeframe: '4-6 weeks'
      },
      {
        name: 'Platinum Design Package',
        description: 'Full production design with VR walkthrough',
        price: 4995,
        timeframe: '6-8 weeks'
      }
    ],
    addons: [
      {
        name: 'Rush Service',
        description: '50% faster turnaround',
        price: 750
      },
      {
        name: 'On-site Rehearsal',
        description: 'Designer attendance at tech rehearsal',
        price: 450
      }
    ],
    commonUses: [
      'Wedding receptions',
      'Corporate galas',
      'Product launches',
      'Award ceremonies',
      'Festival main stages'
    ],
    faqs: [
      {
        question: 'How early should we book design services?',
        answer: 'Minimum 8 weeks pre-event for optimal results'
      },
      {
        question: 'Do you work with external vendors?',
        answer: 'Yes, we coordinate with all your existing vendors'
      }
    ],
    relatedServices: ['technical-production', 'av-integration', 'event-staffing']
  },
  {
    id: 'technical-production',
    step: '02',
    name: 'Technical Production',
    serviceimg: '/lighting/stage-cad-wide.webp',
    img: '/lighting/stage-cad.webp',
    alt: 'Professional rigging system installation in event venue',
    description: 'Complete technical production management including rigging, power distribution, and safety systems',
    link: '/services/technical-production',
    serviceDetails: {
      process: 'Initial consultation → Rigging design → Power planning → Final implementation',
      deliverables: 'Rigging plot, power distribution plan, safety certifications',
      team: 'Certified riggers and electricians',
      revisionRounds: 2,
      includes: 'Permitting assistance and vendor coordination'
    },
    packages: [
      {
        name: 'Basic Production',
        description: 'Small venue package (up to 500sqm)',
        price: 3495,
        timeframe: '1 week prep'
      },
      {
        name: 'Advanced Production',
        description: 'Medium venues with complex rigging',
        price: 7495,
        timeframe: '2 week prep'
      },
      {
        name: 'Stadium Production',
        description: 'Large-scale arena/stadium production',
        price: 14995,
        timeframe: '4 week prep'
      }
    ],
    addons: [
      {
        name: '24/7 Tech Support',
        description: 'Dedicated technician on standby',
        price: 250
      },
      {
        name: 'Weather Protection',
        description: 'Full weatherproofing package',
        price: 850
      }
    ],
    commonUses: [
      'Concert productions',
      'Corporate stage shows',
      'Outdoor festivals',
      'Broadcast events',
      'Theatrical performances'
    ],
    faqs: [
      {
        question: 'What venues have you worked with?',
        answer: 'We have experience with 200+ venues nationwide'
      },
      {
        question: 'Do you handle permits?',
        answer: 'Yes, full permitting service included'
      }
    ],
    relatedServices: ['event-lighting-design', 'av-integration', 'safety-compliance']
  },
  {
    id: 'av-integration',
    step: '03',
    name: 'AV Integration',
    serviceimg: '/lighting/audio-console.webp',
    img: '/lighting/audio-console.webp',
    alt: 'State-of-the-art AV control system with multiple monitors',
    description: 'Seamless integration of lighting, audio, and video systems for unified event control',
    link: '/services/av-integration',
    serviceDetails: {
      process: 'Initial consultation → System design → Integration → Testing → Final implementation',
      deliverables: 'System integration plan, control programming, testing report',
      team: 'AV integrator + control system programmer',
      revisionRounds: 2,
      includes: 'Vendor coordination and system optimization'
    },
    packages: [
      {
        name: 'Basic AV Sync',
        description: 'Lighting + audio integration',
        price: 995,
        timeframe: '48-hour setup'
      },
      {
        name: 'Full AV Integration',
        description: 'Lighting, audio, video, and SFX',
        price: 2495,
        timeframe: '1 week setup'
      },
      {
        name: 'Enterprise Integration',
        description: 'Multi-venue network integration',
        price: 4995,
        timeframe: '2 week setup'
      }
    ],
    addons: [
      {
        name: 'Backup System',
        description: 'Redundant control systems',
        price: 450
      },
      {
        name: 'Live Streaming Integration',
        description: 'Multi-camera live stream setup',
        price: 895
      }
    ],
    commonUses: [
      'Hybrid events',
      'Multi-stage festivals',
      'Corporate conferences',
      'Broadcast productions',
      'Interactive installations'
    ],
    faqs: [
      {
        question: 'Can you work with our existing equipment?',
        answer: 'Yes, we integrate with all major AV brands'
      },
      {
        question: 'Do you provide operators?',
        answer: 'Certified operators available as add-on'
      }
    ],
    relatedServices: ['technical-production', 'event-lighting-design', 'live-stream-production']
  },
  {
    id: 'dmx-lighting-operation',
    step: '04',
    name: 'DMX Light Operation',
    serviceimg: '/lighting/dmx-lights.webp',
    img: '/lighting/dmx-lights.webp',
    alt: 'Spectacular pyrotechnic and fog effects at concert venue',
    description: 'Stunning visual effects including fog, haze, pyrotechnics, and projection mapping',
    link: '/services/special-effects',
    serviceDetails: {
      process: 'Initial consultation → Effect design → Programming → Testing → Final implementation',
      deliverables: 'Effect cue list, safety plan, cleanup protocol',
      team: 'Licensed pyrotechnicians and safety officers',
      revisionRounds: 2,
      includes: 'Permitting assistance and cleanup services'
    },
    packages: [
      {
        name: 'Atmospheric Package',
        description: 'Fog, haze, and basic effects',
        price: 995,
        timeframe: '24-hour setup'
      },
      {
        name: 'Concert Effects Package',
        description: 'Full concert-grade effects system',
        price: 2995,
        timeframe: '2-day setup'
      },
      {
        name: 'Spectacular Package',
        description: 'Pyro, projection mapping, and custom effects',
        price: 6995,
        timeframe: '3-day setup'
      }
    ],
    addons: [
      {
        name: 'Custom Confetti Design',
        description: 'Branded confetti with custom colors',
        price: 550
      },
      {
        name: 'Flame Effects',
        description: 'Controlled flame system with programming',
        price: 1250
      }
    ],
    commonUses: [
      'Concert finales',
      'Product reveals',
      'Grand openings',
      'Award show moments',
      'Festival experiences'
    ],
    faqs: [
      {
        question: 'Are your effects safe for indoor use?',
        answer: 'Yes, we offer specialized indoor-safe effects'
      },
      {
        question: 'Do you handle cleanup?',
        answer: 'Complete post-event cleanup included in all packages'
      }
    ],
    relatedServices: ['event-lighting-design', 'technical-production', 'immersive-experiences']
  },
  {
    id: 'audio-visual-technicians',
    step: '05',
    name: 'A/V Technicians',
    serviceimg: '/lighting/av-staff.webp',
    img: '/lighting/av-staff.webp',
    alt: 'Professional lighting technicians setting up equipment',
    description: 'Certified technicians and production staff for full event execution',
    link: '/services/event-staffing',
    serviceDetails: {
      process: 'Initial consultation → Staff planning → On-site execution → Post-event review',
      deliverables: 'Staff schedule, equipment list, post-event report',
      team: 'Lighting operators, riggers, electricians, techs',
      revisionRounds: 1,
      includes: 'PPE and comms systems for all staff'
    },
    packages: [
      {
        name: 'Basic Crew',
        description: 'Essential technical staff (3-5 people)',
        price: 2495,
        timeframe: 'One-day event'
      },
      {
        name: 'Standard Production Team',
        description: 'Full production department (6-12 people)',
        price: 5995,
        timeframe: 'Multi-day event'
      },
      {
        name: 'Complete Production Staff',
        description: 'Full technical team with department heads',
        price: 11995,
        timeframe: 'Festival/major production'
      }
    ],
    addons: [
      {
        name: 'Production Assistant',
        description: 'PA for client-specific tasks',
        price: 350
      },
      {
        name: 'Dedicated Stage Manager',
        description: 'Professional show caller and coordinator',
        price: 750
      }
    ],
    commonUses: [
      'Corporate events',
      'Music concerts',
      'Theater productions',
      'Festival operations',
      'Broadcast productions'
    ],
    faqs: [
      {
        question: 'Are your staff insured?',
        answer: 'All staff fully insured with $5M liability coverage'
      },
      {
        question: 'Can we meet the crew beforehand?',
        answer: 'Pre-event crew introductions available on request'
      }
    ],
    relatedServices: ['technical-production', 'av-integration', 'event-lighting-design']
  },
  {
    id: 'immersive-experiences',
    step: '06',
    name: 'Immersive Experiences',
    serviceimg: '/lighting/projections.webp',
    img: '/lighting/projections.webp',
    alt: 'Interactive light installation with visitors engaging with light art',
    description: 'Interactive lighting installations and immersive environments for memorable guest experiences',
    link: '/services/immersive-experiences',
    serviceDetails: {
      process: 'Initial consultation → Concept design → Development → Testing → Final implementation',
      deliverables: 'Interactive system design, custom programming, installation plan',
      team: 'Interactive designer + software developer + installation specialist',
      revisionRounds: 3,
      includes: 'Sensor integration and mobile app development'
    },
    packages: [
      {
        name: 'Interactive Light Display',
        description: 'Motion-reactive light installation',
        price: 2445,
        timeframe: '3-4 weeks development'
      },
      {
        name: 'Brand Experience Environment',
        description: 'Full sensory brand activation space',
        price: 2445,
        timeframe: '3-4 weeks development'
      },
      {
        name: 'Festival Installation',
        description: 'Major interactive art installation',
        price: 3445,
        timeframe: '4-6 weeks development'
      }
    ],
    addons: [
      {
        name: 'Mobile App Integration',
        description: 'Custom app for visitor interaction',
        price: 1995
      },
      {
        name: 'Data Collection',
        description: 'Analytics and user interaction data',
        price: 1250
      }
    ],
    commonUses: [
      'Brand activations',
      'Museum exhibitions',
      'Corporate headquarters',
      'Festival experiences',
      'Retail environments'
    ],
    faqs: [
      {
        question: 'How long can installations remain active?',
        answer: 'From one-day events to permanent installations'
      },
      {
        question: 'Can experiences be branded?',
        answer: 'Full customization for brand integration available'
      }
    ],
    relatedServices: ['event-lighting-design', 'special-effects', 'virtual-production']
  },
  {
    id: 'stage-production',
    step: '07',
    name: 'Stage Production',
    serviceimg: '/lighting/stage-cad-wide.webp',
    img: '/lighting/stage-cad-wide.webp',
    alt: 'LED wall virtual production setup with camera and lighting rigs',
    description: 'State-of-the-art LED wall and XR stage solutions for film, broadcast, and live events',
    link: '/services/virtual-production',
    serviceDetails: {
      process: 'Initial consultation → Stage design → Content creation → Testing → Final implementation',
      deliverables: 'Stage design plan, content library, technical documentation',
      team: 'Virtual production supervisor + content creator + technician',
      revisionRounds: 3,
      includes: 'Real-time rendering and camera tracking'
    },
    packages: [
      {
        name: 'Basic XR Package',
        description: 'Small LED backdrop for presentations',
        price: 7995,
        timeframe: '3-day setup'
      },
      {
        name: 'Broadcast XR Solution',
        description: 'Full XR environment for broadcast',
        price: 19995,
        timeframe: '1-week setup'
      },
      {
        name: 'Production XR Stage',
        description: 'Complete virtual production stage',
        price: 49995,
        timeframe: '2-week setup'
      }
    ],
    addons: [
      {
        name: 'Custom Environment Design',
        description: 'Bespoke virtual environment creation',
        price: 3995
      },
      {
        name: 'Real-time Rendering Operator',
        description: 'Dedicated specialist for content manipulation',
        price: 1250
      }
    ],
    commonUses: [
      'Film production',
      'Broadcast studios',
      'Live event backdrops',
      'Corporate presentations',
      'Virtual conferences'
    ],
    faqs: [
      {
        question: 'Do you create the virtual content?',
        answer: 'Yes, we offer full environment creation services'
      },
      {
        question: 'How much space is needed?',
        answer: 'Solutions available from 10sqm to 500sqm'
      }
    ],
    relatedServices: ['technical-production', 'av-integration', 'immersive-experiences']
  },
  {
    id: 'safety-compliance',
    step: '08',
    name: 'Safety & Compliance',
    serviceimg: '/lighting/architectural-lights.webp',
    img: '/lighting/architectural-lights.webp',
    alt: 'Safety officer checking rigging equipment with clipboard',
    description: 'Comprehensive safety management, regulatory compliance, and risk assessment services',
    link: '/services/safety-compliance',
    serviceDetails: {
      process: 'Initial consultation → Risk assessment → Documentation → Implementation → Final review',
      deliverables: 'Safety plan, compliance certificates, inspection reports',
      team: 'Safety officer + compliance specialist + documentation manager',
      revisionRounds: 2,
      includes: 'Permitting assistance and emergency planning'
    },
    packages: [
      {
        name: 'Basic Safety Compliance',
        description: 'Essential documentation and inspection',
        price: 995,
        timeframe: '1 week processing'
      },
      {
        name: 'Full Compliance Package',
        description: 'Complete permit processing and on-site officer',
        price: 2495,
        timeframe: '2-3 weeks processing'
      },
      {
        name: 'Major Event Safety Management',
        description: 'Comprehensive risk management and team',
        price: 5995,
        timeframe: '4-6 weeks processing'
      }
    ],
    addons: [
      {
        name: 'Additional Safety Officer',
        description: 'Per-day additional safety personnel',
        price: 450
      },
      {
        name: 'Emergency Action Planning',
        description: 'Custom emergency response protocol',
        price: 795
      }
    ],
    commonUses: [
      'Large public events',
      'Complex rigging installations',
      'Festival operations',
      'Tour productions',
      'Special effect implementations'
    ],
    faqs: [
      {
        question: 'What regulations do you cover?',
        answer: 'Federal, state, and local requirements for events'
      },
      {
        question: 'How early should we start compliance?',
        answer: 'Minimum 6-8 weeks before event date'
      }
    ],
    relatedServices: ['technical-production', 'special-effects', 'virtual-production']
  },

  {
    id: 'resolume-operation',
    step: '09',
    name: 'Resolume Operation Services',
    serviceimg: '/lighting/touchdesigner-installation.webp',
    img: '/lighting/touchdesigner-installation.webp',
    alt: 'Resolume operator working on console with multi-screen display',
    description: 'Expert Resolume Arena/Avenue operation for dynamic visual shows and projection mapping',
    link: '/services/resolume-operation',
    serviceDetails: {
      process: 'Content review → Show programming → Technical rehearsal → Live operation',
      deliverables: 'Custom visual content integration, mapping templates, show file',
      team: 'Senior Resolume operator + media server technician',
      revisionRounds: 2,
      includes: 'On-site setup & troubleshooting'
    },
    packages: [
      {
        name: 'Basic Resolume Operation',
        description: 'Single operator for simple events with pre-built content',
        price: 1295,
        timeframe: '1 day'
      },
      {
        name: 'Advanced Resolume Package',
        description: 'Custom content integration with live effects operation',
        price: 2495,
        timeframe: '2-3 days'
      },
      {
        name: 'Premium Mapping Package',
        description: 'Complex projection mapping with custom effects programming',
        price: 3995,
        timeframe: '3-5 days'
      }
    ],
    addons: [
      {
        name: 'Content Creation',
        description: 'Custom visual content designed for your event',
        price: 1250
      },
      {
        name: 'Extra Rehearsal Day',
        description: 'Additional day for technical rehearsal',
        price: 650
      }
    ],
    commonUses: [
      'Music festivals',
      'Corporate presentations',
      'Nightclub installations',
      'Theater productions',
      'Architectural projections'
    ],
    faqs: [
      {
        question: 'Can you work with our existing content?',
        answer: 'Yes, we can integrate and optimize any content formats you provide'
      },
      {
        question: 'What equipment do you bring?',
        answer: 'Resolume license, control surface, and backup system - projectors/screens quoted separately'
      }
    ],
    relatedServices: ['projection-mapping', 'media-server-rental', 'content-creation']
  },
  {
    id: 'touchdesigner-operation',
    step: '10',
    name: 'TouchDesigner Operation',
    serviceimg: '/lighting/touchdesigner-installation.webp',
    img: '/lighting/touchdesigner-installation.webp',
    alt: 'TouchDesigner specialist working with interactive lighting installation',
    description: 'Specialized TouchDesigner programming and operation for interactive and responsive visual experiences',
    link: '/services/touchdesigner-operation',
    serviceDetails: {
      process: 'Concept development → Patch programming → Sensor integration → Testing → Live implementation',
      deliverables: 'TouchDesigner project file, technical documentation, integration protocol',
      team: 'Senior TouchDesigner developer + systems integrator',
      revisionRounds: 3,
      includes: 'Hardware setup & calibration'
    },
    packages: [
      {
        name: 'Basic Interactive Package',
        description: 'Simple interactive elements with standard visualizations',
        price: 1995,
        timeframe: '3-4 days'
      },
      {
        name: 'Advanced Integration Package',
        description: 'Complex sensor integration with custom visual responses',
        price: 3495,
        timeframe: '1-2 weeks'
      },
      {
        name: 'Custom Installation Package',
        description: 'Full-scale interactive installation with multiple interaction points',
        price: 5995,
        timeframe: '2-3 weeks'
      }
    ],
    addons: [
      {
        name: 'Sensor Package',
        description: 'Equipment for motion tracking and interaction',
        price: 950
      },
      {
        name: 'Extended Support',
        description: 'Post-event technical support and adjustments',
        price: 595
      }
    ],
    commonUses: [
      'Interactive art installations',
      'Museum exhibits',
      'Experiential marketing activations',
      'Trade show booths',
      'Immersive theater productions'
    ],
    faqs: [
      {
        question: 'Can the system respond to crowd movement?',
        answer: 'Yes, we can implement camera-based tracking for crowd interaction'
      },
      {
        question: 'Do you provide the hardware components?',
        answer: 'We can supply all necessary hardware including sensors, cameras, and computing equipment'
      }
    ],
    relatedServices: ['interactive-installations', 'sensor-integration', 'projection-mapping']
  },
  {
    id: 'dmx-light-installation',
    step: '11',
    name: 'DMX Lighting Installations',
    serviceimg: '/lighting/dmx-lights.webp',
    img: '/lighting/dmx-lights.webp',
    alt: 'Lighting technician operating DMX console for live event',
    description: 'Professional DMX lighting programming and operation for precise control of lighting fixtures',
    link: '/services/dmx-operation',
    serviceDetails: {
      process: 'Equipment inventory → Console programming → Cue creation → Show operation',
      deliverables: 'Show file, cue sheet, patch list',
      team: 'DMX programmer + lighting operator',
      revisionRounds: 2,
      includes: 'Pre-programming and on-site adjustments'
    },
    packages: [
      {
        name: 'Basic DMX Operation',
        description: 'Single console operation for smaller venues',
        price: 895,
        timeframe: '1 day'
      },
      {
        name: 'Standard Production Package',
        description: 'Programming and operation for mid-sized events',
        price: 1695,
        timeframe: '2 days'
      },
      {
        name: 'Advanced Show Control Package',
        description: 'Complex show programming with timecode integration',
        price: 2995,
        timeframe: '3-4 days'
      }
    ],
    addons: [
      {
        name: 'Console Rental',
        description: 'Premium lighting console (MA, Hog, etc.)',
        price: 650
      },
      {
        name: 'Pre-Visualization',
        description: '3D visualization of lighting design before event',
        price: 850
      }
    ],
    commonUses: [
      'Live concerts',
      'Corporate events',
      'Theater productions',
      'Television broadcasts',
      'Dance performances'
    ],
    faqs: [
      {
        question: 'Which console brands do you operate?',
        answer: 'We are certified on GrandMA, Hog, Avolites, Chamsys, and ETC consoles'
      },
      {
        question: 'Can you work with our existing lighting plot?',
        answer: 'Yes, we can program based on any existing design documentation'
      }
    ],
    relatedServices: ['lighting-equipment-rental', 'event-lighting-design', 'production-management']
  },
  {
    id: 'outdoor-lighting-installation',
    step: '12',
    name: 'Outdoor Lighting Installation',
    serviceimg: '/lighting/zoomed-beachfestoon.webp',
    img: '/lighting/zoomed-beachfestoon.webp',
    alt: 'Team installing outdoor weatherproof lighting for festival environment',
    description: 'Weatherproof lighting solutions for outdoor events with specialized power distribution',
    link: '/services/outdoor-lighting-installation',
    serviceDetails: {
      process: 'Site survey → Weather planning → Installation → Weatherproofing → Testing',
      deliverables: 'Installation report, safety certification, equipment inventory',
      team: 'Installation manager + technical crew (3-5 members)',
      revisionRounds: 1,
      includes: 'Weather monitoring and contingency setup'
    },
    packages: [
      {
        name: 'Basic Outdoor Package',
        description: 'Essential weatherproof lighting for smaller outdoor areas',
        price: 2295,
        timeframe: '1-2 days'
      },
      {
        name: 'Festival Lighting Package',
        description: 'Comprehensive lighting for medium-sized outdoor events',
        price: 4495,
        timeframe: '2-3 days'
      },
      {
        name: 'Premium Outdoor Production',
        description: 'Large-scale outdoor production with multiple areas',
        price: 7995,
        timeframe: '3-5 days'
      }
    ],
    addons: [
      {
        name: 'Power Generation',
        description: 'Silent generators with distribution system',
        price: 1250
      },
      {
        name: 'Emergency Crew',
        description: 'On-site standby crew for weather issues',
        price: 895
      }
    ],
    commonUses: [
      'Music festivals',
      'Outdoor weddings',
      'Public events',
      'Sporting events',
      'Architectural illuminations'
    ],
    faqs: [
      {
        question: 'What happens in case of extreme weather?',
        answer: 'We implement our weather protocol including protective covers and backup systems'
      },
      {
        question: 'Do you provide power solutions?',
        answer: 'Yes, we offer complete power distribution and backup generators'
      }
    ],
    relatedServices: ['power-distribution', 'temporary-structures', 'event-safety']
  },
  {
    id: 'heights-lighting-installation',
    step: '13',
    name: 'Working-At-Heights Lighting',
    serviceimg: '/lighting/boom-lift-tall.webp',
    img: '/lighting/boom-lift-tall.webp',
    alt: 'Certified technicians installing lighting at height with safety equipment',
    description: 'Specialized elevated lighting installation by certified height workers for venues with challenging access',
    link: '/services/heights-lighting-installation',
    serviceDetails: {
      process: 'Safety assessment → Equipment certification → Installation plan → Rigging → Focused setup',
      deliverables: 'Rigging plot, safety documentation, inspection certificates',
      team: 'Lead rigger + certified height technicians',
      revisionRounds: 1,
      includes: 'Safety equipment and compliance documentation'
    },
    packages: [
      {
        name: 'Basic Heights Package',
        description: 'Standard truss and fixture installation up to 6m',
        price: 2495,
        timeframe: '1 day'
      },
      {
        name: 'Advanced Rigging Package',
        description: 'Complex installations with multiple hang points up to 12m',
        price: 3995,
        timeframe: '2 days'
      },
      {
        name: 'Extreme Access Package',
        description: 'Specialized installation for difficult-access locations and heights above 12m',
        price: 6495,
        timeframe: '3 days'
      }
    ],
    addons: [
      {
        name: 'Structural Engineer',
        description: 'Professional evaluation and certification',
        price: 950
      },
      {
        name: 'Aerial Access Equipment',
        description: 'Scissor lifts, cherry pickers, and scaffolding',
        price: 1295
      }
    ],
    commonUses: [
      'Arena concerts',
      'Cathedral and historic venue events',
      'Theater fly systems',
      'Warehouse raves',
      'Architectural installations'
    ],
    faqs: [
      {
        question: 'Are your technicians certified?',
        answer: 'All our technicians have current Working at Heights, IPAF, and rigging certifications'
      },
      {
        question: 'Can you install in protected buildings?',
        answer: 'Yes, we specialize in non-invasive methods for historic and protected structures'
      }
    ],
    relatedServices: ['rigging-services', 'structural-assessment', 'venue-consultation']
  },
  {
    id: 'architectural-lighting',
    step: '14',
    name: 'Architectural Lighting Services',
    serviceimg: '/lighting/architectural-lights.webp',
    img: '/lighting/architectural-lights.webp',
    alt: 'Building facade illuminated with color-changing architectural lighting',
    description: 'Sophisticated lighting design for architectural features, facades, and structures',
    link: '/services/architectural-lighting',
    serviceDetails: {
      process: 'Building analysis → Lighting concept → Draft design → Final implementation → Programming',
      deliverables: 'CAD drawings, fixture specifications, control system design',
      team: 'Architectural lighting designer + installation specialists',
      revisionRounds: 3,
      includes: 'Local permit management and energy efficiency analysis'
    },
    packages: [
      {
        name: 'Facade Lighting Package',
        description: 'External building illumination for small to medium structures',
        price: 3495,
        timeframe: '1 week'
      },
      {
        name: 'Heritage Building Package',
        description: 'Specialized lighting for historic and listed buildings',
        price: 5995,
        timeframe: '2 weeks'
      },
      {
        name: 'Complete Building Package',
        description: 'Comprehensive exterior and key interior architectural lighting',
        price: 9995,
        timeframe: '3-4 weeks'
      }
    ],
    addons: [
      {
        name: 'DMX Control System',
        description: 'Programmable lighting control with remote access',
        price: 1895
      },
      {
        name: 'Annual Maintenance Plan',
        description: 'Regular maintenance and system updates',
        price: 1250
      }
    ],
    commonUses: [
      'Commercial buildings',
      'Hotels and resorts',
      'Historic landmarks',
      'Bridges and public structures',
      'Retail environments'
    ],
    faqs: [
      {
        question: 'How energy-efficient are your solutions?',
        answer: 'We exclusively use LED technology with smart controls to minimize energy consumption'
      },
      {
        question: 'Can the lighting be changed for different occasions?',
        answer: 'Yes, our control systems allow for seasonal and event-specific lighting programs'
      }
    ],
    relatedServices: ['permanent-installations', 'building-management-systems', 'urban-planning']
  },
  {
    id: 'concert-lighting-operation',
    step: '15',
    name: 'Concert Lighting Operation',
    serviceimg: '/lighting/dmx-lights.webp',
    img: '/lighting/dmx-lights.webp',
    alt: 'Lighting operator running dynamic show from console at concert',
    description: 'Specialized lighting design and operation for live music performances and tours',
    link: '/services/concert-lighting-operation',
    serviceDetails: {
      process: 'Artist consultation → Song analysis → Programming → Rehearsal → Live operation',
      deliverables: 'Show file, cue sheets, tour package documentation',
      team: 'Lighting designer + console operator + technicians',
      revisionRounds: 2,
      includes: 'Band rehearsal attendance and tour preparation'
    },
    packages: [
      {
        name: 'Club Performance Package',
        description: 'Lighting operation for smaller venues and club shows',
        price: 1295,
        timeframe: '1 day'
      },
      {
        name: 'Theater Concert Package',
        description: 'Mid-sized venue production with custom programming',
        price: 2995,
        timeframe: '2-3 days'
      },
      {
        name: 'Tour Production Package',
        description: 'Complete show design and operation with tour-ready documentation',
        price: 7495,
        timeframe: '1-2 weeks'
      }
    ],
    addons: [
      {
        name: 'Timecode Integration',
        description: 'Precision cue timing with audio synchronization',
        price: 950
      },
      {
        name: 'Tour Bible Creation',
        description: 'Comprehensive documentation for touring production',
        price: 1250
      }
    ],
    commonUses: [
      'Music tours',
      'Festival performances',
      'Album release events',
      'Live broadcasts',
      'Special fan events'
    ],
    faqs: [
      {
        question: 'Can you match the lighting to our music style?',
        answer: 'Absolutely, we analyze your music to create a cohesive visual representation'
      },
      {
        question: 'Do you work with existing tour managers?',
        answer: 'Yes, we integrate seamlessly with your existing tour team and management'
      }
    ],
    relatedServices: ['tour-management', 'production-design', 'stage-management']
  },
  {
    id: 'event-lighting-equipment',
    step: '16',
    name: 'Event Lighting Equipment Hire',
    serviceimg: '/lighting/edit-lobby-festoon.webp',
    img: '/lighting/edit-lobby-festoon.webp',
    alt: 'Array of professional lighting fixtures including moving heads and LED panels',
    description: 'Comprehensive inventory of professional lighting equipment available for dry hire or with technicians',
    link: '/services/event-lighting-equipment',
    serviceDetails: {
      process: 'Requirements assessment → Equipment selection → Prep & testing → Delivery → Collection',
      deliverables: 'Equipment list, technical specifications, safety certification',
      team: 'Equipment manager + prep technicians + delivery crew',
      revisionRounds: 2,
      includes: 'Equipment testing and backup units'
    },
    packages: [
      {
        name: 'Small Event Package',
        description: 'Basic lighting kit for intimate events up to 100 guests',
        price: 895,
        timeframe: '1-3 days rental'
      },
      {
        name: 'Medium Production Package',
        description: 'Comprehensive lighting package for events up to 500 guests',
        price: 2495,
        timeframe: '1-3 days rental'
      },
      {
        name: 'Large Production Package',
        description: 'Professional lighting rig for major events and productions',
        price: 4995,
        timeframe: '1-5 days rental'
      }
    ],
    addons: [
      {
        name: 'Technical Support',
        description: 'On-site technician throughout event',
        price: 495
      },
      {
        name: 'Extended Rental',
        description: 'Additional rental days at reduced rate',
        price: 295
      }
    ],
    commonUses: [
      'Corporate events',
      'Weddings and celebrations',
      'Theater productions',
      'Film and TV shoots',
      'Fashion shows'
    ],
    faqs: [
      {
        question: 'Do you offer delivery and setup?',
        answer: 'Yes, we provide full delivery, setup, and collection services'
      },
      {
        question: 'What happens if equipment fails?',
        answer: 'We include backup units for critical components and offer 24/7 emergency support'
      }
    ],
    relatedServices: ['av-equipment-hire', 'power-distribution', 'event-production']
  }


];

export default services;