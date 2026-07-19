import OpenAI from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});
async function checkConnection() {
  try {
    const models = await openai.models.list();
    console.log("✅ Connection OK");
    console.log("Available models:");
    return true;
  } catch (error) {
    console.error("❌ Connection failed:", error);
    return false;
  }
}

checkConnection();
export default openai;
