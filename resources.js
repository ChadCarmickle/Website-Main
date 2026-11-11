
// MUST ADD TO ELECTRON. Browser default does not allow auto-play-unmuted videos. 
// app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

/* =========================================================
   1. Global Variables. 
   ========================================================= */
const SLIDE_INTERVAL_MS = 8000; // 8 seconds per slide. 
const COURSES_PER_BATCH = 3; // Number of course images to show between event images
const AUTO_RESUME_DELAY = 300000; // 5 minutes in milliseconds — used for both the slideshow idle countdown and resuming a paused video


const NEWS_BANNER = false; // Set to true to enable news alerts. 
const NEWS_BANNER_Text = "Classes start on Sepeter 21st"; 
const NEWS_BANNER_Color = "red"; 

// Countdown display logic for slideshow. 
let resumeCountdownInterval = null;
let resumeCountdown = AUTO_RESUME_DELAY / 1000;
const slideshowCountdownEl = document.getElementById("slideshow-idle-countdown");


// How often a video plays. 
//const VIDEO_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const VIDEO_INTERVAL_MS = 2 * 60 * 1000; // 30 seconds (testing)

/* =========================================================
   2. Announcements. 
   ========================================================= */

const Announcements = [

    { 
      label: "Register for Spring 2027",   
      title: "Spring 2027 Key Registration Dates",
      content: "📣 Spring registration opens - September 14, 2026 <br> <br> <strong>Spring One</strong> <br> Last day to register - January 10, 2027 <br> Classes start - January 11, 2027 <br> <br> <strong>Spring Two </strong><br> Last day to register - March 14, 2027 <br> Classes start - March 15, 2027",  
      image: null,     
      video: "videos/video_1.mp4",     
      qr: null,        
    },
    { 
      label: "Pay for Spring 2027 Classes", 
      title: "Spring Payment Due Dates",
      content: "Payment of tuition and fees for the <strong> Spring 2027 </strong>semester is due based on your <i><strong>earliest course start date.</i></strong> <br><br> • If your earliest course start date is March 15, 2027, payment is due <strong>Friday, January 8, 2027.</strong> <br>If your earliest course start date is on or after March 15, 2027, payment is due <strong> Friday, March 12, 2027.</strong>",
      image: "assets/ProgramResources/Healthcare/HealthInformationTechnology.jpg",
      video: null,
      qr: null,
    },
    { 
      label: "Library Hours", 
      title: "Extended Library Hours",
      content: "Attention students: Starting today, the library is open until 9 PM on weekdays.",
      image: "assets/ProgramResources/Healthcare/HealthInformationTechnology.jpg",
      video: null,
      qr: null,
    },
    {
      label: "Parking", 
      title: "Campus Parking Reminder",
      content: "Main entrance to the Sellersburg campus is under construction. <br> Please use alternative entrance.",
      image: null,
      video: null,
      qr: null,
    },
];


/* =========================================================
   2. Campus Resources: 
   ========================================================= */
