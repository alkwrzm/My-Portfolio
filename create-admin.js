const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                email: 'admin@alkwarizmi.com',
                password: hashedPassword,
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@alkwarizmi.com');
        console.log('Password: admin123');
        console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    } catch (error) {
        if (error.code === 'P2002') {
            console.log('❌ Admin user already exists!');
        } else {
            console.error('Error creating admin:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
