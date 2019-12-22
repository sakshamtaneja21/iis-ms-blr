import 'package:bmi_calculator/Components/Bottom_button.dart';
import 'package:bmi_calculator/Components/Reusable_card.dart';
import 'package:bmi_calculator/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//import 'package:url_launcher/url_launcher.dart';
class CitySearch extends StatefulWidget {
  static String id = '/citysearch';

  @override
  _CitySearchState createState() => _CitySearchState();
}

class _CitySearchState extends State<CitySearch> {
  String city;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Women Suraksha'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            child: Container(
              alignment: Alignment.bottomLeft,
              padding: EdgeInsets.all(15.0),
              child: Text(
                'Search a place',
                style: kTitleResult,
              ),
            ),
          ),
          TextField(
            textAlign: TextAlign.center,
            keyboardType: TextInputType.text,
            onChanged: (value) {
              city = value;
              //Do something with the user input.
            },
            decoration: kInputFieldStyle.copyWith(
              hintText: 'Enter a place',
            ),
          ),
          Expanded(
            flex: 5,
            child: ReusableCard(
              colour: kActiveCardColor,
              cardChild: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
//                  Text(
//                    'Safe',
//                    style: kResultTextStyle,
//                  ),

//                  Text(
//                    bmiResult,
//                    style: kBMIText,
//                  ),
                  Image.network(
//                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsjctidUmvYEVEaXU2D9x5H2cpLiS8FOLtFBh7n8_wYe_xc_-&s',
                    'https://img2.chinadaily.com.cn/images/201811/28/5bfdc8e5a310eff3690859de.jpeg',
//                    'https://ibb.co/871kFbV',
                    fit: BoxFit.fill,
                    height: 270,
                    width: 400,
                  ),
//                  Text(
//                    'Population Density Expected:',
//                    textAlign: TextAlign.center,
//                    style: kBMISuggestion,
//                  ),
//                  Text(
//                    'High',
//                    style: kResultTextStyle,
//                  ),
                ],
              ),
            ),
          ),
          BottomButton(
            buttonTitle: 'Place Details',
            onTap: () {
              print(city);
              Navigator.pop(context, city);
            },
//            onTap:(),
          )
        ],
      ),
    );
  }
}
