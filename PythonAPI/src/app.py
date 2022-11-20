from flask import Flask, request, jsonify
from data import database
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSON_AS_ASCII'] = False

@app.route('/continentes')
@cross_origin()
def get_continentes():
    return jsonify(database.getContinente())

@app.route('/idiomas')
@cross_origin()
def get_idiomas():
    continente = request.args.get('continente')
    return jsonify(database.getIdiomasByContinente(continente))

@app.route('/cidades')
@cross_origin()
def get_cidades():
    continente = request.args.get('continente')
    idioma = request.args.get('idioma')
    return jsonify(database.getCidades(continente, idioma))

if __name__ == '__main__':
    app.run(debug=True) 