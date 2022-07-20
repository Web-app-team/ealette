import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type Props = {
  onPress?: VoidFunction;
  title: string;
  backgroundColor?: any;
  size?: string;
  color?: any;
  borderRadius?: number;
  minWidth?: any;
  width?: any;
  height?: any;
};

const AppButton: React.FC<Props> = ({
  onPress,
  title,
  backgroundColor,
  size,
  color,
  borderRadius,
  width,
  height,
  minWidth,
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
        borderRadius && { borderRadius },
        width && { width },
        height && { height },
        minWidth && { minWidth },
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
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: '#008B34',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 12,
    margin: 7,
    // minWidth: Dimensions.get('window').width - 70,
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
