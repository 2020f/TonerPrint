# 🧠 PROYECTO — INSTRUCCIONES GENERALES

Este archivo define el contexto base del proyecto. Cada agente especializado tiene su propio archivo en `.claude/`.

## Stack (edita según tu proyecto)
- **Lenguaje**: TypeScript / Python / Go
- **Framework**: Next.js / FastAPI / cualquiera
- **Testing**: Vitest / Jest / Pytest
- **CI/CD**: GitHub Actions / GitLab CI
- **Infra**: Docker + Docker Compose

## Convenciones
- Commits: Conventional Commits (`feat:`, `fix:`, `test:`, `chore:`)
- Ramas: `feature/`, `fix/`, `chore/`
- Idioma de código: inglés; comentarios: español

## Agentes disponibles en `.claude/`

| Archivo | Rol | Activar con |
|---|---|---|
| `tester.md` | QA & Testing | `claude --append-system-prompt "$(cat .claude/tester.md)"` |
| `reviewer.md` | Code Review | `claude --append-system-prompt "$(cat .claude/reviewer.md)"` |
| `devops.md` | DevOps & Infra | `claude --append-system-prompt "$(cat .claude/devops.md)"` |
| `architect.md` | Arquitectura | `claude --append-system-prompt "$(cat .claude/architect.md)"` |
| `debugger.md` | Debug & Hotfix | `claude --append-system-prompt "$(cat .claude/debugger.md)"` |

## Cómo lanzar cada agente (desde la raíz del proyecto)

```bash
# Agente Tester
claude --append-system-prompt "$(cat .claude/tester.md)"

# Agente Reviewer
claude --append-system-prompt "$(cat .claude/reviewer.md)"

# Agente DevOps
claude --append-system-prompt "$(cat .claude/devops.md)"

# Agente Arquitecto
claude --append-system-prompt "$(cat .claude/architect.md)"

# Agente Debugger
claude --append-system-prompt "$(cat .claude/debugger.md)"
```
