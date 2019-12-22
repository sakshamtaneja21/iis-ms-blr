import 'package:bmi_calculator/Screens/ResultsPage.dart';
import 'package:bmi_calculator/Screens/city_search.dart';
import 'package:bmi_calculator/Screens/front.dart';
import 'package:bmi_calculator/Screens/input_page.dart';
import 'package:bmi_calculator/service_locator.dart';
import 'package:flutter/material.dart';

import 'Screens/alert.dart';

//void main() => runApp(WomenSuraksha());
void main() {
  setupLocator();
  runApp(WomenSuraksha());
}

class WomenSuraksha extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData.dark().copyWith(
          primaryColor: Color(0xFF0A0E21),
          scaffoldBackgroundColor: Color(0xFF0A0E21),
        ),

//        home: FrontPage());
        initialRoute: FrontPage.id,
        routes: {
          FrontPage.id: (context) => FrontPage(),
          Alert.id: (context) => Alert(),
          InputPage.id: (context) => InputPage(),
          ResultsPage.id: (context) => ResultsPage(),
          CitySearch.id: (context) => CitySearch(),
        });
  }
}
