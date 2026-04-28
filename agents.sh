#!/bin/bash
# ============================================================
# 🤖 LANZADOR DE AGENTES CLAUDE
# Uso: ./agents.sh [tester|reviewer|devops|architect|debugger]
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_DIR="$SCRIPT_DIR/.claude"

show_menu() {
  echo ""
  echo "╔══════════════════════════════════════╗"
  echo "║         🤖 AGENTES CLAUDE             ║"
  echo "╠══════════════════════════════════════╣"
  echo "║  1. 🧪 tester     → QA Engineer      ║"
  echo "║  2. 👁️  reviewer   → Code Reviewer    ║"
  echo "║  3. ⚙️  devops     → Platform Eng.    ║"
  echo "║  4. 🏛️  architect  → Sys. Architect   ║"
  echo "║  5. 🔍 debugger   → Bug Hunter       ║"
  echo "╚══════════════════════════════════════╝"
  echo ""
  echo "Uso: $0 [nombre-agente]"
  echo "     $0 tester"
  echo ""
}

launch_agent() {
  local agent=$1
  local file="$AGENTS_DIR/$agent.md"

  if [ ! -f "$file" ]; then
    echo "❌ Agente '$agent' no encontrado en $AGENTS_DIR/"
    echo "   Agentes disponibles: tester, reviewer, devops, architect, debugger"
    exit 1
  fi

  echo "🚀 Lanzando agente: $agent"
  echo "📄 Cargando instrucciones desde: $file"
  echo "────────────────────────────────────────"

  claude --append-system-prompt "$(cat "$file")"
}

# Main
if [ -z "$1" ]; then
  show_menu
  exit 0
fi

launch_agent "$1"
