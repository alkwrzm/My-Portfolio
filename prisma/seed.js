const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

// Seed Data
const experiences = [
    {
        title: "Senior Product Manager",
        company: "Tech Corp",
        startDate: new Date("2023-01-01"), // Approx start based on "2023 - Present"
        endDate: null,
        description: "Led the development of AI-driven analytics tools. Improved user retention by 30%.",
    },
    {
        title: "AI Specialist",
        company: "Innovation Labs",
        startDate: new Date("2021-01-01"),
        endDate: new Date("2023-01-01"),
        description: "Prototyped LLM applications for enterprise clients. Managed cross-functional teams.",
    },
    {
        title: "Digital Strategist",
        company: "Creative Agency",
        startDate: new Date("2019-01-01"),
        endDate: new Date("2021-01-01"),
        description: "Designed digital transformation roadmaps for Fortune 500 companies.",
    },
]

const skills = [
    // Product Management
    { name: "Product Strategy", category: "Product Management", proficiency: 90 },
    { name: "Roadmapping", category: "Product Management", proficiency: 90 },
    { name: "Agile/Scrum", category: "Product Management", proficiency: 95 },
    { name: "User Research", category: "Product Management", proficiency: 85 },
    { name: "Data Analysis", category: "Product Management", proficiency: 80 },
    { name: "Stakeholder Management", category: "Product Management", proficiency: 90 },
    { name: "A/B Testing", category: "Product Management", proficiency: 85 },
    // AI & Engineering
    { name: "Python", category: "AI & Engineering", proficiency: 85 },
    { name: "LLMs & Prompt Engineering", category: "AI & Engineering", proficiency: 95 },
    { name: "Computer Vision", category: "AI & Engineering", proficiency: 75 },
    { name: "RAG Pipelines", category: "AI & Engineering", proficiency: 90 },
    { name: "SQL", category: "AI & Engineering", proficiency: 80 },
    { name: "TensorFlow/PyTorch", category: "AI & Engineering", proficiency: 70 },
    { name: "API Integration", category: "AI & Engineering", proficiency: 85 },
    // Prototyping & Design
    { name: "Figma", category: "Prototyping & Design", proficiency: 90 },
    { name: "Next.js / React", category: "Prototyping & Design", proficiency: 85 },
    { name: "Tailwind CSS", category: "Prototyping & Design", proficiency: 90 },
    { name: "Wireframing", category: "Prototyping & Design", proficiency: 95 },
    { name: "UI/UX Design", category: "Prototyping & Design", proficiency: 80 },
    { name: "Interactive Prototypes", category: "Prototyping & Design", proficiency: 85 },
]

const certifications = [
    { name: "Google Data Analytics", category: "Certification", proficiency: 100 },
    { name: "Certified Scrum Master", category: "Certification", proficiency: 100 },
    { name: "AWS Certified Practitioner", category: "Certification", proficiency: 100 },
    { name: "TensorFlow Developer", category: "Certification", proficiency: 100 },
]

const projects = [
    {
        title: "Neural Vision API",
        description: "Enterprise-grade computer vision pipeline processing 1M+ images daily.",
        tags: "AI Infrastructure, Python, Computer Vision",
        imageUrl: null,
        link: null,
    },
    {
        title: "Revenue Operations",
        description: "ARR Generated: $2.5M",
        tags: "Metrics, Business Impact",
        imageUrl: null,
        link: null,
    },
    {
        title: "Tech Stack Arsenal",
        description: "Python, TensorFlow, PostgreSQL, React", // Summarized from tech list
        tags: "Tech Stack, Arsenal",
        imageUrl: null,
        link: null,
    },
    {
        title: "ChatBot Orchestrator",
        description: "No-code builder for conversational AI agents.",
        tags: "LLM Product, AI, No-code",
        imageUrl: null,
        link: null,
    }
]

async function main() {
    // 1. Upsert Admin User
    const password = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password,
        },
    })
    console.log({ user })

    // 2. Seed Experience
    for (const exp of experiences) {
        await prisma.experience.create({ data: exp })
    }
    console.log(`Seeded ${experiences.length} experiences`)

    // 3. Seed Skills & Certifications
    for (const skill of [...skills, ...certifications]) {
        await prisma.skill.create({ data: skill })
    }
    console.log(`Seeded ${skills.length + certifications.length} skills`)

    // 4. Seed Projects
    for (const proj of projects) {
        await prisma.project.create({ data: proj })
    }
    console.log(`Seeded ${projects.length} projects`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
