package middleware

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	limiterlib "github.com/ulule/limiter/v3"
	memory "github.com/ulule/limiter/v3/drivers/store/memory"
)

func RateLimiter() gin.HandlerFunc {
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
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Rate limiter error"})
            return
        }
        if context.Reached {
            c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "Rate limit exceeded"})
            return
        }
        c.Next()
    }
}