---
title: Технологический стек
layout: page
nav_order: 2
---

# 🛠 Технологический стек

Мой инструментарий сформирован на основе решения реальных производственных задач. Я выбираю инструменты исходя из требований к надежности, безопасности и стоимости владения.

| Технология | Контекст использования и достижения |
| :--- | :--- |
| **GitLab CI / CD** | Построение централизованных `ci-templates`, внедрение GitLab Dependency Proxy, кастомные образы (`kaniko-builder`). Оптимизация холодного старта и параллельное выполнение jobs. |
| **Linux & Scripting** | 7+ лет фундамента. Глубокое понимание `systemd`, `cgroups`, сетевого стека. Написание production-ready скриптов на **Bash** и **Python** для автоматизации резервного копирования и диагностики. |
| **Cloud (Yandex Cloud, AWS)** | Проектирование мульти-облачной инфраструктуры. Опыт работы с Managed Kafka (KRaft mode), Managed PostgreSQL HA, VPC, Security Groups, CDN и защитой от DDoS. |
| **DevSecOps** | Полный отказ от Docker-in-Docker в пользу **Kaniko**. Внедрение SAST (Semgrep), SCA (Trivy), Cosign keyless OIDC подписи образов. Внедрение **Infisical** для централизованного управления секретами. |
| **Observability** | Развертывание стека **Prometheus + Grafana** с нуля. Создание дашбордов (RED-метрики: latency, error rate, saturation) и настройка алертинга в Telegram. Сокращение MTTR с часов до минут. |
| **IaC & Configuration** | Декларативное управление инфраструктурой с помощью **Terraform** и **Ansible**. Декомпозиция монолитных `docker-compose` стеков с внедрением Traefik (auto-TLS). |
| **Containerization** | Глубокая оптимизация Dockerfile (multi-stage build): уменьшение ML-образов на 77%, frontend-образов в 40 раз. Обеспечение 100% надежности автозапуска **rootless Podman**. |
