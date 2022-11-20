import random
import mysql.connector

mydb = mysql.connector.connect(
    host="turistando-python-database.mysql.database.azure.com",
    user="roott@turistando-python-database",
    password="Turistando7@",
    database="pythonapi",
    client_flags= [mysql.connector.ClientFlag.SSL],
    ssl_ca= "PythonAPI\src\Prepare\DigiCertGlobalRootG2.crt.pem"
)
mycursor = mydb.cursor()

def insertValue(table, values):
    sql = "INSERT INTO " + table +" VALUES (%s, %s, %s, %s, %s)"
    mycursor.execute(sql, values)
    mydb.commit()

def getAllFromTableById(table, nome , pais):
    mycursor.execute("SELECT * FROM " + table + " WHERE nome = %s AND pais = %s", (nome, pais))
    myresult = mycursor.fetchone()
    return myresult

def getAllFromTable():
    mycursor.execute("SELECT iso FROM pais")
    myresult = mycursor.fetchall()
    return myresult

paises = getAllFromTable()
for id in range(1, 3874):

    temperatureBalance = random.randrange(-3, 5)
    
    
    primeiroTrimestre = random.randrange(-20,20) + temperatureBalance * 5
    segundoTrimestre = random.randrange(-20,20) + temperatureBalance * 5
    terceiroTrimestre = random.randrange(-20,20) + temperatureBalance * 5
    quartoTrimestre = random.randrange(-20,20) + temperatureBalance * 5
        
    insertValue("temperaturaMediaCidade", (id, primeiroTrimestre, segundoTrimestre, terceiroTrimestre, quartoTrimestre))

