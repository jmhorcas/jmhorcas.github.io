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

    library = bibtexparser.parse_file(bib_file)
    
    formatted_entries = []
    
    for entry in library.entries:
        # Extract fields as key-value pairs (strings)
        entry_dict = {field.key: field.value for field in entry.fields}
        
        # Add metadata like entry_type and key if needed
        entry_dict['ENTRYTYPE'] = entry.entry_type
        entry_dict['ID'] = entry.key

        year = entry_dict.get('year', '0000')
        raw_month = entry_dict.get('month', '').strip().lower()
        
        # Resolve the 2-digit representation of the month if available
        month_num = MONTH_MAP.get(raw_month, '00')
        
        # Combine into YYYY-MM format
        entry_dict['date'] = f"{year}-{month_num}-01"

        # --- CAMBIO DE 'url' A 'handle' ---
        if 'url' in entry_dict:
            entry_dict['handle'] = entry_dict.pop('url')
            
        formatted_entries.append(entry_dict)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(formatted_entries, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    # Cambia 'mis_referencias.bib' por el nombre de tu archivo
    convert_bib_to_json('assets/bib/publications.bib', '_data/publications.json')
    print("¡Éxito! El archivo _data/publications.json ha sido actualizado.")