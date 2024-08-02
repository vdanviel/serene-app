import { useRouter } from 'expo-router';
import { Modal, Text, View, StyleSheet } from 'react-native';
import IndexButton from "@/components/layout/IndexButton";

interface ConfirmExitModalProps{
    visible: boolean,
    onClose: () => void,
}

export default function ConfirmExitModal({visible, onClose} : ConfirmExitModalProps) : React.ReactElement {
    
    const router = useRouter();

    const styles = StyleSheet.create({
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          centeredView: {
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffffab'
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
          modalTitle: {
            marginBottom: 15,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          btn_line:{
            display: 'flex',
            flexDirection: 'row'
          }
    })

    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
        >
            <View onTouchStart={() => onClose()} style={styles.centeredView}>
                <View onTouchStart={(e) => e.stopPropagation()} style={styles.modalView}>

                    <Text style={styles.modalTitle}>Are you sure you want to exit ?</Text>
                    <Text style={styles.modalText}>You are going to lose all the form progress.</Text>

                    <View style={styles.btn_line}>
                        <IndexButton  title="Exit Form" onPress={() => {
                            router.back();
                            onClose();
                          }
                        }/>
                        <IndexButton  title="Cancel" onPress={() => onClose()}/>
                    </View>

                </View>
            </View>
        </Modal>
    )

}