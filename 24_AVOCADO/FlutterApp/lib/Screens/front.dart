import 'package:bmi_calculator/Components/Bottom_button.dart';
import 'package:bmi_calculator/Components/Reusable_card.dart';
import 'package:bmi_calculator/Screens/input_page.dart';
import 'package:bmi_calculator/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
//import 'package:url_launcher/url_launcher.dart';

class FrontPage extends StatelessWidget {
//  FrontPage(
//      {@required this.bmiResult,
//      @required this.resultText,
//      @required this.interpretation});
  static String id = '/';

//  final String bmiResult;
//  final String resultText;
//  final String interpretation;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Women Suraksha',
          style: TextStyle(
            fontSize: 30.0,
          ),
        ),
      ),
      body: Column(
//        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            child: Container(
              alignment: Alignment.bottomLeft,
              padding: EdgeInsets.all(15.0),
              child: Text(
                'Register',
                style: kTitleResult,
              ),
            ),
          ),
          Expanded(
            flex: 5,
            child: ReusableCard(
              colour: kActiveCardColor,
              cardChild: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Name',
                    style: kBMISuggestion,
                  ),
                  TextFormField(
                    decoration: new InputDecoration(
                      labelText: "Enter Name",
                      fillColor: Colors.white,
                      border: new OutlineInputBorder(
                        borderRadius: new BorderRadius.circular(25.0),
                        borderSide: new BorderSide(),
                      ),
                    ),
                  ),
                  Text(
                    'IMEI Number:',
                    style: kResultTextStyle,
                  ),
                  TextFormField(
                    decoration: new InputDecoration(
                      labelText: "Enter IMEI Number",
                      fillColor: Colors.white,
                      border: new OutlineInputBorder(
                        borderRadius: new BorderRadius.circular(25.0),
                        borderSide: new BorderSide(),
                      ),
                    ),
                  ),
//                  Image.network(
//                    'http://www.astro.rug.nl/~weygaert/knawvoids/amsterdam.attracties.jpg',
//                    fit: BoxFit.fill,
//                    width: 400,
//                  ),
                  Text(
                    'Email-id:',
//                    textAlign: TextAlign.center,
                    style: kBMISuggestion,
                  ),
                  TextFormField(
                    decoration: new InputDecoration(
                      labelText: "Enter Email",
                      fillColor: Colors.white,
                      border: new OutlineInputBorder(
                        borderRadius: new BorderRadius.circular(25.0),
                        borderSide: new BorderSide(),
                      ),
                    ),
                  ),
                  Text(
                    'Password',
                    style: kBMISuggestion,
                  ),
                  TextFormField(
                    decoration: new InputDecoration(
                      labelText: "Enter Password",
                      fillColor: Colors.white,
                      border: new OutlineInputBorder(
                        borderRadius: new BorderRadius.circular(25.0),
                        borderSide: new BorderSide(),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          BottomButton(
            buttonTitle: 'Register',
            onTap: () {
              Navigator.pushNamed(
                context,
                InputPage.id,
              );
            },
          )
        ],
      ),
    );
  }
}
//_launchURL() async {
//  const url = 'https://flutter.io';
//  if (await canLaunch(url)) {
//    await launch(url);
//  } else {
//    throw 'Could not launch $url';
//  }
//}
