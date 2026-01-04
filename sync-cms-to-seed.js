const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Fetching current local projects...');

    // 1. Get all projects from the local DB
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' }
    });

    console.log(`✅ Found ${projects.length} projects.`);

    // 2. Formatting the seed file content
    const fileContent = `const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding project data...');

    // Delete existing projects to ensure exact replication
    await prisma.project.deleteMany({});
    console.log('✅ Cleared existing projects');

    // Create projects from the exported data
    const projects = await prisma.project.createMany({
        data: ${JSON.stringify(projects, null, 4)}
    });

    console.log(\`✅ Created \${projects.count} projects\`);
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
`;

    // 3. Write back to seed-projects.js
    fs.writeFileSync('seed-projects.js', fileContent);
    console.log('💾 Successfully updated seed-projects.js with your local data!');
}

main()
    .catch((e) => {
        console.error('❌ Error syncing:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
