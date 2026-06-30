from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)

# 🏠 Home route (frontend)
@app.route("/")
def home():
    return render_template("index.html")


# 💬 Chat route (backend AI)
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"reply": "Please type something!"})

    try:
        response = model.generate_content(message)
        reply = response.text

    except Exception as e:
        reply = "Error: " + str(e)

    return jsonify({"reply": reply})


# 🚀 Run server (IMPORTANT for phone access)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)