

const CampusResources = [
  { 
    label: "Registrar", 
    title: "Office of the Registrar",
    content: "The Office of the Registrar performs a variety of functions at Ivy Tech Community College. At some time during your connection with Ivy Tech, you will probably have contact with the office due to the nature of its responsibilities. Some of the functions of the office are listed below. <br><br>• Changing your demographic information <br>• Credit Hours / Load / Enrollment Status <br>• Student Loan Deferment Requests and Insurance Reporting, <br>• Adding / Dropping Courses <br>• Grading / Improving a Grade  <br>• Grade Point Average (GPA) / Dean's List <br>• Transfer of Credit <br>• Graduation <br>• Transcripts  <br>• Family Education Rights & Privacy Act of 1974, as amended  <br>• Voter Registration ",
    image: null,
    video: null,
    qr: null,
  },
  { 
    label: "Tutoring", 
    title: "Ivy Tech<br> Offers free tutoring in the following subjects:",
    content: "",
    image: "/assets/_QR_tutor.png",
    video: null,
    qr: null,
  },
  {
    label: "Academic Advising", 
    title: "Academic Advising at Ivy Tech",
    content: "Academic advising serves to help students set and complete their programs and/or academic goals by building relationships within their student success network. Advising is a collaborative partnership where the student is the primary driver for success and their advisor serves as a navigator to support them through their educational journey. <br><br>Your academic advisor will be your guide as you determine which courses to take each semester. If your goal is to transfer to a four-year college or university, your advisor will help you with that too! <br><br> For more information, Scan the QR code!",
    image: "assets/CampusResources/AcademicAdvising.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Disability Services", 
    title: "Disability Support Services",
    content: "As an Ivy Tech student, you have access to a wide variety of resources to meet your individual needs.  If you have a disability, you’ll want to learn more about Disability Support Services (DSS) and how they can support you?  DSS works with students on a case-by-case basis to determine what accommodations meet their specific needs in accordance with the Americans with Disabilities Act. <br> In addition, to ensuring you receive the best possible learning accommodations, DSS serves as an advocate for students with disabilities.  Get started by contacting the DSS office on your home campus or completing an Accommodation Request Form. <br><br> For additional Questions Scan the QR code below.",
    image: "assets/CampusResources/disabilitySupport.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Financial Aid", 
    title: "Financial Aid",
    content: "Financial aid is money to help pay for college or career school. Whether your goal is finding a career after graduation or continuing on to a four-year university, getting financial aid can help you pay for college now and finish with little to no debt or a more manageable payment plan. Financial aid includes scholarships, grants, work-study, and loans—all of which help make college more affordable. <br> • Scholarships <br> • Grants <br> • Federal Work-Study <br> • Loans <br><br> For more information, Scan the QR code!  ",
    image: "assets/CampusResources/FinancialAid.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },
  {
    label: "Career Link", 
    title: "Career Link",
    content: "Career Link is a team that provides transformative career development services for Ivy Tech students and alumni as well as a variety of talent connection opportunities and employee training for employers. The pool of resources we offer connects students, employers, alumni, and communities. <br> By focusing on honing the employability skills of our students and the state's workers, we are working to meet the specific skills and training needs of employers in Indiana and neighboring states. ",
    image: "assets/CampusResources/Career.jpg",
    video: null,
    qr: "assets/CampusResources/QR_AcademicAdvising.jpg",
  },  
  {
    label: "IT professors", 
    title: "IT Professors",
    image: "assets/campusResource_ITProf.png",
    video: null,
    qr: null,
  },

  {
    label: "Video Example", 
    title: "Video Example",
    image: null,
    video: "videos/video_1.mp4",
    qr: null,
  }
];


/* =========================================================
   4. PROGRAMS
   ========================================================= */

/* 
    label: "Advanced Manufacturing",
    programs: [
      {
        label: "Industrial Technology",
        title: "Industrial Technology",
        content: "Trains students to install, maintain, and troubleshoot automated manufacturing equipment. <br><br><b>Salary range:</b> $42,000 – $60,000 <br><b>Duration:</b> 2-year Associate Degree",
        image: "assets/ProgramsResources/automationmanufacturing.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Welding Technology",
        title: "Welding Technology",
        content: "Hands-on training in MIG, TIG, and stick welding for manufacturing and construction trades. <br><br><b>Salary range:</b> $38,000 – $55,000 <br><b>Duration:</b> 1-year Certificate or 2-year Associate Degree",
        image: "assets/ProgramsResources/Nursing.jpg",
        video: null,
        qr: null,
      }
    ]
  },


*/ 


const ProgramFields = [
  {
    label: "Advanced Manufacturing",
    programs: [
      {
        label: "Advanced Automation & Robotics Technology",
        title: "• Advanced Automation & Robotics Technology",
        content: "Advanced manufacturing helps build our modern world. Learn to program robotics and work with equipment like hydraulics. <br><br> Classes at 24 Indiana Locations <br><br> Associate Degree: 4-5 semesters <br> Certificates (2): 3-5 semesters <br> Workforce Certifications (6): 0.5-3 semesters <br><br> <strong>$68,591 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/automationmanufacturing.jpg",
        video: null,
        qr: null,
      },
     
      {
        label: "Industrial Technology",
        title: "Industrial Technology",
        content: "Manufacturers need technicians who understand modern machines. Train for career fields like repair technician, welder, or machinist. <br><br> Classes at 35 Indiana Locations <br><br>  Associate Degree: 5 semesters <br> Certificates (14): 1-3 semesters <br> Workforce Certifications (9): 0.5-1 semesters <br><br> <strong>$63,910 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/IndustrialTechnology.jpg",
        video: null,
        qr: null,
      },
     {
        label: "Machine Tool Technology",
        title: "Machine Tool Technology",
        content: "There is high demand for skills in precision machining. Certificate paths include manual machining or computer-based CNC machining. <br><br> Classes at 17 Indiana Locations <br><br>  Associate Degree: 4 semesters <br> Certificates (5): 1-3 semesters <br><br> <strong>$60,908 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/MachineToolTechnology.jpg",
        video: null,
        qr: null,
      },
     {
        label: "Manufacturing Production & Operations",
        title: "Manufacturing Production & Operations",
        content: "Online degree program designed to lead to roles as technicians, operators, and managers on the modern manufacturing plant floor. <br><br> Classes at 35 Indiana Locations <br><br>  Associate Degree: 4 semesters <br> Certificate: 2-3 semesters <br><br> <strong>$77,361 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Advanced_Manufacturing/ManufacturingProductionOperations.jpg",
        video: null,
        qr: null,
      },
     {
        label: "Smart Manufacturing & Digital Integration",
        title: "Smart Manufacturing & Digital Integration",
        content: "Combines skills from the world of IT, engineering, operations, and informatics to develop systems that improve manufacturing efficiency. <br><br> Classes at 19 Indiana Locations <br><br>  Associate Degree: 5 semesters <br> Certificates (2): 2-3 semesters. <br><br> <strong>$80,881 <br> Median Salary. </strong>    ",
        image: "assets/ProgramResources/Advanced_Manufacturing/SmartManufacturingDigitalIntegration.jpg",
        video: null,
        qr: null,
      },  
    ]
  },

  {
    label: "Agriculture",
    programs: [
      {
        label: "Agriculture",
        title: "Agriculture",
        content: "Prepare for a real-world agriculture career. Includes partnerships with Case IH, John Deere, NRCS, Co-Alliance, Corteva and others. <br><br> Classes at 11 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (11): 1-2 semesters <br><br> <strong>$39,344 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Agriculture/Agriculture.jpg",
        video: null,
        qr: null,
      },
     
      {
        label: "Precision Agriculture Equipment Technology",
        title: "Precision Agriculture Equipment Technology",
        content: "Farm equipment is advancing rapidly, with GPS and mapping software. Discover agriculture’s future in labs with the newest on-board tech.  <br><br> Classes at 4 Indiana Locations  <br><br>  Associate Degree: 5 semesters <br> Certificates (5): 1-3 semesters <br><br>  <strong>$49,567 <br> Median Salary. </strong> ",
        image: "assets/ProgramResources/Agriculture/PrecisionAgricultureEquipmentTechnology.jpg",
        video: null,
        qr: null,
      },

    ]
  },



  
  {
    label: "Automotive",
    programs: [
      {
        label: "Automotive Technology",
        title: "Automotive Technology",
        content: " From EVs to self-driving cars, few industries are moving as fast as automotive. Be ready with training in today's high-tech vehicles. <br><br> Classes at 11 Indiana Locations <br><br>  Associate Degrees (3): 5 semesters <br> Certificates (8): 2-3 semesters <br><br>  <strong>$54,536 <br> Median Salary. </strong>  ",
        image: "assets/ProgramResources/Automotive/AutoMotiveTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Diesel Technology",
        title: "Diesel Technology",
        content: " Learn how to maintain high-tech engine systems that rely on advanced computer electronics to comply with strict emission standards. <br><br> Classes at 6 Indiana Locations <br><br>  Associate Degree: 6-8 semesters <br> Certificates (4): 2-4 semesters <br><br> <strong>$41,795 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Automotive/DieselTechnology.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  

    {
    label: "Aviation",
    programs: [
      {
        label: "Aviation Maintenance Technology",
        title: "Aviation Maintenance Technology",
        content: " Go wheels up on a great career with FAA-certified skills needed to perform maintenance, inspection, and repair of civilian aircraft. <br><br>Classes at 1 Indiana Locations <br><br>  Associate Degrees (3): 1-4 semesters <br> Certificate: 1 semesters <br><br> <strong>$89,746 <br> Median Salary. </strong> ",
        image: "assets/ProgramResources/Aviation/AviationMaintenanceTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Aviation Technology — Flight",
        title: "Aviation Technology — Flight",
        content: "Prepare for a career in the cockpit with FAA-approved training that includes flight instructor ratings, aviation weather, and more. <br><br> Classes at 1 Indiana Locations <br>  Associate Degree: 4 semesters <br> Certificate: 2 semesters <strong>$112,453 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Aviation/AviationTechnologyFlight.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Aviation Technology Management",
        title: "Aviation Technology Management",
        content: "Get the background and skills to prepare for a career in aviation operations or management. Includes ground school and pilot training. <br><br> Classes at 1 Indiana Locations <br><br>  Associate Degree: 4 semesters <br>  Certificates (2): 1-3 semesters <br> <strong>$51,972 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Aviation/AviationTechnologyManagement.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  


    {
    label: "Business",
    programs: [
      {
        label: "Accounting",
        title: "Accounting",
        content: " Gain real-world accounting experience with software such as QuickBooks and Sage 50, while also partnering with CPA firms across the state. <br><br> Classes at 23 Indiana Locations <br><br>  Associate Degrees (2): 4 semesters <br> Certificates (3): 1-2 semesters <br><strong>$69,771 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Business/Accounting.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Business Administration",
        title: "Business Administration",
        content: "Learn principles that build a background for success in business, including the creation of marketing plans, budgets, and case studies.  <br><br> Classes at 38 Indiana Locations <br><br> Associate Degrees (6): 4-6 semesters <br> Certificates (7): 1-3 semesters <br><strong>$70,269 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Business/BusinessAdministration.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Office Administration and Technology (OTEC)",
        title: "Office Administration and Technology (OTEC)",
        content: " Prepare for a career as an administrative professional, helping all types of office environments, such as legal, medical, and others.  <br><br> Classes at 25 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (2): 1-2 semesters <br><strong>$56,791 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Business/OfficeAdministrationTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Professional Communication",
        title: "Professional Communication",
        content: "Get started on the path to Executive Assistant, Writer, or another communications career with skills for effective message delivery.  <br><br>  Classes at 17 Indiana Locations <br><br> Associate Degree: 4 semesters <br>  Certificate: 2 semesters <br><strong>$89,287 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Business/ProfessionalCommunication.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Supply Chain Management",
        title: "Supply Chain Management",
        content: " Get your supply chain management career going by studying the technologies and systems used to track goods efficiently and keep the economy moving. <br><br> Classes at 28 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (6): 1-3 semesters <br><strong>$62,315 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Business/SupplyChainManagement.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
  {
    label: "Computers & Information Technology",
    programs: [
      {
        label: "Applied Artificial Intelligence",
        title: "Applied Artificial Intelligence",
        content: " Learn how to build and apply artificial intelligence solutions that automate tasks, analyze data, and solve real-world problems.  <br><br> Classes at 23 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2 semesters <br><strong>$134,000 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/AI.jpg",
        video: null,
        qr: null,
      },
          {
        label: "Cloud Technologies",
        title: "Cloud Technologies",
        content: "Get skills in essential Internet-based software and services, including platforms such as Amazon Web Services and Microsoft Azure.  <br><br> Classes at 19 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (3): 2-3 semesters <br><strong>$86,938 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/CloudTechnologies.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Computer Science",
        title: "Computer Science",
        content: "Learn essentials of extracting information from data, using tools such as data mining, statistical analysis, and business analytics. <br><br> Classes at 6 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br><strong>$97,618 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/ComputerScience.jpg",
        video: null,
        qr: null,
      },
      
            {
        label: "Cybersecurity / Information Assurance",
        title: "Cybersecurity / Information Assurance",
        content: " This nationally recognized program helps students learn how to effectively secure computers, networks, and critical infrastructure.  <br><br> Classes at 17 Indiana Locations <br><br> Associate Degrees (3): 2-4 semesters <br> Certificates (2): 2 semesters <br><strong>$94,810 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/CyberSecurity.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Data Analytics",
        title: "Data Analytics",
        content: "This computer-focused electronics program leans into automated systems, offering background in networking and digital communications.  <br><br> Classes at 7 Indiana Locations <br><br> Associate Degree: 4-8 semesters <br> Certificates (3): 2-4 semesters <br><strong>$97,618 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/DataAnalytics.jpg",
        video: null,
        qr: null,
      },
      
            {
        label: "Electronics & Computer Technology",
        title: "Electronics & Computer Technology",
        content: "This computer-focused electronics program leans into automated systems, offering background in networking and digital communications.  <br><br> Classes at 7 Indiana Locations <br><br> Associate Degree: 4-8 semesters <br> Certificates (3): 2-4 semesters <br><strong>78,742 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/ElectronicsComputerTechnology.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Informatics",
        title: "Informatics",
        content: "Learn how people and technology interact so you can develop skills to make tomorrow's computers and software more useful.  Classes at 24 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br><strong>$89,868 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/Informatics.jpg",
        video: null,
        qr: null,
      },
      
            {
        label: "Information Technology Support",
        title: "Information Technology Support",
        content: "Prepare for a career in the IT field with knowledge and skills needed to build and maintain computing systems and technology. <br><br> Classes at 23 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2-3 semesters <br><strong>$84,932 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/InformationTechnologySupport.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Network Infrastructure",
        title: "Network Infrastructure",
        content: "Get the industry-standard hardware and software skills needed to master computer networks, the nerve center of our digital world.  <br><br> Classes at 12 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2 semesters <br><strong>$84,586 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/NetworkInfrastructure.jpg",
        video: null,
        qr: null,
      },
      
      {
        label: "Software Development",
        title: "Software Development",
        content: "Learn to develop, test, and maintain software by gaining a foundation in programming, web development, and application development.  <br><br> Classes at 30 Indiana Locations <br><br>  Associate Degrees (2): 4 semesters <br> Certificates (4): 2-3 semesters <br><strong>$96,741 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/IT/SoftwareDev.jpg",
        video: null,
        qr: null,
      },
      
    ]
  },



  
  {
    label: "Construction",
    programs: [
      {
        label: "Building Construction Management",
        title: "Building Construction Management",
        content: "Learn to deliver construction projects on time, on budget, and to the right standards. Internships available with industry partners.  <br><br> Classes at 5 Indiana Locations <br><br> Associate Degrees (2): 5 semesters <br> Workforce Certifications (3): 1 semesters <br><strong>$58,033 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Construction/BuildingConstructionManagement.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Building Construction Technology",
        title: "Building Construction Technology",
        content: "Nothing is more hands-on than construction. Get the carpentry, electrical, or management skills for a variety of building trades. <br><br> Classes at 12 Indiana Locations <br><br> Associate Degree: 5 semesters <br> Certificates (8): 2-3 semesters <br> Workforce Certifications (2): 0.5-1 semesters <br><strong>$58,033 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Construction/BuildingConstructionTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Heating, Ventilation, & Air Conditioning Technology (HVAC)",
        title: "Heating, Ventilation, & Air Conditioning Technology (HVAC)",
        content: " Train with actual furnace and AC equipment while also learning about new technologies like solar, geothermal, and HVAC automation.  <br><br>  Classes at 14 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (3): 2-3 semesters <br> Workforce Certifications (2): 0.5 semesters <br><strong>$67,080 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Construction/HVAC.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
    {
    label: "Education",
    programs: [
      {
        label: "Education - Early Childhood",
        title: "Education - Early Childhood",
        content: "Discover essentials of childhood development and growth in a variety of settings, such as traditional classrooms and on-campus labs. <br><br> Classes at 23 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (7): 1-4 semesters <br><strong>$40,343 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Education/EducationEarlyChildhood.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Education - Elementary & Special",
        title: "Education - Elementary & Special",
        content: "From lesson plans to community engagement, future teachers learn to teach in a variety of authentic classroom and school settings.  <br><br> Classes at 24 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2 semesters <br><strong>$51,217 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Education/EducationElementarySpecial.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Education - Secondary",
        title: "Education - Secondary",
        content: "This program can lead to a teaching degree in biology, chemistry, or mathematics, areas where qualified teachers are sorely needed. <br><br> Classes at 18 Indiana Locations <br><br> Associate Degrees (5): 4 semesters <br> Certificates (3): 1-2 semesters <br><strong>$45,140 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Education/EducationSecondary.jpg",
        video: null,
        qr: null,
      },
    ]
  },

    {
    label: "Engineering",
    programs: [
      {
        label: "Electrical Engineering Technology",
        title: "Electrical Engineering Technology",
        content: "Become a skilled technologist who can perform engineering tasks such as installing, maintaining, and troubleshooting electronic systems. <br><br> Classes at 6 Indiana Locations <br> Associate Degree: 4-8 semesters <br><strong>$88,725 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Engineering/ElectricalEngineeringTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Engineering",
        title: "Engineering",
        content: "A focus on math and science gives you the foundation toward further study in mechanical, civil, electrical, or other engineering. <br><br> Classes at 8 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (2): 2-3 semesters <br><strong>$104,021 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Engineering/Engineering.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Engineering Technology",
        title: "Engineering Technology",
        content: "Often working with engineers, engineering technicians have responsibilities that can include project development, planning, and testing.  <br><br> Classes at 8 Indiana Locations <br> Associate Degree: 4 semesters <br><strong>$84,586 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Engineering/EngineeringTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Mechanical Engineering Technology",
        title: "Mechanical Engineering Technology",
        content: "Get skills that can lead to careers related to mechanical engineering, including product design, drafting, manufacturing, and testing.  <br><br> Classes at 5 Indiana Locations <br> Associate Degree: 4 semesters  <br><strong>$94,435 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Engineering/MechanicalEngineeringTechnology.jpg",
        video: null,
        qr: null,
      },
    ]
  },

  {
    label: "Entrepreneurship",
    programs: [
      {
        label: "Entrepreneurship",
        title: "Entrepreneurship",
        content: "Get a solid foundation for starting or growing a business, including mentoring and opportunities to pitch investors for funding.  <br><br> Classes at 10 Indiana Locations <br><br> Associate Degree: 5 semesters <br> Certificates (2): 2-3 semesters ",
        image: "assets/ProgramResources/Entrepreneurship/Entrepreneurship.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
  {
    label: "Fine Arts & Design",
    programs: [
      {
        label: "Design Technology",
        title: "Design Technology",
        content: "Discover the basics of form and function, with electives leading to paths such as Mechanical Design, Computer Graphics and others.  <br><br> Classes at 14 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (6): 2 semesters<br><strong>$74,491 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/ArtDesign/DesignTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Fine Arts",
        title: "Fine Arts",
        content: "  Discover your artistic voice and build a portfolio as you master what it takes to begin in your field or move on to a 4-year degree. <br><br> Classes at 1 Indiana Locations <br>  Associate Degree: 4 semesters  <br><strong>$31,891 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/ArtDesign/FineArts.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Interior Design",
        title: "Interior Design",
        content: "Learn the principles of designing interior spaces and environments as you build your portfolio and intern with professionals.  <br><br>Classes at 2 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (2): 2-3 semesters <br><strong>$46,334 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/ArtDesign/InteriorDesign.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Visual Communications",
        title: "Visual Communications",
        content: " Careers in media and marketing begin with skills in visual communications. Here students learn both the technical and aesthetic aspects.  <br><br> Classes at 18 Indiana Locations<br><br> Associate Degrees (3): 4 semesters <br> Certificates (4): 1-2 semesters <br><strong>$45,161 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/ArtDesign/VisualCommunications.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
    {
    label: "General Studies",
    programs: [
      {
        label: "General Studies",
        title: "General Studies",
        content: " Get broad exposure to a solid core of courses largely transferable to 4-year institutions as required for a bachelor's degree.  <br><br> Classes at 35 Indiana Locations <br> Associate Degree: 4 semesters ",
        image: "assets/ProgramResources/GeneralStudies/GeneralStudies.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Indiana College Core",
        title: "Indiana College Core",
        content: "Fulfills core requirements equivalent to your first year of college so you can start as a sophomore at any Indiana 4-year institution.  <br><br> Classes at 27 Indiana Locations <br> Certificate: 2-4 semesters",
        image: "assets/ProgramResources/GeneralStudies/IndianaCollegeCore.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Liberal Arts",
        title: "Liberal Arts",
        content: "Explore personal and academic growth in areas from critical thinking to creative expression as you build toward a bachelor’s degree. <br><br> Classes at 37 Indiana Locations <br> Associate Degrees (2): 4 semesters ",
        image: "assets/ProgramResources/GeneralStudies/LiberalArts.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
    {
    label: "Healthcare",
    programs: [
      {
        label: "Dental Assisting",
        title: "Dental Assisting",
        content: " Taught by instructors experienced in the field, you’ll learn skills involving radiography, dental materials, and general dentistry.  <br><br> Classes at 5 Indiana Locations <br> Associate Degree: 4-5 semesters <br> Certificate: 3-4 semesters <br><strong>$47,823 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/DentalAssisting.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Dental Hygiene",
        title: "Dental Hygiene",
        content: "Learn in a true clinical environment, treating a wide variety of patients while using the most current technology in dental care. Small class sizes allow for more one-on-one interaction with faculty.  <br><br> Classes at 3 Indiana Locations <br> Associate Degree: 5 semesters <br><strong>$90,094 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/DentalHygiene.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Diagnostic Medical Sonography",
        title: "Diagnostic Medical Sonography",
        content: "  Help create the ultrasonic images that diagnose illness. Choose from among three degree pathways: cardiac, vascular, or general.  <br><br> Classes at 2 Indiana Locations <br> Associate Degrees (3): 4 semesters  <br><strong>$84,801 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/DiagnosticMedicalSonography.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Health Information Technology",
        title: "Health Information Technology",
        content: "Efficient processing of health records helps improve quality of care. Graduates can work in hospitals, doctors’ offices, and clinics.  <br><br> Classes at 2 Indiana Locations <br> Associate Degree: 4 semesters <br> Certificate: 2-3 semesters <br><strong>$47,965 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/HealthInformationTechnology.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Healthcare Specialist",
        title: "Healthcare Specialist",
        content: "  Start your healthcare career with clinical hands-on practice in certification options like Phlebotomy, Pharmacy Technician, and more.  <br><br> Classes at 26 Indiana Locations <br> Associate Degree: 4 semesters <br> Certificates (10): 0.5-3 semesters <br><strong>$41,150 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/HealthcareSpecialist.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Human Services",
        title: "Human Services",
        content: " Ready to help others? Here, students are trained to develop the skills, attitudes, and knowledge needed to work in social services.  <br><br> Classes at 25 Indiana Locations <br>  Associate Degrees (5): 4-5 semesters <br> Certificates (8): 1-3 semesters <br><strong>$51,659 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/HumanServices.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Medical Assisting",
        title: "Medical Assisting",
        content: " Be the link between healthcare providers and patients as you learn in a variety of settings, including labs and patient exam rooms.  <br> Classes at 25 Indiana Locations <br> Associate Degree: 4 semesters <br> Certificates (5): 1-3 semesters <br><strong>$54,750 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/MedicalAssisting.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Medical Imaging",
        title: "Medical Imaging",
        content: "Discover the art and science of using X-ray, MRI, and CT imaging technology to assist physicians in diagnosing diseases and injuries.  <br><br> Classes at 8 Indiana Locations <br> Associate Degree: 5 semesters <br> Certificates (3): 1-3 semesters <br><strong>$75,284 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/MedicalImaging.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Medical Laboratory Technology",
        title: "Medical Laboratory Technology",
        content: "Tests and lab work are key to diagnosing patients. You’ll work with microscopes, chemistry analyzers, and other modern lab equipment.  <br><br> Classes at 3 Indiana Locations <br> Associate Degree: 4 semesters <br><strong>$47,196 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/MedicalLaboratoryTechnology.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Nursing",
        title: "Nursing",
        content: " Work toward an LPN, ASN, or transfer as a junior. Learn to care for patients and qualify to work in hospitals, home health, and more. <br><br> Classes at 23 Indiana Locations <br> Associate Degrees (2): 3-4 semesters <br> Certificate: 3 semesters",
        image: "assets/ProgramResources/Healthcare/Nursing.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Occupational Therapy Assistant",
        title: "Occupational Therapy Assistant",
        content: "Students in the Occupational Therapy Assistant (OTA) program gain workforce-ready skills through a hybrid learning model that combines classroom, lab, online, and clinical instruction. The curriculum covers OTA foundations, patient care techniques, assistive technologies, and hands-on fieldwork, preparing graduates for a rewarding, in-demand career upon licensure.  <br><br> Classes at 1 Indiana Locations <br> Associate Degree: 4-5 semesters <br><strong>$67,010 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/OccupationalTherapyAssistant.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Paramedic Science",
        title: "Paramedic Science",
        content: "Help make a difference and change lives in a program that has EMS alumni currently working with some of the state’s best hospitals.  <br><br> Classes at 15 Indiana Locations <br> Associate Degree: 4-6 semesters <br> Certificates (2): 1-4 semesters <br><strong>$67,010 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/ParamedicScience.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Patient Care Technician",
        title: "Patient Care Technician",
        content: "Assist patients with day-to-day activities, take vital signs, collect specimens, and perform other diagnostic or treatment procedures.  <br><br> Classes at 9 Indiana Locations <br> Certificates (2): 2-3 semesters <br><strong>$39,197 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/PatientCareTechnician.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Physical Therapist Assistant",
        title: "Physical Therapist Assistant",
        content: "Prepares you for the fulfilling job of helping patients recover from illness or injury under the direction of a physical therapist.  <br><br> Classes at 3 Indiana Locations <br> Associate Degree: 5 semesters <br><strong>$62,891 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/PhysicalTherapistAssistant.jpg",
        video: null,
        qr: null,
      },

      {
        label: "Psychology",
        title: "Psychology",
        content: "Psychology is the study of behavior, a highly valuable career skill. Studies include human sexuality and theories of personality.  <br><br> Classes at 17 Indiana Locations <br> Associate Degree: 4 semesters <br><strong>$56,445 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/Psychology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Radiation Therapy",
        title: "Radiation Therapy",
        content: "Learn essentials of the high-energy technology used to treat disease. Industry partners include cancer centers, hospitals, and clinics.  <br><br> Classes at 1 Indiana Locations <br> Associate Degree: 5-6 semesters  <br><strong>$98,134 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/RadiationTherapy.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Respiratory Therapy",
        title: "Respiratory Therapy",
        content: "Help treat breathing disorders in patients ranging from infants to seniors, while working side-by-side with doctors, nurses and others.  <br><br>  Classes at 8 Indiana Locations <br> Associate Degree: 7 semesters <br><strong>$77,813 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/RespiratoryTherapy.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Surgical Technology",
        title: "Surgical Technology",
        content: " Train in a real operating room to enter the workforce as a surgical assistant, in labor and delivery, or in central sterile supply.  <br><br> Classes at 11 Indiana Locations <br><br> Associate Degree: 5 semesters <br> Certificate: 2 semesters <br><strong>$61,610 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/SurgicalTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Therapeutic Massage",
        title: "Therapeutic Massage",
        content: "Ideal environment to become a skilled massage therapist, thanks to a student-run public clinic and field trips to clientele in need.  <br><br> Classes at 5 Indiana Locations <br><br> Associate Degree: 4-5 semesters <br> Certificates (2): 3-4 semesters <br><strong>$55,262 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Healthcare/TherapeuticMassage.jpg",
        video: null,
        qr: null,
      },
    ]
  },
  {
    label: "Hospitality & Culinary",
    programs: [
      {
        label: "Culinary Arts / Hospitality Administration & Events",
        title: "Culinary Arts / Hospitality Administration & Events",
        content: "  Discover the skills behind the largest private sector industry in the US. Career choices include events manager, caterer, pastry chef, and others.  <br><br> Classes at 9 Indiana Locations<br><br> Associate Degrees (4): 4 semesters <br> Certificates (11): 2-3 semesters <br> Workforce Certification<br><strong>$57,506 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Culinary/CulinaryArts.jpg",
        video: null,
        qr: null,
      },
    ]
  },

  {
    label: "Law",
    programs: [
      {
        label: "Legal & Paralegal Studies",
        title: "Legal & Paralegal Studies",
        content: "The starting point for students interested in the law. Learn about sources of law, legal research, civil procedure, ethics, and more.  <br><br> Classes at 12 Indiana Locations <br><br> Associate Degrees (2): 5-6 semesters <br> Certificates (3): 2-5 semesters <br><strong>$49,399 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Law/LegalParalegalStudies.jpg",
        video: null,
        qr: null,
      },
    ]
  },


    {
    label: "Public Safety",
    programs: [
      {
        label: "Criminal Justice",
        title: "Criminal Justice",
        content: "  Learn from instructors with real-world experience in career fields like law enforcement, court services, security, and others.  <br><br> Classes at 25 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (5): 2 semesters <br><strong>$62,522 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/PublicSafety/CriminalJustice.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Homeland Security / Public Safety",
        title: "Homeland Security / Public Safety",
        content: "Choose a career on the front lines of service. Occupations include firefighter, EMS, law enforcement, and transportation security.  <br><br> Classes at 13 Indiana Locations <br><br> Associate Degrees (4): 5 semesters <br> Certificates (9): 2-3 semesters <br><strong>$65,949 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/PublicSafety/HomelandSecurityPublicSafety.jpg",
        video: null,
        qr: null,
      },

    ]
  },

    {
    label: "Science & Applied Science",
    programs: [

      {
        label: "Biology",
        title: "Biology",
        content: "Biology is the study of life itself–and your first step to a career in medicine, pharmacology, agriculture, research, and many others.  <br><br> Classes at 16 Indiana Locations <br> Associate Degree: 4 semesters <br><strong>$68,333 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/Biology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Biotechnology",
        title: "Biotechnology",
        content: "Biotechnology uses living cells to develop products, leading to careers that include research, pharmaceuticals, genomics, and others.  <br><br> Classes at 3 Indiana Locations <br><br> Associate Degrees (2): 4 semesters <br> Certificates (4): 2-3 semesters <br><strong>$65,931 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/BioTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Chemistry",
        title: "Chemistry",
        content: "Your formula for earning skills in organic and physical chemistry, atomic structure, and more before transferring to a 4-year school.  <br><br> Classes at 4 Indiana Locations <br> Associate Degree: 4 semesters  <br><strong>$67,054 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/Chemistry.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Energy Technology",
        title: "Energy Technology",
        content: "Get ready for the green energy future with skills in wind and solar power systems. Industry partners include Vectren, Siemens, and GE.  <br><br> Classes at 3 Indiana Locations <br><br> Associate Degree: 4 semesters <br> Certificates (5): 3 semesters <br> Workforce Certification: 1 semesters<br><strong>$76,055 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/EnergyTechnology.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Mortuary Science",
        title: "Mortuary Science",
        content: "Gain expertise in all aspects of this essential career, including working with bereaved families, embalming, and restorative art. <br><br> Classes at 1 Indiana Locations <br> Associate Degree: 5-6 semesters <br><strong>$47,495 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/MortuaryScience.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Veterinary Nursing",
        title: "Veterinary Nursing",
        content: "An ideal environment to develop as a skilled veterinary technician, emphasizing professionalism and expertise. Gain hands-on experience through externships and partnerships with leading veterinary institutions across Indiana, ensuring a comprehensive education that prepares you for success in the field.  <br><br> Classes at 1 Indiana Locations<br><br> Associate Degree: 4-5 semesters <br> Certificate: 2 semesters <br><strong>$38,850 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/Science/VeterinaryNursing.jpg",
        video: null,
        qr: null,
      },
    ]
  },



  
  {
    label: "Social Services",
    programs: [
      {
        label: "Human Services",
        title: "Human Services",
        content: "Ready to help others? Here, students are trained to develop the skills, attitudes, and knowledge needed to work in social services.  <br><br> Classes at 25 Indiana Locations <br> Associate Degrees (5): 4-5 semesters <br> Certificates (8): 1-3 semesters <br><strong>$51,659 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/SocialServices/HumanServices.jpg",
        video: null,
        qr: null,
      },
      {
        label: "Psychology",
        title: "Psychology",
        content: " Psychology is the study of behavior, a highly valuable career skill. Studies include human sexuality and theories of personality.  <br><br> Classes at 17 Indiana Locations <br> Associate Degree: 4 semesters <br><strong>$56,445 <br> Median Salary. </strong>",
        image: "assets/ProgramResources/SocialServices/Psychology.jpg",
        video: null,
        qr: null,
      },
    ]
  },

  // ... repeat this shape for the rest of your 17 fields:
  // Automotive, Aviation, Computers & Information Technology, Construction,
  // Education, Engineering, Entrepreneurship, Fine Arts & Design,
  // General Studies, Healthcare, Hospitality & Culinary, Law,
  // Public Safety, Science & Applied Science
];
