package dto

type CreateUserRequest struct {
	Name     string `json:"name" binding:"required,min=4,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Role     string `json:"role" binding:"required,oneof=user admin"`
	Password string `json:"password" binding:"required,min=5,max=40"`
}

type FindUserByIdRequest struct {
	ID uint `uri:"id" binding:"required"`
}

type FindUserByEmailRequest struct {
	Email string `uri:"email" binding:"required,email"`
}

type DeleteUserRequest struct {
	ID uint `uri:"id" binding:"required"`
}

type UpdateUserRequest struct {
	ID       uint   `uri:"id" binding:"required"`
	Name     string `json:"name" binding:"omitempty,min=4,max=50"`
	Email    string `json:"email" binding:"omitempty,email"`
	Role     string `json:"role" binding:"omitempty,oneof=user admin"`
	Password string `json:"password" binding:"omitempty,min=5,max=40"`
}

type ActivateUserRequest struct {
	ID uint `uri:"id" binding:"required"`
}
