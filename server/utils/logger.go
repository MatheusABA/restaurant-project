package utils

import (
	"github.com/sirupsen/logrus"
)

var Logger *logrus.Logger

func InitLogger() {
	Logger = logrus.New()
	Logger.SetFormatter(&logrus.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
}

func LogInfo(msg string, fields ...any) {
	Logger.WithFields(logrus.Fields{
		"extra": fields,
	}).Info(msg)
}

func LogWarning(msg string, fields ...any) {
	Logger.WithFields(logrus.Fields{
		"extra": fields,
	}).Warn(msg)
}

func LogError(msg string, fields ...any) {
	Logger.WithFields(logrus.Fields{
		"extra": fields,
	}).Error(msg)
}
