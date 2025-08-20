package routes

import (
	"github.com/MatheusABA/restaurant-project/server/controller/auth"
	"github.com/MatheusABA/restaurant-project/server/controller/user"
	middleware "github.com/MatheusABA/restaurant-project/server/middlewares"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {

	// Routes for user management
	// Create, Update, Delete, Find by ID, Find by Email
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

		userGroup.POST(
			"/createUser",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.CreateUser,
		)

		userGroup.GET(
			"/getAllUsers",
			middleware.RequestLogger(),
			middleware.RateLimiter(),
			middleware.AuthJWT(),
			middleware.RequireAdmin(),
			user.FindAllUsers,
		)

	}

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
}
