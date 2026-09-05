---
title: Технологический стек
layout: page
nav_order: 2
---

# 🛠 Технологический стек

Мой инструментарий сформирован на основе решения реальных производственных задач. Ниже — технологии, с которыми я работаю ежедневно, а также направления, которые я активно развиваю в рамках R&D.

---

## ☁️ Cloud & Infrastructure

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Yandex Cloud** | Expert | Cloud VPS, Managed PostgreSQL, S3, VPC, Security Groups |
| **Terraform** | Expert | Модульная IaC-архитектура (IAM, Network, Compute, Data слои) |
| **Ansible** | Expert | Dynamic Inventory, CI/CD Pipeline, идемпотентная настройка серверов |

---

## 🔄 CI/CD & Automation

| Технология | Уровень | Применение |
|:---|:---|:---|
| **GitLab CI / Self-Managed** | Expert | Пайплайны с Kaniko, reusable templates, оптимизация бэкапов |
| **Kaniko** | Expert | Изолированная сборка Docker-образов без DinD |
| **Bash / Python** | Expert | Скрипты миграции, бэкапов, sync-скрипты Terraform→Ansible, healthchecks |

---

## 🐳 Containers & Networking

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Docker** | Expert | Multi-stage builds, Docker Context, security hardening (`cap_drop`, `no-new-privileges`) |
| **Podman (rootless)** | Advanced | Изолированные среды, сетевое изолирование (успешно применено на хакатоне) |
| **Traefik / Nginx** | Expert | Reverse proxy, Auto-TLS, маршрутизация, ACL |

---

## 🗄️ Databases, Messaging & Storage

| Технология | Уровень | Применение |
|:---|:---|:---|
| **PostgreSQL / MySQL** | Expert | Миграции с верификацией (~7 млн строк), `pg_dump`, бэкапы, настройка реплик. |
| **Apache Kafka (YC Managed)** | Advanced | Проектирование и развертывание High Availability (HA) кластеров, интеграция с VPC и Security Groups. |
| **RabbitMQ** | Advanced | Контейнеризация, развертывание Management UI, интеграция с приложениями. |
| **Restic** | Expert | AES-256 шифрование, дедупликация, smart retention, tagging. |
| **S3** | Advanced | Хранение бэкапов, Restic repository, Bucket Policies, изоляция данных. |

---

## 🔬 Homelab & R&D (Активное развитие)

*Поскольку в последних коммерческих проектах доминировали VPS и Managed-сервисы, я целенаправленно развиваю навыки работы с оркестрацией и новыми типами workload'ов в собственном лабораторном окружении.*

| Технология | Статус | Что реализую / Изучаю |
|:---|:---|:---|
| **Kubernetes (K8s)** | В активной фазе | Развертывание HA-кластера на собственном железе. Изучение архитектуры (Control Plane, etcd, CNI, CSI). |
| **Local AI & AI Harness** | В активной фазе | Развертывание и оптимизация локальных LLM на Apple Silicon (Mac Mini M4). Изучение основ MLOps и интеграции AI-инструментов в DevOps-пайплайны. |
| **GitOps (ArgoCD)** | Изучение | Настройка декларативного деплоя приложений в кластер из Git-репозитория. |
| **Observability** | Изучение | Стек Prometheus + Grafana + Loki для мониторинга состояния нод, подов и метрик AI-сервисов. |

---

> {: .note }
> **Мой принцип:** Я предпочитаю решения, которые дают максимальный контроль и прозрачность. Глубокое понимание работы контейнеров (Docker/Podman), сетей (Traefik, DNS) и ОС (Linux cgroups/namespaces) делает мой переход к Kubernetes не "изучением с нуля", а естественным масштабированием уже имеющихся знаний.

