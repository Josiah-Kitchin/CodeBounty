package auth

import (
	"errors"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"log"
	"os"
	"time"
)

type Claims struct {
	ID uint `json:"id"`
	jwt.StandardClaims
}

var jwtKey []byte

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	secret := os.Getenv("TOKEN_SECRET")
	jwtKey = []byte(secret)
}

func GenerateToken(id uint) (string, error) {
	/* Generat a token for a user id that stores the id */

	claims := &Claims{
		ID: id,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
			Issuer:    "CodeBounty",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func VerifyToken(userToken string) (uint, error) {
	/* Verify a token to authorize a user */

	//Parse the token
	token, err := jwt.ParseWithClaims(userToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Could not verify token")
		}
		return jwtKey, nil
	})

	//Validate that the token was parsed
	if err != nil {
		return 0, err
	}

	//If the token is valid, return the id.
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims.ID, nil
	} else {
		return 0, errors.New("Could not get id from token")
	}
}
