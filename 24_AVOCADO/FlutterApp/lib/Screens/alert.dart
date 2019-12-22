import 'package:bmi_calculator/Components/Bottom_button.dart';
import 'package:bmi_calculator/Components/Reusable_card.dart';
import 'package:bmi_calculator/constants.dart';
import 'package:bmi_calculator/utilities/call_details.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../calls_and_message_service.dart';
import '../screen_arguments.dart';
import '../service_locator.dart';
//import 'package:flutter_email_sender/flutter_email_sender.dart';

//import 'package:url_launcher/url_launcher.dart';

class Alert extends StatelessWidget {
  final CallsAndMessagesService _service = locator<CallsAndMessagesService>();

  final String number = "9123168942";
  final String email = "ujjwal.msrit@gmail.com";
  static String id = '/alert';
  CallDetails calldetails = CallDetails();
  @override
  Widget build(BuildContext context) {
    final ScreenArguments args = ModalRoute.of(context).settings.arguments;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Women Suraksha',
          style: TextStyle(fontSize: 30.0),
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
                'Emergency Numbers',
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
//                    'i)  91222222222\n\nii) 91222222222\n\niii) 91222222222\n\niv) 91222222222\n\n v) 91222222222',
                    args.numbers,
                    style: kResultTextStyle,
                  ),
//                  Text(
//                    bmiResult,
//                    style: kBMIText,
//                  ),
//                  Image.network(
//                    'http://www.astro.rug.nl/~weygaert/knawvoids/amsterdam.attracties.jpg',
////                    'https://ibb.co/871kFbV',
//                    fit: BoxFit.fill,
//                    width: 400,
//                  ),
                  Text(
                    'These are the numbers of the police stations and woman security NGOs nearest to you right now.\n \n\nFEEL SAFE',
                    textAlign: TextAlign.center,
                    style: kBMISuggestion,
                  ),
                  Text(
                    'High',
                    style: kResultTextStyle,
                  ),
                ],
              ),
            ),
          ),
          BottomButton(
            buttonTitle: 'ALERT ALL',
//            onTap: _launchURL,
            onTap: () async {
//              _open(0);
//              _service.call(number);
              print('Sending call to +91-8920032466');
              print(calldetails.getCall());
//              FlutterMailer.send(mailOptions);
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
