import 'network.dart';

class CallDetails {
  Future<dynamic> getCall() async {
    NetworkHelper networkHelper =
        NetworkHelper('https://women-suraksha.herokuapp.com/query-example');
    var callData = await networkHelper.getData();
    print(callData);
    return callData;
  }
}
