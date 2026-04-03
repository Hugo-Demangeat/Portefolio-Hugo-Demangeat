import pandas as pd

try:
    df = pd.read_excel('ressources/BTS_SIO_Hugo_Demangeat_Epreuve E5 - Tableau de synthese_2026.xlsx')

    projects_data = {}

    project_names = [
        'mesfilmspreferes',
        'EventHub Lurcat',
        'Dolibarr',
        'OVH',
        'Perpignan Transfert',
        'SEE SELECOM'
    ]

    for idx, row in df.iterrows():
        row_str = str(row.values).lower()
        for project in project_names:
            if project.lower() in row_str:
                x_positions = []
                for col_idx, val in enumerate(row.values):
                    if val == 'X':
                        x_positions.append(col_idx)

                projects_data[project] = {
                    'row': idx,
                    'competences': x_positions,
                    'description': str(row.values[0])
                }
                break

    print('MAPPING PROJETS - COMPETENCES:')
    print('=' * 50)

    competence_names = [
        'Gérer le patrimoine informatique',
        'Répondre aux incidents et demandes',
        'Développer la présence en ligne',
        'Travailler en mode projet',
        'Mettre à disposition des utilisateurs un service',
        'Organiser son développement professionnel'
    ]

    for project, data in projects_data.items():
        print(f'\n{project.upper()}:')
        print(f'Description: {data["description"]}')
        print('Compétences couvertes:')
        for col_idx in data['competences']:
            if 1 <= col_idx <= 6:
                comp_name = competence_names[col_idx - 1]
                print(f'  ✓ {comp_name}')

except Exception as e:
    print('Erreur:', e)