import { Alert } from "react-native";

const errorMesage = (msg : any) => 
    Alert.alert('Error', msg, [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
        style:'default'
      }
    ]
);

const ConfirmAlert = (title: any,msg: any, onOK : () => void) => {

  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'OK', onPress: () => onOK
    },
  ]);

}

export {errorMesage, ConfirmAlert}