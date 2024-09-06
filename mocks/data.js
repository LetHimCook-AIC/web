export const mockParseResult = {
  type: "api_job_result",
  id: "535639a0-91fb-4226-af53-543f9f9f117d",
  attributes: {
    status: "success",
    type: "hr_parse_resume",
    result: {
      candidate_name: "CEAVIN RUFUS DE PRAYER PURBA",
      candidate_email: "ceavinr@gmail.com",
      candidate_phone: "+6285163669420",
      candidate_address: "Bekasi, Indonesia",
      candidate_language: "",
      candidate_spoken_languages: [],
      candidate_honors_and_awards: [
        "Finalist in HackFest by Google Developer Student Club Indonesia",
        "Finalist in Technoscape 5.0",
        "1st Place Winner in SudoEx Hackathon 2022",
      ],
      candidate_courses_and_certifications: [
        "DevNet Associate | Cisco Networking Academy",
        "Networking Essentials | Cisco Networking Academy",
      ],
      positions: [
        {
          position_name: "Software Engineer Intern",
          company_name: "Telkom Indonesia",
          country: "Indonesia",
          start_date: "2024-06-01",
          end_date: "2024-08-01",
          skills: [
            "Automation bot",
            "Vue3",
            "Nest.js",
            "PostgreSQL",
            "Prisma",
            "Monorepo architecture",
            "Turborepo",
            "GitLab CI/CD",
          ],
          job_details:
            "Built an automation bot that reduced network traffic disturbance reporting time by 30%, improving operational efficiency. Constructed a data-driven dashboard using Vue3, Nest.js, PostgreSQL, and Prisma that enhanced service operations decision-making through actionable insights. Developed an employee service schedule system that improved scheduling efficiency by 60% through an intuitive user interface. Implemented monorepo architecture using Turborepo to streamline development processes 2 times faster. Orchestrated GitLab CI/CD pipelines, resulting in a 30% reduction in build times.",
        },
        {
          position_name: "IT Lead",
          company_name: "IEEE ITB Student Branch",
          country: "N/A",
          start_date: "2023-06-01",
          end_date: "2024-06-01",
          skills: ["Next.js", "Tailwind", "DatoCMS"],
          job_details:
            "Built IEEE ITB Student Branch website using Next.js, Tailwind, and DatoCMS. Created and managed a website with monthly traffic of 5000+ visitors. Resolved 95% of reported bugs within 1 hour, enhancing user experience and client satisfaction. Maintained the website using DatoCMS, increasing website management efficiency.",
        },
        {
          position_name: "IT Lead (Social Sub-division)",
          company_name: "OSKM ITB 2023",
          country: "N/A",
          start_date: "2023-01-01",
          end_date: "2023-09-01",
          skills: ["Load balancer", "t3 stack", "tRPC", "Prisma"],
          job_details:
            "Utilized load balancer that enables the website to handle 3000+ daily visitors seamlessly. Leveraged t3 stack (with additional tools like tRPC and Prisma) in developing a website.",
        },
        {
          position_name: "IT Lead",
          company_name: "Pemira KM ITB 2022/2023",
          country: "N/A",
          start_date: "2022-12-01",
          end_date: "2023-03-01",
          skills: ["React.js", "Tailwind CSS", "Node.js", "MongoDB"],
          job_details:
            "Built a website for KM ITB election using React.js, Tailwind CSS, Node.js, and MongoDB. Successfully built a website capable of managing the participation of 5000+ students concurrently.",
        },
      ],
      education_qualifications: [
        {
          school_name: "Bandung Institute of Technology",
          school_type: "University or equivalent",
          degree_type: "Bachelor’s Degree or equivalent",
          faculty_department: "Information System and Technology, STEI",
          specialization_subjects: "Software Engineering",
          country: "Indonesia",
          start_date: "2021-08-01",
          end_date: "2025-09-01",
          learning_mode: "In-person learning",
          education_details: "GPA: 3.83",
        },
      ],
    },
  },
};

export const mockQuestions = [
  {
    question: "Tell me a little about yourself?",
    bestAnswer: `
        I am a passionate and dedicated individual with a strong background in software engineering. I have experience working on frontend and backend development, where I honed my skills in NextJS, Golang, etc. I enjoy problem-solving and thrive in dynamic environments where I can continuously learn and grow. Outside of work, I am deeply interested in reading a book, which help me maintain a balanced perspective and foster creativity in my professional life.
      `,
  },
  {
    question: "What are your greatest strengths and weaknesses?",
    bestAnswer: `
        My greatest strength is my ability to adapt to new challenges quickly and find innovative solutions to problems. I’m detail-oriented and organized, which helps me stay on top of multiple projects while maintaining high-quality results. 
    
        As for weaknesses, I sometimes tend to be overly critical of my own work, always pushing for perfection. However, I’ve been working on recognizing when good enough is sufficient and focusing on delivering results efficiently while maintaining a healthy balance between perfection and productivity.
      `,
  },
  {
    question: "Why should we hire you?",
    bestAnswer: `
        You should hire me because I bring a unique combination of skills, experience, and passion that align with the needs of your company. I am not only technically skilled in software development but also have a strong sense of collaboration and a growth mindset, which allows me to contribute positively to the team and continuously learn. I am confident that I can make meaningful contributions to your projects and help your company achieve its goals, while also growing personally and professionally.
      `,
  },
];
