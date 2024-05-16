#Ce script permet de convertir les points de fixation dans la scène 3D en coordonnée par rapport à la carte afficher à l'écran 


import os
import pandas as pd
import csv
import json
# resultat_carte.cvs est produit par l'enquête
# fixations_on_surface_Surface est produit par l'acquisition avec l'ET, il est dans export/surface
# info.player.json est dans le dossier produit par l'acquisition (il permet de calculer le temps réel)



import glob
# les fichiers coord_fixation_on_image
liste_duration = glob.glob('duration/*')

liste_blinks = glob.glob('blinks/*')




duration = []

for i in range(len(liste_duration)):
    f = open(liste_duration[i])
    json_time = json.load(f)

    duration.append(json_time)



blinks = []
for i in range(len(liste_blinks)):
    blinks.append(pd.read_csv(liste_blinks[i]))

f_blinks =[]
blinks_moment = []
for k in range(len(blinks)):
    print()
    f_blinks.append([len(blinks[k])/duration[k]["duration_s"],liste_blinks[k].split("\\")[1].split(".")[0]])
    blinks_personne = []
    time_start = duration[k]["start_time_synced_s"]
    for p in range(len(blinks[k])):
        blinks_personne.append([blinks[k]["id"][p],blinks[k]["start_timestamp"][p]-time_start,blinks[k]["duration"][p]])
    blinks_moment.append(blinks_personne)




for k in range(len(blinks_moment)):

    with open(liste_blinks[k].split("\\")[1].split(".")[0]+'_moment.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["id","time","duration"]) # rajouter le zoom
        for i in range(len(blinks_moment[k])):
            writer.writerow(blinks_moment[k][i])

with open('frequence_blinks.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["frequence","name"]) # rajouter le zoom
    for i in range(len(f_blinks)):
        writer.writerow(f_blinks[i])
