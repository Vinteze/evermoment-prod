const mysql = require('mysql2/promise');

async function setupDatabase() {
  let connection;
  try {
    // Conectar ao MySQL sem especificar banco
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
    });

    console.log('✓ Conectado ao MySQL');

    // Criar banco se não existir
    await connection.execute('CREATE DATABASE IF NOT EXISTS evermoment');
    console.log('✓ Banco de dados "evermoment" criado/verificado');

    // Verificar tabelas
    await connection.execute('USE evermoment');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✓ Banco tem ${tables.length} tabelas`);

    if (tables.length === 0) {
      console.log('⚠ Nenhuma tabela encontrada. Execute: npx prisma migrate dev');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

setupDatabase();
