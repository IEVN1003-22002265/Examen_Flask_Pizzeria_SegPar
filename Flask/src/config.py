class DevelopmentConfig():
    DEBUG=True
    MYSQL_HOST='localhost'
    MYSQL_USER='Diego'
    MYSQL_PASSWORD='root'
    MYSQL_DB='api_negocio'
    MYSQL_CURSORCLASS= 'Cursor'

config={
    'development': DevelopmentConfig
}