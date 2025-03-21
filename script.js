// 1. 绑定发送按钮的点击事件
document.getElementById("send-btn").addEventListener("click", async function () {

    // 2. 获取用户输入框中的内容
    let userInput = document.getElementById("user-input").value;

    // 3. 如果用户输入内容为空（去掉前后空格后为空），则不继续执行后续代码
    if (userInput.trim() === "") return;

    // 4. 获取显示聊天内容的区域（对话框）
    let chatBox = document.getElementById("chat-box");

    // 5. 创建一个新的<p>元素，用于显示用户发送的消息
    let userMessage = document.createElement("p");

    // 为这个<p>元素指定 class 名称为 "user-message"，以便应用相应的 CSS 样式
    userMessage.className = "user-message";

    // 设置这个<p>元素的文本内容为用户输入的内容
    userMessage.textContent = userInput;

    // 将这个用户消息的<p>元素追加到聊天框中显示
    chatBox.appendChild(userMessage);

    // 6, 发送请求到服务器
    try {
        let response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        let data = await response.json();
        let botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = data.reply;
        chatBox.appendChild(botMessage);
    } catch (error) {
        console.error("Error:", error);
    }    

    // 7. 清空输入框（用户输入完成后清空，方便下次输入）
    document.getElementById("user-input").value = "";

    // 8. 将聊天框滚动到底部，确保最新的消息显示在可视区域内
    chatBox.scrollTop = chatBox.scrollHeight;
});