const CampusResources = [
  {
    label: "Academic Advising", 
    title: "Academic Advising at Ivy Tech",
    content: "Your academic advisor will be your guide as you determine which courses to take each semester. If your goal is to transfer to a four-year college or university, your advisor will help you with that too! <br><br> <strong> Hours of Operation </strong> <br> Monday, Wednesday, Thursday: 8 am to 5 pm <br> Tuesday: 8 am to 6 pm <br> Friday: 7:30 am to 4 pm <br> <br> <strong> Contact Us</strong> <br> Email: sl-advising@ivytech.edu <br> Phone: (812) 947-7843 <br> Location: Pfau Hall - G6 <br> <br> For more information, scan the QR code!",
    image: "assets/CampusResources/AcademicAdvising.jpg",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_AcademicAdvising.png",
  },
  { 
    label: "Registrar/Transcripts", 
    title: "Office of the Registrar",
    content: "The Office of the Registrar maintains student profiles and academic records, conducts course registration activities, certifies enrollment and completion of degree requirements, issues transcripts, and more.  The registrar's office can help you with: <br> <br>• Updating your student record and demographic information <br>• Credit Hours / Enrollment Status <br>• Student Loan Deferment Requests and Insurance Reporting, <br>• Grade Point Average (GPA) / Dean's List <br>• Transfer of Credit <br>• Graduation <br>• Transcripts  <br><br> <strong> Hours of Operation </strong> <br> Monday, Wednesday, Thursday: 8 am to 5 pm <br> Tuesday: 8 am to 6 pm <br> Friday: 7:30 am to 4 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sl-registrar@ivytech.edu <br> Phone: (812) 955-5849 <br> Location: Pfau Hall - A2 <br> ",
    image: "assets/CampusResources/Registar.jpg",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_Registar.png",
  },
  {
    label: "Bursar/Payments", 
    title: "Office of the Bursar",
    content: "The Bursar's Office provides numerous ways to pay each semester's tuition and fees. At the Bursar's office you can: <br> <br>• Make a payment <br>• Setup a payment plan <br>• Find out about refunds <br>• Find your payment due dates <br>• Get help understanding your eBill <br><br> <strong> Hours of Operation </strong> <br> Monday to Thursday: 8 am to 5 pm <br> Friday: 7:30 am to 4 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sellersburg-bursar@ivytech.edu <br> Phone: (812) 955-5736 <br> Location: Pfau Hall - G7 <br> ",
    image: "assets/CampusResources/AcademicAdvising.jpg",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_AcademicAdvising.png",
  },
  { 
    label: "Tutoring", 
    title: "Ogle Commons and Sellersburg Tutoring",
    content: "Our campus offers free tutoring and library services that will help you to succeed in your courses. <br> <br> <strong> Our Ogle Learning Commons can also help you with: </strong> <br>• Conducting research using library services <br>• Using computer and internet applications <br>• Connecting to tutoring services <br>• Navigating MyIvy, IvyLearn, and Zoom <br>• Ordering print copies of textbooks <br>• Printing, scanning, and copying papers <br>•  Connecting to Ivy Tech student services <br><br><strong> Hours of Operation</strong> <br>Monday - Thursday: 9 am - 6 pm <br>Friday: 9 am - 12 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sellersburg-tutoring@ivytech.edu <br> Phone: (812) 955-5897 <br> Location: Pfau Hall - Ogle Learning Commons - G24",
    image: "assets/CampusResources/Tutoring.png",
    video: null,
    qr: null,
  },
  {
    label: "IvyCares", 
    title: "IvyCares",
    content: "Everyone needs a little help sometimes, and IvyCares is here to provide additional support to you throught your academic journey. <br><br><strong> Ivy Cares can help with: </strong> <br>• Student Emergency Aid Fund <br>• Food Access <br>• Loaner Laptops & Hotspots <br>• Transportation Resources <br>• Mental Health <br>• Childcare Vouchers  <br>• IvyAssist (Community Resources) <br><br> <strong> Hours of Operation </strong><br> Monday, Wednesday, Thursday: 8 am to 5 pm <br> Tuesday: 8 am to 6 pm <br>Friday: 9 am - 12 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sellersburg-ivycares@ivytech.edu <br> Phone: (812) 955-5892 <br> Location: Pfau Hall - B18",
    image: "assets/CampusResources/IvyCares.png",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_DisabilitySupport.png",
  },
  {
    label: "Disability Support", 
    title: "Disability Support Services",
    content: "As an Ivy Tech student, you have access to a wide variety of resources to meet your individual needs.  DSS works with students on a case-by-case basis to determine what accommodations meet their specific needs in accordance with the Americans with Disabilities Act.  Get started by contacting the DSS office on your home campus or completing an Accommodation Request Form. <br><br> <strong> Hours of Operation </strong><br> Monday, Wednesday, Thursday: 8 am to 5 pm <br> Tuesday: 8 am to 6 pm <br>Friday: 9 am - 12 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sellersburg-dss@ivytech.edu <br> Phone: (812) 955-5892 <br> Location: Pfau Hall - B18.",
    image: "assets/CampusResources/disabilitySupport.jpg",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_DisabilitySupport.png",
  },
  {
    label: "Financial Aid", 
    title: "Office of Financial Aid",
    content: "Financial aid is money to help pay for college or career school. <br><br> Financial aid includes: <br> • Scholarships <br> • Grants <br> • Loans <br> • Federal Work-Study <br><br> <strong> Hours of Operation </strong><br> Monday, Wednesday, Thursday: 8 am to 5 pm <br> Tuesday: 8 am to 6 pm <br>Friday: 9 am - 12 pm <br> <br> <strong> Contact Us</strong>  <br> Email: sellersburg-finaid@ivytech.edu <br> Phone: (812) 955-5820 <br> Location: Pfau Hall - A2",
    image: "assets/CampusResources/FinancialAid.jpg",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_FinancialAid.png",
  },
  {
    label: "Career Link", 
    title: "Ivy+ Career Link",
    content: "Career Link is a team that provides transformative career development services for Ivy Tech students and alumni as well as a variety of talent connection opportunities and employee training for employers. <br><br> <strong> The Career Link Team can help you with :</strong> <br>•  Personalized career coaching <br>• Student work-and-learn experiences <br> • Finding a job <br> • Creating a Career Development Portfolio <br><br> <strong> Hours of Operation </strong> <br> Monday to Thursday: 8 am to 5 pm <br> Friday: 7:30 am to 4 pm <br> <br> <strong> Contact Us</strong>  <br> Email:  shammond25@ivytech.edu OR tcamplit@ivytech.edu <br> Phone: (930) 228-3653 <br> Location: Pfau Hall <br> ",
    image: "assets/CampusResources/CareerLink.png",
    video: null,
    qr: "assets/QR-Codes/CampusResources/QR_CareerLink.png",
  },  
  {
    label: "More Resources", 
    title: "More Resources | Video Example ",
    image: null,
    video: "videos/video_1.mp4",
    qr: null,
    
  },
  
];


/* =========================================================
   4. PROGRAMS
   ========================================================= */

