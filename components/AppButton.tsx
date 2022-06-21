import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: VoidFunction;
  title: string;
  backgroundColor?: any;
  size?: string;
  color?: any;
};

const AppButton: React.FC<Props> = ({
  onPress,
  title,
  backgroundColor,
  size,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.appButtonContainer,
        size === 'sm' && {
          paddingHorizontal: 8,
          paddingVertical: 6,
          elevation: 6,
        },
        backgroundColor && { backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.appButtonText, color && { color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: '#FFCA0B',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 7,
    minWidth: 250,
  },
  appButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default AppButton;
