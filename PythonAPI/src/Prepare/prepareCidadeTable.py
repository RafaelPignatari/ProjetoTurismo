import requests
import mysql.connector

mydb = mysql.connector.connect(
    host="turistando-python-database.mysql.database.azure.com",
    user="roott@turistando-python-database",
    password="Turistando7@",
    database="pythonapi",
    client_flags= [mysql.connector.ClientFlag.SSL]
)
mycursor = mydb.cursor()

def insertValue(table, values):
    sql = "INSERT INTO " + table +" (nome, pais, latitude, longitude, populacao) VALUES (%s, %s, %s, %s, %s)"
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
for pais in paises:
    headers = {'Accept': 'application/json', 'X-Api-Key': 'ltGCHBdbFL/PPXQTBlyBww==FxmgaTRlWM5qZXAq'}
    
    count = 0;
    while(True):
        x = requests.get('https://api.api-ninjas.com/v1/city?limit=30&country=' + pais[0], headers=headers)
        if(x.status_code == 200):
            count = 0
            break

        count = count + 1
        if(count == 5):
            break

    cidades = x.json()
    for cidade in cidades:
        if (cidade.get("population") is None):
            continue

        nome = cidade["name"]
        pais = cidade["country"]

        result = getAllFromTableById("cidade", nome, pais)
        if(result is not None):
            continue
        latitude = cidade["latitude"]
        longitude = cidade["longitude"]
        populacao = cidade["population"]
        
        
        insertValue("cidade", (nome, pais, latitude, longitude, populacao))

