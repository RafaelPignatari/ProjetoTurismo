from flask import Flask, request, jsonify
from data import database

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/continentes')
def get_continentes():
    return jsonify(database.getContinente())

@app.route('/idiomas')
def get_idiomas():
    continente = request.args.get('continente')
    return jsonify(database.getIdiomasByContinente(continente))

@app.route('/cidades')
def get_cidades():
    continente = request.args.get('continente')
    idioma = request.args.get('idioma')
    return jsonify(database.getCidades(continente, idioma))

if __name__ == '__main__':
    app.run(debug=True) 