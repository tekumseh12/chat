import os


array_of_files = [".env", "config/database.php"]

for files in range(len(array_of_files)):
    file = open(array_of_files[files], "r")
    lines = file.readlines()
    for j in range(len(lines)):
        lines[j]= lines[j].replace("sierramadra123", "")


    file.close()

    file = open(array_of_files[files], "w")
    for line in lines:
        print(line)
        file.write(line)
    file.close()
