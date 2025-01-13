import psycopg2
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="./logs/database.log",
    filemode="w",
    encoding="utf-8"
)

_conn = None

def connect():
    """
    
    """
    global _conn

    connection_params = {
        "dbname": "project-advertisement",
        "user": "postgres",
        "password": "admin",
        "host": "localhost",
        "port": 5432
    }

    try:
        _conn = psycopg2.connect(**connection_params)
        logging.info("Подключение к базе данных успешно выполнено.")

    except psycopg2.Error as err:
        logging.error(f"Ошибка при подключение к базе данных: {err}")


def get_subtypes_text(type):
    """"
    
    """
    cursor = _conn.cursor()
    try:
        cursor.execute("""
                    SELECT * FROM subtypes_texts
                    WHERE type ILIKE %s
                    """, (f"%{type}%",))

        subtypes = cursor.fetchall()
        logging.info(f"Запрос SELECT для {type} выполнен успешно.")
        cursor.close()
        return subtypes
    
    except psycopg2.Error as err:
        logging.error(f"Ошибка при выполнении запроса SELECT: {err}")

def get_all_name(table):
    """
    
    """
    cursor = _conn.cursor()
    result = []
    try:
        cursor.execute(f"SELECT * FROM {table}")
        for type in cursor.fetchall():
            if table == "types_texts":
                name, _, _ = type
                result.append(name)
            elif table == "subtypes_texts":
                name, _, _ = type
                result.append(name)

        logging.info(f"Запрос SELECT для получения названий всех типов/подтипов текстов выполнен успешно.")
        cursor.close()
        return result
    
    except psycopg2.Error as err:
        logging.error(f"Ошибка при выполнении запроса SELECT: {err}")

def get_rules(type):
    """
    
    """
    cursor = _conn.cursor()
    try:
        cursor.execute("""
                    SELECT * FROM types_texts
                    WHERE type ILIKE %s
                    """, (f"%{type.split(':')[0]}%",))
        
        _ , _, main_rule = cursor.fetchall()[0]

        cursor.execute("""
                    SELECT * FROM subtypes_texts
                    WHERE type ILIKE %s
                    """, (f"%{type}%",))

        _, second_rule, _ = cursor.fetchall()[0]
        logging.info(f"Запросы SELECT для {type} выполнен успешно.")
        cursor.close()
        return (main_rule, second_rule)
    
    except psycopg2.Error as err:
        logging.error(f"Ошибка при выполнении запроса SELECT: {err}")