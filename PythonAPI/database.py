import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database=" mydatabase"
)
mycursor = mydb.cursor()

def insertValue(value):
    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    mycursor.execute(sql, value)
    mydb.commit()

def getAllFromTable(table):
    mycursor.execute("SELECT * FROM " + table)
    myresult = mycursor.fetchall()
    return myresult

def getAllFromTableById(table, id):
    mycursor.execute("SELECT * FROM " + table + " WHERE id = %s", id)
    myresult = mycursor.fetchone()
    return myresult

def deleteFromTableById(table, id):
    mycursor.execute("DELETE FROM " + table + " WHERE id = %s", id)
    mydb.commit()

def UpdateLineFromTableById(table, values):
    mycursor.execute("UPDATE " + table + " SET name = %s, address = %s WHERE id = %s", values)
    mydb.commit()