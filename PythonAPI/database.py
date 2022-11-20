import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database=" mydatabase"
)
mycursor = mydb.cursor()

def getContinente():
    mycursor.execute("SELECT DISTINCT(continente) FROM pais;")
    myresult = mycursor.fetchall()
    return myresult

def getIdiomasByContinente(continente):
    mycursor.execute("SELECT DISTINCT(l.nome) FROM paisLingua pl" +
    + "INNER JOIN pais p ON pl.paisId = p.iso"
    + "INNER JOIN lingua l ON pl.linguaId = l.id"
    + "WHERE continente = %s;", [continente])
    myresult = mycursor.fetchall()
    return myresult

def getAllFromTableById(table, id):
    mycursor.execute("SELECT * FROM " + table + " WHERE id = %s", id)
    myresult = mycursor.fetchone()
    return myresult
