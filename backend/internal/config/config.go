package config

import "github.com/spf13/viper"

type Config struct {
	AppPort    string
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
}

// Go functions can return more than one value ata time
func LoadConfig() (*Config, error) {
	// Look for a file specifically named .env
	viper.SetConfigFile(".env")
	//  Sometimes, instead of a file, settings are stored directly on the computer/server itself (Environment Variables). This line tells Viper, "If you find settings on the system, read those too."
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		// In containerized deployments, config usually comes from environment variables.
		// If .env is missing, continue and rely on AutomaticEnv values.
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, err
		}
	}

	// The & symbol goes hand-in-hand with the * , it means "create this box and grab its memory address.
	config := &Config{
		AppPort:    viper.GetString("APP_PORT"),
		DBHost:     viper.GetString("DB_HOST"),
		DBPort:     viper.GetString("DB_PORT"),
		DBUser:     viper.GetString("DB_USER"),
		DBPassword: viper.GetString("DB_PASSWORD"),
		DBName:     viper.GetString("DB_NAME"),
	}

	return config, nil
}
