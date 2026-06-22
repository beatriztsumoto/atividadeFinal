import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela alunos...');

    // Remove todos os registros (descomente se quiser limpar a tabela antes de popular)
    // await prisma.aluno.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.aluno.createMany({
        data: [
            { nome: 'Manuela Santana', turma: '3A', materia: 'Geografia' },
            { nome: 'Vinicius Azevedo', turma: '1B', materia: 'Filosofia' },
            { nome: 'João Carlos', turma: '2D', materia: 'Português' },
            { nome: 'Lorenzo Silva', turma: '3C', materia: 'Algebra' },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
