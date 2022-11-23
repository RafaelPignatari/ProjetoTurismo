import app as my_app
import unittest


class MyTestCase(unittest.TestCase):

    def setUp(self):
        my_app.app.testing = True
        self.app = my_app.app.test_client()

    def checkContinenteGet(self):
        result = self.app.get('/continentes')
        self.assertEqual(result.default_status, 200)
        self.assertIn("Europa", result.json[0])
        self.assertEqual(5, len(result.json))

    def checkIdiomaGetByEuropa(self):
        result = self.app.get('/idiomas?continente=Europa')
        self.assertEqual(result.default_status, 200)
        self.assertIn("alemão", result.json[2])
        self.assertEqual(33, len(result.json))

    def checkIdiomaGetByAmerica(self):
        result = self.app.get('/idiomas?continente=America')
        self.assertEqual(result.default_status, 200)
        self.assertIn("inglês", result.json[0])
        self.assertEqual(112, len(result.json))

    def checkCidadeByContinteAndIdioma(self):
        result = self.app.get('/cidades?continente=America&idioma=Ingles')
        self.assertEqual(result.default_status, 200)
        self.assertIn("Saint John's", result.json[0])
        self.assertIn("Antígua e Barbuda", result.json[0])
        self.assertIn("inglês", result.json[0])
        self.assertIn("XCD", result.json[0])
        self.assertIn("-1", result.json[0])
        self.assertEqual(6, len(result.json))

if __name__ == '__main__':
    unittest.main()