const { spawnSync } = require('child_process');

console.log('Tentando criar banco de dados evermoment...');

const result = spawnSync('npx', ['prisma', 'db', 'execute', '--stdin'], {
  input: `
    CREATE DATABASE IF NOT EXISTS evermoment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    SHOW TABLES FROM evermoment;
  `,
  cwd: process.cwd(),
  stdio: ['pipe', 'inherit', 'inherit'],
});

if (result.error) {
  console.error('Erro:', result.error);
  process.exit(1);
}

console.log('\n✓ Banco de dados criado/verificado');
console.log('\nAgora executando prisma migrate...');

const migrateResult = spawnSync('npx', ['prisma', 'db', 'push'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

if (migrateResult.error) {
  console.error('Erro na migração:', migrateResult.error);
  process.exit(1);
}

console.log('\n✓ Tudo pronto! Servidor pode ser iniciado.');
