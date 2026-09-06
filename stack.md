---
title: Технологический стек
layout: page
nav_order: 2
---

# 🛠 Технологический стек

Мой инструментарий сформирован на основе решения реальных производственных задач. Каждая технология ниже прошла проверку в бою: на продакшене, в инцидентах, в миграциях.

---

## ☁️ Cloud & Infrastructure

Управляю инфраструктурой только как кодом: каждый ресурс описан в Terraform, каждая конфигурация — в Ansible. Никакого ClickOps в продакшене.

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Yandex Cloud** | Expert | Cloud VPS, Managed PostgreSQL/Kafka, S3, VPC, Security Groups |
| **AWS** | Advanced | S3, IAM, EC2 (базовое администрирование) |
| **Terraform** | Expert | Модульная IaC-архитектура (IAM, Network, Compute, Data слои) |
| **Ansible** | Expert | Dynamic Inventory, CI/CD Pipeline, идемпотентная настройка серверов |

---

## 🔄 CI/CD & DevSecOps

Безопасность встраиваю в пайплайн, а не добавляю поверх: shift-left без замедления разработки.

| Технология | Уровень | Применение |
|:---|:---|:---|
| **GitLab CI / Self-Managed** | Expert | Пайплайны с Kaniko, reusable templates, masked variables, оптимизация бэкапов |
| **Kaniko** | Expert | Изолированная сборка Docker-образов без DinD |
| **Semgrep / Trivy / Cosign** | Advanced | SAST (592 правила), SCA, keyless OIDC-подпись образов |
| **Bash / Python** | Expert | Скрипты миграций, бэкапов, healthchecks; честные exit codes и логирование |

---

## 🐳 Containers & Orchestration

Контейнеры для меня — не магия, а namespaces + cgroups. Поэтому мой харденинг осознанный, а не скопированный из статьи.

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Docker** | Expert | Multi-stage builds, Docker Context, hardening (`cap_drop: ALL`, `no-new-privileges`) |
| **Podman (rootless)** | Advanced | Изолированные среды (хакатон на 5 команд), фикс ACL сокета через systemd drop-in |
| **Kubernetes** | Basic/In Progress | Yandex Managed K8s (Ingress NGINX, Deep Links); Homelab HA-кластер в активной фазе |

---

## 🌐 Networking & Security

Единственная точка входа на прод — Bastion. Всё остальное закрыто Security Groups и приватными сетями.

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Traefik / Nginx** | Expert | Reverse proxy, Auto-TLS, маршрутизация, ACL, iOS Deep Links |
| **Bastion Host** | Expert | Единственная точка входа на Prod, SSH-туннели |
| **Phase / Infisical** | Advanced | Secrets Management, интеграция с GitLab CI, аудит и ротация |
| **DNS** | Advanced | Аудит скрытых зависимостей, миграция NS-записей, TTL/MX/SPF/DKIM |

---

## 🗄️ Databases, Messaging & Storage

Миграции выполняю только с верификацией целостности: скрипт сверяет row count по таблицам до и после.

| Технология | Уровень | Применение |
|:---|:---|:---|
| **PostgreSQL / MySQL** | Expert | Миграции с верификацией (~7 млн строк), HA-кластеры (RPO 5 мин, RTO 5-10 мин) |
| **Apache Kafka (YC Managed)** | Advanced | HA-кластеры (3 брокера, KRaft), Security Groups, мониторинг consumer lag |
| **RabbitMQ** | Advanced | Контейнеризация, Management UI, интеграция с приложениями |
| **Restic** | Expert | AES-256, дедупликация, smart retention: бэкап GitLab 9.1 ГБ → 44 МБ (-99.5%) |
| **S3** | Advanced | Restic repository, Bucket Policies, изоляция данных между сервисами |

---

## 🔍 Observability & SRE

Мониторинг строю вокруг бизнес-симптомов (latency, error rate, saturation), а не только "жив ли порт".

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Prometheus + Grafana** | Advanced | Дашборды здоровья приложений, алерты в Telegram |
| **Custom Healthchecks** | Expert | Python-скрипты: проверяют БД, PID-файлы фоновых процессов, порты |
| **Incident Response** | Advanced | Runbook, postmortem, MTTR с 2ч до 15 мин |

---

## 🔬 Homelab / R&D: от контейнеров к оркестрации

В коммерческой практике я преимущественно работал с VPS и Managed-сервисами, где инфраструктура управлялась через Terraform и Ansible. Чтобы выйти за рамки этой модели и освоить парадигму декларативной оркестрации, я развернул собственный лабораторный стенд.

**Текущие исследовательские треки:**

- **Kubernetes HA-кластер «с нуля»:** сборка многонодового кластера на голом железе без Managed-решений. Прорабатываю связку Control Plane, распределенного etcd и сетевых плагинов (CNI). Цель — не просто запустить под, а понять внутреннюю механику оркестратора.
- **Local AI на Apple Silicon (Mac Mini M4):** развертываю и оптимизирую инференс LLM-моделей. Изучаю, как встраивать AI-инструменты в CI/CD-пайплайны для автоматизации рутинных задач (анализ логов, генерация документации).
- **GitOps-цикл:** настраиваю ArgoCD для синхронизации состояния кластера с Git-репозиторием, отрабатываю практики идемпотентного деплоя.
- **Наблюдаемость:** собираю стек Prometheus + Grafana + Loki для мониторинга здоровья нод, подов и производительности AI-нагрузок.

> {: .note }
> **Мой принцип:** Я не меняю стек ради моды. Опыт с контейнерами (Docker/Podman), сетями (Traefik, DNS) и устройством ОС (cgroups/namespaces) делает переход к Kubernetes не изучением с нуля, а **естественной эволюцией** уже существующих компетенций.
