import 'network.dart';

class PoliceDetails {
  Future<dynamic> getPolice() async {
    NetworkHelper networkHelper = NetworkHelper(
        'http://amyy28.pythonanywhere.com/policestations/Mathikere');
    var policeData = await networkHelper.getData();
    print(policeData);
    return policeData;
  }
}
