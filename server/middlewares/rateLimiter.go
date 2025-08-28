package middleware

import (
	"net/http"
	"time"

	"github.com/MatheusABA/restaurant-project/server/utils"
	"github.com/gin-gonic/gin"
	limiterlib "github.com/ulule/limiter/v3"
	memory "github.com/ulule/limiter/v3/drivers/store/memory"
)

func RateLimiterPost() gin.HandlerFunc {
	rate := limiterlib.Rate{
		Period: 1 * time.Minute,
		Limit:  10,
	}
	store := memory.NewStore()
	limiter := limiterlib.New(store, rate)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		context, err := limiter.Get(c, ip)
		if err != nil {
			utils.Logger.Warn("Rate limiter error", err)
			utils.Error(c, http.StatusInternalServerError, "Internal server error")
			c.Abort()
			return
		}
		if context.Reached {
			utils.Error(c, http.StatusTooManyRequests, "Too many requests")
			c.Abort()
			return
		}
		c.Next()
	}
}

func RateLimiterGet() gin.HandlerFunc {
	rate := limiterlib.Rate{
		Period: 1 * time.Minute,
		Limit:  60,
	}
	store := memory.NewStore()
	limiter := limiterlib.New(store, rate)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		context, err := limiter.Get(c, ip)
		if err != nil {
			utils.Logger.Warn("Rate limiter error", err)
			utils.Error(c, http.StatusInternalServerError, "Internal server error")
			c.Abort()
			return
		}
		if context.Reached {
			utils.Error(c, http.StatusTooManyRequests, "Too many requests")
			c.Abort()
			return
		}
		c.Next()
	}
}
