import { useRouter } from 'expo-router';
import { Modal, Text, View, StyleSheet } from 'react-native';
import IndexButton from "@/components/layout/IndexButton";

interface ConfirmExitModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ConfirmExitModal({ visible, onClose }: ConfirmExitModalProps): React.ReactElement {
  const router = useRouter();

  const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 30,
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffffcc',
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
      fontSize: 16,
    },
    modalTitle: {
      marginBottom: 15,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap:10
    },
    buttonSpacing: {
      marginHorizontal: 10,
    },
  });

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View onTouchStart={() => onClose()} style={styles.centeredView}>
        <View onTouchStart={(e) => e.stopPropagation()} style={styles.modalView}>
          <Text style={styles.modalTitle}>Are you sure you want to exit?</Text>
          <Text style={styles.modalText}>You are going to lose all the form progress.</Text>

          <View style={styles.buttonRow}>
              <IndexButton
                title="Exit Form"
                onPress={() => {
                  router.back();
                  onClose();
                }}
                margin={0}
                buttonStyle={styles.buttonSpacing}
              />
              <IndexButton title="Cancel" onPress={onClose} buttonStyle={styles.buttonSpacing} margin={0} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
