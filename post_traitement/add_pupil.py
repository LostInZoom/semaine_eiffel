
import os
import pandas as pd
import csv
import json



f = open('recordings/info.player.json',)
json_time = json.load(f)


start_time_system = float(json_time["start_time_system_s"]) # System Time at recording start
start_time_synced = float(json_time["start_time_synced_s"])     # Pupil Time at recording start
# Calculate the fixed offset between System and Pupil Time
offset = start_time_system - start_time_synced
# (timestamp+offset)*1000 >= resultat["time"][t]



path_to_export = "recordings"
path_to_enquete = "export"
path_to_fixation = os.path.join(path_to_enquete, "coord_fixation_on_map_21_2_2_C.csv")
path_to_distance = os.path.join(path_to_export, "pupil_positions.csv")

assert os.path.exists(path_to_distance)
fichier_position = pd.read_csv(path_to_distance)
assert os.path.exists(path_to_fixation)
fichier_fixation = pd.read_csv(path_to_fixation)

new_fixation =[]
for i in range(len(fichier_fixation)):
    liste = [fichier_fixation['world_index'][i],fichier_fixation['id_fixation'][i],fichier_fixation['time'][i],fichier_fixation['x'][i],fichier_fixation['y'][i],fichier_fixation['zoom'][i]]
    time = fichier_fixation["time"][i]
    other =[0,0]

    for t in range(len(fichier_position)):
        if (fichier_position["pupil_timestamp"][t]+offset)*1000 <= time:
            other =[fichier_position["diameter"][t],fichier_position["diameter_3d"][t]]                   
            continue
        else:
            break
    liste.append(other[0])
    liste.append(other[1])

    new_fixation.append(liste)


with open('export_pupil/coord_fixation_on_map_pupil_21_2_2_C.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["world_index","id_fixation","time","x","y","zoom","diameter","diameter_3d"]) # rajouter le zoom
    for i in range(len(new_fixation)):
        writer.writerow(new_fixation[i])

