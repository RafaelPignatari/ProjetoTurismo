from flask import Flask, jsonify, request
from models.cidades import filtraCidades
app = Flask(__name__)

continentes = [
    'America','Africa', 'Europa', 'Oceania', 'Asia'
]

idiomasPorContinentes = { 'America': ['Inglês', 'Espanhol', 'Portugues'] }

@app.route('/continentes')
def get_continentes():
    return jsonify(continentes)

@app.route('/idiomas')
def get_idiomas():
    continente = request.args.get('continente')
    return jsonify(idiomasPorContinentes[continente])

@app.route('/cidades')
def get_cidades():
    continente = request.args.get('continente')
    idioma = request.args.get('idioma')
    clima = request.args.get('clima')
    cidades = filtraCidades(continente, idioma, clima)
    return jsonify(cidades)

if __name__ == '__main__':
    app.run(debug=True) 