const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding project data...');

    // Delete existing projects
    await prisma.project.deleteMany({});
    console.log('✅ Cleared existing projects');

    // Create projects with images
    const projects = await prisma.project.createMany({
        data: [
            {
                title: "ChatBot Orchestrator",
                description: "No-code builder for conversational AI agents. Enterprise-grade platform enabling teams to create, deploy, and manage intelligent chatbots without writing a single line of code.",
                tags: "LLM Product,AI Infrastructure,Python,React",
                images: ["/project-chatbot.png"],
                order: 1,
            },
            {
                title: "Revenue Operations Dashboard",
                description: "Advanced analytics platform that generated $2.5M in ARR. Real-time metrics tracking, predictive analytics, and automated reporting for data-driven decision making.",
                tags: "Metrics,Business Impact,Analytics,PostgreSQL",
                images: ["/project-revenue.png"],
                order: 2,
            },
            {
                title: "Neural Vision API",
                description: "Enterprise-grade computer vision pipeline processing 1M+ images daily. Advanced deep learning models for image classification, object detection, and visual search.",
                tags: "AI Infrastructure,Computer Vision,TensorFlow,Python",
                images: ["/project-vision.png"],
                order: 3,
            },
            {
                title: "Tech Stack Arsenal",
                description: "Comprehensive technology ecosystem showcasing expertise across multiple domains. From frontend frameworks to ML infrastructure, demonstrating full-stack AI product capabilities.",
                tags: "Tech Stack,Full Stack,React,Python,AI/ML",
                images: ["/project-techstack.png"],
                order: 4,
            },
        ],
    });

    console.log(`✅ Created ${projects.count} projects with images`);
    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
