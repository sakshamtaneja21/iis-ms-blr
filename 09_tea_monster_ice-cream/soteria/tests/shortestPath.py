import requests 

weight_API = "https://ayushtues.github.io/json_files/weights1.json"
data_API = "https://ayushtues.github.io/json_files/data1.json"

data = requests.get(data_API).json()
weights = requests.get(weight_API).json()


# print (data)
print (len(weights))

def risk_fact(coord, params):

    risk_dict = {}
    all_cords = data.keys()

    for records in all_cords:
        # if records[0]<coord[0]+30.0/3600 and records[0]>coord[0]-30.0/3600 and records[1]<coord[1]+30.0/3600 and records[1]>coord[1]-30.0/3600:
        if True:
            risk_weight = weights[records]
            tot_risk = 0

            for idx in risk_weight:

                risk_dict = risk_weight[idx]
                
                for param in params:
                    tot_risk += risk_dict[params[param]]

        risk_dict[records]=tot_risk
    
    return risk_dict

