from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI

# 载入 .env 文件中的变量
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 配置 OpenAI API
openai = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("BASEURL")
)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message")  # 获取用户消息

        if not user_message:
            return jsonify({"error": "Message is required"}), 400
        print("User message:", user_message)

        # 调用 OpenAI 接口
        response = openai.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            stream=False,  # 设置为 False 以获取完整的响应
        )

        bot_reply = response.choices[0].message.content
        print("Bot reply:", bot_reply)
        return jsonify({"reply": bot_reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to fetch response from OpenAI"}), 500

if __name__ == "__main__":
    app.run(port=3000)
    print("Server is running on http://localhost:3000")
