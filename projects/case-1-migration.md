---
title: "Кейс 1: Миграция и платформенная трансформация Legacy-проекта"
layout: page
nav_order: 1
parent: Кейсы и проекты
---

# 🚀 Кейс 1: Миграция и платформенная трансформация Legacy-проекта (Cloud A → Cloud B)

**Роль:** DevOps Engineer  
**Длительность:** ~68 часов (полный цикл от аудита до Post-Migration Support)  
**Стек:** Cloud VPS, GitLab CI, Kaniko, Docker, Traefik, Managed MySQL 8.0, Ansible, Bash, Python, Shell.

## 🎯 Проблема и Контекст (Baseline)
Проект работал в облаке "А" на устаревшей архитектуре (Container-Optimized OS, Instance Groups) с ручным деплоем. 
**Ключевые боли:**
- Отсутствие CI/CD и практик безопасности (Docker-in-Docker, запуск контейнеров от root).
- Жесткая привязка конфигурации фронтенда к среде сборки (требовалась пересборка образа для смены API URL).
- Риски потери данных и скрытые зависимости в DNS-зоне при миграции.

## 🛠 Инженерные решения (Action)

### 1. Архитектура и Security Hardening
- Спроектирована и реализована трехзвенная архитектура в облаке "Б" с изолированной приватной сетью.
- **Безопасный доступ:** Прямой SSH на продакшн-серверы закрыт. Весь доступ и деплой идут через Bastion-хост — альтернатива с прямым доступом отвергнута на этапе аудита как неконтролируемая точка риска.
- **Immutable Infrastructure:** Внедрен деплой через **Docker Context**. На боевых серверах нет Git и исходного кода — только запуск контейнеров по защищенному SSH-туннелю.
- **Runtime Security:** Контейнеры запускаются с `cap_drop: ALL` и `no-new-privileges:true`. Для фронтенда точечно добавлены только `SETGID/SETUID`.

### 2. DevSecOps и CI/CD с нуля
- Полный отказ от DinD в пользу **Kaniko**: сборка идет в раннере без привилегированного доступа, что устраняет attack surface, присущий DinD.
- **Deep Healthcheck:** Написан кастомный Python-скрипт, проверяющий не только порт, но и физическое подключение к БД, и наличие PID-файлов фоновых процессов (Celery).
- **Frontend Runtime Config:** 
  - **Baseline:** Vite на этапе `npm run build` встраивал `VITE_API_ENDPOINT` прямо в JS-бандл. Любая смена API URL (dev → staging → prod) требовала пересборки образа — артефакт был «привязан» к окружению.
  - **Решение:** паттерн runtime injection через `window._env_`. Бандл собирается один раз без зашитых URL; конкретный endpoint инжектится в момент `docker run` через переменную окружения.
  
  Кастомный `docker-entrypoint.sh` генерирует JS-файл с конфигами при старте контейнера:

  ```bash
  #!/bin/sh
  CONFIG_FILE="/usr/share/nginx/html/env-config.js"
  
  echo "window._env_ = {" >$CONFIG_FILE
  if [ -n "$VITE_API_ENDPOINT" ]; then
    echo "  VITE_API_ENDPOINT: \"$VITE_API_ENDPOINT\"," >>$CONFIG_FILE
  fi
  echo "};" >>$CONFIG_FILE
  
  exec "$@"
  ```

  Во фронтенде `index.html` подключает `/env-config.js` перед основным бандлом — переменные доступны как `window._env_.VITE_API_ENDPOINT` в рантайме.
  - **Результат:** единый Docker-образ работает во всех средах. Для деплоя в новое окружение достаточно передать `docker run -e VITE_API_ENDPOINT=https://api.prod.example.com ...`. Пересборка не требуется.

### 3. Управление рисками при миграции (Zero-Downtime)
- **Аудит DNS:** Выявлены скрытые зависимости (поддомены на IP облака "А"), которые не были учтены в исходном ТЗ. Проведена WHOIS-верификация.
- **Целостность данных:** Написан скрипт миграции БД с автоматической проверкой `Row Count`.
- **План отката:** Подготовлен поэтапный план переноса NS-записей с сохранением TTL и MX/SPF/DKIM записей.

## 📊 Результаты и Метрики

| Метрика | Результат |
| :--- | :--- |
| **Целостность данных** | **100% совпадение** при миграции БД (скрипт верифицировал ~7 млн строк). |
| **Downtime при Cutover** | **< 60 минут** (включая смену DNS, выпуск SSL и фикс инцидента с конфигурацией). |
| **Безопасность** | Исключено хранение кода на Prod. Устранены уязвимости DinD и root-контейнеров. |
| **Скорость итераций** | Внедрен Git Flow. Деплой на Dev происходит автоматически при пуше, на Prod — по тегу. Разработчики больше не обращаются к серверам напрямую: человеческий фактор в деплое исключен. |
| **Универсальность артефактов** | Устранена пересборка фронтенда при смене окружения. Единый образ для dev/staging/prod через runtime injection переменных. |

## 🏗 Архитектура решения

```mermaid
graph TD
    subgraph DeveloperZone [Developer Zone]
        Dev[Developer] -->|git push| GitLab[GitLab Repository]
    end
    
    subgraph CICDPipeline [CI/CD Pipeline]
        GitLab -->|Trigger| Runner[GitLab Runner]
        Runner -->|Build| Registry[Container Registry]
    end
    
    subgraph CloudBProd [Cloud B - Production]
        Runner -->|Deploy SSH| Prod[App Server]
        Prod -->|Pull Image| Registry
        Prod -->|Connect| DB[Managed MySQL]
        User[End User] -->|HTTPS| Prod
    end
```
