class cidades: 
    def __init__(self, nome, continente, idioma, clima): 
        self.nome = nome 
        self.continente = continente
        self.idioma = idioma
        self.clima = clima
            
cidadesList = [cidades('São Bernardo do Campo','America','Portugues','Calor'), cidades('Santo Andre','America','Portugues','Calor')] 

def filtraCidades(continente, idioma, clima):
    cidades = [cidade.__dict__ for cidade in cidadesList if cidade.continente == continente and cidade.idioma == idioma and cidade.clima == clima]
    return cidades