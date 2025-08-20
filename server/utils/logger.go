package utils

import (
	"go.uber.org/zap"
)

var (
	Logger *zap.Logger
	Sugar  *zap.SugaredLogger
)

func InitLogger() {
	var err error
	Logger, err = zap.NewProduction()
	if err != nil {
		panic(err)
	}
	Sugar = Logger.Sugar()
}

func LogInfo(msg string, fields ...any) {
	Sugar.Infow(msg, fields...)
}

func LogWarning(msg string, fields ...any) {
	Sugar.Warnw(msg, fields...)
}

func LogError(msg string, fields ...any) {
	Sugar.Errorw(msg, fields...)
}
