package routes

import (
	"github.com/MatheusABA/restaurant-project/server/controller/user"
	"github.com/MatheusABA/restaurant-project/server/middleware"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {

	r.GET(
		"/getUserById/:userId",
		middleware.RequestLogger(),
		user.FindUserById,
	)

	r.GET(
		"/getUserByEmail/:userEmail",
		middleware.RequestLogger(),
		user.FindUserByEmail,
	)

	r.POST(
		"/createUser",
		middleware.RequestLogger(),
		user.CreateUser,
	)

	r.PATCH(
		"/updateUser/:userId",
		middleware.RequestLogger(),
		user.UpdateUser,
	)

	r.DELETE(
		"/deleteUser/:userId",
		middleware.RequestLogger(),
		user.DeleteUser,
	)
}
