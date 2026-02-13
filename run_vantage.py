import subprocess
import time
import sys
import os

def start_backend():
    print("🚀 Starting VANTAGE Intelligence Backend...")
    return subprocess.Popen([sys.executable, "server.py"], cwd=os.getcwd())

def start_frontend():
    print("🌿 Starting VANTAGE Garden Dashboard...")
    # Using shell=True for npm on Windows
    return subprocess.Popen(["npm", "run", "dev"], cwd=os.path.join(os.getcwd(), "dashboard"), shell=True)

if __name__ == "__main__":
    backend_proc = None
    frontend_proc = None
    try:
        backend_proc = start_backend()
        time.sleep(2) # Give backend time to start
        frontend_proc = start_frontend()
        
        print("\n✨ VANTAGE is running!")
        print("🔗 Dashboard: http://localhost:5173")
        print("🔗 API: http://localhost:8000")
        print("\nPress Ctrl+C to shut down both servers.\n")
        
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Shutting down VANTAGE...")
        if backend_proc:
            backend_proc.terminate()
        if frontend_proc:
            frontend_proc.terminate()
        print("Done.")
