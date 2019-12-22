import 'package:get_it/get_it.dart';

import 'calls_and_message_service.dart';

GetIt locator = GetIt.I;

void setupLocator() {
  locator.registerSingleton(CallsAndMessagesService());
}
