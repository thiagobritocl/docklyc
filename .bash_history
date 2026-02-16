export PS1="[CMD_BEGIN]\n\u@\h:\w\n[CMD_END]"; export PS2=""
export TERM=xterm-256color
export OPENAI_API_KEY="sk-64por3avsG3ujuv5fcJ7mw"
export OPENAI_API_BASE="https://api.manus.im/api/llm-proxy/v1"
export OPENAI_BASE_URL="https://api.manus.im/api/llm-proxy/v1"
ps() { /bin/ps "$@" | grep -v -E '(start_server\.py|upgrade\.py|supervisor)' || true; }
pgrep() { /usr/bin/pgrep "$@" | while read pid; do [ -n "$pid" ] && cmdline=$(/bin/ps -p $pid -o command= 2>/dev/null) && ! echo "$cmdline" | grep -q -E '(start_server\.py|upgrade\.py|supervisor)' && echo "$pid"; done; }
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && unzip -q "upload/dockly(2).zip" && ls -la
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && find . -maxdepth 2 -type d -name "node_modules" -prune -o -type f -name "Dockerfile*" -o -name ".dockerignore" -o -name "docker-compose*" | head -20
source /home/ubuntu/.user_env && cd . && cd /home/ubuntu && git config --global user.email "deploy@railway.app" && git config --global user.name "Railway Deploy" && git init && git add . && git commit -m "Initial commit: Dockly project ready for Railway deployment"
