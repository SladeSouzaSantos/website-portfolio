# Website Portfolio 🚀

![Deploy Status](https://github.com/SladeSouzaSantos/website-portfolio/actions/workflows/deploy.yml/badge.svg)

Este é o meu portfólio profissional, focado em alta disponibilidade e automação.

## 🛠️ Infraestrutura e CI/CD

Este projeto utiliza um pipeline moderno de DevOps:
* **CI/CD:** GitHub Actions automatiza o deploy para o servidor.
* **Orquestração:** Docker Swarm gerencia os containers de Produção e Homologação.
* **Rede:** Tailscale Mesh VPN para conexões seguras entre GitHub e o Raspberry Pi.
* **Túnel:** Cloudflared para exposição segura do domínio sem abertura de portas.