---
title: "Кейс 3: Разработка Internal Developer Platform (IDP) для масштабного мероприятия"
layout: page
nav_order: 3
parent: Кейсы и проекты
---

# 🚀 Кейс 3: Разработка Internal Developer Platform (IDP) для хакатона

**Роль:** DevOps / Platform Engineer  
**Длительность:** ~83 часа (полный цикл: от проектирования до поддержки в проде и демонтажа)  
**Стек:** GitLab Self-Managed, Podman (rootless), Traefik, Terraform, Ansible, Bash.

## 🎯 Проблема и Контекст
Необходимо было предоставить 5 изолированным командам надежную среду для 2-дневного хакатона (стек: .NET, React, Telegram-боты, SQLite/PostgreSQL). 
**Ключевые боли:**
- Зависимость от внешних SaaS-решений с ограничениями на регистрацию и доступ.
- Риск того, что участники или наставники "сломают" пайплайн, пытаясь изменить его код "на лету".
- Высокая вероятность сетевых коллизий при одновременном деплое нескольких команд.

## 🛠 Инженерные решения (Action)

### 1. Platform as a Product (Централизованные шаблоны)
- Создан единый платформенный репозиторий (`platform`), содержащий переиспользуемые CI/CD workflow (через `include`) и стандартизированные `docker-compose` манифесты.
- Команды получали "скелет" репозитория с готовыми `Dockerfile` (multi-stage) и `.gitlab-ci.yml`, что исключало ошибки базовой настройки.

### 2. Параметризация и безопасность (No-Code Deployment для наставников)
- Внедрена система управления деплоем через CI-переменные (`DEPLOY_MODE`, `DB_TYPE`, `NEEDS_DB`).
- **Результат:** Наставники могли переключать сценарий (например, с веб-приложения на Telegram-бота или с SQLite на PostgreSQL) прямо в UI GitLab, **не внося изменений в код пайплайна**.

### 3. Глубокий траблшутинг и изоляция
- **Критический инцидент:** Во время мероприятия несколько команд случайно подключались к чужим базам данных, так как использовали общее имя сервиса `postgres` в общей сети Podman.
- **Решение:** Логика генерации переменных перенесена в скрипт `deploy-remote.sh`. Теперь при каждом деплое скрипт автоматически формирует и пробрасывает в контейнер **уникальные** переменные окружения (например, `DB_HOST=team-2-hackathon-backend-postgres`), полностью исключая ручной ввод и коллизии.
- Вся платформа развернута на **rootless Podman** с жестким сетевым изолированием и ACL-фиксами для сокетов.

### 4. Оптимизация и надежность самой платформы
- Выявлена и устранена критическая проблема: бэкапы GitLab росли до 9.1 ГБ из-за архивации Registry и бага с `GITLAB_OMNIBUS_CONFIG` (параметры не сохранялись при перезапуске).
- **Решение:** Внедрена прямая запись в `gitlab.rb` через Ansible + флаг `SKIP=registry` при бэкапе.

## 📊 Результаты и Метрики

| Метрика | Результат |
| :--- | :--- |
| **Изоляция и стабильность** | 5 команд работали параллельно без сетевых коллизий и взаимного влияния. |
| **Управляемость** | 0 изменений кода пайплайна со стороны наставников; все настройки через CI-переменные. |
| **Оптимизация платформы** | Размер бэкапа GitLab сокращен с **~9.1 ГБ до 44 МБ** (в ~200 раз), время выполнения с 15 мин до 48 сек. |
| **Безопасность** | Rootless-исполнение, автоматическая очистка ресурсов после мероприятия (полный демонтаж через Terraform). |

## 🏗 Архитектура платформы

<div class="mermaid">
graph TD
    subgraph "Команды разработки"
        Dev[Участники/Наставники] -->|git push / change vars| GitLab[GitLab Self-Managed]
    end

    subgraph "CI/CD Platform Repo"
        GitLab -->|include| Templates[Reusable CI Templates]
        Templates -->|Kaniko Build| Registry[Container Registry]
    end

    subgraph "Hackathon Environment (Rootless Podman)"
        GitLab -->|Trigger| Runner[GitLab Runner]
        Runner -->|SSH + Compose| DeployScript[deploy-remote.sh]
        DeployScript -->|Inject Unique DB_HOST| Stack[Isolated Team Stack]
        Stack --> Registry
    end

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef platform fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    class Templates,DeployScript platform;
