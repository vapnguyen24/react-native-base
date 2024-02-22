import {ReactNode, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Text, View} from 'react-native';
import {Colors} from '~/themes';
import {styles} from '~/components/InputField/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface InputFieldProps {
  field?: any;
  form?: any;
  placeholder?: string;
  placeholderTextColor?: string;
  label?: string;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  editable?: boolean;
  numberOfLines?: number;
  keyboardType?: any;
  multiline?: boolean;
  disabled?: boolean;
  mode?: 'flat' | 'outlined';
  isNumberMode?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputField = (props: InputFieldProps) => {
  const {
    label,
    placeholder,
    placeholderTextColor,
    leftItem,
    rightItem,
    multiline,
    keyboardType,
    numberOfLines,
    editable,
    disabled,
    mode = 'outlined',
    field,
    isNumberMode = false,
    secureTextEntry = false,
    autoCapitalize = 'none',
    form: {touched, errors},
  } = props;

  const {name, onBlur, onChange, value} = field;
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

  /*
   *  if TextField is in number mode, then we need to format the text from 999999 to 999,999
   *  else we just pass the text to the onChange function
   */
  const onChangeText = (text: string) => {
    if (text === '') {
      onChange(name)(text);
    } else {
      if (!isNumberMode) {
        onChange(name)(text);
      } else {
        const numericValue = text.replace(/[^0-9]/g, '');
        const formattedText = parseFloat(numericValue).toLocaleString('en-US');
        onChange(name)(formattedText);
      }
    }
  };
  const _renderEyeIcon = () => {
    return (
      <TextInput.Icon
        onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
        icon={isSecureTextEntry ? 'eye-off' : 'eye'}
      />
    );
  };

  const _renderInput = () => {
    return (
      <TextInput
        mode={mode}
        value={value}
        onBlur={onBlur(name)}
        onChangeText={onChangeText}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={isNumberMode ? 'number-pad' : keyboardType}
        numberOfLines={numberOfLines}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        left={leftItem}
        right={secureTextEntry ? _renderEyeIcon() : rightItem}
        disabled={disabled}
        secureTextEntry={isSecureTextEntry}
        autoCapitalize={autoCapitalize}
        allowFontScaling={false}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        error={touched[field.name] && errors[field.name] && true}
      />
    );
  };

  const _renderError = () => {
    return (
      touched[field.name] &&
      errors[field.name] && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={18} color={Colors.error} />
          <Text style={styles.errorText}>{errors[field.name]}</Text>
        </View>
      )
    );
  };
  return (
    <View>
      {_renderInput()}
      {_renderError()}
    </View>
  );
};
export default InputField;
