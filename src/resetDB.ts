import { Connection } from "./database/database";

async function resetDatabase() {
  try {
    console.log("⏳ Iniciando reset do banco de dados...");
    await Connection.initialize();

    await Connection.dropDatabase();

    await Connection.synchronize();

    console.log("✅ Banco de dados resetado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao resetar o banco de dados:", error);
    process.exit(1);
  }
}
resetDatabase();