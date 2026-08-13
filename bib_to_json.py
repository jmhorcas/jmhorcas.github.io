import bibtexparser
import json
import os


# Mapping dictionary for month names and abbreviations to standard 2-digit numbers
MONTH_MAP = {
    'january': '01', 'jan': '01',
    'february': '02', 'feb': '02',
    'march': '03', 'mar': '03',
    'april': '04', 'apr': '04',
    'may': '05',
    'june': '06', 'jun': '06',
    'july': '07', 'jul': '07',
    'august': '08', 'aug': '08',
    'september': '09', 'sep': '09',
    'october': '10', 'oct': '10',
    'november': '11', 'nov': '11',
    'december': '12', 'dec': '12'
}


def convert_bib_to_json(bib_file, output_file):
    # Asegurarse de que la carpeta _data existe
    if not os.path.exists('_data'):
        os.makedirs('_data')

    with open(bib_file, encoding='utf-8') as f:
        # Cargamos el archivo BibTeX
        bib_database = bibtexparser.load(f)
        
    entries = bib_database.entries

    # Process each entry to inject the formatted date attribute
    for entry in entries:
        year = entry.get('year', '0000')
        raw_month = entry.get('month', '').strip().lower()
        
        # Resolve the 2-digit representation of the month if available
        month_num = MONTH_MAP.get(raw_month, '00')
        
        # Combine into YYYY-MM format
        entry['date'] = f"{year}-{month_num}-{'01'}"  # Defaulting to the first day of the month

        # --- CAMBIO DE 'url' A 'handle' ---
        if 'url' in entry:
            entry['handle'] = entry.pop('url')
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(entries, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    # Cambia 'mis_referencias.bib' por el nombre de tu archivo
    convert_bib_to_json('assets/bib/publications.bib', '_data/publications.json')
    print("¡Éxito! El archivo _data/publications.json ha sido actualizado.")