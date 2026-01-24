# Website Portfolio 🚀

![Deploy Status](https://github.com/SladeSouzaSantos/website-portfolio/actions/workflows/deploy.yml/badge.svg)

Este é o meu portfólio profissional, focado em alta disponibilidade e automação.

---

## 🛠️ Engenharia de Software e Infraestrutura

Este projeto utiliza um pipeline moderno de DevOps baseado nos princípios de **Fail-Fast** e **Continuous Deployment**.

### ⚙️ Pipeline de CI/CD (GitHub Actions)
O fluxo de trabalho é dividido em três etapas críticas:

1. **Linting (Qualidade do Código):** Utilizamos o `Super-Linter` para validar a sintaxe de HTML, CSS e JS. Se houver erros, o deploy é interrompido.
2. **Automated Deployment:** O GitHub se conecta ao meu servidor via **Tailscale (Mesh VPN)**, garantindo um deploy seguro e criptografado.
3. **Health Check:** O pipeline valida se o serviço está respondendo com `HTTP 200 OK` logo após a subida dos containers.

### 🐳 Orquestração e Rede
Utilizo **Docker Swarm** no meu Raspberry Pi para gerenciar o ciclo de vida dos containers:
* **Ambiente de Produção:** Porta `8081` (Branch `master`).
* **Ambiente de Desenvolvimento:** Porta `8082` (Branch `dev`).
* **Segurança:** **Cloudflared Tunnel** para exposição do domínio e **Rede Overlay** para isolamento interno dos containers.