const ProgramFields = [
  {
    label: "School of Advanced Manufacturing, Engineering and Applied Science ",
    programs: [
      {
        label: "Advanced Automation & Robotics Technology",
        title: "Advanced Automation & Robotics Technology",
        content: "Advanced manufacturing helps build our modern world. Learn to program robotics and work with equipment like hydraulics. <br><br> Associate Degree: 4-5 semesters <br> Certificates (2): 3-5 semesters <br> Workforce Certifications (6): 0.5-3 semesters  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/automationmanufacturing.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Advanced_Manufacturing/QR_AdvancedAutomation.png",
      },
      {
        label: "Automotive Technology",
        title: "Automotive Technology",
        content: " From EVs to self-driving cars, few industries are moving as fast as automotive. Be ready with training in today's high-tech vehicles. <br><br> Associate Degrees (3): 5 semesters <br> Certificates (8): 2-3 semesters <br><br>",
        image: "assets/ProgramResources/Automotive/AutoMotiveTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Automotive/QR_automotivetechnology.png",
      },
      {
        label: "Design Technology",
        title: "Design Technology",
        content: "From EVs to self-driving cars, few industries are moving as fast as automotive. Be ready with training in today's high-tech vehicles. <br><br> Associate Degrees (3): 5 semesters <br> Certificates (8): 2-3 semesters <br><br>",
        image: "assets/ProgramResources/Advanced_Manufacturing/DesignTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Heating, Ventilation, & Air Conditioning Technology (HVAC)",
        title: "Heating, Ventilation, & Air Conditioning Technology (HVAC)",
        content: "Train with actual furnace and AC equipment while also learning about new technologies like solar, geothermal, and HVAC automation.  <br><br> Associate Degree: 4 semesters <br> Certificates (3): 2-3 semesters <br> Workforce Certifications (2): 0.5 semesters <br>",
        image: "assets/ProgramResources/Construction/HVAC.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Construction/QR_HVAC.png",
      },
      {
        label: "Industrial Technology",
        title: "Industrial Technology",
        content: "Manufacturers need technicians who understand modern machines. Train for career fields like repair technician, welder, or machinist. <br><br> Associate Degree: 5 semesters <br> Certificates (14): 1-3 semesters <br> Workforce Certifications (9): 0.5-1 semesters <br><br> ",
        image: "assets/ProgramResources/Advanced_Manufacturing/IndustrialTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Advanced_Manufacturing/QR_IndustrialTechnology.png",
      },
      /*
     {
        label: "Machine Tool Technology",
        title: "Machine Tool Technology",
        content: "There is high demand for skills in precision machining. Certificate paths include manual machining or computer-based CNC machining. <br><br> Associate Degree: 4 semesters <br> Certificates (5): 1-3 semesters <br><br>",
        image: "assets/ProgramResources/Advanced_Manufacturing/MachineToolTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Advanced_Manufacturing/QR_MachineToolTechnology.png",
      },
      */
     {
        label: "Manufacturing Production & Operations",
        title: "Manufacturing Production & Operations",
        content: "Online degree program designed to lead to roles as technicians, operators, and managers on the modern manufacturing plant floor. <br><br> Associate Degree: 4 semesters <br> Certificate: 2-3 semesters <br><br>  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/ManufacturingProductionOperations.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Advanced_Manufacturing/QR_ManufacturingProduction.png",
      },
     {
        label: "Smart Manufacturing & Digital Integration",
        title: "Smart Manufacturing & Digital Integration",
        content: "Combines skills from the world of IT, engineering, operations, and informatics to develop systems that improve manufacturing efficiency. <br><br>  Associate Degree: 5 semesters <br> Certificates (2): 2-3 semesters. ",
        image: "assets/ProgramResources/Advanced_Manufacturing/SmartManufacturingDigitalIntegration.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Advanced_Manufacturing/QR_SmartManufacturing.png",
      },  
      /*
      {
        label: "Agriculture",
        title: "Agriculture",
        content: "Prepare for a real-world agriculture career. Includes partnerships with Case IH, John Deere, NRCS, Co-Alliance, Corteva and others. <br><br>  Associate Degrees (2): 4 semesters <br> Certificates (11): 1-2 semesters <br><br>",
        image: "assets/ProgramResources/Agriculture/Agriculture.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Agriculture/QR_Agriculture.png",
      },
     
      {
        label: "Precision Agriculture Equipment Technology",
        title: "Precision Agriculture Equipment Technology",
        content: "Farm equipment is advancing rapidly, with GPS and mapping software. Discover agriculture’s future in labs with the newest on-board tech.  <br><br> Associate Degree: 5 semesters <br> Certificates (5): 1-3 semesters <br><br> ",
        image: "assets/ProgramResources/Agriculture/PrecisionAgricultureEquipmentTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Agriculture/QR_PrecisionAgriculture.png",
      },
      {
        label: "Diesel Technology",
        title: "Diesel Technology",
        content: " Learn how to maintain high-tech engine systems that rely on advanced computer electronics to comply with strict emission standards. <br><br> Associate Degree: 6-8 semesters <br> Certificates (4): 2-4 semesters <br><br>",
        image: "assets/ProgramResources/Automotive/DieselTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Automotive/QR_DieselTechnology.png",
      },
     {
        label: "Aviation Maintenance Technology",
        title: "Aviation Maintenance Technology",
        content: " Go wheels up on a great career with FAA-certified skills needed to perform maintenance, inspection, and repair of civilian aircraft. <br><br> Associate Degrees (3): 1-4 semesters <br> Certificate: 1 semesters <br><br>",
        image: "assets/ProgramResources/Aviation/AviationMaintenanceTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Aviation/QR_AviationMaintenance.png",
      },
      {
        label: "Aviation Technology — Flight",
        title: "Aviation Technology — Flight",
        content: "Prepare for a career in the cockpit with FAA-approved training that includes flight instructor ratings, aviation weather, and more. <br><br> Associate Degree: 4 semesters <br> Certificate: 2 semesters ",
        image: "assets/ProgramResources/Aviation/AviationTechnologyFlight.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Aviation/QR_AviationTechnologyFlight.png",
      },
      {
        label: "Aviation Technology Management",
        title: "Aviation Technology Management",
        content: "Get the background and skills to prepare for a career in aviation operations or management. Includes ground school and pilot training. <br><br> Associate Degree: 4 semesters <br>  Certificates (2): 1-3 semesters <br> ",
        image: "assets/ProgramResources/Aviation/AviationTechnologyManagement.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Aviation/QR_AviationTechnologyManagement.png",
      },

      {
        label: "Building Construction Management",
        title: "Building Construction Management",
        content: "Learn to deliver construction projects on time, on budget, and to the right standards. Internships available with industry partners.  <br><br> Associate Degrees (2): 5 semesters <br> Workforce Certifications (3): 1 semesters <br>",
        image: "assets/ProgramResources/Construction/BuildingConstructionManagement.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Construction/QR_BuildingConstructionManagement.png",
      },
      {
        label: "Building Construction Technology",
        title: "Building Construction Technology",
        content: "Nothing is more hands-on than construction. Get the carpentry, electrical, or management skills for a variety of building trades. <br><br> Associate Degree: 5 semesters <br> Certificates (8): 2-3 semesters <br> Workforce Certifications (2): 0.5-1 semesters <br>",
        image: "assets/ProgramResources/Construction/BuildingConstructionTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Construction/QR_BuildingConstructionTechnology.png",
      },
      {
        label: "Electrical Engineering Technology",
        title: "Electrical Engineering Technology",
        content: "Become a skilled technologist who can perform engineering tasks such as installing, maintaining, and troubleshooting electronic systems. <br><br> Associate Degree: 4-8 semesters <br>",
        image: "assets/ProgramResources/Engineering/ElectricalEngineeringTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Engineering/QR_ElectricalEngineeringTechnology.png",
      },
      {
        label: "Engineering",
        title: "Engineering",
        content: "A focus on math and science gives you the foundation toward further study in mechanical, civil, electrical, or other engineering. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2-3 semesters <br>",
        image: "assets/ProgramResources/Engineering/Engineering.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Engineering/QR_Engineering.png",
      },
      {
        label: "Engineering Technology",
        title: "Engineering Technology",
        content: "Often working with engineers, engineering technicians have responsibilities that can include project development, planning, and testing.  <br><br> Associate Degree: 4 semesters <br>",
        image: "assets/ProgramResources/Engineering/EngineeringTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Engineering/QR_EngineeringTechnology.png",
      },
      {
        label: "Mechanical Engineering Technology",
        title: "Mechanical Engineering Technology",
        content: "Get skills that can lead to careers related to mechanical engineering, including product design, drafting, manufacturing, and testing.  <br><br> Associate Degree: 4 semesters  <br>",
        image: "assets/ProgramResources/Engineering/MechanicalEngineeringTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Engineering/QR_MechanicalEngineeringTechnology.png",
      },
      {
        label: "Biotechnology",
        title: "Biotechnology",
        content: "Biotechnology uses living cells to develop products, leading to careers that include research, pharmaceuticals, genomics, and others.  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (4): 2-3 semesters <br>",
        image: "assets/ProgramResources/Science/BioTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_Biotechnology.png",  
      },
      {
        label: "Energy Technology",
        title: "Energy Technology",
        content: "Get ready for the green energy future with skills in wind and solar power systems. Industry partners include Vectren, Siemens, and GE.  <br><br>  Associate Degree: 4 semesters <br> Certificates (5): 3 semesters <br> Workforce Certification: 1 semesters<br>",
        image: "assets/ProgramResources/Science/EnergyTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_EnergyTechnology.png",  
      },

      {
        label: "Veterinary Nursing",
        title: "Veterinary Nursing",
        content: "An ideal environment to develop as a skilled veterinary technician, emphasizing professionalism and expertise. Gain hands-on experience through externships and partnerships with leading veterinary institutions across Indiana, ensuring a comprehensive education that prepares you for success in the field.  <br><br> Associate Degree: 4-5 semesters <br> Certificate: 2 semesters <br>",
        image: "assets/ProgramResources/Science/VeterinaryNursing.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_Veterinary.png",  
      },
      */
    ]
  },
  

    {
    label: "School of Business, Logistics and Supply Chain",
    programs: [
      {
        label: "Accounting",
        title: "Accounting",
        content: " Gain real-world accounting experience with software such as QuickBooks and Sage 50, while also partnering with CPA firms across the state. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (3): 1-2 semesters <br> ",
        image: "assets/ProgramResources/Business/Accounting.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Business/QR_Accounting.png",
      },
      {
        label: "Business Administration",
        title: "Business Administration",
        content: "Learn principles that build a background for success in business, including the creation of marketing plans, budgets, and case studies.  <br><br> Associate Degrees (6): 4-6 semesters <br> Certificates (7): 1-3 semesters <br> ",
        image: "assets/ProgramResources/Business/BusinessAdministration.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Business/QR_BusinessAdministration.png",
      },
      {
        label: "Office Administration and Technology (OTEC)",
        title: "Office Administration and Technology (OTEC)",
        content: " Prepare for a career as an administrative professional, helping all types of office environments, such as legal, medical, and others.  <br><br> Associate Degree: 4 semesters <br> Certificates (2): 1-2 semesters <br> ",
        image: "assets/ProgramResources/Business/OfficeAdministrationTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Business/QR_OfficeAdministration.png",
      },
      {
        label: "Supply Chain Management",
        title: "Supply Chain Management",
        content: " Get your supply chain management career going by studying the technologies and systems used to track goods efficiently and keep the economy moving. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (6): 1-3 semesters <br>",
        image: "assets/ProgramResources/Business/SupplyChainManagement.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Business/QR_SupplyChainManagement.png",
      },
      {
        label: "Visual Communications",
        title: "Visual Communications",
        content: "Careers in media and marketing begin with skills in visual communications. Here students learn both the technical and aesthetic aspects.  <br><br> Associate Degrees (3): 4 semesters <br> Certificates (4): 1-2 semesters <br>",
        image: "assets/ProgramResources/ArtDesign/VisualCommunications.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/ArtDesign/QR_VisualCommunications.png",
      },
    ]
  },


  {
    label: "School of Infomation Technology",
    programs: [
      {
        label: "Applied Artificial Intelligence",
        title: "Applied Artificial Intelligence",
        content: " Learn how to build and apply artificial intelligence solutions that automate tasks, analyze data, and solve real-world problems.  <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/IT/AI.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_AppliedArtificialIntelligence.png",
      },

      {
        label: "Cloud Technologies",
        title: "Cloud Technologies",
        content: "Get skills in essential Internet-based software and services, including platforms such as Amazon Web Services and Microsoft Azure.  <br><br> Associate Degree: 4 semesters <br> Certificates (3): 2-3 semesters <br>",
        image: "assets/ProgramResources/IT/CloudTechnologies.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_CloudTechnologies.png",
      },

      {
        label: "Computer Science",
        title: "Computer Science",
        content: "Learn essentials of extracting information from data, using tools such as data mining, statistical analysis, and business analytics. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/IT/ComputerScience.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_ComputerScience.png",
      },
      
      {
        label: "Cybersecurity / Information Assurance",
        title: "Cybersecurity / Information Assurance",
        content: " This nationally recognized program helps students learn how to effectively secure computers, networks, and critical infrastructure.  <br><br> Associate Degrees (3): 2-4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/IT/CyberSecurity.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_Cybersecurity.png",
      },

      {
        label: "Data Analytics",
        title: "Data Analytics",
        content: "This computer-focused electronics program leans into automated systems, offering background in networking and digital communications.  <br><br> Associate Degree: 4-8 semesters <br> Certificates (3): 2-4 semesters <br>",
        image: "assets/ProgramResources/IT/DataAnalytics.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_DataAnalytics.png",
      },
      
      {
        label: "Informatics",
        title: "Informatics",
        content: "Learn how people and technology interact so you can develop skills to make tomorrow's computers and software more useful. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/IT/Informatics.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_Informatics.png",
      },
      
      {
        label: "Information Technology Support",
        title: "Information Technology Support",
        content: "Prepare for a career in the IT field with knowledge and skills needed to build and maintain computing systems and technology. <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2-3 semesters <br>",
        image: "assets/ProgramResources/IT/InformationTechnologySupport.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_InformationTechnologySupport.png",
      },

      {
        label: "Network Infrastructure",
        title: "Network Infrastructure",
        content: "Get the industry-standard hardware and software skills needed to master computer networks, the nerve center of our digital world.  <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/IT/NetworkInfrastructure.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_NetworkInfrastructure.png",
      },
      
      {
        label: "Software Development",
        title: "Software Development",
        content: "Learn to develop, test, and maintain software by gaining a foundation in programming, web development, and application development.  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (4): 2-3 semesters <br>",
        image: "assets/ProgramResources/IT/SoftwareDev.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/IT/QR_SoftwareDevelopment.png",
      },

      {
        label: "Meet your Professors!", 
        title: "IT Professors",
        image: "assets/campusResource_ITProf.png",
        video: null,
        qr: null,
      },
      
    ]
  },
 
  {
    label: "School of Arts, Sciences and Education",
    programs: [
            {
        label: "Biology",
        title: "Biology",
        content: "Biology is the study of life itself–and your first step to a career in medicine, pharmacology, agriculture, research, and many others.  <br><br> Associate Degree: 4 semesters <br>",
        image: "assets/ProgramResources/Science/Biology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_Biology.png",  
      },
      {
        label: "Chemistry",
        title: "Chemistry",
        content: "Your formula for earning skills in organic and physical chemistry, atomic structure, and more before transferring to a 4-year school.  <br><br> Associate Degree: 4 semesters  <br>",
        image: "assets/ProgramResources/Science/Chemistry.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_Chemistry.png",  
      },
      {
        label: "Education - Early Childhood",
        title: "Education - Early Childhood",
        content: "Discover essentials of childhood development and growth in a variety of settings, such as traditional classrooms and on-campus labs. <br><br> Associate Degrees (2): 4 semesters <br> Certificates (7): 1-4 semesters <br>",
        image: "assets/ProgramResources/Education/EducationEarlyChildhood.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Education/QR_EducationEarlyChildhood.png",
      },
      {
        label: "Education - Elementary & Special",
        title: "Education - Elementary & Special",
        content: "From lesson plans to community engagement, future teachers learn to teach in a variety of authentic classroom and school settings.  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/Education/EducationElementarySpecial.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Education/QR_EducationElementarySpecial.png",
      },
      {
        label: "Education - Secondary",
        title: "Education - Secondary",
        content: "This program can lead to a teaching degree in biology, chemistry, or mathematics, areas where qualified teachers are sorely needed. <br><br> Associate Degrees (5): 4 semesters <br> Certificates (3): 1-2 semesters <br>",
        image: "assets/ProgramResources/Education/EducationSecondary.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Education/QR_EducationSecondary.png",
      },
      
     {
        label: "General Studies",
        title: "General Studies",
        content: " Get broad exposure to a solid core of courses largely transferable to 4-year institutions as required for a bachelor's degree.  <br><br> Associate Degree: 4 semesters ",
        image: "assets/ProgramResources/GeneralStudies/GeneralStudies.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/GeneralStudies/QR_GeneralStudies.png",
      },
      {
        label: "Indiana College Core",
        title: "Indiana College Core",
        content: "Fulfills core requirements equivalent to your first year of college so you can start as a sophomore at any Indiana 4-year institution.  <br><br> Certificate: 2-4 semesters",
        image: "assets/ProgramResources/GeneralStudies/IndianaCollegeCore.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/GeneralStudies/QR_IndianaCollegeCore.png",
      },
      {
        label: "Liberal Arts",
        title: "Liberal Arts",
        content: "Explore personal and academic growth in areas from critical thinking to creative expression as you build toward a bachelor’s degree. <br><br> Associate Degrees (2): 4 semesters ",
        image: "assets/ProgramResources/GeneralStudies/LiberalArts.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/GeneralStudies/QR_LiberalArts.png",
      },
      {
        label: "Psychology",
        title: "Psychology",
        content: " Psychology is the study of behavior, a highly valuable career skill. Studies include human sexuality and theories of personality.  <br><br> Associate Degree: 4 semesters <br>",
        image: "assets/ProgramResources/SocialServices/Psychology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/SocialServices/QR_Psychology.png",  
      },

    ]
  },


  {
    label: "Garatoni School of Entrepreneurship & Innovation",
    programs: [
      {
        label: "Entrepreneurship",
        title: "Entrepreneurship",
        content: "Get a solid foundation for starting or growing a business, including mentoring and opportunities to pitch investors for funding.  <br><br> Associate Degree: 5 semesters <br> Certificates (2): 2-3 semesters ",
        image: "assets/ProgramResources/Entrepreneurship/Entrepreneurship.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Entrepreneurship/QR_Entrepreneurship.png",
      },
    ]
  },
  /* 
  {
    label: "Fine Arts & Design",
    programs: [
      {
        label: "Design Technology",
        title: "Design Technology",
        content: "Discover the basics of form and function, with electives leading to paths such as Mechanical Design, Computer Graphics and others.  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (6): 2 semesters<br>",
        image: "assets/ProgramResources/ArtDesign/DesignTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/ArtDesign/QR_DesignTechnology.png",
      },
      {
        label: "Fine Arts",
        title: "Fine Arts",
        content: "  Discover your artistic voice and build a portfolio as you master what it takes to begin in your field or move on to a 4-year degree. <br><br> Associate Degree: 4 semesters  <br>",
        image: "assets/ProgramResources/ArtDesign/FineArts.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/ArtDesign/QR_FineArts.png",
      },
      {
        label: "Interior Design",
        title: "Interior Design",
        content: "Learn the principles of designing interior spaces and environments as you build your portfolio and intern with professionals.  <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2-3 semesters <br>",
        image: "assets/ProgramResources/ArtDesign/InteriorDesign.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/ArtDesign/QR_InteriorDesign.png",
      },

    ]
    },
    */ 
  
    {
    label: "School of Health Sciences",
    programs: [
      {
        label: "Dental Assisting",
        title: "Dental Assisting",
        content: " Taught by instructors experienced in the field, you’ll learn skills involving radiography, dental materials, and general dentistry.  <br><br> Associate Degree: 4-5 semesters <br> Certificate: 3-4 semesters <br>",
        image: "assets/ProgramResources/Healthcare/DentalAssisting.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_DentalAssisting.png",      
      },
      {
        label: "Dental Hygiene",
        title: "Dental Hygiene",
        content: "Learn in a true clinical environment, treating a wide variety of patients while using the most current technology in dental care. Small class sizes allow for more one-on-one interaction with faculty.  <br><br> Associate Degree: 5 semesters <br>",
        image: "assets/ProgramResources/Healthcare/DentalHygiene.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_DentalHygiene.png",   
      },
      {
        label: "Diagnostic Medical Sonography",
        title: "Diagnostic Medical Sonography",
        content: "  Help create the ultrasonic images that diagnose illness. Choose from among three degree pathways: cardiac, vascular, or general.  <br><br> Associate Degrees (3): 4 semesters  <br>",
        image: "assets/ProgramResources/Healthcare/DiagnosticMedicalSonography.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_DiagnosticMedicalSonography.png",   
      },
      {
        label: "Health Information Technology",
        title: "Health Information Technology",
        content: "Efficient processing of health records helps improve quality of care. Graduates can work in hospitals, doctors’ offices, and clinics.  <br><br> Associate Degree: 4 semesters <br> Certificate: 2-3 semesters <br>",
        image: "assets/ProgramResources/Healthcare/HealthInformationTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_HealthcareSpecialist.png",   
      },

      {
        label: "Healthcare Specialist",
        title: "Healthcare Specialist",
        content: "  Start your healthcare career with clinical hands-on practice in certification options like Phlebotomy, Pharmacy Technician, and more.  <br><br> Associate Degree: 4 semesters <br> Certificates (10): 0.5-3 semesters <br>",
        image: "assets/ProgramResources/Healthcare/HealthcareSpecialist.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_HealthInformationTechnology.png",   
      },
      {
        label: "Medical Assisting",
        title: "Medical Assisting",
        content: " Be the link between healthcare providers and patients as you learn in a variety of settings, including labs and patient exam rooms.  <br> Associate Degree: 4 semesters <br> Certificates (5): 1-3 semesters <br>",
        image: "assets/ProgramResources/Healthcare/MedicalAssisting.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_MedicalAssisting.png",   
      },
      {
        label: "Medical Imaging",
        title: "Medical Imaging",
        content: "Discover the art and science of using X-ray, MRI, and CT imaging technology to assist physicians in diagnosing diseases and injuries.  <br><br> Associate Degree: 5 semesters <br> Certificates (3): 1-3 semesters <br>",
        image: "assets/ProgramResources/Healthcare/MedicalImaging.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_MedicalImaging.png",   
      },
      {
        label: "Medical Laboratory Technology",
        title: "Medical Laboratory Technology",
        content: "Tests and lab work are key to diagnosing patients. You’ll work with microscopes, chemistry analyzers, and other modern lab equipment.  <br><br> Associate Degree: 4 semesters <br>",
        image: "assets/ProgramResources/Healthcare/MedicalLaboratoryTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_MedicalLaboratoryTechnology.png",   
      },

      {
        label: "Occupational Therapy Assistant",
        title: "Occupational Therapy Assistant",
        content: "Students in the Occupational Therapy Assistant (OTA) program gain workforce-ready skills through a hybrid learning model that combines classroom, lab, online, and clinical instruction. The curriculum covers OTA foundations, patient care techniques, assistive technologies, and hands-on fieldwork, preparing graduates for a rewarding, in-demand career upon licensure.  <br><br> Associate Degree: 4-5 semesters <br>",
        image: "assets/ProgramResources/Healthcare/OccupationalTherapyAssistant.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_OccupationalTherapyAssistant.png",   
      },
      {
        label: "Paramedic Science",
        title: "Paramedic Science",
        content: "Help make a difference and change lives in a program that has EMS alumni currently working with some of the state’s best hospitals.  <br><br> Associate Degree: 4-6 semesters <br> Certificates (2): 1-4 semesters <br>",
        image: "assets/ProgramResources/Healthcare/ParamedicScience.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_ParamedicScience.png",   
      },
      {
        label: "Patient Care Technician",
        title: "Patient Care Technician",
        content: "Assist patients with day-to-day activities, take vital signs, collect specimens, and perform other diagnostic or treatment procedures.  <br><br> Certificates (2): 2-3 semesters <br>",
        image: "assets/ProgramResources/Healthcare/PatientCareTechnician.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_PatientCareTechnician.png",   
      },
      {
        label: "Physical Therapist Assistant",
        title: "Physical Therapist Assistant",
        content: "Prepares you for the fulfilling job of helping patients recover from illness or injury under the direction of a physical therapist.  <br><br> Associate Degree: 5 semesters <br>",
        image: "assets/ProgramResources/Healthcare/PhysicalTherapistAssistant.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_PhysicalTherapistAssistant.png",   
      },
      {
        label: "Radiation Therapy",
        title: "Radiation Therapy",
        content: "Learn essentials of the high-energy technology used to treat disease. Industry partners include cancer centers, hospitals, and clinics.  <br><br> Associate Degree: 5-6 semesters  <br>",
        image: "assets/ProgramResources/Healthcare/RadiationTherapy.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_RadiationTherapy.png",   
      },
      {
        label: "Respiratory Therapy",
        title: "Respiratory Therapy",
        content: "Help treat breathing disorders in patients ranging from infants to seniors, while working side-by-side with doctors, nurses and others.  <br><br>  Associate Degree: 7 semesters <br>",
        image: "assets/ProgramResources/Healthcare/RespiratoryTherapy.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_RespiratoryTherapy.png",   
      },
      {
        label: "Surgical Technology",
        title: "Surgical Technology",
        content: " Train in a real operating room to enter the workforce as a surgical assistant, in labor and delivery, or in central sterile supply.  <br><br> Associate Degree: 5 semesters <br> Certificate: 2 semesters <br>",
        image: "assets/ProgramResources/Healthcare/SurgicalTechnology.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_SurgicalTechnology.png",   
      },
      {
        label: "Therapeutic Massage",
        title: "Therapeutic Massage",
        content: "Ideal environment to become a skilled massage therapist, thanks to a student-run public clinic and field trips to clientele in need.  <br><br> Associate Degree: 4-5 semesters <br> Certificates (2): 3-4 semesters <br>",
        image: "assets/ProgramResources/Healthcare/TherapeuticMassage.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_TherapeuticMassage.png",   
      },
    ]
  },

  {
    label: "School of Culinary Arts and Hospitality Management",
    programs: [
      {
        label: "Culinary Arts / Hospitality Administration & Events",
        title: "Culinary Arts / Hospitality Administration & Events",
        content: "  Discover the skills behind the largest private sector industry in the US. Career choices include events manager, caterer, pastry chef, and others.  <br><br> Associate Degrees (4): 4 semesters <br> Certificates (11): 2-3 semesters <br> Workforce Certification<br>",
        image: "assets/ProgramResources/Culinary/CulinaryArts.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Culinary/QR_CulinaryArts.png",   
      },
    ]
  },

  {
    label: "School of Nursing",
    programs: [
    {
        label: "Nursing",
        title: "Nursing",
        content: " Work toward an LPN, ASN, or transfer as a junior. Learn to care for patients and qualify to work in hospitals, home health, and more. <br><br> Associate Degrees (2): 3-4 semesters <br> Certificate: 3 semesters",
        image: "assets/ProgramResources/Healthcare/Nursing.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Healthcare/QR_Nursing.png",   
      },
    ]
  },

  {
    label: "School of Public Affairs and Social Services",
    programs: [
      {
        label: "Criminal Justice",
        title: "Criminal Justice",
        content: "Learn from instructors with real-world experience in career fields like law enforcement, court services, security, and others.  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (5): 2 semesters <br>",
        image: "assets/ProgramResources/PublicSafety/CriminalJustice.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/PublicSafety/QR_CriminalJustice.png",  
      },
      {
        label: "Homeland Security / Public Safety",
        title: "Homeland Security / Public Safety",
        content: "Choose a career on the front lines of service. Occupations include firefighter, EMS, law enforcement, and transportation security.  <br><br> Associate Degrees (4): 5 semesters <br> Certificates (9): 2-3 semesters <br></strong>",
        image: "assets/ProgramResources/PublicSafety/HomelandSecurityPublicSafety.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/PublicSafety/QR_HomelandSecurity.png",  
      },
      {
        label: "Human Services",
        title: "Human Services",
        content: "Ready to help others? Here, students are trained to develop the skills, attitudes, and knowledge needed to work in social services.  <br><br> Associate Degrees (5): 4-5 semesters <br> Certificates (8): 1-3 semesters <br>",
        image: "assets/ProgramResources/SocialServices/HumanServices.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/SocialServices/QR_HumanServices.png",  
      },
      {
        label: "Legal and Paralegal Studies",
        title: "Legal and Paralegal Studies",
        content: "Are you looking for a meaningful career that empowers you to help others? Are you passionate about justice, equity, and equality?  <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br>",
        image: "assets/ProgramResources/Law/LegalParalegalStudies.jpg",
        video: null,
        qr: null,  
      },
      {
        label: "Mortuary Science",
        title: "Mortuary Science",
        content: "Gain expertise in all aspects of this essential career, including working with bereaved families, embalming, and restorative art. <br><br> Associate Degree: 5-6 semesters <br>",
        image: "assets/ProgramResources/Science/MortuaryScience.jpg",
        video: null,
        qr: "assets/QR-Codes/Programs/Science/QR_Mortuary.png",  
      },
    ]
  },

];
