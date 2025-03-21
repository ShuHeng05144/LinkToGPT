import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// 载入 .env 文件里的 API Key
dotenv.config();
//console.log("API Key:", process.env.OPENAI_API_KEY); // 先打印，检查是否正确加载

const app = express();
const port = 3000;

// 允许跨域访问
app.use(cors());
app.use(express.json());

// 配置 OpenAI API
const openai = new OpenAI({
    baseURL: process.env.BASEURL,  // 从环境变量读取 Base URL
    apiKey: process.env.OPENAI_API_KEY,  // 从环境变量读取 API Key
});

// 处理前端请求
app.post("/chat", async (req, res) => {       //创建/chat路由
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 调用 OpenAI API
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage}
            ],
            model: "deepseek-chat",
        });

        const botReply = completion.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
    console.log("Received request:", req.body);
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

