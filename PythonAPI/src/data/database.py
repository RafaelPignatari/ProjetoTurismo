import mysql.connector

config = {
  'host':'turistando-python-database.mysql.database.azure.com',
  'user':'roott@turistando-python-database',
  'password':'Turistando7@',
  'database':'pythonapi',
  'client_flags': [mysql.connector.ClientFlag.SSL]
}

def getContinente():
    query = "SELECT DISTINCT(continente) FROM pais;"
    return executeQuery(query)

def getIdiomasByContinente(continente):
    query = "SELECT DISTINCT(l.nome) FROM paisLingua pl INNER JOIN pais p ON pl.paisId = p.iso INNER JOIN lingua l ON pl.linguaId = l.id WHERE continente = %s;"
    return executeQuery(query,[continente])

def getCidades(continente, idioma):
    query = "SELECT c.nome, p.nome,l.nome, p.moeda, t.quartoTrimestre, p.historico FROM cidade c INNER JOIN pais p ON p.iso = c.pais INNER JOIN paislingua pl ON pl.paisId = p.iso INNER JOIN lingua l ON l.id = pl.linguaId INNER JOIN temperaturaMediaCidade t ON c.id = t.cidadeId WHERE p.continente = %s AND l.nome = %s;"
    return executeQuery(query,[continente, idioma])

def executeQuery(query, values = []):
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    mycursor.execute(query, values)
    myresult = mycursor.fetchall()
    mydb.close()
    return myresult