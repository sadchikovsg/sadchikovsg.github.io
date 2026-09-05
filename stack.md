---
title: Технологический стек
layout: page
nav_order: 2
---

#  Технологический стек

Мой инструментарий сформирован на основе решения реальных производственных задач. Ниже — технологии, с которыми я работаю ежедневно, сгруппированные по областям.

---

## ☁️ Cloud & Infrastructure

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Yandex Cloud** | Expert | Cloud VPS, Managed PostgreSQL, S3, VPC, Security Groups |
| **AWS** | Advanced | S3, IAM, EC2 (базовое администрирование) |
| **Terraform** | Expert | Модульная IaC-архитектура (IAM, Network, Compute, Data слои) |
| **Ansible** | Expert | Dynamic Inventory, CI/CD Pipeline, идемпотентная настройка серверов |

---

## 🔄 CI/CD & Automation

| Технология | Уровень | Применение |
|:---|:---|:---|
| **GitLab CI** | Expert | Пайплайны с Kaniko, reusable templates, masked variables |
| **GitLab Self-Managed** | Advanced | Администрирование, оптимизация бэкапов (9.1 GB → 44 MB) |
| **Kaniko** | Expert | Изолированная сборка Docker-образов без DinD |
| **Bash** | Expert | Скрипты миграции, бэкапов, sync-скрипты Terraform→Ansible |
| **Python** | Advanced | Кастомные healthcheck-скрипты, email-уведомления, автоматизация |

---

## 🐳 Containers & Orchestration

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Docker** | Expert | Multi-stage builds, Docker Context, security hardening (cap_drop, no-new-privileges) |
| **Podman (rootless)** | Advanced | Изолированные среды для хакатона, сетевое изолирование |
| **Docker Compose** | Advanced | Параметризованные манифесты для команд разработки |

---

## 🌐 Networking & Security

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Traefik** | Expert | Auto-TLS, reverse proxy, маршрутизация |
| **Bastion Host** | Expert | Единственная точка входа на Prod, SSH-туннели |
| **Phase** | Advanced | Secrets Management, интеграция с GitLab CI |
| **S3 Bucket Policies** | Advanced | Изоляция данных между сервисами |
| **DNS** | Advanced | Аудит зависимостей, миграция NS-записей, TTL/MX/SPF/DKIM |

---

## 🗄️ Databases & Storage

| Технология | Уровень | Применение |
|:---|:---|:---|
| **PostgreSQL** | Expert | Миграции с верификацией (~250K строк), pg_dump, бэкапы |
| **MySQL 8.0** | Advanced | Managed, миграция ~7 млн строк с проверкой целостности |
| **Redis** | Advanced | BGSAVE, бэкапы, восстановление |
| **S3** | Expert | Хранение бэкапов, Restic repository, retention policies |

---

##  Backup & Reliability

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Restic** | Expert | AES-256 шифрование, дедупликация, smart retention, tagging |
| **Systemd (user-level)** | Advanced | Таймеры для ежедневных бэкапов без root-прав |

---

## 🖥️ OS & Core

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Linux** | Expert | 7+ лет администрирования, cgroups, namespaces, сетевой стек |
| **Git** | Expert | Git Flow, миграция репозиториев, управление версиями |

---

##  Observability & Monitoring

| Технология | Уровень | Применение |
|:---|:---|:---|
| **Custom Healthchecks** | Expert | Python-скрипты с проверкой БД, PID-файлов, портов |
| **Alerting** | Advanced | Email-уведомления с корректной обработкой UTF-8/MIME |

---

> {: .note }
> **Принцип выбора инструментов:** Я предпочитаю решения, которые дают максимальный контроль и прозрачность. Например, Restic вместо проприетарных backup-сервисов, Kaniko вместо DinD, rootless Podman вместо Docker от root. Безопасность и предсказуемость важнее "магии из коробки".
