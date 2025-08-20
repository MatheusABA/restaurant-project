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
			user.FindUserById,
		)

		userGroup.GET(
			"getUserByEmail/:email",
			middleware.RequestLogger(),
			user.FindUserByEmail,
		)

		userGroup.POST(
			"/createUser",
			middleware.RequestLogger(),
			user.CreateUser,
		)

	}

	authGroup := r.Group("/auth")
	{
		authGroup.POST(
			"/login",
			middleware.RequestLogger(),
			auth.Login,
		)
	}
}
