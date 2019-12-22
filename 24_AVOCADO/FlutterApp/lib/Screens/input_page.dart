import 'package:bmi_calculator/Screens/ResultsPage.dart';
import 'package:bmi_calculator/Screens/alert.dart';
import 'package:bmi_calculator/Screens/city_search.dart';
import 'package:bmi_calculator/screen_arguments.dart';
import 'package:bmi_calculator/utilities/policeDetails.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../Components/Bottom_button.dart';
import '../Components/Icon_content.dart';
import '../Components/Reusable_card.dart';
import '../constants.dart';
import 'ResultsPage.dart';

//enum Gender { male, female }
//int height = 150;
//int weight = 60;
//int age = 20;
//List isSelected = List([1, 2, 3]);
final List<bool> isSelected = [true];
bool isSwitched = false;

class InputPage extends StatefulWidget {
  static String id = '/input';
  @override
  _InputPageState createState() => _InputPageState();
}

class _InputPageState extends State<InputPage> {
  String city;
  String roadSafety;
  String gentry;
  String streetLights;
  String alertVal;
  PoliceDetails police = PoliceDetails();

  var cityDetails = {
    'indiranagar': {
      'roadSafety': '4.0',
      'gentry': '4.3',
      'streetLights': 'Good',
      'numbers': '9123168942\n\n9934175942\n\n8051390687\n\n852146307',
    },
    'hebbal': {
      'roadSafety': '4.1',
      'gentry': '4.4',
      'streetLights': 'Bad',
      'numbers': '7854669935\n\n854763214\n\n8756644225\n\n8446656565',
    },
    'banashankari': {
      'roadSafety': '4.2',
      'gentry': '4.5',
      'streetLights': 'Bad',
      'numbers': '8454754646\n\n758496351\n\n8456975214\n\n8564217893',
    },
    'mathikere': {
      'roadSafety': '4.3',
      'gentry': '4.6',
      'streetLights': 'Good',
      'numbers': '7854698545\n\n8759642136\n\n854764956\n\n8754632255',
    },
    'manyata': {
      'roadSafety': '4.4',
      'gentry': '4.1',
      'streetLights': 'Good',
      'numbers': '8754693255\n\n8457965421\n\n8654796321\n\n8546325196',
    },
    'marathahalli': {
      'roadSafety': '4.5',
      'gentry': '4.3',
      'streetLights': 'Good',
      'numbers': '8246315798\n\n8475869214\n\n8754693254\n\n8521463978',
    },
    'electronic city': {
      'roadSafety': '4.4',
      'gentry': '4.6',
      'streetLights': 'Good',
      'numbers': '8523697412\n\n8546932175\n\n8456971236\n\n84569574485',
    },
    'btm layout': {
      'roadSafety': '4.0',
      'gentry': '4.3',
      'streetLights': 'Good',
      'numbers': '9123168942\n\n9934175942\n\n51452365\n\n546465465456',
    },
    'kamnahalli': {
      'roadSafety': '4.0',
      'gentry': '4.3',
      'streetLights': 'Good',
      'numbers': '8456321789\n\n8452361478\n\n8523697412\n\n8452367196',
    },
    'KSIT': {
      'roadSafety': '4.0',
      'gentry': '4.3',
      'streetLights': 'Good',
      'numbers': '8541236798\n\n8457965213\n\n8659745123\n\n8547963214',
    }
  };

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setState(() {
      if (city == null) {
        city = "mathikere";
        roadSafety = '4.2';
        gentry = '4.3';
        streetLights = "Good";
        alertVal = 'OFF';
        isSwitched = false;
        return;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Women Suraksha',
          style: TextStyle(fontSize: 30.0),
        ),
      ),
      body: Column(
        children: <Widget>[
//          ToggleButtons(
//            children: <Widget>[
//              Icon(Icons.call),
////              Icon(Icons.call),
////              Icon(Icons.cake),
//            ],
//            onPressed: (int index) {
//              setState(() {
//                isSelected[index] = !isSelected[index];
//              });
//            },
//            isSelected: isSelected,
//          ),

          Row(
//            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              FlatButton(
                onPressed: () async {
                  city = await Navigator.push(context,
                      MaterialPageRoute(builder: (context) {
                    return CitySearch();
                  }));
                  if (city != null) {
                    city = city.toLowerCase();
                    roadSafety = cityDetails[city]['roadSafety'];
                    gentry = cityDetails[city]['gentry'];
                    streetLights = cityDetails[city]['streetLights'];
                  } else {
                    city = "mathikere";
                    roadSafety = '4.2';
                    gentry = '4.3';
                    streetLights = "Good";
                  }
                },
                child: Icon(
                  Icons.location_city,
                  size: 50.0,
                ),
              ),
              SizedBox(
                width: 130.0 - city.length * 7.0,
              ),
              Text(
                city.toUpperCase(),
                style: TextStyle(
                    letterSpacing: 1.5,
                    fontSize: 25.0,
                    color: Colors.pinkAccent,
                    fontStyle: FontStyle.italic),
              ),
              SizedBox(
                width: 140.0 - city.length * 7.0,
              ),
              Switch(
                value: isSwitched,
                onChanged: (value) {
                  setState(() {
                    isSwitched = value;
                    if (alertVal.compareTo('OFF') == 0) {
                      alertVal = "ON";
                      print(police.getPolice());
                    } else {
                      alertVal = "OFF";
                    }
                  });
                },
                activeTrackColor: Colors.lightGreenAccent,
                activeColor: Colors.green,
//            materialTapTargetSize: MaterialTapTargetSize.padded,
              ),
            ],
          ),
          Text(
            "ALERT: $alertVal",
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
          Expanded(
            child: Row(
              children: <Widget>[
                Expanded(
                  child: ReusableCard(
                      cardChild: IconContent(
                        icon: FontAwesomeIcons.car,
                        label: 'Police Activity: High',
                      ),
                      colour: kActiveCardColor),
                ),
                Expanded(
                  child: ReusableCard(
                      cardChild: IconContent(
                        icon: FontAwesomeIcons.userCheck,
                        label: 'Nearby Contacts: 6',
                      ),
                      colour: kActiveCardColor),
                ),
              ],
            ),
          ),
          Expanded(
            child: Row(
              children: <Widget>[
                Expanded(
                  child: ReusableCard(
//                    onPress: () {
//                      setState(() {
//                        selectedGender = Gender.male;
//                      });
//                    },
//                    colour: selectedGender == Gender.male
//                        ? kActiveCardColor
//                        : kInactiveCardColor,
                    colour: kActiveCardColor,
                    cardChild: IconContent(
                      icon: FontAwesomeIcons.road,
                      label: 'Road Safety:$roadSafety/5.0',
                    ),
                  ),
                ),
                Expanded(
                  child: ReusableCard(
                    onPress: () {},
//                    colour: selectedGender == Gender.female
//                        ? kActiveCardColor
//                        : kInactiveCardColor,
                    colour: kActiveCardColor,
                    cardChild: IconContent(
                        icon: FontAwesomeIcons.users,
                        label: 'Gentry : $gentry/5.0'),
                  ),
                )
              ],
            ),
          ),

          Expanded(
            child: Row(
              children: <Widget>[
                Expanded(
                  child: ReusableCard(
                      cardChild: IconContent(
                        icon: FontAwesomeIcons.lightbulb,
                        label: 'Street Lights: $streetLights',
                      ),
                      colour: kActiveCardColor),
                ),
                Expanded(
                  child: ReusableCard(
                      onPress: () {
                        Navigator.pushNamed(
                          context,
                          Alert.id,
                          arguments:
                              ScreenArguments(cityDetails[city]['numbers']),
                        );
                      },
                      cardChild: IconContent(
                        icon: FontAwesomeIcons.userShield,
                        label: 'Emergency Numbers',
                      ),
                      colour: kActiveCardColor),
                )
              ],
            ),
          ),
          BottomButton(
            buttonTitle: 'MORE DETAILS',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ResultsPage(
//                    bmiResult: b.calculateBMI(),
//                    resultText: b.getResult(),
//                    interpretation: b.bmiInterpretation(),
                      ),
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
