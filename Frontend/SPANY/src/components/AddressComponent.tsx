import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { dynamicBorderRadius, dynamicFontSize, dynamicMargin, dynamicPadding, Themes } from '../Themes/color';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../Themes/CustomTost';
import LinearGradient from 'react-native-linear-gradient';
import { HandleAddress, UpdateAddress } from '../functionality/apifunctions';
import { useData } from '../functionality/APICall';

interface AddressComponentProps {
  Data: {
    id?: number;
    name: string;
    phone: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    default: boolean;
  };
  setAddress: React.Dispatch<React.SetStateAction<any>>;
  setOperation: React.Dispatch<React.SetStateAction<boolean>>;
  action: 'post' | 'put'; // Action type definition
  fields: string;
  navigation: any;
}

const AddressComponent: React.FC<AddressComponentProps> = ({
  Data,
  setAddress,
  setOperation,
  action,
  fields = "All",
  navigation
}) => {
  const [formData, setFormData] = useState({
    id: Data?.id || null,
    name: Data?.name || "",
    phone: Data?.phone || "",
    address: Data?.address || '',
    landmark: Data?.landmark || '',
    city: Data?.city || '',
    state: Data?.state || '',
    country: Data?.country || '',
    zipcode: Data?.zipcode || '',
    default: Data?.default || false,
  });
  
  const [isEnabled, setIsEnabled] = useState(false);
  const { fetchdata } = useData();

  useEffect(() => {
    if (Data) {
      setFormData({
        id: Data?.id || null,
        name: Data?.name || '',
        phone: Data?.phone || '',
        address: Data?.address || '',
        landmark: Data?.landmark || '',
        city: Data?.city || '',
        state: Data?.state || '',
        country: Data?.country || '',
        zipcode: Data?.zipcode || '',
        default: Data?.default || false,
      });
      setIsEnabled(Data?.default || false); // Sync switch state with the data
    }
  }, [Data]);

  const handleChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSwitchChange = (value: boolean) => {
    setIsEnabled(value);
    setFormData((prevState) => ({ ...prevState, default: value }));
  };

  const handleSave = async () => {
    try {
      if (action === 'post') {
        delete formData.id;
        await HandleAddress(formData, setAddress, navigation, fetchdata);
      } else if (action === 'put') {
        await UpdateAddress(formData, setAddress, navigation, fetchdata);
      }
      setOperation(false); // Close the modal or handle post-save logic
    } catch (error) {
      console.error('Error saving address:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an issue while saving the address.',
      });
    }
  };

  const renderInput = (label: string, value: string, field: string, keyboardType: string) => (
    <View style={styles.inputbox}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter Your ${label}`}
        placeholderTextColor={Themes.color9}
        keyboardType={keyboardType}
        allowFontScaling={false}
        value={value}
        onChangeText={(text) => handleChange(field, text)}
      />
    </View>
  );

  return (
    <View>
      {(fields === "All" || fields === "Contact") && (
        <>
          {renderInput('Name', formData.name, 'name', 'default')}
          {renderInput('Phone', formData.phone, 'phone', 'phone-pad')}
        </>
      )}

      {(fields === "All" || fields === "Address") && (
        <>
          {renderInput('Address', formData.address, 'address', 'default')}
          {renderInput('Landmark', formData.landmark, 'landmark', 'default')}
          
          <View style={styles.row}>
            <View style={styles.rowBox}>
              {renderInput('City', formData.city, 'city', 'default')}
            </View>
            <View style={styles.rowBox}>
              {renderInput('State', formData.state, 'state', 'default')}
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.rowBox}>
              {renderInput('Country', formData.country, 'country', 'default')}
            </View>
            <View style={styles.rowBox}>
              {renderInput('Zipcode', formData.zipcode, 'zipcode', 'number-pad')}
            </View>
          </View>

          <View style={styles.switchBox}>
            <Text style={styles.inputLabel}>Default</Text>
            <Switch
              trackColor={{ false: Themes.color7, true: Themes.color3 }}
              thumbColor={isEnabled ? Themes.color2 : Themes.color13}
              onValueChange={handleSwitchChange}
              value={isEnabled}
            />
          </View>
        </>
      )}

      <TouchableOpacity onPress={handleSave}>
        <LinearGradient
          colors={Themes.gradient1}
          style={styles.button}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Toast config={toastConfig} />
    </View>
  );
};

export default AddressComponent;

const styles = StyleSheet.create({
  inputbox: {
    marginVertical: dynamicMargin * 0.25,
  },
  inputLabel: {
    fontSize: dynamicFontSize,
    color: Themes.color9,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: dynamicPadding * 0.25,
    marginVertical: dynamicMargin * 0.25,
  },
  rowBox: {
    flex: 1,
  },
  input: {
    color: Themes.color9,
    fontSize: dynamicFontSize,
    backgroundColor: Themes.color5,
    height: dynamicFontSize * 3,
    borderRadius: dynamicBorderRadius,
    paddingHorizontal: dynamicPadding * 0.5,
  },
  button: {
    height: dynamicFontSize * 3,
    width: '100%',
    backgroundColor: Themes.color2,
    borderRadius: dynamicBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: dynamicMargin * 0.25,
  },
  buttonText: {
    fontSize: dynamicFontSize,
    color: Themes.color6,
    fontWeight: 'bold',
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
