package test_models

import (
    "codebounty/models"
    "github.com/DATA-DOG/go-sqlmock"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func NewMockGormDatabase() (*models.GormRepo, sqlmock.Sqlmock, error) {
    /* Create a mock gorm database for testing purposes */

    sqlDB, mock, err := sqlmock.New()
    if err != nil {
        return nil, nil, err
    }

    // Wrap the mock DB with GORM
    gormDB, err := gorm.Open(mysql.New(mysql.Config{
        Conn:                      sqlDB,
        SkipInitializeWithVersion: true,
    }), &gorm.Config{})
    if err != nil {
        return nil, nil, err
    }

    return &models.GormRepo{DB: gormDB}, mock, nil
}
