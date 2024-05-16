from post_processing_pupil import *


path_to_fixation =  "recordings/fixations_on_surface_Surface 1.csv"
survey_area = [8/1920,(1080-(600+120))/1080,(1142+8)/1920,(1080-120)/1080]
path_info ="recordings/info.player.json"
result = "recordings/resultat_carte_21_etape_2_C.csv"
geo = True
export_argument = ["zoom"]
name = "export/coord_fixation_on_map_21_2_2_C.csv"
eye_tracker_to_fixation(path_to_fixation,survey_area,path_info,path_to_result=result,geolocalisation=geo,export_argument_on_result=export_argument,name_export=name)
