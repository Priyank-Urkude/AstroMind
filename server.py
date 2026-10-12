import os
import json
import logging
import requests
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='')
logging.basicConfig(level=logging.INFO)

# Default port
PORT = int(os.environ.get('PORT', 5000))

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'online',
        'service': 'AstroMind AI Space Explorer',
        'version': '2.0.0'
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    """
    Handles AI questions. If an API key is provided in the request or environment,
    it queries the Google Gemini API. Otherwise, it returns an offline response indicator
    so the client-side AstroMind Neural Engine can handle it seamlessly.
    """
    data = request.get_json() or {}
    user_prompt = data.get('prompt', '').strip()
    planet_context = data.get('context', {})
    api_key = data.get('apiKey', '').strip() or os.environ.get('GEMINI_API_KEY', '').strip()
    model = data.get('model', 'gemini-1.5-flash').strip()

    if not user_prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    # If Gemini API key is supplied, query Gemini
    if api_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
            system_instruction = (
                "You are AstroMind AI (callsign NOVA), an elite astrophysicist and orbital mission computer. "
                "You provide scientifically rigorous, awe-inspiring, and educational explanations about astronomy, "
                "cosmology, planetary science, and space exploration. Keep explanations engaging, concise, and structured "
                "with markdown bullet points or key metrics when helpful. "
            )
            if planet_context and planet_context.get('name'):
                system_instruction += (
                    f"Current spaceship telemetry: Orbiting {planet_context.get('name')}. "
                    f"Planet category: {planet_context.get('category')}. "
                    f"Surface gravity: {planet_context.get('gravity')} m/s^2. "
                    f"Average temperature: {planet_context.get('temperature')}°C. "
                )

            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {"text": f"{system_instruction}\n\nUser Question: {user_prompt}"}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.7,
                    "topP": 0.95,
                    "maxOutputTokens": 800
                }
            }

            resp = requests.post(url, json=payload, timeout=20)
            if resp.status_code == 200:
                result = resp.json()
                candidates = result.get('candidates', [])
                if candidates and 'content' in candidates[0]:
                    parts = candidates[0]['content'].get('parts', [])
                    reply_text = "".join([p.get('text', '') for p in parts])
                    return jsonify({
                        'reply': reply_text,
                        'source': 'gemini-live',
                        'model': model
                    })
                else:
                    return jsonify({'error': 'Unexpected response structure from Gemini API'}), 502
            else:
                return jsonify({
                    'error': f"Gemini API returned status {resp.status_code}: {resp.text}",
                    'fallback_to_local': True
                }), 200
        except Exception as e:
            logging.error(f"Error querying Gemini: {e}")
            return jsonify({
                'error': str(e),
                'fallback_to_local': True
            }), 200

    # If no key, indicate that client should use the built-in offline AstroMind engine
    return jsonify({
        'fallback_to_local': True,
        'message': 'Using AstroMind Offline Neural Engine'
    })

if __name__ == '__main__':
    print(f"[*] AstroMind Space Explorer server running on http://localhost:{PORT}")
    app.run(host='0.0.0.0', port=PORT, debug=False)
