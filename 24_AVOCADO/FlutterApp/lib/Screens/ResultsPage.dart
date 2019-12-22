import 'package:bmi_calculator/Components/Bottom_button.dart';
import 'package:bmi_calculator/Components/Reusable_card.dart';
import 'package:bmi_calculator/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

//import 'package:url_launcher/url_launcher.dart';
const kHtml = """
  <iframe src="https://api.mapbox.com/styles/v1/ayushujjwal/ck261hzxq076g1cpcsld1tx6n.html?fresh=true&title=true&access_token=pk.eyJ1IjoiYXl1c2h1amp3YWwiLCJhIjoiY2syNjFiMzE3Mm8xdTNlcXRveXE1ZThpNyJ9.FfcQ13NnrKmGunUdcUrSVw#12.7/12.433957/77.294691/0" width="560" height="315"></iframe>
  """;

class ResultsPage extends StatelessWidget {
  static String id = '/result';

//  ResultsPage(
//      {@required this.bmiResult,
//      @required this.resultText,
//      @required this.interpretation});
  _launchURL() async {
    if (await canLaunch(
        "https://api.mapbox.com/styles/v1/ayushujjwal/ck261hzxq076g1cpcsld1tx6n.html?fresh=true&title=true&access_token=pk.eyJ1IjoiYXl1c2h1amp3YWwiLCJhIjoiY2syNjFiMzE3Mm8xdTNlcXRveXE1ZThpNyJ9.FfcQ13NnrKmGunUdcUrSVw#12.7/12.433957/77.294691/0")) {
      await launch(
          "https://api.mapbox.com/styles/v1/ayushujjwal/ck261hzxq076g1cpcsld1tx6n.html?fresh=true&title=true&access_token=pk.eyJ1IjoiYXl1c2h1amp3YWwiLCJhIjoiY2syNjFiMzE3Mm8xdTNlcXRveXE1ZThpNyJ9.FfcQ13NnrKmGunUdcUrSVw#12.7/12.433957/77.294691/0");
    } else {
      throw 'Could not launch';
    }
  }

//  final String bmiResult;
//  final String resultText;
//  final String interpretation;

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
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            child: Container(
              alignment: Alignment.bottomLeft,
              padding: EdgeInsets.all(15.0),
              child: Text(
                'Details to know',
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
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Safe',
                    style: kResultTextStyle,
                  ),
//                  Text(
//                    bmiResult,
//                    style: kBMIText,
//                  ),
                  Image.network(
                    'http://www.astro.rug.nl/~weygaert/knawvoids/amsterdam.attracties.jpg',
//                    'https://ibb.co/871kFbV',
                    fit: BoxFit.fill,
                    width: 400,
                  ),

//                  Html(
//                    data: """
//                    <h1>Working</h1>
//            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.439898764401!2d77.54214241482104!3d12.879410990916423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ff4059b97c1%3A0x9ae119628bd2e43d!2sKammavari%20Sangham%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1573542943088!5m2!1sen!2sin" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
//                    """,
//                    onImageTap: (url) {
//                      print("image");
//                    },
//                  ),
//                  WebView(
//                    initialUrl: Uri.dataFromString(
//                            '<html><body> <h1>Awesome</h1></body></html>',
//                            mimeType: 'text/html',
//                            encoding: utf8)
//                        .toString(),
////                    javaScriptMode: JavaScriptMode.unrestricted,
//                    javascriptMode: JavascriptMode.unrestricted,
//                  ),
                  Text(
                    'Population Density Expected:',
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
            buttonTitle: 'Full View',
            onTap: _launchURL,
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
