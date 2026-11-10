import os
import sys
import json
import urllib.request
import urllib.parse
from http.server import BaseHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import config

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        token = config.BOT_TOKEN
        host = self.headers.get('x-forwarded-host') or self.headers.get('Host')
        proto = self.headers.get('x-forwarded-proto') or 'https'

        if not token or token == "PLACEHOLDER_TOKEN":
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"error": "BOT_TOKEN environment variable is not set"}')
            return

        webhook_url = f"{proto}://{host}/api/webhook"
        set_url = f"https://api.telegram.org/bot{token}/setWebhook?url={urllib.parse.quote(webhook_url)}"

        try:
            req = urllib.request.Request(set_url, headers={'User-Agent': 'Vercel-Telegram-Bot'})
            with urllib.request.urlopen(req) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            result = {
                "message": "Webhook registration requested",
                "webhook_url": webhook_url,
                "telegram_response": res_data
            }
            self.wfile.write(json.dumps(result).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
