from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return "File not found", 404

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name', 'Someone')
    n = "SORRY"
    print(f"{n} {name}")
    return jsonify({"status": "success", "message": f"{n} {name}"})

if __name__ == '__main__':
    print("Starting server at http://127.0.0.1:5000")
    app.run(port=5000, debug=True)
