package routes

import (
	"github.com/MatheusABA/restaurant-project/server/controller/auth"
	"github.com/MatheusABA/restaurant-project/server/controller/invoicing"
	"github.com/MatheusABA/restaurant-project/server/controller/menu"
	"github.com/MatheusABA/restaurant-project/server/controller/order"
	"github.com/MatheusABA/restaurant-project/server/controller/tables"
	"github.com/MatheusABA/restaurant-project/server/controller/user"
	middleware "github.com/MatheusABA/restaurant-project/server/middlewares"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {

	// Routes for user management
	// Create, Update, Delete, Find by ID, Find by Email, Find Archived
	userGroup := r.Group("/user")
	{
		// Get user by Id
		userGroup.GET(
			"/getUserById/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.FindUserById,
		)

		userGroup.GET(
			"/getUserByEmail/:email",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.FindUserByEmail,
		)

		userGroup.GET(
			"/getAllUsers",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.FindAllUsers,
		)

		userGroup.GET(
			"/getArchivedUsers",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.FindArchivedUsers,
		)

		userGroup.POST(
			"/createUser",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.CreateUser,
		)

		userGroup.PATCH(
			"/updateUser/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.UpdateUser,
		)

		userGroup.PATCH(
			"/deleteUser/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.DeleteUser,
		)

		userGroup.PATCH(
			"/activateUser/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.ActivateUser,
		)

	}

	// Login and token auth
	authGroup := r.Group("/auth")
	{
		authGroup.POST(
			"/login",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			auth.Login,
		)

		// Token validation
		authGroup.GET(
			"/validate",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			auth.ValidateToken,
		)
	}

	// Order routes
	orderGroup := r.Group("/order")
	{
		orderGroup.POST(
			"/createOrder",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			order.CreateOrder,
		)

		orderGroup.GET(
			"/getOrderById/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			order.GetOrderById,
		)

		orderGroup.GET(
			"/getAllOrders",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			order.GetAllOrders,
		)

		orderGroup.PATCH(
			"/updateOrderStatus/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			order.UpdateOrderStatus,
		)

		orderGroup.POST(
			"/addOrderItem/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			order.AddOrderItem,
		)

		orderGroup.PATCH(
			"/deleteOrder/:id",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			order.DeleteOrder,
		)
	}

	tableGroup := r.Group("/table")
	{
		tableGroup.GET(
			"/getAllTables",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			tables.GetAllTables,
		)
	}

	invoiceGroup := r.Group("/invoice")
	{
		invoiceGroup.GET(
			"/getAllInvoices",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			invoicing.GetAllInvoices,
		)
	}

	menuItemGroup := r.Group("/menu")
	{
		menuItemGroup.POST(
			"/createMenuItem",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			menu.CreateMenuItem,
		)

	}
}
