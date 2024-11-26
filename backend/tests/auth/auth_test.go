package auth_tests

import (
	"codebounty/auth"
	"testing"
)

func TestGenerateToken(t *testing.T) {
	/* Test that generating a token does not throw an error */

	token, err := auth.GenerateToken(10)
	if err != nil {
		t.Errorf("GenerateToken(10) = %s, error: %v; want no error", token, err)
	}
}

func TestVerifyToken(t *testing.T) {
	/* Test that tokens can be verified and that the id is returned */

	token, err := auth.GenerateToken(10)
	if err != nil {
		t.Errorf("GenerateToken(10) = %s, error: %v; want no error", token, err)
	}

	id, err := auth.VerifyToken(token)
	if err != nil {
		t.Errorf("VerifyToken(10) = %d, error %v; want no error", id, err)
	}
	if id != 10 {
		t.Errorf("VerifyToken(10) = %d, want %d", id, 10)
	}
}


