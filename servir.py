# Servidor local para probar la página. Le dice al navegador que no guarde copias,
# así siempre ves la última versión sin tener que forzar la recarga.
# Uso:  python3 servir.py   → abre http://localhost:5173   (Ctrl + C para parar)
import http.server, os, socketserver

PORT = 5173
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), NoCache) as httpd:
    print(f"Página en http://localhost:{PORT}  (Ctrl + C para parar)")
    httpd.serve_forever()
