from flask import Flask, request, jsonify, send_from_directory
import os

# Use absolute path so static files work in any deployment environment
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=BASE_DIR)

@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    full_path = os.path.join(BASE_DIR, path)
    if os.path.exists(full_path):
        return send_from_directory(BASE_DIR, path)
    return "File not found", 404

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name', 'Someone')
    n = "SORRY"
    print(f"{n} {name}")
    return jsonify({"status": "success", "message": f"{n} {name}"})

if __name__ == '__main__':
    # Render / Railway / Heroku pass PORT as an env variable
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
