import pandas as pd
import numpy as np
import argparse

# Define constrant
time_index = [
    "Weekends [9/18]",
    "Weekends [9/19]",
    "Weekdays [9/20]",
    "Weekdays [9/21]",
    "Weekdays [9/22]",
    "Weekdays [9/23]",
    "Weekdays [9/24]",
]

# Get arguments from command line
def get_args() -> argparse.Namespace:

    # parse arguments
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--applicant", default="Applicant.csv", help="Applicants csv file"
    )
    parser.add_argument("--output", default="output.csv", help="Output to csv file")

    # add to args list
    args = parser.parse_args()
    return args


# File processing function
def readFile(filename, *fields) -> pd.DataFrame:

    # Read the file of extract fields
    df = pd.read_csv(filename)
    data = df[[*fields]]

    # Return the extracted csv file
    return data


def convert_to_dict(data) -> dict:

    # convert table
    time_to_gisCode = {}
    gisCode_counter = {}
    gisCode_to_time = {}

    # Retrieve the data from each row
    for index, entry in data.iterrows():
        gisCode_counter[entry["GIS Code"]] = 0
        gisCode_to_time[entry["GIS Code"]] = []

        for field in time_index:
            if entry[field] != entry[field]:
                continue

            available = [field + " " + i.strip() for i in entry[field].split(",")]
            for time in available:
                time_to_gisCode[time] = entry["GIS Code"]
                gisCode_to_time[entry["GIS Code"]].append(time)
                gisCode_counter[entry["GIS Code"]] += 1

    # Return the extracted table: time -> [Email]
    return time_to_gisCode, gisCode_to_time, gisCode_counter


# Scheduling function
def schedule(Applicant):

    # convert to table
    time_to_gisCode, gisCode_to_time, counter = convert_to_dict(Applicant)

    # sort from smallest to largest
    gisCode_counter = sorted(counter.items(), key=lambda x: x[1])
    time_counter = {}
    result = {}

    for person, _ in gisCode_counter:
        minTime, bestChoice = float("inf"), ""

        for time in gisCode_to_time[person]:
            if time not in time_counter:
                bestChoice = time
                break
            elif time_counter[time] < minTime:
                minTime = time_counter[time]
                bestChoice = time

        if bestChoice not in time_counter:
            time_counter[bestChoice] = 0

        time_counter[bestChoice] += 1

        time_rep = bestChoice.split(" ")
        if ((time_counter[bestChoice] - 1) % 4 * 15 + 15) != 60:
            final_time = f"{time_rep[1].strip('[').strip(']')} {time_rep[-1].split('-')[0][0:2]}{((time_counter[bestChoice] - 1) % 4 * 15):02d}-{time_rep[-1].split('-')[0][0:2]}{((time_counter[bestChoice] - 1) % 4 * 15 + 15):02d}"
        else:
            final_time = f"{time_rep[1].strip('[').strip(']')} {time_rep[-1].split('-')[0][0:2]}45-{int(time_rep[-1].split('-')[0][0:2])+1}00"

        result[person] = final_time

    return result


# main function
def main():

    # parse arguments
    args = get_args()

    # Get the csv file content
    Applicant = readFile(
        args.applicant,
        "GIS Code",
        "Weekends [9/18]",
        "Weekends [9/19]",
        "Weekdays [9/20]",
        "Weekdays [9/21]",
        "Weekdays [9/22]",
        "Weekdays [9/23]",
        "Weekdays [9/24]",
    )

    result = schedule(Applicant)
    with open("result.csv", "w") as f:
        f.write("GIS Code, Interview time\n")
        for key in result.keys():
            f.write("%s, %s\n" % (key, result[key]))


if __name__ == "__main__":

    main()
