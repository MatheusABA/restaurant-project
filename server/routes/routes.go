package routes

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user"
	middleware "github.com/MatheusABA/restaurant-project/server/middlewares"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {

	userGroup := r.Group("/user")
	{
		// Get user by Id
		userGroup.GET(
			"/getUserById/:id",
			middleware.RequestLogger(),
			user.FindUserById,
		)

		userGroup.POST(
			"/createUser",
			middleware.RequestLogger(),
			user.CreateUser,
		)
	}
}
