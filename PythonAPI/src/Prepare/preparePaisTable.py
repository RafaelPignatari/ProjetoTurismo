import requests
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

def insertValueLingua(values):
    sql = "INSERT INTO lingua (nome) VALUES (%s)"
    mycursor.execute(sql, [values])
    mydb.commit()

def insertValueLinguaPais(values):
    sql = "INSERT INTO paisLingua VALUES (%s, %s)"
    mycursor.execute(sql, values)
    mydb.commit()

def getAllFromTableById(table, id):
    mycursor.execute("SELECT * FROM " + table + " WHERE iso = '" + id + "'")
    myresult = mycursor.fetchone()
    return myresult

def getAllFromTableByLinguas(id):
    mycursor.execute("SELECT * FROM lingua WHERE nome = %s", [id])
    myresult = mycursor.fetchone()
    return myresult

headers = {'Accept': 'application/json'}
x = requests.get('https://servicodados.ibge.gov.br/api/v1/paises/', headers=headers)
paises = x.json()

for pais in paises:
    iso = pais["id"]["ISO-3166-1-ALPHA-2"]
    result = getAllFromTableById("pais", iso)
    if(result is not None):
        continue
    
    nome = pais["nome"]["abreviado"]
    continente = pais["localizacao"]["regiao"]["nome"]
    linguas = ""
    for lingua in pais["linguas"]:
        linguas = lingua["nome"] 
        result = getAllFromTableByLinguas(linguas)
        if(result is not None):
            continue
        insertValueLingua(linguas)

    moeda = pais["unidades-monetarias"][0]["id"]["ISO-4217-ALPHA"]
    historico = pais["historico"]
    
    insertValue("pais", (iso, nome, continente, moeda, historico))
    result = getAllFromTableByLinguas(linguas)
    insertValueLinguaPais((iso, result[0]))
    print(nome);

