from flask import Flask, request, jsonify
from flask_cors import CORS
import models
# import ngrok

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database import database

database.connect()

app = Flask(__name__)
CORS(app)

PORT = 5000

print("Loading model...")
try:
    model = models.load_model_llama_cpp(filename="ruadapt-qwen-2.5-0.5b-instruct-advert-q5_k_m.gguf",
                                        repo_id="prepref/Ruadapt-Qwen-2.5-0.5b-Instruct-advert-GGUF",
                                        n_gpu_layers=0)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.json
        print(data)
        user_text = data['userText']
        system_text = data['formattedSystemText']
        presence_penalty = data['presencePenalty']
        frequency_penalty = data['frequencyPenalty']
        top_p = data['topP']
        top_k = data['topK']
        temperature = data['tmp']

        response = models.generate_model_llama_cpp(system_text=system_text, user_text=user_text, tmp=temperature,
                                            presence_penalty=presence_penalty, frequency_penalty=frequency_penalty,
                                            top_p=top_p, top_k=top_k)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify({"response": response})

@app.route("/text-types/<table>", methods=['GET'])
def get_text_types(table):
    try:
        types = database.get_all_name(table)
        return jsonify([{"name": name} for name in types])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/subtypes/<type_name>", methods=['GET'])
def get_subtypes(type_name):
    try:
        subtypes = database.get_subtypes_text(type_name)
        return jsonify([{
            "type": f"Тип {i}",
            "description": subtype[2]
        } for i, subtype in enumerate(subtypes)])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/rules/<type>", methods=['GET'])
def get_rules(type):
    try:
        rules = database.get_rules(type)
        return jsonify(rules)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# If you want to use ngrok, uncomment the following lines
# ngrok_token = "<auth_token>"
# ngrok.set_auth_token(ngrok_token)
# public_url = ngrok.connect(PORT)

if __name__ == '__main__':
    # print(f"Public URL: {public_url.url()}")
    app.run(host='0.0.0.0', port=PORT)
    