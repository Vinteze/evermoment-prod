#!/bin/bash

# Script para criar o banco de dados manualmente
# Usa mysql CLI se disponível, senão usa node-mysql2

# Tentar com mysql CLI primeiro
if command -v mysql &> /dev/null; then
  echo "Usando mysql CLI..."
  mysql -u root -h localhost << EOF
CREATE DATABASE IF NOT EXISTS evermoment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE evermoment;
SHOW TABLES;
EOF
else
  echo "mysql CLI não encontrado. Usando Node.js..."
  node -e "
    const mysql = require('mysql2');
    const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306
    });
    
    conn.connect();
    conn.query('CREATE DATABASE IF NOT EXISTS evermoment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
      if (err) {
        console.error('Erro:', err);
      } else {
        console.log('✓ Banco criado');
        conn.query('SHOW TABLES FROM evermoment', (err, results) => {
          if (err) console.error(err);
          else console.log('Tabelas:', results);
          conn.end();
        });
      }
    });
  "
fi
