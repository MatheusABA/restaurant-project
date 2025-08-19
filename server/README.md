Backend structure
```md
server/
  main.go               // Entry point
  go.mod                // Go module file
  config/               // Configurations (env, DB, etc.)
    config.go
  models/               // Database models (structs)
    table.go
    order.go
  controllers/          // HTTP handlers (business logic for routes)
    table_controller.go
    order_controller.go
  routes/               // Route definitions
    routes.go
  services/             // Business logic
    table_service.go
    order_service.go
  repository/           // DB access logic (optional, for abstraction)
    table_repository.go
    order_repository.go
  middleware/          // Custom Gin middlewares (auth, logging, etc.)
    auth.go
    admin.go
    requestLogger.go
  utils/                // Utility functions/helpers
    response.go
    logger.go
  database/             // DB connection and migration
    db.go
  queue/                // Queue logic (for delivery orders, RabbitMQ, etc.) SOON...
    delivery_queue.go
  tests/                // Unit and integration tests
```