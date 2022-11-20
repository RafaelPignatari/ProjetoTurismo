import mysql.connector

mydb = mysql.connector.connect(
    host="turistando-python-database.mysql.database.azure.com",
    user="roott@turistando-python-database",
    password="Turistando7@",
    database="pythonapi",
    client_flags= [mysql.connector.ClientFlag.SSL],
    ssl_ca= "data\DigiCertGlobalRootG2.crt.pem"
)
mycursor = mydb.cursor()

def getContinente():
    mycursor.execute("SELECT DISTINCT(continente) FROM pais;")
    myresult = mycursor.fetchall()
    return myresult

def getIdiomasByContinente(continente):
    mycursor.execute("SELECT DISTINCT(l.nome) FROM paisLingua pl" 
    + " INNER JOIN pais p ON pl.paisId = p.iso"
    + " INNER JOIN lingua l ON pl.linguaId = l.id"
    + " WHERE continente = %s;", [continente])
    myresult = mycursor.fetchall()
    return myresult

def getCidades(continente, idioma):
    mycursor.execute("SELECT c.nome, p.nome,l.nome, p.moeda, t.quartoTrimestre, p.historico FROM cidade c" 
    + " INNER JOIN pais p ON p.iso = c.pais"
    + " INNER JOIN paislingua pl ON pl.paisId = p.iso"
    + " INNER JOIN lingua l ON l.id = pl.linguaId"
    + " INNER JOIN temperaturaMediaCidade t ON c.id = t.cidadeId"
    + " WHERE p.continente = %s AND l.nome = %s", [continente, idioma])
    myresult = mycursor.fetchall()
    return myresult
