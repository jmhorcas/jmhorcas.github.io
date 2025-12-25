import bibtexparser
import json
import os


def convert_bib_to_json(bib_file, output_file):
    # Asegurarse de que la carpeta _data existe
    if not os.path.exists('_data'):
        os.makedirs('_data')

    with open(bib_file, encoding='utf-8') as f:
        # Cargamos el archivo BibTeX
        bib_database = bibtexparser.load(f)
        
    # Convertimos las entradas a una lista de diccionarios
    entries = bib_database.entries

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(entries, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    # Cambia 'mis_referencias.bib' por el nombre de tu archivo
    convert_bib_to_json('_data/publications.bib', '_data/publications.json')
    print("¡Éxito! El archivo _data/publications.json ha sido actualizado.")