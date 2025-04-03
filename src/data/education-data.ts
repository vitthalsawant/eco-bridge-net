
// Types for education content
export type ContentSection = {
  subheading?: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type EducationItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  type: 'article' | 'video' | 'guide' | 'cd-guide';
  fullContent?: ContentSection[];
};

// Mock data for educational content
export const educationItems: EducationItem[] = [
  {
    id: 1,
    title: 'The Environmental Impact of E-Waste in India',
    description: 'Learn about how improper e-waste disposal affects India\'s environment and what citizens can do to help.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=3270&auto=format&fit=crop',
    category: 'Environment',
    readTime: '5 min read',
    type: 'article',
    fullContent: [
      {
        paragraphs: [
          "India generates approximately 3.2 million tonnes of e-waste annually, ranking among the top e-waste producers globally. With the rapid adoption of technology and shorter device lifespans, this number is expected to grow significantly in the coming years.",
          "Mumbai, as one of India's largest metropolitan areas and technology hubs, contributes substantially to the country's e-waste problem. The city's dense population and high tech adoption rate result in thousands of tonnes of electronic waste being generated yearly."
        ]
      },
      {
        subheading: "Environmental Consequences",
        paragraphs: [
          "When improperly disposed of, e-waste releases harmful substances such as lead, mercury, cadmium, and brominated flame retardants into the environment. These toxic materials can contaminate soil, water bodies, and the air.",
          "In Mumbai, improper e-waste disposal has led to concerning levels of heavy metals in soil samples near informal recycling sites, particularly in areas like Dharavi where unregulated e-waste processing occurs.",
          "These contaminants can enter the food chain through water sources and agricultural land, leading to bioaccumulation in plants, animals, and ultimately humans."
        ]
      },
      {
        subheading: "Health Impacts",
        paragraphs: [
          "Workers in informal e-waste recycling sectors, often without proper protective equipment, face direct exposure to hazardous substances. This can lead to respiratory problems, skin disorders, and more serious long-term health issues.",
          "Communities living near informal e-waste recycling areas also experience higher rates of respiratory illnesses, developmental issues in children, and other health complications linked to environmental contamination."
        ],
        image: "https://images.unsplash.com/photo-1611284446314-60a58ac0dade?q=80&w=3270&auto=format&fit=crop",
        imageAlt: "E-waste worker sorting through electronic components",
        imageCaption: "Workers in informal e-waste sectors often lack proper protective equipment"
      },
      {
        subheading: "Policy Framework",
        paragraphs: [
          "India has implemented E-Waste Management Rules, last updated in 2016 and amended in 2018, which follow the principle of Extended Producer Responsibility (EPR). These rules make manufacturers responsible for the collection and proper disposal of their products at end-of-life.",
          "Despite these regulations, implementation remains challenging due to the vast informal sector that continues to handle a significant portion of e-waste recycling in India."
        ]
      },
      {
        subheading: "What Mumbai Citizens Can Do",
        paragraphs: [
          "As a responsible citizen, you can take several steps to minimize the environmental impact of your electronic devices:",
          "1. Return your old devices to the manufacturer through their take-back programs",
          "2. Dispose of e-waste only at authorized collection centers",
          "3. Extend the life of your devices through proper maintenance and repairs",
          "4. Consider donating working but unused electronics to schools or charitable organizations",
          "5. Spread awareness about proper e-waste disposal among friends and family"
        ]
      },
      {
        subheading: "Conclusion",
        paragraphs: [
          "Addressing India's e-waste challenge requires a multi-faceted approach involving government regulations, producer responsibility, formal recycling infrastructure, and consumer awareness. By making informed choices about how we purchase, use, and dispose of electronic devices, each of us can contribute to mitigating the environmental impact of e-waste in Mumbai and beyond."
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'How to Prepare Your Devices for Recycling',
    description: 'A step-by-step guide on how to properly prepare your electronics for recycling in Mumbai.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3201&auto=format&fit=crop',
    category: 'Guides',
    readTime: '3 min read',
    type: 'guide',
    fullContent: [
      {
        paragraphs: [
          "Before recycling your electronic devices, it's crucial to properly prepare them to protect your personal data and ensure they can be processed efficiently. This guide will walk you through the essential steps to prepare various devices for recycling in Mumbai."
        ]
      },
      {
        subheading: "Step 1: Back Up Your Data",
        paragraphs: [
          "Before wiping your device, make sure to back up any important data you want to keep. This could include photos, documents, contacts, messages, and other personal information.",
          "For computers: Use an external hard drive, cloud storage service, or backup software to create a complete backup.",
          "For smartphones and tablets: Back up to your computer, manufacturer's cloud service (like iCloud for Apple devices or Google Drive for Android), or a third-party cloud storage solution."
        ]
      },
      {
        subheading: "Step 2: Perform a Factory Reset",
        paragraphs: [
          "Once your data is backed up, perform a factory reset to erase your personal information:",
          "For computers: Use built-in tools like 'Reset this PC' on Windows or 'Erase All Content and Settings' on macOS. Consider using specialized data wiping software for extra security.",
          "For smartphones and tablets: Go to the Settings app and look for 'Reset', 'Factory Reset', or 'Erase All Content and Settings'.",
          "For other devices: Check the manufacturer's website for specific instructions on how to reset your particular model."
        ],
        image: "https://images.unsplash.com/photo-1603899122556-e9a7195272fb?q=80&w=1974&auto=format&fit=crop",
        imageAlt: "Factory reset screen on smartphone",
        imageCaption: "Factory resetting your device helps protect your personal data"
      },
      {
        subheading: "Step 3: Remove External Components",
        paragraphs: [
          "Before recycling, remove any external components that may need special handling:",
          "- Remove batteries (especially lithium-ion) if they are easily removable",
          "- Take out memory cards, SIM cards, and external storage devices",
          "- Remove toner and ink cartridges from printers",
          "- Detach accessories like cables, chargers, and cases"
        ]
      },
      {
        subheading: "Step 4: Find the Right Recycling Center",
        paragraphs: [
          "In Mumbai, you have several options for responsible e-waste recycling:",
          "- Manufacturer take-back programs (check their websites for details)",
          "- Authorized e-waste recyclers certified by the Maharashtra Pollution Control Board",
          "- E-waste collection drives organized by NGOs and resident welfare associations",
          "- Municipal collection points designated for e-waste disposal"
        ]
      },
      {
        subheading: "Step 5: Packaging and Transporting",
        paragraphs: [
          "When preparing your devices for transport to a recycling center:",
          "- Handle broken screens or damaged devices carefully to avoid injury",
          "- Place items in boxes or bags to prevent further damage during transport",
          "- Keep batteries separate and tape the terminals to prevent short circuits",
          "- For larger items like TVs or monitors, check if the recycling center offers pickup services"
        ]
      },
      {
        subheading: "Additional Tips",
        paragraphs: [
          "- Keep a record of what you've recycled, especially for business assets that may require documentation for compliance purposes",
          "- Ask for a certificate of destruction or recycling if you're concerned about data security",
          "- Consider donating working devices instead of recycling them if they're still functional"
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Inside an E-Waste Recycling Facility in Mumbai',
    description: 'Take a virtual tour of a modern e-waste recycling facility in Mumbai and see how devices are processed.',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0dade?q=80&w=3270&auto=format&fit=crop',
    category: 'Behind the Scenes',
    readTime: '8 min watch',
    type: 'video'
  },
  {
    id: 4,
    title: 'Rare Earth Metals in Electronics',
    description: 'Discover how recovering rare earth metals from e-waste can reduce environmental damage from mining.',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777540?q=80&w=2942&auto=format&fit=crop',
    category: 'Environment',
    readTime: '7 min read',
    type: 'article'
  },
  {
    id: 5,
    title: 'E-Waste Management Laws in Maharashtra',
    description: 'Compare different e-waste legislation and policies from Maharashtra state focusing on Mumbai region.',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=2932&auto=format&fit=crop',
    category: 'Policy',
    readTime: '10 min read',
    type: 'article'
  },
  {
    id: 6,
    title: 'How to Repair Common Electronic Issues',
    description: 'Learn basic repair techniques that can extend the life of your devices and reduce e-waste.',
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2940&auto=format&fit=crop',
    category: 'DIY',
    readTime: '12 min watch',
    type: 'video'
  },
  {
    id: 7,
    title: 'Data Security When Recycling Devices',
    description: 'Protect your personal information with these essential steps before recycling your electronics.',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2729&auto=format&fit=crop',
    category: 'Security',
    readTime: '4 min read',
    type: 'guide'
  },
  {
    id: 8,
    title: 'Children\'s Guide to E-Waste Recycling',
    description: 'A fun and educational resource to teach kids about the importance of properly recycling electronics.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2922&auto=format&fit=crop',
    category: 'Education',
    readTime: '5 min read',
    type: 'guide'
  },
  {
    id: 9,
    title: 'Corporate E-Waste Management Strategies',
    description: 'Case studies of businesses in Mumbai implementing successful e-waste management programs.',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2940&auto=format&fit=crop',
    category: 'Business',
    readTime: '9 min read',
    type: 'article'
  },
  {
    id: 10,
    title: 'CD Guide: Recycling Old CDs and DVDs',
    description: 'Learn how to properly recycle your old CDs, DVDs, and optical media to reduce e-waste.',
    image: 'https://images.unsplash.com/photo-1594114170672-2201e6721c2a?q=80&w=2942&auto=format&fit=crop',
    category: 'Media Disposal',
    readTime: '6 min read',
    type: 'cd-guide',
    fullContent: [
      {
        paragraphs: [
          "CDs, DVDs, and other optical media may seem obsolete in the age of digital streaming, but millions of these discs still exist in homes and offices around Mumbai. Unlike regular plastic, these discs contain various materials that require special handling during disposal."
        ]
      },
      {
        subheading: "What Are CDs and DVDs Made Of?",
        paragraphs: [
          "Optical discs typically contain several materials:",
          "- Polycarbonate plastic (the main component)",
          "- A thin aluminum layer (for reflectivity)",
          "- Lacquer coating (for protection)",
          "- Sometimes gold or silver (in higher-quality discs)",
          "- Dyes and adhesives",
          "These mixed materials make recycling challenging but important."
        ]
      },
      {
        subheading: "Why Not Just Throw Them in the Trash?",
        paragraphs: [
          "When disposed of in landfills, optical media can take hundreds of years to decompose. During this time, they can release bisphenol-A (BPA) and other chemicals into the environment. Additionally, the valuable metals they contain are lost instead of being recovered for reuse."
        ],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
        imageAlt: "Stack of old CDs and DVDs",
        imageCaption: "Millions of optical discs end up in landfills each year"
      },
      {
        subheading: "How to Recycle CDs and DVDs in Mumbai",
        paragraphs: [
          "Several options are available for properly recycling your optical media in Mumbai:",
          "1. E-waste Collection Centers: Many of the certified e-waste recyclers in Mumbai also accept optical media. Check with local centers like Mumbai E-Waste Recyclers or EcoTech Solutions.",
          "2. Mail-Back Programs: Some specialized companies offer mail-back programs where you can send your discs for proper recycling.",
          "3. Community Collection Drives: Watch for e-waste collection events in your neighborhood, which often accept CDs and DVDs.",
          "4. Data Destruction Services: For businesses with sensitive data on optical media, professional data destruction services can securely destroy and recycle the discs."
        ]
      },
      {
        subheading: "Preparing Discs for Recycling",
        paragraphs: [
          "Before recycling your optical media:",
          "1. Sort your discs by type (CDs, DVDs, Blu-rays)",
          "2. For discs containing sensitive information, consider breaking them in half or using a disc shredder",
          "3. Remove discs from cases and paper sleeves (these can often be recycled with regular plastic or paper)",
          "4. Gather discs in a box or bag to prevent scratching during transport"
        ]
      },
      {
        subheading: "Creative Reuse Ideas",
        paragraphs: [
          "If you're feeling creative, old CDs and DVDs can be repurposed in various ways:",
          "- Create mosaic art pieces using broken disc fragments",
          "- Make reflective garden ornaments to deter birds from eating your plants",
          "- Use them as coasters (with felt backing added)",
          "- Create educational crafts with children (after sanding any sharp edges)",
          "While reuse is environmentally friendly, remember that proper recycling is still the best option for discs you don't plan to repurpose."
        ]
      },
      {
        subheading: "The Future of Optical Media Recycling",
        paragraphs: [
          "As the world moves away from physical media, specialized recycling programs for CDs and DVDs may become less common. It's important to responsibly dispose of your collection now while options are still readily available.",
          "By taking the time to properly recycle your unwanted optical media, you're helping recover valuable resources and prevent potentially harmful materials from entering the environment."
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'CD Guide: Repurposing Old Optical Media',
    description: 'Creative ways to repurpose and upcycle your old CDs and DVDs into art and useful items.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    category: 'DIY',
    readTime: '8 min read',
    type: 'cd-guide'
  },
  {
    id: 12,
    title: 'Mumbai\'s E-Waste Collection Points',
    description: 'A comprehensive video guide to all the e-waste collection points across Mumbai city.',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?q=80&w=3000&auto=format&fit=crop',
    category: 'Local Resources',
    readTime: '15 min watch',
    type: 'video'
  }
];

// Mumbai recycling center data
export type RecyclingCenter = {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance: string;
  certifications: string[];
  acceptedItems: string[];
  rating: number;
  reviews: number;
  description?: string;
};

export const recyclingCenters: RecyclingCenter[] = [
  {
    id: 1,
    name: 'Mumbai E-Waste Recyclers',
    address: '42 Andheri East, Mumbai, Maharashtra 400069',
    phone: '(022) 2835-6789',
    hours: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
    distance: '1.5 km',
    certifications: ['MPCB Certified', 'ISO 14001'],
    acceptedItems: ['Computers', 'Phones', 'Tablets', 'TVs', 'Batteries'],
    rating: 4.7,
    reviews: 132,
    description: 'Mumbai E-Waste Recyclers is one of the leading authorized e-waste recycling facilities in the city. They use state-of-the-art technology to safely process various electronic items while recovering valuable materials for reuse. The facility offers free pickup services for large quantities of e-waste and provides data destruction certificates upon request.'
  },
  {
    id: 2,
    name: 'Green Mumbai Recycling',
    address: '78 Parel, Lower Parel, Mumbai, Maharashtra 400012',
    phone: '(022) 2492-3456',
    hours: 'Mon-Sat: 8am-7pm',
    distance: '3.2 km',
    certifications: ['CPCB Authorized'],
    acceptedItems: ['All Electronics', 'Batteries', 'Cables', 'Light Bulbs'],
    rating: 4.5,
    reviews: 96,
    description: 'Green Mumbai Recycling focuses on comprehensive e-waste management solutions for both individual consumers and businesses. Their facility can handle everything from small personal devices to large industrial equipment. They also conduct regular awareness workshops and offer consultancy services to corporations looking to implement effective e-waste management programs.'
  },
  {
    id: 3,
    name: 'EcoTech Solutions',
    address: '105 Worli, Mumbai, Maharashtra 400018',
    phone: '(022) 2438-9012',
    hours: 'Mon-Fri: 9am-5pm, Sat-Sun: 10am-3pm',
    distance: '4.8 km',
    certifications: ['MPCB Certified', 'E-Waste Handler'],
    acceptedItems: ['Computers', 'Mobiles', 'Printers', 'Batteries'],
    rating: 4.8,
    reviews: 185,
    description: 'EcoTech Solutions specializes in data-secure e-waste recycling, making them a popular choice for businesses with sensitive information on their devices. Their facility employs a multi-stage recycling process that maximizes resource recovery while minimizing environmental impact. They're also known for their transparent tracking system that allows customers to follow their e-waste through the entire recycling process.'
  },
  {
    id: 4,
    name: 'Dharavi Recycling Center',
    address: '23 Dharavi, Mumbai, Maharashtra 400017',
    phone: '(022) 2513-7890',
    hours: 'Mon-Sat: 8am-8pm',
    distance: '6.3 km',
    certifications: ['Community Certified'],
    acceptedItems: ['All Electronics', 'Household Appliances'],
    rating: 4.2,
    reviews: 67,
    description: 'Dharavi Recycling Center is a community-based initiative that combines formal and informal recycling approaches. The center provides employment opportunities for local residents while ensuring environmentally sound e-waste processing. Though smaller than some commercial facilities, they have developed innovative techniques for disassembling and sorting electronic components that maximize resource recovery.'
  },
  {
    id: 5,
    name: 'Navi Mumbai E-Waste Management',
    address: '56 Vashi, Navi Mumbai, Maharashtra 400703',
    phone: '(022) 2789-4561',
    hours: 'Mon-Fri: 9am-6pm',
    distance: '12.7 km',
    certifications: ['MPCB Certified', 'ISO 9001', 'ISO 14001'],
    acceptedItems: ['Computers', 'Servers', 'Networking Equipment', 'Industrial Electronics'],
    rating: 4.9,
    reviews: 204,
    description: 'Navi Mumbai E-Waste Management operates one of the largest e-waste processing facilities in the region. Their advanced recycling plant can handle large volumes of diverse electronic waste types. They specialize in corporate e-waste management solutions and offer comprehensive services including inventory management, secure logistics, certified destruction, and detailed reporting for compliance purposes.'
  },
  {
    id: 6,
    name: 'Suburban E-Waste Collection',
    address: '34 Goregaon, Mumbai, Maharashtra 400063',
    phone: '(022) 2678-5432',
    hours: 'Mon-Sat: 9am-5pm',
    distance: '8.4 km',
    certifications: ['MPCB Certified'],
    acceptedItems: ['Home Appliances', 'Computers', 'Mobile Phones', 'Cables'],
    rating: 4.3,
    reviews: 112,
    description: 'Suburban E-Waste Collection serves the residential areas in Mumbai's western suburbs. Their convenient location makes them accessible to households looking to dispose of electronic waste properly. They offer regular collection drives in residential complexes and have established collection points in major shopping centers across the suburban areas.'
  },
  {
    id: 7,
    name: 'South Mumbai Recyclers',
    address: '12 Colaba, Mumbai, Maharashtra 400005',
    phone: '(022) 2204-8765',
    hours: 'Mon-Fri: 10am-7pm, Sat: 11am-5pm',
    distance: '5.1 km',
    certifications: ['ISO 14001', 'R2 Certified'],
    acceptedItems: ['Luxury Electronics', 'High-end Devices', 'All Standard E-waste'],
    rating: 4.6,
    reviews: 89,
    description: 'South Mumbai Recyclers caters primarily to the business district and upscale residential areas of South Mumbai. Their boutique facility specializes in handling high-end electronics with particular attention to data security. They offer premium services including doorstep collection, detailed asset tracking, and custom reporting for corporate clients.'
  }
];

// Community events data
export type CommunityEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  organizer: string;
  category: string;
  registrationLink?: string;
  attendees?: number;
  capacity?: number;
};

export const communityEvents: CommunityEvent[] = [
  {
    id: 1,
    title: 'Mumbai E-Waste Collection Drive',
    description: 'Bring your old electronics for proper recycling. We accept all types of e-waste including computers, mobile phones, household appliances, and more.',
    date: 'May 15, 2025',
    location: 'Juhu Beach, Mumbai',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
    organizer: 'Green Mumbai Initiative',
    category: 'Collection Drive',
    attendees: 45,
    capacity: 100
  },
  {
    id: 2,
    title: 'Workshop: DIY Electronics Repair',
    description: 'Learn how to diagnose and fix common issues with your electronic devices. Extend their lifespan and reduce e-waste!',
    date: 'May 22, 2025',
    location: 'Maker Space, Bandra West',
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524',
    organizer: 'Mumbai Repair Café',
    category: 'Workshop',
    attendees: 28,
    capacity: 30
  },
  {
    id: 3,
    title: 'E-Waste Awareness Campaign',
    description: 'Join us for an informative session on the environmental impact of electronic waste and learn about responsible disposal methods.',
    date: 'June 5, 2025',
    location: 'Dadar East Community Hall',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366',
    organizer: 'Environmental Education Forum',
    category: 'Educational',
    attendees: 62,
    capacity: 150
  },
  {
    id: 4,
    title: 'Corporate E-Waste Management Seminar',
    description: 'A professional seminar for businesses looking to implement effective e-waste management strategies and comply with regulations.',
    date: 'June 12, 2025',
    location: 'Business District Convention Center, BKC',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    organizer: 'Mumbai Chamber of Commerce',
    category: 'Business',
    attendees: 95,
    capacity: 200
  },
  {
    id: 5,
    title: 'E-Waste Art Installation Opening',
    description: 'Visit this unique art exhibition featuring sculptures and installations made entirely from recycled electronic components.',
    date: 'June 20, 2025',
    location: 'Contemporary Art Gallery, Colaba',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
    organizer: 'Artists for Environment',
    category: 'Cultural',
    attendees: 113,
    capacity: 300
  },
  {
    id: 6,
    title: 'School E-Waste Collection Competition',
    description: 'Schools across Mumbai compete to collect the most e-waste. Join the effort by donating your old electronics at participating schools.',
    date: 'July 1-15, 2025',
    location: 'Various Schools Across Mumbai',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    organizer: 'Mumbai Education Department',
    category: 'Educational',
    attendees: 2500,
    capacity: 10000
  }
];
